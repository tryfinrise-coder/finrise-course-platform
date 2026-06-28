import Link from "next/link";
import Candles from "@/components/Candles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Finrise — Master Candlestick Patterns",
  description:
    "Learn candlesticks as living, tick-by-tick price action. 30 interactive patterns, XP, streaks and badges.",
};

const FEATURES = [
  { t: "Living candles", d: "Every candle forms tick-by-tick — watch the buyer/seller battle play out in real time." },
  { t: "30 patterns", d: "Single, two-candle, three-candle and continuation patterns, each with an anatomy diagram." },
  { t: "Bull vs bear meter", d: "A live pressure gauge tilts green or red as price action unfolds." },
  { t: "Gamified learning", d: "Earn XP, keep daily streaks, unlock badges and climb the leaderboard." },
  { t: "The Candle Sculptor", d: "Drag O/H/L/C and the app names the pattern live as you reshape the candle." },
  { t: "Built for Forex & Gold", d: "Patterns and context tuned for EUR/USD, GBP/USD, USD/JPY, GBP/JPY and XAU/USD." },
];

export default function MarketingPage() {
  return (
    <div className="min-h-dvh">
      {/* public header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="brandmark text-xl">Finrise</Link>
          <div className="flex items-center gap-2">
            <Candles count={4} />
            <Button asChild variant="ghost"><Link href="/courses/login">Log in</Link></Button>
            <Button asChild><Link href="/courses/login">Start learning</Link></Button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(680px 460px at 15% 0%, rgba(37,99,235,0.14), transparent 60%)," +
              "radial-gradient(560px 460px at 95% 10%, rgba(200,150,30,0.16), transparent 55%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Badge variant="gold" className="mb-5">Professional Trader Series · Vol. I</Badge>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Master candlesticks as <span className="text-brandblue-deep">living price action</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Most courses show you static screenshots. Finrise shows every candle forming in real
            time — then lets you sculpt them yourself.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg"><Link href="/courses/login">Start learning →</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/">Take a tour</Link></Button>
          </div>
          <div className="mt-6 flex justify-center"><Candles count={7} /></div>
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.t} className="transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brandblue/15 to-gold/15">
                  <Candles count={3} />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="mt-12 overflow-hidden">
          <CardContent className="flex flex-wrap items-center justify-between gap-6 p-10">
            <div>
              <h2 className="font-display text-2xl font-bold">Ready to read the market one candle at a time?</h2>
              <p className="mt-1 text-muted-foreground">Join the interactive candlestick course today.</p>
            </div>
            <Button asChild size="lg"><Link href="/courses/login">Get started →</Link></Button>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © Finrise — Professional Trader Series
      </footer>
    </div>
  );
}
