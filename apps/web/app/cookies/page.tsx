import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { LEGAL_LAST_UPDATED, legalConfig } from "@/lib/legal/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookies and similar storage technologies used by HearKind.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookies"
      title="Cookie Policy"
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <section>
        <h2>1. What this policy covers</h2>
        <p>
          This policy explains cookies and similar browser-storage technologies
          used on hearkind.app. The current website uses one necessary local
          storage entry to remember your analytics choice and optional PostHog
          storage only after you accept analytics.
        </p>
      </section>

      <section>
        <h2>2. Necessary preference storage</h2>
        <ul>
          <li>
            <strong>Key:</strong> hearkind.analytics-consent.v1
          </li>
          <li>
            <strong>Purpose:</strong> remembers whether you accepted or rejected
            optional analytics so the site does not ask on every visit.
          </li>
          <li>
            <strong>Storage:</strong> first-party local storage.
          </li>
          <li>
            <strong>Duration:</strong> up to{" "}
            {legalConfig.consentPreferenceMonths} months.
          </li>
        </ul>
        <p>
          This storage is necessary to remember the privacy choice you make.
        </p>
      </section>

      <section>
        <h2>3. Optional PostHog analytics</h2>
        <p>
          PostHog is not initialised until you select “Accept analytics”. When
          accepted, it may store a pseudonymous identifier in first-party local
          storage and process page views and selected product events. HearKind
          disables PostHog autocapture and session recording in code.
        </p>
        <ul>
          <li>
            <strong>Provider:</strong> PostHog.
          </li>
          <li>
            <strong>Purpose:</strong> audience measurement and landing-page
            improvement.
          </li>
          <li>
            <strong>Legal basis:</strong> your consent.
          </li>
          <li>
            <strong>Target retention:</strong> up to{" "}
            {legalConfig.analyticsRetentionMonths} months.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Accepting, rejecting, or changing your choice</h2>
        <p>
          You can accept or reject optional analytics from the first-layer
          notice. Both choices are available at the same time. You can reopen
          the panel at any time using “Manage cookies” in the footer.
        </p>
        <p>
          Rejecting analytics does not stop you from using the site or joining
          the waitlist. If you withdraw consent, HearKind stops future PostHog
          collection on that browser and clears known PostHog browser storage.
        </p>
      </section>

      <section>
        <h2>5. Browser controls</h2>
        <p>
          You may also clear site data through your browser settings. Doing so
          may remove your saved preference, so the site may ask again on your
          next visit.
        </p>
      </section>
    </LegalPageLayout>
  );
}
