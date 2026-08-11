import React, { useState } from 'react';
import { Sparkles, Copy, Check, Target, Lightbulb, Zap, Rocket, Layers } from 'lucide-react';
import { AICopyResponse, CPAOffer } from '../types';

interface AICreativeStudioProps {
  offers: CPAOffer[];
  onApplyAdCopy?: (headline: string, copy: string) => void;
}

export const AICreativeStudio: React.FC<AICreativeStudioProps> = ({ offers, onApplyAdCopy }) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string>(offers[0]?.id || 'OFF-103');
  const [targetAudience, setTargetAudience] = useState<string>('Tier 1 Mobile Wi-Fi Users (21-45)');
  const [adFormat, setAdFormat] = useState<string>('In-Page Push');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<AICopyResponse | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const selectedOffer = offers.find(o => o.id === selectedOfferId) || offers[0];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/ad-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerTitle: selectedOffer.title,
          vertical: selectedOffer.vertical,
          targetAudience,
          adFormat
        })
      });
      const data = await res.json();
      setAiResponse(data);
    } catch (e) {
      console.error('Failed to generate AI copy', e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-12 bg-slate-950 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Powered by Gemini AI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Ad Copy & Creative Campaign Generator
          </h2>
          <p className="text-slate-400 text-sm">
            Generate high-converting push headlines, pre-lander hooks, CTAs, and CPT bidding strategies for any CPA offer in seconds.
          </p>
        </div>

        {/* Studio Panel Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span>Select CPA Offer & Targeting</span>
            </h3>

            {/* Offer Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Target CPA Offer</label>
              <select
                value={selectedOfferId}
                onChange={(e) => setSelectedOfferId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-purple-500"
              >
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    [{offer.vertical}] {offer.title} (${offer.payout.toFixed(2)} {offer.payoutType})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Audience Segment</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Male 21-45, Tier 1 Mobile Wi-Fi"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Ad Format */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Traffic Ad Format</label>
              <select
                value={adFormat}
                onChange={(e) => setAdFormat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-purple-500"
              >
                <option value="In-Page Push">In-Page Push (high CTR)</option>
                <option value="Popunder">Popunder / Tabunder (high volume)</option>
                <option value="Native Ads">Native Content Widget</option>
                <option value="Display Banner">Display Banner 300x250</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing AI Creatives...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Campaign Creatives</span>
                </>
              )}
            </button>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6">
            {!aiResponse && !loading && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
                <h4 className="text-lg font-bold text-slate-200">AI Creatives Ready for Generation</h4>
                <p className="text-xs max-w-md mx-auto">
                  Click the button to generate tailored headlines, hooks, and targeting angles optimized for {selectedOffer.title}.
                </p>
              </div>
            )}

            {aiResponse && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Headlines Section */}
                <div className="bg-slate-900 border border-indigo-900/50 p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>High-Converting Push Headlines</span>
                  </h4>
                  <div className="space-y-2">
                    {aiResponse.headlines.map((hl, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs text-white">
                        <span className="font-semibold">{hl}</span>
                        <button
                          onClick={() => copyToClipboard(hl, `hl-${idx}`)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] flex items-center gap-1 shrink-0"
                        >
                          {copiedIndex === `hl-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedIndex === `hl-${idx}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ad Copies & Hooks */}
                <div className="bg-slate-900 border border-indigo-900/50 p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Ad Copy & Pre-Lander Hooks</span>
                  </h4>
                  <div className="space-y-2">
                    {aiResponse.adCopies.map((copy, idx) => (
                      <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed relative">
                        <p>{copy}</p>
                        <button
                          onClick={() => copyToClipboard(copy, `copy-${idx}`)}
                          className="mt-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] inline-flex items-center gap-1"
                        >
                          {copiedIndex === `copy-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedIndex === `copy-${idx}` ? 'Copied' : 'Copy Ad Text'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Targeting Hooks & Optimization Tips */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Audience Targeting Hooks</span>
                    </h5>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {aiResponse.targetingHooks.map((hook, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400">•</span>
                          <span>{hook}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Media Buying Tips</span>
                    </h5>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {aiResponse.optimizationTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
