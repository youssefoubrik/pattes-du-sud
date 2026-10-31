import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main";
  width?: "wide" | "content";
  padding?: "standard" | "compact" | "fixed";
};

const paddings = {
  standard: "px-6 sm:px-7",
  compact: "px-4 sm:px-5 lg:px-7",
  fixed: "px-6",
};

export function Container({ as: Tag = "div", width = "wide", padding = "standard", className = "", ...props }: Props) {
  return (
    <Tag
      className={`mx-auto w-full ${width === "wide" ? "max-w-[1400px]" : "max-w-[1200px]"} ${paddings[padding]} ${className}`}
      {...props}
    />
  );
}
