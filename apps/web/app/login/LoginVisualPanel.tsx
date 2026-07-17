import Image from "next/image";

import BrandLogo from "@/components/BrandLogo";

import { ShieldIcon } from "./LoginIcons";

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

      <div className="brand">
        <BrandLogo href="/" variant="pill" size="small" />
      </div>

      <div className="visual-copy">
        <p className="visual-eyebrow">Private peer support</p>
        <h1>
          Understanding
          <br />
          starts here
        </h1>
        <p className="visual-subtitle">
          Private support from someone who gets it
        </p>
      </div>

      <div className="safety-card">
        <div className="safety-icon">
          <ShieldIcon />
        </div>
        <p>
          A safe space to be heard,
          <br />
          understood, and supported
        </p>
      </div>
    </section>
  );
}
