import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  compact?: boolean;
  arrow?: boolean;
  variant?: "primary" | "secondary" | "donate" | "link";
};

export function ButtonLink({ compact = false, arrow = false, variant = "primary", className = "", children, ...props }: Props) {
  const isLink = variant === "link";
  const variantClass = isLink
    ? "text-heading underline decoration-heading underline-offset-4 hover:opacity-80"
    : variant === "donate"
      ? "donate-link gap-2 bg-primary text-primary-foreground hover:bg-donate-hover motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5"
      : variant === "primary"
        ? "bg-primary text-primary-foreground hover:bg-primary-hover"
        : "bg-secondary-button text-primary-foreground hover:opacity-90";
  const layoutClass = isLink
    ? "group inline-flex min-h-11 items-center gap-2 font-bold transition-opacity duration-200"
    : "group inline-flex min-h-11 shrink-0 items-center justify-center rounded-full gap-2 text-[19px] font-bold transition-[color,background-color,border-color,translate,opacity] duration-200";

  return (
    <Link
      className={`${layoutClass} ${variantClass} ${!isLink ? (compact ? "px-3 sm:px-6" : "px-5") : ""} ${className}`}
      {...props}
    >
      {variant === "donate" && <Heart size={18} fill="currentColor" className="donate-heart shrink-0" aria-hidden="true" />}
      {children}
      {arrow && (
        <ArrowRight
          size={20}
          className="shrink-0 rtl:rotate-180"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
