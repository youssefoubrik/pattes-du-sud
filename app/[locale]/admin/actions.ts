"use server";

import { localizedRoute, routePaths } from "@/lib/routes";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteAnimal,
  getAnimal,
  saveAnimal,
} from "@/lib/database/animal-records";
import type { EditableAnimal } from "@/lib/database/animal-records";
import { getSettings, saveSettings, type Settings } from "@/lib/database/site-settings";
import {
  createSession,
  endSession,
  requireAdmin,
  verifyPassword,
} from "@/lib/auth";
import { isLocale, routing } from "@/i18n/routing";
import {
  ANIMAL_NAME_MAX_LENGTH,
  ANIMAL_PHOTO_MAX_COUNT,
  ANIMAL_STORY_MAX_LENGTH,
  PHOTO_MAX_UPLOAD_SIZE_BYTES,
} from "@/lib/animal-limits";
import {
  getPageContent,
  savePageContent,
  type PageContentSection,
} from "@/lib/database/page-content";
import { getPageContentFields, setPageContentField } from "@/lib/page-content-fields";
import { saveMediaSlot, storeUploadedPhoto } from "@/lib/database/uploaded-media";
import { homeMessages } from "@/messages/home";
import { aboutMessages } from "@/messages/about";
import { pageMessages } from "@/messages/pages";
import { mediaSlots } from "@/content/media";
import type { LocalizedAnimalText } from "@/content/animals";

function localeOf(form: FormData) {
  const value = String(form.get("locale") || "en");
  return isLocale(value) ? value : "en";
}

function companionError(locale: string, error: string): never {
  const notice = randomUUID();
  redirect(`${localizedRoute(locale, routePaths.adminCompanions)}?error=${error}&notice=${notice}`);
}

function localizedAnimalText(
  form: FormData,
  field: string,
  maxLength: number,
): LocalizedAnimalText | undefined {
  const values = Object.fromEntries(
    routing.locales.map((language) => [
      language,
      String(form.get(`${field}:${language}`) || "")
        .trim()
        .slice(0, maxLength),
    ]),
  ) as LocalizedAnimalText;
  return Object.values(values).some(Boolean) ? values : undefined;
}

export async function login(form: FormData) {
  const locale = localeOf(form);
  const password = String(form.get("password") || "");
  if (!verifyPassword(password)) redirect(`${localizedRoute(locale, routePaths.adminLogin)}?error=1`);
  await createSession();
  redirect(localizedRoute(locale, routePaths.admin));
}

export async function logout(form: FormData) {
  const locale = localeOf(form);
  await endSession();
  redirect(localizedRoute(locale, routePaths.adminLogin));
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
      redirect(`${localizedRoute(locale, routePaths.adminSettings)}?error=required&field=${key}`);
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
      redirect(`${localizedRoute(locale, routePaths.adminSettings)}?error=url&field=${key}`);
  }
  for (const key of ["paypalDonateUrl", "paypalMonthlyUrl"] as const) {
    if (
      settings[key] &&
      !/^https:\/\/(www\.)?paypal\.com\//.test(settings[key])
    )
      redirect(`${localizedRoute(locale, routePaths.adminSettings)}?error=paypal&field=${key}`);
  }
  for (const key of ["impactAnimalsHelped", "impactAdoptions"] as const) {
    if (settings[key] && !/^\d{1,8}$/.test(settings[key]))
      redirect(`${localizedRoute(locale, routePaths.adminSettings)}?error=number`);
  }
  if (
    !/^\d{1,3}$/.test(settings.responseTimeHours) ||
    Number(settings.responseTimeHours) < 1 ||
    Number(settings.responseTimeHours) > 720
  )
    redirect(`${localizedRoute(locale, routePaths.adminSettings)}?error=response-time`);
  saveSettings(settings);
  for (const language of routing.locales) {
    revalidatePath(`/${language}`, "layout");
  }
  const notice = randomUUID();
  redirect(`${localizedRoute(locale, routePaths.adminSettings)}?saved=1&notice=${notice}`);
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
  for (const upload of uploads) {
    photos.push({ src: storeUploadedPhoto(upload.mime, upload.bytes) });
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
    personality: [
      "gentle",
      "playful",
      "curious",
      "shy",
      "affectionate",
      "calm",
      "energetic",
      "independent",
    ].includes(
      String(form.get("personalityChoice")),
    )
      ? (String(form.get("personalityChoice")) as NonNullable<EditableAnimal["personality"]>)
      : undefined,
    story: localizedAnimalText(form, "story", ANIMAL_STORY_MAX_LENGTH),
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
  redirect(`${localizedRoute(locale, routePaths.adminCompanions)}?success=${outcome}&notice=${notice}`);
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
  redirect(`${localizedRoute(locale, routePaths.adminCompanions)}?success=removed&notice=${notice}`);
}

export async function updateContent(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const sectionValue = String(form.get("section") || "home");
  const section: PageContentSection =
    sectionValue === "about" || sectionValue === "pages"
      ? sectionValue
      : "home";
  for (const language of routing.locales) {
    const base =
      section === "home"
        ? homeMessages[language]
        : section === "about"
          ? aboutMessages[language]
          : pageMessages[language];
    const output = structuredClone(
      getPageContent(section, language, base),
    ) as object;
    for (const field of getPageContentFields(base)) {
      const key = `field:${field.path}:${language}`;
      if (form.has(key))
        setPageContentField(output, field.path, String(form.get(key)).slice(0, 10000));
    }
    savePageContent(section, language, output);
    revalidatePath(`/${language}`, "layout");
  }
  redirect(`${localizedRoute(locale, routePaths.adminContent)}?saved=1`);
}

export async function updateMedia(form: FormData) {
  const locale = localeOf(form);
  await requireAdmin(locale);
  const slot = String(form.get("slot") || "");
  if (!mediaSlots.some((item) => item.key === slot))
    redirect(`${localizedRoute(locale, routePaths.adminMedia)}?error=1`);
  const file = form.get("photo");
  if (!(file instanceof File) || file.size < 1 || file.size > PHOTO_MAX_UPLOAD_SIZE_BYTES)
    redirect(`${localizedRoute(locale, routePaths.adminMedia)}?error=1`);
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
  if (!mime) redirect(`${localizedRoute(locale, routePaths.adminMedia)}?error=1`);
  saveMediaSlot(slot, mime, bytes);
  for (const language of routing.locales)
    revalidatePath(`/${language}`, "layout");
  const notice = randomUUID();
  redirect(`${localizedRoute(locale, routePaths.adminMedia)}?saved=1&notice=${notice}`);
}
