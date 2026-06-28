import type { Metadata } from "next";
import LegalPage from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "About Us — Finrise",
  description:
    "Learn about Finrise, an education-first platform that teaches complete beginners to read candlestick charts in English and Hindi.",
};

export default function AboutPage() {
  return (
    <LegalPage title="About Finrise" updated="June 2026">
      <h2>Who We Are</h2>
      <p>
        Finrise is an education-first platform built for complete beginners who
        want to understand the financial markets — without the jargon, the noise,
        or the false promises. We started with a single, focused goal: teach
        everyday people how to read a candlestick chart, and actually understand
        what they are looking at.
      </p>
      <p>
        Our flagship course, <strong>Candlestick Mastery</strong>, is available
        in both <strong>English and Hindi</strong>, because we believe quality
        financial education should not be locked behind a language barrier.
        Whether you are a salaried professional curious about the markets, a
        college student exploring investing for the first time, or someone who
        has tried trading before and walked away confused — this course was built
        for you.
      </p>

      <h2>Our Mission</h2>
      <p>
        Most financial content on the internet either oversimplifies things to
        the point of being useless, or buries learners in complexity before they
        have a solid foundation. Finrise exists to close that gap.
      </p>
      <p>
        We believe that <strong>understanding price action</strong> — knowing
        how to interpret what buyers and sellers are doing in real time — is one
        of the most valuable skills a market participant can develop. Our mission
        is to make that skill accessible to anyone in India willing to invest a
        few hours of focused learning.
      </p>

      <h2>How We Teach</h2>
      <p>
        We use a structured, plain-language approach. Each lesson builds on the
        previous one, moving from core concepts (what is a candle? what does the
        body and wick represent?) to practical pattern recognition and context
        reading. We avoid buzzwords where simpler words work just as well.
      </p>
      <ul>
        <li>
          <strong>Structured curriculum</strong> — topics are sequenced so each
          lesson makes sense before the next one begins.
        </li>
        <li>
          <strong>Animated visual lessons</strong> — abstract ideas like
          momentum, wicks, and engulfing patterns are shown with clear
          animations rather than static charts alone.
        </li>
        <li>
          <strong>Bilingual delivery</strong> — instruction is available in
          English and Hindi, so you can learn in whichever language feels
          natural to you.
        </li>
        <li>
          <strong>Practical, focused content</strong> — no filler, no
          upselling, no "secret strategies." Just clean, honest education.
        </li>
      </ul>

      <h2>What We Are Not</h2>
      <p>
        Finrise is a <strong>pure education platform</strong>. We do not provide
        stock tips, trading signals, buy/sell recommendations, or portfolio
        management advice of any kind. We are not registered with SEBI as an
        investment adviser, research analyst, or any other regulated capacity.
      </p>
      <p>
        Our goal is to give you the knowledge to think for yourself — not to
        tell you what to trade. Any financial decision you make after completing
        our course is entirely your own, and we encourage all learners to
        continue learning, practise on paper before risking capital, and consult
        a qualified financial adviser for personalised guidance.
      </p>

      <h2>Pricing</h2>
      <p>
        The Candlestick Mastery course is priced at <strong>₹199</strong> — a
        one-time payment that gives you lifetime access to all current lessons
        and future updates. Payments are processed securely via Razorpay.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Have a question before purchasing, or need support after enrolment?
        Reach us at{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>. We
        typically respond within 24–48 business hours.
      </p>
    </LegalPage>
  );
}
