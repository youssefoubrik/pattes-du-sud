import type { Metadata } from "next";
import { siteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image?: string,
): Metadata {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: `${title} | ${siteContent.name}`,
    description,
    ...(origin
      ? {
          metadataBase: new URL(origin),
          alternates: { canonical: `/${locale}${path}` },
        }
      : {}),
    openGraph: {
      title,
      description,
      siteName: siteContent.name,
      type: "website",
      locale,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
