import { ShieldCheck } from "lucide-react";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function EthicsPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-white/10 bg-white/8 p-6 shadow-soft sm:p-8">
        <ShieldCheck aria-hidden className="h-10 w-10 text-mint" />
        <h1 className="mt-5 text-4xl font-bold text-white">{dictionary.ethics.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">{dictionary.ethics.body}</p>
        <div className="mt-7 grid gap-4">
          {dictionary.ethics.principles.map((principle: string) => (
            <div className="rounded-lg border border-white/10 bg-ink/45 p-5 text-sm leading-7 text-slate-200" key={principle}>
              {principle}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
