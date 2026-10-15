import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Dices,
  Layers,
  MapPin,
  ShieldCheck,
  Stamp,
} from 'lucide-react';
import { LudoBoard } from './LudoBoard';
import { PUJO_FACTS, PUJO_INK, PUJO_URL, isPujoSeasonLive } from '../pujo';

interface AppsSectionProps {
  theme: 'dark' | 'light';
}

/**
 * Our Apps: one row per product, immediately after the hero. Replaces the Ludo-only
 * spotlight that used to sit here.
 *
 * Every claim is one the product can back up.
 *  · Pujo Passport: facts from its own guide and data. It needs a Google sign-in to
 *    collect stamps and some of its pages show ads, so it is never called "no sign-up"
 *    or "ad-free" here.
 *  · Ludo Apex: no ads, no sign-up, fully offline, nothing collected. Deliberately no
 *    mention of matchmaking, online play or voice chat. Google cross-checks marketing
 *    copy against the store listing and the build, and the app has none of those.
 *
 * The Ludo board here is the ONLY board on the page. Each instance is its own WebGL
 * context, and a browser keeps about sixteen alive before it kills the oldest.
 */
export const AppsSection: React.FC<AppsSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const live = isPujoSeasonLive();

  const panel = `rounded-2xl border p-6 ${isDark ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white border-zinc-200'}`;
  const row = `relative overflow-hidden rounded-3xl border p-6 sm:p-10 ${
    isDark
      ? 'bg-gradient-to-br from-zinc-900/95 to-[#121316] border-yellow-500/30'
      : 'bg-gradient-to-br from-white to-yellow-50/60 border-zinc-200 shadow-xl'
  }`;
  const pill = `inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-4 border ${
    isDark ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' : 'bg-yellow-100 border-yellow-300 text-zinc-900'
  }`;
  const h3 = `text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3 ${isDark ? 'text-white' : 'text-zinc-900'}`;
  const lede = `text-sm sm:text-base leading-relaxed mb-6 max-w-xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`;
  const claims = `grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm mb-8 max-w-xl ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`;
  const panelLink = `flex items-center gap-2 text-xs font-medium transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
    isDark ? 'text-zinc-400 hover:text-yellow-400' : 'text-zinc-500 hover:text-zinc-900'
  }`;

  const facts = (rows: ReadonlyArray<[string, string]>) => (
    <dl className={`space-y-3 text-xs border-t pt-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4">
          <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>{k}</dt>
          <dd className={`font-bold text-right ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section
      id="apps"
      className={`relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B0C0E] border-zinc-800' : 'bg-zinc-100 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-8">
        <div className="max-w-3xl">
          <div className={pill}>
            <Layers className="w-3.5 h-3.5 text-yellow-400" />
            <span>Our Apps</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Built In-House. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
              Shipped From Kolkata.
            </span>
          </h2>
        </div>

        {/* ---------------------------------------------------------------- Pujo Passport */}
        <article id="pujo-passport" className={row}>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl bg-red-600/10 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 lg:order-2">
              <div className={panel}>
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src="/apps/pujo-passport-icon.png"
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    className="w-12 h-12 rounded-2xl shrink-0"
                  />
                  <div>
                    <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Web app</div>
                    <div className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Free, runs in the browser</div>
                  </div>
                </div>

                {facts([
                  ['Where', 'Kolkata & Howrah'],
                  ['Pandals', String(PUJO_FACTS.pandals)],
                  ['Walking trails', String(PUJO_FACTS.trails)],
                  ['Season', '11 – 21 Oct 2026'],
                ])}

                <div className="mt-5 space-y-2.5">
                  <a href={`${PUJO_URL}/pandals`} className={panelLink}>
                    <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                    <span>All {PUJO_FACTS.pandals} pandals</span>
                  </a>
                  <a href={`${PUJO_URL}/guide`} className={panelLink}>
                    <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Durga Puja 2026 guide</span>
                  </a>
                  <a href={`${PUJO_URL}/rules`} className={panelLink}>
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Rules and privacy</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1">
              <div className={pill}>
                <Stamp className="w-3.5 h-3.5 text-yellow-400" />
                <span>{live ? 'Live Now · Durga Puja 2026' : 'Durga Puja 2026'}</span>
              </div>

              <h3 className={h3}>Pujo Passport</h3>

              <p className={lede}>
                Pandal hopping, with proof. Check in by GPS at each Durga Puja pandal you visit
                and collect that day’s stamp. Stamps earn badges, put you on the leaderboards and
                fill a passport you can share.
              </p>

              <ul className={claims}>
                {[
                  'A different stamp for every Puja day',
                  'Stamps in English, Bengali and Hindi',
                  'Walking trails and your own routes',
                  'Crews, badges and leaderboards',
                ].map((claim) => (
                  <li key={claim} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={PUJO_URL}
                  className="px-6 py-3.5 rounded-xl text-white font-black text-sm inline-flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5 hover:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  style={{ backgroundColor: PUJO_INK.sindoor }}
                >
                  <span>Open Pujo Passport</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className={`font-mono text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {live ? 'Stamps close 5 am, 22 Oct' : 'Stamps closed 22 Oct 2026'}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* -------------------------------------------------------------------- Ludo Apex */}
        <article id="ludo-apex" className={row}>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl bg-yellow-500/10 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 lg:order-2">
              <div className={`${panel} space-y-5`}>
                <LudoBoard className="aspect-square w-full border border-yellow-400/30" />

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <Dices className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Android</div>
                    <div className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Free, no purchases</div>
                  </div>
                </div>

                {facts([
                  ['Players', '2 – 4, one device'],
                  ['AI tiers', 'Three'],
                  ['Connection', 'Not needed'],
                  ['Data collected', 'None'],
                ])}

                <a href="/ludo-apex/privacy.html" className={panelLink}>
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Privacy policy</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1">
              <div className={pill}>
                <Dices className="w-3.5 h-3.5 text-yellow-400" />
                <span>Coming Soon · Android</span>
              </div>

              <h3 className={h3}>Ludo Apex</h3>

              <p className={lede}>
                The classic board game, re-engineered for the modern player. Two to four players
                on one device, three tiers of AI built from real strategy, and a rule set tested
                to be fair.
              </p>

              <ul className={claims}>
                {[
                  'No ads. Not fewer, none.',
                  'No sign-up, no account',
                  'Plays fully offline',
                  'Zero data collected',
                ].map((claim) => (
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
        </article>
      </div>
    </section>
  );
};
