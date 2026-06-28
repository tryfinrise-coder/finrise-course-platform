// Course structure (families) + a practical trading guide for each pattern.
// Kept separate from patterns.ts so the lesson page can show rich, example-led
// content without bloating the candle data. Plain data — safe anywhere.

// ── Foundations: plain-English groundwork shown BEFORE the patterns, so a
//    complete beginner becomes a confident chart reader. These are text
//    lessons (no candle animation) rendered from the structure below.
export interface FoundationSection {
  heading: string;
  body: string;
  example?: string; // a real-life, market-based example
}
export interface FoundationLesson {
  slug: string;
  title: string;
  tagline: string;
  minutes: number;
  sections: FoundationSection[];
  takeaways: string[];
}

export const FOUNDATIONS: FoundationLesson[] = [
  {
    slug: "how-markets-work",
    title: "How markets actually work",
    tagline: "Before candles: who moves price, and why.",
    minutes: 6,
    sections: [
      {
        heading: "Every price is an agreement",
        body: "A market price isn't a fact handed down from above — it's simply the last price at which a buyer and a seller agreed to trade. The moment they disagree, price has to move to find the next agreement. A chart is just a recording of those agreements, one after another.",
        example: "Think of a single share of a company like one ripe mango at a busy market. If ten people want it and only one is selling, the price is bid up until only one buyer is left. If one person is selling and nobody wants it, they keep dropping the price until someone bites.",
      },
      {
        heading: "Supply and demand move everything",
        body: "When buyers are more eager than sellers (demand > supply), price rises until enough sellers appear. When sellers are more eager (supply > demand), price falls until enough buyers step in. That constant tug-of-war is the only thing that moves a market — every pattern you'll learn is just a snapshot of who's winning.",
        example: "Concert tickets for a hyped artist sell out and resell for 5× face value — overwhelming demand, fixed supply. The same band a year later can't fill seats, so prices get slashed — supply now outweighs demand.",
      },
      {
        heading: "Big orders leave footprints",
        body: "Large buyers (funds, institutions) can't buy quietly — to fill a big order they have to 'lift' price by clearing out the sellers above. Large sellers do the reverse. Those bursts of pressure are exactly what create the long candles and sharp moves you'll learn to read.",
      },
      {
        heading: "A chart is crowd psychology, drawn",
        body: "Fear and greed repeat. People panic-sell at the same kinds of moments and chase rallies at the same kinds of moments — which is why patterns from 300 years ago still work today. You're not predicting the future; you're reading the balance of emotion right now and betting on what usually happens next.",
      },
    ],
    takeaways: [
      "Price moves only when buyers and sellers disagree.",
      "Rising price = demand beating supply; falling price = the opposite.",
      "Charts record human psychology — that's why patterns repeat.",
    ],
  },
  {
    slug: "anatomy-of-a-candle",
    title: "How a candlestick works",
    tagline: "Read one candle and you can read them all.",
    minutes: 7,
    sections: [
      {
        heading: "Four prices, one bar",
        body: "Every candlestick packs four numbers from a single time period: the Open (first trade), the High (top), the Low (bottom), and the Close (last trade). One candle might be 5 minutes, 1 hour, or a full day — but it always tells the same four-part story.",
      },
      {
        heading: "The body = who won",
        body: "The thick part (the body) runs from open to close. If price closed ABOVE where it opened, the candle is green — buyers won the session. If it closed BELOW the open, it's red — sellers won. A long body means one side dominated with conviction; a tiny body means the fight was a draw.",
        example: "A big green daily candle on a stock after good earnings = buyers steamrolled sellers all day. A big red one after bad news = sellers in control from open to close.",
      },
      {
        heading: "The wicks = the rejected extremes",
        body: "The thin lines above and below the body are the wicks (or shadows). They mark how far price travelled before getting pushed back. A long lower wick means price fell hard but buyers slammed it back up — a rejection of lower prices. A long upper wick means the opposite: buyers pushed up but sellers rejected it.",
        example: "Price dives to a round number like $100, prints a long lower wick, and closes back at $103 — buyers defended $100. That single wick tells you where demand showed up.",
      },
      {
        heading: "Putting one candle together",
        body: "Read a candle in this order: where did it close vs open (colour), how big is the body (conviction), and which wick is longer (who got rejected). Do that on the last five candles of any chart and you're already reading price action better than most beginners.",
      },
    ],
    takeaways: [
      "Body = open-to-close: green means buyers won, red means sellers won.",
      "Body size shows conviction; wicks show rejected extremes.",
      "Colour → body size → longer wick: that's how to read any candle.",
    ],
  },
  {
    slug: "trend-support-resistance",
    title: "Trends, support & resistance",
    tagline: "Context first — then the candle is your trigger.",
    minutes: 7,
    sections: [
      {
        heading: "The trend is your backdrop",
        body: "Zoom out before you zoom in. A series of higher highs and higher lows is an uptrend (buyers in control). Lower highs and lower lows is a downtrend. Sideways chop is a range. Trading a pattern WITH the trend is far higher-probability than fighting it.",
      },
      {
        heading: "Support and resistance: floors and ceilings",
        body: "Support is a price floor where buyers keep stepping in; resistance is a ceiling where sellers keep appearing. These are the levels the whole market watches — previous highs/lows, round numbers, and prior turning points. Price tends to react, not pass cleanly, at these levels.",
        example: "Gold stalls at $2,000 three times and bounces each time — that's resistance. Once it finally breaks above and holds, that same $2,000 often becomes support.",
      },
      {
        heading: "Location is everything",
        body: "A reversal candle in the middle of nowhere is close to random. The exact same candle right at a tested support or resistance has a real edge. This is the single biggest filter you can apply: don't ask only 'what is this candle?' — ask 'where is it forming?'",
      },
      {
        heading: "How to actually use candlesticks",
        body: "The professional sequence: (1) read the trend and mark key levels, (2) wait for a candlestick signal AT one of those levels, (3) wait for the next candle to confirm, (4) enter with a stop just beyond the pattern so your risk is defined. Context + signal + confirmation + defined risk — every trade in this course follows that recipe.",
      },
    ],
    takeaways: [
      "Trade with the trend; mark support/resistance before anything else.",
      "A pattern at a key level beats the same pattern in open air.",
      "Always pair a candle signal with confirmation and a defined stop.",
    ],
  },
  {
    slug: "risk-management",
    title: "Risk management: entries & exits",
    tagline: "The skill that keeps you in the game — size, ladder in, and exit with a plan.",
    minutes: 9,
    sections: [
      {
        heading: "Why this is the #1 skill",
        body: "You can be wrong half the time and still grow your account — IF every loss is small and every win is allowed to be bigger. The maths is brutal the other way: lose 50% of your capital and you now need a 100% gain just to get back to even. Protecting capital isn't the boring part of trading; it IS the trading. Everything else is just finding entries.",
        example: "Two traders both win 50% of their trades. One risks ₹2,000 to make ₹4,000; the other risks ₹4,000 to make ₹2,000. After 100 trades the first is far ahead and the second is broke — same win rate, opposite outcome. Reward-to-risk decides who survives.",
      },
      {
        heading: "Risk a fixed slice per trade",
        body: "Before anything else, decide the most you'll lose on ONE trade — for most people that's 1–2% of total capital. Then your position size is simple: Shares = (capital × risk%) ÷ (entry − stop). The stop distance sets the size, never the other way around. This single rule means no single trade — or even a string of losers — can sink you.",
        example: "Capital ₹1,00,000, risking 2% = ₹2,000 max loss. If you buy at ₹500 with a stop at ₹480 (₹20 risk per share), you buy 100 shares (₹2,000 ÷ ₹20). If the stop were tighter at ₹490 (₹10 risk), you could buy 200 — same rupee risk, bigger position.",
      },
      {
        heading: "Decide your stop BEFORE you enter",
        body: "The stop-loss is where your trade idea is proven wrong — it goes just beyond the pattern or the level you're trading (below support for a long, above resistance for a short). You place it before you enter, while you're calm, and you do not move it wider once you're in. A trade without a pre-planned stop isn't a trade; it's a hope.",
      },
      {
        heading: "Enter at multiple prices (ladder in)",
        body: "You'll rarely buy the exact bottom. So instead of going all-in at one price, split your planned position into 2–3 equal parts and buy them as price works into your support zone. Your average entry improves, a single mistimed tick can't define the trade, and your stop still sits below the WHOLE zone, sized on the full position. (See chart 1 below.)",
        example: "You want ₹30,000 of a stock near support. Buy ₹10,000 at ₹118, ₹10,000 at ₹109, ₹10,000 at ₹105 — average ₹111 — with one stop at ₹99 for the lot. If it bounces from ₹105 you got a great average; if it never dips, your first tranche still caught the move.",
      },
      {
        heading: "Exit in pieces, not all at once",
        body: "Exits decide your profit, so plan them too. Bank part of the position at the first logical target (often the next resistance), another part at the second, and let a final piece run. The instant your first target hits, move your stop up to your entry — now the trade literally cannot lose money. (See chart 2 below.)",
        example: "Long from ₹110. Sell ⅓ at ₹124 (first resistance), sell ⅓ at ₹138 (next level), trail the last ⅓. Stop moves to ₹110 the moment ₹124 prints — worst case now is a free trade.",
      },
      {
        heading: "Trail the stop to lock in gains",
        body: "For the runner, drag your stop up underneath each new higher low as the trend climbs — never wider, only tighter. When price finally turns and tags the trailed stop, you're taken out with most of the move banked. The trail makes the exit decision for you, so fear and greed don't. (See chart 3 below.)",
      },
    ],
    takeaways: [
      "Risk a fixed 1–2% per trade; the stop distance sets your position size.",
      "Place the stop before you enter — and never widen it.",
      "Ladder into support at multiple prices for a better average and defined risk.",
      "Scale OUT at targets, move the stop to breakeven, and trail the runner.",
    ],
  },
];

export const FOUNDATION_BY_SLUG: Record<string, FoundationLesson> = Object.fromEntries(
  FOUNDATIONS.map((f) => [f.slug, f])
);

export interface PatternGuide {
  howToTrade: string; // entry trigger + target idea, in plain English
  stop: string; // where the stop-loss goes (the pattern's invalidation)
  reliability: string; // when it works best
  bestTf: string; // timeframes it's most trustworthy on
  tips: string[]; // practical tips & common mistakes
}

export interface Family {
  title: string;
  blurb: string;
  keys: string[];
}

export const PATTERN_FAMILIES: Family[] = [
  {
    title: "Single-candle patterns",
    blurb: "One bar tells the story — exhaustion, rejection, or raw momentum.",
    keys: [
      "doji", "long-legged-doji", "dragonfly-doji", "gravestone-doji", "hammer",
      "hanging-man", "inverted-hammer", "shooting-star", "bullish-marubozu",
      "bearish-marubozu", "spinning-top",
    ],
  },
  {
    title: "Two-candle patterns",
    blurb: "A handover of control between buyers and sellers across two sessions.",
    keys: [
      "bullish-engulfing", "bearish-engulfing", "tweezer-bottom", "tweezer-top",
      "piercing-line", "dark-cloud-cover", "bullish-harami", "bearish-harami",
      "bullish-kicker", "bearish-kicker",
    ],
  },
  {
    title: "Three-candle patterns",
    blurb: "A complete narrative: dominance, the turn, and the confirmation.",
    keys: [
      "morning-star", "evening-star", "three-white-soldiers", "three-black-crows",
      "three-inside-up", "three-inside-down", "three-outside-up", "three-outside-down",
      "abandoned-baby",
    ],
  },
  {
    title: "Continuation patterns",
    blurb: "Healthy pauses inside a trend — the market catching its breath.",
    keys: ["rising-three-methods", "falling-three-methods", "mat-hold", "separating-lines"],
  },
];

const g = (
  howToTrade: string,
  stop: string,
  reliability: string,
  bestTf: string,
  tips: string[]
): PatternGuide => ({ howToTrade, stop, reliability, bestTf, tips });

export const PATTERN_GUIDE: Record<string, PatternGuide> = {
  doji: g(
    "Don't trade the doji alone. After a strong trend, wait for the next candle to close against the trend, then enter in that direction on the open of the following bar.",
    "Just beyond the doji's far wick (above for shorts, below for longs).",
    "Medium — needs a strong prior trend and a confirming close.",
    "H4 · D1",
    ["A doji mid-range is noise — only act on one after an extended run.", "The longer the wicks, the more meaningful the indecision.", "Pair it with a key level for an edge."]
  ),
  "long-legged-doji": g(
    "Treat it as a volatility climax. Wait for the next candle to pick a side, then trade the breakout of the doji's range.",
    "Outside the doji's extreme high/low — its range already shows full session volatility.",
    "Medium — strongest right at major support/resistance.",
    "H4 · D1",
    ["Common around news — avoid entering until spreads normalise.", "Huge range + tiny body = two-sided exhaustion.", "Use the doji's range as your breakout box."]
  ),
  "dragonfly-doji": g(
    "After a downtrend, buy on a bullish close above the dragonfly's high; target the prior swing high.",
    "A few pips below the long lower wick — the level buyers defended.",
    "High at support after a clean downtrend.",
    "H4 · D1",
    ["Best when the long wick taps a known support or round number.", "Volume on the rejection adds conviction.", "No upper wick is ideal — it shows buyers closed at the top."]
  ),
  "gravestone-doji": g(
    "After an uptrend, short on a bearish close below the gravestone's low; target the prior swing low.",
    "A few pips above the long upper wick — where sellers defended.",
    "High at resistance after an uptrend.",
    "H4 · D1",
    ["Strongest at a tested resistance or prior day's high.", "The mirror of the dragonfly — read it the same way, inverted.", "A gap down the next session strengthens it."]
  ),
  hammer: g(
    "After a downtrend, enter long on a close above the hammer's high (or a small pullback to its body). Target the nearest swing high; aim for at least 1:2.",
    "Below the hammer's low — a close under it invalidates the reversal.",
    "High at established support.",
    "H4 · D1",
    ["Lower wick ≥ 2× the body is the key proportion.", "A green hammer is slightly stronger than red.", "Don't buy a hammer in mid-air — location at support is everything."]
  ),
  "hanging-man": g(
    "After an uptrend, short on a bearish confirmation candle closing below the hanging man's body.",
    "Above the hanging man's high.",
    "Medium — always needs confirmation.",
    "H4 · D1",
    ["Same shape as a hammer — only the location (a top) makes it bearish.", "Never short it without the confirming red candle.", "Best near resistance or after an extended rally."]
  ),
  "inverted-hammer": g(
    "After a downtrend, wait for a green candle to close above the inverted hammer's high, then enter long.",
    "Below the inverted hammer's low.",
    "Medium — weaker than a hammer; demands confirmation.",
    "H4 · D1",
    ["The long upper wick shows buyers probing — confirmation is mandatory.", "Skip it without a follow-through candle.", "A gap up next session is a strong tell."]
  ),
  "shooting-star": g(
    "After an uptrend, short on a bearish close below the shooting star's body; target the prior swing low.",
    "Above the shooting star's upper wick.",
    "High at resistance in an uptrend.",
    "H4 · D1",
    ["Upper wick ≥ 2× the body, little/no lower wick.", "Same shape as an inverted hammer — location flips the meaning.", "Strongest at a clean resistance or round number."]
  ),
  "bullish-marubozu": g(
    "Trade with it — buy a shallow pullback toward the candle's midpoint, riding the momentum.",
    "Below the marubozu's low (its open).",
    "High for momentum continuation, not reversal.",
    "H1 · H4",
    ["No wicks = total control; don't fade it.", "Best in the direction of the higher-timeframe trend.", "Pullback entries beat chasing the close."]
  ),
  "bearish-marubozu": g(
    "Trade with it — short a small rally toward the candle's midpoint.",
    "Above the marubozu's high (its open).",
    "High for momentum continuation.",
    "H1 · H4",
    ["A full red body signals relentless selling — go with it.", "Avoid counter-trend longs right after one.", "Midpoint pullbacks are the cleaner entries."]
  ),
  "spinning-top": g(
    "Don't trade it directly — use it as a warning. After a strong move, tighten stops and wait for the next 1–2 candles to confirm a turn.",
    "Beyond the wick opposite your eventual trade direction.",
    "Low on its own; useful as a context flag.",
    "Any timeframe",
    ["Small body, two similar wicks = balance.", "After a trend it hints at fading momentum.", "In a range it's just noise — ignore it."]
  ),
  "bullish-engulfing": g(
    "Enter long on the close of the engulfing candle, or on a pullback to its midpoint next session. Target the prior swing high.",
    "Below the low of the engulfing candle.",
    "High — among the top-three reversal patterns.",
    "H4 · D1",
    ["The green body must fully cover the prior red body, open-to-close.", "Bigger engulfing body = more conviction (institutional flow).", "At support, it's one of the most reliable longs."]
  ),
  "bearish-engulfing": g(
    "Short on the close of the engulfing candle, or a pullback to its midpoint. Target the prior swing low.",
    "Above the high of the engulfing candle.",
    "High at resistance after an uptrend.",
    "H4 · D1",
    ["Red body must swallow the prior green body.", "Best at a tested resistance or round number.", "Volume expansion on the engulf is a strong confirmation."]
  ),
  "tweezer-bottom": g(
    "Buy on the candle after the tweezer that takes out the second candle's high; target the prior swing high.",
    "A few pips below the matched low.",
    "Medium; high at major support.",
    "H1 · H4",
    ["Two identical lows = a level defended twice.", "Strongest when the second candle is bullish.", "Align it with a horizontal support for an edge."]
  ),
  "tweezer-top": g(
    "Short on the candle after the tweezer that breaks the second candle's low; target the prior swing low.",
    "A few pips above the matched high.",
    "Medium; high at major resistance.",
    "H1 · H4",
    ["Two matched highs = a ceiling tested twice.", "Best when the second candle is bearish.", "Use with a resistance level, not in open air."]
  ),
  "piercing-line": g(
    "Enter long on a continuation candle that takes out candle-2's high. Deeper piercing into candle-1 = stronger.",
    "Below candle-2's low.",
    "Medium — a weaker cousin of the engulfing.",
    "H4 · D1",
    ["Candle-2 must close past the 50% mark of candle-1.", "Opening below candle-1's low then reversing is ideal.", "The deeper the close, the closer to an engulfing."]
  ),
  "dark-cloud-cover": g(
    "Short on a continuation candle that takes out candle-2's low. Deeper close into candle-1 = stronger.",
    "Above candle-2's high.",
    "Medium.",
    "H4 · D1",
    ["Candle-2 opens above candle-1's high, closes below its midpoint.", "Shows where supply lives at the top.", "A near-full close acts like a bearish engulfing."]
  ),
  "bullish-harami": g(
    "Wait for a bullish candle to break above the harami before entering long — the small inside candle is only a pause.",
    "Below the low of the first (large) candle.",
    "Medium — confirmation required.",
    "H4 · D1",
    ["The small candle's body sits inside the prior body.", "It's a loss of momentum, not yet a reversal.", "Three Inside Up is this pattern with the confirmation built in."]
  ),
  "bearish-harami": g(
    "Wait for a bearish candle to break below the harami before shorting.",
    "Above the high of the first candle.",
    "Medium — confirmation required.",
    "H4 · D1",
    ["A small body contained in the prior big green candle.", "Warns buyers are running out of room.", "Pairs naturally with Three Inside Down."]
  ),
  "bullish-kicker": g(
    "Strongest on the gap. Conservative traders buy the first shallow pullback after the kicker; aggressive traders enter on the close of the gap candle.",
    "Inside the gap, or below the kicker candle's low.",
    "Very high — among the most powerful reversals.",
    "H4 · D1",
    ["The non-overlapping gap is the whole signal.", "Often news-driven — kickers rarely give a pullback.", "Don't wait too long; these run without retracing."]
  ),
  "bearish-kicker": g(
    "Short the first weak bounce after the kicker, or on the close of the gap candle.",
    "Inside the gap, or above the kicker candle's high.",
    "Very high.",
    "H4 · D1",
    ["A down-gap with no overlap plus a strong body.", "Typically a reaction to surprise news.", "Expect little to no retrace for an easy entry."]
  ),
  "morning-star": g(
    "Enter long on the close of the third candle, or a pullback to its midpoint. Target the prior swing high or the start of the down-move.",
    "Below the low of the star (the middle candle).",
    "High — among the most reliable reversals.",
    "H4 · D1 · W1",
    ["The small middle star is the hinge — selling drying up.", "Deeper close of candle-3 into candle-1 = stronger.", "A gap around the star adds power."]
  ),
  "evening-star": g(
    "Short on the close of the third candle, or a pullback to its midpoint. Target the prior swing low.",
    "Above the high of the star.",
    "High.",
    "H4 · D1 · W1",
    ["A small star after a strong rally is the warning.", "The third red candle is the trigger.", "Best at resistance or after an extended uptrend."]
  ),
  "three-white-soldiers": g(
    "Don't chase — after three strong greens price is extended. Buy the first shallow pullback in the new uptrend.",
    "Below the open of the first soldier, or the recent swing low.",
    "High; warning: do not chase.",
    "H4 · D1",
    ["Each candle opens within the prior body, closes near its high.", "Small upper wicks show buyers in firm control.", "Waiting for a pullback beats buying the third candle."]
  ),
  "three-black-crows": g(
    "Wait for a retracement before shorting — price is extended after three reds.",
    "Above the open of the first crow.",
    "High; do not chase.",
    "H4 · D1",
    ["Each opens within the prior body, closes near its low.", "Relentless selling with little pushback.", "Short the bounce, not the third crow."]
  ),
  "three-inside-up": g(
    "Enter long on the close of the third candle — the confirmation is built in.",
    "Below the low of the first (long red) candle.",
    "High.",
    "H4 · D1",
    ["Harami first, then a candle closing above candle-1's high.", "More reliable than a bare harami.", "Best off a clear support."]
  ),
  "three-inside-down": g(
    "Short on the close of the third candle.",
    "Above the high of the first (long green) candle.",
    "High.",
    "H4 · D1",
    ["A bearish harami plus a confirming red close.", "The proof the harami only suggested.", "Strongest at resistance."]
  ),
  "three-outside-up": g(
    "Enter long on the close of the third candle, which closes above the engulfing candle's high.",
    "Below the low of the engulfing candle.",
    "High — engulfing with confirmation.",
    "H4 · D1",
    ["A bullish engulfing followed by a higher close.", "The confirmation reduces failed engulfings.", "Great at support after a clean downtrend."]
  ),
  "three-outside-down": g(
    "Short on the close of the third candle, below the engulfing candle's low.",
    "Above the high of the engulfing candle.",
    "High.",
    "H4 · D1",
    ["A bearish engulfing with a confirming lower close.", "More trustworthy than the engulfing alone.", "Best at resistance."]
  ),
  "abandoned-baby": g(
    "Rare but powerful — enter on the close of the third (gapped) candle. Most common on gold around the weekly open or major news.",
    "Below the low of the doji (bullish) / above its high (bearish).",
    "Very high when it occurs — but rare.",
    "D1 · W1",
    ["A doji isolated by gaps on both sides.", "24-hour forex rarely gaps, so it's uncommon there.", "When it appears at a key level, take it seriously."]
  ),
  "rising-three-methods": g(
    "Buy the breakout — enter on the final long candle that closes above the first candle's high, riding the resumed uptrend.",
    "Below the low of the first long bullish candle.",
    "High in established uptrends.",
    "H4 · D1",
    ["The small pullback candles must stay inside the first candle's range.", "Volume falls on the pause, expands on the breakout.", "A continuation pattern — trade with the trend."]
  ),
  "falling-three-methods": g(
    "Sell the breakdown — enter on the final long candle closing below the first candle's low.",
    "Above the high of the first long bearish candle.",
    "High in established downtrends.",
    "H4 · D1",
    ["The small bounce candles stay inside the first candle's range.", "The pause is profit-taking, not a reversal.", "Go with the dominant downtrend."]
  ),
  "mat-hold": g(
    "Buy the resumption candle that takes out the first candle's high. The unfilled gap during the pause is your conviction signal.",
    "Below the low of the first long bullish candle.",
    "High — often stronger than rising three methods.",
    "H4 · D1",
    ["Small pullback candles never fill the gap — bulls defend it.", "The held gap shows extra aggression.", "A continuation play; trade with the trend."]
  ),
  "separating-lines": g(
    "Enter with the trend when the second candle opens at the prior candle's open and closes strongly in the trend direction.",
    "Beyond the second candle's far extreme.",
    "Medium — a continuation signal.",
    "H4 · D1",
    ["Matching opens are the signature.", "The trend side reclaims control instantly.", "Use it to add to an existing trend position, not to reverse."]
  ),
};
