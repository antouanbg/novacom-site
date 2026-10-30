import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { Check, Eyebrow, H2, Reveal, Section } from "./ui";

// Case study for "Consulting & analysis": a real budget offer (BESS for a 24/7 factory, 10.2026)
// with the client's name, energy supplier, offer number and all prices removed (client's decision 2026-10-30).
// Charts are cropped from the offer's analysis without their footnotes (they named the client).
const IMG = "/images/consulting/case-bess-";

export default function ConsultingCase({ lang }: { lang: Lang }) {
  const bg = lang === "bg";

  const input = [
    { n: "1 730 MWh", t: bg ? "годишна консумация от мрежата" : "annual consumption from the grid" },
    { n: "266 kW", t: bg ? "среден нощен товар в работни дни (224–313 kW)" : "average night load on working days (224–313 kW)" },
    { n: "300 kWp", t: bg ? "съществуваща ФЕЦ: 347 MWh/год, 84% самопотребление" : "existing PV plant: 347 MWh/yr, 84% self-consumption" },
    { n: "450 kW", t: bg ? "съединителна мощност; ~55 дни в годината без производство" : "grid connection; ~55 days a year without production" },
  ];

  const recommended = bg
    ? [
        "6 × Suntech SunStorage PRO STE-261L-125P: общо 750 kW / 1 566 kWh, LFP, течно охлаждане, вградено пожарогасене",
        "Статичен превключвател (STS): при отпадане на мрежата резервираните товари до 400 kW минават на батерията за под 20 ms – около 5 часа при 250 kW",
        "EMS GrideX: всеки ден по цените на БНЕБ ден напред изчислява 15-минутен график за зареждане, захранване на фабриката и продажба",
        "Без промяна на съединителната мощност: вносът остава ≤ 450 kW, износът ≤ 300 kW, 10% от капацитета винаги е резерв за авария",
      ]
    : [
        "6 × Suntech SunStorage PRO STE-261L-125P: 750 kW / 1,566 kWh in total, LFP, liquid cooling, built-in fire suppression",
        "Static transfer switch (STS): on a grid outage the backed-up loads of up to 400 kW move to the battery in under 20 ms – about 5 hours at 250 kW",
        "GrideX EMS: every day, from the IBEX day-ahead prices, it plans a 15-minute schedule for charging, supplying the factory and selling",
        "No change to the grid connection: import stays ≤ 450 kW, export ≤ 300 kW, and 10% of the capacity is always kept as an outage reserve",
      ];

  const results = [
    { n: "705 MWh", t: bg ? "заредени годишно: 84% от мрежата в евтините часове, 16% от слънце" : "charged per year: 84% from the grid in cheap hours, 16% from the sun" },
    { n: "435 MWh", t: bg ? "изместени към скъпите сутрешни и вечерни часове на фабриката" : "shifted to the factory's expensive morning and evening hours" },
    { n: "186 MWh", t: bg ? "продадени в мрежата във върховите часове" : "sold to the grid in peak hours" },
    { n: "56 → 13 MWh", t: bg ? "PV излишък, продаван на обяд на ниски цени" : "PV surplus sold at midday at low prices" },
  ];

  const charts = [
    { f: "summer-day", t: bg ? "Среден летен ден (април–септември): един пълен цикъл – зареждане на обяд, разряд вечер" : "Average summer day (April–September): one full cycle – charge at midday, discharge in the evening" },
    { f: "winter-day", t: bg ? "Среден зимен ден (октомври–март): два цикъла, по един за сутрешния и вечерния ценови пик" : "Average winter day (October–March): two cycles, one for each of the morning and evening price peaks" },
    { f: "workday", t: bg ? "Работен ден: товарът от ~250 kW поглъща цялото PV, батерията се зарежда от мрежата при най-ниските цени" : "Working day: the ~250 kW load absorbs all PV, so the battery charges from the grid at the day's lowest prices" },
    { f: "no-production-day", t: bg ? "Ден без производство: PV излишъкът влиза в батерията и се продава вечер, вместо на обяд" : "Day without production: the PV surplus goes into the battery and is sold in the evening instead of at midday" },
  ];

  return (
    <Section className="bg-mist" id="case">
      <Reveal>
        <Eyebrow>{bg ? "Пример от практиката" : "A real example"}</Eyebrow>
        <H2>{bg ? "Анализ за производствено предприятие с работа 24/7" : "Analysis for a 24/7 manufacturing plant"}</H2>
        <p className="mt-5 max-w-3xl text-lg text-muted">
          {bg
            ? "Така изглежда нашият анализ: пример от реална бюджетна оферта за система за съхранение (октомври 2026). Данните на клиента са заличени. Работим с реалните 15-минутни справки за закупената и продадената енергия за 12 месеца и с борсовата цена за всеки интервал, не с типови профили."
            : "This is what our analysis looks like: an example from a real budget offer for a storage system (October 2026), with the client's details removed. We work with the actual 15-minute records of purchased and sold energy for 12 months and the exchange price for every interval, not with standard profiles."}
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <h3 className="text-xl font-extrabold">{bg ? "Изходни данни" : "Input data"}</h3>
      </Reveal>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {input.map((k, i) => (
          <Reveal key={k.n} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-white p-6">
              <p className="text-2xl font-extrabold text-brand sm:text-3xl">{k.n}</p>
              <p className="mt-2 text-sm text-muted">{k.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <p className="max-w-3xl text-muted">
          {bg
            ? "Проблемът: фабриката купува енергията си на борсова цена и плаща повече от средната борсова цена, защото консумира еднакво и в скъпите вечерни часове. При отпадане на мрежата производството спира, а излишъкът от слънце в неработните дни се продава на обяд почти без пари."
            : "The problem: the factory buys its energy at exchange prices and pays more than the average exchange price, because it consumes just as much in the expensive evening hours. A grid outage stops production, and the solar surplus on non-working days is sold at midday for next to nothing."}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="text-xl font-extrabold">{bg ? "Какво препоръчахме" : "What we recommended"}</h3>
          <ul className="mt-5 space-y-3">
            {recommended.map((r) => (
              <Check key={r}>{r}</Check>
            ))}
          </ul>
          <p className="mt-5">
            <Link href={href(lang, "products/suntech/ste-261l-125p")} className="font-bold text-brand underline-offset-4 hover:underline">
              {bg ? "Техническите данни на STE-261L-125P →" : "STE-261L-125P specifications →"}
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="text-xl font-extrabold">{bg ? "Резултат от симулацията за 365 дни" : "Simulation result over 365 days"}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {results.map((k) => (
              <div key={k.n} className="rounded-2xl bg-white p-5">
                <p className="text-2xl font-extrabold text-brand">{k.n}</p>
                <p className="mt-1 text-sm text-muted">{k.t}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            {bg
              ? "Около 1,4 цикъла на ден (~500 годишно) при гаранция над 8 000 цикъла."
              : "About 1.4 cycles a day (~500 a year), against a warranty of more than 8,000 cycles."}
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h3 className="text-xl font-extrabold">{bg ? "Как работи батерията на този обект" : "How the battery works on this site"}</h3>
        {!bg && <p className="mt-2 text-sm text-muted">Charts are from the original analysis, in Bulgarian.</p>}
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {charts.map((c, i) => (
          <Reveal key={c.f} delay={(i % 2) * 0.05}>
            <figure className="h-full rounded-2xl bg-white p-3 sm:p-4">
              <a href={`${IMG}${c.f}.png`} target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}${c.f}.png`} alt={c.t} loading="lazy" width={1108} height={772} className="h-auto w-full" />
              </a>
              <figcaption className="mt-3 text-sm text-muted">{c.t}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <figure className="rounded-2xl bg-white p-3 sm:p-4">
          <a href={`${IMG}monthly-energy.png`} target="_blank" rel="noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}monthly-energy.png`}
              alt={bg ? "Заредена и разредена енергия по месеци" : "Energy charged and discharged by month"}
              loading="lazy"
              width={1824}
              height={816}
              className="h-auto w-full"
            />
          </a>
          <figcaption className="mt-3 text-sm text-muted">
            {bg
              ? "По месеци: делът на слънцето в зареждането е 6–8% през зимата и до 29% през лятото; продажбите са най-големи в месеците с високи вечерни цени."
              : "By month: the sun's share of charging is 6–8% in winter and up to 29% in summer; sales peak in the months with high evening prices."}
          </figcaption>
        </figure>
      </Reveal>

      <Reveal className="mt-6">
        <p className="max-w-3xl text-sm text-muted">
          {bg
            ? "Метод: 15-минутен оптимален диспеч (линейно програмиране) за всеки от 365-те дни по измерения товар и обявените цени ден напред. Анализът е без оглед на място, с точност ±10–15%; прецизира се след оглед и опис на консуматорите."
            : "Method: a 15-minute optimal dispatch (linear programming) for each of the 365 days, using the measured load and the published day-ahead prices. The analysis was made without a site visit, with ±10–15% accuracy; it is refined after a survey and a list of the loads."}
        </p>
      </Reveal>
    </Section>
  );
}
