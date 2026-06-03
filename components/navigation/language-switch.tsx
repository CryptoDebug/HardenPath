"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { normalizeClientLocale, persistLocale, type Locale } from "@/lib/i18n-client";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitch({ locale, label }: LanguageSwitchProps) {
  const router = useRouter();
  const nextLocale = locale === "fr" ? "en" : "fr";

  useEffect(() => {
    const stored = localStorage.getItem("hardenpath_locale");
    if (!stored) {
      const detected = normalizeClientLocale(navigator.language);
      persistLocale(detected);
      if (detected !== locale) {
        router.refresh();
      }
    }
  }, [locale, router]);

  return (
    <button
      aria-label={label}
      className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm font-extrabold text-paper transition hover:border-mint/40 hover:bg-mint/10"
      onClick={() => {
        persistLocale(nextLocale);
        router.refresh();
      }}
      type="button"
    >
      <Languages aria-hidden className="h-4 w-4" />
      {nextLocale.toUpperCase()}
    </button>
  );
}
