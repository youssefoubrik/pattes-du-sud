import type { ComponentProps } from "react";

type Props = ComponentProps<"figcaption">;

export function PhotoCaption({ className = "", ...props }: Props) {
  return (
    <figcaption
      className={`mt-4 text-center text-base leading-relaxed text-heading italic ${className}`}
      {...props}
    />
  );
}
