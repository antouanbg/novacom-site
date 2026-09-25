import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { GRIDEX_REPOS, products, REAL } from "@/content/site";
import { Photo } from "@/components/ui";
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
                    <div key={typeof it.model === "string" ? it.model : it.model.en} className={`rounded-2xl border p-5 ${it.featured ? "border-brand bg-sky" : "border-line"}`}>
                      <p className="text-sm font-bold uppercase tracking-widest text-muted">
                        {it.brand}
                        {it.featured && <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[11px] text-white">{bg ? "Препоръчан" : "Recommended"}</span>}
                      </p>
                      <p className="mt-1 text-lg font-extrabold">{typeof it.model === "string" ? it.model : it.model[lang]}</p>
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
                      ? "Шкафови батерийни системи Suntech от 261 kWh за бизнеса, мащабируеми до MWh. С всяка батерия 261 kWh нашата open-source EMS GrideX се внедрява 100% безплатно."
                      : "Suntech 261 kWh cabinet battery systems for business, scalable to MWh. With every 261 kWh battery our open-source GrideX EMS is deployed 100% free."
                    : bg
                      ? "Фотоволтаични панели Suntech за покривни и наземни централи."
                      : "Suntech PV modules for rooftop and ground-mounted plants."}
                </p>
                <p className="mt-3 text-white/80">
                  {bg ? "Панели и батерийни системи Suntech за бизнеса, с гаранция от производителя и монтаж от нашия екип." : "Suntech modules and battery systems for business, with manufacturer warranty and installation by our team."}
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
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    [REAL.evpointGarage, bg ? "AC зарядна 22 kW в гараж" : "22 kW AC charger in a garage"],
                    [REAL.evOpen, bg ? "Монтаж и свързване на зарядна станция" : "Installing and wiring a charger"],
                    [REAL.evDcAc, bg ? "DC и AC зарядни на един обект" : "DC and AC chargers on one site"],
                    [REAL.dcFastCharger, bg ? "DC бърза станция с два изхода" : "DC fast charger with two outlets"],
                  ].map(([src, cap]) => (
                    <figure key={src} className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                      <div className="aspect-[4/3]"><Photo id={src} alt={cap} /></div>
                      <figcaption className="px-3 py-2 text-xs text-white/70">{cap}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : p.slug === "carports" ? (
              <div className="grid gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">{bg ? "Конструктивни варианти" : "Structure options"}</p>
                {[
                  [REAL.carportRender, bg ? "Двоен навес за две коли с наклонен покрив от модули" : "Double carport for two cars with a tilted module roof"],
                  [REAL.carportRenderSingle, bg ? "Едноколонна конзолна конструкция: свободно пространство под навеса" : "Single-column cantilever: free space under the canopy"],
                  [REAL.carportRenderRow, bg ? "Редова конструкция за фирмени паркинги, неограничена дължина" : "Row structure for company car parks, unlimited length"],
                  [REAL.carportRenderSteps, bg ? "Сглобяване: колони, греди, редове и модули" : "Assembly: columns, beams, purlins and modules"],
                ].map(([src, cap]) => (
                  <figure key={src} className="overflow-hidden rounded-2xl border border-line bg-white">
                    <div className="aspect-[16/8] bg-white"><Photo id={src} alt={cap} className="object-contain" /></div>
                    <figcaption className="px-4 py-2 text-xs text-muted">{cap}</figcaption>
                  </figure>
                ))}
                <div className="rounded-3xl bg-sky p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{bg ? "Комбинирайте" : "Combine"}</p>
                  <p className="mt-2 font-semibold">{bg ? "Навес + зарядна станция + батерия = паркинг, който зарежда колата ви от слънцето." : "Canopy + EV charger + battery = a car park that charges your car from the sun."}</p>
                </div>
              </div>
            ) : p.slug === "wind" ? (
              <div className="grid gap-4">
                <div className="rounded-3xl bg-ink p-7 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Система 1" : "System 1"}</p>
                  <h3 className="mt-2 text-2xl font-extrabold">{bg ? "За продажба към мрежата" : "For selling to the grid"}</h3>
                  <p className="mt-3 text-white/80">
                    {bg
                      ? "Турбина + on-grid инвертор 230 V. Произведената енергия се отчита и се продава по договор с търговец или се приспада от вашата консумация (нетно отчитане, където е приложимо)."
                      : "Turbine + 230 V on-grid inverter. The energy is metered and sold under an offtake contract or offset against your consumption where net metering applies."}
                  </p>
                </div>
                <div className="rounded-3xl bg-sky p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{bg ? "Система 2" : "System 2"}</p>
                  <h3 className="mt-2 text-2xl font-extrabold">{bg ? "За собствена консумация" : "For self-consumption"}</h3>
                  <p className="mt-3 text-muted">
                    {bg
                      ? "Турбина + контролер за зареждане + батерия (LV/HV). Енергията се съхранява и се ползва вечер и при спиране на тока. Комбинира се с фотоволтаици в една хибридна система."
                      : "Turbine + charge controller + battery (LV/HV). Energy is stored and used in the evening and during outages. Combines with PV in one hybrid system."}
                  </p>
                </div>
              </div>
            ) : p.slug === "monitoring" ? (
              <div className="grid gap-4">
                <div className="rounded-3xl bg-ink p-7 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Оферта" : "Offer"}</p>
                  <h3 className="mt-2 text-2xl font-extrabold">{bg ? "100% безплатна EMS с батерия Suntech 261 kWh" : "100% free EMS with a Suntech 261 kWh battery"}</h3>
                  <p className="mt-3 text-white/80">
                    {bg
                      ? "Внедряване, конфигурация и интеграция към неограничен брой външни инвертори, батерии и устройства, без лицензни такси."
                      : "Deployment, configuration and integration to an unlimited number of third-party inverters, batteries and devices, with no licence fees."}
                  </p>
                  <a href="https://gridex.tech/" target="_blank" rel="noopener" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-ink hover:bg-sky">
                    {bg ? "Демо: gridex.tech ↗" : "Demo: gridex.tech ↗"}
                  </a>
                </div>
                <div className="rounded-3xl border border-line bg-white p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">{bg ? "Отворен код · MIT" : "Open source · MIT"}</p>
                  <ul className="mt-3 space-y-3">
                    {GRIDEX_REPOS.map((r) => (
                      <li key={r.name}>
                        <a href={r.url} target="_blank" rel="noopener" className="font-bold text-brand hover:underline">github.com/antouanbg/{r.name} ↗</a>
                        <p className="text-sm text-muted">{r.what[lang]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
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
