"use client";

import { useEffect, useState } from "react";
import CheckoutButton from "@/components/checkout/CheckoutButton";

interface Props {
  slug: string;
  priceNow: string;
  priceStrike: string | undefined;
}

export default function StickyCTA({ slug, priceNow, priceStrike }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > 350);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

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
        borderTop: "1px solid rgba(24,168,122,0.30)",
        padding: "10px 16px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.45)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div style={{ color: "#E7ECF5", fontSize: "0.82rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Candlestick Mastery
          </div>
          <div style={{ color: "#18A87A", fontSize: "0.72rem", fontWeight: 500 }}>
            Lifetime access · No subscription
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
