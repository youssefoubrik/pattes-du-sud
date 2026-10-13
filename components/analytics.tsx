"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || pathname.includes("/admin")) return;
    const source = pathname.endsWith("/mirleft")
      ? new URLSearchParams(location.search).get("source")
      : null;
    navigator.sendBeacon(
      "/api/events",
      JSON.stringify({ kind: "view", path: pathname, source }),
    );
  }, [pathname]);
  useEffect(() => {
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const kind = /\/donate(?:\/|$)/.test(href)
        ? "donate"
        : href.startsWith("https://wa.me/")
          ? "whatsapp"
          : null;
      if (kind && !location.pathname.includes("/admin"))
        navigator.sendBeacon(
          "/api/events",
          JSON.stringify({ kind, path: location.pathname }),
        );
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
