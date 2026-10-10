import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteContent } from "@/content/site";
import { notFound } from "next/navigation";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { isLocale, routing } from "@/i18n/routing";
import { messages } from "@/messages";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: siteContent.name,
    description: messages[locale].description,
    icons: { icon: siteContent.favicon },
    openGraph: { title: siteContent.name, description: messages[locale].description, siteName: siteContent.name, type: "website" },
    twitter: { card: "summary", title: siteContent.name, description: messages[locale].description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
