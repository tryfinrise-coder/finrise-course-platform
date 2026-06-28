import type { Pattern } from "@/data/patterns";
import type { OHLC } from "@/lib/classify";

// A static, clearly-marked demo chart: the full price action with the pattern
// candles highlighted and labelled, so a learner can say "yes — THAT's it".
// Fully data-driven, so it works for every pattern automatically.
const GREEN = "#16a34a";
const GREEN_L = "#22c55e";
const RED = "#dc2626";
const RED_L = "#ef4444";
const SLATE = "#64748b";

export default function PatternSpotlight({ pattern }: { pattern: Pattern }) {
  const candles: OHLC[] = pattern.candles;
  const n = candles.length;
  const start = pattern.patternStart;
  const end = start + pattern.patternLength - 1;
  const biasCol = pattern.bias === "bullish" ? GREEN : pattern.bias === "bearish" ? RED : SLATE;

  const W = 760;
  const H = 300;
  const padL = 12;
  const padR = 12;
  const padT = 40; // room for the label above
  const padB = 36; // room for the bracket below

  const vals: number[] = [];
  candles.forEach((k) => vals.push(k.h, k.l));
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  const span = max - min || 1;
  min -= span * 0.06;
  max += span * 0.06;

  const slot = (W - padL - padR) / n;
  const bodyW = Math.min(slot * 0.62, 26);
  const cx = (i: number) => padL + slot * (i + 0.5);
  const y = (p: number) => padT + ((H - padT - padB) * (max - p)) / (max - min);

  const boxX1 = padL + slot * start + 1;
  const boxX2 = padL + slot * (end + 1) - 1;
  const boxCx = (boxX1 + boxX2) / 2;
  const label = pattern.name;
  const labelW = label.length * 7.2 + 22;

  // prior trend for the caption
  let trend = "";
  if (start > 0) {
    trend = candles[start - 1].c > candles[0].c ? "an up-move" : "a down-move";
  }

  return (
    <div className="glass card-pad">
      <h3 style={{ fontSize: 15, color: "var(--brand-3)", margin: "0 0 4px" }}>Spot it on a chart</h3>
      <p style={{ margin: "0 0 12px", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>
        Here is the <strong>{pattern.name}</strong> sitting inside real-looking price action. The highlighted candle
        {pattern.patternLength > 1 ? "s are" : " is"} exactly what you are hunting for.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${pattern.name} marked on a chart`} style={{ display: "block" }}>
        <rect x={0} y={0} width={W} height={H} rx={10} fill="rgba(24,168,122,0.022)" />
        {[0, 1, 2, 3].map((g) => {
          const yy = padT + ((H - padT - padB) * g) / 3;
          return <line key={g} x1={0} y1={yy} x2={W} y2={yy} stroke="rgba(14,27,46,0.05)" strokeWidth={1} />;
        })}

        {/* highlight box around the pattern candles */}
        <g style={{ cursor: "help" }}>
          <title>
            {`The ${pattern.name}${pattern.patternLength > 1 ? ` — these ${pattern.patternLength} candles` : " — this candle"} are the pattern. The dimmed candles around it are just context (the trend before, and what happened after).`}
          </title>
          <rect x={boxX1} y={padT - 6} width={boxX2 - boxX1} height={H - padT - padB + 12} rx={8} fill={biasCol} fillOpacity={0.07} stroke={biasCol} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="6 4" />
        </g>

        {/* candles (pattern = full colour, context = dimmed) */}
        {candles.map((k, i) => {
          const inPat = i >= start && i <= end;
          const up = k.c >= k.o;
          const col = up ? GREEN : RED;
          const lite = up ? GREEN_L : RED_L;
          const x = cx(i);
          const yTop = y(Math.max(k.o, k.c));
          const yBot = y(Math.min(k.o, k.c));
          return (
            <g key={i} opacity={inPat ? 1 : 0.4}>
              <line x1={x} y1={y(k.h)} x2={x} y2={y(k.l)} stroke={lite} strokeWidth={1.5} />
              <rect x={x - bodyW / 2} y={yTop} width={bodyW} height={Math.max(1.5, yBot - yTop)} rx={1.5} fill={col} />
            </g>
          );
        })}

        {/* label pill pointing down into the box */}
        <g>
          <line x1={boxCx} y1={26} x2={boxCx} y2={padT - 6} stroke={biasCol} strokeWidth={1.5} />
          <rect x={boxCx - labelW / 2} y={8} width={labelW} height={20} rx={10} fill={biasCol} />
          <text x={boxCx} y={22} fontSize={12} fontWeight={700} fill="#fff" textAnchor="middle">{label}</text>
        </g>

        {/* bracket under the pattern */}
        <g stroke={biasCol} strokeWidth={1.4} fill="none">
          <path d={`M ${boxX1} ${H - padB + 8} L ${boxX1} ${H - padB + 14} L ${boxX2} ${H - padB + 14} L ${boxX2} ${H - padB + 8}`} />
        </g>
        <text x={boxCx} y={H - padB + 28} fontSize={11} fontWeight={600} fill={biasCol} textAnchor="middle">
          {pattern.patternLength === 1 ? "the pattern (1 candle)" : `the pattern (${pattern.patternLength} candles)`}
        </text>
      </svg>

      <p style={{ margin: "10px 2px 0", fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
        When you see this shape{trend ? ` after ${trend}` : ""}, that is your <strong>{pattern.bias}</strong> signal —
        strongest when it lands at a support or resistance level.
      </p>
    </div>
  );
}
