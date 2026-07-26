"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import BrandLogo from "@/components/BrandLogo";

import "./matching.css";

const preferences = [
  { icon: <ChatIcon />, label: "Topics", values: ["Relocation", "Loneliness"] },
  { icon: <PeopleIcon />, label: "Looking for", values: ["Someone to listen"] },
  { icon: <GlobeIcon />, label: "Languages", values: ["English", "Ukrainian"] },
] as const;

const journey = ["Preferences", "Request open", "Someone reaches out", "Conversation"];
type MatchingStatus = "idle" | "searching" | "reachedOut";

export default function MatchingPage() {
  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>("idle");

  return (
    <main className="matching-page">
      <header className="matching-nav">
        <BrandLogo href="/" variant="plain" size="small" className="matching-brand" />

        <nav aria-label="Main navigation">
          <Link className="is-active" href="/matching" aria-current="page">Home</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/onboarding/preferences">Preferences</Link>
        </nav>

        <button className="matching-profile" type="button" aria-label="Open profile menu">
          <span>M</span>
          <ChevronIcon />
        </button>
      </header>

      <div className="matching-shell">
        {matchingStatus === "idle" ? (
          <section className="matching-hero matching-hero--idle">
            <div className="matching-hero-copy">
              <p className="matching-eyebrow">You’re not alone</p>
              <h1>Let someone<br />truly understand</h1>
              <p className="matching-intro">
                Share your story with someone who gets it.<br />
                Connect over similar life challenges,<br />
                anonymously and without pressure.
              </p>
              <button className="matching-primary" type="button" onClick={() => setMatchingStatus("searching")}>
                <span>Find a meaningful match</span>
                <ArrowIcon />
              </button>
            </div>

            <div className="matching-way" aria-hidden="true">
              <Image
                src="/images/matching-hero-lake.png"
                alt=""
                fill
                priority
                sizes="(max-width: 760px) 100vw, 62vw"
              />
            </div>
          </section>
        ) : matchingStatus === "searching" ? (
          <section className="matching-hero matching-hero--active" aria-live="polite">
            <div className="matching-hero-copy matching-active-copy">
              <p className="matching-eyebrow">Taking the next step</p>
              <h1>We’re looking for<br />someone who gets it</h1>
              <p className="matching-intro">
                A thoughtful match can take a little time.<br />
                We’ll let you know when someone feels right.
              </p>
              <div className="matching-active-actions">
                <button className="matching-primary matching-pause" type="button" onClick={() => setMatchingStatus("idle")}>
                  <span>Pause matching</span>
                  <PauseIcon />
                </button>
                <Link href="/onboarding/preferences">Edit preferences</Link>
                <button className="matching-preview-next" type="button" onClick={() => setMatchingStatus("reachedOut")}>
                  Someone reached out
                </button>
              </div>
            </div>

            <div className="matching-way matching-way--active" aria-hidden="true">
              <Image
                src="/images/matching_search_way.png"
                alt=""
                fill
                priority
                sizes="(max-width: 760px) 100vw, 62vw"
              />
            </div>
          </section>
        ) : (
          <section className="matching-hero matching-hero--reached" aria-live="polite">
            <div className="matching-reached-visual">
              <Image
                src="/images/matching_reached_out_lake.png"
                alt="Watercolor lake surrounded by pine trees and mountains"
                fill
                priority
                sizes="(max-width: 760px) 82vw, 38vw"
              />
            </div>

            <div className="matching-hero-copy matching-reached-copy">
              <p className="matching-eyebrow">Someone reached out</p>
              <h1>Quiet Pine sent you <br />a kind message</h1>
              <blockquote>
                <span aria-hidden="true">“</span>
                <p>Hi. I’ve been through something similar<br />and would be glad to listen.</p>
              </blockquote>
              <p className="matching-reached-note">There’s no pressure to reply right away.</p>
              <div className="matching-reached-actions">
                <Link className="matching-primary" href="/messages/quiet-pine">
                  <span>Read and reply</span>
                  <ArrowIcon />
                </Link>
                <button type="button" onClick={() => setMatchingStatus("searching")}>Not right now</button>
              </div>
            </div>
          </section>
        )}

        {matchingStatus !== "reachedOut" ? (
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
                <li className={index === 0 ? "is-complete" : matchingStatus === "searching" && index === 1 ? "is-current" : ""} key={step}>
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
            <span className="matching-safety-circles" aria-hidden="true">
              <span />
              <span />
            </span>
          </article>
          </section>
        ) : (
          <section className="matching-grid matching-grid--reached" aria-label="Your new connection overview">
            <article className="matching-card matching-understand">
              <h2>Why this person may understand</h2>
              <ul>
                <li><span aria-hidden="true"><TagIcon /></span><p><strong>Shared topic:</strong> Relocation</p></li>
                <li><span aria-hidden="true"><PersonIcon /></span><p><strong>They’ve experienced loneliness<br />during a move</strong></p></li>
                <li><span aria-hidden="true"><GlobeIcon /></span><p><strong>Language:</strong> English</p></li>
                <li><span aria-hidden="true"><HandsIcon /></span><p>Looking to listen, not judge</p></li>
              </ul>
            </article>

            <article className="matching-card matching-journey matching-journey--reached">
              <h2>Your connection journey</h2>
              <ol>
                {journey.map((step, index) => (
                  <li className={index < 2 ? "is-complete" : index === 2 ? "is-current" : ""} key={step}>
                    <span>{index < 2 ? <CheckIcon /> : index + 1}</span>
                    <small><b>{index + 1}</b>{step}</small>
                  </li>
                ))}
              </ol>
              <p>Take your time.<br />You choose what happens next.</p>
            </article>

            <article className="matching-card matching-safety matching-no-pressure">
              <h2>No pressure</h2>
              <ul>
                <li>You can read the message later.</li>
                <li>You do not need to respond immediately.</li>
                <li>You can choose not to continue.</li>
              </ul>
            </article>
          </section>
        )}

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
function PauseIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 6h4v12H7zM14 6h4v12h-4z" /></svg>; }
function ChevronIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 8 4 4 4-4" /></svg>; }
function TagIcon() { return <Icon><path d="m4 13 9-9h6v6l-9 9-6-6Z" /><circle cx="16" cy="7" r="1" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>; }
function HandsIcon() { return <Icon><path d="M12 21V11M12 16 7 11a2 2 0 0 0-3 3l5 5M12 16l5-5a2 2 0 0 1 3 3l-5 5M8 9 6 7a2 2 0 0 1 3-3l3 3 3-3a2 2 0 0 1 3 3l-2 2" /></Icon>; }
