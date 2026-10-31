"use client";

import { useState, type ReactNode } from "react";
import { DonationCheckout } from "@/components/donate/donation-checkout";
import type { DonateMessages } from "@/messages/types";
import styles from "./donation-experience.module.css";

type Copy = Pick<
  DonateMessages,
  | "title"
  | "intro"
  | "mirleftSupport"
  | "onceImpactTitle"
  | "onceImpacts"
  | "monthlyImpactTitle"
  | "monthlyImpacts"
  | "once"
  | "monthly"
  | "monthlyBadge"
  | "onceCta"
  | "monthlyCta"
  | "accountability"
  | "paypalHandoffBefore"
  | "paypalHandoffAfter"
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
  const impactTitle = monthly
    ? copy.monthlyImpactTitle
    : copy.onceImpactTitle;
  const impacts = monthly ? copy.monthlyImpacts : copy.onceImpacts;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-heading lg:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">
          {copy.intro}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-heading">
          {copy.mirleftSupport}
        </p>
        <section className="mt-7" aria-live="polite">
          <h2 className="text-lg font-semibold text-heading">{impactTitle}</h2>
          <ul
            key={frequency}
            className={`mt-3 min-h-24 list-disc space-y-2 ps-6 text-lg leading-relaxed text-foreground marker:text-primary sm:min-h-28 lg:min-h-0 ${styles.stateContent}`}
          >
            {impacts.map((impact) => (
              <li key={impact}>{impact}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className="font-bold text-primary">*</span>{" "}
            {copy.accountability}
          </p>
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
            donateLabel={monthly ? copy.monthlyCta : copy.onceCta}
            paypalHandoffBefore={copy.paypalHandoffBefore}
            paypalHandoffAfter={copy.paypalHandoffAfter}
          />
        )}
        {unavailable}
        {bankTransfer}
      </div>
    </div>
  );
}
