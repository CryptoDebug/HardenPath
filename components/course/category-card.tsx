import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
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
  const isComplete = typeof progress === "number" && progress >= 100;

  return (
    <Link
      className="focus-ring hp-panel group flex min-h-[260px] flex-col rounded-md p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
      href={`/categories/${category.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone={category.color}>{moduleCount} modules</Badge>
            {isComplete ? <Badge tone="mint">{locale === "fr" ? "Terminé" : "Complete"}</Badge> : null}
          </div>
          <h3 className="hp-wrap mt-4 text-xl font-extrabold leading-7 text-white">{category.title[locale]}</h3>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.06]">
          {isComplete ? <CheckCircle2 aria-hidden className="h-5 w-5 text-mint" /> : <Layers3 aria-hidden className="h-5 w-5 text-steel" />}
        </span>
      </div>
      <p className="hp-wrap mt-3 flex-1 text-sm leading-6 text-slate-300">{category.description[locale]}</p>
      {typeof progress === "number" ? (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-300">
            <span className="hp-wrap">{locale === "fr" ? "Maîtrise du parcours" : "Path mastery"}</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} label={`${category.title[locale]} progress`} />
        </div>
      ) : null}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm font-bold text-paper">
        <span className="hp-wrap">{locked ? (locale === "fr" ? "Accès apprenant" : "Learner access") : cta}</span>
        <span className="inline-flex shrink-0 items-center gap-2 text-xs text-steel">
          0{index + 1}
          <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-mint" />
        </span>
      </div>
    </Link>
  );
}
