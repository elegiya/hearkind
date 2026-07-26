"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import CookieSettingsButton from "@/components/consent/CookieSettingsButton";

const legalLinkClass =
  "text-[11px] font-medium text-[#2a241d]/50 transition hover:text-[#2a241d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3f4734] focus-visible:ring-offset-2 sm:text-xs";

export default function GlobalLegalFooter() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isAuthPage = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ].includes(pathname);
  const isOnboardingPage = pathname === "/onboarding" || pathname.startsWith("/onboarding/");

  return (
    <footer
      className={`global-legal-footer shrink-0 px-6 py-3 text-[#2a241d] ${
        isLandingPage
          ? "relative z-40 -mt-10 bg-transparent"
          : isAuthPage
            ? "auth-legal-footer bg-[#fbf5ed]"
            : isOnboardingPage
              ? "onboarding-legal-footer bg-[#fbf7f1]"
          : "bg-[#fbf5ed]"
      }`}
    >
      <nav
        aria-label="Legal"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1"
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
    </footer>
  );
}
