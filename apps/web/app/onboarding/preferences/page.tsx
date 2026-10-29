"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

import "../onboarding.css";

const initialLanguages = ["English", "Ukrainian", "Spanish", "German", "Russian"];
const availabilityOptions = ["Morning", "Afternoon", "Evening", "Weekends", "Flexible"];

export default function OnboardingPreferencesPage() {
  const router = useRouter();
  const [languages, setLanguages] = useState(initialLanguages);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  function toggleItem(value: string, values: string[], setValues: (items: string[]) => void) {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function addLanguage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const language = newLanguage.trim();
    if (!language) return;

    if (!languages.some((item) => item.toLowerCase() === language.toLowerCase())) {
      setLanguages((current) => [...current, language]);
    }
    setSelectedLanguages((current) =>
      current.some((item) => item.toLowerCase() === language.toLowerCase())
        ? current
        : [...current, language],
    );
    setNewLanguage("");
    setShowLanguageInput(false);
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleContinue() {
    window.sessionStorage.setItem(
      "hearkind-onboarding-preferences",
      JSON.stringify({ languages: selectedLanguages, availability }),
    );
    router.push("/onboarding/complete");
  }

  return (
    <main className="onboarding-page onboarding-page--preferences">
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
          className="onboarding-illustration onboarding-illustration--preferences"
        />
        <BrandLogo href="/" variant="pill" size="small" className="onboarding-logo" />
      </section>

      <svg className="onboarding-divider-wave" viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 56 C165 -26 342 7 505 66 C690 133 843 36 1000 82 V150 H0 Z" />
      </svg>

      <button className="onboarding-sign-out" type="button" disabled={isSigningOut} onClick={handleSignOut}>
        {isSigningOut ? "Signing out…" : "Sign out"}
      </button>

      <section className="onboarding-content onboarding-content--preferences">
        <div className="onboarding-card onboarding-card--preferences">
          <div className="onboarding-progress-copy onboarding-progress-copy--topics">Step 3 of 3</div>
          <div
            className="onboarding-progress onboarding-progress--preferences"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={3}
          >
            <span />
          </div>

          <header className="onboarding-header onboarding-preferences-header">
            <h1>
              How would you like to
              <br />
              connect?
            </h1>
            <p>
              Choose the preferences that will help us find a
              <br className="onboarding-desktop-break" /> comfortable match for you
            </p>
          </header>

          <section className="onboarding-preference-section">
            <h2>Languages you’re comfortable using</h2>
            <p>Choose one or more</p>
            <div className="onboarding-preference-pills">
              {languages.map((language) => {
                const isSelected = selectedLanguages.includes(language);
                return (
                  <button
                    key={language}
                    type="button"
                    className={isSelected ? "is-selected" : ""}
                    aria-pressed={isSelected}
                    onClick={() => toggleItem(language, selectedLanguages, setSelectedLanguages)}
                  >
                    {language}
                    {isSelected && <CheckIcon />}
                  </button>
                );
              })}
              {!showLanguageInput && (
                <button className="onboarding-add-language" type="button" onClick={() => setShowLanguageInput(true)}>
                  + Add language
                </button>
              )}
            </div>
            {showLanguageInput && (
              <form className="onboarding-language-form" onSubmit={addLanguage}>
                <input
                  value={newLanguage}
                  onChange={(event) => setNewLanguage(event.target.value)}
                  placeholder="Language"
                  aria-label="Add a language"
                  autoFocus
                />
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowLanguageInput(false)}>Cancel</button>
              </form>
            )}
          </section>

          <section className="onboarding-preference-section onboarding-availability-section">
            <h2>When are you usually available?</h2>
            <p>Optional</p>
            <div className="onboarding-preference-pills">
              {availabilityOptions.map((option) => {
                const isSelected = availability.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    className={isSelected ? "is-selected" : ""}
                    aria-pressed={isSelected}
                    onClick={() => toggleItem(option, availability, setAvailability)}
                  >
                    {option}
                    {isSelected && <CheckIcon />}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="onboarding-private-note">
            <ShieldChatIcon />
            <span>
              <strong>Private text first</strong>
              <small>All conversations begin with private text chat. A call becomes available later only if both people agree.</small>
            </span>
          </div>

          <div className="onboarding-topics-actions onboarding-preferences-actions">
            <Link href="/onboarding/support">Back</Link>
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

function CheckIcon() {
  return <svg className="onboarding-pill-check" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" /><path d="m5.7 10.2 2.7 2.6 5.9-6" /></svg>;
}

function ShieldChatIcon() {
  return <svg viewBox="0 0 48 56" fill="none" stroke="currentColor" aria-hidden="true"><path d="M24 2 44 10v16c0 13-8 22-20 28C12 48 4 39 4 26V10Z" /><path d="M15 19h18v13H22l-6 5v-5h-1Z" /><path d="M20 25h.01M24 25h.01M28 25h.01" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}
