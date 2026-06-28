import type { Metadata } from "next";
import LegalPage from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — Finrise",
  description:
    "Finrise refund and cancellation policy for the Candlestick Mastery digital course.",
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy" updated="June 2026">
      <p>
        Please read this policy carefully before purchasing. By completing your
        order you acknowledge that you have read and agree to the terms below.
      </p>

      <p>
        <em>
          Note to site owner: Please review and adjust these terms to match your
          actual policy before going live. The refund window, access-threshold,
          and conditions below are reasonable starting defaults, but you should
          confirm they reflect your real-world practice and obtain professional
          legal review if in doubt.
        </em>
      </p>

      <h2>1. Digital Product — Immediate Access</h2>
      <p>
        The Candlestick Mastery course is a <strong>100% digital product</strong>.
        Upon successful payment, your account credentials and course access are
        delivered to the email address you provided at checkout — typically
        within a few minutes. Because access is granted immediately, there is no
        &ldquo;cooling-off&rdquo; period in the traditional sense.
      </p>

      <h2>2. Refund Eligibility</h2>
      <p>
        We want every learner to have a positive experience. If you are
        genuinely unsatisfied with the course, you may request a refund under
        the following conditions:
      </p>
      <ul>
        <li>
          Your refund request is submitted <strong>within 7 calendar days</strong>{" "}
          of your purchase date.
        </li>
        <li>
          You have <strong>not substantially accessed or consumed</strong> the
          course content — specifically, you have completed fewer than 20% of
          the lessons.
        </li>
        <li>
          You have not downloaded or exported any downloadable course materials
          (e.g., the PDF handbook or bonus guides).
        </li>
        <li>
          You have not previously received a refund from Finrise.
        </li>
      </ul>
      <p>
        Requests that do not meet all of the above criteria will not be
        eligible for a refund. This policy exists to protect both learners and
        the viability of the platform.
      </p>

      <h2>3. Bonus Materials</h2>
      <p>
        Any bonus materials included with your purchase (such as PDF guides,
        reference sheets, or supplementary resources) are part of the course
        package and are subject to this same refund policy. If you have
        downloaded bonus materials, your request will not qualify for a refund.
      </p>

      <h2>4. How to Request a Refund</h2>
      <p>
        To submit a refund request, email us at{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a> with:
      </p>
      <ul>
        <li>Subject line: <strong>Refund Request — Candlestick Mastery</strong></li>
        <li>Your full name and the email address used at checkout</li>
        <li>Your Razorpay order / payment ID (found in your payment receipt)</li>
        <li>A brief reason for the request (optional but helpful)</li>
      </ul>
      <p>
        We will acknowledge your request within 2 business days and process
        approved refunds within 5–7 business days. Refunds are returned
        exclusively to the <strong>original payment method</strong> via Razorpay.
        We are unable to issue refunds to a different card, bank account, or
        wallet.
      </p>

      <h2>5. Non-Refundable Situations</h2>
      <p>
        Refunds will <strong>not</strong> be issued in these circumstances:
      </p>
      <ul>
        <li>Request is made more than 7 days after purchase</li>
        <li>The learner has accessed more than 20% of the course</li>
        <li>Bonus or downloadable materials have been downloaded</li>
        <li>
          Technical issues caused by the learner&apos;s own device or internet
          connection, where the course platform itself is functional
        </li>
        <li>Change of mind after substantially engaging with the content</li>
      </ul>

      <h2>6. Technical Problems</h2>
      <p>
        If you are experiencing a genuine technical problem accessing your
        course — such as a missing welcome email, broken login link, or
        platform error — please contact us before requesting a refund. Most
        technical issues can be resolved quickly, and we would much rather fix
        the problem than process a return.
      </p>

      <h2>7. Course Cancellations by Finrise</h2>
      <p>
        In the unlikely event that Finrise discontinues the Candlestick Mastery
        course entirely, all affected learners will be offered a full refund
        regardless of access level or time elapsed since purchase.
      </p>

      <h2>8. Contact</h2>
      <p>
        For refund requests or questions about this policy:{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>
      </p>
    </LegalPage>
  );
}
