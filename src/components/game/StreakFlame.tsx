// Streak indicator with an animated SVG flame (vector, not emoji, so it scales
// crisply and themes consistently). Presentational — safe in server components.
export default function StreakFlame({
  streak,
  size = 18,
  showZero = false,
}: {
  streak: number;
  size?: number;
  showZero?: boolean;
}) {
  const dim = streak <= 0 && !showZero;
  return (
    <span className="flame" title={`${streak}-day streak`} style={{ opacity: dim ? 0.45 : 1 }}>
      <svg
        className="flame-ico"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path
          fill="url(#flameGrad)"
          d="M12 2c1.2 3-1.8 4.6-1.8 7.2 0 1 .6 1.8 1.3 2.2.2-1.4 1-2.4 1.9-3.1-.2 1.6.7 2.5 1.6 3.4 1 1 1.7 2.1 1.7 3.7A5.7 5.7 0 0 1 12 21a5.7 5.7 0 0 1-5.7-5.7c0-2.3 1.2-3.9 2.4-5.4C10.2 8 11.6 6.2 12 2z"
        />
      </svg>
      <span style={{ fontSize: size * 0.78 }}>{streak}</span>
    </span>
  );
}
