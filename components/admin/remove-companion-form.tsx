"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { removeAnimal } from "@/app/[locale]/admin/actions";

export function RemoveCompanionForm({
  locale,
  id,
}: {
  locale: Locale;
  id: number;
}) {
  const [confirming, setConfirming] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (confirming) dialogRef.current?.showModal();
  }, [confirming]);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex min-h-11 items-center gap-2 font-bold text-heading underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-primary-hover hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
      >
        <Trash2 size={16} aria-hidden="true" />
        Remove companion
      </button>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`remove-companion-title-${id}`}
      onCancel={(event) => {
        event.preventDefault();
        setConfirming(false);
      }}
      onClose={() => setConfirming(false)}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-border bg-surface p-6 text-foreground shadow-2xl backdrop:bg-black/50 sm:p-8"
    >
      <h2
        id={`remove-companion-title-${id}`}
        className="text-2xl font-bold text-heading"
      >
        Remove this companion?
      </h2>
      <p className="mt-2 text-muted-foreground">
        This will remove the companion from the website.
      </p>
      <form action={removeAnimal} className="mt-6 flex flex-wrap justify-end gap-3">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="id" value={id} />
        <button
          type="button"
          autoFocus
          onClick={() => setConfirming(false)}
          className="min-h-11 rounded-full border border-border px-5 font-bold text-heading hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
        >
          No, keep companion
        </button>
        <button
          type="submit"
          className="min-h-11 rounded-full bg-primary px-5 font-bold text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
        >
          Yes, remove
        </button>
      </form>
    </dialog>
  );
}
