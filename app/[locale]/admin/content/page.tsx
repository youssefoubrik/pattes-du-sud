import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale, routing } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import {
  copyFields,
  getEditableCopy,
  type CopyNamespace,
} from "@/lib/editable-copy";
import { aboutMessages } from "@/messages/about";
import { homeMessages } from "@/messages/home";
import { pageMessages } from "@/messages/pages";
import { updateContent } from "../actions";

export const metadata = {
  title: "Edit text",
  robots: { index: false, follow: false },
};
const namespaces: CopyNamespace[] = ["home", "about", "pages"];

export default async function ContentPage({
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
  const language =
    typeof query.language === "string" && isLocale(query.language)
      ? query.language
      : locale;
  const namespace =
    typeof query.section === "string" &&
    namespaces.includes(query.section as CopyNamespace)
      ? (query.section as CopyNamespace)
      : "home";
  const base =
    namespace === "home"
      ? homeMessages[language]
      : namespace === "about"
        ? aboutMessages[language]
        : pageMessages[language];
  const fields = copyFields(getEditableCopy(namespace, language, base));
  return (
    <main className="flex-1 py-12">
      <Container className="max-w-4xl">
        <Link href={`/${locale}/admin`} className="text-accent underline">
          ← Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Edit page text</h1>
        <nav aria-label="Text sections" className="mt-6 flex flex-wrap gap-3">
          {namespaces.map((section) => (
            <Link
              key={section}
              href={`/${locale}/admin/content?section=${section}&language=${language}`}
              aria-current={section === namespace ? "page" : undefined}
              className="rounded-full border border-border px-4 py-2 capitalize hover:bg-secondary aria-current:bg-secondary"
            >
              {section}
            </Link>
          ))}
        </nav>
        <nav aria-label="Language" className="mt-4 flex flex-wrap gap-3">
          {routing.locales.map((item) => (
            <Link
              key={item}
              href={`/${locale}/admin/content?section=${namespace}&language=${item}`}
              aria-current={item === language ? "page" : undefined}
              className="rounded-full border border-border px-4 py-2 uppercase hover:bg-secondary aria-current:bg-secondary"
            >
              {item}
            </Link>
          ))}
        </nav>
        {query.saved && (
          <p role="status" className="mt-5 rounded-xl bg-secondary p-4">
            Text saved.
          </p>
        )}
        <form action={updateContent} className="mt-8 space-y-5">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="language" value={language} />
          <input type="hidden" name="section" value={namespace} />
          {fields.map(({ path, value }) => (
            <label key={path} className="block font-semibold">
              <span className="break-all text-heading">{path}</span>
              <textarea
                name={`field:${path}`}
                defaultValue={value}
                rows={value.length > 180 ? 4 : 2}
                className="mt-2 block w-full rounded-xl border border-border bg-surface p-3 font-normal"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </label>
          ))}
          <button
            type="submit"
            className="min-h-12 rounded-full bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover"
          >
            Save text
          </button>
        </form>
      </Container>
    </main>
  );
}
