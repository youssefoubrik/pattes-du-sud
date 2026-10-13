import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { animals, paginationSampleAnimals, type Animal } from "@/content/animals";
import { footerContent } from "@/content/footer";

const path =
  process.env.DATABASE_PATH || join(process.cwd(), "data", "site.sqlite");
let database: Database.Database | undefined;

export type EditableAnimal = Animal & {
  story?: string;
  sex?: "female" | "male";
  vaccinated?: boolean;
  sterilized?: boolean;
};

export type Settings = {
  email: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagram: string;
  facebook: string;
  registrationReference: string;
  paypalDonateUrl: string;
  paypalMonthlyUrl: string;
  iban: string;
  rib: string;
  swift: string;
  bankName: string;
  mapEmbedUrl: string;
  impactAnimalsHelped: string;
  impactAdoptions: string;
};

const defaults: Settings = {
  email:
    footerContent.contact.email === "contact@example.org"
      ? ""
      : footerContent.contact.email,
  whatsappNumber:
    footerContent.contact.whatsappNumber === "212000000000"
      ? ""
      : footerContent.contact.whatsappNumber,
  whatsappDisplay:
    footerContent.contact.whatsappDisplay === "+212 000 000 000"
      ? ""
      : footerContent.contact.whatsappDisplay,
  instagram: "",
  facebook: "",
  registrationReference: "",
  paypalDonateUrl: "",
  paypalMonthlyUrl: "",
  iban: "",
  rib: "",
  swift: "",
  bankName: "",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Mirleft%2C%20Morocco&z=15&output=embed",
  impactAnimalsHelped: "",
  impactAdoptions: "",
};

export function db() {
  if (database) return database;
  mkdirSync(dirname(path), { recursive: true });
  const instance = new Database(path);
  instance.pragma("journal_mode = WAL");
  instance.exec(`
    CREATE TABLE IF NOT EXISTS animals (slug TEXT PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, mime TEXT NOT NULL, bytes BLOB NOT NULL);
    CREATE TABLE IF NOT EXISTS media_slots (key TEXT PRIMARY KEY, media_id TEXT NOT NULL REFERENCES media(id));
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, kind TEXT NOT NULL, path TEXT NOT NULL, country TEXT, source TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS contact_messages (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS copy (namespace TEXT NOT NULL, locale TEXT NOT NULL, data TEXT NOT NULL, PRIMARY KEY(namespace, locale));
  `);
  const eventColumns = instance.pragma("table_info(events)") as {
    name: string;
  }[];
  if (!eventColumns.some((column) => column.name === "source"))
    instance.exec("ALTER TABLE events ADD COLUMN source TEXT");
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_seeded'").get()) {
    const insert = instance.prepare(
      "INSERT OR IGNORE INTO animals (slug, data, updated_at) VALUES (?, ?, ?)",
    );
    instance.transaction(() => {
      for (const animal of animals)
        insert.run(
          animal.slug,
          JSON.stringify(animal),
          new Date().toISOString(),
        );
      instance
        .prepare("INSERT INTO settings (key, value) VALUES ('_seeded', '1')")
        .run();
    })();
  }
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_pagination_samples_v1'").get()) {
    const insert = instance.prepare(
      "INSERT OR IGNORE INTO animals (slug, data, updated_at) VALUES (?, ?, ?)",
    );
    instance.transaction(() => {
      for (const animal of paginationSampleAnimals)
        insert.run(animal.slug, JSON.stringify(animal), new Date().toISOString());
      instance
        .prepare("INSERT INTO settings (key, value) VALUES ('_pagination_samples_v1', '1')")
        .run();
    })();
  }
  database = instance;
  return instance;
}

export function getAnimals(): EditableAnimal[] {
  return (
    db().prepare("SELECT data FROM animals ORDER BY updated_at DESC").all() as {
      data: string;
    }[]
  ).map(({ data }) => JSON.parse(data));
}

export function getAnimal(slug: string): EditableAnimal | undefined {
  const row = db()
    .prepare("SELECT data FROM animals WHERE slug = ?")
    .get(slug) as { data: string } | undefined;
  return row ? JSON.parse(row.data) : undefined;
}

export function saveAnimal(animal: EditableAnimal) {
  db()
    .prepare(
      "INSERT INTO animals (slug, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(slug) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at",
    )
    .run(animal.slug, JSON.stringify(animal), new Date().toISOString());
  pruneMedia();
}

export function deleteAnimal(slug: string) {
  db().prepare("DELETE FROM animals WHERE slug = ?").run(slug);
  pruneMedia();
}

export function pruneMedia() {
  db().exec(`DELETE FROM media WHERE id NOT IN (SELECT media_id FROM media_slots)
    AND '/api/media/' || id NOT IN (SELECT json_extract(data, '$.image.src') FROM animals)`);
}

export function getSettings(): Settings {
  const settings = { ...defaults };
  for (const row of db().prepare("SELECT key, value FROM settings").all() as {
    key: keyof Settings;
    value: string;
  }[]) {
    if (row.key in settings) settings[row.key] = row.value;
  }
  return settings;
}

export function saveSettings(input: Settings) {
  const statement = db().prepare(
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
  );
  db().transaction(() => {
    for (const [key, value] of Object.entries(input)) statement.run(key, value);
  })();
}
