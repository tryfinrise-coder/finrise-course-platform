// ─────────────────────────────────────────────────────────────────────────
// Course: Candlestick Mastery  (slug: candlestick-mastery)
//
// Each course lives in its own folder under src/courses/<slug>/ so new courses
// can be added without touching shared code. This file holds the beginner-
// friendly, bilingual (English / हिन्दी) explanations, a real-life example, a
// graphic key, and learning FAQs — keyed by lesson slug.
// ─────────────────────────────────────────────────────────────────────────

export interface Bilingual {
  en: string;
  hi: string;
}
export interface SimpleFaq {
  q: Bilingual;
  a: Bilingual;
}
export interface SimpleLessonContent {
  emoji: string; // a friendly graphic for the explainer banner
  example: Bilingual; // a very-easy, real-life market example
  simple: Bilingual; // the pattern explained in plain language
  faqs: SimpleFaq[];
}

const b = (en: string, hi: string): Bilingual => ({ en, hi });

export const SIMPLE: Record<string, SimpleLessonContent> = {
  // ── Foundations ──────────────────────────────────────────────────────
  "how-markets-work": {
    emoji: "🛒",
    example: b(
      "Imagine a vegetable market. If everyone suddenly wants tomatoes and there are few left, the seller raises the price. If tomatoes are piled high and nobody wants them, the price drops. The stock market works exactly the same way — just faster.",
      "एक सब्ज़ी मंडी की कल्पना करें। अगर अचानक सब लोग टमाटर चाहते हैं और टमाटर कम बचे हैं, तो दुकानदार दाम बढ़ा देता है। अगर टमाटर ढेर सारे पड़े हैं और कोई नहीं चाहता, तो दाम गिर जाता है। शेयर बाज़ार भी बिलकुल ऐसे ही चलता है — बस बहुत तेज़।"
    ),
    simple: b(
      "Price is just the latest deal between a buyer and a seller. More eager buyers push price up; more eager sellers push it down. A chart simply records this tug-of-war.",
      "क़ीमत बस ख़रीदार और विक्रेता के बीच का ताज़ा सौदा है। ज़्यादा उत्सुक ख़रीदार क़ीमत ऊपर ले जाते हैं; ज़्यादा उत्सुक विक्रेता नीचे। चार्ट इसी रस्साकशी को रिकॉर्ड करता है।"
    ),
    faqs: [
      {
        q: b("Do I need a lot of money to start?", "क्या शुरू करने के लिए बहुत पैसे चाहिए?"),
        a: b("No. The goal here is to learn to read charts first. Understanding comes before money.", "नहीं। यहाँ लक्ष्य पहले चार्ट पढ़ना सीखना है। समझ पैसे से पहले आती है।"),
      },
      {
        q: b("Why do patterns from long ago still work?", "पुराने पैटर्न आज भी क्यों काम करते हैं?"),
        a: b("Because they show human fear and greed — and those emotions never change.", "क्योंकि वे इंसानी डर और लालच दिखाते हैं — और ये भावनाएँ कभी नहीं बदलतीं।"),
      },
    ],
  },
  "anatomy-of-a-candle": {
    emoji: "🕯️",
    example: b(
      "Think of one candle as a one-day diary entry: where the day started, the highest and lowest it felt, and where it ended. Green = the day ended happier (higher); red = it ended sadder (lower).",
      "एक कैंडल को एक दिन की डायरी समझें: दिन कहाँ शुरू हुआ, सबसे ऊँचा और सबसे नीचा कहाँ गया, और कहाँ ख़त्म हुआ। हरा = दिन ख़ुशी से ख़त्म (ऊपर); लाल = दुख से ख़त्म (नीचे)।"
    ),
    simple: b(
      "The thick body shows open-to-close (who won). The thin wicks show how far price stretched before being pushed back. Big body = strong conviction; long wick = a rejected move.",
      "मोटा हिस्सा (बॉडी) ओपन से क्लोज़ दिखाता है (कौन जीता)। पतली विक दिखाती है क़ीमत कितनी दूर गई फिर वापस धकेली गई। बड़ी बॉडी = मज़बूत भरोसा; लंबी विक = ठुकराई गई चाल।"
    ),
    faqs: [
      {
        q: b("What does a long lower wick mean?", "लंबी निचली विक का क्या मतलब है?"),
        a: b("Sellers pushed price down, but buyers fought back and lifted it — a sign of buying strength.", "विक्रेताओं ने क़ीमत नीचे धकेली, पर ख़रीदारों ने वापस ऊपर उठा दी — ख़रीदारी की ताक़त का संकेत।"),
      },
      {
        q: b("Is a green candle always good to buy?", "क्या हरी कैंडल हमेशा ख़रीदने लायक़ है?"),
        a: b("No — colour alone isn't enough. Where it forms (the trend and level) matters far more.", "नहीं — सिर्फ़ रंग काफ़ी नहीं। यह कहाँ बनी (ट्रेंड और लेवल) ज़्यादा मायने रखता है।"),
      },
    ],
  },
  "trend-support-resistance": {
    emoji: "📐",
    example: b(
      "Support is like the floor of a room — price keeps bouncing up off it. Resistance is the ceiling — price keeps bumping its head and falling back. A pattern at the floor or ceiling is far more meaningful than one in the middle of the room.",
      "सपोर्ट कमरे के फ़र्श जैसा है — क़ीमत उससे टकराकर ऊपर उछलती रहती है। रेज़िस्टेंस छत है — क़ीमत सिर टकराकर वापस गिरती है। फ़र्श या छत पर बना पैटर्न, कमरे के बीच वाले से कहीं ज़्यादा मायने रखता है।"
    ),
    simple: b(
      "First read the trend and mark the floors/ceilings. Only then look for a candle signal AT those levels, wait for confirmation, and keep a stop just beyond the pattern. Context first, candle second.",
      "पहले ट्रेंड पढ़ें और फ़र्श/छत के लेवल मार्क करें। फिर उन्हीं लेवल पर कैंडल सिग्नल देखें, पुष्टि का इंतज़ार करें, और पैटर्न के ठीक बाहर स्टॉप रखें। पहले संदर्भ, बाद में कैंडल।"
    ),
    faqs: [
      {
        q: b("How do I find support and resistance?", "सपोर्ट और रेज़िस्टेंस कैसे ढूँढें?"),
        a: b("Look at recent highs and lows, round numbers, and prices where the chart turned before.", "हाल के हाई-लो, राउंड नंबर, और वे क़ीमतें देखें जहाँ चार्ट पहले मुड़ा था।"),
      },
    ],
  },
  "risk-management": {
    emoji: "🛡️",
    example: b(
      "Think of a cricket team that never loses all its wickets cheaply. Even on a bad day it stays in the game. A trader does the same by risking only a tiny bit on each trade — so one mistake never knocks you out.",
      "एक क्रिकेट टीम की कल्पना करो जो कभी सस्ते में सारे विकेट नहीं खोती। ख़राब दिन में भी वो खेल में बनी रहती है। एक ट्रेडर भी ऐसे ही हर ट्रेड पर बहुत थोड़ा जोखिम लेता है — ताकि एक ग़लती कभी बाहर न कर दे।"
    ),
    simple: b(
      "Risk only a small fixed amount (like 1–2% of your money) per trade. Buy in small parts as price dips (don't go all-in at once), and sell in parts as it rises. Always know your exit before you enter.",
      "हर ट्रेड पर सिर्फ़ थोड़ा तय पैसा (जैसे अपने पैसे का 1–2%) जोखिम में डालो। क़ीमत गिरने पर छोटे-छोटे हिस्सों में ख़रीदो (एक साथ पूरा नहीं), और बढ़ने पर हिस्सों में बेचो। घुसने से पहले हमेशा अपना निकलने का रास्ता जान लो।"
    ),
    faqs: [
      {
        q: b("Why buy in parts instead of all at once?", "एक साथ की जगह हिस्सों में क्यों ख़रीदें?"),
        a: b("Because you can't pick the exact bottom. Splitting your buys gives a better average price and less regret.", "क्योंकि तुम बिलकुल तल नहीं पकड़ सकते। ख़रीदारी बाँटने से औसत क़ीमत बेहतर मिलती है और कम पछतावा होता है।"),
      },
      {
        q: b("When should I move my stop-loss up?", "स्टॉप-लॉस ऊपर कब करूँ?"),
        a: b("After your first target hits, move the stop to your entry price — then the trade can't lose money.", "पहला टारगेट लगने के बाद स्टॉप को अपनी एंट्री क़ीमत पर ले आओ — फिर ट्रेड में नुक़सान नहीं हो सकता।"),
      },
    ],
  },

  // ── Patterns ─────────────────────────────────────────────────────────
  doji: {
    emoji: "⚖️",
    example: b(
      "A doji is like a tug-of-war that ends in a perfect tie — both teams pull hard, but the rope doesn't move. After a long run in one direction, a tie is the first hint the winners are getting tired.",
      "डोजी एक रस्साकशी जैसा है जो बराबरी पर ख़त्म होती है — दोनों टीमें ज़ोर लगाती हैं, पर रस्सी हिलती नहीं। एक तरफ़ लंबी चाल के बाद, यह बराबरी पहला संकेत है कि जीतने वाले थकने लगे हैं।"
    ),
    simple: b(
      "Open and close are almost equal, so the body is a thin line. It means indecision. On its own it's nothing — but after a strong trend, it warns the move may be running out of steam.",
      "ओपन और क्लोज़ लगभग बराबर होते हैं, इसलिए बॉडी पतली रेखा होती है। यह अनिर्णय दिखाता है। अकेले कुछ नहीं — पर मज़बूत ट्रेंड के बाद चेतावनी देता है कि चाल की हवा निकल रही है।"
    ),
    faqs: [
      {
        q: b("Should I trade as soon as I see a doji?", "डोजी दिखते ही ट्रेड कर देना चाहिए?"),
        a: b("No. Wait for the next candle to close and pick a direction — that confirmation is key.", "नहीं। अगली कैंडल के बंद होकर दिशा चुनने का इंतज़ार करें — वह पुष्टि ज़रूरी है।"),
      },
    ],
  },
  hammer: {
    emoji: "🔨",
    example: b(
      "Picture a ball thrown hard at the floor — it slams down, then bounces right back up. The long lower wick is that slam-and-bounce: sellers pushed price down, buyers smacked it back up by the close.",
      "एक गेंद की कल्पना करें जो ज़ोर से फ़र्श पर फेंकी गई — नीचे टकराती है, फिर वापस ऊपर उछल जाती है। लंबी निचली विक यही टकराव-और-उछाल है: विक्रेताओं ने नीचे धकेला, ख़रीदारों ने बंद होने तक वापस ऊपर मार दिया।"
    ),
    simple: b(
      "After a downtrend, a small body sits near the top with a long lower wick (2× the body or more). Buyers stepped in hard. It hints the fall may be ending — especially at support.",
      "गिरावट के बाद, छोटी बॉडी ऊपर की ओर होती है और नीचे लंबी विक (बॉडी से 2 गुना या ज़्यादा)। ख़रीदार मज़बूती से आए। यह संकेत है कि गिरावट ख़त्म हो सकती है — ख़ासकर सपोर्ट पर।"
    ),
    faqs: [
      {
        q: b("Where do I put my stop-loss?", "स्टॉप-लॉस कहाँ रखूँ?"),
        a: b("Just below the hammer's low. If price closes under it, the pattern has failed.", "हैमर के लो के ठीक नीचे। अगर क़ीमत उसके नीचे बंद हो, तो पैटर्न फ़ेल हो गया।"),
      },
      {
        q: b("Does the colour of the hammer matter?", "हैमर का रंग मायने रखता है?"),
        a: b("A green hammer is slightly stronger, but a red one at support still works.", "हरा हैमर थोड़ा मज़बूत है, पर सपोर्ट पर लाल हैमर भी काम करता है।"),
      },
    ],
  },
  "shooting-star": {
    emoji: "☄️",
    example: b(
      "Like a rocket that shoots up but runs out of fuel and falls back to the launchpad. Buyers pushed to new highs, then sellers slammed it back down — the long upper wick is the failed launch.",
      "एक रॉकेट जैसा जो ऊपर जाता है पर ईंधन ख़त्म होकर वापस लॉन्चपैड पर गिर जाता है। ख़रीदारों ने नई ऊँचाई बनाई, फिर विक्रेताओं ने नीचे पटक दिया — लंबी ऊपरी विक यही असफल लॉन्च है।"
    ),
    simple: b(
      "After an uptrend, a small body sits near the low with a long upper wick. Buyers were rejected at the highs. It warns the rise may be topping out — best near resistance.",
      "तेज़ी के बाद, छोटी बॉडी नीचे की ओर और ऊपर लंबी विक होती है। ख़रीदार ऊँचाई पर ठुकरा दिए गए। यह चेतावनी है कि तेज़ी का शिखर बन सकता है — रेज़िस्टेंस के पास सबसे अच्छा।"
    ),
    faqs: [
      {
        q: b("How is it different from a hammer?", "यह हैमर से कैसे अलग है?"),
        a: b("Same shape flipped, and opposite location: shooting star tops an uptrend, hammer bottoms a downtrend.", "वही आकार उल्टा, और उल्टी जगह: शूटिंग स्टार तेज़ी के शिखर पर, हैमर गिरावट के तल पर।"),
      },
    ],
  },
  "bullish-engulfing": {
    emoji: "🟢",
    example: b(
      "Imagine a small red car completely covered by a big green truck parking over it. In one session, buyers overwhelmed everything the sellers did the day before.",
      "कल्पना करें एक छोटी लाल कार के ऊपर एक बड़ा हरा ट्रक खड़ा हो जाए जो उसे पूरी तरह ढक ले। एक ही सत्र में, ख़रीदारों ने पिछले दिन विक्रेताओं ने जो किया उस सब पर हावी हो गए।"
    ),
    simple: b(
      "A small red candle is followed by a bigger green candle whose body fully covers it. It's a clean handover from sellers to buyers — one of the most reliable reversal signals at support.",
      "एक छोटी लाल कैंडल के बाद एक बड़ी हरी कैंडल आती है जिसकी बॉडी उसे पूरी तरह ढक लेती है। यह विक्रेताओं से ख़रीदारों को साफ़ हैंडओवर है — सपोर्ट पर सबसे भरोसेमंद रिवर्सल संकेतों में से एक।"
    ),
    faqs: [
      {
        q: b("Must the wicks be covered too?", "क्या विक भी ढकी होनी चाहिए?"),
        a: b("No — only the body needs to be fully engulfed. The body is what matters.", "नहीं — सिर्फ़ बॉडी पूरी तरह ढकी होनी चाहिए। बॉडी ही मायने रखती है।"),
      },
      {
        q: b("Bigger engulfing candle = better?", "बड़ी एंगल्फिंग कैंडल = बेहतर?"),
        a: b("Yes. A larger green body means more buyers committed, which is stronger.", "हाँ। बड़ी हरी बॉडी का मतलब ज़्यादा ख़रीदार जुड़े, जो ज़्यादा मज़बूत है।"),
      },
    ],
  },
  "bearish-engulfing": {
    emoji: "🔴",
    example: b(
      "The opposite of the green truck: a small green car gets parked over by a big red truck. After a rally, sellers suddenly overwhelm the buyers in a single session.",
      "हरे ट्रक का उल्टा: एक छोटी हरी कार के ऊपर एक बड़ा लाल ट्रक खड़ा हो जाता है। तेज़ी के बाद, विक्रेता अचानक एक ही सत्र में ख़रीदारों पर हावी हो जाते हैं।"
    ),
    simple: b(
      "A small green candle is swallowed by a bigger red candle. Control passes from buyers to sellers — a strong reversal tell at resistance after an uptrend.",
      "एक छोटी हरी कैंडल को एक बड़ी लाल कैंडल निगल लेती है। नियंत्रण ख़रीदारों से विक्रेताओं को जाता है — तेज़ी के बाद रेज़िस्टेंस पर मज़बूत रिवर्सल संकेत।"
    ),
    faqs: [
      {
        q: b("Where's the stop-loss?", "स्टॉप-लॉस कहाँ?"),
        a: b("Just above the high of the red engulfing candle.", "लाल एंगल्फिंग कैंडल के हाई के ठीक ऊपर।"),
      },
    ],
  },
  "morning-star": {
    emoji: "🌅",
    example: b(
      "A three-act story like night turning to morning: a big red candle (the dark), a tiny pause candle (the calm before dawn), then a big green candle (sunrise). The bottom is in.",
      "रात से सुबह होने जैसी तीन-अंकों की कहानी: एक बड़ी लाल कैंडल (अँधेरा), एक छोटी रुकने वाली कैंडल (भोर से पहले की शांति), फिर एक बड़ी हरी कैंडल (सूर्योदय)। तल बन गया।"
    ),
    simple: b(
      "Three candles: a strong red one, a small 'star' that shows selling drying up, then a strong green one closing deep into the first. A high-probability bottom reversal.",
      "तीन कैंडल: एक मज़बूत लाल, एक छोटा 'स्टार' जो बिकवाली थमती दिखाता है, फिर एक मज़बूत हरी जो पहली में गहराई तक बंद होती है। उच्च-संभावना वाला तल रिवर्सल।"
    ),
    faqs: [
      {
        q: b("What is the 'star' in the middle?", "बीच का 'स्टार' क्या है?"),
        a: b("A small-bodied candle (often a doji) — it's the moment selling pressure runs out.", "एक छोटी बॉडी वाली कैंडल (अक्सर डोजी) — यही वह पल है जब बिकवाली का दबाव ख़त्म होता है।"),
      },
    ],
  },
};
