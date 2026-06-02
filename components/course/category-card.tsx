import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Category } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

type CategoryCardProps = {
  category: Category;
  locale: Locale;
  moduleCount: number;
  progress?: number;
  cta: string;
  index?: number;
  locked?: boolean;
};

export function CategoryCard({ category, locale, moduleCount, progress, cta, index = 0, locked = false }: CategoryCardProps) {
  return (
    <Link
      className="focus-ring hp-panel group relative overflow-hidden rounded-md p-5 transition duration-200 hover:-translate-y-0.5 hover:border-steel/35 hover:bg-white/7"
      href={`/categories/${category.slug}`}
    >
      <div className="absolute right-4 top-4 text-5xl font-black leading-none text-white/[0.03]">0{index + 1}</div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone={category.color}>{moduleCount} modules</Badge>
          <h3 className="mt-4 text-xl font-black text-white">{category.title[locale]}</h3>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-ink/70">
          <Layers3 aria-hidden className="h-4 w-4 text-steel" />
        </span>
      </div>
      <p className="mt-3 min-h-14 text-sm leading-6 text-slate-300">{category.description[locale]}</p>
      {typeof progress === "number" ? (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>{locale === "fr" ? "Maîtrise du parcours" : "Path mastery"}</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} label={`${category.title[locale]} progress`} />
        </div>
      ) : null}
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-black uppercase tracking-[0.16em] text-steel">
        <span>{locked ? (locale === "fr" ? "Accès apprenant" : "Learner access") : cta}</span>
        <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-mint" />
      </div>
    </Link>
  );
}
