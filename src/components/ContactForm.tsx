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
    <section id="contact" className={`py-16 md:py-24 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100/80 text-slate-900'
    }`}>
      
      {/* Background glow effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${
        isDark ? 'bg-indigo-600/10' : 'bg-indigo-300/20'
      }`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-3 border ${
            isDark 
              ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
              : 'bg-cyan-50 border-cyan-200 text-cyan-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">SeekoLabs</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Reach out directly to our founders and engineering leads for app publishing opportunities, strategic partnerships, or technical inquiries.
          </p>
        </div>

        {/* Email Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {contactList.map((contact, idx) => (
            <div 
              key={idx}
              className={`border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 group flex flex-col justify-between ${
                isDark 
                  ? 'bg-slate-900 border-indigo-900/60 hover:border-cyan-400/50' 
                  : 'bg-white border-slate-200/80 shadow-slate-200/80 hover:border-cyan-500'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    isDark 
                      ? 'bg-slate-950 text-indigo-300 border-indigo-500/30' 
                      : 'bg-slate-100 text-indigo-700 border-slate-200'
                  }`}>
                    Direct Contact
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black group-hover:text-cyan-500 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {contact.name}
                </h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold mb-3">
                  {contact.role}
                </p>

                <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {contact.focus}
                </p>
              </div>

              <div className={`space-y-3 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className={`flex items-center justify-between p-3 rounded-xl border font-mono text-xs ${
                  isDark 
                    ? 'bg-slate-950 border-slate-800 text-cyan-300' 
                    : 'bg-slate-50 border-slate-200 text-cyan-700'
                }`}>
                  <span className="truncate">{contact.email}</span>
                  <button
                    onClick={() => handleCopy(contact.email)}
                    className={`ml-2 p-1.5 rounded-lg transition-colors shrink-0 flex items-center gap-1 text-[11px] ${
                      isDark 
                        ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white' 
                        : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                    title="Copy Email Address"
                  >
                    {copiedEmail === contact.email ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
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
        <div className={`border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark 
            ? 'bg-slate-900/80 border-indigo-500/20' 
            : 'bg-white border-slate-200/80 shadow-md'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>SeekoLabs Publishing House</h4>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Headquartered in Kolkata, India • Global Product Operations</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-2xl border ${
            isDark 
              ? 'text-slate-400 bg-slate-950 border-slate-800' 
              : 'text-slate-600 bg-slate-50 border-slate-200'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Fast direct response guaranteed within 24 hours</span>
          </div>
        </div>

      </div>
    </section>
  );
};
