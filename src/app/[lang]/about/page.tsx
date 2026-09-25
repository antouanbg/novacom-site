import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { PH, REAL } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "about", bg ? "Кои сме ние" : "Who we are", bg ? "Novacom: ФЕЦ и батерийни системи за бизнеса. Основател гл. ас. д-р инж. Антуан Ангелов, преподавател в ТУ-София и търговски представител на HY Solar Group (Suntech)." : "Novacom: solar PV and battery storage for business. Founded by Chief Assist. Prof. Dr. Eng. Antouan Anguelov, lecturer at TU Sofia and sales representative of HY Solar Group (Suntech).");
}

export default async function AboutPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const gallery = [
    { id: REAL.roofVitosha, alt: bg ? "Покривна ФЕЦ в София, обект на Novacom" : "Rooftop PV in Sofia, a Novacom site", cls: "sm:col-span-2 sm:row-span-2" },
    { id: PH.engineerLab, alt: bg ? "Млада инженерка тества оборудване" : "Young engineer testing equipment", cls: "" },
    { id: PH.teamLaptops, alt: bg ? "Млад екип работи по проект" : "Young team working on a project", cls: "" },
    { id: PH.engineerDraw, alt: bg ? "Инженер работи по технически чертеж" : "Engineer working on a technical drawing", cls: "" },
    { id: REAL.breakers, alt: bg ? "Табло на ФЕЦ, обект на Novacom" : "PV switchboard, a Novacom site", cls: "" },
  ];

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "За нас" : "About us"}
        title={bg ? "Енергетика, изградена върху 30 години опит в технологиите" : "Energy built on 30 years of technology experience"}
        img={PH.teamLaptops}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Кои сме ние" : "Who we are"}</Eyebrow>
            <H2>{bg ? "Novacom Corp." : "Novacom Corp."}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Novacom съчетава над 30 години опит в информационните и комуникационните технологии с проектиране и изграждане на фотоволтаични централи и системи за съхранение на енергия. Работим с бизнеса, земеделието, общностите и домакинствата."
                : "Novacom combines 30+ years in information and communications technology with the design and construction of solar PV plants and energy storage systems. We work with businesses, agriculture, communities and homes."}
            </p>
            <ul className="mt-7 space-y-3 text-lg">
              <Check>{bg ? "Над 50 завършени интеграционни проекта" : "50+ completed integration projects"}</Check>
              <Check>{bg ? "Безплатна консултация и оглед" : "Free consultation and site survey"}</Check>
              <Check>{bg ? "Безплатен мониторинг и поддръжка 24/365" : "Free 24/365 monitoring and support"}</Check>
              <Check>{bg ? "Собствени разработки: тракер „Стрела“ и EMS за индустрията" : "Own developments: the Strela tracker and an industrial EMS"}</Check>
            </ul>
            <div className="mt-8 rounded-2xl border-l-4 border-brand bg-sky p-5">
              <p className="font-extrabold">{bg ? "гл. ас. д-р инж. Антуан Ангелов, основател" : "Chief Assist. Prof. Dr. Eng. Antouan Anguelov, founder"}</p>
              <p className="mt-2 text-muted">
                {bg
                  ? "Главен асистент, доктор инженер, в Технически университет – София, където води дисциплината „Интелигентни мрежи и системи за ВЕИ“. Търговски представител на китайската корпорация HY Solar Group, притежател на марката Suntech."
                  : "Chief Assistant Professor (PhD, Eng.) at the Technical University of Sofia, where he teaches Smart Grids and Systems for Renewables. Sales representative of the Chinese corporation HY Solar Group, owner of the Suntech brand."}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-3">
              {gallery.map((g) => (
                <div key={g.id} className={`overflow-hidden rounded-2xl ${g.cls}`}>
                  <Photo id={g.id} alt={g.alt} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-8">
              <Eyebrow>{bg ? "Партньорства и членства" : "Partnerships & memberships"}</Eyebrow>
              <h3 className="text-2xl font-extrabold">{bg ? "С кого работим" : "Who we work with"}</h3>
              <ul className="mt-5 space-y-4">
                <li>
                  <a href="https://www.suntech-power.com/" target="_blank" rel="noopener" className="text-lg font-extrabold text-brand hover:underline">
                    Suntech ↗
                  </a>
                  <p className="text-muted">
                    {bg
                      ? "Панели и батерийни системи за бизнеса. Собственикът на Novacom е търговски представител на HY Solar Group, притежател на марката."
                      : "PV modules and battery systems for business. Novacom's owner is a sales representative of HY Solar Group, owner of the brand."}
                  </p>
                </li>
                <li>
                  <span className="text-lg font-extrabold">{bg ? "Технически университет – София" : "Technical University of Sofia"}</span>
                  <p className="text-muted">
                    {bg
                      ? "Академична връзка чрез нашия основател, преподавател по дисциплината „Интелигентни мрежи и системи за ВЕИ“."
                      : "An academic link through our founder, who teaches Smart Grids and Systems for Renewables."}
                  </p>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl bg-white p-8">
              <Eyebrow>{bg ? "Нашата отговорност" : "Our responsibility"}</Eyebrow>
              <h3 className="text-2xl font-extrabold">{bg ? "Качество и безопасност" : "Quality and safety"}</h3>
              <p className="mt-4 text-muted">
                {bg
                  ? "Работим с проверено оборудване, спазваме нормите за безопасност и носим отговорност за всяка централа след пускането ѝ."
                  : "We use proven equipment, follow safety standards and stay accountable for every plant after commissioning."}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
