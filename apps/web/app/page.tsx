const steps = [
  {
    title: "Share what you’re going through",
    description: "Write a short, private note about what feels heavy right now.",
    icon: "✍️",
  },
  {
    title: "Get matched with someone similar",
    description: "HearKind looks for shared context, not random conversations.",
    icon: "🌱",
  },
  {
    title: "Talk when both of you feel ready",
    description: "Start with a safe text chat before moving to a call.",
    icon: "💬",
  },
];

const topics = ["Burnout", "Anxiety", "Loneliness", "Relocation", "Layoff", "Relationships"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf5ed] text-[#2a241d]">
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

      <section className="relative mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 overflow-hidden px-6 pb-24 pt-16 md:grid-cols-2">
        <div className="z-10 max-w-xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
            Anonymous peer support
          </p>

          <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Find someone who truly understands.
          </h1>

          <p className="mt-7 max-w-md text-lg leading-8 text-[#6f6254]">
            HearKind helps people going through similar life challenges connect
            for safe, empathetic, peer-to-peer support.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#start"
              className="rounded-full bg-[#3f4734] px-7 py-4 text-center text-sm font-medium text-white"
            >
              Get started
            </a>

            <a
              href="#how"
              className="rounded-full border border-[#3f4734]/50 px-7 py-4 text-center text-sm font-medium"
            >
              See how it works
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0c2a6] text-xl">
              ♡
            </div>
            <div>
              <p className="font-medium">Private. Safe. Human.</p>
              <p className="text-sm text-[#6f6254]">Your story stays yours.</p>
            </div>
          </div>
        </div>

        <div className="relative mt-16 min-h-[420px] md:mt-0">
          <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[#f0c2a6]/40 blur-3xl" />
          <div className="absolute right-10 top-10 h-[430px] w-[430px] rounded-full bg-[#e9d7bd]/70" />
          <div className="absolute right-20 top-24 h-[340px] w-[340px] rounded-[45%] bg-[#fff7ee] shadow-2xl" />

          <div className="absolute right-16 top-28 h-72 w-72 rounded-[3rem] bg-[#e8c3a7] p-8 shadow-xl">
            <div className="h-full rounded-[2rem] bg-[#f9eadb] p-6">
              <div className="mb-5 h-20 rounded-full bg-[#fff8ef]" />
              <div className="space-y-3">
                <div className="h-3 rounded-full bg-[#d5a98b]" />
                <div className="h-3 w-4/5 rounded-full bg-[#d5a98b]" />
                <div className="h-3 w-3/5 rounded-full bg-[#d5a98b]" />
              </div>
              <div className="mt-8 flex gap-3">
                <div className="h-11 w-11 rounded-full bg-[#3f4734]" />
                <div className="h-11 w-11 rounded-full bg-[#f0c2a6]" />
                <div className="h-11 w-11 rounded-full bg-[#fff8ef]" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 right-0 rounded-[2rem] bg-white/70 p-5 shadow-xl backdrop-blur">
            <p className="text-sm font-medium">You’re not alone here</p>
            <p className="mt-1 text-sm text-[#6f6254]">Someone will understand.</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 rounded-t-[55%] bg-[#fffaf4]" />
      </section>

      <section id="how" className="bg-[#fffaf4] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
            How it works
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight">
            Support starts with being matched with the right person.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[2rem] bg-[#fbf5ed] p-8 text-left shadow-sm"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0c2a6] text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-5xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#6f6254]">{step.description}</p>
              </article>
            ))}
          </div>

          <p className="mt-14 text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
            You are not alone in this
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-[#e5d6c8] bg-white px-5 py-3 text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="safety" className="bg-[#fffaf4] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#4a503d] p-10 text-white md:grid-cols-[280px_1fr] md:p-14">
          <div className="flex items-center justify-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#f0c2a6] text-7xl">
              ♡
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c2a6]">
              Safety first
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
              Not therapy. Not a crisis line. A safer way to find peer support.
            </h2>
            <p className="mt-6 max-w-2xl leading-8 text-[#f4e5d4]">
              HearKind is designed for supportive peer conversations. For
              medical emergencies, self-harm risk, or immediate danger, please
              contact local emergency services or a crisis hotline.
            </p>
          </div>
        </div>
      </section>

      <section id="start" className="bg-[#fffaf4] px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-[2rem] bg-[#f1dfc9]">
            <div className="absolute -left-10 bottom-0 h-48 w-72 rounded-t-full bg-[#d9c6ad]" />
            <div className="absolute bottom-0 left-24 h-36 w-80 rounded-t-full bg-[#c9d0b4]" />
            <div className="absolute left-16 top-14 h-16 w-16 rounded-full bg-[#d69b61]" />
            <div className="absolute bottom-12 left-20 h-2 w-80 rounded-full bg-white/70" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
              Start your journey
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Start with one honest sentence.
            </h2>
            <p className="mt-5 max-w-md leading-8 text-[#6f6254]">
              Soon you’ll be able to describe what you’re carrying and get
              matched with someone who has been through something similar.
            </p>

            <a
              href="#"
              className="mt-8 inline-flex rounded-full bg-[#3f4734] px-7 py-4 text-sm font-medium text-white"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eadfd3] bg-[#fffaf4] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-[#6f6254] md:flex-row">
          <p>♡ HearKind</p>
          <p>© 2026 HearKind. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}