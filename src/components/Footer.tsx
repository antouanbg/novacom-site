import Link from "next/link";
import { about, contact, services, solutions, ui } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import Logo from "./Logo";

export default function Footer({ lang }: { lang: Lang }) {
  const cols = [
    { title: { bg: "Решения", en: "Solutions" }, links: solutions.map((s) => ({ label: s.title, path: `solutions/${s.slug}` })) },
    { title: { bg: "Услуги", en: "Services" }, links: services.map((s) => ({ label: s.title, path: `services/${s.slug}` })) },
    { title: { bg: "За нас", en: "About" }, links: [...about, { path: "know-how", label: { bg: "Ноу-хау", en: "Know-how" } }, { path: "projects", label: { bg: "Проекти", en: "Projects" } }] },
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
          <span>novacom.bg</span>
        </div>
      </div>
    </footer>
  );
}
