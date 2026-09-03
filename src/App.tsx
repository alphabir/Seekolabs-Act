import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'seekolabs-theme';

/**
 * Reads the theme the inline bootstrap script in index.html already resolved,
 * so React starts on exactly the theme that was painted. Falls back to the
 * stored value, then the OS preference, then dark.
 */
function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';

  const painted = document.documentElement.dataset.theme;
  if (painted === 'light' || painted === 'dark') return painted;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage can throw in private windows or with site data blocked.
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Keep the document attribute and the stored preference in sync with state.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore: the preference simply will not survive this session.
    }
  }, [theme]);

  // Follow the OS preference until the visitor makes an explicit choice.
  useEffect(() => {
    let hasStoredChoice = false;
    try {
      hasStoredChoice = localStorage.getItem(THEME_STORAGE_KEY) !== null;
    } catch {
      hasStoredChoice = false;
    }
    if (hasStoredChoice) return;

    const query = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'light' : 'dark');
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen font-sans selection:bg-[#FFE600] selection:text-black transition-colors duration-300 ${
        isDark ? 'bg-[#0B0C0E] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Skip link: the first tab stop, so keyboard users can bypass the nav. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#FFE600] focus:px-4 focus:py-2.5 focus:text-xs focus:font-black focus:text-[#0B0C0E] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Skip to main content
      </a>

      {/* Navbar Header */}
      <Navbar onScrollToSection={scrollToSection} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Single Page Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onScrollToContact={() => scrollToSection('contact')}
          onScrollToAbout={() => scrollToSection('about')}
          theme={theme}
        />

        {/* Company Brief & Overview */}
        <AboutSection onScrollToContact={() => scrollToSection('contact')} theme={theme} />

        {/* Product Ecosystem & Infrastructure Section */}
        <SolutionsSection onScrollToContact={() => scrollToSection('contact')} theme={theme} />

        {/* Contact Us Section */}
        <ContactForm theme={theme} />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} theme={theme} />
    </div>
  );
}
