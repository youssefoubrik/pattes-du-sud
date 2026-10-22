import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { routing } from "@/i18n/routing";
import { getAnimals } from "@/lib/db";
import { localizedRoute, routePaths } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  const paths = [
    routePaths.home,
    routePaths.about,
    routePaths.companions,
    routePaths.adopt,
    routePaths.donate,
    routePaths.mirleft,
    routePaths.contact,
    routePaths.volunteer,
    routePaths.privacy,
  ];
  const animals = getAnimals().map((animal) => routePaths.companion(animal.id));
  return routing.locales.flatMap((locale) =>
    [...paths, ...animals].map((path) => ({
      url: `${origin.replace(/\/$/, "")}${localizedRoute(locale, path)}`,
      changeFrequency: path.startsWith(routePaths.companions)
        ? ("weekly" as const)
        : ("monthly" as const),
    })),
  );
}
