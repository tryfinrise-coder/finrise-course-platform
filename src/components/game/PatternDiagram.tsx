import type { Pattern } from "@/data/patterns";

// A clean, static SVG schematic of a pattern's candles — the "anatomy" drawing
// shown in each lesson. Renders the full mini-series with the pattern candles
// highlighted, so learners can read the shape without animation. Green = bullish
// candle, red = bearish, matching the live player.
const BULL = "#16a34a";
const BEAR = "#dc2626";

export default function PatternDiagram({ pattern }: { pattern: Pattern }) {
  const { candles, patternStart, patternLength } = pattern;
  const n = candles.length;
  const patEnd = patternStart + patternLength - 1;

  // geometry
  const slotW = 46;
  const padX = 18;
  const padY = 22;
  const plotH = 200;
  const W = padX * 2 + slotW * n;
  const H = padY * 2 + plotH;
  const bodyW = 18;

  const hi = Math.max(...candles.map((k) => k.h));
  const lo = Math.min(...candles.map((k) => k.l));
  const range = hi - lo || 1;
  const y = (v: number) => padY + ((hi - v) / range) * plotH;
  const cx = (i: number) => padX + slotW * (i + 0.5);

  const bandX = padX + slotW * patternStart;
  const bandW = slotW * patternLength;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`${pattern.name} candle anatomy`}
      style={{ display: "block", maxWidth: W, margin: "0 auto" }}
    >
      {/* pattern highlight band */}
      <rect
        x={bandX}
        y={6}
        width={bandW}
        height={H - 12}
        rx={10}
        fill="rgba(37,99,235,0.07)"
        stroke="rgba(37,99,235,0.25)"
        strokeDasharray="4 4"
      />
      <text
        x={bandX + bandW / 2}
        y={16}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#1e3a8a"
        style={{ letterSpacing: "0.08em" }}
      >
        THE PATTERN
      </text>

      {candles.map((k, i) => {
        const up = k.c >= k.o;
        const col = up ? BULL : BEAR;
        const inPattern = i >= patternStart && i <= patEnd;
        const x = cx(i);
        const yTop = y(Math.max(k.o, k.c));
        const yBot = y(Math.min(k.o, k.c));
        const bh = Math.max(2, yBot - yTop);
        return (
          <g key={i} opacity={inPattern ? 1 : 0.4}>
            <line x1={x} y1={y(k.h)} x2={x} y2={y(k.l)} stroke={col} strokeWidth={2} strokeLinecap="round" />
            <rect x={x - bodyW / 2} y={yTop} width={bodyW} height={bh} rx={3} fill={col} />
          </g>
        );
      })}
    </svg>
  );
}
