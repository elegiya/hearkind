"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import {
  EyeIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
} from "../login/LoginIcons";

export function SignupFormPanel() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: signupError } = await createClient().auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      if (data.session) {
        router.replace("/onboarding");
        router.refresh();
        return;
      }

      setMessage("Check your email to confirm your account");
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    setError(null);
    setMessage(null);
    setIsGoogleLoading(true);

    try {
      const { error: oauthError } =
        await createClient().auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });

      if (oauthError) {
        setError(oauthError.message);
        setIsGoogleLoading(false);
      }
    } catch {
      setError("Google sign-up could not be started. Please try again");
      setIsGoogleLoading(false);
    }
  }

  return (
    <section className="form-panel signup-form-panel">
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
            <h2>Create your account</h2>
            <p>Sign up to find support from someone who understands</p>
          </header>

          <form onSubmit={handleSignup}>
            <div className="field-group">
              <label htmlFor="signup-email">Email</label>
              <div className="input-shell">
                <MailIcon />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="signup-password">Password</label>
              <div className="input-shell">
                <LockIcon />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
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

            <div className="field-group signup-fields-end">
              <label htmlFor="confirm-password">Confirm password</label>
              <div className="input-shell">
                <LockIcon />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
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

            {message && (
              <div className="success-message" role="status">
                {message}
              </div>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>

            <div className="separator">
              <span />
              <p>or</p>
              <span />
            </div>

            <button
              className="google-button"
              type="button"
              disabled={isSubmitting || isGoogleLoading}
              onClick={handleGoogleSignup}
            >
              <GoogleIcon />
              <span>
                {isGoogleLoading ? "Connecting…" : "Continue with Google"}
              </span>
            </button>
          </form>

          <p className="signup-copy">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
