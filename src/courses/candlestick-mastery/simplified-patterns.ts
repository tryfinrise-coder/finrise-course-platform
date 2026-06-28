// ─────────────────────────────────────────────────────────────────────────────
// Beginner-friendly, bilingual (English / हिन्दी) explanations for every
// candlestick pattern that is NOT already covered in simplified.ts.
// Level: Class 5 (10–11 years old).  Format mirrors SimpleLessonContent.
// ─────────────────────────────────────────────────────────────────────────────

import type { SimpleLessonContent } from "./simplified";

const b = (en: string, hi: string) => ({ en, hi });

export const SIMPLE_PATTERNS: Record<string, SimpleLessonContent> = {
  // ── Single-candle ────────────────────────────────────────────────────────

  "inverted-hammer": {
    emoji: "🙃",
    example: b(
      "Think of a badminton shuttle that someone smashed upward really hard — it flew high, then fell right back to where it started. Buyers tried to push the price up a lot, but sellers pushed it back down by the end of the day.",
      "सोचो कोई बैडमिंटन का शटल ज़ोर से ऊपर मारे — वो बहुत ऊँचा गया, फिर वापस उसी जगह आ गया। ख़रीदारों ने क़ीमत ऊपर उठाने की कोशिश की, पर विक्रेताओं ने उसे दिन के अंत तक वापस नीचे धकेल दिया।"
    ),
    simple: b(
      "After prices have been falling, an inverted hammer has a small body at the bottom and a long upper wick. Buyers (the winning team) tried hard to push up, which is a good sign. Wait for the next green candle as proof before buying.",
      "क़ीमतें गिरने के बाद, इनवर्टेड हैमर में नीचे छोटी बॉडी और ऊपर लंबी विक होती है। ख़रीदार ऊपर जाने की कोशिश करते हैं — यह अच्छा संकेत है। ख़रीदने से पहले अगली हरी कैंडल का इंतज़ार करो।"
    ),
    faqs: [
      {
        q: b("How is it different from a shooting star?", "यह शूटिंग स्टार से कैसे अलग है?"),
        a: b("Same shape, but location matters — inverted hammer is at the bottom of a fall, shooting star is at the top of a rise.", "आकार एक जैसा, पर जगह अलग — इनवर्टेड हैमर गिरावट के तल पर होता है, शूटिंग स्टार तेज़ी के शिखर पर।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just below the low of the inverted hammer — if price goes below it, the pattern has failed.", "इनवर्टेड हैमर के लो के ठीक नीचे — अगर क़ीमत उससे नीचे गई तो पैटर्न फ़ेल है।"),
      },
    ],
  },

  "long-legged-doji": {
    emoji: "🧘",
    example: b(
      "Imagine a tug-of-war where both teams pull so hard that the rope stretches a long way on both sides, but in the end nobody moves — the flag is still in the middle. Both buyers and sellers tried a lot, but neither won.",
      "एक रस्साकशी सोचो जिसमें दोनों टीमें इतनी ज़ोर से खींचती हैं कि रस्सी दोनों तरफ़ बहुत फैल जाती है, पर अंत में कोई नहीं हिलता — झंडा बीच में ही रहता है। ख़रीदार और विक्रेता दोनों ने बहुत कोशिश की, पर दोनों हारे।"
    ),
    simple: b(
      "The long-legged doji has a tiny body in the middle and very long wicks above and below. Price swung wildly in both directions but ended where it started. It shows extreme confusion — nobody is in charge.",
      "लॉन्ग-लेग्ड डोजी में बीच में बहुत छोटी बॉडी और ऊपर-नीचे बहुत लंबी विक होती हैं। क़ीमत दोनों तरफ़ बहुत उछली, पर शुरू जहाँ से हुई वहीं ख़त्म हुई। यह बहुत बड़ी उलझन दिखाता है — कोई जीत नहीं रहा।"
    ),
    faqs: [
      {
        q: b("Should I trade immediately after seeing this?", "यह देखते ही क्या मैं ट्रेड करूँ?"),
        a: b("No — wait for the next candle to close and show which direction wins before jumping in.", "नहीं — अगली कैंडल के बंद होने तक इंतज़ार करो, जो दिशा जीते उसमें जाओ।"),
      },
      {
        q: b("Why does it have such long wicks?", "इसकी विक इतनी लंबी क्यों होती हैं?"),
        a: b("Big news or events can make buyers and sellers fight hard in both directions before calming down.", "बड़ी ख़बर या घटना से ख़रीदार और विक्रेता दोनों तरफ़ ज़ोर से लड़ते हैं, फिर शांत हो जाते हैं।"),
      },
    ],
  },

  "dragonfly-doji": {
    emoji: "🐉",
    example: b(
      "Imagine a rubber ball thrown hard at the floor — it bounces back all the way to where it started. Sellers pushed the price way down during the day, but buyers brought it ALL the way back up by closing time.",
      "सोचो एक रबर की गेंद ज़ोर से फ़र्श पर फेंको — वो उछलकर वापस उसी जगह आ जाती है। विक्रेताओं ने दिन में क़ीमत बहुत नीचे धकेली, पर ख़रीदारों ने बंद होने तक उसे पूरी तरह वापस ऊपर उठा लिया।"
    ),
    simple: b(
      "A dragonfly doji has no upper wick — just a long lower wick and a tiny body at the very top. It appears after a fall and shows buyers (the winning team) completely took over. A good sign that prices may rise soon.",
      "ड्रैगनफ्लाई डोजी में ऊपर कोई विक नहीं — बस लंबी निचली विक और एकदम ऊपर छोटी बॉडी। यह गिरावट के बाद दिखता है और बताता है कि ख़रीदारों ने पूरा नियंत्रण ले लिया। अच्छा संकेत कि क़ीमत जल्द ऊपर जा सकती है।"
    ),
    faqs: [
      {
        q: b("Is it the same as a hammer?", "क्या यह हैमर जैसा है?"),
        a: b("Very similar — a dragonfly doji is an extreme hammer where the body shrinks to almost nothing.", "बहुत मिलता-जुलता — ड्रैगनफ्लाई डोजी एक अति हैमर है जिसकी बॉडी लगभग ग़ायब हो जाती है।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just below the long lower wick — that is the level buyers defended strongly.", "लंबी निचली विक के ठीक नीचे — यही वह स्तर है जिसे ख़रीदारों ने मज़बूती से बचाया।"),
      },
    ],
  },

  "gravestone-doji": {
    emoji: "🪦",
    example: b(
      "Imagine a kite that flies very high, then the string snaps and it crashes back to the ground where it started. Buyers pushed the price way up, but sellers crashed it right back down before the day ended.",
      "सोचो एक पतंग बहुत ऊँची उड़ती है, फिर धागा टूट जाता है और वो वापस उसी ज़मीन पर गिर जाती है। ख़रीदारों ने क़ीमत बहुत ऊपर उठाई, पर विक्रेताओं ने दिन ख़त्म होने से पहले उसे वापस नीचे गिरा दिया।"
    ),
    simple: b(
      "A gravestone doji has no lower wick — just a long upper wick and a tiny body at the very bottom. It appears after a rise and shows sellers (the winning team) completely took over. A warning that prices may fall soon.",
      "ग्रेवस्टोन डोजी में नीचे कोई विक नहीं — बस लंबी ऊपरी विक और एकदम नीचे छोटी बॉडी। यह तेज़ी के बाद दिखता है और बताता है कि विक्रेताओं ने पूरा नियंत्रण ले लिया। चेतावनी कि क़ीमत जल्द गिर सकती है।"
    ),
    faqs: [
      {
        q: b("Is it the same as a shooting star?", "क्या यह शूटिंग स्टार जैसा है?"),
        a: b("Very similar — a gravestone doji is an extreme shooting star where the body almost disappears.", "बहुत मिलता-जुलता — ग्रेवस्टोन डोजी एक अति शूटिंग स्टार है जिसकी बॉडी लगभग ग़ायब हो जाती है।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the long upper wick — that is the high point sellers rejected.", "लंबी ऊपरी विक के ठीक ऊपर — यही वह ऊँचाई है जिसे विक्रेताओं ने ठुकराया।"),
      },
    ],
  },

  "hanging-man": {
    emoji: "🪝",
    example: b(
      "Imagine a football match where your team is winning and suddenly the other team starts attacking hard and almost scores. They didn't score this time, but it is a warning your team is getting tired.",
      "सोचो फुटबॉल मैच में तुम्हारी टीम जीत रही है और अचानक दूसरी टीम ज़ोर से हमला करके लगभग गोल कर देती है। इस बार नहीं किया, पर यह चेतावनी है कि तुम्हारी टीम थक रही है।"
    ),
    simple: b(
      "A hanging man looks exactly like a hammer — small body on top, long lower wick — but it appears after prices have been going UP. That long wick means sellers tried hard for the first time. It warns the rise might be ending soon.",
      "हैंगिंग मैन बिलकुल हैमर जैसा दिखता है — ऊपर छोटी बॉडी, नीचे लंबी विक — पर यह क़ीमतें ऊपर जाने के बाद आता है। वो लंबी विक मतलब विक्रेताओं ने पहली बार ज़ोर आज़माया। चेतावनी कि तेज़ी जल्द ख़त्म हो सकती है।"
    ),
    faqs: [
      {
        q: b("Does the colour matter?", "रंग मायने रखता है?"),
        a: b("A red hanging man is a stronger warning than a green one, because it means sellers closed the day lower.", "लाल हैंगिंग मैन हरे से ज़्यादा मज़बूत चेतावनी है, क्योंकि विक्रेताओं ने दिन को नीचे बंद किया।"),
      },
      {
        q: b("Do I need confirmation?", "क्या पुष्टि ज़रूरी है?"),
        a: b("Yes — always wait for the next candle to close red (below the hanging man) before acting.", "हाँ — हमेशा अगली कैंडल को लाल बंद होने तक इंतज़ार करो (हैंगिंग मैन के नीचे) फिर कदम उठाओ।"),
      },
    ],
  },

  "bullish-marubozu": {
    emoji: "💪",
    example: b(
      "Think of a 100-metre race where one runner leads from the very first step to the finish line without anyone getting close — complete control from start to finish. Buyers owned every single moment of the trading day.",
      "100 मीटर दौड़ सोचो जिसमें एक धावक पहले कदम से अंतिम रेखा तक आगे रहता है, कोई पास भी नहीं आता — शुरू से अंत तक पूरा कंट्रोल। ख़रीदारों ने ट्रेडिंग के हर पल पर क़ब्ज़ा रखा।"
    ),
    simple: b(
      "A bullish marubozu is a long green candle with NO wicks at all. It opened at the lowest point and closed at the highest — buyers (winning team) never let sellers breathe for even a second. It means strong momentum upward.",
      "बुलिश मारुबोज़ू एक लंबी हरी कैंडल है जिसमें बिल्कुल कोई विक नहीं। सबसे नीचे खुली और सबसे ऊपर बंद हुई — ख़रीदारों ने विक्रेताओं को एक पल भी सांस नहीं लेने दी। यह ऊपर की ओर मज़बूत ताक़त दिखाता है।"
    ),
    faqs: [
      {
        q: b("Should I buy straight away?", "क्या मैं तुरंत ख़रीदूँ?"),
        a: b("It is a momentum signal, so buy pullbacks toward its middle price rather than chasing the high.", "यह मोमेंटम संकेत है, इसलिए ऊँचाई का पीछा करने की बजाय इसके बीच की क़ीमत पर वापसी पर ख़रीदो।"),
      },
      {
        q: b("What if I see this at resistance?", "अगर यह रेज़िस्टेंस पर दिखे?"),
        a: b("Be careful — even a strong candle can stall at a ceiling; wait to see if the next candle holds.", "सावधान रहो — मज़बूत कैंडल भी छत पर रुक सकती है; देखो कि अगली कैंडल टिकती है या नहीं।"),
      },
    ],
  },

  "bearish-marubozu": {
    emoji: "🌊",
    example: b(
      "Think of a wave that crashes from the top all the way to the shore without any bounce — pure downward force with nobody stopping it. Sellers controlled every single moment of that trading day.",
      "एक लहर सोचो जो ऊपर से सीधे किनारे तक बिना किसी उछाल के टकराती है — शुद्ध नीचे की ताक़त, कोई रोकने वाला नहीं। विक्रेताओं ने उस ट्रेडिंग दिन के हर पल पर नियंत्रण रखा।"
    ),
    simple: b(
      "A bearish marubozu is a long red candle with NO wicks at all. It opened at the highest point and closed at the lowest — sellers (winning team) never let buyers get even a small win. It shows strong downward momentum.",
      "बेयरिश मारुबोज़ू एक लंबी लाल कैंडल है जिसमें बिल्कुल कोई विक नहीं। सबसे ऊपर खुली और सबसे नीचे बंद हुई — विक्रेताओं ने ख़रीदारों को एक छोटी जीत भी नहीं लेने दी। यह नीचे की ओर मज़बूत ताक़त दिखाता है।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss if I sell?", "अगर मैं बेचूँ तो स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the marubozu — that was the top sellers controlled from.", "मारुबोज़ू के हाई के ठीक ऊपर — यही वह ऊँचाई थी जहाँ से विक्रेताओं ने नियंत्रण किया।"),
      },
      {
        q: b("Can I buy pullbacks toward the middle?", "क्या मैं बीच की क़ीमत पर वापसी पर ख़रीद सकता हूँ?"),
        a: b("No — a bearish marubozu means sellers are in charge; look for pullback sells, not buys.", "नहीं — बेयरिश मारुबोज़ू का मतलब विक्रेता हावी हैं; वापसी पर ख़रीदारी नहीं, बिकवाली देखो।"),
      },
    ],
  },

  "spinning-top": {
    emoji: "🪀",
    example: b(
      "Imagine a cricket match where both teams score equal runs — exciting batting from both sides, but by the end of the day it is a draw. Neither team clearly won.",
      "एक क्रिकेट मैच सोचो जिसमें दोनों टीमें बराबर रन बनाती हैं — दोनों तरफ़ शानदार बल्लेबाज़ी, पर दिन के अंत में ड्रॉ। कोई टीम साफ़ नहीं जीती।"
    ),
    simple: b(
      "A spinning top has a small body in the middle with similar-length wicks above and below. Both buyers and sellers tried hard but neither won the day. After a strong move it warns the trend might be getting tired.",
      "स्पिनिंग टॉप में बीच में छोटी बॉडी और ऊपर-नीचे लगभग बराबर लंबी विक होती हैं। ख़रीदार और विक्रेता दोनों ने कोशिश की पर दिन नहीं जीते। मज़बूत चाल के बाद यह चेतावनी देता है कि ट्रेंड थक रहा है।"
    ),
    faqs: [
      {
        q: b("Can I trade this pattern alone?", "क्या मैं अकेले इस पैटर्न पर ट्रेड करूँ?"),
        a: b("No — on its own it just means indecision; always wait for the next candle to show the direction.", "नहीं — अकेले यह सिर्फ़ उलझन दिखाता है; हमेशा अगली कैंडल का इंतज़ार करो जो दिशा दिखाए।"),
      },
      {
        q: b("Does its colour matter?", "क्या इसका रंग मायने रखता है?"),
        a: b("Not much — the small body is what matters, not whether it is green or red.", "ज़्यादा नहीं — छोटी बॉडी मायने रखती है, हरी या लाल है यह नहीं।"),
      },
    ],
  },

  // ── Two-candle ───────────────────────────────────────────────────────────

  "tweezer-bottom": {
    emoji: "🪛",
    example: b(
      "Imagine you press a rubber ball onto the same spot on the floor twice in a row and it bounces back both times from exactly the same point. The floor is too strong to break through — buyers defended that price twice.",
      "सोचो एक रबर की गेंद को फ़र्श की एक ही जगह पर दो बार लगातार दबाओ और दोनों बार वो ठीक उसी जगह से उछल जाए। फ़र्श इतना मज़बूत है कि टूटता नहीं — ख़रीदारों ने उस क़ीमत को दो बार बचाया।"
    ),
    simple: b(
      "Two candles in a row hit the exact same low price after a downtrend — first a red one, then a green one. Buyers defended that price level twice, turning it into a strong floor (support). It hints prices may bounce up.",
      "गिरावट के बाद दो कैंडलें लगातार एक ही सबसे कम क़ीमत पर छूती हैं — पहले लाल, फिर हरी। ख़रीदारों ने उस क़ीमत को दो बार बचाया, उसे मज़बूत फ़र्श (सपोर्ट) बना दिया। संकेत है कि क़ीमत ऊपर उछल सकती है।"
    ),
    faqs: [
      {
        q: b("Do both lows have to match exactly?", "क्या दोनों लो बिल्कुल एक जैसे होने चाहिए?"),
        a: b("They should be very close — a tiny difference is fine, but they must look like the same level on a chart.", "बहुत क़रीब होने चाहिए — थोड़ा फ़र्क ठीक है, पर चार्ट पर एक ही लेवल जैसे दिखने चाहिए।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just below the matching low — if price breaks under it, the pattern has failed.", "मिलते हुए लो के ठीक नीचे — अगर क़ीमत उसके नीचे टूटी तो पैटर्न फ़ेल है।"),
      },
    ],
  },

  "tweezer-top": {
    emoji: "📌",
    example: b(
      "Imagine two players in a jumping contest both hit their head on the same ceiling fan twice — the ceiling is too low to jump through. Sellers blocked that exact price level twice, making it a strong ceiling (resistance).",
      "सोचो दो खिलाड़ी कूदने की प्रतियोगिता में दो बार एक ही सीलिंग फैन से सिर टकराते हैं — छत इतनी नीची है कि पार नहीं जा सकते। विक्रेताओं ने उस क़ीमत को दो बार रोका, उसे मज़बूत छत (रेज़िस्टेंस) बना दिया।"
    ),
    simple: b(
      "Two candles in a row reach the exact same high price after an uptrend — first a green one, then a red one. Sellers blocked that price twice, turning it into a strong ceiling (resistance). It warns prices may fall soon.",
      "तेज़ी के बाद दो कैंडलें लगातार एक ही सबसे ऊँची क़ीमत पर पहुँचती हैं — पहले हरी, फिर लाल। विक्रेताओं ने उस क़ीमत को दो बार रोका, उसे मज़बूत छत (रेज़िस्टेंस) बना दिया। चेतावनी कि क़ीमत जल्द गिर सकती है।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the matching high — if price breaks above it, the pattern has failed.", "मिलती हुई ऊँचाई के ठीक ऊपर — अगर क़ीमत उसके ऊपर गई तो पैटर्न फ़ेल है।"),
      },
      {
        q: b("Is it stronger at a known resistance level?", "क्या यह जाने-पहचाने रेज़िस्टेंस पर ज़्यादा मज़बूत है?"),
        a: b("Yes — when the tweezer top sits at a level where price turned before, the signal is much stronger.", "हाँ — जब ट्वीज़र टॉप उस लेवल पर हो जहाँ क़ीमत पहले भी मुड़ी थी, संकेत बहुत मज़बूत होता है।"),
      },
    ],
  },

  "piercing-line": {
    emoji: "🗡️",
    example: b(
      "Imagine you are losing a tug-of-war badly, then suddenly your team charges and pulls the rope more than halfway back to your side. You have not won yet, but you have taken back a lot of ground from the other team.",
      "सोचो तुम रस्साकशी में बुरी तरह हार रहे हो, फिर अचानक तुम्हारी टीम ज़ोर लगाकर रस्सी आधे से ज़्यादा अपनी तरफ़ खींच लेती है। अभी जीते नहीं, पर दूसरी टीम का बहुत ज़मीन वापस ले लिया।"
    ),
    simple: b(
      "After a downtrend, a red candle is followed by a green candle that opens lower but closes MORE than halfway into the red body. Buyers (winning team) came back very strongly. It hints a reversal may be starting — like a smaller cousin of bullish engulfing.",
      "गिरावट के बाद एक लाल कैंडल के बाद एक हरी कैंडल आती है जो नीचे खुलती है पर लाल बॉडी के आधे से ज़्यादा ऊपर बंद होती है। ख़रीदार बहुत ज़ोर से वापस आए। यह संकेत है कि पलटाव शुरू हो सकता है — बुलिश एंगल्फिंग का छोटा भाई।"
    ),
    faqs: [
      {
        q: b("What if the green candle closes less than halfway?", "अगर हरी कैंडल आधे से कम बंद हो?"),
        a: b("Then it does not count as a piercing line — the halfway mark is the minimum required.", "तब यह पियर्सिंग लाइन नहीं मानी जाती — आधे तक पहुँचना न्यूनतम ज़रूरी है।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Below the low of the green candle — that is where buyers entered.", "हरी कैंडल के लो के नीचे — वहीं से ख़रीदार आए।"),
      },
    ],
  },

  "dark-cloud-cover": {
    emoji: "🌩️",
    example: b(
      "Imagine a sunny day suddenly covered by a dark storm cloud that blocks most of the sunlight. Buyers had a great day, then sellers showed up the next day and pushed the price more than halfway back down — like clouds blocking the sunshine.",
      "सोचो एक धूप भरे दिन पर अचानक काला बादल आकर ज़्यादातर धूप ढक लेता है। ख़रीदारों का बढ़िया दिन था, फिर अगले दिन विक्रेता आए और क़ीमत आधे से ज़्यादा नीचे धकेल दी — जैसे बादलों ने धूप छुपा दी।"
    ),
    simple: b(
      "After an uptrend, a green candle is followed by a red candle that opens higher but closes MORE than halfway into the green body. Sellers (winning team) crashed the party. It warns prices may start falling — like the bearish cousin of piercing line.",
      "तेज़ी के बाद एक हरी कैंडल के बाद एक लाल कैंडल आती है जो ऊपर खुलती है पर हरी बॉडी के आधे से ज़्यादा नीचे बंद होती है। विक्रेताओं ने पार्टी बिगाड़ दी। चेतावनी कि क़ीमत गिरना शुरू हो सकती है — पियर्सिंग लाइन का बेयरिश भाई।"
    ),
    faqs: [
      {
        q: b("Does the red candle need to open above the prior high?", "क्या लाल कैंडल पिछले हाई के ऊपर खुलनी चाहिए?"),
        a: b("Yes — it must open above the prior green candle's high, then close below its midpoint.", "हाँ — पिछली हरी कैंडल के हाई के ऊपर खुलनी चाहिए, फिर उसके मध्य के नीचे बंद होनी चाहिए।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the red candle — that is where sellers took control.", "लाल कैंडल के हाई के ठीक ऊपर — वहीं से विक्रेताओं ने नियंत्रण लिया।"),
      },
    ],
  },

  "bullish-harami": {
    emoji: "🥚",
    example: b(
      "Imagine a big dog that seems very tired and is sitting still, and then a small puppy appears right next to it and starts playing — the big scary energy has stopped, something small and new is beginning.",
      "सोचो एक बड़ा कुत्ता बहुत थका हुआ लगता है और शांत बैठ जाता है, फिर उसके पास एक छोटा पिल्ला आकर खेलने लगता है — बड़ी डरावनी ऊर्जा रुक गई, कुछ छोटा और नया शुरू हो रहा है।"
    ),
    simple: b(
      "After a downtrend, a large red candle is followed by a small candle (any colour) whose body fits INSIDE the big one. Sellers could not push further. It is an early warning sign — wait for the next green candle before buying.",
      "गिरावट के बाद, एक बड़ी लाल कैंडल के बाद एक छोटी कैंडल (किसी भी रंग की) आती है जिसकी बॉडी पूरी तरह बड़ी कैंडल के अंदर समाती है। विक्रेता आगे नहीं जा सके। यह शुरुआती चेतावनी है — ख़रीदने से पहले अगली हरी कैंडल का इंतज़ार करो।"
    ),
    faqs: [
      {
        q: b("Why do I need confirmation?", "पुष्टि क्यों ज़रूरी है?"),
        a: b("A harami just says selling slowed — it does not prove buyers have taken over yet.", "हरामी सिर्फ़ बताता है कि बिकवाली धीमी हुई — यह साबित नहीं करता कि ख़रीदारों ने अभी नियंत्रण लिया है।"),
      },
      {
        q: b("Must the small candle be green?", "क्या छोटी कैंडल हरी होनी चाहिए?"),
        a: b("No — it can be any colour; a green one is slightly stronger but red also counts.", "नहीं — कोई भी रंग हो सकता है; हरी थोड़ी मज़बूत है पर लाल भी गिनी जाती है।"),
      },
    ],
  },

  "bearish-harami": {
    emoji: "🫧",
    example: b(
      "Imagine a big bouncing ball that suddenly slows down and rolls only a tiny bit — the energy is fading. After a big green candle, the next tiny candle shows buyers have lost their power and sellers may be about to take over.",
      "सोचो एक बड़ी उछलती गेंद अचानक धीमी पड़ जाती है और बहुत थोड़ा लुढ़कती है — ऊर्जा ख़त्म हो रही है। एक बड़ी हरी कैंडल के बाद, अगली छोटी कैंडल दिखाती है कि ख़रीदारों की ताक़त गई और विक्रेता हावी होने वाले हैं।"
    ),
    simple: b(
      "After an uptrend, a large green candle is followed by a small candle whose body fits entirely inside it. Buyers could not push further. It is a warning that the rise may be ending — wait for the next red candle as confirmation.",
      "तेज़ी के बाद, एक बड़ी हरी कैंडल के बाद एक छोटी कैंडल आती है जिसकी बॉडी पूरी तरह बड़ी कैंडल के अंदर समाती है। ख़रीदार आगे नहीं जा सके। यह चेतावनी है कि तेज़ी ख़त्म हो सकती है — पुष्टि के लिए अगली लाल कैंडल का इंतज़ार करो।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the large green candle — that is the ceiling sellers are defending.", "बड़ी हरी कैंडल के हाई के ठीक ऊपर — यही वह छत है जिसे विक्रेता बचा रहे हैं।"),
      },
      {
        q: b("How reliable is this pattern alone?", "अकेला यह पैटर्न कितना भरोसेमंद है?"),
        a: b("Not very — it needs confirmation; think of it as an early heads-up, not a trade signal by itself.", "ज़्यादा नहीं — इसे पुष्टि चाहिए; इसे अकेले ट्रेड सिग्नल नहीं, पहली चेतावनी समझो।"),
      },
    ],
  },

  "bullish-kicker": {
    emoji: "🚀",
    example: b(
      "Imagine a football match where your team is losing badly, then at half-time the coach makes surprise changes and in the very first minute of the second half your team scores three quick goals. The whole game flips instantly.",
      "सोचो एक फुटबॉल मैच में तुम्हारी टीम बुरी तरह हार रही है, फिर हाफ-टाइम में कोच सरप्राइज़ बदलाव करता है और दूसरे हाफ के पहले मिनट में ही टीम तीन गोल कर देती है। पूरा खेल तुरंत पलट जाता है।"
    ),
    simple: b(
      "After a bearish candle, the next candle jumps (gaps) ABOVE the first candle's opening and closes strongly higher. There is a gap between them with NO overlap. This is one of the most powerful bullish signals — price flipped up like a switch.",
      "एक लाल कैंडल के बाद, अगली कैंडल पहली कैंडल के ओपन से ऊपर उछलती (गैप) है और ज़ोरदार तरीक़े से ऊपर बंद होती है। दोनों के बीच गैप है, कोई ओवरलैप नहीं। यह सबसे शक्तिशाली बुलिश संकेतों में से एक है — क़ीमत स्विच की तरह पलट गई।"
    ),
    faqs: [
      {
        q: b("Why is the gap important?", "गैप क्यों ज़रूरी है?"),
        a: b("The gap shows the market repriced overnight — so many people wanted to buy that there was no seller in between.", "गैप दिखाता है कि बाज़ार ने रातोरात क़ीमत बदल दी — इतने लोग ख़रीदना चाहते थे कि बीच में कोई विक्रेता नहीं था।"),
      },
      {
        q: b("Should I wait for a pullback to buy?", "क्या मैं ख़रीदने के लिए वापसी का इंतज़ार करूँ?"),
        a: b("Usually yes — kickers rarely retrace much, so chasing too high is risky; wait for a small dip.", "आमतौर पर हाँ — किकर शायद ही वापस आते हैं, इसलिए बहुत ऊँचा पीछा करना जोखिम है; छोटी गिरावट का इंतज़ार करो।"),
      },
    ],
  },

  "bearish-kicker": {
    emoji: "📉",
    example: b(
      "Imagine a cricket team scoring big in the morning session, then news comes that key players are out and the second session they collapse completely — the match turned upside down in minutes.",
      "सोचो एक क्रिकेट टीम सुबह के सत्र में बड़े रन बनाती है, फिर ख़बर आती है कि मुख्य खिलाड़ी बाहर हैं और दूसरे सत्र में वो पूरी तरह ढह जाती है — मैच मिनटों में पलट गया।"
    ),
    simple: b(
      "After a bullish candle, the next candle drops (gaps) BELOW the first candle's opening and closes strongly lower. There is a gap with NO overlap. Sellers (winning team) took over so fast the price dropped without anyone getting a chance to sell at the top.",
      "एक हरी कैंडल के बाद, अगली कैंडल पहली कैंडल के ओपन से नीचे गिरती (गैप) है और ज़ोरदार तरीक़े से नीचे बंद होती है। बिना ओवरलैप के गैप। विक्रेता इतनी तेज़ी से हावी हुए कि किसी को ऊपर बेचने का मौक़ा नहीं मिला।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the bearish kicker candle — if price goes back above it, the signal failed.", "बेयरिश किकर कैंडल के हाई के ठीक ऊपर — अगर क़ीमत वापस ऊपर गई तो संकेत फ़ेल है।"),
      },
      {
        q: b("What usually causes a kicker?", "किकर आमतौर पर किस वजह से आता है?"),
        a: b("Surprise news — like a company announcing bad results or a big market event overnight.", "सरप्राइज़ ख़बर — जैसे कोई कंपनी रात में बुरे नतीजे घोषित करे या बड़ी बाज़ार घटना हो।"),
      },
    ],
  },

  // ── Three-candle ─────────────────────────────────────────────────────────

  "evening-star": {
    emoji: "🌆",
    example: b(
      "Like a three-part story: a sunny morning (big green), a confusing cloudy afternoon (tiny candle at the top), then a dark stormy night (big red). The sunshine (buying) was followed by a storm (selling) — the top is in.",
      "तीन-भाग की कहानी जैसा: धूप भरी सुबह (बड़ी हरी), भ्रमित बादल दोपहर (शीर्ष पर छोटी कैंडल), फिर तूफ़ानी रात (बड़ी लाल)। धूप (ख़रीदारी) के बाद तूफ़ान (बिकवाली) आया — शिखर बन गया।"
    ),
    simple: b(
      "Three candles: a strong green one (buyers winning), a tiny star candle at the top (buyers running out), then a strong red one (sellers take over and push deep). It signals the top of a rise — the mirror image of the morning star.",
      "तीन कैंडलें: एक मज़बूत हरी (ख़रीदार जीत रहे), शीर्ष पर एक छोटी स्टार कैंडल (ख़रीदार थक रहे), फिर एक मज़बूत लाल (विक्रेता हावी होकर गहरे उतरते हैं)। यह तेज़ी का शिखर संकेत देता है — मॉर्निंग स्टार का दर्पण प्रतिबिंब।"
    ),
    faqs: [
      {
        q: b("What is the tiny middle candle called?", "बीच की छोटी कैंडल को क्या कहते हैं?"),
        a: b("It is called the star — it shows buying has stalled and is often a doji or a small spinning top.", "इसे स्टार कहते हैं — यह दिखाता है कि ख़रीदारी रुक गई, अक्सर डोजी या छोटा स्पिनिंग टॉप होता है।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the middle star candle — that was the top sellers rejected.", "बीच की स्टार कैंडल के हाई के ठीक ऊपर — यही वह शिखर था जिसे विक्रेताओं ने ठुकराया।"),
      },
    ],
  },

  "three-white-soldiers": {
    emoji: "🪖",
    example: b(
      "Think of three strong soldiers marching forward together, each one going a bit further than the one before — step by step, no stopping. Buyers marched the price up for three whole days in a row without giving sellers any chance.",
      "तीन मज़बूत सैनिक एक साथ आगे बढ़ते हैं, हर एक पिछले से थोड़ा आगे — क़दम-दर-क़दम, बिना रुके। ख़रीदार लगातार तीन दिन तक क़ीमत ऊपर ले गए, विक्रेताओं को कोई मौक़ा नहीं दिया।"
    ),
    simple: b(
      "Three big green candles in a row, each closing higher than the last. Buyers (winning team) won every single day without a break. This is a very strong bullish sign — but after three big days, be careful not to buy too high.",
      "लगातार तीन बड़ी हरी कैंडलें, हर एक पिछली से ऊपर बंद। ख़रीदारों ने बिना रुके हर दिन जीता। यह बहुत मज़बूत बुलिश संकेत है — पर तीन बड़े दिनों के बाद बहुत ऊँचे ख़रीदने से बचो।"
    ),
    faqs: [
      {
        q: b("Should I buy after the third candle?", "तीसरी कैंडल के बाद ख़रीदूँ?"),
        a: b("Wait for a small pullback — price is stretched after three strong days, so chasing is risky.", "छोटी वापसी का इंतज़ार करो — तीन मज़बूत दिनों के बाद क़ीमत खिंची हुई है, पीछा करना जोखिम है।"),
      },
      {
        q: b("Do the candles need to be very long?", "क्या कैंडलें बहुत लंबी होनी चाहिए?"),
        a: b("They should be noticeably bigger than recent candles, with small or no upper wicks.", "वो हाल की कैंडलों से साफ़ तौर पर बड़ी होनी चाहिए, ऊपर बहुत छोटी या बिल्कुल विक नहीं।"),
      },
    ],
  },

  "three-black-crows": {
    emoji: "🦅",
    example: b(
      "Think of three strong defenders pushing you back step by step — each one gaining more ground than before. Sellers marched the price down for three whole days in a row, giving buyers no chance to fight back.",
      "तीन मज़बूत रक्षक तुम्हें क़दम-दर-क़दम पीछे धकेलते हैं — हर एक पहले से ज़्यादा ज़मीन पाता है। विक्रेताओं ने लगातार तीन दिन क़ीमत नीचे मार्च किया, ख़रीदारों को वापस लड़ने का मौक़ा नहीं दिया।"
    ),
    simple: b(
      "Three big red candles in a row, each closing lower than the last. Sellers (winning team) won every single day. This is a very strong bearish sign — but after three big falls, wait for a bounce before jumping in to sell.",
      "लगातार तीन बड़ी लाल कैंडलें, हर एक पिछली से नीचे बंद। विक्रेताओं ने बिना रुके हर दिन जीता। यह बहुत मज़बूत बेयरिश संकेत है — पर तीन बड़ी गिरावटों के बाद बेचने से पहले उछाल का इंतज़ार करो।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss if I sell?", "अगर मैं बेचूँ तो स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the first crow — that is the level sellers took control from.", "पहले कौवे के हाई के ठीक ऊपर — यही वह स्तर है जहाँ से विक्रेताओं ने नियंत्रण लिया।"),
      },
      {
        q: b("Is it safe to sell after the third candle?", "तीसरी कैंडल के बाद बेचना सुरक्षित है?"),
        a: b("Price is stretched downward by then — wait for a small bounce up and then sell.", "तब तक क़ीमत नीचे काफ़ी खिंची होती है — छोटी ऊपरी उछाल का इंतज़ार करो, फिर बेचो।"),
      },
    ],
  },

  "three-inside-up": {
    emoji: "🌱",
    example: b(
      "Imagine a match where the other team leads heavily, then you catch up and tie, and finally in the last over you hit a six to win. Three stages: big red (them leading), small green (tie), big green (you win). That is three inside up.",
      "सोचो एक मैच में दूसरी टीम बहुत आगे है, फिर तुम बराबरी पर आते हो, और अंत में आख़िरी ओवर में छक्का मारकर जीत जाते हो। तीन चरण: बड़ी लाल (वो आगे), छोटी हरी (टाई), बड़ी हरी (तुम जीते)।"
    ),
    simple: b(
      "Three candles: first a big red one, then a small green one inside it (a bullish harami), then a big green one that closes above the first candle's top. The third candle is the PROOF that buyers have truly taken over. Very reliable reversal.",
      "तीन कैंडलें: पहले एक बड़ी लाल, फिर उसके अंदर एक छोटी हरी (बुलिश हरामी), फिर एक बड़ी हरी जो पहली कैंडल के शीर्ष से ऊपर बंद होती है। तीसरी कैंडल इस बात का सबूत है कि ख़रीदारों ने सच में नियंत्रण लिया। बहुत भरोसेमंद पलटाव।"
    ),
    faqs: [
      {
        q: b("What makes this better than just a harami?", "यह अकेले हरामी से बेहतर क्यों है?"),
        a: b("The third big green candle is built-in confirmation — you do not have to wait for another candle.", "तीसरी बड़ी हरी कैंडल पुष्टि है जो पहले से शामिल है — तुम्हें अलग कैंडल का इंतज़ार नहीं करना।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Below the low of the first big red candle — that is the level that must hold.", "पहली बड़ी लाल कैंडल के लो के नीचे — यही वह स्तर है जो टिकना चाहिए।"),
      },
    ],
  },

  "three-inside-down": {
    emoji: "🍂",
    example: b(
      "Imagine a match where your team leads heavily, then the score gets tied, and finally in the last moment the other team scores to win. Three stages: big green (you lead), small red (tie), big red (they win). That is three inside down.",
      "सोचो एक मैच में तुम्हारी टीम बहुत आगे है, फिर स्कोर बराबर होता है, और अंत में आख़िरी पल में दूसरी टीम गोल करके जीत जाती है। तीन चरण: बड़ी हरी (तुम आगे), छोटी लाल (टाई), बड़ी लाल (वो जीते)।"
    ),
    simple: b(
      "Three candles: first a big green one, then a small red one inside it (a bearish harami), then a big red one that closes below the first candle's bottom. The third candle proves sellers have completely taken over. A strong reversal signal at the top.",
      "तीन कैंडलें: पहले एक बड़ी हरी, फिर उसके अंदर एक छोटी लाल (बेयरिश हरामी), फिर एक बड़ी लाल जो पहली कैंडल के तल से नीचे बंद होती है। तीसरी कैंडल साबित करती है कि विक्रेताओं ने पूरी तरह नियंत्रण ले लिया। शीर्ष पर मज़बूत पलटाव संकेत।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the first big green candle — that was the top buyers couldn't hold.", "पहली बड़ी हरी कैंडल के हाई के ठीक ऊपर — यही वह शिखर था जिसे ख़रीदार थाम नहीं सके।"),
      },
      {
        q: b("Is this more reliable than a bearish harami alone?", "क्या यह अकेले बेयरिश हरामी से ज़्यादा भरोसेमंद है?"),
        a: b("Yes — the third red candle is built-in proof; you do not need to wait for one more.", "हाँ — तीसरी लाल कैंडल पहले से सबूत है; एक और कैंडल का इंतज़ार नहीं करना।"),
      },
    ],
  },

  "three-outside-up": {
    emoji: "🏆",
    example: b(
      "Think of a bullish engulfing (big green swallows small red) as winning one game — and then three outside up is winning the SERIES because a third win follows right after. Three candles, and the reversal is proven beyond doubt.",
      "बुलिश एंगल्फिंग (बड़ी हरी छोटी लाल को ढकती है) को एक गेम जीतना समझो — और थ्री आउटसाइड अप सीरीज़ जीतना है क्योंकि तुरंत बाद तीसरी जीत भी आती है। तीन कैंडलें, और पलटाव पूरी तरह साबित।"
    ),
    simple: b(
      "A small red candle, then a big green one that completely covers it (bullish engulfing), and then a THIRD green candle that closes even higher. The reversal from sellers to buyers (winning team) is now confirmed by three candles — very reliable.",
      "एक छोटी लाल कैंडल, फिर एक बड़ी हरी जो उसे पूरी तरह ढक लेती है (बुलिश एंगल्फिंग), और फिर एक तीसरी हरी कैंडल जो और ऊपर बंद होती है। विक्रेताओं से ख़रीदारों को सत्ता हस्तांतरण अब तीन कैंडलों से पुष्ट — बहुत भरोसेमंद।"
    ),
    faqs: [
      {
        q: b("How is this different from bullish engulfing?", "यह बुलिश एंगल्फिंग से कैसे अलग है?"),
        a: b("Three outside up has a confirming third green candle built in — bullish engulfing needs you to wait for that proof.", "थ्री आउटसाइड अप में पुष्टि करने वाली तीसरी हरी कैंडल शामिल है — बुलिश एंगल्फिंग में तुम्हें उस सबूत का इंतज़ार करना होता है।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Below the low of the first small red candle — if price falls back there, the reversal has failed.", "पहली छोटी लाल कैंडल के लो के नीचे — अगर क़ीमत वहाँ वापस गई तो पलटाव फ़ेल है।"),
      },
    ],
  },

  "three-outside-down": {
    emoji: "⚓",
    example: b(
      "Think of a bearish engulfing as winning one game against you — and three outside down is the other team winning the full series: a small green, a big red that swallows it, then a third red even lower. Reversal fully confirmed.",
      "बेयरिश एंगल्फिंग को तुम्हारे ख़िलाफ़ एक गेम जीतना समझो — और थ्री आउटसाइड डाउन दूसरी टीम की पूरी सीरीज़ जीत है: छोटी हरी, उसे निगलने वाली बड़ी लाल, फिर और नीचे तीसरी लाल। पलटाव पूरी तरह पुष्ट।"
    ),
    simple: b(
      "A small green candle, then a big red one that fully covers it (bearish engulfing), and then a THIRD red candle that closes even lower. The reversal from buyers to sellers (winning team) is confirmed by three candles — one of the most reliable bearish signals.",
      "एक छोटी हरी कैंडल, फिर एक बड़ी लाल जो उसे पूरी तरह ढक लेती है (बेयरिश एंगल्फिंग), और फिर एक तीसरी लाल कैंडल जो और नीचे बंद होती है। ख़रीदारों से विक्रेताओं को सत्ता हस्तांतरण तीन कैंडलों से पुष्ट — सबसे भरोसेमंद बेयरिश संकेतों में से एक।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just above the high of the big red engulfing candle — if price goes back above it, sellers lost.", "बड़ी लाल एंगल्फिंग कैंडल के हाई के ठीक ऊपर — अगर क़ीमत वापस ऊपर गई तो विक्रेता हार गए।"),
      },
      {
        q: b("Is it stronger at resistance?", "क्या यह रेज़िस्टेंस पर ज़्यादा मज़बूत है?"),
        a: b("Yes — when this forms at a known ceiling where price turned before, it is far more reliable.", "हाँ — जब यह उस जानी-पहचानी छत पर बने जहाँ क़ीमत पहले मुड़ी थी, यह बहुत ज़्यादा भरोसेमंद होता है।"),
      },
    ],
  },

  "abandoned-baby": {
    emoji: "🌠",
    example: b(
      "Imagine a party that was going great (big red candle — everyone leaving), then there is a pause day where NOBODY shows up (the doji, floating alone with gaps on both sides), and then the party suddenly starts fresh with everyone arriving (big green). The pause was magical.",
      "सोचो एक पार्टी ठीक चल रही थी (बड़ी लाल — सब जा रहे थे), फिर एक दिन का ठहराव जिसमें कोई नहीं आता (डोजी, दोनों तरफ़ गैप के साथ अकेला), और फिर अचानक पार्टी नए सिरे से शुरू (बड़ी हरी — सब आ जाते हैं)। वो ठहराव जादुई था।"
    ),
    simple: b(
      "Three candles: a big red one, then a tiny doji with GAPS on both sides (it floats alone with no overlap), then a big green one. Those gaps isolate the doji completely. It is rare but very powerful — the whole mood flipped overnight.",
      "तीन कैंडलें: एक बड़ी लाल, फिर एक छोटा डोजी जिसके दोनों तरफ़ गैप (वो बिल्कुल अकेला, कोई ओवरलैप नहीं), फिर एक बड़ी हरी। वो गैप डोजी को पूरी तरह अलग कर देते हैं। यह दुर्लभ है पर बहुत शक्तिशाली — पूरा मूड रातोरात पलट गया।"
    ),
    faqs: [
      {
        q: b("Why are the gaps so important?", "गैप इतने ज़रूरी क्यों हैं?"),
        a: b("The gaps mean nobody was willing to sell at the old price — the market skipped to a new level instantly.", "गैप का मतलब है कोई पुरानी क़ीमत पर बेचने को तैयार नहीं था — बाज़ार तुरंत नए स्तर पर पहुँच गया।"),
      },
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Below the low of the doji — if price falls back there, the pattern has broken down.", "डोजी के लो के नीचे — अगर क़ीमत वहाँ वापस गई तो पैटर्न टूट गया।"),
      },
    ],
  },

  // ── Continuation patterns ────────────────────────────────────────────────

  "rising-three-methods": {
    emoji: "⏸️",
    example: b(
      "Think of a long-distance runner who is winning, then takes three short recovery steps, and then sprints ahead again. Those three small steps were not retreat — they were rest before the next push. The uptrend continues.",
      "एक लंबी दूरी के धावक की सोचो जो जीत रहा है, फिर तीन छोटे रिकवरी क़दम लेता है, और फिर आगे दौड़ता है। वो तीन छोटे क़दम पीछे हटना नहीं — अगले धक्के से पहले आराम था। ऊपर का ट्रेंड जारी है।"
    ),
    simple: b(
      "A big green candle, then three small red candles that drift back but stay inside the first candle's range, then a big green candle that breaks higher. The small red candles were just a rest — the uptrend (buyers winning) carries on.",
      "एक बड़ी हरी कैंडल, फिर तीन छोटी लाल कैंडलें जो वापस आती हैं पर पहली कैंडल की सीमा में रहती हैं, फिर एक बड़ी हरी जो ऊपर तोड़ती है। छोटी लाल कैंडलें बस आराम थीं — ऊपर का ट्रेंड (ख़रीदार जीत रहे) जारी रहता है।"
    ),
    faqs: [
      {
        q: b("How do I know the pattern has failed?", "मुझे कैसे पता चलेगा कि पैटर्न फ़ेल हो गया?"),
        a: b("If any of the small candles close below the first big green candle's low, the continuation is broken.", "अगर छोटी कैंडलों में से कोई पहली बड़ी हरी कैंडल के लो के नीचे बंद हो, तो जारी रहना टूट गया।"),
      },
      {
        q: b("Should I buy during the small red candles?", "क्या मैं छोटी लाल कैंडलों के दौरान ख़रीदूँ?"),
        a: b("You can, but the safest entry is when the final big green candle breaks above the first candle's high.", "कर सकते हो, पर सबसे सुरक्षित प्रवेश तब है जब अंतिम बड़ी हरी कैंडल पहली कैंडल के हाई से ऊपर टूटे।"),
      },
    ],
  },

  "falling-three-methods": {
    emoji: "⬇️",
    example: b(
      "Think of a ball rolling down a hill that briefly bumps against three small stones and slows a little, then continues rolling down fast. Those bumps were not a stop — just small obstacles before the downtrend carries on.",
      "एक पहाड़ी से लुढ़कती गेंद की सोचो जो तीन छोटे पत्थरों से टकराकर थोड़ा धीमी होती है, फिर तेज़ी से लुढ़कती रहती है। वो टक्कर रुकना नहीं थीं — बस छोटी रुकावटें थीं जब तक गिरावट जारी रही।"
    ),
    simple: b(
      "A big red candle, then three small green candles that bounce up but stay inside the first candle's range, then a big red candle that breaks lower. The small green candles were just a short rest — the downtrend (sellers winning) continues.",
      "एक बड़ी लाल कैंडल, फिर तीन छोटी हरी कैंडलें जो ऊपर उछलती हैं पर पहली कैंडल की सीमा में रहती हैं, फिर एक बड़ी लाल जो नीचे तोड़ती है। छोटी हरी कैंडलें बस थोड़ा आराम थीं — गिरावट (विक्रेता जीत रहे) जारी रहती है।"
    ),
    faqs: [
      {
        q: b("Can I sell during the small green candles?", "क्या मैं छोटी हरी कैंडलों के दौरान बेच सकता हूँ?"),
        a: b("You can, but the safest entry is when the final big red candle breaks below the first candle's low.", "कर सकते हो, पर सबसे सुरक्षित प्रवेश तब है जब अंतिम बड़ी लाल कैंडल पहली कैंडल के लो से नीचे टूटे।"),
      },
      {
        q: b("How do I know the pattern has failed?", "मुझे कैसे पता चलेगा कि पैटर्न फ़ेल हो गया?"),
        a: b("If any small green candle closes above the first big red candle's high, the downtrend continuation is broken.", "अगर कोई छोटी हरी कैंडल पहली बड़ी लाल कैंडल के हाई के ऊपर बंद हो, तो गिरावट का जारी रहना टूट गया।"),
      },
    ],
  },

  "mat-hold": {
    emoji: "🧲",
    example: b(
      "Imagine a strong runner who leaps over a puddle (a gap), jogs on the spot a bit without going backward, and then sprints forward again. The puddle (gap) was never stepped in — buyers held their ground firmly and the uptrend resumes.",
      "एक मज़बूत धावक सोचो जो एक गड्ढे पर छलांग लगाता है (गैप), थोड़ा जगह पर जॉगिंग करता है बिना पीछे गए, फिर आगे दौड़ता है। गड्ढे में (गैप) कभी क़दम नहीं पड़ा — ख़रीदारों ने मज़बूती से ज़मीन पकड़ी और ऊपर का ट्रेंड फिर शुरू।"
    ),
    simple: b(
      "Like rising three methods, but stronger — there is a gap UP after the first big green candle, and the small pullback candles NEVER fill that gap. Buyers defended the gap completely, showing extra commitment. Then a big green candle resumes the uptrend.",
      "राइज़िंग थ्री मेथड्स जैसा, पर मज़बूत — पहली बड़ी हरी कैंडल के बाद ऊपर एक गैप है, और छोटी वापसी कैंडलें उस गैप को कभी नहीं भरतीं। ख़रीदारों ने गैप को पूरी तरह बचाया, अतिरिक्त प्रतिबद्धता दिखाई। फिर एक बड़ी हरी कैंडल ऊपर का ट्रेंड फिर शुरू करती है।"
    ),
    faqs: [
      {
        q: b("Why is the gap so important here?", "यहाँ गैप इतना ज़रूरी क्यों है?"),
        a: b("An unfilled gap means buyers were so eager they never let price fall back — that shows extra conviction.", "न भरा गैप मतलब ख़रीदार इतने उत्सुक थे कि क़ीमत को कभी वापस नहीं गिरने दिया — यह अतिरिक्त दृढ़ विश्वास दिखाता है।"),
      },
      {
        q: b("What if the small candles dip into the gap?", "अगर छोटी कैंडलें गैप में उतर जाएँ?"),
        a: b("Then it is no longer a mat hold — treat it as a regular rising three methods instead.", "तब यह मैट होल्ड नहीं रहा — इसे साधारण राइज़िंग थ्री मेथड्स मानो।"),
      },
    ],
  },

  "separating-lines": {
    emoji: "↩️",
    example: b(
      "Think of a see-saw that tips down for one moment (the counter-trend candle), and then immediately bounces back to the same starting point and goes higher. The down moment was very brief — the original upward direction wins again.",
      "एक सी-सॉ सोचो जो एक पल के लिए नीचे झुकता है (काउंटर-ट्रेंड कैंडल), और फिर तुरंत उसी शुरुआती जगह पर वापस उछलकर ऊपर जाता है। नीचे वाला पल बहुत छोटा था — मूल ऊपर की दिशा फिर जीत जाती है।"
    ),
    simple: b(
      "In an uptrend, a counter-trend red candle appears, then the NEXT candle opens at the SAME price where that red one opened, and closes strongly higher. Buyers used the red candle's starting price as a springboard. The uptrend carries on — this is a continuation signal.",
      "ऊपर के ट्रेंड में एक काउंटर-ट्रेंड लाल कैंडल आती है, फिर अगली कैंडल उसी क़ीमत पर खुलती है जहाँ वो लाल खुली थी, और ज़ोरदार तरीक़े से ऊपर बंद होती है। ख़रीदारों ने लाल कैंडल की शुरुआती क़ीमत को स्प्रिंगबोर्ड बनाया। ऊपर का ट्रेंड जारी रहता है — यह जारी रहने का संकेत है।"
    ),
    faqs: [
      {
        q: b("What is the key feature of this pattern?", "इस पैटर्न की मुख्य पहचान क्या है?"),
        a: b("Both candles open at the exact same price — the second uses the first candle's open as its launching point.", "दोनों कैंडलें एक ही क़ीमत पर खुलती हैं — दूसरी पहली कैंडल के ओपन को लॉन्चिंग पॉइंट बनाती है।"),
      },
      {
        q: b("Does it work in a downtrend too?", "क्या यह गिरावट में भी काम करता है?"),
        a: b("Yes — in a downtrend, a green candle gets instantly undone by a red one opening at the same price and closing lower.", "हाँ — गिरावट में, हरी कैंडल को तुरंत उसी क़ीमत पर खुलने वाली लाल कैंडल नीचे बंद करके रद्द कर देती है।"),
      },
    ],
  },
};
