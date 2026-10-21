"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import type { AnimalPhoto } from "@/content/animals";

type SelectedPhoto = { file: File; previewUrl: string };

export function PhotoUploadManager({
  photos,
  maxPhotos,
  maxFileSize,
  focusClass,
  uploadId,
}: {
  photos: AnimalPhoto[];
  maxPhotos: number;
  maxFileSize: number;
  focusClass: string;
  uploadId: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrls = useRef<string[]>([]);
  const [removed, setRemoved] = useState<Set<number>>(() => new Set());
  const [selectedFiles, setSelectedFiles] = useState<SelectedPhoto[]>([]);
  const [limitError, setLimitError] = useState("");
  const retainedCount = photos.length - removed.size;
  const availableForNew = Math.max(maxPhotos - retainedCount, 0);
  const remaining = Math.max(availableForNew - selectedFiles.length, 0);

  useEffect(
    () => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)),
    [],
  );

  function updateFiles(input: HTMLInputElement, files: File[]) {
    previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    const transfer = new DataTransfer();
    files.forEach((file) => transfer.items.add(file));
    input.files = transfer.files;
    const selected = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    previewUrls.current = selected.map(({ previewUrl }) => previewUrl);
    setSelectedFiles(selected);
    const error =
      selected.length > availableForNew
        ? `Only ${availableForNew} more ${availableForNew === 1 ? "photo can" : "photos can"} be added.`
        : "";
    setLimitError(error);
    input.setCustomValidity(error);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const existing = selectedFiles.map(({ file }) => file);
    const additions = Array.from(input.files ?? []);
    const seen = new Set(
      existing.map((file) => `${file.name}:${file.size}:${file.lastModified}`),
    );
    const combined = [
      ...existing,
      ...additions.filter((file) => {
        const key = `${file.name}:${file.size}:${file.lastModified}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
    ];
    updateFiles(input, combined);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    const additions = Array.from(event.dataTransfer.files);
    const existing = selectedFiles.map(({ file }) => file);
    const seen = new Set(
      existing.map((file) => `${file.name}:${file.size}:${file.lastModified}`),
    );
    const combined = [
      ...existing,
      ...additions.filter((file) => {
        const key = `${file.name}:${file.size}:${file.lastModified}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
    ];
    updateFiles(input, combined);
  }

  function removeSelected(index: number) {
    const input = inputRef.current;
    if (!input) return;
    updateFiles(
      input,
      selectedFiles
        .filter((_, fileIndex) => fileIndex !== index)
        .map(({ file }) => file),
    );
  }

  function toggleRemoved(index: number, checked: boolean) {
    setRemoved((current) => {
      const next = new Set(current);
      if (checked) next.add(index);
      else next.delete(index);
      return next;
    });
    const nextRemovedCount = removed.size + (checked ? 1 : -1);
    const nextRetainedCount = photos.length - nextRemovedCount;
    const nextAvailable = Math.max(maxPhotos - nextRetainedCount, 0);
    const input = inputRef.current;
    if (input) {
      const files = Array.from(input.files ?? []);
      const error =
        files.length > nextAvailable
          ? `Only ${nextAvailable} more ${nextAvailable === 1 ? "photo can" : "photos can"} be added.`
          : "";
      setLimitError(error);
      input.setCustomValidity(error);
      input.required = nextRetainedCount === 0;
    }
  }

  const remainingText = `${remaining} ${remaining === 1 ? "photo slot" : "photo slots"} left`;
  const maxSizeMb = maxFileSize / 1_000_000;

  return (
    <div className="sm:col-span-2">
      <label className="block font-semibold" htmlFor={uploadId}>
        Photos
      </label>
      <div
        className="animal-upload mt-2 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-surface px-5 py-6 text-center transition-colors sm:flex-row sm:text-start"
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
      >
        <Upload size={28} className="shrink-0 text-heading" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-heading">
            Drop photos here or{" "}
            <label
              htmlFor={uploadId}
              className="cursor-pointer underline underline-offset-4"
            >
              browse files
            </label>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            JPEG, PNG or WebP · Up to {maxSizeMb} MB per photo
          </p>
          <p className="mt-1 text-sm font-semibold text-heading" aria-live="polite">
            {remainingText}
            {selectedFiles.length > 0 && ` · ${selectedFiles.length} selected`}
          </p>
          {limitError && (
            <p role="alert" className="mt-1 text-sm text-primary-hover">
              {limitError}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          id={uploadId}
          name="photos"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          required={photos.length === 0}
          className={`sr-only ${focusClass}`}
          onChange={onFileChange}
          aria-label="Choose companion photos"
        />
      </div>
      {selectedFiles.length > 0 && (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {selectedFiles.map(({ file, previewUrl }, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-surface p-3"
            >
              <Image
                src={previewUrl}
                alt=""
                width={64}
                height={64}
                unoptimized
                className="size-16 shrink-0 rounded-xl object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
              <button
                type="button"
                onClick={() => removeSelected(index)}
                aria-label={`Remove ${file.name}`}
                className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-heading transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {photos.length > 0 && (
        <fieldset className="mt-4 grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 font-semibold">Current photos</legend>
          {photos.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="flex gap-3 rounded-2xl border border-border p-3"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                <Image src={photo.src} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <label className="block text-sm font-semibold">
                  Photo description
                  <input
                    name={`photoAlt:${index}`}
                    maxLength={200}
                    defaultValue={photo.alt || ""}
                    className={`mt-1 min-h-10 w-full rounded-lg border border-border px-2 font-normal ${focusClass}`}
                  />
                </label>
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="removePhoto"
                    value={index}
                    checked={removed.has(index)}
                    onChange={(event) => toggleRemoved(index, event.currentTarget.checked)}
                    className={focusClass}
                  />
                  Remove photo
                </label>
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mainPhoto"
                    value={index}
                    defaultChecked={index === 0}
                    className={focusClass}
                  />
                  Show on cards
                </label>
              </div>
            </div>
          ))}
        </fieldset>
      )}
    </div>
  );
}
