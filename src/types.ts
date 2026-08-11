export type Vertical = 
  | 'Games' 
  | 'Webcam' 
  | 'iGaming' 
  | 'Dating' 
  | 'Video-on-Demand' 
  | 'Betting' 
  | 'Nutra' 
  | 'Crypto' 
  | 'Sweeps' 
  | 'Software';

export interface CPAOffer {
  id: string;
  title: string;
  vertical: Vertical;
  payout: number;
  payoutType: 'CPA' | 'CPL' | 'RevShare' | 'CPS' | 'CPI';
  epc: number; // Expected payout per click
  cr: number; // Conversion rate %
  geos: string[];
  allowedTraffic: string[];
  description: string;
  image: string;
  riskScore: 'Low' | 'Medium' | 'Optimal Risk';
  badge?: string;
  rating: number;
  conversionFlow: string;
  featured?: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  offerId: string;
  offerTitle: string;
  vertical: Vertical;
  status: 'Active' | 'Paused' | 'Pending' | 'Completed';
  format: 'Popunder' | 'In-Page Push' | 'Native Ads' | 'Display Banner' | 'Direct Domain';
  targetGeos: string[];
  bidType: 'CPT' | 'CPC' | 'CPM';
  bidAmount: number;
  dailyBudget: number;
  totalBudget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
}

export interface PostbackLog {
  id: string;
  clickId: string;
  campaignId: string;
  offerId: string;
  payout: number;
  geo: string;
  status: 'Success' | 'Duplicate' | 'Invalid';
  timestamp: string;
}

export interface AnalyticsDataPoint {
  time: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
}

export interface GeoStat {
  country: string;
  code: string;
  flag: string;
  conversions: number;
  revenue: number;
  share: number;
}

export interface AICopyRequest {
  offerTitle: string;
  vertical: string;
  targetAudience: string;
  adFormat: string;
  angle?: string;
}

export interface AICopyResponse {
  headlines: string[];
  adCopies: string[];
  callToActions: string[];
  targetingHooks: string[];
  optimizationTips: string[];
}

export interface ConferenceEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  flag: string;
  booth: string;
  badge: string;
  image: string;
}
