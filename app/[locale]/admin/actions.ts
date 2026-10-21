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
  ANIMAL_NAME_MAX_LENGTH,
  ANIMAL_PERSONALITY_MAX_LENGTH,
  ANIMAL_PHOTO_MAX_COUNT,
  ANIMAL_STORY_MAX_LENGTH,
  PHOTO_MAX_UPLOAD_SIZE_BYTES,
} from "@/lib/animal-limits";
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

function companionError(locale: string, error: string): never {
  const notice = randomUUID();
  redirect(`/${locale}/admin/companions?error=${error}&notice=${notice}`);
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
  settings.whatsappDisplay = String(form.get("whatsappNumber") || "")
    .trim()
    .slice(0, 500);
  settings.whatsappNumber = settings.whatsappDisplay.replace(/\D/g, "");
  for (const key of Object.keys(settings) as (keyof Settings)[]) {
    if (!settings[key])
      redirect(`/${locale}/admin/settings?error=required&field=${key}`);
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
      redirect(`/${locale}/admin/settings?error=url&field=${key}`);
  }
  for (const key of ["paypalDonateUrl", "paypalMonthlyUrl"] as const) {
    if (
      settings[key] &&
      !/^https:\/\/(www\.)?paypal\.com\//.test(settings[key])
    )
      redirect(`/${locale}/admin/settings?error=paypal&field=${key}`);
  }
  for (const key of ["impactAnimalsHelped", "impactAdoptions"] as const) {
    if (settings[key] && !/^\d{1,8}$/.test(settings[key]))
      redirect(`/${locale}/admin/settings?error=number`);
  }
  if (
    !/^\d{1,3}$/.test(settings.responseTimeHours) ||
    Number(settings.responseTimeHours) < 1 ||
    Number(settings.responseTimeHours) > 720
  )
    redirect(`/${locale}/admin/settings?error=response-time`);
  saveSettings(settings);
  for (const language of routing.locales) {
    revalidatePath(`/${language}`, "layout");
  }
  const notice = randomUUID();
  redirect(`/${locale}/admin/settings?saved=1&notice=${notice}`);
}

export async function upsertAnimal(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const idValue = String(form.get("id") || "").trim();
  const id = idValue ? Number(idValue) : undefined;
  if (idValue && (id === undefined || !Number.isSafeInteger(id) || id <= 0))
    companionError(locale, "profile");
  const existing = id ? getAnimal(id) : undefined;
  if (idValue && !existing) companionError(locale, "profile");
  const name = String(form.get("name") || "")
    .trim()
    .slice(0, ANIMAL_NAME_MAX_LENGTH);
  if (!name) companionError(locale, "name");
  const species = form.get("species") === "cat" ? "cat" : "dog";
  const value = String(form.get("status") || "inCare");
  const status: EditableAnimal["status"] =
    value === "available" || value === "adopted" ? value : "inCare";
  const age = Number(form.get("ageYears"));
  const removedPhotos = new Set(
    form
      .getAll("removePhoto")
      .map(Number)
      .filter((index) => Number.isInteger(index) && index >= 0),
  );
  const retainedPhotoEntries = (existing?.photos || []).flatMap((photo, index) => {
    if (removedPhotos.has(index)) return [];
    const alt = String(form.get(`photoAlt:${index}`) || "")
      .trim()
      .slice(0, 200);
    return [{ index, photo: { ...photo, alt: alt || undefined } }];
  });
  const mainPhotoIndex = Number(form.get("mainPhoto"));
  retainedPhotoEntries.sort((a, b) =>
    a.index === mainPhotoIndex ? -1 : b.index === mainPhotoIndex ? 1 : a.index - b.index,
  );
  const photos: EditableAnimal["photos"] = retainedPhotoEntries.map(
    ({ photo }) => photo,
  );
  const photoFiles = form
    .getAll("photos")
    .filter((file): file is File => file instanceof File && file.size > 0);
  if (photos.length + photoFiles.length > ANIMAL_PHOTO_MAX_COUNT)
    companionError(locale, "photo-count");
  if (!photos.length && !photoFiles.length)
    companionError(locale, "photo");

  const uploads: { mime: string; bytes: Buffer }[] = [];
  for (const photo of photoFiles) {
    if (photo.size > PHOTO_MAX_UPLOAD_SIZE_BYTES)
      companionError(locale, "size");
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
    if (!mime) companionError(locale, "photo");
    uploads.push({ mime, bytes });
  }
  const insertPhoto = db().prepare(
    "INSERT INTO media (id, mime, bytes) VALUES (?, ?, ?)",
  );
  for (const upload of uploads) {
    const photoId = randomUUID();
    insertPhoto.run(photoId, upload.mime, upload.bytes);
    photos.push({ src: `/api/media/${photoId}` });
  }
  const animalId = saveAnimal({
    ...(existing ? { id: existing.id } : {}),
    name,
    species,
    status,
    photos,
    ageYears: Number.isFinite(age) && age > 0 && age < 40 ? age : undefined,
    addedAt: existing?.addedAt || new Date().toISOString().slice(0, 10),
    featuredOrder: existing?.featuredOrder,
    personality: ["gentle", "playful", "curious", "shy"].includes(
      String(form.get("personalityChoice")),
    )
      ? (String(form.get("personalityChoice")) as NonNullable<EditableAnimal["personality"]>)
      : undefined,
    personalityCustom:
      form.get("personalityChoice") === "custom"
        ? String(form.get("personalityCustom") || "")
            .trim()
            .slice(0, ANIMAL_PERSONALITY_MAX_LENGTH) || undefined
        : undefined,
    story: String(form.get("story") || "")
      .trim()
      .slice(0, ANIMAL_STORY_MAX_LENGTH),
    sex:
      form.get("sex") === "male"
        ? "male"
        : form.get("sex") === "female"
          ? "female"
          : undefined,
    vaccinated:
      form.get("vaccinated") === "yes" || form.get("vaccinated") === "no"
        ? (form.get("vaccinated") as "yes" | "no")
        : "no",
    sterilized:
      form.get("sterilized") === "yes" || form.get("sterilized") === "no"
        ? (form.get("sterilized") as "yes" | "no")
        : "no",
  });
  for (const language of routing.locales) {
    revalidatePath(`/${language}/companions`);
    revalidatePath(`/${language}/companions/${animalId}`);
    revalidatePath(`/${language}`);
  }
  const outcome = existing ? "updated" : "added";
  const notice = randomUUID();
  redirect(`/${locale}/admin/companions?success=${outcome}&notice=${notice}`);
}

export async function removeAnimal(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const id = Number(form.get("id"));
  if (Number.isSafeInteger(id) && id > 0 && getAnimal(id)) deleteAnimal(id);
  for (const language of routing.locales) {
    revalidatePath(`/${language}/companions`);
    revalidatePath(`/${language}`);
  }
  const notice = randomUUID();
  redirect(`/${locale}/admin/companions?success=removed&notice=${notice}`);
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
  if (!(file instanceof File) || file.size < 1 || file.size > PHOTO_MAX_UPLOAD_SIZE_BYTES)
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
