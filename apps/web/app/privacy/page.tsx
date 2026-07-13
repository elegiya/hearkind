import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import {
  LEGAL_LAST_UPDATED,
  legalConfig,
  PRIVACY_NOTICE_VERSION,
} from "@/lib/legal/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HearKind processes personal data on the waitlist website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <section>
        <h2>1. Who is responsible for your data?</h2>
        <p>
          The data controller for hearkind.app is {legalConfig.controllerName},
          operating HearKind. You can contact the controller at{" "}
          <a href={`mailto:${legalConfig.contactEmail}`}>
            {legalConfig.contactEmail}
          </a>
          .
        </p>
        {legalConfig.operatorCountry && (
          <p>Country of establishment: {legalConfig.operatorCountry}.</p>
        )}
      </section>

      <section>
        <h2>2. What data do we collect?</h2>
        <h3>Waitlist data</h3>
        <ul>
          <li>Your email address.</li>
          <li>Your first name, if you choose to provide it.</li>
          <li>Your selected reason for joining the waitlist.</li>
          <li>Submission time and source.</li>
        </ul>

        <h3 className="mt-6">Technical and security data</h3>
        <p>
          Our hosting and database providers may process IP addresses, user
          agent information, timestamps, and request logs when needed to
          deliver and secure the website.
        </p>

        <h3 className="mt-6">Optional analytics data</h3>
        <p>
          Only after you accept analytics, PostHog may receive a pseudonymous
          browser identifier, page views, button events, browser and device
          information, and page paths. HearKind does not send your email, name,
          or waitlist answers to PostHog.
        </p>
      </section>

      <section>
        <h2>3. Why do we use the data?</h2>
        <ul>
          <li>
            To add you to the waitlist and contact you about launch or early
            access. Legal basis: taking steps at your request before entering a
            service relationship (GDPR Article 6(1)(b)).
          </li>
          <li>
            To protect the website, prevent abuse, and investigate technical
            problems. Legal basis: our legitimate interest in operating a safe
            and reliable service (GDPR Article 6(1)(f)).
          </li>
          <li>
            To understand site usage and improve the landing page. Legal basis:
            your consent (GDPR Article 6(1)(a)). Analytics remains off until you
            accept it.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Who receives the data?</h2>
        <p>HearKind currently uses the following service providers:</p>
        <ul>
          <li>Vercel for website hosting and delivery.</li>
          <li>Supabase for waitlist database storage.</li>
          <li>PostHog for optional analytics after consent.</li>
        </ul>
        <p>
          These providers act under their own contractual and data-protection
          terms and may use approved subprocessors.
        </p>
      </section>

      <section>
        <h2>5. International data transfers</h2>
        <p>
          We prefer European hosting regions where available. Some providers or
          their subprocessors may process data outside the European Economic
          Area. Where required, transfers are protected through an adequacy
          decision, Standard Contractual Clauses, or another lawful safeguard.
        </p>
      </section>

      <section>
        <h2>6. How long do we keep data?</h2>
        <ul>
          <li>
            Waitlist data is kept while the early-access process is active and
            for no longer than {legalConfig.waitlistRetentionMonthsAfterLaunch}
            {" "}months after launch, unless you ask us to delete it sooner or a
            legal obligation requires longer storage.
          </li>
          <li>
            Optional analytics data is configured for a maximum retention
            target of {legalConfig.analyticsRetentionMonths} months.
          </li>
          <li>
            Your analytics preference is remembered for up to{" "}
            {legalConfig.consentPreferenceMonths} months.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          Depending on the circumstances, you may request access, correction,
          deletion, restriction, or portability of your data, and object to
          processing based on legitimate interests. You may withdraw analytics
          consent at any time through Manage cookies. Withdrawal does not
          affect processing that was lawful before withdrawal.
        </p>
        <p>
          Send requests to{" "}
          <a href={`mailto:${legalConfig.contactEmail}`}>
            {legalConfig.contactEmail}
          </a>
          . You also have the right to complain to the competent data
          protection authority in your country.
        </p>
      </section>

      <section>
        <h2>8. Children</h2>
        <p>
          The current HearKind waitlist is intended for adults aged 18 and over.
          Please do not submit data if you are under 18.
        </p>
      </section>

      <section>
        <h2>9. Security</h2>
        <p>
          We use access controls, encrypted connections, restricted production
          access, and other reasonable technical and organisational measures.
          No online system can guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>10. Changes to this policy</h2>
        <p>
          We may update this policy as HearKind changes. The current notice
          version is {PRIVACY_NOTICE_VERSION}. Material changes will be shown on
          this page before they take effect where appropriate.
        </p>
      </section>
    </LegalPageLayout>
  );
}
