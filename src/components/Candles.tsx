// Decorative red/green candle row — a small price-action motif used across
// headers, the dashboard hero, and the login panel. Purely ornamental.
const PATTERN: { up: boolean; h: number }[] = [
  { up: true, h: 14 },
  { up: false, h: 20 },
  { up: true, h: 11 },
  { up: true, h: 24 },
  { up: false, h: 16 },
  { up: true, h: 22 },
  { up: false, h: 12 },
];

export default function Candles({
  count = PATTERN.length,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span className={`candles ${className}`} aria-hidden="true">
      {PATTERN.slice(0, count).map((c, i) => (
        <i key={i} className={c.up ? "up" : "dn"} style={{ height: c.h }} />
      ))}
    </span>
  );
}
