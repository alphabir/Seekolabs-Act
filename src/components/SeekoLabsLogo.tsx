import React from 'react';

interface SeekoLabsLogoProps {
  variant?: 'full' | 'icon-only' | 'hero' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  theme?: 'dark' | 'light';
  className?: string;
  showTechBadge?: boolean;
}

export const SeekoLabsLogo: React.FC<SeekoLabsLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  className = '',
  showTechBadge = true,
}) => {
  const isDark = theme === 'dark';

  // Sizing definitions for Icon
  const iconSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
    hero: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
  };

  // Text sizes
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl sm:text-5xl',
    hero: 'text-4xl sm:text-6xl lg:text-7xl',
  };

  // Icon SVG
  const IconMark = (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-[#FFE600] p-1.5 shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform duration-300 ${iconSizes[size]}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#0B0C0E]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-Left Cross 'X' */}
        <path
          d="M 24 24 L 40 40 M 40 24 L 24 40"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Top-Right Square '■' */}
        <rect x="58" y="24" width="18" height="18" rx="2" fill="currentColor" />
        {/* Bottom Underscore 'Mouth' */}
        <rect x="32" y="66" width="36" height="7" rx="3.5" fill="currentColor" />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-block ${className}`}>{IconMark}</div>;
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-start gap-4 ${className}`}>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
            {IconMark}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-black tracking-tighter lowercase ${textSizes[size]} ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                seekolabs
              </span>
              {showTechBadge && (
                <span className="px-2.5 py-1 bg-[#FFE600] text-[#0B0C0E] font-black text-xs tracking-widest uppercase rounded-md shadow-sm border border-yellow-300">
                  TECH
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-yellow-400 font-bold mt-1">
              Independent App Publishing House
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all ${
          isDark
            ? 'bg-zinc-900/90 border-yellow-500/30 text-white hover:border-yellow-400'
            : 'bg-white border-zinc-200 text-zinc-900 shadow-sm hover:border-yellow-500'
        } ${className}`}
      >
        <div className="w-6 h-6 bg-[#FFE600] rounded-md p-0.5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B0C0E]">
            <path d="M 24 24 L 40 40 M 40 24 L 24 40" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
            <rect x="58" y="24" width="18" height="18" rx="2" fill="currentColor" />
            <rect x="32" y="66" width="36" height="7" rx="3.5" fill="currentColor" />
          </svg>
        </div>
        <span className="font-extrabold text-sm tracking-tight lowercase">seekolabs</span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded font-bold">
          TECH
        </span>
      </div>
    );
  }

  // Standard 'full' variant
  return (
    <div className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      {IconMark}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tighter lowercase ${textSizes[size]} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            seekolabs
          </span>
          {showTechBadge && (
            <span className="text-[10px] uppercase font-black tracking-widest px-1.5 py-0.5 bg-[#FFE600] text-[#0B0C0E] rounded font-bold shadow-sm">
              TECH
            </span>
          )}
        </div>
        <p className={`text-[11px] tracking-tight font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          App Publishing House
        </p>
      </div>
    </div>
  );
};
