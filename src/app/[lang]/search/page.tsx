import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { Eyebrow, Section } from "@/components/ui";
import { type Lang } from "@/lib/i18n";
import { buildIndex } from "@/lib/searchIndex";
import { seo } from "@/lib/seo";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return {
    ...seo(lang, "search", bg ? "Търсене в сайта" : "Site search", bg ? "Търсене в продукти, решения, услуги, проекти, новини и ноу-хау на Novacom." : "Search Novacom's products, solutions, services, projects, news and know-how."),
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  const docs = buildIndex(lang);
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{bg ? "Търсене" : "Search"}</Eyebrow>
        <h1 className="mt-2 break-words text-[2rem] font-extrabold leading-[1.12] [overflow-wrap:anywhere] sm:text-4xl">{bg ? "Какво търсите?" : "What are you looking for?"}</h1>
        <p className="mt-3 text-muted">
          {bg
            ? "Търси в продукти, решения, услуги, проекти, новини и ноу-хау. Резултатите се показват веднага, докато пишете."
            : "Searches products, solutions, services, projects, news and know-how. Results appear as you type."}
        </p>
        <div className="mt-8">
          <Suspense>
            <SearchClient lang={lang} docs={docs} />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
