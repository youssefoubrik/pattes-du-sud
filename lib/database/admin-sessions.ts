import "server-only";
import { db } from "./connection";

export function removeExpiredAdminSessions(now: number) {
  db().prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now);
}

export function saveAdminSession(tokenHash: string, expiresAt: number) {
  db().prepare("INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)").run(tokenHash, expiresAt);
}

export function getAdminSessionExpiry(tokenHash: string) {
  return (db().prepare("SELECT expires_at FROM sessions WHERE token_hash = ?").get(tokenHash) as { expires_at: number } | undefined)?.expires_at;
}

export function deleteAdminSession(tokenHash: string) {
  db().prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash);
}
