import Link from "next/link";

import { InnerPageHeader, InnerPageShell } from "@/components/inner-pages/InnerPage";

import "./safety.css";

const primarySections = [
  {
    icon: <PeopleIcon />,
    title: "Community expectations",
    description: <>HearKind is a space for empathy, respect, and understanding.<br />We don’t tolerate harassment, hate speech, threats, or any form of abuse.</>,
    action: "View community guidelines",
    href: "/legal#community-guidelines",
  },
  {
    icon: <ShieldIcon />,
    title: "How block & report work",
    description: <>You’re in control. Block or report anyone who makes you uncomfortable.<br />We review reports carefully and take action when our guidelines are violated.</>,
    action: "Learn how it works",
    href: "#reporting",
  },
  {
    icon: <WarningIcon />,
    title: "Crisis disclaimer",
    description: <>HearKind offers peer support, not professional counseling or crisis services.<br />If you’re in crisis or need immediate help, please contact a professional or<br />use the emergency resources provided.</>,
    action: "Read disclaimer",
    href: "#emergency",
    tone: "warm",
  },
] as const;

const privacySections = [
  {
    icon: <LockIcon />,
    title: "Protecting your anonymity",
    description: <>Your identity stays yours. We never share your name or personal details<br />without your permission.</>,
    action: "How we protect you",
    href: "/privacy",
  },
  {
    icon: <PersonIcon />,
    title: "Sharing contact details",
    description: <>Only share contact details if you feel comfortable and trust the person.<br />We recommend keeping conversations on HearKind until you’re ready.</>,
    action: "Tips for safe sharing",
    href: "/privacy#sharing",
  },
  {
    icon: <PhoneIcon />,
    title: "Emergency resources",
    description: <>If you or someone you know is in immediate danger, contact emergency<br />services or a local helpline right away.</>,
    action: "Get emergency help",
    href: "#emergency",
    tone: "warm",
  },
] as const;

export default function SafetyPage() {
  return (
    <InnerPageShell className="safety-page" contentClassName="safety-content">
        <InnerPageHeader
          eyebrow="YOUR WELL-BEING MATTERS"
          title="Safety"
          subtitle="Your well-being is our priority. HearKind is built on respect, kindness, and privacy—so you can connect with confidence."
        />

        <div className="safety-layout">
          <section className="safety-main" aria-label="Safety guidance and resources">
            <div className="safety-list-card">
              {primarySections.map((section) => <SafetyRow key={section.title} {...section} />)}
            </div>
            <div className="safety-list-card">
              {privacySections.map((section) => <SafetyRow key={section.title} {...section} />)}
            </div>
          </section>

          <aside className="safety-aside" aria-label="Safety principles and reporting">
            <InfoCard icon={<HeartIcon />} title="Safety principles">
              <ul><li>Respect and kindness come first</li><li>Your boundaries matter</li><li>Privacy is always protected</li><li>We’re here to support you</li></ul>
              <Link href="/legal">Learn more about our principles <ArrowIcon /></Link>
            </InfoCard>

            <InfoCard id="reporting" icon={<ShieldIcon />} title="What happens when you report">
              <p>We review every report with care. If we find a violation<br />of our guidelines, we may:</p>
              <ul><li>Send a reminder or warning</li><li>Limit the ability to interact</li><li>Suspend or remove accounts</li></ul>
              <Link href="mailto:safety@hearkind.app">Report a concern <ArrowIcon /></Link>
            </InfoCard>

            <InfoCard id="emergency" className="safety-info-card--emergency" icon={<PhoneIcon />} title="If someone may be in immediate danger">
              <p>Your safety or theirs comes first. Don’t wait—seek help.<br />Contact your local emergency services or a crisis helpline.</p>
              <a className="safety-emergency-button" href="tel:112">Get emergency help <ArrowIcon /></a>
            </InfoCard>
          </aside>
        </div>
    </InnerPageShell>
  );
}

function SafetyRow({ icon, title, description, action, href, tone }: { icon: React.ReactNode; title: string; description: React.ReactNode; action: string; href: string; tone?: string }) {
  return (
    <article className="safety-row">
      <span className={`safety-row-icon${tone ? ` is-${tone}` : ""}`}>{icon}</span>
      <div><h2>{title}</h2><p>{description}</p></div>
      <Link href={href}>{action}<ArrowIcon /></Link>
    </article>
  );
}

function InfoCard({ id, className = "", icon, title, children }: { id?: string; className?: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <article className={`safety-info-card ${className}`} id={id}><h2><span>{icon}</span>{title}</h2>{children}</article>;
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function PeopleIcon() { return <Icon><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20v-2a6 6 0 0 1 12 0v2M14 15a5 5 0 0 1 7 5" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /></Icon>; }
function WarningIcon() { return <Icon><path d="M12 3 2 21h20Z" /><path d="M12 9v5M12 18h.01" /></Icon>; }
function LockIcon() { return <Icon><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></Icon>; }
function PhoneIcon() { return <Icon><path d="M7 3 4 5c0 8 7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2Z" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function ArrowIcon() { return <Icon><path d="M5 12h14m-5-5 5 5-5 5" /></Icon>; }
