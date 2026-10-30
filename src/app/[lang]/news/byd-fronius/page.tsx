import type { Metadata } from "next";
import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { CTA, Check, Eyebrow, H2, Reveal, Section } from "@/components/ui";
import { fmtDate } from "../page";

// Article: Novacom as main importer and partner of BYD and Fronius for Bulgaria (client's statement, 2026-10-30).
// Product data only from the manufacturers: BYD datasheets (HVB V1.5 2026-06, HVS/HVM 2025) and fronius.com tech data.
// Logos and product images are from bydbatterybox.com / bydenergy.com and fronius.com.

type P = { params: Promise<{ lang: string }> };

const DATE = "2026-10-30";
const IMG = "/images/partners/";

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(
    lang,
    "news/byd-fronius",
    bg ? "Novacom – основен вносител и партньор на BYD и Fronius за България" : "Novacom – main importer and partner of BYD and Fronius for Bulgaria",
    bg
      ? "Батерии BYD Battery-Box HVB и HVS/HVM и инвертори Fronius Tauro и Symo GEN24 Plus за бизнеса и дома – директно от Novacom."
      : "BYD Battery-Box HVB and HVS/HVM batteries and Fronius Tauro and Symo GEN24 Plus inverters for business and home – directly from Novacom.",
  );
}

type Prod = { seg: string; name: string; img: string; lead: string; specs: string[] };

export default async function BydFroniusArticle({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const brands: { logo: string; name: string; about: string; products: Prod[] }[] = [
    {
      logo: "byd-logo.png",
      name: "BYD",
      about: bg
        ? "BYD произвежда собствени литиево-железо-фосфатни (LFP) клетки от 2002 г. Батериите Battery-Box работят в над 1 милион системи в повече от 100 държави."
        : "BYD has made its own lithium iron phosphate (LFP) cells since 2002. Battery-Box batteries run in more than 1 million systems in over 100 countries.",
      products: [
        {
          seg: bg ? "За бизнеса (C&I)" : "For business (C&I)",
          name: "BYD Battery-Box HVB",
          img: "byd-battery-box-hvb.jpg",
          lead: bg
            ? "Новото поколение високоволтови батерии BYD: работи при температури до −20 °C, с по-висока мощност и 15 години гаранция."
            : "BYD's new generation of high-voltage batteries: operates down to −20 °C, with higher power and a 15-year warranty.",
          specs: bg
            ? [
                "От 5,94 до 29,69 kWh в една кула (2 до 10 модула по 2,97 kWh)",
                "До 3 кули в паралел – общо 89,07 kWh",
                "Работна температура от −20 °C до +50 °C (под 0 °C с намалена мощност)",
                "15 години гаранция, ефективност на цикъла ≥ 95%, IP55",
                "Модул под 30 kg, пълна кула под 1,3 m; разширяване по всяко време",
                "VDE 2510-50, IEC 62619, CE, UN 38.3",
              ]
            : [
                "5.94 to 29.69 kWh in one tower (2 to 10 modules of 2.97 kWh)",
                "Up to 3 towers in parallel – 89.07 kWh in total",
                "Operating temperature −20 °C to +50 °C (reduced power below 0 °C)",
                "15-year warranty, round-trip efficiency ≥ 95%, IP55",
                "Module under 30 kg, full tower under 1.3 m; extend at any time",
                "VDE 2510-50, IEC 62619, CE, UN 38.3",
              ],
        },
        {
          seg: bg ? "За дома" : "For the home",
          name: "BYD Battery-Box Premium HVS / HVM",
          img: "byd-battery-box-hvs.jpg",
          lead: bg
            ? "Най-разпространените домашни батерии на BYD, съвместими с водещите монофазни и трифазни инвертори."
            : "BYD's most widely used home batteries, compatible with the leading single- and three-phase inverters.",
          specs: bg
            ? [
                "HVS: от 5,12 до 12,8 kWh; до 3 кули в паралел – 38,4 kWh",
                "HVM: от 8,28 до 22,08 kWh; до 3 кули в паралел – 66,2 kWh",
                "LFP клетки, ефективност на цикъла ≥ 96%, IP55, на закрито и открито",
                "За мрежа, мрежа с резервно захранване и автономна работа",
                "10 години гаранция; VDE 2510-50, IEC 62619",
              ]
            : [
                "HVS: 5.12 to 12.8 kWh; up to 3 towers in parallel – 38.4 kWh",
                "HVM: 8.28 to 22.08 kWh; up to 3 towers in parallel – 66.2 kWh",
                "LFP cells, round-trip efficiency ≥ 96%, IP55, indoor and outdoor",
                "On-grid, on-grid with backup and off-grid",
                "10-year warranty; VDE 2510-50, IEC 62619",
              ],
        },
      ],
    },
    {
      logo: "fronius-logo.png",
      name: "Fronius",
      about: bg
        ? "Fronius е австрийски производител на инвертори с мониторинг през Fronius Solar.web. Инверторите GEN24 Plus работят директно с батериите BYD."
        : "Fronius is an Austrian inverter maker with monitoring via Fronius Solar.web. GEN24 Plus inverters work directly with BYD batteries.",
      products: [
        {
          seg: bg ? "За бизнеса (C&I)" : "For business (C&I)",
          name: "Fronius Tauro / Tauro ECO",
          img: "fronius-tauro.webp",
          lead: bg
            ? "Здрав трифазен стрингов инвертор за търговски и индустриални покриви и наземни централи, с двустенен корпус и активно охлаждане."
            : "A robust three-phase string inverter for commercial and industrial roofs and ground-mounted plants, with a double-walled housing and active cooling.",
          specs: bg
            ? [
                "Мощност 50 kW (Tauro, Tauro ECO) и 100 kW (Tauro ECO)",
                "Максимална ефективност 98,5%",
                "Tauro: 3 MPP тракера; Tauro ECO: 1 MPP тракер, максимално DC напрежение 1 000 V",
                "IP65, работа от −40 °C до +65 °C, пълна мощност до 50 °C",
                "Версии Direct и Precombined; VDE-AR-N 4105 / 4110, EN 50549",
              ]
            : [
                "50 kW (Tauro, Tauro ECO) and 100 kW (Tauro ECO)",
                "Maximum efficiency 98.5%",
                "Tauro: 3 MPP trackers; Tauro ECO: 1 MPP tracker, max DC voltage 1,000 V",
                "IP65, operation from −40 °C to +65 °C, full power up to 50 °C",
                "Direct and Precombined versions; VDE-AR-N 4105 / 4110, EN 50549",
              ],
        },
        {
          seg: bg ? "За дома" : "For the home",
          name: "Fronius Symo GEN24 Plus",
          img: "fronius-symo-gen24-plus.webp",
          lead: bg
            ? "Трифазен хибриден инвертор за дома: соларна централа, батерия и резервно захранване в едно устройство."
            : "A three-phase hybrid inverter for the home: PV plant, battery and backup power in one device.",
          specs: bg
            ? [
                "Мощност от 3 до 10 kW, както и 12 kW в новата серия SC",
                "2 MPP тракера",
                "PV Point: основно резервно захранване до 3 kW при слънце",
                "Full Backup за цялото домакинство с батерия (за моделите от 6 kW нагоре)",
                "Работи с BYD Battery-Box HVS, HVM и HVB – до 3 батерии в паралел",
              ]
            : [
                "3 to 10 kW, plus 12 kW in the new SC series",
                "2 MPP trackers",
                "PV Point: basic backup power of up to 3 kW in sunshine",
                "Full Backup for the whole household with a battery (6 kW models and up)",
                "Works with BYD Battery-Box HVS, HVM and HVB – up to 3 batteries in parallel",
              ],
        },
      ],
    },
  ];

  return (
    <>
      <Section className="pb-6 sm:pb-8 lg:pb-10">
        <Reveal>
          <Eyebrow>{bg ? "Новини" : "News"}</Eyebrow>
          <time className="text-sm font-bold text-brand" dateTime={DATE}>{fmtDate(DATE, lang)}</time>
          <h1 className="[overflow-wrap:normal] [hyphens:manual] mt-2 max-w-4xl text-[clamp(1.6rem,6vw,3rem)] font-extrabold leading-tight">
            {bg ? "Novacom – основен вносител и партньор на BYD и Fronius за България" : "Novacom – main importer and partner of BYD and Fronius for Bulgaria"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted">
            {bg
              ? "Novacom е основен вносител и партньор на BYD и Fronius за България. Доставяме батериите BYD Battery-Box и инверторите Fronius директно, с проектиране, монтаж, въвеждане в експлоатация и гаранционно обслужване – за индустриални и търговски обекти и за домове."
              : "Novacom is the main importer and partner of BYD and Fronius for Bulgaria. We supply BYD Battery-Box batteries and Fronius inverters directly, together with design, installation, commissioning and warranty service – for industrial and commercial sites and for homes."}
          </p>
        </Reveal>
        <Reveal className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}byd-fronius-banner.jpg`}
            alt={bg ? "Логата на BYD и Fronius с батерии BYD Battery-Box и инвертори Fronius" : "BYD and Fronius logos with BYD Battery-Box batteries and Fronius inverters"}
            width={1600}
            height={900}
            className="h-auto w-full rounded-3xl border border-line"
          />
        </Reveal>
      </Section>

      {brands.map((b, bi) => (
        <Section key={b.name} className={bi % 2 === 0 ? "bg-mist" : ""}>
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}${b.logo}`} alt={b.name} loading="lazy" className="h-14 w-auto self-start sm:h-16" />
              <p className="max-w-3xl text-lg text-muted">{b.about}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {b.products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
                  <div className="grid aspect-[16/10] place-items-center bg-[#f5f6f8] p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}${p.img}`} alt={p.name} loading="lazy" className="max-h-full w-auto max-w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm font-bold uppercase tracking-wider text-leaf">{p.seg}</p>
                    <h2 className="[overflow-wrap:normal] [hyphens:manual] mt-1 text-2xl font-extrabold">{p.name}</h2>
                    <p className="mt-3 text-muted">{p.lead}</p>
                    <ul className="mt-5 space-y-3">
                      {p.specs.map((s) => (
                        <Check key={s}>{s}</Check>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <Reveal>
          <H2>{bg ? "Един доставчик за батерията и инвертора" : "One supplier for the battery and the inverter"}</H2>
          <p className="mt-5 max-w-3xl text-lg text-muted">
            {bg
              ? "Fronius Symo GEN24 Plus и BYD Battery-Box са тествана комбинация: инверторът управлява батерията, резервното захранване и мониторинга. Подбираме размера на системата по реалната ви консумация, а за бизнеса правим анализ по 15-минутния товар и цените на електроенергията."
              : "Fronius Symo GEN24 Plus and BYD Battery-Box are a proven combination: the inverter manages the battery, backup power and monitoring. We size the system to your actual consumption, and for businesses we analyse the 15-minute load and electricity prices."}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <Link href={href(lang, "products/storage")} className="font-bold text-brand hover:underline">
              {bg ? "Системи за съхранение →" : "Energy storage →"}
            </Link>
            <Link href={href(lang, "products/inverters")} className="font-bold text-brand hover:underline">
              {bg ? "Инвертори →" : "Inverters →"}
            </Link>
            <Link href={href(lang, "services/consulting") + "#case"} className="font-bold text-brand hover:underline">
              {bg ? "Пример за анализ →" : "Analysis example →"}
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted">
            {bg
              ? "Техническите данни са по листовете с данни и сайтовете на производителите (BYD, Fronius) към октомври 2026 г. BYD и Fronius са търговски марки на съответните им притежатели."
              : "Technical data are from the manufacturers' datasheets and websites (BYD, Fronius) as of October 2026. BYD and Fronius are trademarks of their respective owners."}
          </p>
        </Reveal>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
