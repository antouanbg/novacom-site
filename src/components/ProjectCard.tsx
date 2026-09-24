import { projectStatus, type Project } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { Photo } from "./ui";

export default function ProjectCard({ p, lang, featured = false }: { p: Project; lang: Lang; featured?: boolean }) {
  const bg = lang === "bg";
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white ${featured ? "sm:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]"}`}>
        <Photo id={p.img} alt={p.title[lang]} className="transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
            {p.segment === "ci" ? (bg ? "Бизнес (C&I)" : "Business (C&I)") : bg ? "Дом / сграда" : "Home / building"}
          </span>
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold text-white ${p.status === "done" ? "bg-leaf" : p.status === "progress" ? "bg-brand" : "bg-ink/80"}`}>
            {projectStatus[p.status][lang]}
          </span>
        </div>
        {!p.photoReal && (
          <span className="absolute bottom-2 right-3 rounded bg-ink/50 px-1.5 py-0.5 text-[10px] text-white/80">
            {bg ? "илюстративна снимка" : "illustrative photo"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <dl className="flex flex-wrap gap-x-6 gap-y-2">
          {p.pv && (
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-muted">{bg ? "ФЕЦ" : "PV"}</dt>
              <dd className={`font-extrabold ${featured ? "text-3xl" : "text-2xl"}`}>{p.pv}</dd>
            </div>
          )}
          {p.bess && (
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-muted">{bg ? "Батерия" : "Battery"}</dt>
              <dd className={`font-extrabold ${featured ? "text-3xl" : "text-2xl"}`}>{p.bess}</dd>
            </div>
          )}
        </dl>
        <h3 className={`mt-3 font-extrabold ${featured ? "text-2xl" : "text-lg"}`}>{p.title[lang]}</h3>
        <p className="mt-1 text-sm font-semibold text-brand">
          {p.region[lang]} · {p.year}
        </p>
        <p className="mt-2 text-sm text-muted">{p.equipment[lang]}</p>
      </div>
    </article>
  );
}
