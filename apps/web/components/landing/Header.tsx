export default function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <span className="text-2xl">♡</span>
        HearKind
      </div>

      <nav className="hidden gap-10 text-sm font-medium md:flex">
        <a href="#how">How it works</a>
        <a href="#safety">Safety</a>
        <a href="#about">About</a>
        <a href="#faq">FAQ</a>
      </nav>

      <a
        href="#start"
        className="rounded-full bg-[#3f4734] px-6 py-3 text-sm font-medium text-white"
      >
        Join the waitlist
      </a>
    </header>
  );
}