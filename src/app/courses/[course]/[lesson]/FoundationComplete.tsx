"use client";

import { useState } from "react";
import RewardOverlay from "@/components/game/RewardOverlay";
import type { RewardResult } from "@/lib/gamification";

// Marks a text/foundation lesson complete (awards streak + badges) and plays
// the celebration — the non-pattern counterpart to the Pattern Player's button.
export default function FoundationComplete({
  onComplete,
  nextHref,
  nextLabel,
}: {
  onComplete: () => Promise<RewardResult | null>;
  nextHref?: string;
  nextLabel?: string;
}) {
  const [reward, setReward] = useState<RewardResult | null>(null);
  const [completed, setCompleted] = useState(false);

  const handle = async () => {
    const r = await onComplete();
    setCompleted(true);
    if (r && r.awarded) setReward(r);
  };

  return (
    <>
      <button className="btn btn-primary tap" onClick={handle} disabled={completed}>
        {completed ? "✓ Completed" : "Mark as complete"}
      </button>
      {reward && (
        <RewardOverlay result={reward} onClose={() => setReward(null)} nextHref={nextHref} nextLabel={nextLabel} />
      )}
    </>
  );
}
