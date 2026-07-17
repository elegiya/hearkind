"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

import { EyeIcon, GoogleIcon, LockIcon, MailIcon } from "./LoginIcons";

const GOOGLE_CALLBACK_ERROR =
  "Google login could not be completed. Please try again.";

function getInitialError() {
  if (typeof window === "undefined") return null;

  return new URLSearchParams(window.location.search).get("error") ===
    "auth_callback_failed"
    ? GOOGLE_CALLBACK_ERROR
    : null;
}

export function LoginFormPanel() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(getInitialError);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: signInError } =
        await createClient().auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
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
      setError("Google login could not be started. Please try again.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <section className="form-panel">
      <div className="form-content">
        <div className="form-card">
          <div className="mobile-brand">
            <BrandLogo href="/" variant="plain" size="medium" />
          </div>
          <p className="mobile-eyebrow">Anonymous peer support</p>

          <header className="form-header">
            <h2>Welcome back</h2>
            <p>
              <span className="desktop-copy">Log in to your HearKind account</span>
              <span className="mobile-copy">
                Good to see you again. You&apos;re not alone.
              </span>
            </p>
          </header>

          <form onSubmit={handleLogin}>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <div className="input-shell">
                <MailIcon />
                <input
                  id="email"
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
              <label htmlFor="password">Password</label>
              <div className="input-shell">
                <LockIcon />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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

            <div className="forgot-password">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isSubmitting ? "Logging in…" : "Log in"}
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
              onClick={handleGoogleLogin}
            >
              <GoogleIcon />
              <span>{isGoogleLoading ? "Connecting…" : "Continue with Google"}</span>
            </button>
          </form>

          <p className="signup-copy">
            <span className="desktop-copy">Don&apos;t have an account? </span>
            <span className="mobile-copy">New here? </span>
            <Link href="/signup">
              <span className="desktop-copy">Sign up</span>
              <span className="mobile-copy">Create an account</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
