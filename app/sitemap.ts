import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { routing } from "@/i18n/routing";
import { getAnimals } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  const paths = [
    "",
    "/about",
    "/animals",
    "/adopt",
    "/donate",
    "/mirleft",
    "/contact",
    "/volunteer",
    "/privacy",
    "/legal",
  ];
  const animals = getAnimals().map((animal) => `/animals/${animal.id}`);
  return routing.locales.flatMap((locale) =>
    [...paths, ...animals].map((path) => ({
      url: `${origin.replace(/\/$/, "")}/${locale}${path}`,
      changeFrequency: path.startsWith("/animals")
        ? ("weekly" as const)
        : ("monthly" as const),
    })),
  );
}
