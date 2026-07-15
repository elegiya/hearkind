"use client";

import posthog from "posthog-js";
import { ReactNode, useEffect } from "react";
import {
  clearPostHogStorage,
  useCookieConsent,
} from "@/components/consent/CookieConsentProvider";

type PostHogProviderProps = {
  children: ReactNode;
};

type PostHogWithLoadState = typeof posthog & {
  __loaded?: boolean;
};

function isLocalhost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

function shouldEnableAnalytics() {
  if (typeof window === "undefined") return false;

  const isDevelopment = process.env.NODE_ENV === "development";
  const isDisabledByEnv =
    process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "true";
  const isRunningLocally = isLocalhost(window.location.hostname);

  return !isDevelopment && !isDisabledByEnv && !isRunningLocally;
}

function removeQueryAndHash(value: unknown) {
  if (typeof value !== "string") return value;

  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/)[0];
  }
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  const { analyticsConsent, isReady } = useCookieConsent();

  useEffect(() => {
    if (!isReady || !shouldEnableAnalytics()) return;

    const client = posthog as PostHogWithLoadState;

    if (analyticsConsent !== "accepted") {
      if (client.__loaded) {
        posthog.opt_out_capturing();
        posthog.stopSessionRecording();
        clearPostHogStorage();
      }
      return;
    }

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

    if (!key) return;

    if (client.__loaded) {
      posthog.opt_in_capturing();
      return;
    }

    posthog.init(key, {
      api_host: host,
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      persistence: "localStorage",
      person_profiles: "identified_only",
      before_send: (event) => {
        if (!event) return null;

        if (event.properties) {
          event.properties.$current_url = removeQueryAndHash(
            event.properties.$current_url,
          );
          event.properties.$referrer = removeQueryAndHash(
            event.properties.$referrer,
          );
        }

        return event;
      },
    });
  }, [analyticsConsent, isReady]);

  return <>{children}</>;
}
