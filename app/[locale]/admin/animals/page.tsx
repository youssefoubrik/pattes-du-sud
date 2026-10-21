import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Cat,
  CircleHelp,
  Dog,
  HeartPulse,
  House,
  HousePlus,
  Mars,
  Shield,
  Syringe,
  Venus,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ActionButton } from "@/components/ui/action-button";
import { CharacterCountField } from "@/components/admin/character-count-field";
import { PhotoUploadManager } from "@/components/admin/photo-upload-manager";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getAnimals } from "@/lib/db";
import {
  ANIMAL_NAME_MAX_LENGTH,
  ANIMAL_PHOTO_MAX_COUNT,
  ANIMAL_STORY_MAX_LENGTH,
  PHOTO_MAX_UPLOAD_SIZE_BYTES,
} from "@/lib/animal-limits";
import { removeAnimal, upsertAnimal } from "../actions";

export const metadata = {
  title: "Edit companions",
  robots: { index: false, follow: false },
};

export default async function AdminAnimals({
  params,
  searchParams,
}: PageProps<"/[locale]/admin/animals">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const query = await searchParams;
  const animals = getAnimals();
  return (
    <main className="flex-1 py-12">
      <Container>
        <Link
          href={`/${locale}/admin`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-heading transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-heading"
        >
          <ArrowLeft
            size={18}
            className="text-primary rtl:rotate-180"
            aria-hidden="true"
          />
          Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Companions</h1>
        {query.saved && (
          <p role="status" className="mt-4 rounded-xl bg-secondary p-4">
            Companion saved.
          </p>
        )}
        {query.deleted && (
          <p role="status" className="mt-4 rounded-xl bg-secondary p-4">
            Companion removed.
          </p>
        )}
        {query.error && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            {query.error === "photo-count"
              ? `A profile needs at least one photo and can have up to ${ANIMAL_PHOTO_MAX_COUNT}.`
              : query.error === "size"
                ? `Each photo must be under ${PHOTO_MAX_UPLOAD_SIZE_BYTES / 1_000_000} MB.`
                : "Check the name and photos. Use JPEG, PNG or WebP images."}
          </p>
        )}
        <h2 className="mt-10 text-2xl text-heading">Add a companion</h2>
        <AnimalForm locale={locale} />
        <h2 className="mt-14 text-2xl text-heading">Published profiles</h2>
        <ul className="mt-6 grid gap-6 lg:grid-cols-2">
          {animals.map((animal) => (
            <li
              key={animal.id}
              className="rounded-3xl border border-border bg-surface p-5"
            >
              <div className="flex items-center gap-4">
                {animal.photos[0] && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={animal.photos[0].src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl text-heading">{animal.name}</h3>
                  <p>{animal.status}</p>
                  <Link
                    className="text-accent underline"
                    href={`/${locale}/companions/${animal.id}`}
                  >
                    View profile
                  </Link>
                </div>
              </div>
              <details className="mt-5">
                <summary className="cursor-pointer font-semibold text-heading">
                  Edit profile
                </summary>
                <AnimalForm locale={locale} animal={animal} />
              </details>
              <form action={removeAnimal} className="mt-4">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={animal.id} />
                <button
                  type="submit"
                  className="min-h-11 text-primary-hover underline"
                >
                  Remove {animal.name}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}

function AnimalForm({
  locale,
  animal,
}: {
  locale: string;
  animal?: ReturnType<typeof getAnimals>[number];
}) {
  const focusClass = "focus-visible:outline-none focus-visible:border-heading";

  return (
    <form
      action={upsertAnimal}
      encType="multipart/form-data"
      className="animal-form mt-5 grid gap-4 rounded-3xl border border-border bg-surface p-5 sm:grid-cols-2"
    >
      <input type="hidden" name="locale" value={locale} />
      {animal && <input type="hidden" name="id" value={animal.id} />}
      <label className="font-semibold">
        Name
        <CharacterCountField
          name="name"
          required
          maxLength={ANIMAL_NAME_MAX_LENGTH}
          defaultValue={animal?.name}
          hint="Any text is allowed, including accents and punctuation."
          className={`min-h-11 w-full rounded-xl border border-border px-3 font-normal ${focusClass}`}
        />
      </label>
      <ChoiceGroup
        label="Species"
        name="species"
        defaultValue={animal?.species ?? "dog"}
        options={[
          { value: "dog", label: "Dog", icon: Dog },
          { value: "cat", label: "Cat", icon: Cat },
        ]}
      />
      <ChoiceGroup
        label="Status"
        name="status"
        defaultValue={animal?.status ?? "inCare"}
        options={[
          { value: "inCare", label: "In care", icon: HeartPulse },
          { value: "available", label: "Available", icon: HousePlus },
          { value: "adopted", label: "Adopted", icon: House },
        ]}
      />
      <label className="font-semibold">
        Age in years
        <input
          name="ageYears"
          type="number"
          min="0"
          max="39"
          step="0.5"
          defaultValue={animal?.ageYears}
          className={`mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal ${focusClass}`}
        />
      </label>
      <ChoiceGroup
        label="Sex"
        name="sex"
        defaultValue={animal?.sex || "unknown"}
        options={[
          { value: "unknown", label: "Unknown", icon: CircleHelp },
          { value: "female", label: "Female", icon: Venus },
          { value: "male", label: "Male", icon: Mars },
        ]}
      />
      <PhotoUploadManager
        photos={animal?.photos ?? []}
        maxPhotos={ANIMAL_PHOTO_MAX_COUNT}
        maxFileSize={PHOTO_MAX_UPLOAD_SIZE_BYTES}
        focusClass={focusClass}
        uploadId={`companion-photos-${animal?.id ?? "new"}`}
      />
      <label className="font-semibold sm:col-span-2">
        Story
        <CharacterCountField
          multiline
          name="story"
          rows={4}
          maxLength={ANIMAL_STORY_MAX_LENGTH}
          defaultValue={animal?.story}
          hint="Any text and line breaks are allowed."
          className={`w-full rounded-xl border border-border p-3 font-normal ${focusClass}`}
        />
      </label>
      <ChoiceGroup
        label="Vaccination status"
        name="vaccinated"
        defaultValue={animal?.vaccinated || "no"}
        options={[
          { value: "yes", label: "Yes", icon: Syringe },
          { value: "no", label: "No", icon: Shield },
        ]}
      />
      <ChoiceGroup
        label="Sterilization status"
        name="sterilized"
        defaultValue={animal?.sterilized || "no"}
        options={[
          { value: "yes", label: "Yes", icon: BadgeCheck },
          { value: "no", label: "No", icon: CircleHelp },
        ]}
      />
      <ActionButton
        type="submit"
        variant="secondary"
        className="sm:justify-self-start"
      >
        Save companion
      </ActionButton>
    </form>
  );
}

function ChoiceGroup({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: { value: string; label: string; icon: LucideIcon }[];
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value, label: optionLabel, icon: Icon }) => (
          <label
            key={value}
            className="animal-choice inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-heading/60"
          >
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={defaultValue === value}
              className="sr-only"
            />
            <Icon size={17} className="text-heading" aria-hidden="true" />
            <span>{optionLabel}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
