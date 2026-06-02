import Link from "next/link";
import { ShieldCheck, UserCircle } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <Link className="focus-ring inline-flex items-center gap-3 rounded-md" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint/14 text-mint ring-1 ring-mint/35">
            <ShieldCheck aria-hidden className="h-6 w-6" />
          </span>
          <span className="text-lg font-bold tracking-normal text-white">HardenPath</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/8" href="/#categories">
            {dictionary.categories}
          </Link>
          <Link className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/8" href="/ethics">
            {dictionary.ethics}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitch label={dictionary.switchLabel} locale={locale} />
          <Link
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-white/12 bg-white/8 px-3 text-sm font-semibold text-white transition hover:border-amber/50 hover:bg-amber/10"
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
