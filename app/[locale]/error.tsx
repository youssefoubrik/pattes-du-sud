"use client";

import { ActionButton } from "@/components/ui/action-button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-xl flex-1 px-6 py-20 text-center"
    >
      <h1 className="text-4xl text-heading">Something went wrong</h1>
      <p className="mt-4">
        Please try again. If the problem continues, contact the association.
      </p>
      <ActionButton variant="secondary" onClick={reset} className="mt-6 px-6">
        Try again
      </ActionButton>
    </main>
  );
}
