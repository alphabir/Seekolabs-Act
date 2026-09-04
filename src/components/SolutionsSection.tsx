import React from 'react';
import { 
  AppWindow, 
  Smartphone, 
  Rocket, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Send,
  Terminal,
  Code2,
  Dices,
  ShieldCheck
} from 'lucide-react';

interface SolutionsSectionProps {
  onScrollToContact: () => void;
  theme: 'dark' | 'light';
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onScrollToContact, theme }) => {
  const isDark = theme === 'dark';

  const publishingPillars = [
    {
      icon: AppWindow,
      title: "Web Applications & Productivity Studios",
      badge: "In-House Products",
      description: "We build intuitive, ultra-fast web applications designed for high daily utility, rich user engagement, and clean desktop performance.",
      points: [
        "Modern React & TypeScript frontend architectures",
        "Sub-second load times & responsive design",
        "In-house UX design & component systems"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Tools & Utility Applications",
      badge: "iOS & Android",
      description: "Consumer utilities, productivity helpers, and mobile software built for performance, security, and global app store distribution.",
      points: [
        "Cross-platform mobile engineering",
        "Lightweight offline-first data persistence",
        "Seamless multi-device synchronization"
      ]
    },
    {
      icon: Terminal,
      title: "Developer Tooling & Micro-SaaS",
      badge: "Developer House",
      description: "Developer-focused APIs, code utilities, and specialized web tools crafted to solve complex software engineering bottlenecks.",
      points: [
        "API-first architecture & developer SDKs",
        "Real-time data processing microservices",
        "Automated deployment & CI/CD pipelines"
      ]
    },
    {
      icon: Rocket,
      title: "App Incubator & Growth Engine",
      badge: "In-House Scale",
      description: "Our publishing desk runs continuous R&D, rapid prototyping, and user acquisition strategies to scale our app portfolio globally.",
      points: [
        "Data-driven App Store Optimization (ASO)",
        "User retention & telemetry analytics",
        "Continuous feature iteration & testing"
      ]
    }
  ];

  const houseCapabilities = [
    {
      title: "Full-Stack Development",
      category: "Core Stack",
      desc: "TypeScript, React, Node.js, Express, and cloud native backend services."
    },
    {
      title: "UI/UX Product Design",
      category: "Design System",
      desc: "Pixel-perfect user interfaces, custom component libraries, and intuitive user journeys."
    },
    {
      title: "Global Distribution",
      category: "Publishing",
      desc: "Deploying and managing applications across web domains and app marketplaces."
    },
    {
      title: "Telemetry & Performance",
      category: "Analytics",
      desc: "Real-time error logging, performance monitoring, and user conversion insights."
    }
  ];

  return (
    <section id="solutions" className={`py-16 md:py-24 border-b relative transition-colors duration-300 ${
      isDark ? 'bg-[#0B0C0E] border-zinc-800 text-slate-100' : 'bg-zinc-100 border-zinc-200 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-3 border ${
              isDark 
                ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' 
                : 'bg-yellow-100 border-yellow-300 text-zinc-900'
            }`}>
              <Layers className="w-3.5 h-3.5 text-yellow-400" />
              <span>App Publishing Ecosystem</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-zinc-900'
            }`}>
              Our Publishing House <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
                Product Pillars & Software Engineering
              </span>
            </h2>
            <p className={`text-sm sm:text-base mt-3 leading-relaxed font-normal ${
              isDark ? 'text-zinc-300' : 'text-zinc-600'
            }`}>
              At SeekoLabs, we combine modern software engineering, product design, and distribution capabilities to build and publish first-party digital applications.
            </p>
          </div>

          <div>
            <button
              onClick={onScrollToContact}
              className="px-6 py-3 rounded-xl bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black text-xs flex items-center gap-2 shadow-lg border border-yellow-300 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Get In Touch For Collaborations</span>
            </button>
          </div>
        </div>

        {/*
          Our first shipped product. A plain <a>, not a router link, because /ludo-apex/ is
          a static page served from public/ and leaving the SPA is the point. Until this
          existed nothing on the site pointed at that page at all.

          The claims below are the ones the app can actually support: no ads, no sign-up,
          fully offline, nothing collected. Deliberately no mention of matchmaking, online
          play or voice chat — Google cross-checks marketing copy against the listing and
          the build, and the app has none of those.
        */}
        <div className={`rounded-3xl border p-8 sm:p-10 mb-16 relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-br from-zinc-900/95 to-[#121316] border-yellow-500/30'
            : 'bg-gradient-to-br from-white to-yellow-50/50 border-zinc-200 shadow-xl'
        }`}>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl bg-yellow-500/10 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-4 border ${
                isDark
                  ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400'
                  : 'bg-yellow-100 border-yellow-300 text-zinc-900'
              }`}>
                <Rocket className="w-3.5 h-3.5 text-yellow-400" />
                <span>Our First Release</span>
              </div>

              <h3 className={`text-3xl sm:text-4xl font-black tracking-tight mb-3 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                Ludo Apex
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                isDark ? 'text-zinc-300' : 'text-zinc-600'
              }`}>
                The classic board game, re-engineered for the modern player. Four players on
                one device, three tiers of AI built from real strategy, and a rule set tested
                to be fair.
              </p>

              <ul className={`grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm mb-8 ${
                isDark ? 'text-zinc-200' : 'text-zinc-800'
              }`}>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>No ads. Not fewer, none.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>No sign-up, no account</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Plays fully offline</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Zero data collected</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/ludo-apex/"
                  className="px-6 py-3.5 rounded-xl bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black text-sm inline-flex items-center gap-2 shadow-lg shadow-yellow-500/20 border border-yellow-300 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                >
                  <span>Explore Ludo Apex</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                {/*
                  PRE-LAUNCH. Swap this note for the official Google Play badge once the
                  listing is live. Never put up a store button that goes nowhere.
                */}
                <span className={`font-mono text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Coming soon to Google Play
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`rounded-2xl border p-6 ${
                isDark ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <Dices className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      Android
                    </div>
                    <div className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Free, no purchases
                    </div>
                  </div>
                </div>

                <dl className={`space-y-3 text-xs border-t pt-4 ${
                  isDark ? 'border-zinc-800' : 'border-zinc-200'
                }`}>
                  <div className="flex justify-between gap-4">
                    <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Players</dt>
                    <dd className={`font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>2 &ndash; 4, one device</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>AI tiers</dt>
                    <dd className={`font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>Three</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Connection</dt>
                    <dd className={`font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>Not needed</dd>
                  </div>
                </dl>

                <a
                  href="/ludo-apex/privacy.html"
                  className={`mt-5 flex items-center gap-2 text-xs font-medium transition-colors ${
                    isDark ? 'text-zinc-400 hover:text-yellow-400' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Privacy policy</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Publishing Pillars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {publishingPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className={`border rounded-3xl p-8 transition-all duration-300 shadow-xl relative overflow-hidden group flex flex-col justify-between ${
                  isDark
                    ? 'bg-zinc-900/90 border-zinc-800 hover:border-yellow-400/50'
                    : 'bg-white border-zinc-200 shadow-zinc-200/60 hover:border-yellow-500'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-yellow-500/10 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                      isDark 
                        ? 'bg-zinc-950 text-yellow-400 border-yellow-400/30' 
                        : 'bg-zinc-100 text-zinc-900 border-zinc-200'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black mb-3 group-hover:text-yellow-400 transition-colors ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {pillar.title}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-6 font-normal ${
                    isDark ? 'text-zinc-300' : 'text-zinc-600'
                  }`}>
                    {pillar.description}
                  </p>
                </div>

                <ul className={`space-y-2.5 pt-4 border-t text-xs ${
                  isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-200 text-zinc-700'
                }`}>
                  {pillar.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Product Studio Capabilities Grid */}
        <div className={`border rounded-3xl p-8 sm:p-12 relative overflow-hidden transition-all ${
          isDark 
            ? 'bg-zinc-900 border-yellow-500/20' 
            : 'bg-white border-zinc-200 shadow-xl shadow-zinc-200/50'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest border ${
                isDark 
                  ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' 
                  : 'bg-yellow-100 border-yellow-300 text-zinc-900'
              }`}>
                <Code2 className="w-3.5 h-3.5 text-yellow-400" />
                <span>House Stack & Infrastructure</span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Engineered In-House From Concept to Code
              </h3>

              <p className={`text-sm leading-relaxed font-normal ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Our house of developers maintains full control over product architecture, performance optimization, and release schedules to ensure consistent software standards across our app portfolio.
              </p>

              <div className={`p-4 rounded-2xl border space-y-2 font-mono text-xs ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className={`flex justify-between items-center ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <span>Development Model:</span>
                  <span className="text-yellow-400 font-bold">In-House Publishing</span>
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <span>Client Work:</span>
                  <span className="text-yellow-400 font-bold">None (100% First-Party)</span>
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <span>Development Hub:</span>
                  <span className="text-yellow-400 font-bold">Kolkata, India</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {houseCapabilities.map((cap, cIdx) => (
                <div key={cIdx} className={`p-5 border rounded-2xl space-y-2 ${
                  isDark ? 'bg-zinc-950/80 border-zinc-800 hover:border-yellow-400/30' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{cap.title}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 font-mono text-[10px] font-bold">
                    {cap.category}
                  </span>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Partnership Callout Banner */}
        <div className={`mt-12 p-8 border rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isDark 
            ? 'bg-gradient-to-r from-zinc-900 via-[#141518] to-zinc-900 border-yellow-500/30' 
            : 'bg-gradient-to-r from-yellow-50 via-white to-amber-50 border-zinc-200 shadow-md'
        }`}>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>Interested in Co-Publishing or Strategic Alliances?</h4>
            <p className={`text-xs max-w-xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              SeekoLabs collaborates with distribution partners, platform creators, and tech innovators. Connect with our engineering and publishing team today.
            </p>
          </div>

          <button
            onClick={onScrollToContact}
            className="px-6 py-3 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shrink-0 flex items-center gap-2 border border-yellow-300 transition-all"
          >
            <span>Reach Out To SeekoLabs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
