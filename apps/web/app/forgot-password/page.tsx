import { LoginVisualPanel } from "../login/LoginVisualPanel";
import { ForgotPasswordFormPanel } from "./ForgotPasswordFormPanel";
import "../login/login-page.css";

export default function ForgotPasswordPage() {
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
            <path d="M 0 0 H 0.84 C 0.83 0.12, 0.83 0.23, 0.845 0.34 C 0.858 0.44, 0.86 0.49, 0.86 0.55 C 0.86 0.65, 0.85 0.74, 0.835 0.83 C 0.82 0.91, 0.82 0.96, 0.81 1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <LoginVisualPanel />
      <ForgotPasswordFormPanel />
    </main>
  );
}
