import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { SeekoLabsLogo } from './SeekoLabsLogo';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t text-xs py-12 transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0B0C0E] border-zinc-800 text-zinc-400' 
        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => onScrollToSection('hero')}>
              <SeekoLabsLogo variant="full" theme="dark" size="md" />
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed">
              SeekoLabs (<code className="text-yellow-400">seekolabs.tech</code>) is a digital app publishing house and product studio. We engineer, launch, and scale our own ecosystem of software products.
            </p>

            <div className="flex items-center gap-2 text-zinc-300 text-xs">
              <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Kolkata, India • Global Publishing</span>
            </div>

            <div className="space-y-1.5 text-zinc-300 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href="mailto:connect@seekolabs.tech" className="hover:text-yellow-400 font-mono font-medium">connect@seekolabs.tech</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href="mailto:support@seekolabs.tech" className="hover:text-yellow-400 font-mono font-medium">support@seekolabs.tech</a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 font-medium">
              <li onClick={() => onScrollToSection('about')} className="hover:text-yellow-400 cursor-pointer">About Our House</li>
              <li onClick={() => onScrollToSection('solutions')} className="hover:text-yellow-400 cursor-pointer">App Ecosystem</li>
              <li onClick={() => onScrollToSection('contact')} className="hover:text-yellow-400 cursor-pointer text-yellow-400 font-bold">Contact Us</li>
            </ul>
          </div>

          {/* Col 3: Publishing House Focus */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Publishing Focus</h4>
            <ul className="space-y-2 font-medium">
              <li onClick={() => onScrollToSection('solutions')} className="hover:text-yellow-400 cursor-pointer">Web & Productivity Apps</li>
              <li onClick={() => onScrollToSection('solutions')} className="hover:text-yellow-400 cursor-pointer">Mobile Utilities & Tools</li>
              <li onClick={() => onScrollToSection('solutions')} className="hover:text-yellow-400 cursor-pointer">Developer Tools & APIs</li>
              <li onClick={() => onScrollToSection('solutions')} className="hover:text-yellow-400 cursor-pointer">App Incubator & Growth</li>
            </ul>
          </div>

          {/* Col 4: Contact CTA */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect</h4>
            <p className="text-zinc-400 text-xs">
              Collaborate with SeekoLabs for app co-publishing, distribution, or technical alliances.
            </p>

            <button
              onClick={() => onScrollToSection('contact')}
              className="w-full py-2.5 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md border border-yellow-300 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact SeekoLabs</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-zinc-200">SeekoLabs Tech</span> (seekolabs.tech). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-200 cursor-pointer" onClick={() => onScrollToSection('contact')}>Privacy Policy</span>
            <span className="hover:text-zinc-200 cursor-pointer" onClick={() => onScrollToSection('contact')}>Terms of Service</span>
            <span className="hover:text-zinc-200 cursor-pointer" onClick={() => onScrollToSection('contact')}>Contact Us</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
