import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { getOrderByRazorpayId, markOrderPaid } from "@/lib/orders";
import { getProductById } from "@/lib/products";
import { ensureUser } from "@/lib/users";
import { generatePassword } from "@/lib/passwords";
import { grantEntitlement } from "@/lib/entitlements";
import { sendCredentialsEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Phase 2: Razorpay calls this after payment. We verify the signature, then
// provision the buyer (create account, grant entitlement, email credentials).
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  // We act on a successful payment capture.
  if (event?.event !== "payment.captured" && event?.event !== "order.paid") {
    return NextResponse.json({ ok: true, ignored: event?.event });
  }

  const payment = event?.payload?.payment?.entity;
  const razorpayOrderId: string | undefined = payment?.order_id;
  const paymentId: string | undefined = payment?.id;
  if (!razorpayOrderId) {
    return NextResponse.json({ error: "No order id" }, { status: 400 });
  }

  const order = await getOrderByRazorpayId(razorpayOrderId);
  if (!order || !order.product_id || !order.email) {
    return NextResponse.json({ error: "Order not recognised" }, { status: 404 });
  }

  // Idempotency: if already paid, do nothing further.
  if (order.status === "paid") {
    return NextResponse.json({ ok: true, alreadyProcessed: true });
  }

  const product = await getProductById(order.product_id);
  if (!product) return NextResponse.json({ error: "Product gone" }, { status: 404 });

  // Provision the buyer.
  const password = generatePassword();
  const { user, created } = await ensureUser(order.email, password);
  await grantEntitlement(user.id, product.id, "purchase");
  await markOrderPaid(razorpayOrderId, paymentId || "");

  // Only email a fresh password if we actually created the account.
  if (created) {
    await sendCredentialsEmail({
      to: order.email,
      password,
      productTitle: product.title,
    });
  }

  return NextResponse.json({ ok: true, provisioned: created });
}
