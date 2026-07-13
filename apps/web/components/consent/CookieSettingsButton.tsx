"use client";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";

type CookieSettingsButtonProps = {
  className?: string;
};

export default function CookieSettingsButton({
  className = "",
}: CookieSettingsButtonProps) {
  const { openSettings } = useCookieConsent();

  return (
    <button type="button" onClick={openSettings} className={className}>
      Manage cookies
    </button>
  );
}
