import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, Zap, RefreshCw, BarChart2 } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [biddingType, setBiddingType] = useState<'CPT' | 'CPC'>('CPT');
  const [bidPrice, setBidAmount] = useState<number>(0.0035); // CPT e.g. $0.0035 per impression
  const [trafficVolume, setTrafficVolume] = useState<number>(250000); // 250k impressions or 10k clicks
  const [ctrRate, setCtrRate] = useState<number>(2.5); // % CTR
  const [conversionRate, setConversionRate] = useState<number>(8.5); // % CR
  const [cpaPayout, setCpaPayout] = useState<number>(45.00); // $45 CPA

  // Calculations
  const calculatedImpressions = biddingType === 'CPT' ? trafficVolume : Math.round(trafficVolume / (ctrRate / 100));
  const calculatedClicks = biddingType === 'CPC' ? trafficVolume : Math.round(calculatedImpressions * (ctrRate / 100));
  const totalConversions = Math.round(calculatedClicks * (conversionRate / 100));
  
  const totalSpend = biddingType === 'CPT' 
    ? (calculatedImpressions / 1000) * bidPrice 
    : calculatedClicks * bidPrice;

  const totalRevenue = totalConversions * cpaPayout;
  const netProfit = totalRevenue - totalSpend;
  const roi = totalSpend > 0 ? ((netProfit) / totalSpend) * 100 : 0;
  const epc = calculatedClicks > 0 ? (totalRevenue / calculatedClicks) : 0;

  return (
    <section className="py-12 bg-slate-950 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
            <Calculator className="w-4 h-4" />
            <span>SeekoLabs Media Buying Calculator</span>
          </div>
          <h2 className="text-3xl font-black text-white">CPA Campaign ROI & Profit Simulator</h2>
          <p className="text-xs text-slate-400">
            Simulate your ad spend, expected conversion rates, EPC, and estimated net profit before launching your campaign on SeekoLabs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">
              1. Campaign Parameters
            </h3>

            {/* Bidding Model Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => { setBiddingType('CPT'); setBidAmount(0.0035); setTrafficVolume(250000); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  biddingType === 'CPT' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                CPT (Cost Per 1,000 Impr)
              </button>
              <button
                onClick={() => { setBiddingType('CPC'); setBidAmount(0.045); setTrafficVolume(10000); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  biddingType === 'CPC' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                CPC (Cost Per Click)
              </button>
            </div>

            {/* Bid Amount */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Bid Price ({biddingType}):</span>
                <span className="font-bold text-cyan-400 font-mono">${bidPrice.toFixed(4)}</span>
              </div>
              <input
                type="number"
                step="0.0005"
                value={bidPrice}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Traffic Volume */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Traffic Volume ({biddingType === 'CPT' ? 'Impressions' : 'Clicks'}):</span>
                <span className="font-bold text-indigo-300 font-mono">{trafficVolume.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={biddingType === 'CPT' ? 50000 : 1000}
                max={biddingType === 'CPT' ? 2000000 : 50000}
                step={biddingType === 'CPT' ? 50000 : 1000}
                value={trafficVolume}
                onChange={(e) => setTrafficVolume(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 rounded-lg"
              />
            </div>

            {/* CTR Rate */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Expected Click-Through Rate (CTR %):</span>
                <span className="font-bold text-amber-400 font-mono">{ctrRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={ctrRate}
                onChange={(e) => setCtrRate(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-950 rounded-lg"
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Offer Conversion Rate (CR %):</span>
                <span className="font-bold text-emerald-400 font-mono">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="25.0"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-950 rounded-lg"
              />
            </div>

            {/* CPA Offer Payout */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>CPA Offer Payout ($):</span>
                <span className="font-bold text-emerald-400 font-mono">${cpaPayout.toFixed(2)}</span>
              </div>
              <input
                type="number"
                step="1.00"
                value={cpaPayout}
                onChange={(e) => setCpaPayout(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
                2. Profitability Projections
              </h3>

              {/* Main Net Profit Badge */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">Estimated Net Profit</span>
                <div className={`text-4xl font-black font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)}
                </div>
                <div className="text-xs font-bold text-indigo-300 pt-1">
                  Est. ROI: <span className="text-emerald-400">{roi.toFixed(1)}%</span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Ad Spend</span>
                  <span className="font-bold text-slate-200 text-sm">${totalSpend.toFixed(2)}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Gross Revenue</span>
                  <span className="font-bold text-emerald-400 text-sm">${totalRevenue.toFixed(2)}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Calculated EPC</span>
                  <span className="font-bold text-cyan-400 text-sm">${epc.toFixed(2)}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Conversions</span>
                  <span className="font-bold text-indigo-300 text-sm">{totalConversions}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Clicks</span>
                  <span className="font-bold text-yellow-400 text-sm">{calculatedClicks.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Impressions</span>
                  <span className="font-bold text-purple-400 text-sm">{calculatedImpressions.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                💡 <span className="font-bold text-slate-200">Pro Tip:</span> In SeekoLabs, combining In-Page Push with frequency capping of 1/24h typically increases EPC by up to 28% while minimizing bid inflation.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
