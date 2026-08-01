"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import BrandLogo from "@/components/BrandLogo";

import "./messages.css";

type Filter = "active" | "past";
type Message = { id: number; body: string; time: string; mine?: boolean };

const conversations = [
  { name: "Quiet Pine", topics: ["Relocation", "Shared experience"], preview: "You don’t need to have all the words. I’m here, and I’ve felt some of this too.", time: "10:35 AM", image: "/images/matching_reached_out_lake.png", status: "active" },
  { name: "Soft Willow", topics: ["Loneliness", "Anxiety"], preview: "It helps to talk to someone who actually understands the starting-over...", time: "Yesterday", image: "/images/matching_start_way.png", status: "active" },
  { name: "Golden Leaf", topics: ["Relationship", "Communication"], preview: "Thank you for sharing that with me. It helps.", time: "2d ago", image: "/images/matching_search_way.png", status: "active" },
  { name: "Warm Cedar", topics: ["Burnout", "Work life"], preview: "I needed to hear that from someone today.", time: "Jul 18", image: "/images/landscape-login.png", status: "active" },
  { name: "Calm Water", topics: ["Loneliness"], preview: "Conversation ended", time: "Jul 10", image: "/images/landscape-login.png", status: "past" },
];

const initialMessages: Message[] = [
  { id: 1, body: "Hi. I moved countries two years ago and remember how isolating the first months felt.", time: "10:32 AM" },
  { id: 2, body: "Thank you. I didn’t expect it to feel this hard some days.", time: "10:35 AM", mine: true },
  { id: 3, body: "You don’t need to have all the words. I’m here to listen.", time: "10:38 AM" },
  { id: 4, body: "It helps to talk to someone who actually understands the starting-over part.", time: "10:41 AM", mine: true },
];

export default function MessagesPage() {
  const [filter, setFilter] = useState<Filter>("active");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [connectionOpen, setConnectionOpen] = useState(true);

  const visibleConversations = useMemo(() => {
    const search = query.trim().toLowerCase();
    return conversations.filter((item) => item.status === filter && (!search || `${item.name} ${item.topics.join(" ")} ${item.preview}`.toLowerCase().includes(search)));
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
          <Link href="/preferences">Preferences</Link>
        </nav>
        <button className="messages-profile" type="button" aria-label="Open profile menu"><span>M</span><ChevronIcon /></button>
      </header>

      <div className="messages-landscape" aria-hidden="true"><Image src="/images/matching-hero-lake.png" alt="" fill priority sizes="75vw" /></div>

      <header className="messages-page-heading"><h1>Messages</h1><p>Private conversations</p></header>

      <section className="messages-shell">
        <aside className="messages-inbox" aria-label="Conversations">
          <label className="messages-search"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" /></label>

          <div className="messages-tabs" role="tablist" aria-label="Conversation filters">
            <button className={filter === "active" ? "is-active" : ""} onClick={() => setFilter("active")} type="button">Active</button>
            <button className={filter === "past" ? "is-active" : ""} onClick={() => setFilter("past")} type="button">Closed</button>
          </div>

          <div className="messages-list">
            {visibleConversations.map((item, index) => (
              <button className={`messages-row${index === 0 && filter === "active" ? " is-selected" : ""}`} type="button" key={item.name}>
                <Image src={item.image} alt="" width={72} height={72} className="messages-avatar" />
                <div className="messages-row-copy"><strong>{item.name}</strong><div>{item.topics.map((topic) => <small key={topic}>{topic}</small>)}</div><p>{item.preview}</p></div>
                <time>{item.time}</time>
                {index === 0 && filter === "active" && <i aria-label="Unread message" />}
              </button>
            ))}
            {!visibleConversations.length && <p className="messages-empty">No conversations found.</p>}
          </div>
        </aside>

        <section className="messages-chat" aria-label="Conversation with Quiet Pine">
          <header className="messages-chat-header">
            <Image src="/images/matching_reached_out_lake.png" alt="Quiet Pine" width={62} height={62} className="messages-chat-avatar" />
            <div><h2>Quiet Pine</h2><p><span>Relocation</span><span>Shared experience</span></p></div>
            <button type="button" aria-label="More conversation options"><MoreIcon /></button>
          </header>

          <section className={`messages-connection${connectionOpen ? " is-open" : ""}`}>
            <button type="button" aria-expanded={connectionOpen} onClick={() => setConnectionOpen((value) => !value)}><HandsIcon /><span><strong>How you connected</strong>{connectionOpen && <small>This started with a request for support about relocation and loneliness.<br />This is now a two-way conversation. Share only what feels right.</small>}</span><ChevronUpIcon /></button>
          </section>
          <button className="messages-introduction" type="button"><ChatIcon /><strong>Original introduction</strong><span>Started Jul 18, 2025</span><ChevronIcon /></button>
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
function HandsIcon() { return <Icon><path d="M8 21c-1-4-5-5-5-9V7l2 1V5l2 2V4l2 2v5l3 2M16 21c1-4 5-5 5-9V7l-2 1V5l-2 2V4l-2 2v5l-3 2" /><path d="M12 12V4m0 0-2 2m2-2 2 2" /></Icon>; }
function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /><path d="M8 10h8" /></Icon>; }
function PaperclipIcon() { return <Icon><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L14 3a3.5 3.5 0 0 1 5 5l-9.5 9.5a2 2 0 0 1-3-3L15 6" /></Icon>; }
function SendIcon() { return <Icon><path d="m3 11 18-8-7 18-3-7-8-3Z" /><path d="m11 14 10-11" /></Icon>; }
function MoreIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>; }
function CheckIcon() { return <Icon><path d="m5 12 4 4 10-11" /></Icon>; }
function ChevronIcon() { return <Icon><path d="m6 9 6 6 6-6" /></Icon>; }
function ChevronUpIcon() { return <Icon><path d="m6 15 6-6 6 6" /></Icon>; }
