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
  Code2
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
      isDark ? 'bg-slate-950 border-indigo-900/40 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-3 border ${
              isDark 
                ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
                : 'bg-cyan-50 border-cyan-200 text-cyan-700'
            }`}>
              <Layers className="w-3.5 h-3.5" />
              <span>App Publishing Ecosystem</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Our Publishing House <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">
                Product Pillars & Software Engineering
              </span>
            </h2>
            <p className={`text-sm sm:text-base mt-3 leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              At SeekoLabs, we combine modern software engineering, product design, and distribution capabilities to build and publish first-party digital applications.
            </p>
          </div>

          <div>
            <button
              onClick={onScrollToContact}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Get In Touch For Collaborations</span>
            </button>
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
                    ? 'bg-slate-900/90 border-indigo-900/50 hover:border-cyan-400/50'
                    : 'bg-white border-slate-200/80 shadow-slate-200/60 hover:border-cyan-400'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                      isDark 
                        ? 'bg-slate-950 text-cyan-300 border-cyan-500/30' 
                        : 'bg-slate-100 text-cyan-700 border-cyan-200'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black mb-3 group-hover:text-cyan-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {pillar.title}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-6 font-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {pillar.description}
                  </p>
                </div>

                <ul className={`space-y-2.5 pt-4 border-t text-xs ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                }`}>
                  {pillar.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
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
            ? 'bg-slate-900 border-indigo-500/20' 
            : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest border ${
                isDark 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                <Code2 className="w-3.5 h-3.5" />
                <span>House Stack & Infrastructure</span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Engineered In-House From Concept to Code
              </h3>

              <p className={`text-sm leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Our house of developers maintains full control over product architecture, performance optimization, and release schedules to ensure consistent software standards across our app portfolio.
              </p>

              <div className={`p-4 rounded-2xl border space-y-2 font-mono text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`flex justify-between items-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <span>Development Model:</span>
                  <span className="text-cyan-500 dark:text-cyan-400 font-bold">In-House Publishing</span>
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <span>Client Work:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">None (100% First-Party)</span>
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <span>Development Hub:</span>
                  <span className="text-indigo-600 dark:text-indigo-300 font-bold">Kolkata, India</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {houseCapabilities.map((cap, cIdx) => (
                <div key={cIdx} className={`p-5 border rounded-2xl space-y-2 ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cap.title}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold">
                    {cap.category}
                  </span>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
            ? 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-indigo-500/30' 
            : 'bg-gradient-to-r from-indigo-50 via-white to-blue-50 border-slate-200 shadow-md'
        }`}>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Interested in Co-Publishing or Strategic Alliances?</h4>
            <p className={`text-xs max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              SeekoLabs collaborates with distribution partners, platform creators, and tech innovators. Connect with our engineering and publishing team today.
            </p>
          </div>

          <button
            onClick={onScrollToContact}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shrink-0 flex items-center gap-2 transition-all"
          >
            <span>Reach Out To SeekoLabs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
