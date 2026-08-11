import React, { useState } from 'react';
import { Mail, Sparkles, MapPin, Check, Copy, Globe, ShieldCheck, MessageSquare, Code2, Users } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  const contactList = [
    {
      name: "Abir Mukherjee",
      role: "Engineering & Operations Lead",
      email: "abir@seekolabs.tech",
      focus: "App Co-Publishing, Architecture & Strategic Alliances"
    },
    {
      name: "Aditya",
      role: "Product & Growth Lead",
      email: "aditya@seekolabs.tech",
      focus: "Distribution Channels, Monetization & Product Partnerships"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Leadership Contacts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">SeekoLabs</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Reach out directly to our founders and engineering leads for app publishing opportunities, strategic partnerships, or technical inquiries.
          </p>
        </div>

        {/* Email Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {contactList.map((contact, idx) => (
            <div 
              key={idx}
              className="bg-slate-900 border border-indigo-900/60 hover:border-cyan-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950 text-indigo-300 border border-indigo-500/30">
                    Direct Contact
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {contact.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-semibold mb-3">
                  {contact.role}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {contact.focus}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                  <span className="truncate">{contact.email}</span>
                  <button
                    onClick={() => handleCopy(contact.email)}
                    className="ml-2 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                    title="Copy Email Address"
                  >
                    {copiedEmail === contact.email ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${contact.email}`}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email To {contact.name.split(' ')[0]}</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Studio Info Card */}
        <div className="bg-slate-900/80 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">SeekoLabs Publishing House</h4>
              <p className="text-xs text-slate-400">Headquartered in Kolkata, India • Global Product Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fast direct response guaranteed within 24 hours</span>
          </div>
        </div>

      </div>
    </section>
  );
};
