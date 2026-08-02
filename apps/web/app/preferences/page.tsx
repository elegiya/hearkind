"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AppNavigation from "@/components/AppNavigation";

import "./preferences.css";

const sections = [
  {
    title: "Topics you relate to",
    description: "These experiences help others understand what you’re going through.",
    icon: <ChatIcon />,
    tags: ["Relocation", "Loneliness", "Burnout", "Starting over"],
  },
  {
    title: "What you’re looking for in a conversation",
    description: "The kind of connection that feels helpful right now.",
    icon: <PeopleIcon />,
    tags: ["Someone to listen", "Shared experience", "Mutual conversation", "Gentle advice"],
  },
  {
    title: "Languages",
    description: "The languages you’re comfortable connecting in.",
    icon: <GlobeIcon />,
    tags: ["English", "Ukrainian"],
  },
] as const;

export default function PreferencesPage() {
  const [introductionsPaused, setIntroductionsPaused] = useState(false);

  return (
    <main className="preferences-page">
      <AppNavigation />

      <div className="preferences-landscape" aria-hidden="true">
        <Image src="/images/matching-hero-lake.png" alt="" fill priority sizes="100vw" />
      </div>

      <div className="preferences-content">
        <header className="preferences-heading">
          <h1>Your preferences</h1>
          <p>These preferences help us connect you with people<br />who might understand.</p>
        </header>

        <div className="preferences-layout">
          <section className="preferences-main-card" aria-label="Your connection preferences">
            {sections.map((section) => (
              <article className="preferences-row" key={section.title}>
                <span className="preferences-row-icon">{section.icon}</span>
                <div className="preferences-row-copy">
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                  <div className="preferences-tags">{section.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <Link href="/onboarding/preferences">Edit</Link>
              </article>
            ))}

            <article className="preferences-row preferences-row--details">
              <span className="preferences-row-icon"><PersonIcon /></span>
              <div className="preferences-row-copy">
                <h2>Connection preferences</h2>
                <p>Control who can reach out to you and how often.</p>
                <dl><div><dt><MailIcon />Others may reach out to me</dt><dd>You’re open to receiving introductions.</dd></div><div><dt><ClockSmallIcon />Up to 3 requests per day</dt><dd>You can change this anytime.</dd></div></dl>
              </div>
              <Link href="/onboarding/preferences">Edit</Link>
            </article>

            <article className="preferences-row preferences-row--details">
              <span className="preferences-row-icon"><ClockIcon /></span>
              <div className="preferences-row-copy"><h2>Availability</h2><p>When you’re open to new conversations.</p><strong>Usually available in the evenings</strong><small>Your timezone: Europe/Vilnius</small></div>
              <Link href="/onboarding/preferences">Edit</Link>
            </article>

            <article className="preferences-row preferences-row--details">
              <span className="preferences-row-icon"><BellIcon /></span>
              <div className="preferences-row-copy"><h2>Notifications</h2><p>Choose how you’d like to stay updated.</p><strong>Email notifications on</strong><small>You’ll be notified about new introductions and messages.</small></div>
              <Link href="/onboarding/preferences">Edit</Link>
            </article>
          </section>

          <aside className="preferences-aside" aria-label="Safety and support">
            <article className="preferences-side-card preferences-side-card--safety">
              <h2><span><ShieldIcon /></span>Safety comes first</h2>
              <p>You’re always in control.<br />You can pause new introductions,<br />block or report anyone,<br />and end conversations at any time.</p>
              <Link href="/safety">See safety tips <ArrowIcon /></Link>
            </article>
            <article className="preferences-side-card">
              <h2><span className="is-heart"><HeartIcon /></span>Take a break anytime</h2>
              <p>Pause new introductions whenever<br />you need some time for yourself.</p>
              <button className={introductionsPaused ? "is-paused" : ""} type="button" onClick={() => setIntroductionsPaused((value) => !value)}>{introductionsPaused ? "Resume introductions" : "Pause new introductions"}</button>
            </article>
            <article className="preferences-side-card">
              <h2><span><PeopleIcon /></span>You’re not alone</h2>
              <p>HearKind is a space for kind,<br />respectful and anonymous<br />conversations.</p>
              <Link href="/">Learn more about HearKind <ArrowIcon /></Link>
            </article>
            <article className="preferences-side-card">
              <h2><span><ChatIcon /></span>Have feedback?</h2>
              <p>We’re always improving HearKind<br />with your help.</p>
              <Link href="mailto:hello@hearkind.app">Share feedback <ArrowIcon /></Link>
            </article>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /></Icon>; }
function PeopleIcon() { return <Icon><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 15a5 5 0 0 1 6 5" /></Icon>; }
function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>; }
function MailIcon() { return <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>; }
function ClockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></Icon>; }
function ClockSmallIcon() { return <ClockIcon />; }
function BellIcon() { return <Icon><path d="M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17Z" /><path d="M10 20h4" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function ArrowIcon() { return <Icon><path d="M5 12h14m-5-5 5 5-5 5" /></Icon>; }
