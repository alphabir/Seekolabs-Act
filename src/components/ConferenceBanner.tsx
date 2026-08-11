import React, { useState } from 'react';
import { MapPin, Calendar, Users, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { ConferenceEvent } from '../types';

interface ConferenceBannerProps {
  conferences: ConferenceEvent[];
}

export const ConferenceBanner: React.FC<ConferenceBannerProps> = ({ conferences }) => {
  const [meetingBooked, setMeetingBooked] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const primaryConf = conferences[0] || {
    title: 'Meet SeekoLabs at G Gate Conf',
    subtitle: 'Traffic & CPA Performance Summit',
    date: '26 - 27 June 2026',
    location: 'Georgia, Tbilisi',
    flag: '🇬🇪',
    booth: 'Booth #B-14',
    badge: 'Exclusive Invitation',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  };

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setMeetingBooked(true);
    }
  };

  return (
    <section className="py-16 bg-slate-950 border-b border-indigo-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Conference Banner Card - Inspired by Reference Image 11 */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-indigo-500/40 shadow-2xl min-h-[420px] flex flex-col justify-end p-6 sm:p-12">
          
          {/* Background Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={primaryConf.image} 
              alt={primaryConf.title}
              className="w-full h-full object-cover filter brightness-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-color" />
          </div>

          {/* Top Invitation Badge Overlay */}
          <div className="relative z-10 mb-auto flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2 bg-indigo-600/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-indigo-400/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-extrabold text-cyan-200 uppercase tracking-widest">
                SeekoLabs {primaryConf.badge}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs text-amber-300 font-bold">
              <span>{primaryConf.flag}</span>
              <span>{primaryConf.location}</span>
            </div>
          </div>

          {/* Main Card Center Content */}
          <div className="relative z-10 max-w-3xl space-y-4 my-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              {primaryConf.title}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-light">
              Connect with SeekoLabs media buyers, account managers, and affiliate managers. Discuss custom payouts, dedicated CPT volume caps, and exclusive private CPA offers.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 font-mono">
              <span className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-white/10">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{primaryConf.date}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-white/10">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>{primaryConf.location}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-white/10 text-emerald-400 font-bold">
                <Users className="w-4 h-4" />
                <span>{primaryConf.booth}</span>
              </span>
            </div>
          </div>

          {/* Meeting Registration Form */}
          <div className="relative z-10 pt-4 border-t border-white/10 max-w-xl">
            {meetingBooked ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Meeting requested! Our affiliate manager will confirm your VIP slot at {primaryConf.booth}.</span>
              </div>
            ) : (
              <form onSubmit={handleBookMeeting} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email to book a 1-on-1 meeting..."
                  className="flex-1 bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Book VIP Slot</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Secondary Conference Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {conferences.slice(1).map((conf) => (
            <div key={conf.id} className="bg-slate-900/60 border border-indigo-900/40 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-semibold mb-1">
                  <span>{conf.flag}</span>
                  <span>{conf.location}</span>
                  <span className="text-slate-600">•</span>
                  <span>{conf.date}</span>
                </div>
                <h4 className="text-base font-bold text-white">{conf.title}</h4>
                <p className="text-xs text-slate-400">{conf.booth} - {conf.subtitle}</p>
              </div>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20 shrink-0">
                {conf.badge}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
