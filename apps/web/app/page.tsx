"use client";

import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyHearKindSection from "@/components/landing/WhyHearKindSection";
import SafetySection from "@/components/landing/SafetySection";
import StartSection from "@/components/landing/StartSection";
import WaitlistModal from "@/components/landing/WaitlistModal";
import {
  trackWaitlistClicked,
  trackWaitlistModalOpened,
} from "@/lib/analytics/events";

type WaitlistSource = "header" | "hero" | "start";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = (source: WaitlistSource) => {
    trackWaitlistClicked(source);
    trackWaitlistModalOpened(source);
    setIsWaitlistOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#fbf5ed] text-[#2a241d]">
      <HeroSection onWaitlistClick={openWaitlist} />
      <HowItWorksSection />
      <WhyHearKindSection />
      <SafetySection />
      <StartSection onWaitlistClick={() => openWaitlist("start")} />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </main>
  );
}