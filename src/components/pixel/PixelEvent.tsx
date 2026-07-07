"use client";

import { useEffect } from "react";

interface Props {
  event: string;
  params?: Record<string, unknown>;
  eventId?: string; // shared with the server CAPI event so Meta can dedupe
}

// Fires a single Meta Pixel fbq("track", ...) on mount.
// Drop into any server component to fire pixel events without converting the
// whole page to a client component.
export default function PixelEvent({ event, params, eventId }: Props) {
  useEffect(() => {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      if (eventId) {
        fbq("track", event, params ?? {}, { eventID: eventId });
      } else {
        fbq("track", event, params ?? {});
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
