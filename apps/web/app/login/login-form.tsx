"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signInWithMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Enter your email address.");
      setLoading(false);
      return;
    }

    const redirectUrl = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
    email: normalizedEmail,
    options: {
        emailRedirectTo: redirectUrl,
    },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the secure sign-in link.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={signInWithMagicLink} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-neutral-900 px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Sending..." : "Email me a sign-in link"}
      </button>

      {message && (
        <p className="rounded-xl bg-green-50 p-3 text-sm text-green-800">
          {message}
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}