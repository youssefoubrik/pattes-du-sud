"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PendingActionButton } from "@/components/admin/pending-action-button";

export function MediaPhotoForm({
  locale,
  slot,
  action,
}: {
  locale: string;
  slot: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [selected, setSelected] = useState<{ file: File; previewUrl: string }>();
  const [loading, setLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(
    () => () => {
      if (selected) URL.revokeObjectURL(selected.previewUrl);
    },
    [selected],
  );

  return (
    <form
      action={action}
      className="mt-4 space-y-3"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slot" value={slot} />
      <label className="block text-sm font-semibold">
        New photo
        <input
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            setLoadFailed(false);
            setSelected(
              file ? { file, previewUrl: URL.createObjectURL(file) } : undefined,
            );
            setLoading(Boolean(file));
          }}
          className="mt-2 block min-h-12 w-full cursor-pointer rounded-xl border border-border bg-background p-2 text-sm file:mr-3 file:min-h-9 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-bold file:text-heading hover:file:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
        />
      </label>
      {selected && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
          {!loadFailed && (
            <Image
              src={selected.previewUrl}
              alt={`Selected photo preview: ${selected.file.name}`}
              width={80}
              height={60}
              unoptimized
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setLoadFailed(true);
              }}
              className="size-16 shrink-0 rounded-lg object-cover"
            />
          )}
          <p role="status" className="min-w-0 truncate text-sm text-muted-foreground">
            {loadFailed
              ? "Could not load this image. Choose another photo."
              : loading
                ? "Loading image…"
                : `Image ready: ${selected.file.name}`}
          </p>
        </div>
      )}
      <div className="flex justify-end">
        <PendingActionButton
          variant="secondary"
          size="small"
          pendingLabel="Saving photo…"
        >
          Save photo
        </PendingActionButton>
      </div>
    </form>
  );
}
