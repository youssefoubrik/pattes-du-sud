import "server-only";
import { supporters as defaults, type Supporter } from "@/content/supporters";
import { db } from "./connection";

export function getSupporters(): Supporter[] {
  const row = db().prepare("SELECT value FROM settings WHERE key = 'supporters'").get() as { value: string } | undefined;
  if (!row) return defaults;

  try {
    const value: unknown = JSON.parse(row.value);
    if (!Array.isArray(value)) return defaults;
    return value.filter((item): item is Supporter =>
      Boolean(item && typeof item === "object" && typeof item.id === "string" && typeof item.name === "string"),
    );
  } catch {
    return defaults;
  }
}

export function saveSupporters(input: Supporter[]) {
  db().prepare("INSERT INTO settings (key, value) VALUES ('supporters', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .run(JSON.stringify(input));
}
