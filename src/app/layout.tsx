import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ensureBootstrapped } from "@/lib/bootstrap";
import TrackPageView from "@/components/TrackPageView";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

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
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        {children}
        <TrackPageView />
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","xfieo1ijol");`}
        </Script>

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
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=27615967504702056&ev=PageView&noscript=1" alt="" />` }} />
      </body>
    </html>
  );
}
