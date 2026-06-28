// Lightweight Web Audio sound engine — all effects are synthesized with
// oscillators, so there are no audio asset files to ship. SSR-safe: every
// browser API is guarded, and the AudioContext is created lazily on first use
// (which is always inside a user gesture, satisfying autoplay policies).

const STORAGE_KEY = "finnora_sound";

let ctx: AudioContext | null = null;
const listeners = new Set<(muted: boolean) => void>();

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "off";
}

export function setMuted(muted: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, muted ? "off" : "on");
  listeners.forEach((l) => l(muted));
  if (!muted) {
    // little confirmation blip when turning sound on
    tone({ freq: 660, dur: 0.08, vol: 0.05, type: "sine" });
  }
}

export function onMuteChange(cb: (muted: boolean) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

interface ToneOpts {
  freq: number;
  dur: number;
  vol?: number;
  type?: OscillatorType;
  delay?: number;
  glideTo?: number;
}

function tone(opts: ToneOpts): void {
  if (isMuted()) return;
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + (opts.delay ?? 0);
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = opts.type ?? "sine";
  osc.frequency.setValueAtTime(opts.freq, t0);
  if (opts.glideTo) osc.frequency.exponentialRampToValueAtTime(opts.glideTo, t0 + opts.dur);
  const v = opts.vol ?? 0.06;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(v, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + opts.dur + 0.02);
}

// --- effects ----------------------------------------------------------------

export const sfx = {
  click() {
    tone({ freq: 320, dur: 0.05, vol: 0.04, type: "triangle" });
  },
  hoverTick() {
    tone({ freq: 520, dur: 0.03, vol: 0.02, type: "sine" });
  },
  xp() {
    // quick rising ping
    tone({ freq: 740, dur: 0.12, vol: 0.05, type: "sine", glideTo: 1180 });
  },
  complete() {
    [523.25, 659.25, 783.99].forEach((f, i) =>
      tone({ freq: f, dur: 0.18, vol: 0.06, type: "sine", delay: i * 0.06 })
    );
  },
  levelUp() {
    // triumphant arpeggio up
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone({ freq: f, dur: 0.22, vol: 0.07, type: "triangle", delay: i * 0.08 })
    );
  },
  badge() {
    tone({ freq: 880, dur: 0.1, vol: 0.06, type: "sine" });
    tone({ freq: 1320, dur: 0.22, vol: 0.06, type: "sine", delay: 0.09 });
  },
  streak() {
    tone({ freq: 440, dur: 0.1, vol: 0.05, type: "sawtooth", glideTo: 880 });
  },
};
