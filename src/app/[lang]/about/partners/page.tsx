import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, H2, PageHero, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "about/partners", bg ? "Партньори и производители" : "Partners & manufacturers", bg ? "Novacom е търговски представител на Suntech за Балканите и Европа: панели и батерийни системи за бизнеса." : "Novacom is the Suntech sales representative for the Balkans and Europe: PV modules and battery systems for business.");
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
            ? "Novacom е търговски представител на Suntech за Балканите и Европа."
            : "Novacom is the Suntech sales representative for the Balkans and Europe."
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
                  ? "Един от най-големите световни производители на фотоволтаични модули. Като търговски представител за Балканите и Европа доставяме директно панели и батерийни системи Suntech за бизнес и индустриални проекти."
                  : "One of the world's largest PV module manufacturers. As sales representative for the Balkans and Europe, we supply Suntech panels and battery systems directly for commercial and industrial projects."}
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
      <Section className="bg-mist">
        <Reveal>
          <Eyebrow>{bg ? "Академичен партньор" : "Academic partner"}</Eyebrow>
          <H2>{bg ? "Технически университет – София" : "Technical University of Sofia"}</H2>
          <p className="mt-5 max-w-3xl text-lg text-muted">
            {bg
              ? "Нашият основател преподава в ТУ-София, където води собствена специалност по възобновяеми енергийни източници."
              : "Our founder lectures at the Technical University of Sofia, where he runs his own renewable energy programme."}
          </p>
        </Reveal>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
