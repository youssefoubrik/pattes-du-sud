import type { Metadata } from "next";
import { Lora, Noto_Sans_Arabic, Nunito_Sans } from "next/font/google";
import { siteContent } from "@/content/site";
import { notFound } from "next/navigation";
import { Header } from "@/components/header/header";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer/footer";
import { isLocale, routing } from "@/i18n/routing";
import { messages } from "@/messages";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import "../globals.css";

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
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fontVariables = locale === "ar"
    ? notoSansArabic.variable
    : `${nunitoSans.variable} ${lora.variable}`;
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
