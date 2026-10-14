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
    <button
      type="button"
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border bg-surface px-5 font-bold transition-[color,scale] duration-200 motion-reduce:transition-none ${done ? "border-accent/50 text-heading motion-safe:animate-[copy-pop_220ms_ease-out]" : "border-border text-heading"}`}
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
        resetTimer.current = setTimeout(() => setDone(false), 2400);
      }}
    >
      {done && <Check size={18} className="text-accent" aria-hidden="true" />}
      <span aria-live="polite">{done ? copied : label}</span>
    </button>
  );
}
