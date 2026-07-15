import Link from "next/link";

import BrandLogo from "@/components/BrandLogo";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";

const primaryLinkClass =
  "flex h-full items-center rounded-full px-4 font-medium text-[#2a241d] transition hover:bg-white/75";

const legalLinkClass =
  "text-[11px] font-medium text-[#2a241d]/50 transition hover:text-[#2a241d] sm:text-xs";

export default function Footer() {
  return (
    <footer className="relative z-30 text-[#2a241d] lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
      <div className="mx-auto max-w-7xl px-6 pb-3 pt-5">
        <div className="flex flex-col items-center gap-4 text-sm lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          <BrandLogo
            href="/"
            variant="pill"
            size="small"
            className="lg:justify-self-start"
          />

          <nav
            aria-label="Landing page"
            className="flex w-full max-w-sm flex-col gap-1.5 rounded-[1.5rem] bg-white/75 p-1.5 text-center text-[#2a241d] shadow-sm backdrop-blur-sm sm:h-12 sm:w-auto sm:max-w-none sm:flex-row sm:gap-0 sm:rounded-full lg:justify-self-center"
          >
            <a href="#how" className={primaryLinkClass}>
              How it works
            </a>

            <a href="#why" className={primaryLinkClass}>
              Why HearKind
            </a>

            <a href="#safety" className={primaryLinkClass}>
              Safety
            </a>
          </nav>

          <p className="inline-flex h-12 items-center justify-center rounded-full bg-white/75 px-5 text-center text-[#2a241d]/70 shadow-sm backdrop-blur-sm lg:justify-self-end">
            © 2026 HearKind. All rights reserved
          </p>
        </div>

        <nav
          aria-label="Legal"
          className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
        >
          <Link href="/privacy" className={legalLinkClass}>
            Privacy
          </Link>

          <Link href="/cookies" className={legalLinkClass}>
            Cookies
          </Link>

          <Link href="/legal" className={legalLinkClass}>
            Legal
          </Link>

          <CookieSettingsButton className={legalLinkClass} />
        </nav>
      </div>
    </footer>
  );
}