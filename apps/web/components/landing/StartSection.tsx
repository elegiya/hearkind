"use client";

import Image from "next/image";

import Footer from "@/components/landing/Footer";

type StartSectionProps = {
  onWaitlistClick: () => void;
};

export default function StartSection({
  onWaitlistClick,
}: StartSectionProps) {
  return (
    <section
      id="start"
      className="relative overflow-hidden bg-[#fffaf4]"
    >
      {/* Wave separating this section from the previous one */}
      <div className="absolute left-0 right-0 top-0 z-20">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="h-[150px] w-full"
          aria-hidden="true"
        >
          <path
            d="M0,70 C220,20 330,160 560,120 C770,85 980,10 1180,60 C1310,90 1380,100 1440,80 L1440,0 L0,0 Z"
            fill="#fffaf4"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden bg-[#fbf5ed] lg:min-h-[620px]">
        {/* Desktop landscape background */}
        <div className="absolute inset-y-0 left-0 z-0 hidden w-[58%] overflow-hidden lg:block">
          <Image
            src="/images/landscape-new.png"
            alt="A peaceful path through a warm landscape"
            fill
            sizes="58vw"
            className="object-cover object-[60%_center]"
          />

          {/* Subtle warm wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#fbf5ed]/[0.03]"
          />

          {/* Smooth transition from the landscape into the page background */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-[26%] bg-gradient-to-r from-transparent via-[#fbf5ed]/65 to-[#fbf5ed]"
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-6 pt-24 sm:pb-10 lg:min-h-[620px] lg:grid-cols-[58%_42%] lg:gap-0 lg:pb-0 lg:pt-10">
          {/* Mobile and tablet landscape */}
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-[#f2e7db] shadow-xl lg:hidden">
            <Image
              src="/images/landscape-new.png"
              alt="A peaceful path through a warm landscape"
              fill
              sizes="100vw"
              className="object-cover object-[60%_center]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#fbf5ed]/15 to-transparent"
            />
          </div>

          {/* Empty desktop column occupied by the background image */}
          <div className="hidden lg:block" />

          {/* CTA content */}
          <div className="flex items-center lg:pb-20 lg:pl-8 xl:pl-12">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
                Start your journey
              </p>

              <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight lg:text-6xl">
                Start with one
                <br />
                honest sentence
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f6254] lg:max-w-md">
                Join the waitlist and help shape the first version of
                HearKind.
              </p>

              <button
                type="button"
                onClick={onWaitlistClick}
                className="mt-10 inline-flex w-full justify-center rounded-full bg-[#3f4734] px-7 py-4 text-sm font-medium text-white shadow-xl transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#35402f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3f4734] focus-visible:ring-offset-2 sm:w-auto"
              >
                Join the waitlist
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}