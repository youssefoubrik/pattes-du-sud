import { Suspense } from "react";
import { connection } from "next/server";
import type { Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/db";
import { footerMessages } from "@/messages/footer";

export function FooterRegistration({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<div aria-hidden="true" className="mt-1 h-5 w-40 rounded-sm bg-border" />}>
      <RegistrationReference locale={locale} />
    </Suspense>
  );
}

async function RegistrationReference({ locale }: { locale: Locale }) {
  await connection();
  const reference = getSettings().registrationReference;
  if (!reference) return null;

  return (
    <p className="mt-1 text-sm leading-relaxed text-foreground">
      {footerMessages[locale].registration}: {reference}
    </p>
  );
}
