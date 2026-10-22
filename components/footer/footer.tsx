import { PawPrint } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FooterBottom } from "@/components/footer/footer-bottom";
import { FooterBrand } from "@/components/footer/footer-brand";
import { FooterContact } from "@/components/footer/footer-contact";
import { FooterNavigation } from "@/components/footer/footer-navigation";
import type { Locale } from "@/i18n/routing";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="relative mt-auto border-t border-border bg-secondary text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute right-8 top-2 flex items-center gap-2 text-decoration opacity-60">
        <PawPrint size={18} className="-rotate-12 fill-current" />
        <PawPrint size={21} className="translate-y-1 rotate-12 fill-current" />
        <PawPrint size={18} className="-rotate-6 fill-current" />
      </div>
      <Container className="pt-12">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          <FooterBrand locale={locale} />
          <FooterNavigation locale={locale} />
          <FooterContact locale={locale} />
        </div>
        <FooterBottom locale={locale} />
      </Container>
    </footer>
  );
}
