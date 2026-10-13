import "server-only";
import { db } from "./db";

export function getMediaSrc(key: string, fallback: string) {
  const row = db()
    .prepare("SELECT media_id FROM media_slots WHERE key = ?")
    .get(key) as { media_id: string } | undefined;
  return row ? `/api/media/${row.media_id}` : fallback;
}
