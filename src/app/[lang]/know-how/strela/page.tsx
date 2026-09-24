import type { Metadata } from "next";
import { REAL } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import StrelaModel from "@/components/StrelaModel";
import { Button, Check, CTA, Eyebrow, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(
    lang,
    "know-how/strela",
    bg ? "Тракер „Стрела“: модел и конструкция" : "Strela tracker: model and design",
    bg
      ? "Интерактивен модел, конструктивни чертежи и спецификация на соларния тракер „Стрела“ на Novacom: собствен дизайн, 3,5 kWp стринг, до 45% по-висок добив."
      : "Interactive model, engineering drawings and specification of Novacom's Strela solar tracker: own design, 3.5 kWp string, up to 45% higher yield.",
  );
}

const drawings = [
  { src: "/images/strela/aa-02-assembly.webp", bg: "Сглобен възел: колона, лагерна основа и рамо", en: "Assembly: column, bearing base and arm" },
  { src: "/images/strela/axle-unit-01.webp", bg: "Лагерен възел на оста с вал от редуктора", en: "Axle bearing unit with the gearbox shaft" },
  { src: "/images/strela/aa-02-05-arm.webp", bg: "Рамо към актуатора", en: "Actuator arm" },
  { src: "/images/strela/aa-02-01-plate.webp", bg: "Основна планка на колоната, 8 mm", en: "Column base plate, 8 mm" },
  { src: "/images/strela/aa-02-06-bracket.webp", bg: "Опора на актуатора", en: "Actuator bracket" },
  { src: "/images/strela/aa-01-02-shaft.webp", bg: "Вал Ø25 h9, разрез A-A", en: "Shaft Ø25 h9, section A-A" },
];

export default async function StrelaPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const specs = [
    [bg ? "Тип" : "Type", bg ? "Едноосов тракер със завъртане 120°, наклон 25–45°" : "Single-axis tracker, 120° rotation, 25–45° tilt"],
    [bg ? "Модули" : "Modules", bg ? "6 (разширяем до 8) двулицеви, 2300 × 1200 mm, ≈ 3,5 kWp" : "6 (expandable to 8) bifacial, 2300 × 1200 mm, ≈ 3.5 kWp"],
    [bg ? "Добив" : "Yield", bg ? "До 45% повече от фиксирана конструкция" : "Up to 45% more than a fixed structure"],
    [bg ? "Задвижване" : "Drive", bg ? "Електрически линеен актуатор (клас LINAK LA37) или червячен редуктор" : "Electric linear actuator (LINAK LA37 class) or worm gearbox"],
    [bg ? "Носимоспособност" : "Load rating", bg ? "450 kg статично + вятър до 140 km/h" : "450 kg static + wind up to 140 km/h"],
    [bg ? "Материали" : "Materials", bg ? "Поцинковани профили, болтови връзки без заваряване, непрекъснато заземяване" : "Galvanised profiles, bolted (no welding), continuous earthing"],
    [bg ? "Монтаж" : "Mounting", bg ? "Бетонни пети или ремарке (мобилна версия)" : "Concrete footings or a trailer (mobile version)"],
  ];

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "Ноу-хау · Изобретение" : "Know-how · Invention"}
        title={bg ? "Тракер „Стрела“: модел и конструкция" : "Strela tracker: model and design"}
        text={bg ? "Собствен дизайн и разработка на Novacom. Единственият български соларен тракер, произвеждан у нас." : "Designed and developed by Novacom. The only Bulgarian-made solar tracker."}
        img={REAL.trackerField}
      />

      <Section id="model">
        <Reveal>
          <Eyebrow>{bg ? "Интерактивен модел" : "Interactive model"}</Eyebrow>
          <H2>{bg ? "Как работи „Стрела“" : "How Strela works"}</H2>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            {bg
              ? "Шест двулицеви модула са закрепени на носеща ос, която лежи на лагери върху две колони. Електрически актуатор на високата колона завърта оста през деня, така че панелите следват слънцето от изток на запад. Плъзнете, за да завъртите модела."
              : "Six bifacial modules sit on a torque tube that rests on bearings on two columns. An electric actuator on the tall column rotates the tube through the day so the modules follow the sun from east to west. Drag to rotate the model."}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <StrelaModel lang={lang} />
        </Reveal>
      </Section>

      <Section className="bg-mist" id="spec">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Спецификация" : "Specification"}</Eyebrow>
            <H2>{bg ? "Технически данни" : "Technical data"}</H2>
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
              {specs.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[150px_1fr]">
                  <dt className="text-sm font-bold uppercase tracking-widest text-muted">{k}</dt>
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
              <Check>{bg ? "Всички детайли са с чертежи за производство в България" : "Every part has production drawings for manufacture in Bulgaria"}</Check>
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="drawings">
        <Reveal>
          <Eyebrow>{bg ? "Конструкция" : "Engineering"}</Eyebrow>
          <H2>{bg ? "Конструктивни чертежи" : "Engineering drawings"}</H2>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            {bg
              ? "Извадка от производствената документация: лагерен възел на оста, рамо на актуатора, планки и опори. Пълният комплект (DWG/IPT) е наличен при запитване за производство или лиценз."
              : "Excerpts from the production documentation: axle bearing unit, actuator arm, plates and brackets. The full DWG/IPT set is available on request for manufacturing or licensing."}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drawings.map((d, i) => (
            <Reveal key={d.src} delay={(i % 3) * 0.05}>
              <figure className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="aspect-[3/4] overflow-hidden bg-white p-2">
                  <Photo id={d.src} alt={bg ? d.bg : d.en} className="object-contain" />
                </div>
                <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">{bg ? d.bg : d.en}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <figure className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="aspect-[16/9] overflow-hidden">
              <Photo id="/images/strela/frame-sketch.webp" alt={bg ? "Скица на металната носеща конструкция, 4400 × 4100 mm" : "Sketch of the steel support frame, 4400 × 4100 mm"} className="object-contain" />
            </div>
            <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
              {bg ? "Ръчна скица на носещата рамка: 4400 × 4100 mm, опорна колона 125/125/5, височина 2800 mm" : "Hand sketch of the support frame: 4400 × 4100 mm, 125/125/5 column, 2800 mm height"}
            </figcaption>
          </figure>
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
