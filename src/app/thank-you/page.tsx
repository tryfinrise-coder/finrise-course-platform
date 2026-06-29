import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PixelEvent from "@/components/pixel/PixelEvent";

export const metadata: Metadata = {
  title: "Thank you — Finrise",
  description:
    "Your enrolment is being processed. We'll email your login details shortly.",
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { amount?: string };
}) {
  const amount = Number(searchParams.amount || 199);
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* Purchase event fires once when buyer reaches this page */}
      <PixelEvent
        event="Purchase"
        params={{ value: amount, currency: "INR", content_name: "Candlestick Mastery" }}
      />
      {/* Minimal header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="brandmark text-xl font-extrabold tracking-tight"
            style={{ color: "#0E1B2E" }}
          >
            Finrise
          </Link>
        </div>
      </header>

      {/* Main content — centered */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-16">
        <div className="w-full max-w-md text-center">
          {/* Green check */}
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-white text-4xl font-bold"
            style={{ background: "#18A87A" }}
            aria-label="Success"
          >
            ✓
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Thank you — you&apos;re almost in!
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-base text-muted-foreground">
            Our team will set up your student account and email your login
            details shortly. Students are onboarded personally so we can make
            sure everything is ready for you.
          </p>

          {/* What happens next */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left">
            <h2 className="mb-4 font-semibold text-sm uppercase tracking-widest text-muted-foreground">
              What happens next
            </h2>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "We prepare your account",
                  body: "The Finrise team creates your student profile with access to all course modules — usually within a few hours on business days.",
                },
                {
                  step: "2",
                  title: "You receive a welcome email",
                  body: "We'll send your login credentials and a quick-start guide to the email address you used at checkout.",
                },
                {
                  step: "3",
                  title: "Log in and start learning",
                  body: "Head to the login page, enter your credentials, and dive straight into Lesson 1. Your progress is saved automatically.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span
                    className="flex-none flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "#18A87A" }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Go to login */}
          <Button asChild size="lg" className="mt-8 w-full text-base">
            <Link href="/courses/login">Go to login →</Link>
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Haven&apos;t received your email after 24 hours? Check your spam folder
            or contact us — we&apos;ll sort it out.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-2xl px-5 space-y-3">
          <p className="font-semibold">
            © {new Date().getFullYear()} Finrise — Professional Trader Series
          </p>
          <p className="rounded-lg border border-border bg-background px-4 py-3 text-[11px] leading-relaxed">
            <strong>SEBI Educational Disclaimer:</strong> This is an educational
            course, not investment advice. Trading carries the risk of capital
            loss. Consult a SEBI-registered adviser before investing.
          </p>
        </div>
      </footer>
    </div>
  );
}
