"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, ui } from "@/content/site";
import { href, LANG_KEY, type Lang } from "@/lib/i18n";
import Logo from "./Logo";

function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const go = (to: Lang) => {
    try {
      localStorage.setItem(LANG_KEY, to);
    } catch {}
    router.push(pathname.replace(/^\/(bg|en)(?=\/|$)/, `/${to}`));
  };
  return (
    <div className={`flex rounded-full border border-line p-0.5 text-sm font-bold ${className}`} role="group" aria-label="Language">
      {(["bg", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => go(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 uppercase transition ${lang === l ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_#e2e7ee,0_8px_24px_-12px_rgba(11,34,57,.18)]" : ""}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:h-20">
        <Link href={href(lang)} aria-label="Novacom" className="min-w-0 shrink">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex 2xl:gap-1" aria-label="Main">
          {nav.map((item, i) => (
            <div key={item.path} className="group relative">
              <Link
                href={href(lang, item.path)}
                className="flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold text-ink hover:text-brand 2xl:px-3 2xl:text-[15px]"
              >
                {item.label[lang]}
                {item.children && (
                  <svg className="h-3.5 w-3.5 transition group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
                  </svg>
                )}
              </Link>
              {/* Dropdowns are display-based (not visibility) so a hidden menu adds no page width; the last items open leftwards so nothing pokes past the viewport. */}
              {item.children && (
                <div className={`absolute top-full hidden pt-2 group-focus-within:block group-hover:block ${i >= nav.length - 2 ? "right-0" : "left-0"}`}>
                  <ul className="min-w-64 rounded-2xl border border-line bg-white p-2 shadow-xl">
                    {item.children.map((c) => (
                      <li key={c.path}>
                        <Link href={href(lang, c.path)} className="block rounded-xl px-4 py-2.5 text-[15px] text-ink hover:bg-sky hover:text-brand">
                          {c.label[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <Link href={href(lang, "search")} aria-label={ui.search[lang]} title={ui.search[lang]} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line text-ink hover:border-brand hover:text-brand">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <LangSwitch lang={lang} className="hidden sm:flex" />
          {/* Eight menu items + BG/EN leave no room for this button between 1024 and 1279px, so it shows on tablets (burger menu) and from xl up; the hero and every section carry the same CTA. */}
          <Link
            href={href(lang, "contact") + "#quote"}
            className="hidden whitespace-nowrap rounded-xl border-2 border-ink px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white md:inline-block lg:hidden xl:inline-block 2xl:px-5 2xl:text-[15px]"
          >
            {ui.quote[lang]}
          </Link>
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line lg:hidden"
            onClick={() => setOpen(true)}
            aria-label={ui.menu[lang]}
            aria-expanded={open}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom bar on phones/tablets, like gridex.tech: a horizontally scrollable strip with every section, plus a pinned Menu button that opens the full menu with submenus */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label={lang === "bg" ? "Бързо меню" : "Quick menu"}
      >
        <div className="relative min-w-0 flex-1">
          <div className="no-scrollbar flex overflow-x-auto scroll-smooth">
            {[
              { to: href(lang), l: lang === "bg" ? "Начало" : "Home", d: "M3 11 12 3l9 8v10h-6v-6H9v6H3z" },
              { to: href(lang, "search"), l: lang === "bg" ? "Търси" : "Search", d: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5" },
              { to: href(lang, "solutions/industry"), l: lang === "bg" ? "Решения" : "Solutions", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
              { to: href(lang, "products"), l: lang === "bg" ? "Продукти" : "Products", d: "M3 7l9-4 9 4-9 4zM3 7v10l9 4V11M21 7v10l-9 4" },
              { to: href(lang, "services/consulting"), l: lang === "bg" ? "Услуги" : "Services", d: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" },
              { to: href(lang, "projects"), l: lang === "bg" ? "Проекти" : "Projects", d: "M4 20h16M6 20V10l6-4 6 4v10M10 20v-5h4v5" },
              { to: href(lang, "know-how"), l: lang === "bg" ? "Ноу-хау" : "Know-how", d: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.4 1 2.5h6c0-1.1.3-1.9 1-2.5A6 6 0 0 0 12 3z" },
              { to: href(lang, "news"), l: lang === "bg" ? "Новини" : "News", d: "M4 5h12v14H6a2 2 0 0 1-2-2zM16 9h4v8a2 2 0 0 1-2 2M7 9h6M7 13h6M7 16h4" },
              { to: href(lang, "about"), l: lang === "bg" ? "За нас" : "About", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" },
              { to: href(lang, "contact"), l: lang === "bg" ? "Контакт" : "Contact", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
            ].map((t) => (
              <Link key={t.to} href={t.to} className="flex min-w-[76px] shrink-0 flex-col items-center gap-1 px-2 py-2 text-[11px] font-bold leading-none text-muted hover:text-ink">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
                  <path d={t.d} />
                </svg>
                <span className="whitespace-nowrap">{t.l}</span>
              </Link>
            ))}
          </div>
          {/* fade hint that the strip scrolls */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
        <button onClick={() => setOpen(true)} className="flex w-[72px] shrink-0 flex-col items-center gap-1 bg-ink py-2 text-[11px] font-bold leading-none text-white" aria-label={ui.menu[lang]}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          {ui.menu[lang]}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) {
                setOpen(false);
                setSub(null);
              }
            }}
          >
            <div className="flex h-18 items-center justify-between border-b border-line px-4 sm:px-6">
              <Logo />
              <button className="grid h-11 w-11 place-items-center rounded-xl border border-line" onClick={() => setOpen(false)} aria-label={ui.close[lang]}>
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-2 sm:px-6" aria-label="Mobile">
              <Link href={href(lang, "search")} className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-line px-4 py-3 text-lg font-bold text-ink">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                {ui.search[lang]}
              </Link>
              {nav.map((item, i) => (
                <div key={item.path} className="border-b border-line">
                  {item.children ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-4 text-left text-lg font-bold"
                        onClick={() => setSub(sub === i ? null : i)}
                        aria-expanded={sub === i}
                      >
                        {item.label[lang]}
                        <svg className={`h-5 w-5 transition ${sub === i ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
                        </svg>
                      </button>
                      {sub === i && (
                        <ul className="pb-3">
                          {item.children.map((c) => (
                            <li key={c.path}>
                              <Link href={href(lang, c.path)} className="block rounded-lg px-3 py-2.5 text-muted hover:bg-sky hover:text-brand">
                                {c.label[lang]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={href(lang, item.path)} className="block py-4 text-lg font-bold">
                      {item.label[lang]}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex items-center gap-3 border-t border-line p-4 sm:px-6">
              <LangSwitch lang={lang} />
              <Link href={href(lang, "contact") + "#quote"} className="flex-1 rounded-xl bg-ink py-3 text-center font-bold text-white">
                {ui.quote[lang]}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
