import "server-only";
import crypto from "node:crypto";

const KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

export function razorpayConfigured(): boolean { return Boolean(KEY_ID && KEY_SECRET); }
export function razorpayKeyId(): string { return KEY_ID; }

export async function createRazorpayOrder(input: { amount: number; receipt: string; notes?: Record<string, string> }) {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64"),
    },
    body: JSON.stringify({ amount: input.amount, currency: "INR", receipt: input.receipt, notes: input.notes ?? {} }),
  });
  if (!res.ok) throw new Error(`Razorpay order failed: ${res.status} ${await res.text()}`);
  return (await res.json()) as { id: string; amount: number; currency: string };
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const expected = crypto.createHmac("sha256", KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); } catch { return false; }
}

// Kept for webhook route compatibility — HMAC_SHA256(rawBody, webhook_secret).
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); } catch { return false; }
}
