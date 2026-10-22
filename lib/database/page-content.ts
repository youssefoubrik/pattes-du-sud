import "server-only";
import { db } from "./connection";

export type PageContentSection = "home" | "about" | "pages";

export function getPageContent<T extends object>(section: PageContentSection, locale: string, base: T): T {
  const row = db().prepare("SELECT data FROM copy WHERE namespace = ? AND locale = ?").get(section, locale) as { data: string } | undefined;
  if (!row) return base;
  try { return mergePageContent(base, JSON.parse(row.data)); } catch { return base; }
}

export function savePageContent(section: PageContentSection, locale: string, data: object) {
  db().prepare("INSERT INTO copy (namespace, locale, data) VALUES (?, ?, ?) ON CONFLICT(namespace, locale) DO UPDATE SET data=excluded.data")
    .run(section, locale, JSON.stringify(data));
}

function mergePageContent<T>(base: T, edit: unknown): T {
  if (typeof base === "string") return (typeof edit === "string" ? edit : base) as T;
  if (Array.isArray(base)) return base.map((item, index) => mergePageContent(item, Array.isArray(edit) ? edit[index] : undefined)) as T;
  if (base && typeof base === "object") {
    const result = { ...base } as Record<string, unknown>;
    for (const key of Object.keys(result)) result[key] = mergePageContent(result[key], edit && typeof edit === "object" ? (edit as Record<string, unknown>)[key] : undefined);
    return result as T;
  }
  return base;
}
