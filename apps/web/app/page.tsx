import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf5ed] text-[#2a241d]">
      <section className="relative min-h-[820px] overflow-hidden bg-[#fbf5ed]">
        <div className="absolute inset-y-0 right-0 z-0 hidden w-[60%] overflow-hidden md:block">
          <Image
            src="/images/hero-chair-new.png"
            alt="A cozy armchair with a cup and plant"
            fill
            priority
            className="object-cover object-[25%_center]"
          />
        </div>

        <div className="relative z-30">
          <Header />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 px-6 pt-16 md:grid-cols-2">
          <div className="max-w-xl pb-44">
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

            <div className="mt-16 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0c2a6] text-xl">
                ♡
              </div>
              <div>
                <p className="font-medium">Private. Safe. Human.</p>
                <p className="text-sm text-[#6f6254]">Your story stays yours.</p>
              </div>
            </div>
          </div>

          <div />
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="h-[150px] w-full"
            aria-hidden="true"
          >
            <path
              d="M0,110 C180,170 260,20 440,55 C620,90 690,140 880,125 C1080,110 1190,40 1440,65 L1440,180 L0,180 Z"
              fill="#fffaf4"
            />
          </svg>
        </div>
      </section>

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

      <section id="safety" className="bg-[#fffaf4] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#4a503d] p-10 text-white md:grid-cols-[280px_1fr] md:p-14">
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64">
              <Image
                src="/images/hands-heart.png"
                alt="Hands holding a heart"
                fill
                className="object-contain"
              />
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
          <div className="relative h-72 overflow-hidden rounded-[2rem]">
            <Image
              src="/images/landscape.png"
              alt="A peaceful path through a warm landscape"
              fill
              className="object-cover"
            />
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

      <Footer />
    </main>
  );
}