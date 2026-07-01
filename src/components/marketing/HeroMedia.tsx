"use client";

import { useState } from "react";
import CourseCoverMockup from "./CourseCoverMockup";

function youtubeVideoId(heroVideo: string): string | null {
  const embedMatch = heroVideo.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = heroVideo.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = heroVideo.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

const wrapStyle: React.CSSProperties = {
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "#0B0E14",
  boxShadow: "0 0 60px rgba(24,168,122,0.18), 0 16px 48px rgba(0,0,0,0.55)",
  overflow: "hidden",
  position: "relative",
  paddingBottom: "56.25%",
  width: "100%",
};

const fillStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export default function HeroMedia({
  heroVideo,
  cover,
}: {
  heroVideo: string | null;
  cover: string | null;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <CourseCoverMockup />;

  if (heroVideo) {
    const videoId = youtubeVideoId(heroVideo);
    if (videoId) {
      return (
        <div style={wrapStyle}>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...fillStyle, display: "block" }}
            aria-label="Watch course preview on YouTube"
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt="Course preview"
              onError={() => setFailed(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Play button overlay */}
            <div
              style={{
                ...fillStyle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="#dc2626" width={24} height={24} aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      );
    }
  }

  if (cover) {
    return (
      <div style={wrapStyle}>
        <img
          src={cover}
          alt="Course cover"
          onError={() => setFailed(true)}
          style={{ ...fillStyle, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  return <CourseCoverMockup />;
}
