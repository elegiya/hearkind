"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import {
  AuthButton,
  AuthDivider,
  AuthError,
  AuthPasswordField,
  authStyles,
} from "@/components/auth/AuthControls";
import { LockIcon } from "@/components/auth/AuthIcons";
import AuthShell from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/clients";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError.message);
    }
  }

  return (
    <AuthShell
      imageAlt="A warm desk with a candle, plant, mug and journal"
      imageSrc="/images/login-picture.png"
      imagePosition="center"
      mobileImagePosition="center 44%"
      visualBadge="Choose a strong password."
    >
      <AuthCard
        title="Set new password"
        desktopSubtitle="Create a new password for your HearKind account."
        mobileSubtitle="Create a new password for your HearKind account."
      >
        <form className={authStyles.formStack} onSubmit={handleSubmit}>
          <AuthPasswordField
            autoComplete="new-password"
            icon={<LockIcon />}
            label="New password"
            name="new-password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your new password"
            required
            value={password}
          />

          <AuthPasswordField
            autoComplete="new-password"
            icon={<LockIcon />}
            label="Confirm password"
            name="confirm-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your new password"
            required
            value={confirmPassword}
          />

          {error && <AuthError message={error} />}

          <AuthButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "Updating..." : "Update password"}
          </AuthButton>

          <AuthDivider>
            <Link className={authStyles.textLink} href="/login">
              Back to log in
            </Link>
          </AuthDivider>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
