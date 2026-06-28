// Hand-authored candlestick patterns for the Animated Pattern Player.
//
// Each pattern is a small OHLC series: a trend leading in, the pattern itself,
// and the outcome afterward. Callouts are timed annotations that draw in and
// point at a specific candle's wick/body/range. No market-data feed — every
// number here is authored by hand (the "no third-party charts" rule).

import type { OHLC } from "@/lib/classify";

export type Bias = "bullish" | "bearish" | "neutral";
export type CalloutTarget = "body" | "upper" | "lower" | "range";

export interface Callout {
  candle: number; // index into `candles`
  target: CalloutTarget;
  text: string;
}

export interface Pattern {
  key: string;
  name: string;
  bias: Bias;
  tagline: string;
  description: string;
  candles: OHLC[];
  patternStart: number; // first index that is "the pattern"
  patternLength: number; // how many candles form the pattern
  callouts: Callout[];
  outcome: string; // revealed on demand
  keyIdea: string;
}

export const PATTERNS: Record<string, Pattern> = {
  doji: {
    key: "doji",
    name: "Doji",
    bias: "neutral",
    tagline: "Indecision — buyers and sellers cancel out.",
    description:
      "A doji forms when the open and close are almost equal, leaving a tiny body. After a strong move it warns that momentum is stalling.",
    candles: [
      { o: 95.0, h: 97.0, l: 94.5, c: 96.5 },
      { o: 96.5, h: 98.5, l: 96.0, c: 98.0 },
      { o: 98.0, h: 100.0, l: 97.5, c: 99.5 },
      { o: 99.5, h: 101.5, l: 99.0, c: 101.0 },
      { o: 101.0, h: 102.5, l: 99.8, c: 101.05 }, // the doji
      { o: 101.0, h: 101.2, l: 99.0, c: 99.3 },
      { o: 99.3, h: 99.5, l: 97.5, c: 97.8 },
      { o: 97.8, h: 98.0, l: 96.0, c: 96.4 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "body", text: "Open and close are nearly equal — a razor-thin body." },
      { candle: 4, target: "upper", text: "Long upper wick: buyers pushed up but couldn't hold it." },
      { candle: 4, target: "lower", text: "Long lower wick: sellers pushed down but also failed → indecision." },
    ],
    outcome:
      "After a clean uptrend, the doji signalled exhaustion. Momentum stalled and price rolled over.",
    keyIdea: "A doji is a pause, not a direction. Its power comes from where it appears — after a strong run, it warns the trend is tiring.",
  },

  hammer: {
    key: "hammer",
    name: "Hammer",
    bias: "bullish",
    tagline: "Sellers drove it down — buyers slammed it back.",
    description:
      "A hammer appears after a downtrend: a small body up near the high with a long lower wick. Sellers pushed price down intrabar, but buyers reclaimed it by the close.",
    candles: [
      { o: 100.0, h: 100.5, l: 98.0, c: 98.3 },
      { o: 98.3, h: 98.8, l: 96.0, c: 96.4 },
      { o: 96.4, h: 96.8, l: 94.0, c: 94.3 },
      { o: 94.3, h: 94.6, l: 92.0, c: 92.4 },
      { o: 92.4, h: 93.0, l: 89.0, c: 92.7 }, // the hammer
      { o: 92.7, h: 94.5, l: 92.5, c: 94.2 },
      { o: 94.2, h: 96.0, l: 94.0, c: 95.7 },
      { o: 95.7, h: 97.5, l: 95.5, c: 97.2 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "lower", text: "Long lower wick ~2–3× the body — sellers were rejected." },
      { candle: 4, target: "body", text: "Small body sits near the high of the range." },
      { candle: 4, target: "upper", text: "Little or no upper wick." },
    ],
    outcome:
      "Buyers absorbed the selling pressure. The hammer marked the low and price reversed up over the next sessions.",
    keyIdea: "The long lower wick is the story: price fell hard but buyers bought every dip and closed it near the top.",
  },

  "inverted-hammer": {
    key: "inverted-hammer",
    name: "Inverted Hammer",
    bias: "bullish",
    tagline: "Buyers tested higher after a sell-off.",
    description:
      "After a downtrend, an inverted hammer shows a small body near the low with a long upper wick. Buyers probed higher; a green confirmation candle next seals the reversal.",
    candles: [
      { o: 100.0, h: 100.5, l: 98.0, c: 98.3 },
      { o: 98.3, h: 98.8, l: 96.0, c: 96.4 },
      { o: 96.4, h: 96.8, l: 94.0, c: 94.3 },
      { o: 94.3, h: 94.6, l: 92.0, c: 92.4 },
      { o: 92.4, h: 95.5, l: 92.1, c: 92.8 }, // inverted hammer
      { o: 92.8, h: 94.0, l: 92.6, c: 93.9 },
      { o: 93.9, h: 95.5, l: 93.7, c: 95.2 },
      { o: 95.2, h: 97.0, l: 95.0, c: 96.7 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "upper", text: "Long upper wick — buyers pushed price well above the open." },
      { candle: 4, target: "body", text: "Small body sits near the low of the range." },
      { candle: 5, target: "body", text: "Confirmation: the next green candle validates the reversal." },
    ],
    outcome:
      "The inverted hammer hinted buyers were testing higher. The following green candle confirmed it and the downtrend reversed.",
    keyIdea: "Same shape as a shooting star, but location flips the meaning — after a downtrend it's a bullish probe higher.",
  },

  "bullish-engulfing": {
    key: "bullish-engulfing",
    name: "Bullish Engulfing",
    bias: "bullish",
    tagline: "One green candle swallows the prior red one.",
    description:
      "A two-candle reversal: a small red candle, then a larger green candle whose body completely engulfs it — buyers overwhelm the previous session.",
    candles: [
      { o: 101.0, h: 101.5, l: 99.0, c: 99.3 },
      { o: 99.3, h: 99.6, l: 97.0, c: 97.4 },
      { o: 97.4, h: 97.8, l: 95.5, c: 95.8 },
      { o: 95.8, h: 96.2, l: 94.8, c: 95.0 }, // small red
      { o: 94.6, h: 97.8, l: 94.4, c: 97.5 }, // green engulfs
      { o: 97.5, h: 99.0, l: 97.2, c: 98.7 },
      { o: 98.7, h: 100.0, l: 98.4, c: 99.6 },
      { o: 99.6, h: 101.0, l: 99.3, c: 100.6 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A small red candle — sellers losing steam." },
      { candle: 4, target: "body", text: "The green body fully engulfs the prior red body." },
      { candle: 4, target: "range", text: "Opens below the prior close, closes above the prior open." },
    ],
    outcome:
      "Buyers took complete control in a single session, engulfing the prior candle — a strong bullish reversal followed.",
    keyIdea: "Size matters: the engulfing candle must wrap the previous body open-to-close to count.",
  },

  "bearish-engulfing": {
    key: "bearish-engulfing",
    name: "Bearish Engulfing",
    bias: "bearish",
    tagline: "One red candle swallows the prior green one.",
    description:
      "The mirror of bullish engulfing, at the top of an uptrend: a small green candle, then a larger red candle whose body engulfs it — sellers take over.",
    candles: [
      { o: 99.0, h: 101.0, l: 98.7, c: 100.7 },
      { o: 100.7, h: 102.5, l: 100.4, c: 102.2 },
      { o: 102.2, h: 104.0, l: 102.0, c: 103.7 },
      { o: 103.7, h: 104.5, l: 103.4, c: 104.2 }, // small green
      { o: 104.6, h: 104.8, l: 101.8, c: 102.0 }, // red engulfs
      { o: 102.0, h: 102.3, l: 100.3, c: 100.6 },
      { o: 100.6, h: 100.9, l: 98.8, c: 99.1 },
      { o: 99.1, h: 99.4, l: 97.3, c: 97.6 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A small green candle — buyers running out of room." },
      { candle: 4, target: "body", text: "The red body fully engulfs the prior green body." },
      { candle: 4, target: "range", text: "Opens above the prior close, closes below the prior open." },
    ],
    outcome:
      "Sellers overwhelmed the previous up-session entirely, flipping momentum down.",
    keyIdea: "A bearish engulfing at resistance after an uptrend is one of the most reliable reversal tells.",
  },

  "morning-star": {
    key: "morning-star",
    name: "Morning Star",
    bias: "bullish",
    tagline: "Capitulation → indecision → strong buying.",
    description:
      "A three-candle bottom: a big red candle, a small-bodied 'star' that often gaps down, then a big green candle closing deep into the first body.",
    candles: [
      { o: 104.0, h: 104.3, l: 102.0, c: 102.3 },
      { o: 102.3, h: 102.6, l: 100.0, c: 100.4 },
      { o: 100.4, h: 100.6, l: 97.0, c: 97.3 }, // big red
      { o: 96.8, h: 97.2, l: 96.3, c: 96.9 }, // star
      { o: 97.3, h: 100.0, l: 97.1, c: 99.8 }, // big green
      { o: 99.8, h: 101.0, l: 99.5, c: 100.7 },
      { o: 100.7, h: 102.0, l: 100.4, c: 101.6 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "Heavy selling — a large red candle." },
      { candle: 3, target: "body", text: "A small star: selling exhausts, often gapping down." },
      { candle: 4, target: "body", text: "A big green candle closes deep into the first candle's body." },
    ],
    outcome:
      "The three stages — panic, pause, and powerful buying — marked a durable bottom and an uptrend followed.",
    keyIdea: "The middle star is the hinge: it shows selling pressure drying up before buyers commit.",
  },

  "evening-star": {
    key: "evening-star",
    name: "Evening Star",
    bias: "bearish",
    tagline: "Euphoria → stall → sellers take over.",
    description:
      "The bearish mirror of the morning star at a top: a big green candle, a small star that often gaps up, then a big red candle closing deep into the first body.",
    candles: [
      { o: 96.0, h: 98.3, l: 95.8, c: 98.0 },
      { o: 98.0, h: 100.3, l: 97.8, c: 100.0 },
      { o: 100.0, h: 103.0, l: 99.8, c: 102.8 }, // big green
      { o: 103.3, h: 103.7, l: 102.9, c: 103.1 }, // star
      { o: 102.7, h: 102.9, l: 100.0, c: 100.2 }, // big red
      { o: 100.2, h: 100.4, l: 98.5, c: 98.8 },
      { o: 98.8, h: 99.0, l: 97.0, c: 97.4 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "Strong buying — a large green candle." },
      { candle: 3, target: "body", text: "A small star gaps up: buyers exhausting at the highs." },
      { candle: 4, target: "body", text: "A big red candle closes deep into the first candle's body." },
    ],
    outcome:
      "Buying climaxed, stalled, and then reversed — the evening star topped the move.",
    keyIdea: "A small-bodied star after a strong rally is the warning; the third red candle is the confirmation.",
  },

  "shooting-star": {
    key: "shooting-star",
    name: "Shooting Star",
    bias: "bearish",
    tagline: "Buyers rejected at the highs.",
    description:
      "After an uptrend, a shooting star has a small body near the low and a long upper wick — buyers pushed to new highs but were slammed back down by the close.",
    candles: [
      { o: 95.0, h: 96.5, l: 94.8, c: 96.3 },
      { o: 96.3, h: 98.0, l: 96.0, c: 97.8 },
      { o: 97.8, h: 99.5, l: 97.6, c: 99.3 },
      { o: 99.3, h: 101.0, l: 99.1, c: 100.8 },
      { o: 100.8, h: 104.0, l: 100.5, c: 101.1 }, // shooting star
      { o: 101.1, h: 101.3, l: 99.0, c: 99.3 },
      { o: 99.3, h: 99.5, l: 97.3, c: 97.7 },
      { o: 97.7, h: 97.9, l: 95.8, c: 96.2 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "upper", text: "Long upper wick — buyers pushed to new highs, then got rejected." },
      { candle: 4, target: "body", text: "Small body sits near the low of the range." },
      { candle: 4, target: "lower", text: "Little or no lower wick." },
    ],
    outcome:
      "The rejection from the highs flipped momentum; price reversed down from the shooting star.",
    keyIdea: "Same shape as an inverted hammer — but at the top of an uptrend it's a bearish rejection.",
  },

  // ===================== Single-candle (continued) =====================

  "long-legged-doji": {
    key: "long-legged-doji",
    name: "Long-Legged Doji",
    bias: "neutral",
    tagline: "Huge range, flat body — extreme indecision.",
    description:
      "Price travelled far in both directions but settled right back at the open, leaving long wicks on both sides. Extreme indecision, often around news.",
    candles: [
      { o: 95.0, h: 96.5, l: 94.6, c: 96.2 },
      { o: 96.2, h: 98.0, l: 95.9, c: 97.7 },
      { o: 97.7, h: 99.4, l: 97.4, c: 99.1 },
      { o: 99.1, h: 100.6, l: 98.8, c: 100.3 },
      { o: 100.2, h: 103.5, l: 96.8, c: 100.25 }, // long-legged doji
      { o: 100.2, h: 100.6, l: 98.4, c: 98.7 },
      { o: 98.7, h: 99.0, l: 96.8, c: 97.1 },
      { o: 97.1, h: 97.4, l: 95.4, c: 95.8 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "body", text: "Open and close land in the same place — a flat body." },
      { candle: 4, target: "upper", text: "Long upper wick: a big push higher was fully rejected." },
      { candle: 4, target: "lower", text: "Long lower wick: a big push lower was rejected too — the range dwarfs recent candles." },
    ],
    outcome:
      "The enormous two-sided range showed neither side could hold control; the next candle's close resolved the indecision lower.",
    keyIdea: "The signal is the size of the range, not the body. It marks a volatility climax — wait for the next close to pick a side.",
  },

  "dragonfly-doji": {
    key: "dragonfly-doji",
    name: "Dragonfly Doji",
    bias: "bullish",
    tagline: "Sellers crushed it; buyers reclaimed every tick.",
    description:
      "After a downtrend, price was driven sharply lower intrabar but buyers absorbed all of it and closed back at the open — a flat body sitting at the top with a long lower wick.",
    candles: [
      { o: 100.0, h: 100.4, l: 98.0, c: 98.3 },
      { o: 98.3, h: 98.6, l: 96.0, c: 96.3 },
      { o: 96.3, h: 96.6, l: 94.0, c: 94.3 },
      { o: 94.3, h: 94.6, l: 92.2, c: 92.5 },
      { o: 92.5, h: 92.7, l: 89.5, c: 92.6 }, // dragonfly doji
      { o: 92.6, h: 94.2, l: 92.4, c: 94.0 },
      { o: 94.0, h: 95.8, l: 93.8, c: 95.5 },
      { o: 95.5, h: 97.2, l: 95.3, c: 96.9 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "lower", text: "Long lower wick — sellers drove price down hard…" },
      { candle: 4, target: "body", text: "…but open and close sit together at the top of the range." },
      { candle: 4, target: "upper", text: "Little or no upper wick — buyers reclaimed it all by the close." },
    ],
    outcome:
      "The defended low became support. Buyers followed through and the downtrend reversed upward.",
    keyIdea: "A dragonfly is a hammer pushed to the extreme — the entire body collapses onto the high.",
  },

  "gravestone-doji": {
    key: "gravestone-doji",
    name: "Gravestone Doji",
    bias: "bearish",
    tagline: "Buyers spiked it; sellers buried it at the open.",
    description:
      "After an uptrend, buyers pushed price sharply higher intrabar but sellers absorbed it all and forced the close back to the open — a flat body at the bottom with a long upper wick.",
    candles: [
      { o: 95.0, h: 96.5, l: 94.8, c: 96.3 },
      { o: 96.3, h: 98.0, l: 96.1, c: 97.8 },
      { o: 97.8, h: 99.5, l: 97.6, c: 99.3 },
      { o: 99.3, h: 100.8, l: 99.1, c: 100.6 },
      { o: 100.6, h: 103.6, l: 100.4, c: 100.55 }, // gravestone doji
      { o: 100.5, h: 100.7, l: 98.6, c: 98.9 },
      { o: 98.9, h: 99.1, l: 97.0, c: 97.3 },
      { o: 97.3, h: 97.5, l: 95.4, c: 95.8 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "upper", text: "Long upper wick — buyers spiked price higher…" },
      { candle: 4, target: "body", text: "…but open and close sit together at the bottom of the range." },
      { candle: 4, target: "lower", text: "Little or no lower wick — sellers won the session decisively." },
    ],
    outcome:
      "The rejected high marked resistance; sellers followed through and the uptrend reversed down.",
    keyIdea: "A gravestone is a shooting star pushed to the extreme — the body collapses onto the low.",
  },

  "hanging-man": {
    key: "hanging-man",
    name: "Hanging Man",
    bias: "bearish",
    tagline: "Same shape as a hammer — but at the top.",
    description:
      "After an uptrend, a small body sits near the high with a long lower wick. For the first time in the move, sellers could drag price far below — a warning that buying is fading.",
    candles: [
      { o: 95.0, h: 96.4, l: 94.8, c: 96.2 },
      { o: 96.2, h: 97.8, l: 96.0, c: 97.6 },
      { o: 97.6, h: 99.2, l: 97.4, c: 99.0 },
      { o: 99.0, h: 100.6, l: 98.8, c: 100.4 },
      { o: 100.4, h: 100.9, l: 98.0, c: 100.6 }, // hanging man
      { o: 100.5, h: 100.7, l: 98.5, c: 98.8 },
      { o: 98.8, h: 99.0, l: 96.8, c: 97.1 },
      { o: 97.1, h: 97.3, l: 95.2, c: 95.6 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "lower", text: "Long lower wick — sellers reached deep for the first time in the trend." },
      { candle: 4, target: "body", text: "Small body near the high — at the TOP of an uptrend." },
      { candle: 5, target: "body", text: "Confirmation: the next bearish candle validates the warning." },
    ],
    outcome:
      "The deep lower wick exposed fading demand; the confirming red candle followed and the uptrend rolled over.",
    keyIdea: "Identical to a hammer in shape — location flips the meaning. At a top, it's a bearish warning that needs confirmation.",
  },

  "bullish-marubozu": {
    key: "bullish-marubozu",
    name: "Bullish Marubozu",
    bias: "bullish",
    tagline: "Open at the low, close at the high — total control.",
    description:
      "A long bullish candle with no wicks: price opened at the low, closed at the high, and never gave bears any room. A momentum reading favouring continuation.",
    candles: [
      { o: 99.0, h: 99.3, l: 97.6, c: 97.9 },
      { o: 97.9, h: 98.1, l: 96.6, c: 96.9 },
      { o: 96.9, h: 97.1, l: 96.3, c: 96.6 },
      { o: 96.6, h: 96.8, l: 96.0, c: 96.2 },
      { o: 96.2, h: 99.6, l: 96.2, c: 99.6 }, // bullish marubozu
      { o: 99.6, h: 101.2, l: 99.4, c: 101.0 },
      { o: 101.0, h: 102.6, l: 100.8, c: 102.4 },
      { o: 102.4, h: 104.0, l: 102.2, c: 103.8 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "lower", text: "Open equals the low — no lower wick at all." },
      { candle: 4, target: "upper", text: "Close equals the high — no upper wick either." },
      { candle: 4, target: "body", text: "A full-body candle: one side dominated open-to-close." },
    ],
    outcome:
      "Unbroken buying conviction carried straight through; price continued higher with shallow pullbacks.",
    keyIdea: "A marubozu is a momentum signal, not a reversal — trade with it, and look to buy pullbacks toward its midpoint.",
  },

  "bearish-marubozu": {
    key: "bearish-marubozu",
    name: "Bearish Marubozu",
    bias: "bearish",
    tagline: "Open at the high, close at the low — total control.",
    description:
      "A long bearish candle with no wicks: price opened at the high, closed at the low. Sellers owned every tick. Continuation downward is strongly favoured.",
    candles: [
      { o: 97.0, h: 98.6, l: 96.8, c: 98.4 },
      { o: 98.4, h: 99.0, l: 98.0, c: 98.6 },
      { o: 98.6, h: 99.0, l: 98.2, c: 98.5 },
      { o: 98.5, h: 98.9, l: 98.1, c: 98.4 },
      { o: 98.4, h: 98.4, l: 95.0, c: 95.0 }, // bearish marubozu
      { o: 95.0, h: 95.2, l: 93.4, c: 93.6 },
      { o: 93.6, h: 93.8, l: 92.0, c: 92.2 },
      { o: 92.2, h: 92.4, l: 90.6, c: 90.8 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "upper", text: "Open equals the high — no upper wick." },
      { candle: 4, target: "lower", text: "Close equals the low — no lower wick." },
      { candle: 4, target: "body", text: "A full bearish body: sellers controlled the entire session." },
    ],
    outcome:
      "Relentless selling continued; rallies toward the candle's midpoint offered fresh short entries.",
    keyIdea: "The mirror of the bullish marubozu — pure downside momentum, best traded in the direction of the candle.",
  },

  "spinning-top": {
    key: "spinning-top",
    name: "Spinning Top",
    bias: "neutral",
    tagline: "Both sides tried; neither won.",
    description:
      "A small body in the middle of the candle with upper and lower wicks of similar length. The session had range but no direction — after a strong move, an early warning of fading momentum.",
    candles: [
      { o: 95.0, h: 96.4, l: 94.8, c: 96.2 },
      { o: 96.2, h: 97.8, l: 96.0, c: 97.6 },
      { o: 97.6, h: 99.2, l: 97.4, c: 99.0 },
      { o: 99.0, h: 100.6, l: 98.8, c: 100.4 },
      { o: 100.4, h: 101.8, l: 99.0, c: 100.2 }, // spinning top
      { o: 100.2, h: 101.0, l: 99.2, c: 99.6 },
      { o: 99.6, h: 100.2, l: 98.6, c: 98.9 },
      { o: 98.9, h: 99.4, l: 97.8, c: 98.0 },
    ],
    patternStart: 4,
    patternLength: 1,
    callouts: [
      { candle: 4, target: "body", text: "Small body in the middle of the range." },
      { candle: 4, target: "upper", text: "Upper wick: buyers tried and failed." },
      { candle: 4, target: "lower", text: "Lower wick of similar length: sellers tried and failed too." },
    ],
    outcome:
      "The stall after a strong run flagged momentum loss; the move stagnated and drifted lower.",
    keyIdea: "On its own it's noise — but after a trend it's a flag to start watching for a reversal setup.",
  },

  // ===================== Two-candle (continued) =====================

  "tweezer-bottom": {
    key: "tweezer-bottom",
    name: "Tweezer Bottom",
    bias: "bullish",
    tagline: "The same low, defended twice.",
    description:
      "Two consecutive candles print the same low after a downtrend — the first bearish, the second bullish. Buyers defended the exact price twice, marking it as support.",
    candles: [
      { o: 100.0, h: 100.4, l: 98.0, c: 98.3 },
      { o: 98.3, h: 98.6, l: 96.0, c: 96.3 },
      { o: 96.3, h: 96.6, l: 94.2, c: 94.5 },
      { o: 94.5, h: 94.8, l: 92.0, c: 92.3 }, // tweezer candle 1 (red), low 92.0
      { o: 92.3, h: 94.6, l: 92.0, c: 94.4 }, // tweezer candle 2 (green), matched low
      { o: 94.4, h: 96.0, l: 94.2, c: 95.8 },
      { o: 95.8, h: 97.4, l: 95.6, c: 97.1 },
      { o: 97.1, h: 98.6, l: 96.9, c: 98.3 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "lower", text: "A new low prints — sellers in control." },
      { candle: 4, target: "lower", text: "The very next candle prints the identical low — buyers defend it twice." },
      { candle: 4, target: "body", text: "The second candle closes green: the actual reversal." },
    ],
    outcome:
      "The double-tested low held as support and price reversed up — strongest when it lands on a higher-timeframe level.",
    keyIdea: "Two matched lows say the market tried to break down and couldn't. Location at known support is what gives it teeth.",
  },

  "tweezer-top": {
    key: "tweezer-top",
    name: "Tweezer Top",
    bias: "bearish",
    tagline: "The same high, defended twice.",
    description:
      "Two consecutive candles print the same high after an uptrend — the first bullish, the second bearish. Sellers defended the exact price twice, marking it as resistance.",
    candles: [
      { o: 95.0, h: 96.0, l: 94.8, c: 95.8 },
      { o: 95.8, h: 97.4, l: 95.6, c: 97.2 },
      { o: 97.2, h: 98.8, l: 97.0, c: 98.6 },
      { o: 98.6, h: 101.0, l: 98.4, c: 100.7 }, // tweezer candle 1 (green), high 101.0
      { o: 100.7, h: 101.0, l: 98.6, c: 98.9 }, // tweezer candle 2 (red), matched high
      { o: 98.9, h: 99.1, l: 97.2, c: 97.5 },
      { o: 97.5, h: 97.7, l: 95.8, c: 96.1 },
      { o: 96.1, h: 96.3, l: 94.4, c: 94.7 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "upper", text: "A new high prints — buyers in control." },
      { candle: 4, target: "upper", text: "The next candle prints the identical high — sellers defend it twice." },
      { candle: 4, target: "body", text: "The second candle closes red: the reversal begins." },
    ],
    outcome:
      "The twice-rejected high capped the move; price reversed down from resistance.",
    keyIdea: "Matched highs reveal a ceiling the market couldn't break. Best when it aligns with a higher-timeframe resistance.",
  },

  "piercing-line": {
    key: "piercing-line",
    name: "Piercing Line",
    bias: "bullish",
    tagline: "A deep stab back into the prior red body.",
    description:
      "A two-candle bullish reversal: a red candle, then a green one that opens lower but closes more than halfway back into the prior body — a weaker cousin of the bullish engulfing.",
    candles: [
      { o: 101.0, h: 101.4, l: 99.0, c: 99.3 },
      { o: 99.3, h: 99.6, l: 97.4, c: 97.7 },
      { o: 97.7, h: 98.0, l: 96.0, c: 96.3 },
      { o: 96.3, h: 96.6, l: 93.9, c: 94.1 }, // candle 1: bearish
      { o: 93.6, h: 95.6, l: 93.4, c: 95.4 }, // candle 2: opens lower, closes past midpoint
      { o: 95.4, h: 97.0, l: 95.2, c: 96.7 },
      { o: 96.7, h: 98.2, l: 96.5, c: 97.9 },
      { o: 97.9, h: 99.4, l: 97.7, c: 99.1 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "Candle 1 is bearish — sellers still in command." },
      { candle: 4, target: "lower", text: "Candle 2 opens below the prior close…" },
      { candle: 4, target: "body", text: "…then closes back past the 50% mark of the red body — buyers overpowered them." },
    ],
    outcome:
      "The decisive push past the midpoint showed buyers meeting and beating sellers; the reversal followed.",
    keyIdea: "Like an engulfing that fell just short — the deeper the close pierces the prior body, the stronger the signal.",
  },

  "dark-cloud-cover": {
    key: "dark-cloud-cover",
    name: "Dark Cloud Cover",
    bias: "bearish",
    tagline: "A deep stab back into the prior green body.",
    description:
      "The bearish mirror of the piercing line: a green candle, then a red one that opens above the high but closes more than halfway down into the prior body.",
    candles: [
      { o: 95.0, h: 95.4, l: 94.6, c: 95.2 },
      { o: 95.2, h: 97.4, l: 95.0, c: 97.2 },
      { o: 97.2, h: 98.0, l: 97.0, c: 97.8 },
      { o: 97.8, h: 100.6, l: 97.6, c: 100.4 }, // candle 1: bullish
      { o: 100.9, h: 101.2, l: 98.7, c: 98.9 }, // candle 2: opens above high, closes below midpoint
      { o: 98.9, h: 99.1, l: 97.0, c: 97.3 },
      { o: 97.3, h: 97.5, l: 95.6, c: 95.9 },
      { o: 95.9, h: 96.1, l: 94.2, c: 94.5 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "Candle 1 is bullish — buyers still in command." },
      { candle: 4, target: "upper", text: "Candle 2 opens above the prior high…" },
      { candle: 4, target: "body", text: "…then closes below the 50% mark of the green body — supply has appeared." },
    ],
    outcome:
      "The deep close into the prior body revealed where sellers were waiting; price reversed down.",
    keyIdea: "A near-engulfing at a top. The closer Candle 2 closes to the prior open, the more it behaves like a full bearish engulfing.",
  },

  "bullish-harami": {
    key: "bullish-harami",
    name: "Bullish Harami",
    bias: "bullish",
    tagline: "A small candle hides inside the prior big red.",
    description:
      "After a downtrend, a long red candle is followed by a small candle whose body sits entirely inside it. Sellers couldn't extend — the first crack in bearish momentum.",
    candles: [
      { o: 103.0, h: 103.3, l: 101.0, c: 101.3 },
      { o: 101.3, h: 101.6, l: 99.0, c: 99.3 },
      { o: 99.3, h: 99.6, l: 98.3, c: 98.6 },
      { o: 98.6, h: 98.9, l: 94.2, c: 94.4 }, // candle 1: long bearish
      { o: 95.2, h: 96.2, l: 95.0, c: 96.0 }, // candle 2: small body inside candle 1
      { o: 96.0, h: 97.6, l: 95.8, c: 97.3 },
      { o: 97.3, h: 98.8, l: 97.1, c: 98.5 },
      { o: 98.5, h: 100.0, l: 98.3, c: 99.7 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A long bearish candle — sellers dominant." },
      { candle: 4, target: "body", text: "A small candle opens and closes inside the prior body: sellers stalled." },
      { candle: 5, target: "body", text: "Confirmation: the next candle breaks above the harami." },
    ],
    outcome:
      "The contained candle marked a pause in selling; confirmation followed and the trend reversed up.",
    keyIdea: "Harami means 'pregnant' — the big candle 'carries' the small one. It signals lost momentum, not yet a reversal; wait for proof.",
  },

  "bearish-harami": {
    key: "bearish-harami",
    name: "Bearish Harami",
    bias: "bearish",
    tagline: "A small candle hides inside the prior big green.",
    description:
      "After an uptrend, a long green candle is followed by a small candle entirely contained within its body. Buyers couldn't extend — momentum is fading.",
    candles: [
      { o: 91.0, h: 91.3, l: 89.8, c: 91.1 },
      { o: 91.1, h: 92.6, l: 90.9, c: 92.4 },
      { o: 92.4, h: 94.0, l: 92.2, c: 93.8 },
      { o: 94.4, h: 98.9, l: 94.2, c: 98.6 }, // candle 1: long bullish
      { o: 97.8, h: 98.0, l: 96.8, c: 97.0 }, // candle 2: small body inside candle 1
      { o: 97.0, h: 97.2, l: 95.4, c: 95.7 },
      { o: 95.7, h: 95.9, l: 94.0, c: 94.3 },
      { o: 94.3, h: 94.5, l: 92.6, c: 92.9 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A long bullish candle — buyers dominant." },
      { candle: 4, target: "body", text: "A small candle sits inside the prior body: buyers stalled." },
      { candle: 5, target: "body", text: "Confirmation: the next candle breaks below the harami." },
    ],
    outcome:
      "The inside candle flagged exhaustion at the highs; confirmation followed and the uptrend reversed.",
    keyIdea: "The mirror of the bullish harami — a pause inside a strong up-candle that warns the buyers are running out of room.",
  },

  // ===================== Three-candle (continued) =====================

  "three-white-soldiers": {
    key: "three-white-soldiers",
    name: "Three White Soldiers",
    bias: "bullish",
    tagline: "Three strong greens, marching up.",
    description:
      "Three consecutive long bullish candles, each opening within the prior body and closing near its high. No pauses — buyers walk the price up step by step.",
    candles: [
      { o: 99.0, h: 99.3, l: 97.6, c: 97.9 },
      { o: 97.9, h: 98.1, l: 96.6, c: 96.9 },
      { o: 96.9, h: 99.0, l: 96.7, c: 98.8 }, // soldier 1
      { o: 98.0, h: 100.4, l: 97.8, c: 100.2 }, // soldier 2
      { o: 99.4, h: 101.8, l: 99.2, c: 101.6 }, // soldier 3
      { o: 101.6, h: 102.0, l: 101.0, c: 101.4 },
      { o: 101.4, h: 102.2, l: 101.0, c: 102.0 },
      { o: 102.0, h: 102.6, l: 101.6, c: 102.4 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "First strong green candle after the decline." },
      { candle: 3, target: "body", text: "Opens within the prior body, closes near its own high." },
      { candle: 4, target: "body", text: "A third in a row — relentless buying, each close higher than the last." },
    ],
    outcome:
      "Three sessions of unbroken buying flipped the trend up. After such a run price is extended — the lesson is: don't chase, wait for a pullback.",
    keyIdea: "A momentum pattern disguised as a reversal. Strength is the signal; over-extension is the risk.",
  },

  "three-black-crows": {
    key: "three-black-crows",
    name: "Three Black Crows",
    bias: "bearish",
    tagline: "Three strong reds, marching down.",
    description:
      "Three consecutive long bearish candles, each opening within the prior body and closing near its low. Bears walk price down with no resistance.",
    candles: [
      { o: 97.0, h: 98.6, l: 96.8, c: 98.4 },
      { o: 98.4, h: 99.0, l: 98.0, c: 98.6 },
      { o: 98.6, h: 98.8, l: 96.4, c: 96.6 }, // crow 1
      { o: 97.4, h: 97.6, l: 95.0, c: 95.2 }, // crow 2
      { o: 95.8, h: 96.0, l: 93.4, c: 93.6 }, // crow 3
      { o: 93.6, h: 93.8, l: 92.6, c: 93.0 },
      { o: 93.0, h: 93.4, l: 92.0, c: 92.3 },
      { o: 92.3, h: 92.6, l: 91.2, c: 91.5 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "First strong red candle after the advance." },
      { candle: 3, target: "body", text: "Opens within the prior body, closes near its own low." },
      { candle: 4, target: "body", text: "A third in a row — relentless selling, each close lower than the last." },
    ],
    outcome:
      "Three sessions of unbroken selling flipped the trend down. Price is extended after the third crow — wait for a retracement before shorting.",
    keyIdea: "The mirror of three white soldiers. Powerful, but by the third candle the easy move is already gone.",
  },

  "three-inside-up": {
    key: "three-inside-up",
    name: "Three Inside Up",
    bias: "bullish",
    tagline: "A bullish harami — with proof.",
    description:
      "A long red candle, a small bullish candle inside it (a harami), then a long green candle that closes above the first candle's high — the confirmation the harami only hinted at.",
    candles: [
      { o: 103.0, h: 103.3, l: 101.0, c: 101.3 },
      { o: 101.3, h: 101.6, l: 99.2, c: 99.5 },
      { o: 99.5, h: 99.8, l: 95.2, c: 95.4 }, // candle 1: long bearish
      { o: 96.2, h: 97.2, l: 96.0, c: 97.0 }, // candle 2: bullish harami inside
      { o: 97.0, h: 100.2, l: 96.8, c: 100.0 }, // candle 3: closes above candle 1's high
      { o: 100.0, h: 101.4, l: 99.8, c: 101.1 },
      { o: 101.1, h: 102.6, l: 100.9, c: 102.3 },
      { o: 102.3, h: 103.8, l: 102.1, c: 103.5 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "A long bearish candle in a downtrend." },
      { candle: 3, target: "body", text: "A small bullish candle inside it — the harami." },
      { candle: 4, target: "body", text: "A long green candle closes above Candle 1's high: the proof." },
    ],
    outcome:
      "The third candle confirmed the harami's loss-of-momentum was a true reversal; the uptrend followed.",
    keyIdea: "Essentially 'harami with proof' — the confirmation candle is built into the pattern, which is why it's more reliable than the harami alone.",
  },

  "three-inside-down": {
    key: "three-inside-down",
    name: "Three Inside Down",
    bias: "bearish",
    tagline: "A bearish harami — with proof.",
    description:
      "A long green candle, a small bearish candle inside it, then a long red candle that closes below the first candle's low — confirming the reversal.",
    candles: [
      { o: 91.0, h: 91.3, l: 89.8, c: 91.1 },
      { o: 91.1, h: 92.6, l: 90.9, c: 92.4 },
      { o: 92.4, h: 96.9, l: 92.2, c: 96.7 }, // candle 1: long bullish
      { o: 95.6, h: 95.8, l: 94.6, c: 94.8 }, // candle 2: bearish harami inside
      { o: 94.8, h: 95.0, l: 91.8, c: 92.0 }, // candle 3: closes below candle 1's low
      { o: 92.0, h: 92.2, l: 90.4, c: 90.7 },
      { o: 90.7, h: 90.9, l: 89.2, c: 89.5 },
      { o: 89.5, h: 89.7, l: 88.0, c: 88.3 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "A long bullish candle in an uptrend." },
      { candle: 3, target: "body", text: "A small bearish candle inside it — the harami." },
      { candle: 4, target: "body", text: "A long red candle closes below Candle 1's low: the proof." },
    ],
    outcome:
      "The third candle confirmed the reversal the harami suggested; the downtrend followed.",
    keyIdea: "The bearish twin of three inside up — the confirming third candle is what separates it from a plain harami.",
  },

  "abandoned-baby": {
    key: "abandoned-baby",
    name: "Abandoned Baby",
    bias: "bullish",
    tagline: "A doji isolated by gaps on both sides.",
    description:
      "A rare, powerful reversal: a long red candle, a doji that gaps below it, then a long green candle that gaps above the doji — a complete sentiment flip, isolated by gaps.",
    candles: [
      { o: 104.0, h: 104.3, l: 102.0, c: 102.3 },
      { o: 102.3, h: 102.6, l: 100.0, c: 100.3 },
      { o: 100.3, h: 100.6, l: 95.8, c: 96.0 }, // candle 1: long bearish, low 95.8
      { o: 95.0, h: 95.2, l: 94.6, c: 95.05 }, // candle 2: doji gapped below (high < c1 low)
      { o: 96.3, h: 99.3, l: 96.2, c: 99.0 }, // candle 3: long bullish gapped above doji
      { o: 99.0, h: 100.6, l: 98.8, c: 100.3 },
      { o: 100.3, h: 101.8, l: 100.1, c: 101.5 },
      { o: 101.5, h: 103.0, l: 101.3, c: 102.7 },
    ],
    patternStart: 2,
    patternLength: 3,
    callouts: [
      { candle: 2, target: "body", text: "A long bearish candle — sellers in full control." },
      { candle: 3, target: "range", text: "A doji gaps fully below it — isolated, with no wick overlap." },
      { candle: 4, target: "range", text: "A long green candle gaps back above the doji: sentiment flipped overnight." },
    ],
    outcome:
      "The gap-isolated doji marked the exact turning point; the reversal that followed was sharp and clean.",
    keyIdea: "Rare in 24-hour forex (which seldom gaps) — most often seen on gold around the weekly open or major news. When it appears, it's exceptionally reliable.",
  },

  // ===================== Continuation =====================

  "rising-three-methods": {
    key: "rising-three-methods",
    name: "Rising Three Methods",
    bias: "bullish",
    tagline: "A pause inside an uptrend, then resumption.",
    description:
      "A long bullish candle, a few small bearish candles that stay within its range, then a long bullish candle breaking above the first's high — the classic bullish continuation.",
    candles: [
      { o: 92.0, h: 92.4, l: 91.6, c: 92.2 },
      { o: 92.2, h: 96.4, l: 92.0, c: 96.2 }, // candle 1: long bullish
      { o: 95.8, h: 96.0, l: 95.0, c: 95.2 }, // small bearish (inside range)
      { o: 95.2, h: 95.6, l: 94.4, c: 94.6 }, // small bearish (inside range)
      { o: 94.6, h: 95.2, l: 93.8, c: 94.0 }, // small bearish (inside range)
      { o: 94.0, h: 98.0, l: 93.8, c: 97.8 }, // candle 5: resumes, closes above candle 1's high
      { o: 97.8, h: 99.4, l: 97.6, c: 99.1 },
      { o: 99.1, h: 100.6, l: 98.9, c: 100.3 },
    ],
    patternStart: 1,
    patternLength: 5,
    callouts: [
      { candle: 1, target: "body", text: "A long bullish candle sets the trend." },
      { candle: 3, target: "body", text: "Small counter-trend candles drift down but stay inside the first candle's range." },
      { candle: 5, target: "body", text: "A long bullish candle breaks above the first's high — the trend resumes." },
    ],
    outcome:
      "The pullback was just profit-taking; once it held, buyers resumed control and the uptrend continued.",
    keyIdea: "The middle candles are a healthy pause, not a reversal. The whole pattern fails only if price closes below the first candle's low.",
  },

  "falling-three-methods": {
    key: "falling-three-methods",
    name: "Falling Three Methods",
    bias: "bearish",
    tagline: "A pause inside a downtrend, then resumption.",
    description:
      "A long bearish candle, a few small bullish candles contained within its range, then a long bearish candle breaking below the first's low — the bearish continuation.",
    candles: [
      { o: 104.0, h: 104.4, l: 103.6, c: 103.8 },
      { o: 103.8, h: 104.0, l: 99.8, c: 100.0 }, // candle 1: long bearish
      { o: 100.4, h: 101.2, l: 100.2, c: 101.0 }, // small bullish (inside range)
      { o: 101.0, h: 101.6, l: 100.6, c: 101.4 }, // small bullish (inside range)
      { o: 101.4, h: 102.0, l: 100.8, c: 101.8 }, // small bullish (inside range)
      { o: 101.8, h: 102.0, l: 98.0, c: 98.2 }, // candle 5: resumes, closes below candle 1's low
      { o: 98.2, h: 98.4, l: 96.6, c: 96.9 },
      { o: 96.9, h: 97.1, l: 95.4, c: 95.7 },
    ],
    patternStart: 1,
    patternLength: 5,
    callouts: [
      { candle: 1, target: "body", text: "A long bearish candle sets the trend." },
      { candle: 3, target: "body", text: "Small counter-trend candles rise but stay inside the first candle's range." },
      { candle: 5, target: "body", text: "A long bearish candle breaks below the first's low — the downtrend resumes." },
    ],
    outcome:
      "The bounce was just short-covering; once it stalled, sellers resumed control and the downtrend continued.",
    keyIdea: "Mirror of rising three methods. The contained pullback shows the trend is resting, not reversing.",
  },

  "mat-hold": {
    key: "mat-hold",
    name: "Mat Hold",
    bias: "bullish",
    tagline: "Rising three methods — with a defended gap.",
    description:
      "A long bullish candle, a gap up, then small candles that pull back but never fill the gap, followed by a strong bullish candle resuming the trend. The unfilled gap shows extra conviction.",
    candles: [
      { o: 90.0, h: 90.4, l: 89.6, c: 90.2 },
      { o: 90.2, h: 95.0, l: 90.0, c: 94.8 }, // candle 1: long bullish
      { o: 95.6, h: 95.9, l: 95.2, c: 95.4 }, // gap-up candle
      { o: 95.4, h: 95.6, l: 95.0, c: 95.1 }, // small pullback, gap held
      { o: 95.1, h: 95.3, l: 94.9, c: 95.0 }, // small pullback, gap still unfilled
      { o: 95.0, h: 98.6, l: 94.9, c: 98.4 }, // resumption: closes above candle 1's high
      { o: 98.4, h: 100.0, l: 98.2, c: 99.7 },
      { o: 99.7, h: 101.2, l: 99.5, c: 100.9 },
    ],
    patternStart: 1,
    patternLength: 5,
    callouts: [
      { candle: 1, target: "body", text: "A long bullish candle, then the market gaps up." },
      { candle: 3, target: "body", text: "Small candles drift down but never fill the gap — bulls defend it." },
      { candle: 5, target: "body", text: "A strong bullish candle takes out the first candle's high." },
    ],
    outcome:
      "The defended gap signalled extra aggression behind the move; the uptrend resumed forcefully.",
    keyIdea: "Often considered more reliable than rising three methods — the unfilled gap is the tell that buyers never gave ground.",
  },

  "separating-lines": {
    key: "separating-lines",
    name: "Separating Lines",
    bias: "bullish",
    tagline: "A counter-trend candle, immediately undone.",
    description:
      "A two-candle continuation: a long counter-trend candle, then a candle that opens at the same price and closes strongly back in the trend's direction — using the prior open as a springboard.",
    candles: [
      { o: 95.0, h: 95.4, l: 94.6, c: 95.2 },
      { o: 95.2, h: 97.4, l: 95.0, c: 97.2 },
      { o: 97.2, h: 99.2, l: 97.0, c: 99.0 },
      { o: 99.0, h: 99.2, l: 96.3, c: 96.5 }, // candle 1: counter-trend red pullback
      { o: 99.0, h: 101.8, l: 98.8, c: 101.6 }, // candle 2: opens at candle 1's open, closes with the trend
      { o: 101.6, h: 103.2, l: 101.4, c: 102.9 },
      { o: 102.9, h: 104.4, l: 102.7, c: 104.1 },
      { o: 104.1, h: 105.6, l: 103.9, c: 105.3 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A counter-trend red candle interrupts the uptrend." },
      { candle: 4, target: "lower", text: "The next candle opens at the same price — the 'separating' open." },
      { candle: 4, target: "body", text: "…then closes strongly with the trend, erasing the pullback." },
    ],
    outcome:
      "Buyers used the prior session's open as a launch pad; the uptrend resumed without missing a beat.",
    keyIdea: "The matching opens are the signature — the trend side reclaims control instantly, confirming continuation.",
  },

  // ===================== Added from the Groww pattern list =====================

  "three-outside-up": {
    key: "three-outside-up",
    name: "Three Outside Up",
    bias: "bullish",
    tagline: "A bullish engulfing — confirmed by a third candle.",
    description:
      "A small red candle is engulfed by a big green one (a bullish engulfing), then a third green candle closes even higher — the confirmation the engulfing only implied.",
    candles: [
      { o: 101.0, h: 101.4, l: 99.0, c: 99.3 },
      { o: 99.3, h: 99.6, l: 97.4, c: 97.7 },
      { o: 97.7, h: 98.0, l: 96.2, c: 96.5 },
      { o: 96.4, h: 96.7, l: 94.9, c: 95.0 }, // c1: small red
      { o: 94.6, h: 97.6, l: 94.4, c: 97.4 }, // c2: green engulfs c1
      { o: 97.4, h: 100.2, l: 97.2, c: 100.0 }, // c3: closes above c2's high
      { o: 100.0, h: 101.4, l: 99.8, c: 101.1 },
      { o: 101.1, h: 102.6, l: 100.9, c: 102.3 },
    ],
    patternStart: 3,
    patternLength: 3,
    callouts: [
      { candle: 3, target: "body", text: "A small red candle in a downtrend — sellers fading." },
      { candle: 4, target: "body", text: "A green candle fully engulfs it (a bullish engulfing)." },
      { candle: 5, target: "body", text: "A third green candle closes higher still — confirmation." },
    ],
    outcome: "The third candle proved the engulfing; buyers carried the reversal higher.",
    keyIdea: "Think of it as a bullish engulfing with built-in proof — the extra candle is why it's more reliable than the engulfing alone.",
  },

  "three-outside-down": {
    key: "three-outside-down",
    name: "Three Outside Down",
    bias: "bearish",
    tagline: "A bearish engulfing — confirmed by a third candle.",
    description:
      "A small green candle is engulfed by a big red one, then a third red candle closes even lower — confirming the reversal down.",
    candles: [
      { o: 91.0, h: 92.6, l: 90.8, c: 92.4 },
      { o: 92.4, h: 94.0, l: 92.2, c: 93.8 },
      { o: 93.8, h: 95.4, l: 93.6, c: 95.2 },
      { o: 95.2, h: 96.4, l: 95.0, c: 96.2 }, // c1: small green
      { o: 96.6, h: 96.8, l: 93.8, c: 94.0 }, // c2: red engulfs c1
      { o: 94.0, h: 94.2, l: 91.6, c: 91.8 }, // c3: closes below c2's low
      { o: 91.8, h: 92.0, l: 90.2, c: 90.5 },
      { o: 90.5, h: 90.7, l: 88.8, c: 89.1 },
    ],
    patternStart: 3,
    patternLength: 3,
    callouts: [
      { candle: 3, target: "body", text: "A small green candle in an uptrend — buyers fading." },
      { candle: 4, target: "body", text: "A red candle fully engulfs it (a bearish engulfing)." },
      { candle: 5, target: "body", text: "A third red candle closes lower still — confirmation." },
    ],
    outcome: "The third candle confirmed the engulfing; sellers drove the reversal lower.",
    keyIdea: "The bearish twin of three outside up — a bearish engulfing with a confirming candle baked in.",
  },

  "bullish-kicker": {
    key: "bullish-kicker",
    name: "Bullish Kicker",
    bias: "bullish",
    tagline: "A violent gap-up flip — one of the strongest signals.",
    description:
      "A bearish candle is followed by a candle that gaps up above the prior open and runs hard bullish — sentiment flips so fast there's no overlap. Often driven by surprise news.",
    candles: [
      { o: 100.0, h: 100.3, l: 98.0, c: 98.2 },
      { o: 98.2, h: 98.5, l: 96.0, c: 96.3 },
      { o: 96.3, h: 96.6, l: 94.2, c: 94.4 },
      { o: 96.0, h: 96.2, l: 93.0, c: 93.2 }, // c1: bearish
      { o: 96.4, h: 99.6, l: 96.4, c: 99.4 }, // c2: gaps up above c1's open, strong bull
      { o: 99.4, h: 101.0, l: 99.2, c: 100.8 },
      { o: 100.8, h: 102.2, l: 100.6, c: 102.0 },
      { o: 102.0, h: 103.4, l: 101.8, c: 103.2 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A bearish candle — sellers still in control." },
      { candle: 4, target: "lower", text: "The next candle opens ABOVE the prior open — a gap with no overlap." },
      { candle: 4, target: "body", text: "…and closes strongly bullish: a complete, violent sentiment flip." },
    ],
    outcome: "The gap was never filled; the kicker marked an abrupt, durable trend change higher.",
    keyIdea: "The gap that doesn't overlap is everything — it shows the market repriced instantly. Kickers rarely retrace, so chasing is the risk.",
  },

  "bearish-kicker": {
    key: "bearish-kicker",
    name: "Bearish Kicker",
    bias: "bearish",
    tagline: "A violent gap-down flip — the mirror of the kicker.",
    description:
      "A bullish candle is followed by a candle that gaps down below the prior open and runs hard bearish — an abrupt sentiment reversal with no overlap, often news-driven.",
    candles: [
      { o: 92.0, h: 94.0, l: 91.8, c: 93.8 },
      { o: 93.8, h: 95.8, l: 93.6, c: 95.6 },
      { o: 95.6, h: 97.4, l: 95.4, c: 97.2 },
      { o: 97.0, h: 100.0, l: 96.8, c: 99.8 }, // c1: bullish
      { o: 96.6, h: 96.6, l: 93.4, c: 93.6 }, // c2: gaps down below c1's open, strong bear
      { o: 93.6, h: 93.8, l: 92.0, c: 92.2 },
      { o: 92.2, h: 92.4, l: 90.6, c: 90.8 },
      { o: 90.8, h: 91.0, l: 89.2, c: 89.5 },
    ],
    patternStart: 3,
    patternLength: 2,
    callouts: [
      { candle: 3, target: "body", text: "A bullish candle — buyers still in control." },
      { candle: 4, target: "upper", text: "The next candle opens BELOW the prior open — a gap with no overlap." },
      { candle: 4, target: "body", text: "…and closes strongly bearish: an instant flip to sellers." },
    ],
    outcome: "The down-gap held; the kicker marked a sharp, lasting reversal lower.",
    keyIdea: "A non-overlapping gap against the trend plus a strong body is the signature — among the most reliable reversals, but it gives no easy pullback entry.",
  },
};

export const PATTERN_ORDER = [
  // Single-candle
  "doji",
  "long-legged-doji",
  "dragonfly-doji",
  "gravestone-doji",
  "hammer",
  "hanging-man",
  "inverted-hammer",
  "shooting-star",
  "bullish-marubozu",
  "bearish-marubozu",
  "spinning-top",
  // Two-candle
  "bullish-engulfing",
  "bearish-engulfing",
  "tweezer-bottom",
  "tweezer-top",
  "piercing-line",
  "dark-cloud-cover",
  "bullish-harami",
  "bearish-harami",
  "bullish-kicker",
  "bearish-kicker",
  // Three-candle
  "morning-star",
  "evening-star",
  "three-white-soldiers",
  "three-black-crows",
  "three-inside-up",
  "three-inside-down",
  "three-outside-up",
  "three-outside-down",
  "abandoned-baby",
  // Continuation
  "rising-three-methods",
  "falling-three-methods",
  "mat-hold",
  "separating-lines",
];

export function getPattern(key: string): Pattern | undefined {
  return PATTERNS[key];
}
