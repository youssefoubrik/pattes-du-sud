import { PawPrint } from "lucide-react";

type Props = {
  greeting: string;
  message: string;
};

export function AnimalGreeting({ greeting, message }: Props) {
  return (
  <figcaption className="absolute inset-x-4 bottom-4 w-fit max-w-[calc(100%-2rem)] rounded-2xl rounded-se-none border border-border bg-background px-4 py-3 pe-12 shadow-sm sm:start-6 sm:bottom-6 sm:px-5 sm:pe-14">
    <span
      aria-hidden="true"
      className="absolute -top-2 -end-2 size-4 bg-background [clip-path:polygon(0_50%,100%_0,50%_100%)] rtl:-scale-x-100"
    />
    <p className="font-semibold text-heading">
      {greeting}
    </p>
    <p className="mt-1 text-sm text-foreground">{message}</p>
    <PawPrint
      size={22}
      fill="currentColor"
      strokeWidth={1.5}
      className="absolute end-3 bottom-3 -rotate-12 text-primary-hover/70 rtl:rotate-12"
      aria-hidden="true"
    />
  </figcaption>
  );
}
