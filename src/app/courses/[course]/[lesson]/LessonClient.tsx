"use client";

import { useState } from "react";
import PatternPlayer from "@/components/chart/PatternPlayer";
import RewardOverlay from "@/components/game/RewardOverlay";
import type { Pattern } from "@/data/patterns";
import type { RewardResult } from "@/lib/gamification";

// Just the interactive player + the post-completion celebration. The static
// teaching content (anatomy diagram, how-to-read, key idea, outcome) lives in
// the server-rendered lesson page around this component.
export default function LessonClient({
  pattern,
  onComplete,
  nextHref,
  nextLabel,
}: {
  pattern: Pattern;
  onComplete: () => Promise<RewardResult | null>;
  nextHref?: string;
  nextLabel?: string;
}) {
  const [reward, setReward] = useState<RewardResult | null>(null);

  const handleComplete = async () => {
    const result = await onComplete();
    if (result && result.awarded) setReward(result);
  };

  return (
    <>
      <PatternPlayer pattern={pattern} onComplete={handleComplete} />
      {reward && (
        <RewardOverlay
          result={reward}
          onClose={() => setReward(null)}
          nextHref={nextHref}
          nextLabel={nextLabel}
        />
      )}
    </>
  );
}
