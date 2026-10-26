"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AnalyticsEvent = { kind: "view"; path: string; source: string | null };

function sendAnalyticsEvent(event: AnalyticsEvent) {
  // Queue the event in the background so tracking never delays navigation.
  window.navigator.sendBeacon("/api/events", JSON.stringify(event));
}

function usePageViewTracking(pathname: string | null) {
  useEffect(() => {
    if (!pathname || pathname.includes("/admin")) return;

    const source = pathname.endsWith("/mirleft")
      ? new URLSearchParams(window.location.search).get("source")
      : null;
    sendAnalyticsEvent({ kind: "view", path: pathname, source });
  }, [pathname]);
}

export function Analytics() {
  const pathname = usePathname();
  usePageViewTracking(pathname);
  return null;
}
