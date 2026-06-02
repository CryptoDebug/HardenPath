import Link from "next/link";
import type { Level } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

const levels: Array<Level | "all"> = ["all", "beginner", "intermediate", "advanced"];

const labels: Record<Level | "all", Record<Locale, string>> = {
  all: { fr: "Tous", en: "All" },
  beginner: { fr: "Débutant", en: "Beginner" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
  advanced: { fr: "Avancé", en: "Advanced" }
};

type LevelFilterProps = {
  locale: Locale;
  active: Level | "all";
  basePath: string;
};

export function LevelFilter({ locale, active, basePath }: LevelFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {levels.map((level) => (
        <Link
          className={`focus-ring rounded-md border px-3 py-2 text-sm font-semibold transition ${
            active === level
              ? "border-mint/50 bg-mint/15 text-mint"
              : "border-white/12 bg-white/7 text-slate-200 hover:border-white/25 hover:bg-white/10"
          }`}
          href={level === "all" ? basePath : `${basePath}?level=${level}`}
          key={level}
        >
          {labels[level][locale]}
        </Link>
      ))}
    </div>
  );
}
