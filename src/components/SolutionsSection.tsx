import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Target, 
  Globe2, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Send,
  Database,
  Sliders
} from 'lucide-react';

interface SolutionsSectionProps {
  onScrollToContact: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onScrollToContact }) => {
  const corePillars = [
    {
      icon: Cpu,
      title: "Direct Advertiser Supply Chain",
      badge: "0% Intermediary Fee",
      description: "We bypass multi-tier broker networks to bring publishers direct advertiser budgets with unclipped CPA payouts and real-time conversion verification.",
      points: [
        "Direct-from-source budget allocations",
        "Higher payout caps & custom payouts",
        "Faster payout cycles with zero hidden deductions"
      ]
    },
    {
      icon: Zap,
      title: "Real-Time S2S Telemetry Engine",
      badge: "< 50ms Processing",
      description: "Server-to-Server postbacks with instant attribution mapping prevent conversion dropping, browser tracking blocks, and attribution latency.",
      points: [
        "Cookie-less S2S postback tracking",
        "Custom parameter pass-through (sub_id, click_id)",
        "Automated API log synchronization"
      ]
    },
    {
      icon: ShieldCheck,
      title: "AI Anti-Fraud & IVT Protection",
      badge: "99.8% Clean Traffic",
      description: "Multi-layered bot detection analyzes fingerprinting, IP reputation, proxy spoofing, and click velocity to ensure pure user traffic.",
      points: [
        "Real-time IP & ASN reputation screening",
        "Device fingerprinting & click pattern analysis",
        "Automated fake lead and bot exclusion"
      ]
    },
    {
      icon: Sliders,
      title: "Conversion-Engineered Pre-Landers",
      badge: "Pre-Tested Landers",
      description: "Our in-house creative desk builds, tests, and optimizes localized landing pages designed for high-conversion velocity across mobile and desktop.",
      points: [
        "Geo-targeted and localized creative copy",
        "Mobile-first ultra-fast loading designs",
        "Continuous A/B multivariate testing"
      ]
    }
  ];

  const trafficChannels = [
    {
      title: "In-Page Push & Native",
      reach: "500M+ Daily Imps",
      desc: "Non-intrusive high-CTR ad units delivering genuine user clicks with native content blending."
    },
    {
      title: "Popunder & Direct Domain",
      reach: "1.2B+ Daily Imps",
      desc: "Full-screen high-impact landing page exposure ideal for high-volume conversion offers."
    },
    {
      title: "Social & Search Intent",
      reach: "High Intent Users",
      desc: "Targeted keyword and demographic campaigns driving highly qualified, high-LTV users."
    },
    {
      title: "Video & In-App Inventory",
      reach: "300M+ Monthly Users",
      desc: "Immersive video pre-rolls and rewarded in-app placements for maximum engagement."
    }
  ];

  return (
    <section id="solutions" className="py-16 md:py-24 bg-slate-950 border-b border-indigo-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Performance Architecture & Technology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Next-Generation AdTech Infrastructure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Built for Scalable ROI
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Seekolabs combines proprietary tracking telemetry, direct advertiser integration, and AI fraud suppression to maximize media buying yield and campaign longevity.
            </p>
          </div>

          <div>
            <button
              onClick={onScrollToContact}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Inquire For Media Partnerships</span>
            </button>
          </div>
        </div>

        {/* 4 Core Technology Pillars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/90 border border-indigo-900/50 hover:border-cyan-400/50 rounded-3xl p-8 transition-all duration-300 shadow-xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950 text-cyan-300 border border-cyan-500/30">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {pillar.description}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  {pillar.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Global Traffic Reach & Channel Breakdown */}
        <div className="bg-slate-900 border border-indigo-500/20 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Global Traffic Ecosystem</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Multi-Channel Traffic Distribution
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Our media buying desks operate programmatic ad distribution across high-performing traffic channels, ensuring optimal audience matching for direct advertisers.
              </p>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Targetable GEOs:</span>
                  <span className="text-cyan-400 font-bold">150+ Global Markets</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Tracking Latency:</span>
                  <span className="text-emerald-400 font-bold">&lt; 50ms Real-Time</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Postback Success Rate:</span>
                  <span className="text-indigo-300 font-bold">99.98% Accuracy</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {trafficChannels.map((channel, cIdx) => (
                <div key={cIdx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{channel.title}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold">
                    {channel.reach}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {channel.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Partnership Callout Banner */}
        <div className="mt-12 p-8 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-white">Ready to Scale With Seekolabs?</h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Whether you are an advertiser looking for validated user acquisitions or a media buyer seeking direct advertiser inventory, connect with our management team today.
            </p>
          </div>

          <button
            onClick={onScrollToContact}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shrink-0 flex items-center gap-2 transition-all"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
