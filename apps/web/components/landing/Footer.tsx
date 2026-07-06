export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 text-sm text-[#2a241d]/75 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 font-medium text-[#2a241d]">
          <span className="text-xl">♡</span>
          <span>HearKind</span>
        </div>

        <nav className="flex flex-wrap gap-6">
          <a href="#how" className="transition hover:text-[#2a241d]">
            How it works
          </a>
          <a href="#safety" className="transition hover:text-[#2a241d]">
            Safety
          </a>
          <a href="#start" className="transition hover:text-[#2a241d]">
            Waitlist
          </a>
        </nav>

        <p>© 2026 HearKind. All rights reserved.</p>
      </div>
    </footer>
  );
}