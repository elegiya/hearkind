"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/clients";
import styles from "./page.module.css";

function HeartIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8.5 10V7.5a3.5 3.5 0 1 1 7 0V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M12 14.5v2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ isVisible }: { isVisible: boolean }) {
  if (isVisible) {
    return (
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 3l18 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M9.9 4.3A10.8 10.8 0 0 1 12 4c5.2 0 8.8 4.5 9.7 6a1.8 1.8 0 0 1 0 2c-.4.7-1.4 2-2.8 3.2M6.6 6.6C4.4 8 2.9 10 2.3 11a1.8 1.8 0 0 0 0 2c.9 1.5 4.5 6 9.7 6 1.3 0 2.5-.3 3.6-.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.3 11a1.8 1.8 0 0 0 0 2c.9 1.5 4.5 6 9.7 6s8.8-4.5 9.7-6a1.8 1.8 0 0 0 0-2C20.8 9.5 17.2 5 12 5S3.2 9.5 2.3 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="m9.5 12 1.6 1.6 3.5-3.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(
          updateError.message ||
            "We could not update your password. Please request a new reset link.",
        );
        return;
      }

      router.replace("/login?passwordUpdated=true");
    } catch {
      setError(
        "Something went wrong while updating your password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.visualPanel} aria-hidden="true">
        <div className={styles.brand}>
          <HeartIcon />
          <span>HearKind</span>
        </div>

        <div className={styles.securityCard}>
          <div className={styles.securityIcon}>
            <ShieldIcon />
          </div>

          <span>Choose a strong password.</span>
        </div>
      </section>

      <section className={styles.formPanel}>
        <svg
          className={styles.curve}
          viewBox="0 0 140 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M140 0
              L140 1000
              L52 1000
              C80 890 92 790 86 690
              C78 555 45 440 42 315
              C39 190 60 85 96 0
              Z
            "
            fill="white"
          />
        </svg>

        <div className={styles.mobileBrand}>
          <HeartIcon />
          <span>HearKind</span>
        </div>

        <div className={styles.landscape} aria-hidden="true" />

        <div className={styles.content}>
          <header className={styles.header}>
            <h1>Set new password</h1>

            <p>Create a new password for your HearKind account.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="new-password">New password</label>

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <LockIcon />
                </span>

                <input
                  id="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className={styles.visibilityButton}
                  onClick={() => {
                    setShowPassword((current) => !current);
                  }}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                >
                  <EyeIcon isVisible={showPassword} />
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="confirm-password">Confirm password</label>

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <LockIcon />
                </span>

                <input
                  id="confirm-password"
                  name="confirmation"
                  type={showConfirmation ? "text" : "password"}
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className={styles.visibilityButton}
                  onClick={() => {
                    setShowConfirmation((current) => !current);
                  }}
                  aria-label={
                    showConfirmation ? "Hide password" : "Show password"
                  }
                  aria-pressed={showConfirmation}
                >
                  <EyeIcon isVisible={showConfirmation} />
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating password…" : "Update password"}
            </button>
          </form>

          <div className={styles.loginLink}>
            <span className={styles.line} />

            <Link href="/login">Back to log in</Link>

            <span className={styles.line} />
          </div>
        </div>
      </section>
    </main>
  );
}