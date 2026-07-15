"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import {
  AuthButton,
  AuthDivider,
  AuthError,
  AuthField,
  AuthPasswordField,
  authStyles,
} from "@/components/auth/AuthControls";
import { GoogleIcon, LockIcon, MailIcon } from "@/components/auth/AuthIcons";
import AuthShell from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/clients";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
    }
  }

  async function handleGoogleLogin() {
    setError("");

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (googleError) {
      setError(googleError.message);
    }
  }

  return (
    <AuthShell
      imageAlt="A cozy armchair with a cup in warm sunlight"
      imageSrc="/images/hero-chair-new.png"
      imagePosition="42% center"
      mobileImagePosition="center 42%"
      visualBadge="A safe space to be heard, understood, and supported"
    >
      <AuthCard
        eyebrow="Anonymous peer support"
        title="Welcome back"
        desktopSubtitle="Log in to your HearKind account"
        mobileSubtitle="Good to see you again. You're not alone."
      >
        <form className={authStyles.formStack} onSubmit={handleSubmit}>
          <AuthField
            autoComplete="email"
            icon={<MailIcon />}
            label="Email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />

          <AuthPasswordField
            autoComplete="current-password"
            icon={<LockIcon />}
            label="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            value={password}
          />

          <div className={authStyles.linkRow}>
            <Link className={authStyles.textLink} href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          {error && <AuthError message={error} />}

          <AuthButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "Logging in..." : "Log in"}
          </AuthButton>

          <AuthDivider>or</AuthDivider>

          <AuthButton
            disabled={isSubmitting}
            onClick={handleGoogleLogin}
            variant="secondary"
          >
            <GoogleIcon />
            Continue with Google
          </AuthButton>
        </form>

        <p className={authStyles.footerText}>
          <span className={authStyles.desktopOnly}>
            Don&apos;t have an account?{" "}
          </span>
          <span className={authStyles.mobileOnly}>New here? </span>
          <Link className={authStyles.textLink} href="/signup">
            <span className={authStyles.desktopOnly}>Sign up</span>
            <span className={authStyles.mobileOnly}>Create an account</span>
          </Link>
        </p>
      </AuthCard>
    </AuthShell>
  );
}
