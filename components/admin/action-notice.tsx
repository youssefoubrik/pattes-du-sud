"use client";

import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function ActionNotice({
  message,
  queryParam,
  restoreScroll = false,
}: {
  message: string;
  queryParam: "success" | "error";
  restoreScroll?: boolean;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete(queryParam);
    url.searchParams.delete("notice");
    window.history.replaceState(window.history.state, "", url.toString());

    if (restoreScroll) {
      const savedScrollY = window.sessionStorage.getItem(
        "admin-companions-scroll-y",
      );
      window.sessionStorage.removeItem("admin-companions-scroll-y");
      const scrollY = Number(savedScrollY);
      if (savedScrollY !== null && Number.isFinite(scrollY) && scrollY >= 0) {
        window.requestAnimationFrame(() => window.scrollTo(0, scrollY));
      }
    }

    const timeout = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [queryParam, restoreScroll]);

  if (!visible) return null;

  return (
    <p
      role="status"
      className="fixed inset-x-4 top-4 z-50 mx-auto inline-flex w-fit max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 font-semibold text-heading shadow-lg"
    >
      <CircleCheck size={20} className="text-success" aria-hidden="true" />
      {message}
    </p>
  );
}
