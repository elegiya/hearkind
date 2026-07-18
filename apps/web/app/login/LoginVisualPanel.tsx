import Image from "next/image";

import BrandLogo from "@/components/BrandLogo";
import PageContainer from "@/components/PageContainer";
import TrustBadge from "@/components/TrustBadge";

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
      </div>

      <TrustBadge className="login-trust-badge absolute bottom-10 left-12 z-[7] rounded-2xl bg-[#fbf5ed]/75 px-4 py-3 backdrop-blur-md" />
    </section>
  );
}
