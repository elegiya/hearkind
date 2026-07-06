const options = [
  {
    label: "Friends",
    icon: "☕",
    title: "They care, but they're part of your life",
    description:
      "Sometimes you're afraid of being judged, becoming a burden, or having your story shared with people you both know.",
  },
  {
    label: "Therapy",
    icon: "🛋️",
    title: "Professional support matters",
    description:
      "But appointments take time, and sometimes you simply need someone to talk to today.",
  },
];

const hearKindPoints = [
  "Outside your everyday life",
  "Matched by shared experience",
  "No pressure to perform",
];

export default function WhyHearKindSection() {
  return (
    <section className="bg-[#fffaf4] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
            Why HearKind
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Not every conversation
            <br />
            belongs with people you know
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6f6254]">
            Some conversations are too personal for friends, but too important
            to keep to yourself.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {options.map((option) => (
            <article
              key={option.label}
              className="rounded-[2rem] bg-[#fbf5ed] p-7 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0c2a6] text-xl">
                {option.icon}
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#c66f4b]">
                {option.label}
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                {option.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6f6254]">
                {option.description}
              </p>
            </article>
          ))}

          <article className="relative overflow-hidden rounded-[2rem] bg-[#4a503d] p-7 text-white shadow-[0_24px_70px_rgba(42,36,29,0.14)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f0c2a6]/20" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0c2a6]/20 text-xl text-[#f0c2a6]">
                ♡
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#f0c2a6]">
                HearKind
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                Somewhere between friends and therapy
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#f4e5d4]">
                A private conversation with someone outside your everyday life,
                carefully matched by shared experience — not random chance.
              </p>

              <div className="mt-6 space-y-3">
                {hearKindPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0c2a6]/20 text-xs text-[#f0c2a6]">
                      ✓
                    </span>

                    <span className="text-sm text-[#f4e5d4]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}