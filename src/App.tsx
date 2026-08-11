import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navbar Header */}
      <Navbar onScrollToSection={scrollToSection} />

      {/* Main Single Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onScrollToContact={() => scrollToSection('contact')}
          onScrollToAbout={() => scrollToSection('about')}
        />

        {/* Company Brief & Overview */}
        <AboutSection 
          onScrollToContact={() => scrollToSection('contact')}
        />

        {/* AdTech Infrastructure & Solutions Section */}
        <SolutionsSection 
          onScrollToContact={() => scrollToSection('contact')}
        />

        {/* Lead Collection Form (Primary Goal) */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} />

    </div>
  );
}


