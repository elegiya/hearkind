import Image from "next/image";
import AuthBrand from "@/components/auth/AuthBrand";
import { HeartShieldIcon } from "@/components/auth/AuthIcons";
import styles from "./AuthFlow.module.css";

type AuthShellProps = {
  children: React.ReactNode;
  imageAlt: string;
  imagePosition?: string;
  imageSrc: string;
  mobileImagePosition?: string;
  visualBadge?: string;
};

export default function AuthShell({
  children,
  imageAlt,
  imagePosition = "center",
  imageSrc,
  mobileImagePosition = "center",
  visualBadge,
}: AuthShellProps) {
  return (
    <main
      className={styles.shell}
      style={
        {
          "--auth-image-position": imagePosition,
          "--auth-mobile-image-position": mobileImagePosition,
        } as React.CSSProperties
      }
    >
      <section className={styles.visualPane} aria-label="HearKind atmosphere">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 48vw"
          className={styles.visualImage}
        />
        <div className={styles.visualVeil} />

        <div className={styles.desktopBrand}>
          <AuthBrand href="/" variant="pill" />
        </div>

        {visualBadge && (
          <div className={styles.visualBadge}>
            <span className={styles.visualBadgeIcon}>
              <HeartShieldIcon />
            </span>
            <span>{visualBadge}</span>
          </div>
        )}
      </section>

      <section className={styles.formPane}>
        <div className={styles.formLandscape} aria-hidden="true">
          <Image src="/images/landscape-new.png" alt="" fill sizes="53vw" />
        </div>

        <div className={styles.formContent}>
          <div className={styles.formCard}>{children}</div>
        </div>
      </section>
    </main>
  );
}
