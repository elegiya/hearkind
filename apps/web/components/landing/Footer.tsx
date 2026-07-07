export default function Footer() {
  return (
    <footer className="relative z-30 md:absolute md:bottom-0 md:left-0 md:right-0">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 text-sm text-[#2a241d] md:flex-row md:items-center md:justify-between">
        <a
          href="#"
          className="inline-flex w-fit items-center gap-3 rounded-full bg-white/60 px-4 py-2 font-semibold shadow-sm backdrop-blur-md transition hover:bg-white/80"
        >
          <span className="text-xl leading-none">♡</span>
          <span>HearKind</span>
        </a>

        <nav className="flex w-fit flex-wrap gap-2 rounded-full bg-white/45 p-1.5 shadow-sm backdrop-blur-md">
          <a
            href="#how"
            className="rounded-full px-4 py-2 font-medium transition hover:bg-white/65"
          >
            How it works
          </a>

          <a
            href="#why"
            className="rounded-full px-4 py-2 font-medium transition hover:bg-white/65"
          >
            Why HearKind
          </a>

          <a
            href="#safety"
            className="rounded-full px-4 py-2 font-medium transition hover:bg-white/65"
          >
            Safety
          </a>

          <a
            href="#start"
            className="rounded-full px-4 py-2 font-medium transition hover:bg-white/65"
          >
            Waitlist
          </a>
        </nav>

        <p className="w-fit rounded-full bg-white/55 px-4 py-2 text-[#2a241d]/75 shadow-sm backdrop-blur-md">
          © 2026 HearKind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}