import { Award, Flame, Search, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getLocale } from "@/lib/i18n";
import { searchPublicLearners } from "@/lib/public-profile";

type ProfilesPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function ProfilesPage({ searchParams }: ProfilesPageProps) {
  const locale = await getLocale();
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";
  const results = await searchPublicLearners(query);

  const copy = {
    fr: {
      title: "Profils publics",
      body: "Recherche un pseudo HardenPath et consulte uniquement sa progression publique : modules validés, badges et jalons. Aucune donnée personnelle n'est affichée.",
      search: "Rechercher un pseudo",
      placeholder: "Pseudo public",
      submit: "Rechercher",
      privacy: "Email, image, sessions et infos personnelles restent invisibles.",
      empty: "Entre au moins 2 caractères pour lancer une recherche.",
      noResult: "Aucun profil public trouvé pour ce pseudo.",
      open: "Voir le profil",
      progress: "Progression",
      badges: "Badges",
      streak: "Streak"
    },
    en: {
      title: "Public profiles",
      body: "Search a HardenPath nickname and view only public progression: validated modules, badges, and milestones. No personal data is displayed.",
      search: "Search a nickname",
      placeholder: "Public nickname",
      submit: "Search",
      privacy: "Email, image, sessions, and personal info stay hidden.",
      empty: "Enter at least 2 characters to search.",
      noResult: "No public profile found for this nickname.",
      open: "View profile",
      progress: "Progress",
      badges: "Badges",
      streak: "Streak"
    }
  }[locale];

  return (
    <div className="hp-page-shell">
      <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="mint">{locale === "fr" ? "Annuaire apprenants" : "Learner directory"}</Badge>
              <span className="hp-brand-chip">
                <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-mint" />
                {locale === "fr" ? "Public seulement" : "Public only"}
              </span>
            </div>
            <h1 className="hp-wrap mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">{copy.title}</h1>
            <p className="hp-wrap mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{copy.body}</p>
          </div>

          <form action="/profiles" className="hp-panel rounded-sm p-4">
            <label className="hp-kicker" htmlFor="profile-search">
              {copy.search}
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
                <input
                  className="focus-ring min-h-11 w-full rounded-sm border border-white/10 bg-black/25 py-3 pl-10 pr-3 text-sm font-bold text-white placeholder:text-steel"
                  defaultValue={query}
                  id="profile-search"
                  maxLength={64}
                  name="q"
                  placeholder={copy.placeholder}
                  type="search"
                />
              </div>
              <button className="hp-button-primary" type="submit">
                <Search aria-hidden className="h-4 w-4" />
                {copy.submit}
              </button>
            </div>
            <p className="hp-wrap mt-3 text-xs leading-5 text-steel">{copy.privacy}</p>
          </form>
        </div>
      </section>

      <section className="mt-8">
        {query.length < 2 ? (
          <div className="hp-panel rounded-sm p-5 text-sm font-bold text-slate-300">{copy.empty}</div>
        ) : results.length === 0 ? (
          <div className="hp-panel rounded-sm p-5 text-sm font-bold text-slate-300">{copy.noResult}</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((profile) => (
              <article className="hp-panel hp-route-card rounded-sm p-5" key={profile.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="hp-checkpoint">
                        <UserRound aria-hidden className="h-5 w-5 text-mint" />
                      </span>
                      <h2 className="hp-wrap min-w-0 text-xl font-black text-white">{profile.name}</h2>
                    </div>
                    <p className="hp-wrap mt-3 text-sm leading-6 text-slate-300">
                      {profile.completedCourses}/{profile.totalCourses} {locale === "fr" ? "modules validés" : "validated modules"}
                    </p>
                  </div>
                  <Badge tone={profile.totalPercent > 0 ? "mint" : "amber"}>{profile.totalPercent}%</Badge>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-black uppercase text-steel">
                    <span>{copy.progress}</span>
                    <span>{profile.totalPercent}%</span>
                  </div>
                  <ProgressBar value={profile.totalPercent} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="hp-status-tile">
                    <Award aria-hidden className="h-4 w-4 text-amber" />
                    <p className="mt-2 text-lg font-black text-white">{profile.badgeCount}</p>
                    <p className="hp-wrap text-xs font-bold text-steel">{copy.badges}</p>
                  </div>
                  <div className="hp-status-tile">
                    <Flame aria-hidden className="h-4 w-4 text-coral" />
                    <p className="mt-2 text-lg font-black text-white">{profile.streakDays}</p>
                    <p className="hp-wrap text-xs font-bold text-steel">{copy.streak}</p>
                  </div>
                </div>

                <Link className="hp-button-secondary mt-5 w-full" href={`/profiles/${profile.id}`}>
                  <UserRound aria-hidden className="h-4 w-4" />
                  {copy.open}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
