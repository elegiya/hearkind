import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SafetySection from "@/components/landing/SafetySection";
import StartSection from "@/components/landing/StartSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf5ed] text-[#2a241d]">
      <HeroSection />
      <HowItWorksSection />
      <SafetySection />
      <StartSection />
    </main>
  );
}