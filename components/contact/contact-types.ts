import type { Settings } from "@/lib/database/site-settings";
import { pageMessages } from "@/messages/pages";

export type ContactText = typeof pageMessages.en.contact;
export type ContactChannelsSettings = Pick<Settings, "email" | "whatsappNumber" | "whatsappDisplay">;
export type ContactAvailabilitySettings = Pick<Settings, "responseTimeHours" | "openingHours" | "closingHours">;
