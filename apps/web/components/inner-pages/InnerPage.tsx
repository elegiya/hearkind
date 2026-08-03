"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";

import AppNavigation from "@/components/AppNavigation";

type Tone = "peach" | "green" | "warning" | "danger";

export function InnerPageShell({
  children,
  className = "",
  contentClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <main className={`inner-page ${className}`}>
      <AppNavigation />
      <div className={`inner-page-container ${contentClassName}`}>{children}</div>
    </main>
  );
}

export function InnerPageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle: string }) {
  return (
    <header className="inner-page-header">
      <div className="inner-page-header-copy">
        {eyebrow && <p className="inner-page-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="inner-page-subtitle">{subtitle}</p>
      </div>
      <div className="inner-page-header-watercolor" aria-hidden="true">
        <Image src="/images/matching-hero-lake.png" alt="" fill priority sizes="(max-width: 760px) 100vw, 70vw" />
      </div>
    </header>
  );
}

export function SettingsLayout({ children, aside, className = "" }: { children: React.ReactNode; aside?: React.ReactNode; className?: string }) {
  return (
    <div className={`settings-layout ${className}`}>
      {aside === undefined ? children : (
        <>
          <section className="settings-main" aria-label="Settings">{children}</section>
          <aside className="settings-aside" aria-label="Helpful information">{aside}</aside>
        </>
      )}
    </div>
  );
}

export function SettingsSectionCard({
  icon,
  tone = "peach",
  title,
  description,
  action,
  children,
  prominent = false,
  id,
  className = "",
}: {
  icon: React.ReactNode;
  tone?: Tone;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  prominent?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <article className={`settings-section-card${prominent ? " is-prominent" : ""} ${className}`} id={id}>
      <header className="settings-section-header">
        <IconCircle tone={tone}>{icon}</IconCircle>
        <div className="settings-section-heading">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action && <div className="settings-section-action">{action}</div>}
      </header>
      {children}
    </article>
  );
}

export function SettingsRowGroup({ children }: { children: React.ReactNode }) {
  return <div className="settings-row-group">{children}</div>;
}

export function SettingsRow({
  label,
  helper,
  leading,
  control,
  value,
  children,
  className = "",
}: {
  label: string;
  helper?: string;
  leading?: React.ReactNode;
  control?: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`settings-row${leading ? " is-with-leading" : ""} ${className}`}>
      {leading && <span className="settings-row-leading">{leading}</span>}
      <div className="settings-row-copy">
        <h3>{label}</h3>
        {helper && <p>{helper}</p>}
        {children}
      </div>
      {(control !== undefined || value !== undefined) && (
        <div className={`settings-row-control${control === undefined ? " is-value" : ""}`}>{control ?? value}</div>
      )}
    </div>
  );
}

export function AsideCard({ icon, tone = "peach", title, children, cta, className = "" }: { icon: React.ReactNode; tone?: Tone; title: string; children: React.ReactNode; cta?: React.ReactNode; className?: string }) {
  return (
    <article className={`aside-card ${className}`}>
      <header><IconCircle tone={tone}>{icon}</IconCircle><h2>{title}</h2></header>
      <div className="aside-card-content">{children}</div>
      {cta && <div className="aside-card-cta">{cta}</div>}
    </article>
  );
}

export function IconCircle({ tone = "peach", children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`settings-icon-circle is-${tone}`}>{children}</span>;
}

export function Switch({ checked, onChange, label, disabled = false, className = "" }: { checked: boolean; onChange: () => void; label: string; disabled?: boolean; className?: string }) {
  return (
    <button
      className={`settings-switch${checked ? " is-checked" : ""} ${className}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
    >
      <span aria-hidden="true" />
    </button>
  );
}

export function StatusBadge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" }) {
  return <span className={`status-badge is-${tone}`}>{children}</span>;
}

export function TextLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  return <Link className="text-link" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}<ArrowIcon /></Link>;
}

export function PillButton({
  children,
  href,
  tone = "secondary",
  onClick,
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  tone?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const className = `pill-button is-${tone}`;
  if (href) return <Link className={className} href={href}>{children}</Link>;
  return <button className={className} type={type} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function DangerZone({ title, description, action }: { title: string; description: string; action: React.ReactNode }) {
  return (
    <section className="danger-zone" aria-labelledby="danger-zone-title">
      <IconCircle tone="danger"><WarningIcon /></IconCircle>
      <div><h2 id="danger-zone-title">{title}</h2><p>{description}</p></div>
      <div>{action}</div>
    </section>
  );
}

export function InlineAlert({ children, tone = "error" }: { children: React.ReactNode; tone?: "error" | "success" }) {
  return <div className={`inline-alert is-${tone}`} role={tone === "error" ? "alert" : "status"}>{children}</div>;
}

export function Toast({ message }: { message: string }) {
  return <div className={`settings-toast${message ? " is-visible" : ""}`} role="status" aria-live="polite">{message}</div>;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  tone = "primary",
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  tone?: "primary" | "danger";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const titleId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <IconCircle tone={tone === "danger" ? "danger" : "peach"}>{tone === "danger" ? <WarningIcon /> : <RefreshIcon />}</IconCircle>
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
        <div>
          <button ref={cancelRef} className="pill-button is-secondary" type="button" onClick={onCancel}>Cancel</button>
          <button className={`pill-button is-${tone}`} type="button" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}

export function InnerPageSkeleton() {
  return (
    <InnerPageShell className="inner-page-loading">
      <div className="skeleton-heading"><span /><span /></div>
      <div className="settings-layout" aria-label="Loading settings" aria-busy="true">
        <div className="settings-main">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item}><i /><span /><span /></div>)}</div>
        <div className="settings-aside">{[1, 2].map((item) => <div className="skeleton-card is-small" key={item}><i /><span /></div>)}</div>
      </div>
    </InnerPageShell>
  );
}

function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>; }
function WarningIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 3 2 21h20Z" /><path d="M12 9v5M12 18h.01" /></svg>; }
function RefreshIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5" /><path d="M18 10a7 7 0 0 0-12-3l-2 2M6 14a7 7 0 0 0 12 3l2-2" /></svg>; }
