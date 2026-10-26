"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { QR_SOURCE_QUERY_PARAM } from "@/lib/qr-source";

type AnalyticsEvent = { kind: "view"; path: string; qrSource: string | null };

function sendAnalyticsEvent(event: AnalyticsEvent) {
  // Queue the event in the background so tracking never delays navigation.
  window.navigator.sendBeacon("/api/events", JSON.stringify(event));
}

function usePageViewTracking(pathname: string | null) {
  useEffect(() => {
    if (!pathname || pathname.includes("/admin")) return;

    const qrSource = pathname.endsWith("/mirleft")
      ? new URLSearchParams(window.location.search).get(QR_SOURCE_QUERY_PARAM)
      : null;
    sendAnalyticsEvent({ kind: "view", path: pathname, qrSource });
  }, [pathname]);
}

export function Analytics() {
  const pathname = usePathname();
  usePageViewTracking(pathname);
  return null;
}
