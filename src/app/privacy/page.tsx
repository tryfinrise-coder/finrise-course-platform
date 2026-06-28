import type { Metadata } from "next";
import LegalPage from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Finrise",
  description:
    "How Finrise collects, uses, and protects your personal information when you purchase or use our candlestick trading course.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        Your privacy matters to us. This Privacy Policy explains what personal
        information Finrise collects when you visit our website or purchase our
        course, how we use it, and the choices you have. By using our platform
        you agree to the practices described below.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>Information you provide directly</h3>
      <p>
        When you complete checkout, you provide us (via Razorpay&apos;s secure
        payment form) with:
      </p>
      <ul>
        <li>Your <strong>full name</strong></li>
        <li>Your <strong>email address</strong></li>
        <li>Your <strong>phone number</strong> (as required by Razorpay)</li>
      </ul>
      <p>
        We use this information to create your course account, send you login
        credentials, and communicate with you about your purchase.
      </p>

      <h3>Payment information</h3>
      <p>
        All payments are processed by <strong>Razorpay Software Private
        Limited</strong>, a PCI-DSS-compliant payment gateway. Finrise does{" "}
        <strong>not</strong> receive or store your card number, CVV, UPI PIN,
        net-banking credentials, or any other sensitive payment details.
        Razorpay&apos;s own privacy policy governs how they handle payment data.
      </p>

      <h3>Usage and analytics data</h3>
      <p>
        We may collect anonymised usage information such as pages visited,
        lesson progress, and device/browser type to help us improve the course
        experience. This data is not linked to personally identifiable
        information unless you are logged in.
      </p>

      <h3>Cookies</h3>
      <p>
        Our website uses cookies for session management (keeping you logged in),
        basic analytics, and payment-flow functionality. You can disable cookies
        in your browser settings, though some features of the course platform
        may not function correctly without them.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>
          <strong>Course delivery</strong> — to create your account and give
          you access to the lessons you purchased.
        </li>
        <li>
          <strong>Transactional communications</strong> — to send your receipt,
          login link, and any important updates about your access.
        </li>
        <li>
          <strong>Customer support</strong> — to respond to questions or
          requests you send us.
        </li>
        <li>
          <strong>Platform improvements</strong> — to understand how learners
          use the course and make it better.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> use your information to serve targeted
        advertising, nor do we profile you for marketing purposes beyond
        occasional course-related updates (which you may opt out of at any time
        by emailing us).
      </p>

      <h2>3. Data Sharing</h2>
      <p>
        Finrise does <strong>not sell, rent, or trade</strong> your personal
        data to any third party. We share information only in the following
        limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Razorpay</strong> — to process your payment. They act as an
          independent data controller for payment data.
        </li>
        <li>
          <strong>Course platform / hosting providers</strong> — technical
          service providers that help us run the website and deliver content,
          under confidentiality obligations.
        </li>
        <li>
          <strong>Legal requirements</strong> — if required by law, court
          order, or a government authority with valid jurisdiction.
        </li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your
        information against unauthorised access, loss, or misuse. However, no
        system connected to the internet can guarantee absolute security. If you
        believe your account has been compromised, please contact us immediately
        at{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain your account information for as long as your account remains
        active or as needed to provide course access. Anonymised analytics data
        may be retained indefinitely. We delete or anonymise personal data upon
        a valid deletion request (see below), unless we are legally required to
        retain it longer.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to:
      </p>
      <ul>
        <li>
          <strong>Access</strong> — request a copy of the personal data we hold
          about you.
        </li>
        <li>
          <strong>Correction</strong> — ask us to correct inaccurate
          information.
        </li>
        <li>
          <strong>Deletion</strong> — request that we delete your account and
          associated personal data, subject to any legal retention obligations.
        </li>
        <li>
          <strong>Opt-out of marketing</strong> — unsubscribe from any
          non-transactional emails at any time.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a> with
        the subject line &ldquo;Privacy Request.&rdquo; We will respond within
        15 business days.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        Our course is intended for adults (18 years and older). We do not
        knowingly collect personal information from individuals under the age of
        18. If you believe a minor has provided us with personal information,
        please contact us and we will delete it promptly.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we
        will update the &ldquo;Last updated&rdquo; date at the top of this page.
        Continued use of our platform after a change is posted constitutes your
        acceptance of the updated policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this Privacy Policy?{" "}
        <a href="mailto:support@tryfinrise.com">support@tryfinrise.com</a>
      </p>
    </LegalPage>
  );
}
