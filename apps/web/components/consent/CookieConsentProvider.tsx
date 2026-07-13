"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type AnalyticsConsent = "accepted" | "rejected" | null;

type StoredConsent = {
  value: Exclude<AnalyticsConsent, null>;
  updatedAt: number;
};

type ConsentSnapshot =
  | "loading"
  | "unset"
  | Exclude<AnalyticsConsent, null>;

type CookieConsentContextValue = {
  analyticsConsent: AnalyticsConsent;
  isReady: boolean;
  isSettingsOpen: boolean;
  acceptAnalytics: () => void;
  rejectAnalytics: () => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CONSENT_STORAGE_KEY = "hearkind.analytics-consent.v1";
const CONSENT_CHANGE_EVENT = "hearkind:analytics-consent-change";
const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

let volatileConsent: Exclude<AnalyticsConsent, null> | null = null;

function readStoredConsent(): AnalyticsConsent {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return volatileConsent;

    const stored = JSON.parse(raw) as StoredConsent;
    const isValidValue =
      stored.value === "accepted" || stored.value === "rejected";
    const isFresh = Date.now() - stored.updatedAt < CONSENT_MAX_AGE_MS;

    if (!isValidValue || !isFresh) return volatileConsent;

    return stored.value;
  } catch {
    return volatileConsent;
  }
}

function getClientConsentSnapshot(): ConsentSnapshot {
  return readStoredConsent() ?? "unset";
}

function getServerConsentSnapshot(): ConsentSnapshot {
  return "loading";
}

function subscribeToConsent(callback: () => void) {
  const notify = () => callback();

  window.addEventListener("storage", notify);
  window.addEventListener(CONSENT_CHANGE_EVENT, notify);

  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(CONSENT_CHANGE_EVENT, notify);
  };
}

function storeConsent(value: Exclude<AnalyticsConsent, null>) {
  volatileConsent = value;

  try {
    const stored: StoredConsent = {
      value,
      updatedAt: Date.now(),
    };

    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // The choice still applies for the current page if storage is unavailable.
  }

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function clearPostHogStorage() {
  const shouldRemove = (key: string) =>
    key.startsWith("ph_") || key.toLowerCase().includes("posthog");

  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      const keys = Array.from({ length: storage.length }, (_, index) =>
        storage.key(index),
      ).filter((key): key is string => Boolean(key));

      for (const key of keys) {
        if (shouldRemove(key)) storage.removeItem(key);
      }
    } catch {
      // Ignore browsers that block storage access.
    }
  }

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !shouldRemove(name)) continue;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const consentSnapshot = useSyncExternalStore(
    subscribeToConsent,
    getClientConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [isSettingsManuallyOpen, setIsSettingsManuallyOpen] = useState(false);

  const analyticsConsent: AnalyticsConsent =
    consentSnapshot === "accepted" || consentSnapshot === "rejected"
      ? consentSnapshot
      : null;
  const isReady = consentSnapshot !== "loading";
  const isSettingsOpen =
    isSettingsManuallyOpen || (isReady && analyticsConsent === null);

  const acceptAnalytics = useCallback(() => {
    storeConsent("accepted");
    setIsSettingsManuallyOpen(false);
  }, []);

  const rejectAnalytics = useCallback(() => {
    storeConsent("rejected");
    setIsSettingsManuallyOpen(false);
  }, []);

  const openSettings = useCallback(() => setIsSettingsManuallyOpen(true), []);
  const closeSettings = useCallback(() => {
    if (analyticsConsent !== null) setIsSettingsManuallyOpen(false);
  }, [analyticsConsent]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      analyticsConsent,
      isReady,
      isSettingsOpen,
      acceptAnalytics,
      rejectAnalytics,
      openSettings,
      closeSettings,
    }),
    [
      analyticsConsent,
      isReady,
      isSettingsOpen,
      acceptAnalytics,
      rejectAnalytics,
      openSettings,
      closeSettings,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used inside CookieConsentProvider",
    );
  }

  return context;
}
