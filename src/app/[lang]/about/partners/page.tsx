import type { Metadata } from "next";
import { PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { CTA, Fill, H2, PageHero, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "bg" ? "Партньори и производители" : "Partners & manufacturers" };
}

export default async function PartnersPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  const groups = bg ? ["Панели", "Инвертори", "Батерии (BESS)", "Конструкции"] : ["Panels", "Inverters", "Batteries (BESS)", "Mounting"];
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "За нас" : "About"}
        title={bg ? "Партньори и производители" : "Partners & manufacturers"}
        text={bg ? "Работим със световноизвестни производители, доказали качество и надеждност." : "We work with world-class manufacturers with a proven record of quality and reliability."}
        img={PH.panelsClose}
      />
      <Section>
        <Reveal>
          <H2>{bg ? "Производители, с които работим" : "Manufacturers we work with"}</H2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <Reveal key={g} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line p-6">
                <h3 className="text-lg font-extrabold">{g}</h3>
                <div className="mt-4 grid h-20 place-items-center rounded-xl bg-mist p-3 text-center">
                  <Fill lang={lang}>{bg ? "лога" : "logos"}</Fill>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
