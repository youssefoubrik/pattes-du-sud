"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { AnimalPhoto } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalMessages } from "@/messages/animals";

type Props = {
  name: string;
  speciesLabel: string;
  photos: AnimalPhoto[];
  locale: Locale;
};

export function CompanionPhotoGallery({
  name,
  speciesLabel,
  photos,
  locale,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const text = animalMessages[locale];
  const selectedPhoto = photos[selectedIndex];
  const galleryLabel = text.photosLabel.replace("{name}", name);
  const numberFormat = new Intl.NumberFormat(locale);
  const photoLabel = (index: number) =>
    text.photoLabel
      .replace("{number}", numberFormat.format(index + 1))
      .replace("{total}", numberFormat.format(photos.length));
  const changePhoto = (direction: -1 | 1) => {
    setSelectedIndex((current) => current + direction);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (viewerOpen && !dialog.open) dialog.showModal();
    if (!viewerOpen && dialog.open) dialog.close();
  }, [viewerOpen]);

  return (
    <div>
      <button
        type="button"
        aria-label={text.viewPhoto.replace("{photo}", photoLabel(selectedIndex))}
        onClick={() => setViewerOpen(true)}
        className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-secondary outline-offset-4 focus-visible:outline-2 focus-visible:outline-heading"
      >
        <Image
          src={selectedPhoto.src}
          alt={selectedPhoto.alt || `${speciesLabel} — ${name}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: selectedPhoto.objectPosition ?? "center" }}
          preload={selectedIndex === 0}
        />
        <span className="absolute bottom-3 end-3 rounded-full bg-black/65 px-3 py-1 text-sm font-semibold text-white">
          {photoLabel(selectedIndex)}
        </span>
      </button>
      {photos.length > 1 && (
        <div
          role="group"
          aria-label={galleryLabel}
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          {photos.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              aria-label={photoLabel(index)}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              className="relative aspect-square w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-border bg-secondary outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:ring-2 aria-pressed:ring-primary/25 sm:w-20"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 9vw, 18vw"
                className="object-cover"
                style={{ objectPosition: photo.objectPosition ?? "center" }}
              />
            </button>
          ))}
        </div>
      )}
      <dialog
        ref={dialogRef}
        aria-label={galleryLabel}
        onClose={() => setViewerOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" && selectedIndex > 0) {
            event.preventDefault();
            changePhoto(-1);
          } else if (
            event.key === "ArrowRight" &&
            selectedIndex < photos.length - 1
          ) {
            event.preventDefault();
            changePhoto(1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setViewerOpen(false);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-4 text-white backdrop:bg-black/90 sm:p-6"
      >
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <div className="flex justify-end">
            <button
              type="button"
              autoFocus
              aria-label={text.closePhotoViewer}
              onClick={() => setViewerOpen(false)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="relative min-h-0">
            <div className="relative h-full min-w-0 flex-1">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || `${speciesLabel} — ${name}`}
                fill
                sizes="100vw"
                className="object-contain"
                style={{ objectPosition: selectedPhoto.objectPosition ?? "center" }}
              />
            </div>
            {selectedIndex > 0 && (
              <button
                type="button"
                aria-label={text.previousPhoto}
                onClick={() => changePhoto(-1)}
                className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white sm:left-4 sm:size-12"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            )}
            {selectedIndex < photos.length - 1 && (
              <button
                type="button"
                aria-label={text.nextPhoto}
                onClick={() => changePhoto(1)}
                className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:size-12"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="text-center text-sm text-white/90">{photoLabel(selectedIndex)}</p>
        </div>
      </dialog>
    </div>
  );
}
