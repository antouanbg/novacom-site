import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { locales, type Lang } from "@/lib/i18n";
import { CTA, Eyebrow, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title[lang as Lang], description: s.short[lang as Lang] } : {};
}

export default async function ServicePage({ params }: P) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const bg = lang === "bg";

  return (
    <>
      <PageHero lang={lang} eyebrow={bg ? "Услуги" : "Services"} title={s.title[lang]} text={s.short[lang]} img={s.img} />
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Как работим" : "How we work"}</Eyebrow>
            <H2>{s.title[lang]}</H2>
            <p className="mt-5 text-lg text-muted">{s.intro[lang]}</p>
            <ol className="mt-8 space-y-4">
              {s.steps.map((st, i) => (
                <li key={st.en} className="flex items-center gap-4 rounded-2xl bg-mist p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-extrabold text-white">{i + 1}</span>
                  <span className="text-lg font-semibold">{st[lang]}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
              <Photo id={s.img} alt={s.title[lang]} />
            </div>
          </Reveal>
        </div>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
