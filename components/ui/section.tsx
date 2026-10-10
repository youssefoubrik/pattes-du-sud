import type { ComponentProps } from "react";

type Props = ComponentProps<"section">;

export function Section({ className = "", ...props }: Props) {
  return <section className={`py-12 sm:py-16 lg:py-20 ${className}`} {...props} />;
}
