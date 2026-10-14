"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export type LightboxPhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type Props = {
  photos: LightboxPhoto[];
  locale: Locale;
  label: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  photoLabel: string;
  children: ReactNode;
};

export function PhotoGalleryLightbox({
  photos,
  locale,
  label,
  closeLabel,
  previousLabel,
  nextLabel,
  photoLabel,
  children,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const numberFormat = new Intl.NumberFormat(locale);
  const describePhoto = (index: number) =>
    photoLabel
      .replace("{number}", numberFormat.format(index + 1))
      .replace("{total}", numberFormat.format(photos.length));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleTrigger(event: MouseEvent<HTMLDivElement>) {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-photo-view-index]");
    if (!trigger) return;
    const index = Number(trigger.dataset.photoViewIndex);
    if (!Number.isInteger(index) || index < 0 || index >= photos.length) return;
    setSelectedIndex(index);
    setOpen(true);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 48 || photos.length < 2) return;
    setSelectedIndex((current) => (current + (distance < 0 ? 1 : -1) + photos.length) % photos.length);
  }

  function move(direction: -1 | 1) {
    setSelectedIndex((current) => (current + direction + photos.length) % photos.length);
  }

  const selectedPhoto = photos[selectedIndex];
  if (!selectedPhoto) return children;

  return (
    <div onClick={handleTrigger}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={label}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" && photos.length > 1) {
            event.preventDefault();
            move(-1);
          } else if (event.key === "ArrowRight" && photos.length > 1) {
            event.preventDefault();
            move(1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-4 text-white backdrop:bg-black/90 sm:p-6"
      >
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <div className="flex justify-end">
            <button
              type="button"
              autoFocus
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div
            className="relative min-h-0"
            onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full">
              {open && (
                <Image
                  key={selectedPhoto.src}
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-contain"
                  style={{ objectPosition: selectedPhoto.objectPosition ?? "center" }}
                />
              )}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={previousLabel}
                    onClick={() => move(-1)}
                    className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white sm:left-4 sm:size-12"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={nextLabel}
                    onClick={() => move(1)}
                    className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:size-12"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-center text-sm text-white/90">{describePhoto(selectedIndex)}</p>
        </div>
      </dialog>
    </div>
  );
}
