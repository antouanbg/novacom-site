"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

// Interactive schematic of the Strela tracker: a rotating axle on two columns carrying six
// bifacial modules, driven by a linear actuator on the tall column. The slider rotates the
// panel plane through the 120° working range described in the design brief.
export default function StrelaModel({ lang }: { lang: Lang }) {
  const bg = lang === "bg";
  const [angle, setAngle] = useState(-35); // -60 (east) … +60 (west)
  const hour = Math.round(12 + angle / 15); // 15° per hour, purely illustrative

  const cx = 470; // axle centre (side view)
  const cy = 205;
  const half = 210; // half-length of the panel plane in the side view
  const rad = (angle * Math.PI) / 180;
  // actuator: anchored low on the tall column, pushing an arm fixed to the axle
  const armLen = 70;
  const armAng = rad + Math.PI / 2;
  const ax = cx + Math.cos(armAng) * armLen;
  const ay = cy + Math.sin(armAng) * armLen;
  const base = { x: 560, y: 380 };

  return (
    <div className="rounded-3xl border border-line bg-white p-4 sm:p-6">
      <svg viewBox="0 0 940 460" className="h-auto w-full" role="img" aria-label={bg ? "Схема на тракера „Стрела“" : "Strela tracker schematic"}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e7f0fb" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="cell" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#123a63" />
            <stop offset="1" stopColor="#1d6fe0" />
          </linearGradient>
        </defs>
        <rect width="940" height="460" rx="20" fill="url(#sky)" />

        {/* sun path + sun */}
        <path d="M 120 300 A 350 350 0 0 1 820 300" fill="none" stroke="#fbbf24" strokeDasharray="4 8" strokeWidth="2" opacity=".7" />
        {(() => {
          const t = ((angle + 60) / 120) * Math.PI; // east→west
          const sx = 470 - Math.cos(t) * 350;
          const sy = 300 - Math.sin(t) * 350;
          return (
            <g>
              <circle cx={sx} cy={sy} r="18" fill="#fbbf24" />
              <circle cx={sx} cy={sy} r="30" fill="#fbbf24" opacity=".2" />
            </g>
          );
        })()}

        {/* ground + footings */}
        <rect x="0" y="380" width="940" height="80" fill="#eef5e1" />
        <line x1="0" y1="380" x2="940" y2="380" stroke="#6a9a1f" strokeWidth="2" />
        <rect x="350" y="376" width="80" height="16" rx="2" fill="#94a3c4" />
        <rect x="530" y="376" width="80" height="16" rx="2" fill="#94a3c4" />

        {/* columns: short front, tall rear */}
        <rect x="382" y="240" width="16" height="140" fill="#5b6b7d" />
        <rect x="562" y="205" width="16" height="175" fill="#5b6b7d" />
        {/* bearing housings */}
        <circle cx="390" cy="240" r="9" fill="#e2e7ee" stroke="#0b2239" strokeWidth="2" />
        {/* axle in side view is a point at (cx,cy); draw torque tube as a small ring */}
        <circle cx={cx} cy={cy} r="14" fill="#e2e7ee" stroke="#0b2239" strokeWidth="3" />

        {/* panel plane (rotates) */}
        <g transform={`rotate(${angle} ${cx} ${cy})`}>
          <rect x={cx - half} y={cy - 26} width={half * 2} height="12" rx="2" fill="#0b2239" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={cx - half + 4 + i * 70} y={cy - 46} width="62" height="18" rx="2" fill="url(#cell)" stroke="#fff" strokeWidth="1.5" />
          ))}
          {/* bifacial hint: thin light strip on the underside */}
          <rect x={cx - half + 4} y={cy - 12} width={half * 2 - 8} height="4" fill="#7fb3ff" opacity=".6" />
        </g>

        {/* arm + actuator */}
        <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#0b2239" strokeWidth="6" strokeLinecap="round" />
        <line x1={base.x} y1={base.y} x2={ax} y2={ay} stroke="#1d6fe0" strokeWidth="10" strokeLinecap="round" />
        <line x1={base.x} y1={base.y} x2={(base.x + ax) / 2} y2={(base.y + ay) / 2} stroke="#0b2239" strokeWidth="14" strokeLinecap="round" />
        <circle cx={ax} cy={ay} r="6" fill="#fff" stroke="#0b2239" strokeWidth="2" />
        <circle cx={base.x} cy={base.y} r="6" fill="#fff" stroke="#0b2239" strokeWidth="2" />

        {/* 120° arc */}
        <path d={`M ${cx + Math.cos((-60 * Math.PI) / 180) * 120} ${cy + Math.sin((-60 * Math.PI) / 180) * 120} A 120 120 0 0 1 ${cx + Math.cos((60 * Math.PI) / 180) * 120} ${cy + Math.sin((60 * Math.PI) / 180) * 120}`} fill="none" stroke="#1d6fe0" strokeDasharray="3 6" strokeWidth="2" />
        <text x={cx + 128} y={cy + 6} fontSize="14" fontWeight="700" fill="#1d6fe0">120°</text>

        {/* labels */}
        <g fontSize="13" fill="#0b2239" fontWeight="600">
          <text x="24" y="34">{bg ? "Изглед отстрани" : "Side view"}</text>
          <text x="24" y="54" fontWeight="400" fill="#5b6b7d">{bg ? "6 × двулицеви модула 2300 × 1200 mm" : "6 × bifacial modules 2300 × 1200 mm"}</text>
          <text x="300" y="440">{bg ? "къса колона" : "short column"}</text>
          <text x="600" y="440">{bg ? "висока колона + актуатор" : "tall column + actuator"}</text>
          <text x={cx - 40} y={cy - 60} fill="#5b6b7d" fontWeight="400">{bg ? "носеща ос на лагери" : "torque tube on bearings"}</text>
        </g>
      </svg>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <label className="grid gap-1 text-sm font-bold">
          {bg ? "Завърти оста (следене на слънцето)" : "Rotate the axle (sun tracking)"}
          <input type="range" min={-60} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-brand" aria-label={bg ? "Ъгъл на тракера" : "Tracker angle"} />
        </label>
        <div className="flex gap-4 text-sm">
          <span className="rounded-full bg-sky px-3 py-1 font-bold">{angle > 0 ? "+" : ""}{angle}°</span>
          <span className="rounded-full bg-mist px-3 py-1 text-muted">≈ {hour}:00</span>
        </div>
      </div>
    </div>
  );
}
