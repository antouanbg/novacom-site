import type { Metadata } from "next";
import Link from "next/link";
import { news, products, projects, REAL, services, solutions, ui } from "@/content/site";
import ProjectCard from "@/components/ProjectCard";
import StrelaModel from "@/components/StrelaModel";
import ResearchResults from "@/components/ResearchResults";
import { href, type Lang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { Button, CTA, Eyebrow, H2, MonitoringPromo, Photo, Reveal, Section } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const m = seo(
    lang,
    "",
    lang === "bg" ? "Фотоволтаични централи и батерии Suntech за бизнеса и дома" : "Solar PV and Suntech battery storage for business and home",
    lang === "bg"
      ? "Оферта, доставка и монтаж на ФЕЦ и батерийни системи Suntech от 261 kWh за индустрия, търговия и земеделие. Безплатен мониторинг и поддръжка 24/365."
      : "Quotes, supply and installation of PV plants and Suntech 261 kWh battery systems for industry, commerce and agriculture. Free 24/365 monitoring and support.",
  );
  return { ...m, title: { absolute: `Novacom | ${m.title}` } };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const pillars = [
    {
      t: bg ? "Супер ниски цени за проектиране" : "Very low design prices",
      d: bg
        ? "Проектиране на ФЕЦ, батерийни системи и присъединяване на едни от най-ниските цени на пазара, с безплатен първоначален енергиен и финансов анализ."
        : "Design of PV plants, battery systems and grid connection at some of the lowest prices on the market, with a free initial energy and financial analysis.",
    },
    {
      t: bg ? "Цялостно решение „до ключ“" : "Complete turnkey solution",
      d: bg
        ? "Поемаме всичко: от проекта и документите до доставката, монтажа и присъединяването."
        : "We handle everything, from design and permits to supply, installation and grid connection.",
    },
    {
      t: bg ? "Технологии и опит" : "Technology and experience",
      d: bg
        ? "Над 30 години в ИТ и комуникациите. Затова нашите централи са наблюдавани, интегрирани и управляеми."
        : "30+ years in IT and communications, so our plants are monitored, integrated and manageable.",
    },
  ];

  const entry = [solutions[0], solutions[1], solutions[3]];

  return (
    <>
      {/* Hero */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <Reveal>
            <Eyebrow>{bg ? "ФЕЦ · BESS · C&I" : "Solar · BESS · C&I"}</Eyebrow>
            <h1 className="break-words text-[2rem] font-extrabold leading-[1.1] [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
              {bg ? (
                <>Соларна енергия и <span className="text-brand">съхранение</span> за вашия бизнес и дом</>
              ) : (
                <>Solar power and <span className="text-brand">energy storage</span> for your business and home</>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {bg
                ? "Оферта, доставка и монтаж на фотоволтаични централи, батерийни системи и зарядни станции за електромобили за индустрия, търговия и земеделие, включително шкафови системи от 261 kWh и по-големи."
                : "Quotes, supply and installation of PV plants, battery systems and EV charging stations for industry, commerce and agriculture, including 261 kWh cabinets and larger."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={href(lang, "contact") + "#quote"}>{ui.quote[lang]}</Button>
              <Button to={href(lang, "solutions/industry")} variant="outline">
                {bg ? "Решения за бизнеса" : "Business solutions"}
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["30+", bg ? "години опит" : "years of experience"],
                ["50+", bg ? "завършени проекта" : "completed projects"],
                ["261 kWh", bg ? "шкафови системи BESS" : "BESS cabinet systems"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-extrabold sm:text-3xl">{n}</dt>
                  <dd className="mt-1 break-words text-sm text-muted [overflow-wrap:anywhere]">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:aspect-[5/6]">
              <Photo id={REAL.pernikSky} alt={bg ? "Фотоволтаичен парк 2 MW в Перник, обект на Novacom" : "2 MW solar park in Pernik, a Novacom site"} priority />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-white p-4 shadow-xl sm:left-auto sm:right-6 sm:w-72">
              <p className="text-sm font-bold">{bg ? "Супер ниски цени за проектиране" : "Very low design prices"}</p>
              <p className="mt-1 text-sm text-muted">{bg ? "Проекти за ФЕЦ и батерийни системи, плюс безплатен оглед" : "Designs for PV plants and battery systems, plus a free site survey"}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Know-how teaser with the live Strela model: visitors should see on the first screen that we build our own technology */}
      <Section className="bg-ink text-white">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Reveal>
            <div className="rounded-3xl bg-white p-3 shadow-2xl sm:p-4">
              <StrelaModel lang={lang} compact frameless />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Собствено ноу-хау" : "Our own know-how"}</p>
            <H2>{bg ? "Не само доставяме. Изобретяваме." : "We don't just supply. We invent."}</H2>
            <p className="mt-5 text-lg text-white/80">
              {bg
                ? "Тракерът „Стрела“ е собствена разработка на Novacom: двуосов, на един стълб, следи слънцето през деня и сменя наклона по сезон. Зад него стоят собствената ни EMS GrideX с отворен код (безплатна с батерия Suntech 261 kWh), четири регистрирани полезни модела и научни публикации."
                : "The Strela tracker is Novacom's own development: two-axis, single mast, tracking the sun through the day and changing tilt by season. Behind it stand our own open-source GrideX EMS (free with a Suntech 261 kWh battery), four registered utility models and scientific publications."}
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                ["+45%", bg ? "повече добив от „Стрела“ спрямо фиксирана конструкция" : "more yield from Strela than a fixed structure"],
                ["+122%", bg ? "приход на ФЕЦ с батерия Suntech 261 kWh и нашия EMS" : "plant revenue with a Suntech 261 kWh battery and our EMS"],
                ["−45%", bg ? "пиково потребление с оптимизацията в EMS" : "grid peak with the EMS optimisation"],
              ].map(([n, l]) => (
                <div key={n}>
                  <dt className="text-2xl font-extrabold text-[#b5d86a] sm:text-3xl">{n}</dt>
                  <dd className="mt-1 break-words text-xs text-white/70 [overflow-wrap:anywhere] sm:text-sm">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={href(lang, "know-how/strela")} variant="light">{bg ? "Моделът „Стрела“" : "The Strela model"}</Button>
              <Link href={href(lang, "know-how")} className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">
                {bg ? "Цялото ноу-хау" : "All know-how"} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Research-backed battery + EMS results */}
      <Section className="bg-mist" id="research">
        <Reveal>
          <Eyebrow>{bg ? "Батерия + EMS, доказано с числа" : "Battery + EMS, proven with numbers"}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <H2 className="max-w-3xl">{bg ? "Нашият EMS със собствени алгоритми за оптимизация и батерия Suntech удвояват прихода" : "Our EMS with in-house optimisation algorithms and a Suntech battery double the revenue"}</H2>
            <Button to={href(lang, "products/storage")} variant="outline">{bg ? "Батерийни системи" : "Battery systems"}</Button>
          </div>
        </Reveal>
        <div className="mt-10">
          <ResearchResults lang={lang} />
        </div>
      </Section>

      {/* Pillars */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line p-7">
                <span className="text-sm font-extrabold text-brand">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-extrabold">{p.t}</h3>
                <p className="mt-3 text-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Entry tiles */}
      <Section className="bg-mist">
        <Reveal>
          <Eyebrow>{bg ? "Решения" : "Solutions"}</Eyebrow>
          <H2>{bg ? "За кого работим" : "Who we work for"}</H2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {entry.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              {/* Text sits in normal flow with a tall top padding, so the card grows with long titles instead of the text climbing over the bright part of the photo. */}
              <Link
                href={href(lang, `solutions/${s.slug}`)}
                className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl p-6 pt-44 text-white md:min-h-[460px]"
              >
                <div className="absolute inset-0 -z-20">
                  <Photo id={s.img} alt={s.title[lang]} className="transition duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/10" />
                <h3 className="text-2xl font-extrabold">{s.title[lang]}</h3>
                <p className="mt-2 text-white/80">{s.short[lang]}</p>
                <span className="mt-4 inline-block font-bold underline-offset-4 group-hover:underline">{ui.learnMore[lang]} →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Услуги" : "Services"}</Eyebrow>
            <H2>{bg ? "Нашите услуги. Вашите решения." : "Our services. Your solutions."}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Един партньор за целия жизнен цикъл на централата: от първия разговор до поддръжката."
                : "One partner for the plant's entire life cycle, from the first conversation to maintenance."}
            </p>
            <div className="mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
              <Photo id={REAL.breakers} alt={bg ? "Електрическо табло на ФЕЦ, обект на Novacom" : "PV switchboard, a Novacom site"} />
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link href={href(lang, `services/${s.slug}`)} className="group flex h-full flex-col rounded-2xl bg-mist p-7 transition hover:bg-sky">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-lg font-extrabold text-brand">{i + 1}</span>
                  <h3 className="mt-5 text-xl font-extrabold">{s.title[lang]}</h3>
                  <p className="mt-2 flex-1 text-muted">{s.short[lang]}</p>
                  <span className="mt-4 font-bold text-brand">{ui.learnMore[lang]} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <MonitoringPromo lang={lang} />

      {/* Products */}
      <Section className="bg-ink text-white">
        <Reveal>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{bg ? "Продукти" : "Products"}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <H2 className="max-w-2xl">{bg ? "Панели и батерии Suntech за бизнеса" : "Suntech panels and batteries for business"}</H2>
            <Button to={href(lang, "products")} variant="light">{ui.allProducts[lang]}</Button>
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/85">
              {bg
                ? "Доставяме и монтираме панели и батерийни системи Suntech."
                : "We supply and install Suntech PV modules and battery systems."}
            </p>
            <a
              href="https://www.suntech-power.com/"
              target="_blank"
              rel="noopener"
              className="shrink-0 rounded-xl bg-white px-5 py-3 text-center font-bold text-ink transition hover:bg-sky"
            >
              suntech-power.com ↗
            </a>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={href(lang, `products/${p.slug}`)} className="group block h-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo id={p.img} alt={p.title[lang]} className="transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold">{p.title[lang]}</h3>
                  <p className="mt-2 text-sm text-white/70">{p.short[lang]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EV charging */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <Photo id={REAL.evOpen} alt={bg ? "Монтаж на DC и AC зарядни станции, обект на Novacom" : "DC and AC charger installation, a Novacom site"} />
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <Eyebrow>{bg ? "Зарядни системи" : "EV charging"}</Eyebrow>
            <H2>{bg ? "Зарядни станции за електромобили, захранени от вашата ФЕЦ" : "EV charging powered by your own PV plant"}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "AC и DC зарядни за дома, офиса и фирмения паркинг. Управляваме зареждането заедно с централата и батерията: колата се зарежда със слънчева енергия или при ниски цени на тока, без да се надвишава партидата."
                : "AC and DC chargers for homes, offices and company car parks. We manage charging together with your plant and battery: cars charge on solar energy or when prices are low, without exceeding your grid connection."}
            </p>
            <ul className="mt-6 space-y-3 text-lg">
              {(bg
                ? ["AC 7,4 / 11 / 22 kW и DC бързи зарядни", "Динамично управление на товара", "Отчитане по потребител, RFID и приложение"]
                : ["7.4 / 11 / 22 kW AC and DC fast chargers", "Dynamic load management", "Per-user reporting, RFID and app"]
              ).map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-light text-sm font-extrabold text-leaf" aria-hidden>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to={href(lang, "products/ev-charging")}>{bg ? "Зарядни станции" : "EV charging"}</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Projects teaser */}
      <Section>
        <Reveal>
          <Eyebrow>{bg ? "Проекти" : "Projects"}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <H2>{bg ? "Нашите проекти" : "Our projects"}</H2>
            <Button to={href(lang, "projects")} variant="outline">{ui.allProjects[lang]}</Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.slice(0, 4).map((p, i) => (
            <Reveal key={p.title.en} delay={i * 0.06}>
              <ProjectCard p={p} lang={lang} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section>
        <Reveal>
          <Eyebrow>{bg ? "Новини" : "News"}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <H2>{bg ? "Какво ново" : "What's new"}</H2>
            <Button to={href(lang, "news")} variant="outline">{bg ? "Всички новини" : "All news"}</Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.06}>
              <Link href={href(lang, n.to || "news")} className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <Photo id={n.img} alt={n.title[lang]} className="transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-brand">{new Date(n.date + "T00:00:00").toLocaleDateString(bg ? "bg-BG" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{n.title[lang]}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Know-how */}
      <Section className="bg-mist">
        <Reveal>
          <Eyebrow>{bg ? "Ноу-хау" : "Know-how"}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <H2 className="max-w-2xl">{bg ? "Собствени разработки: тракер „Стрела“, EMS и полезни модели" : "Our own developments: the Strela tracker, EMS and utility models"}</H2>
            <Button to={href(lang, "know-how")} variant="outline">{bg ? "Разгледай" : "Explore"}</Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { img: REAL.trackerField, t: bg ? "Тракер „Стрела“ (3P)" : "Strela (3P) tracker", d: bg ? "Собствен дизайн и разработка, единствен в България." : "Own design and development, unique in Bulgaria.", a: "know-how/strela" },
            { img: REAL.smaMeter, t: bg ? "Собствен EMS" : "In-house EMS", d: bg ? "Управление на енергията за големи индустриални системи." : "Energy management for large industrial systems.", a: "know-how#ems" },
            { img: REAL.bessOpen, t: bg ? "Наука и полезни модели" : "Science and utility models", d: bg ? "Научни трудове и над 4 регистрирани полезни модела." : "Publications and more than 4 registered utility models.", a: "know-how#science" },
          ].map((k, i) => (
            <Reveal key={k.t} delay={i * 0.06}>
              <Link href={href(lang, k.a)} className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <Photo id={k.img} alt={k.t} className="transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold">{k.t}</h3>
                  <p className="mt-2 text-muted">{k.d}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
