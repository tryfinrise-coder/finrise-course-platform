import type { Pattern } from "@/data/patterns";
import type { OHLC } from "@/lib/classify";

const BULL = "#16a34a";
const BEAR = "#dc2626";
const NEUTRAL = "#64748b";

// Read one candle's OHLC and describe the buyers-vs-sellers fight in plain words.
function analyse(k: OHLC) {
  const up = k.c >= k.o;
  const body = Math.abs(k.c - k.o);
  const range = k.h - k.l || 1;
  const upWick = k.h - Math.max(k.o, k.c);
  const loWick = Math.min(k.o, k.c) - k.l;
  const bodyRatio = body / range;
  const loDom = loWick > body * 1.4 && loWick > upWick * 1.3 && loWick > range * 0.35;
  const upDom = upWick > body * 1.4 && upWick > loWick * 1.3 && upWick > range * 0.35;
  const sharp = bodyRatio < 0.3 ? "sharply " : "";

  // hammer-like: a long lower wick is the whole story
  if (loDom) {
    return {
      winner: "buyers" as const,
      chip: "Buyers fought back",
      color: BULL,
      detail: `Sellers dragged price ${sharp}down during the session, but buyers stormed back and forced the close near the top. That long lower wick is a rejection of lower prices — a real show of buying strength.`,
    };
  }
  // shooting-star-like: a long upper wick is the whole story
  if (upDom) {
    return {
      winner: "sellers" as const,
      chip: "Sellers fought back",
      color: BEAR,
      detail: `Buyers shoved price ${sharp}up during the session, but sellers slammed it back down to close near the bottom. That long upper wick is a rejection of higher prices — a real show of selling strength.`,
    };
  }
  // tiny body, balanced wicks: indecision
  if (bodyRatio < 0.12) {
    return {
      winner: "tie" as const,
      chip: "Stand-off",
      color: NEUTRAL,
      detail:
        "Open and close finished almost level, with small wicks on both sides. Buyers and sellers cancelled each other out — pure indecision, which often appears just before a trend changes.",
    };
  }
  // clear directional candle
  const strength = bodyRatio > 0.6 ? "took firm control" : bodyRatio > 0.3 ? "won the session" : "edged just ahead";
  if (up) {
    return {
      winner: "buyers" as const,
      chip: "Buyers won",
      color: BULL,
      detail: `Price closed above where it opened, so buyers ${strength}. The green body is the ground they captured from the sellers.`,
    };
  }
  return {
    winner: "sellers" as const,
    chip: "Sellers won",
    color: BEAR,
    detail: `Price closed below where it opened, so sellers ${strength}. The red body is the ground they captured from the buyers.`,
  };
}

function MiniCandle({ k }: { k: OHLC }) {
  const up = k.c >= k.o;
  const W = 38;
  const H = 96;
  const pad = 8;
  const range = k.h - k.l || 1;
  const y = (v: number) => pad + ((H - 2 * pad) * (k.h - v)) / range;
  const bodyTop = y(Math.max(k.o, k.c));
  const bodyBot = y(Math.min(k.o, k.c));
  const col = up ? BULL : BEAR;
  return (
    <svg width={W} height={H} style={{ flexShrink: 0 }} aria-hidden>
      <line x1={W / 2} y1={y(k.h)} x2={W / 2} y2={y(k.l)} stroke={col} strokeWidth={2.5} strokeLinecap="round" />
      <rect x={W / 2 - 9} y={bodyTop} width={18} height={Math.max(2.5, bodyBot - bodyTop)} rx={3} fill={col} />
    </svg>
  );
}

export default function CandleBreakdown({ pattern }: { pattern: Pattern }) {
  const start = pattern.patternStart;
  const end = start + pattern.patternLength - 1;
  const candles = pattern.candles;

  // collect per-candle callouts from the pattern data
  const noteFor = new Map<number, string[]>();
  pattern.callouts.forEach((c) => {
    const arr = noteFor.get(c.candle) ?? [];
    arr.push(c.text);
    noteFor.set(c.candle, arr);
  });

  // the trend going in (compare the run before the pattern starts)
  let intro = "";
  if (start > 0) {
    const first = candles[0];
    const before = candles[start - 1];
    const rising = before.c > first.c;
    intro = rising
      ? "Going in, the market had been climbing — buyers were in charge."
      : "Going in, the market had been sliding — sellers were in charge.";
  }

  const order = ["First", "Second", "Third", "Fourth", "Fifth"];

  return (
    <div className="glass card-pad">
      <h3 style={{ fontSize: 16, margin: "0 0 4px" }}>How it forms — candle by candle</h3>
      <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
        Every candle is a tug-of-war between <strong style={{ color: BULL }}>buyers</strong> and{" "}
        <strong style={{ color: BEAR }}>sellers</strong>. Here is the fight, step by step.
        {intro ? ` ${intro}` : ""}
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {Array.from({ length: end - start + 1 }, (_, j) => {
          const i = start + j;
          const k = candles[i];
          const a = analyse(k);
          const notes = noteFor.get(i) ?? [];
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                padding: 14,
                borderRadius: 12,
                background: "var(--surface-2, #fff)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${a.color}`,
              }}
            >
              <MiniCandle k={k} />
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>
                    {order[j] ?? `Candle ${j + 1}`} candle
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      background: a.color,
                      borderRadius: 999,
                      padding: "2px 9px",
                    }}
                  >
                    {a.chip}
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--faint)", fontVariantNumeric: "tabular-nums" }}>
                    O{k.o.toFixed(0)} H{k.h.toFixed(0)} L{k.l.toFixed(0)} C{k.c.toFixed(0)}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{a.detail}</p>
                {notes.length > 0 && (
                  <p style={{ margin: "7px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--brand-2, #18a87a)" }}>
                    → {notes.join(" ")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.65 }}>
        <strong>Put together,</strong> these candles form the <strong>{pattern.name}</strong> — a{" "}
        <strong style={{ color: pattern.bias === "bullish" ? BULL : pattern.bias === "bearish" ? BEAR : NEUTRAL }}>
          {pattern.bias}
        </strong>{" "}
        signal. {pattern.bias === "bullish"
          ? "By the end, buyers have wrestled control away from sellers, hinting price may rise next."
          : pattern.bias === "bearish"
          ? "By the end, sellers have wrestled control away from buyers, hinting price may fall next."
          : "By the end, the fight is balanced — a warning the current trend may be running out of steam."}
      </p>
    </div>
  );
}
