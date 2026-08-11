import React from 'react';
import { 
  Globe, 
  Cpu, 
  Send,
  Code2
} from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-indigo-900/40 text-slate-100 transition-all">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-950/80 to-slate-900/60 border-b border-indigo-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-indigo-300 font-medium text-[11px]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">SEEKOLABS PUBLISHING HOUSE:</span>
            <span>House of Developers • In-House Software Products & Applications</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>seekolabs.tech</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-wider text-white font-sans">
                  SeekoLabs
                </span>
                <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded font-semibold">
                  TECH
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight font-mono">App Publishing House</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button 
              onClick={() => onScrollToSection('about')}
              className="hover:text-cyan-400 transition-colors"
            >
              About Our House
            </button>
            <button 
              onClick={() => onScrollToSection('solutions')}
              className="hover:text-cyan-400 transition-colors"
            >
              App Ecosystem
            </button>
            <button 
              onClick={() => onScrollToSection('contact')}
              className="hover:text-cyan-400 transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Contact CTA */}
          <div>
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
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


