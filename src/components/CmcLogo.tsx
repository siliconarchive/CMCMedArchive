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
    sm: 32,
    md: 40,
    lg: 48,
    xl: 60
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-xs'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* High-Contrast Vector Insignia */}
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
          <linearGradient id="cmcEmblemBgGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="cmcTealGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Outer Shield Frame in Deep Navy with Medical Sky Border */}
        <rect
          width="48"
          height="48"
          rx="14"
          fill="url(#cmcEmblemBgGrad)"
          stroke="#0284c7"
          strokeWidth="1.8"
        />

        {/* Open Archive Folio at Base */}
        <path
          d="M11 36C16 33.5 20.5 33.5 24 35C27.5 33.5 32 33.5 37 36V37.5C32 35 27.5 35 24 36.5C20.5 35 16 35 11 37.5V36Z"
          fill="#38bdf8"
        />

        {/* Pure White Medical Cross Core (High Visibility in all environments) */}
        <rect x="21" y="10" width="6" height="21" rx="2" fill="#ffffff" />
        <rect x="13.5" y="17.5" width="21" height="6" rx="2" fill="#ffffff" />

        {/* Central Clinical Jewel Node */}
        <circle cx="24" cy="20.5" r="2.2" fill="#0284c7" />

        {/* Top Apex Knowledge Spark */}
        <circle cx="24" cy="7.5" r="1.5" fill="#38bdf8" />
      </svg>

      {/* Typography Lockup */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1.5 font-sans">
            <span className={`${titleSizes} font-black tracking-tight text-slate-900 dark:text-white`}>
              CMC
            </span>
            <span className={`${titleSizes} font-extrabold tracking-tight`}>
              <span className="text-sky-600 dark:text-sky-400">Med</span>
              <span className="text-slate-800 dark:text-slate-100 font-bold">Archive</span>
            </span>
          </div>

          {showSubtitle && variant === 'full' && (
            <span
              className={`${subSizes} uppercase font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 mt-0.5`}
            >
              Chittagong Medical College
            </span>
          )}
        </div>
      )}
    </div>
  );
};
