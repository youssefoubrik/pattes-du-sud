"use client";

import { useState } from "react";

export function ShareButton({
  title,
  label,
  copied,
}: {
  title: string;
  label: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="min-h-11 rounded-full border border-border px-5 font-bold text-heading hover:bg-secondary"
      onClick={async () => {
        if (navigator.share) {
          try {
            await navigator.share({ title, url: location.href });
          } catch {}
          return;
        }
        await navigator.clipboard.writeText(location.href);
        setDone(true);
      }}
    >
      {done ? copied : label}
    </button>
  );
}
