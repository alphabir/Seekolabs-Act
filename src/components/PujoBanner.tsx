import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PUJO_INK, PUJO_URL, isPujoSeasonLive } from '../pujo';

/**
 * The strip above the header while Pujo Passport's season is open.
 *
 * It sits in normal flow ABOVE the sticky header, so it scrolls away with the page and
 * never adds to the header height that `scroll-margin-top` in index.css tracks.
 *
 * One link, edge to edge: the whole strip is the tap target on a phone. White on the
 * sindoor red measures 5.2:1, so the small text passes AA in both themes. It is drawn in
 * Pujo Passport's colours rather than ours on purpose, so it reads as that app.
 */
export const PujoBanner: React.FC = () => {
  if (!isPujoSeasonLive()) return null;

  return (
    <a
      href={PUJO_URL}
      className="group block text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
      style={{ backgroundColor: PUJO_INK.sindoor, borderBottom: `3px solid ${PUJO_INK.gold}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3 text-[13px] sm:text-sm">
        <img
          src="/apps/pujo-passport-icon.png"
          alt=""
          width={24}
          height={24}
          className="w-6 h-6 rounded-md ring-1 ring-white/40 shrink-0"
        />
        <p className="min-w-0">
          <span className="font-black">
            <span className="hidden sm:inline">Durga Puja 2026: </span>Pujo Passport is live.
          </span>{' '}
          <span className="hidden sm:inline">
            Collect a stamp at every pandal you visit in Kolkata.
          </span>
        </p>
        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-black text-[#B0101F] transition-transform group-hover:translate-x-0.5">
          Open
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
};
