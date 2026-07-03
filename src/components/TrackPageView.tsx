"use client";

import { useEffect, useRef } from "react";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("_frsid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("_frsid", id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

// Persist the FIRST-touch attribution (the ad/source that first brought this
// visitor) so it's still available when they reach checkout on another page.
// Written once per browser; never overwritten by later organic visits.
function captureFirstTouch() {
  try {
    if (localStorage.getItem("_frsattr")) return;
    const params = new URLSearchParams(window.location.search);
    const hasUtm = params.get("utm_source") || params.get("utm_campaign");
    const referrer = document.referrer || null;
    // Only record once we have a real signal (a UTM tag or an external referrer).
    if (!hasUtm && !referrer) return;
    localStorage.setItem(
      "_frsattr",
      JSON.stringify({
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        referrer,
        landing: window.location.pathname,
      })
    );
  } catch {
    /* storage blocked — attribution simply won't persist */
  }
}

function sendEvent(event: string, value?: string) {
  fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: window.location.pathname,
      event,
      value: value ?? null,
      session_id: getSessionId(),
    }),
    keepalive: true,
  }).catch(() => {});
}

export default function TrackPageView() {
  const startRef = useRef(Date.now());
  const milestonesRef = useRef(new Set<number>());

  useEffect(() => {
    const sid = getSessionId();
    captureFirstTouch();

    // 1. Page view
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
        session_id: sid,
      }),
      keepalive: true,
    }).catch(() => {});

    // 2. Scroll depth — fire at 25 / 50 / 75 / 100 % milestones
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const pct = Math.round((window.scrollY / docH) * 100);
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !milestonesRef.current.has(m)) {
          milestonesRef.current.add(m);
          sendEvent("scroll_depth", `${m}%`);
        }
      }
    };

    // 3. CTA / element click tracking via [data-track] attributes
    const handleClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-track]");
      if (!el) return;
      const name = el.getAttribute("data-track") ?? "click";
      const label = el.getAttribute("data-track-label") ?? "";
      sendEvent(name, label || undefined);
    };

    // 4. Time on page — sent when tab becomes hidden or page unloads
    const sendTime = () => {
      const secs = Math.round((Date.now() - startRef.current) / 1000);
      if (secs >= 3) sendEvent("time_on_page", `${secs}s`);
    };
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        sendTime();
      } else {
        startRef.current = Date.now(); // reset timer when they return
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", sendTime);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", sendTime);
    };
  }, []);

  return null;
}
