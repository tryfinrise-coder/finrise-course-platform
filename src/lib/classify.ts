// Pure, dependency-free single-candle classifier.
//
// Used both on the server (lessons) and the client (Candle Sculptor), so it must
// stay free of any node/server imports. Given an OHLC, it names the candle the
// way a technician would and returns a short plain-English note.

export interface OHLC {
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface Classification {
  name: string;
  note: string;
  bias: "bullish" | "bearish" | "neutral";
}

export function classifyCandle(k: OHLC): Classification {
  const high = Math.max(k.h, k.o, k.c);
  const low = Math.min(k.l, k.o, k.c);
  const range = Math.max(high - low, 1e-9);
  const body = Math.abs(k.c - k.o);
  const bodyTop = Math.max(k.o, k.c);
  const bodyBottom = Math.min(k.o, k.c);
  const upperWick = high - bodyTop;
  const lowerWick = bodyBottom - low;

  const bodyPct = body / range; // how much of the range is body
  const upperPct = upperWick / range;
  const lowerPct = lowerWick / range;
  const bullish = k.c > k.o;

  // --- Doji family: body is a tiny fraction of the range ---
  if (bodyPct <= 0.08) {
    if (upperPct >= 0.6 && lowerPct <= 0.15) {
      return {
        name: "Gravestone Doji",
        note: "Open ≈ close near the low with a long upper wick — buyers pushed up but were fully rejected. Bearish.",
        bias: "bearish",
      };
    }
    if (lowerPct >= 0.6 && upperPct <= 0.15) {
      return {
        name: "Dragonfly Doji",
        note: "Open ≈ close near the high with a long lower wick — sellers were fully rejected. Bullish.",
        bias: "bullish",
      };
    }
    if (upperPct >= 0.33 && lowerPct >= 0.33) {
      return {
        name: "Long-legged Doji",
        note: "Open ≈ close with long wicks both sides — maximum indecision; the trend may be stalling.",
        bias: "neutral",
      };
    }
    return {
      name: "Doji",
      note: "Open and close are nearly equal — buyers and sellers are balanced. Indecision.",
      bias: "neutral",
    };
  }

  // --- Marubozu: body is almost the whole range (no meaningful wicks) ---
  if (bodyPct >= 0.9) {
    return bullish
      ? {
          name: "Bullish Marubozu",
          note: "Almost all body, no wicks — buyers controlled from open to close. Strong bullish.",
          bias: "bullish",
        }
      : {
          name: "Bearish Marubozu",
          note: "Almost all body, no wicks — sellers controlled from open to close. Strong bearish.",
          bias: "bearish",
        };
  }

  // --- Hammer / Hanging Man: small body near the top, long lower wick ---
  if (bodyPct <= 0.4 && lowerWick >= 2 * body && upperPct <= 0.15) {
    return {
      name: "Hammer / Hanging Man",
      note: "Small body up top with a long lower wick (~2×+ the body). After a downtrend it's a bullish Hammer; after an uptrend, a bearish Hanging Man.",
      bias: "bullish",
    };
  }

  // --- Inverted Hammer / Shooting Star: small body near the low, long upper wick ---
  if (bodyPct <= 0.4 && upperWick >= 2 * body && lowerPct <= 0.15) {
    return {
      name: "Inverted Hammer / Shooting Star",
      note: "Small body near the low with a long upper wick. After a downtrend it's a bullish Inverted Hammer; after an uptrend, a bearish Shooting Star.",
      bias: "bearish",
    };
  }

  // --- Spinning Top: small body, wicks on both sides ---
  if (bodyPct <= 0.35 && upperPct >= 0.2 && lowerPct >= 0.2) {
    return {
      name: "Spinning Top",
      note: "Small body with wicks both sides — indecision, but less extreme than a doji.",
      bias: "neutral",
    };
  }

  // --- Otherwise a plain directional candle ---
  return bullish
    ? {
        name: "Bullish Candle",
        note: "Close above open — buyers won the session.",
        bias: "bullish",
      }
    : {
        name: "Bearish Candle",
        note: "Close below open — sellers won the session.",
        bias: "bearish",
      };
}
