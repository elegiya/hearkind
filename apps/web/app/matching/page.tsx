import Image from "next/image";
import Link from "next/link";

import BrandLogo from "@/components/BrandLogo";

import "./matching.css";

const preferences = [
  { icon: <ChatIcon />, label: "Topics", values: ["Relocation", "Loneliness"] },
  { icon: <PeopleIcon />, label: "Looking for", values: ["Someone to listen"] },
  { icon: <GlobeIcon />, label: "Languages", values: ["English", "Ukrainian"] },
] as const;

const journey = ["Preferences", "Request open", "Someone reaches out", "Conversation"];

export default function MatchingPage() {
  return (
    <main className="matching-page">
      <header className="matching-nav">
        <BrandLogo href="/" variant="plain" size="medium" className="matching-brand" />

        <nav aria-label="Main navigation">
          <Link className="is-active" href="/matching" aria-current="page">Home</Link>
          <Link href="#messages">Messages</Link>
          <Link href="/onboarding/preferences">Preferences</Link>
        </nav>

        <button className="matching-profile" type="button" aria-label="Open profile menu">
          <span>M</span>
          <ChevronIcon />
        </button>
      </header>

      <div className="matching-shell">
        <section className="matching-hero">
          <div className="matching-hero-copy">
            <p className="matching-eyebrow">You’re not alone</p>
            <h1>Let someone<br />reach out</h1>
            <p className="matching-intro">
              Share as much or as little as feels comfortable. Someone who understands
              may reach out when you’re ready.
            </p>
            <button className="matching-primary" type="button">
              <span>Open a conversation</span>
              <ArrowIcon />
            </button>
          </div>

          <div className="matching-way" aria-hidden="true">
            <Image
              src="/images/matching_start_way.png"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 100vw, 62vw"
            />
          </div>
        </section>

        <section className="matching-grid" aria-label="Your matching overview">
          <article className="matching-card matching-preferences">
            <div className="matching-card-heading">
              <h2>Your preferences</h2>
              <Link href="/onboarding/preferences">Edit</Link>
            </div>
            <div className="matching-preference-list">
              {preferences.map((preference) => (
                <div className="matching-preference-row" key={preference.label}>
                  <span className="matching-round-icon" aria-hidden="true">{preference.icon}</span>
                  <strong>{preference.label}</strong>
                  <div className="matching-tags">
                    {preference.values.map((value) => <span key={value}>{value}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="matching-card matching-journey">
            <h2>Your connection journey</h2>
            <ol>
              {journey.map((step, index) => (
                <li className={index === 0 ? "is-complete" : ""} key={step}>
                  <span>{index === 0 ? <CheckIcon /> : index + 1}</span>
                  <small>{step}</small>
                </li>
              ))}
            </ol>
            <p>
              You’ve completed your preferences.<br />
              Open a conversation whenever<br />
              you feel ready.
            </p>
          </article>

          <article className="matching-card matching-safety">
            <div className="matching-card-heading matching-safety-heading">
              <span className="matching-heart-icon" aria-hidden="true"><HeartIcon /></span>
              <h2>Safety note</h2>
            </div>
            <p>You’re always in control. You can pause a request or leave a conversation at any time.</p>
            <ul>
              <li>Your conversations are private and anonymous.</li>
              <li>Be kind to yourself and set your own pace.</li>
              <li>You can block or report at any time.</li>
            </ul>
            <Image
              src="/images/hero-chair.png"
              alt="A comfortable chair beside a warm drink"
              width={360}
              height={310}
              className="matching-chair"
            />
          </article>
        </section>

        <footer className="matching-footer-note">
          <span aria-hidden="true"><HeartIcon /></span>
          <p><strong>Private. Safe. Human.</strong><small>Your story stays yours.</small></p>
        </footer>
      </div>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">{children}</svg>;
}

function ChatIcon() { return <Icon><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></Icon>; }
function PeopleIcon() { return <Icon><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 15a5 5 0 0 1 6 5" /></Icon>; }
function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function CheckIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 10 3.2 3.2L15 6.5" /></svg>; }
function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>; }
function ChevronIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 8 4 4 4-4" /></svg>; }
