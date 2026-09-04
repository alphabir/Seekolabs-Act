import React, { useState } from 'react';
import { Mail, Sparkles, MapPin, Check, Copy, ShieldCheck } from 'lucide-react';

interface ContactFormProps {
  theme?: 'dark' | 'light';
}

export const ContactForm: React.FC<ContactFormProps> = ({ theme = 'dark' }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  const contactList = [
    {
      name: "Partnerships & Publishing",
      role: "Strategic Alliances & App Publishing",
      email: "growth@seekolabs.tech",
      focus: "App Co-Publishing, Distribution Partnerships, Media Inquiries & Business Alliances"
    },
    {
      name: "Product & Technical Support",
      role: "Developer Relations & Support Desk",
      email: "support@seekolabs.tech",
      focus: "App Support, Technical Integrations, Bug Reporting & User Assistance"
    }
  ];

  return (
    <section id="contact" className={`py-16 md:py-24 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0B0C0E] text-slate-100' : 'bg-zinc-100/80 text-zinc-900'
    }`}>
      
      {/* Background glow effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-yellow-500/10' : 'bg-yellow-300/20'
      }`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-3 border ${
            isDark 
              ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' 
              : 'bg-yellow-100 border-yellow-300 text-zinc-900'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Contact Us</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">SeekoLabs</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Reach out directly for app publishing opportunities, strategic co-development, product assistance, or technical inquiries.
          </p>
        </div>

        {/* Email Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {contactList.map((contact, idx) => (
            <div 
              key={idx}
              className={`border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 group flex flex-col justify-between ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 hover:border-yellow-400/50' 
                  : 'bg-white border-zinc-200/80 shadow-zinc-200/80 hover:border-yellow-500'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-500/10 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    isDark 
                      ? 'bg-zinc-950 text-yellow-400 border-yellow-400/30' 
                      : 'bg-zinc-100 text-zinc-900 border-zinc-200'
                  }`}>
                    Official Channel
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black group-hover:text-yellow-400 transition-colors ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}>
                  {contact.name}
                </h3>
                <p className="text-xs font-mono text-yellow-400 font-semibold mb-3">
                  {contact.role}
                </p>

                <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {contact.focus}
                </p>
              </div>

              <div className={`space-y-3 pt-4 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className={`flex items-center justify-between p-3 rounded-xl border font-mono text-xs ${
                  isDark 
                    ? 'bg-zinc-950 border-zinc-800 text-yellow-400' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                }`}>
                  <span className="truncate">{contact.email}</span>
                  <button
                    onClick={() => handleCopy(contact.email)}
                    className={`ml-2 p-1.5 rounded-lg transition-colors shrink-0 flex items-center gap-1 text-[11px] ${
                      isDark 
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white' 
                        : 'bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700'
                    }`}
                    title="Copy Email Address"
                  >
                    {copiedEmail === contact.email ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-yellow-400 font-bold" />
                        <span className="text-yellow-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${contact.email}`}
                  className="w-full py-3 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg border border-yellow-300 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email ({contact.email.split('@')[0]})</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Studio Info Card */}
        <div className={`border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark 
            ? 'bg-zinc-900/80 border-yellow-500/20' 
            : 'bg-white border-zinc-200/80 shadow-md'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>SeekoLabs Publishing House</h4>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Headquartered in Kolkata, India • Global Product Operations</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-2xl border ${
            isDark 
              ? 'text-zinc-400 bg-zinc-950 border-zinc-800' 
              : 'text-zinc-600 bg-zinc-50 border-zinc-200'
          }`}>
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>Fast direct response guaranteed within 24 hours</span>
          </div>
        </div>

      </div>
    </section>
  );
};
