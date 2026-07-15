import Link from "next/link";
import styles from "./AuthFlow.module.css";

type AuthBrandProps = {
  className?: string;
  href?: string;
  variant?: "pill" | "plain";
};

export default function AuthBrand({
  className = "",
  href = "/",
  variant = "pill",
}: AuthBrandProps) {
  return (
    <Link
      aria-label="HearKind home"
      className={`${styles.brand} ${
        variant === "pill" ? styles.brandPill : styles.brandPlain
      } ${className}`}
      href={href}
    >
      <span aria-hidden="true">♡</span>
      <span>HearKind</span>
    </Link>
  );
}
