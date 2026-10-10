import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main";
  width?: "wide" | "content";
  padding?: "standard" | "compact" | "fixed";
};

const paddings = {
  standard: "px-6 sm:px-8",
  compact: "px-4 sm:px-6 lg:px-8",
  fixed: "px-6",
};

export function Container({ as: Tag = "div", width = "wide", padding = "standard", className = "", ...props }: Props) {
  return (
    <Tag
      className={`mx-auto w-full ${width === "wide" ? "max-w-7xl" : "max-w-6xl"} ${paddings[padding]} ${className}`}
      {...props}
    />
  );
}
