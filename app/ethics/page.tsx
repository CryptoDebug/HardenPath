import { ShieldCheck } from "lucide-react";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function EthicsPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="hp-shell rounded-md p-6 sm:p-8">
        <div className="hp-inner">
        <ShieldCheck aria-hidden className="h-10 w-10 text-mint" />
        <h1 className="mt-5 text-4xl font-black text-white">{dictionary.ethics.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">{dictionary.ethics.body}</p>
        <div className="mt-7 grid gap-4">
          {dictionary.ethics.principles.map((principle: string) => (
            <div className="rounded-md border border-white/10 bg-ink/55 p-5 text-sm leading-7 text-slate-200" key={principle}>
              {principle}
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}
