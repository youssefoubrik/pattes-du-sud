import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  compact?: boolean;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ compact = false, variant = "primary", className = "", children, ...props }: Props) {
  return (
    <Link
      className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full text-[19px] font-bold transition-colors ${variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "border border-border text-heading hover:border-secondary-button-hover hover:bg-secondary-button-hover hover:text-primary-foreground"} ${compact ? "px-3 sm:px-6" : "px-5"} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
