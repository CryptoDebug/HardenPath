import { ShieldCheck } from "lucide-react";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function EthicsPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="hp-shell rounded-md p-6 sm:p-8">
        <div className="hp-inner">
          <span className="grid h-12 w-12 place-items-center rounded-md border border-mint/25 bg-mint/[0.1] text-mint">
            <ShieldCheck aria-hidden className="h-7 w-7" />
          </span>
          <h1 className="hp-wrap mt-5 text-4xl font-extrabold leading-tight text-white">{dictionary.ethics.title}</h1>
          <p className="hp-wrap mt-4 text-base leading-7 text-slate-300">{dictionary.ethics.body}</p>
          <div className="mt-7 grid gap-4">
            {dictionary.ethics.principles.map((principle: string, index: number) => (
              <div className="rounded-md border border-white/10 bg-white/[0.055] p-5 text-sm leading-7 text-slate-200" key={principle}>
                <div className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint/[0.12] text-xs font-extrabold text-mint">
                    {index + 1}
                  </span>
                  <p className="hp-wrap min-w-0">{principle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
