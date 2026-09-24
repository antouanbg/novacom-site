"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

// Animated 3D-style model of the Strela tracker: a single mast with a rotating head that
// follows the sun east→west through the day, and a seasonal arm that sets the tilt of the
// panel frame (steeper in winter, flatter in summer). Six bifacial modules in two rows.

type V = [number, number, number]; // x east, y north, z up (metres)

const MAST_H = 2.6;
const ARM_Z = 1.5;
const FRAME_W = 3.66; // 3 modules × 1.2 m + gaps
const FRAME_H = 4.62; // 2 modules × 2.3 m
const YAW = (32 * Math.PI) / 180; // camera turn for a 3/4 view
const PITCH = (24 * Math.PI) / 180; // camera looking down
const SCALE = 78; // px per metre

function project([x, y, z]: V, ox: number, oy: number): [number, number] {
  const x1 = x * Math.cos(YAW) - y * Math.sin(YAW);
  const y1 = x * Math.sin(YAW) + y * Math.cos(YAW);
  return [ox + x1 * SCALE, oy - (z * Math.cos(PITCH) - y1 * Math.sin(PITCH)) * SCALE];
}

function rotZ([x, y, z]: V, a: number): V {
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
}

export default function StrelaModel({ lang, compact = false, frameless = false }: { lang: Lang; compact?: boolean; frameless?: boolean }) {
  const bg = lang === "bg";
  const [hour, setHour] = useState(9.5); // 6 … 18
  const [season, setSeason] = useState<"summer" | "winter">("summer");
  const [playing, setPlaying] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setHour((h) => (h + dt * 0.9 > 18 ? 6 : h + dt * 0.9)); // one "day" ≈ 13 s
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  // Sun: azimuth from east (-90°) to west (+90°); noon elevation depends on season.
  const sunAz = ((hour - 12) / 6) * (Math.PI / 2);
  const noonEl = season === "summer" ? 68 : 25;
  const sunEl = (Math.max(0.05, Math.sin((Math.PI * (hour - 6)) / 12)) * noonEl * Math.PI) / 180;
  const tilt = ((season === "summer" ? 25 : 55) * Math.PI) / 180; // set by the seasonal arm
  const headAz = Math.max(-1.05, Math.min(1.05, sunAz)); // daily rotation, ±60°

  const ox = 440;
  const oy = 360;

  // Frame corners in local space: u across (east-west), v up the tilted plane.
  const corners: V[] = [-1, 1].flatMap((su) =>
    [-1, 1].map((sv): V => {
      const u = (su * FRAME_W) / 2;
      const v = (sv * FRAME_H) / 2;
      // plane tilted about the E-W axis, then the whole head turned by azimuth
      const local: V = [u, v * Math.cos(tilt), MAST_H + 0.15 + v * Math.sin(tilt)];
      return rotZ(local, headAz);
    }),
  );
  // order corners as a polygon: (-u,-v) (-u,+v) (+u,+v) (+u,-v)
  const poly = [corners[0], corners[1], corners[3], corners[2]];
  const P = poly.map((c) => project(c, ox, oy));

  // module grid: 3 columns × 2 rows via interpolation along the polygon edges
  const lerp = (a: V, b: V, t: number): V => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const cells: [number, number][][] = [];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 2; j++) {
      const u0 = i / 3 + 0.012, u1 = (i + 1) / 3 - 0.012, v0 = j / 2 + 0.01, v1 = (j + 1) / 2 - 0.01;
      const at = (u: number, v: number) => lerp(lerp(poly[0], poly[3], u), lerp(poly[1], poly[2], u), v);
      cells.push([at(u0, v0), at(u0, v1), at(u1, v1), at(u1, v0)].map((c) => project(c, ox, oy)));
    }

  // ground shadow of the frame along the sun direction
  const sunDir: V = [Math.sin(sunAz) * Math.cos(sunEl), -Math.cos(sunAz) * Math.cos(sunEl) * 0.35, Math.sin(sunEl)];
  const shadow = poly.map((c) => {
    const k = c[2] / Math.max(sunDir[2], 0.15);
    return project([c[0] - sunDir[0] * k * 0.6, c[1] - sunDir[1] * k * 0.6, 0], ox, oy);
  });

  // mast, head, seasonal arm
  const base = project([0, 0, 0], ox, oy);
  const top = project([0, 0, MAST_H], ox, oy);
  const armBase = project([0, 0, ARM_Z], ox, oy);
  const backMid = project(rotZ([0, (FRAME_H / 2) * Math.cos(tilt) * 0.55, MAST_H + 0.15 + (FRAME_H / 2) * Math.sin(tilt) * 0.55], headAz), ox, oy);

  // sun on screen
  const sunR = 330;
  const sx = ox + Math.sin(sunAz) * sunR;
  const sy = oy - 80 - Math.sin(sunEl) * 190;

  const pts = (a: [number, number][]) => a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const hh = Math.floor(hour), mm = Math.round((hour - hh) * 60);
  const timeLabel = `${hh}:${mm < 10 ? "0" : ""}${mm}`;

  return (
    <div className={frameless ? "" : "rounded-3xl border border-line bg-white p-4 sm:p-6"}>
      <svg viewBox="0 0 880 520" className="h-auto w-full" role="img" aria-label={bg ? "Анимиран модел на тракера „Стрела“" : "Animated model of the Strela tracker"}>
        <defs>
          <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={season === "summer" ? "#dbeafe" : "#e5e9f2"} />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="cellg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0f3a6b" />
            <stop offset="1" stopColor="#1d6fe0" />
          </linearGradient>
        </defs>
        <rect width="880" height="520" rx="20" fill="url(#skyg)" />
        {/* horizon + ground */}
        <rect x="0" y="360" width="880" height="160" fill={season === "summer" ? "#eef5e1" : "#eef1f4"} />
        <line x1="0" y1="360" x2="880" y2="360" stroke={season === "summer" ? "#6a9a1f" : "#94a3c4"} strokeWidth="2" />
        {/* sun path */}
        <path d={`M ${ox - sunR} ${oy - 80} Q ${ox} ${oy - 80 - noonEl * 5.2} ${ox + sunR} ${oy - 80}`} fill="none" stroke="#fbbf24" strokeDasharray="4 8" strokeWidth="2" opacity=".6" />
        <circle cx={sx} cy={sy} r="34" fill="#fbbf24" opacity=".18" />
        <circle cx={sx} cy={sy} r="17" fill="#fbbf24" />
        <text x={ox - sunR} y={oy - 60} fontSize="12" fontWeight="700" fill="#5b6b7d">{bg ? "ИЗТОК" : "EAST"}</text>
        <text x={ox + sunR - 40} y={oy - 60} fontSize="12" fontWeight="700" fill="#5b6b7d">{bg ? "ЗАПАД" : "WEST"}</text>

        {/* shadow */}
        <polygon points={pts(shadow)} fill="#0b2239" opacity=".12" />
        {/* footing */}
        <ellipse cx={base[0]} cy={base[1]} rx="46" ry="14" fill="#cfd8e3" stroke="#94a3c4" />
        {/* mast */}
        <line x1={base[0]} y1={base[1]} x2={top[0]} y2={top[1]} stroke="#5b6b7d" strokeWidth="16" strokeLinecap="round" />
        <line x1={base[0]} y1={base[1]} x2={top[0]} y2={top[1]} stroke="#8593a6" strokeWidth="6" strokeLinecap="round" />
        {/* seasonal arm */}
        <line x1={armBase[0]} y1={armBase[1]} x2={backMid[0]} y2={backMid[1]} stroke="#1d6fe0" strokeWidth="9" strokeLinecap="round" />
        <circle cx={armBase[0]} cy={armBase[1]} r="6" fill="#fff" stroke="#0b2239" strokeWidth="2" />
        <circle cx={backMid[0]} cy={backMid[1]} r="6" fill="#fff" stroke="#0b2239" strokeWidth="2" />
        {/* frame + modules */}
        <polygon points={pts(P)} fill="#0b2239" />
        {cells.map((c, i) => (
          <polygon key={i} points={pts(c)} fill="url(#cellg)" stroke="#dbe7f7" strokeWidth="1" />
        ))}
        {/* head bearing */}
        <circle cx={top[0]} cy={top[1]} r="11" fill="#e2e7ee" stroke="#0b2239" strokeWidth="3" />

        {!compact && <rect x="16" y="408" width="340" height="92" rx="12" fill="#ffffff" opacity=".85" />}
        {/* legend (fixed position so the moving frame never covers it) */}
        <g fontSize="12" fontWeight="600" fill="#0b2239" display={compact ? "none" : undefined}>
          <circle cx="34" cy="426" r="6" fill="#e2e7ee" stroke="#0b2239" strokeWidth="2" />
          <text x="48" y="430">{bg ? "въртяща глава: следене изток → запад през деня" : "rotating head: east → west tracking through the day"}</text>
          <line x1="28" y1="452" x2="40" y2="452" stroke="#1d6fe0" strokeWidth="6" strokeLinecap="round" />
          <text x="48" y="456" fill="#1d6fe0">{bg ? "сезонно рамо: наклон зима / лято" : "seasonal arm: winter / summer tilt"}</text>
          <line x1="34" y1="470" x2="34" y2="486" stroke="#5b6b7d" strokeWidth="6" strokeLinecap="round" />
          <text x="48" y="482" fill="#5b6b7d" fontWeight="500">{bg ? "един носещ стълб на бетонна пета или ремарке" : "single mast on a footing or a trailer"}</text>
        </g>
        <g fontSize="13" fontWeight="800" fill="#0b2239">
          <text x="24" y="34">{bg ? "Двуосов тракер „Стрела“" : "Strela two-axis tracker"}</text>
          <text x="24" y="54" fontSize="12" fontWeight="500" fill="#5b6b7d">{bg ? "6 × двулицеви модула · 2 × 3" : "6 × bifacial modules · 2 × 3"}</text>
        </g>
        <rect x="700" y="20" width="160" height="58" rx="12" fill="#fff" stroke="#e2e7ee" display={compact ? "none" : undefined} />
        <text x="780" y="43" fontSize="12" fontWeight="700" fill="#5b6b7d" textAnchor="middle" display={compact ? "none" : undefined}>{season === "summer" ? (bg ? "ЛЯТО" : "SUMMER") : bg ? "ЗИМА" : "WINTER"}</text>
        <text x="780" y="66" fontSize="18" fontWeight="800" fill="#0b2239" textAnchor="middle" display={compact ? "none" : undefined}>{timeLabel}</text>
      </svg>

      {compact ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button onClick={() => setSeason("summer")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${season === "summer" ? "bg-ink text-white" : "bg-mist text-muted"}`}>
            {bg ? "Лято" : "Summer"}
          </button>
          <button onClick={() => setSeason("winter")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${season === "winter" ? "bg-ink text-white" : "bg-mist text-muted"}`}>
            {bg ? "Зима" : "Winter"}
          </button>
          <span className="ml-auto text-xs font-bold text-muted">{timeLabel}</span>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className="flex gap-2">
              <button onClick={() => setSeason("summer")} className={`rounded-full px-4 py-2 text-sm font-bold ${season === "summer" ? "bg-ink text-white" : "bg-mist text-muted"}`}>
                {bg ? "Лято" : "Summer"}
              </button>
              <button onClick={() => setSeason("winter")} className={`rounded-full px-4 py-2 text-sm font-bold ${season === "winter" ? "bg-ink text-white" : "bg-mist text-muted"}`}>
                {bg ? "Зима" : "Winter"}
              </button>
            </div>
            <label className="grid gap-1 text-sm font-bold">
              {bg ? "Час от деня" : "Time of day"}
              <input
                type="range"
                min={6}
                max={18}
                step={0.05}
                value={hour}
                onChange={(e) => {
                  setPlaying(false);
                  setHour(Number(e.target.value));
                }}
                className="w-full accent-brand"
                aria-label={bg ? "Час от деня" : "Time of day"}
              />
            </label>
            <button onClick={() => setPlaying((p) => !p)} className="rounded-xl border-2 border-ink px-4 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-white">
              {playing ? (bg ? "Пауза" : "Pause") : bg ? "Пусни деня" : "Play the day"}
            </button>
          </div>
          <p className="mt-3 text-sm text-muted">
            {bg
              ? "Главата се върти през деня и следва слънцето от изток на запад. Рамото сменя наклона по сезон: стръмно през зимата, полегато през лятото. Двулицевите модули добавят добив и от отразената светлина под тях."
              : "The head turns through the day, following the sun from east to west. The arm changes the tilt by season: steep in winter, flat in summer. The bifacial modules add yield from light reflected underneath."}
          </p>
        </>
      )}
    </div>
  );
}
