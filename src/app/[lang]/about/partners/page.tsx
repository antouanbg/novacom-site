import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { partners, PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, H2, PageHero, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "about/partners", bg ? "Партньори и производители" : "Partners & manufacturers", bg ? "Производители, с които работи Novacom: Suntech (HY Solar Group), инвертори, конструкции и зарядни станции." : "Manufacturers Novacom works with: Suntech (HY Solar Group), inverters, mounting and EV chargers.");
}

export default async function PartnersPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "За нас" : "About"}
        title={bg ? "Партньори и производители" : "Partners & manufacturers"}
        text={
          bg
            ? "Доставяме и монтираме панели и батерийни системи Suntech. Д-р инж. Антуан Ангелов, собственик на Novacom, е търговски представител на китайската корпорация HY Solar Group, притежател на марката Suntech."
            : "We supply and install Suntech PV modules and battery systems. Dr. Eng. Antouan Anguelov, owner of Novacom, is a sales representative of the Chinese corporation HY Solar Group, owner of the Suntech brand."
        }
        img={PH.panelsClose}
      />
      <Section>
        <Reveal>
          <div className="grid gap-8 rounded-3xl bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Основен партньор" : "Key partner"}</p>
              <h2 className="text-4xl font-extrabold sm:text-5xl">Suntech</h2>
              <p className="mt-5 text-lg text-white/80">
                {bg
                  ? "Един от най-големите световни производители на фотоволтаични модули, част от китайската корпорация HY Solar Group. Д-р инж. Антуан Ангелов, собственик на Novacom, е търговски представител на китайската корпорация HY Solar Group, притежател на марката Suntech. Това ни дава пряк достъп до панели и батерийни системи Suntech за бизнес и индустриални проекти."
                  : "One of the world's largest PV module manufacturers, part of the Chinese corporation HY Solar Group. Dr. Eng. Antouan Anguelov, owner of Novacom, is a sales representative of the Chinese corporation HY Solar Group, owner of the Suntech brand. This gives us direct access to Suntech modules and battery systems for commercial and industrial projects."}
              </p>
              <a
                href="https://www.suntech-power.com/"
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-ink transition hover:bg-sky"
              >
                suntech-power.com ↗
              </a>
            </div>
            <ul className="space-y-3 text-lg">
              <Check>{bg ? "Фотоволтаични панели Suntech" : "Suntech PV modules"}</Check>
              <Check>{bg ? "Батерийни системи Suntech за бизнеса (C&I)" : "Suntech C&I battery storage"}</Check>
              <Check>{bg ? "Директна доставка от производителя" : "Direct supply from the manufacturer"}</Check>
            </ul>
          </div>
        </Reveal>
      </Section>
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Reveal>
          <H2>{bg ? "Производители, с които работим" : "Manufacturers we work with"}</H2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((pt, i) => (
            <Reveal key={pt.name} delay={i * 0.06}>
              <div className={`h-full rounded-2xl border p-6 ${i === 0 ? "border-brand bg-sky" : "border-line"}`}>
                <p className="text-2xl font-extrabold">{pt.name}</p>
                <p className="mt-2 text-muted">{pt.what[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="bg-mist">
        <Reveal>
          <Eyebrow>{bg ? "Академичен партньор" : "Academic partner"}</Eyebrow>
          <H2>{bg ? "Технически университет – София" : "Technical University of Sofia"}</H2>
          <p className="mt-5 max-w-3xl text-lg text-muted">
            {bg
              ? "Нашият основател е доктор инженер и преподавател в ТУ-София, където води дисциплината „Интелигентни мрежи и системи за ВЕИ“."
              : "Our founder is a doctor of engineering and lecturer at the Technical University of Sofia, where he teaches Smart Grids and Systems for Renewables."}
          </p>
        </Reveal>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
