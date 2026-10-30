import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { Check, Eyebrow, H2, Reveal, Section } from "./ui";

// Case study for "Engineering & grid connection": the Ardino park project with 4 "Strela" trackers
// (technical design, 2026). Drawings are from the project with the title blocks (firm, designers,
// signatures, client) and the grid operator's name removed (client's decision 2026-10-30).
const IMG = "/images/engineering/ardino-";

export default function EngineeringCase({ lang }: { lang: Lang }) {
  const bg = lang === "bg";

  const stats = [
    { n: "4", t: bg ? "соларни тракера „Стрела“ 2P – наш дизайн и разработка" : "“Strela” 2P solar trackers – our own design and development" },
    { n: "15,6 kWp", t: bg ? "24 бифациални модула TOPCon по 650 W, по 6 на тракер" : "24 bifacial TOPCon modules of 650 W, 6 per tracker" },
    { n: "96,4 kWh", t: bg ? "батерия LiFePO₄ с хибриден инвертор 25 kW в един шкаф" : "LiFePO₄ battery with a 25 kW hybrid inverter in one cabinet" },
    { n: "165%", t: bg ? "от годишната консумация на парковото осветление" : "of the park lighting's annual consumption" },
  ];

  const electro = bg
    ? [
        "Азимутно следене на слънцето с фиксиран наклон 45° – наклонът е избран по симулация на покритието на нощния товар, не на годишния добив",
        "2 стринга по 12 модула на отделни MPPT входове; проверка на напреженията от −20 °C до +70 °C",
        "DC кутии IP65 с разединител и SPD при колоните, кабели в тръби в изкоп",
        "Осветлението се захранва от backup порта на инвертора; при празна батерия превключва към мрежата за под 10 ms",
        "Управление на осветлението по заряда на батерията: целонощен и полунощен режим",
        "Нулев експорт към мрежата, заземяване и мълниезащита на всяка колона",
      ]
    : [
        "Azimuth sun tracking with a fixed 45° tilt – the tilt was chosen by simulating night-load coverage, not annual yield",
        "2 strings of 12 modules on separate MPPT inputs; voltages checked from −20 °C to +70 °C",
        "IP65 DC boxes with disconnector and SPD at the columns, cables in ducts in a trench",
        "The lighting runs from the inverter's backup port; with an empty battery it switches to the grid in under 10 ms",
        "Lighting control by battery charge: all-night and midnight modes",
        "Zero export to the grid, earthing and lightning protection for every column",
      ];

  const constr = bg
    ? [
        "Обща стоманобетонна фундаментна плоча за два тракера в ред, с колони 100 × 100 cm",
        "Кота на фундиране −1,40 m, бетон C25/30, армировка B500B",
        "Долен ръб на модулите на поне 2,6 m над терена – тракерите стоят в пешеходна зона",
        "Ситуация на фундаментите по съществуващата подпорна стена на алеята",
      ]
    : [
        "A shared reinforced-concrete foundation slab for two trackers in a row, with 100 × 100 cm columns",
        "Foundation level −1.40 m, C25/30 concrete, B500B reinforcement",
        "Lower module edge at least 2.6 m above ground – the trackers stand in a pedestrian area",
        "Foundation layout along the existing retaining wall of the alley",
      ];

  const drawings = [
    { f: "situacia-trakeri", w: 1900, h: 1343, t: bg ? "Ситуация: 4 тракера „Стрела“, система за съхранение и табло за парковото осветление; профил на кабелния изкоп" : "Site plan: 4 “Strela” trackers, storage system and park-lighting board; cable trench profile" },
    { f: "ednolineyna", w: 1900, h: 1343, t: bg ? "Еднолинейна схема: тракерите, DC кутиите, хибридният инвертор с батерията и таблото за осветлението" : "Single-line diagram: trackers, DC boxes, the hybrid inverter with its battery and the lighting board" },
    { f: "fundament", w: 1900, h: 1343, t: bg ? "Кофражен план на фундамента за два тракера в ред" : "Formwork plan of the foundation for two trackers in a row" },
    { f: "situacia-fundamenti", w: 1900, h: 593, t: bg ? "Ситуация на фундаментите на 4-те тракера" : "Foundation layout of the 4 trackers" },
  ];

  return (
    <Section className="bg-mist" id="ardino">
      <Reveal>
        <Eyebrow>{bg ? "Наш проект" : "Our project"}</Eyebrow>
        <H2>{bg ? "Ардино: парк със соларни тракери „Стрела“" : "Ardino: a park with “Strela” solar trackers"}</H2>
        <p className="mt-5 max-w-3xl text-lg text-muted">
          {bg
            ? "Технически проект (2026) за захранване на парковото осветление в Ардино от соларна система с батерия, части електро и конструктивна. Генераторът е от 4 соларни тракера „Стрела“ 2P – наш дизайн и разработка. Системата покрива осветлението практически изцяло от март до октомври, а през зимата мрежата поема само около 8% от годишната консумация."
            : "A technical design (2026) for powering the park lighting in Ardino from a solar system with a battery, electrical and structural parts. The generator is 4 “Strela” 2P solar trackers – our own design and development. The system covers the lighting almost entirely from March to October, and in winter the grid supplies only about 8% of the annual consumption."}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((k, i) => (
          <Reveal key={k.n} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-white p-6">
              <p className="text-2xl font-extrabold text-brand sm:text-3xl">{k.n}</p>
              <p className="mt-2 text-sm text-muted">{k.t}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="text-xl font-extrabold">{bg ? "Част електро" : "Electrical design"}</h3>
          <ul className="mt-5 space-y-3">
            {electro.map((r) => (
              <Check key={r}>{r}</Check>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="text-xl font-extrabold">{bg ? "Част конструктивна" : "Structural design"}</h3>
          <ul className="mt-5 space-y-3">
            {constr.map((r) => (
              <Check key={r}>{r}</Check>
            ))}
          </ul>
          <p className="mt-5">
            <Link href={href(lang, "know-how/strela")} className="font-bold text-brand underline-offset-4 hover:underline">
              {bg ? "Как работи тракерът „Стрела“ →" : "How the Strela tracker works →"}
            </Link>
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h3 className="text-xl font-extrabold">{bg ? "Части от проекта" : "Parts of the design"}</h3>
        {!bg && <p className="mt-2 text-sm text-muted">The drawings are in Bulgarian.</p>}
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {drawings.map((d, i) => (
          <Reveal key={d.f} delay={(i % 2) * 0.05}>
            <figure className="h-full rounded-2xl bg-white p-3 sm:p-4">
              <a href={`${IMG}${d.f}.jpg`} target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}${d.f}.jpg`} alt={d.t} loading="lazy" width={d.w} height={d.h} className="h-auto w-full" />
              </a>
              <figcaption className="mt-3 text-sm text-muted">{d.t}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <p className="text-sm text-muted">{bg ? "Кликнете върху чертеж, за да го отворите в пълен размер." : "Click a drawing to open it full size."}</p>
      </Reveal>
    </Section>
  );
}
