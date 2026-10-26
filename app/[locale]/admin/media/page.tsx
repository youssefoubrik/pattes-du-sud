import Image from "next/image";
import { localizedRoute, routePaths } from "@/lib/routes";
import { ChevronDown, Heart, House, Users, type LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { BackLink } from "@/components/ui/back-link";
import { ActionNotice } from "@/components/admin/action-notice";
import { MediaPhotoForm } from "@/components/admin/media-photo-form";
import { mediaSlots } from "@/content/media";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import { updateMedia } from "../actions";

export const metadata = {
  title: "Edit photos",
  robots: { index: false, follow: false },
};

export const instant = false;

const mediaGroups: { title: string; icon: LucideIcon; prefix: string }[] = [
  { title: "Home page", icon: House, prefix: "home." },
  { title: "About page", icon: Users, prefix: "about." },
  { title: "Volunteer page", icon: Heart, prefix: "volunteer." },
];

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
        <BackLink href={localizedRoute(locale, routePaths.admin)}>
          Editor
        </BackLink>
        <h1 className="mt-5 text-4xl text-heading">Page photos</h1>
        {query.saved && (
          <ActionNotice
            key={String(query.notice ?? "saved")}
            message="Photo saved."
            queryParam="saved"
          />
        )}
        {query.error && (
          <p role="alert" className="mt-5 rounded-xl bg-secondary p-4">
            Use a JPEG, PNG or WebP photo under 5 MB.
          </p>
        )}
        <div className="mt-8 grid gap-6">
          {mediaGroups.map((group) => (
            <details
              key={group.prefix}
              className="group min-w-0 rounded-2xl border border-border bg-surface"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-3 text-xl font-semibold text-heading marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  <group.icon size={19} aria-hidden="true" />
                  {group.title}
                </span>
                <ChevronDown
                  size={19}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="px-5 pb-5 pt-1">
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {mediaSlots
                    .filter((slot) => slot.key.startsWith(group.prefix))
                    .map((slot) => (
                      <li
                        key={slot.key}
                        className="rounded-3xl border border-border bg-background p-5"
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
                        <MediaPhotoForm
                          locale={locale}
                          slot={slot.key}
                          action={updateMedia}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </main>
  );
}
