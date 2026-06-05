import Link from "next/link";
import { Award, CheckCircle2, Flame, LockKeyhole, Route, ShieldCheck, Sparkles } from "lucide-react";
import { getServerSession } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { categories, getCoursesByCategory } from "@/content/catalog";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLocale } from "@/lib/i18n";

export default async function BadgesPage() {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);
  const unlockedBadges = session?.user?.id
    ? await prisma.userBadge.findMany({
        where: { userId: session.user.id },
        select: {
          badge: {
            select: {
              slug: true
            }
          }
        }
      })
    : [];
  const unlockedSlugs = new Set(unlockedBadges.map((item) => item.badge.slug));
  const starterBadges = categories.map((category) => ({
    category,
    moduleCount: getCoursesByCategory(category.slug).length,
    slug: `${category.slug}-starter`,
    unlocked: unlockedSlugs.has(`${category.slug}-starter`)
  }));
  const unlockedStarterCount = starterBadges.filter((badge) => badge.unlocked).length;
  const starterPercent = starterBadges.length > 0 ? Math.round((unlockedStarterCount / starterBadges.length) * 100) : 0;

  const copy = {
    fr: {
      title: "Badges HardenPath",
      body: "Les badges servent à matérialiser une compétence validée. Ils ne remplacent pas la pratique : ils signalent qu'un jalon clair a été terminé dans un parcours.",
      unlocked: "Badges débloqués",
      available: "Badges disponibles",
      howTitle: "Comment les obtenir",
      activeRule: "Règle active aujourd'hui",
      starterRule: "Termine au moins un module dans un parcours pour débloquer son badge Starter.",
      futureRule: "Rareté prévue : bois pour les badges Starter, bronze pour les examens débutant, argent pour intermédiaire, gold pour avancé, diamant pour tout valider.",
      signin: "Se connecter pour suivre mes badges",
      openPaths: "Voir les parcours",
      starter: "Badge Starter",
      requirement: "À faire",
      done: "Débloqué",
      locked: "À débloquer",
      module: "module validé dans ce parcours",
      modules: "modules disponibles"
    },
    en: {
      title: "HardenPath Badges",
      body: "Badges make validated skill visible. They do not replace practice: they show that a clear milestone has been completed inside a path.",
      unlocked: "Unlocked badges",
      available: "Available badges",
      howTitle: "How to earn them",
      activeRule: "Active rule today",
      starterRule: "Complete at least one module in a path to unlock its Starter badge.",
      futureRule: "Planned rarity: wood for Starter badges, bronze for beginner exams, silver for intermediate, gold for advanced, diamond for validating everything.",
      signin: "Sign in to track my badges",
      openPaths: "View paths",
      starter: "Starter badge",
      requirement: "Requirement",
      done: "Unlocked",
      locked: "Locked",
      module: "validated module in this path",
      modules: "available modules"
    }
  }[locale];

  return (
    <div className="hp-page-shell">
      <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="amber">Badges</Badge>
              <span className="hp-brand-chip">
                <Sparkles aria-hidden className="h-3.5 w-3.5 text-mint" />
                Progression
              </span>
            </div>
            <h1 className="hp-wrap mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">{copy.title}</h1>
            <p className="hp-wrap mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{copy.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="hp-button-primary" href="/#categories">
                <Route aria-hidden className="h-4 w-4" />
                {copy.openPaths}
              </Link>
              {!session ? (
                <Link className="hp-button-secondary" href="/account">
                  <LockKeyhole aria-hidden className="h-4 w-4" />
                  {copy.signin}
                </Link>
              ) : null}
            </div>
          </div>
          <div className="hp-ledger rounded-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="hp-kicker">{copy.unlocked}</p>
                <p className="mt-2 text-3xl font-black text-white">
                  {unlockedStarterCount}/{starterBadges.length}
                </p>
              </div>
              <span className="hp-checkpoint h-14 w-14">
                <Award aria-hidden className="h-7 w-7 text-wood" />
              </span>
            </div>
            <div className="mt-4">
              <ProgressBar value={starterPercent} label={copy.unlocked} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="hp-shell hp-path-card p-5">
          <div className="hp-inner">
            <p className="hp-kicker">{copy.howTitle}</p>
            <div className="mt-5 space-y-4">
              {[
                { icon: CheckCircle2, title: copy.activeRule, body: copy.starterRule, tone: "text-mint" },
                { icon: Flame, title: locale === "fr" ? "Progression future" : "Future progression", body: copy.futureRule, tone: "text-wood" },
                {
                  icon: ShieldCheck,
                  title: locale === "fr" ? "Important" : "Important",
                  body:
                    locale === "fr"
                      ? "Un badge est lié à une validation dans HardenPath, pas à une simple consultation de page."
                      : "A badge is tied to a HardenPath validation, not just viewing a page.",
                  tone: "text-steel"
                }
              ].map((item) => (
                <div className="hp-route-step" key={item.title}>
                  <span className="hp-checkpoint">
                    <item.icon aria-hidden className={`h-5 w-5 ${item.tone}`} />
                  </span>
                  <div className="hp-panel rounded-sm p-4">
                    <h2 className="hp-wrap text-base font-black text-white">{item.title}</h2>
                    <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {starterBadges.map(({ category, moduleCount, slug, unlocked }) => (
            <div className="hp-panel hp-route-card rounded-sm p-5" key={slug}>
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Badge tone={unlocked ? "mint" : "amber"}>{unlocked ? copy.done : copy.locked}</Badge>
                    <h2 className="hp-wrap mt-4 text-xl font-black leading-7 text-white">{category.title[locale]}</h2>
                    <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">{copy.starter}</p>
                  </div>
                  <span className="hp-checkpoint">
                    {unlocked ? <CheckCircle2 aria-hidden className="h-5 w-5 text-mint" /> : <Award aria-hidden className="h-5 w-5 text-wood" />}
                  </span>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="hp-kicker">{copy.requirement}</p>
                  <p className="hp-wrap mt-2 text-sm font-black text-paper">1 {copy.module}</p>
                  <p className="hp-wrap mt-1 text-xs text-steel">
                    {moduleCount} {copy.modules}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
