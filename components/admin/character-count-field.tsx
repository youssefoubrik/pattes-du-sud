"use client";

import { useState, type ChangeEvent } from "react";

type Props = {
  name: string;
  id?: string;
  dir?: "ltr" | "rtl";
  maxLength: number;
  defaultValue?: string;
  className: string;
  hint: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
} & (
  | { multiline?: false }
  | { multiline: true; rows: number }
);

export function CharacterCountField(props: Props) {
  const [length, setLength] = useState(props.defaultValue?.length ?? 0);
  const remaining = Math.max(props.maxLength - length, 0);
  const fieldProps = {
    name: props.name,
    id: props.id,
    dir: props.dir,
    maxLength: props.maxLength,
    defaultValue: props.defaultValue,
    className: props.className,
    required: props.required,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLength(event.currentTarget.value.length);
      props.onValueChange?.(event.currentTarget.value);
    },
  };

  return (
    <div className="mt-2">
      {props.multiline ? (
        <textarea {...fieldProps} rows={props.rows} />
      ) : (
        <input {...fieldProps} type="text" />
      )}
      <output className="mt-1 block text-sm font-normal text-muted-foreground">
        {remaining} {remaining === 1 ? "character" : "characters"} left. {props.hint}
      </output>
    </div>
  );
}
