import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { benefits, PH, REAL, solutions } from "@/content/site";
import { locales, type Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";
import MediaSlider from "@/components/MediaSlider";

type P = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => solutions.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  return s ? seo(lang as Lang, `solutions/${slug}`, s.title[lang as Lang], s.intro[lang as Lang]) : {};
}

export default async function SolutionPage({ params }: P) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const bg = lang === "bg";

  return (
    <>
      <PageHero lang={lang} eyebrow={bg ? "Решения" : "Solutions"} title={s.title[lang]} text={s.short[lang]} img={s.img} />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "От концепция до реализация" : "From concept to completion"}</Eyebrow>
            <H2>{bg ? "Цялостни решения за вашата фотоволтаична система" : "Complete solutions for your PV system"}</H2>
            <p className="mt-5 text-lg text-muted">{s.intro[lang]}</p>
            <ul className="mt-7 space-y-3 text-lg">
              {s.points.map((p) => (
                <Check key={p.en}>{p[lang]}</Check>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            {s.slug === "homes" ? (
              // Home projects: an auto-advancing mix of a short site video and real photos.
              <MediaSlider
                className="aspect-[4/3]"
                label={bg ? "Домашни проекти" : "Home projects"}
                slides={[
                  { type: "video", src: "/video/homes-install.mp4", poster: "/video/homes-install-poster.webp", alt: bg ? "Видео от монтаж на домашна ФЕЦ" : "Video from a home PV installation" },
                  { type: "image", src: REAL.homesRoofDrone, alt: bg ? "Домашна ФЕЦ на скатен покрив, изглед от дрон" : "Home PV on a pitched roof, drone view" },
                  { type: "image", src: REAL.homesFlatRoofInstall, alt: bg ? "Монтаж на плосък покрив на къща в планината" : "Installation on a flat roof of a mountain house" },
                  { type: "image", src: REAL.homesRoofShingles, alt: bg ? "Черни модули на покрив с битумни керемиди" : "All-black modules on a shingle roof" },
                  { type: "image", src: REAL.facadeBlack, alt: bg ? "Вертикален монтаж на фасада" : "Vertical facade mounting" },
                ]}
              />
            ) : (
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <Photo id={PH.engineerDraw} alt={bg ? "Инженер проектира соларна система" : "Engineer designing a solar system"} />
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <Photo id={PH.teamLaptops} alt={bg ? "Екип обсъжда проект" : "Team discussing a project"} />
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <Eyebrow>{bg ? "Консултация" : "Consulting"}</Eyebrow>
            <H2>{bg ? "Експертна консултация и управление на проекта" : "Expert advice and project management"}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Един отговорен екип води проекта от първия оглед до пускането. Получавате ясен график, прозрачна оферта и редовна информация за напредъка."
                : "One accountable team runs the project from the first survey to commissioning. You get a clear schedule, a transparent quote and regular progress updates."}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <H2 className="text-center">{bg ? "Вашите предимства" : "Your benefits"}</H2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title.en} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line p-7 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf-light text-2xl" aria-hidden>
                  {["€", "⚡", "🌿"][i]}
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{b.title[lang]}</h3>
                <p className="mt-2 text-muted">{b.text[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
