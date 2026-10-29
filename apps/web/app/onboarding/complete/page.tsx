"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

import "../onboarding.css";

const completionBenefits = [
  {
    title: "A safe space",
    description: "Private by default, thoughtful by design",
    icon: <ShieldHeartIcon />,
  },
  {
    title: "Start with text",
    description: "Every connection begins with private text chat",
    icon: <ChatIcon />,
  },
  {
    title: "Your answers stay flexible",
    description: "You can update your preferences anytime",
    icon: <EditIcon />,
  },
];

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleFindMatch() {
    window.sessionStorage.setItem("hearkind-onboarding-complete", "true");
    router.push("/");
  }

  return (
    <main className="onboarding-page onboarding-page--complete">
      <svg className="onboarding-clip-definitions" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="onboarding-visual-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 H 0.84 C 0.83 0.12, 0.83 0.23, 0.845 0.34 C 0.858 0.44, 0.86 0.49, 0.86 0.55 C 0.86 0.65, 0.85 0.74, 0.835 0.83 C 0.82 0.91, 0.82 0.96, 0.81 1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <section className="onboarding-visual" aria-label="A peaceful path through the mountains">
        <Image
          src="/images/landscape.png"
          alt="A warm watercolor landscape with a path through the mountains"
          fill
          priority
          sizes="56vw"
          className="onboarding-illustration onboarding-illustration--complete"
        />
        <BrandLogo href="/" variant="pill" size="small" className="onboarding-logo" />
      </section>

      <svg className="onboarding-divider-wave" viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 56 C165 -26 342 7 505 66 C690 133 843 36 1000 82 V150 H0 Z" />
      </svg>

      <button className="onboarding-sign-out" type="button" disabled={isSigningOut} onClick={handleSignOut}>
        {isSigningOut ? "Signing out…" : "Sign out"}
      </button>

      <section className="onboarding-content onboarding-content--complete">
        <div className="onboarding-card onboarding-card--complete">
          <header className="onboarding-header onboarding-complete-header">
            <h1>You’re ready</h1>
            <p>
              We’ll use your answers to help you find someone
              <br className="onboarding-desktop-break" /> who truly understands what you’re going through
            </p>
          </header>

          <ul className="onboarding-complete-benefits">
            {completionBenefits.map((benefit) => (
              <li key={benefit.title}>
                <span className="onboarding-complete-benefit-icon">{benefit.icon}</span>
                <span>
                  <strong>{benefit.title}</strong>
                  <small>{benefit.description}</small>
                </span>
              </li>
            ))}
          </ul>

          <button className="onboarding-find-match" type="button" onClick={handleFindMatch}>
            <span>Find my match</span>
            <ArrowIcon />
          </button>
          <p className="onboarding-complete-note">You can still review or update your preferences later</p>
          <Link className="onboarding-complete-back" href="/onboarding/preferences">Back</Link>
        </div>
      </section>
    </main>
  );
}

function ShieldHeartIcon() {
  return <svg viewBox="0 0 48 56" fill="none" stroke="currentColor" aria-hidden="true"><path d="M24 2 44 10v16c0 13-8 22-20 28C12 48 4 39 4 26V10Z" /><path d="M24 35s-9-5.2-9-11.1c0-5.3 6.6-7.2 9-2.8 2.4-4.4 9-2.5 9 2.8C33 29.8 24 35 24 35Z" fill="currentColor" stroke="none" /></svg>;
}

function ChatIcon() {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden="true"><path d="M42 22c0 9.4-8.1 17-18 17-2.9 0-5.7-.7-8.1-1.8L6 42l3.6-9C7.3 30 6 26.2 6 22 6 12.6 14.1 5 24 5s18 7.6 18 17Z" /><path d="M17 22h.01M24 22h.01M31 22h.01" /></svg>;
}

function EditIcon() {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden="true"><path d="m8 35 3-10L31 5l8 8-20 20-11 2Z" /><path d="m27 9 8 8M8 40h32" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}
