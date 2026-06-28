"use client";

import { useEffect, useState } from "react";

// Circular level indicator. The arc fills to `progress` on mount.
export default function LevelRing({
  level,
  progress,
  size = 96,
  stroke = 8,
}: {
  level: number;
  progress: number; // 0..1 within the level
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const p = Math.max(0, Math.min(1, progress));
    const id = requestAnimationFrame(() => setOffset(circ - circ * p));
    return () => cancelAnimationFrame(id);
  }, [progress, circ]);

  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="ring-label">
        <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--faint)" }}>
          LEVEL
        </div>
        <div style={{ fontSize: size * 0.3, fontWeight: 800, color: "#fff" }}>{level}</div>
      </div>
    </div>
  );
}
