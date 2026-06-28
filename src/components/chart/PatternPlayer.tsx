"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { OHLC } from "@/lib/classify";
import type { Pattern, Callout } from "@/data/patterns";
import {
  buildIntrabarPath,
  partialCandle,
  priceScale,
  priceToY,
  pressure,
} from "@/lib/candleMath";

// Per-candle on-screen duration (seconds at 1x). Deliberately slow so a
// beginner can actually watch each candle form, tick by tick. The pattern
// candles linger longest. Use the speed buttons (0.5×/1×/2×) to adjust.
const LEAD_DUR = 1.9;
const PAT_DUR = 5.0;
const OUT_DUR = 2.7;

const BULL = "#16a34a";
const BEAR = "#dc2626";
const BULL_LITE = "#22c55e";
const BEAR_LITE = "#ef4444";

type Phase = "idle" | "leadin" | "pattern" | "patternDone" | "outcome" | "done";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
}

interface Layout {
  cssW: number;
  cssH: number;
  padL: number;
  padR: number;
  padT: number;
  padB: number;
  sw: number;
}

interface Props {
  pattern: Pattern;
  onComplete?: () => void | Promise<void>;
}

export default function PatternPlayer({ pattern, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const meterRef = useRef<HTMLDivElement | null>(null);
  const meterLabelRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const candles = pattern.candles;
  const n = candles.length;
  const patternEnd = pattern.patternStart + pattern.patternLength - 1;

  const paths = useMemo(() => candles.map((k) => buildIntrabarPath(k)), [candles]);
  const scale = useMemo(() => priceScale(candles), [candles]);

  // Animation state lives in a ref so the rAF loop never reads stale values.
  const a = useRef({
    idx: 0,
    prog: 0,
    endIndex: patternEnd,
    lastT: 0,
    particles: [] as Particle[],
    glow: 0, // 0..1 confirm glow
    burstFired: false,
  });
  const layoutRef = useRef<Layout | null>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [soundOn, setSoundOn] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [annoVisible, setAnnoVisible] = useState(false);
  const [scrub, setScrub] = useState(0); // 0..1 across the unlocked timeline
  const [completed, setCompleted] = useState(false);
  const [loop, setLoop] = useState(false);
  const loopRef = useRef(false);
  loopRef.current = loop;
  const [hover, setHover] = useState<{ x: number; y: number; idx: number } | null>(null);

  // Which candle is the cursor over? Only reveal formed candles (no spoilers).
  const onHover = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    const L = layoutRef.current;
    const canvas = canvasRef.current;
    if (!L || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * L.cssW;
    const my = ((e.clientY - rect.top) / rect.height) * L.cssH;
    const idx = Math.floor((mx - L.padL) / L.sw);
    const maxFormed = a.current.idx;
    if (idx >= 0 && idx < n && idx <= maxFormed) setHover({ x: mx, y: my, idx });
    else setHover(null);
  };

  // keep mutable copies of UI state for the loop
  const ui = useRef({ playing, speed, soundOn, revealed });
  ui.current = { playing, speed, soundOn, revealed };

  // ---- canvas sizing (hi-DPI) ----
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const cssW = wrap.clientWidth;
    const cssH = Math.max(280, Math.round(cssW * 0.52));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layoutRef.current = {
      cssW,
      cssH,
      padL: 14,
      padR: 16,
      padT: 18,
      padB: 18,
      sw: (cssW - 30) / n,
    };
    draw();
  }, [n]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resize]);

  // recompute annotation positions when they appear / on resize
  const [annoPts, setAnnoPts] = useState<
    { x: number; y: number; text: string; n: number; side: "up" | "down" }[]
  >([]);

  const computeAnno = useCallback(() => {
    const L = layoutRef.current;
    if (!L) return;
    const plotH = L.cssH - L.padT - L.padB;
    const cx = (i: number) => L.padL + L.sw * (i + 0.5);
    const yOf = (v: number) => L.padT + priceToY(v, scale, plotH);
    const pts = pattern.callouts.map((c: Callout, i) => {
      const k = candles[c.candle];
      const x = cx(c.candle);
      let y = yOf((k.o + k.c) / 2);
      let side: "up" | "down" = "up";
      if (c.target === "upper") {
        y = yOf(k.h);
        side = "up";
      } else if (c.target === "lower") {
        y = yOf(k.l);
        side = "down";
      } else {
        side = i % 2 === 0 ? "up" : "down";
      }
      return { x, y, text: c.text, n: i + 1, side };
    });
    setAnnoPts(pts);
  }, [pattern.callouts, candles, scale]);

  useEffect(() => {
    if (annoVisible) computeAnno();
  }, [annoVisible, computeAnno, phase]);

  // ---- drawing ----
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const L = layoutRef.current;
    if (!canvas || !L) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { cssW, cssH, padT, padB, sw } = L;
    const plotH = cssH - padT - padB;
    const st = a.current;

    ctx.clearRect(0, 0, cssW, cssH);

    // background (clean, brand-tinted panel)
    const bg = ctx.createLinearGradient(0, 0, 0, cssH);
    bg.addColorStop(0, "rgba(24,168,122,0.045)");
    bg.addColorStop(1, "rgba(14,27,46,0.018)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cssW, cssH);

    // faint grid
    ctx.strokeStyle = "rgba(14,27,46,0.045)";
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const y = Math.round(padT + (plotH * g) / 4) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cssW, y);
      ctx.stroke();
    }

    // pattern region band — always shows which candles make up the pattern
    {
      const bx1 = L.padL + sw * pattern.patternStart;
      const bx2 = L.padL + sw * (patternEnd + 1);
      const rgb = pattern.bias === "bearish" ? "220,38,38" : pattern.bias === "bullish" ? "22,163,74" : "100,116,139";
      ctx.fillStyle = `rgba(${rgb},0.055)`;
      ctx.fillRect(bx1, padT, bx2 - bx1, plotH);
      ctx.strokeStyle = `rgba(${rgb},0.22)`;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(bx1 + 0.5, padT);
      ctx.lineTo(bx1 + 0.5, padT + plotH);
      ctx.moveTo(bx2 - 0.5, padT);
      ctx.lineTo(bx2 - 0.5, padT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(${rgb},0.9)`;
      ctx.font = "700 9px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText("PATTERN", bx1 + 5, padT + 11);
    }

    const cx = (i: number) => L.padL + sw * (i + 0.5);
    const yOf = (v: number) => padT + priceToY(v, scale, plotH);
    const bodyW = Math.min(sw * 0.56, 26);

    const drawCandle = (i: number, k: OHLC, opts?: { live?: boolean; dim?: number }) => {
      const up = k.c >= k.o;
      const col = up ? BULL : BEAR;
      const lite = up ? BULL_LITE : BEAR_LITE;
      const x = cx(i);
      const isPattern = i >= pattern.patternStart && i <= patternEnd;
      ctx.globalAlpha = opts?.dim ?? 1;

      // pattern highlight halo
      if (isPattern && (phase === "patternDone" || phase === "done" || phase === "outcome")) {
        ctx.save();
        ctx.shadowColor = up ? "rgba(34,197,94,0.55)" : "rgba(239,68,68,0.55)";
        ctx.shadowBlur = 16 + st.glow * 18;
        ctx.fillStyle = "rgba(255,255,255,0.0)";
        ctx.fillRect(x - bodyW / 2, yOf(k.h), bodyW, yOf(k.l) - yOf(k.h));
        ctx.restore();
      }

      // wick
      ctx.strokeStyle = lite;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x, yOf(k.h));
      ctx.lineTo(x, yOf(k.l));
      ctx.stroke();

      // body
      const yTop = yOf(Math.max(k.o, k.c));
      const yBot = yOf(Math.min(k.o, k.c));
      const h = Math.max(1.5, yBot - yTop);
      const grad = ctx.createLinearGradient(0, yTop, 0, yTop + h);
      grad.addColorStop(0, lite);
      grad.addColorStop(1, col);
      ctx.fillStyle = grad;
      roundRect(ctx, x - bodyW / 2, yTop, bodyW, h, 3);
      ctx.fill();

      // live price marker
      if (opts?.live) {
        ctx.fillStyle = "#14233b";
        ctx.beginPath();
        ctx.arc(x, yOf(k.c), 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(20,35,59,0.22)";
        ctx.beginPath();
        ctx.moveTo(x + bodyW / 2 + 2, yOf(k.c));
        ctx.lineTo(cssW, yOf(k.c));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    if (phase === "idle" && st.idx === 0 && st.prog === 0) {
      // idle: show a faint preview of the lead-in + pattern (no outcome spoiler)
      for (let i = 0; i <= st.endIndex; i++) drawCandle(i, candles[i], { dim: 0.16 });
    } else {
      // formed candles
      for (let i = 0; i < st.idx; i++) drawCandle(i, candles[i]);
      // currently forming candle
      if (st.idx < n) {
        const live = partialCandle(candles[st.idx], paths[st.idx], st.prog);
        drawCandle(st.idx, live, { live: true });
      }
    }

    // particles
    if (st.particles.length) {
      for (const p of st.particles) {
        ctx.globalAlpha = Math.max(0, p.life / p.max);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candles, paths, scale, n, phase, pattern.patternStart, patternEnd]);

  // ---- pressure meter + classification, updated each frame via refs ----
  const updateMeter = useCallback(() => {
    const st = a.current;
    let p: number;
    if (st.idx === 0 && st.prog === 0 && !ui.current.playing) {
      p = 0.5; // idle — show a balanced market, not a misleading 100%
    } else {
      const live: OHLC = st.idx < n ? partialCandle(candles[st.idx], paths[st.idx], st.prog) : candles[n - 1];
      p = pressure(live); // 0..1 buyers
    }
    const pct = Math.round(p * 100);
    if (meterRef.current) {
      meterRef.current.style.height = `${Math.max(2, p * 100)}%`;
      meterRef.current.style.background =
        p >= 0.5
          ? `linear-gradient(180deg, ${BULL_LITE}, ${BULL})`
          : `linear-gradient(180deg, ${BEAR_LITE}, ${BEAR})`;
    }
    if (meterLabelRef.current) {
      meterLabelRef.current.textContent =
        p >= 0.5 ? `Buyers ${pct}%` : `Sellers ${100 - pct}%`;
    }
  }, [candles, paths, n]);

  // ---- the loop ----
  const durFor = useCallback(
    (i: number) => {
      if (i >= pattern.patternStart && i <= patternEnd) return PAT_DUR;
      if (i > patternEnd) return OUT_DUR;
      return LEAD_DUR;
    },
    [pattern.patternStart, patternEnd]
  );

  const stopLoop = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const frame = useCallback(
    (t: number) => {
      const st = a.current;
      const dt = st.lastT ? (t - st.lastT) / 1000 : 0;
      st.lastT = t;

      if (ui.current.playing) {
        const dur = durFor(st.idx) / ui.current.speed;
        st.prog += dt / dur;
        while (st.prog >= 1 && st.idx < st.endIndex) {
          st.prog -= 1;
          st.idx += 1;
          tick();
        }
        if (st.idx >= st.endIndex && st.prog >= 1) {
          st.prog = 1;
          st.idx = st.endIndex;
          onReachEnd();
        }
        // sync scrub slider (coarse)
        const span = st.endIndex + 1;
        setScrub(Math.min(1, (st.idx + st.prog) / span));
      }

      // glow decay
      if (st.glow > 0) st.glow = Math.max(0, st.glow - dt * 0.7);
      // particles
      if (st.particles.length) {
        for (const p of st.particles) {
          p.life -= dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 60 * dt;
        }
        st.particles = st.particles.filter((p) => p.life > 0);
      }

      updateMeter();
      draw();

      const keepGoing =
        ui.current.playing || st.particles.length > 0 || st.glow > 0;
      if (keepGoing) rafRef.current = requestAnimationFrame(frame);
      else {
        rafRef.current = null;
        st.lastT = 0;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draw, updateMeter, durFor]
  );

  const ensureLoop = useCallback(() => {
    if (rafRef.current == null) {
      a.current.lastT = 0;
      rafRef.current = requestAnimationFrame(frame);
    }
  }, [frame]);

  // discrete events --------------------------------------------------------
  function tick() {
    if (ui.current.soundOn) beep(220, 0.04, 0.05);
  }

  function fireBurst() {
    const L = layoutRef.current;
    const st = a.current;
    if (!L) return;
    const plotH = L.cssH - L.padT - L.padB;
    const cx = L.padL + L.sw * (patternEnd + 0.5);
    const k = candles[patternEnd];
    const cy = L.padT + priceToY((k.o + k.c) / 2, scale, plotH);
    const up = k.c >= k.o;
    const color = up ? BULL_LITE : BEAR_LITE;
    for (let i = 0; i < 26; i++) {
      const ang = (Math.PI * 2 * i) / 26 + Math.random() * 0.3;
      const sp = 60 + Math.random() * 120;
      st.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 30,
        life: 0.7 + Math.random() * 0.5,
        max: 1.2,
        color,
      });
    }
    st.glow = 1;
    if (ui.current.soundOn) confirmChord();
  }

  function onReachEnd() {
    const st = a.current;
    setPlaying(false);
    if (st.endIndex === patternEnd && !ui.current.revealed) {
      setPhase("patternDone");
      setAnnoVisible(true);
      if (!st.burstFired) {
        st.burstFired = true;
        fireBurst();
      }
    } else {
      setPhase("done");
    }
    // auto-replay when Loop is on
    if (loopRef.current) {
      setTimeout(() => {
        if (loopRef.current) restartAndPlay();
      }, 1600);
    }
  }

  // update phase label as candles advance through lead-in -> pattern
  useEffect(() => {
    // nothing; phase transitions handled at events
  }, []);

  // controls ---------------------------------------------------------------
  const play = () => {
    if (phase === "done") return restartAndPlay();
    if (a.current.idx === 0 && a.current.prog === 0) setPhase("leadin");
    if (a.current.idx >= pattern.patternStart) setPhase("pattern");
    setPlaying(true);
    ui.current.playing = true;
    ensureLoop();
    initAudio();
  };

  const pause = () => {
    setPlaying(false);
    ui.current.playing = false;
  };

  const restartAndPlay = () => {
    reset();
    setTimeout(() => {
      setPlaying(true);
      ui.current.playing = true;
      ensureLoop();
    }, 0);
  };

  const reset = () => {
    const st = a.current;
    st.idx = 0;
    st.prog = 0;
    st.endIndex = patternEnd;
    st.particles = [];
    st.glow = 0;
    st.burstFired = false;
    st.lastT = 0;
    setScrub(0);
    setRevealed(false);
    ui.current.revealed = false;
    setAnnoVisible(false);
    setPhase("idle");
    setPlaying(false);
    ui.current.playing = false;
    draw();
    updateMeter();
  };

  const revealOutcome = () => {
    const st = a.current;
    st.endIndex = n - 1;
    setRevealed(true);
    ui.current.revealed = true;
    setPhase("outcome");
    setPlaying(true);
    ui.current.playing = true;
    ensureLoop();
  };

  const onScrub = (v: number) => {
    pause();
    const st = a.current;
    const span = st.endIndex + 1;
    const pos = v * span;
    st.idx = Math.min(st.endIndex, Math.floor(pos));
    st.prog = Math.min(1, pos - st.idx);
    setScrub(v);
    if (st.idx >= pattern.patternStart) setPhase(st.idx >= patternEnd ? "patternDone" : "pattern");
    updateMeter();
    draw();
  };

  // reveal exactly one more candle, fully formed (great for self-paced learning)
  const step = () => {
    pause();
    const st = a.current;
    if (st.idx >= st.endIndex && st.prog >= 1) return; // already at the end
    if (st.prog < 1) st.prog = 1; // finish the candle currently forming
    else if (st.idx < st.endIndex) {
      st.idx += 1;
      st.prog = 1;
    }
    setScrub(Math.min(1, (st.idx + st.prog) / (st.endIndex + 1)));
    if (st.idx >= st.endIndex && st.prog >= 1) {
      onReachEnd();
      ensureLoop(); // let the confirm burst/glow animate even while paused
    } else if (st.idx >= pattern.patternStart) {
      setPhase("pattern");
    } else {
      setPhase("leadin");
    }
    updateMeter();
    draw();
  };

  const markDone = async () => {
    setCompleted(true);
    if (onComplete) await onComplete();
  };

  // keyboard shortcuts when the player is focused
  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      playing ? pause() : play();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step();
    } else if (e.key.toLowerCase() === "r") {
      reset();
    }
  };

  // initial draw once layout ready
  useEffect(() => {
    updateMeter();
    draw();
    return () => stopLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redraw when the phase changes while paused (e.g. the idle preview after Reset)
  useEffect(() => {
    if (!ui.current.playing) {
      updateMeter();
      draw();
    }
  }, [phase, draw, updateMeter]);

  // audio helpers ----------------------------------------------------------
  function initAudio() {
    if (!audioRef.current) {
      try {
        audioRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      } catch {
        /* ignore */
      }
    }
  }
  function beep(freq: number, dur: number, vol: number) {
    const ac = audioRef.current;
    if (!ac) return;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.frequency.value = freq;
    o.type = "sine";
    g.gain.value = vol;
    o.connect(g);
    g.connect(ac.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    o.stop(ac.currentTime + dur);
  }
  function confirmChord() {
    [523.25, 659.25, 783.99].forEach((f, i) =>
      setTimeout(() => beep(f, 0.18, 0.06), i * 70)
    );
  }

  const phaseLabel: Record<Phase, string> = {
    idle: "Press play to watch it form",
    leadin: "Trend leading in…",
    pattern: `The ${pattern.name} is forming…`,
    patternDone: `${pattern.name} confirmed`,
    outcome: "What happened next…",
    done: "Outcome revealed",
  };

  return (
    <div className="glass" style={{ padding: 18, outline: "none" }} tabIndex={0} onKeyDown={onKey}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span
            className={`badge ${
              pattern.bias === "bullish" ? "badge-bull" : pattern.bias === "bearish" ? "badge-bear" : "badge-neutral"
            }`}
          >
            {pattern.bias}
          </span>
          <span className="muted" style={{ fontSize: 13 }}>
            {phaseLabel[phase]}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* legend */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11.5, color: "var(--muted)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: BULL }} /> Up
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: BEAR }} /> Down
            </span>
          </span>
          <button className="btn btn-ghost" onClick={() => setSoundOn((s) => !s)} title="Toggle sound">
            {soundOn ? "🔊 Sound on" : "🔈 Sound off"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {/* chart + annotations overlay */}
        <div ref={wrapRef} style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <canvas
            ref={canvasRef}
            onMouseMove={onHover}
            onMouseLeave={() => setHover(null)}
            style={{ display: "block", width: "100%", borderRadius: 14, cursor: "crosshair", border: "1px solid var(--border)" }}
          />

          {/* centered play button while idle */}
          {phase === "idle" && (
            <button
              onClick={play}
              aria-label="Play"
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: 68,
                height: 68,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                paddingLeft: 4,
                border: "none",
                cursor: "pointer",
                background: "var(--brand)",
                color: "#fff",
                fontSize: 26,
                boxShadow: "0 2px 8px rgba(14,27,46,0.18)",
                transition: "transform .15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ▶
            </button>
          )}

          {/* hover tooltip — read any formed candle */}
          {hover &&
            (() => {
              const L = layoutRef.current;
              if (!L) return null;
              const k = candles[hover.idx];
              const up = k.c >= k.o;
              const body = Math.abs(k.c - k.o);
              const range = k.h - k.l || 1;
              const upWick = k.h - Math.max(k.o, k.c);
              const loWick = Math.min(k.o, k.c) - k.l;
              const inPat = hover.idx >= pattern.patternStart && hover.idx <= patternEnd;
              const read =
                body / range < 0.18
                  ? "Tiny body — buyers and sellers in balance (indecision)."
                  : up
                  ? "Green: buyers won — it closed above the open."
                  : "Red: sellers won — it closed below the open.";
              const wickNote =
                loWick > body * 1.6 && loWick > upWick
                  ? " Long lower wick — sellers were rejected."
                  : upWick > body * 1.6 && upWick > loWick
                  ? " Long upper wick — buyers were rejected."
                  : "";
              const left = Math.min(Math.max(hover.x + 14, 4), L.cssW - 210);
              const top = Math.min(Math.max(hover.y - 8, 4), L.cssH - 120);
              return (
                <div
                  style={{
                    position: "absolute",
                    left,
                    top,
                    width: 200,
                    pointerEvents: "none",
                    zIndex: 5,
                    background: "rgba(14,27,46,0.96)",
                    color: "#e7ecf5",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 12,
                    lineHeight: 1.5,
                    boxShadow: "0 12px 30px rgba(14,27,46,0.35)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <b>Candle {hover.idx + 1}</b>
                    {inPat && (
                      <span style={{ color: "#18a87a", fontWeight: 700, fontSize: 10, letterSpacing: "0.05em" }}>
                        PATTERN
                      </span>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 10px", fontVariantNumeric: "tabular-nums", color: "#aeb9cc" }}>
                    <span>O {k.o.toFixed(1)}</span>
                    <span>H {k.h.toFixed(1)}</span>
                    <span>L {k.l.toFixed(1)}</span>
                    <span>C {k.c.toFixed(1)}</span>
                  </div>
                  <div style={{ marginTop: 6, color: up ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                    {read}
                    <span style={{ color: "#e7ecf5", fontWeight: 400 }}>{wickNote}</span>
                  </div>
                </div>
              );
            })()}

          {/* annotation chips */}
          {annoVisible &&
            annoPts.map((p, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  transition: `opacity .35s ease ${i * 0.18}s, transform .35s ease ${i * 0.18}s`,
                  opacity: 1,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "var(--brand)",
                      boxShadow: "0 0 0 3px rgba(24,168,122,0.25)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ width: 22, height: 1, background: "var(--border-strong)" }} />
                  <span
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 8,
                      padding: "5px 9px",
                      fontSize: 11.5,
                      maxWidth: 190,
                      lineHeight: 1.3,
                      color: "var(--text)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <b style={{ color: "var(--brand-2)" }}>{p.n}.</b> {p.text}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* pressure meter */}
        <div style={{ width: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 11, color: "var(--faint)" }}>Pressure</div>
          <div
            style={{
              position: "relative",
              flex: 1,
              width: 18,
              borderRadius: 999,
              background: "var(--surface-3)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column-reverse",
              minHeight: 180,
            }}
          >
            <div ref={meterRef} style={{ width: "100%", height: "50%", background: BULL }} />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 1,
                background: "rgba(20,35,59,0.18)",
              }}
            />
          </div>
          <div ref={meterLabelRef} style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", width: 60 }}>
            Buyers 50%
          </div>
        </div>
      </div>

      {/* timeline scrub */}
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(scrub * 1000)}
        onChange={(e) => onScrub(Number(e.target.value) / 1000)}
        style={{ width: "100%", marginTop: 14, accentColor: "var(--brand)" }}
        aria-label="Scrub timeline"
      />

      {/* controls */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 10 }}>
        {playing ? (
          <button className="btn" onClick={pause}>
            ⏸ Pause
          </button>
        ) : (
          <button className="btn btn-primary" onClick={play}>
            ▶ {phase === "done" ? "Replay" : "Play"}
          </button>
        )}
        <button className="btn btn-ghost" onClick={step} title="Reveal one candle (→)" disabled={phase === "done" || (revealed && phase !== "outcome")}>
          ⏭ Step
        </button>
        <button className="btn btn-ghost" onClick={reset}>
          ↺ Reset
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => setLoop((v) => !v)}
          title="Auto-replay"
          style={{
            borderColor: loop ? "var(--brand)" : undefined,
            color: loop ? "var(--text)" : "var(--muted)",
            background: loop ? "rgba(24,168,122,0.08)" : undefined,
          }}
        >
          🔁 Loop
        </button>

        <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
          {[0.25, 0.5, 1, 2].map((s) => (
            <button
              key={s}
              className="btn btn-ghost"
              onClick={() => setSpeed(s)}
              style={{
                padding: "8px 10px",
                borderColor: speed === s ? "var(--brand)" : undefined,
                color: speed === s ? "var(--text)" : "var(--muted)",
              }}
            >
              {s}×
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {phase === "patternDone" && !revealed && (
          <button className="btn" onClick={revealOutcome}>
            Reveal outcome →
          </button>
        )}
        {(phase === "done" || revealed) && (
          <button className="btn btn-primary" onClick={markDone} disabled={completed}>
            {completed ? "✓ Lesson complete" : "Mark lesson complete"}
          </button>
        )}
      </div>

      {/* shortcut hint */}
      <div style={{ marginTop: 8, fontSize: 11, color: "var(--faint)" }}>
        Tip: click the chart, then use <b>Space</b> play/pause · <b>→</b> step one candle · <b>R</b> reset. Hover any candle to read it.
      </div>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
