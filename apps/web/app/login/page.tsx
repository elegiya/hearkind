"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

const AUTHENTICATED_REDIRECT = "/";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    isGoogleLoading,
    setIsGoogleLoading,
  ] = useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const searchParams =
      new URLSearchParams(
        window.location.search,
      );

    if (
      searchParams.get("error") ===
      "auth_callback_failed"
    ) {
      setError(
        "Google login could not be completed. Please try again.",
      );
    }
  }, []);

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error: signInError } =
        await supabase.auth.signInWithPassword(
          {
            email: email.trim(),
            password,
          },
        );

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.replace(
        AUTHENTICATED_REDIRECT,
      );
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setIsGoogleLoading(true);

    try {
      const supabase = createClient();

      const { error: oauthError } =
        await supabase.auth.signInWithOAuth(
          {
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          },
        );

      if (oauthError) {
        setError(oauthError.message);
        setIsGoogleLoading(false);
      }
    } catch {
      setError(
        "Google login could not be started. Please try again.",
      );

      setIsGoogleLoading(false);
    }
  }

  return (
    <main className="login-page">
      <svg
        className="clip-definitions"
        width="0"
        height="0"
        aria-hidden="true"
      >
        <defs>
          <clipPath
            id="login-visual-clip"
            clipPathUnits="objectBoundingBox"
          >
            <path
              d="
                M 0 0
                H 0.84

                C 0.83 0.12,
                  0.83 0.23,
                  0.845 0.34

                C 0.858 0.44,
                  0.86 0.49,
                  0.86 0.55

                C 0.86 0.65,
                  0.85 0.74,
                  0.835 0.83

                C 0.82 0.91,
                  0.82 0.96,
                  0.81 1

                H 0
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <BottomLandscape />

      <section className="visual-panel">
        <div className="visual-background" />

        <div className="illustration">
          <Image
            src="/images/login-warm.png"
            alt="A warm watercolor scene with a journal, candle, cup and books"
            fill
            priority
            sizes="(max-width: 820px) 0px, 56vw"
          />
        </div>

        <div className="illustration-overlay" />

        <div className="brand">
            <BrandLogo
                href="/"
                variant="pill"
                size="small"
            />
        </div>

        <div className="visual-copy">
          <p className="visual-eyebrow">
            Private peer support
          </p>

          <h1>
            Understanding
            <br />
            starts here
          </h1>

          <p className="visual-subtitle">
            Private support from someone who gets it
          </p>
        </div>

        <div className="safety-card">
          <div className="safety-icon">
            <ShieldIcon />
          </div>

          <p>
            A safe space to be heard,
            <br />
            understood, and supported
          </p>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-content">
          <div className="form-card">
            <header className="form-header">
              <h2>Welcome back</h2>

              <p>
                Log in to your HearKind
                account
              </p>
            </header>

            <form
              onSubmit={handleLogin}
            >
              <div className="field-group">
                <label htmlFor="email">
                  Email
                </label>

                <div className="input-shell">
                  <MailIcon />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value,
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="input-shell">
                  <LockIcon />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value,
                      )
                    }
                    required
                  />

                  <button
                    className="password-toggle"
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword(
                        (
                          currentValue,
                        ) =>
                          !currentValue,
                      )
                    }
                  >
                    <EyeIcon
                      crossed={
                        showPassword
                      }
                    />
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div
                  className="error-message"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <button
                className="primary-button"
                type="submit"
                disabled={
                  isSubmitting ||
                  isGoogleLoading
                }
              >
                {isSubmitting
                  ? "Logging in…"
                  : "Log in"}
              </button>

              <div className="separator">
                <span />
                <p>or</p>
                <span />
              </div>

              <button
                className="google-button"
                type="button"
                disabled={
                  isSubmitting ||
                  isGoogleLoading
                }
                onClick={
                  handleGoogleLogin
                }
              >
                <GoogleIcon />

                <span>
                  {isGoogleLoading
                    ? "Connecting…"
                    : "Continue with Google"}
                </span>
              </button>
            </form>

            <p className="signup-copy">
              Don&apos;t have an
              account?{" "}
              <Link href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .login-page {
          position: relative;
          isolation: isolate;

          min-height: 100svh;
          overflow: hidden;

          background: #fffdfb;
          color: #211d19;

          font-family:
            var(--font-geist-sans),
            Arial,
            Helvetica,
            sans-serif;
        }

        .clip-definitions {
          position: absolute;

          width: 0;
          height: 0;

          overflow: hidden;
          pointer-events: none;
        }

        .visual-panel {
          position: absolute;
          z-index: 3;

          inset: 0 auto 0 0;

          width: 56vw;
          min-height: 100svh;

          overflow: hidden;

          clip-path: url(
            "#login-visual-clip"
          );

          -webkit-clip-path: url(
            "#login-visual-clip"
          );
        }

        .visual-background {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 17% 9%,
              rgba(
                255,
                255,
                255,
                0.88
              ),
              transparent 31%
            ),
            linear-gradient(
              145deg,
              #fffaf4 0%,
              #f9ebdd 48%,
              #f0d7c0 100%
            );
        }

        .illustration {
          position: absolute;
          z-index: 1;

          inset: 0;
        }

        .illustration
          :global(img) {
          object-fit: cover;
          object-position: center 62%;

          transform: scale(1.015);
        }

        .illustration-overlay {
          position: absolute;
          z-index: 2;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              rgba(
                  255,
                  249,
                  242,
                  0.96
                )
                0%,
              rgba(
                  255,
                  249,
                  242,
                  0.82
                )
                20%,
              rgba(
                  255,
                  249,
                  242,
                  0.4
                )
                38%,
              rgba(
                  255,
                  249,
                  242,
                  0.04
                )
                62%,
              transparent 100%
            ),
            linear-gradient(
              90deg,
              rgba(
                  255,
                  249,
                  242,
                  0.65
                )
                0%,
              rgba(
                  255,
                  249,
                  242,
                  0.3
                )
                42%,
              transparent 78%
            );
        }

        .brand {
          position: absolute;
          z-index: 6;

          top: clamp(
            32px,
            4vh,
            56px
          );

          left: clamp(
            34px,
            3.8vw,
            64px
          );
        }

        .visual-copy {
          position: absolute;
          z-index: 6;

          top: clamp(
            118px,
            15vh,
            185px
          );

          left: clamp(
            34px,
            3.8vw,
            64px
          );

          right: 17%;
        }

        .visual-eyebrow {
          margin:
            0 0
            clamp(
              16px,
              2vh,
              28px
            );

          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.35em;
          text-transform: uppercase;

          color: #c66f4b;
        }

        .visual-copy h1 {
          margin: 0;

          font-size: clamp(
            48px,
            4.65vw,
            72px
          );

          font-weight: 600;
          line-height: 0.95;
          letter-spacing: 0;

          color: #2a241d;
        }

        .visual-subtitle {
          max-width: 420px;
          margin: 28px 0 0;

          font-size: clamp(
            16px,
            1.15vw,
            18px
          );

          font-weight: 400;
          line-height: 1.6;
          letter-spacing: 0;

          color: #6f6254;
        }

        .safety-card {
          position: absolute;
          z-index: 7;

          left: clamp(
            28px,
            3.6vw,
            60px
          );

          bottom: clamp(
            54px,
            6.5vh,
            92px
          );

          display: flex;
          align-items: center;
          gap: 16px;

          padding: 17px 22px;

          border: 1px solid
            rgba(
              92,
              65,
              45,
              0.08
            );

          border-radius: 19px;

          background: rgba(
            255,
            249,
            244,
            0.92
          );

          box-shadow:
            0 16px 38px
            rgba(
              77,
              51,
              34,
              0.11
            );

          backdrop-filter: blur(13px);
        }

        .safety-card p {
          margin: 0;

          font-size: clamp(
            14px,
            1vw,
            18px
          );

          font-weight: 400;
          line-height: 1.45;

          color: #282622;
        }

        .safety-icon {
          display: grid;
          place-items: center;

          width: 46px;
          height: 46px;
          flex: 0 0 46px;

          border-radius: 50%;

          background: #f8ddcb;
          color: #c86237;
        }

        .safety-icon
          :global(svg) {
          width: 24px;
          height: 24px;
        }

        .form-panel {
          position: relative;
          z-index: 4;

          min-height: 100svh;
          margin-left: 46vw;

          overflow: hidden;
          background: transparent;
        }

        .form-content {
          position: relative;
          z-index: 5;

          min-height: 100svh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding:
            clamp(
              36px,
              4vh,
              96px
            )
            clamp(
              38px,
              4.5vw,
              76px
            )
            clamp(
              96px,
              13vh,
              260px
            )
            clamp(
              92px,
              6.5vw,
              132px
            );
        }

        .form-content::before {
          content: "";

          position: absolute;
          z-index: -1;

          top: clamp(
            22px,
            5vh,
            72px
          );

          left: 50%;

          width: min(
            820px,
            90%
          );

          height: min(
            780px,
            76vh
          );

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              rgba(
                251,
                245,
                237,
                0.72
              )
              0%,
              rgba(
                251,
                245,
                237,
                0.34
              )
              45%,
              transparent 74%
            );

          pointer-events: none;

          transform:
            translateX(-50%);
        }

        .form-card {
          position: relative;

          width: min(
            100%,
            clamp(
              462px,
              31vw,
              720px
            )
          );
        }

        .form-header {
          margin-bottom: clamp(
            34px,
            1.75vw,
            50px
          );
        }

        .form-header h2 {
          margin: 0 0 10px;

          font-size: clamp(
            38px,
            2.1vw,
            78px
          );

          font-weight: 650;
          line-height: 1.04;
          letter-spacing: -0.02em;

          color: #173f35;
        }

        .form-header p {
          margin: 0;

          font-size: clamp(
            17px,
            0.72vw,
            24px
          );
          font-weight: 400;
          line-height: 1.45;

          color: #676966;
        }

        .field-group {
          margin-bottom: clamp(
            22px,
            1.12vw,
            34px
          );
        }

        .field-group label {
          display: block;

          margin-bottom: 9px;

          font-size: clamp(
            16px,
            0.64vw,
            20px
          );
          font-weight: 600;

          color: #191b1a;
        }

        .input-shell {
          display: flex;
          align-items: center;

          min-height: clamp(
            64px,
            3.1vw,
            88px
          );
          padding:
            0
            clamp(
              17px,
              0.9vw,
              26px
            );

          border: 1px solid
            #d8d5d0;

          border-radius: clamp(
            16px,
            0.75vw,
            24px
          );

          background: rgba(
            255,
            255,
            255,
            0.78
          );

          backdrop-filter: blur(8px);

          transition:
            border-color 160ms ease,
            box-shadow 160ms ease,
            background 160ms ease;
        }

        .input-shell:focus-within {
          border-color: #173f35;
          background: #ffffff;

          box-shadow:
            0 0 0 3px
            rgba(
              23,
              63,
              53,
              0.1
            );
        }

        .input-shell
          :global(svg) {
          width: clamp(
            22px,
            0.9vw,
            30px
          );
          height: clamp(
            22px,
            0.9vw,
            30px
          );
          flex:
            0 0
            clamp(
              22px,
              0.9vw,
              30px
            );

          color: #6d706c;
        }

        .input-shell input {
          width: 100%;
          min-width: 0;
          height: clamp(
            62px,
            3vw,
            86px
          );

          padding:
            0
            clamp(
              15px,
              0.75vw,
              24px
            );

          border: 0;
          outline: 0;

          background: transparent;

          font: inherit;
          font-size: clamp(
            16px,
            0.7vw,
            21px
          );
          font-weight: 400;

          color: #1d2521;
        }

        .input-shell
          input::placeholder {
          color: #92938f;
        }

        .password-toggle {
          display: grid;
          place-items: center;

          padding: 7px;

          border: 0;
          background: transparent;

          color: #6d706c;
          cursor: pointer;
        }

        .forgot-password {
          display: flex;
          justify-content: flex-end;

          margin-top: -6px;
          margin-bottom: clamp(
            27px,
            1.2vw,
            38px
          );

          font-size: clamp(
            15px,
            0.62vw,
            19px
          );
          font-weight: 400;
        }

        .forgot-password a,
        .signup-copy a {
          color: #c86237;
          text-decoration: none;
        }

        .forgot-password a:hover,
        .signup-copy a:hover {
          text-decoration: underline;
        }

        .error-message {
          margin: -10px 0 18px;
          padding: 11px 13px;

          border: 1px solid
            rgba(
              176,
              61,
              52,
              0.22
            );

          border-radius: 11px;

          background: rgba(
            176,
            61,
            52,
            0.08
          );

          color: #963a32;
          font-size: 14px;
          line-height: 1.4;
        }

        .primary-button,
        .google-button {
          width: 100%;
          min-height: clamp(
            58px,
            2.9vw,
            82px
          );

          border-radius: clamp(
            15px,
            0.75vw,
            24px
          );

          font: inherit;
          font-size: clamp(
            17px,
            0.72vw,
            22px
          );
          font-weight: 500;

          cursor: pointer;

          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            opacity 150ms ease,
            background 150ms ease;
        }

        .primary-button {
          border: 0;

          background: #3e4a35;

          color: #ffffff;

          box-shadow:
            0 12px 25px
            rgba(
              62,
              74,
              53,
              0.15
            );
        }

        .primary-button:hover:not(
            :disabled
          ) {
          transform:
            translateY(-1px);

          box-shadow:
            0 15px 29px
            rgba(
              62,
              74,
              53,
              0.2
            );
        }

        .primary-button:disabled,
        .google-button:disabled {
          opacity: 0.62;
          cursor: not-allowed;
        }

        .separator {
          display: grid;

          grid-template-columns:
            1fr auto 1fr;

          align-items: center;
          gap: 18px;

          margin:
            clamp(
              21px,
              1vw,
              32px
            )
            0;

          color: #686a67;
          font-size: clamp(
            15px,
            0.62vw,
            19px
          );
        }

        .separator span {
          height: 1px;

          background: #ddd9d4;
        }

        .separator p {
          margin: 0;
        }

        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;

          border: 1px solid
            #d7d4cf;

          background: rgba(
            255,
            255,
            255,
            0.8
          );

          backdrop-filter: blur(8px);

          color: #171918;
        }

        .google-button:hover:not(
            :disabled
          ) {
          background: #ffffff;

          transform:
            translateY(-1px);
        }

        .google-button
          :global(svg) {
          width: clamp(
            22px,
            0.9vw,
            30px
          );
          height: clamp(
            22px,
            0.9vw,
            30px
          );
          flex:
            0 0
            clamp(
              22px,
              0.9vw,
              30px
            );
        }

        .signup-copy {
          margin:
            clamp(
              25px,
              1.1vw,
              38px
            )
            0 0;

          text-align: center;

          font-size: clamp(
            16px,
            0.68vw,
            21px
          );
          font-weight: 400;

          color: #6b6d69;
        }

        @media (
          max-width: 1280px
        ) {
          .visual-panel {
            width: 57vw;
          }

          .form-panel {
            margin-left: 46vw;
          }

          .form-content {
            padding-left: 102px;
            padding-right: 38px;
          }

          .visual-copy h1 {
            font-size: 37px;
          }

          .visual-eyebrow {
            margin-bottom: 16px;
            font-size: 10px;
            letter-spacing: 0.28em;
          }

          .visual-subtitle {
            font-size: 14px;
          }
        }

        @media (
          max-width: 1040px
        ) {
          .visual-panel {
            width: 58vw;
          }

          .form-panel {
            margin-left: 45vw;
          }

          .form-content {
            padding-left: 94px;
            padding-right: 30px;
          }

          .brand,
          .visual-copy {
            left: 34px;
          }

          .visual-copy {
            right: 16%;
          }

          .visual-copy h1 {
            font-size: 31px;
          }

          .visual-eyebrow {
            margin-bottom: 14px;
          }

          .visual-subtitle {
            margin-top: 15px;
            font-size: 13px;
          }

          .safety-card {
            left: 25px;

            padding:
              15px 17px;
          }
        }

        @media (
          max-width: 900px
        ) {
          .visual-panel {
            width: 58vw;
          }

          .form-panel {
            margin-left: 44vw;
          }

          .form-content {
            padding-left: 90px;
          }

          .visual-copy {
            top: 112px;
            right: 15%;
          }

          .visual-copy h1 {
            font-size: 28px;
          }

          .visual-subtitle {
            font-size: 12px;
          }
        }

        @media (
          max-width: 820px
        ) {
          .login-page {
            overflow-y: auto;
          }

          .visual-panel,
          .clip-definitions {
            display: none;
          }

          .form-panel {
            min-height: 100svh;
            margin-left: 0;
          }

          .form-content {
            min-height: 100svh;
            justify-content: flex-start;

            padding:
              50px
              22px
              24px;
          }

          .form-card {
            width: min(
              100%,
              460px
            );
          }

          .form-header {
            margin-bottom: 31px;
          }

        }

        @media (
          max-width: 480px
        ) {
          .form-content {
            padding-top: 38px;
          }

          .form-header h2 {
            font-size: 37px;
          }

          .form-header p {
            font-size: 16px;
          }

          .input-shell {
            min-height: 60px;
            border-radius: 15px;
          }

          .input-shell input {
            height: 58px;
            font-size: 16px;
          }

          .primary-button,
          .google-button {
            min-height: 56px;
            font-size: 16px;
          }

          .signup-copy {
            font-size: 15px;
          }

        }
      `}</style>
    </main>
  );
}

function BottomLandscape() {
  return (
    <div
      className="bottom-landscape"
      aria-hidden="true"
    >
      <Image
        src="/images/landscape-login.png"
        alt=""
        fill
        sizes="100vw"
      />

      <div className="fade-overlay" />

      <style jsx>{`
        .bottom-landscape {
          position: absolute;
          z-index: 1;

          inset: auto 0 0 0;

          height: clamp(
            185px,
            25vh,
            275px
          );

          overflow: hidden;
          pointer-events: none;
        }

        .bottom-landscape
          :global(img) {
          object-fit: cover;
          object-position: center bottom;

          opacity: 0.52;

          filter:
            saturate(0.82)
            contrast(0.94)
            brightness(1.04);
        }

        .fade-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(
                  255,
                  253,
                  251,
                  0.98
                )
                0%,
              rgba(
                  255,
                  253,
                  251,
                  0.9
                )
                10%,
              rgba(
                  255,
                  253,
                  251,
                  0.68
                )
                25%,
              rgba(
                  255,
                  253,
                  251,
                  0.28
                )
                48%,
              rgba(
                  255,
                  253,
                  251,
                  0.06
                )
                72%,
              transparent 100%
            );
        }

        @media (
          max-width: 820px
        ) {
          .bottom-landscape {
            height: 145px;
          }

          .bottom-landscape
            :global(img) {
            opacity: 0.46;
          }
        }

        @media (
          max-width: 480px
        ) {
          .bottom-landscape {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2"
      />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </svg>
  );
}

function EyeIcon({
  crossed,
}: {
  crossed: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="
          M 2.5 12
          S 6 6,
            12 6
          S 21.5 12,
            21.5 12
          S 18 18,
            12 18
          S 2.5 12,
            2.5 12
          Z
        "
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
      />

      {crossed && (
        <path d="M4 4 20 20" />
      )}
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="
          M 12 3
          L 19 6
          V 11
          C 19 15.8,
            16.1 19.2,
            12 21
          C 7.9 19.2,
            5 15.8,
            5 11
          V 6
          L 12 3
          Z
        "
      />

      <path d="m9.5 12.2 1.7 1.8 3.6-4" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="
          M 21.6 12.2
          c 0 -0.7 -0.1 -1.4 -0.2 -2
          H 12
          v 3.9
          h 5.4
          a 4.6 4.6 0 0 1 -2 3
          v 2.6
          h 3.3
          c 1.9 -1.8 2.9 -4.4
            2.9 -7.5
          Z
        "
      />

      <path
        fill="#34A853"
        d="
          M 12 22
          c 2.7 0 5 -0.9 6.7 -2.3
          l -3.3 -2.6
          c -0.9 0.6 -2.1 1 -3.4 1
          a 5.9 5.9 0 0 1
            -5.5 -4.1
          H 3.1
          v 2.7
          A 10 10 0 0 0 12 22
          Z
        "
      />

      <path
        fill="#FBBC05"
        d="
          M 6.5 14
          a 6 6 0 0 1 0 -4
          V 7.3
          H 3.1
          a 10 10 0 0 0 0 9.4
          L 6.5 14
          Z
        "
      />

      <path
        fill="#EA4335"
        d="
          M 12 5.9
          c 1.5 0 2.8 0.5 3.9 1.5
          l 2.9 -2.9
          A 9.8 9.8 0 0 0
            3.1 7.3
          L 6.5 10
          A 5.9 5.9 0 0 1
            12 5.9
          Z
        "
      />
    </svg>
  );
}
