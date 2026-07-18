type TrustBadgeProps = {
  className?: string;
};

export default function TrustBadge({ className = "" }: TrustBadgeProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0c2a6] text-xl"
        aria-hidden="true"
      >
        ♡
      </div>
      <div>
        <p className="font-medium text-[#2a241d]">Private. Safe. Human.</p>
        <p className="text-sm text-[#6f6254]">Your story stays yours</p>
      </div>
    </div>
  );
}
