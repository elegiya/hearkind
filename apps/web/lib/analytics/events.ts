"use client";

import posthog from "posthog-js";

type WaitlistSource = "header" | "hero" | "start";

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

function track(event: string, properties?: Record<string, unknown>) {
  if (!shouldEnableAnalytics()) return;

  posthog.capture(event, {
    ...properties,
    path: window.location.pathname,
  });
}

export function trackWaitlistClicked(source: WaitlistSource) {
  track("waitlist_cta_clicked", { source });
}

export function trackWaitlistModalOpened(source: WaitlistSource) {
  track("waitlist_modal_opened", { source });
}

export function trackWaitlistSubmitStarted(interest: string) {
  track("waitlist_submit_started", { interest });
}

export function trackWaitlistSuccess(interest: string, waitlistId?: string) {
  track("waitlist_success", {
    interest,
    waitlist_id: waitlistId,
  });
}

export function trackWaitlistDuplicate(interest: string) {
  track("waitlist_duplicate", { interest });
}

export function trackWaitlistFailed(interest: string, reason?: string) {
  track("waitlist_failed", {
    interest,
    reason,
  });
}