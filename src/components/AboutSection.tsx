import React from 'react';
import { Cpu, Globe, Code2, Rocket, ArrowRight, CheckCircle2, AppWindow } from 'lucide-react';

interface AboutSectionProps {
  onScrollToContact: () => void;
  theme: 'dark' | 'light';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onScrollToContact, theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="about" className={`py-16 md:py-24 border-b relative transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-indigo-900/40 text-slate-100' : 'bg-slate-100/70 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Company Brief Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest border ${
              isDark 
                ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <Cpu className="w-3.5 h-3.5" />
              <span>House of Developers & Publishing House</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              A Digital Publishing House <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">
                Driven by Passionate Developers
              </span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>SeekoLabs</strong> (`seekolabs.tech`) is an independent software publishing house based in Kolkata, India. We are <strong className="text-cyan-600 dark:text-cyan-300 font-medium">not a client services agency</strong> — we are a collective of product builders and software engineers who build, launch, scale, and publish our own ecosystem of digital products, mobile tools, and web applications.
            </p>

            <p className={`text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              By controlling the entire lifecycle from initial architectural concept to code execution, user experience design, and global app store distribution, SeekoLabs crafts high-quality software that solves real user needs.
            </p>

            {/* Core Values / Pillars */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/80 border-indigo-900/50' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 text-cyan-500 dark:text-cyan-400 font-bold text-sm mb-1">
                  <Code2 className="w-4 h-4" />
                  <span>100% In-House Engineering</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Every product in our portfolio is engineered directly by our core development team with modern TypeScript, React, Cloud Native, and mobile stacks.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/80 border-indigo-900/50' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-bold text-sm mb-1">
                  <Rocket className="w-4 h-4" />
                  <span>Publishing House Model</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  We invest our own capital, talent, and distribution resources to incubate and grow software products internally.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/80 border-indigo-900/50' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 text-purple-500 dark:text-purple-400 font-bold text-sm mb-1">
                  <AppWindow className="w-4 h-4" />
                  <span>Product Diversity</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Our app portfolio spans utility software, developer tooling, web productivity platforms, and mobile consumer applications.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/80 border-indigo-900/50' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-bold text-sm mb-1">
                  <Globe className="w-4 h-4" />
                  <span>Global Reach & Scaling</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  We ship software to users across North America, Europe, Asia, and emerging markets with localized user experiences.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onScrollToContact}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <span>Connect With Leadership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Key Company Visual Card */}
          <div className="lg:col-span-5">
            <div className={`relative rounded-3xl border p-8 shadow-2xl overflow-hidden transition-all ${
              isDark 
                ? 'bg-slate-900 border-indigo-500/30' 
                : 'bg-white border-slate-200 shadow-slate-200/80'
            }`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-500 dark:text-cyan-400 font-bold">SeekoLabs House Manifesto</span>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] rounded-full font-bold">
                    IN-HOUSE PRODUCT STUDIO
                  </span>
                </div>

                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Why We Build As A Publishing House</h3>

                <ul className={`space-y-3 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span><strong>Product Autonomy:</strong> No client specs or agency constraints — we build software we believe in.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span><strong>Rapid Iteration:</strong> Continuous deployment cycles with immediate user telemetry feedback loops.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span><strong>Modern Technology Stack:</strong> Full-stack TypeScript, React, Next/Vite, Node.js microservices, and native mobile modules.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span><strong>Collaborative Ecosystem:</strong> Strategic distribution, co-publishing, and technical integration partnerships.</span>
                  </li>
                </ul>

                <div className={`p-4 rounded-2xl border text-center space-y-1 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Direct Leadership Contacts</span>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 font-mono text-xs">
                    <a href="mailto:abir@seekolabs.tech" className="text-cyan-500 dark:text-cyan-400 font-bold hover:underline">
                      abir@seekolabs.tech
                    </a>
                    <span className="text-slate-400 hidden sm:inline">•</span>
                    <a href="mailto:aditya@seekolabs.tech" className="text-cyan-500 dark:text-cyan-400 font-bold hover:underline">
                      aditya@seekolabs.tech
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
