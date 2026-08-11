import React, { useState } from 'react';
import { 
  Gamepad2, 
  Video, 
  Dices, 
  Heart, 
  Tv, 
  Trophy, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  CheckCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { CPAOffer, Vertical } from '../types';

interface NicheGridProps {
  offers: CPAOffer[];
  onSelectVertical: (vertical: Vertical) => void;
  onLaunchOffer: (offer: CPAOffer) => void;
}

export const NicheGrid: React.FC<NicheGridProps> = ({
  offers,
  onSelectVertical,
  onLaunchOffer
}) => {
  const [selectedOfferModal, setSelectedOfferModal] = useState<CPAOffer | null>(null);

  const niches = [
    {
      vertical: 'Games' as Vertical,
      title: 'Games',
      subtitle: 'Free-to-play, MMORPG, Sci-Fi & Mobile Gaming',
      epc: '$1.45',
      avgCR: '12.8%',
      geos: 'USA, DEU, FRA, JPN',
      allowed: 'Popunder, In-Page Push, Native',
      badge: 'High Conversion',
      // Sci-fi 3D alien character matching reference image 3
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      color: 'from-cyan-500/80 to-blue-600/80',
      icon: Gamepad2
    },
    {
      vertical: 'Webcam' as Vertical,
      title: 'Webcam',
      subtitle: 'HD Live Streams, Token Top-ups & Pay-Per-View',
      epc: '$2.10',
      avgCR: '9.4%',
      geos: 'USA, CAN, GBR, NLD',
      allowed: 'Popunder, Push, Direct Domain',
      badge: 'High RevShare',
      // Neon cyberpunk streaming avatar matching reference image 4
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      color: 'from-fuchsia-600/80 to-purple-800/80',
      icon: Video
    },
    {
      vertical: 'iGaming' as Vertical,
      title: 'iGaming',
      subtitle: 'Licensed Casino, 777 Slots & Live Dealer',
      epc: '$4.25',
      avgCR: '6.8%',
      geos: 'DEU, AUT, BRA, CAN',
      allowed: 'Popunder, Native, Push, Search',
      badge: 'Highest Payout ($145)',
      // Casino slot machine with gold coins matching reference image 5
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
      color: 'from-amber-500/80 to-yellow-600/80',
      icon: Dices
    },
    {
      vertical: 'Dating' as Vertical,
      title: 'Dating',
      subtitle: 'Casual Dating, Adult Dating & Geo-Smart SOI',
      epc: '$1.85',
      avgCR: '14.2%',
      geos: 'USA, GBR, AUS, ITA',
      allowed: 'In-Page Push, Pop, Social',
      badge: 'High Volume',
      // Romantic bar couple matching reference image 6
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      color: 'from-rose-500/80 to-pink-600/80',
      icon: Heart
    },
    {
      vertical: 'Video-on-Demand' as Vertical,
      title: 'Video-on-demand',
      subtitle: '4K Movie Streaming, Sports VOD & Trial CC Submits',
      epc: '$2.40',
      avgCR: '11.1%',
      geos: 'USA, CAN, FRA, ESP',
      allowed: 'Popunder, Push, Banners',
      badge: '$1 CC Trial',
      // Curved LED video display wall matrix matching reference image 7
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-600/80 to-indigo-800/80',
      icon: Tv
    },
    {
      vertical: 'Betting' as Vertical,
      title: 'Betting',
      subtitle: 'Sportsbook, UEFA Football & In-Play Wagers',
      epc: '$3.90',
      avgCR: '7.5%',
      geos: 'GBR, DEU, BRA, ESP',
      allowed: 'In-Page Push, Pop, Banners',
      badge: '$110 CPA',
      // Footballer splashing water kicking ball matching reference image 8
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      color: 'from-red-600/80 to-orange-700/80',
      icon: Trophy
    },
    {
      vertical: 'Nutra' as Vertical,
      title: 'Nutra',
      subtitle: 'Keto, Weight Loss, VSL & Fitness Supplements',
      epc: '$3.10',
      avgCR: '8.9%',
      geos: 'USA, CAN, AUS, GBR',
      allowed: 'Native, Search, Social',
      badge: 'High SS Sales',
      // Fitness model holding amber bottle matching reference image 9
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      color: 'from-amber-600/80 to-orange-600/80',
      icon: Activity
    }
  ];

  return (
    <section className="py-16 bg-slate-950 border-b border-indigo-900/40 relative">
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
              SeekoLabs provides direct advertiser CPA & CPL offers across lucrative global niches with pre-tested high converting landers and anti-bot traffic security.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Click any vertical to filter live offers:</span>
          </div>
        </div>

        {/* Niche Grid Cards - Styled as Vertical Rounded Cards matching Reference Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {niches.map((niche) => {
            const Icon = niche.icon;
            const topOffer = offers.find(o => o.vertical === niche.vertical);

            return (
              <div
                key={niche.title}
                onClick={() => {
                  if (topOffer) {
                    setSelectedOfferModal(topOffer);
                  } else {
                    onSelectVertical(niche.vertical);
                  }
                }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 shadow-xl cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between min-h-[360px]"
              >
                {/* Image Background Container */}
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
                      {niche.vertical}
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

        {/* Modal for Quick Offer Preview */}
        {selectedOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100">
              
              <button 
                onClick={() => setSelectedOfferModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xl font-bold rounded-full bg-slate-800/80"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedOfferModal.vertical}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  {selectedOfferModal.payoutType}: ${selectedOfferModal.payout.toFixed(2)}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">{selectedOfferModal.title}</h3>
              <p className="text-sm text-slate-300 mb-6">{selectedOfferModal.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6 font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Expected EPC</span>
                  <span className="text-emerald-400 font-bold text-sm">${selectedOfferModal.epc.toFixed(2)}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Conv Rate</span>
                  <span className="text-cyan-400 font-bold text-sm">{selectedOfferModal.cr}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Target Geos</span>
                  <span className="text-indigo-300 font-bold text-xs">{selectedOfferModal.geos.join(', ')}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Risk Score</span>
                  <span className="text-amber-400 font-bold text-xs">{selectedOfferModal.riskScore}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Allowed Traffic: {selectedOfferModal.allowedTraffic.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Conversion Flow: {selectedOfferModal.conversionFlow}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const offerToLaunch = selectedOfferModal;
                    setSelectedOfferModal(null);
                    onLaunchOffer(offerToLaunch);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-sm hover:from-cyan-400 hover:to-blue-500 shadow-lg"
                >
                  Launch Traffic Campaign Now
                </button>
                <button
                  onClick={() => {
                    const vert = selectedOfferModal.vertical;
                    setSelectedOfferModal(null);
                    onSelectVertical(vert);
                  }}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm"
                >
                  View All Offers in {selectedOfferModal.vertical}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
