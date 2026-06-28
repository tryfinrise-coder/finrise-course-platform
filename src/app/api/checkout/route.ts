import { NextResponse, type NextRequest } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { validateDiscount, getAutoApplyDiscount } from "@/lib/discounts";
import { razorpayConfigured, razorpayKeyId, createRazorpayOrder } from "@/lib/razorpay";
import { createPurchase } from "@/lib/purchases";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    if (!razorpayConfigured()) {
      return NextResponse.json(
        { error: "Payments are not set up yet." },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : null;
    const phone = typeof body.phone === "string" ? body.phone.trim() : null;
    const code = typeof body.code === "string" ? body.code.trim() : null;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ error: "slug is required." }, { status: 400 });
    }

    const product = await getProductBySlug(slug);
    if (!product || !product.published) {
      return NextResponse.json({ error: "Product not found." }, { status: 400 });
    }

    const original = product.price;
    let amount = original;
    let appliedCode: string | null = null;

    // A typed code takes priority; otherwise fall back to any auto-apply offer.
    let d = code ? await validateDiscount(code, amount, product.id) : null;
    if (!d) d = await getAutoApplyDiscount(amount, product.id);
    if (d) {
      amount = d.kind === "percent" ? Math.round(amount * (1 - d.value / 100)) : Math.max(0, amount - d.value);
      appliedCode = d.code;
    }

    const order = await createRazorpayOrder({
      amount,
      receipt: "rcpt_" + Date.now(),
      notes: { slug, email },
    });

    await createPurchase({
      product_id: product.id,
      email,
      name: name || null,
      phone: phone || null,
      amount,
      discount_code: appliedCode,
      rp_order_id: order.id,
      status: "created",
    });

    return NextResponse.json({
      orderId: order.id,
      amount,
      originalAmount: original,
      appliedCode,
      currency: "INR",
      keyId: razorpayKeyId(),
      courseTitle: product.title,
      prefill: { email, name: name ?? "", phone: phone ?? "" },
    });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
