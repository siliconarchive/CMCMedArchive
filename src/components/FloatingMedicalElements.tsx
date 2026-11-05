import React from 'react';

interface FloatingMedicalElementsProps {
  page: string;
}

export const FloatingMedicalElements: React.FC<FloatingMedicalElementsProps> = ({ page }) => {
  // On reading-heavy question archives, keep elements ultra-subtle or restrained to margins
  const isReadingPage = page === 'mcq' || page === 'archive' || page === 'question';
  const isHomePage = page === 'home';

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden transition-opacity duration-700 ${
        isHomePage ? 'opacity-90' : isReadingPage ? 'opacity-25' : 'opacity-40'
      }`}
    >
      {/* 1. Stethoscope — Top Right Ambient Float */}
      <div
        className="absolute -top-6 right-4 sm:right-12 md:right-20 lg:right-28 w-36 h-36 sm:w-48 sm:h-48 med-float-1"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm opacity-60 dark:opacity-40"
        >
          <defs>
            <linearGradient id="stethTube" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34766F" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#173B55" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#2A9D8F" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="stethMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <radialGradient id="chestPiece" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          {/* Ear tubes */}
          <path
            d="M 45 25 C 45 45, 60 65, 80 65 C 100 65, 115 45, 115 25"
            stroke="url(#stethMetal)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Earpieces */}
          <circle cx="45" cy="23" r="4.5" fill="#173B55" />
          <circle cx="115" cy="23" r="4.5" fill="#173B55" />
          {/* Flexible Y-Yoke & Tubing loop */}
          <path
            d="M 80 65 C 80 85, 65 105, 80 120 C 95 135, 125 110, 115 85 C 110 70, 85 90, 95 125"
            stroke="url(#stethTube)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Chest piece Diaphragm */}
          <g transform="translate(95, 125)">
            <circle cx="0" cy="0" r="14" fill="url(#chestPiece)" stroke="#34766F" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="10" fill="#E2E8F0" opacity="0.6" />
            <circle cx="0" cy="0" r="3.5" fill="#173B55" />
          </g>
        </svg>
      </div>

      {/* 2. Anatomical Heart — Mid Left Ambient Float */}
      <div
        className="absolute top-72 sm:top-80 -left-6 sm:left-4 md:left-10 w-32 h-36 sm:w-44 sm:h-48 med-float-2 hidden sm:block"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm opacity-50 dark:opacity-35"
        >
          <defs>
            <linearGradient id="heartAorta" x1="60" y1="10" x2="100" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BE123C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="heartVentricle" x1="40" y1="60" x2="120" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#173B55" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#34766F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="pulmonaryArtery" x1="40" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Superior Vena Cava */}
          <path d="M 50 18 L 50 50 C 50 55, 60 55, 60 50 L 60 20 Z" fill="#0284C7" opacity="0.8" />
          {/* Aortic Arch & Branches */}
          <path
            d="M 72 45 C 72 20, 105 18, 108 45 C 108 55, 100 65, 95 72"
            stroke="url(#heartAorta)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Brachiocephalic, Carotid, Subclavian arteries */}
          <path d="M 80 23 L 78 10 M 89 21 L 91 8 M 98 24 L 104 12" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" />
          {/* Pulmonary Trunk */}
          <path
            d="M 60 55 C 65 40, 85 45, 88 60"
            stroke="url(#pulmonaryArtery)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          {/* Muscular Ventricles & Apex */}
          <path
            d="M 55 65 C 35 75, 30 110, 50 140 C 65 160, 85 170, 95 172 C 105 170, 130 145, 132 105 C 134 75, 105 60, 85 68 C 75 72, 65 65, 55 65 Z"
            fill="url(#heartVentricle)"
            stroke="#34766F"
            strokeWidth="2"
          />
          {/* Coronary Sulcus & Anterior Interventricular Artery */}
          <path
            d="M 82 72 Q 90 110, 92 165"
            stroke="#BE123C"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 87 105 Q 105 118, 115 125"
            stroke="#BE123C"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* 3. Lungs with Bronchial Arborization — Top Left */}
      <div
        className="absolute top-12 left-2 sm:left-12 md:left-24 w-32 h-32 sm:w-40 sm:h-40 med-float-3"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm opacity-45 dark:opacity-30"
        >
          <defs>
            <linearGradient id="lungGrad" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#173B55" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          {/* Trachea with Cartilaginous Rings */}
          <path d="M 80 15 L 80 50" stroke="#34766F" strokeWidth="5" strokeLinecap="round" />
          <line x1="75" y1="22" x2="85" y2="22" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="75" y1="30" x2="85" y2="30" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="75" y1="38" x2="85" y2="38" stroke="#CBD5E1" strokeWidth="2" />
          {/* Bronchial Bifurcation (Carina) */}
          <path d="M 80 50 Q 65 65, 52 80" stroke="#34766F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 80 50 Q 95 65, 108 80" stroke="#34766F" strokeWidth="3.5" strokeLinecap="round" />
          {/* Secondary Bronchi */}
          <path d="M 58 72 Q 45 85, 38 105 M 58 72 Q 62 90, 58 115" stroke="#2A9D8F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 102 72 Q 115 85, 122 105 M 102 72 Q 98 90, 102 115" stroke="#2A9D8F" strokeWidth="2" strokeLinecap="round" />
          {/* Right Lung Lobes (Superior, Middle, Inferior) */}
          <path
            d="M 72 52 C 55 45, 30 55, 25 80 C 20 105, 24 135, 48 142 C 65 145, 74 135, 74 120 C 74 95, 72 75, 72 52 Z"
            fill="url(#lungGrad)"
            stroke="#34766F"
            strokeWidth="1.8"
          />
          {/* Left Lung (Superior & Inferior Lobes + Cardiac Notch) */}
          <path
            d="M 88 52 C 105 45, 130 55, 135 80 C 140 105, 136 135, 112 142 C 95 145, 88 128, 88 110 C 84 98, 88 75, 88 52 Z"
            fill="url(#lungGrad)"
            stroke="#34766F"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* 4. Human Anatomical Brain / Cerebrum — Mid Right */}
      <div
        className="absolute top-96 right-2 sm:right-10 md:right-16 w-36 h-32 sm:w-44 sm:h-40 med-float-4 hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm opacity-50 dark:opacity-35"
        >
          <defs>
            <linearGradient id="brainGrad" x1="20" y1="20" x2="140" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34766F" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#173B55" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2A9D8F" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Cerebral Cortex Contour */}
          <path
            d="M 40 85 C 28 85, 22 70, 28 55 C 34 38, 52 25, 75 22 C 102 20, 130 32, 138 52 C 144 68, 140 85, 130 95 C 122 102, 115 102, 110 115 C 105 125, 92 128, 82 124 C 76 122, 70 112, 65 110 C 55 108, 48 100, 40 85 Z"
            fill="url(#brainGrad)"
            stroke="#173B55"
            strokeWidth="2.2"
          />
          {/* Sulci and Gyri convolutions */}
          <path d="M 38 52 Q 55 58, 68 45 Q 82 35, 95 42" stroke="#34766F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 52 68 Q 72 75, 88 62 Q 105 52, 122 65" stroke="#34766F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 35 74 Q 52 82, 65 78 Q 80 72, 92 88" stroke="#34766F" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 68 85 Q 80 102, 95 95 Q 112 88, 125 90" stroke="#34766F" strokeWidth="1.8" strokeLinecap="round" />
          {/* Cerebellar Foliation */}
          <path d="M 60 105 C 68 115, 85 115, 92 108" stroke="#2A9D8F" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 68 115 C 75 120, 85 120, 90 114" stroke="#2A9D8F" strokeWidth="1.5" strokeLinecap="round" />
          {/* Brainstem / Medulla Oblongata */}
          <path d="M 75 122 L 75 135 M 82 122 L 82 135" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* 5. DNA Double Helix Molecular Strand — Center Margin Drift */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 md:right-12 w-28 h-72 sm:w-36 sm:h-84 med-float-2 hidden lg:block opacity-40 dark:opacity-25"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 100 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Strand 1 (Sine curve) */}
          <path
            d="M 25 10 C 75 35, 75 65, 25 90 C -25 115, -25 145, 25 170 C 75 195, 75 225, 25 240"
            stroke="#173B55"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Strand 2 (Phase shifted Sine curve) */}
          <path
            d="M 75 10 C 25 35, 25 65, 75 90 C 125 115, 125 145, 75 170 C 25 195, 25 225, 75 240"
            stroke="#34766F"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Base pairs (Rungs) */}
          <line x1="28" y1="20" x2="72" y2="20" stroke="#2A9D8F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="20" r="2.5" fill="#BE123C" />
          <line x1="42" y1="50" x2="58" y2="50" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="80" x2="72" y2="80" stroke="#2A9D8F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="80" r="2.5" fill="#0284C7" />
          <line x1="28" y1="100" x2="72" y2="100" stroke="#34766F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="130" x2="58" y2="130" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="160" x2="72" y2="160" stroke="#2A9D8F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="160" r="2.5" fill="#BE123C" />
          <line x1="28" y1="180" x2="72" y2="180" stroke="#173B55" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="210" x2="58" y2="210" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 6. Medical Microscope — Bottom Left Ambient Float */}
      <div
        className="absolute bottom-16 left-4 sm:left-12 md:left-20 w-32 h-36 sm:w-40 sm:h-48 med-float-1 hidden sm:block opacity-45 dark:opacity-30"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Base */}
          <rect x="25" y="142" width="70" height="12" rx="4" fill="#173B55" />
          {/* Arm curve */}
          <path
            d="M 70 142 C 95 135, 110 100, 95 65 C 85 45, 75 42, 60 42"
            stroke="#34766F"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Eyepiece / Ocular tube */}
          <path d="M 45 15 L 65 35" stroke="#173B55" strokeWidth="8" strokeLinecap="round" />
          <rect x="38" y="8" width="16" height="8" rx="2" transform="rotate(45, 38, 8)" fill="#2A9D8F" />
          {/* Revolving nosepiece & objective lenses */}
          <circle cx="70" cy="50" r="8" fill="#173B55" />
          <line x1="66" y1="56" x2="62" y2="72" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="72" y1="56" x2="75" y2="70" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          {/* Mechanical Stage & specimen slide */}
          <rect x="35" y="78" width="55" height="6" rx="2" fill="#173B55" />
          <line x1="48" y1="76" x2="68" y2="76" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          {/* Substage Condenser & Light source */}
          <circle cx="58" cy="98" r="6" fill="#FDE047" opacity="0.8" />
          <rect x="52" y="94" width="12" height="14" rx="2" fill="#64748B" opacity="0.6" />
        </svg>
      </div>

      {/* 7. Anatomical Bone (Femur) — Gentle Diagonally Floating Element */}
      <div
        className="absolute top-28 sm:top-36 left-1/2 -translate-x-1/2 w-24 h-48 sm:w-28 sm:h-56 med-float-3 hidden xl:block opacity-30 dark:opacity-20"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 80 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id="boneGrad" x1="10" y1="10" x2="70" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          {/* Femoral Head, Neck, and Greater Trochanter */}
          <path
            d="M 22 20 C 14 18, 12 30, 22 36 C 30 40, 36 40, 38 46 L 38 135 C 34 140, 22 145, 24 158 C 26 170, 42 170, 44 158 C 45 152, 43 148, 44 145 L 48 48 C 55 45, 66 38, 62 25 C 58 15, 45 22, 40 26 C 36 22, 30 18, 22 20 Z"
            fill="url(#boneGrad)"
            stroke="#475569"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Subtle cortical bone shading */}
          <path d="M 39 55 L 39 125" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>

      {/* 8. Microscopic Erythrocytes / Biconcave Cells — Ambient Subtle Drifts */}
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 med-float-1 hidden md:block" />
      <div className="absolute top-2/3 right-1/3 w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 med-float-4 hidden md:block" />
      <div className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-sky-500/15 border border-sky-500/30 med-float-2 hidden lg:block" />
    </div>
  );
};
