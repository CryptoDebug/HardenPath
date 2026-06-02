import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Category } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

type CategoryCardProps = {
  category: Category;
  locale: Locale;
  moduleCount: number;
  progress: number;
  cta: string;
};

export function CategoryCard({ category, locale, moduleCount, progress, cta }: CategoryCardProps) {
  return (
    <Link
      className="focus-ring group rounded-lg border border-white/10 bg-white/7 p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-mint/40 hover:bg-white/10"
      href={`/categories/${category.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone={category.color}>{moduleCount} modules</Badge>
          <h3 className="mt-4 text-xl font-semibold text-white">{category.title[locale]}</h3>
        </div>
        <ArrowRight aria-hidden className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-mint" />
      </div>
      <p className="mt-3 min-h-14 text-sm leading-6 text-slate-300">{category.description[locale]}</p>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>{cta}</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar value={progress} label={`${category.title[locale]} progress`} />
      </div>
    </Link>
  );
}
