import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "./connection";

export function getMediaSrc(key: string, fallback: string) {
  const row = db().prepare("SELECT media_id FROM media_slots WHERE key = ?").get(key) as { media_id: string } | undefined;
  return row ? `/api/media/${row.media_id}` : fallback;
}

export function storeUploadedPhoto(mime: string, bytes: Buffer) {
  const id = randomUUID();
  db().prepare("INSERT INTO media (id, mime, bytes) VALUES (?, ?, ?)").run(id, mime, bytes);
  return `/api/media/${id}`;
}

export function saveMediaSlot(key: string, mime: string, bytes: Buffer) {
  const database = db();
  const id = randomUUID();
  database.transaction(() => {
    database.prepare("INSERT INTO media (id, mime, bytes) VALUES (?, ?, ?)").run(id, mime, bytes);
    database.prepare("INSERT INTO media_slots (key, media_id) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET media_id=excluded.media_id").run(key, id);
  })();
  pruneUploadedMedia();
}

export function getUploadedPhoto(id: string) {
  return db().prepare("SELECT mime, bytes FROM media WHERE id = ?").get(id) as { mime: string; bytes: Buffer } | undefined;
}

export function pruneUploadedMedia() {
  db().exec(`DELETE FROM media
    WHERE NOT EXISTS (SELECT 1 FROM media_slots WHERE media_slots.media_id = media.id)
    AND NOT EXISTS (SELECT 1 FROM animals WHERE json_extract(animals.data, '$.image.src') = '/api/media/' || media.id)
    AND NOT EXISTS (SELECT 1 FROM animals, json_each(animals.data, '$.photos') AS photo WHERE json_extract(photo.value, '$.src') = '/api/media/' || media.id)`);
}
