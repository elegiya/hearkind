import AuthBrand from "@/components/auth/AuthBrand";
import styles from "./AuthFlow.module.css";

type AuthCardProps = {
  children: React.ReactNode;
  desktopSubtitle: string;
  eyebrow?: string;
  mobileSubtitle?: string;
  title: string;
};

export default function AuthCard({
  children,
  desktopSubtitle,
  eyebrow,
  mobileSubtitle,
  title,
}: AuthCardProps) {
  return (
    <>
      <div className={styles.mobileBrand}>
        <AuthBrand href="/" variant="plain" />
      </div>

      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          <span className={mobileSubtitle ? styles.desktopOnly : undefined}>
            {desktopSubtitle}
          </span>
          {mobileSubtitle && (
            <span className={styles.mobileOnly}>{mobileSubtitle}</span>
          )}
        </p>
      </header>

      {children}
    </>
  );
}
