import type { Metadata } from "next";
import LegalPage from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Contact Us — Finrise",
  description:
    "Get in touch with Finrise support for help with your Candlestick Mastery course purchase or account.",
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us" updated="June 2026">
      <p>
        We keep things simple: if you need help, just reach out. We are a small
        team and we read every message we receive.
      </p>

      <p>
        <em>
          Note to site owner: Update the email address and business details
          below with your real contact information before going live.
        </em>
      </p>

      <h2>Support Email</h2>
      <p>
        For all queries — before purchase, after purchase, or general questions
        about the course — email us at:
      </p>
      <p>
        <strong>
          <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>
        </strong>{" "}
        <em>(placeholder — update with your actual support email)</em>
      </p>

      <h2>Response Time</h2>
      <p>
        We aim to respond to all emails within <strong>24–48 hours</strong> on
        business days (Monday to Friday, excluding public holidays in India).
        Messages sent over the weekend are typically answered on the next
        business day.
      </p>
      <p>
        If you have not heard back within 48 hours, please check your spam or
        promotions folder, as our reply may have been filtered.
      </p>

      <h2>After You Purchase</h2>
      <p>
        Once your payment is confirmed via Razorpay, you will receive a welcome
        email at the address you provided during checkout. This email contains
        your login link and instructions for accessing the course. Please check
        your inbox (and spam folder) within a few minutes of payment.
      </p>
      <p>
        If you do not receive your welcome email within 30 minutes of a
        successful payment, contact us at the address above and include:
      </p>
      <ul>
        <li>The email address you used at checkout</li>
        <li>Your Razorpay payment ID or transaction reference</li>
      </ul>
      <p>
        We will locate your order and send access manually within one business
        day.
      </p>

      <h2>Common Questions</h2>
      <h3>I forgot my password / cannot log in.</h3>
      <p>
        Use the &ldquo;Forgot Password&rdquo; option on the login page, or
        email us and we will send a fresh access link.
      </p>

      <h3>Can I access the course on mobile?</h3>
      <p>
        Yes. The course is accessible on any modern device — desktop, tablet,
        or smartphone — through a standard web browser. No app download is
        required.
      </p>

      <h3>I want a refund.</h3>
      <p>
        Please read our{" "}
        <a href="/refund">Refund &amp; Cancellation Policy</a> first, then
        email us with your order details. We are happy to help.
      </p>

      <h3>I have a question about the course content.</h3>
      <p>
        Content questions are welcome. Include as much context as you can (which
        lesson, which concept) and we will do our best to clarify.
      </p>

      <h2>Business Details</h2>
      <p>
        <em>
          (Placeholder — replace with your registered business name, address,
          and any other legally required contact details for your jurisdiction
          before publishing.)
        </em>
      </p>
      <p>
        Finrise<br />
        India<br />
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>
      </p>
    </LegalPage>
  );
}
