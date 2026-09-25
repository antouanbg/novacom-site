"use client";

import { useEffect, useRef, useState } from "react";

export type Slide =
  | { type: "video"; src: string; poster: string; alt: string }
  | { type: "image"; src: string; alt: string };

// Auto-advancing slider that mixes a muted, autoplaying video with photos.
// Images stay `interval` ms; the video plays through and then advances. Pauses while hovered,
// on a hidden tab, and never auto-advances when the visitor prefers reduced motion.
export default function MediaSlider({ slides, interval = 5000, className = "", label }: { slides: Slide[]; interval?: number; className?: string; label: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const n = slides.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  // Timer for image slides.
  useEffect(() => {
    if (slides[i].type !== "image" || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(i + 1), interval);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused, interval, n]);

  // Play the active video from the start, pause the others.
  useEffect(() => {
    videoRefs.current.forEach((v, k) => {
      if (!v) return;
      if (k === i) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else v.pause();
    });
  }, [i]);

  // Pause everything while the tab is hidden.
  useEffect(() => {
    const on = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-ink ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {slides.map((s, k) => (
        <div key={s.src} className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={k !== i}>
          {s.type === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[k] = el;
              }}
              src={s.src}
              poster={s.poster}
              muted={muted}
              playsInline
              preload="metadata"
              onEnded={() => go(k + 1)}
              className="h-full w-full object-cover"
              aria-label={s.alt}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.src} alt={s.alt} loading={k === 0 ? "eager" : "lazy"} className="h-full w-full object-cover" />
          )}
        </div>
      ))}

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
        <div className="flex gap-1.5" role="tablist">
          {slides.map((s, k) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`${k + 1}/${n}`}
              onClick={() => go(k)}
              className={`h-2.5 rounded-full transition-all ${k === i ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {slides[i].type === "video" && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25"
              aria-label={muted ? "Sound on" : "Sound off"}
              aria-pressed={!muted}
            >
              {muted ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" /></svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
              )}
            </button>
          )}
          <button type="button" onClick={() => go(i - 1)} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25" aria-label="Previous">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => go(i + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25" aria-label="Next">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
