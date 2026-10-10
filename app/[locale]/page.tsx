import { Introduction } from "@/components/home/introduction";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Introduction locale={locale} />
    </main>
  );
}
