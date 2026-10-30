"use client";

import { Heart, LockKeyhole } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

type Props = {
  onceUrl: string | null;
  monthlyUrl: string | null;
  onceLabel: string;
  monthlyLabel: string;
  monthlyBadge: string;
  frequencyLabel: string;
  securePaymentLabel: string;
  amountNote: string;
  donateLabel: string;
  frequency: "once" | "monthly";
  onFrequencyChange: (frequency: "once" | "monthly") => void;
};

export function DonationCheckout({
  onceUrl,
  monthlyUrl,
  onceLabel,
  monthlyLabel,
  monthlyBadge,
  frequencyLabel,
  securePaymentLabel,
  amountNote,
  donateLabel,
  frequency,
  onFrequencyChange,
}: Props) {
  const canChooseFrequency = Boolean(onceUrl && monthlyUrl);
  const selectedFrequency = frequency;
  const selectedUrl = selectedFrequency === "monthly" ? monthlyUrl : onceUrl;
  return (
    <section
      aria-label={frequencyLabel}
      className="w-full max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <p className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
        <LockKeyhole size={16} className="text-primary" aria-hidden="true" />
        {securePaymentLabel}
      </p>

      {canChooseFrequency ? (
        <fieldset className="mt-5">
          <legend className="sr-only">{frequencyLabel}</legend>
          <div className="grid grid-cols-2 rounded-xl border border-border bg-secondary p-1">
            <button
              type="button"
              aria-pressed={selectedFrequency === "once"}
              onClick={() => onFrequencyChange("once")}
              className={`min-h-11 cursor-pointer rounded-lg px-3 text-sm font-semibold transition-colors duration-200 ${
                selectedFrequency === "once"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground"
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
            >
              {onceLabel}
            </button>
            <button
              type="button"
              aria-pressed={selectedFrequency === "monthly"}
              onClick={() => onFrequencyChange("monthly")}
              className={`inline-flex min-h-11 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg px-2 text-sm font-semibold leading-tight transition-colors duration-200 sm:flex-row sm:gap-2 sm:px-3 ${
                selectedFrequency === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground"
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
            >
              <Heart size={16} aria-hidden="true" />
              <span>{monthlyLabel}</span>
              <span
                className={`text-[10px] font-medium ${
                  selectedFrequency === "monthly"
                    ? "text-primary-foreground/90"
                    : "text-muted-foreground"
                }`}
              >
                {monthlyBadge}
              </span>
            </button>
          </div>
        </fieldset>
      ) : (
        <h2 className="mt-5 text-center text-xl font-semibold text-heading">
          {selectedFrequency === "monthly" ? monthlyLabel : onceLabel}
        </h2>
      )}

      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        {amountNote}
      </p>
      {selectedUrl && (
        <ButtonLink
          className="mt-5 w-full"
          href={selectedUrl}
          variant="donate"
        >
          {donateLabel}
        </ButtonLink>
      )}
    </section>
  );
}
