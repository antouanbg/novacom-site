import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { suntechProducts } from "@/content/suntech";
import { REAL } from "@/content/site";
import type { L } from "@/lib/i18n";
import { href, locales, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { Button, CTA, Eyebrow, H2, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string; model: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => suntechProducts.map((p) => ({ lang, model: p.slug })));
}

const t = (v: L | string, lang: Lang) => (typeof v === "string" ? v : v[lang]);

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: l, model } = await params;
  const lang = l as Lang;
  const p = suntechProducts.find((x) => x.slug === model);
  if (!p) return {};
  return seo(lang, `products/suntech/${p.slug}`, p.title[lang], p.tagline[lang]);
}

export default async function SuntechProductPage({ params }: P) {
  const { lang: l, model } = await params;
  const lang = l as Lang;
  const bg = lang === "bg";
  const p = suntechProducts.find((x) => x.slug === model);
  if (!p) notFound();
  const siblings = suntechProducts.filter((x) => x.slug !== p.slug);

  return (
    <>
      {/* Hero: product render on white, key figures */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href={href(lang, "products")} className="hover:text-ink">{bg ? "Продукти" : "Products"}</Link>
              {" / "}
              <Link href={href(lang, `products/${p.parent.slug}`)} className="hover:text-ink">{p.parent.label[lang]}</Link>
              {" / Suntech"}
            </nav>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-brand">Suntech · {p.family}</p>
            <h1 className="mt-2 text-[clamp(1.4rem,6.5vw,3.25rem)] font-extrabold leading-[1.1] [overflow-wrap:normal] [hyphens:manual]">{p.title[lang]}</h1>
            <p className="mt-3 text-lg font-semibold text-ink/80">{p.model}</p>
            <p className="mt-4 max-w-2xl text-lg text-muted">{p.tagline[lang]}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {p.highlights.map((h) => (
                <div key={h.n + h.t.en} className="rounded-2xl border border-line bg-white p-4">
                  <p className="text-[clamp(1.1rem,4.5vw,1.6rem)] font-extrabold text-ink">{h.n}</p>
                  <p className="mt-1 text-[clamp(11px,3vw,13px)] leading-snug text-muted [overflow-wrap:normal]">{h.t[lang]}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={href(lang, "contact") + "#quote"}>{bg ? "Поискай оферта" : "Request a quote"}</Button>
              <a href={p.datasheet.file} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl border-2 border-ink px-5 py-3 font-bold text-ink transition hover:bg-ink hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
                {bg ? "Технически лист (PDF)" : "Datasheet (PDF)"}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.title[lang]} className={`mx-auto max-h-[420px] w-full ${p.imageContain ? "object-contain" : "object-cover"}`} />
              {p.badges && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t border-line pt-5">
                  {p.badges.map((b) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={b.src} src={b.src} alt={b.alt} className="h-12 w-auto object-contain sm:h-14" />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Summary */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Защо този продукт" : "Why this product"}</Eyebrow>
            <H2>{bg ? "Накратко" : "In short"}</H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted">{p.summary[lang]}</p>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Доставяме, монтираме и пускаме в експлоатация; всяка система получава безплатен мониторинг 24/365 и, при батерия Suntech 261 kWh или по-голяма, EMS GrideX без лицензни такси."
                : "We supply, install and commission; every system gets free 24/365 monitoring and, with a Suntech battery of 261 kWh or more, the GrideX EMS with no licence fees."}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Electrical table (modules) */}
      {p.table && (
        <Section className="bg-mist">
          <Reveal>
            <Eyebrow>{bg ? "Данни" : "Data"}</Eyebrow>
            <H2>{p.table.title[lang]}</H2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <div className="overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full min-w-[560px] text-left text-sm sm:text-base">
                <thead className="bg-sky text-xs font-bold uppercase tracking-wide text-muted">
                  <tr>
                    {p.table.head.map((h, i) => (
                      <th key={i} className="px-4 py-3">{t(h, lang)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {p.table.rows.map((r, i) => (
                    <tr key={i} className={i === p.table!.rows.length - 1 ? "bg-leaf-light/60 font-bold" : ""}>
                      {r.map((c, j) => (
                        <td key={j} className="px-4 py-3 tabular-nums">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {p.table.note && <p className="mt-3 text-sm text-muted">{p.table.note[lang]}</p>}
          </Reveal>
        </Section>
      )}

      {/* Spec groups */}
      <Section className={p.table ? "" : "bg-mist"}>
        <Reveal>
          <Eyebrow>{bg ? "Спецификация" : "Specification"}</Eyebrow>
          <H2>{bg ? "Технически данни" : "Technical data"}</H2>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {p.groups.map((g, gi) => (
            <Reveal key={g.title.en} delay={gi * 0.05}>
              <div className="rounded-2xl border border-line bg-white">
                <p className="border-b border-line px-5 py-3 text-sm font-bold uppercase tracking-wide text-muted">{g.title[lang]}</p>
                <dl className="divide-y divide-line">
                  {g.rows.map(([k, v], i) => (
                    <div key={i} className="grid gap-1 px-5 py-3 sm:grid-cols-[minmax(150px,42%)_1fr]">
                      <dt className="text-sm text-muted">{t(k, lang)}</dt>
                      <dd className="font-semibold [overflow-wrap:normal]">{t(v, lang)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          {bg ? "Източник: официален технически лист на Suntech " : "Source: official Suntech datasheet "}
          <a href={p.datasheet.file} target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">{p.datasheet.label}</a>
          {bg ? ". Стойностите подлежат на промяна от производителя." : ". Values are subject to change by the manufacturer."}
        </p>
      </Section>

      {/* Open-source EMS: every Suntech battery system comes with GrideX for free */}
      {p.parent.slug === "storage" && (
        <Section className="bg-ink text-white">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Включено безплатно" : "Included for free"}</p>
              <H2 className="text-white">{bg ? "EMS GrideX: отворената ни система за управление, безплатна с всяка батерия Suntech" : "GrideX EMS: our open-source energy management system, free with every Suntech battery"}</H2>
              <p className="mt-5 text-lg text-white/80">
                {bg
                  ? "Всеки клиент, който закупи батерийна система Suntech от нас, получава допълнително и напълно безплатно EMS GrideX Energy OS – собствената ни система за управление на енергията с отворен код (MIT лиценз, без лицензни такси). Тя управлява батерията по цените ден напред на БНЕБ, реже пиковете, прогнозира производството по времето и пази батерията в безопасния ѝ режим."
                  : "Every client who buys a Suntech battery system from us receives, in addition and completely free, the GrideX Energy OS EMS – our own open-source energy management system (MIT licence, no licence fees). It schedules the battery against IBEX day-ahead prices, shaves peaks, forecasts production from the weather and keeps the battery inside its safety envelope."}
              </p>
              <ul className="mt-5 space-y-2 text-white/90">
                {(bg
                  ? ["Управлява неограничен брой външни устройства: инвертори, батерии, зарядни станции, товари (Modbus TCP/RTU, RS485, CAN, MQTT)", "Работи с Suntech, Deye, Sungrow, Huawei, Growatt, Fronius и други", "Мониторинг 24/365 и SMS известия през gridex.tech – безплатно", "Локален edge gateway: решенията се вземат на обекта, дори без интернет"]
                  : ["Controls an unlimited number of external devices: inverters, batteries, EV chargers, loads (Modbus TCP/RTU, RS485, CAN, MQTT)", "Works with Suntech, Deye, Sungrow, Huawei, Growatt, Fronius and more", "24/365 monitoring and SMS alerts via gridex.tech – free", "Local edge gateway: decisions are made on site, even without internet"]
                ).map((t) => (
                  <li key={t} className="flex gap-2"><span className="text-[#b5d86a]" aria-hidden>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="https://gridex.tech/" target="_blank" rel="noopener" className="inline-flex rounded-xl bg-white px-5 py-3 font-bold text-ink hover:bg-sky">{bg ? "Демо: gridex.tech ↗" : "Demo: gridex.tech ↗"}</a>
                <Link href={href(lang, "products/monitoring")} className="inline-flex rounded-xl border-2 border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10">{bg ? "Повече за EMS GrideX" : "More about GrideX EMS"}</Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl ring-1 ring-white/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={REAL.emsOverview} alt={bg ? "GrideX Energy OS: енергиен поток в реално време" : "GrideX Energy OS: real-time energy flow"} className="w-full" loading="lazy" />
              </div>
              <p className="mt-2 text-xs text-white/60">{bg ? "Екран от демото gridex.tech" : "Screen from the gridex.tech demo"}</p>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Other Suntech products */}
      <Section className={p.table ? "bg-mist" : ""}>
        <Reveal>
          <Eyebrow>Suntech</Eyebrow>
          <H2>{bg ? "Други продукти Suntech" : "Other Suntech products"}</H2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {siblings.map((s) => (
            <Link key={s.slug} href={href(lang, `products/suntech/${s.slug}`)} className="group rounded-2xl border border-line bg-white p-4 transition hover:border-brand">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.title[lang]} className="h-full w-full object-contain p-3 transition group-hover:scale-105" loading="lazy" />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">{s.family}</p>
              <p className="font-extrabold text-ink group-hover:text-brand">{s.title[lang]}</p>
              <p className="mt-1 text-sm text-muted">{s.model}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
