import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { animals, paginationSampleAnimals } from "@/content/animals";
import { parseAnimalData } from "./animal-data";

const databasePath = process.env.DATABASE_PATH || join(process.cwd(), "data", "site.sqlite");
let database: Database.Database | undefined;

export function db() {
  if (database) return database;
  mkdirSync(dirname(databasePath), { recursive: true });
  const instance = new Database(databasePath);
  instance.pragma("journal_mode = WAL");
  instance.exec(`
    CREATE TABLE IF NOT EXISTS animals (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT NOT NULL, updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, mime TEXT NOT NULL, bytes BLOB NOT NULL);
    CREATE TABLE IF NOT EXISTS media_slots (key TEXT PRIMARY KEY, media_id TEXT NOT NULL REFERENCES media(id));
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, kind TEXT NOT NULL, path TEXT NOT NULL, country TEXT, source TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS copy (namespace TEXT NOT NULL, locale TEXT NOT NULL, data TEXT NOT NULL, PRIMARY KEY(namespace, locale));
  `);
  instance.exec("DROP TABLE IF EXISTS contact_messages");
  const animalColumns = instance.pragma("table_info(animals)") as { name: string }[];
  if (!animalColumns.some((column) => column.name === "id")) {
    instance.transaction(() => {
      const rows = instance.prepare("SELECT slug, data, updated_at FROM animals").all() as { slug: string; data: string; updated_at: string }[];
      instance.exec("ALTER TABLE animals RENAME TO animals_legacy");
      instance.exec("CREATE TABLE animals (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT NOT NULL, updated_at TEXT NOT NULL)");
      const insert = instance.prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)");
      for (const row of rows) {
        const record = JSON.parse(row.data) as Record<string, unknown>;
        delete record.slug;
        delete record.id;
        insert.run(JSON.stringify(record), row.updated_at);
      }
      instance.exec("DROP TABLE animals_legacy");
    })();
  }
  const eventColumns = instance.pragma("table_info(events)") as { name: string }[];
  if (!eventColumns.some((column) => column.name === "source")) instance.exec("ALTER TABLE events ADD COLUMN source TEXT");
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_seeded'").get()) {
    const insert = instance.prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)");
    instance.transaction(() => {
      for (const animal of animals) insert.run(JSON.stringify(animal), new Date().toISOString());
      instance.prepare("INSERT INTO settings (key, value) VALUES ('_seeded', '1')").run();
    })();
  }
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_pagination_samples_v1'").get()) {
    const insert = instance.prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)");
    instance.transaction(() => {
      for (const animal of paginationSampleAnimals) insert.run(JSON.stringify(animal), new Date().toISOString());
      instance.prepare("INSERT INTO settings (key, value) VALUES ('_pagination_samples_v1', '1')").run();
    })();
  }
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_profile_photos_v1'").get()) {
    instance.transaction(() => {
      const rows = instance.prepare("SELECT id, data FROM animals").all() as { id: number; data: string }[];
      const update = instance.prepare("UPDATE animals SET data = ? WHERE id = ?");
      for (const row of rows) {
        const current = parseAnimalData(row.data);
        if (current.photos.length !== 1) continue;
        const sample = animals.find((candidate) => candidate.name === current.name && candidate.photos[0]?.src === current.photos[0]?.src);
        if (sample && sample.photos.length > 1) update.run(JSON.stringify({ ...current, photos: sample.photos }), row.id);
      }
      instance.prepare("INSERT INTO settings (key, value) VALUES ('_profile_photos_v1', '1')").run();
    })();
  }
  database = instance;
  return instance;
}
