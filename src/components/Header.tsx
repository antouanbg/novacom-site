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
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link href={href(lang)} aria-label="Novacom" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
          {nav.map((item) => (
            <div key={item.path} className="group relative">
              <Link
                href={href(lang, item.path)}
                className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-ink hover:text-brand xl:px-3 xl:text-[15px]"
              >
                {item.label[lang]}
                {item.children && (
                  <svg className="h-3.5 w-3.5 transition group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
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

        <div className="flex items-center gap-2 lg:gap-3">
          <LangSwitch lang={lang} className="hidden sm:flex" />
          <Link
            href={href(lang, "contact") + "#quote"}
            className="hidden rounded-xl border-2 border-ink px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white md:inline-block xl:px-5 xl:text-[15px]"
          >
            {ui.quote[lang]}
          </Link>
          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden"
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
