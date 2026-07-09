export default function Footer() {
  return (
    <footer className="relative z-30 text-[#2a241d] lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 text-sm lg:flex-row lg:items-center lg:justify-between lg:py-7">
        <a
          href="#"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-white/80 px-4 py-2 font-semibold text-[#2a241d] shadow-sm transition hover:bg-white"
        >
          <span className="text-xl leading-none">♡</span>
          <span>HearKind</span>
        </a>

        <nav className="flex w-full max-w-sm flex-col gap-1.5 rounded-[1.5rem] bg-white/75 p-1.5 text-center text-[#2a241d] shadow-sm sm:flex-row sm:rounded-full lg:w-fit lg:max-w-none">
          <a
            href="#how"
            className="rounded-full px-4 py-2 font-medium text-[#2a241d] transition hover:bg-white/75"
          >
            How it works
          </a>

          <a
            href="#why"
            className="rounded-full px-4 py-2 font-medium text-[#2a241d] transition hover:bg-white/75"
          >
            Why HearKind
          </a>

          <a
            href="#safety"
            className="rounded-full px-4 py-2 font-medium text-[#2a241d] transition hover:bg-white/75"
          >
            Safety
          </a>
        </nav>

        <p className="rounded-full bg-white/75 px-4 py-2 text-center text-[#2a241d]/75 shadow-sm">
          © 2026 HearKind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}