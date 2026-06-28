// Pure math for the living-candle engine. Client-safe (no imports).
//
// The key piece is buildIntrabarPath: a synthetic tick-by-tick price path for a
// single candle that starts at the open, wanders realistically, *touches the
// true high and low*, and ends exactly on the close. It is deterministic
// (seeded from the OHLC) so scrubbing and replays are identical every time.

import type { OHLC } from "./classify";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(k: OHLC): number {
  // Stable integer seed from the OHLC values.
  const s = (k.o * 1000 + k.h * 100 + k.l * 10 + k.c) * 7919;
  return Math.floor(Math.abs(s)) % 2147483647 || 1;
}

export function buildIntrabarPath(k: OHLC, steps = 64): number[] {
  const rng = mulberry32(seedFrom(k));
  const range = Math.max(k.h - k.l, 1e-9);
  const bullish = k.c >= k.o;

  // Choose where the high and low get touched. For a green candle the low tends
  // to come early and the high late; reversed for a red candle. Add jitter.
  const early = 0.18 + rng() * 0.22; // ~0.18–0.40
  const late = 0.62 + rng() * 0.22; // ~0.62–0.84
  const lowAt = bullish ? early : late;
  const highAt = bullish ? late : early;
  const lowIdx = Math.round(lowAt * (steps - 1));
  const highIdx = Math.round(highAt * (steps - 1));

  const path: number[] = new Array(steps);
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    // baseline drift open -> close
    const base = k.o + (k.c - k.o) * t;
    // layered noise that fades at the endpoints so start/end stay clean
    const env = Math.sin(Math.PI * t); // 0 at ends, 1 in middle
    const noise =
      (rng() - 0.5) * range * 0.5 * env +
      Math.sin(t * Math.PI * (3 + rng() * 3)) * range * 0.12 * env;
    path[i] = base + noise;
  }

  // Force exact touches and endpoints.
  path[0] = k.o;
  path[steps - 1] = k.c;
  path[highIdx] = k.h;
  path[lowIdx] = k.l;

  // Clamp everything into the real [low, high] band.
  for (let i = 0; i < steps; i++) {
    if (path[i] > k.h) path[i] = k.h;
    if (path[i] < k.l) path[i] = k.l;
  }
  // Re-assert endpoints/extremes in case clamping nudged neighbours.
  path[0] = k.o;
  path[steps - 1] = k.c;
  path[highIdx] = k.h;
  path[lowIdx] = k.l;
  return path;
}

// A partially-formed candle, given the intrabar path progress p in [0,1].
export function partialCandle(k: OHLC, path: number[], p: number): OHLC {
  const n = path.length;
  const upto = Math.max(1, Math.min(n, Math.round(p * n)));
  let h = -Infinity;
  let l = Infinity;
  for (let i = 0; i < upto; i++) {
    if (path[i] > h) h = path[i];
    if (path[i] < l) l = path[i];
  }
  return { o: k.o, h, l, c: path[upto - 1] };
}

export interface PriceScale {
  min: number;
  max: number;
}

export function priceScale(candles: OHLC[], padFrac = 0.08): PriceScale {
  let min = Infinity;
  let max = -Infinity;
  for (const k of candles) {
    if (k.l < min) min = k.l;
    if (k.h > max) max = k.h;
  }
  const pad = (max - min) * padFrac || 1;
  return { min: min - pad, max: max + pad };
}

// Where price `v` lands vertically inside a plot of given height (y grows down).
export function priceToY(v: number, scale: PriceScale, height: number): number {
  const t = (v - scale.min) / (scale.max - scale.min);
  return height - t * height;
}

// Bull/bear pressure in [0,1] from where the close sits within the live range.
// 0 = sellers fully in control, 1 = buyers fully in control.
export function pressure(live: OHLC): number {
  const range = Math.max(live.h - live.l, 1e-9);
  return (live.c - live.l) / range;
}
