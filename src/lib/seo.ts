import type { Metadata } from "next";
import { photo, PH } from "@/content/site";
import { href, type Lang } from "./i18n";

export const SITE = "https://novacom.bg";

// Canonical URL, hreflang alternates and Open Graph for one page.
export function seo(lang: Lang, path: string, title: string, description: string): Metadata {
  const url = href(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { bg: href("bg", path), en: href("en", path), "x-default": href("bg", path) },
    },
    openGraph: {
      type: "website",
      siteName: "Novacom",
      locale: lang === "bg" ? "bg_BG" : "en_GB",
      alternateLocale: lang === "bg" ? "en_GB" : "bg_BG",
      url,
      title,
      description,
      images: [{ url: photo(PH.heroRoof, 1200), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
