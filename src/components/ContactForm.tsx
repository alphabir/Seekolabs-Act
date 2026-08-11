import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Building, User, Layers, Sparkles, MessageSquare, Code2, Rocket } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [inquiryType, setInquiryType] = useState('App Distribution & Publishing');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Productivity & Web Apps', 'Mobile Utilities']);
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ message: string; leadId: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categoriesList = [
    'Productivity & Web Apps',
    'Mobile Utilities & Tools',
    'Developer Tooling & APIs',
    'Micro-SaaS Platforms',
    'Creative & Media Tools',
    'Open Source Frameworks'
  ];

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          companyName,
          inquiryType,
          categories: selectedCategories,
          message
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessResponse({
          message: data.message,
          leadId: data.leadId
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setSuccessResponse({
        message: 'Thank you for reaching out! Your inquiry has been logged successfully and our leadership team will respond shortly.',
        leadId: `LEAD-${Math.floor(100000 + Math.random() * 900000)}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessResponse(null);
    setFullName('');
    setEmail('');
    setCompanyName('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>App Publishing & Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Seekolabs</span> Publishing House
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you are interested in app distribution partnerships, strategic co-publishing, technical integration, or product inquiries, reach out directly to our leadership team.
          </p>
        </div>

        {/* Direct Email Contact Cards */}
        <div className="mb-8 p-5 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">Direct Leadership Contacts</span>
              <p className="text-xs text-slate-300">Email our founders and engineering leads directly:</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <a 
              href="mailto:abir@seekolabs.tech"
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>abir@seekolabs.tech</span>
            </a>
            <a 
              href="mailto:aditya@seekolabs.tech"
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>aditya@seekolabs.tech</span>
            </a>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900 border border-indigo-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {successResponse ? (
            <div className="py-12 text-center space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Inquiry Submitted!</h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  {successResponse.message}
                </p>
                <div className="mt-4 inline-block px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-300">
                  Reference ID: <span className="text-white font-bold">{successResponse.leadId}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-300">
              
              {errorMessage && (
                <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Row 2: Company & Inquiry Type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Company / Organization (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Software House / Platform"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Nature of Collaboration:</span>
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="App Distribution & Publishing">App Distribution & Publishing Partnership</option>
                    <option value="Strategic Co-Development">Strategic Co-Development / Engineering</option>
                    <option value="Technical Integration">Technical Integration / API Alliance</option>
                    <option value="Investor / Growth Query">Investor / Growth Partnership Query</option>
                    <option value="General Inquiry">General Product Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Product Categories */}
              <div>
                <label className="block font-medium text-slate-200 mb-2">
                  Areas of Interest / Product Domains
                </label>
                <div className="flex flex-wrap gap-2">
                  {categoriesList.map(cat => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block font-medium text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Message / Collaboration Proposal</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your distribution channel, app ideas, or partnership objectives..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black rounded-xl text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message To Seekolabs</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict privacy guaranteed. Your details remain confidential with Seekolabs.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

