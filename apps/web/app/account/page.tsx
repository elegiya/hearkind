"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ConfirmDialog, InnerPageHeader, InnerPageShell, SettingsLayout, Switch } from "@/components/inner-pages/InnerPage";

import "./account.css";

const aliases = ["Quiet Pine", "Soft Willow", "Golden Leaf", "Warm Cedar"] as const;
const avatars = [
  "/images/matching_reached_out_lake.png",
  "/images/matching_start_way.png",
  "/images/matching_search_way.png",
] as const;

export default function AccountPage() {
  const [aliasIndex, setAliasIndex] = useState(0);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [regenerateIdentityOpen, setRegenerateIdentityOpen] = useState(false);
  const [matchingPaused, setMatchingPaused] = useState(false);

  const regenerateIdentity = () => {
    setAliasIndex((value) => (value + 1) % aliases.length);
    setAvatarIndex((value) => (value + 1) % avatars.length);
    setRegenerateIdentityOpen(false);
  };

  return (
    <InnerPageShell className="account-page" contentClassName="account-content">
        <InnerPageHeader
          title="Account & privacy"
          subtitle="Manage your identity, privacy settings, and data."
        />

        <SettingsLayout className="account-layout">
          <section className="account-settings" aria-label="Account and privacy settings">
            <SettingsCard icon={<MaskIcon />} title="Anonymous identity" description="This is how others see you.">
              <div className="account-inner-list">
                <div className="account-setting-row">
                  <div><strong>{aliases[aliasIndex]}</strong><small>Your generated alias and avatar keep your identity private while you connect.</small></div>
                  <Image className="account-avatar" src={avatars[avatarIndex]} alt="Your anonymous avatar" width={48} height={48} />
                  <button type="button" onClick={() => setRegenerateIdentityOpen(true)}><RefreshIcon />Regenerate identity</button>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard icon={<PersonIcon />} title="Account">
              <div className="account-inner-list">
                <div className="account-setting-row account-setting-row--compact"><strong>Email address</strong><span>maria@example.com</span><button type="button">Edit</button></div>
                <div className="account-setting-row account-setting-row--compact"><strong>Authentication</strong><span>Email &amp; password</span><button type="button">Change</button></div>
                <div className="account-setting-row account-setting-row--compact"><div><strong>Sign out</strong><small>Sign out of HearKind on this device.</small></div><span /><Link className="account-danger-action" href="/login">Sign out <SignOutIcon /></Link></div>
              </div>
            </SettingsCard>

            <SettingsCard id="privacy" icon={<ShieldIcon />} title="Privacy and control">
              <div className="account-inner-list">
                <Link className="account-setting-row account-setting-row--control" href="/account#blocked-users"><div><strong>Blocked users</strong><small>Manage people you’ve blocked.</small></div><b>3 blocked</b><ChevronIcon /></Link>
                <div className="account-setting-row account-setting-row--control"><div><strong>Pause new matching</strong><small>Your open requests and new recommendations will be paused. Existing conversations stay available.</small></div><Switch className="account-toggle" checked={matchingPaused} label="Pause new matching" onChange={() => setMatchingPaused((value) => !value)} /></div>
              </div>
            </SettingsCard>

            <SettingsCard icon={<DatabaseIcon />} title="Data and legal">
              <div className="account-inner-list account-data-list">
                <div className="account-data-row"><strong>Export data</strong><span>Coming later</span><span /></div>
                <Link className="account-data-row" href="/privacy"><strong>Privacy Policy</strong><span>Read how we protect your information.</span><ChevronIcon /></Link>
                <Link className="account-data-row" href="/legal"><strong>Terms of Service</strong><span>Review our terms and conditions.</span><ChevronIcon /></Link>
                <Link className="account-data-row" href="/legal"><strong>Community Guidelines</strong><span>Our shared standards for a kind, safe space.</span><ChevronIcon /></Link>
              </div>
            </SettingsCard>

            <SettingsCard icon={<WarningIcon />} title="Danger zone">
              <div className="account-inner-list">
                <div className="account-setting-row account-setting-row--compact">
                  <div><strong>Delete account</strong><small>Permanently delete your account and all associated data.</small></div>
                  <span />
                  <button className="account-danger-action" type="button">Delete account</button>
                </div>
              </div>
            </SettingsCard>
          </section>

          <aside className="account-aside" aria-label="Privacy and safety information">
            <InfoCard className="account-info-card--anonymity" icon={<MaskIcon />} title="How anonymity works">
              <p>Your alias and avatar help you connect<br />without sharing who you are.</p>
              <ul><li>No names or personal details are shown.</li><li>Your identity is private and secure.</li><li>You’re in control of what you share.</li></ul>
              <Link href="/privacy">Learn more about anonymity <ExternalIcon /></Link>
            </InfoCard>
            <InfoCard icon={<ShieldIcon />} title="Safety &amp; control">
              <p>You have tools to protect your peace of mind.</p>
              <ul className="is-green"><li>Block or report any user at any time.</li><li>Pause matching whenever you need.</li><li>Choose who can reach out to you.</li></ul>
              <Link href="/safety">Visit safety settings <ChevronIcon /></Link>
            </InfoCard>
            <InfoCard icon={<MoonIcon />} title="Need a break?">
              <p>It’s okay to step back.<br />You can pause matching or take time away.</p>
              <button className="account-pause-button" type="button" onClick={() => setMatchingPaused((value) => !value)}><PauseIcon />{matchingPaused ? "Resume matching" : "Pause matching"}</button>
              <small>You can always return when you’re ready.</small>
            </InfoCard>
          </aside>
        </SettingsLayout>

        <ConfirmDialog
          open={regenerateIdentityOpen}
          title="Regenerate anonymous identity?"
          description="This will replace your current alias and avatar with a newly generated identity."
          confirmLabel="Regenerate identity"
          onCancel={() => setRegenerateIdentityOpen(false)}
          onConfirm={regenerateIdentity}
        />
    </InnerPageShell>
  );
}

function SettingsCard({ id, icon, title, description, children }: { id?: string; icon: React.ReactNode; title: string; description?: string; children: React.ReactNode }) {
  return <article className="account-settings-card" id={id}><header><span>{icon}</span><div><h2>{title}</h2>{description && <p>{description}</p>}</div></header>{children}</article>;
}

function InfoCard({ className = "", icon, title, children }: { className?: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <article className={`account-info-card ${className}`}><h2><span>{icon}</span>{title}</h2>{children}</article>;
}

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function MaskIcon() { return <Icon><path d="M3 8c2-1.5 5-2 9-2s7 .5 9 2l-1 7c-.4 3-3 5-6 5l-2-2-2 2c-3 0-5.6-2-6-5Z" /><circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /></Icon>; }
function DatabaseIcon() { return <Icon><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></Icon>; }
function WarningIcon() { return <Icon><path d="M12 3 2 21h20Z" /><path d="M12 9v5M12 18h.01" /></Icon>; }
function MoonIcon() { return <Icon><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></Icon>; }
function RefreshIcon() { return <Icon><path d="M20 7v5h-5M4 17v-5h5" /><path d="M18 10a7 7 0 0 0-12-3l-2 2M6 14a7 7 0 0 0 12 3l2-2" /></Icon>; }
function SignOutIcon() { return <Icon><path d="M10 5H5v14h5M14 8l4 4-4 4m4-4H9" /></Icon>; }
function ExternalIcon() { return <Icon><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6H5V6h6" /></Icon>; }
function ChevronIcon() { return <Icon><path d="m9 5 7 7-7 7" /></Icon>; }
function PauseIcon() { return <Icon><path d="M9 6v12M15 6v12" /></Icon>; }
