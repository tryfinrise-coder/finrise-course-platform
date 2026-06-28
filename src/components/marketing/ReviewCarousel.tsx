"use client";

import { useRef } from "react";

// ⚠️ SAMPLE reviews — replace with REAL, verified learner reviews before
// running ads. Fake testimonials breach Meta/Google ad policy.
const REVIEWS: { name: string; place: string; stars: number; quote: string }[] = [
  { name: "Aarav Sharma", place: "Mumbai", stars: 5, quote: "I had no idea how to read charts before. Now it makes sense. The Hindi explanations helped a lot." },
  { name: "Priya Nair", place: "Bengaluru", stars: 5, quote: "Each candle is shown step by step, so it is easy to follow. I finally understand it." },
  { name: "Rohan Mehta", place: "Pune", stars: 4, quote: "Good course for beginners. Clear and simple. I just wanted a few more live examples." },
  { name: "Ananya Iyer", place: "Chennai", stars: 5, quote: "I started from zero. The risk part helped me the most — where to keep the stop loss." },
  { name: "Vikram Singh", place: "Delhi", stars: 4, quote: "Explained in plain language. It took me a few days, but it was worth it." },
  { name: "Sneha Reddy", place: "Hyderabad", stars: 5, quote: "Simple and honest teaching. No big promises, just learning. The handbook PDF is handy." },
  { name: "Karthik Rao", place: "Jaipur", stars: 4, quote: "The screeners and indicators were a nice bonus. Still practising, but more confident now." },
];

const GOLD = "#E0B43A";
const BG_CARD = "#141A24";
const BG_INK = "#0B0E14";
const BORDER = "rgba(255,255,255,0.10)";
const TEXT_HEAD = "#E7ECF5";
const TEXT_BODY = "#AEB9CC";
const TEXT_MUTED = "#6B7280";
const EMERALD = "#18A87A";

function Stars({ n }: { n: number }) {
  return (
    <span style={{ fontSize: 13, letterSpacing: 2 }} aria-label={`${n} out of 5 stars`}>
      <span style={{ color: GOLD }}>{"★".repeat(n)}</span>
      <span style={{ color: "rgba(255,255,255,0.16)" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function ReviewCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 256, behavior: "smooth" });
  };

  const arrow = (side: "left" | "right") => (
    <button
      type="button"
      onClick={() => scroll(side === "left" ? -1 : 1)}
      aria-label={side === "left" ? "Previous reviews" : "Next reviews"}
      className="absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition hover:brightness-125 sm:flex"
      style={{
        [side]: -6,
        background: BG_INK,
        border: `1px solid ${BORDER}`,
        color: TEXT_HEAD,
        boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
        {side === "left" ? "chevron_left" : "chevron_right"}
      </span>
    </button>
  );

  return (
    <div className="relative">
      {arrow("left")}
      {arrow("right")}

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-3 snap-x sm:px-2"
        style={{ scrollbarWidth: "none" }}
      >
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="snap-start shrink-0 rounded-xl border p-4"
            style={{ width: 240, borderColor: BORDER, background: BG_CARD }}
          >
            <Stars n={r.stars} />
            <p className="mt-2" style={{ color: TEXT_BODY, fontSize: "0.84rem", lineHeight: 1.55 }}>
              &ldquo;{r.quote}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: "rgba(24,168,122,0.15)", color: EMERALD }}
              >
                {r.name.charAt(0)}
              </span>
              <div>
                <div style={{ color: TEXT_HEAD, fontSize: "0.82rem", fontWeight: 700 }}>{r.name}</div>
                <div style={{ color: TEXT_MUTED, fontSize: "0.72rem" }}>{r.place}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
