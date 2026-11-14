import React, { useEffect } from 'react';
import { X, ArrowRight, FileUp, Check } from 'lucide-react';
import { AnnouncementRecord } from '../types';

interface AnnouncementPopupProps {
  announcement: AnnouncementRecord;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
}

export const AnnouncementPopup: React.FC<AnnouncementPopupProps> = ({
  announcement,
  isOpen,
  onClose,
  onAction
}) => {
  // Body scroll lock & Escape key handler — strictly cleaned up on close/unmount
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bullets =
    announcement.bulletItems && announcement.bulletItems.length > 0
      ? announcement.bulletItems
      : ['PDF question papers', 'Images of question papers', 'Google Drive links'];

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAction();
  };

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-end sm:items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-[3px] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaign-popup-title"
      onClick={handleCloseClick}
    >
      <div
        className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-2xl animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Static Clinical Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0F2942] to-[#0D9488]" />

        {/* Clearly Visible Top-Right Close (×) Button — 44x44px touch target */}
        <button
          type="button"
          onClick={handleCloseClick}
          aria-label="Close announcement"
          title="Close"
          className="absolute top-3.5 right-3.5 z-30 w-11 h-11 rounded-full bg-[var(--bg-subtle)] hover:bg-slate-200 dark:hover:bg-slate-700 text-[var(--ink)] border border-[var(--line-strong)] flex items-center justify-center transition-colors shadow-xs"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Content Body */}
        <div className="p-5 pt-6 sm:p-7 space-y-4">
          {/* Eyebrow */}
          <div className="pr-12 text-xs font-extrabold tracking-wide text-[#0D9488] uppercase">
            {announcement.badgeText}
          </div>

          {/* Headline & Subheadline */}
          <div className="space-y-1.5 pr-4">
            <h2
              id="campaign-popup-title"
              className="text-lg sm:text-2xl font-extrabold tracking-tight text-[var(--ink)] leading-snug m-0 text-balance"
            >
              {announcement.title}
            </h2>
            {announcement.subtitle && (
              <p className="text-sm sm:text-base font-bold text-[#0F2942] dark:text-teal-300 m-0 leading-snug">
                {announcement.subtitle}
              </p>
            )}
          </div>

          {/* Body Paragraphs + Submission Methods List */}
          <div className="space-y-2.5 text-sm text-[var(--ink-secondary)] leading-relaxed">
            {announcement.bodyParagraphs.map((para, idx) => (
              <p key={idx} className="m-0">
                {para}
              </p>
            ))}

            {bullets.length > 0 && (
              <ul className="space-y-1.5 pl-0 list-none m-0 pt-0.5">
                {bullets.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm font-medium text-[var(--ink)]">
                    <span className="w-5 h-5 rounded-full bg-teal-500/15 text-[#0D9488] flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Highlight Callout */}
          {announcement.highlightText && (
            <div className="px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] text-xs sm:text-sm font-extrabold tracking-wide text-[var(--ink)] text-center">
              {announcement.highlightText}
            </div>
          )}

          {/* Action Buttons — Manual Dismissal Only */}
          <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleActionClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F2942] hover:bg-[#173B55] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors min-h-[46px]"
            >
              <FileUp size={16} className="shrink-0" />
              <span>{announcement.ctaText}</span>
              <ArrowRight size={15} className="shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleCloseClick}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg-subtle)] transition-colors min-h-[44px]"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
