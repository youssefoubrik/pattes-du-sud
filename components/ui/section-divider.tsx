import { PawPrint } from "lucide-react";

type Props = { direction: "enter" | "leave"; paws?: boolean };

export function SectionDivider({ direction, paws = false }: Props) {
  if (direction === "enter") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-full -mb-px h-8 w-full fill-secondary sm:h-12 lg:h-16"
      >
        <path d="M0 40C240 72 400 8 680 24S1120 72 1440 24V64H0Z" />
      </svg>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-8 sm:h-12">
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-full w-full fill-secondary">
        <path d="M0 0H1440V14C1180 48 1010 8 740 22S270 48 0 18Z" />
      </svg>
      {paws && (
        <>
          <PawPrint size={26} fill="currentColor" className="absolute end-[12%] top-2 -rotate-12 text-heading/30 rtl:rotate-12" />
          <PawPrint size={22} fill="currentColor" className="absolute end-[8%] top-4 rotate-12 text-heading/30 rtl:-rotate-12" />
        </>
      )}
    </div>
  );
}
