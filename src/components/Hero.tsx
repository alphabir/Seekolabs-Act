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

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToAbout: () => void;
  theme: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToContact,
  onScrollToAbout,
  theme
}) => {
  const isDark = theme === 'dark';

  return (
    <section id="hero" className={`relative overflow-hidden pt-10 pb-20 border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-indigo-900/40' : 'bg-slate-50 border-slate-200'
    }`}>
      
      {/* Background Glows */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] blur-3xl pointer-events-none rounded-full ${
        isDark ? 'bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent' : 'bg-gradient-to-b from-cyan-400/20 via-indigo-300/20 to-transparent'
      }`} />
      <div className={`absolute -top-24 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-purple-600/15' : 'bg-purple-300/30'
      }`} />
      <div className={`absolute top-40 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-300/30'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Header */}
        <div className={`relative rounded-3xl border p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-2xl overflow-hidden mb-12 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-900/90 via-blue-950/80 to-slate-900/90 border-indigo-500/30 shadow-indigo-950/50' 
            : 'bg-gradient-to-b from-white via-slate-50 to-indigo-50/50 border-slate-200/80 shadow-slate-300/40'
        }`}>
          
          {/* Background Decorative Graphic */}
          <div className={`absolute top-4 right-6 pointer-events-none hidden lg:block ${
            isDark ? 'opacity-10 text-cyan-400' : 'opacity-5 text-indigo-600'
          }`}>
            <Terminal className="w-80 h-80 rotate-12" />
          </div>

          <div className="max-w-3xl space-y-6 text-left">
            
            {/* Brand Chip */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border ${
              isDark 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                : 'bg-cyan-50 border-cyan-300 text-cyan-700'
            }`}>
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>seekolabs.tech • House of Developers & Digital App Publishing House</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              We Engineer & Publish <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">
                Next-Gen Software & Apps
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              SeekoLabs is an independent app publishing house and product studio powered by a collective of passionate software engineers. Based in Kolkata, India, we build, scale, and publish our own ecosystem of high-performance web applications, mobile software, utilities, and developer tools.
            </p>

            {/* Bullet Highlights */}
            <div className={`grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium pt-2 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>100% In-House Software Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Publishing House Model — Not an Agency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Multi-Platform App Distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Data-Driven Growth & Scaling Engine</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onScrollToContact}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Get In Touch With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToAbout}
                className={`px-6 py-4 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 border-indigo-500/40 text-indigo-200'
                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
                }`}
              >
                <Globe2 className="w-4 h-4 text-indigo-500" />
                <span>Read About Our House</span>
              </button>
            </div>

          </div>

        </div>

        {/* Company Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-slate-900/60 border-indigo-900/40' : 'bg-white/80 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-cyan-500 mb-1">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">In-House Engineers</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>House of Devs</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-slate-900/60 border-indigo-900/40' : 'bg-white/80 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-indigo-500 mb-1">
              <AppWindow className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Product Portfolio</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Web & Mobile Apps</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-slate-900/60 border-indigo-900/40' : 'bg-white/80 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <Rocket className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Business Model</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>App Publishing</div>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
            isDark ? 'bg-slate-900/60 border-indigo-900/40' : 'bg-white/80 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-purple-500 mb-1">
              <Globe2 className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold">Headquarters</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Kolkata, India</div>
          </div>
        </div>

      </div>
    </section>
  );
};
