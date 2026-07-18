"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

import "../onboarding.css";

const topics = [
  { label: "Burnout", icon: <BurnoutIcon /> },
  { label: "Anxiety", icon: <AnxietyIcon /> },
  { label: "Loneliness", icon: <PersonIcon /> },
  { label: "Relocation", icon: <PinIcon /> },
  { label: "Layoff", icon: <BriefcaseIcon /> },
  { label: "Relationships", icon: <HeartIcon /> },
  { label: "Grief", icon: <LeafIcon /> },
  { label: "Other", icon: <MoreIcon /> },
] as const;

const MAX_TOPICS = 3;

export default function OnboardingTopicsPage() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  function toggleTopic(topic: string) {
    setSelectionError(null);

    if (selectedTopics.includes(topic)) {
      setSelectedTopics((current) =>
        current.filter((item) => item !== topic),
      );
      return;
    }

    if (selectedTopics.length >= MAX_TOPICS) {
      setSelectionError("Choose up to 3 topics");
      return;
    }

    setSelectedTopics((current) => [...current, topic]);
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleContinue() {
    window.sessionStorage.setItem(
      "hearkind-onboarding-topics",
      JSON.stringify({ topics: selectedTopics, note: note.trim() }),
    );
    router.push("/onboarding/support");
  }

  return (
    <main className="onboarding-page onboarding-page--topics">
      <svg
        className="onboarding-clip-definitions"
        width="0"
        height="0"
        aria-hidden="true"
      >
        <defs>
          <clipPath
            id="onboarding-visual-clip"
            clipPathUnits="objectBoundingBox"
          >
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
          className="onboarding-illustration onboarding-illustration--topics"
        />

        <BrandLogo
          href="/"
          variant="pill"
          size="medium"
          className="onboarding-logo onboarding-logo--pill"
        />
      </section>

      <svg
        className="onboarding-divider-wave"
        viewBox="0 0 1000 150"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
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

      <section className="onboarding-content onboarding-content--topics">
        <div className="onboarding-card onboarding-card--topics">
          <div className="onboarding-progress-copy onboarding-progress-copy--topics">
            Step 1 of 3
          </div>
          <div
            className="onboarding-progress onboarding-progress--topics"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={1}
          >
            <span />
          </div>

          <header className="onboarding-header onboarding-topics-header">
            <h1>
              What would you like
              <br />
              to talk about?
            </h1>
            <p>
              Choose up to 3 topics. Share as much or as little
              <br className="onboarding-desktop-break" /> as feels comfortable
            </p>
          </header>

          <div className="onboarding-topic-grid" aria-label="Support topics">
            {topics.map((topic) => {
              const isSelected = selectedTopics.includes(topic.label);

              return (
                <button
                  key={topic.label}
                  className={`onboarding-topic-card${isSelected ? " onboarding-topic-card--selected" : ""}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleTopic(topic.label)}
                >
                  <span aria-hidden="true">{topic.icon}</span>
                  <span>{topic.label}</span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>

          {selectionError && (
            <p className="onboarding-selection-error" role="alert">
              {selectionError}
            </p>
          )}

          <label className="onboarding-note onboarding-note--topics">
            <span>Is there anything else you’d like your match to understand?</span>
            <textarea
              placeholder="Write a short note if you'd like..."
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <small>Optional · Only used to improve your match</small>
          </label>

          <div className="onboarding-topics-actions">
            <Link href="/onboarding">Back</Link>
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

function TopicIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      {children}
    </svg>
  );
}

function BurnoutIcon() {
  return <TopicIcon><path d="M12 3 9.8 5.1 7 4.7l-.8 2.7L3.7 8.8l1.1 2.6L3.7 14l2.5 1.4.8 2.7 2.8-.4L12 20l2.2-2.3 2.8.4.8-2.7 2.5-1.4-1.1-2.6 1.1-2.6-2.5-1.4-.8-2.7-2.8.4Z" /></TopicIcon>;
}

function AnxietyIcon() {
  return <TopicIcon><path d="M12 21c0-5.2-4.4-5.3-4.4-9.4 0-2.3 1.7-4.1 4.4-8.6 2.7 4.5 4.4 6.3 4.4 8.6 0 4.1-4.4 4.2-4.4 9.4ZM3.5 18c3.7-1.1 5.2-3.2 5.2-6.3M20.5 18c-3.7-1.1-5.2-3.2-5.2-6.3" /></TopicIcon>;
}

function PersonIcon() {
  return <TopicIcon><circle cx="12" cy="7" r="4" /><path d="M5.5 21v-2.2a6.5 6.5 0 0 1 13 0V21" /></TopicIcon>;
}

function PinIcon() {
  return <TopicIcon><path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></TopicIcon>;
}

function BriefcaseIcon() {
  return <TopicIcon><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></TopicIcon>;
}

function HeartIcon() {
  return <TopicIcon><path d="M20.8 5.7a5.2 5.2 0 0 0-7.4 0L12 7.1l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.9a5.2 5.2 0 0 0 0-7.4Z" /></TopicIcon>;
}

function LeafIcon() {
  return <TopicIcon><path d="M20 4C10 4 5 9 6 17c8 1 13-4 14-13Z" /><path d="M5 21c2-6 6-9 12-13" /></TopicIcon>;
}

function MoreIcon() {
  return <TopicIcon><circle cx="12" cy="12" r="9" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></TopicIcon>;
}

function CheckIcon() {
  return (
    <svg className="onboarding-topic-check" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="m5.7 10.2 2.7 2.6 5.9-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}
