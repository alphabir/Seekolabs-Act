import React from 'react';
import {
  Send,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Sparkles,
  Stamp,
  MapPin,
  Dices,
  Terminal
} from 'lucide-react';
import { SeekoLabsLogo } from './SeekoLabsLogo';
import { PujoPassportCard } from './PujoPassportCard';
import { PUJO_FACTS, isPujoSeasonLive } from '../pujo';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToApps: () => void;
  theme: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToContact,
  onScrollToApps,
  theme
}) => {
  const isDark = theme === 'dark';
  const pujoLive = isPujoSeasonLive();

  return (
    <section id="hero" className={`relative overflow-hidden pt-8 pb-12 border-b transition-colors duration-300 ${
      isDark ? 'bg-[#0B0C0E] border-zinc-800' : 'bg-zinc-100 border-zinc-200'
    }`}>
      
      {/* Background Glows (Yellow/Amber Theme) */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] blur-3xl pointer-events-none rounded-full ${
        isDark ? 'bg-gradient-to-b from-yellow-500/15 via-amber-500/10 to-transparent' : 'bg-gradient-to-b from-yellow-400/20 via-amber-300/10 to-transparent'
      }`} />
      <div className={`absolute -top-24 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-yellow-400/10' : 'bg-yellow-300/20'
      }`} />
      <div className={`absolute top-40 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-amber-500/10' : 'bg-amber-200/30'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Header */}
        <div className={`relative rounded-3xl border p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-2xl overflow-hidden mb-12 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-b from-zinc-900/95 via-[#121316]/90 to-zinc-900/95 border-yellow-500/30 shadow-black/80' 
            : 'bg-gradient-to-b from-white via-zinc-50 to-yellow-50/40 border-zinc-200 shadow-zinc-300/50'
        }`}>
          
          {/* Background Decorative Graphic */}
          <div className={`absolute top-4 right-6 pointer-events-none hidden lg:block ${
            isDark ? 'opacity-10 text-yellow-400' : 'opacity-5 text-zinc-900'
          }`}>
            <Terminal className="w-80 h-80 rotate-12" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/*
                Prominent Hero Brand Header. Not on phones: there the header logo sits
                directly above it, and dropping the repeat lifts the Pujo Passport card
                about 330px, into the first screen.
              */}
              <div className="pt-2 hidden sm:block">
                <SeekoLabsLogo variant="hero" size="hero" theme={theme} />
              </div>

              {/* Brand Tag Pill */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border ${
                isDark 
                  ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' 
                  : 'bg-yellow-100 border-yellow-300 text-zinc-900'
              }`}>
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>seekolabs.tech • House of Developers & Digital App Publishing House</span>
              </div>

              {/* Main Headline */}
              <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                We Build & Publish <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
                  Our Own Apps
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg leading-relaxed font-normal ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                <strong className="text-yellow-400 font-bold">SeekoLabs</strong> is an independent app publishing house and product studio in Kolkata, India. We design, build and run our own products: <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Pujo Passport</strong>{pujoLive ? ', live now for Durga Puja 2026, and ' : ', our Durga Puja 2026 app, and '}<strong className={isDark ? 'text-white' : 'text-zinc-900'}>Ludo Apex</strong>, coming soon to Android. We also take on a small number of partner products each year.
              </p>

              {/* Bullet Highlights */}
              <div className={`grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium pt-2 ${
                isDark ? 'text-zinc-200' : 'text-zinc-800'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>100% In-House Software Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>We Publish Our Own, And Build For A Few</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Web Apps & Android Games</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>From First Sketch To Release</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onScrollToContact}
                  className="px-7 py-4 rounded-xl bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black text-sm shadow-xl shadow-yellow-500/25 border border-yellow-300 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Start A Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onScrollToApps}
                  className={`px-6 py-4 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border ${
                    isDark
                      ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200 hover:border-yellow-400/50'
                      : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800 shadow-sm'
                  }`}
                >
                  <Globe2 className="w-4 h-4 text-yellow-400" />
                  <span>See Our Apps</span>
                </button>
              </div>

            </div>

            {/*
              The product that is live right now, in the first screen. Through Durga Puja
              2026 that is Pujo Passport, which real players are using; Ludo Apex is not on
              Google Play yet. The Ludo board moved to its card in the Our Apps section
              (AppsSection.tsx) and is still the only board on the page.
            */}
            <div className="lg:col-span-5 flex justify-center">
              <PujoPassportCard theme={theme} />
            </div>

          </div>

        </div>

        {/*
          Facts, not adjectives. This ribbon used to say "House of Devs" and "Web & Mobile
          Apps"; every value here is now something a visitor can check by clicking through.
          The labels stay true after the Puja season ends, so nothing here goes stale.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Stamp className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Our Puja App</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Pujo Passport</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Pandals Mapped</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>{PUJO_FACTS.pandals}</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Dices className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Coming To Android</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Ludo Apex</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Globe2 className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Headquarters</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Kolkata, India</div>
          </div>
        </div>

      </div>
    </section>
  );
};
