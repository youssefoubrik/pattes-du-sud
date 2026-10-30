import { Handshake } from "lucide-react";
import { notFound } from "next/navigation";
import { ActionNotice } from "@/components/admin/action-notice";
import { SupporterEditor } from "@/components/admin/supporter-editor";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getSupporters } from "@/lib/database/supporter-records";
import { localizedRoute, routePaths } from "@/lib/routes";
import { updateSupporters } from "../actions";

export const metadata = {
  title: "Edit supporters",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function SupportersAdminPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const query = await searchParams;
  const supporters = getSupporters();

  return (
    <main className="flex-1 py-12">
      <Container>
        <BackLink href={localizedRoute(locale, routePaths.admin)}>Editor</BackLink>
        <h1 className="mt-5 flex items-center gap-3 text-4xl text-heading">
          <Handshake size={30} aria-hidden="true" />
          Supporters
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Add, update or remove supporter names, websites and logos. Changes appear in the Home page supporter section after you save. Logos can be JPEG, PNG or WebP, up to 5 MB each.
        </p>
        {query.saved && <ActionNotice key={String(query.notice ?? "saved")} message="Supporter list saved." queryParam="saved" />}
        {query.error && (
          <p role="alert" className="mt-5 rounded-xl bg-secondary p-4">
            {query.error === "website"
              ? "Enter a valid website address beginning with https://."
              : query.error === "photo"
                ? "Choose a JPEG, PNG or WebP logo under 5 MB per file, with 24 MB total per save."
                : "Check that every supporter has a name, then try again."}
          </p>
        )}
        <SupporterEditor locale={locale} supporters={supporters} action={updateSupporters} />
      </Container>
    </main>
  );
}
