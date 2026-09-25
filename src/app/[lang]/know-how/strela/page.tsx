import type { Metadata } from "next";
import { REAL } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import StrelaModel from "@/components/StrelaModel";
import { Button, Check, CTA, Eyebrow, H2, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(
    lang,
    "know-how/strela",
    bg ? "Тракер „Стрела“: двуосов соларен тракер" : "Strela: two-axis solar tracker",
    bg
      ? "Анимиран модел и спецификация на соларния тракер „Стрела“ на Novacom: двуосов, на един стълб, 3,5 kWp стринг, до 45% по-висок добив."
      : "Animated model and specification of Novacom's Strela solar tracker: two-axis, single mast, 3.5 kWp string, up to 45% higher yield.",
  );
}


export default async function StrelaPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const specs = [
    [bg ? "Тип" : "Type", bg ? "Двуосов тракер на един носещ стълб: дневно въртене изток–запад (120°) и сезонно рамо за наклона" : "Two-axis tracker on a single mast: daily east–west rotation (120°) and a seasonal tilt arm"],
    [bg ? "Модули" : "Modules", bg ? "6 (разширяем до 8) двулицеви, 2300 × 1200 mm, ≈ 3,5 kWp" : "6 (expandable to 8) bifacial, 2300 × 1200 mm, ≈ 3.5 kWp"],
    [bg ? "Добив" : "Yield", bg ? "До 45% повече от фиксирана конструкция" : "Up to 45% more than a fixed structure"],
    [bg ? "Задвижване" : "Drive", bg ? "Червячен редуктор за въртенето и електрически линеен актуатор за сезонния наклон" : "Worm gearbox for the rotation and an electric linear actuator for the seasonal tilt"],
    [bg ? "Носимоспособност" : "Load rating", bg ? "450 kg статично + вятър до 140 km/h" : "450 kg static + wind up to 140 km/h"],
    [bg ? "Материали" : "Materials", bg ? "Поцинковани профили, болтови връзки без заваряване, непрекъснато заземяване" : "Galvanised profiles, bolted (no welding), continuous earthing"],
    [bg ? "Монтаж" : "Mounting", bg ? "Един стълб на бетонна пета или на ремарке (мобилна версия)" : "A single mast on a concrete footing or on a trailer (mobile version)"],
  ];

  return (
    <>
      {/* Hero with the live model */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-12 lg:py-16">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Ноу-хау · Изобретение" : "Know-how · Invention"}</p>
            <h1 className="[overflow-wrap:normal] [hyphens:manual] text-[clamp(1.25rem,7vw,3rem)] font-extrabold leading-[1.12]">{bg ? "Тракер „Стрела“: двуосов, на един стълб" : "Strela tracker: two-axis, single mast"}</h1>
            <p className="mt-5 text-lg text-white/80">
              {bg
                ? "Собствен дизайн и разработка на Novacom. Единственият български соларен тракер: следи слънцето през целия ден, а сезонно рамо сменя наклона за зима и лято."
                : "Designed and developed by Novacom. The only Bulgarian-made solar tracker: it follows the sun all day, and a seasonal arm changes the tilt for winter and summer."}
            </p>
            <ul className="mt-6 grid gap-2 text-white/90 sm:grid-cols-2">
              {(bg ? ["До 45% по-висок добив", "6 двулицеви модула, ≈ 3,5 kWp", "Един носещ стълб или ремарке", "Произвежда се в България"] : ["Up to 45% higher yield", "6 bifacial modules, ≈ 3.5 kWp", "Single mast or trailer", "Manufactured in Bulgaria"]).map((t) => (
                <li key={t} className="flex gap-2"><span className="text-[#b5d86a]" aria-hidden>✓</span>{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={href(lang, "contact") + "#quote"} variant="light">{bg ? "Запитване за „Стрела“" : "Ask about Strela"}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-3 shadow-2xl sm:p-4">
              <StrelaModel lang={lang} frameless />
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="model">
        <Reveal>
          <Eyebrow>{bg ? "Интерактивен модел" : "Interactive model"}</Eyebrow>
          <H2>{bg ? "Как работи „Стрела“" : "How Strela works"}</H2>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            {bg
              ? "Шест двулицеви модула са монтирани на рамка върху един носещ стълб. Въртяща глава следва слънцето от изток на запад през целия ден, а сезонно рамо сменя наклона: стръмно през зимата, полегато през лятото. Моделът се движи сам; превключете сезона или спрете деня с плъзгача."
              : "Six bifacial modules are mounted on a frame on a single mast. A rotating head follows the sun from east to west all day, and a seasonal arm changes the tilt: steep in winter, flat in summer. The model runs by itself; switch the season or stop the day with the slider."}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-3">
            <div className="col-span-2 overflow-hidden rounded-2xl md:col-span-2"><Photo id={REAL.trackerField} alt={bg ? "„Стрела“ на терен" : "Strela in the field"} /></div>
            <div className="overflow-hidden rounded-2xl"><Photo id={REAL.trackerCabinet} alt={bg ? "Инверторно табло на мобилния тракер" : "Inverter cabinet on the mobile tracker"} /></div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-mist" id="spec">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Спецификация" : "Specification"}</Eyebrow>
            <H2>{bg ? "Технически данни" : "Technical data"}</H2>
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
              {specs.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[170px_1fr]">
                  <dt className="[overflow-wrap:normal] [hyphens:manual] text-[clamp(11px,3.2vw,14px)] font-bold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[190px]">
              <div className="col-span-2 overflow-hidden rounded-2xl"><Photo id={REAL.trackerTrailers} alt={bg ? "Мобилни тракери „Стрела“ на ремарке" : "Mobile Strela trackers on trailers"} /></div>
              <div className="overflow-hidden rounded-2xl"><Photo id={REAL.trackerDetail} alt={bg ? "Детайл от механизма" : "Mechanism detail"} /></div>
              <div className="overflow-hidden rounded-2xl"><Photo id={REAL.trackerUnder} alt={bg ? "Двулицеви модули отдолу" : "Bifacial modules from below"} /></div>
            </div>
            <ul className="mt-6 space-y-3 text-lg">
              <Check>{bg ? "Работи на терен от 2024 г. в мобилно изпълнение" : "In field operation since 2024 in the mobile version"}</Check>
              <Check>{bg ? "Подходящ за земеделие, отдалечени и временни обекти" : "Suited to agriculture, remote and temporary sites"}</Check>
              <Check>{bg ? "Пълна производствена документация, изработва се в България" : "Full production documentation, manufactured in Bulgaria"}</Check>
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="why">
        <Reveal>
          <Eyebrow>{bg ? "Защо тракер" : "Why a tracker"}</Eyebrow>
          <H2>{bg ? "Повече енергия от същите панели" : "More energy from the same modules"}</H2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            [bg ? "до 45%" : "up to 45%", bg ? "по-висок годишен добив спрямо фиксирана конструкция" : "higher annual yield than a fixed structure"],
            [bg ? "2 оси" : "2 axes", bg ? "ежедневно въртене изток–запад и сезонен наклон" : "daily east–west rotation and seasonal tilt"],
            [bg ? "1 стълб" : "1 mast", bg ? "малка бетонна пета или ремарке, бърз монтаж и преместване" : "a small footing or a trailer, quick to install and relocate"],
          ].map(([n, t]) => (
            <Reveal key={n}>
              <div className="rounded-2xl border border-line p-6">
                <p className="text-3xl font-extrabold text-brand">{n}</p>
                <p className="mt-2 text-muted">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="max-w-3xl text-lg text-muted">
            {bg
              ? "За големи наземни паркове доставяме и монтираме и стандартни едноосови тракери с двуредово (2P) разположение на модулите: една носеща греда, централно задвижване и редове с дължина над 100 m."
              : "For large ground-mounted parks we also supply and install standard single-axis trackers with two-in-portrait (2P) module layout: one torque tube, central drive and rows over 100 m long."}
          </p>
          <div className="mt-5 grid auto-rows-[200px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-[1fr_1.6fr]">
            <div className="overflow-hidden rounded-2xl"><Photo id={REAL.tracker2pExpo} alt={bg ? "Двуредов (2P) тракер: задвижване и носеща греда" : "2P tracker: drive and torque tube"} /></div>
            <div className="overflow-hidden rounded-2xl"><Photo id={REAL.trackerRowsDesert} alt={bg ? "Редове едноосови тракери в голям наземен парк" : "Rows of single-axis trackers in a large park"} /></div>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={href(lang, "contact") + "#quote"}>{bg ? "Запитване за „Стрела“" : "Ask about Strela"}</Button>
          <Button to={href(lang, "know-how")} variant="outline">{bg ? "Обратно към Ноу-хау" : "Back to Know-how"}</Button>
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
