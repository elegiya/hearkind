import Image from "next/image";
import Link from "next/link";

import BrandLogo from "@/components/BrandLogo";

import "../messages.css";
import "./default.css";

export default function MessagesDefaultPage() {
  return (
    <main className="messages-page messages-default-page">
      <header className="messages-nav">
        <BrandLogo href="/" variant="plain" size="medium" className="messages-brand" />
        <nav aria-label="Main navigation">
          <Link href="/matching">Home</Link>
          <Link className="is-active" href="/messages/default" aria-current="page">Messages</Link>
          <Link href="/onboarding/preferences">Preferences</Link>
        </nav>
        <button className="messages-profile" type="button" aria-label="Open profile menu"><span>M</span><ChevronIcon /></button>
      </header>

      <div className="messages-default-layout">
        <aside className="messages-default-inbox" aria-label="Conversations">
          <div className="messages-inbox-heading">
            <div><h1>Messages</h1><p>Your conversations</p></div>
            <button type="button"><PersonAddIcon /><span>New introduction</span></button>
          </div>

          <div className="messages-tabs" role="tablist" aria-label="Conversation filters">
            <button className="is-active" type="button" role="tab" aria-selected="true">All <span>0</span></button>
            <button type="button" role="tab" aria-selected="false">Active <span>0</span></button>
            <button type="button" role="tab" aria-selected="false">Past <span>0</span></button>
          </div>

          <div className="messages-default-empty-list">
            <div className="messages-default-chat-mark"><ChatIcon /><LeafIcon /></div>
            <h2>No conversations yet</h2>
            <p>When someone reaches out or you start<br />a conversation, it will appear here.</p>
          </div>

          <div className="messages-privacy-card"><ShieldIcon /><p><strong>Private. Safe. Human.</strong><small>Your conversations are private<br />and secure.</small></p></div>
        </aside>

        <section className="messages-default-content">
          <Image className="messages-default-landscape" src="/images/messages-default-landscape.png" width={1860} height={838} alt="A peaceful path through sunlit fields" priority />
          <h1>You’re not alone</h1>
          <p className="messages-default-intro">HearKind connects you with real people who’ve been there<br />and want to listen. Your conversations will show up here.</p>

          <ul className="messages-default-benefits">
            <li><span><LeafIcon /></span>Share as much or as little as feels comfortable.</li>
            <li><span className="is-peach"><HeartIcon /></span>There’s no rush to reply.</li>
            <li><span><LockIcon /></span>You’re in control. You can pause or end<br />any conversation at any time.</li>
          </ul>

          <div className="messages-default-actions">
            <p>What feels right for you today?</p>
            <div>
              <Link className="messages-default-primary" href="/matching"><HeartIcon /><span><strong>Let someone reach out</strong><small>Open yourself to receiving support.</small></span><ArrowIcon /></Link>
              <Link className="messages-default-secondary" href="/matching"><LeafIcon /><span><strong>Reach out to someone</strong><small>See a few people who may<br />benefit from your support.</small></span><ArrowIcon /></Link>
            </div>
            <small className="messages-default-reassurance"><ShieldIcon />You can always change your mind later.</small>
            <Link className="messages-default-learn" href="/legal">Learn more about how HearKind works</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">{children}</svg>; }
function PersonAddIcon() { return <Icon><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M18 7v6M15 10h6" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /></Icon>; }
function LeafIcon() { return <Icon><path d="M19 4C11 4 6 8 6 15c7 0 11-4 13-11Z" /><path d="M5 20c2-5 6-8 11-11M7 15c-3-1-5-3-5-6 4 0 7 2 8 5" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function LockIcon() { return <Icon><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>; }
function ArrowIcon() { return <Icon><path d="M5 12h14m-5-5 5 5-5 5" /></Icon>; }
function ChevronIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="m6 8 4 4 4-4" /></svg>; }
