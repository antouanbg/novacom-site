import type { Metadata } from "next";
import { GRIDEX_REPOS, REAL, utilityModels } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import ResearchResults, { IBEX_DATASET_URL } from "@/components/ResearchResults";
import { seo } from "@/lib/seo";
import { Button, Check, CTA, Eyebrow, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(
    lang,
    "know-how",
    bg ? "Ноу-хау" : "Know-how",
    bg
      ? "Собствени разработки на Novacom: тракер „Стрела“ (3P), единствен в България, собствен EMS за големи индустриални системи, научни трудове и регистрирани полезни модели."
      : "Novacom's own developments: the Strela (3P) tracker, unique in Bulgaria, an in-house EMS for large industrial systems, scientific publications and registered utility models.",
  );
}

export default async function KnowHowPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const strela = [
    { id: REAL.trackerField, alt: bg ? "Тракер „Стрела“ на терен" : "Strela tracker in the field", cls: "sm:col-span-2 sm:row-span-2" },
    { id: REAL.trackerDetail, alt: bg ? "Детайл от механизма на „Стрела“" : "Detail of the Strela mechanism", cls: "" },
    { id: REAL.trackerUnder, alt: bg ? "Двулицеви модули на „Стрела“" : "Bifacial modules on Strela", cls: "" },
    { id: REAL.trackerTrailers, alt: bg ? "Мобилни тракери „Стрела“ с инверторно табло" : "Mobile Strela trackers with on-board inverter cabinet", cls: "sm:col-span-2" },
  ];

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "Ноу-хау" : "Know-how"}
        title={bg ? "Собствени разработки, не само доставка" : "Our own developments, not just supply"}
        text={
          bg
            ? "Проектираме и произвеждаме собствени решения: тракер „Стрела“, EMS за големи индустриални системи и регистрирани полезни модели."
            : "We design and build our own solutions: the Strela tracker, an EMS for large industrial systems and registered utility models."
        }
        img={REAL.trackerField}
      />

      {/* Strela tracker */}
      <Section id="strela">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Изобретение" : "Invention"}</Eyebrow>
            <H2>{bg ? "Тракер „Стрела“ (3P): единствен в България" : "The Strela (3P) tracker: unique in Bulgaria"}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "„Стрела“ е двуосов соларен тракер на един носещ стълб, собствен дизайн и разработка на Novacom. Върти се след слънцето от изток на запад през деня, а сезонно рамо сменя наклона за зима и лято. Предлага се и като мобилна платформа на ремарке, готова за работа където е нужна."
                : "Strela is a two-axis solar tracker on a single mast, designed and developed in-house by Novacom. It turns to follow the sun from east to west through the day, and a seasonal arm changes the tilt for winter and summer. It is also available as a mobile trailer platform, ready to work wherever it is needed."}
            </p>
            <ul className="mt-7 space-y-3 text-lg">
              <Check>{bg ? "Собствен дизайн и разработка в България" : "Designed and developed in Bulgaria"}</Check>
              <Check>{bg ? "Две оси: дневно въртене + сезонен наклон, един стълб, стринг 3,5 kWp" : "Two axes: daily rotation + seasonal tilt, single mast, 3.5 kWp string"}</Check>
              <Check>{bg ? "До 45% по-висок добив спрямо фиксирани системи" : "Up to 45% higher yield than fixed systems"}</Check>
              <Check>{bg ? "Двулицеви модули за допълнителен добив от отразената светлина" : "Bifacial modules for extra yield from reflected light"}</Check>
              <Check>{bg ? "Мобилно изпълнение на ремарке с инверторно табло на борда" : "Mobile trailer version with an on-board inverter cabinet"}</Check>
              <Check>{bg ? "Подходящ за земеделие, отдалечени обекти и временни площадки" : "Suited to agriculture, remote sites and temporary locations"}</Check>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={href(lang, "know-how/strela")}>{bg ? "Виж модела в движение" : "See the model in motion"}</Button>
              <Button to={href(lang, "contact") + "#quote"} variant="outline">{bg ? "Запитване за „Стрела“" : "Ask about Strela"}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:grid-cols-3">
              {strela.map((g) => (
                <div key={g.id} className={`overflow-hidden rounded-2xl ${g.cls}`}>
                  <Photo id={g.id} alt={g.alt} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* EMS */}
      <Section className="bg-ink text-white" id="ems">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <Photo id={REAL.pernikBessOpen} alt={bg ? "Индустриална батерийна система, управлявана от EMS" : "Industrial battery system managed by the EMS"} />
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Софтуер" : "Software"}</p>
            <H2>{bg ? "GrideX Energy OS: собствена EMS с отворен код" : "GrideX Energy OS: our own open-source EMS"}</H2>
            <p className="mt-5 text-lg text-white/80">
              {bg
                ? "Разработихме собствена система за управление на енергията, защото индустриалните обекти имат нужда от повече от мониторинг: решения в реално време кога да се зарежда батерията, кога да се реже пикът и как централата да работи със съществуващото оборудване. Системата е проектирана и разработена от гл. ас. д-р инж. Антуан Ангелов и е публикувана като отворен код под MIT лиценз в github.com/antouanbg: без лицензни такси и без обвързване с доставчик."
                : "We built our own energy management system because industrial sites need more than monitoring: real-time decisions on when to charge the battery, when to shave the peak and how the plant should work with existing equipment. The system is designed and developed by Chief Assist. Prof. Dr. Eng. Antouan Anguelov and published as open source under the MIT licence at github.com/antouanbg: no licence fees and no vendor lock-in."}
            </p>
            <div className="mt-6 rounded-2xl border border-[#b5d86a]/40 bg-white/5 p-5">
              <p className="font-extrabold text-[#b5d86a]">{bg ? "Купувате батерия Suntech 261 kWh? EMS се внедрява 100% безплатно." : "Buying a Suntech 261 kWh battery? The EMS is deployed 100% free."}</p>
              <p className="mt-1 text-sm text-white/75">{bg ? "С интеграция към неограничен брой външни инвертори, батерии и устройства." : "With integration to an unlimited number of third-party inverters, batteries and devices."}</p>
            </div>
            <ul className="mt-7 space-y-3 text-lg">
              {(bg
                ? ["Управление на батерии, товари и зарядни станции по цена и график", "Изрязване на пикове и защита на партидата", "Хибридни батерийни буфери към зарядни станции (V2G-Hybrid-Charge)", "Интеграция със съществуващи инвертори и SCADA", "Мониторинг 24/365 и SMS известия през gridex.tech"]
                : ["Battery, load and EV-charger control by price and schedule", "Peak shaving and grid-connection protection", "Hybrid battery buffers behind EV chargers (V2G-Hybrid-Charge)", "Integration with existing inverters and SCADA", "24/365 monitoring and SMS alerts via gridex.tech"]
              ).map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-extrabold text-[#b5d86a]" aria-hidden>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://gridex.tech/" target="_blank" rel="noopener" className="inline-flex rounded-xl bg-white px-6 py-3.5 font-bold text-ink transition hover:bg-sky">
                {bg ? "Демо: gridex.tech ↗" : "Demo: gridex.tech ↗"}
              </a>
              {GRIDEX_REPOS.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener" className="inline-flex rounded-xl border-2 border-white/40 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  GitHub: {r.name} ↗
                </a>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-14">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Измерен ефект" : "Measured effect"}</p>
            <h3 className="text-2xl font-extrabold sm:text-3xl">{bg ? "Собствените ни алгоритми + батерия Suntech" : "Our own algorithms + a Suntech battery"}</h3>
          </Reveal>
          <div className="mt-6"><ResearchResults lang={lang} dark /></div>
        </div>
      </Section>

      {/* Science & utility models */}
      <Section id="science">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Наука и иновации" : "Science and innovation"}</Eyebrow>
            <H2>{bg ? "Научни трудове и регистрирани полезни модели" : "Scientific publications and registered utility models"}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Зад разработките на Novacom стои екип с академичен опит: преподавателска дейност в Технически университет – София по интелигентни мрежи и системи за ВЕИ, научни публикации в IEEE Xplore в областта на роевата интелигентност, автономните системи и комуникациите, и четири регистрирани полезни модела."
                : "Behind Novacom's developments is a team with academic experience: teaching smart grids and renewable energy systems at the Technical University of Sofia, IEEE Xplore publications on swarm intelligence, autonomous systems and communications, and four registered utility models."}
            </p>
            <p className="mt-4 text-lg text-muted">
              {bg
                ? "Тази комбинация от академична работа и практика на обекта е причината решенията ни да са инженерно обосновани, а не просто каталожни."
                : "This mix of academic work and site practice is why our solutions are engineered, not just picked from a catalogue."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {[
                { n: "4", t: bg ? "регистрирани полезни модела" : "registered utility models" },
                { n: "IEEE", t: bg ? "научни публикации в IEEE Xplore" : "publications in IEEE Xplore" },
                { n: "GitHub", t: bg ? "отворени данни и код от изследванията" : "open data and code from the research", href: IBEX_DATASET_URL },
                { n: bg ? "ТУ-София" : "TU Sofia", t: bg ? "дисциплина „Интелигентни мрежи и системи за ВЕИ“" : "course: Smart Grids and Systems for Renewables" },
                { n: "30+", t: bg ? "години в технологиите и енергетиката" : "years in technology and energy" },
              ].map((k) => (
                <div key={k.t} className="rounded-2xl border border-line p-6">
                  <p className="text-3xl font-extrabold text-brand">{k.n}</p>
                  <p className="mt-1 text-muted">
                    {"href" in k && k.href ? (
                      <a href={k.href} target="_blank" rel="noopener" className="font-bold text-brand hover:underline">{k.t} ↗</a>
                    ) : (
                      k.t
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-mist" id="models">
        <Reveal>
          <Eyebrow>{bg ? "Полезни модели" : "Utility models"}</Eyebrow>
          <H2>{bg ? "Регистрирани полезни модели на Novacom" : "Novacom's registered utility models"}</H2>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {utilityModels.map((m, i) => (
            <Reveal key={m.title.en} delay={i * 0.06}>
              <li className="flex h-full gap-5 rounded-2xl bg-white p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand font-extrabold text-white">{utilityModels.length - i}</span>
                <div>
                  <p className="text-sm font-bold text-brand">
                    {m.year}
                    {m.ref && <span className="ml-2 rounded bg-sky px-2 py-0.5 text-ink">{m.ref}</span>}
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">{m.title[lang]}</h3>
                  <p className="mt-2 text-muted">{m.note[lang]}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="projects">
        <Reveal>
          <Eyebrow>{bg ? "Иновационни проекти" : "Innovation projects"}</Eyebrow>
          <H2>{bg ? "Концепции и финансирани разработки" : "Concepts and funded developments"}</H2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "V2G-Hybrid-Charge", y: bg ? "Полезен модел BG 5058 U1" : "Utility model BG 5058 U1", d: bg ? "Хибридна батерийна система към зарядните станции: двупосочно зареждане (V2G), буфер от нови и рециклирани клетки, AI енергиен мениджър, ISO 15118 / OCPP, работа в микромрежа." : "A hybrid battery system behind EV chargers: bidirectional charging (V2G), a buffer of new and second-life cells, an AI energy manager, ISO 15118 / OCPP, microgrid operation.", to: "products/ev-charging" },
            { t: bg ? "Обединен енергиен клъстер (ОЕК)" : "United Energy Cluster (OEK)", y: "2020", d: bg ? "Модел за частна инвестиция в децентрализирана енергия: енергийни клъстери и общности с дялово участие на потребителите." : "A model for private investment in decentralised energy: energy clusters and communities with member shares.", to: "solutions/communities" },
            { t: "GridMobility", y: "", d: bg ? "Енергийна платформа за обмен на данни между участниците на енергийния пазар, с национално финансиране." : "An energy platform for data exchange between energy-market participants, nationally funded.", to: "" },
            { t: "GrideX", y: "", d: bg ? "Производствена линия за рециклиране и повторно използване на батерийни системи. Платформата за мониторинг gridex.tech." : "A production line for recycling and reusing battery systems, plus the gridex.tech monitoring platform.", to: "" },
            { t: "eHUB", y: "", d: bg ? "Платформа за масова интеграция между различни системи, отличена с H2020 „Seal of Excellence“ и национално финансирана." : "A mass-integration platform between systems, awarded the H2020 Seal of Excellence and nationally funded.", to: "" },
          ].map((k, i) => (
            <Reveal key={k.t} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line p-6">
                <p className="text-sm font-bold text-brand">{k.y || (bg ? "Иновация" : "Innovation")}</p>
                <h3 className="mt-1 text-lg font-extrabold">{k.t}</h3>
                <p className="mt-2 flex-1 text-muted">{k.d}</p>
                {k.to && (
                  <Button to={href(lang, k.to)} variant="outline">
                    {k.to.includes("ev") ? (bg ? "Зарядни станции" : "EV charging") : bg ? "Енергийни общности" : "Energy communities"}
                  </Button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
