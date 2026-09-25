export default function Logo({ light = false }: { light?: boolean }) {
  // Sizes scale with the viewport below lg and the whole mark clips inside its box, so with large
  // system fonts or narrow phones it can never spill over the search/menu buttons next to it.
  return (
    <span className={`flex min-w-0 max-w-full flex-col overflow-hidden leading-none ${light ? "text-white" : "text-ink"}`}>
      <span className="whitespace-nowrap text-[clamp(16px,5.4vw,26px)] font-extrabold tracking-[0.06em] lg:text-[26px]">
        NOVAC<span className="text-brand">O</span>M
      </span>
      <span className={`mt-1 whitespace-nowrap text-[clamp(5px,1.9vw,10px)] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.28em] lg:text-[10px] ${light ? "text-white/60" : "text-muted"}`}>
        Innovating renewables
      </span>
    </span>
  );
}
