import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PUJO_FACTS, PUJO_INK, PUJO_URL, isPujoSeasonLive } from '../pujo';

interface PujoPassportCardProps {
  theme: 'dark' | 'light';
}

/**
 * Pujo Passport in the hero: a passport page with four day stamps on it.
 *
 * The page is cream paper in BOTH themes, like the app itself, so its colours are fixed
 * here rather than following `theme`. On the dark site that makes it the brightest thing
 * in the first screen, which is the point. Only the border changes with the theme.
 *
 * The stamps are the app's own designs in its own day inks (src/lib/days.ts in the
 * pujo-passport repo), at real pandals from its list, the same four its share card uses.
 */
const STAMPS: ReadonlyArray<{ day: string; pandal: string; ink: string; tilt: number }> = [
  { day: 'Shashthi', pandal: 'Shobhabazar Rajbari', ink: '#15803D', tilt: -7 },
  { day: 'Saptami', pandal: 'Bagbazar Sarbojanin', ink: '#1D4ED8', tilt: 5 },
  { day: 'Ashtami', pandal: 'Santosh Mitra Square', ink: '#BE185D', tilt: 4 },
  { day: 'Navami', pandal: 'Chetla Agrani', ink: '#C2410C', tilt: -5 },
];

export const PujoPassportCard: React.FC<PujoPassportCardProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const live = isPujoSeasonLive();

  return (
    <div
      className={`relative w-full max-w-md rounded-3xl border overflow-hidden shadow-2xl ${
        isDark ? 'border-[#E09400]/50 shadow-black/80' : 'border-stone-200 shadow-stone-300/60'
      }`}
      style={{ backgroundColor: PUJO_INK.paper, color: PUJO_INK.ink }}
    >
      {/* The app's own top band: sindoor with a gold edge, as on its share card. */}
      <div aria-hidden="true">
        <div className="h-2" style={{ backgroundColor: PUJO_INK.sindoor }} />
        <div className="h-1" style={{ backgroundColor: PUJO_INK.gold }} />
      </div>

      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <img
            src="/apps/pujo-passport-icon.png"
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl shadow-md shrink-0"
          />
          <div className="min-w-0">
            <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#B0101F]">
              {live && (
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#D7182A] opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-[#D7182A]" />
                </span>
              )}
              {live ? 'Live now · Durga Puja 2026' : 'Durga Puja 2026'}
            </span>
            <p className="text-2xl font-black tracking-tight">Pujo Passport</p>
          </div>
        </div>

        {/* Decorative: the same facts are in the text below, so the stamps are hidden from AT. */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 py-1" aria-hidden="true">
          {STAMPS.map((stamp) => (
            <li key={stamp.day} className="flex justify-center">
              <div
                className="relative aspect-square w-full max-w-[150px] rounded-full grid place-items-center text-center"
                style={{
                  color: stamp.ink,
                  border: `3px solid ${stamp.ink}`,
                  transform: `rotate(${stamp.tilt}deg)`,
                  opacity: 0.92,
                }}
              >
                <span
                  className="absolute inset-[6px] rounded-full"
                  style={{ border: `1px solid ${stamp.ink}` }}
                />
                <span className="px-3 sm:px-4 leading-tight">
                  <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[.2em] mb-1">
                    {stamp.day}
                  </span>
                  <span className="block text-[10.5px] sm:text-[13px] font-black uppercase">
                    {stamp.pandal}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed text-stone-700">
          {live
            ? 'Collect a GPS-checked stamp at every pandal you visit in Kolkata and Howrah.'
            : 'Players collected GPS-checked stamps at pandals across Kolkata and Howrah.'}{' '}
          {PUJO_FACTS.pandals} pandals, {PUJO_FACTS.trails} walking trails, badges and
          leaderboards.
        </p>

        <a
          href={PUJO_URL}
          className="w-full px-5 py-3.5 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 hover:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7182A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCFA]"
          style={{ backgroundColor: PUJO_INK.sindoor }}
        >
          <span>Open Pujo Passport</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>

        <p className="text-xs text-center text-stone-600">
          {live
            ? 'Free, in your phone’s browser. Stamps close 5 am, 22 Oct.'
            : 'Stamps closed at 5 am on 22 Oct 2026.'}
        </p>
      </div>
    </div>
  );
};
