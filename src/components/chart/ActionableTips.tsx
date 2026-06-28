import type { Pattern } from "@/data/patterns";
import { PLAYBOOK, type PlaybookTip } from "@/courses/candlestick-mastery/playbook";

// Pro-trader + SEBI-research-analyst style actionable playbook. The tip cards
// are SPECIFIC to each pattern (from PLAYBOOK); the risk-management rules and
// educational disclaimer are universal. Falls back to generic tips if a
// pattern has no bespoke set yet.

const FALLBACK: PlaybookTip[] = [
  {
    icon: "✅",
    title: "Wait for confirmation",
    body: "Never anticipate. Enter only after the NEXT candle confirms the move (closes beyond the pattern). A pattern that isn't confirmed is just a candle.",
  },
  {
    icon: "🛑",
    title: "Decide your stop first",
    body: "Before you enter, know your exit. Place the stop-loss just beyond the pattern's extreme (its low for longs, its high for shorts). No stop = no trade.",
  },
  {
    icon: "⚖️",
    title: "Demand 1:2 reward-to-risk",
    body: "Measure the distance to the nearest logical target. If it isn't at least twice your stop distance, skip the trade — the maths must work before you click.",
  },
  {
    icon: "📐",
    title: "Size the position by risk",
    body: "Risk a fixed 1–2% of capital per trade. Shares = (capital × risk%) ÷ (entry − stop). Position size is your seatbelt, not your accelerator.",
  },
  {
    icon: "🎯",
    title: "Context beats the candle",
    body: "Only act when the pattern lines up with the trend AND a key support/resistance level. A signal floating in the middle of the range is noise.",
  },
  {
    icon: "📊",
    title: "Let volume vote",
    body: "A signal candle on above-average volume carries far more conviction than one on thin volume — it shows real participation behind the move.",
  },
  {
    icon: "🚫",
    title: "Avoid chop & event risk",
    body: "Stand aside in sideways, low-volatility markets and around major events (results, RBI/Fed, budget). Patterns whipsaw badly when there's no trend.",
  },
  {
    icon: "📓",
    title: "Journal every trade",
    body: "Log entry, stop, target and your reason — then review weekly. The journal, not the next pattern, is what actually makes you better.",
  },
];

export default function ActionableTips({ pattern }: { pattern: Pattern }) {
  const biasLine =
    pattern.bias === "bullish"
      ? "Take this long only when price is in an uptrend or bouncing off support. Going long into a strong downtrend is fighting the tape — wait for it at a level."
      : pattern.bias === "bearish"
      ? "Take this short only when price is in a downtrend or rejecting resistance. Shorting a strong uptrend is fighting the tape — wait for it at a level."
      : "Treat this as a heads-up, not a trade on its own. Let the next candle pick a side, and only then plan an entry with the trend.";

  const tips = PLAYBOOK[pattern.key] ?? FALLBACK;

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div
        style={{
          padding: "12px 16px",
          borderRadius: 12,
          background: "var(--grad-soft, rgba(24,168,122,0.06))",
          border: "1px solid var(--border)",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand)" }}>
          For the {pattern.name}
        </span>
        <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.6 }}>{biasLine}</p>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {tips.map((t) => (
          <div key={t.title} className="glass" style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
              <span style={{ marginRight: 7 }}>{t.icon}</span>
              {t.title}
            </div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>{t.body}</p>
          </div>
        ))}
      </div>

      {/* risk management — worked example */}
      <div className="glass card-pad" style={{ borderLeft: "3px solid var(--brand)" }}>
        <h3 style={{ fontSize: 15, color: "var(--brand-3)", margin: "0 0 6px" }}>🧮 Risk management (non-negotiable)</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Cap the loss on any single trade at <strong>2% of your capital</strong>. Worked example: capital ₹1,00,000 → max risk
          ₹2,000. If your entry is ₹500 and stop is ₹490 (₹10 risk per share), trade{" "}
          <strong>200 shares</strong> (₹2,000 ÷ ₹10). Even a string of losers can't sink the account — that is how pros survive
          long enough to let their edge play out.
        </p>
      </div>

      {/* SEBI-style educational disclaimer */}
      <div
        style={{
          padding: "12px 14px",
          borderRadius: 10,
          background: "rgba(14,27,46,0.035)",
          border: "1px dashed var(--border-strong, #cbd5e1)",
          fontSize: 12,
          lineHeight: 1.6,
          color: "var(--muted)",
        }}
      >
        <strong style={{ color: "var(--text)" }}>Educational disclaimer:</strong> This material is for education only and is{" "}
        <strong>not investment advice</strong> or a recommendation to buy or sell any security. Candlestick patterns express{" "}
        <em>probability, not certainty</em> — they fail regularly. Trading and investing carry the risk of capital loss, and past
        performance does not guarantee future results. Consult a <strong>SEBI-registered investment adviser / research analyst</strong>{" "}
        before making any investment decision, and practise on a paper-trading account before risking real money.
      </div>
    </div>
  );
}
