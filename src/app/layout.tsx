import type { Metadata } from "next";
import "./globals.css";
import { ensureBootstrapped } from "@/lib/bootstrap";

export const metadata: Metadata = {
  title: "Finrise — Master Candlestick Charting",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  description:
    "Learn candlestick patterns as living, tick-by-tick price action. Level up, keep your streak, and earn badges as you master every pattern.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // First-run setup (schema, admin, flagship course, sample PDF). Idempotent +
  // memoized; awaited so the very first request renders against a ready DB.
  await ensureBootstrapped();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
