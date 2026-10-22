import { ShareButton } from "@/components/animals/share-button";
import { ButtonLink } from "@/components/ui/button-link";

type Props = {
  donateHref: string;
  donateLabel: string;
  shareLabel: string;
  shareFallback: string;
  title: string;
};

export function CompanionProfileActions({
  donateHref,
  donateLabel,
  shareLabel,
  shareFallback,
  title,
}: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <ButtonLink href={donateHref} variant="donate">
        {donateLabel}
      </ButtonLink>
      <ShareButton title={title} label={shareLabel} copied={shareFallback} />
    </div>
  );
}
