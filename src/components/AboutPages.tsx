import React from 'react';
import {
  BookOpen,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  User,
  FileUp,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';

const TELEGRAM_URL = 'https://t.me/Sifat_Islam_7';

function TelegramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export const AboutPlatformPage: React.FC<{ onNavigate: (page: PageRoute) => void }> = ({
  onNavigate
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-[var(--line)] pb-5 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
          <BookOpen size={14} />
          <span>Academic Platform</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
          About CMC MedArchive
        </h1>
        <p className="text-sm text-[var(--mut)] m-0">
          Structured medical examination archive, online self-assessment, and collaborative academic library.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-[var(--ink)] m-0">Purpose &amp; Mission</h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed m-0">
          <b>CMC MedArchive</b> is a centralized, student-first academic platform initially serving{' '}
          <b>Chittagong Medical College (CMC)</b> while welcoming verified examination contributions from medical colleges across Bangladesh. Medical students routinely deal with scattered past papers, conflicting keys in commercial question banks, and unorganized study files. CMC MedArchive brings Card, Term, and Professional examination materials together into a calm, searchable, textbook-verified environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--ink)]">
              <Layers size={16} className="text-[#173B55] dark:text-sky-400" />
              <span>Structured Hierarchy</span>
            </div>
            <p className="text-xs text-[var(--mut)] leading-relaxed m-0">
              Organized systematically by Subject &rarr; Paper &rarr; Chapter &rarr; Year across Written (CQ), Single Best Answer (SBA), and True/False sections.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--ink)]">
              <CheckCircle2 size={16} className="text-[#0D9488]" />
              <span>Practice &amp; Exam Engine</span>
            </div>
            <p className="text-xs text-[var(--mut)] leading-relaxed m-0">
              Customizable timed examinations (Chapter-wise, Paper-wise, or Subject-wise) using strictly verified questions with post-exam chapter analytics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--card-subtle)] border border-[var(--line)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--ink)]">
              <FileUp size={16} className="text-emerald-600" />
              <span>Multi-College Submissions</span>
            </div>
            <p className="text-xs text-[var(--mut)] leading-relaxed m-0">
              Students can submit Card, Term, and MCQ papers via PDF, Images, or Google Drive links—moderated before publication to protect academic accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Standards */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
          <ShieldAlert size={18} className="text-amber-600" />
          <h2 className="text-lg font-bold text-[var(--ink)] m-0">
            Textbook Verification &amp; Academic Integrity
          </h2>
        </div>

        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed m-0">
          Commercial question banks frequently contain proofreading errors or outdated keys. Answers in CMC MedArchive are cross-checked against standard medical textbooks, and uncertain chapter tags or disputed keys are transparently flagged for administrative review:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--ink-secondary)] list-disc pl-5 m-0 pt-1">
          <li><b>Guyton &amp; Hall</b> Textbook of Medical Physiology (14th Ed.)</li>
          <li><b>Ganong&rsquo;s</b> Review of Medical Physiology (26th Ed.)</li>
          <li><b>Snell&rsquo;s</b> Clinical Anatomy by Regions (10th Ed.)</li>
          <li><b>BD Chaurasia&rsquo;s</b> Human Anatomy (8th Ed., Vols 1&ndash;4)</li>
          <li><b>Langman&rsquo;s</b> Medical Embryology (14th Ed.)</li>
          <li><b>Junqueira&rsquo;s</b> Basic Histology (16th Ed.)</li>
          <li><b>Harper&rsquo;s</b> Illustrated Biochemistry (32nd Ed.)</li>
          <li><b>Moore&rsquo;s</b> Clinically Oriented Anatomy (9th Ed.)</li>
        </ul>

        <div className="pt-3 flex flex-wrap gap-3">
          <button type="button" onClick={() => onNavigate('archive')} className="btn min-h-[44px]">
            Explore Question Archive &rarr;
          </button>
          <button type="button" onClick={() => onNavigate('developer')} className="btn alt min-h-[44px]">
            About the Developer
          </button>
        </div>
      </div>
    </div>
  );
};

export const AboutDeveloperPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-[var(--line)] pb-5 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
          <User size={14} />
          <span>Developer Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
          About the Developer
        </h1>
      </div>

      {/* Developer Bio */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--ink)] m-0">Sifat Islam</h2>
            <div className="text-sm font-semibold text-[var(--ink-secondary)] mt-1">
              Medical Student &bull; Chittagong Medical College (CMC-67)
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs font-bold text-[var(--ink)] self-start sm:self-center">
            <GraduationCap size={16} className="text-[#0D9488]" />
            <span>Chittagong Medical College</span>
          </div>
        </div>

        <blockquote className="editorial-quote text-sm sm:text-base m-0">
          &ldquo;I am Sifat Islam, a medical student at Chittagong Medical College. I built CMC MedArchive with a practical goal: to make past examination questions, practice tests, and study notes easier for medical students to organize and access in one clean place.&rdquo;
        </blockquote>

        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed m-0">
          Preparing for Card, Term, and Professional examinations often means hunting through scattered PDFs, unverified answer keys, and cluttered chat threads. CMC MedArchive is developed and maintained to solve that everyday workflow problem with clarity, structure, and academic reliability.
        </p>
      </div>

      {/* Vision Ahead */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
          <Sparkles size={18} className="text-[#0D9488]" />
          <h3 className="text-lg font-bold text-[var(--ink)] m-0">Development Focus</h3>
        </div>
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed m-0">
          CMC MedArchive continues to evolve based on student feedback, incorporating multi-college question paper contributions, chapter-level organization, and distraction-free self-assessment tools. The platform is meant to support—never replace—standard medical textbooks, clinical teaching, and personal study.
        </p>
      </div>

      {/* Community Contact */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-[var(--ink)]">Academic Feedback &amp; Community</div>
          <div className="text-xs text-[var(--mut)] mt-0.5">
            Connect directly on Telegram for suggestions, corrections, or collaboration
          </div>
        </div>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="telegram-icon-btn dark shrink-0 !w-10 !h-10"
          title="Connect on Telegram"
          aria-label="Connect on Telegram"
        >
          <TelegramIcon className="w-5 h-5 text-[#229ED9]" />
        </a>
      </div>
    </div>
  );
};
