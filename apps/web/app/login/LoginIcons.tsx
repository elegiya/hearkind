export function MailIcon() {
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

export function LockIcon() {
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

export function EyeIcon({
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

export function GoogleIcon() {
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
