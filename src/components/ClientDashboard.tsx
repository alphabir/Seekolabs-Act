import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle2, 
  Send, 
  CreditCard, 
  Globe, 
  Layers, 
  Sparkles, 
  Target, 
  Activity, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';
import { CPAOffer, Campaign, PostbackLog, GeoStat, AnalyticsDataPoint, Vertical } from '../types';

interface ClientDashboardProps {
  campaigns: Campaign[];
  offers: CPAOffer[];
  postbacks: PostbackLog[];
  geoStats: GeoStat[];
  hourlyData: AnalyticsDataPoint[];
  walletBalance: number;
  onRefreshData: () => void;
  onCreateCampaign: (newCamp: Partial<Campaign>) => void;
  onToggleCampaignStatus: (id: string, currentStatus: string) => void;
  onTestPostback: (clickId: string, campaignId: string, payout: number, geo: string) => void;
  onDepositWallet: (amount: number) => void;
  presetOffer?: CPAOffer | null;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  campaigns,
  offers,
  postbacks,
  geoStats,
  hourlyData,
  walletBalance,
  onRefreshData,
  onCreateCampaign,
  onToggleCampaignStatus,
  onTestPostback,
  onDepositWallet,
  presetOffer
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'campaigns' | 'postback-tester' | 'wallet'>('analytics');
  
  // New Campaign Modal State
  const [isNewCampModalOpen, setIsNewCampModalOpen] = useState<boolean>(Boolean(presetOffer));
  const [newCampName, setNewCampName] = useState<string>(presetOffer ? `Campaign-${presetOffer.title.substring(0, 20)}` : '');
  const [newCampOfferId, setNewCampOfferId] = useState<string>(presetOffer?.id || offers[0]?.id || 'OFF-101');
  const [newCampFormat, setNewCampFormat] = useState<'Popunder' | 'In-Page Push' | 'Native Ads' | 'Display Banner'>('In-Page Push');
  const [newCampGeos, setNewCampGeos] = useState<string>('USA, DEU, GBR');
  const [newCampBidType, setNewCampBidType] = useState<'CPT' | 'CPC' | 'CPM'>('CPT');
  const [newCampBidAmount, setNewCampBidAmount] = useState<number>(0.0035);
  const [newCampDailyBudget, setNewCampDailyBudget] = useState<number>(200);

  // Postback Test State
  const [testClickId, setTestClickId] = useState<string>(`clk_${Math.random().toString(36).substring(2, 10)}`);
  const [testCampaignId, setTestCampaignId] = useState<string>(campaigns[0]?.id || 'CMP-9001');
  const [testPayout, setTestPayout] = useState<number>(45.00);
  const [testGeo, setTestGeo] = useState<string>('DEU');
  const [testSuccessMsg, setTestSuccessMsg] = useState<string | null>(null);

  // Wallet Modal
  const [depositAmount, setDepositAmount] = useState<number>(500);

  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalNetProfit = totalRevenue - totalSpent;
  const overallRoi = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0;
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const offer = offers.find(o => o.id === newCampOfferId);
    onCreateCampaign({
      name: newCampName || `${newCampGeos.split(',')[0]}-${offer?.vertical || 'CPA'}-Ad`,
      offerId: newCampOfferId,
      offerTitle: offer?.title || 'Selected CPA Offer',
      vertical: offer?.vertical || 'iGaming',
      format: newCampFormat,
      targetGeos: newCampGeos.split(',').map(s => s.trim().toUpperCase()),
      bidType: newCampBidType,
      bidAmount: Number(newCampBidAmount),
      dailyBudget: Number(newCampDailyBudget),
      totalBudget: Number(newCampDailyBudget) * 10
    });
    setIsNewCampModalOpen(false);
  };

  const handleRunPostbackTest = (e: React.FormEvent) => {
    e.preventDefault();
    onTestPostback(testClickId, testCampaignId, Number(testPayout), testGeo);
    setTestSuccessMsg(`S2S Postback verified! Tracked +$${Number(testPayout).toFixed(2)} payout to ${testCampaignId}`);
    setTestClickId(`clk_${Math.random().toString(36).substring(2, 10)}`);
    setTimeout(() => setTestSuccessMsg(null), 4000);
  };

  return (
    <div className="py-8 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-900/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">CLIENT PORTAL • SEEKOLABS.TECH</span>
            </div>
            <h1 className="text-3xl font-black text-white mt-1">Advertiser Performance Dashboard</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRefreshData}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Refresh Metrics</span>
            </button>

            <button
              onClick={() => setIsNewCampModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Traffic Campaign</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Ad Spend</span>
            <div className="text-2xl font-black text-white font-mono mt-1">${totalSpent.toFixed(2)}</div>
          </div>

          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Gross Revenue</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">${totalRevenue.toFixed(2)}</div>
          </div>

          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Net Profit</span>
            <div className={`text-2xl font-black font-mono mt-1 ${totalNetProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${totalNetProfit.toFixed(2)}
            </div>
          </div>

          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Overall ROI</span>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">+{overallRoi.toFixed(1)}%</div>
          </div>

          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Conversions</span>
            <div className="text-2xl font-black text-indigo-300 font-mono mt-1">{totalConversions}</div>
          </div>

          <div className="bg-slate-900 border border-indigo-900/50 p-4 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Wallet Balance</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">${walletBalance.toFixed(2)}</div>
          </div>
        </div>

        {/* Dashboard Section Tabs */}
        <div className="flex border-b border-indigo-900/40 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'analytics'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Live Analytics & Graphs</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'campaigns'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Campaigns ({campaigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('postback-tester')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'postback-tester'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>S2S Postback & Lead Simulator</span>
          </button>
        </div>

        {/* TAB 1: ANALYTICS & CHARTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Hourly Performance Recharts Area Chart */}
            <div className="bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span>Hourly Revenue vs Ad Spend Curve</span>
                  </h3>
                  <p className="text-xs text-slate-400">Real-time media buying ROI telemetry for past 24 hours</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  Peak ROI: +412% @ 15:00
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                    />
                    <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#10b981" fillOpacity={1} fill="url(#revenueGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="spend" name="Spend ($)" stroke="#6366f1" fillOpacity={1} fill="url(#spendGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Geo Breakdown & Conversions Bar Chart */}
            <div className="grid lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-7 bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-400" />
                  <span>Top Converting Countries (Geo Share)</span>
                </h3>

                <div className="space-y-3 pt-2">
                  {geoStats.map((geo) => (
                    <div key={geo.code} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="flex items-center gap-2 font-semibold">
                          <span>{geo.flag}</span>
                          <span>{geo.country} ({geo.code})</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">${geo.revenue.toLocaleString()} ({geo.conversions} leads)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full" 
                          style={{ width: `${geo.share}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Ticker Feed */}
              <div className="lg:col-span-5 bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>Real-time Postback Lead Feed</span>
                </h3>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {postbacks.map((log) => (
                    <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs flex items-center justify-between gap-3">
                      <div>
                        <span className="font-mono font-bold text-white block">{log.clickId}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{log.campaignId} • {log.geo}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold font-mono text-xs block">+${log.payout.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CAMPAIGN MANAGER */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Active Traffic Campaigns</h3>
              <button
                onClick={() => setIsNewCampModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Campaign</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-indigo-900/50 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Status</th>
                      <th className="p-4">Campaign Name</th>
                      <th className="p-4">Format & Vertical</th>
                      <th className="p-4">Target GEOs</th>
                      <th className="p-4">Bid Rate</th>
                      <th className="p-4">Spent / Rev</th>
                      <th className="p-4">ROI</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {campaigns.map((camp) => {
                      const profit = camp.revenue - camp.spent;
                      const campRoi = camp.spent > 0 ? ((profit) / camp.spent) * 100 : 0;

                      return (
                        <tr key={camp.id} className="hover:bg-slate-950/40 transition-colors">
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              camp.status === 'Active' 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${camp.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                              <span>{camp.status}</span>
                            </span>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-white font-sans">{camp.name}</div>
                            <span className="text-[10px] text-slate-500">{camp.id} • {camp.offerTitle}</span>
                          </td>

                          <td className="p-4">
                            <span className="text-cyan-400 font-bold block">{camp.format}</span>
                            <span className="text-slate-400 text-[10px]">{camp.vertical}</span>
                          </td>

                          <td className="p-4 text-indigo-300 font-bold">
                            {camp.targetGeos.join(', ')}
                          </td>

                          <td className="p-4 text-slate-200">
                            ${camp.bidAmount.toFixed(4)} <span className="text-slate-500 text-[10px]">{camp.bidType}</span>
                          </td>

                          <td className="p-4">
                            <div className="text-slate-300">${camp.spent.toFixed(2)}</div>
                            <div className="text-emerald-400 font-bold">${camp.revenue.toFixed(2)}</div>
                          </td>

                          <td className="p-4">
                            <span className={`font-bold ${campRoi >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {campRoi >= 0 ? '+' : ''}{campRoi.toFixed(1)}%
                            </span>
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => onToggleCampaignStatus(camp.id, camp.status)}
                              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                                camp.status === 'Active'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                              }`}
                              title={camp.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                            >
                              {camp.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: S2S POSTBACK & LEAD SIMULATOR */}
        {activeTab === 'postback-tester' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            <div className="lg:col-span-6 bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Simulate S2S Conversion Postback</span>
              </h3>
              <p className="text-xs text-slate-400">
                Trigger a live lead postback to test campaign revenue tracking in real-time.
              </p>

              {testSuccessMsg && (
                <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{testSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleRunPostbackTest} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Click ID ({'{click_id}'})</label>
                  <input
                    type="text"
                    required
                    value={testClickId}
                    onChange={(e) => setTestClickId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Campaign</label>
                  <select
                    value={testCampaignId}
                    onChange={(e) => setTestCampaignId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                  >
                    {campaigns.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Lead Payout ($)</label>
                    <input
                      type="number"
                      step="1.00"
                      value={testPayout}
                      onChange={(e) => setTestPayout(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Lead Geo</label>
                    <select
                      value={testGeo}
                      onChange={(e) => setTestGeo(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    >
                      <option value="USA">USA 🇺🇸</option>
                      <option value="DEU">DEU 🇩🇪</option>
                      <option value="GBR">GBR 🇬🇧</option>
                      <option value="CAN">CAN 🇨🇦</option>
                      <option value="FRA">FRA 🇫🇷</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Postback Webhook</span>
                </button>
              </form>
            </div>

            {/* Postback Specification & URL Docs */}
            <div className="lg:col-span-6 bg-slate-900 border border-indigo-900/50 p-6 rounded-3xl space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">
                Postback Webhook Integration
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add SeekoLabs’ global postback URL in your tracker (Voluum, BeMob, RedTrack, Binom) to send conversions automatically via HTTP GET:
              </p>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-cyan-300 break-all">
                https://track.seekolabs.tech/postback?click_id={'{sub_id}'}&payout={'{payout}'}&geo={'{country}'}
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Parameter: click_id</span>
                  <span className="text-white">Unique click ID token</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Parameter: payout</span>
                  <span className="text-emerald-400">Revenue value in USD</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Parameter: geo</span>
                  <span className="text-indigo-300">ISO-3 country code</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* NEW CAMPAIGN WIZARD MODAL */}
        {isNewCampModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100">
              
              <button 
                onClick={() => setIsNewCampModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xl font-bold rounded-full bg-slate-800/80"
              >
                ✕
              </button>

              <h3 className="text-2xl font-black text-white mb-1">Create Traffic Campaign</h3>
              <p className="text-xs text-slate-400 mb-6">Set up targeting, bidding, and CPA offer parameters on SeekoLabs Network.</p>

              <form onSubmit={handleCreateCampaignSubmit} className="space-y-4 text-xs">
                
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Campaign Name</label>
                  <input
                    type="text"
                    required
                    value={newCampName}
                    onChange={(e) => setNewCampName(e.target.value)}
                    placeholder="e.g. US-iGaming-Push-Scale"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">CPA Offer</label>
                    <select
                      value={newCampOfferId}
                      onChange={(e) => setNewCampOfferId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    >
                      {offers.map(o => (
                        <option key={o.id} value={o.id}>[{o.vertical}] {o.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Ad Format</label>
                    <select
                      value={newCampFormat}
                      onChange={(e) => setNewCampFormat(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    >
                      <option value="In-Page Push">In-Page Push</option>
                      <option value="Popunder">Popunder</option>
                      <option value="Native Ads">Native Ads</option>
                      <option value="Display Banner">Display Banner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target GEOs (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={newCampGeos}
                    onChange={(e) => setNewCampGeos(e.target.value)}
                    placeholder="e.g. USA, DEU, GBR"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white uppercase font-mono"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Bidding Model</label>
                    <select
                      value={newCampBidType}
                      onChange={(e) => setNewCampBidType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    >
                      <option value="CPT">CPT ($/1,000 Impr)</option>
                      <option value="CPC">CPC ($/Click)</option>
                      <option value="CPM">CPM ($/1,000)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Bid Rate ($)</label>
                    <input
                      type="number"
                      step="0.0005"
                      value={newCampBidAmount}
                      onChange={(e) => setNewCampBidAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Daily Budget ($)</label>
                    <input
                      type="number"
                      step="10"
                      value={newCampDailyBudget}
                      onChange={(e) => setNewCampDailyBudget(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewCampModalOpen(false)}
                    className="px-5 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg"
                  >
                    Launch Campaign Now
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
