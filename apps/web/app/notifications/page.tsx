"use client";

import { useState } from "react";

import { AsideCard, InnerPageHeader, InnerPageShell, SettingsLayout, SettingsRow, SettingsRowGroup, SettingsSectionCard, Switch } from "@/components/inner-pages/InnerPage";

import "./notifications.css";

type Channel = "inApp" | "email";
type NotificationKey = "newMessage" | "unreadReminder" | "someoneReachedOut" | "requestExpiring" | "requestExpired" | "noResponses" | "matchingAvailable";
type NotificationSettings = Record<NotificationKey, Record<Channel, boolean>>;

const groups: Array<{
  title: string;
  description: string;
  icon: React.ReactNode;
  tone: "peach" | "green";
  rows: Array<{ key: NotificationKey; title: string; description: string }>;
}> = [
  {
    title: "Messages",
    description: "Stay updated when you get new messages.",
    icon: <MessageIcon />,
    tone: "green",
    rows: [
      { key: "newMessage", title: "New message", description: "Get notified when you receive a new message." },
      { key: "unreadReminder", title: "Unread reminder", description: "Gentle reminders for unread messages." },
    ],
  },
  {
    title: "My requests",
    description: "Get updates about your requests and conversations.",
    icon: <RequestIcon />,
    tone: "peach",
    rows: [
      { key: "someoneReachedOut", title: "Someone reached out", description: "You’ll be notified when someone responds to your request." },
      { key: "requestExpiring", title: "Request expiring", description: "Reminder before your request expires." },
      { key: "requestExpired", title: "Request expired", description: "Your request has expired." },
      { key: "noResponses", title: "No responses", description: "Let you know when your request hasn’t received any responses." },
    ],
  },
  {
    title: "Supporting others",
    description: "Updates about requests you’ve supported.",
    icon: <PeopleIcon />,
    tone: "green",
    rows: [
      { key: "matchingAvailable", title: "Matching request available", description: "Be notified when a new request matches your preferences." },
    ],
  },
];

const initialSettings: NotificationSettings = {
  newMessage: { inApp: true, email: true },
  unreadReminder: { inApp: true, email: false },
  someoneReachedOut: { inApp: true, email: true },
  requestExpiring: { inApp: true, email: false },
  requestExpired: { inApp: true, email: false },
  noResponses: { inApp: false, email: false },
  matchingAvailable: { inApp: true, email: true },
};

export default function NotificationsPage() {
  const [pauseEmails, setPauseEmails] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");

  const toggleSetting = (key: NotificationKey, channel: Channel) => {
    setSettings((current) => ({ ...current, [key]: { ...current[key], [channel]: !current[key][channel] } }));
  };

  return (
    <InnerPageShell className="notifications-page" contentClassName="notifications-content">
        <InnerPageHeader
          title="Notifications"
          subtitle="Choose how HearKind keeps you informed."
        />

        <SettingsLayout className="notifications-layout">
          <section className="notifications-main" aria-label="Notification preferences">
            <SettingsSectionCard
              className="notifications-pause-section"
              icon={<MailIcon />}
              title="Pause non-essential emails"
              description="Turn off all non-essential emails. You’ll still receive important safety messages."
              action={<Switch checked={pauseEmails} label="Pause non-essential emails" onChange={() => setPauseEmails((value) => !value)} />}
            />

            {groups.map((group) => (
              <SettingsSectionCard
                key={group.title}
                icon={group.icon}
                tone={group.tone}
                title={group.title}
                description={group.description}
              >
                <SettingsRowGroup>
                  {group.rows.map((row) => (
                    <SettingsRow
                      key={row.key}
                      label={row.title}
                      helper={row.description}
                      control={
                        <div className="notifications-row-controls">
                          <span className="notifications-channel-control">
                            <b>In-app</b>
                            <Switch checked={settings[row.key].inApp} label={`${row.title} in-app notifications`} onChange={() => toggleSetting(row.key, "inApp")} />
                          </span>
                          <span className="notifications-channel-control">
                            <b>Email</b>
                            <Switch checked={!pauseEmails && settings[row.key].email} disabled={pauseEmails} label={`${row.title} email notifications`} onChange={() => toggleSetting(row.key, "email")} />
                          </span>
                        </div>
                      }
                    />
                  ))}
                </SettingsRowGroup>
              </SettingsSectionCard>
            ))}
          </section>

          <aside className="notifications-aside" aria-label="How notifications work">
            <AsideCard icon={<BellIcon />} title="How notifications work">
              <ul className="notifications-list"><li>In-app notifications appear in your dashboard<br />and browser.</li><li>Email notifications are sent to your registered<br />email address.</li><li>You can change these settings anytime.</li><li>Safety and security messages are always on.</li></ul>
            </AsideCard>

            <AsideCard icon={<MoonIcon />} tone="green" title="Quiet hours">
              <p>We won’t send non-essential emails during<br />these hours.</p>
              <div className="notifications-time-range">
                <label><ClockIcon /><span className="sr-only">Quiet hours start</span><input type="time" value={quietStart} onChange={(event) => setQuietStart(event.target.value)} /></label>
                <i>–</i>
                <label><ClockIcon /><span className="sr-only">Quiet hours end</span><input type="time" value={quietEnd} onChange={(event) => setQuietEnd(event.target.value)} /></label>
              </div>
              <small className="notifications-local-time">Your local time</small>
            </AsideCard>

            <AsideCard icon={<HeartIcon />} tone="warning" title="Safety note">
              <p>Your privacy and well-being are our priority.</p>
              <ul className="notifications-list"><li>We never share your contact information.</li><li>You can pause emails or adjust quiet hours<br />whenever you need.</li></ul>
            </AsideCard>
          </aside>
        </SettingsLayout>
    </InnerPageShell>
  );
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function MailIcon() { return <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>; }
function MessageIcon() { return <Icon><path d="M4 5h16v12H9l-5 4Z" /><path d="M9 11h6" /></Icon>; }
function RequestIcon() { return <Icon><path d="M5 3h14v18H5Z" /><path d="M8 7h8M8 11h8M8 15h5" /></Icon>; }
function PeopleIcon() { return <Icon><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20v-2a6 6 0 0 1 12 0v2M14 15a5 5 0 0 1 7 5" /></Icon>; }
function BellIcon() { return <Icon><path d="M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17Z" /><path d="M10 20h4" /></Icon>; }
function MoonIcon() { return <Icon><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></Icon>; }
function ClockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>; }
function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
