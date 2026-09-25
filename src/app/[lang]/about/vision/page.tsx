import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { CTA, Eyebrow, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "about/vision", bg ? "Нашата визия" : "Our vision", bg ? "Устойчива и достъпна енергия: защо фотоволтаичната система с батерия си заслужава." : "Sustainable, affordable energy: why a PV system with battery storage pays off.");
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
          <div className="mt-8 max-w-3xl rounded-3xl bg-white p-7 sm:p-9">
            <h3 className="text-2xl font-extrabold">{bg ? "Кой стои зад Novacom" : "Who is behind Novacom"}</h3>
            <p className="mt-1 font-bold text-brand">{bg ? "Инженери, преподаватели, практици" : "Engineers, lecturers, practitioners"}</p>
            <p className="mt-4 text-lg text-muted">
              {bg
                ? "Екипът на Novacom има над 20 години опит в ИТ, телекомуникациите и възобновяемата енергия и преподавателска дейност в Технически университет – София по интелигентни мрежи и системи за ВЕИ. Зад компанията стоят публикации в IEEE Xplore и четири регистрирани полезни модела, сред които тракерът „Стрела“ и V2G система за съхранение. През 2020 г. създадохме концепцията „Обединен енергиен клъстер“ за енергийни общности."
                : "The Novacom team brings 20+ years in IT, telecommunications and renewable energy, and teaches smart grids and renewable energy systems at the Technical University of Sofia. Behind the company stand IEEE Xplore publications and four registered utility models, including the Strela tracker and a V2G storage system. In 2020 we created the United Energy Cluster concept for energy communities."}
            </p>
          </div>
        </Reveal>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
