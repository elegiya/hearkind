"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

import "../onboarding.css";

const supportOptions = [
  { label: "Someone to listen", icon: <HeadphonesIcon /> },
  { label: "Share experiences", icon: <CommunityIcon /> },
  { label: "Encouragement", icon: <HeartIcon /> },
  { label: "Advice or perspective", icon: <IdeaIcon /> },
  { label: "Just not feeling alone", icon: <PeopleIcon /> },
] as const;

const connectionOptions = [
  "Someone who has been through something similar",
  "Someone going through something similar now",
  "Either is okay",
] as const;

export default function OnboardingSupportPage() {
  const router = useRouter();
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [connectionPreference, setConnectionPreference] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  function toggleSupport(option: string) {
    setSelectedSupport((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleContinue() {
    window.sessionStorage.setItem(
      "hearkind-onboarding-support",
      JSON.stringify({ support: selectedSupport, connectionPreference }),
    );
    router.push("/onboarding/preferences");
  }

  return (
    <main className="onboarding-page onboarding-page--support">
      <svg className="onboarding-clip-definitions" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="onboarding-visual-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 H 0.84 C 0.83 0.12, 0.83 0.23, 0.845 0.34 C 0.858 0.44, 0.86 0.49, 0.86 0.55 C 0.86 0.65, 0.85 0.74, 0.835 0.83 C 0.82 0.91, 0.82 0.96, 0.81 1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <section className="onboarding-visual" aria-label="Peer support">
        <Image
          src="/images/people-talking.png"
          alt="Two people talking together over a warm drink"
          fill
          priority
          sizes="50vw"
          className="onboarding-illustration onboarding-illustration--support"
        />
        <BrandLogo
          href="/"
          variant="pill"
          size="small"
          className="onboarding-logo"
        />
      </section>

      <svg className="onboarding-divider-wave" viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 56 C165 -26 342 7 505 66 C690 133 843 36 1000 82 V150 H0 Z" />
      </svg>

      <button
        className="onboarding-sign-out"
        type="button"
        disabled={isSigningOut}
        onClick={handleSignOut}
      >
        {isSigningOut ? "Signing out…" : "Sign out"}
      </button>

      <section className="onboarding-content onboarding-content--support">
        <div className="onboarding-card onboarding-card--support">
          <div className="onboarding-progress-copy onboarding-progress-copy--topics">Step 2 of 3</div>
          <div
            className="onboarding-progress onboarding-progress--support"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={2}
          >
            <span />
          </div>

          <header className="onboarding-header onboarding-support-header">
            <h1>
              What kind of support
              <br />
              would feel right?
            </h1>
            <p>
              Choose one or more kinds of support that would feel
              <br className="onboarding-desktop-break" /> most helpful right now
            </p>
          </header>

          <div className="onboarding-support-grid" aria-label="Kinds of support">
            {supportOptions.map((option) => {
              const isSelected = selectedSupport.includes(option.label);
              return (
                <button
                  key={option.label}
                  className={`onboarding-support-option${isSelected ? " onboarding-support-option--selected" : ""}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleSupport(option.label)}
                >
                  <span aria-hidden="true">{option.icon}</span>
                  <span>{option.label}</span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>

          <fieldset className="onboarding-connection-fieldset">
            <legend>Who would you prefer to connect with?</legend>
            <p>This helps us match you with someone who feels right for you</p>
            <div className="onboarding-connection-options">
              {connectionOptions.map((option) => (
                <label key={option} className={connectionPreference === option ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="connectionPreference"
                    value={option}
                    checked={connectionPreference === option}
                    onChange={() => setConnectionPreference(option)}
                  />
                  <span aria-hidden="true" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <p className="onboarding-support-help">You can update this later</p>

          <div className="onboarding-topics-actions onboarding-support-actions">
            <Link href="/onboarding/topics">Back</Link>
            <button type="button" onClick={handleContinue}>
              <span>Continue</span>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function SupportIcon({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">{children}</svg>;
}

function HeadphonesIcon() {
  return <SupportIcon><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1ZM20 14h-3v6h2a1 1 0 0 0 1-1Z" /></SupportIcon>;
}

function CommunityIcon() {
  return <SupportIcon><circle cx="12" cy="7" r="3" /><circle cx="5" cy="10" r="2.5" /><circle cx="19" cy="10" r="2.5" /><path d="M7 21v-2a5 5 0 0 1 10 0v2M1.5 20v-1.5A3.5 3.5 0 0 1 5 15h1M22.5 20v-1.5A3.5 3.5 0 0 0 19 15h-1" /></SupportIcon>;
}

function HeartIcon() {
  return <SupportIcon><path d="M20.8 5.7a5.2 5.2 0 0 0-7.4 0L12 7.1l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.9a5.2 5.2 0 0 0 0-7.4Z" /></SupportIcon>;
}

function IdeaIcon() {
  return <SupportIcon><path d="M9 18h6M10 21h4M8.5 15.5A7 7 0 1 1 15.5 15.5L14 18h-4Z" /></SupportIcon>;
}

function PeopleIcon() {
  return <SupportIcon><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 20v-2a5.5 5.5 0 0 1 11 0v2M13.5 20v-1.5a4 4 0 0 1 8 0V20" /></SupportIcon>;
}

function CheckIcon() {
  return <svg className="onboarding-topic-check" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" /><path d="m5.7 10.2 2.7 2.6 5.9-6" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}
