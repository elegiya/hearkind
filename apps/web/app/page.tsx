const supportTopics = [
  "Burnout",
  "Anxiety",
  "Loneliness",
  "Relocation",
  "Layoff",
  "Relationships",
];

const steps = [
  {
    title: "Share what you’re going through",
    description:
      "Write a short, private note about what feels heavy right now.",
  },
  {
    title: "Get matched with someone similar",
    description:
      "HearKind looks for shared context, not random conversations.",
  },
  {
    title: "Talk when both of you feel ready",
    description:
      "Start with a safe text chat before moving to a call.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#1f1b16]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-tight">HearKind</div>

        <nav className="hidden items-center gap-8 text-sm text-[#6f6254] md:flex">
          <a href="#how-it-works">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#start">Start</a>
        </nav>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center md:py-32">
        <p className="mb-5 rounded-full border border-[#d8cfc2] bg-white/40 px-4 py-2 text-sm text-[#6f6254]">
          Anonymous peer support
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Find someone who truly understands.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6f6254]">
          HearKind helps people going through similar life challenges connect
          for safe, empathetic, peer-to-peer support.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#start"
            className="rounded-full bg-[#1f1b16] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a332a]"
          >
            Get started
          </a>

          <a
            href="#how-it-works"
            className="rounded-full border border-[#d8cfc2] bg-white/30 px-6 py-3 text-sm font-medium text-[#1f1b16] transition hover:bg-white/60"
          >
            See how it works
          </a>
        </div>

        <div className="mt-14 flex max-w-3xl flex-wrap justify-center gap-3">
          {supportTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-[#d8cfc2] bg-white/40 px-4 py-2 text-sm text-[#6f6254]"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b5f]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Support starts with being matched with the right person.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#d8cfc2] bg-white/45 p-6"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#1f1b16] text-sm font-medium text-white">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-[#6f6254]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="safety" className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#1f1b16] p-8 text-white md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d8cfc2]">
            Safety first
          </p>

          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Not therapy. Not a crisis line. A safer way to find peer support.
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-[#d8cfc2]">
            HearKind is designed for supportive peer conversations. For medical
            emergencies, self-harm risk, or immediate danger, people should
            contact local emergency services or a crisis hotline.
          </p>
        </div>
      </section>

      <section id="start" className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Start with one honest sentence.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6f6254]">
          Soon you’ll be able to describe what you’re carrying and get matched
          with someone who has been through something similar.
        </p>

        <a
          href="#"
          className="mt-8 inline-flex rounded-full bg-[#1f1b16] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a332a]"
        >
          Join the waitlist
        </a>
      </section>
    </main>
  );
}