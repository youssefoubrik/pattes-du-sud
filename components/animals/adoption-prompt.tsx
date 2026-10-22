import { ArrowRight, PawPrint } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { localizedRoute, routePaths } from "@/lib/routes";
import { animalGalleryMessages } from "@/messages/animal-gallery";

export function AdoptionPrompt({ locale }: { locale: Locale }) {
  const text = animalGalleryMessages[locale];

  return (
    <Link
      href={localizedRoute(locale, routePaths.adopt)}
      className="group flex min-h-20 w-full shrink-0 items-center gap-4 rounded-2xl border border-border bg-secondary px-4 py-3 text-heading transition-[opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:mt-1 sm:w-fit sm:min-w-64"
    >
      <PawPrint
        size={25}
        className="shrink-0 text-primary-hover transition-transform duration-200 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <span className="flex flex-col gap-1">
        <span className="font-bold">{text.adoptionPrompt}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">
          {text.adoptionLink}
          <ArrowRight size={15} className="rtl:rotate-180" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
