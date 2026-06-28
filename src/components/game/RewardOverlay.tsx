"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { RewardResult } from "@/lib/gamification";
import { sfx } from "@/lib/sound";
import Confetti from "./Confetti";

// The post-lesson celebration. Plays sound, fires confetti, and announces the
// streak, daily goal, and any newly unlocked badges. (No XP/levels — those are
// not surfaced in the student portal.)
export default function RewardOverlay({
  result,
  onClose,
  nextHref,
  nextLabel,
}: {
  result: RewardResult;
  onClose: () => void;
  nextHref?: string;
  nextLabel?: string;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    sfx.complete();
    result.newBadges.forEach((_, i) => setTimeout(() => sfx.badge(), 500 + i * 320));
    closeRef.current?.focus();
  }, [result]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <Confetti />
      <div className="reward-overlay" role="dialog" aria-modal="true" aria-label="Lesson complete" onClick={onClose}>
        <div className="reward-card" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 8 }}>✅</div>
          <div style={{ fontSize: 13, letterSpacing: "0.12em", color: "var(--brand-2)", fontWeight: 700 }}>
            LESSON COMPLETE
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, margin: "6px 0 4px" }}>Nicely done!</h3>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 8 }}>
            {result.streak > 0 && (
              <span className="chip" style={{ background: "rgba(245,158,11,0.12)", borderColor: "rgba(245,158,11,0.4)", color: "#b45309" }}>
                🔥 {result.streak}-day streak
              </span>
            )}
            {result.goalJustMet && (
              <span className="chip chip-bull">🎯 Daily goal reached</span>
            )}
          </div>

          {result.newBadges.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div className="faint" style={{ fontSize: 12, marginBottom: 8 }}>
                {result.newBadges.length === 1 ? "Badge unlocked" : "Badges unlocked"}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {result.newBadges.map((b, i) => (
                  <div
                    key={b.key}
                    className="rise"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, animationDelay: `${0.15 + i * 0.15}s` }}
                  >
                    <div className="badge-face" style={{ width: 50, height: 50, fontSize: 26 }}>{b.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{b.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "center" }}>
            <button ref={closeRef} className="btn btn-ghost tap" onClick={onClose}>
              Keep reviewing
            </button>
            {nextHref && (
              <Link href={nextHref} className="btn btn-primary tap" onClick={() => sfx.click()}>
                {nextLabel || "Next lesson"} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
