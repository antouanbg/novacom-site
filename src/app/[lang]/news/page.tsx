import type { Metadata } from "next";
import Link from "next/link";
import { news, REAL, contact } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { CTA, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "news", bg ? "Новини" : "News", bg ? "Новини от Novacom: проекти, продукти, разработки и събития." : "News from Novacom: projects, products, developments and events.");
}

export function fmtDate(iso: string, lang: Lang) {
  return new Date(iso + "T00:00:00").toLocaleDateString(lang === "bg" ? "bg-BG" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function NewsPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  const [first, ...rest] = news;
  return (
    <>
      <PageHero lang={lang} eyebrow={bg ? "Новини" : "News"} title={bg ? "Какво ново в Novacom" : "What's new at Novacom"} img={REAL.pernikSky} />
      <Section>
        <Reveal>
          <article className="grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
            <div className="aspect-[16/10] lg:aspect-auto">
              <Photo id={first.img} alt={first.title[lang]} priority />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <time className="text-sm font-bold text-brand" dateTime={first.date}>{fmtDate(first.date, lang)}</time>
              <h2 className="hyphens-auto [overflow-wrap:normal] mt-2 text-[clamp(1.25rem,5.4vw,1.875rem)] font-extrabold leading-tight">{first.title[lang]}</h2>
              <p className="mt-4 text-lg text-muted">{first.text[lang]}</p>
              {first.more && (
                <p className="mt-3 text-lg text-muted">
                  {first.more[lang].split("LinkedIn").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <a href={contact.linkedin} target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">LinkedIn</a>
                      )}
                    </span>
                  ))}
                </p>
              )}
              {first.to && (
                <Link href={href(lang, first.to)} className="mt-6 font-bold text-brand hover:underline">
                  {bg ? "Виж повече →" : "Read more →"}
                </Link>
              )}
            </div>
          </article>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <Photo id={n.img} alt={n.title[lang]} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-sm font-bold text-brand" dateTime={n.date}>{fmtDate(n.date, lang)}</time>
                  <h3 className="mt-1 text-lg font-extrabold">{n.title[lang]}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{n.text[lang]}</p>
                  {n.to && (
                    <Link href={href(lang, n.to)} className="mt-4 text-sm font-bold text-brand hover:underline">
                      {bg ? "Виж повече →" : "Read more →"}
                    </Link>
                  )}
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
