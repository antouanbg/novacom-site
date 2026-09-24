"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { photo, ui } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Photo({ id, alt, className = "", priority = false }: { id: string; alt: string; className?: string; priority?: boolean }) {
  // `id` is either an Unsplash photo id or a local path under /public (real client photos).
  const local = id.startsWith("/");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={local ? id : photo(id, 1200)}
      srcSet={local ? undefined : `${photo(id, 640)} 640w, ${photo(id, 1200)} 1200w, ${photo(id, 1920)} 1920w`}
      sizes="(max-width: 768px) 100vw, 50vw"
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-leaf">{children}</p>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[44px] ${className}`}>{children}</h2>;
}

export function Button({ to, children, variant = "dark" }: { to: string; children: ReactNode; variant?: "dark" | "outline" | "light" }) {
  const styles = {
    dark: "bg-ink text-white hover:bg-ink-2",
    outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
    light: "bg-white text-ink hover:bg-sky",
  }[variant];
  return (
    <Link href={to} className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold transition ${styles}`}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

export function PageHero({ lang, eyebrow, title, text, img }: { lang: Lang; eyebrow: string; title: string; text?: string; img: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 opacity-45">
        <Photo id={img} alt="" priority />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#b5d86a]">{eyebrow}</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg text-white/80">{text}</p>}
          <div className="mt-8">
            <Button to={href(lang, "contact") + "#quote"} variant="light">
              {ui.quote[lang]}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CTA({ lang }: { lang: Lang }) {
  return (
    <Section>
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand px-6 py-14 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 right-24 -z-10 h-72 w-72 rounded-full bg-white/10" />
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">{ui.ctaTitle[lang]}</h2>
          <p className="mt-4 max-w-xl text-lg text-white/85">{ui.ctaText[lang]}</p>
          <div className="mt-8">
            <Button to={href(lang, "contact") + "#quote"} variant="light">
              {ui.quote[lang]}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-light text-sm font-extrabold text-leaf" aria-hidden>
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function MonitoringPromo({ lang }: { lang: Lang }) {
  const bg = lang === "bg";
  return (
    <Section className="bg-leaf-light">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{bg ? "Включено за всеки клиент" : "Included for every client"}</Eyebrow>
            <H2>{bg ? "Безплатен мониторинг и поддръжка 24/365" : "Free 24/365 monitoring and support"}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Всяка наша система се наблюдава денонощно, 365 дни в годината, без допълнително заплащане. Всеки клиент получава безплатни SMS известия чрез платформата gridex.tech."
                : "Every system we build is monitored around the clock, 365 days a year, at no extra cost. Every client gets free SMS alerts through the gridex.tech platform."}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <ul className="space-y-3 text-lg">
              <Check>{bg ? "Мониторинг 24/365" : "24/365 monitoring"}</Check>
              <Check>{bg ? "Безплатна поддръжка" : "Free support"}</Check>
              <Check>{bg ? "Безплатни SMS известия" : "Free SMS alerts"}</Check>
            </ul>
            <a
              href="https://gridex.tech/"
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-bold text-white transition hover:bg-ink-2"
            >
              gridex.tech ↗
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
