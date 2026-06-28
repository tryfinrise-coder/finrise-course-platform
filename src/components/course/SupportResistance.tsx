// Six demo "company" CANDLESTICK charts that teach support & resistance.
// All data is fictional and generated deterministically (seeded) so the
// server and client render identically — no Math.random in render.
const INK = "#0e1b2e";
const GREEN = "#16a34a";
const GREEN_L = "#22c55e";
const RED = "#dc2626";
const RED_L = "#ef4444";
const FLIP = "#7c3aed";

interface OHLC {
  o: number;
  h: number;
  l: number;
  c: number;
}

// deterministic RNG
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// build a candle series that walks through price waypoints (so the bounces
// off support / rejections at resistance land where we want them)
function genCandles(waypoints: number[], n: number, seed: number, vol: number): OHLC[] {
  const rng = mulberry32(seed);
  const segs = waypoints.length - 1;
  const closes: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * segs;
    const s = Math.min(segs - 1, Math.floor(t));
    const f = t - s;
    const base = waypoints[s] + (waypoints[s + 1] - waypoints[s]) * f;
    closes.push(base + (rng() * 2 - 1) * vol);
  }
  const out: OHLC[] = [];
  let prev = closes[0];
  for (let i = 0; i < n; i++) {
    const c = closes[i];
    const o = i === 0 ? c - (rng() * 2 - 1) * vol * 0.6 : prev + (rng() * 2 - 1) * vol * 0.45;
    const h = Math.max(o, c) + rng() * vol * 1.4;
    const l = Math.min(o, c) - rng() * vol * 1.4;
    out.push({ o, h, l, c });
    prev = c;
  }
  return out;
}

interface Example {
  company: string;
  ticker: string;
  candles: OHLC[];
  support?: number;
  resistance?: number;
  flip?: number;
  trend?: { from: number; to: number; kind: "support" | "resistance" };
  caption: string;
}

const N = 34;
const EXAMPLES: Example[] = [
  {
    company: "Apex Motors",
    ticker: "APEX",
    candles: genCandles([122, 138, 103, 139, 101, 138, 104, 137, 102, 136], N, 11, 3),
    support: 100,
    resistance: 140,
    caption:
      "Range-bound. Price stalls and turns down every time it nears ₹140 (resistance) and bounces up every time it nears ₹100 (support). Notice the rejection wicks poking into each line.",
  },
  {
    company: "NovaTech",
    ticker: "NOVA",
    candles: genCandles([120, 148, 134, 149, 138, 150, 162, 156, 176], N, 23, 3),
    resistance: 150,
    caption:
      "Breakout. After being rejected at ₹150 several times, a strong green candle closes above it. Old resistance now tends to act as new support on any pull-back.",
  },
  {
    company: "Orbit Airlines",
    ticker: "ORBT",
    candles: genCandles([124, 96, 112, 92, 106, 91, 78, 84, 67], N, 47, 3),
    support: 90,
    caption:
      "Breakdown. The ₹90 floor held twice, then a big red candle closes below it. Once support breaks, it often becomes a ceiling — sellers are now in control.",
  },
  {
    company: "Summit Bank",
    ticker: "SMMT",
    candles: genCandles([100, 119, 109, 121, 135, 124, 120, 133, 141], N, 71, 2.6),
    flip: 120,
    caption:
      "Role reversal (flip). ₹120 capped price as resistance, then price broke above it. On the retest, that same ₹120 level held as support and price pushed higher.",
  },
  {
    company: "GreenLeaf Foods",
    ticker: "GRNL",
    candles: genCandles([80, 96, 86, 106, 95, 118, 106, 130, 119, 142], N, 88, 2.8),
    trend: { from: 76, to: 122, kind: "support" },
    caption:
      "Uptrend. Higher highs and higher lows. Connect the rising lows to draw a sloped support trendline — buyers keep stepping in on the dips along that line.",
  },
  {
    company: "Pixel Games",
    ticker: "PXGM",
    candles: genCandles([140, 122, 132, 110, 120, 98, 108, 86, 96, 76], N, 103, 2.8),
    trend: { from: 144, to: 100, kind: "resistance" },
    caption:
      "Downtrend. Lower highs and lower lows. Connect the falling highs to draw a sloped resistance trendline — sellers keep hitting the rallies into that line.",
  },
];

function CandleChart({ ex }: { ex: Example }) {
  const W = 920;
  const H = 300;
  const padL = 10;
  const padR = 10;
  const padT = 16;
  const padB = 16;
  const n = ex.candles.length;

  const vals: number[] = [];
  ex.candles.forEach((k) => vals.push(k.h, k.l));
  if (ex.support != null) vals.push(ex.support);
  if (ex.resistance != null) vals.push(ex.resistance);
  if (ex.flip != null) vals.push(ex.flip);
  if (ex.trend) vals.push(ex.trend.from, ex.trend.to);
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  const span = max - min || 1;
  min -= span * 0.08;
  max += span * 0.08;

  const slot = (W - padL - padR) / n;
  const bodyW = slot * 0.6;
  const cx = (i: number) => padL + slot * (i + 0.5);
  const y = (p: number) => padT + ((H - padT - padB) * (max - p)) / (max - min);

  const Level = ({ price, kind, color, text }: { price: number; kind: string; color: string; text: string }) => {
    const yy = y(price);
    const tip =
      kind === "support"
        ? `Support at ₹${price}: a price floor where buyers keep stepping in — price tends to bounce up from here.`
        : `Resistance at ₹${price}: a price ceiling where sellers keep appearing — price tends to stall and turn down here.`;
    return (
      <g style={{ cursor: "help" }}>
        <title>{tip}</title>
        <rect x={0} y={yy - 9} width={W} height={18} fill="transparent" />
        <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke={color} strokeWidth={1.6} strokeDasharray="7 5" />
        <rect x={padL} y={yy - 9} width={text.length * 6.6 + 12} height={17} rx={3.5} fill={color} />
        <text x={padL + 6} y={yy + 3.5} fontSize={11} fontWeight={700} fill="#fff">{text}</text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${ex.company} candlestick chart`} style={{ display: "block" }}>
      <rect x={0} y={0} width={W} height={H} rx={10} fill="rgba(24,168,122,0.025)" />
      {/* gridlines */}
      {[0, 1, 2, 3, 4].map((g) => {
        const yy = padT + ((H - padT - padB) * g) / 4;
        return <line key={g} x1={0} y1={yy} x2={W} y2={yy} stroke="rgba(14,27,46,0.05)" strokeWidth={1} />;
      })}

      {/* candles */}
      {ex.candles.map((k, i) => {
        const up = k.c >= k.o;
        const col = up ? GREEN : RED;
        const lite = up ? GREEN_L : RED_L;
        const x = cx(i);
        const yTop = y(Math.max(k.o, k.c));
        const yBot = y(Math.min(k.o, k.c));
        return (
          <g key={i}>
            <line x1={x} y1={y(k.h)} x2={x} y2={y(k.l)} stroke={lite} strokeWidth={1.4} />
            <rect x={x - bodyW / 2} y={yTop} width={bodyW} height={Math.max(1.5, yBot - yTop)} rx={1.5} fill={col} />
          </g>
        );
      })}

      {/* support / resistance / flip lines */}
      {ex.support != null && <Level price={ex.support} kind="support" color={GREEN} text={`Support ₹${ex.support}`} />}
      {ex.resistance != null && <Level price={ex.resistance} kind="resistance" color={RED} text={`Resistance ₹${ex.resistance}`} />}
      {ex.flip != null && <Level price={ex.flip} kind="flip" color={FLIP} text={`₹${ex.flip}  Resistance → Support`} />}

      {/* sloped trendline */}
      {ex.trend && (
        <g>
          <line
            x1={cx(0)}
            y1={y(ex.trend.from)}
            x2={cx(n - 1)}
            y2={y(ex.trend.to)}
            stroke={ex.trend.kind === "support" ? GREEN : RED}
            strokeWidth={1.8}
            strokeDasharray="7 5"
          />
          {(() => {
            const lx = ex.trend.kind === "support" ? cx(1) : W - padR - 150;
            const ly = ex.trend.kind === "support" ? y(ex.trend.from) + 6 : y(ex.trend.to) - 22;
            const txt = ex.trend.kind === "support" ? "Rising support trendline" : "Falling resistance trendline";
            return (
              <>
                <rect x={lx} y={ly} width={txt.length * 6.4 + 12} height={17} rx={3.5} fill={ex.trend.kind === "support" ? GREEN : RED} />
                <text x={lx + 6} y={ly + 12} fontSize={11} fontWeight={700} fill="#fff">{txt}</text>
              </>
            );
          })()}
        </g>
      )}
    </svg>
  );
}

export default function SupportResistance() {
  return (
    <section className="glass card-pad">
      <h2 style={{ fontSize: 18, margin: "0 0 4px" }}>Practice on real-looking candle charts</h2>
      <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
        Six demo companies (made-up names &amp; prices). The <strong style={{ color: GREEN }}>green dashed line</strong> is{" "}
        <strong>support</strong> (a floor where buyers step in), the <strong style={{ color: RED }}>red dashed line</strong> is{" "}
        <strong>resistance</strong> (a ceiling where sellers step in). Try covering the labels and drawing the lines yourself first.
      </p>

      <div style={{ display: "grid", gap: 22 }}>
        {EXAMPLES.map((ex, i) => (
          <div key={ex.ticker} style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "var(--surface-2, #fff)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: INK, borderRadius: 6, padding: "2px 8px" }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{ex.company}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--faint)", letterSpacing: "0.06em" }}>{ex.ticker}</span>
            </div>
            <CandleChart ex={ex} />
            <p style={{ margin: "10px 2px 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)" }}>{ex.caption}</p>
          </div>
        ))}
      </div>

      <p style={{ margin: "18px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)" }}>
        <strong>How to draw them yourself:</strong> find prices the chart has turned away from <em>more than once</em>. Connect the
        highs for resistance and the lows for support (a sloped line in a trend, a flat line in a range). A candlestick signal — a
        hammer, an engulfing — is far more reliable when it forms <em>right at</em> one of these lines.
      </p>
    </section>
  );
}
