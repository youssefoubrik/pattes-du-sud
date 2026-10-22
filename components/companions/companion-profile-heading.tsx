import { Heart, PawPrint } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

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
        <ButtonLink
          href={adoptionHref}
          variant="secondary"
          arrow
          className="w-full max-w-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
        >
          {adoptLabel}
        </ButtonLink>
      )}
    </div>
  );
}
