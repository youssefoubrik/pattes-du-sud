import "server-only";
import { footerContent } from "@/content/footer";
import { db } from "./connection";

export type Settings = {
  email: string; whatsappNumber: string; whatsappDisplay: string; responseTimeHours: string;
  openingHours: string; closingHours: string; instagram: string; facebook: string;
  registrationReference: string; paypalDonateUrl: string; paypalMonthlyUrl: string;
  iban: string; rib: string; swift: string; bankName: string; mapEmbedUrl: string;
  impactAnimalsHelped: string; impactAdoptions: string;
};

const defaultSettings: Settings = {
  email: footerContent.contact.email === "contact@example.org" ? "" : footerContent.contact.email,
  whatsappNumber: footerContent.contact.whatsappNumber === "212000000000" ? "" : footerContent.contact.whatsappNumber,
  whatsappDisplay: footerContent.contact.whatsappDisplay === "+212 000 000 000" ? "" : footerContent.contact.whatsappDisplay,
  responseTimeHours: "24", openingHours: "", closingHours: "", instagram: "", facebook: "",
  registrationReference: "", paypalDonateUrl: "", paypalMonthlyUrl: "", iban: "", rib: "", swift: "", bankName: "",
  mapEmbedUrl: "https://maps.google.com/maps?q=Mirleft%2C%20Morocco&z=15&output=embed",
  impactAnimalsHelped: "", impactAdoptions: "",
};

export function getSettings(): Settings {
  const settings = { ...defaultSettings };
  for (const row of db().prepare("SELECT key, value FROM settings").all() as { key: keyof Settings; value: string }[]) {
    if (row.key in settings) settings[row.key] = row.value;
  }
  return settings;
}

export function saveSettings(input: Settings) {
  const database = db();
  const statement = database.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
  database.transaction(() => {
    for (const [key, value] of Object.entries(input)) statement.run(key, value);
  })();
}
