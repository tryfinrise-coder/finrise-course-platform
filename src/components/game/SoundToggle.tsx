"use client";

import { useEffect, useState } from "react";
import { isMuted, setMuted, onMuteChange, sfx } from "@/lib/sound";

// Sound on/off toggle for the top nav. Persists to localStorage via lib/sound.
export default function SoundToggle() {
  const [muted, setMutedState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
    setReady(true);
    return onMuteChange(setMutedState);
  }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    if (!next) sfx.click();
  };

  // Avoid hydration mismatch: render a stable icon until mounted.
  const label = !ready ? "Sound" : muted ? "Sound off" : "Sound on";

  return (
    <button
      className="btn btn-ghost tap"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      title={label}
      style={{ padding: "9px 11px" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
        />
        {ready && !muted ? (
          <path
            d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M16 9l4 6M20 9l-4 6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
