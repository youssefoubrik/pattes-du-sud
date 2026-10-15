import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  compact?: boolean;
  arrow?: boolean;
  variant?: "primary" | "secondary" | "donate";
};

export function ButtonLink({ compact = false, arrow = false, variant = "primary", className = "", children, ...props }: Props) {
  return (
    <Link
      className={`group inline-flex min-h-11 shrink-0 items-center justify-center rounded-full gap-2 text-[19px] font-bold transition-[color,background-color,border-color,translate,opacity] duration-200 ${variant === "donate" ? "donate-link gap-2 bg-primary text-primary-foreground hover:bg-donate-hover motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5" : variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "bg-secondary-button text-primary-foreground hover:opacity-90"} ${compact ? "px-3 sm:px-6" : "px-5"} ${className}`}
      {...props}
    >
      {variant === "donate" && <Heart size={18} fill="currentColor" className="donate-heart shrink-0" aria-hidden="true" />}
      {children}
      {arrow && (
        <ArrowRight
          size={20}
          className="shrink-0 rtl:rotate-180 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5 rtl:motion-safe:group-hover:-translate-x-0.5 rtl:motion-safe:group-focus-visible:-translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
