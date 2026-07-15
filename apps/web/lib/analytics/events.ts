"use client";

import posthog from "posthog-js";

type WaitlistSource = "header" | "hero" | "start";
type PostHogWithLoadState = typeof posthog & { __loaded?: boolean };

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

function canCapture() {
  const client = posthog as PostHogWithLoadState;

  return (
    shouldEnableAnalytics() &&
    client.__loaded === true &&
    !posthog.has_opted_out_capturing()
  );
}

function track(event: string, properties?: Record<string, unknown>) {
  if (!canCapture()) return;

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

export function trackWaitlistSubmitStarted() {
  track("waitlist_submit_started");
}

export function trackWaitlistSuccess() {
  track("waitlist_success");
}

export function trackWaitlistDuplicate() {
  track("waitlist_duplicate");
}

export function trackWaitlistFailed(failureType: "server" | "network") {
  track("waitlist_failed", { failure_type: failureType });
}
