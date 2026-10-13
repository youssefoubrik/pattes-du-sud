"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isLocale } from "@/i18n/routing";

export async function sendContact(form: FormData) {
  const value = String(form.get("locale") || "en");
  const locale = isLocale(value) ? value : "en";
  if (form.get("website")) redirect(`/${locale}/contact?sent=1`);
  const name = String(form.get("name") || "")
    .trim()
    .slice(0, 120);
  const email = String(form.get("email") || "")
    .trim()
    .slice(0, 254);
  const message = String(form.get("message") || "")
    .trim()
    .slice(0, 3000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10)
    redirect(`/${locale}/contact?error=1`);
  db()
    .prepare(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
    )
    .run(name, email, message);
  redirect(`/${locale}/contact?sent=1`);
}
