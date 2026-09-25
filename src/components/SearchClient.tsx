"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SearchDoc } from "@/lib/searchIndex";
import type { Lang } from "@/lib/i18n";

const norm = (s: string) => s.toLowerCase().replace(/[„“"'’«»()[\],;:!?]/g, " ").replace(/\s+/g, " ").trim();
// Light stemming so "батерия" also finds "батерии"/"батерийна": drop the last one or two letters of longer words.
const stem = (t: string) => (t.length >= 6 ? t.slice(0, -2) : t.length >= 5 ? t.slice(0, -1) : t);
const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function snippet(text: string, tokens: string[]) {
  const n = norm(text);
  let at = -1;
  for (const t of tokens) {
    at = n.indexOf(t);
    if (at >= 0) break;
  }
  if (at < 0) return text.slice(0, 160) + (text.length > 160 ? "…" : "");
  const start = Math.max(0, at - 70);
  const end = Math.min(text.length, at + 110);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map((t) => esc(t) + "[\\p{L}\\p{N}]*").join("|")})`, "giu");
  return (
    <>
      {text.split(re).map((part, i) =>
        part && tokens.some((t) => norm(part).startsWith(t)) ? (
          <mark key={i} className="rounded bg-[#e8f3c9] px-0.5 text-ink">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function SearchClient({ lang, docs }: { lang: Lang; docs: SearchDoc[] }) {
  const bg = lang === "bg";
  // ?q= in the address seeds the box so links to /search/?q=… work; typing keeps the address in sync.
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [q]);

  const tokens = useMemo(() => norm(q).split(" ").filter((t) => t.length >= 2).map(stem), [q]);
  const results = useMemo(() => {
    if (!tokens.length) return [];
    return docs
      .map((d) => {
        const t = norm(d.title);
        const x = norm(d.text);
        if (!tokens.every((k) => t.includes(k) || x.includes(k))) return null;
        const score = tokens.reduce((s, k) => s + (t.includes(k) ? 5 : 0) + (x.split(k).length - 1), 0);
        return { d, score };
      })
      .filter((r): r is { d: SearchDoc; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
  }, [docs, tokens]);

  const google = `https://www.google.com/search?q=${encodeURIComponent(`site:novacom.bg ${q}`)}`;

  return (
    <div>
      <label className="block">
        <span className="sr-only">{bg ? "Търсене" : "Search"}</span>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white px-4 py-3 focus-within:border-brand">
          <svg className="h-6 w-6 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            placeholder={bg ? "напр. батерия 261, Стрела, навес, оферта…" : "e.g. battery 261, Strela, carport, quote…"}
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted/70"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} className="text-sm font-bold text-muted hover:text-ink" aria-label={bg ? "Изчисти" : "Clear"}>
              ✕
            </button>
          )}
        </div>
      </label>

      {tokens.length > 0 && (
        <p className="mt-4 text-sm text-muted">
          {bg ? `${results.length} резултата на сайта` : `${results.length} results on this site`}
          {" · "}
          <a href={google} target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">
            {bg ? "Търси същото в Google (site:novacom.bg) ↗" : "Search the same in Google (site:novacom.bg) ↗"}
          </a>
        </p>
      )}

      <ul className="mt-6 divide-y divide-line">
        {results.map(({ d }) => (
          <li key={d.href + d.title} className="py-4">
            <Link href={d.href} className="group block">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{d.section}</p>
              <p className="mt-1 text-lg font-extrabold text-ink group-hover:text-brand">
                <Highlight text={d.title} tokens={tokens} />
              </p>
              <p className="mt-1 text-muted">
                <Highlight text={snippet(d.text, tokens)} tokens={tokens} />
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {tokens.length > 0 && results.length === 0 && (
        <div className="mt-6 rounded-2xl bg-mist p-6">
          <p className="font-bold">{bg ? "Няма съвпадения на сайта." : "No matches on this site."}</p>
          <p className="mt-2 text-muted">
            {bg ? "Опитайте с друга дума или " : "Try another word or "}
            <a href={google} target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">
              {bg ? "потърсете в Google" : "search in Google"}
            </a>
            {bg ? ". За оферта се обадете на 088 760 2323." : ". For a quote call +359 88 760 2323."}
          </p>
        </div>
      )}

      {!tokens.length && (
        <div className="mt-6 flex flex-wrap gap-2">
          {(bg
            ? ["батерия 261 kWh", "Suntech", "Стрела", "навес", "зарядна станция", "EMS GrideX", "оферта", "Перник"]
            : ["261 kWh battery", "Suntech", "Strela", "carport", "EV charger", "GrideX EMS", "quote", "Pernik"]
          ).map((s) => (
            <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
