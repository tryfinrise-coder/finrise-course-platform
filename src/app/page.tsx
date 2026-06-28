import Link from "next/link";
import TopNav from "@/components/TopNav";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const course = await getProductBySlug("candlestick-mastery");

  const features = [
    {
      title: "Living candles",
      body: "Price moves in real time inside each forming candle — honoring the true open, high, low and close.",
    },
    {
      title: "Bull vs Bear meter",
      body: "A live pressure bar tilts toward buyers or sellers, making the fight tangible as the candle forms.",
    },
    {
      title: "Pattern in context",
      body: "See the trend leading in, the pattern itself, and the outcome after — never an isolated shape.",
    },
    {
      title: "The Candle Sculptor",
      body: "Drag open/high/low/close and the app names the pattern live as you reshape the candle.",
    },
    {
      title: "Level up as you learn",
      body: "Earn XP for every lesson, keep a daily streak alive, unlock badges, and climb the leaderboard.",
    },
  ];

  return (
    <>
      <TopNav />
      <main className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <section style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <span className="badge" style={{ marginBottom: 18 }}>
            ● Interactive · animated · no slideshows
          </span>
          <h1 style={{ fontSize: 52, lineHeight: 1.05 }}>
            Learn candlesticks as{" "}
            <span style={{ color: "var(--brand-2)" }}>living price action</span>.
          </h1>
          <p style={{ fontSize: 18, maxWidth: 620, margin: "16px auto 0" }}>
            Finrise teaches candlestick patterns unlike anything else: watch each candle
            build tick-by-tick, feel the buyer–seller pressure, and sculpt candles with your
            own hands.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
            <Link href="/pages/candlestick-mastery" className="btn btn-primary">
              Explore the course →
            </Link>
            <Link href="/courses/login" className="btn">
              I already bought it
            </Link>
          </div>
          {course && (
            <p className="faint" style={{ marginTop: 14, fontSize: 13 }}>
              {course.title} · {formatPrice(course.price)}
            </p>
          )}
        </section>

        <section
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", marginTop: 64 }}
        >
          {features.map((f) => (
            <div key={f.title} className="glass card-hover" style={{ padding: 22 }}>
              <h3 style={{ fontSize: 17 }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: 14 }}>{f.body}</p>
            </div>
          ))}
        </section>

        <section
          className="glass"
          style={{ padding: 28, marginTop: 40, textAlign: "center" }}
        >
          <h2 style={{ fontSize: 24 }}>Built to sell more than one thing</h2>
          <p style={{ maxWidth: 620, margin: "8px auto 0" }}>
            Courses, downloadable PDFs, videos, and bundles — all managed from a single admin
            panel, all access-controlled. The candlestick course is just the first product.
          </p>
        </section>
      </main>

      <footer style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-2)",
        padding: "3rem 1.25rem 4rem",
        marginTop: "4rem",
      }}>
        <div style={{
          maxWidth: "48rem",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          alignItems: "center",
        }}>
          {/* SEBI disclaimer */}
          <p style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "36rem",
            margin: 0,
          }}>
            Educational content only. Not investment advice. Finrise is not a
            SEBI-registered adviser. Trading carries risk of capital loss.
          </p>

          {/* Legal nav links */}
          <nav style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem 1rem",
          }}>
            {[
              { label: "About", href: "/about" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Refund Policy", href: "/refund" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Contact Us", href: "/contact" }
            ].map((link, i, arr) => (
              <span key={link.href} style={{ display: "inline-flex", alignItems: "center", gap: "1rem" }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  className="hover-underline"
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && (
                  <span style={{ color: "var(--faint)", fontSize: "0.75rem" }}>
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>

          <p style={{ fontSize: "0.75rem", color: "var(--faint)", margin: 0 }}>
            &copy; {new Date().getFullYear()} Finrise. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
