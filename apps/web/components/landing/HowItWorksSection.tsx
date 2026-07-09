import Image from "next/image";

const steps = [
  {
    title: "Share what you’re going through",
    description: "Write a short, private note about what feels heavy right now.",
    image: "/images/journal-new.png",
  },
  {
    title: "Get matched with someone similar",
    description: "HearKind looks for shared context, not random conversations.",
    image: "/images/plant-mug-new.png",
  },
  {
    title: "Talk when both of you feel ready",
    description: "Start with a safe text chat before moving to a call.",
    image: "/images/chat-new.png",
  },
];

const topics = [
  { label: "Burnout", icon: "♨" },
  { label: "Anxiety", icon: "◎" },
  { label: "Loneliness", icon: "♙" },
  { label: "Relocation", icon: "⌖" },
  { label: "Layoff", icon: "▣" },
  { label: "Relationships", icon: "♡" },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="bg-[#fffaf4] px-6 pb-8 pt-16 md:pb-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
          How it works
        </p>

        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          Support begins with finding
          <br />
          the right person
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] bg-[#fbf5ed] px-7 pb-7 pt-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0c2a6] text-sm font-semibold">
                  {index + 1}
                </span>
              </div>

              <div className="-mt-6 mb-5 flex justify-center">
                <div className="relative h-28 w-40">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="mx-auto max-w-[240px] text-lg font-semibold leading-snug text-[#2a241d]">
                {step.title}
              </h3>

              <p className="mx-auto mt-3 max-w-[250px] text-sm leading-6 text-[#6f6254]">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
          You are not alone in this
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {topics.map((topic) => (
            <span
              key={topic.label}
              className="inline-flex items-center gap-3 rounded-full border border-[#e5d6c8] bg-[#fffaf4] px-6 py-3 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              <span className="text-lg leading-none text-[#9b735a]">
                {topic.icon}
              </span>
              {topic.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}