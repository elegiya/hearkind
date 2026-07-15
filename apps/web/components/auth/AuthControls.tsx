"use client";

import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import styles from "./AuthFlow.module.css";
import { EyeIcon } from "./AuthIcons";

type AuthFieldProps = {
  icon: ReactNode;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

type AuthButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function AuthField({ icon, label, id, ...inputProps }: AuthFieldProps) {
  const inputId = id ?? inputProps.name;

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inputShell}>
        {icon}
        <input
          {...inputProps}
          id={inputId}
          className={styles.input}
          aria-label={label}
        />
      </div>
    </div>
  );
}

export function AuthPasswordField({
  icon,
  label,
  ...inputProps
}: Omit<AuthFieldProps, "type">) {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = inputProps.id ?? inputProps.name;

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inputShell}>
        {icon}
        <input
          {...inputProps}
          id={inputId}
          className={styles.input}
          type={isVisible ? "text" : "password"}
          aria-label={label}
        />
        <button
          aria-label={isVisible ? "Hide password" : "Show password"}
          className={styles.iconButton}
          onClick={() => setIsVisible((current) => !current)}
          type="button"
        >
          <EyeIcon crossed={isVisible} />
        </button>
      </div>
    </div>
  );
}

export function AuthButton({
  children,
  disabled,
  type = "button",
  variant = "primary",
}: AuthButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary
      }`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export function AuthDivider({ children }: { children: ReactNode }) {
  return <div className={styles.divider}>{children}</div>;
}

export function AuthError({ message }: { message: string }) {
  return (
    <p className={styles.error} role="alert">
      {message}
    </p>
  );
}

export { styles as authStyles };
