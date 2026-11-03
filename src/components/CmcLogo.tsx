import React from 'react';

interface CmcLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const CmcLogo: React.FC<CmcLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  showSubtitle = true
}) => {
  const iconDimensions = {
    sm: 30,
    md: 38,
    lg: 48,
    xl: 60
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark */}
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cmcGradLogo" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0c4436" />
            <stop offset="100%" stopColor="#146d58" />
          </linearGradient>
          <linearGradient id="accentGradLogo" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <filter id="shadowLogo" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#042018" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Archival Shield */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill="url(#cmcGradLogo)"
          stroke="#1a8a70"
          strokeWidth="1.2"
        />

        {/* Dynamic Knowledge Arch */}
        <path
          d="M10 36C15 33 20 32 24 32C28 32 33 33 38 36"
          stroke="url(#accentGradLogo)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Archival Open Book Silhouette */}
        <path
          d="M12 34C17 31.5 21.5 31.5 24 33C26.5 31.5 31 31.5 36 34V36C31 33.5 26.5 33.5 24 35C21.5 33.5 17 33.5 12 36V34Z"
          fill="#ffffff"
          fillOpacity="0.25"
        />

        {/* Medical Cross */}
        <g filter="url(#shadowLogo)">
          <rect x="21" y="11" width="6" height="19" rx="2" fill="#ffffff" />
          <rect x="14.5" y="17.5" width="19" height="6" rx="2" fill="#ffffff" />
          <circle cx="24" cy="20.5" r="1.5" fill="#0c4436" />
        </g>

        {/* Precision Node */}
        <circle cx="24" cy="9.5" r="1.5" fill="#5eead4" />
      </svg>

      {/* Typography Lockup */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
              CMC
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-emerald-800 font-sans">
              Med<span className="text-slate-800 font-semibold">Archive</span>
            </span>
          </div>
          {showSubtitle && variant === 'full' && (
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-slate-500 mt-1">
              Chittagong Medical College
            </span>
          )}
        </div>
      )}
    </div>
  );
};
