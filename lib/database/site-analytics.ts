import "server-only";
import { db } from "./connection";

export type SiteAnalytics = {
  events: { kind: string; count: number }[];
  topAnimals: { animalId: number; count: number }[];
  countries: { country: string; count: number }[];
  sources: { source: string; count: number }[];
};

export function recordSiteEvent(kind: string, path: string, country: string | null, source: string | null) {
  db().prepare("INSERT INTO events (kind, path, country, source) VALUES (?, ?, ?, ?)").run(kind, path, country, source);
}

export function getSiteAnalytics(): SiteAnalytics {
  const database = db();
  return {
    events: database.prepare("SELECT kind, COUNT(*) AS count FROM events GROUP BY kind ORDER BY count DESC, kind ASC").all() as SiteAnalytics["events"],
    topAnimals: database.prepare("SELECT CAST(SUBSTR(path, INSTR(path, '/companions/') + LENGTH('/companions/')) AS INTEGER) AS animalId, COUNT(*) AS count FROM events WHERE kind = 'view' AND path LIKE '%/companions/%' GROUP BY animalId ORDER BY count DESC, animalId ASC LIMIT 5").all() as SiteAnalytics["topAnimals"],
    countries: database.prepare("SELECT country, COUNT(*) AS count FROM events WHERE country IS NOT NULL GROUP BY country ORDER BY count DESC, country ASC LIMIT 5").all() as SiteAnalytics["countries"],
    sources: database.prepare("SELECT source, COUNT(*) AS count FROM events WHERE source IS NOT NULL GROUP BY source ORDER BY count DESC, source ASC LIMIT 10").all() as SiteAnalytics["sources"],
  };
}
