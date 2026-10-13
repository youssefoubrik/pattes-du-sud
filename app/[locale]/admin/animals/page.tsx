import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getAnimals } from "@/lib/db";
import { removeAnimal, upsertAnimal } from "../actions";

export const metadata = {
  title: "Edit animals",
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
        <Link href={`/${locale}/admin`} className="text-accent underline">
          ← Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Animals</h1>
        {query.saved && (
          <p role="status" className="mt-4 rounded-xl bg-secondary p-4">
            Animal saved.
          </p>
        )}
        {query.deleted && (
          <p role="status" className="mt-4 rounded-xl bg-secondary p-4">
            Animal removed.
          </p>
        )}
        {query.error && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            Check the name, slug and photo. Photos must be JPEG, PNG or WebP,
            under 5 MB.
          </p>
        )}
        <h2 className="mt-10 text-2xl text-heading">Add an animal</h2>
        <AnimalForm locale={locale} />
        <h2 className="mt-14 text-2xl text-heading">Published profiles</h2>
        <ul className="mt-6 grid gap-6 lg:grid-cols-2">
          {animals.map((animal) => (
            <li
              key={animal.slug}
              className="rounded-3xl border border-border bg-surface p-5"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={animal.image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl text-heading">{animal.name}</h3>
                  <p>{animal.status}</p>
                  <Link
                    className="text-accent underline"
                    href={`/${locale}/animals/${animal.slug}`}
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
                <input type="hidden" name="slug" value={animal.slug} />
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
      <label className="font-semibold">
        Name
        <input
          name="name"
          required
          defaultValue={animal?.name}
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        />
      </label>
      <label className="font-semibold">
        URL slug
        <input
          name="slug"
          required
          readOnly={!!animal}
          defaultValue={animal?.slug}
          placeholder="e.g. bella"
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className="mt-2 min-h-11 w-full rounded-xl border border-border px-3 font-normal"
        />
      </label>
      <label className="font-semibold">
        Animal
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
        Photo
        <input
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={!animal}
          className="mt-2 block w-full rounded-xl border border-border p-3 font-normal"
        />
      </label>
      <label className="font-semibold sm:col-span-2">
        Story
        <textarea
          name="story"
          rows={4}
          defaultValue={animal?.story}
          className="mt-2 w-full rounded-xl border border-border p-3 font-normal"
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          name="vaccinated"
          type="checkbox"
          defaultChecked={animal?.vaccinated}
        />{" "}
        Vaccinated
      </label>
      <label className="flex items-center gap-2">
        <input
          name="sterilized"
          type="checkbox"
          defaultChecked={animal?.sterilized}
        />{" "}
        Sterilized
      </label>
      <button
        type="submit"
        className="min-h-12 rounded-full bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover sm:justify-self-start"
      >
        Save animal
      </button>
    </form>
  );
}
