"use client";

import Link from "next/link";
import { useState } from "react";

import { AsideCard, InnerPageHeader, InnerPageShell, SettingsLayout, SettingsRow, SettingsRowGroup, SettingsSectionCard } from "@/components/inner-pages/InnerPage";

import "./preferences.css";

const supportTopics = ["Relocation", "Loneliness", "Burnout", "Starting over"] as const;
const conversationPreferences = ["Someone to listen", "Shared experience", "Mutual conversation", "Gentle advice"] as const;
const languages = ["English", "Ukrainian"] as const;

export default function PreferencesPage() {
  const [introductionsPaused, setIntroductionsPaused] = useState(false);

  return (
    <InnerPageShell className="preferences-page" contentClassName="preferences-content">
        <InnerPageHeader
          title="Your preferences"
          subtitle="These preferences help us connect you with people who might understand."
        />

        <SettingsLayout className="preferences-layout">
          <section className="preferences-main" aria-label="Your connection preferences">
            <SettingsSectionCard
              icon={<ChatIcon />}
              title="Topics I may want support with"
              description="The topics you’d feel comfortable receiving support around."
              action={<EditPreferencesAction />}
            >
              <div className="preferences-tags">{supportTopics.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </SettingsSectionCard>

            <SettingsSectionCard
              icon={<PersonIcon />}
              title="Experiences I can relate to"
              description="Experiences you may feel comfortable supporting from your own perspective."
              action={<EditPreferencesAction />}
            >
              <p className="preferences-placeholder-summary">No experiences added yet.</p>
            </SettingsSectionCard>

            <SettingsSectionCard
              icon={<PeopleIcon />}
              title="What helps me in a conversation"
              description="The kind of connection that feels helpful right now."
              action={<EditPreferencesAction />}
            >
              <div className="preferences-tags">{conversationPreferences.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </SettingsSectionCard>

            <SettingsSectionCard
              icon={<GlobeIcon />}
              title="Languages and availability"
              description="The languages and times you’re comfortable connecting in."
              action={<EditPreferencesAction />}
            >
              <div className="preferences-tags">{languages.map((language) => <span key={language}>{language}</span>)}</div>
              <SettingsRowGroup>
                <SettingsRow leading={<ClockIcon />} label="Usually available in the evenings" helper="Your timezone: Europe/Vilnius" />
              </SettingsRowGroup>
            </SettingsSectionCard>

            <SettingsSectionCard
              icon={<ShieldIcon />}
              title="Matching comfort preferences"
              description="Control who can reach out to you and how often."
              action={<EditPreferencesAction />}
            >
              <SettingsRowGroup>
                <SettingsRow leading={<MailIcon />} label="Others may reach out to me" helper="You’re open to receiving introductions." />
                <SettingsRow leading={<ClockIcon />} label="Up to 3 requests per day" helper="You can change this anytime." />
              </SettingsRowGroup>
            </SettingsSectionCard>
          </section>

          <aside className="preferences-aside" aria-label="Safety and support">
            <AsideCard
              icon={<ShieldIcon />}
              title="Safety comes first"
              cta={<Link href="/safety">See safety tips <ArrowIcon /></Link>}
            >
              <p>You’re always in control.<br />You can pause new introductions,<br />block or report anyone,<br />and end conversations at any time.</p>
            </AsideCard>
            <AsideCard
              icon={<HeartIcon />}
              tone="warning"
              title="Take a break"
              cta={<button className={`hk-action ${introductionsPaused ? "hk-action--destructive" : "hk-action--tertiary"}`} type="button" onClick={() => setIntroductionsPaused((value) => !value)}>{introductionsPaused ? "Resume matching" : "Pause new matching"}</button>}
            >
              <p>Pause new matching whenever you need time for yourself.</p>
            </AsideCard>
            <AsideCard
              icon={<PeopleIcon />}
              tone="green"
              title="How matching uses your preferences"
            >
              <p>HearKind uses your topics, conversation preferences, languages, availability, and comfort settings to suggest more relevant matches.</p>
            </AsideCard>
          </aside>
        </SettingsLayout>
    </InnerPageShell>
  );
}

function EditPreferencesAction() {
  return <Link className="hk-action hk-action--secondary preferences-edit-action" href="/onboarding/preferences">Edit</Link>;
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /></Icon>; }
function PeopleIcon() { return <Icon><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 15a5 5 0 0 1 6 5" /></Icon>; }
function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>; }
function MailIcon() { return <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>; }
function ClockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
function ArrowIcon() { return <Icon><path d="M5 12h14m-5-5 5 5-5 5" /></Icon>; }
