export type Locale = "fr" | "en";

export function normalizeClientLocale(value?: string | null): Locale {
  return value?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function persistLocale(locale: Locale) {
  localStorage.setItem("hardenpath_locale", locale);
  document.cookie = `hardenpath_locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}
