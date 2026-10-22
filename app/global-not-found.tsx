import type { Metadata } from "next";
import { localizedRoute, routePaths } from "@/lib/routes";
import { Lora, Nunito_Sans } from "next/font/google";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { LogoLink } from "@/components/logo-link";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Page not found | Pattes du Sud",
  description: "The page you’re looking for could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <main id="main-content" className="flex flex-1 items-center py-16">
          <Container className="max-w-xl text-center">
            <LogoLink locale="en" />
            <p className="mt-12 text-sm font-bold tracking-[0.2em] text-primary-hover">404</p>
            <h1 className="mt-3 text-4xl text-heading sm:text-5xl">We couldn’t find that page</h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              The address may be incorrect, or the page may have moved.
            </p>
            <ButtonLink
              href={localizedRoute("en", routePaths.home)}
              variant="secondary"
              className="mt-8"
            >
              Back to home
            </ButtonLink>
          </Container>
        </main>
      </body>
    </html>
  );
}
