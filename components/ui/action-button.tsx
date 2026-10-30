import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "small";
};

export function ActionButton({
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}: Props) {
  const variantClass =
    variant === "secondary"
      ? "bg-secondary-button text-primary-foreground hover:opacity-90"
      : variant === "outline"
        ? "border border-border bg-secondary/70 text-heading hover:bg-secondary/80"
        : "bg-heading text-primary-foreground hover:opacity-90";
  const sizeClass = size === "small" ? "min-h-11 px-5" : "min-h-12 px-7";

  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition-[background-color,opacity] duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 ${sizeClass} ${variantClass} ${className}`}
      {...props}
    />
  );
}
