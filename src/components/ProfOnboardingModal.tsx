import React, { useEffect, useState } from 'react';
import { Check, GraduationCap, ArrowRight } from 'lucide-react';
import { CustomTaxonomy, ProfExamConfig, ProfessionalExamId } from '../types';
import { getMergedProfConfigs } from '../data/curriculumConfig';
import { CmcLogo } from './CmcLogo';

interface ProfOnboardingModalProps {
  isOpen: boolean;
  currentProf: ProfessionalExamId;
  hasSavedProf: boolean;
  customTaxonomy?: CustomTaxonomy;
  onConfirm: (prof: ProfessionalExamId) => void;
}

export const ProfOnboardingModal: React.FC<ProfOnboardingModalProps> = ({
  isOpen,
  currentProf,
  hasSavedProf,
  customTaxonomy,
  onConfirm
}) => {
  const configs: ProfExamConfig[] = getMergedProfConfigs(customTaxonomy);
  const [picked, setPicked] = useState<ProfessionalExamId | null>(hasSavedProf ? currentProf : null);

  useEffect(() => {
    if (isOpen) {
      setPicked(hasSavedProf ? currentProf : null);
    }
  }, [isOpen, currentProf, hasSavedProf]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!picked) return;
    onConfirm(picked);
  };

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-end sm:items-center justify-center p-3 sm:p-5 bg-slate-950/65 backdrop-blur-[3px] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prof-onboarding-title"
    >
      <div
        className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-2xl animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0F2942] to-[#0D9488]" />

        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <CmcLogo variant="icon" size="sm" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0D9488]">
                MBBS Academic Personalization
              </span>
            </div>

            <h2
              id="prof-onboarding-title"
              className="text-lg sm:text-2xl font-extrabold tracking-tight text-[var(--ink)] leading-snug m-0 text-balance"
            >
              Which Professional Examination are you currently studying for?
            </h2>

            <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
              CMC MedArchive organizes Written questions, MCQs, Question Papers, Viva, and Notes for your MBBS stage. You can update this anytime in Profile &rarr; Settings &rarr; Academic Preference.
            </p>
          </div>

          <div className="space-y-2.5" role="radiogroup" aria-label="MBBS Professional Examination">
            {configs.map(cfg => {
              const selected = picked === cfg.id;
              return (
                <button
                  key={cfg.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPicked(cfg.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 min-h-[64px] ${
                    selected
                      ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/35 ring-1 ring-[#0D9488]'
                      : 'border-[var(--line)] bg-[var(--card-subtle)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        size={16}
                        className={selected ? 'text-[#0D9488] shrink-0' : 'text-[var(--mut)] shrink-0'}
                      />
                      <span className="text-sm sm:text-base font-extrabold text-[var(--ink)]">
                        {cfg.shortLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--mut)] m-0 pl-6">{cfg.subtitle}</p>
                  </div>

                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      selected
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'border-[var(--line-strong)] bg-[var(--card)]'
                    }`}
                  >
                    {selected && <Check size={12} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={!picked}
            className="btn w-full min-h-[48px] !px-6 disabled:opacity-45"
          >
            <span>Continue to CMC MedArchive</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
