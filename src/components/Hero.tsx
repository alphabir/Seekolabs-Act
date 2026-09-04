import React from 'react';
import { 
  Send, 
  ArrowRight, 
  Globe2, 
  CheckCircle2, 
  Sparkles,
  Code2,
  Rocket,
  AppWindow,
  Terminal
} from 'lucide-react';
import { SeekoLabsLogo } from './SeekoLabsLogo';
import { LudoBoard } from './LudoBoard';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToSolutions: () => void;
  theme: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToContact,
  onScrollToSolutions,
  theme
}) => {
  const isDark = theme === 'dark';

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
              
              {/* Prominent Hero Brand Header */}
              <div className="pt-2">
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
                We Engineer & Publish <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
                  Next-Gen Software & Apps
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg leading-relaxed font-normal ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                <strong className="text-yellow-400 font-bold">SeekoLabs</strong> is an independent app publishing house and product studio powered by a collective of passionate software engineers. Based in Kolkata, India, we build, scale, and publish our own ecosystem of high-performance web applications, mobile software, utilities, and developer tools.
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
                  <span>Multi-Platform App Distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Data-Driven Growth & Scaling Engine</span>
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
                  onClick={onScrollToSolutions}
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
              Our first product, running, in the first screen. This replaced a card that
              showed the logo for the third time on one viewport — the header has it, the
              hero wordmark has it, and it had it again. Proof beats repetition.

              Measured before the change: the hero ran 1106px and the spotlight below began
              at 1187 on an 860px viewport, so the board sat 327px under the fold. Lifting
              it by shrinking the hero would have cost ~450px, which is the headline, the
              claims and the CTAs. Moving the board up here costs nothing.

              The ONLY board on the page. Each instance is its own WebGL context.
            */}
            <div className="lg:col-span-5 flex justify-center">
              <div className={`relative w-full max-w-md rounded-3xl border p-6 shadow-2xl flex flex-col space-y-5 ${
                isDark
                  ? 'bg-zinc-950/90 border-yellow-500/30'
                  : 'bg-white border-zinc-200 shadow-xl'
              }`}>
                {/*
                  The gold accent bar that used to cap this card is gone. It framed a
                  header the card no longer has: with the board starting immediately
                  below it, it read as a stray line across the top of the artwork rather
                  than as trim. The board's own thin gold border does that job now.
                */}
                <LudoBoard className="aspect-square w-full border border-yellow-400/30" />

                {/*
                  Not a heading. The page already goes h1 -> h2 for the spotlight below, and
                  an h3 here would both skip a level and repeat that section's title
                  verbatim. This is a card label, so it is marked up as one.
                */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase font-bold text-yellow-400 tracking-widest">
                    Now Playing
                  </span>
                  <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Ludo Apex
                  </p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Our first release, running right here. Roll the die.
                  </p>
                </div>

                <a
                  href="/ludo-apex/"
                  className={`w-full p-3.5 rounded-xl border font-mono text-xs flex justify-between items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-yellow-400/50'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-yellow-500'
                  }`}
                >
                  <span className="text-yellow-400 font-bold">EXPLORE:</span>
                  <span className="font-semibold">LUDO APEX &rarr;</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Company Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">In-House Engineers</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>House of Devs</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <AppWindow className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Product Portfolio</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Web & Mobile Apps</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800 hover:border-yellow-400/40' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Rocket className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Business Model</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Publish &amp; Build</div>
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
