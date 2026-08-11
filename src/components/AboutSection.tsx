import React from 'react';
import { ShieldCheck, Cpu, Globe, Zap, Target, Layers, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onScrollToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onScrollToContact }) => {
  return (
    <section id="about" className="py-16 md:py-24 bg-slate-950 border-b border-indigo-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Company Brief Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>Company Brief & Overview</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Empowering High-Yield <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Performance Advertising
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              <strong className="text-white font-semibold">Seekolabs</strong> (`seekolabs.tech`) is a premier ad technology company and performance marketing network headquartered in Georgia, operating across tier-1, tier-2, and emerging global markets.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              We connect direct advertisers with top-tier affiliate media buyers and publishers. Powered by real-time server-to-server (S2S) postback telemetry and machine-learning bot protection, Seekolabs ensures max EPCs and clean, verified conversion data.
            </p>

            {/* Core Values / Pillars */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1">
                  <Target className="w-4 h-4" />
                  <span>Direct Advertiser Offers</span>
                </div>
                <p className="text-xs text-slate-400">
                  Exclusive CPA, CPL, and RevShare offers across Games, iGaming, Dating, VOD, Nutra, and Betting with no middleman cuts.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AI Anti-Fraud Telemetry</span>
                </div>
                <p className="text-xs text-slate-400">
                  99.8% bot filtering ensuring only real, high-intent user traffic reaches landing pages.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                  <Zap className="w-4 h-4" />
                  <span>Real-Time S2S Postbacks</span>
                </div>
                <p className="text-xs text-slate-400">
                  Instant conversion log dispatching with zero attribution loss and sub-50ms latency.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Globe className="w-4 h-4" />
                  <span>Global Traffic Coverage</span>
                </div>
                <p className="text-xs text-slate-400">
                  Tier-1, Tier-2, and high-growth emerging GEO coverage with 150+ targetable regions worldwide.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onScrollToContact}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <span>Inquire For Partnerships</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Key Company Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900 border border-indigo-500/30 p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Seekolabs Tech Stack</span>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] rounded-full font-bold">
                    ACTIVE
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">Why Media Buyers & Advertisers Choose Seekolabs</h3>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Flexible Bidding:</strong> Support for CPA, CPL, CPS, RevShare, CPT, and CPC formats.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Pre-Lander Optimization:</strong> Tested landers optimized for high conversion velocity.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Fast & Reliable Payouts:</strong> Flexible weekly and bi-weekly payouts for qualified partners.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>1-on-1 Account Management:</strong> Dedicated affiliate managers and media buyers assigned to every account.</span>
                  </li>
                </ul>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Official Contact</span>
                  <span className="text-cyan-400 font-bold font-mono text-xs mt-0.5 block">partners@seekolabs.tech</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
