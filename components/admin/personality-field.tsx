"use client";

import { Ban, EyeOff, Heart, Search, Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalMessages } from "@/messages/animals";

const options: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "none", label: "None", icon: Ban },
  { value: "gentle", label: "Gentle", icon: Heart },
  { value: "affectionate", label: "Affectionate", icon: Heart },
  { value: "playful", label: "Playful", icon: Sparkles },
  { value: "curious", label: "Curious", icon: Search },
  { value: "shy", label: "Shy", icon: EyeOff },
  { value: "calm", label: "Calm", icon: Heart },
  { value: "energetic", label: "Energetic", icon: Sparkles },
  { value: "independent", label: "Independent", icon: Search },
];

export function PersonalityField({
  locale,
  personality,
}: {
  locale: Locale;
  personality?: Animal["personality"];
}) {
  const [choice, setChoice] = useState(personality || "none");
  const selectedOption = options.find((option) => option.value === choice);
  const PreviewIcon = selectedOption?.icon ?? Heart;
  const preview =
    choice === "none"
      ? ""
      : animalMessages[locale].personality[
          choice as NonNullable<Animal["personality"]>
        ];

  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 font-semibold">Personality (optional)</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            className="animal-choice inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-heading/60"
          >
            <input
              type="radio"
              name="personalityChoice"
              value={value}
              checked={choice === value}
              onChange={() => setChoice(value)}
              className="sr-only"
            />
            <Icon size={17} className="text-heading" aria-hidden="true" />
            <span>{label}</span>
          </label>
        ))}
      </div>
      {preview && (
        <p
          aria-live="polite"
          className="mt-3 flex items-start gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm leading-relaxed text-foreground"
        >
          <PreviewIcon
            size={16}
            className="mt-0.5 shrink-0 text-heading"
            aria-hidden="true"
          />
          <span>{preview}</span>
        </p>
      )}
    </fieldset>
  );
}
