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

      <TrustBadge className="login-trust-badge absolute bottom-10 left-12 z-[7] rounded-2xl border border-[#e5ded5] bg-[rgba(251,245,237,0.82)] px-3 py-2.5 shadow-[0_8px_24px_rgba(55,45,35,0.05)] backdrop-blur-[10px]" />
    </section>
  );
}
