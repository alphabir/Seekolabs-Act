import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NicheGrid } from './components/NicheGrid';
import { OfferMarketplace } from './components/OfferMarketplace';
import { ConferenceBanner } from './components/ConferenceBanner';
import { AICreativeStudio } from './components/AICreativeStudio';
import { RoiCalculator } from './components/RoiCalculator';
import { ClientDashboard } from './components/ClientDashboard';
import { Footer } from './components/Footer';
import { 
  INITIAL_OFFERS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_POSTBACK_LOGS, 
  INITIAL_GEO_STATS, 
  INITIAL_ANALYTICS_HOURLY, 
  INITIAL_CONFERENCES 
} from './data';
import { CPAOffer, Campaign, PostbackLog, GeoStat, AnalyticsDataPoint, Vertical, ConferenceEvent } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'landing' | 'dashboard' | 'offers' | 'ai-studio' | 'calculator'>('landing');
  
  // App Data State
  const [offers, setOffers] = useState<CPAOffer[]>(INITIAL_OFFERS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [postbacks, setPostbacks] = useState<PostbackLog[]>(INITIAL_POSTBACK_LOGS);
  const [geoStats, setGeoStats] = useState<GeoStat[]>(INITIAL_GEO_STATS);
  const [hourlyData, setHourlyData] = useState<AnalyticsDataPoint[]>(INITIAL_ANALYTICS_HOURLY);
  const [conferences, setConferences] = useState<ConferenceEvent[]>(INITIAL_CONFERENCES);
  const [walletBalance, setWalletBalance] = useState<number>(3450.00);
  const [presetOffer, setPresetOffer] = useState<CPAOffer | null>(null);

  // Fetch initial data from Express backend if available
  const fetchBackendData = async () => {
    try {
      const [analyticsRes, campaignsRes, offersRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/campaigns'),
        fetch('/api/offers')
      ]);

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        if (analyticsData.hourly) setHourlyData(analyticsData.hourly);
        if (analyticsData.geos) setGeoStats(analyticsData.geos);
        if (analyticsData.postbacks) setPostbacks(analyticsData.postbacks);
        if (analyticsData.conferences) setConferences(analyticsData.conferences);
      }

      if (campaignsRes.ok) {
        const campData = await campaignsRes.json();
        if (campData.campaigns) setCampaigns(campData.campaigns);
        if (campData.walletBalance) setWalletBalance(campData.walletBalance);
      }

      if (offersRes.ok) {
        const offerData = await offersRes.json();
        if (offerData.offers) setOffers(offerData.offers);
      }
    } catch (e) {
      console.log('Using local client state');
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  // Handlers
  const handleLaunchOffer = (offer: CPAOffer) => {
    setPresetOffer(offer);
    setCurrentTab('dashboard');
  };

  const handleSelectVertical = (vertical: Vertical) => {
    setCurrentTab('offers');
  };

  const handleCreateCampaign = async (newCampData: Partial<Campaign>) => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCampData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.campaign) {
          setCampaigns(prev => [data.campaign, ...prev]);
        }
      } else {
        // Fallback local addition
        const offer = offers.find(o => o.id === newCampData.offerId) || offers[0];
        const localCamp: Campaign = {
          id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
          name: newCampData.name || 'New Campaign',
          offerId: offer.id,
          offerTitle: offer.title,
          vertical: offer.vertical,
          status: 'Active',
          format: newCampData.format || 'In-Page Push',
          targetGeos: newCampData.targetGeos || ['USA'],
          bidType: newCampData.bidType || 'CPT',
          bidAmount: newCampData.bidAmount || 0.0035,
          dailyBudget: newCampData.dailyBudget || 200,
          totalBudget: newCampData.totalBudget || 2000,
          spent: 0,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: 0,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCampaigns(prev => [localCamp, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
    setPresetOffer(null);
  };

  const handleToggleCampaignStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    try {
      await fetch(`/api/campaigns/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleTestPostback = async (clickId: string, campaignId: string, payout: number, geo: string) => {
    try {
      const res = await fetch('/api/postback/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clickId, campaignId, payout, geo })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.log) {
          setPostbacks(prev => [data.log, ...prev.slice(0, 19)]);
          // Update campaign revenue
          setCampaigns(prev => prev.map(c => {
            if (c.id === campaignId) {
              return {
                ...c,
                conversions: c.conversions + 1,
                revenue: c.revenue + payout
              };
            }
            return c;
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDepositWallet = async (amount: number) => {
    try {
      const res = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (res.ok) {
        const data = await res.json();
        setWalletBalance(data.balance);
      } else {
        setWalletBalance(prev => prev + amount);
      }
    } catch (e) {
      setWalletBalance(prev => prev + amount);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        walletBalance={walletBalance} 
      />

      {/* Main View Switching */}
      <main>
        {currentTab === 'landing' && (
          <>
            <Hero 
              onBrowseOffers={() => setCurrentTab('offers')}
              onOpenDashboard={() => setCurrentTab('dashboard')}
              onOpenAIStudio={() => setCurrentTab('ai-studio')}
            />

            <NicheGrid 
              offers={offers}
              onSelectVertical={handleSelectVertical}
              onLaunchOffer={handleLaunchOffer}
            />

            <ConferenceBanner 
              conferences={conferences}
            />
          </>
        )}

        {currentTab === 'offers' && (
          <OfferMarketplace 
            offers={offers}
            onLaunchOffer={handleLaunchOffer}
          />
        )}

        {currentTab === 'ai-studio' && (
          <AICreativeStudio 
            offers={offers}
          />
        )}

        {currentTab === 'calculator' && (
          <RoiCalculator />
        )}

        {currentTab === 'dashboard' && (
          <ClientDashboard 
            campaigns={campaigns}
            offers={offers}
            postbacks={postbacks}
            geoStats={geoStats}
            hourlyData={hourlyData}
            walletBalance={walletBalance}
            onRefreshData={fetchBackendData}
            onCreateCampaign={handleCreateCampaign}
            onToggleCampaignStatus={handleToggleCampaignStatus}
            onTestPostback={handleTestPostback}
            onDepositWallet={handleDepositWallet}
            presetOffer={presetOffer}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentTab} />

    </div>
  );
}
