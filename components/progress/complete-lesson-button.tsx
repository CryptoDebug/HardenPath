"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

type CompleteLessonButtonProps = {
  label: string;
};

export function CompleteLessonButton({ label }: CompleteLessonButtonProps) {
  const [done, setDone] = useState(false);

  return (
    <button
      className="focus-ring inline-flex items-center gap-2 rounded-md bg-mint px-4 py-3 text-sm font-bold text-ink transition hover:bg-teal-200 disabled:cursor-default disabled:bg-mint/70"
      disabled={done}
      onClick={() => setDone(true)}
      type="button"
    >
      <CheckCircle2 aria-hidden className="h-4 w-4" />
      {done ? "Completed" : label}
    </button>
  );
}
