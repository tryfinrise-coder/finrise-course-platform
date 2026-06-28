export interface PlaybookTip {
  icon: string; // one emoji
  title: string; // 2-4 words
  body: string; // 1-2 concrete sentences
}

export const PLAYBOOK: Record<string, PlaybookTip[]> = {
  doji: [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Never buy or sell the doji itself — it is a question mark, not an answer. Wait for the next candle to close clearly above or below the doji's range, then enter on the open of the bar after that.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop just beyond the doji's far wick in the direction opposite your trade — above the upper wick for shorts, below the lower wick for longs. Price closing past that extreme says the 'pause' was actually continuation.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A doji only carries weight after an extended trend run — not in the middle of a choppy range. The longer the prior trend, the more a doji matters as an exhaustion flag.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The closer the open and close are to each other, the purer the indecision signal. A doji with one wick dramatically longer than the other is leaning toward that direction — treat it more like a hammer or gravestone in that case.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Traders jump in on the doji itself, anticipating the reversal before it is confirmed — and the trend just continues, stopping them out. The doji earns its edge only from the confirmation candle that follows.",
    },
  ],

  "long-legged-doji": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Use the doji's full range as a breakout box: wait for the next candle to close convincingly outside the doji's high or low, then trade in that direction. Do not guess mid-range which way it resolves.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop at the opposite extreme of the long-legged doji — if you break above the high, stop goes below the low. The doji's range already captured full session volatility, so that stop is your worst-case.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "This pattern is most meaningful at a major support or resistance level, or right after a news event. A long-legged doji in the middle of a quiet trend is often just noise from low liquidity.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The larger the total range relative to recent candles, the more extreme the indecision — a long-legged doji with a range 3× the average true range signals a genuine volatility climax, not a routine pause.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Entering immediately after the long-legged doji closes without waiting for directional confirmation means you are flipping a coin inside a chaotic candle. Spreads are often still wide right after a volatile session — wait for the market to settle.",
    },
  ],

  "dragonfly-doji": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long once the candle after the dragonfly closes above the dragonfly's high — that is the body plus the (near-zero) upper wick. The break above confirms buyers are following through, not just trapping longs at the low.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Put the stop a few ticks below the long lower wick — the price level buyers defended intrabar. A close below that wick means the support is broken and the entire rejection argument is void.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A dragonfly doji is most powerful when its lower wick taps a known horizontal support, a round number, or a prior swing low. Without that external level, the wick is just a bounce, not a defended floor.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The ideal dragonfly has virtually no upper wick — open and close are at the very top of the range. Any notable upper wick means buyers lost some ground by the close, weakening the bullish case.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Buying because the wick looks impressive without checking the trend: a dragonfly in a strong downtrend after no support zone is likely just a blip before more selling. Context beats the candle shape alone.",
    },
  ],

  "gravestone-doji": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short only after the next candle closes below the gravestone's open/close level — the flat body at the bottom of the range. That bearish close is the confirmation sellers followed up after the intrabar rejection.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop a few ticks above the tip of the long upper wick — the exact level where sellers stepped in and rejected price. A close above that wick invalidates the resistance argument entirely.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A gravestone doji earns full weight when its upper wick spikes into a tested resistance zone, a prior swing high, or a round number. The same candle forming in clear air after no resistance carries far less edge.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "There should be no meaningful lower wick — open, low, and close cluster together at the bottom of the bar. Any lower wick means sellers also lost some ground, diluting the bearish signal.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting the gravestone without a confirming bearish candle next, hoping the rejection alone is enough — then watching price gap up the following session and stop you out above the wick.",
    },
  ],

  hammer: [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Do not buy the hammer itself — wait for the next candle to close above the hammer's high, then enter. That break confirms buyers followed through and the rejection of lower prices was real.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Put the stop just below the hammer's low — the bottom of the long lower wick. If price closes back under that level, the intrabar rejection failed and the downtrend is resuming.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A hammer only matters after a clear downtrend and ideally at a known support level. In the middle of a range or in an uptrend, it is not a reversal signal — it is just a candle.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The lower wick should be at least 2× the body length — ideally 2–3×. A wick shorter than the body is barely a hammer; the oversized wick is what tells you sellers were decisively overcome.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Chasing a hammer whose range is two or three times larger than normal, forcing a stop so wide the trade no longer has positive reward-to-risk. Oversized hammers look dramatic but kill the math — skip them.",
    },
  ],

  "hanging-man": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Never short the hanging man itself — it still closed near the top. Wait for the next candle to close bearishly below the hanging man's body, then enter short on the open of the bar after.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop above the hanging man's high — if buyers push price above it, the downward warning is cancelled and the uptrend likely continues.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "The hanging man only carries a bearish meaning at the top of an established uptrend — ideally where price is pressing a prior resistance or round number for the first time in the move.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The significance lies in the lower wick: sellers reached down hard intrabar for the first time in the uptrend, showing buy-side absorption is weakening. A wick 2× or more below the body is the key proportion to look for.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Treating the hanging man like a hammer and buying it — because the shape looks the same. The identical candle shape means opposite things depending on where it appears in the trend; location is everything.",
    },
  ],

  "inverted-hammer": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Wait for a green candle to close above the inverted hammer's high — that confirmation shows buyers are now also following through on the upside probe, not just testing it. Enter on the break of that confirmation candle's high.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below the inverted hammer's low — the small body near the bottom of the candle. A close below that low means the downtrend is still intact and the probe higher was rejected.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "The inverted hammer must appear after a clear downtrend to have any reversal meaning. At a known support level the signal is strongest — the location filters out the many false inverted hammers that form mid-trend.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "A gap up on the following session is an especially strong tell, as it means buyers opened the next day at a premium and sellers were not in a position to push back. A gap plus confirmation close above the high is the ideal setup.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Confusing this with a shooting star — both have a long upper wick and a small body. The key difference is location: after a downtrend it is an inverted hammer (bullish); after an uptrend it is a shooting star (bearish).",
    },
  ],

  "shooting-star": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the close of the candle following the shooting star, once that candle closes below the shooting star's body. You are waiting for sellers to confirm the rejection that the long upper wick signalled.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop above the tip of the shooting star's upper wick — the high that buyers briefly reached before being slammed back. A close above that wick negates the rejection and the short idea.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "The shooting star carries the most weight after a multi-session uptrend, right at a prior resistance or round number. A shooting star at a fresh all-time high is even more powerful — buyers pushed beyond history and failed.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The upper wick should be at least 2× the body length, and the lower wick should be minimal or absent. A long lower wick says buyers fought back — it weakens the rejection story and reduces the edge of the short.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting the shooting star candle itself, before confirmation, only to see the next session gap up above the wick and stop you out. The wick is a warning flag — the next candle is the verdict.",
    },
  ],

  "bullish-marubozu": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Do not chase the marubozu if it has already closed — the whole move is in that single candle. Instead, wait for a shallow pullback to the candle's midpoint and enter long there, with the trend and momentum behind you.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop below the marubozu's low, which equals its open — the precise level where buyers took control. A close below the open means the no-wick conviction was a one-session anomaly, not true momentum.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A bullish marubozu works best as a continuation signal when it fires in the direction of a higher-timeframe uptrend, often after a breakout from consolidation. As a reversal signal at the bottom of a downtrend, it carries less historical edge.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "A true marubozu has zero upper and zero lower wick — open equals the low exactly, close equals the high exactly. Any wick at all reduces its grade; a candle with tiny wicks is a near-marubozu and still strong, but the cleaner the bar, the better.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Fading the marubozu — assuming such a big move must reverse — and shorting into it. A candle with no wicks represents total buyer dominance across the whole session; counter-trend trades against it usually take significant heat.",
    },
  ],

  "bearish-marubozu": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Rather than shorting the already-closed marubozu, wait for a weak bounce toward the candle's midpoint — about halfway between its open (the high) and its close (the low) — then enter short as that bounce stalls.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop above the bearish marubozu's open — its session high, which equals the high of the candle. A close above the open means buyers reclaimed the entire intraday range and the seller dominance narrative is broken.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A bearish marubozu is most powerful as a continuation signal when it fires within an existing downtrend, especially after a breakdown through a key support. As a lone reversal at a top, require additional context before shorting.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The absence of both wicks is the defining feature — sellers dominated every tick from open to close with no pushback. If there is any upper wick, buyers fought back at some point during the session, which is worth noting as a partial rejection.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Buying a pullback too aggressively into the marubozu on the assumption that 'such a big red candle must bounce' — only to find the next session gaps lower and continues the move. Momentum candles with no wicks rarely reverse quickly.",
    },
  ],

  "spinning-top": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Never trade the spinning top itself — it is a pause signal, not a setup. Use it as a cue to tighten existing positions or watch for the next candle; if that candle breaks beyond the spinning top's range with conviction, trade the breakout.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "If you do enter on the next candle's breakout of the spinning top's range, set the stop on the opposite side of the spinning top's range. The small candle's full range — from its lower to upper wick — is your buffer zone.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A spinning top carries its most useful information after an extended trend, where it indicates fading momentum. In a sideways range it is routine noise — both wicks equal means nothing when the market has been going nowhere anyway.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The key proportion is a small body flanked by two roughly symmetrical wicks. The taller those wicks relative to the body, the more intense the battle — a spinning top with very long equal wicks is approaching a long-legged doji in significance.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Reading a spinning top after an uptrend as an automatic short signal and entering prematurely — then watching the trend resume, because indecision candles require a directional confirmation candle before any trade is justified.",
    },
  ],

  "bullish-engulfing": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the engulfing candle itself — its close above the prior red body's open is the event that confirms buyer dominance. Alternatively, buy a pullback to the engulfing candle's midpoint in the next session.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Put the stop below the low of the engulfing (green) candle. If price closes under the engulfing candle's low, buyers have completely lost the ground they took and the reversal argument is gone.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A bullish engulfing at a tested horizontal support after a multi-candle downtrend is one of the most reliable setups in price action trading. The same pattern forming without a prior trend or level context is significantly weaker.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The green body must completely cover the prior red body open-to-close — not just the wicks. The larger the green body relative to the red body, the stronger the signal, as a bigger ratio implies heavier institutional buying pressure.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Accepting a partial engulf — where the green body merely overlaps rather than fully swallows the red body — as a valid pattern. If it does not engulf body-to-body, it is not a bullish engulfing; it is a larger green candle and nothing more.",
    },
  ],

  "bearish-engulfing": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the close of the engulfing (red) candle — its close below the prior green body's open is the moment sellers took full control. A pullback entry toward the engulfing candle's midpoint in the next session is the safer alternative.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop above the high of the bearish engulfing candle. A close above that high means buyers have reclaimed even the engulfing candle's extreme and the reversal has failed.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A bearish engulfing at a tested resistance level after an extended uptrend is among the most reliable short setups. A bearish engulfing after only two or three green candles, without a clear trend, carries far less weight.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The red body must fully cover the green body open-to-close — wicks are irrelevant to qualification. An exceptionally wide red body that also engulfs prior wicks is an even stronger signal of aggressive institutional selling.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Ignoring volume: a bearish engulfing that fires on notably higher-than-average volume carries genuine institutional weight; one that fires on thin, drifting volume is often a false breakdown that reverses the following session.",
    },
  ],

  "tweezer-bottom": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the candle that breaks above the second candle's high — not on the tweezer itself. The matching lows identify the support; the breakout above candle two's high confirms buyers are acting on it.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop a few ticks below the matched low — the price level buyers defended twice in a row. A close below that identical low means the double defence failed and the downtrend continues.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A tweezer bottom is most powerful when the matched low aligns with a higher-timeframe horizontal support, a round number, or a prior swing low. Two identical lows in open space, without an external reference, are far less reliable.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The lows do not need to be tick-perfect — within a couple of ticks of each other still counts. What matters is that the second candle is bullish (green body), as that shows buyers immediately reclaimed the tested level after it was hit again.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Buying on the close of the second tweezer candle before the breakout is confirmed, then getting stopped out when price tests the matched low a third time and finally fails. Wait for the level to hold and the breakout to materialise.",
    },
  ],

  "tweezer-top": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter short on the candle that breaks below the second tweezer candle's low — the matched highs define the resistance ceiling, and the breakdown below candle two's low is the signal sellers are acting on it.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop a few ticks above the matched high — the price sellers defended twice. Any close above that level means the resistance has been broken and the tweezer top has failed.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "The tweezer top is most credible when the matched highs coincide with a prior resistance, an all-time high, or a round number that the market has respected before. Without an external level anchoring it, two matching wicks are just coincidence.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The second candle should close bearish (red body) — that is what makes this a reversal rather than just a double wick at resistance. A second candle that closes green but with the same high still qualifies, but demands an extra bearish confirmation candle.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting on the close of the second tweezer candle and placing the stop just above the matched high — only to be taken out by a brief spike through resistance before the actual reversal. Give the stop a little room above the matched wick tip.",
    },
  ],

  "piercing-line": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the next candle that closes above candle two's high — not on the piercing candle itself. The piercing line shows buyers are present, but the extra confirmation reduces the chance of a failed reversal.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below candle two's low — the open of the green candle, which is the lowest point it touched before surging. A close below that open means buyers lost the entire ground they recovered.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A piercing line after a sustained downtrend at a horizontal support is the cleanest setup. When it forms at the midpoint of a range with no clear level beneath it, the pattern lacks the structural backing to sustain a reversal.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The deeper candle two closes into candle one's body — ideally past the 50% mark but approaching the open of candle one — the stronger the signal, edging toward a full bullish engulfing. A close just past the midpoint is valid but weaker.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Accepting a piercing line where candle two barely reaches the midpoint of candle one — that is the minimum, not a strong signal. Traders who enter every marginal piercing get chopped repeatedly; the deeper the pierce, the better the odds.",
    },
  ],

  "dark-cloud-cover": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the next candle that closes below candle two's low — not on the dark cloud candle itself. The gap-up open and deep close identify where sellers live; the follow-through candle confirms they are pushing price lower.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop above candle two's high — its opening price, which was the highest point before sellers took over. A close above that gap-up open means buyers have reclaimed the premium and the setup has failed.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Dark cloud cover at a prior resistance or just below a round-number ceiling — where sellers were always likely to appear — carries genuine weight. The same pattern mid-trend without a price level above it is lower probability.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The deeper candle two closes into candle one's bullish body — past the midpoint, toward candle one's open — the more this pattern resembles a full bearish engulfing and the stronger the sell signal becomes.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting the dark cloud candle before confirmation, then watching price gap up again the next day and stop you out above candle two's open. The gap-up open makes an aggressive short entry dangerous — always wait for follow-through.",
    },
  ],

  "bullish-harami": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Do not enter on the small inside candle — a harami is a pause, not yet a reversal. Wait for the next candle to close above the small candle's high, breaking out of the containment zone, then enter long.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below the low of the large first (red) candle — not the small inside candle. That larger low is the true structural level; if price closes below it, the entire reversal argument is negated.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A bullish harami at a known support after a sharp downtrend offers the best edge. The same pattern after only one or two red candles, without a clear trend preceding it, is too ambiguous to trade.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The smaller the inside candle's body relative to the large red candle, the more it represents a true stall in selling momentum. A bullish harami where the inside candle is a doji (harami cross) is considered a stronger version of the signal.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Trading the harami without a confirmation candle and getting caught when the downtrend simply resumes — the large red candle's sellers are still present, and one small pause does not remove them. The Three Inside Up pattern fixes this by baking the confirmation in.",
    },
  ],

  "bearish-harami": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Wait for the candle after the small inside candle to close below the inside candle's low — that bearish break confirms selling is resuming after the pause. Enter short on that close or the open of the following bar.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop above the high of the large first (green) candle — the highest point of the prior bullish conviction. A close above that level means buyers have reclaimed the full rally candle and the harami read is wrong.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A bearish harami at a tested resistance — especially after a rapid, near-vertical rally — is the highest-quality setup. In a slow drift higher with no resistance visible above, the harami is only a minor caution flag, not an actionable short.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "A bearish harami cross — where the inside candle is a doji — signals more extreme indecision and is considered a stronger reversal warning than a regular small-bodied inside candle. Look for the doji version preferentially.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting immediately on the close of the small inside candle, before any bearish confirmation arrives, and then watching the trend resume higher without even testing the prior low. Harami patterns require proof — one extra candle saves many losing trades.",
    },
  ],

  "bullish-kicker": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Aggressive entry: buy on the close of the gap-up candle the moment it closes bullishly above the prior candle's open. Conservative entry: buy the first shallow pullback after the kicker, if the gap holds as support.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop inside the gap — specifically below the kicker candle's open. If price closes back inside the gap, the sentiment flip is reversing and the kicker has failed. Never set the stop at the prior red candle's close, which is already deep inside the gap.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Kickers are most often driven by surprise earnings, policy decisions, or major news events. They appear regardless of prior trend, but carry the most follow-through when they fire against the prevailing trend — a true sentiment reversal rather than just acceleration.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The non-overlapping gap is the entire signal — the gap-up candle must open at or above the prior red candle's open, leaving a true empty space on the chart. Any overlap between the two bodies degrades the kicker into something weaker.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Waiting too long for a pullback that never comes — kickers frequently run several percent without retracing. If you miss the initial move and the gap holds intraday, chasing several bars later without a clean re-entry level is the trap.",
    },
  ],

  "bearish-kicker": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Aggressive entry: short on the close of the gap-down candle if it closes bearishly below the prior bullish candle's open. Conservative entry: short the first weak bounce after the kicker, using the gap as resistance.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop inside the gap — above the kicker candle's open (the high of the bearish gap candle). A close back inside the gap signals the down-gap is being filled and the sentiment reversal is failing.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Bearish kickers most often follow unexpected negative news — earnings misses, rate decisions, or geopolitical shocks. The pattern is context-agnostic by nature (it creates its own context), but confirmation of a downtrend setting in follows most reliably on higher timeframes like H4 and D1.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "There must be zero body overlap between the bullish candle and the gap-down candle — the bearish candle's open must be at or below the prior bullish candle's open. Even slight overlap converts it from a kicker to merely a bearish engulfing, which is far more common and less reliable.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Fading the bearish kicker with a counter-trend long, assuming such a large single-day drop must bounce immediately. Kickers represent an abrupt repricing event, and the market often takes multiple sessions to absorb the gap — buying into one is buying into an air pocket.",
    },
  ],

  "morning-star": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the third (large green) candle — the confirmation is built into the three-candle structure. A more conservative approach is to wait for a pullback to the midpoint of the third candle's body before entering.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below the low of the middle star candle — that is the lowest price the pattern reached and the level buyers were defending. A close under the star's low says the panic low has been revisited and the reversal is failing.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "A morning star forming at a multi-year support, a major Fibonacci level, or the lower band of a long-term range carries the strongest historical edge. Morning stars that form in open space, without a prior support beneath them, resolve lower far more often.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The deeper the third candle closes into the first red candle's body — past the midpoint and toward the open of candle one — the stronger the reversal. Gaps around the middle star add extra power by showing the market repriced overnight at the turn.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Entering on the small middle star, before the big green candle arrives — it looks like a reversal is forming but the third candle must close to confirm it. Entering early means holding through the star and risking a third red candle rather than the green reversal.",
    },
  ],

  "evening-star": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the close of the third (large red) candle — the three-candle sequence itself provides the confirmation. Alternatively, short a bounce to the midpoint of the third candle's body in the following session.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop above the high of the middle star candle — the highest point the pattern reached. A close above the star's high invalidates the bearish reversal narrative; buyers have pushed past the exhaustion point.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "An evening star at an all-time high, a tested multi-year resistance, or a major round number is the premium setup. The same three-candle structure in the middle of a trend with no visible resistance above it is a much weaker sell signal.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The smaller the middle star's body, the more extreme the exhaustion at the top — a doji star (evening doji star) is the highest-quality version. The third red candle closing more than 50% into the first green candle's body confirms a deep reversal.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting the small middle star the moment it appears, without waiting for the third red candle. The star is a stall, not a reversal signal on its own — the confirming red close is what separates a genuine evening star from a brief pause in a continuing uptrend.",
    },
  ],

  "three-white-soldiers": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Do not buy the close of the third soldier — price is already extended three sessions in. Instead, wait for the first shallow pullback (a small red candle or a pause) within the new uptrend and enter long on the resumption candle.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Once you enter on a pullback, set the stop below the pullback low. If you entered immediately at pattern completion, the stop goes below the open of the first soldier — but that stop will often be very wide, wrecking your reward-to-risk.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Three white soldiers at the end of a prolonged downtrend, firing from a major support, signal a durable trend reversal. Three strong greens after just a minor dip, at no particular level, often resolve as an overextended continuation that exhausts and reverses.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "Each candle must open within the prior candle's body — not gap up — and close near its own high with minimal upper wick. Candles with large upper wicks indicate buyers are losing steam near the highs, weakening the soldiers' conviction.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Chasing the pattern by buying the close of the third candle with no pullback, then immediately hitting a consolidation or reversal that stops the trade. Three consecutive long greens is a sign the market is due a breather — patience after the third candle is more valuable than speed.",
    },
  ],

  "three-black-crows": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Avoid shorting the third crow's close — three long red candles means price has already moved significantly. Wait for the first technical bounce (a small green candle or inside bar) and enter short as that bounce stalls, using the high of the bounce as your entry trigger.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "If shorting a bounce retracement, the stop goes above the bounce high. If you entered on the pattern directly, the stop belongs above the open of the first crow — that entire range is your risk, and it is typically too wide for a good risk-reward ratio.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Three black crows at the top of an extended uptrend, at or just below a major resistance, carry the strongest bearish reversal signal. Three consecutive red candles in the middle of a sideways range are far more likely to reverse than to kick off a trend.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "Each crow must open within the prior candle's body and close near its own low with minimal lower wick. Lower wicks on each candle signal buyers are fighting back intrabar; the absence of lower wicks confirms sellers controlled every tick of every session.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting the pattern on day three and placing an aggressive target, only to watch price bounce sharply because the three-candle move exhausted immediate sellers. After three straight red candles the most likely near-term event is a bounce — short the bounce, not the third crow.",
    },
  ],

  "three-inside-up": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the third candle — the green close above candle one's high is the confirmation that is literally built into this three-candle pattern. The entry is clean because the pattern itself supplies the proof.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below the low of the first (large red) candle — the structural low of the pattern. A close below that level means the downtrend has reclaimed ground below even the starting candle, negating the reversal entirely.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Three inside up is most reliable when it develops at a prior support level after a clear downtrend. The pattern that forms at a support zone gives buyers two structural reasons to step in: the price level and the candlestick confirmation.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The middle candle must be a small bullish candle whose body sits entirely inside the large red candle's body — not just inside its wicks. The smaller and more contained the middle candle, the more it represents pure seller exhaustion before the bullish breakout.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Entering on the close of the middle (harami) candle rather than waiting for the third candle's confirmation. The middle candle is only a pause in selling, not a reversal — entering there means you are still exposed to the first candle's sellers reversing the pattern.",
    },
  ],

  "three-inside-down": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the close of the third candle — the red close below candle one's low is the confirmation baked into the pattern. You do not need an extra confirmation candle because the third candle is already the confirmation.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop above the high of the first (large green) candle — the structural peak. A close above that high means buyers have reclaimed everything including the prior rally candle, and the reversal narrative is void.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Three inside down carries maximum weight when it forms at a tested resistance or a prior swing high after an uptrend. A three-inside-down that forms without a resistance level above it has a lower probability of resolving into a sustained downtrend.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The second (harami) candle should be bearish and its body should sit fully within the first green candle's body — the tighter the containment, the cleaner the exhaustion signal. A harami cross (doji inside the large green candle) is an even stronger version.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting after the bearish harami middle candle before the third candle closes, exposing yourself to the scenario where the third candle turns out bullish and the pattern resolves as a plain harami — which itself requires confirmation before trading.",
    },
  ],

  "three-outside-up": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the third candle — its close above the engulfing candle's high is the confirmation. Unlike a bare bullish engulfing, this pattern has the third proof-candle built in, so no external confirmation candle is needed.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below the low of the second (engulfing) green candle. That is the level where buyers overwhelmed sellers; a close below it means the engulfing move has been undone and the reversal has failed.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Three outside up is strongest when the initial small red candle and the engulfing candle both fire at a recognisable support level at the end of a downtrend. The additional confirmed close higher makes it one of the cleaner bottom-picking setups available.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The third candle must close above the second (engulfing) candle's high — not merely match it. A third candle that only reaches the engulfing candle's body without breaking the high is a weaker version and requires an extra candle for confidence.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Treating the two-candle bullish engulfing (candles one and two) as sufficient and entering there, missing the point that the third candle is what distinguishes the three outside up from a plain engulfing and provides the statistical edge difference.",
    },
  ],

  "three-outside-down": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the close of the third candle — its close below the engulfing candle's low is confirmation that sellers are accelerating, not just pausing. The three-candle structure is self-confirming; no additional candle is required.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop above the high of the second (bearish engulfing) candle. If price closes back above the engulfing candle's high, buyers have reclaimed the entire engulfing session and the reversal is over.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Three outside down at a tested resistance after an extended uptrend is the premier short setup for this pattern. The initial small green candle and engulfing red candle gain credibility when they fire exactly at a level where sellers were previously active.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The third candle must close below the second candle's low — not just trade below it intrabar. An intrabar break that does not hold on the close is a wick, not a confirmed breakdown, and you should wait for the following session.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Entering short on the bearish engulfing (candles one and two alone) without waiting for the third candle, then watching a bullish reversal on day three convert the would-be three outside down into a failed pattern. The third close is the difference.",
    },
  ],

  "abandoned-baby": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the third (large green gap-up) candle. The gap on both sides of the doji makes this a self-confirming signal — you do not need an additional candle, but you should ensure the gap above the doji's high holds on the open.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop below the doji's low — the isolated star that sits at the gap. A close back below the doji's low would mean price has re-entered the gap zone and the sharp sentiment flip is reversing.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "This pattern is rare in continuous markets and most common around session opens where gaps can form — gold around the weekly open, equities at the daily open, or any instrument around a major news event. When it fires at a long-term support, the reversal tends to be durable.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The doji must not overlap with either the first red candle or the third green candle — the high of the doji must be below the low of the red candle, and the low of the doji must be above the... actually, the gap up means the third candle's open is above the doji's high. Both gaps must be full, with zero wick overlap. Any overlap degrades it to a morning star.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Treating a morning star with small gaps as an abandoned baby — the abandoned baby requires full wick-to-wick gap separation, not just body gaps. Accepting the weaker version without full gap isolation means trading a lower-probability pattern at the high-probability pattern's reward.",
    },
  ],

  "rising-three-methods": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the fifth candle — the large green candle that breaks above the first candle's high. That breakout close is the direct entry signal; the prior pullback candles have already shown bears could not break the trend.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop below the low of the first large bullish candle — not below the small pullback candles. A close below the first candle's low means sellers broke outside the entire pattern's range and the uptrend structure is broken.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Rising three methods works best when the initial large green candle appears within a clear uptrend and the three pullback candles show declining volume. The pattern is a continuation, not a reversal — the stronger the prior uptrend, the higher the follow-through probability.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The small counter-trend candles must stay within the first candle's full range — their highs cannot exceed the first candle's high and their lows cannot break its low. A single bearish candle closing outside that range invalidates the continuation read.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Entering long during the small pullback candles, before the fifth candle breaks out. The pullback candles look like a buying opportunity, but until the breakout candle confirms, price can extend the counter-trend move and invalidate the pattern entirely.",
    },
  ],

  "falling-three-methods": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Short on the close of the fifth candle — the large bearish candle breaking below the first candle's low. That breakdown close is the continuation trigger and means the counter-trend bounce has been fully absorbed by sellers.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Place the stop above the high of the first large bearish candle — the structural high of the whole pattern. A close above that level means buyers broke out of the pattern's range and the downtrend is now being seriously challenged.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Falling three methods is a continuation pattern and only works in the context of an established downtrend. A three-candle bounce followed by a new low in the middle of a sideways range is not the same setup and carries far less directional edge.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The bullish bounce candles must remain contained within the first bearish candle's full range. If any bounce candle's high exceeds the first candle's high, sellers have lost containment and the pattern fails. The tighter the containment, the cleaner the continuation.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Shorting into the small bounce candles during the counter-trend phase, expecting the continuation immediately. The small greens look short-able but they are the 'resting' part of the pattern — entering early risks being stopped out before the fifth breakout candle ever arrives.",
    },
  ],

  "mat-hold": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter long on the close of the resumption candle — the large bullish candle that breaks above the first candle's high. The defended gap during the pullback tells you buyers never surrendered ground, so the breakout has strong backing.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "Set the stop below the low of the first large bullish candle. Unlike rising three methods where the gap does not exist, the mat hold's gap zone acts as an additional support — a close below the first candle's low means the gap was filled and the bull structure is damaged.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Mat hold is a continuation pattern, so the underlying uptrend must be established before it forms. It is most reliable on H4 and D1 where gaps between sessions are real (equity opens) or where the overnight sentiment shift is meaningful (gold, indices).",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The critical differentiator from rising three methods is that the pullback candles never fill the gap above the first candle — their lows stay above the first candle's close. That unfilled gap is evidence of buyer aggression; if it fills, the pattern degrades.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Confusing a mat hold with rising three methods — the patterns look similar at a glance. The gap between the first candle's close and the second candle's open is the distinguishing feature; if there is no gap, it is rising three methods with a different risk profile.",
    },
  ],

  "separating-lines": [
    {
      icon: "🎯",
      title: "Entry trigger",
      body: "Enter in the trend direction on the close of the second candle — the one that opens at the prior counter-trend candle's open and closes strongly back in the trend direction. The matching open is the trigger; the strong trend-aligned close is the entry.",
    },
    {
      icon: "🛑",
      title: "Stop placement",
      body: "For a bullish separating lines, the stop goes below the second candle's low. If the second candle drives in the trend direction, a close below its low means the reclaim of trend failed quickly and the counter-trend candle's sellers are winning.",
    },
    {
      icon: "📍",
      title: "Best context",
      body: "Separating lines is purely a continuation pattern — it only makes sense within an existing, healthy trend. Use it to add to a winning trend trade at a natural pullback point, not as an entry into a new trade from a flat position.",
    },
    {
      icon: "🔑",
      title: "Pattern nuance",
      body: "The second candle must open at or very near the same price as the first (counter-trend) candle's open — the 'separating' open. Without that matching open, it is simply two candles pointing in different directions, not the pattern. The shared open is the mechanical tell.",
    },
    {
      icon: "⚠️",
      title: "Common mistake",
      body: "Using separating lines as a reversal trade — shorting a bullish separating lines because the counter-trend red candle looks dramatic. The pattern's entire logic is continuation; fighting it as a reversal goes directly against the structure's premise.",
    },
  ],
};
