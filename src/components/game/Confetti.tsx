"use client";

import { useEffect, useRef } from "react";

// Canvas confetti burst — fires once on mount, then stops. Respects
// prefers-reduced-motion (renders nothing). No dependencies.
interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number;
}

const COLORS = ["#6366f1", "#8b5cf6", "#fbbf24", "#22c55e", "#fb923c", "#f472b6"];

export default function Confetti({ count = 140 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H * 0.38;
    const ps: P[] = Array.from({ length: count }, () => {
      const ang = Math.random() * Math.PI * 2;
      const sp = 4 + Math.random() * 9;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 4,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        size: 6 + Math.random() * 7,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1,
      };
    });

    let raf = 0;
    let frames = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      frames++;
      for (const p of ps) {
        p.vy += 0.22; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.008;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (frames < 220) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  return <canvas ref={ref} className="reward-confetti" aria-hidden="true" />;
}
