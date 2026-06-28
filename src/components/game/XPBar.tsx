"use client";

import { useEffect, useState } from "react";

// Animated XP progress bar. Fills from 0 to `progress` on mount (CSS handles
// the easing; reduced-motion users see it appear instantly).
export default function XPBar({
  progress,
  xpIntoLevel,
  xpForLevel,
  height = 12,
  showLabel = true,
}: {
  progress: number; // 0..1
  xpIntoLevel?: number;
  xpForLevel?: number;
  height?: number;
  showLabel?: boolean;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setW(Math.max(0, Math.min(1, progress)) * 100)
    );
    return () => cancelAnimationFrame(id);
  }, [progress]);

  return (
    <div>
      <div className="progress-track" style={{ height }}>
        <div className="progress-fill xp" style={{ width: `${w}%` }} />
      </div>
      {showLabel && xpForLevel != null && (
        <div
          className="faint"
          style={{ fontSize: 11, marginTop: 5, display: "flex", justifyContent: "space-between" }}
        >
          <span>
            {Math.round(xpIntoLevel ?? 0)} / {xpForLevel} XP
          </span>
          <span>{Math.round((progress || 0) * 100)}%</span>
        </div>
      )}
    </div>
  );
}
