"use client";

import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function SaveNotice({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("saved");
    window.history.replaceState(window.history.state, "", url.toString());

    const timeout = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <p role="status" className="mt-4 inline-flex items-center gap-2 font-semibold text-heading">
      <CircleCheck size={20} className="text-success" aria-hidden="true" />
      {message}
    </p>
  );
}
