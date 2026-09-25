// Site search index, built at build time from the content files (no external service).
// Every document is one page or one entry with a title, the text to search in and where it lives.
import { about, gallery, news, products, projects, services, solutions, utilityModels, GRIDEX_REPOS } from "@/content/site";
import { href, type Lang } from "./i18n";

export type SearchDoc = { title: string; text: string; href: string; section: string };

type Anything = unknown;

// Collect every string of one language from a content object: plain strings as they are,
// {bg, en} objects by the requested language, arrays and nested objects recursively.
function textOf(v: Anything, lang: Lang, out: string[] = []): string[] {
  if (v == null) return out;
  if (typeof v === "string") {
    if (!v.startsWith("/images/") && !/^[0-9a-f-]{20,}$/.test(v)) out.push(v);
    return out;
  }
  if (Array.isArray(v)) {
    v.forEach((x) => textOf(x, lang, out));
    return out;
  }
  if (typeof v === "object") {
    const o = v as Record<string, Anything>;
    if (typeof o.bg === "string" && typeof o.en === "string") {
      out.push(o[lang] as string);
      return out;
    }
    Object.entries(o).forEach(([k, x]) => {
      if (k === "img" || k === "src" || k === "slug" || k === "path" || k === "to" || k === "url" || k === "date") return;
      textOf(x, lang, out);
    });
  }
  return out;
}

const L = (v: Anything, lang: Lang) => (typeof v === "string" ? v : ((v as Record<Lang, string>)?.[lang] ?? ""));

export function buildIndex(lang: Lang): SearchDoc[] {
  const bg = lang === "bg";
  const sec = {
    solutions: bg ? "Решения" : "Solutions",
    products: bg ? "Продукти" : "Products",
    services: bg ? "Услуги" : "Services",
    projects: bg ? "Проекти" : "Projects",
    news: bg ? "Новини" : "News",
    knowHow: bg ? "Ноу-хау" : "Know-how",
    about: bg ? "За нас" : "About",
    pages: bg ? "Страници" : "Pages",
  };
  const docs: SearchDoc[] = [];
  const add = (title: string, v: Anything, to: string, section: string) =>
    docs.push({ title, text: textOf(v, lang).join(" · "), href: to, section });

  solutions.forEach((s) => add(L(s.title, lang), s, href(lang, `solutions/${s.slug}`), sec.solutions));
  products.forEach((p) => add(L(p.title, lang), p, href(lang, `products/${p.slug}`), sec.products));
  services.forEach((s) => add(L(s.title, lang), s, href(lang, `services/${s.slug}`), sec.services));
  projects.forEach((p) => add(L((p as { title: Anything }).title, lang), p, href(lang, "projects"), sec.projects));
  news.forEach((n) => add(L(n.title, lang), n, href(lang, "news") + `#${n.slug}`, sec.news));
  utilityModels.forEach((m) => add(L((m as { title: Anything }).title, lang), m, href(lang, "know-how") + "#models", sec.knowHow));
  about.forEach((a) => add(L(a.label, lang), a, href(lang, a.path), sec.about));
  add(bg ? "Галерия от обекти" : "Project gallery", gallery, href(lang, "projects"), sec.projects);
  add("GrideX Energy OS (GitHub)", GRIDEX_REPOS, href(lang, "products/monitoring"), sec.knowHow);

  // Pages whose text lives in the page files rather than in the content model.
  const pages: [string, string, string][] = bg
    ? [
        ["", "Начало", "Novacom: фотоволтаични централи, батерии Suntech, зарядни станции и EMS GrideX за бизнеса и дома. C&I, BESS, безплатен мониторинг 24/365, супер ниски цени за проектиране, тракер Стрела +45%."],
        ["know-how", "Ноу-хау", "Тракер Стрела, EMS GrideX с отворен код (MIT), полезни модели, IEEE публикации, Обединен енергиен клъстер, V2G-Hybrid-Charge, GridMobility, eHUB, проучване +122% приход, −45% пик."],
        ["know-how/strela", "Тракер „Стрела“", "Двуосов соларен тракер на един носещ стълб със сезонно рамо, 6 двулицеви модула, 3,5 kWp, до 45% по-висок добив, анимиран модел, мобилна версия на ремарке, 2P тракери."],
        ["projects", "Проекти", "Реализирани обекти: Перник 2 MW ФЕЦ с батерия 2,5 MWh, Михайлово 261 kWh, покривни и наземни централи, навеси, зарядни станции, галерия със снимки."],
        ["news", "Новини", "Intersolar Europe 2026 Мюнхен, безплатен оглед и европейско финансиране, GrideX отворен код, Перник, Стрела, Михайлово, V2G, HY Solar Group Suntech, ОЕК."],
        ["contact", "Контакт и оферта", "Поискай оферта: форма за запитване, телефон 088 760 2323, support@novacom.bg, безплатен оглед на обекта."],
        ["products", "Всички продукти", "Панели Suntech, инвертори, батерии SunStorage Pro 261 kWh, конструкции, EMS и мониторинг, зарядни станции, ветрогенератори до 3 kW, соларни навеси."],
      ]
    : [
        ["", "Home", "Novacom: solar PV plants, Suntech batteries, EV chargers and the GrideX EMS for business and home. C&I, BESS, free 24/365 monitoring, very low design prices, Strela tracker +45%."],
        ["know-how", "Know-how", "Strela tracker, open-source GrideX EMS (MIT), utility models, IEEE publications, United Energy Cluster, V2G-Hybrid-Charge, GridMobility, eHUB, study +122% revenue, −45% peak."],
        ["know-how/strela", "Strela tracker", "Two-axis solar tracker on a single mast with a seasonal arm, 6 bifacial modules, 3.5 kWp, up to 45% higher yield, animated model, mobile trailer version, 2P trackers."],
        ["projects", "Projects", "Completed sites: Pernik 2 MW PV with 2.5 MWh battery, Mihaylovo 261 kWh, rooftop and ground-mounted plants, carports, EV chargers, photo gallery."],
        ["news", "News", "Intersolar Europe 2026 Munich, free site survey and EU funding, GrideX open source, Pernik, Strela, Mihaylovo, V2G, HY Solar Group Suntech, energy cluster."],
        ["contact", "Contact and quote", "Request a quote: enquiry form, phone +359 88 760 2323, support@novacom.bg, free site survey."],
        ["products", "All products", "Suntech modules, inverters, SunStorage Pro 261 kWh batteries, mounting, EMS and monitoring, EV chargers, wind turbines up to 3 kW, solar carports."],
      ];
  pages.forEach(([p, t, x]) => add(t, x, href(lang, p), sec.pages));
  return docs;
}
