import type { Metadata } from "next";
import { PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { CTA, Eyebrow, Fill, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "bg" ? "Нашата визия" : "Our vision" };
}

export default async function VisionPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  const reasons = bg
    ? ["По-ниски и предвидими разходи за енергия", "Защита от поскъпване на тока", "Резерв при прекъсване чрез батерии", "По-добър ESG профил за бизнеса"]
    : ["Lower, predictable energy costs", "Protection from rising power prices", "Backup during outages with batteries", "A stronger ESG profile for business"];

  return (
    <>
      <PageHero lang={lang} eyebrow={bg ? "Нашата визия" : "Our vision"} title={bg ? "Устойчива и достъпна енергия за по-добро бъдеще" : "Sustainable, affordable energy for a better future"} img={PH.wind} />
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Защо ФЕЦ" : "Why solar"}</Eyebrow>
            <H2>{bg ? "Защо фотоволтаичната система си заслужава" : "Why a PV system pays off"}</H2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r} className="rounded-2xl bg-mist p-5 font-semibold">{r}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <Photo id={PH.fieldSky} alt={bg ? "Соларен парк" : "Solar park"} />
            </div>
          </Reveal>
        </div>
      </Section>
      <Section className="bg-mist">
        <Reveal>
          <Eyebrow>{bg ? "Ръководство" : "Leadership"}</Eyebrow>
          <H2>{bg ? "Основатели и ръководство" : "Founders & leadership"}</H2>
          <p className="mt-5 text-lg text-muted">
            <Fill lang={lang}>{bg ? "имена, роли и реални снимки на ръководството" : "names, roles and real photos of the leadership"}</Fill>
          </p>
        </Reveal>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
