import "server-only";
import { db } from "./connection";

const PAGE_VIEW_RETENTION_MONTHS = 12;
const PRUNE_INTERVAL_MS = 24 * 60 * 60 * 1000;
let lastPrunedAt = 0;

export type SiteAnalytics = {
  pageViews: number;
  topAnimals: { animalId: number; count: number }[];
  countries: { country: string; count: number }[];
  qrSources: { location: string; count: number }[];
};

export function pruneOldPageViews(now = Date.now()) {
  if (now - lastPrunedAt < PRUNE_INTERVAL_MS) return;

  db()
    .prepare(
      `DELETE FROM events
       WHERE created_at < datetime('now', '-${PAGE_VIEW_RETENTION_MONTHS} months')`,
    )
    .run();
  lastPrunedAt = now;
}

export function recordPageView(path: string, country: string | null, qrSource: string | null) {
  db().prepare("INSERT INTO events (kind, path, country, source) VALUES ('view', ?, ?, ?)").run(path, country, qrSource);
}

export function getSiteAnalytics(): SiteAnalytics {
  pruneOldPageViews();
  const database = db();
  return {
    pageViews: (database.prepare("SELECT COUNT(*) AS count FROM events WHERE kind = 'view'").get() as { count: number }).count,
    topAnimals: database.prepare("SELECT CAST(SUBSTR(path, INSTR(path, '/companions/') + LENGTH('/companions/')) AS INTEGER) AS animalId, COUNT(*) AS count FROM events WHERE kind = 'view' AND path LIKE '%/companions/%' GROUP BY animalId ORDER BY count DESC, animalId ASC LIMIT 5").all() as SiteAnalytics["topAnimals"],
    countries: database.prepare("SELECT country, COUNT(*) AS count FROM events WHERE kind = 'view' AND country IS NOT NULL GROUP BY country ORDER BY count DESC, country ASC LIMIT 5").all() as SiteAnalytics["countries"],
    qrSources: database.prepare("SELECT source AS location, COUNT(*) AS count FROM events WHERE kind = 'view' AND source IS NOT NULL GROUP BY source ORDER BY count DESC, source ASC LIMIT 10").all() as SiteAnalytics["qrSources"],
  };
}
