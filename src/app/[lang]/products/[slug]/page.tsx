import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/content/site";
import { locales, type Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, Fill, H2, PageHero, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: p.title[lang as Lang], description: p.short[lang as Lang] } : {};
}

export default async function ProductPage({ params }: P) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const bg = lang === "bg";

  return (
    <>
      <PageHero lang={lang} eyebrow={bg ? "Продукти" : "Products"} title={p.title[lang]} text={p.short[lang]} img={p.img} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Описание" : "Overview"}</Eyebrow>
            <H2>{p.title[lang]}</H2>
            <p className="mt-5 text-lg text-muted">{p.intro[lang]}</p>
            <ul className="mt-7 space-y-3 text-lg">
              {p.features.map((f) => (
                <Check key={f.en}>{f[lang]}</Check>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-mist p-7">
              <h3 className="text-lg font-extrabold">{bg ? "Марки и модели" : "Brands and models"}</h3>
              <p className="mt-3 text-muted">
                <Fill lang={lang}>{bg ? "марки, модели, основни параметри, PDF datasheet" : "brands, models, key specs, PDF datasheet"}</Fill>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
