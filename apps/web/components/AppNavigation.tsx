"use client";

import Link from "next/link";
import { useState } from "react";

import BrandLogo from "@/components/BrandLogo";

import "./app-navigation.css";

type ActivePage = "home" | "requests" | "messages";

export default function AppNavigation({ active, overlay = false }: { active?: ActivePage; overlay?: boolean }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className={`app-navigation${overlay ? " app-navigation--overlay" : ""}`}>
      <BrandLogo href="/" variant="plain" size="small" className="app-navigation-brand" />
      <nav className="app-navigation-links" aria-label="Main navigation">
        <NavLink href="/matching" active={active === "home"}>Home</NavLink>
        <NavLink href="/requests" active={active === "requests"}>Requests</NavLink>
        <NavLink href="/messages" active={active === "messages"}>Messages</NavLink>
      </nav>
      <div className="app-navigation-profile">
        <button type="button" aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((value) => !value)}><span>M</span><ChevronIcon /></button>
        {profileOpen && <div className="app-profile-menu">
          <header><span>M</span><p><strong>Marina</strong><small>Your private profile</small></p></header>
          <Link href="/account"><PersonIcon />Account</Link>
          <Link href="/preferences"><SettingsIcon />Preferences</Link>
          <Link href="/notifications"><BellIcon />Notifications</Link>
          <Link href="/safety"><ShieldIcon />Safety &amp; privacy</Link>
          <button type="button"><SignOutIcon />Sign out</button>
        </div>}
      </div>
      <nav className="app-mobile-navigation" aria-label="Mobile navigation">
        <NavLink href="/matching" active={active === "home"}><HomeIcon />Home</NavLink>
        <NavLink href="/requests" active={active === "requests"}><RequestsIcon />Requests</NavLink>
        <NavLink href="/messages" active={active === "messages"}><MessageIcon />Messages</NavLink>
        <button className={profileOpen ? "is-active" : ""} type="button" onClick={() => setProfileOpen((value) => !value)}><PersonIcon />Profile</button>
      </nav>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) { return <Link className={active ? "is-active" : ""} href={href} aria-current={active ? "page" : undefined}>{children}</Link>; }
function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }
function ChevronIcon() { return <Icon><path d="m7 9 5 5 5-5" /></Icon>; }
function SettingsIcon() { return <Icon><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.5 1A7 7 0 0 0 14 5.7L13.7 3h-4L9.3 5.7A7 7 0 0 0 7 7L4.5 6l-2 3.4 2 1.5a7 7 0 0 0 0 2L2.5 14.5l2 3.4 2.5-1a7 7 0 0 0 2.3 1.3l.4 2.8h4l.4-2.8a7 7 0 0 0 2.3-1.3l2.5 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" /></Icon>; }
function BellIcon() { return <Icon><path d="M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17Z" /><path d="M10 20h4" /></Icon>; }
function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
function PersonIcon() { return <Icon><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>; }
function SignOutIcon() { return <Icon><path d="M10 5H5v14h5M14 8l4 4-4 4m4-4H9" /></Icon>; }
function HomeIcon() { return <Icon><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3Z" /></Icon>; }
function RequestsIcon() { return <Icon><path d="M5 4h14v16H5Z" /><path d="M8 8h8M8 12h8M8 16h5" /></Icon>; }
function MessageIcon() { return <Icon><path d="M4 5h16v12H9l-5 4Z" /></Icon>; }
