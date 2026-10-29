"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

import AppNavigation from "@/components/AppNavigation";

import "./conversation.css";

type Message = {
  id: number;
  body: string;
  time: string;
  mine?: boolean;
};

const initialMessages: Message[] = [
  {
    id: 1,
    body: "Hi. I moved countries two years ago and remember how isolating the first months felt.",
    time: "10:32 AM",
  },
  {
    id: 2,
    body: "Thank you. I didn’t expect it to feel this hard.",
    time: "10:35 AM",
    mine: true,
  },
  {
    id: 3,
    body: "You don’t need to have all the words. I’m here to listen.",
    time: "10:38 AM",
  },
];

export default function QuietPineConversationPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [safetyVisible, setSafetyVisible] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSafetyVisible(window.localStorage.getItem("hearkind:quiet-pine-safety-dismissed") !== "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function dismissSafety() {
    setSafetyVisible(false);
    window.localStorage.setItem("hearkind:quiet-pine-safety-dismissed", "true");
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = message.trim();
    if (!body) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), body, time: "Now", mine: true },
    ]);
    setMessage("");
  }

  return (
    <main className="conversation-page">
      <AppNavigation active="messages" />

      <div className="conversation-shell">
        <section className="conversation-chat" aria-label="Conversation with Quiet Pine">
          <header className="conversation-chat-header">
            <Image
              src="/images/matching_reached_out_lake.png"
              alt="Quiet Pine"
              width={48}
              height={48}
              className="conversation-avatar conversation-avatar--large"
            />
            <div>
              <div className="conversation-name-line">
                <h1>Quiet Pine</h1>
                <span>Relocation</span>
              </div>
              <p>Connected 3 days ago</p>
            </div>
            <button type="button" aria-label="More conversation options"><MoreIcon /></button>
          </header>

          {safetyVisible && <div className="conversation-comfort-note">
            <HeartIcon />
            <span>Share only what feels comfortable. There’s no rush to reply.</span>
            <button type="button" aria-label="Dismiss safety note" onClick={dismissSafety}><CloseIcon /></button>
          </div>}

          <div className="conversation-day"><span>Today</span></div>

          <div className="conversation-messages" aria-live="polite">
            {messages.map((item, index) => {
              const startsIncomingGroup = !item.mine && (index === 0 || messages[index - 1].mine);
              const startsGroup = index === 0 || Boolean(item.mine) !== Boolean(messages[index - 1].mine);
              return (
              <article className={`conversation-message${item.mine ? " is-mine" : ""}${startsGroup ? " starts-group" : ""}`} key={item.id}>
                {!item.mine && (startsIncomingGroup ? (
                  <Image
                    src="/images/matching_reached_out_lake.png"
                    alt=""
                    width={62}
                    height={62}
                    className="conversation-avatar"
                  />
                ) : <span className="conversation-avatar-spacer" />)}
                <div>
                  <p>{item.body}</p>
                  <small>{item.time}{item.mine && <CheckIcon />}</small>
                </div>
              </article>
              );
            })}
          </div>

          <form className="conversation-composer" onSubmit={sendMessage}>
            <label htmlFor="conversation-message">Write a message</label>
            <input
              id="conversation-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Send message" disabled={!message.trim()}><SendIcon /></button>
          </form>
        </section>

        <aside className="conversation-details" aria-label="Conversation details">
          <h2>Conversation details</h2>

          <div className="conversation-detail-row">
            <span className="conversation-detail-icon"><TagIcon /></span>
            <strong>Shared topics</strong>
            <div className="conversation-detail-tags"><span>Relocation</span><span>Loneliness</span></div>
          </div>

          <div className="conversation-detail-row">
            <span className="conversation-detail-icon"><GlobeIcon /></span>
            <strong>Language</strong>
            <p>English</p>
          </div>

          <section className="conversation-tips">
            <h3><span><HeartFilledIcon /></span>Conversation tips</h3>
            <ul>
              <li>It’s okay to reply later.</li>
              <li>You can take breaks.</li>
            </ul>
          </section>

          <section className="conversation-controls">
            <h3><span><ShieldIcon /></span>Safety &amp; control</h3>
            <button type="button"><EndIcon />End conversation</button>
            <button type="button"><BlockIcon />Block</button>
            <button type="button"><FlagIcon />Report</button>
          </section>

          <Image
            src="/images/hero-chair.png"
            alt="A comfortable chair beside a warm drink"
            width={370}
            height={330}
            className="conversation-chair"
          />
        </aside>

      </div>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">{children}</svg>;
}

function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function HeartFilledIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" fill="currentColor" stroke="none" /></Icon>; }
function TagIcon() { return <Icon><path d="m4 13 9-9h6v6l-9 9-6-6Z" /><circle cx="16" cy="7" r="1" /></Icon>; }
function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function EndIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6m0-6-6 6" /></Icon>; }
function BlockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></Icon>; }
function FlagIcon() { return <Icon><path d="M5 21V4m0 1h11l-2 4 2 4H5" /></Icon>; }
function CheckIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m5 10 3 3 6-7" /></svg>; }
function MoreIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>; }
function CloseIcon() { return <Icon><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
function SendIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m3 11 18-8-7 18-3-7-8-3Z" /><path d="m11 14 10-11" /></svg>; }
