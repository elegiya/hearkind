import Image from "next/image";

const steps = [
  {
    title: "Share what you’re going through",
    description: "Write a short, private note about what feels heavy right now.",
    image: "/images/journal.png",
  },
  {
    title: "Get matched with someone similar",
    description: "HearKind looks for shared context, not random conversations.",
    image: "/images/plant-mug.png",
  },
  {
    title: "Talk when both of you feel ready",
    description: "Start with a safe text chat before moving to a call.",
    image: "/images/chat.png",
  },
];

const topics = [
  "Burnout",
  "Anxiety",
  "Loneliness",
  "Relocation",
  "Layoff",
  "Relationships",
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="bg-[#fffaf4] px-6 pb-20 pt-10">
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

                <div className="relative h-28 w-32">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-[#6f6254]">
                {step.description}
              </p>
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
  );
}