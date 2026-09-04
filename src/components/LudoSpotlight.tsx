import React from 'react';
import { Rocket, CheckCircle2, ArrowRight, ShieldCheck, Dices } from 'lucide-react';

interface LudoSpotlightProps {
  theme: 'dark' | 'light';
}

/**
 * Our first shipped product, immediately after the hero. The live board itself sits in the
 * hero card above, where it is guaranteed to be in the first screen; this section carries
 * the story and the specification.
 *
 * Every claim below is one the app can actually support: no ads, no sign-up, fully
 * offline, nothing collected. Deliberately no mention of matchmaking, online play or voice
 * chat. Google cross-checks marketing copy against the store listing and the build, and
 * the app has none of those.
 */
export const LudoSpotlight: React.FC<LudoSpotlightProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="ludo-apex"
      className={`relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B0C0E] border-zinc-800' : 'bg-zinc-100 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div
          className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 ${
            isDark
              ? 'bg-gradient-to-br from-zinc-900/95 to-[#121316] border-yellow-500/30'
              : 'bg-gradient-to-br from-white to-yellow-50/60 border-zinc-200 shadow-xl'
          }`}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl bg-yellow-500/10 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/*
              A spec panel, not a second board. The live one is in the hero, and every
              instance is its own WebGL context — a browser keeps about sixteen alive
              before it starts killing the oldest, which breaks a canvas far from the cause.
            */}
            <div className="lg:col-span-5 lg:order-2">
              <div className={`rounded-2xl border p-6 ${
                isDark ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <Dices className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Android</div>
                    <div className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Free, no purchases</div>
                  </div>
                </div>

                <dl className={`space-y-3 text-xs border-t pt-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  {[
                    ['Players', '2 – 4, one device'],
                    ['AI tiers', 'Three'],
                    ['Connection', 'Not needed'],
                    ['Data collected', 'None'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>{k}</dt>
                      <dd className={`font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>{v}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="/ludo-apex/privacy.html"
                  className={`mt-5 flex items-center gap-2 text-xs font-medium transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                    isDark ? 'text-zinc-400 hover:text-yellow-400' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Privacy policy</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-4 border ${
                  isDark
                    ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400'
                    : 'bg-yellow-100 border-yellow-300 text-zinc-900'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-yellow-400" />
                <span>Our First Release</span>
              </div>

              <h2
                className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3 ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Ludo Apex
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 max-w-xl ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                The classic board game, re-engineered for the modern player. Four players on one
                device, three tiers of AI built from real strategy, and a rule set tested to be
                fair.
              </p>

              <ul
                className={`grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm mb-8 max-w-xl ${
                  isDark ? 'text-zinc-200' : 'text-zinc-800'
                }`}
              >
                {[
                  'No ads. Not fewer, none.',
                  'No sign-up, no account',
                  'Plays fully offline',
                  'Zero data collected',
                ].map(claim => (
                  <li key={claim} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/ludo-apex/"
                  className="px-6 py-3.5 rounded-xl bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black text-sm inline-flex items-center gap-2 shadow-lg shadow-yellow-500/20 border border-yellow-300 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <span>Explore Ludo Apex</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                {/*
                  PRE-LAUNCH. Swap for the official Google Play badge once the listing is
                  live. A store button that goes nowhere loses the first cohort.
                */}
                {/* zinc-600, not zinc-500: on zinc-100 the lighter one measures 4.39:1,
                    just under the 4.5 that 12px text needs. */}
                <span className={`font-mono text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Coming soon to Google Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
