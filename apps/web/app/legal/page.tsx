import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { LEGAL_LAST_UPDATED, legalConfig } from "@/lib/legal/config";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal information about the operator of HearKind.",
  alternates: { canonical: "/legal" },
};

function OptionalDetail({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <li>
      <strong>{label}:</strong> {value}
    </li>
  );
}

export default function LegalPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Legal Notice"
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <section>
        <h2>1. Website operator</h2>
        <ul>
          <li>
            <strong>Operator:</strong> {legalConfig.controllerName}
          </li>
          <li>
            <strong>Website:</strong> {legalConfig.siteUrl}
          </li>
          <li>
            <strong>Contact:</strong>{" "}
            <a href={`mailto:${legalConfig.contactEmail}`}>
              {legalConfig.contactEmail}
            </a>
          </li>
          <OptionalDetail
            label="Country of establishment"
            value={legalConfig.operatorCountry}
          />
          <OptionalDetail
            label="Professional address"
            value={legalConfig.professionalAddress}
          />
          <OptionalDetail label="Tax ID" value={legalConfig.taxId} />
          <OptionalDetail
            label="Registration details"
            value={legalConfig.registrationDetails}
          />
        </ul>
      </section>

      <section>
        <h2>2. Purpose of the website</h2>
        <p>
          HearKind currently provides information about a planned peer-support
          product and allows adults to join an early-access waitlist. The
          current website is not a therapy, medical, crisis, or emergency
          service and does not provide professional healthcare advice.
        </p>
      </section>

      <section>
        <h2>3. Intellectual property</h2>
        <p>
          Unless otherwise stated, the HearKind name, website design, text,
          graphics, and original materials are owned by or licensed to the
          operator. You may not reproduce or commercially reuse them without
          prior written permission, except where law allows.
        </p>
      </section>

      <section>
        <h2>4. Acceptable use</h2>
        <p>
          You must not attempt to disrupt the website, bypass security controls,
          submit unlawful content, impersonate another person, scrape the site
          at harmful volume, or use the waitlist for spam or abuse.
        </p>
      </section>

      <section>
        <h2>5. Availability and liability</h2>
        <p>
          The site may change, pause, or become unavailable while the product is
          under development. We aim to keep information accurate, but do not
          guarantee that every page is complete or error-free. Nothing in this
          notice excludes liability that cannot legally be excluded.
        </p>
      </section>

      <section>
        <h2>6. External services and links</h2>
        <p>
          The site depends on third-party infrastructure and may link to other
          websites. Third-party services operate under their own terms and
          privacy policies.
        </p>
      </section>

      <section>
        <h2>7. Governing law</h2>
        <p>
          Applicable law and competent courts depend on the operator’s legally
          established place of activity and mandatory consumer-protection rules.
          The country of establishment shown above should be completed before
          this notice is treated as final.
        </p>
      </section>
    </LegalPageLayout>
  );
}
