"use client";

type HeaderProps = {
  onWaitlistClick: () => void;
};

export default function Header({ onWaitlistClick }: HeaderProps) {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a
        href="#"
        className="inline-flex items-center gap-3 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#2a241d] shadow-sm backdrop-blur-md transition hover:bg-white/75"
      >
        <span className="text-xl leading-none">♡</span>
        <span>HearKind</span>
      </a>

      <nav className="hidden items-center gap-2 rounded-full bg-white/45 p-1.5 shadow-sm backdrop-blur-md md:flex">
        <a href="#how" className="rounded-full px-4 py-2 text-sm font-medium text-[#2a241d] transition hover:bg-white/65">
          How it works
        </a>
        <a href="#why" className="rounded-full px-4 py-2 text-sm font-medium text-[#2a241d] transition hover:bg-white/65">
          Why HearKind
        </a>
        <a href="#safety" className="rounded-full px-4 py-2 text-sm font-medium text-[#2a241d] transition hover:bg-white/65">
          Safety
        </a>
        <a href="#start" className="rounded-full px-4 py-2 text-sm font-medium text-[#2a241d] transition hover:bg-white/65">
          Waitlist
        </a>
      </nav>

      <button
        type="button"
        onClick={onWaitlistClick}
        className="rounded-full bg-[#3f4734] px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        Join the waitlist
      </button>
    </header>
  );
}