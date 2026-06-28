import { NextResponse, type NextRequest } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { markPurchasePaid, getPurchaseByOrderId } from "@/lib/purchases";
import { findUserByEmail, createUser } from "@/lib/users";
import { grantEntitlement } from "@/lib/entitlements";
import { generatePassword } from "@/lib/passwords";
import { getProductById } from "@/lib/products";
import { sendCredentialsEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const razorpay_order_id = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
    const razorpay_payment_id = typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
    const razorpay_signature = typeof body.razorpay_signature === "string" ? body.razorpay_signature : "";

    if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Payment is genuine — mark it paid first.
    await markPurchasePaid(razorpay_order_id, razorpay_payment_id);

    // Auto-provision the account. Wrapped so a provisioning hiccup never fails
    // the response — the payment already succeeded and is recorded.
    try {
      const purchase = await getPurchaseByOrderId(razorpay_order_id);
      if (purchase?.email) {
        const product = purchase.product_id ? await getProductById(purchase.product_id) : undefined;
        const productTitle = product?.title || "your Finrise course";

        let user = await findUserByEmail(purchase.email);
        let isNew = false;
        let password = "";

        if (!user) {
          // New buyer → create the account with a short generated password.
          password = generatePassword(8);
          user = await createUser({
            email: purchase.email,
            password,
            name: purchase.name ?? null,
            role: "student",
          });
          isNew = true;
        }

        // Give them access to what they bought.
        if (purchase.product_id) {
          await grantEntitlement(user.id, purchase.product_id, "purchase");
        }

        // Email login credentials only for newly-created accounts.
        if (isNew) {
          await sendCredentialsEmail({
            to: purchase.email,
            password,
            productTitle,
            name: purchase.name ?? null,
          });
        }
      }
    } catch (provisionErr) {
      console.error("[payment/verify] provisioning failed:", provisionErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[payment/verify]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
