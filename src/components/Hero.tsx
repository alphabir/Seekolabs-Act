import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  Activity, 
  Globe2, 
  Layers, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  Search,
  Megaphone,
  Users
} from 'lucide-react';

interface HeroProps {
  onBrowseOffers: () => void;
  onOpenDashboard: () => void;
  onOpenAIStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBrowseOffers,
  onOpenDashboard,
  onOpenAIStudio
}) => {
  const [riskSlider, setRiskSlider] = useState<number>(35); // 0 = Strict, 50 = Optimal Risk, 100 = Max Aggressive

  // Calculate simulated speed and risk metrics
  const conversionSpeed = Math.round(8000 + riskSlider * 120);
  const fraudScore = Math.max(0.1, (100 - riskSlider) * 0.05).toFixed(1);
  const avgROI = Math.round(180 + riskSlider * 2.8);

  return (
    <div className="relative overflow-hidden bg-slate-950 pt-8 pb-16 border-b border-indigo-900/40">
      {/* Glow Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Header - TrafficStars / SeekoLabs Style Banner */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-blue-950/80 to-slate-900/90 border border-indigo-500/30 p-6 md:p-12 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl overflow-hidden mb-12">
          
          {/* Background Decorative 3D Glowing Elements */}
          <div className="absolute top-4 right-6 opacity-20 pointer-events-none">
            <Megaphone className="w-64 h-64 text-indigo-400 rotate-12" />
          </div>
          <div className="absolute -bottom-10 -left-10 opacity-15 pointer-events-none">
            <Globe2 className="w-80 h-80 text-cyan-400" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Brand Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-orange-400 animate-spin" />
                <span>seekolabs.tech • Next-Gen CPA Traffic Engine</span>
              </div>

              {/* Main Headline (Inspired by "How to Drive Traffic to CPA Offers") */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                How to Drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">High-Intent Traffic</span> to CPA Offers
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Scale your media buying campaigns with SeekoLabs’ AI-powered ad bidding, anti-fraud telemetry, and high-payout direct CPA offers across Games, iGaming, Dating, Nutra, VOD & Betting.
              </p>

              {/* Bullet Features */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Real-time S2S Postbacks & Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>99.8% AI Fraud Filtering & Bot Defense</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Auto CPT/CPC Bidding Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Exclusive High-EPC Direct Advertiser Offers</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onBrowseOffers}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <Target className="w-4 h-4" />
                  <span>Explore CPA Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenDashboard}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-indigo-200 font-bold text-sm flex items-center gap-2.5 transition-all"
                >
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Launch Campaign</span>
                </button>

                <button
                  onClick={onOpenAIStudio}
                  className="px-5 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AI Ad Copy Generator</span>
                </button>
              </div>

            </div>

            {/* Right Column: Reference Images Re-creation (12,430 Fast Graph & Risk/Speed Gauge) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Rising Conversion Chart ("12,430 fast") */}
              <div className="relative rounded-2xl bg-slate-950/90 border border-indigo-500/30 p-5 shadow-2xl backdrop-blur-xl group hover:border-cyan-400/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold block">Live Conversion Velocity</span>
                    <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
                      <span>{conversionSpeed.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        +34.2% fast
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-cyan-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                {/* Simulated SVG Graph matching Reference Image 1 */}
                <div className="relative h-28 w-full mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,80 Q 40,20 80,45 T 160,25 T 240,60 T 300,10 L 300,100 L 0,100 Z"
                      fill="url(#blueGlow)"
                    />
                    <path
                      d="M 0,80 Q 40,20 80,45 T 160,25 T 240,60 T 300,10"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Glowing pulse dot */}
                    <circle cx="300" cy="10" r="6" fill="#38bdf8" className="animate-ping" />
                    <circle cx="300" cy="10" r="4" fill="#ffffff" />
                  </svg>
                  <span className="absolute bottom-1 right-2 text-[10px] text-slate-400 font-mono">Real-time S2S Logs</span>
                </div>
              </div>

              {/* Card 2: Speedometer Risk Gauge matching Reference Image 2 */}
              <div className="rounded-2xl bg-slate-950/90 border border-indigo-500/30 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold block">Conversion Risk Engine</span>
                    <span className="text-sm font-bold text-white">
                      Risk Profile: <span className="text-emerald-400">Optimal Velocity</span>
                    </span>
                  </div>
                  <span className="text-xs text-indigo-300 bg-indigo-900/40 px-2.5 py-1 rounded-full border border-indigo-700/50 font-mono">
                    ROI: {avgROI}%
                  </span>
                </div>

                {/* Speedometer Arc SVG */}
                <div className="relative flex flex-col items-center justify-center my-2">
                  <div className="relative w-48 h-24 overflow-hidden">
                    {/* Arc SVG */}
                    <svg className="w-48 h-48" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="8"
                        strokeDasharray="125.6 125.6"
                        transform="rotate(180 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#speedGradient)"
                        strokeWidth="8"
                        strokeDasharray="125.6 125.6"
                        strokeDashoffset={125.6 - (125.6 * riskSlider) / 100}
                        transform="rotate(180 50 50)"
                        className="transition-all duration-300"
                      />
                      <defs>
                        <linearGradient id="speedGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#84cc16" />
                          <stop offset="50%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Needle */}
                    <div 
                      className="absolute bottom-0 left-1/2 w-1 h-20 bg-gradient-to-t from-white to-cyan-400 origin-bottom transform -translate-x-1/2 transition-transform duration-300 shadow-md shadow-cyan-400"
                      style={{ transform: `translateX(-50%) rotate(${ (riskSlider / 100) * 180 - 90 }deg)` }}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-cyan-500" />
                  </div>

                  <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono mt-1 px-4">
                    <span className="text-emerald-400 font-bold">Strict Low Risk</span>
                    <span className="text-yellow-400 font-bold">Optimal Velocity</span>
                    <span className="text-red-400 font-bold">Aggressive Volume</span>
                  </div>
                </div>

                {/* Risk Slider Controls */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Adjust Campaign Traffic Risk Threshold:</span>
                    <span className="font-bold font-mono text-cyan-400">{riskSlider}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={riskSlider}
                    onChange={(e) => setRiskSlider(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Global Key Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-indigo-900/40 p-4 rounded-2xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block font-mono">Monthly Active Ad Impressions</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">4.2 Billion+</div>
          </div>
          <div className="bg-slate-900/60 border border-indigo-900/40 p-4 rounded-2xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block font-mono">Direct Advertiser Offers</span>
            <div className="text-2xl font-black text-blue-400 mt-1">500+ Exclusive</div>
          </div>
          <div className="bg-slate-900/60 border border-indigo-900/40 p-4 rounded-2xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block font-mono">Top Performing Verticals</span>
            <div className="text-2xl font-black text-purple-400 mt-1">7 Key Niches</div>
          </div>
          <div className="bg-slate-900/60 border border-indigo-900/40 p-4 rounded-2xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block font-mono">Real-time S2S Postback Latency</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">&lt; 45ms Avg</div>
          </div>
        </div>

      </div>
    </div>
  );
};
