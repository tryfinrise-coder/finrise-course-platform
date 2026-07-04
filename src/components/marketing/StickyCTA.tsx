"use client";

import CheckoutButton from "@/components/checkout/CheckoutButton";

interface Props {
  slug: string;
  priceNow: string;
  priceStrike: string | undefined;
}

export default function StickyCTA({ slug, priceNow, priceStrike }: Props) {
  return (
    <div
      className="lg:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: "rgba(11,14,20,0.97)",
        borderTop: "1px solid rgba(244,206,94,0.45)",
        padding: "10px 16px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 -6px 24px rgba(0,0,0,0.45)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-1.5"
            style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 800, whiteSpace: "nowrap" }}
          >
            <span
              aria-hidden="true"
              style={{ height: 7, width: 7, borderRadius: "50%", background: "#F4CE5E", boxShadow: "0 0 8px rgba(244,206,94,0.9)" }}
            />
            5.6K+ Enrolled
          </div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontWeight: 600 }}>
            Lifetime access
          </div>
        </div>
        <div data-track="cta_click" data-track-label="sticky_cta">
          <CheckoutButton
            slug={slug}
            label="Sign Up"
            gold
            priceNow={priceNow}
            priceStrike={priceStrike}
            className="h-11 rounded-xl px-5 text-sm font-bold whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
}
