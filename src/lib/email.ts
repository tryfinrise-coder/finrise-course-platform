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

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#0E1B2E">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:520px" cellpadding="0" cellspacing="0">

        <!-- Logo bar -->
        <tr><td style="background:#0E1B2E;border-radius:16px 16px 0 0;padding:20px 28px">
          <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.03em;font-family:'Segoe UI',Helvetica,Arial,sans-serif">Finrise</span>
        </td></tr>

        <!-- Main card -->
        <tr><td style="background:#ffffff;padding:32px 28px 28px">

          <!-- Greeting + headline -->
          <p style="margin:0 0 4px;font-size:15px;color:#51606e">${hi}</p>
          <h1 style="margin:0 0 10px;font-size:22px;font-weight:800;color:#0E1B2E;line-height:1.2">
            You're in! Your course is ready 🎉
          </h1>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#51606e">
            Thanks for joining Finrise. You now have full access to<br>
            <strong style="color:#0E1B2E">${o.productTitle}</strong>.
          </p>

          <!-- Credentials box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;border:1.5px solid #e2e6ea;border-radius:12px;margin-bottom:24px">
            <tr><td style="padding:14px 18px 6px">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8a97a6">Your login details</p>
            </td></tr>
            <tr><td style="padding:0 18px 6px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:80px;font-size:13px;color:#8a97a6;padding-bottom:8px;vertical-align:top">Email</td>
                  <td style="font-size:13px;font-weight:600;color:#0E1B2E;padding-bottom:8px;word-break:break-all">${o.to}</td>
                </tr>
                <tr>
                  <td style="width:80px;font-size:13px;color:#8a97a6;vertical-align:middle">Password</td>
                  <td style="vertical-align:middle">
                    <span style="display:inline-block;font-family:'Courier New',monospace;font-size:15px;font-weight:700;letter-spacing:0.08em;background:#fff;border:1.5px solid #d0d7de;border-radius:8px;padding:3px 12px;color:#0E1B2E">${o.password}</span>
                  </td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:12px 18px 14px">
              <p style="margin:0;font-size:11px;color:#b0bac5">
                ⚠️ Save this password — you can change it any time from your profile.
              </p>
            </td></tr>
          </table>

          <!-- CTA button -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px">
            <tr>
              <td style="background:#18A87A;border-radius:10px">
                <a href="${loginUrl}" style="display:inline-block;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 28px;border-radius:10px;letter-spacing:-0.01em">
                  Log in to your course →
                </a>
              </td>
            </tr>
          </table>

          <!-- Login URL (plain text fallback for button) -->
          <p style="margin:0;font-size:12px;color:#b0bac5;word-break:break-all">
            Or copy this link: <a href="${loginUrl}" style="color:#18A87A;text-decoration:none">${loginUrl}</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f6f8fa;border-top:1px solid #e2e6ea;border-radius:0 0 16px 16px;padding:16px 28px">
          <p style="margin:0;font-size:11px;line-height:1.7;color:#b0bac5">
            Educational content only. Not investment advice.<br>
            Finrise is not a SEBI-registered investment adviser. Trading carries risk of capital loss.<br>
            &copy; Finrise · <a href="${APP_URL}" style="color:#b0bac5;text-decoration:none">tryfinrise.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;

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
