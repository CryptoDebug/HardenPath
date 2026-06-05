import { AlertTriangle, BookOpenText, CheckCircle2, Compass, Lightbulb, Target } from "lucide-react";
import type { Locale } from "@/lib/i18n-client";

type LessonSection = {
  title: string;
  body: string;
};

type LessonBriefingProps = {
  locale: Locale;
  sections: LessonSection[];
  title: string;
};

const toneConfig = {
  checkpoint: {
    badge: { fr: "Checkpoint", en: "Checkpoint" },
    className: "hp-learning-card-mint",
    icon: CheckCircle2
  },
  example: {
    badge: { fr: "Exemple guidé", en: "Guided example" },
    className: "hp-learning-card-amber",
    icon: Target
  },
  mistake: {
    badge: { fr: "Piège courant", en: "Common trap" },
    className: "hp-learning-card-coral",
    icon: AlertTriangle
  },
  words: {
    badge: { fr: "Mot par mot", en: "Word by word" },
    className: "hp-learning-card-mint",
    icon: BookOpenText
  },
  method: {
    badge: { fr: "Méthode", en: "Method" },
    className: "hp-learning-card-steel",
    icon: Compass
  }
};

function getTone(section: LessonSection) {
  const title = section.title.toLowerCase();

  if (title.includes("checkpoint")) return toneConfig.checkpoint;
  if (title.includes("exemple") || title.includes("example") || title.includes("mise en situation") || title.includes("scenario")) return toneConfig.example;
  if (title.includes("erreur") || title.includes("piege") || title.includes("piège") || title.includes("mistake") || title.includes("trap")) return toneConfig.mistake;
  if (title.includes("mot par mot") || title.includes("definition") || title.includes("vocabulaire") || title.includes("word")) return toneConfig.words;

  return toneConfig.method;
}

function chunkBody(body: string) {
  const sentences = body.split(/(?<=[.!?])\s+/).filter(Boolean);

  if (sentences.length < 4) {
    return [body];
  }

  const chunks: string[] = [];

  for (let index = 0; index < sentences.length; index += 2) {
    chunks.push(sentences.slice(index, index + 2).join(" "));
  }

  return chunks;
}

export function LessonBriefing({ locale, sections, title }: LessonBriefingProps) {
  const intro =
    locale === "fr"
      ? "Avance étape par étape : chaque carte transforme un mot technique en réflexe utile."
      : "Move step by step: each card turns a technical word into a useful reflex.";

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="hp-kicker">{locale === "fr" ? "Briefing progressif" : "Progressive briefing"}</span>
          <h2 className="hp-wrap mt-2 text-2xl font-black text-white">{title}</h2>
          <p className="hp-wrap mt-2 max-w-2xl text-sm leading-6 text-slate-300">{intro}</p>
        </div>
        <div className="hp-learning-meter" aria-label={locale === "fr" ? `${sections.length} étapes` : `${sections.length} steps`}>
          {sections.map((section, index) => (
            <span aria-hidden className="hp-learning-meter-dot" key={`${section.title}-${index}`} />
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {sections.map((section, index) => {
          const tone = getTone(section);
          const Icon = tone.icon;

          return (
            <div className="hp-learning-step" key={`${section.title}-${index}`}>
              <span className="hp-learning-node" aria-hidden>
                <Icon className="h-4 w-4" />
              </span>
              <article className={`hp-learning-card ${tone.className}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="hp-learning-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="hp-learning-badge">{tone.badge[locale]}</span>
                </div>
                <h3 className="hp-wrap mt-3 text-lg font-black text-white">{section.title}</h3>
                <div className="mt-3 space-y-3">
                  {chunkBody(section.body).map((paragraph, paragraphIndex) => (
                    <p className="hp-wrap text-sm leading-7 text-slate-300" key={`${section.title}-${paragraphIndex}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase text-mint">
                  <Lightbulb aria-hidden className="h-4 w-4" />
                  <span>{locale === "fr" ? "Réflexe acquis" : "Reflex gained"}</span>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
