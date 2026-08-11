import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  BarChart3, 
  Layers, 
  Rocket, 
  Cpu, 
  CreditCard,
  Target
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'landing' | 'dashboard' | 'offers' | 'ai-studio' | 'calculator';
  setCurrentTab: (tab: 'landing' | 'dashboard' | 'offers' | 'ai-studio' | 'calculator') => void;
  walletBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, walletBalance }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-900/40 text-slate-100 transition-all">
      {/* Top Ticker Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-950/80 to-purple-900/60 border-b border-indigo-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-indigo-300 font-medium overflow-hidden">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">LIVE TRAFFIC ENGINE:</span>
            <span className="truncate">
              12,430+ Conversions/Min • Avg EPC $2.14 • <span className="text-indigo-200">Zero-Fraud AI Protected</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>seekolabs.tech</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Meet Us @ G Gate Conf (Georgia)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-300 font-sans">
                  SEEKO<span className="text-cyan-400">LABS</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded font-semibold">
                  TECH
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight font-mono">Performance CPA & Traffic Engine</p>
            </div>
          </div>

          {/* Nav Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-indigo-900/50">
            <button
              onClick={() => setCurrentTab('landing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'landing'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Overview & Verticals
            </button>

            <button
              onClick={() => setCurrentTab('offers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'offers'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>CPA Offers</span>
            </button>

            <button
              onClick={() => setCurrentTab('ai-studio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'ai-studio'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Creative Studio</span>
            </button>

            <button
              onClick={() => setCurrentTab('calculator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'calculator'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>ROI Calculator</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-indigo-900/60 px-3 py-1.5 rounded-xl">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[9px] uppercase leading-none">Wallet</span>
                <span className="font-bold text-emerald-400 font-mono">${walletBalance.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{currentTab === 'dashboard' ? 'Active Dashboard' : 'Client Dashboard'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
