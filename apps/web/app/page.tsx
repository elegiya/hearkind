"use client";

import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyHearKindSection from "@/components/landing/WhyHearKindSection";
import SafetySection from "@/components/landing/SafetySection";
import StartSection from "@/components/landing/StartSection";
import WaitlistModal from "@/components/landing/WaitlistModal";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fbf5ed] text-[#2a241d]">
      <HeroSection onWaitlistClick={() => setIsWaitlistOpen(true)} />
      <HowItWorksSection />
      <WhyHearKindSection />
      <SafetySection />
      <StartSection onWaitlistClick={() => setIsWaitlistOpen(true)} />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </main>
  );
}