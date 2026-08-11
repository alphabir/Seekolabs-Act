import React from 'react';
import { Cpu, Mail, MapPin, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  return (
    <footer className="bg-slate-950 border-t border-indigo-900/40 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollToSection('hero')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-xl tracking-wider text-white">
                SEEKO<span className="text-cyan-400">LABS</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Seekolabs (<code className="text-cyan-300">seekolabs.tech</code>) is a performance marketing adtech engine connecting direct advertisers with high-yield global traffic inventory.
            </p>

            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Georgia • Tbilisi • Global Operations</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>partners@seekolabs.tech</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 font-medium">
              <li onClick={() => onScrollToSection('about')} className="hover:text-cyan-400 cursor-pointer">Company Brief</li>
              <li onClick={() => onScrollToSection('verticals')} className="hover:text-cyan-400 cursor-pointer">CPA Verticals</li>
              <li onClick={() => onScrollToSection('contact')} className="hover:text-cyan-400 cursor-pointer text-cyan-400 font-bold">Partner Inquiry Form</li>
            </ul>
          </div>

          {/* Col 3: Verticals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">CPA Verticals</h4>
            <ul className="space-y-2 font-medium">
              <li onClick={() => onScrollToSection('verticals')} className="hover:text-cyan-400 cursor-pointer">Games & MMORPG</li>
              <li onClick={() => onScrollToSection('verticals')} className="hover:text-cyan-400 cursor-pointer">Live Webcam Streams</li>
              <li onClick={() => onScrollToSection('verticals')} className="hover:text-cyan-400 cursor-pointer">iGaming & Casino</li>
              <li onClick={() => onScrollToSection('verticals')} className="hover:text-cyan-400 cursor-pointer">Casual Dating</li>
              <li onClick={() => onScrollToSection('verticals')} className="hover:text-cyan-400 cursor-pointer">Video-on-Demand</li>
            </ul>
          </div>

          {/* Col 4: Contact CTA */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get Started</h4>
            <p className="text-slate-400 text-xs">
              Connect with our partnership team to access direct CPA offers or buy premium traffic.
            </p>

            <button
              onClick={() => onScrollToSection('contact')}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Partnership Form</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-slate-200">Seekolabs Tech</span> (seekolabs.tech). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Contact Us</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

