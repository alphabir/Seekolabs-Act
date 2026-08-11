import React from 'react';
import { ShieldCheck, Cpu, Globe, Zap, Code2, Rocket, Layers, ArrowRight, Award, CheckCircle2, AppWindow, Users } from 'lucide-react';

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
              <span>House of Developers & Publishing House</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              A Digital Publishing House <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Driven by Passionate Developers
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              <strong className="text-white font-semibold">Seekolabs</strong> (`seekolabs.tech`) is an independent software publishing house based in Kolkata, India. We are <strong className="text-cyan-300 font-medium">not a client services agency</strong> — we are a collective of product builders and software engineers who build, launch, scale, and publish our own ecosystem of digital products, mobile tools, and web applications.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              By controlling the entire lifecycle from initial architectural concept to code execution, user experience design, and global app store distribution, Seekolabs crafts high-quality software that solves real user needs.
            </p>

            {/* Core Values / Pillars */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1">
                  <Code2 className="w-4 h-4" />
                  <span>100% In-House Engineering</span>
                </div>
                <p className="text-xs text-slate-400">
                  Every product in our portfolio is engineered directly by our core development team with modern TypeScript, React, Cloud Native, and mobile stacks.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                  <Rocket className="w-4 h-4" />
                  <span>Publishing House Model</span>
                </div>
                <p className="text-xs text-slate-400">
                  We invest our own capital, talent, and distribution resources to incubate and grow software products internally.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                  <AppWindow className="w-4 h-4" />
                  <span>Product Diversity</span>
                </div>
                <p className="text-xs text-slate-400">
                  Our app portfolio spans utility software, developer tooling, web productivity platforms, and mobile consumer applications.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-indigo-900/50 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Globe className="w-4 h-4" />
                  <span>Global Reach & Scaling</span>
                </div>
                <p className="text-xs text-slate-400">
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
            <div className="relative rounded-3xl bg-slate-900 border border-indigo-500/30 p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Seekolabs House Manifesto</span>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] rounded-full font-bold">
                    IN-HOUSE PRODUCT STUDIO
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">Why We Build As A Publishing House</h3>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Product Autonomy:</strong> No client specs or agency constraints — we build software we believe in.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Rapid Iteration:</strong> Continuous deployment cycles with immediate user telemetry feedback loops.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Modern Technology Stack:</strong> Full-stack TypeScript, React, Next/Vite, Node.js microservices, and native mobile modules.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Collaborative Ecosystem:</strong> Strategic distribution, co-publishing, and technical integration partnerships.</span>
                  </li>
                </ul>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Direct Leadership Contacts</span>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 font-mono text-xs">
                    <a href="mailto:abir@seekolabs.tech" className="text-cyan-400 font-bold hover:underline">
                      abir@seekolabs.tech
                    </a>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <a href="mailto:aditya@seekolabs.tech" className="text-cyan-400 font-bold hover:underline">
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

