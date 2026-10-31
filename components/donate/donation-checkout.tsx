"use client";

import { useState } from "react";
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
  suggestedAmountsTitle: string;
  suggestedAmounts: string[];
  customAmountLabel: string;
  paypalHandoffBefore: string;
  paypalHandoffAfter: string;
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
  suggestedAmountsTitle,
  suggestedAmounts,
  customAmountLabel,
  paypalHandoffBefore,
  paypalHandoffAfter,
  amountNote,
  donateLabel,
  frequency,
  onFrequencyChange,
}: Props) {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const canChooseFrequency = Boolean(onceUrl && monthlyUrl);
  const selectedFrequency = frequency;
  const selectedUrl = selectedFrequency === "monthly" ? monthlyUrl : onceUrl;
  return (
    <section
      aria-label={frequencyLabel}
      className="mx-auto w-full max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
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
              <Heart size={16} fill="currentColor" aria-hidden="true" />
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

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-heading">
          {suggestedAmountsTitle}
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {suggestedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              aria-pressed={selectedAmount === amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
              className="min-h-11 cursor-pointer rounded-xl border border-border bg-secondary/70 px-3 text-sm font-semibold text-heading transition-colors hover:bg-secondary/90 aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {amount}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-medium text-foreground">
          {customAmountLabel}
          <span className="mt-1.5 flex min-h-11 items-center rounded-xl border border-border bg-surface px-3 focus-within:border-heading focus-within:outline-2 focus-within:outline-heading">
            <span aria-hidden="true" className="text-muted-foreground">€</span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={customAmount}
              onChange={(event) => {
                setCustomAmount(event.target.value);
                setSelectedAmount(null);
              }}
              className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-foreground outline-none"
            />
          </span>
        </label>
      </fieldset>

      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        {amountNote}
      </p>
      {selectedUrl && (
        <>
          <ButtonLink
            className="mt-5 w-full"
            href={selectedUrl}
            variant="donate"
          >
            {donateLabel}
          </ButtonLink>
          <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            {paypalHandoffBefore}{" "}
            <a
              href="https://www.paypal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#003087] transition-colors hover:text-[#0070e0] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003087]"
            >
              PayPal
            </a>{" "}
            {paypalHandoffAfter}
          </p>
        </>
      )}
    </section>
  );
}
