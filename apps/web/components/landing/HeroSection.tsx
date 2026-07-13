"use client";

import Header from "@/components/landing/Header";
import Image from "next/image";

type HeroSectionProps = {
  onWaitlistClick: (source: "header" | "hero") => void;
};

export default function HeroSection({ onWaitlistClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#fbf5ed] lg:min-h-[820px]">
      <div className="absolute inset-y-0 right-0 z-0 hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/images/hero-chair-new.png"
          alt="A cozy armchair with a cup and plant"
          fill
          priority
          className="object-cover object-[25%_center]"
        />
      </div>

      <div className="relative z-30">
        <Header onWaitlistClick={() => onWaitlistClick("header")} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-36 pt-16 sm:pb-40 lg:grid lg:grid-cols-[48%_52%] lg:pb-44">
        <div className="relative z-10 mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#c66f4b] sm:tracking-[0.35em]">
            Anonymous peer support
          </p>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Find someone who truly understands
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f6254] lg:max-w-md">
            Connect with someone who&apos;s been through a similar life challenge —
            outside your social circle, anonymously, and without the pressure of
            social media.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => onWaitlistClick("hero")}
              className="rounded-full bg-[#3f4734] px-7 py-4 text-center text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              Join the waitlist
            </button>

            <a
              href="#how"
              className="rounded-full border border-[#3f4734]/50 px-7 py-4 text-center text-sm font-medium transition hover:bg-white/45"
            >
              See how it works
            </a>
          </div>

          <div className="mt-16 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0c2a6] text-xl">
              ♡
            </div>
            <div>
              <p className="font-medium">Private. Safe. Human.</p>
              <p className="text-sm text-[#6f6254]">Your story stays yours.</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-12 aspect-[16/11] w-full max-w-3xl overflow-hidden rounded-[2rem] shadow-xl lg:hidden">
          <Image
            src="/images/hero-chair-new.png"
            alt="A cozy armchair with a cup and plant"
            fill
            priority
            className="object-cover object-[25%_center]"
          />
        </div>

        <div className="hidden lg:block" />
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="h-[90px] w-full sm:h-[120px] lg:h-[150px]"
          aria-hidden="true"
        >
          <path
            d="M0,110 C180,170 260,20 440,55 C620,90 690,140 880,125 C1080,110 1190,40 1440,65 L1440,180 L0,180 Z"
            fill="#fffaf4"
          />
        </svg>
      </div>
    </section>
  );
}
