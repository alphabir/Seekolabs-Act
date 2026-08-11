import React from 'react';
import { 
  Gamepad2, 
  Video, 
  Dices, 
  Heart, 
  Tv, 
  Trophy, 
  Activity, 
  ArrowUpRight, 
  Flame,
  Send
} from 'lucide-react';

interface NicheGridProps {
  onScrollToContact: () => void;
}

export const NicheGrid: React.FC<NicheGridProps> = ({ onScrollToContact }) => {
  const niches = [
    {
      title: 'Games',
      subtitle: 'Free-to-play, MMORPG, Sci-Fi & Mobile Gaming',
      epc: '$1.45',
      avgCR: '12.8%',
      geos: 'USA, DEU, FRA, JPN',
      badge: 'High Conversion',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      color: 'from-cyan-500/80 to-blue-600/80',
      icon: Gamepad2
    },
    {
      title: 'Webcam',
      subtitle: 'HD Live Streams, Token Top-ups & Pay-Per-View',
      epc: '$2.10',
      avgCR: '9.4%',
      geos: 'USA, CAN, GBR, NLD',
      badge: 'High RevShare',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      color: 'from-fuchsia-600/80 to-purple-800/80',
      icon: Video
    },
    {
      title: 'iGaming',
      subtitle: 'Licensed Casino, 777 Slots & Live Dealer',
      epc: '$4.25',
      avgCR: '6.8%',
      geos: 'DEU, AUT, BRA, CAN',
      badge: 'Highest Payout ($145)',
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
      color: 'from-amber-500/80 to-yellow-600/80',
      icon: Dices
    },
    {
      title: 'Dating',
      subtitle: 'Casual Dating, Adult Dating & Geo-Smart SOI',
      epc: '$1.85',
      avgCR: '14.2%',
      geos: 'USA, GBR, AUS, ITA',
      badge: 'High Volume',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      color: 'from-rose-500/80 to-pink-600/80',
      icon: Heart
    },
    {
      title: 'Video-on-demand',
      subtitle: '4K Movie Streaming, Sports VOD & Trial CC Submits',
      epc: '$2.40',
      avgCR: '11.1%',
      geos: 'USA, CAN, FRA, ESP',
      badge: '$1 CC Trial',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-600/80 to-indigo-800/80',
      icon: Tv
    },
    {
      title: 'Betting',
      subtitle: 'Sportsbook, UEFA Football & In-Play Wagers',
      epc: '$3.90',
      avgCR: '7.5%',
      geos: 'GBR, DEU, BRA, ESP',
      badge: '$110 CPA',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      color: 'from-red-600/80 to-orange-700/80',
      icon: Trophy
    },
    {
      title: 'Nutra',
      subtitle: 'Keto, Weight Loss, VSL & Fitness Supplements',
      epc: '$3.10',
      avgCR: '8.9%',
      geos: 'USA, CAN, AUS, GBR',
      badge: 'High SS Sales',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      color: 'from-amber-600/80 to-orange-600/80',
      icon: Activity
    }
  ];

  return (
    <section id="verticals" className="py-16 md:py-24 bg-slate-950 border-b border-indigo-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>High-Payout CPA Niches</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Industry Verticals
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Seekolabs provides direct advertiser CPA & CPL offers across lucrative global niches with pre-tested high converting landers and anti-bot traffic security.
            </p>
          </div>

          <div>
            <button
              onClick={onScrollToContact}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-cyan-300 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Request Custom Offer Inventory</span>
            </button>
          </div>
        </div>

        {/* Niche Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {niches.map((niche) => {
            const Icon = niche.icon;

            return (
              <div
                key={niche.title}
                onClick={onScrollToContact}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 shadow-xl cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between min-h-[340px]"
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={niche.image}
                    alt={niche.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75 group-hover:brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${niche.color} mix-blend-multiply opacity-80 group-hover:opacity-60 transition-opacity`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Top Badge Overlay */}
                <div className="relative z-10 p-5 flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                    {niche.badge}
                  </span>

                  <div className="w-9 h-9 rounded-2xl bg-slate-950/70 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Content Overlay */}
                <div className="relative z-10 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                      {niche.title}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black text-white tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                    {niche.title}
                  </h3>

                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {niche.subtitle}
                  </p>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                    <div className="bg-slate-950/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
                      <span className="text-[9px] text-slate-400 uppercase block font-mono">Avg EPC</span>
                      <span className="font-bold text-emerald-400 font-mono text-sm">{niche.epc}</span>
                    </div>
                    <div className="bg-slate-950/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
                      <span className="text-[9px] text-slate-400 uppercase block font-mono">Avg CR</span>
                      <span className="font-bold text-cyan-300 font-mono text-sm">{niche.avgCR}</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

