"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { MailIcon } from "../login/LoginIcons";

const RECOVERY_ERRORS: Record<string, string> = {
  auth_callback_failed: "The reset link could not be opened. Please try again",
  missing_auth_code: "The reset link is invalid. Please request a new one",
};

function getInitialError() {
  if (typeof window === "undefined") return null;

  const errorCode = new URLSearchParams(window.location.search).get("error");
  return errorCode ? (RECOVERY_ERRORS[errorCode] ?? null) : null;
}

export function ForgotPasswordFormPanel() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(getInitialError);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", "/reset-password");
      callbackUrl.searchParams.set("error_redirect", "/forgot-password");

      const { error: resetError } =
        await createClient().auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: callbackUrl.toString(),
        });

      if (resetError) {
        if (resetError.status === 429) {
          setError("Too many reset emails. Please wait before trying again");
        } else {
          setError(resetError.message);
        }
        return;
      }

      setMessage(`Check ${normalizedEmail} for your password reset link`);
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-panel recovery-form-panel">
      <svg
        className="mobile-wave"
        viewBox="0 0 1000 150"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 56 C165 -26 342 7 505 66 C690 133 843 36 1000 82 V150 H0 Z" />
      </svg>

      <div className="form-content">
        <div className="form-card">
          <header className="form-header">
            <h2>Reset your password</h2>
            <p>We’ll send you a secure link to choose a new password</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="field-group recovery-fields-end">
              <label htmlFor="recovery-email">Email</label>
              <div className="input-shell">
                <MailIcon />
                <input
                  id="recovery-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={Boolean(message)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            {message && (
              <div className="success-message" role="status">
                {message}
              </div>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={isSubmitting || Boolean(message)}
            >
              {isSubmitting ? "Sending link…" : "Send reset link"}
            </button>
          </form>

          <p className="signup-copy">
            Remember your password? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
