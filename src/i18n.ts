import { MESSAGES, LOCALES, type Locale, type Messages, type ProductCopy } from "./locales";
import type { ProductId } from "./catalog";

export type { Locale, Messages, ProductCopy };
export { LOCALES, MESSAGES };

export const LANG_STORAGE_KEY = "drevaco.lang.v1";

let locale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Stored choice wins. Otherwise primary browser language: sk* → SK, en* → EN, else DE. */
export function detectLocale(stored: string | null | undefined, languages: readonly string[] = []): Locale {
  if (stored && isLocale(stored)) return stored;
  const primary = (languages[0] ?? "").toLowerCase();
  if (primary.startsWith("sk")) return "sk";
  if (primary.startsWith("en")) return "en";
  return "de";
}

export function getLocale(): Locale {
  return locale;
}

export function copy(): Messages {
  return MESSAGES[locale];
}

export function productCopy(id: ProductId): ProductCopy {
  return copy().products[id];
}

export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
    const value = vars[name];
    return value === undefined ? whole : String(value);
  });
}

function persist(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LANG_STORAGE_KEY, locale);
}

export function applyDocumentLocale(messages: Messages = copy()): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.title = messages.meta.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", messages.meta.description);
}

export function setLocale(next: Locale): void {
  locale = next;
  persist();
  applyDocumentLocale();
}

export function initLocale(
  stored: string | null | undefined =
    typeof localStorage !== "undefined" ? localStorage.getItem(LANG_STORAGE_KEY) : null,
  languages: readonly string[] =
    typeof navigator !== "undefined"
      ? [navigator.languages?.[0] || navigator.language].filter((value): value is string => Boolean(value))
      : [],
): Locale {
  locale = detectLocale(stored, languages);
  persist();
  applyDocumentLocale();
  return locale;
}
