// Three marked candlestick charts that teach trade management:
//   1) laddering INTO a position at multiple prices
//   2) scaling OUT at targets with a protective stop
//   3) trailing the stop to lock in profit
// Deterministic (seeded) so server and client render identically.
const GREEN = "#16a34a";
const GREEN_L = "#22c55e";
const RED = "#dc2626";
const RED_L = "#ef4444";
const BLUE = "#2563eb";
const INK = "#0e1b2e";

interface OHLC { o: number; h: number; l: number; c: number; }
interface Line { price: number; label: string; color: string; tip?: string; }
interface Marker { i: number; price: number; label: string; dir: "buy" | "sell" | "exit"; tip?: string; }
interface Example {
  title: string;
  company: string;
  candles: OHLC[];
  lines: Line[];
  markers: Marker[];
  trail?: { i: number; price: number }[];
  caption: string;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gen(waypoints: number[], n: number, seed: number, vol: number): OHLC[] {
  const rng = mulberry32(seed);
  const segs = waypoints.length - 1;
  const closes: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * segs;
    const s = Math.min(segs - 1, Math.floor(t));
    closes.push(waypoints[s] + (waypoints[s + 1] - waypoints[s]) * (t - s) + (rng() * 2 - 1) * vol);
  }
  const out: OHLC[] = [];
  let prev = closes[0];
  for (let i = 0; i < n; i++) {
    const c = closes[i];
    const o = i === 0 ? c - (rng() * 2 - 1) * vol * 0.6 : prev + (rng() * 2 - 1) * vol * 0.4;
    out.push({ o, c, h: Math.max(o, c) + rng() * vol * 1.3, l: Math.min(o, c) - rng() * vol * 1.3 });
    prev = c;
  }
  return out;
}

const N = 30;
const EXAMPLES: Example[] = [
  {
    title: "1 · Enter at multiple prices (ladder in)",
    company: "Vertex Metals",
    candles: gen([132, 122, 113, 107, 104, 110, 120, 132], N, 7, 2.6),
    lines: [
      { price: 99, label: "Stop ₹99", color: RED, tip: "Stop-loss at ₹99 — below the whole support zone. Sized on the FULL position, so the most you can lose is your fixed risk even though you bought in three parts." },
      { price: 111, label: "Avg entry ₹111", color: BLUE, tip: "Average entry ₹111 — the blended price of the three buys (118, 109, 105). Better than buying everything at the first price of ₹118." },
    ],
    markers: [
      { i: 6, price: 118, label: "Buy ⅓ @118", dir: "buy", tip: "First tranche: buy ⅓ of the planned size at ₹118 as price first enters the support zone." },
      { i: 10, price: 109, label: "Buy ⅓ @109", dir: "buy", tip: "Second tranche: add another ⅓ at ₹109 as price dips deeper. This pulls your average down." },
      { i: 13, price: 105, label: "Buy ⅓ @105", dir: "buy", tip: "Final tranche: last ⅓ at ₹105 near the bottom of the zone. Full position now built with one stop below." },
    ],
    caption:
      "Instead of going all-in at one price, split the position into three equal buys as price dips into the support zone. Your average entry (₹111) is better than a single early buy, and one bad tick can't ruin the trade. One stop (₹99) sits below the whole zone — sized on the FULL position.",
  },
  {
    title: "2 · Exit in pieces (scale out at targets)",
    company: "Vertex Metals",
    candles: gen([110, 119, 124, 120, 131, 138, 134, 140], N, 19, 2.6),
    lines: [
      { price: 100, label: "Stop ₹100", color: RED, tip: "Initial stop-loss at ₹100. The moment Target 1 is hit, drag this up to your entry (₹110) so the trade can no longer lose money." },
      { price: 124, label: "Target 1 ₹124 — sell ⅓", color: GREEN, tip: "First target ₹124 (the next resistance). Sell ⅓ here to bank a real profit and reduce risk." },
      { price: 138, label: "Target 2 ₹138 — sell ⅓", color: GREEN, tip: "Second target ₹138. Sell another ⅓ here and let the final ⅓ run with a trailing stop." },
    ],
    markers: [
      { i: 1, price: 110, label: "In @110", dir: "buy", tip: "Entry: long the full position at ₹110 with the stop at ₹100 (₹10 risk per share defines your size)." },
      { i: 10, price: 124, label: "Sell ⅓", dir: "sell", tip: "Take partial profit: sell ⅓ at Target 1 (₹124). Now move the stop up to ₹110 — the trade is risk-free." },
      { i: 19, price: 138, label: "Sell ⅓", dir: "sell", tip: "Take more profit: sell ⅓ at Target 2 (₹138). The last ⅓ rides a trailing stop for any bigger move." },
    ],
    caption:
      "Don't sell everything at once. Bank ⅓ at the first logical target (₹124), another ⅓ at the second (₹138), and let the rest run. The moment Target 1 hits, move your stop up to your entry (₹110) so the trade can no longer lose money.",
  },
  {
    title: "3 · Trail the stop (lock in profit)",
    company: "Vertex Metals",
    candles: gen([112, 120, 116, 128, 124, 136, 130, 124], N, 41, 2.4),
    lines: [],
    trail: [
      { i: 0, price: 106 },
      { i: 10, price: 114 },
      { i: 18, price: 124 },
    ],
    markers: [
      { i: 1, price: 112, label: "In @112", dir: "buy", tip: "Entry: long at ₹112. The stop will follow price up instead of staying fixed." },
      { i: 27, price: 124, label: "Stopped out @124 (in profit)", dir: "exit", tip: "Exit: price turned down and tagged the trailed stop at ₹124. You banked most of the move — the trail made the decision, not fear or greed." },
    ],
    caption:
      "As price makes higher lows, drag the stop up underneath each one (the red steps). You never widen it. When price finally turns and tags the trailed stop at ₹124, you exit with most of the move banked — the trail decides the exit for you, not emotion.",
  },
];

function CandleChart({ ex }: { ex: Example }) {
  const W = 900;
  const H = 280;
  const padL = 10;
  const padR = 10;
  const padT = 14;
  const padB = 14;
  const n = ex.candles.length;

  const vals: number[] = [];
  ex.candles.forEach((k) => vals.push(k.h, k.l));
  ex.lines.forEach((l) => vals.push(l.price));
  ex.markers.forEach((m) => vals.push(m.price));
  ex.trail?.forEach((t) => vals.push(t.price));
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  const span = max - min || 1;
  min -= span * 0.1;
  max += span * 0.12;

  const slot = (W - padL - padR) / n;
  const bodyW = Math.min(slot * 0.6, 22);
  const cx = (i: number) => padL + slot * (i + 0.5);
  const y = (p: number) => padT + ((H - padT - padB) * (max - p)) / (max - min);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={ex.title} style={{ display: "block" }}>
      <rect x={0} y={0} width={W} height={H} rx={10} fill="rgba(24,168,122,0.022)" />
      {[0, 1, 2, 3].map((g) => {
        const yy = padT + ((H - padT - padB) * g) / 3;
        return <line key={g} x1={0} y1={yy} x2={W} y2={yy} stroke="rgba(14,27,46,0.05)" strokeWidth={1} />;
      })}

      {/* horizontal levels */}
      {ex.lines.map((l, i) => {
        const yy = y(l.price);
        return (
          <g key={i} style={{ cursor: "help" }}>
            <title>{l.tip ?? l.label}</title>
            <rect x={0} y={yy - 9} width={W} height={18} fill="transparent" />
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke={l.color} strokeWidth={1.6} strokeDasharray="7 5" />
            <rect x={padL} y={yy - 9} width={l.label.length * 6.4 + 12} height={17} rx={3.5} fill={l.color} />
            <text x={padL + 6} y={yy + 3.5} fontSize={11} fontWeight={700} fill="#fff">{l.label}</text>
          </g>
        );
      })}

      {/* trailing-stop steps */}
      {ex.trail &&
        ex.trail.map((t, i) => {
          const next = ex.trail![i + 1];
          const x1 = cx(t.i);
          const x2 = next ? cx(next.i) : W - padR;
          const yy = y(t.price);
          return (
            <g key={`t${i}`} style={{ cursor: "help" }}>
              <title>{`Trailing stop at ₹${t.price} — as price makes higher lows, the stop is dragged up underneath (never wider), locking in more profit at each step.`}</title>
              <line x1={x1} y1={yy - 6} x2={x2} y2={yy + 6} stroke="transparent" strokeWidth={14} />
              <line x1={x1} y1={yy} x2={x2} y2={yy} stroke={RED} strokeWidth={1.8} strokeDasharray="6 4" />
              {next && <line x1={x2} y1={yy} x2={x2} y2={y(next.price)} stroke={RED} strokeWidth={1.4} strokeDasharray="2 3" />}
              {i === 0 && <text x={x1 + 4} y={yy - 5} fontSize={10.5} fontWeight={700} fill={RED}>trailing stop ↑</text>}
            </g>
          );
        })}

      {/* candles */}
      {ex.candles.map((k, i) => {
        const up = k.c >= k.o;
        const x = cx(i);
        const yTop = y(Math.max(k.o, k.c));
        const yBot = y(Math.min(k.o, k.c));
        return (
          <g key={i}>
            <line x1={x} y1={y(k.h)} x2={x} y2={y(k.l)} stroke={up ? GREEN_L : RED_L} strokeWidth={1.3} />
            <rect x={x - bodyW / 2} y={yTop} width={bodyW} height={Math.max(1.5, yBot - yTop)} rx={1.5} fill={up ? GREEN : RED} />
          </g>
        );
      })}

      {/* entry / exit markers */}
      {ex.markers.map((m, i) => {
        const x = cx(m.i);
        const yy = y(m.price);
        const col = m.dir === "buy" ? GREEN : m.dir === "sell" ? BLUE : RED;
        const tri =
          m.dir === "buy"
            ? `M ${x} ${yy + 14} L ${x - 6} ${yy + 24} L ${x + 6} ${yy + 24} Z`
            : `M ${x} ${yy - 14} L ${x - 6} ${yy - 24} L ${x + 6} ${yy - 24} Z`;
        const labY = m.dir === "buy" ? yy + 38 : yy - 30;
        return (
          <g key={`m${i}`} style={{ cursor: "help" }}>
            <title>{m.tip ?? m.label}</title>
            <circle cx={x} cy={yy} r={16} fill="transparent" />
            {m.dir === "exit" ? (
              <g stroke={col} strokeWidth={2.4}>
                <line x1={x - 6} y1={yy - 6} x2={x + 6} y2={yy + 6} />
                <line x1={x - 6} y1={yy + 6} x2={x + 6} y2={yy - 6} />
              </g>
            ) : (
              <path d={tri} fill={col} />
            )}
            <text
              x={Math.max(40, Math.min(W - 60, x))}
              y={labY}
              fontSize={11}
              fontWeight={700}
              fill={col}
              textAnchor="middle"
              stroke="#fff"
              strokeWidth={3}
              paintOrder="stroke"
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RiskManagementCharts() {
  return (
    <section className="glass card-pad">
      <h2 style={{ fontSize: 18, margin: "0 0 4px" }}>See it on a chart: entries &amp; exits</h2>
      <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
        Demo company (made-up prices). <strong style={{ color: GREEN }}>Green ▲</strong> = a buy, <strong style={{ color: BLUE }}>blue ▼</strong> = a partial sell, <strong style={{ color: RED }}>red ✕</strong> = stopped out.
      </p>

      <div style={{ display: "grid", gap: 22 }}>
        {EXAMPLES.map((ex) => (
          <div key={ex.title} style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "var(--surface-2, #fff)" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>{ex.title}</div>
            <CandleChart ex={ex} />
            <p style={{ margin: "10px 2px 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)" }}>{ex.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
