import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  CandlestickChart, Film, Crosshair, Infinity as InfinityIcon,
  X, Star, ListFilter, CheckCircle2, BarChart2, Bot,
  Languages, Shield, Clock, FileText, MinusCircle, HelpCircle, Lock,
} from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/types";
import { getAutoApplyDiscount } from "@/lib/discounts";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import ReviewCarousel from "@/components/marketing/ReviewCarousel";
import HeroMedia from "@/components/marketing/HeroMedia";
import PixelEvent from "@/components/pixel/PixelEvent";

export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product || product.type !== "course") return {};
  return {
    title: `${product.title} — Finrise`,
    description: product.description ?? `Learn ${product.title} on Finrise.`,
  };
}

/* ── Helpers ───────────────────────────────────────────────────── */
function toYouTubeEmbed(url: string): string | null {
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return null;
}

/* ── Hero media slot: imported client component with onError fallback ── */

/* ── YouTube preview link (shown below the CTA if a video is set) ── */
function YoutubePreviewLink({ heroVideo }: { heroVideo: string | null }) {
  if (!heroVideo) return null;
  const embedUrl = toYouTubeEmbed(heroVideo);
  if (!embedUrl) return null;
  const videoId = embedUrl.replace("https://www.youtube.com/embed/", "").split("?")[0];
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold"
      style={{ color: "#18A87A" }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      Watch course preview
    </a>
  );
}


/* ── Page ──────────────────────────────────────────────────────── */
export default async function CourseSalesPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product || product.type !== "course") notFound();

  /* ── Palette ─────────────────────────────────────────────────── */
  const BG_INK      = "#000000";
  const BG_NAVY     = "#0E1B2E";
  const BG_CARD     = "#141A24";
  const BG_CARD2    = "#16202E";
  const TEXT_HEAD   = "#E7ECF5";
  const TEXT_BODY   = "#AEB9CC";
  const TEXT_MUTED  = "#6B7280";
  const EMERALD     = "#18A87A";
  const GOLD        = "#E0B43A";
  const BORDER      = "rgba(255,255,255,0.08)";
  const RED         = "#dc2626";
  const GREEN       = "#16a34a";

  const TICKER = [
    { pair: "EUR/USD", change: "+0.84%", up: true },
    { pair: "XAU/USD", change: "−0.21%", up: false },
    { pair: "GBP/JPY", change: "+0.32%", up: true },
    { pair: "NIFTY 50", change: "+0.61%", up: true },
  ];

  // Pricing is admin-driven: the product's list price (from the product editor)
  // and the best auto-apply discount (from the Discounts page) → the final price.
  const listPrice = product.price;
  const autoDiscount = await getAutoApplyDiscount(listPrice);
  const finalPrice = autoDiscount
    ? autoDiscount.kind === "percent"
      ? Math.round(listPrice * (1 - autoDiscount.value / 100))
      : Math.max(0, listPrice - autoDiscount.value)
    : listPrice;
  const priceNow = `${formatPrice(finalPrice)}/-`;
  const priceStrike = finalPrice < listPrice ? `${formatPrice(listPrice)}/-` : undefined;

  return (
    <div
      className={poppins.className}
      style={{ background: BG_INK, color: TEXT_BODY, minHeight: "100dvh" }}
    >
      {/* ViewContent fires when someone lands on this sales page */}
      <PixelEvent
        event="ViewContent"
        params={{
          content_name: product.title,
          content_category: "Course",
          value: finalPrice / 100,
          currency: "INR",
        }}
      />
      {/* ════════════════════════════════════════════════════════════
          1. STICKY HEADER
      ════════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(0,0,0,0.9)",
          borderBottom: `1px solid ${BORDER}`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
          <Link href="/" className="shrink-0 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/finrise-icon.svg" width={30} height={30} alt="Finrise" className="rounded-md" />
            <span
              className="text-lg font-extrabold tracking-tight"
              style={{ color: TEXT_HEAD, letterSpacing: "-0.02em" }}
            >
              Finrise
            </span>
          </Link>

          {/* scrolling market ticker beside the logo */}
          <div
            className="relative min-w-0 flex-1 overflow-hidden sm:flex sm:justify-center"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 16px), transparent)",
              maskImage: "linear-gradient(90deg, transparent, #000 16px, #000 calc(100% - 16px), transparent)",
            }}
          >
            <div className="marquee-track">
              {[0, 1].map((g) => (
                <div className={g === 1 ? "marquee-group marquee-dup" : "marquee-group"} key={g} aria-hidden={g === 1}>
                  {TICKER.map((t, i) => (
                    <span key={i} className="inline-flex items-baseline gap-1.5 text-[11px]">
                      <span className="font-semibold" style={{ color: TEXT_HEAD }}>{t.pair}</span>
                      <span className="font-bold" style={{ color: t.up ? GREEN : RED }}>{t.change}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          2. HERO — two-column desktop, stacked mobile
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: `linear-gradient(180deg, ${BG_NAVY} 0%, ${BG_INK} 100%)`,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(40px, 8vw, 64px) 0 clamp(48px, 10vw, 88px)",
        }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

            {/* LEFT — copy */}
            <div className="pt-2 text-center lg:text-left">
              {/* Eyebrow pill */}
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest"
                style={{
                  borderColor: EMERALD,
                  color: EMERALD,
                  background: "rgba(24,168,122,0.10)",
                }}
              >
                <CandlestickChart size={15} />
                Candlestick Pattern Mastery
              </div>

              {/* Headline */}
              <h1
                style={{
                  color: TEXT_HEAD,
                  fontSize: "clamp(1.6rem, 3.4vw, 2.35rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.1rem",
                }}
              >
                <em className="not-italic" style={{ color: "#F87171" }}>Are you tired of doing Losses?</em>
                <br />
                <em className="not-italic" style={{ color: "#FFFFFF" }}>Stop Guessing.</em>{" "}
                <em className="not-italic" style={{ color: EMERALD }}>Start Reading the Chart.</em>
              </h1>

              {/* Sub-promise */}
              <p style={{ color: TEXT_BODY, fontSize: "1.05rem", fontWeight: 500, marginBottom: "1.25rem" }}>
                Master candlestick patterns in plain Hindi &amp; English — and never miss the signal again.
              </p>

              {/* hero banner — mobile only, directly under the sub-promise */}
              <div className="mx-auto mb-7 mt-2 w-full max-w-md lg:hidden">
                <HeroMedia heroVideo={product.hero_video ?? null} cover={product.cover ?? null} />
              </div>

              {/* Benefit chips */}
              <div className="mb-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                {[
                  { Icon: Film, label: "34 animated patterns" },
                  { Icon: Crosshair, label: "Entry · stop · risk" },
                  { Icon: InfinityIcon, label: "Lifetime access" },
                ].map(({ Icon: ChipIcon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold"
                    style={{ borderColor: "rgba(24,168,122,0.35)", background: "rgba(24,168,122,0.08)", color: TEXT_HEAD }}
                  >
                    <ChipIcon size={16} color={EMERALD} />
                    {label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div data-track="cta_click" data-track-label="sign_up">
                <CheckoutButton
                  slug={product.slug}
                  label="Sign Up"
                  gold
                  priceStrike={priceStrike}
                  priceNow={priceNow}
                  className="h-14 rounded-xl px-8 text-[17px] font-bold"
                />
              </div>
              <YoutubePreviewLink heroVideo={product.hero_video ?? null} />
            </div>

            {/* RIGHT — hero media (desktop only; on mobile it sits under the sub-promise) */}
            <div className="mx-auto hidden w-full max-w-md pt-2 lg:block lg:max-w-none">
              <HeroMedia
                heroVideo={product.hero_video ?? null}
                cover={product.cover ?? null}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. THE PROBLEM
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "radial-gradient(120% 85% at 50% 0%, #12273f 0%, #0a1320 45%, #000000 100%)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(40px, 8vw, 72px) 0",
        }}
      >
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
            Sound familiar?
          </p>
          <div className="space-y-5">
            <p
              style={{
                color: TEXT_HEAD,
                fontSize: "clamp(1.15rem, 2.6vw, 1.45rem)",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              You&rsquo;ve watched the free videos and collected the random tips — and somehow{" "}
              <span style={{ color: EMERALD }}>none of it ever clicked.</span>
            </p>
            <p
              style={{
                color: TEXT_BODY,
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.65,
              }}
            >
              You&rsquo;re still guessing at every candle, with{" "}
              <span style={{ color: TEXT_HEAD, fontWeight: 600 }}>no real structure to stand on.</span>
            </p>
            <p
              style={{
                color: TEXT_BODY,
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.65,
              }}
            >
              That&rsquo;s <span style={{ color: TEXT_HEAD, fontWeight: 700 }}>not your fault</span> — nobody showed you the order it&rsquo;s supposed to make sense in.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3b. PAIN — centered, conversion-focused
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG_INK,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(40px, 8vw, 72px) 0",
        }}
      >
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
            Be honest
          </p>
          <h2
            className="mx-auto mb-3"
            style={{
              color: TEXT_HEAD,
              fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 620,
            }}
          >
            Does any of this sound like you?
          </h2>
          <p className="mx-auto mb-10" style={{ color: TEXT_BODY, maxWidth: 520, fontSize: "1rem", lineHeight: 1.6 }}>
            Without a system, the same thing keeps happening:
          </p>

          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {[
              "You enter a trade — and the candle does the exact opposite.",
              'A "sure-shot" tip works once, then never again.',
              "Every chart looks different, so nothing ever sticks.",
              "You know the pattern names — but not when they actually matter.",
            ].map((pain) => (
              <div
                key={pain}
                className="flex items-start gap-3 rounded-xl border p-4"
                style={{ borderColor: BORDER, background: BG_CARD }}
              >
                <X size={20} color={RED} className="shrink-0" />
                <span style={{ color: TEXT_BODY, fontSize: "0.98rem", lineHeight: 1.55 }}>{pain}</span>
              </div>
            ))}
          </div>

          <p
            className="mx-auto mt-10"
            style={{
              color: TEXT_HEAD,
              maxWidth: 560,
              fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            The fix isn&rsquo;t another tip — it&rsquo;s learning to{" "}
            <span style={{ color: EMERALD }}>read the chart yourself, in the right order.</span>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. WHAT YOU'LL LEARN
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG_NAVY,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(44px, 9vw, 80px) 0",
        }}
      >
        <div className="mx-auto max-w-5xl px-5 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
            What&rsquo;s inside
          </p>
          <h2
            className="mx-auto mb-3"
            style={{
              color: TEXT_HEAD,
              fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 660,
            }}
          >
            Everything you need — taught in the right order
          </h2>
          <p className="mx-auto mb-12" style={{ color: TEXT_BODY, maxWidth: 540, fontSize: "1.05rem", lineHeight: 1.6 }}>
            From &ldquo;what is a candle?&rdquo; to reading live charts with confidence.
          </p>

          <div className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: CandlestickChart, title: "34 candlestick patterns", sub: "Every pattern explained with clear animations." },
              { Icon: Languages, title: "English + हिंदी", sub: "Learn every lesson in the language you think in." },
              { Icon: Shield, title: "Risk-management module", sub: "Where to enter, where to stop, and how much to risk." },
              { Icon: Clock, title: "Self-paced", sub: "Go at your own pace and revisit anytime." },
              { Icon: FileText, title: "Candlestick Handbook", sub: "A downloadable PDF reference to keep." },
              { Icon: InfinityIcon, title: "Lifetime access", sub: "Yours forever, including future updates." },
            ].map(({ Icon: ItIcon, title, sub }) => (
              <div
                key={title}
                className="rounded-2xl border p-5"
                style={{ borderColor: BORDER, background: BG_CARD }}
              >
                <span
                  className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(24,168,122,0.12)", color: EMERALD }}
                >
                  <ItIcon size={24} />
                </span>
                <div style={{ color: TEXT_HEAD, fontSize: "1.05rem", fontWeight: 700, marginBottom: 4 }}>
                  {title}
                </div>
                <div style={{ color: TEXT_BODY, fontSize: "0.92rem", lineHeight: 1.5 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. FREE BONUSES — gold-accented, prominent
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG_INK,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(44px, 9vw, 80px) 0",
        }}
      >
        <div className="mx-auto max-w-6xl px-5">
          {/* Section heading */}
          <div className="mb-10 text-center">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest"
              style={{
                background: "rgba(224,180,58,0.15)",
                border: `1px solid ${GOLD}`,
                color: GOLD,
              }}
            >
              <Star size={15} />
              Included Free
            </div>
            <h2
              style={{
                color: TEXT_HEAD,
                fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Three powerful bonuses — yours at no extra cost
            </h2>
            <p className="mt-3 text-base" style={{ color: TEXT_MUTED, maxWidth: 540, margin: "12px auto 0" }}>
              When you sign up, these are included with the course.
            </p>
          </div>

          {/* Bonus cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {/* Bonus 1 */}
            <div
              className="flex h-full flex-col rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{
                borderColor: `rgba(224,180,58,0.45)`,
                background: `linear-gradient(145deg, ${BG_CARD} 0%, rgba(224,180,58,0.06) 100%)`,
                boxShadow: `0 0 28px rgba(224,180,58,0.10)`,
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <ListFilter size={28} color={GOLD} />
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  style={{ background: "rgba(224,180,58,0.18)", color: GOLD }}
                >
                  Bonus 1
                </span>
              </div>
              <h3 className="mb-2 text-base font-bold" style={{ color: TEXT_HEAD }}>
                5 Swing-Trading Screeners
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                Ready-made screeners to surface swing-trade setups to study on your own.
              </p>
              <div
                className="mt-auto flex items-center gap-2 border-t pt-4"
                style={{ borderColor: "rgba(224,180,58,0.18)", marginTop: "auto", paddingTop: 16 }}
              >
                <CheckCircle2 size={16} color={GOLD} />
                <span className="text-xs font-semibold" style={{ color: GOLD }}>Included free</span>
              </div>
            </div>

            {/* Bonus 2 */}
            <div
              className="flex h-full flex-col rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{
                borderColor: `rgba(224,180,58,0.45)`,
                background: `linear-gradient(145deg, ${BG_CARD} 0%, rgba(224,180,58,0.06) 100%)`,
                boxShadow: `0 0 28px rgba(224,180,58,0.10)`,
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <BarChart2 size={28} color={GOLD} />
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  style={{ background: "rgba(224,180,58,0.18)", color: GOLD }}
                >
                  Bonus 2
                </span>
              </div>
              <h3 className="mb-2 text-base font-bold" style={{ color: TEXT_HEAD }}>
                4 TradingView Indicators
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                Plug-and-play indicators to add to your own charts — including a candlestick pattern scanner and support/resistance levels.
              </p>
              <div
                className="mt-auto flex items-center gap-2 border-t pt-4"
                style={{ borderColor: "rgba(224,180,58,0.18)", marginTop: "auto", paddingTop: 16 }}
              >
                <CheckCircle2 size={16} color={GOLD} />
                <span className="text-xs font-semibold" style={{ color: GOLD }}>Included free</span>
              </div>
            </div>

            {/* Bonus 3 */}
            <div
              className="flex h-full flex-col rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{
                borderColor: `rgba(224,180,58,0.45)`,
                background: `linear-gradient(145deg, ${BG_CARD} 0%, rgba(224,180,58,0.06) 100%)`,
                boxShadow: `0 0 28px rgba(224,180,58,0.10)`,
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Bot size={28} color={GOLD} />
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  style={{ background: "rgba(224,180,58,0.18)", color: GOLD }}
                >
                  Bonus 3
                </span>
              </div>
              <h3 className="mb-2 text-base font-bold" style={{ color: TEXT_HEAD }}>
                AI Prompts to Research Stocks
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                A prompt pack to help you screen and research stocks to study — for learning purposes only, not buy/sell calls.
              </p>
              <div
                className="mt-auto flex items-center gap-2 border-t pt-4"
                style={{ borderColor: "rgba(224,180,58,0.18)", marginTop: "auto", paddingTop: 16 }}
              >
                <CheckCircle2 size={16} color={GOLD} />
                <span className="text-xs font-semibold" style={{ color: GOLD }}>Included free</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA after bonuses */}
        <div className="mx-auto mt-14 max-w-lg px-5 text-center">
          <CheckoutButton
            slug={product.slug}
            label="Sign Up"
            gold
            priceStrike={priceStrike}
            priceNow={priceNow}
            className="h-14 w-full rounded-xl px-8 text-[17px] font-bold"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5b. REVIEWS — ⚠️ SAMPLE placeholders. Replace with REAL, verified
          learner reviews before running ads (fake testimonials breach
          Meta/Google ad policy).
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{ background: BG_NAVY, borderBottom: `1px solid ${BORDER}`, padding: "clamp(44px, 9vw, 80px) 0" }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
              Reviews
            </p>
            <h2
              className="mx-auto"
              style={{
                color: TEXT_HEAD,
                fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                maxWidth: 620,
              }}
            >
              What learners are saying
            </h2>
          </div>

          <ReviewCarousel />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          6. WHO IT'S FOR
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG_INK,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(44px, 9vw, 80px) 0",
        }}
      >
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
            Perfect fit
          </p>
          <h2
            className="mx-auto mb-3"
            style={{
              color: TEXT_HEAD,
              fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 620,
            }}
          >
            Is this course for you?
          </h2>
          <p className="mx-auto mb-10" style={{ color: TEXT_BODY, maxWidth: 540, fontSize: "1.05rem", lineHeight: 1.6 }}>
            It&rsquo;s made for you if any of this sounds familiar:
          </p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-left sm:grid-cols-2">
            {[
              "You&rsquo;re a complete beginner and don&rsquo;t know where to start.",
              "You&rsquo;ve watched endless videos, but nothing ever stuck.",
              "You collect tips that work once — then fail the next time.",
              "Red and green candles still look like random noise to you.",
              "You&rsquo;re tired of jargon — you want plain English (and हिंदी).",
              "You want a clear, step-by-step path, not scattered advice.",
              "You&rsquo;d rather read charts yourself than depend on someone&rsquo;s tips.",
              "You learn best at your own pace, in your own language.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={20} color={EMERALD} className="shrink-0 mt-0.5" />
                <span
                  style={{ color: TEXT_BODY, fontSize: "0.98rem", lineHeight: 1.55 }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </div>
            ))}
          </div>

          {/* qualifier — sets honest expectations + filters buyers */}
          <div
            className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-xl border p-4 text-left"
            style={{ borderColor: "rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.06)" }}
          >
            <MinusCircle size={20} color={RED} className="shrink-0" />
            <span style={{ color: TEXT_BODY, fontSize: "0.95rem", lineHeight: 1.55 }}>
              <strong style={{ color: TEXT_HEAD }}>Not for you if</strong> you want guaranteed buy/sell tips or overnight
              shortcuts — this course teaches you to read charts yourself, not to hand you calls.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          7. WHY FINRISE / TRUST
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG_NAVY,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(40px, 8vw, 72px) 0",
        }}
      >
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
            Straight answers
          </p>
          <h2
            className="mx-auto mb-3"
            style={{
              color: TEXT_HEAD,
              fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 600,
            }}
          >
            Why buy this course?
          </h2>
          <p className="mx-auto mb-10" style={{ color: TEXT_BODY, maxWidth: 520, fontSize: "1.05rem", lineHeight: 1.6 }}>
            The honest answers to what you&rsquo;re probably thinking:
          </p>

          <div className="mx-auto max-w-2xl space-y-4 text-left">
            {[
              { q: "There are free videos — why pay?", a: "Free videos are scattered and contradictory. This is one clear path, taught in the right order — so it finally clicks." },
              { q: "I'm a total beginner — will I understand?", a: 'Yes. It starts from "what is a candle?" with step-by-step animations, in English and हिंदी.' },
              { q: "Is ₹199 really worth it?", a: "Lifetime access to 34 patterns, a full risk module, the handbook PDF and 3 free bonuses — for less than a movie ticket." },
              { q: "What if I get stuck?", a: "It's self-paced. Revisit any lesson, anytime, as many times as you need." },
            ].map((qa, i) => (
              <div key={i} className="rounded-xl border p-5" style={{ borderColor: BORDER, background: BG_CARD }}>
                <div className="flex items-start gap-3">
                  <HelpCircle size={22} color={EMERALD} className="shrink-0" />
                  <div>
                    <div style={{ color: TEXT_HEAD, fontWeight: 700, fontSize: "1rem" }}>{qa.q}</div>
                    <div style={{ color: TEXT_BODY, fontSize: "0.95rem", lineHeight: 1.6, marginTop: 6 }}>{qa.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            className="mx-auto mt-10"
            style={{
              color: TEXT_HEAD,
              maxWidth: 560,
              fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            At <span style={{ color: EMERALD }}>₹199</span>, the only thing left to lose is another month of guessing.
          </p>
          <div className="mt-7 flex justify-center">
            <CheckoutButton
              slug={product.slug}
              label="Sign Up"
              gold
              priceStrike={priceStrike}
              priceNow={priceNow}
              className="h-14 rounded-xl px-8 text-[17px] font-bold"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          8. FAQ
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG_INK,
          borderBottom: `1px solid ${BORDER}`,
          padding: "clamp(44px, 9vw, 80px) 0",
        }}
      >
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: EMERALD }}>
              FAQ
            </p>
            <h2
              className="mx-auto"
              style={{
                color: TEXT_HEAD,
                fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                maxWidth: 560,
              }}
            >
              Questions? Answered.
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "Do I need any experience?", a: 'No — it starts from "what is a candle?" and builds up step by step.' },
              { q: "Is it in Hindi?", a: "Yes — every lesson is available in both English and हिंदी." },
              { q: "Will this tell me what to buy?", a: "No — it teaches you to read charts yourself. It does not give buy/sell tips or any trading recommendations." },
              { q: "How long does it take?", a: "It is self-paced — go at your own speed and revisit any lesson anytime." },
              { q: "Do I get the bonuses too?", a: "Yes — the 5 screeners, 4 indicators and the AI prompt pack are all included free." },
              { q: "Do I need any paid software?", a: "No — you can study everything using free charting tools." },
            ].map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-xl border transition-colors"
                style={{ borderColor: BORDER, background: BG_CARD }}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold transition-colors group-open:text-[color:#fff]"
                  style={{ color: TEXT_HEAD }}
                >
                  {item.q}
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-lg font-light transition-transform duration-200 group-open:rotate-45"
                    style={{ background: "rgba(24,168,122,0.14)", color: EMERALD }}
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[14px] leading-relaxed" style={{ color: TEXT_BODY }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9. FINAL CTA
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-14 text-center sm:py-24"
        style={{
          background: `linear-gradient(135deg, ${BG_NAVY} 0%, #071a0e 100%)`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="mx-auto max-w-2xl px-5">
          {/* Candle accent */}
          <div className="mx-auto mb-8 flex items-end justify-center gap-2" style={{ height: 48 }}>
            <div style={{ width: 12, height: 28, background: RED, borderRadius: 3 }} />
            <div style={{ width: 12, height: 40, background: RED, borderRadius: 3 }} />
            <div style={{ width: 12, height: 20, background: GREEN, borderRadius: 3 }} />
            <div style={{ width: 12, height: 44, background: GREEN, borderRadius: 3 }} />
            <div style={{ width: 12, height: 36, background: GREEN, borderRadius: 3 }} />
          </div>

          <h2
            style={{
              color: TEXT_HEAD,
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            Start learning candlesticks{" "}
            <em className="not-italic" style={{ color: EMERALD }}>
              the right way.
            </em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base" style={{ color: TEXT_BODY }}>
            The course + all three free bonuses — yours with one sign-up.
          </p>

          {/* value recap chips */}
          <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
            {["34 patterns", "English + हिंदी", "5 screeners", "4 indicators", "AI prompts", "Handbook PDF"].map((c) => (
              <span
                key={c}
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: BORDER, background: "rgba(255,255,255,0.04)", color: TEXT_BODY }}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-9">
            <CheckoutButton
              slug={product.slug}
              label="Sign Up"
              gold
              priceStrike={priceStrike}
              priceNow={priceNow}
              className="h-14 rounded-xl px-8 text-[17px] font-bold"
            />
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs" style={{ color: TEXT_MUTED }}>
            <Lock size={14} color={EMERALD} />
            Secure checkout · Instant access · Lifetime access
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          10. FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer
        className="py-10 text-center text-xs"
        style={{
          background: BG_INK,
          borderTop: `1px solid ${BORDER}`,
          color: TEXT_MUTED,
        }}
      >
        <div className="mx-auto max-w-6xl space-y-4 px-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/finrise-icon.svg" width={22} height={22} alt="Finrise" className="rounded-md opacity-70" />
            <span className="font-bold" style={{ color: TEXT_MUTED }}>
              Finrise &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p className="mb-4 text-[13px] font-medium" style={{ color: TEXT_BODY }}>
            Learn to read the markets — one candle at a time.
          </p>
          <p
            className="mx-auto max-w-xl rounded-lg border px-5 py-4 text-[11px] leading-relaxed"
            style={{
              borderColor: BORDER,
              background: BG_CARD,
              color: TEXT_MUTED,
            }}
          >
            Educational content only. Not investment advice. Finrise is not a SEBI-registered adviser.
            Trading and investing carry the risk of capital loss. Always do your own due diligence.
          </p>

          {/* Legal page links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
            {(
              [
                { label: "About", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refund" },
                { label: "Terms", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ] as const
            ).map((link, i, arr) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-[11px] text-[color:#6B7280] transition-colors duration-200 hover:text-[color:#18A87A]"
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && (
                  <span style={{ color: BORDER, fontSize: "0.6rem" }}>·</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
