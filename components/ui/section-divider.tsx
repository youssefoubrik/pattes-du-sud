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
        className="pointer-events-none absolute inset-x-0 bottom-full -mb-px h-6 w-full fill-secondary sm:h-8 lg:h-10"
      >
        <path d="M0 38C240 60 400 18 680 30S1120 56 1440 22V64H0Z" />
      </svg>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 sm:h-8 lg:h-10">
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-full w-full fill-secondary">
        <path d="M0 0H1440V12C1180 36 1010 12 740 24S270 38 0 18Z" />
      </svg>
      {paws && (
        <>
          <PawPrint size={26} fill="currentColor" className="absolute end-[25%] top-2 -rotate-12 text-heading/30 sm:end-[12%] rtl:rotate-12" />
          <PawPrint size={22} fill="currentColor" className="absolute end-[8%] top-4 rotate-12 text-heading/30 rtl:-rotate-12" />
        </>
      )}
    </div>
  );
}
