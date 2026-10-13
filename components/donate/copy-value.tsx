"use client";

import { useState } from "react";

export function CopyValue({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      }}
      className="min-h-11 rounded-full border border-border px-4 text-sm font-bold text-heading hover:bg-secondary"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
