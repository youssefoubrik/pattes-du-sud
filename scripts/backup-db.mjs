import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const source =
  process.env.DATABASE_PATH || join(process.cwd(), "data", "site.sqlite");
const destination = join(
  dirname(source),
  "backups",
  `site-${new Date().toISOString().replace(/[:.]/g, "-")}.sqlite`,
);
mkdirSync(dirname(destination), { recursive: true });
const db = new Database(source, { readonly: true, fileMustExist: true });
await db.backup(destination);
db.close();
console.log(destination);
