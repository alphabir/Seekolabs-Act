import React from 'react';
import { 
  Send,
  Code2,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection, theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-950/85 border-indigo-900/40 text-slate-100' 
        : 'bg-white/85 border-slate-200/80 text-slate-800 shadow-sm'
    }`}>
      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
                <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-xl tracking-wider font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  SeekoLabs
                </span>
                <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-cyan-500/20 text-cyan-500 dark:text-cyan-300 border border-cyan-500/30 rounded font-semibold">
                  TECH
                </span>
              </div>
              <p className={`text-[10px] tracking-tight font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                App Publishing House
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center gap-7 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <button 
              onClick={() => onScrollToSection('about')}
              className="hover:text-cyan-500 transition-colors"
            >
              About Our House
            </button>
            <button 
              onClick={() => onScrollToSection('solutions')}
              className="hover:text-cyan-500 transition-colors"
            >
              App Ecosystem
            </button>
            <button 
              onClick={() => onScrollToSection('contact')}
              className="hover:text-cyan-500 transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Controls: Theme Switcher & Contact CTA */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs font-semibold ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200/80'
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-slate-300 text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline text-slate-700 text-[11px]">Dark</span>
                </>
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Connect With Us</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
