import Link from "next/link";
import { ArrowRight, Heart, PawPrint } from "lucide-react";

type Props = {
  name: string;
  species: string;
  status: string;
  adoptionHref?: string;
  adoptLabel: string;
};

export function CompanionProfileHeading({
  name,
  species,
  status,
  adoptionHref,
  adoptLabel,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
      <div className="min-w-0">
        <h1 className="text-5xl text-heading">{name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="inline-flex items-center gap-2 text-base font-semibold text-accent">
            <PawPrint size={18} aria-hidden="true" />
            {species}
          </p>
          <p className="inline-flex items-center gap-2 text-base font-semibold text-primary-hover">
            <Heart size={17} aria-hidden="true" />
            {status}
          </p>
        </div>
      </div>
      {adoptionHref && (
        <Link
          href={adoptionHref}
          className="flex min-h-12 w-full max-w-md items-center justify-between gap-4 rounded-full border border-border bg-secondary px-5 py-2 text-heading transition-colors duration-150 hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
        >
          <span className="font-bold text-heading">{adoptLabel}</span>
          <ArrowRight size={18} className="shrink-0 rtl:rotate-180" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
