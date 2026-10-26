import "server-only";
import { db } from "./connection";

export type SiteAnalytics = {
  pageViews: number;
  topAnimals: { animalId: number; count: number }[];
  countries: { country: string; count: number }[];
  sources: { source: string; count: number }[];
};

export function recordPageView(path: string, country: string | null, source: string | null) {
  db().prepare("INSERT INTO events (kind, path, country, source) VALUES ('view', ?, ?, ?)").run(path, country, source);
}

export function getSiteAnalytics(): SiteAnalytics {
  const database = db();
  return {
    pageViews: (database.prepare("SELECT COUNT(*) AS count FROM events WHERE kind = 'view'").get() as { count: number }).count,
    topAnimals: database.prepare("SELECT CAST(SUBSTR(path, INSTR(path, '/companions/') + LENGTH('/companions/')) AS INTEGER) AS animalId, COUNT(*) AS count FROM events WHERE kind = 'view' AND path LIKE '%/companions/%' GROUP BY animalId ORDER BY count DESC, animalId ASC LIMIT 5").all() as SiteAnalytics["topAnimals"],
    countries: database.prepare("SELECT country, COUNT(*) AS count FROM events WHERE kind = 'view' AND country IS NOT NULL GROUP BY country ORDER BY count DESC, country ASC LIMIT 5").all() as SiteAnalytics["countries"],
    sources: database.prepare("SELECT source, COUNT(*) AS count FROM events WHERE kind = 'view' AND source IS NOT NULL GROUP BY source ORDER BY count DESC, source ASC LIMIT 10").all() as SiteAnalytics["sources"],
  };
}
