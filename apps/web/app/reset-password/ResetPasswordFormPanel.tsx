"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { EyeIcon, LockIcon } from "../login/LoginIcons";

export function ResetPasswordFormPanel() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(
          updateError.message.toLowerCase().includes("session")
            ? "Your reset link is invalid or has expired. Request a new one"
            : updateError.message,
        );
        return;
      }

      await supabase.auth.signOut();
      router.replace("/login?password_reset=success");
      router.refresh();
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
            <h2>Choose a new password</h2>
            <p>Use at least 8 characters for your new password</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="new-password">New password</label>
              <div className="input-shell">
                <LockIcon />
                <input
                  id="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter a new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <EyeIcon crossed={showPassword} />
                </button>
              </div>
            </div>

            <div className="field-group recovery-fields-end">
              <label htmlFor="confirm-new-password">Confirm password</label>
              <div className="input-shell">
                <LockIcon />
                <input
                  id="confirm-new-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  minLength={8}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating password…" : "Update password"}
            </button>
          </form>

          <p className="signup-copy">
            Need a new link? <Link href="/forgot-password">Request one</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
