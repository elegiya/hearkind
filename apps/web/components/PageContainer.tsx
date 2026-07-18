import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-6 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
