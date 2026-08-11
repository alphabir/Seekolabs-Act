import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, ExternalLink, Zap, Check, Copy, Flame, Play } from 'lucide-react';
import { CPAOffer, Vertical } from '../types';

interface OfferMarketplaceProps {
  offers: CPAOffer[];
  onLaunchOffer: (offer: CPAOffer) => void;
}

export const OfferMarketplace: React.FC<OfferMarketplaceProps> = ({ offers, onLaunchOffer }) => {
  const [selectedVertical, setSelectedVertical] = useState<string>('All');
  const [selectedGeo, setSelectedGeo] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeOfferLink, setActiveOfferLink] = useState<{ id: string; link: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const verticals = ['All', 'Games', 'Webcam', 'iGaming', 'Dating', 'Video-on-Demand', 'Betting', 'Nutra', 'Sweeps'];
  const geos = ['All', 'USA', 'DEU', 'GBR', 'FRA', 'CAN', 'BRA', 'ESP', 'JPN'];

  const filteredOffers = offers.filter(offer => {
    const matchesVert = selectedVertical === 'All' || offer.vertical.toLowerCase() === selectedVertical.toLowerCase();
    const matchesGeo = selectedGeo === 'All' || offer.geos.includes(selectedGeo);
    const matchesSearch = searchQuery === '' || 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVert && matchesGeo && matchesSearch;
  });

  const generateTrackingLink = (offer: CPAOffer) => {
    const link = `https://track.seekolabs.tech/click?offer_id=${offer.id}&sub_id={click_id}&source={publisher_id}`;
    setActiveOfferLink({ id: offer.id, link });
  };

  const copyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-12 bg-slate-950 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>CPA Offer Marketplace</span>
            </div>
            <h2 className="text-3xl font-black text-white">Curated Direct Advertiser Offers</h2>
            <p className="text-xs text-slate-400 mt-1">
              Guaranteed highest payouts, real-time S2S postbacks, and instant tracking link generation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <span>Live Postback URL:</span>
            <code className="text-slate-200">https://track.seekolabs.tech/postback?click_id={'{click_id}'}&payout={'{payout}'}</code>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl mb-8 space-y-4 shadow-xl">
          <div className="grid sm:grid-cols-12 gap-3">
            
            {/* Search */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search offer title, keywords, GEO..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Vertical Filter */}
            <div className="sm:col-span-4">
              <select
                value={selectedVertical}
                onChange={(e) => setSelectedVertical(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {verticals.map(v => (
                  <option key={v} value={v}>Vertical: {v}</option>
                ))}
              </select>
            </div>

            {/* GEO Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedGeo}
                onChange={(e) => setSelectedGeo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {geos.map(g => (
                  <option key={g} value={g}>GEO: {g}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl shadow-xl flex flex-col justify-between space-y-4 group transition-all"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {offer.vertical}
                  </span>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                    {offer.payoutType} ${offer.payout.toFixed(2)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-2">
                  {offer.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {offer.description}
                </p>

                {/* Offer Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-4">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 block">EPC</span>
                    <span className="font-bold text-emerald-400">${offer.epc.toFixed(2)}</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 block">CR %</span>
                    <span className="font-bold text-cyan-400">{offer.cr}%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 block">Risk Score</span>
                    <span className="font-bold text-amber-400">{offer.riskScore}</span>
                  </div>
                </div>

                {/* Traffic Details */}
                <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                  <div>GEOs: <span className="text-indigo-200">{offer.geos.join(', ')}</span></div>
                  <div>Flow: <span className="text-slate-200">{offer.conversionFlow}</span></div>
                </div>

                {/* Generated Link Field */}
                {activeOfferLink?.id === offer.id && (
                  <div className="mt-3 p-2.5 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-1.5 animate-fade-in">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase block">Tracking Link:</span>
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        readOnly
                        value={activeOfferLink.link}
                        className="w-full bg-transparent text-[10px] text-slate-300 font-mono truncate focus:outline-none"
                      />
                      <button
                        onClick={() => copyLink(activeOfferLink.link, offer.id)}
                        className="p-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg shrink-0"
                      >
                        {copiedId === offer.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => generateTrackingLink(offer)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Get Tracking Link</span>
                </button>

                <button
                  onClick={() => onLaunchOffer(offer)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
