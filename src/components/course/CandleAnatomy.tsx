// A clean, labeled diagram of a single candlestick — upper wick, real body,
// lower wick, plus open / high / low / close. Pure SVG, theme-friendly.
const INK = "#0e1b2e";
const MUTED = "#51606e";
const FAINT = "#94a3b8";
const LEAD = "#cbd5e1";
const ACCENT = "#18a87a";
const GREEN = "#16a34a";
const GREEN_LITE = "#22c55e";
const RED = "#dc2626";

function Label({
  y,
  fromX,
  title,
  sub,
}: {
  y: number;
  fromX: number;
  title: string;
  sub?: string;
}) {
  const lx = 186;
  return (
    <g>
      <line x1={fromX} y1={y} x2={lx - 6} y2={y} stroke={LEAD} strokeWidth={1.4} strokeDasharray="3 3" />
      <circle cx={fromX} cy={y} r={3} fill={ACCENT} />
      <text x={lx} y={y + 4} fontSize={14} fontWeight={700} fill={INK}>{title}</text>
      {sub && (
        <text x={lx} y={y + 19} fontSize={11.5} fill={MUTED}>{sub}</text>
      )}
    </g>
  );
}

export default function CandleAnatomy() {
  // geometry of the hero (bullish, green) candle
  const wx = 122; // wick x
  const bodyX = 100;
  const bodyW = 44;
  const yHigh = 38;
  const yClose = 102; // body top (green: close on top)
  const yOpen = 232; // body bottom
  const yLow = 300;

  return (
    <svg viewBox="0 0 460 348" width="100%" role="img" aria-label="Anatomy of a candlestick" style={{ display: "block" }}>
      {/* hero candle */}
      <line x1={wx} y1={yHigh} x2={wx} y2={yClose} stroke={GREEN_LITE} strokeWidth={3} strokeLinecap="round" />
      <line x1={wx} y1={yOpen} x2={wx} y2={yLow} stroke={GREEN_LITE} strokeWidth={3} strokeLinecap="round" />
      <rect x={bodyX} y={yClose} width={bodyW} height={yOpen - yClose} rx={4} fill={GREEN} />

      {/* labels */}
      <Label y={yHigh} fromX={wx} title="High" sub="highest price reached" />
      <Label y={(yHigh + yClose) / 2} fromX={wx} title="Upper wick" sub="(upper shadow)" />
      <Label y={yClose} fromX={bodyX + bodyW} title="Close" sub="green: closes on top" />
      <Label y={(yClose + yOpen) / 2} fromX={bodyX + bodyW} title="Real body" sub="open → close" />
      <Label y={yOpen} fromX={bodyX + bodyW} title="Open" />
      <Label y={(yOpen + yLow) / 2} fromX={wx} title="Lower wick" sub="(lower shadow)" />
      <Label y={yLow} fromX={wx} title="Low" sub="lowest price reached" />

      {/* legend: green vs red */}
      <g transform="translate(0,322)">
        <rect x={28} y={2} width={12} height={18} rx={2} fill={GREEN} />
        <text x={48} y={16} fontSize={12.5} fontWeight={600} fill={INK}>Green = closed higher (bullish)</text>
        <rect x={250} y={2} width={12} height={18} rx={2} fill={RED} />
        <text x={270} y={16} fontSize={12.5} fontWeight={600} fill={INK}>Red = closed lower (bearish)</text>
      </g>

      <text x={wx} y={332} fontSize={0} fill={FAINT} />
    </svg>
  );
}
