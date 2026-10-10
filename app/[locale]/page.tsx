import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { messages } from "@/messages";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <Container as="main" width="content" padding="fixed" id="main-content" tabIndex={-1} className="flex flex-1 flex-col justify-center py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        {siteContent.name}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {messages[locale].description}
      </p>
    </Container>
  );
}
