import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalMessages } from "@/messages/animals";

type Props = { animal: Animal; locale: Locale; portrait?: boolean; linked?: boolean };

export function AnimalPreview({ animal, locale, portrait = true, linked = true }: Props) {
  const text = animalMessages[locale];

  const card = (
    <figure className={`relative overflow-hidden rounded-3xl bg-secondary ${portrait ? "aspect-4/5" : "aspect-square"}`}>
      <Image
        src={animal.image.src}
        alt={`${text.species[animal.species]} — ${animal.name}`}
        fill
        sizes="(min-width: 1280px) 384px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 48px)"
        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
        style={{ objectPosition: animal.image.objectPosition ?? "center" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/35 via-35% to-transparent to-70%" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground sm:p-6">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
          {animal.status === "adopted" && (
            <Heart size={14} fill="currentColor" className="shrink-0" aria-hidden="true" />
          )}
          {text.status[animal.status]}
        </p>
        <h3 className="text-3xl font-semibold">{animal.name}</h3>
        <p className="mt-2 text-sm">
          {text.species[animal.species]}
          {animal.ageYears !== undefined && ` · ${text.age.replace("{age}", new Intl.NumberFormat(locale).format(animal.ageYears))}`}
        </p>
        {animal.personality && <p className="mt-2 text-sm leading-relaxed">{text.personality[animal.personality]}</p>}
      </figcaption>
    </figure>
  );

  return (
    <article>
      {linked ? (
        <Link
          href={`/${locale}/animals/${animal.slug}`}
          aria-label={`${text.getToKnow} — ${animal.name}`}
          className="group block rounded-3xl"
        >
          {card}
        </Link>
      ) : card}
    </article>
  );
}
