"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AppNavigation from "@/components/AppNavigation";

import "./matching.css";

const preferences = [
  { icon: <ChatIcon />, label: "Topics", values: ["Relocation", "Loneliness"] },
  { icon: <PeopleIcon />, label: "Looking for", values: ["Someone to listen"] },
  { icon: <GlobeIcon />, label: "Languages", values: ["English", "Ukrainian"] },
] as const;

type MatchingStatus = "idle" | "searching" | "reachedOut";

export default function MatchingPage() {
  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>("idle");

  return (
    <main className="matching-page">
      <AppNavigation active="home" overlay />

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
              <div className="matching-home-actions">
                <button className="matching-primary" type="button" onClick={() => setMatchingStatus("searching")}>
                  <span>Share what’s going on</span>
                  <ArrowIcon />
                </button>
                <Link className="matching-support-action" href="/requests">
                  <HeartIcon />
                  <span>Support someone</span>
                </Link>
              </div>
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
              <h1>Your support request<br />is open</h1>
              <p className="matching-intro">
                People who relate can reach out in their own time.<br />
                You decide who you’d like to talk with.
              </p>
              <div className="matching-active-actions">
                <button className="matching-primary matching-pause" type="button" onClick={() => setMatchingStatus("idle")}>
                  <span>Pause matching</span>
                  <PauseIcon />
                </button>
                <Link href="/preferences">Edit preferences</Link>
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

        <HomeDashboard status={matchingStatus} />

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
function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>; }
function PauseIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 6h4v12H7zM14 6h4v12h-4z" /></svg>; }

function HomeDashboard({ status }: { status: MatchingStatus }) {
  const hasRequest = status !== "idle";
  const hasMessages = status === "reachedOut";
  const hasSupportMatches = status !== "idle";

  if (!hasRequest && !hasMessages) {
    return (
      <section className="home-dashboard-section home-dashboard-section--setup" aria-labelledby="home-setup-title">
        <SectionHeading
          id="home-setup-title"
          title="Your HearKind setup"
          description="Set your preferences, understand the flow, and stay in control."
        />
        <div className="home-secondary-grid home-secondary-grid--empty">
          <PreferencesCard />
          <HowItWorksCard />
          <SafetyCard />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="home-dashboard-section home-dashboard-section--attention" aria-labelledby="home-attention-title">
        <SectionHeading
          id="home-attention-title"
          title="What needs your attention"
          description="Continue a conversation, check your request, or support someone new."
        />
        <div className={`home-action-grid${hasMessages ? " has-all" : ""}`}>
          {hasRequest && <RequestsDashboardCard />}
          {hasMessages && <MessagesDashboardCard />}
          {hasSupportMatches && <SupportDashboardCard />}
        </div>
      </section>
      <section className="home-dashboard-section home-dashboard-section--setup" aria-labelledby="home-setup-title">
        <SectionHeading
          id="home-setup-title"
          title="Your HearKind setup"
          description="Your preferences, how matching works, and the safety controls around you."
        />
        <div className="home-secondary-grid">
          <PreferencesCard />
          <HowItWorksCard />
          <SafetyCard />
        </div>
      </section>
    </>
  );
}

function SectionHeading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <header className="home-section-heading">
      <div>
        <h2 id={id}>{title}</h2>
        <span>{description}</span>
      </div>
      <i aria-hidden="true" />
    </header>
  );
}

function DashboardHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge: string }) { return <header className="home-dashboard-header"><span>{icon}</span><h2>{title}</h2><b>{badge}</b></header>; }
function RequestsDashboardCard() { return <article className="home-dashboard-card"><DashboardHeader icon={<ChatIcon />} title="Your requests" badge="1 active" /><div className="home-request-item"><Image src="/images/matching_reached_out_lake.png" alt="" width={46} height={46} /><p><strong>Relocation &amp; loneliness</strong><small>Open · 2 people reached out</small><em>Expires in 2 days</em></p><span>›</span></div><Link href="/requests">See all requests <ArrowIcon /></Link></article>; }
function MessagesDashboardCard() { return <article className="home-dashboard-card home-dashboard-card--priority"><DashboardHeader icon={<ChatIcon />} title="New messages" badge="1 new" /><div className="home-message-item"><Image src="/images/matching_reached_out_lake.png" alt="" width={42} height={42} /><p><strong>Quiet Pine</strong><small>Hi, I relate to what you shared<br />about starting over.</small></p><time>10m ago</time></div><div className="home-message-item"><Image src="/images/matching_start_way.png" alt="" width={42} height={42} /><p><strong>Soft Willow</strong><small>Thanks for reaching out.<br />I’d love to hear more.</small></p><time>2h ago</time></div><Link href="/messages">Go to messages <ArrowIcon /></Link></article>; }
function SupportDashboardCard() { return <article className="home-dashboard-card"><DashboardHeader icon={<PeopleIcon />} title="People looking for support" badge="3 matches" /><ul className="home-support-list"><li><Image src="/images/matching_reached_out_lake.png" alt="" width={32} height={32} />Feeling isolated in a new place</li><li><Image src="/images/matching_start_way.png" alt="" width={32} height={32} />Overthinking everything lately</li><li><Image src="/images/matching_search_way.png" alt="" width={32} height={32} />Burned out and running on empty</li></ul><Link href="/requests">See requests <ArrowIcon /></Link></article>; }
function PreferencesCard() { return <article className="home-secondary-card home-preferences-card"><div className="matching-card-heading"><h2>Your preferences</h2><Link href="/preferences">Edit</Link></div><div className="matching-preference-list">{preferences.map((preference) => <div className="matching-preference-row" key={preference.label}><span className="matching-round-icon">{preference.icon}</span><strong>{preference.label}</strong><div className="matching-tags">{preference.values.map((value) => <span key={value}>{value}</span>)}</div></div>)}</div></article>; }
function SafetyCard() { return <article className="home-secondary-card home-safety-card"><div className="matching-safety-heading"><span className="matching-heart-icon"><HeartIcon /></span><h2>Safety note</h2></div><p>You’re always in control. You can pause a request or leave a conversation at any time.</p><ul><li>Conversations are private</li><li>Be kind and set your own pace</li><li>You can block or report</li></ul></article>; }
function HowItWorksCard() { return <article className="home-secondary-card home-how-card"><h2>How HearKind works</h2><ol><li><span>1</span><small>Preferences</small></li><li><span>2</span><small>Request open</small></li><li><span>3</span><small>Someone reaches out</small></li><li><span>4</span><small>Conversation</small></li></ol><p>You’re in control at every step.<br />Pause or end a conversation anytime.</p></article>; }
