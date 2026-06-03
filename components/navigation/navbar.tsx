import Link from "next/link";
import { Compass, ShieldCheck, UserCircle } from "lucide-react";
import { LanguageSwitch } from "@/components/navigation/language-switch";
import type { Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
  dictionary: {
    categories: string;
    ethics: string;
    account: string;
    switchLabel: string;
  };
};

export function Navbar({ locale, dictionary }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c1014]/[0.9] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <Link className="focus-ring inline-flex min-w-0 items-center gap-3 rounded-sm" href="/">
          <span aria-hidden className="hp-brand-mark h-11 w-11 shrink-0 rounded-sm border border-white/10 bg-white/[0.06]" />
          <span className="min-w-0">
            <span className="block text-lg font-black text-white">HardenPath</span>
            <span className="hidden text-xs font-bold text-steel sm:block">{locale === "fr" ? "Route de hardening" : "Hardening route"}</span>
          </span>
        </Link>

        <div className="hidden items-center rounded-sm border border-white/10 bg-white/[0.055] p-1 md:flex">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-[3px] px-3 py-2 text-sm font-black text-slate-200 hover:bg-white/[0.08]" href="/#categories">
            <Compass aria-hidden className="h-4 w-4 text-mint" />
            {dictionary.categories}
          </Link>
          <Link className="focus-ring inline-flex items-center gap-2 rounded-[3px] px-3 py-2 text-sm font-black text-slate-200 hover:bg-white/[0.08]" href="/ethics">
            <ShieldCheck aria-hidden className="h-4 w-4 text-amber" />
            {dictionary.ethics}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitch label={dictionary.switchLabel} locale={locale} />
          <Link
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-sm border border-white/10 bg-white/[0.06] px-3 text-sm font-black text-white transition hover:border-amber/40 hover:bg-amber/10"
            href="/account"
          >
            <UserCircle aria-hidden className="h-4 w-4" />
            <span className="hidden sm:inline">{dictionary.account}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
