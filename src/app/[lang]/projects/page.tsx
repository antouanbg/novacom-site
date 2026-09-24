import type { Metadata } from "next";
import { PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { CTA, Eyebrow, Fill, H2, PageHero, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "bg" ? "Проекти" : "Projects" };
}

export default async function ProjectsPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  const filters = bg ? ["Всички", "Бизнес (C&I)", "Земеделие", "Общности", "Домакинства"] : ["All", "Business (C&I)", "Agriculture", "Communities", "Homes"];

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "Проекти" : "Projects"}
        title={bg ? "Убедете се сами в качеството на нашата работа" : "See the quality of our work for yourself"}
        img={PH.fieldClouds}
      />
      <Section>
        <Reveal>
          <Eyebrow>{bg ? "Реализирани обекти" : "Completed sites"}</Eyebrow>
          <H2>{bg ? "Нашите проекти" : "Our projects"}</H2>
          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <span key={f} className={`rounded-full px-4 py-2 text-sm font-bold ${i === 0 ? "bg-ink text-white" : "bg-mist text-muted"}`}>
                {f}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Reveal key={n} delay={(n % 3) * 0.06}>
              <article className="overflow-hidden rounded-2xl border border-line">
                <div className="grid aspect-[4/3] place-items-center bg-mist p-4 text-center">
                  <Fill lang={lang}>{bg ? "реална снимка на обекта" : "real site photo"}</Fill>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold">
                    {bg ? "Система за бизнес клиент с мощност" : "Business client system,"} <Fill lang={lang}>kWp</Fill>
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    <Fill lang={lang}>{bg ? "батерия kWh, град, година" : "battery kWh, city, year"}</Fill>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
