import type { Lang } from "@/lib/i18n";
import { Reveal } from "./ui";


// Headline numbers from the 2026 TU Sofia study (MDPI Electronics): MILP dispatch of an
// industrial PV–battery prosumer community on the Bulgarian day-ahead market, using Suntech SunStorage PRO
// hardware envelopes and twelve months of IBEX prices. Data and code are open on GitHub.
export const researchStats = (bg: boolean) => [
  { n: "+122%", t: bg ? "приход на ФЕЦ 98,56 kWp след добавяне на Suntech 261 kWh (×2,1)" : "revenue of a 98.56 kWp plant after adding a Suntech 261 kWh cabinet (×2.1)" },
  { n: "−45%", t: bg ? "пиково потребление от мрежата с оптимизация на пика в EMS" : "grid peak with peak-aware optimisation in the EMS" },
  { n: "−47%", t: bg ? "разходи за енергия на производствен обект с ФЕЦ + батерия" : "energy cost of a manufacturing site with PV + battery" },
  { n: "41%", t: bg ? "собствено потребление при координирано управление (от 32%)" : "self-consumption under coordinated control (from 32%)" },
];

export default function ResearchResults({ lang, dark = false }: { lang: Lang; dark?: boolean }) {
  const bg = lang === "bg";
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {researchStats(bg).map((k, i) => (
          <Reveal key={k.n} delay={i * 0.05}>
            <div className={`h-full rounded-2xl p-6 ${dark ? "bg-white/5 ring-1 ring-white/10" : "border border-line bg-white"}`}>
              <p className={`text-3xl font-extrabold sm:text-4xl ${dark ? "text-[#b5d86a]" : "text-brand"}`}>{k.n}</p>
              <p className={`mt-2 text-sm ${dark ? "text-white/75" : "text-muted"}`}>{k.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-5">
        <p className={`text-sm ${dark ? "text-white/60" : "text-muted"}`}>
          {bg
            ? "Резултати от научно изследване на екип от ТУ-София с участието на Novacom (2026): MILP модел на общност от три индустриални просуматора с оборудване Suntech SunStorage PRO и 12 месеца реални цени от БНЕБ. Данните и кодът са публикувани в "
            : "Results of a 2026 study by a TU Sofia team with Novacom's participation: a MILP model of a community of three industrial prosumers with Suntech SunStorage PRO equipment and twelve months of real IBEX prices. Data and code are published on "}
          <span className="font-bold">IBEX (БНЕБ)</span>.
          {bg ? " Стойностите са симулационни, за конкретните обекти в изследването." : " Values are simulated, for the specific sites in the study."}
        </p>
      </Reveal>
    </div>
  );
}
