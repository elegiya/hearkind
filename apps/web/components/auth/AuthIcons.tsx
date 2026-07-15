type EyeIconProps = {
  crossed?: boolean;
};

export function HeartShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12 3 19 6v5c0 4.8-2.9 8.2-7 10-4.1-1.8-7-5.2-7-10V6l7-3Z" />
      <path d="M9.2 11.6c.7-1.2 2.2-1 2.8.1.6-1.1 2.1-1.3 2.8-.1.8 1.4-.8 3-2.8 4.4-2-1.4-3.6-3-2.8-4.4Z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </svg>
  );
}

export function EyeIcon({ crossed = false }: EyeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      {crossed && <path d="M4 4 20 20" />}
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.5Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-0.9 6.7-2.3l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 14a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9.1L6.4 14Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-9 5.5l3.4 2.7C7.2 7.7 9.4 5.9 12 5.9Z"
      />
    </svg>
  );
}
