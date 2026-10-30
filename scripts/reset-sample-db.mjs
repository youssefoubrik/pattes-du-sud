import { mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import Database from "better-sqlite3";
import { animals } from "../content/animals.ts";
import { supporters } from "../content/supporters.ts";

if (process.env.NODE_ENV === "production") {
  throw new Error("Refusing to reset a database while NODE_ENV=production.");
}

const databasePath = join(process.cwd(), "data", "site.sqlite");
const backupPath = join(
  dirname(databasePath),
  "backups",
  `site-before-sample-reset-${new Date().toISOString().replace(/[:.]/g, "-")}.sqlite`,
);

mkdirSync(dirname(backupPath), { recursive: true });
if (existsSync(databasePath)) {
  const existing = new Database(databasePath, { readonly: true, fileMustExist: true });
  await existing.backup(backupPath);
  existing.close();
  rmSync(databasePath);
  rmSync(`${databasePath}-wal`, { force: true });
  rmSync(`${databasePath}-shm`, { force: true });
  console.log(`Backup saved: ${backupPath.replace(`${process.cwd()}/`, "")}`);
}

const database = new Database(databasePath);
database.pragma("journal_mode = WAL");
database.exec(`
  CREATE TABLE animals (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT NOT NULL, updated_at TEXT NOT NULL);
  CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE media (id TEXT PRIMARY KEY, mime TEXT NOT NULL, bytes BLOB NOT NULL);
  CREATE TABLE media_slots (key TEXT PRIMARY KEY, media_id TEXT NOT NULL REFERENCES media(id));
  CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
  CREATE TABLE events (id INTEGER PRIMARY KEY, kind TEXT NOT NULL, path TEXT NOT NULL, country TEXT, source TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE copy (namespace TEXT NOT NULL, locale TEXT NOT NULL, data TEXT NOT NULL, PRIMARY KEY(namespace, locale));
`);

const sampleSettings = {
  email: "hello@example.org",
  whatsappNumber: "212000000000",
  whatsappDisplay: "+212 000 000 000",
  responseTimeHours: "36",
  openingHours: "10:00",
  closingHours: "17:00",
  instagram: "",
  facebook: "",
  registrationReference: "SAMPLE ONLY — replace before launch",
  paypalDonateUrl: "",
  paypalMonthlyUrl: "",
  iban: "MA00 0000 0000 0000 0000 0000 00",
  rib: "000 000 0000000000000000 00",
  swift: "DEMOXX00XXX",
  bankName: "Fictional Sample Bank",
  mapEmbedUrl: "https://maps.google.com/maps?q=Mirleft%2C%20Morocco&z=15&output=embed",
  impactAnimalsHelped: "",
  impactAdoptions: "",
};

const insertAnimal = database.prepare(
  "INSERT INTO animals (data, updated_at) VALUES (?, ?)",
);
const insertSetting = database.prepare(
  "INSERT INTO settings (key, value) VALUES (?, ?)",
);
database.transaction(() => {
  const now = new Date().toISOString();
  for (const profile of animals) insertAnimal.run(JSON.stringify(profile), now);
  for (const [key, value] of Object.entries(sampleSettings)) insertSetting.run(key, value);
  insertSetting.run("supporters", JSON.stringify(supporters));
  insertSetting.run("_seeded", "1");
  insertSetting.run("_pagination_samples_v1", "1");
  insertSetting.run("_profile_photos_v1", "1");
})();
database.close();

console.log(`Sample database ready: ${databasePath.replace(`${process.cwd()}/`, "")}`);
console.log("Contact and bank details are fictional examples; replace before launch.");
