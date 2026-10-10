import Link from "next/link";
import { Heart } from "lucide-react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  compact?: boolean;
  variant?: "primary" | "secondary" | "donate";
};

export function ButtonLink({ compact = false, variant = "primary", className = "", children, ...props }: Props) {
  return (
    <Link
      className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full text-[19px] font-bold transition-[color,background-color,border-color,translate] duration-200 ${variant === "donate" ? "gap-2 bg-primary text-primary-foreground hover:bg-donate-hover motion-safe:hover:-translate-y-0.5" : variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "border border-border text-heading hover:border-secondary-button-hover hover:bg-secondary-button-hover hover:text-primary-foreground"} ${compact ? "px-3 sm:px-6" : "px-5"} ${className}`}
      {...props}
    >
      {variant === "donate" && <Heart size={18} fill="currentColor" className="shrink-0" aria-hidden="true" />}
      {children}
    </Link>
  );
}
