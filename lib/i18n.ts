import "server-only";
import { cookies, headers } from "next/headers";

export type Locale = "fr" | "en";

const dictionaries = {
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default)
};

export function isFrenchLocale(value?: string | null) {
  return Boolean(value?.toLowerCase().split(",").some((item) => item.trim().startsWith("fr")));
}

export function normalizeLocale(value?: string | null): Locale {
  return isFrenchLocale(value) ? "fr" : "en";
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const stored = cookieStore.get("hardenpath_locale")?.value;

  if (stored === "fr" || stored === "en") {
    return stored;
  }

  return normalizeLocale(headerStore.get("accept-language"));
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
