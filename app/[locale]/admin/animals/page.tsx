import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ActionButton } from "@/components/ui/action-button";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getAnimals } from "@/lib/db";
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
              ? "A profile needs at least one photo and can have up to five."
              : "Check the name and photos. Use JPEG, PNG or WebP images under 5 MB each."}
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
  return (
    <form
      action={upsertAnimal}
      encType="multipart/form-data"
      className="mt-5 grid gap-4 rounded-3xl border border-border bg-surface p-5 sm:grid-cols-2"
    >
      <input type="hidden" name="locale" value={locale} />
      {animal && <input type="hidden" name="id" value={animal.id} />}
      <label className="font-semibold">
        Name
        <input
          name="name"
          required
          maxLength={80}
          defaultValue={animal?.name}
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        />
      </label>
      <label className="font-semibold">
        Species
        <select
          name="species"
          defaultValue={animal?.species}
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </label>
      <label className="font-semibold">
        Status
        <select
          name="status"
          defaultValue={animal?.status}
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        >
          <option value="inCare">In care</option>
          <option value="available">Available</option>
          <option value="adopted">Adopted</option>
        </select>
      </label>
      <label className="font-semibold">
        Age in years
        <input
          name="ageYears"
          type="number"
          min="0"
          max="39"
          step="0.5"
          defaultValue={animal?.ageYears}
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        />
      </label>
      <label className="font-semibold">
        Sex
        <select
          name="sex"
          defaultValue={animal?.sex || ""}
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        >
          <option value="">Unknown</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>
      <label className="font-semibold sm:col-span-2">
        Photos
        <input
          name="photos"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          required={!animal || animal.photos.length === 0}
          className="mt-2 block w-full rounded-xl border border-border p-3 font-normal"
        />
        <span className="mt-2 block text-sm font-normal text-muted-foreground">
          Up to five photos per profile, 5 MB each. Choose which appears on cards.
        </span>
      </label>
      {animal && animal.photos.length > 0 && (
        <fieldset className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
          <legend className="mb-2 font-semibold">Current photos</legend>
          {animal.photos.map((photo, index) => (
            <div key={`${photo.src}-${index}`} className="flex gap-3 rounded-2xl border border-border p-3">
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
                    className="mt-1 min-h-10 w-full rounded-lg border border-border px-2 font-normal"
                  />
                </label>
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input type="checkbox" name="removePhoto" value={index} />
                  Remove photo
                </label>
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mainPhoto"
                    value={index}
                    defaultChecked={index === 0}
                  />
                  Show on cards
                </label>
              </div>
            </div>
          ))}
        </fieldset>
      )}
      <label className="font-semibold sm:col-span-2">
        Story
        <textarea
          name="story"
          rows={4}
          defaultValue={animal?.story}
          className="mt-2 w-full rounded-xl border border-border p-3 font-normal"
        />
      </label>
      <label className="font-semibold">
        Vaccination status
        <select
          name="vaccinated"
          defaultValue={animal?.vaccinated || "no"}
          className="mt-2 block min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-normal"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <label className="font-semibold">
        Sterilization status
        <select
          name="sterilized"
          defaultValue={animal?.sterilized || "no"}
          className="mt-2 block min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-normal"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <ActionButton type="submit" className="sm:justify-self-start">
        Save companion
      </ActionButton>
    </form>
  );
}
