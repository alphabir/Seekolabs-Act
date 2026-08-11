import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Navbar Header */}
      <Navbar 
        onScrollToSection={scrollToSection} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Single Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onScrollToContact={() => scrollToSection('contact')}
          onScrollToAbout={() => scrollToSection('about')}
          theme={theme}
        />

        {/* Company Brief & Overview */}
        <AboutSection 
          onScrollToContact={() => scrollToSection('contact')}
          theme={theme}
        />

        {/* Product Ecosystem & Infrastructure Section */}
        <SolutionsSection 
          onScrollToContact={() => scrollToSection('contact')}
          theme={theme}
        />

        {/* Contact Us Section */}
        <ContactForm 
          theme={theme}
        />
      </main>

      {/* Footer */}
      <Footer 
        onScrollToSection={scrollToSection} 
        theme={theme}
      />

    </div>
  );
}
