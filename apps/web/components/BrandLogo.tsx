import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  variant?: "plain" | "pill";
  size?: "small" | "medium";
  className?: string;
};

export default function BrandLogo({
  href,
  variant = "pill",
  size = "small",
  className = "",
}: BrandLogoProps) {
  const sizeClasses =
    size === "medium"
      ? {
          wrapper: "h-11 gap-3 px-5",
          icon: "text-2xl",
          text: "text-base",
        }
      : {
          wrapper: "h-10 gap-2 px-4",
          icon: "text-xl",
          text: "text-base",
        };

  const variantClasses =
    variant === "pill"
      ? `
          rounded-full
          border
          border-[#e5ded5]
          bg-[#fbf5ed]/90
          shadow-sm
          backdrop-blur-sm
          transition
          hover:bg-[#fbf5ed]
        `
      : "px-0";

  const classes = `
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    text-[#2a241d]
    ${sizeClasses.wrapper}
    ${variantClasses}
    ${className}
  `;

  const content = (
    <>
      <span
        className={`${sizeClasses.icon} font-normal leading-none`}
        aria-hidden="true"
      >
        ♡
      </span>

      <span
        className={`
          ${sizeClasses.text}
          font-semibold
          leading-none
          tracking-normal
        `}
      >
        HearKind
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`
          ${classes}
          outline-none
          focus-visible:ring-2
          focus-visible:ring-[#2a241d]
          focus-visible:ring-offset-2
        `}
        aria-label="HearKind home"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {content}
    </div>
  );
}
