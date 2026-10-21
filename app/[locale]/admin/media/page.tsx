import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ActionButton } from "@/components/ui/action-button";
import { mediaSlots } from "@/content/media";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getMediaSrc } from "@/lib/media";
import { updateMedia } from "../actions";

export const metadata = {
  title: "Edit photos",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function MediaPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const query = await searchParams;
  return (
    <main className="flex-1 py-12">
      <Container>
        <Link href={`/${locale}/admin`} className="text-accent underline">
          ← Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Page photos</h1>
        {query.saved && (
          <p role="status" className="mt-5 rounded-xl bg-secondary p-4">
            Photo saved.
          </p>
        )}
        {query.error && (
          <p role="alert" className="mt-5 rounded-xl bg-secondary p-4">
            Use a JPEG, PNG or WebP photo under 5 MB.
          </p>
        )}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediaSlots.map((slot) => (
            <li
              key={slot.key}
              className="rounded-3xl border border-border bg-surface p-5"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={getMediaSrc(slot.key, slot.fallback)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 text-xl text-heading">{slot.label}</h2>
              <form
                action={updateMedia}
                encType="multipart/form-data"
                className="mt-4 space-y-3"
              >
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="slot" value={slot.key} />
                <label className="block text-sm font-semibold">
                  New photo
                  <input
                    name="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required
                    className="mt-2 block w-full text-sm"
                  />
                </label>
                <ActionButton type="submit" size="small">
                  Save photo
                </ActionButton>
              </form>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
