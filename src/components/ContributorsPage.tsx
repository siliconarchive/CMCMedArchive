import React from 'react';
import { Award, GraduationCap, FileUp, CheckCircle2, Users } from 'lucide-react';
import { ContributorRecord, PageRoute } from '../types';

interface ContributorsPageProps {
  contributors: ContributorRecord[];
  onNavigate: (page: PageRoute) => void;
}

export const ContributorsPage: React.FC<ContributorsPageProps> = ({ contributors, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <Users size={14} />
            <span>Academic Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Contributors
          </h1>
          <p className="text-sm text-[var(--mut)] max-w-2xl m-0">
            Students and academic collaborators who contributed past examination question papers, Card/Term records, and verified materials to build CMC MedArchive.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('submit')}
          className="btn shrink-0 min-h-[44px]"
        >
          <FileUp size={16} />
          <span>Contribute Question Papers</span>
        </button>
      </div>

      {/* Clean List-Based Contributor Directory */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)] overflow-hidden">
        {contributors.map((c, index) => (
          <div
            key={c.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--card-subtle)] transition-colors"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#0F2942]/10 dark:bg-sky-500/15 text-[#0F2942] dark:text-sky-300 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-[var(--ink)] m-0 break-words">{c.name}</h3>
                  {c.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={12} />
                      <span>Verified Contributor</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--ink-secondary)]">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Award size={13} className="text-[#0D9488] shrink-0" />
                    Batch: {c.batch}
                  </span>
                  <span className="text-[var(--line-strong)]">&middot;</span>
                  <span className="inline-flex items-center gap-1 text-[var(--mut)]">
                    <GraduationCap size={13} className="shrink-0" />
                    <span>{c.college}</span>
                  </span>
                </div>
                {c.contribution && (
                  <p className="text-xs text-[var(--mut)] m-0 pt-0.5 break-words">{c.contribution}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Banner */}
      <div className="p-5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[var(--ink)] m-0">
            Have Card, Term, or MCQ Papers from Your Medical College?
          </h3>
          <p className="text-xs text-[var(--mut)] m-0">
            Share PDFs, clear photographs, or Google Drive links. Approved contributors are listed here once verified.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('submit')}
          className="btn alt shrink-0 min-h-[44px]"
        >
          Submit Question Papers &rarr;
        </button>
      </div>
    </div>
  );
};
