import type { Metadata } from "next";
import Script from "next/script";
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
      <body>
        {children}
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','27615967504702056');
fbq('track','PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=27615967504702056&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
