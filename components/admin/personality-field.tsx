"use client";

import { Ban, EyeOff, Heart, Search, Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalMessages } from "@/messages/animals";
import { ANIMAL_PERSONALITY_MAX_LENGTH } from "@/lib/animal-limits";
import { CharacterCountField } from "@/components/admin/character-count-field";

const options: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "none", label: "None", icon: Ban },
  { value: "gentle", label: "Gentle", icon: Heart },
  { value: "playful", label: "Playful", icon: Sparkles },
  { value: "curious", label: "Curious", icon: Search },
  { value: "shy", label: "Shy", icon: EyeOff },
  { value: "custom", label: "Custom", icon: Heart },
];

export function PersonalityField({
  locale,
  personality,
  customText,
}: {
  locale: Locale;
  personality?: Animal["personality"];
  customText?: string;
}) {
  const initialChoice = customText ? "custom" : personality || "none";
  const [choice, setChoice] = useState(initialChoice);
  const [customValue, setCustomValue] = useState(customText || "");
  const preview = choice === "custom" ? customValue : choice === "none" ? "" : animalMessages[locale].personality[choice as NonNullable<Animal["personality"]>];

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
      <div className={choice === "custom" ? "mt-3" : "hidden"}>
          <label className="font-semibold" htmlFor="personality-custom">
            Custom card text
          </label>
          <CharacterCountField
            name="personalityCustom"
            id="personality-custom"
            maxLength={ANIMAL_PERSONALITY_MAX_LENGTH}
            defaultValue={customText}
            onValueChange={setCustomValue}
            hint="Shown as entered on companion cards in every language."
            className="min-h-11 w-full rounded-xl border border-border px-3 font-normal focus-visible:outline-none focus-visible:border-heading"
          />
      </div>
      {preview && (
        <p aria-live="polite" className="mt-3 flex items-start gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm leading-relaxed text-foreground">
          <Heart size={16} className="mt-0.5 shrink-0 fill-current text-heading" aria-hidden="true" />
          <span>{preview}</span>
        </p>
      )}
    </fieldset>
  );
}
