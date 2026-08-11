import React from 'react';
import { Cpu, Globe, ShieldCheck, Mail, MapPin, ExternalLink, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'landing' | 'dashboard' | 'offers' | 'ai-studio' | 'calculator') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-indigo-900/40 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-xl tracking-wider text-white">
                SEEKO<span className="text-cyan-400">LABS</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              SeekoLabs (<code className="text-cyan-300">seekolabs.tech</code>) is a global performance ad network and media buying engine delivering high-converting traffic to top CPA, CPL, and CPS offers.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Georgia • Tbilisi • Global Operations</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>partners@seekolabs.tech</span>
            </div>
          </div>

          {/* Col 2: High-Payout Verticals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">CPA Verticals</h4>
            <ul className="space-y-2 font-medium">
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">Games & MMORPG</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">Live Webcam Streams</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">iGaming & Casino 777</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">Casual Adult Dating</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">Video-on-Demand (VOD)</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">Betting & Sportsbook</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">Nutra & Weight Loss</li>
            </ul>
          </div>

          {/* Col 3: Platform Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">AdTech Suite</h4>
            <ul className="space-y-2 font-medium">
              <li onClick={() => onNavigate('dashboard')} className="hover:text-cyan-400 cursor-pointer">Client Advertiser Portal</li>
              <li onClick={() => onNavigate('offers')} className="hover:text-cyan-400 cursor-pointer">CPA Offer Marketplace</li>
              <li onClick={() => onNavigate('ai-studio')} className="hover:text-cyan-400 cursor-pointer flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Creative Studio</span>
              </li>
              <li onClick={() => onNavigate('calculator')} className="hover:text-cyan-400 cursor-pointer">ROI & Media Buying Calculator</li>
              <li onClick={() => onNavigate('dashboard')} className="hover:text-cyan-400 cursor-pointer">S2S Postback Tester</li>
            </ul>
          </div>

          {/* Col 4: Conferences & Events */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Meet SeekoLabs</h4>
            <div className="p-3 bg-slate-900 border border-indigo-900/60 rounded-xl space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase block">G Gate Conf 2026</span>
              <span className="text-xs text-white font-bold block">26 - 27 June • Tbilisi, Georgia</span>
              <span className="text-[10px] text-slate-400 block">Booth #B-14 VIP Lounge</span>
            </div>
            <div className="p-3 bg-slate-900 border border-indigo-900/60 rounded-xl space-y-1">
              <span className="text-[10px] text-cyan-300 font-bold uppercase block">Affiliate World Europe</span>
              <span className="text-xs text-white font-bold block">12 - 14 July • Barcelona</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-slate-200">SeekoLabs Engine</span> (seekolabs.tech). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Anti-Fraud Telemetry</span>
            <span className="hover:text-slate-200 cursor-pointer">API Specs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
