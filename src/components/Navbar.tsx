import React from 'react';
import { 
  Send,
  Sun,
  Moon
} from 'lucide-react';
import { SeekoLabsLogo } from './SeekoLabsLogo';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection, theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0B0C0E]/90 border-zinc-800/80 text-slate-100' 
        : 'bg-white/90 border-zinc-200 text-slate-800 shadow-sm'
    }`}>
      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div onClick={() => onScrollToSection('hero')}>
            <SeekoLabsLogo theme={theme} size="md" variant="full" />
          </div>

          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
            <button 
              onClick={() => onScrollToSection('about')}
              className="hover:text-yellow-400 transition-colors"
            >
              About Our House
            </button>
            <button 
              onClick={() => onScrollToSection('solutions')}
              className="hover:text-yellow-400 transition-colors"
            >
              App Ecosystem
            </button>
            <button 
              onClick={() => onScrollToSection('contact')}
              className="hover:text-yellow-400 transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Controls: Theme Switcher & Contact CTA */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 text-yellow-400 hover:bg-zinc-800 hover:border-yellow-400/50'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-900 hover:bg-zinc-200'
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="hidden sm:inline text-zinc-300 text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-zinc-900" />
                  <span className="hidden sm:inline text-zinc-700 text-[11px]">Dark</span>
                </>
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-4 py-2.5 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-yellow-500/20 border border-yellow-300 transition-all hover:scale-105"
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
