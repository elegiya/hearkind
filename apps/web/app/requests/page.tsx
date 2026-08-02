"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

import AppNavigation from "@/components/AppNavigation";
import { requestConfig } from "@/lib/requests/config";

import "./requests.css";

type Tab = "mine" | "others";
type RequestState = "open" | "closed";
type SupportRequest = { id: number; title: string; topics: string[]; excerpt: string; full: string; language: string; availability: string; support: string; timezone: string; image: string; state: RequestState; fresh?: boolean };

const supportRequests: SupportRequest[] = [
  { id: 1, title: "Relocation & loneliness", topics: ["Relocation", "Loneliness"], excerpt: "Moved to a new country two years ago and still feel very alone.", full: "I moved to a new country two years ago for work. People are kind, but I still feel very alone most days. I miss having someone who truly understands what it’s like to start over. I’d love to talk to someone who’s been through this too.", language: "English", availability: "Evenings or weekends", support: "Someone to listen", timezone: "GMT+1 · Central Europe", image: "/images/matching_reached_out_lake.png", state: "open" },
  { id: 2, title: "Overthinking everything lately", topics: ["Anxiety", "Overthinking"], excerpt: "My mind won’t stop racing and I’m struggling to find clarity.", full: "My thoughts have been racing for weeks and it’s becoming hard to rest. I’d appreciate a calm conversation with someone who understands overthinking.", language: "English", availability: "Afternoons", support: "Help me think it through", timezone: "Europe", image: "/images/matching_start_way.png", state: "open" },
  { id: 3, title: "Burned out and running on empty", topics: ["Burnout", "Work life"], excerpt: "Work has been nonstop and I’m mentally exhausted.", full: "Work has been nonstop for months and I feel completely depleted. I’m looking for gentle understanding from someone who has found a way through burnout.", language: "English", availability: "Mornings", support: "Shared experience", timezone: "Asia Pacific", image: "/images/matching_search_way.png", state: "open", fresh: true },
  { id: 4, title: "Missing home", topics: ["Loneliness", "Homesickness"], excerpt: "It’s hard to feel at home anywhere lately.", full: "I’ve been away from home longer than expected and the loneliness is catching up with me. I mostly need someone to listen.", language: "Ukrainian", availability: "Evenings", support: "Someone to listen", timezone: "Europe", image: "/images/landscape-login.png", state: "closed" },
];

export default function RequestsPage() {
  const [tab, setTab] = useState<Tab>("others");
  const [selectedId, setSelectedId] = useState(1);
  const [browseFilter, setBrowseFilter] = useState<"recommended" | "newest" | "saved">("recommended");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [requestPaused, setRequestPaused] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [firstMessage, setFirstMessage] = useState("");
  const [offerSent, setOfferSent] = useState(false);

  const selected = supportRequests.find((item) => item.id === selectedId) ?? supportRequests[0];
  const browseRequests = browseFilter === "saved" ? supportRequests.filter((item) => savedIds.includes(item.id)) : browseFilter === "newest" ? [...supportRequests].reverse().filter((item) => item.state === "open") : supportRequests.filter((item) => item.state === "open");

  function sendOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firstMessage.trim() || selected.state === "closed") return;
    setOfferSent(true);
    setComposerOpen(false);
  }

  return <main className="requests-page">
    <AppNavigation active="requests" />
    <div className="requests-landscape" aria-hidden="true"><Image src="/images/matching-hero-lake.png" alt="" fill priority sizes="75vw" /></div>
    <div className="requests-content">
      <header className="requests-heading"><div><p className="requests-eyebrow">You’re not alone</p><h1>{tab === "others" ? "Support requests" : "My requests"}</h1><p>{tab === "others" ? "People are looking for someone who understands." : "Manage your requests and the conversations they create."}</p></div>{tab === "mine" && <Link href="/onboarding/topics">+ New request</Link>}</header>
      <div className="requests-tabs" role="tablist"><button className={tab === "mine" ? "is-active" : ""} type="button" onClick={() => { setTab("mine"); setOfferSent(false); setComposerOpen(false); }}>My requests <span>1</span></button><button className={tab === "others" ? "is-active" : ""} type="button" onClick={() => setTab("others")}>Support others <span>4</span></button></div>

      {tab === "mine" ? <section className="requests-mine" aria-label="My requests">
        <article className="request-card request-card--mine">
          <div className="request-card-top"><span className={`request-status${requestPaused ? " is-paused" : ""}`}>{requestPaused ? "Paused" : "Open · matching"}</span><time>Expires in 2 days</time></div>
          <h2>Relocation &amp; loneliness</h2><p>I moved to a new country and have been feeling isolated. I’d like to talk with someone who has been through a similar transition.</p><div className="request-tags"><span>Relocation</span><span>Loneliness</span><span>Someone to listen</span></div>
          <div className="request-progress"><div><p><strong>Invitations sent</strong><span>10 of {requestConfig.maxInvitationsPerRequest}</span></p><i><b style={{ width: `${10 / requestConfig.maxInvitationsPerRequest * 100}%` }} /></i><small>Shared automatically in batches of {requestConfig.nextInvitationBatchSize}.</small></div><div><p><strong>Conversations</strong><span>2 of {requestConfig.maxConversationsPerRequest}</span></p><i><b style={{ width: `${2 / requestConfig.maxConversationsPerRequest * 100}%` }} /></i><small>Matching stops at {requestConfig.maxConversationsPerRequest}; conversations continue after expiry.</small></div></div>
          <div className="request-stats"><span><strong>2</strong> people reached out</span><span><strong>10</strong> invitations sent</span><span><strong>48h</strong> matching left</span></div>
          <footer><Link href="/messages">View conversations</Link><button type="button" onClick={() => setRequestPaused((value) => !value)}>{requestPaused ? "Reopen" : "Pause"}</button><Link href="/onboarding/preferences">Edit</Link><button type="button" aria-label="More request options">•••</button></footer>
        </article>
        <aside className="requests-next"><h2>Matching happens automatically</h2><ol><li><span>1</span><p><strong>Shared in small batches</strong><small>5 people at a time, up to 25.</small></p></li><li><span>2</span><p><strong>Supporters write first</strong><small>A chat appears only after a kind first message.</small></p></li><li><span>3</span><p><strong>You stay in control</strong><small>Reply, pause, end, block or report anytime.</small></p></li></ol><p>Requests expire after {requestConfig.requestExpirationHours} hours. Existing conversations stay active.</p></aside>
      </section> : offerSent ? <OfferSent request={selected} /> : <section className="support-browse" aria-label="Available support requests">
        <div className="support-browse-filters">{(["recommended","newest","saved"] as const).map((value) => <button className={browseFilter === value ? "is-active" : ""} type="button" onClick={() => setBrowseFilter(value)} key={value}>{value === "recommended" ? "Recommended" : value === "newest" ? "Newest" : "Saved"}</button>)}</div>
        <div className="support-browse-layout">
          <div className="support-browse-grid">{browseRequests.slice(0,3).map((request) => <article className="support-browse-card" key={request.id}>
            <header><div className="request-tags">{request.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>{request.fresh ? <b>New</b> : <button className={savedIds.includes(request.id) ? "is-saved" : ""} type="button" aria-label={savedIds.includes(request.id) ? "Remove from saved" : "Save request"} onClick={() => setSavedIds((current) => current.includes(request.id) ? current.filter((id) => id !== request.id) : [...current, request.id])}><HeartIcon /></button>}</header>
            <h2>{request.title === "Relocation & loneliness" ? "Feeling isolated in a new place" : request.title}</h2><p>{request.excerpt}<br />Looking for someone who gets it.</p>
            <dl><div><dt><GlobeIcon />Language</dt><dd>{request.language}</dd></div><div><dt><ClockIcon />Availability</dt><dd>{request.availability.split(" or ")[0]}</dd></div><div><dt><PeopleIcon />Support type</dt><dd>{request.support}</dd></div><div><dt><LocationIcon />Timezone</dt><dd>{request.timezone.split(" · ")[0]}</dd></div></dl>
            <footer><button type="button" onClick={() => { setSelectedId(request.id); setFirstMessage(""); setComposerOpen(true); }}>Offer support <span>→</span></button><button type="button">Not for me</button></footer>
          </article>)}</div>
          {browseRequests.length === 0 && <div className="support-saved-empty"><HeartIcon /><h2>No saved requests yet</h2><p>Tap the heart on a request to keep it here for later.</p></div>}
          <aside className="support-browse-safety"><header><h2>What you’ll see<br />before chatting</h2><span><ShieldIcon /></span></header><p>To help keep every conversation safe and comfortable, you’ll see:</p><ul><li>The topic they’re reaching out about</li><li>A short description of what they need</li><li>Their preferred language</li><li>When they’re usually available</li><li>The kind of support they’re looking for</li><li>Their broad timezone</li></ul><footer><span>🔒</span><p>You’ll decide if it feels right.<br />There’s no pressure to respond.</p></footer></aside>
        </div>
        <footer className="support-browse-note"><span>❧</span>Every request is anonymous. Share only what feels comfortable, and take breaks anytime.<i>•</i>Your wellbeing comes first.<Link href="/legal">See safety tips →</Link></footer>
        {composerOpen && <div className="direct-message-backdrop" role="presentation" onMouseDown={() => setComposerOpen(false)}><form className="direct-message-composer" role="dialog" aria-modal="true" aria-labelledby="direct-message-title" onSubmit={sendOffer} onMouseDown={(event) => event.stopPropagation()}><header><div><p>Replying anonymously</p><h2 id="direct-message-title">Write a gentle first message</h2></div><button type="button" aria-label="Close message composer" onClick={() => setComposerOpen(false)}>×</button></header><div className="direct-message-context"><div className="request-tags">{selected.topics.map((topic) => <span key={topic}>{topic}</span>)}</div><p>“{selected.excerpt}”</p></div><label htmlFor="first-support-message">Your message</label><textarea id="first-support-message" value={firstMessage} onChange={(event) => setFirstMessage(event.target.value)} placeholder="Hi. I’ve been through something similar and would be glad to listen..." autoFocus /><div className="direct-message-note"><ShieldIcon /><span>Your identity stays private. A conversation is created only after this message is sent.</span></div><footer><button type="button" onClick={() => setComposerOpen(false)}>Cancel</button><button type="submit" disabled={!firstMessage.trim()}>Send offer →</button></footer></form></div>}
      </section>}
    </div>
  </main>;
}

function OfferSent({ request }: { request: SupportRequest }) { return <section className="offer-sent"><article><div className="offer-success"><span>✓</span><p><strong>Your offer was sent</strong><small>Your first message now appears in their Messages. They can reply whenever they’re ready.</small></p><Link href="/messages">Go to messages →</Link></div><div className="offer-request"><Image src={request.image} alt="" width={78} height={78} /><div><h2>{request.title}</h2><p>“{request.excerpt}”</p><div className="request-tags">{request.topics.map((topic) => <span key={topic}>{topic}</span>)}</div></div></div><footer><span>🔒 Your offer has already been sent to this request.</span><Link href="/requests">See more requests →</Link></footer></article><aside className="offer-next"><h2>What happens next</h2><ol><li><span><ChatIcon /></span><p><strong>You’ll appear in Messages</strong><small>They’ll see your first message when they’re ready.</small></p></li><li><span><ClockIcon /></span><p><strong>They can reply in their own time</strong><small>There’s no rush or approval step.</small></p></li><li><span><HeartIcon /></span><p><strong>You can leave anytime</strong><small>You can end the conversation or step away.</small></p></li></ol></aside></section>; }
function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function PeopleIcon() { return <Icon><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 15a5 5 0 0 1 6 5" /></Icon>; }
function ClockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></Icon>; }
function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function LocationIcon() { return <Icon><path d="M12 22s7-6.2 7-13a7 7 0 0 0-14 0c0 6.8 7 13 7 13Z" /><circle cx="12" cy="9" r="2.2" /></Icon>; }
