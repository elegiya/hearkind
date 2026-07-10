"use client";

import posthog from "posthog-js";
import { ReactNode, useEffect } from "react";

type PostHogProviderProps = {
  children: ReactNode;
};

function isLocalhost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function shouldEnableAnalytics() {
  if (typeof window === "undefined") return false;

  const isDevelopment = process.env.NODE_ENV === "development";
  const isDisabledByEnv = process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "true";
  const isRunningLocally = isLocalhost(window.location.hostname);

  return !isDevelopment && !isDisabledByEnv && !isRunningLocally;
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    if (!shouldEnableAnalytics()) return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

    if (!key) return;

    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: "identified_only",
    });
  }, []);

  return <>{children}</>;
}