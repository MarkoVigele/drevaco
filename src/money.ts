import type { Locale } from "./locales";

const NUMBER_LOCALE: Record<Locale, string> = {
  de: "de-AT",
  en: "en-IE",
  sk: "sk-SK",
};

export function formatEuro(cents: number, locale: Locale = "de"): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
