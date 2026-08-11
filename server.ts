import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  INITIAL_OFFERS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_POSTBACK_LOGS, 
  INITIAL_GEO_STATS, 
  INITIAL_ANALYTICS_HOURLY,
  INITIAL_CONFERENCES 
} from "./src/data";
import { Campaign, PostbackLog } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for live interactivity during demo
  let offers = [...INITIAL_OFFERS];
  let campaigns = [...INITIAL_CAMPAIGNS];
  let postbacks = [...INITIAL_POSTBACK_LOGS];
  let walletBalance = 3450.00;

  // Initialize Gemini AI Client
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "seekolabs.tech engine", timestamp: new Date().toISOString() });
  });

  // Offers Catalog
  app.get("/api/offers", (req, res) => {
    const { vertical, geo } = req.query;
    let filtered = offers;
    if (vertical && vertical !== 'All') {
      filtered = filtered.filter(o => o.vertical.toLowerCase() === (vertical as string).toLowerCase());
    }
    if (geo && geo !== 'All') {
      filtered = filtered.filter(o => o.geos.includes(geo as string));
    }
    res.json({ offers: filtered, count: filtered.length });
  });

  // Campaigns
  app.get("/api/campaigns", (_req, res) => {
    res.json({ campaigns, walletBalance });
  });

  app.post("/api/campaigns", (req, res) => {
    const { name, offerId, vertical, format, targetGeos, bidType, bidAmount, dailyBudget, totalBudget } = req.body;
    
    const offer = offers.find(o => o.id === offerId);
    
    const newCampaign: Campaign = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || `${targetGeos?.[0] || 'GLOBAL'}-${vertical || 'CPA'}-Campaign`,
      offerId: offerId || 'OFF-101',
      offerTitle: offer ? offer.title : 'Custom CPA Offer',
      vertical: vertical || 'iGaming',
      status: 'Active',
      format: format || 'Popunder',
      targetGeos: targetGeos || ['USA', 'DEU'],
      bidType: bidType || 'CPT',
      bidAmount: Number(bidAmount) || 0.003,
      dailyBudget: Number(dailyBudget) || 150,
      totalBudget: Number(totalBudget) || 1500,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    campaigns.unshift(newCampaign);
    res.status(201).json({ success: true, campaign: newCampaign });
  });

  app.patch("/api/campaigns/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    campaign.status = status;
    res.json({ success: true, campaign });
  });

  // Analytics Summary
  app.get("/api/analytics", (_req, res) => {
    const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
    const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
    const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
    const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
    const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
    const roi = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0;

    res.json({
      summary: {
        totalSpent,
        totalRevenue,
        totalNetProfit: totalRevenue - totalSpent,
        roi: Math.round(roi * 10) / 10,
        totalConversions,
        totalClicks,
        totalImpressions,
        epc: totalClicks > 0 ? Math.round((totalRevenue / totalClicks) * 100) / 100 : 0,
        cr: totalClicks > 0 ? Math.round((totalConversions / totalClicks) * 10000) / 100 : 0
      },
      hourly: INITIAL_ANALYTICS_HOURLY,
      geos: INITIAL_GEO_STATS,
      postbacks: postbacks.slice(0, 10),
      conferences: INITIAL_CONFERENCES
    });
  });

  // Postback / Lead Tester
  app.post("/api/postback/test", (req, res) => {
    const { clickId, campaignId, payout, geo } = req.body;
    
    const campaign = campaigns.find(c => c.id === campaignId) || campaigns[0];
    const offer = offers.find(o => o.id === campaign.offerId);

    const leadPayout = Number(payout) || (offer ? offer.payout : 25.00);
    const newLog: PostbackLog = {
      id: `PB-${Math.floor(1000 + Math.random() * 9000)}`,
      clickId: clickId || `clk_${Math.random().toString(36).substring(2, 12)}`,
      campaignId: campaign.id,
      offerId: campaign.offerId,
      payout: leadPayout,
      geo: geo || campaign.targetGeos[0] || 'USA',
      status: 'Success',
      timestamp: 'Just now'
    };

    // Update campaign stats
    campaign.conversions += 1;
    campaign.revenue += leadPayout;
    postbacks.unshift(newLog);

    res.json({
      success: true,
      message: `Postback received! +$${leadPayout.toFixed(2)} tracked to campaign ${campaign.name}`,
      log: newLog
    });
  });

  // Wallet Top-up
  app.post("/api/wallet/deposit", (req, res) => {
    const { amount } = req.body;
    const addAmt = Math.max(Number(amount) || 100, 10);
    walletBalance += addAmt;
    res.json({ success: true, balance: walletBalance, message: `Deposited $${addAmt.toFixed(2)} to wallet balance.` });
  });

  // AI Campaign Copy & Strategy Generator (Gemini API)
  app.post("/api/ai/ad-copy", async (req, res) => {
    try {
      const { offerTitle, vertical, targetAudience, adFormat } = req.body;
      const ai = getAi();

      if (!ai) {
        // Fallback intelligent creative response if key is not configured
        return res.json({
          headlines: [
            `🔥 Exclusive Deal: ${offerTitle || 'Top Offer'} - Limited Time Only!`,
            `⚡ Instant Access to ${vertical || 'Top Rated'} Platform - Claim Now`,
            `🎯 Rated #1 Choice in ${targetAudience || 'Worldwide'} - Don't Miss Out`
          ],
          adCopies: [
            `Discover why thousands are switching to ${offerTitle || 'this platform'}. Fast signup, instant rewards, and 24/7 premium support. Click below to start!`,
            `Are you ready for the ultimate ${vertical || 'performance'} experience? Unlock VIP perks and top bonuses today.`
          ],
          callToActions: [
            "Claim Bonus Now",
            "Start Instant Trial",
            "Play & Win Today"
          ],
          targetingHooks: [
            `High intent ${targetAudience || 'male 21-45'} demographic on mobile Wi-Fi`,
            `Geos with high CPT volume: USA, DEU, GBR, CAN`,
            `Optimal bid timing: 18:00 - 23:00 local time`
          ],
          optimizationTips: [
            "Use pre-lander with 3-question interactive quiz to boost conversion rates by 35%.",
            "Set frequency capping to 1 impression per 24 hours per user IP to maximize ROI.",
            "Target Chrome and Safari mobile browsers on iOS 16+ / Android 13+."
          ]
        });
      }

      const model = "gemini-2.5-flash";
      const prompt = `You are SeekoLabs AI AdTech Campaign Strategist.
Given the following offer details:
- Offer Title: ${offerTitle || 'High Payout CPA Offer'}
- Vertical: ${vertical || 'iGaming'}
- Target Audience: ${targetAudience || 'Tier 1 Mobile Users'}
- Ad Format: ${adFormat || 'In-Page Push / Popunder'}

Provide a JSON object response with exact keys:
1. "headlines": Array of 3 punchy, high-converting ad headlines or push notifications (under 50 chars each).
2. "adCopies": Array of 2 persuasive ad descriptions / pre-lander hooks.
3. "callToActions": Array of 3 high-conversion CTAs.
4. "targetingHooks": Array of 3 specific audience/targeting insights for maximum EPC.
5. "optimizationTips": Array of 3 media buying optimization tips (frequency capping, CPT bidding, pre-lander advice).

Respond ONLY with valid JSON, no markdown formatting outside JSON.`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });

      const responseText = response.text || "";
      let parsed = {};
      try {
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleanJson);
      } catch (e) {
        parsed = {
          headlines: [`${offerTitle} - Instant Access`, `Top Rated ${vertical} Offer`, `Claim Your Bonus Today`],
          adCopies: [`Experience premium ${vertical} offers with guaranteed highest payouts.`],
          callToActions: ["Claim Now", "Register Today"],
          targetingHooks: ["Target Mobile 4G / Wi-Fi Tier 1"],
          optimizationTips: ["Cap at 1/24h frequency to protect EPC"]
        };
      }

      res.json(parsed);
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({ error: "Failed to generate AI creative copy", details: err.message });
    }
  });

  // --- VITE / PRODUCTION SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SeekoLabs Engine running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
