import "server-only";
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { db } from "./db";

const cookieName = "pattes_admin";
const lifespan = 60 * 60 * 24 * 7;

export function verifyPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD_HASH;
  if (!configured) return false;
  const [salt, expected] = configured.split(":");
  if (!salt || !expected || !/^[a-f0-9]{64}$/.test(expected)) return false;
  const candidate = scryptSync(password, salt, 32);
  return timingSafeEqual(candidate, Buffer.from(expected, "hex"));
}

export async function createSession() {
  db().prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
  const token = randomBytes(32).toString("hex");
  const hash = createHash("sha256").update(token).digest("hex");
  db()
    .prepare("INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)")
    .run(hash, Date.now() + lifespan * 1000);
  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: lifespan,
  });
}

export async function isAdmin() {
  await connection();
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  const hash = createHash("sha256").update(token).digest("hex");
  const row = db()
    .prepare("SELECT expires_at FROM sessions WHERE token_hash = ?")
    .get(hash) as { expires_at: number } | undefined;
  return Boolean(row && row.expires_at > Date.now());
}

export async function requireAdmin(locale: string) {
  if (!(await isAdmin())) redirect(`/${locale}/admin/login`);
}

export async function endSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if (token)
    db()
      .prepare("DELETE FROM sessions WHERE token_hash = ?")
      .run(createHash("sha256").update(token).digest("hex"));
  (await cookies()).delete(cookieName);
}
