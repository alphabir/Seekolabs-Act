import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Send, Sun, Moon, Menu, X } from 'lucide-react';
import { SeekoLabsLogo } from './SeekoLabsLogo';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NAV_LINKS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'about', label: 'About Our House' },
  { id: 'solutions', label: 'App Ecosystem' },
  { id: 'contact', label: 'Contact Us' },
];

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection, theme, toggleTheme }) => {
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Escape closes the menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  // A resize past the md breakpoint reveals the desktop nav, so drop the panel.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setIsMenuOpen(false);
      onScrollToSection(sectionId);
    },
    [onScrollToSection],
  );

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0C0E]/90 border-zinc-800/80 text-slate-100'
          : 'bg-white/90 border-zinc-200 text-slate-800 shadow-sm'
      }`}
    >
      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigate('hero')}
            className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="SeekoLabs — back to top"
          >
            <SeekoLabsLogo theme={theme} size="md" variant="full" />
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary"
            className={`hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-zinc-300' : 'text-zinc-600'
            }`}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavigate(link.id)}
                className="rounded hover:text-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Controls: Theme Switcher, Contact CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 text-yellow-400 hover:bg-zinc-800 hover:border-yellow-400/50'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-900 hover:bg-zinc-200'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                  <span className="hidden sm:inline text-zinc-300 text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-zinc-900" aria-hidden="true" />
                  <span className="hidden sm:inline text-zinc-700 text-[11px]">Dark</span>
                </>
              )}
            </button>

            {/* Desktop CTA Button */}
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className="hidden sm:flex px-4 py-2.5 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black rounded-xl text-xs items-center gap-2 shadow-lg shadow-yellow-500/20 border border-yellow-300 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Connect With Us</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`md:hidden p-2.5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 text-yellow-400 hover:bg-zinc-800 hover:border-yellow-400/50'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-900 hover:bg-zinc-200'
              }`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <nav
        id="mobile-navigation"
        aria-label="Primary"
        hidden={!isMenuOpen}
        className={`md:hidden border-t ${
          isDark ? 'bg-[#0B0C0E]/98 border-zinc-800' : 'bg-white/98 border-zinc-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavigate(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:border-yellow-400/50 hover:text-yellow-400'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-yellow-500 hover:text-zinc-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className="mt-1 w-full px-4 py-3 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg border border-yellow-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Connect With Us</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
