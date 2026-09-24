import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { products } from "@/content/site";
import { locales, type Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, H2, MonitoringPromo, PageHero, Reveal, Section } from "@/components/ui";
import ResearchResults from "@/components/ResearchResults";

type P = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? seo(lang as Lang, `products/${slug}`, p.title[lang as Lang], p.intro[lang as Lang]) : {};
}

export default async function ProductPage({ params }: P) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const bg = lang === "bg";

  return (
    <>
      <PageHero lang={lang} eyebrow={bg ? "Продукти" : "Products"} title={p.title[lang]} text={p.short[lang]} img={p.img} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Описание" : "Overview"}</Eyebrow>
            <H2>{p.title[lang]}</H2>
            <p className="mt-5 text-lg text-muted">{p.intro[lang]}</p>
            <ul className="mt-7 space-y-3 text-lg">
              {p.features.map((f) => (
                <Check key={f.en}>{f[lang]}</Check>
              ))}
            </ul>
            {p.items.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-extrabold">{bg ? "Модели, които доставяме" : "Models we supply"}</h3>
                <div className="mt-4 grid gap-3">
                  {p.items.map((it) => (
                    <div key={it.model} className={`rounded-2xl border p-5 ${it.featured ? "border-brand bg-sky" : "border-line"}`}>
                      <p className="text-sm font-bold uppercase tracking-widest text-muted">
                        {it.brand}
                        {it.featured && <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[11px] text-white">{bg ? "Препоръчан" : "Recommended"}</span>}
                      </p>
                      <p className="mt-1 text-lg font-extrabold">{it.model}</p>
                      <p className="mt-1 text-muted">{it.specs[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            {p.slug === "pv-modules" || p.slug === "storage" ? (
              <div className="rounded-3xl bg-ink p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Производител" : "Manufacturer"}</p>
                <h3 className="mt-2 text-3xl font-extrabold">Suntech</h3>
                <p className="mt-3 text-white/80">
                  {p.slug === "storage"
                    ? bg
                      ? "Шкафови батерийни системи Suntech от 261 kWh за бизнеса, мащабируеми до MWh."
                      : "Suntech 261 kWh cabinet battery systems for business, scalable to MWh."
                    : bg
                      ? "Фотоволтаични панели Suntech, директно от производителя."
                      : "Suntech PV modules, direct from the manufacturer."}
                </p>
                <p className="mt-3 text-white/80">
                  {bg ? "Novacom е търговски представител на Suntech за Балканите и Европа." : "Novacom is Suntech's sales representative for the Balkans and Europe."}
                </p>
                <a href="https://www.suntech-power.com/" target="_blank" rel="noopener" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-ink hover:bg-sky">
                  suntech-power.com ↗
                </a>
              </div>
            ) : p.slug === "ev-charging" ? (
              <div className="rounded-3xl bg-ink p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "За дома и бизнеса" : "For home and business"}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{bg ? "Зареждане със собствена енергия" : "Charge on your own energy"}</h3>
                <p className="mt-3 text-white/80">
                  {bg
                    ? "Комбинираме зарядната станция с ФЕЦ и батерия и я включваме в безплатния мониторинг 24/365. За фирми: отчитане по служители и клиенти."
                    : "We combine the charger with PV and storage and include it in free 24/365 monitoring. For businesses: reporting per employee and customer."}
                </p>
                <p className="mt-3 text-white/80">{bg ? "Марки и модели: според обекта и мощността, в офертата." : "Brands and models: chosen per site and power, in the quote."}</p>
              </div>
            ) : p.slug === "monitoring" ? (
              <div className="rounded-3xl bg-ink p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Платформа" : "Platform"}</p>
                <h3 className="mt-2 text-3xl font-extrabold">gridex.tech</h3>
                <p className="mt-3 text-white/80">
                  {bg ? "Безплатен мониторинг 24/365 и безплатни SMS известия за всеки клиент." : "Free 24/365 monitoring and free SMS alerts for every client."}
                </p>
                <a href="https://gridex.tech/" target="_blank" rel="noopener" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-ink hover:bg-sky">
                  gridex.tech ↗
                </a>
              </div>
            ) : (
              <div className="rounded-3xl bg-mist p-7">
                <h3 className="text-lg font-extrabold">{bg ? "Подбор на модел" : "Choosing the model"}</h3>
                <p className="mt-3 text-muted">
                  {bg
                    ? "Подбираме производителя и модела според обекта, мощността и нуждата от съхранение. Изпратете запитване и ще предложим конкретна конфигурация."
                    : "We choose the manufacturer and model to suit your site, power and storage needs. Send a request and we will propose a specific configuration."}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Section>
      {p.slug === "storage" && (
        <Section className="bg-mist">
          <Reveal>
            <Eyebrow>{bg ? "Изследване" : "Research"}</Eyebrow>
            <H2>{bg ? "Какво печели обектът с батерия Suntech и нашия EMS" : "What a site gains with a Suntech battery and our EMS"}</H2>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              {bg
                ? "Нашият EMS оптимизира зареждането и разреждането по цените за ден напред, изрязва пиковете и решава кога да ограничи производството при отрицателни цени. Ефектът е измерен в научно изследване с реални цени от БНЕБ."
                : "Our EMS optimises charging and discharging against day-ahead prices, shaves peaks and decides when to curtail at negative prices. The effect was measured in a study with real IBEX prices."}
            </p>
          </Reveal>
          <div className="mt-8"><ResearchResults lang={lang} /></div>
        </Section>
      )}
      {p.slug === "monitoring" && <MonitoringPromo lang={lang} />}
      <CTA lang={lang} />
    </>
  );
}
