"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  slug: string;
  label?: string;
  className?: string;
  priceStrike?: string; // e.g. "₹1,999/-" shown struck-through inside the button
  priceNow?: string; // e.g. "₹199/-" shown bold inside the button
  gold?: boolean; // golden eye-catching variant
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if ((window as any).Razorpay) return resolve();
    const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.head.appendChild(script);
  });
}

export default function CheckoutButton({
  slug,
  label = "Enrol now →",
  className,
  priceStrike,
  priceNow,
  gold,
}: CheckoutButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  // focus the Full name field when the modal opens
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => nameRef.current?.focus(), 60);
      return () => clearTimeout(id);
    }
  }, [open]);

  function openModal() {
    setError(null);
    setOpen(true);
  }

  function closeModal() {
    if (loading) return;
    setOpen(false);
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Fire InitiateCheckout when user submits the form
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          email: emailRef.current?.value?.trim() ?? "",
          name: nameRef.current?.value?.trim() ?? "",
          phone: phoneRef.current?.value?.trim() ?? "",
          code: codeRef.current?.value?.trim() ?? "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Load Razorpay checkout script then open the widget
      await loadRazorpayScript();

      const rzp = new (window as any).Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "Finrise",
        description: data.courseTitle,
        prefill: data.prefill,
        theme: { color: "#18A87A" },
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (resp: any) => {
          try {
            const v = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            const j = await v.json();
            if (j.ok) {
              const rupees = Math.round(data.amount / 100);
              window.location.href = `/thank-you?amount=${rupees}`;
            } else {
              setError("Payment could not be verified.");
              setLoading(false);
            }
          } catch {
            setError("Payment could not be verified.");
            setLoading(false);
          }
        },
      });

      rzp.open();
      // Keep loading=true until the Razorpay modal closes (handler or ondismiss)
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={openModal}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg px-7 text-[15px] font-semibold h-12 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          gold
            ? "cta-animate bg-gradient-to-br from-[#F4CE5E] to-[#E0A92E] text-[#1c1400] shadow-[0_10px_26px_-8px_rgba(224,169,46,0.7)] hover:brightness-105"
            : "bg-gradient-to-br from-brandblue to-primary text-primary-foreground shadow-[0_8px_22px_-6px_rgba(37,99,235,0.5)] hover:brightness-105",
          className
        )}
      >
        <span>{label}</span>
        {priceNow && (
          <span className="inline-flex items-baseline gap-1.5">
            {priceStrike && (
              <span className="text-[0.78em] font-semibold line-through opacity-60">{priceStrike}</span>
            )}
            <span className="font-extrabold">{priceNow}</span>
          </span>
        )}
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full rounded-t-3xl border border-slate-200 bg-white p-6 text-left text-slate-900 shadow-2xl sm:max-w-md sm:rounded-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              🔒 Secure checkout
            </span>
            <h2 className="mt-3 text-xl font-extrabold text-slate-900">You&rsquo;re one step away</h2>
            <p className="mt-1 text-sm text-slate-500">Enter your details to unlock the course + all free bonuses.</p>

            {priceNow && (
              <div className="mt-4 flex items-baseline gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Total today:</span>
                {priceStrike && <span className="text-sm font-medium text-slate-400 line-through">{priceStrike}</span>}
                <span className="text-lg font-extrabold text-emerald-600">{priceNow}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Full name */}
              <div className="space-y-1.5">
                <label htmlFor="cb-name" className="block text-[13px] font-semibold text-slate-700">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                  <input
                    id="cb-name"
                    ref={nameRef}
                    type="text"
                    required
                    placeholder="Ravi Sharma"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="cb-email" className="block text-[13px] font-semibold text-slate-700">
                  Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  <input
                    id="cb-email"
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="ravi@example.com"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="cb-phone" className="block text-[13px] font-semibold text-slate-700">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
                  <input
                    id="cb-phone"
                    ref={phoneRef}
                    type="tel"
                    required
                    inputMode="tel"
                    placeholder="98765 43210"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Discount code */}
              <div className="space-y-1.5">
                <label htmlFor="cb-code" className="block text-[13px] font-semibold text-slate-700">
                  Discount code <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82z" /><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" /></svg>
                  <input
                    id="cb-code"
                    ref={codeRef}
                    type="text"
                    placeholder="LAUNCH"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm uppercase text-slate-900 placeholder:normal-case placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#F4CE5E] to-[#E0A92E] px-5 text-[15px] font-extrabold text-[#1c1400] shadow-[0_10px_26px_-8px_rgba(224,169,46,0.55)] transition-all hover:brightness-105 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
              >
                {loading ? "Opening payment…" : "Proceed to payment →"}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
                🔒 Payments secured by Razorpay · We never store card details
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
