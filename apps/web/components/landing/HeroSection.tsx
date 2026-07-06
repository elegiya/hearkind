"use client";

import Header from "@/components/landing/Header";
import Image from "next/image";

type HeroSectionProps = {
  onWaitlistClick: () => void;
};

export default function HeroSection({ onWaitlistClick }: HeroSectionProps) {
  return (
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
        <Header onWaitlistClick={onWaitlistClick} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 px-6 pt-16 md:grid-cols-2">
        <div className="max-w-xl pb-44">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
            Anonymous peer support
          </p>

          <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Find someone who truly understands
          </h1>

          <p className="mt-7 max-w-md text-lg leading-8 text-[#6f6254]">
            HearKind helps people going through similar life challenges connect
            for safe, empathetic, peer-to-peer support.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onWaitlistClick}
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
  );
}