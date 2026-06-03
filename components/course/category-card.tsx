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
      className="focus-ring hp-panel hp-route-card group flex min-h-[270px] flex-col rounded-sm p-5 transition duration-200 hover:-translate-y-0.5 hover:border-mint/30 hover:bg-white/[0.07]"
      href={`/categories/${category.slug}`}
    >
      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="hp-stamp">
            <span className="text-mint">S{String(index + 1).padStart(2, "0")}</span>
            {moduleCount} modules
          </span>
          <ArrowRight aria-hidden className="h-4 w-4 text-steel transition group-hover:translate-x-1 group-hover:text-mint" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {isComplete ? (
              <div className="flex flex-wrap gap-2">
                <Badge tone="mint">{locale === "fr" ? "Terminé" : "Complete"}</Badge>
              </div>
            ) : null}
            <h3 className="hp-wrap mt-4 text-xl font-black leading-7 text-white">{category.title[locale]}</h3>
          </div>
          <span className="hp-checkpoint">
            {isComplete ? <CheckCircle2 aria-hidden className="h-5 w-5 text-mint" /> : <Layers3 aria-hidden className="h-5 w-5 text-steel" />}
          </span>
        </div>

        <p className="hp-wrap mt-3 flex-1 text-sm leading-6 text-slate-300">{category.description[locale]}</p>

        {typeof progress === "number" ? (
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-300">
              <span className="hp-wrap">{locale === "fr" ? "Maîtrise du parcours" : "Path mastery"}</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} label={`${category.title[locale]} progress`} />
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm font-black text-paper">
          <span className="hp-wrap">{locked ? (locale === "fr" ? "Accès apprenant" : "Learner access") : cta}</span>
          <span aria-hidden className="h-2 w-10 shrink-0 rounded-full bg-[linear-gradient(90deg,#67d8bd,#c8a45f)]" />
        </div>
      </div>
    </Link>
  );
}
