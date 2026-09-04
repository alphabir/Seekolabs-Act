import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { SeekoLabsLogo } from './SeekoLabsLogo';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  theme?: 'dark' | 'light';
}

const NAVIGATION_LINKS: ReadonlyArray<{ id: string; label: string; emphasised?: boolean }> = [
  { id: 'about', label: 'About Our House' },
  { id: 'solutions', label: 'App Ecosystem' },
  { id: 'contact', label: 'Contact Us', emphasised: true },
];

const PUBLISHING_FOCUS_LINKS: ReadonlyArray<string> = [
  'Web & Productivity Apps',
  'Mobile Utilities & Tools',
  'Developer Tools & APIs',
  'App Incubator & Growth',
];

// Real pages now, served as static files from public/. They are plain <a> links rather
// than router links on purpose: they leave the SPA and hit the file directly, which is
// what makes them work for a crawler and for anyone with JavaScript disabled.
const LEGAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Privacy Policy', href: '/privacy.html' },
  { label: 'Terms of Service', href: '/terms.html' },
];

// Shared focus ring so every footer control is visible when tabbed to.
const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded';

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t text-xs py-12 transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0C0E] border-zinc-800 text-zinc-400'
          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-zinc-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onScrollToSection('hero')}
              className={`inline-block ${FOCUS_RING}`}
              aria-label="SeekoLabs — back to top"
            >
              <SeekoLabsLogo variant="full" theme="dark" size="md" />
            </button>

            <p className="text-zinc-300 text-xs leading-relaxed">
              SeekoLabs (<code className="text-yellow-400">seekolabs.tech</code>) is a digital app
              publishing house and product studio. We engineer, launch, and scale our own ecosystem
              of software products.
            </p>

            <div className="flex items-center gap-2 text-zinc-300 text-xs">
              <MapPin className="w-4 h-4 text-yellow-400 shrink-0" aria-hidden="true" />
              <span>Kolkata, India • Global Publishing</span>
            </div>

            <div className="space-y-1.5 text-zinc-300 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:growth@seekolabs.tech"
                  className={`hover:text-yellow-400 font-mono font-medium ${FOCUS_RING}`}
                >
                  growth@seekolabs.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@seekolabs.tech"
                  className={`hover:text-yellow-400 font-mono font-medium ${FOCUS_RING}`}
                >
                  support@seekolabs.tech
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <nav className="space-y-3" aria-labelledby="footer-navigation-heading">
            <h4
              id="footer-navigation-heading"
              className="text-sm font-bold text-white uppercase tracking-wider"
            >
              Navigation
            </h4>
            <ul className="space-y-2 font-medium">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onScrollToSection(link.id)}
                    className={`text-left hover:text-yellow-400 transition-colors ${FOCUS_RING} ${
                      link.emphasised ? 'text-yellow-400 font-bold' : ''
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Publishing House Focus */}
          <nav className="space-y-3" aria-labelledby="footer-focus-heading">
            <h4
              id="footer-focus-heading"
              className="text-sm font-bold text-white uppercase tracking-wider"
            >
              Publishing Focus
            </h4>
            <ul className="space-y-2 font-medium">
              {PUBLISHING_FOCUS_LINKS.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('solutions')}
                    className={`text-left hover:text-yellow-400 transition-colors ${FOCUS_RING}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Contact CTA */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect</h4>
            <p className="text-zinc-400 text-xs">
              Collaborate with SeekoLabs for app co-publishing, distribution, or technical alliances.
            </p>

            <button
              type="button"
              onClick={() => onScrollToSection('contact')}
              className={`w-full py-2.5 bg-[#FFE600] hover:bg-yellow-300 text-[#0B0C0E] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md border border-yellow-300 transition-all ${FOCUS_RING}`}
            >
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Contact SeekoLabs</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-zinc-200">SeekoLabs Tech</span> (seekolabs.tech). All
            rights reserved.
          </div>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`hover:text-zinc-200 transition-colors ${FOCUS_RING}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => onScrollToSection('contact')}
                className={`hover:text-zinc-200 transition-colors ${FOCUS_RING}`}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
