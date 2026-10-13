import type { Metadata } from "next";
import { Lora, Noto_Sans_Arabic, Nunito_Sans } from "next/font/google";
import { siteContent } from "@/content/site";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Header } from "@/components/header/header";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer/footer";
import { isLocale, routing } from "@/i18n/routing";
import { messages } from "@/messages";
import { pageMetadata } from "@/lib/metadata";
import "../globals.css";

// Contact details and animal records are edited live in the local CMS.
export const instant = false;

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { ...pageMetadata(locale, "", siteContent.name, messages[locale].description), title: siteContent.name, icons: { icon: siteContent.favicon } };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  await connection();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${nunitoSans.variable} ${locale === "ar" ? notoSansArabic.variable : lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
