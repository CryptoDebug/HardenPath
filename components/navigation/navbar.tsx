import Link from "next/link";
import { BookMarked, ShieldCheck, UserCircle } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111418]/[0.92] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <Link className="focus-ring inline-flex min-w-0 items-center gap-3 rounded-md" href="/">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.06] text-mint">
            <ShieldCheck aria-hidden className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-black tracking-normal text-white">HardenPath</span>
            <span className="hidden text-xs font-semibold text-steel sm:block">{locale === "fr" ? "Espace d'apprentissage" : "Learning workspace"}</span>
          </span>
        </Link>

        <div className="hidden items-center rounded-md border border-white/10 bg-white/[0.055] p-1 md:flex">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-[4px] px-3 py-2 text-sm font-bold text-slate-200 hover:bg-white/[0.08]" href="/#categories">
            <BookMarked aria-hidden className="h-4 w-4 text-steel" />
            {dictionary.categories}
          </Link>
          <Link className="focus-ring rounded-[4px] px-3 py-2 text-sm font-bold text-slate-200 hover:bg-white/[0.08]" href="/ethics">
            {dictionary.ethics}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitch label={dictionary.switchLabel} locale={locale} />
          <Link
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm font-extrabold text-white transition hover:border-amber/40 hover:bg-amber/10"
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
