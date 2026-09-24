import type { Project } from "@/content/site";
import type { Lang } from "@/lib/i18n";

// Until real site photos arrive, the card leads with the system's key figures instead of an image.
export default function ProjectCard({ p, lang }: { p: Project; lang: Lang }) {
  const bg = lang === "bg";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className={`relative isolate overflow-hidden p-6 text-white ${p.segment === "ci" ? "bg-ink" : "bg-brand"}`}>
        <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-white/10" />
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest">
          {p.segment === "ci" ? (bg ? "Бизнес (C&I)" : "Business (C&I)") : bg ? "Сграда / дом" : "Building / home"}
        </span>
        <dl className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <dt className="text-xs uppercase tracking-widest text-white/60">{bg ? "ФЕЦ" : "PV"}</dt>
            <dd className="text-2xl font-extrabold">{p.pv}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-white/60">{bg ? "Батерия" : "Battery"}</dt>
            <dd className="text-2xl font-extrabold">{p.bess}</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-extrabold">{p.title[lang]}</h3>
        <p className="mt-1 text-sm font-semibold text-brand">{p.region[lang]}</p>
        <p className="mt-3 text-sm text-muted">{p.equipment}</p>
      </div>
    </article>
  );
}
