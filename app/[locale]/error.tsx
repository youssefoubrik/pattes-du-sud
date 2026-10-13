"use client";

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
      <button
        type="button"
        onClick={reset}
        className="mt-6 min-h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground"
      >
        Try again
      </button>
    </main>
  );
}
