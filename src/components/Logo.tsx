export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex flex-col leading-none ${light ? "text-white" : "text-ink"}`}>
      <span className="whitespace-nowrap text-[clamp(17px,5.6vw,26px)] font-extrabold tracking-[0.06em]">
        NOVAC<span className="text-brand">O</span>M
      </span>
      <span className={`mt-1 whitespace-nowrap text-[clamp(6.5px,2.2vw,10px)] font-semibold uppercase tracking-[0.28em] ${light ? "text-white/60" : "text-muted"}`}>
        Innovating renewables
      </span>
    </span>
  );
}
