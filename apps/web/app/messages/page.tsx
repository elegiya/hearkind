"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import BrandLogo from "@/components/BrandLogo";

import "./messages.css";

type Filter = "active" | "past";
type Message = { id: number; body: string; time: string; mine?: boolean };

const conversations = [
  { name: "Quiet Pine", topic: "Relocation", preview: "Hi. I moved countries two years ago and remember how isolating...", time: "10:35 AM", image: "/images/matching_reached_out_lake.png", status: "active" },
  { name: "Soft Willow", topic: "Loneliness", preview: "That makes so much sense. I felt the same way.", time: "Yesterday", image: "/images/matching_start_way.png", status: "active" },
  { name: "Golden Leaf", topic: "Relationships", preview: "Thank you for sharing that with me. It helps.", time: "2d ago", image: "/images/matching_search_way.png", status: "active" },
  { name: "Warm Cedar", topic: "Anxiety", preview: "I appreciate you saying that. It means a lot.", time: "Jul 18", image: "/images/matching_search_way.png", status: "active" },
  { name: "Calm Water", topic: "Loneliness", preview: "Conversation ended", time: "Jul 10", image: "/images/landscape-login.png", status: "past" },
];

const initialMessages: Message[] = [
  { id: 1, body: "Hi. I moved countries two years ago and remember how isolating the first months felt.", time: "10:32 AM" },
  { id: 2, body: "Thank you. I didn’t expect it to feel this hard some days.", time: "10:35 AM", mine: true },
  { id: 3, body: "You don’t need to have all the words. I’m here to listen.", time: "10:38 AM" },
  { id: 4, body: "That means a lot. Just knowing someone gets it helps.", time: "10:41 AM", mine: true },
];

export default function MessagesPage() {
  const [filter, setFilter] = useState<Filter>("active");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [showNote, setShowNote] = useState(true);

  const visibleConversations = useMemo(() => {
    const search = query.trim().toLowerCase();
    return conversations.filter((item) => item.status === filter && (!search || `${item.name} ${item.topic} ${item.preview}`.toLowerCase().includes(search)));
  }, [filter, query]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMessages((current) => [...current, { id: Date.now(), body, time: "Now", mine: true }]);
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

      <svg className="messages-clip-definitions" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="messages-inbox-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 H .93 C .86 .10, .84 .19, .88 .29 C .93 .40, .94 .47, .91 .57 C .87 .69, .87 .79, .91 .89 C .94 .95, .93 .98, .92 1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <section className="messages-shell">
        <aside className="messages-inbox" aria-label="Conversations">
          <div className="messages-inbox-heading"><h1>Messages</h1><p>Your conversations</p></div>

          <label className="messages-search"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" /></label>

          <div className="messages-tabs" role="tablist" aria-label="Conversation filters">
            <button className={filter === "active" ? "is-active" : ""} onClick={() => setFilter("active")} type="button">Active</button>
            <button className={filter === "past" ? "is-active" : ""} onClick={() => setFilter("past")} type="button">Past</button>
          </div>

          <div className="messages-list">
            {visibleConversations.map((item, index) => (
              <button className={`messages-row${index === 0 && filter === "active" ? " is-selected" : ""}`} type="button" key={item.name}>
                <Image src={item.image} alt="" width={72} height={72} className="messages-avatar" />
                <div className="messages-row-copy"><strong>{item.name}</strong><small>{item.topic}</small><p>{item.preview}</p></div>
                <time>{item.time}</time>
                {index === 0 && filter === "active" && <i aria-label="Unread message" />}
              </button>
            ))}
            {!visibleConversations.length && <p className="messages-empty">No conversations found.</p>}
          </div>
        </aside>

        <svg className="messages-s-divider" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M28 0 C12 105 10 215 24 335 C37 445 38 500 25 610 C11 725 12 825 27 915 C34 958 32 982 30 1000" />
        </svg>

        <section className="messages-chat" aria-label="Conversation with Quiet Pine">
          <header className="messages-chat-header">
            <Image src="/images/matching_reached_out_lake.png" alt="Quiet Pine" width={62} height={62} className="messages-chat-avatar" />
            <h2>Quiet Pine</h2><span>Relocation</span>
            <button type="button" aria-label="More conversation options"><MoreIcon /></button>
          </header>

          {showNote && <div className="messages-comfort-note"><HeartIcon /><span>Share only what feels comfortable. There’s no rush to reply.</span><button type="button" onClick={() => setShowNote(false)} aria-label="Dismiss"><CloseIcon /></button></div>}
          <div className="messages-day"><span>Today</span></div>

          <div className="messages-thread" aria-live="polite">
            {messages.map((item) => <article className={`messages-bubble${item.mine ? " is-mine" : ""}`} key={item.id}>
              {!item.mine && <Image src="/images/matching_reached_out_lake.png" alt="" width={50} height={50} />}
              <div><p>{item.body}</p><small>{item.time}{item.mine && <CheckIcon />}</small></div>
            </article>)}
          </div>

          <form className="messages-composer" onSubmit={sendMessage}>
            <PaperclipIcon /><input aria-label="Write a message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." />
            <button type="submit" aria-label="Send message"><SendIcon /></button>
          </form>
          <div className="messages-private"><span>❧</span>Private. Safe. Human.<span>❧</span></div>
        </section>
      </section>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function SearchIcon() { return <Icon><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function PaperclipIcon() { return <Icon><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L14 3a3.5 3.5 0 0 1 5 5l-9.5 9.5a2 2 0 0 1-3-3L15 6" /></Icon>; }
function SendIcon() { return <Icon><path d="m3 11 18-8-7 18-3-7-8-3Z" /><path d="m11 14 10-11" /></Icon>; }
function MoreIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>; }
function CloseIcon() { return <Icon><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
function CheckIcon() { return <Icon><path d="m5 12 4 4 10-11" /></Icon>; }
function ChevronIcon() { return <Icon><path d="m6 9 6 6 6-6" /></Icon>; }
