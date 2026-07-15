import Link from "next/link";
import { ReactNode } from "react";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/legal", label: "Legal notice" },
];

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fbf5ed] text-[#2a241d]">
      <header className="border-b border-[#e5d6c8] bg-[#fffaf4]/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="text-2xl">♡</span>
            <span>HearKind</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#d8c6b6] px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-[#6f6254]">
          Last updated: {lastUpdated}
        </p>

        <article className="mt-12 space-y-10 text-[1rem] leading-8 text-[#51483f] [&_a]:font-semibold [&_a]:underline [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#2a241d] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#2a241d] [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2">
          {children}
        </article>
      </main>

      <footer className="border-t border-[#e5d6c8] bg-[#fffaf4]">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-[#6f6254] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HearKind. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
            <CookieSettingsButton className="hover:underline" />
          </nav>
        </div>
      </footer>
    </div>
  );
}
