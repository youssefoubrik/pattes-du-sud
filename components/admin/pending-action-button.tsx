"use client";

import { useFormStatus } from "react-dom";
import { ActionButton } from "@/components/ui/action-button";
import type { ComponentProps, ReactNode } from "react";

export function PendingActionButton({
  children,
  pendingLabel,
  ...props
}: ComponentProps<typeof ActionButton> & {
  children: ReactNode;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <ActionButton
      {...props}
      type="submit"
      disabled={pending || props.disabled}
      aria-busy={pending}
    >
      {pending ? pendingLabel : children}
    </ActionButton>
  );
}
