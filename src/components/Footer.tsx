import Link from "next/link";
import { about, contact, services, solutions, ui } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import Logo from "./Logo";

export default function Footer({ lang }: { lang: Lang }) {
  const cols = [
    { title: { bg: "Решения", en: "Solutions" }, links: solutions.map((s) => ({ label: s.title, path: `solutions/${s.slug}` })) },
    { title: { bg: "Услуги", en: "Services" }, links: services.map((s) => ({ label: s.title, path: `services/${s.slug}` })) },
    { title: { bg: "За нас", en: "About" }, links: [...about, { path: "know-how", label: { bg: "Ноу-хау", en: "Know-how" } }, { path: "news", label: { bg: "Новини", en: "News" } }, { path: "projects", label: { bg: "Проекти", en: "Projects" } }] },
  ];
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-5 max-w-sm text-white/70">
            {lang === "bg"
              ? "Фотоволтаични централи и системи за съхранение на енергия за бизнеса и дома."
              : "Solar PV plants and energy storage systems for business and home."}
          </p>
          <div className="mt-6 space-y-2 font-semibold">
            <a href={contact.phoneHref} className="block hover:text-brand">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="block hover:text-brand">{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title.en}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">{c.title[lang]}</h3>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.path}>
                  <Link href={href(lang, l.path)} className="text-white/80 hover:text-white">{l.label[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-6 text-sm text-white/50 sm:px-6">
          <span>© {new Date().getFullYear()} Novacom Corp. {ui.rights[lang]}</span>
          <Link href={href(lang, "search")} className="hover:text-white">{ui.search[lang]}</Link>
        </div>
      </div>
    </footer>
  );
}
