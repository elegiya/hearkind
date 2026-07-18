"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

import "./onboarding.css";

const benefits = [
  {
    title: "Anonymous by default",
    description: "You choose what others can see",
    icon: <AnonymousIcon />,
  },
  {
    title: "Matched by shared experience",
    description: "We look for real context, not random conversations",
    icon: <MatchIcon />,
  },
  {
    title: "Editable anytime",
    description: "Update your answers whenever you need",
    icon: <EditIcon />,
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="onboarding-page onboarding-page--intro">
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
          className="onboarding-illustration onboarding-illustration--intro"
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

      <section className="onboarding-content onboarding-content--intro">
        <div className="onboarding-card onboarding-card--intro">
          <p className="onboarding-intro-eyebrow">Before we begin</p>

          <header className="onboarding-header onboarding-intro-header">
            <h1>
              Let’s find someone
              <br />
              who gets it
            </h1>
            <p>
              Answer a few gentle questions so we can understand
              <br className="onboarding-desktop-break" /> what kind of support
              feels right for you
            </p>
          </header>

          <ul className="onboarding-intro-benefits">
            {benefits.map((benefit) => (
              <li key={benefit.title}>
                <span className="onboarding-intro-benefit-icon" aria-hidden="true">
                  {benefit.icon}
                </span>
                <span>
                  <strong>{benefit.title}</strong>
                  <small>{benefit.description}</small>
                </span>
              </li>
            ))}
          </ul>

          <Link className="onboarding-intro-start" href="/onboarding/topics">
            <span>Get started</span>
            <ArrowIcon />
          </Link>

          <div className="onboarding-intro-meta">
            <span><ClockIcon />About 2 minutes</span>
            <i aria-hidden="true">•</i>
            <span><LockIcon />Private by default</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function BenefitIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      {children}
    </svg>
  );
}

function AnonymousIcon() {
  return <BenefitIcon><circle cx="10" cy="7" r="3.5" /><path d="M4.5 18.5v-2a5.5 5.5 0 0 1 11 0v2M15 14h5v6h-5zM16.5 14v-1.5a1 1 0 0 1 2 0V14" /></BenefitIcon>;
}

function MatchIcon() {
  return <BenefitIcon><circle cx="7" cy="10" r="3" /><circle cx="17" cy="10" r="3" /><path d="M2.5 20v-1.4A4.6 4.6 0 0 1 7 14h0a4.6 4.6 0 0 1 4.5 4.6V20M12.5 20v-1.4A4.6 4.6 0 0 1 17 14h0a4.6 4.6 0 0 1 4.5 4.6V20M9.5 5.5 12 3l2.5 2.5" /></BenefitIcon>;
}

function EditIcon() {
  return <BenefitIcon><path d="M13 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="m10 14 1-.2L20 5a2.1 2.1 0 0 0-3-3l-8.8 9-.2 3Z" /></BenefitIcon>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

function ClockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}
