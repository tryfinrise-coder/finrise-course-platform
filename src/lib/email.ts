import "server-only";
import nodemailer from "nodemailer";

// Transactional email (login credentials).
// Priority: Brevo HTTP API (if BREVO_API_KEY set) → SMTP (nodemailer) → console
// (dev fallback so flows stay testable before email is wired up).

const APP_URL = process.env.APP_URL || "http://localhost:3000";

interface CredsOpts {
  to: string;
  password: string;
  productTitle: string;
  name?: string | null;
}

function buildContent(o: CredsOpts) {
  const subject = `Your Finrise login — ${o.productTitle}`;
  const loginUrl = `${APP_URL}/courses/login`;
  const hi = o.name ? `Hi ${o.name},` : "Hi,";
  const text = [
    `${hi}`,
    ``,
    `Welcome to Finrise! Your account is ready.`,
    `You now have access to: ${o.productTitle}`,
    ``,
    `Log in here: ${loginUrl}`,
    `Email:    ${o.to}`,
    `Password: ${o.password}`,
    ``,
    `Tip: change your password after your first login.`,
    ``,
    `Educational content only. Not investment advice.`,
    `— Team Finrise`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f6f7f5;font-family:'Segoe UI',Arial,sans-serif;color:#0E1B2E">
  <div style="max-width:520px;margin:0 auto;padding:28px 20px">
    <div style="background:#fff;border:1px solid #e6e7e3;border-radius:16px;overflow:hidden">
      <div style="background:#0E1B2E;padding:22px 26px">
        <span style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-.02em">Finrise</span>
      </div>
      <div style="padding:26px">
        <p style="margin:0 0 6px;font-size:16px">${hi}</p>
        <h1 style="margin:0 0 6px;font-size:20px">Your account is ready 🎉</h1>
        <p style="margin:0 0 18px;color:#51606e;font-size:14px;line-height:1.6">
          Thanks for enrolling. You now have access to <b>${o.productTitle}</b>.
        </p>
        <div style="background:#f6f7f5;border:1px solid #e6e7e3;border-radius:12px;padding:16px 18px;margin-bottom:18px">
          <p style="margin:0 0 8px;font-size:13px;color:#51606e">Your login details</p>
          <p style="margin:0 0 4px;font-size:14px"><b>Email:</b> ${o.to}</p>
          <p style="margin:0;font-size:14px"><b>Password:</b> <span style="font-family:monospace;background:#fff;border:1px solid #e6e7e3;border-radius:6px;padding:2px 8px">${o.password}</span></p>
        </div>
        <a href="${loginUrl}" style="display:inline-block;background:#18A87A;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 26px;border-radius:10px">Log in to your course →</a>
        <p style="margin:18px 0 0;color:#8a97a6;font-size:12px">Tip: change your password after your first login.</p>
      </div>
      <div style="border-top:1px solid #e6e7e3;padding:16px 26px;color:#8a97a6;font-size:11px;line-height:1.6">
        Educational content only. Not investment advice. Finrise is not a SEBI-registered adviser. © Finrise.
      </div>
    </div>
  </div></body></html>`;

  return { subject, text, html };
}

async function sendViaBrevo(o: CredsOpts): Promise<boolean> {
  const key = process.env.BREVO_API_KEY;
  if (!key) return false;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@tryfinrise.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Finrise";
  const { subject, text, html } = buildContent(o);
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: o.to, name: o.name || o.to }],
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });
    if (!res.ok) {
      console.error("[brevo] send failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[brevo] error:", (err as Error).message);
    return false;
  }
}

function getTransport() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendCredentialsEmail(o: CredsOpts): Promise<{ delivered: boolean }> {
  // 1) Brevo (preferred)
  if (await sendViaBrevo(o)) return { delivered: true };

  // 2) SMTP fallback
  const { subject, text, html } = buildContent(o);
  const transport = getTransport();
  if (transport) {
    const from = process.env.SMTP_FROM || "Finrise <no-reply@tryfinrise.com>";
    await transport.sendMail({ from, to: o.to, subject, text, html });
    return { delivered: true };
  }

  // 3) Dev fallback — surface the credentials so the flow is testable.
  console.log(`\n[email:dev] No email provider configured. Would send to ${o.to}:\n${text}\n`);
  return { delivered: false };
}
