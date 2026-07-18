import Image from "next/image";

import BrandLogo from "@/components/BrandLogo";
import PageContainer from "@/components/PageContainer";

export function LoginVisualPanel() {
  return (
    <section className="visual-panel">
      <div className="visual-background" />
      <div className="illustration">
        <Image
          src="/images/hero-chair-right-new.png"
          alt="A warm watercolor scene with a journal, candle, cup and books"
          fill
          priority
          sizes="(max-width: 820px) 0px, 56vw"
        />
      </div>
      <div className="illustration-overlay" />

      <PageContainer className="brand-shell">
        <BrandLogo href="/" variant="pill" size="small" />
      </PageContainer>

      <div className="visual-copy">
        <p className="visual-eyebrow">Anonymous peer support</p>
        <h1>
          A safe place
          <br />
          to come back to
        </h1>
        <p className="visual-subtitle">Continue where you left off.</p>
      </div>

      <div className="safety-card">
        <div className="safety-icon" aria-hidden="true">
          ♡
        </div>
        <div className="safety-copy">
          <p className="safety-title">Private. Safe. Human.</p>
          <p className="safety-subtitle">Your story stays yours.</p>
        </div>
      </div>
    </section>
  );
}
