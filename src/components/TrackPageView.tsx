"use client";

import { useEffect } from "react";

export default function TrackPageView() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer || null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
