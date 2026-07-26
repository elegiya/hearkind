"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

import BrandLogo from "@/components/BrandLogo";

import "./messages.css";

type Filter = "all" | "active" | "past";

type Conversation = {
  name: string;
  topic: string;
  preview: string;
  time: string;
  image: string;
  status: "active" | "past";
  unread?: boolean;
};

const conversations: Conversation[] = [
  { name: "Quiet Pine", topic: "Relocation", preview: "Thank you. I didn’t expect it to feel this hard some days.", time: "10:35 AM", image: "/images/matching_reached_out_lake.png", status: "active", unread: true },
  { name: "Soft Willow", topic: "Loneliness", preview: "That makes so much sense. I felt the same way.", time: "Yesterday", image: "/images/matching_start_way.png", status: "active" },
  { name: "Golden Leaf", topic: "Relationships", preview: "Thank you for sharing that with me. It helps.", time: "2d ago", image: "/images/matching_search_way.png", status: "active" },
  { name: "Warm Cedar", topic: "Relocation", preview: "You: That’s so kind of you.", time: "Jul 18", image: "/images/matching_search_way.png", status: "active" },
  { name: "Calm Water", topic: "Loneliness", preview: "Conversation ended", time: "Jul 10", image: "/images/landscape-login.png", status: "past" },
  { name: "Kind Spruce", topic: "Anxiety", preview: "Conversation ended", time: "Jun 29", image: "/images/matching_reached_out_lake.png", status: "past" },
];

const chatSeed = [
  { id: 1, body: "Hi. I moved countries two years ago and remember how isolating the first months felt.", time: "10:32 AM" },
  { id: 2, body: "Thank you. I didn’t expect it to feel this hard some days.", time: "10:35 AM", mine: true },
  { id: 3, body: "You don’t need to have all the words. I’m here to listen.", time: "10:38 AM" },
  { id: 4, body: "That means a lot. Just knowing someone gets it helps.", time: "10:41 AM", mine: true },
];

export default function MessagesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [chatMessages, setChatMessages] = useState(chatSeed);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [safetyVisible, setSafetyVisible] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("hearkind:messages-details-open");
    const frame = window.requestAnimationFrame(() => {
      setDetailsOpen(saved === null ? !window.matchMedia("(max-width: 1400px)").matches : saved === "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSafetyVisible(window.localStorage.getItem("hearkind:quiet-pine-safety-dismissed") !== "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateDetails(open: boolean) {
    setDetailsOpen(open);
    window.localStorage.setItem("hearkind:messages-details-open", String(open));
  }

  function dismissSafety() {
    setSafetyVisible(false);
    window.localStorage.setItem("hearkind:quiet-pine-safety-dismissed", "true");
  }

  const visibleConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return conversations.filter((conversation) => {
      const matchesFilter = filter === "all" || conversation.status === filter;
      const matchesSearch = !normalized || `${conversation.name} ${conversation.topic} ${conversation.preview}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesSearch;
    });
  }, [filter, query]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setChatMessages((current) => [...current, { id: Date.now(), body, time: "Now", mine: true }]);
    setDraft("");
  }

  return (
    <main className="messages-page">
      <header className="messages-nav">
        <BrandLogo href="/" variant="plain" size="small" className="messages-brand" />
        <nav aria-label="Main navigation">
          <Link href="/matching">Home</Link>
          <Link className="is-active" href="/messages" aria-current="page">Messages</Link>
          <Link href="/onboarding/preferences">Preferences</Link>
        </nav>
        <button className="messages-profile" type="button" aria-label="Open profile menu"><span>M</span><ChevronIcon /></button>
      </header>

      <div className={`messages-layout ${detailsOpen ? "is-details-open" : "is-details-closed"}`}>
        <section className="messages-inbox" aria-label="Conversations">
          <div className="messages-inbox-heading">
            <div><h1>Messages</h1></div>
            <button type="button"><PersonAddIcon /><span>New connection</span></button>
          </div>

          <label className="messages-search">
            <SearchIcon />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" />
          </label>

          <div className="messages-tabs" role="tablist" aria-label="Conversation filters">
            <button className={filter === "all" ? "is-active" : ""} type="button" role="tab" aria-selected={filter === "all"} onClick={() => setFilter("all")}>All <span>6</span></button>
            <button className={filter === "active" ? "is-active" : ""} type="button" role="tab" aria-selected={filter === "active"} onClick={() => setFilter("active")}>Active <span>4</span></button>
            <button className={filter === "past" ? "is-active" : ""} type="button" role="tab" aria-selected={filter === "past"} onClick={() => setFilter("past")}>Past <span>2</span></button>
          </div>

          <div className="messages-list">
            {visibleConversations.map((conversation) => (
              <Link className={`messages-row${conversation.name === "Quiet Pine" ? " is-selected" : ""}`} href={conversation.name === "Quiet Pine" ? "/messages/quiet-pine" : "#"} key={conversation.name}>
                <Image src={conversation.image} alt="" width={58} height={58} className="messages-avatar" />
                <div>
                  <div className="messages-row-title"><strong>{conversation.name}</strong></div>
                  <small>{conversation.topic}</small>
                  <p>{conversation.preview}</p>
                </div>
                <time>{conversation.time}</time>
                {conversation.unread && <i aria-label="Unread" />}
              </Link>
            ))}
            {visibleConversations.length === 0 && <p className="messages-empty">No conversations found.</p>}
          </div>

        </section>

        <section className="messages-chat" aria-label="Conversation with Quiet Pine">
          <header className="messages-chat-header">
            <Image src="/images/matching_reached_out_lake.png" alt="Quiet Pine" width={48} height={48} className="messages-avatar messages-chat-avatar" />
            <div><div><h2>Quiet Pine</h2><span>Relocation</span></div><p>Connected 3 days ago</p></div>
            <div className="messages-chat-tools">
              {!detailsOpen && <button type="button" aria-label="Open connection details" aria-expanded="false" aria-controls="messages-connection-details" onClick={() => updateDetails(true)}><InfoIcon /><span>Details</span></button>}
              <button type="button"><MoreIcon /><span>More</span></button>
            </div>
          </header>

          {safetyVisible && <div className="messages-comfort"><HeartIcon /><span>Share only what feels comfortable. There’s no rush to reply.</span><button type="button" aria-label="Dismiss safety note" onClick={dismissSafety}><CloseIcon /></button></div>}
          <div className="messages-day"><span>Today</span></div>

          <div className="messages-thread" aria-live="polite">
            {chatMessages.map((message, index) => {
              const startsIncomingGroup = !message.mine && (index === 0 || chatMessages[index - 1].mine);
              const startsGroup = index === 0 || Boolean(message.mine) !== Boolean(chatMessages[index - 1].mine);
              return (
              <article className={`messages-bubble-row${message.mine ? " is-mine" : ""}${startsGroup ? " starts-group" : ""}`} key={message.id}>
                {!message.mine && (startsIncomingGroup ? <Image src="/images/matching_reached_out_lake.png" alt="" width={42} height={42} className="messages-avatar" /> : <span className="messages-avatar-spacer" />)}
                <div><p>{message.body}</p><small>{message.time}{message.mine && <CheckIcon />}</small></div>
              </article>
              );
            })}
          </div>

          <form className="messages-composer" onSubmit={sendMessage}>
            <button type="button" aria-label="Attach file"><PaperclipIcon /></button>
            <label htmlFor="messages-draft">Write a message</label>
            <input id="messages-draft" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." autoComplete="off" />
            <button type="submit" aria-label="Send message" disabled={!draft.trim()}><SendIcon /></button>
          </form>
        </section>

        {detailsOpen && <button className="messages-details-backdrop" type="button" aria-label="Close connection details" onClick={() => updateDetails(false)} />}

        <aside id="messages-connection-details" className="messages-details" aria-label="About this connection" aria-hidden={!detailsOpen}>
          <div className="messages-details-heading">
            <h2>About this connection</h2>
            <button type="button" aria-label="Close connection details" onClick={() => updateDetails(false)}><CloseIcon /></button>
          </div>

          <div className="messages-detail-row">
            <span className="messages-detail-icon"><TagIcon /></span>
            <strong>Shared topics</strong>
            <div className="messages-detail-tags"><span>Relocation</span><span>Loneliness</span></div>
          </div>

          <div className="messages-detail-row">
            <span className="messages-detail-icon"><GlobeIcon /></span>
            <strong>Language</strong>
            <p>English</p>
          </div>

          <section className="messages-detail-tips">
            <h3><span><HeartFilledIcon /></span>Conversation tips</h3>
            <ul>
              <li>It’s okay to reply later.</li>
              <li>You can take breaks.</li>
            </ul>
          </section>

          <section className="messages-detail-controls">
            <h3><span><ShieldIcon /></span>Safety &amp; control</h3>
            <button type="button"><EndIcon />End conversation</button>
            <button type="button"><BlockIcon />Block</button>
            <button type="button"><FlagIcon />Report</button>
          </section>

          <Image src="/images/hero-chair.png" alt="A comfortable chair beside a warm drink" width={350} height={320} className="messages-details-chair" />
        </aside>
      </div>

      {!detailsOpen && <button className="messages-mobile-details-trigger" type="button" aria-label="Open connection details" onClick={() => updateDetails(true)}><InfoIcon /><span>Connection details</span></button>}

      <nav className="messages-mobile-nav" aria-label="Mobile navigation">
        <Link href="/matching"><HomeIcon /><span>Home</span></Link>
        <Link className="is-active" href="/messages"><ChatIcon /><span>Messages</span></Link>
        <Link href="/onboarding/preferences"><SettingsIcon /><span>Preferences</span></Link>
        <button type="button"><PersonIcon /><span>You</span></button>
      </nav>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">{children}</svg>; }
function SearchIcon() { return <Icon><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></Icon>; }
function PersonAddIcon() { return <Icon><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M18 7v6M15 10h6" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function FlagIcon() { return <Icon><path d="M5 21V4m0 1h11l-2 4 2 4H5" /></Icon>; }
function MoreIcon() { return <Icon><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></Icon>; }
function InfoIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></Icon>; }
function CloseIcon() { return <Icon><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
function PaperclipIcon() { return <Icon><path d="m9 12 6-6a3 3 0 0 1 4 4l-8 8a5 5 0 0 1-7-7l8-8" /></Icon>; }
function SendIcon() { return <Icon><path d="m3 11 18-8-7 18-3-7-8-3Z" /><path d="m11 14 10-11" /></Icon>; }
function CheckIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m5 10 3 3 6-7" /></svg>; }
function HomeIcon() { return <Icon><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3Z" /></Icon>; }
function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /></Icon>; }
function SettingsIcon() { return <Icon><circle cx="12" cy="12" r="3" /><path d="M19 14.5 21 16l-2 3-2.4-1A8 8 0 0 1 14 20l-.5 2h-3L10 20a8 8 0 0 1-2.6-1.1L5 20l-2-3 2-1.5A8 8 0 0 1 5 12L3 10.5l2-3 2.4 1A8 8 0 0 1 10 7l.5-3h3l.5 3a8 8 0 0 1 2.6 1.1L19 7l2 3-2 1.5a8 8 0 0 1 0 3Z" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>; }
function ChevronIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m6 8 4 4 4-4" /></svg>; }
function TagIcon() { return <Icon><path d="m4 13 9-9h6v6l-9 9-6-6Z" /><circle cx="16" cy="7" r="1" /></Icon>; }
function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
function HeartFilledIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" fill="currentColor" stroke="none" /></Icon>; }
function BlockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></Icon>; }
function EndIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6m0-6-6 6" /></Icon>; }
