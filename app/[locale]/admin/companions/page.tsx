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
  PencilLine,
  Shield,
  Syringe,
  Trash2,
  Venus,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ActionButton } from "@/components/ui/action-button";
import {
  CompanionListPagination,
  CompanionListSearch,
} from "@/components/admin/companion-list-controls";
import { CharacterCountField } from "@/components/admin/character-count-field";
import { PersonalityField } from "@/components/admin/personality-field";
import { PhotoUploadManager } from "@/components/admin/photo-upload-manager";
import { SaveNotice } from "@/components/admin/save-notice";
import { isLocale, type Locale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getAnimals, getAnimalsPage } from "@/lib/db";
import { animalMessages } from "@/messages/animals";
import {
  ANIMAL_NAME_MAX_LENGTH,
  ANIMAL_PHOTO_MAX_COUNT,
  ANIMAL_STORY_MAX_LENGTH,
  PHOTO_MAX_UPLOAD_SIZE_BYTES,
} from "@/lib/animal-limits";
import { removeAnimal, upsertAnimal } from "../actions";

const COMPANION_PAGE_SIZE = 6;

export const metadata = {
  title: "Edit companions",
  robots: { index: false, follow: false },
};

export default async function AdminAnimals({
  params,
  searchParams,
}: PageProps<"/[locale]/admin/companions">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const query = await searchParams;
  const search =
    typeof query.q === "string"
      ? query.q.trim().slice(0, ANIMAL_NAME_MAX_LENGTH)
      : "";
  const requestedPage = typeof query.page === "string" ? Number(query.page) : 1;
  const { animals, total, page, pageCount } = getAnimalsPage(
    search,
    COMPANION_PAGE_SIZE,
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1,
  );
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
        {query.saved && <SaveNotice message="Companion saved." />}
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
        <h2 className="mt-14 text-2xl text-heading">Our companions</h2>
        <CompanionListSearch search={search} />
        <p
          aria-live="polite"
          className="mt-4 text-sm font-semibold text-muted-foreground"
        >
          {total === 1
            ? "1 companion"
            : `${new Intl.NumberFormat(locale).format(total)} companions`}
        </p>
        {animals.length ? (
          <ul className="mt-6 grid max-w-4xl items-start gap-5">
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
                    <p>{animalMessages[locale].status[animal.status]}</p>
                    <Link
                      className="text-accent underline"
                      href={`/${locale}/companions/${animal.id}`}
                    >
                      View profile
                    </Link>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-start gap-x-4 gap-y-2">
                  <details>
                    <summary className="inline-flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-full bg-secondary-button px-5 font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                      <PencilLine size={16} aria-hidden="true" />
                      Edit details
                    </summary>
                    <AnimalForm locale={locale} animal={animal} />
                  </details>
                  <form action={removeAnimal}>
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="id" value={animal.id} />
                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center gap-2 font-bold text-heading underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-primary-hover hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      Remove companion
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p
            role="status"
            className="mt-6 max-w-4xl rounded-2xl bg-secondary p-5 text-muted-foreground"
          >
            {search.trim()
              ? `No companions match “${search.trim()}”.`
              : "No companions to show yet."}
          </p>
        )}
        <CompanionListPagination
          locale={locale}
          search={search}
          page={page}
          pageCount={pageCount}
        />
      </Container>
    </main>
  );
}

function AnimalForm({
  locale,
  animal,
}: {
  locale: Locale;
  animal?: ReturnType<typeof getAnimals>[number];
}) {
  const focusClass = "focus-visible:outline-none focus-visible:border-heading";

  return (
    <form
      action={upsertAnimal}
      className="animal-form mt-5 grid gap-4 rounded-3xl border border-border bg-surface p-5 sm:grid-cols-2"
    >
      <input type="hidden" name="locale" value={locale} />
      {animal && <input type="hidden" name="id" value={animal.id} />}
      <label className="font-semibold">
        Name <span aria-hidden="true" className="text-required">*</span>
        <span className="sr-only"> required</span>
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
        Age in years <span className="font-normal text-muted-foreground">(optional)</span>
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
      <PersonalityField
        locale={locale}
        personality={animal?.personality}
        customText={animal?.personalityCustom}
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
