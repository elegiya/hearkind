"use client";

import Link from "next/link";
import { useState } from "react";

import AppNavigation from "@/components/AppNavigation";

import "./requests.css";

type Tab = "mine" | "others";

const supportRequests = [
  { title: "Starting over after relocation", topics: ["Relocation", "Loneliness"], excerpt: "I moved recently and everything still feels unfamiliar. I’d appreciate hearing from someone who has rebuilt their sense of home.", language: "English", time: "2h ago" },
  { title: "Feeling exhausted at work", topics: ["Burnout", "Work life"], excerpt: "I’ve been carrying too much for a while and I’m not sure how to slow down without letting everyone down.", language: "English", time: "Today" },
  { title: "Learning to trust again", topics: ["Relationships", "Starting over"], excerpt: "A long relationship ended recently. I’m looking for a gentle conversation with someone who understands the uncertainty.", language: "Ukrainian", time: "Today" },
];

export default function RequestsPage() {
  const [tab, setTab] = useState<Tab>("mine");

  return <main className="requests-page">
    <AppNavigation active="requests" />
    <div className="requests-content">
      <header className="requests-heading"><div><p className="requests-eyebrow">Support, at your pace</p><h1>Requests</h1><p>Manage your own requests or find someone you may understand.</p></div><Link href="/onboarding/topics">+ New request</Link></header>
      <div className="requests-tabs" role="tablist"><button className={tab === "mine" ? "is-active" : ""} type="button" onClick={() => setTab("mine")}>My requests <span>1</span></button><button className={tab === "others" ? "is-active" : ""} type="button" onClick={() => setTab("others")}>Support others <span>3</span></button></div>
      {tab === "mine" ? <section className="requests-mine" aria-label="My requests">
        <article className="request-card request-card--mine"><div className="request-card-top"><span className="request-status">Open</span><time>Expires in 2 days</time></div><h2>Relocation &amp; loneliness</h2><p>I moved to a new country and have been feeling isolated. I’d like to talk with someone who has been through a similar transition.</p><div className="request-tags"><span>Relocation</span><span>Loneliness</span><span>Someone to listen</span></div><div className="request-stats"><span><strong>2</strong> people reached out</span><span><strong>15</strong> people saw this</span><span><strong>2</strong> conversations</span></div><footer><Link href="/messages">View conversations</Link><button type="button">Pause</button><button type="button" aria-label="More request options">•••</button></footer></article>
        <aside className="requests-next"><h2>What happens next?</h2><ol><li><span>1</span>Your request is shared privately</li><li><span>2</span>People who relate may reach out</li><li><span>3</span>You choose who to talk with</li></ol><p>You can pause or close your request at any time.</p></aside>
      </section> : <section className="requests-others" aria-label="Requests from others"><header><div><h2>People looking for support</h2><p>Requests that may match your experiences and preferences.</p></div><div><button className="is-active" type="button">Recommended</button><button type="button">Newest</button></div></header><div className="requests-grid">{supportRequests.map((request) => <article className="request-card" key={request.title}><div className="request-card-top"><div className="request-tags">{request.topics.map((topic) => <span key={topic}>{topic}</span>)}</div><time>{request.time}</time></div><h2>{request.title}</h2><p>{request.excerpt}</p><small>{request.language} · Text conversation</small><footer><button className="request-offer" type="button">Offer support</button><button type="button">Not for me</button></footer></article>)}</div></section>}
    </div>
  </main>;
}
