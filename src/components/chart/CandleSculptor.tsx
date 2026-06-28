"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { classifyCandle, type OHLC } from "@/lib/classify";

const MIN = 70;
const MAX = 130;
const BULL = "#16a34a";
const BEAR = "#dc2626";

export default function CandleSculptor() {
  const [k, setK] = useState<OHLC>({ o: 100, h: 112, l: 88, c: 101 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const cls = useMemo(() => classifyCandle(k), [k]);

  // Adjust one leg, keeping the candle valid (high ≥ body top, low ≤ body bottom).
  const set = (field: keyof OHLC, value: number) => {
    setK((prev) => {
      const next = { ...prev, [field]: value };
      next.h = Math.max(next.h, next.o, next.c);
      next.l = Math.min(next.l, next.o, next.c);
      return next;
    });
  };

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const cssW = wrap.clientWidth;
      const cssH = 320;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const padT = 24;
      const padB = 24;
      const plotH = cssH - padT - padB;
      const yOf = (v: number) => padT + plotH - ((v - MIN) / (MAX - MIN)) * plotH;
      const x = cssW / 2;
      const bodyW = 64;

      // grid
      ctx.strokeStyle = "rgba(20,35,59,0.07)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const y = padT + (plotH * g) / 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cssW, y);
        ctx.stroke();
      }

      const up = k.c >= k.o;
      const col = up ? BULL : BEAR;

      // wick
      ctx.strokeStyle = up ? "#22c55e" : "#ef4444";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x, yOf(k.h));
      ctx.lineTo(x, yOf(k.l));
      ctx.stroke();

      // body
      const yTop = yOf(Math.max(k.o, k.c));
      const yBot = yOf(Math.min(k.o, k.c));
      const h = Math.max(2, yBot - yTop);
      ctx.fillStyle = col;
      ctx.shadowColor = up ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)";
      ctx.shadowBlur = 18;
      ctx.fillRect(x - bodyW / 2, yTop, bodyW, h);
      ctx.shadowBlur = 0;

      // OHLC tick labels
      ctx.font = "600 11px ui-sans-serif, system-ui";
      ctx.fillStyle = "rgba(20,35,59,0.75)";
      const label = (text: string, v: number, align: "left" | "right") => {
        const y = yOf(v);
        ctx.textAlign = align;
        ctx.fillText(text, align === "left" ? x + bodyW / 2 + 8 : x - bodyW / 2 - 8, y + 3);
      };
      label(`H ${k.h.toFixed(1)}`, k.h, "left");
      label(`L ${k.l.toFixed(1)}`, k.l, "left");
      label(`O ${k.o.toFixed(1)}`, k.o, "right");
      label(`C ${k.c.toFixed(1)}`, k.c, "right");
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [k]);

  const biasClass =
    cls.bias === "bullish" ? "badge-bull" : cls.bias === "bearish" ? "badge-bear" : "badge-neutral";

  const sliders: { label: string; field: keyof OHLC }[] = [
    { label: "High", field: "h" },
    { label: "Open", field: "o" },
    { label: "Close", field: "c" },
    { label: "Low", field: "l" },
  ];

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div ref={wrapRef} style={{ flex: "1 1 280px", minWidth: 260 }}>
          <canvas ref={canvasRef} style={{ display: "block", width: "100%", borderRadius: 12 }} />
        </div>

        <div style={{ flex: "1 1 280px", minWidth: 260, display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: 14 }}>
            <span className={`badge ${biasClass}`}>{cls.bias}</span>
            <h3 style={{ fontSize: 22, margin: "10px 0 4px" }}>{cls.name}</h3>
            <p style={{ margin: 0, fontSize: 14 }}>{cls.note}</p>
          </div>

          <div style={{ marginTop: "auto", display: "grid", gap: 12 }}>
            {sliders.map((s) => (
              <div key={s.field}>
                <label style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{s.label}</span>
                  <span className="faint">{k[s.field].toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={0.5}
                  value={k[s.field]}
                  onChange={(e) => set(s.field, Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--brand)" }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <Preset label="Doji" onClick={() => setK({ o: 100, h: 106, l: 94, c: 100.2 })} />
            <Preset label="Hammer" onClick={() => setK({ o: 100, h: 101, l: 88, c: 100.5 })} />
            <Preset label="Shooting Star" onClick={() => setK({ o: 100, h: 113, l: 99.5, c: 100.4 })} />
            <Preset label="Marubozu" onClick={() => setK({ o: 92, h: 110, l: 92, c: 110 })} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Preset({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="btn btn-ghost" style={{ padding: "7px 11px", fontSize: 12 }} onClick={onClick}>
      {label}
    </button>
  );
}
