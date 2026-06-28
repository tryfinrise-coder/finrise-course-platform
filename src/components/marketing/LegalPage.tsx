"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#AEB9CC",
        fontFamily: "'Poppins', system-ui, sans-serif",
      }}
    >
      {/* ── Sticky header ─────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo + wordmark */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/finrise-icon.svg"
              width={28}
              height={28}
              alt="Finrise logo"
              className="rounded-md"
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#E7ECF5",
                letterSpacing: "-0.01em",
              }}
            >
              Finrise
            </span>
          </Link>

          {/* Back link */}
          <Link
            href="/"
            style={{
              fontSize: "0.8rem",
              color: "#6B7280",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#18A87A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#6B7280")
            }
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────── */}
      <main
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          padding: "3rem 1.25rem 4rem",
        }}
      >
        {/* Page title */}
        <h1
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 800,
            color: "#E7ECF5",
            letterSpacing: "-0.02em",
            marginBottom: updated ? "0.5rem" : "2rem",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        {/* Last updated */}
        {updated && (
          <p
            style={{
              fontSize: "0.78rem",
              color: "#6B7280",
              marginBottom: "2.25rem",
            }}
          >
            Last updated: {updated}
          </p>
        )}

        {/* Prose card */}
        <div
          style={{
            background: "#0E1B2E",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1rem",
            padding: "2rem 2.25rem",
          }}
        >
          <div className="legal-prose">{children}</div>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "#000000",
          padding: "2rem 1.25rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "48rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* SEBI disclaimer */}
          <p
            style={{
              fontSize: "0.72rem",
              color: "#6B7280",
              lineHeight: 1.6,
              maxWidth: "36rem",
            }}
          >
            Educational content only. Not investment advice. Finrise is not a
            SEBI-registered adviser. Trading carries risk of capital loss.
          </p>

          {/* Legal nav links */}
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.25rem 0.75rem",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: "0.76rem",
                    color: "#6B7280",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#18A87A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6B7280")
                  }
                >
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.65rem" }}>
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Course link */}
          <Link
            href="/pages/candlestick-mastery"
            style={{
              fontSize: "0.75rem",
              color: "#18A87A",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            → View the Course
          </Link>

          <p style={{ fontSize: "0.7rem", color: "#3F4A57", marginTop: "0.25rem" }}>
            &copy; {new Date().getFullYear()} Finrise. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── Prose styles (scoped) ──────────────────────────────────── */}
      <style>{`
        .legal-prose h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #18A87A;
          margin-top: 2rem;
          margin-bottom: 0.6rem;
          letter-spacing: -0.01em;
        }
        .legal-prose h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #E7ECF5;
          margin-top: 1.4rem;
          margin-bottom: 0.4rem;
        }
        .legal-prose p {
          font-size: 0.9rem;
          line-height: 1.75;
          color: #AEB9CC;
          margin-bottom: 1rem;
        }
        .legal-prose ul {
          list-style: disc;
          padding-left: 1.4rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .legal-prose li {
          font-size: 0.88rem;
          line-height: 1.7;
          color: #AEB9CC;
        }
        .legal-prose strong {
          color: #E7ECF5;
          font-weight: 600;
        }
        .legal-prose em {
          color: #6B7280;
          font-style: italic;
        }
        .legal-prose a {
          color: #18A87A;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .legal-prose hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
