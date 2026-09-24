import type { MetadataRoute } from "next";
import { about, products, services, solutions } from "@/content/site";
import { href } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

export const dynamic = "force-static";

const paths = [
  "",
  ...solutions.map((s) => `solutions/${s.slug}`),
  "products",
  ...products.map((p) => `products/${p.slug}`),
  ...services.map((s) => `services/${s.slug}`),
  "projects",
  "know-how",
  "know-how/strela",
  ...about.map((a) => a.path),
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.flatMap((p) =>
    (["bg", "en"] as const).map((lang) => ({
      url: SITE + href(lang, p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p.startsWith("solutions") || p.startsWith("products") ? 0.8 : 0.6,
      alternates: { languages: { bg: SITE + href("bg", p), en: SITE + href("en", p) } },
    })),
  );
}
