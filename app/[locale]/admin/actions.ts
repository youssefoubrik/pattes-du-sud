"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  db,
  deleteAnimal,
  getAnimal,
  getSettings,
  pruneMedia,
  saveAnimal,
  saveSettings,
  type EditableAnimal,
  type Settings,
} from "@/lib/db";
import {
  createSession,
  endSession,
  requireAdmin,
  verifyPassword,
} from "@/lib/auth";
import { isLocale, routing } from "@/i18n/routing";
import {
  copyFields,
  getEditableCopy,
  saveEditableCopy,
  setCopyField,
  type CopyNamespace,
} from "@/lib/editable-copy";
import { homeMessages } from "@/messages/home";
import { aboutMessages } from "@/messages/about";
import { pageMessages } from "@/messages/pages";
import { mediaSlots } from "@/content/media";

function localeOf(form: FormData) {
  const value = String(form.get("locale") || "en");
  return isLocale(value) ? value : "en";
}

export async function login(form: FormData) {
  const locale = localeOf(form);
  const password = String(form.get("password") || "");
  if (!verifyPassword(password)) redirect(`/${locale}/admin/login?error=1`);
  await createSession();
  redirect(`/${locale}/admin`);
}

export async function logout(form: FormData) {
  const locale = localeOf(form);
  await endSession();
  redirect(`/${locale}/admin/login`);
}

export async function updateSettings(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const settings = getSettings();
  for (const key of Object.keys(settings) as (keyof Settings)[]) {
    settings[key] = String(form.get(key) || "")
      .trim()
      .slice(0, 500);
  }
  for (const key of [
    "instagram",
    "facebook",
    "mapEmbedUrl",
    "paypalDonateUrl",
    "paypalMonthlyUrl",
  ] as const) {
    const value = settings[key];
    if (value && !/^https:\/\//.test(value))
      redirect(`/${locale}/admin/settings?error=url`);
  }
  for (const key of ["paypalDonateUrl", "paypalMonthlyUrl"] as const) {
    if (
      settings[key] &&
      !/^https:\/\/(www\.)?paypal\.com\//.test(settings[key])
    )
      redirect(`/${locale}/admin/settings?error=url`);
  }
  for (const key of ["impactAnimalsHelped", "impactAdoptions"] as const) {
    if (settings[key] && !/^\d{1,8}$/.test(settings[key]))
      redirect(`/${locale}/admin/settings?error=number`);
  }
  saveSettings(settings);
  for (const language of routing.locales) {
    revalidatePath(`/${language}`, "layout");
  }
  redirect(`/${locale}/admin/settings?saved=1`);
}

export async function upsertAnimal(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const slug = String(form.get("slug") || "")
    .trim()
    .toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    redirect(`/${locale}/admin/animals?error=slug`);
  const existing = getAnimal(slug);
  const name = String(form.get("name") || "")
    .trim()
    .slice(0, 80);
  if (!name) redirect(`/${locale}/admin/animals?error=name`);
  const species = form.get("species") === "cat" ? "cat" : "dog";
  const value = String(form.get("status") || "inCare");
  const status: EditableAnimal["status"] =
    value === "available" || value === "adopted" ? value : "inCare";
  const age = Number(form.get("ageYears"));
  const photo = form.get("photo");
  let image = existing?.image;
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > 5_000_000) redirect(`/${locale}/admin/animals?error=size`);
    const bytes = Buffer.from(await photo.arrayBuffer());
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const png = bytes
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp =
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP";
    const mime = jpeg
      ? "image/jpeg"
      : png
        ? "image/png"
        : webp
          ? "image/webp"
          : null;
    if (!mime) redirect(`/${locale}/admin/animals?error=photo`);
    const id = randomUUID();
    db()
      .prepare("INSERT INTO media (id, mime, bytes) VALUES (?, ?, ?)")
      .run(id, mime, bytes);
    image = { src: `/api/media/${id}` };
  }
  if (!image) redirect(`/${locale}/admin/animals?error=photo`);
  saveAnimal({
    slug,
    name,
    species,
    status,
    image,
    ageYears: Number.isFinite(age) && age > 0 && age < 40 ? age : undefined,
    addedAt: existing?.addedAt || new Date().toISOString().slice(0, 10),
    featuredOrder: existing?.featuredOrder,
    personality: existing?.personality,
    story: String(form.get("story") || "")
      .trim()
      .slice(0, 5000),
    sex:
      form.get("sex") === "male"
        ? "male"
        : form.get("sex") === "female"
          ? "female"
          : undefined,
    vaccinated: form.get("vaccinated") === "on",
    sterilized: form.get("sterilized") === "on",
  });
  for (const language of routing.locales) {
    revalidatePath(`/${language}/animals`);
    revalidatePath(`/${language}/animals/${slug}`);
    revalidatePath(`/${language}`);
  }
  redirect(`/${locale}/admin/animals?saved=1`);
}

export async function removeAnimal(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const slug = String(form.get("slug") || "");
  if (getAnimal(slug)) deleteAnimal(slug);
  for (const language of routing.locales) {
    revalidatePath(`/${language}/animals`);
    revalidatePath(`/${language}`);
  }
  redirect(`/${locale}/admin/animals?deleted=1`);
}

export async function removeMessage(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const id = Number(form.get("id"));
  if (Number.isInteger(id) && id > 0)
    db().prepare("DELETE FROM contact_messages WHERE id = ?").run(id);
  redirect(`/${locale}/admin/messages`);
}

export async function updateContent(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const languageValue = String(form.get("language") || "en");
  const language = isLocale(languageValue) ? languageValue : "en";
  const sectionValue = String(form.get("section") || "home");
  const section: CopyNamespace =
    sectionValue === "about" || sectionValue === "pages"
      ? sectionValue
      : "home";
  const base =
    section === "home"
      ? homeMessages[language]
      : section === "about"
        ? aboutMessages[language]
        : pageMessages[language];
  const output = structuredClone(
    getEditableCopy(section, language, base),
  ) as object;
  for (const field of copyFields(base)) {
    const key = `field:${field.path}`;
    if (form.has(key))
      setCopyField(output, field.path, String(form.get(key)).slice(0, 10000));
  }
  saveEditableCopy(section, language, output);
  revalidatePath(`/${language}`, "layout");
  redirect(
    `/${locale}/admin/content?section=${section}&language=${language}&saved=1`,
  );
}

export async function updateMedia(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const slot = String(form.get("slot") || "");
  if (!mediaSlots.some((item) => item.key === slot))
    redirect(`/${locale}/admin/media?error=1`);
  const file = form.get("photo");
  if (!(file instanceof File) || file.size < 1 || file.size > 5_000_000)
    redirect(`/${locale}/admin/media?error=1`);
  const bytes = Buffer.from(await file.arrayBuffer());
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const webp =
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP";
  const mime = jpeg
    ? "image/jpeg"
    : png
      ? "image/png"
      : webp
        ? "image/webp"
        : null;
  if (!mime) redirect(`/${locale}/admin/media?error=1`);
  const id = randomUUID();
  db().transaction(() => {
    db()
      .prepare("INSERT INTO media (id, mime, bytes) VALUES (?, ?, ?)")
      .run(id, mime, bytes);
    db()
      .prepare(
        "INSERT INTO media_slots (key, media_id) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET media_id=excluded.media_id",
      )
      .run(slot, id);
  })();
  pruneMedia();
  for (const language of routing.locales)
    revalidatePath(`/${language}`, "layout");
  redirect(`/${locale}/admin/media?saved=1`);
}
