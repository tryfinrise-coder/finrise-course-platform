import Link from "next/link";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  Sparkles, Rocket, Bot, LineChart, Wallet, Target, ShieldCheck,
  CheckCircle2, Star, Lock, Zap, TrendingUp, Clock, HelpCircle,
} from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { getSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/types";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import StickyCTA from "@/components/marketing/StickyCTA";
import PixelEvent from "@/components/pixel/PixelEvent";

export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "How I Earned ₹4.6 Lakhs Last Month — The Digital Course Playbook",
  description:
    "The exact step-by-step course behind a ₹4.6 lakh month selling one digital course — build it with AI, host it, run ads, and scale. Includes an AI prompt library for 15 niches + bonus templates & a launch checklist.",
};

/* ── palette (bold colorful gradient theme) ─────────────────────── */
const INK = "#0B0713";
const INK2 = "#140B22";
const CARD = "#1A1130";
const LINE = "rgba(255,255,255,0.09)";
const TEXT = "#EDE7FA";
const MUTE = "#A99CC9";
const VIOLET = "#8B5CF6";
const FUCHSIA = "#EC4899";
const ORANGE = "#F59E0B";
const EMERALD = "#10B981";
const CYAN = "#22D3EE";
const AMBER = "#FBBF24";
const G_HERO = "linear-gradient(120deg,#8B5CF6 0%,#EC4899 52%,#F59E0B 100%)";
const G_TEXT = "linear-gradient(92deg,#FBBF24 0%,#F59E0B 45%,#EC4899 100%)";

const PARTS = [
  { n: "01", t: "My Journey", d: "The honest story — from trading hours for money to a ₹4.6L month.", c: VIOLET, icon: TrendingUp },
  { n: "02", t: "Why Digital Products Now", d: "The opportunity and the 5 pillars of a course business.", c: FUCHSIA, icon: Target },
  { n: "03", t: "Build Your Course With AI", d: "7 steps + copy-paste prompts to build a full course in days.", c: ORANGE, icon: Bot },
  { n: "04", t: "Host & Sell", d: "Where to host, take payments, and a landing page that converts.", c: EMERALD, icon: Rocket },
  { n: "05", t: "Get Traffic & Sales", d: "The ad engine, AI creatives, tracking and conversion.", c: CYAN, icon: Zap },
  { n: "06", t: "Scale to ₹4.6L+/mo", d: "The revenue math, compounding, and mistakes to avoid.", c: FUCHSIA, icon: LineChart },
  { n: "07", t: "The Launch Checklist", d: "A 14-day, tick-the-box plan + the full AI Prompt Vault.", c: AMBER, icon: CheckCircle2 },
];

const BENEFITS = [
  { icon: Bot, t: "No skills? AI builds it.", d: "Curriculum, lessons, slides, ad copy — generated with the exact prompts inside." },
  { icon: Wallet, t: "Start with almost ₹0.", d: "No inventory, no staff, no shipping. A laptop and a few rupees of ad spend." },
  { icon: Clock, t: "Launch in ~14 days.", d: "Follow the checklist one page a day and go live in two weeks." },
  { icon: ShieldCheck, t: "Battle-tested, not theory.", d: "The real funnel, pricing, and ad system behind a ₹4.6 lakh month." },
];

const FAQ = [
  { q: "I have no audience and no idea what to teach. Can I still do this?", a: "Yes — Part 3 walks you through finding a profitable topic from skills you already have, and the AI prompts design the whole course for you. Beginners are exactly who this is written for." },
  { q: "Do I need to show my face or be good at tech?", a: "No. The course shows faceless formats (slides + voice, or text) and uses no-code tools plus AI, so zero coding is required." },
  { q: "Is this specific to trading or finance?", a: "No. The method works for any niche. The example course built inside is Personal Finance for Beginners, but you swap in your own topic anywhere." },
  { q: "How is this delivered?", a: "Instantly. After payment you get lifetime access to the full course — every lesson, the AI prompt library, and all the bonus templates and checklists." },
  { q: "Will this really make me ₹4.6 lakhs?", a: "It's an honest system, not a guarantee. ₹4.6L was a real month that came after months of building and testing. Your results depend on your effort, niche, and execution — this compresses the learning curve, it doesn't delete it." },
];

export default async function PlaybookLanding() {
  const product = await getProductBySlug("income-playbook");

  // The playbook sells at its fixed launch price. It is deliberately exempt from
  // the site-wide auto-apply discount (which is tuned for the flagship course and
  // would over-discount this lower-priced product). Checkout mirrors this exemption.
  const finalPrice = product?.price ?? 29900;
  const anchorPaise = 199900; // ₹1,999 value anchor
  const priceNow = `${formatPrice(finalPrice)}/-`;
  const priceStrike = `${formatPrice(anchorPaise)}/-`;
  const savePct = Math.max(0, Math.round((1 - finalPrice / anchorPaise) * 100));
  const slug = product?.slug ?? "income-playbook";

  const proof = await getSettings([
    "income_proof_image",
    "income_proof_caption",
    "income_proof_amount",
  ]);

  const primaryCTA = (label: string, track: string) => (
    <div data-track="cta_click" data-track-label={track} className="inline-block max-w-full">
      <CheckoutButton
        slug={slug}
        label={label}
        gold
        priceNow={priceNow}
        priceStrike={priceStrike}
        className="h-12 rounded-2xl px-5 text-[14px] font-extrabold sm:h-14 sm:px-8 sm:text-[17px]"
      />
    </div>
  );

  return (
    <div className={poppins.className} style={{ background: INK, color: TEXT, minHeight: "100dvh", overflowX: "hidden" }}>
      <PixelEvent
        event="ViewContent"
        params={{ content_name: "Digital Course Playbook", content_category: "Course", value: finalPrice / 100, currency: "INR" }}
      />

      {/* ── Sticky header ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{ background: "rgba(11,7,19,0.82)", borderBottom: `1px solid ${LINE}`, backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/finrise-icon.svg" width={30} height={30} alt="Finrise" className="rounded-md" />
            <span className="text-lg font-extrabold tracking-tight" style={{ color: "#fff", letterSpacing: "-0.02em" }}>Finrise</span>
          </Link>
          <div className="hidden sm:block">{primaryCTA("Get access", "header")}</div>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: `radial-gradient(1200px 500px at 80% -10%, rgba(236,72,153,0.28), transparent 60%), radial-gradient(1000px 500px at 0% 10%, rgba(139,92,246,0.30), transparent 55%), ${INK}` }}>
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            {/* copy */}
            <div className="text-center lg:text-left">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest"
                style={{ background: "rgba(251,191,36,0.12)", color: AMBER, border: `1px solid rgba(251,191,36,0.35)` }}>
                <Sparkles size={14} /> The Digital Course Playbook
              </span>

              <h1 style={{ fontWeight: 900, fontSize: "clamp(2.3rem,6vw,4rem)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>
                How I Earned<br />
                <span style={{ background: G_TEXT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: AMBER, filter: "drop-shadow(0 2px 14px rgba(245,158,11,0.35))" }}>
                  ₹4.6 Lakhs
                </span><br />Last Month
              </h1>
              <p style={{ marginTop: 18, fontSize: "clamp(1.1rem,2.5vw,1.35rem)", fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>
                Selling <span style={{ color: AMBER }}>ONE</span> digital course — built with AI.
              </p>
              <p className="mx-auto lg:mx-0" style={{ marginTop: 14, fontSize: "1.08rem", lineHeight: 1.55, color: MUTE, maxWidth: 440 }}>
                Build it with AI. Launch in 14 days. Get paid — <strong style={{ color: TEXT }}>even starting from zero.</strong>
              </p>

              {/* ── offer block ── */}
              <div className="mt-9 flex flex-col items-center gap-6 lg:items-start">
                {/* social proof */}
                <div className="flex items-center gap-2 text-sm">
                  <span style={{ color: AMBER, letterSpacing: "1.5px" }}>★★★★★</span>
                  <span style={{ color: MUTE }}><strong style={{ color: "#fff" }}>6,300+</strong> students loved it</span>
                </div>

                {/* price */}
                <div className="flex items-end justify-center gap-3 lg:justify-start" style={{ flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 900, fontSize: "clamp(2.2rem,6vw,2.7rem)", color: "#fff", lineHeight: 0.95 }}>{priceNow}</span>
                  <span style={{ fontSize: "1.1rem", color: MUTE, textDecoration: "line-through", paddingBottom: 5 }}>{priceStrike}</span>
                  {savePct > 0 && (
                    <span className="rounded-md px-2 py-0.5 text-[12px] font-extrabold" style={{ background: EMERALD, color: "#04140d", marginBottom: 4 }}>
                      SAVE {savePct}%
                    </span>
                  )}
                </div>

                {/* two feature ticks */}
                <div className="flex items-center justify-center gap-x-6 gap-y-2 lg:justify-start" style={{ color: EMERALD, fontSize: "0.95rem", fontWeight: 700 }}>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} /> AI Prompts</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} /> Lifetime Access</span>
                </div>

                {primaryCTA("Get access", "hero")}

                <div className="flex items-center justify-center gap-x-5 text-xs lg:justify-start" style={{ color: MUTE }}>
                  <span className="inline-flex items-center gap-1.5"><Lock size={13} /> Secure checkout</span>
                  <span className="inline-flex items-center gap-1.5"><Zap size={13} /> Instant access</span>
                </div>
              </div>
            </div>

            {/* hero visual: playbook cover mock */}
            <div className="relative mx-auto w-full max-w-sm">
              <div style={{ position: "absolute", inset: -30, background: G_HERO, filter: "blur(60px)", opacity: 0.5, borderRadius: 40 }} />
              <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${LINE}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", aspectRatio: "3/4", background: G_HERO }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 80% 0%, rgba(255,255,255,0.25), transparent 60%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "26px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "inline-block", fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", background: "rgba(255,255,255,0.2)", padding: "5px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.4)" }}>
                      The Digital Course Playbook
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "2.1rem", lineHeight: 1.02, color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                      How I Earned<br /><span style={{ color: AMBER }}>₹4.6 Lakhs</span><br />Last Month
                    </div>
                    <div style={{ marginTop: 10, fontWeight: 800, fontSize: "0.9rem", color: "#fff", opacity: 0.95 }}>
                      selling ONE digital course — the exact AI playbook.
                    </div>
                    {/* mini rising bars */}
                    <svg width="150" height="54" viewBox="0 0 150 54" style={{ marginTop: 14 }} aria-hidden="true">
                      <rect x="0" y="34" width="24" height="20" rx="4" fill="#fff" opacity="0.35" />
                      <rect x="32" y="24" width="24" height="30" rx="4" fill="#fff" opacity="0.5" />
                      <rect x="64" y="14" width="24" height="40" rx="4" fill="#fff" opacity="0.7" />
                      <rect x="96" y="2" width="24" height="52" rx="4" fill="#fff" />
                      <path d="M12 34 L44 24 L76 14 L108 2" stroke={AMBER} strokeWidth="4" fill="none" strokeLinecap="round" />
                      <circle cx="108" cy="2" r="6" fill={AMBER} />
                    </svg>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#fff", opacity: 0.9 }}>FINRISE · 2026 EDITION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── trust strip ───────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: INK2 }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-4 text-center">
          {[
            { n: "6,300+", l: "students started" },
            { n: "15", l: "step-by-step lessons" },
            { n: "45+", l: "copy-paste AI prompts" },
            { n: "14 days", l: "to launch" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span style={{ fontWeight: 900, fontSize: "1.15rem", background: G_TEXT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: AMBER }}>{s.n}</span>
              <span style={{ fontSize: "0.8rem", color: MUTE }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── pain ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.4rem)", lineHeight: 1.12, color: "#fff", letterSpacing: "-0.02em" }}>
          Still trading your hours for money —<br />and running out of both?
        </h2>
        <p style={{ marginTop: 14, fontSize: "1.05rem", lineHeight: 1.6, color: MUTE }}>
          A job caps your income at the hours in a day. A digital product is built <strong style={{ color: "#fff" }}>once</strong> and sold <strong style={{ color: "#fff" }}>infinitely</strong> — while you sleep. The only thing between you and that is a system. This playbook is the system.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["“I don't know what to teach.”", "“I'm not techy enough.”", "“What if nobody buys?”"].map((o, i) => (
            <div key={i} className="rounded-2xl px-4 py-4" style={{ background: CARD, border: `1px solid ${LINE}` }}>
              <div style={{ color: FUCHSIA, fontWeight: 800, fontSize: "0.95rem" }}>{o}</div>
              <div style={{ marginTop: 6, fontSize: "0.85rem", color: MUTE }}>Solved inside — step by step.</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── what's inside ─────────────────────────────────────────── */}
      <section style={{ background: INK2, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="text-center">
            <span style={{ color: CYAN, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.72rem" }}>What's inside</span>
            <h2 style={{ marginTop: 8, fontWeight: 900, fontSize: "clamp(1.7rem,4vw,2.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              7 parts. One complete machine.
            </h2>
            <p style={{ marginTop: 10, color: MUTE, maxWidth: 560, margin: "10px auto 0" }}>
              Every part is a step you <em>do</em> — not theory you read. Here's the full path from zero to a selling product.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.n} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                  <div className="flex items-center justify-between">
                    <span style={{ width: 40, height: 40, borderRadius: 12, background: `${p.c}22`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color={p.c} />
                    </span>
                    <span style={{ fontWeight: 900, fontSize: "1.4rem", color: `${p.c}55` }}>{p.n}</span>
                  </div>
                  <h3 style={{ marginTop: 12, fontWeight: 800, fontSize: "1.05rem", color: "#fff" }}>{p.t}</h3>
                  <p style={{ marginTop: 5, fontSize: "0.88rem", lineHeight: 1.5, color: MUTE }}>{p.d}</p>
                </div>
              );
            })}
            {/* prompt-vault highlight card */}
            <div className="rounded-2xl p-5" style={{ background: G_HERO }}>
              <Bot size={22} color="#fff" />
              <h3 style={{ marginTop: 12, fontWeight: 900, fontSize: "1.05rem", color: "#fff" }}>+ The AI Prompt Vault</h3>
              <p style={{ marginTop: 5, fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
                All 8 copy-paste prompts in one place — niche, curriculum, lessons, ads &amp; landing-page copy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── benefits ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.t} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: G_HERO, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color="#fff" />
                </span>
                <h3 style={{ marginTop: 12, fontWeight: 800, color: "#fff", fontSize: "1rem" }}>{b.t}</h3>
                <p style={{ marginTop: 5, fontSize: "0.87rem", lineHeight: 1.5, color: MUTE }}>{b.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── testimonials ──────────────────────────────────────────── */}
      <section style={{ background: INK2, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center" style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.3rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            People are already building.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: "Rahul M.", r: "Marketing exec", t: "I always thought I needed a big audience. Used the niche + curriculum prompts and had a full course outline in an evening. Launched my first product in two weeks." },
              { n: "Sneha P.", r: "College student", t: "The faceless format part was a relief — I did slides + voice. The landing-page section alone is worth it. First sales came from ₹500 of ads." },
              { n: "Arjun K.", r: "Freelancer", t: "This reads like someone handing you their actual playbook, not fluff. The checklist kept me moving. Wish I'd found it a year ago." },
            ].map((rev) => (
              <div key={rev.n} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} color={AMBER} fill={AMBER} />)}
                </div>
                <p style={{ marginTop: 12, fontSize: "0.92rem", lineHeight: 1.6, color: TEXT }}>“{rev.t}”</p>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: G_HERO, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "0.85rem" }}>{rev.n[0]}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>{rev.n}</div>
                    <div style={{ fontSize: "0.75rem", color: MUTE }}>{rev.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCOME PROOF ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgba(16,185,129,0.14)", color: EMERALD, border: "1px solid rgba(16,185,129,0.35)" }}>
            <ShieldCheck size={13} /> Live income proof
          </span>
          <h2 style={{ marginTop: 12, fontWeight: 900, fontSize: "clamp(1.7rem,4vw,2.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            Real payouts. No screenshots-of-screenshots.
          </h2>
          {proof.income_proof_amount ? (
            <p style={{ marginTop: 10, color: MUTE }}>
              <span style={{ color: EMERALD, fontWeight: 800 }}>{proof.income_proof_amount}</span>
              {proof.income_proof_caption ? ` · ${proof.income_proof_caption}` : ""}
            </p>
          ) : (
            <p style={{ marginTop: 10, color: MUTE }}>The system that produced this is exactly what you get inside.</p>
          )}
        </div>

        {/* framed screenshot */}
        <div className="mt-9" style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: -20, background: G_HERO, filter: "blur(50px)", opacity: 0.35, borderRadius: 30 }} />
          <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: `1px solid ${LINE}`, background: CARD, boxShadow: "0 24px 70px rgba(0,0,0,0.55)" }}>
            {/* faux browser bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: `1px solid ${LINE}`, background: "rgba(255,255,255,0.03)" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              <span style={{ marginLeft: 10, fontSize: 11, color: MUTE }}>dashboard · earnings</span>
            </div>
            {proof.income_proof_image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={proof.income_proof_image} alt="Income proof" style={{ display: "block", width: "100%", height: "auto" }} />
            ) : (
              /* graceful placeholder until the admin uploads a real screenshot */
              <div style={{ padding: "44px 24px", textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: "2.6rem", background: G_TEXT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: AMBER }}>
                  ₹4,62,140
                </div>
                <div style={{ color: MUTE, marginTop: 4, fontSize: "0.85rem" }}>net payouts · last 30 days</div>
                <svg width="100%" viewBox="0 0 520 150" style={{ marginTop: 20, maxWidth: 460 }} aria-hidden="true">
                  <defs>
                    <linearGradient id="pg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#8B5CF6" /><stop offset="1" stopColor="#F59E0B" /></linearGradient>
                  </defs>
                  {[20, 42, 30, 64, 52, 86, 74, 108, 130].map((h, i) => (
                    <rect key={i} x={20 + i * 56} y={140 - h} width="34" height={h} rx="5" fill="url(#pg)" />
                  ))}
                </svg>
                <div style={{ marginTop: 8, fontSize: "0.72rem", color: MUTE, fontStyle: "italic" }}>Sample view — your real screenshot appears here once uploaded in admin.</div>
              </div>
            )}
          </div>
        </div>
        <p style={{ marginTop: 12, textAlign: "center", fontSize: "0.78rem", color: MUTE }}>
          Income shown is one creator's result and is not a promise of your earnings. Results depend on your effort and execution.
        </p>
      </section>

      {/* ── OFFER / pricing ───────────────────────────────────────── */}
      <section style={{ background: INK2, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-3xl px-5 py-16">
          <div className="rounded-3xl p-1" style={{ background: G_HERO }}>
            <div className="rounded-[22px] px-6 py-9 text-center sm:px-10" style={{ background: INK }}>
              <span style={{ color: AMBER, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.72rem" }}>Launch offer</span>
              <h2 style={{ marginTop: 8, fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.3rem)", color: "#fff", letterSpacing: "-0.02em" }}>
                Get the full course + bonuses today
              </h2>

              <div className="mt-6 flex items-end justify-center gap-3">
                <span style={{ fontWeight: 900, fontSize: "3rem", lineHeight: 1, color: "#fff" }}>{priceNow}</span>
                <span style={{ fontSize: "1.2rem", color: MUTE, textDecoration: "line-through", paddingBottom: 8 }}>{priceStrike}</span>
              </div>
              <div style={{ marginTop: 8, color: EMERALD, fontWeight: 700, fontSize: "0.9rem" }}>One-time payment · Lifetime access · Instant access</div>

              <ul className="mx-auto mt-7 max-w-md space-y-2.5 text-left">
                {[
                  { t: "The complete step-by-step course — build → launch → scale", bonus: false },
                  { t: "AI Prompt Library — ready prompts for 15 niches", bonus: false },
                  { t: "Landing-page & sales-copy templates", bonus: true },
                  { t: "Ad creative & script swipe file", bonus: true },
                  { t: "The 14-day launch checklist", bonus: true },
                  { t: "Lifetime access + all future updates", bonus: false },
                ].map((f) => (
                  <li key={f.t} className="flex items-start gap-2.5" style={{ color: TEXT, fontSize: "0.95rem" }}>
                    <CheckCircle2 size={19} color={EMERALD} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>
                      {f.bonus && <strong style={{ color: AMBER }}>BONUS: </strong>}
                      {f.t}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-center">{primaryCTA("Get access", "offer")}</div>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs" style={{ color: MUTE }}>
                <span className="inline-flex items-center gap-1.5"><Lock size={13} /> Secure Razorpay checkout</span>
                <span className="inline-flex items-center gap-1.5"><Zap size={13} /> Instant delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-center" style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.3rem)", color: "#fff", letterSpacing: "-0.02em" }}>
          Questions, answered.
        </h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${LINE}` }}>
              <div className="flex items-start gap-2.5">
                <HelpCircle size={18} color={CYAN} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 style={{ fontWeight: 800, color: "#fff", fontSize: "0.98rem" }}>{f.q}</h3>
                  <p style={{ marginTop: 5, fontSize: "0.9rem", lineHeight: 1.6, color: MUTE }}>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── final CTA ─────────────────────────────────────────────── */}
      <section style={{ background: G_HERO }}>
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem,4.6vw,2.7rem)", lineHeight: 1.06, color: "#fff", letterSpacing: "-0.02em" }}>
            The only difference between<br />you and me is that I <span style={{ color: "#0B0713" }}>started.</span>
          </h2>
          <p style={{ marginTop: 12, color: "rgba(255,255,255,0.95)", fontSize: "1.05rem", maxWidth: 520, margin: "12px auto 0" }}>
            You get the whole system the moment you join — the course, the prompts, and every bonus. Start today.
          </p>
          <div className="mt-8 flex justify-center">{primaryCTA("Get access", "final")}</div>
        </div>
      </section>

      {/* ── footer ────────────────────────────────────────────────── */}
      <footer style={{ background: INK, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-5 py-10 text-center">
          <div className="flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/finrise-icon.svg" width={26} height={26} alt="Finrise" className="rounded-md" />
            <span className="text-lg font-extrabold tracking-tight" style={{ color: "#fff", letterSpacing: "-0.02em" }}>Finrise</span>
          </div>
          <p style={{ marginTop: 12, fontSize: "0.72rem", lineHeight: 1.6, color: MUTE, maxWidth: 620, margin: "12px auto 0" }}>
            © 2026 Finrise. This guide is educational and shares one creator's experience; it is not financial, legal, or business advice, and no specific income is promised. Results depend entirely on your effort, market, and execution.
          </p>
        </div>
      </footer>

      {/* sticky mobile CTA (reused) */}
      <StickyCTA slug={slug} priceNow={priceNow} priceStrike={priceStrike} label="Get access" enrolled="6.3K+ Enrolled" />
    </div>
  );
}
