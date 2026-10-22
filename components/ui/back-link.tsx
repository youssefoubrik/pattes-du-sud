import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function BackLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 font-semibold text-heading transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-heading"
    >
      <ArrowLeft size={18} className="text-primary rtl:rotate-180" aria-hidden="true" />
      {children}
    </Link>
  );
}
