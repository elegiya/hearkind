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
    <section id="how" className="bg-[#fffaf4] px-6 pb-20 pt-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
          How it works
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-[#2a241d] md:text-5xl">
          Support starts with
          <br />
          being matched with the right person.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2.25rem] bg-[#fbf5ed]/80 px-8 py-9 text-left shadow-[0_16px_40px_rgba(76,55,35,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(76,55,35,0.09)]"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0c2a6] text-sm font-semibold">
                  {index + 1}
                </span>
              </div>

              <div className="mt-5 flex justify-center">
                <div className="relative h-32 w-44">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-serif text-[1.65rem] font-medium leading-tight text-[#2a241d]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-4 max-w-[270px] text-base leading-7 text-[#6f6254]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
          You are not alone in this
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {topics.map((topic) => (
            <span
              key={topic.label}
              className="inline-flex items-center gap-3 rounded-full border border-[#e5d6c8] bg-[#fffaf4] px-6 py-3 text-sm shadow-[0_8px_24px_rgba(76,55,35,0.035)] transition duration-200 hover:-translate-y-0.5 hover:bg-white"
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