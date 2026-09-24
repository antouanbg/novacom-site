import type { Metadata } from "next";
import Link from "next/link";
import { PH, projectTypes, services } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { CTA, Eyebrow, H2, MonitoringPromo, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return seo(
    lang,
    "projects",
    lang === "bg" ? "Проекти" : "Projects",
    lang === "bg"
      ? "Батерийни системи Suntech за бизнеса, покривни и наземни ФЕЦ, земеделски обекти и хибридни системи за дома."
      : "Suntech battery storage for business, rooftop and ground-mounted PV, agricultural sites and hybrid home systems.",
  );
}

export default async function ProjectsPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "Проекти" : "Projects"}
        title={bg ? "Какво изграждаме" : "What we build"}
        text={
          bg
            ? "От домашни хибридни системи до индустриални централи и батерийни системи Suntech за бизнеса."
            : "From hybrid home systems to industrial plants and Suntech battery storage for business."
        }
        img={PH.fieldClouds}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((t, i) => (
            <Reveal key={t.path} delay={(i % 3) * 0.06}>
              <Link href={href(lang, t.path)} className="group block h-full overflow-hidden rounded-2xl border border-line transition hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo id={t.img} alt={t.title[lang]} className="transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-extrabold">{t.title[lang]}</h2>
                  <p className="mt-2 text-muted">{t.text[lang]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="bg-mist">
        <Reveal>
          <Eyebrow>{bg ? "Как работим" : "How we work"}</Eyebrow>
          <H2>{bg ? "Всеки проект минава през четири етапа" : "Every project goes through four stages"}</H2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link href={href(lang, `services/${s.slug}`)} className="block h-full rounded-2xl bg-white p-6 transition hover:shadow-lg">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-4 text-lg font-extrabold">{s.title[lang]}</h3>
                <p className="mt-2 text-muted">{s.short[lang]}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <MonitoringPromo lang={lang} />
      <CTA lang={lang} />
    </>
  );
}
