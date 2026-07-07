"use client";

import posthog from "posthog-js";

type WaitlistSource = "header" | "hero" | "start";

function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

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