import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { animals, paginationSampleAnimals, type Animal, type AnimalPhoto } from "@/content/animals";
import { footerContent } from "@/content/footer";

const path =
  process.env.DATABASE_PATH || join(process.cwd(), "data", "site.sqlite");
let database: Database.Database | undefined;

export type EditableAnimal = Animal & {
  id: number;
  story?: string;
  sex?: "female" | "male";
  vaccinated?: "yes" | "no";
  sterilized?: "yes" | "no";
};

type StoredAnimal = Omit<EditableAnimal, "photos" | "id" | "vaccinated" | "sterilized"> & {
  image?: AnimalPhoto;
  photos?: AnimalPhoto[];
  vaccinated?: EditableAnimal["vaccinated"] | boolean;
  sterilized?: EditableAnimal["sterilized"] | boolean;
};

function parseHealthStatus(value: StoredAnimal["vaccinated"]): NonNullable<EditableAnimal["vaccinated"]> {
  if (value === "yes" || value === "no") return value;
  return value === true ? "yes" : "no";
}

function parseAnimalData(data: string): Omit<EditableAnimal, "id"> {
  const record = JSON.parse(data) as StoredAnimal;
  const { image, ...animal } = record;
  return {
    ...animal,
    photos: record.photos?.length ? record.photos : image ? [image] : [],
    vaccinated: parseHealthStatus(record.vaccinated),
    sterilized: parseHealthStatus(record.sterilized),
  };
}

export type Settings = {
  email: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  responseTimeHours: string;
  openingHours: string;
  closingHours: string;
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
  responseTimeHours: "24",
  openingHours: "",
  closingHours: "",
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
    const migrateAnimals = instance.transaction(() => {
      const rows = instance.prepare("SELECT slug, data, updated_at FROM animals").all() as {
        slug: string;
        data: string;
        updated_at: string;
      }[];
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
    });
    migrateAnimals();
  }
  const eventColumns = instance.pragma("table_info(events)") as {
    name: string;
  }[];
  if (!eventColumns.some((column) => column.name === "source"))
    instance.exec("ALTER TABLE events ADD COLUMN source TEXT");
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_seeded'").get()) {
    const insert = instance.prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)");
    instance.transaction(() => {
      for (const animal of animals)
        insert.run(JSON.stringify(animal), new Date().toISOString());
      instance
        .prepare("INSERT INTO settings (key, value) VALUES ('_seeded', '1')")
        .run();
    })();
  }
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_pagination_samples_v1'").get()) {
    const insert = instance.prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)");
    instance.transaction(() => {
      for (const animal of paginationSampleAnimals)
        insert.run(JSON.stringify(animal), new Date().toISOString());
      instance
        .prepare("INSERT INTO settings (key, value) VALUES ('_pagination_samples_v1', '1')")
        .run();
    })();
  }
  if (!instance.prepare("SELECT 1 FROM settings WHERE key = '_profile_photos_v1'").get()) {
    const addSamplePhotos = instance.transaction(() => {
      const rows = instance.prepare("SELECT id, data FROM animals").all() as {
        id: number;
        data: string;
      }[];
      const update = instance.prepare("UPDATE animals SET data = ? WHERE id = ?");
      for (const row of rows) {
        const current = parseAnimalData(row.data);
        if (current.photos.length !== 1) continue;
        const sample = animals.find(
          (candidate) =>
            candidate.name === current.name &&
            candidate.photos[0]?.src === current.photos[0]?.src,
        );
        if (sample && sample.photos.length > 1)
          update.run(JSON.stringify({ ...current, photos: sample.photos }), row.id);
      }
      instance
        .prepare("INSERT INTO settings (key, value) VALUES ('_profile_photos_v1', '1')")
        .run();
    });
    addSamplePhotos();
  }
  database = instance;
  return instance;
}

export function getAnimals(): EditableAnimal[] {
  return (
    db().prepare("SELECT id, data FROM animals ORDER BY updated_at DESC").all() as {
      id: number;
      data: string;
    }[]
  ).map(({ id, data }) => ({ ...parseAnimalData(data), id }));
}

export function getAnimal(id: number): EditableAnimal | undefined {
  const row = db()
    .prepare("SELECT id, data FROM animals WHERE id = ?")
    .get(id) as { id: number; data: string } | undefined;
  return row ? { ...parseAnimalData(row.data), id: row.id } : undefined;
}

export function saveAnimal(animal: Omit<EditableAnimal, "id"> & { id?: number }): number {
  const database = db();
  const { id, ...data } = animal;
  if (id !== undefined) {
    database
      .prepare("UPDATE animals SET data = ?, updated_at = ? WHERE id = ?")
      .run(JSON.stringify(data), new Date().toISOString(), id);
    pruneMedia();
    return id;
  }
  const result = database
    .prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)")
    .run(JSON.stringify(data), new Date().toISOString());
  pruneMedia();
  return Number(result.lastInsertRowid);
}

export function deleteAnimal(id: number) {
  db().prepare("DELETE FROM animals WHERE id = ?").run(id);
  pruneMedia();
}

export function pruneMedia() {
  db().exec(`DELETE FROM media
    WHERE NOT EXISTS (SELECT 1 FROM media_slots WHERE media_slots.media_id = media.id)
    AND NOT EXISTS (
      SELECT 1 FROM animals
      WHERE json_extract(animals.data, '$.image.src') = '/api/media/' || media.id
    )
    AND NOT EXISTS (
      SELECT 1 FROM animals, json_each(animals.data, '$.photos') AS photo
      WHERE json_extract(photo.value, '$.src') = '/api/media/' || media.id
    )`);
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
