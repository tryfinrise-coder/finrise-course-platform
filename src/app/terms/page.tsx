import type { Metadata } from "next";
import LegalPage from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Finrise",
  description:
    "Terms and conditions governing your use of Finrise and the Candlestick Mastery course.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="June 2026">
      <p>
        Please read these Terms &amp; Conditions (&ldquo;Terms&rdquo;) carefully
        before purchasing or using any course offered by Finrise
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). By completing
        a purchase or accessing course content you confirm that you have read,
        understood, and agreed to be bound by these Terms.
      </p>

      <p>
        <em>
          Note to site owner: These terms are a starting point intended for
          general informational purposes. Please have a qualified legal
          professional review and adapt them to your specific situation before
          going live with paid enrolments.
        </em>
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        These Terms constitute a legally binding agreement between you (the
        &ldquo;learner&rdquo; or &ldquo;user&rdquo;) and Finrise. If you do
        not agree with any part of these Terms, you must not purchase or use our
        course. We reserve the right to update these Terms at any time; continued
        use of the platform after changes are posted constitutes your acceptance
        of the revised Terms.
      </p>

      <h2>2. Nature of the Content — Educational Use Only</h2>
      <p>
        All content provided by Finrise — including but not limited to video
        lessons, written materials, PDF guides, charts, and commentary — is
        intended <strong>solely for general educational purposes</strong>.
      </p>
      <ul>
        <li>
          Finrise does <strong>not</strong> provide investment advice, financial
          advice, stock tips, trading signals, or buy/sell recommendations of
          any kind.
        </li>
        <li>
          No content on this platform should be construed as a recommendation
          to buy, sell, or hold any security, currency, commodity, or financial
          instrument.
        </li>
        <li>
          <strong>
            Trading and investing in financial markets carry a significant risk
            of capital loss. You may lose some or all of the money you invest.
            Past performance is not indicative of future results.
          </strong>
        </li>
        <li>
          Finrise is <strong>not registered with SEBI</strong> as an investment
          adviser, research analyst, portfolio manager, or in any other
          regulated capacity. Nothing here constitutes SEBI-regulated advice.
        </li>
      </ul>
      <p>
        Before making any financial decision, we strongly encourage you to
        consult a qualified, SEBI-registered financial adviser who can consider
        your individual circumstances.
      </p>

      <h2>3. Account &amp; Access</h2>
      <p>
        Upon successful payment you will receive login credentials for one (1)
        individual account. Your account is for <strong>your personal use only</strong>.
        You must not:
      </p>
      <ul>
        <li>Share your login credentials with any other person</li>
        <li>Sell, transfer, or sub-license access to any third party</li>
        <li>
          Allow more than one person to use the account simultaneously or
          sequentially
        </li>
      </ul>
      <p>
        We reserve the right to suspend or terminate accounts found to be in
        violation of this clause without refund.
      </p>

      <h2>4. Pricing &amp; Payment</h2>
      <p>
        The Candlestick Mastery course is sold at <strong>₹199 (Indian Rupees)</strong>,
        inclusive of applicable taxes, unless otherwise displayed at checkout.
        All prices are displayed and charged in INR. Payment is processed
        securely through <strong>Razorpay</strong>. Finrise does not store your
        card or banking details.
      </p>
      <p>
        Your purchase gives you <strong>lifetime access</strong> to all current
        course content and any future updates made to the same course, at no
        additional cost.
      </p>

      <h2>5. Refunds &amp; Cancellations</h2>
      <p>
        Refunds are governed by our{" "}
        <a href="/refund">Refund &amp; Cancellation Policy</a>, which forms part
        of these Terms. Please review it before purchasing.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All course content — including videos, animations, written lessons,
        graphics, PDF materials, and the Finrise brand — is the exclusive
        intellectual property of Finrise and is protected by applicable
        copyright law.
      </p>
      <p>
        You are granted a <strong>non-exclusive, non-transferable,
        personal licence</strong> to access and use the course content for your
        own private learning. You may <strong>not</strong>:
      </p>
      <ul>
        <li>Copy, reproduce, or redistribute any course material</li>
        <li>Upload or share course content on any platform</li>
        <li>
          Create derivative works based on course content without our express
          written permission
        </li>
        <li>
          Use our brand name, logo, or materials in any commercial context
        </li>
      </ul>

      <h2>7. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Use the platform in any way that violates applicable Indian or
          international law
        </li>
        <li>
          Attempt to gain unauthorised access to our systems or other users&apos;
          accounts
        </li>
        <li>
          Use automated tools (bots, scrapers) to access or download course
          content
        </li>
        <li>
          Engage in any conduct that could harm or disrupt the platform or other
          users
        </li>
      </ul>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Finrise, its owners,
        directors, and employees shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, including but
        not limited to:
      </p>
      <ul>
        <li>Financial losses arising from trading decisions you make</li>
        <li>
          Loss of profits, data, or business opportunities resulting from your
          use of the platform
        </li>
        <li>
          Interruptions in platform availability or technical errors beyond our
          reasonable control
        </li>
      </ul>
      <p>
        In all cases, our total liability to you shall not exceed the amount you
        paid for the course (₹199).
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        The course is provided on an &ldquo;as is&rdquo; basis. While we work
        hard to keep content accurate and up to date, we make no warranty that:
        (a) the content will always be error-free; (b) using the course will
        result in any particular trading or financial outcome; or (c) the
        platform will be available uninterrupted at all times.
      </p>

      <h2>10. Governing Law &amp; Jurisdiction</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of
        <strong> India</strong>. Any disputes arising under or in connection
        with these Terms shall be subject to the exclusive jurisdiction of the
        courts of India.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms?{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>
      </p>

      <hr />

      <p
        style={{
          fontSize: "0.78rem",
          color: "#6B7280",
          fontStyle: "italic",
        }}
      >
        Educational content only. Not investment advice. Finrise is not a
        SEBI-registered adviser. Trading carries risk of capital loss. Always
        consult a qualified financial professional before making investment
        decisions.
      </p>
    </LegalPage>
  );
}
