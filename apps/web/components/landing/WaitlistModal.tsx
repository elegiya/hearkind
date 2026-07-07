"use client";

import { FormEvent, useEffect, useState } from "react";
import { validateEmail } from "@/lib/validation/email";
import {
  trackWaitlistDuplicate,
  trackWaitlistFailed,
  trackWaitlistSubmitStarted,
  trackWaitlistSuccess,
} from "@/lib/analytics/events";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("peer-support");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setName("");
    setInterest("peer-support");
    setError("");
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();

    window.setTimeout(() => {
      setIsSubmitted(false);
      resetForm();
    }, 200);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackWaitlistSubmitStarted(interest);
    const emailError = validateEmail(email);

    if (emailError) {
        setError(emailError);
        return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          interest,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          trackWaitlistDuplicate(interest);
        } else {
          trackWaitlistFailed(interest, data.error);
        }

        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      trackWaitlistSuccess(interest, data.waitlist?.id);

      resetForm();
      setIsSubmitted(true);
    } catch {
      setError("Could not join the waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        type="button"
        aria-label="Close waitlist modal"
        onClick={handleClose}
        className="absolute inset-0 bg-[#2a241d]/35 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#fffaf4] p-8 shadow-[0_30px_100px_rgba(42,36,29,0.25)]">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#fbf5ed] text-xl text-[#6f6254] transition hover:bg-[#f0c2a6]"
        >
          ×
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0c2a6] text-2xl">
              ♡
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight">
              You’re on the list
            </h2>

            <p className="mx-auto mt-4 max-w-sm leading-7 text-[#6f6254]">
              Thank you. We’ll let you know when HearKind is ready for early
              access.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-8 rounded-full bg-[#3f4734] px-7 py-4 text-sm font-medium text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
              Join the waitlist
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">
              Join the first people building HearKind together
            </h2>

            <p className="mt-4 leading-7 text-[#6f6254]">
              Leave your email and we’ll invite you when the first private beta
              is ready.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-[#e5d6c8] bg-white px-5 py-4 text-sm outline-none transition placeholder:text-[#9b8d7f] focus:border-[#c66f4b]"
              />

              <input
                type="text"
                placeholder="First name optional"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-[#e5d6c8] bg-white px-5 py-4 text-sm outline-none transition placeholder:text-[#9b8d7f] focus:border-[#c66f4b]"
              />

              <div className="relative">
              <select
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-[#e5d6c8] bg-white px-5 py-4 pr-12 text-sm text-[#2a241d] outline-none transition focus:border-[#c66f4b]"
              >
                <option value="peer-support">I’m looking for peer support</option>
                <option value="volunteer">I may want to support others</option>
                <option value="curious">I’m just curious</option>
              </select>

                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#6f6254]">
                    ▾
                </span>
              </div>

              {error && (
                <p className="rounded-2xl bg-[#f0c2a6]/30 px-4 py-3 text-sm text-[#8a3f2b]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-[#3f4734] px-7 py-4 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Joining..." : "Join the waitlist"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}