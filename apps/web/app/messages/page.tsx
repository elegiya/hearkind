"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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
  unread?: number;
};

const conversations: Conversation[] = [
  { name: "Quiet Pine", topic: "Relocation", preview: "Thank you for sharing that. I moved across the country last year…", time: "2m ago", image: "/images/matching_reached_out_lake.png", status: "active", unread: 1 },
  { name: "Soft Willow", topic: "Loneliness", preview: "That makes a lot of sense. Small shifts can help…", time: "Yesterday", image: "/images/matching_start_way.png", status: "active" },
  { name: "Golden Leaf", topic: "Relationships", preview: "I really appreciate your perspective on this.", time: "3 days ago", image: "/images/matching_search_way.png", status: "active" },
  { name: "Warm Cedar", topic: "Relocation", preview: "It’s okay to take time to adjust. You’re not alone in that.", time: "Aug 12", image: "/images/matching_search_way.png", status: "active" },
  { name: "Calm Water", topic: "Loneliness", preview: "Conversation ended", time: "Jul 10", image: "/images/landscape-login.png", status: "past" },
  { name: "Kind Spruce", topic: "Anxiety", preview: "Conversation ended", time: "Jun 29", image: "/images/matching_reached_out_lake.png", status: "past" },
];

export default function MessagesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visibleConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return conversations.filter((conversation) => {
      const matchesFilter = filter === "all" || conversation.status === filter;
      const matchesQuery = !normalized || `${conversation.name} ${conversation.topic} ${conversation.preview}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

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
          <clipPath id="messages-visual-clip" clipPathUnits="objectBoundingBox">
            <path d="M 1 0 H .16 C .17 .12, .17 .23, .155 .34 C .142 .44, .14 .49, .14 .55 C .14 .65, .15 .74, .165 .83 C .18 .91, .18 .96, .19 1 H 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <section className="messages-showcase">
        <section className="messages-inbox" aria-label="Conversations">
          <div className="messages-inbox-heading">
            <div>
              <h1>Messages</h1>
              <p>Your conversations</p>
            </div>
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
                <Image src={conversation.image} alt="" width={72} height={72} className="messages-avatar" />
                <div className="messages-row-copy">
                  <div className="messages-row-title">
                    <strong>{conversation.name}</strong>
                    {conversation.unread && <span><i />New message</span>}
                  </div>
                  <small>{conversation.topic}</small>
                  <p>{conversation.preview}</p>
                </div>
                <time>{conversation.time}</time>
                {conversation.unread && <b aria-label={`${conversation.unread} unread message`}>{conversation.unread}</b>}
                <ArrowIcon />
              </Link>
            ))}
            {visibleConversations.length === 0 && <p className="messages-empty">No conversations found.</p>}
          </div>
        </section>

        <aside className="messages-visual" aria-label="HearKind privacy and support">
          <div className="messages-visual-art">
            <Image src="/images/messages-conversation.png" alt="Two welcoming chairs with tea and a leafy plant" fill priority sizes="44vw" />
          </div>
        </aside>
      </section>

      <nav className="messages-mobile-nav" aria-label="Mobile navigation">
        <Link href="/matching">Home</Link>
        <Link className="is-active" href="/messages">Messages</Link>
        <Link href="/onboarding/preferences">Preferences</Link>
      </nav>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">{children}</svg>; }
function SearchIcon() { return <Icon><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></Icon>; }
function PersonAddIcon() { return <Icon><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M18 7v6M15 10h6" /></Icon>; }
function ArrowIcon() { return <Icon><path d="m9 5 7 7-7 7" /></Icon>; }
function ChevronIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m6 8 4 4 4-4" /></svg>; }
