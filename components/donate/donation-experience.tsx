"use client";

import { useState, type ReactNode } from "react";
import { Soup, Stethoscope, Syringe } from "lucide-react";
import { DonationCheckout } from "@/components/donate/donation-checkout";
import type { DonateMessages } from "@/messages/types";

type Copy = Pick<
  DonateMessages,
  | "title"
  | "intro"
  | "impactExamplesTitle"
  | "impactExamples"
  | "onceDescription"
  | "monthlyDescription"
  | "once"
  | "monthly"
  | "monthlyBadge"
  | "onceCta"
  | "monthlyCta"
  | "frequency"
  | "securePayment"
  | "amount"
>;

type Props = {
  copy: Copy;
  onceUrl: string | null;
  monthlyUrl: string | null;
  bankTransfer?: ReactNode;
  unavailable?: ReactNode;
};

const impactIcons = [Soup, Syringe, Stethoscope];

export function DonationExperience({
  copy,
  onceUrl,
  monthlyUrl,
  bankTransfer,
  unavailable,
}: Props) {
  const [frequency, setFrequency] = useState<"once" | "monthly">(
    onceUrl ? "once" : monthlyUrl ? "monthly" : "once",
  );
  const monthly = frequency === "monthly";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-heading lg:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">
          {copy.intro}
        </p>
        <section className="mt-7">
          <h2 className="text-lg font-semibold text-heading">
            {copy.impactExamplesTitle}
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {copy.impactExamples.map(({ amount, impact }, index) => {
              const Icon = impactIcons[index] ?? Stethoscope;
              return (
                <li
                  key={`${amount}-${impact}`}
                  className="rounded-xl border border-border bg-surface p-3.5 sm:p-4"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-xl font-bold text-foreground" dir="ltr">
                    {amount}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {impact}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="grid gap-6">
        {(onceUrl || monthlyUrl) && (
          <DonationCheckout
            onceUrl={onceUrl}
            monthlyUrl={monthlyUrl}
            frequency={frequency}
            onFrequencyChange={setFrequency}
            onceLabel={copy.once}
            monthlyLabel={copy.monthly}
            monthlyBadge={copy.monthlyBadge}
            frequencyLabel={copy.frequency}
            securePaymentLabel={copy.securePayment}
            amountNote={copy.amount}
            description={monthly ? copy.monthlyDescription : copy.onceDescription}
            donateLabel={monthly ? copy.monthlyCta : copy.onceCta}
          />
        )}
        {unavailable}
        {bankTransfer}
      </div>
    </div>
  );
}
