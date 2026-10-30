"use client";

import Image from "next/image";
import { useState } from "react";
import type { Supporter } from "@/content/supporters";
import { PendingActionButton } from "@/components/admin/pending-action-button";
import { ActionButton } from "@/components/ui/action-button";

export function SupporterEditor({
  locale,
  supporters,
  action,
}: {
  locale: string;
  supporters: Supporter[];
  action: (formData: FormData) => Promise<void>;
}) {
  const [entries, setEntries] = useState(
    supporters.map((supporter) => ({ ...supporter, key: supporter.id })),
  );

  function addSupporter() {
    const id = crypto.randomUUID();
    setEntries((current) => [...current, { id, key: id, name: "" }]);
  }

  return (
    <form action={action} className="mt-6 grid gap-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="count" value={entries.length} />
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map((supporter, index) => (
          <li key={supporter.key} className="min-w-0 rounded-2xl border border-border bg-surface p-5">
            <fieldset className="grid min-w-0 gap-4">
              <legend className="font-semibold text-heading">Supporter {index + 1}</legend>
              <input type="hidden" name={`id:${index}`} value={supporter.id} />
              <input type="hidden" name={`logoSrc:${index}`} value={supporter.logo?.src ?? ""} />
              <label className="block text-sm font-semibold">
                Name
                <input
                  name={`name:${index}`}
                  defaultValue={supporter.name}
                  required
                  maxLength={120}
                  className="mt-2 block min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base font-normal"
                />
              </label>
              <label className="block text-sm font-semibold">
                Website (optional)
                <input
                  name={`website:${index}`}
                  type="url"
                  defaultValue={supporter.website ?? ""}
                  placeholder="https://example.org"
                  className="mt-2 block min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base font-normal"
                />
              </label>
              <div className="grid gap-3">
                {supporter.logo && (
                  <div className="flex items-center gap-3">
                    <Image src={supporter.logo.src} alt="" width={64} height={64} className="size-16 rounded-lg border border-border bg-background object-contain p-1" />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name={`removeLogo:${index}`} value="yes" className="size-4 accent-primary" />
                      Remove logo
                    </label>
                  </div>
                )}
                <label className="block text-sm font-semibold">
                  {supporter.logo ? "Replace logo" : "Logo (optional)"}
                  <input
                    name={`logo:${index}`}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="mt-2 block min-h-12 w-full cursor-pointer rounded-xl border border-border bg-background p-2 text-sm file:mr-3 file:min-h-9 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-bold file:text-heading hover:file:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
                  />
                </label>
              </div>
              <ActionButton
                type="button"
                variant="secondary"
                size="small"
                aria-label={`Remove supporter ${index + 1}`}
                onClick={() => setEntries((current) => current.filter((entry) => entry.key !== supporter.key))}
              >
                Remove supporter
              </ActionButton>
            </fieldset>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <ActionButton type="button" variant="secondary" onClick={addSupporter}>
          Add a supporter
        </ActionButton>
        <PendingActionButton variant="primary" pendingLabel="Saving supporters…">
          Save list
        </PendingActionButton>
      </div>
    </form>
  );
}
