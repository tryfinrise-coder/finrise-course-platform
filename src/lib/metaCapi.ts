import "server-only";
import crypto from "node:crypto";

// Meta Conversions API (server-side) sender.
// Config comes only from the environment — never hard-code the token.
//   META_PIXEL_ID      = your dataset / pixel id (e.g. 27615967504702056)
//   META_CAPI_TOKEN    = the Conversions API access token
//   META_CAPI_TEST_CODE = optional; set while testing in Events Manager → Test events

const PIXEL_ID = process.env.META_PIXEL_ID || "";
const TOKEN = process.env.META_CAPI_TOKEN || "";
const TEST_CODE = process.env.META_CAPI_TEST_CODE || "";
const API_VERSION = "v21.0";

export function capiConfigured(): boolean {
  return Boolean(PIXEL_ID && TOKEN);
}

const sha256 = (v: string) => crypto.createHash("sha256").update(v).digest("hex");

function normalizePhone(raw: string): string {
  let d = raw.replace(/[^0-9]/g, "");
  // Indian 10-digit numbers → prefix country code so match quality is high.
  if (d.length === 10) d = "91" + d;
  return d;
}

export interface CapiUser {
  email?: string | null;
  phone?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  fbp?: string | null; // _fbp cookie
  fbc?: string | null; // _fbc cookie
}

export interface CapiEvent {
  eventName: string; // e.g. "Purchase"
  eventId: string; // shared with the browser pixel for dedup
  eventSourceUrl?: string | null;
  value?: number; // in main currency units (rupees), NOT paise
  currency?: string; // e.g. "INR"
  contentName?: string | null;
  user: CapiUser;
}

/**
 * Send one event to the Meta Conversions API. Fails silently (logs only) so a
 * tracking hiccup can never break the purchase flow. No-ops if not configured.
 */
export async function sendCapiEvent(ev: CapiEvent): Promise<void> {
  if (!capiConfigured()) return;

  const user_data: Record<string, unknown> = {};
  if (ev.user.email) user_data.em = [sha256(ev.user.email.trim().toLowerCase())];
  if (ev.user.phone) {
    const p = normalizePhone(ev.user.phone);
    if (p) user_data.ph = [sha256(p)];
  }
  if (ev.user.ip && ev.user.ip !== "unknown") user_data.client_ip_address = ev.user.ip;
  if (ev.user.userAgent) user_data.client_user_agent = ev.user.userAgent;
  if (ev.user.fbp) user_data.fbp = ev.user.fbp;
  if (ev.user.fbc) user_data.fbc = ev.user.fbc;

  const custom_data: Record<string, unknown> = {};
  if (ev.value != null) custom_data.value = ev.value;
  if (ev.currency) custom_data.currency = ev.currency;
  if (ev.contentName) custom_data.content_name = ev.contentName;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: ev.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: ev.eventId,
        action_source: "website",
        ...(ev.eventSourceUrl ? { event_source_url: ev.eventSourceUrl } : {}),
        user_data,
        custom_data,
      },
    ],
  };
  if (TEST_CODE) body.test_event_code = TEST_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      console.error("[capi] send failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[capi] error:", (err as Error).message);
  }
}
