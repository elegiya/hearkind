"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/consent/CookieConsentProvider";

const consentButtonClass =
  "rounded-full border-2 border-[#3f4734] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#3f4734] transition hover:-translate-y-0.5 hover:bg-[#3f4734] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3f4734] focus-visible:ring-offset-2";

export default function CookieConsentBanner() {
  const {
    analyticsConsent,
    isReady,
    isSettingsOpen,
    acceptAnalytics,
    rejectAnalytics,
    closeSettings,
  } = useCookieConsent();

  if (!isReady || !isSettingsOpen) {
    return null;
  }

  const canClose = analyticsConsent !== null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="analytics-consent-title"
      className="
        fixed bottom-3 left-3 right-3 z-[100]
        rounded-[1.5rem]
        border border-[#e5d6c8]
        bg-[#fffaf4]/95
        p-5
        text-[#2a241d]
        shadow-[0_20px_60px_rgba(42,36,29,0.2)]
        backdrop-blur-md
        sm:bottom-5 sm:left-auto sm:right-5 sm:w-[360px]
        lg:bottom-6 lg:right-6
      "
    >
      {canClose && (
        <button
          type="button"
          onClick={closeSettings}
          aria-label="Close Manage cookies"
          className="
            absolute right-4 top-4
            flex h-8 w-8 items-center justify-center
            rounded-full
            bg-[#fbf5ed]
            text-lg leading-none text-[#6f6254]
            transition
            hover:bg-[#f0c2a6]
            hover:text-[#2a241d]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#3f4734]
          "
        >
          ×
        </button>
      )}

      <div className={canClose ? "pr-10" : undefined}>
        <h2
          id="analytics-consent-title"
          className="text-xl font-semibold tracking-tight"
        >
          Manage cookies
        </h2>
      </div>

      <p className="mt-3 text-sm leading-5 text-[#6f6254]">
        HearKind uses third-party PostHog analytics to understand how the site
        is used and improve it. Analytics stays off unless you accept.
      </p>

      <Link
        href="/cookies"
        className="mt-3 inline-block text-xs font-semibold text-[#6f6254] underline underline-offset-2 transition hover:text-[#2a241d]"
      >
        Cookie Policy
      </Link>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={rejectAnalytics}
          className={consentButtonClass}
        >
          Reject
        </button>

        <button
          type="button"
          onClick={acceptAnalytics}
          className={consentButtonClass}
        >
          Accept
        </button>
      </div>
    </section>
  );
}