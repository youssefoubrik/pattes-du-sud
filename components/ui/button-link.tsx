import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { compact?: boolean };

export function ButtonLink({ compact = false, className = "", children, ...props }: Props) {
  return (
    <Link
      className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary text-[19px] font-bold text-primary-foreground transition-colors hover:bg-primary-hover ${compact ? "px-3 sm:px-6" : "px-5"} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
