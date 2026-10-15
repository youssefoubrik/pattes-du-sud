"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

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
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  return (
    <div className="inline-flex min-h-11 items-center">
      {done ? (
        <span role="status" className="inline-flex items-center gap-2 font-bold text-accent">
          <Check size={18} aria-hidden="true" />
          {copied}
        </span>
      ) : (
        <button
          type="button"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-secondary/70 px-5 font-bold text-heading transition-colors duration-200 hover:bg-secondary/80 motion-safe:animate-[copy-fade-in_180ms_ease-out] motion-reduce:transition-none"
          onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({ title, url: location.href });
              } catch {}
              return;
            }
            await navigator.clipboard.writeText(location.href);
            setDone(true);
            if (resetTimer.current) clearTimeout(resetTimer.current);
            resetTimer.current = setTimeout(() => setDone(false), 2000);
          }}
        >
          {label}
        </button>
      )}
    </div>
  );
}
