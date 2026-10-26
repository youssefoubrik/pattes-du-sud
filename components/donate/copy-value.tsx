"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyValue({
  value,
  copiedLabel,
  accessibleLabel,
}: {
  value: string;
  copiedLabel: string;
  accessibleLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  return (
    <button
      type="button"
      aria-label={accessibleLabel}
      title={accessibleLabel}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {copied ? (
        <>
          <Check size={16} aria-hidden="true" />
          <span aria-live="polite">{copiedLabel}</span>
        </>
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
    </button>
  );
}
