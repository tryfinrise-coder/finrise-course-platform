"use client";

import { useEffect } from "react";

interface Props {
  event: string;
  params?: Record<string, unknown>;
}

// Fires a single Meta Pixel fbq("track", ...) on mount.
// Drop into any server component to fire pixel events without converting the
// whole page to a client component.
export default function PixelEvent({ event, params }: Props) {
  useEffect(() => {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("track", event, params ?? {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
