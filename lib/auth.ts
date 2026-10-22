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
import { localizedRoute, routePaths } from "@/lib/routes";
import { deleteAdminSession, getAdminSessionExpiry, removeExpiredAdminSessions, saveAdminSession } from "@/lib/database/admin-sessions";

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
  removeExpiredAdminSessions(Date.now());
  const token = randomBytes(32).toString("hex");
  const hash = createHash("sha256").update(token).digest("hex");
  saveAdminSession(hash, Date.now() + lifespan * 1000);
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
  const expiresAt = getAdminSessionExpiry(hash);
  return Boolean(expiresAt && expiresAt > Date.now());
}

export async function requireAdmin(locale: string) {
  if (!(await isAdmin())) redirect(localizedRoute(locale, routePaths.adminLogin));
}

export async function endSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if (token) deleteAdminSession(createHash("sha256").update(token).digest("hex"));
  (await cookies()).delete(cookieName);
}
