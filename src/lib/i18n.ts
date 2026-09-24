export const locales = ["bg", "en"] as const;
export type Lang = (typeof locales)[number];
export type L = { bg: string; en: string };

export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);

export const LANG_KEY = "novacom-lang";

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && isLang(saved)) return saved;
  } catch {}
  const nav = typeof navigator !== "undefined" ? navigator.languages?.[0] || navigator.language : "";
  return nav?.toLowerCase().startsWith("bg") ? "bg" : "en";
}

export const href = (lang: Lang, path = "") => `/${lang}/${path ? path.replace(/^\/|\/$/g, "") + "/" : ""}`;
