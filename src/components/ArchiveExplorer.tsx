import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  X,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Layers,
  ListChecks,
  HelpCircle,
  Eye,
  EyeOff,
  FileUp,
  Sparkles,
  Bookmark
} from 'lucide-react';
import {
  BookmarkRecord,
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  PublishedMcqQuestion,
  QuestionOverride,
  RecentlyViewedRecord,
  StudyState
} from '../types';
import {
  buildUnifiedCqQuestions,
  buildUnifiedMcqQuestions,
  getCanonicalChaptersFor,
  PENDING_CHAPTER_LABEL,
  UnifiedCqQuestion,
  UnifiedMcqQuestion
} from '../data/archiveHelpers';
import {
  getAlliedDisciplinesForSubject,
  getPapersForSubjectInProf,
  getProfConfig,
  getSubjectsForProf,
  subjectMatchesCanonical
} from '../data/curriculumConfig';
import { PDF_CATALOG } from '../data/pdfCatalog';

interface ArchiveExplorerProps {
  selectedProf: ProfessionalExamId;
  initialTab?: 'cq' | 'mcq';
  initialSearch?: string;
  initialSubject?: string;
  publishedQuestions: PublishedMcqQuestion[];
  questionOverrides: Record<string, QuestionOverride>;
  customTaxonomy: CustomTaxonomy;
  studyState?: StudyState;
  onToggleBookmark?: (item: Omit<BookmarkRecord, 'savedAt'>) => void;
  onRecordRecentView?: (item: Omit<RecentlyViewedRecord, 'viewedAt'>) => void;
  onPracticeOutcome?: (payload: {
    id: string;
    professionalExam: ProfessionalExamId;
    subject: string;
    paper: string;
    chapter: string;
    type: 'SBA' | 'TF';
    stem: string;
    explanation?: string;
    isCorrect: boolean;
  }) => void;
  onNavigate: (page: PageRoute) => void;
  onStartQuickExam?: (preset: { subject?: string; paper?: string; chapter?: string }) => void;
}

const PAGE_SIZE = 20;

export const ArchiveExplorer: React.FC<ArchiveExplorerProps> = ({
  selectedProf,
  initialTab = 'cq',
  initialSearch = '',
  initialSubject = 'all',
  publishedQuestions,
  questionOverrides,
  customTaxonomy,
  studyState,
  onToggleBookmark,
  onRecordRecentView,
  onPracticeOutcome,
  onNavigate,
  onStartQuickExam
}) => {
  const [activeTab, setActiveTab] = useState<'cq' | 'mcq'>(initialTab);
  const [mcqSubSection, setMcqSubSection] = useState<'all' | 'SBA' | 'TF'>('all');
  const [search, setSearch] = useState(initialSearch);
  const [subject, setSubject] = useState(initialSubject);
  const [paper, setPaper] = useState('all');
  const [chapter, setChapter] = useState('all');
  const [year, setYear] = useState('all');
  const [college, setCollege] = useState('all');
  const [pageIdx, setPageIdx] = useState(1);

  const prevProfRef = useRef<ProfessionalExamId>(selectedProf);
  useEffect(() => {
    setActiveTab(initialTab);
    setPageIdx(1);
  }, [initialTab]);

  useEffect(() => {
    setSearch(initialSearch);
    setPageIdx(1);
  }, [initialSearch]);

  useEffect(() => {
    setSubject(initialSubject);
    setPaper('all');
    setChapter('all');
    setPageIdx(1);
  }, [initialSubject]);

  useEffect(() => {
    if (prevProfRef.current !== selectedProf) {
      prevProfRef.current = selectedProf;
      setSubject('all');
      setPaper('all');
      setChapter('all');
      setYear('all');
      setCollege('all');
      setPageIdx(1);
    }
  }, [selectedProf]);

  // Interactive CQ & MCQ states
  const [revealedCqAnswers, setRevealedCqAnswers] = useState<Record<string, boolean>>({});
  const [selectedCq, setSelectedCq] = useState<UnifiedCqQuestion | null>(null);
  const [sbaResponses, setSbaResponses] = useState<Record<string, number>>({});
  const [tfResponses, setTfResponses] = useState<Record<string, Record<string, boolean>>>({});
  const [revealedMcqExplanations, setRevealedMcqExplanations] = useState<Record<string, boolean>>({});

  const profConfig = getProfConfig(selectedProf, customTaxonomy);

  // Scoped strictly to selectedProf + Main Professional Examination Subjects by default
  const allCqs = useMemo(
    () =>
      buildUnifiedCqQuestions(questionOverrides).filter(
        q =>
          q.professionalExam === selectedProf &&
          q.classificationRole !== 'Phase Teaching / Formative Subject'
      ),
    [questionOverrides, selectedProf]
  );

  const allMcqs = useMemo(
    () =>
      buildUnifiedMcqQuestions(publishedQuestions, questionOverrides).filter(
        q =>
          q.professionalExam === selectedProf &&
          q.classificationRole !== 'Phase Teaching / Formative Subject'
      ),
    [publishedQuestions, questionOverrides, selectedProf]
  );

  const bookmarkedKeys = useMemo(() => {
    const set = new Set<string>();
    (studyState?.bookmarks || []).forEach(b => set.add(`${b.itemType}_${b.id}`));
    return set;
  }, [studyState?.bookmarks]);

  // Dynamic taxonomy lists strictly derived from centralized Prof subjects
  const availableSubjects = useMemo(() => {
    const set = new Set<string>(getSubjectsForProf(selectedProf, customTaxonomy));
    const source = activeTab === 'cq' ? allCqs : allMcqs;
    source.forEach(q => {
      if (q.subject) set.add(q.subject);
    });
    return Array.from(set).sort();
  }, [activeTab, allCqs, allMcqs, selectedProf, customTaxonomy]);

  const availablePapers = useMemo(() => {
    const set = new Set<string>();
    if (subject !== 'all') {
      getPapersForSubjectInProf(selectedProf, subject, customTaxonomy).forEach(p => set.add(p));
    }
    const source = activeTab === 'cq' ? allCqs : allMcqs;
    source.forEach(item => {
      if (subjectMatchesCanonical(item.subject, subject) && item.paper) {
        set.add(item.paper);
      }
    });
    return Array.from(set).sort();
  }, [activeTab, allCqs, allMcqs, subject, selectedProf, customTaxonomy]);

  const availableChapters = useMemo(() => {
    const source = activeTab === 'cq' ? allCqs : allMcqs;
    const filteredSource =
      subject === 'all'
        ? source
        : source.filter(q => subjectMatchesCanonical(q.subject, subject));
    return getCanonicalChaptersFor('all', paper, filteredSource as any[], customTaxonomy);
  }, [activeTab, allCqs, allMcqs, subject, paper, customTaxonomy]);

  const availableYears = useMemo(() => {
    const set = new Set<number>(customTaxonomy.years || []);
    const source = activeTab === 'cq' ? allCqs : allMcqs;
    source.forEach(item => {
      if (item.year && Number.isFinite(Number(item.year))) {
        set.add(Number(item.year));
      }
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [activeTab, allCqs, allMcqs, customTaxonomy]);

  const availableColleges = useMemo(() => {
    const set = new Set<string>(['Chittagong Medical College (CMC)']);
    const source = activeTab === 'cq' ? allCqs : allMcqs;
    source.forEach(m => {
      if (m.collegeName) set.add(m.collegeName);
    });
    return Array.from(set).sort();
  }, [activeTab, allCqs, allMcqs]);

  const alliedDisciplines = useMemo(() => {
    if (subject === 'all') return [];
    return getAlliedDisciplinesForSubject(selectedProf, subject, customTaxonomy);
  }, [selectedProf, subject, customTaxonomy]);

  const filteredCqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allCqs.filter(item => {
      if (!subjectMatchesCanonical(item.subject, subject)) return false;
      if (paper !== 'all' && item.paper !== paper) return false;
      if (chapter !== 'all' && item.chapter !== chapter) return false;
      if (year !== 'all' && String(item.year || '') !== year) return false;
      if (college !== 'all' && item.collegeName !== college) return false;
      if (q) {
        const hay = `${item.text} ${item.topic} ${item.section || ''} ${item.chapter} ${item.answer || ''} ${item.exam || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allCqs, subject, paper, chapter, year, college, search]);

  const filteredMcqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allMcqs.filter(item => {
      if (mcqSubSection !== 'all' && item.type !== mcqSubSection) return false;
      if (!subjectMatchesCanonical(item.subject, subject)) return false;
      if (paper !== 'all' && item.paper !== paper) return false;
      if (chapter !== 'all' && item.chapter !== chapter) return false;
      if (year !== 'all' && String(item.year) !== year) return false;
      if (college !== 'all' && item.collegeName !== college) return false;
      if (q) {
        const optText = (item.opts || []).join(' ');
        const subText = (item.items || []).map(i => i.text).join(' ');
        const hay = `${item.stem} ${optText} ${subText} ${item.chapter} ${item.explanation || ''} ${item.session}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allMcqs, mcqSubSection, subject, paper, chapter, year, college, search]);

  const activeList = activeTab === 'cq' ? filteredCqs : filteredMcqs;
  const totalPages = Math.max(1, Math.ceil(activeList.length / PAGE_SIZE));
  const safePage = Math.min(pageIdx, totalPages);
  const pagedItems = activeList.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetFilters = () => {
    setSearch('');
    setSubject('all');
    setPaper('all');
    setChapter('all');
    setYear('all');
    setCollege('all');
    setMcqSubSection('all');
    setPageIdx(1);
  };

  const sbaCountInFilter = useMemo(
    () =>
      allMcqs.filter(
        m =>
          m.type === 'SBA' &&
          subjectMatchesCanonical(m.subject, subject) &&
          (paper === 'all' || m.paper === paper) &&
          (chapter === 'all' || m.chapter === chapter) &&
          (year === 'all' || String(m.year) === year)
      ).length,
    [allMcqs, subject, paper, chapter, year]
  );

  const tfCountInFilter = useMemo(
    () =>
      allMcqs.filter(
        m =>
          m.type === 'TF' &&
          subjectMatchesCanonical(m.subject, subject) &&
          (paper === 'all' || m.paper === paper) &&
          (chapter === 'all' || m.chapter === chapter) &&
          (year === 'all' || String(m.year) === year)
      ).length,
    [allMcqs, subject, paper, chapter, year]
  );

  const openCqDetail = (q: UnifiedCqQuestion) => {
    setSelectedCq(q);
    onRecordRecentView?.({
      id: q.id,
      itemType: 'cq',
      professionalExam: q.professionalExam,
      subject: q.subject,
      title: q.text.slice(0, 120),
      subtitle: `${q.paper} · ${q.chapter}${q.year ? ` · ${q.year}` : ''}`
    });
  };

  const renderMcqCard = (q: UnifiedMcqQuestion, idx: number) => {
    const sbaChoice = sbaResponses[q.id];
    const tfChoice = tfResponses[q.id] || {};
    const showExp = Boolean(revealedMcqExplanations[q.id]);
    const isBookmarked = bookmarkedKeys.has(`mcq_${q.id}`);

    return (
      <div
        key={q.id}
        className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-3"
      >
        {/* Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0">
            <span
              className={`font-extrabold uppercase tracking-wide text-[11px] ${
                q.type === 'SBA' ? 'text-sky-700 dark:text-sky-300' : 'text-[#0D9488]'
              }`}
            >
              {q.type === 'SBA' ? 'SBA' : 'True / False'}
            </span>
            <span className="text-[var(--mut)]">&middot;</span>
            <span className="font-bold text-[var(--ink)]">{q.subject}</span>
            <span className="text-[var(--mut)]">&middot;</span>
            <span className="text-[var(--ink-secondary)]">{q.paper}</span>
            <span className="text-[var(--mut)]">&middot;</span>
            <span
              className={
                q.chapterNeedsReview
                  ? 'px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold text-[11px]'
                  : 'text-[var(--ink-secondary)] font-medium'
              }
            >
              {q.chapter}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-[var(--mut)] font-mono tabular-nums">
              {q.session}
              {q.isCommunityPublished ? ` · ${q.collegeName}` : ''}
            </span>
            {onToggleBookmark && (
              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: q.id,
                    itemType: 'mcq',
                    professionalExam: q.professionalExam,
                    subject: q.subject,
                    paper: q.paper,
                    chapter: q.chapter,
                    title: q.stem,
                    subtitle: `${q.type} · ${q.session}`
                  })
                }
                className={`p-1.5 rounded-lg border min-h-[32px] min-w-[32px] flex items-center justify-center transition-colors ${
                  isBookmarked
                    ? 'border-[#0D9488] bg-teal-500/10 text-[#0D9488]'
                    : 'border-[var(--line)] text-[var(--mut)] hover:text-[#0D9488]'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark MCQ'}
                title={isBookmarked ? 'Saved in Bookmarks' : 'Save to Bookmarks'}
              >
                <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
        </div>

        {/* Stem */}
        <div className="text-sm sm:text-base font-bold text-[var(--ink)] leading-snug break-words">
          <span className="text-[#0D9488] mr-2 font-mono">Q{(safePage - 1) * PAGE_SIZE + idx + 1}.</span>
          {q.stem}
        </div>

        {/* SBA Options */}
        {q.type === 'SBA' && q.opts && (
          <div className="space-y-2 pt-1">
            {q.opts.map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isSelected = sbaChoice === optIdx;
              const isAnswered = sbaChoice !== undefined;
              const isCorrect = q.correctIndex === optIdx;

              let btnClass =
                'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)] hover:border-[#0D9488]';
              if (isAnswered) {
                if (isCorrect) {
                  btnClass =
                    'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold';
                } else if (isSelected) {
                  btnClass = 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => {
                    setSbaResponses(prev => ({ ...prev, [q.id]: optIdx }));
                    setRevealedMcqExplanations(prev => ({ ...prev, [q.id]: true }));
                    onRecordRecentView?.({
                      id: q.id,
                      itemType: 'mcq',
                      professionalExam: q.professionalExam,
                      subject: q.subject,
                      title: q.stem.slice(0, 120),
                      subtitle: `SBA · ${q.paper} · ${q.chapter}`
                    });
                    if (typeof q.correctIndex === 'number') {
                      onPracticeOutcome?.({
                        id: q.id,
                        professionalExam: q.professionalExam,
                        subject: q.subject,
                        paper: q.paper,
                        chapter: q.chapter,
                        type: 'SBA',
                        stem: q.stem,
                        explanation: q.explanation,
                        isCorrect: optIdx === q.correctIndex
                      });
                    }
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-colors min-h-[44px] ${btnClass}`}
                >
                  <span className="font-bold shrink-0">{letter}.</span>
                  <span className="flex-1">{opt}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* TF Items */}
        {q.type === 'TF' && q.items && (
          <div className="divide-y divide-[var(--line-light)] border-t border-[var(--line-light)] pt-1">
            {q.items.map(item => {
              const chosen = tfChoice[item.label];
              const isAnswered = chosen !== undefined;
              const isCorrect = chosen === item.ans;

              return (
                <div
                  key={item.label}
                  className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="text-xs sm:text-sm text-[var(--ink)] flex items-start gap-2">
                    <span className="font-bold text-[var(--mut)] shrink-0">{item.label})</span>
                    <span>{item.text}</span>
                  </div>
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    {[true, false].map(val => {
                      const active = chosen === val;
                      let cls =
                        'border-[var(--line)] bg-[var(--card)] text-[var(--ink-secondary)] hover:border-[#0D9488]';
                      if (isAnswered) {
                        if (val === item.ans) {
                          cls =
                            'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold';
                        } else if (active && !isCorrect) {
                          cls =
                            'border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200 font-bold';
                        }
                      }
                      return (
                        <button
                          key={String(val)}
                          type="button"
                          onClick={() => {
                            const nextMap = { ...(tfResponses[q.id] || {}), [item.label]: val };
                            setTfResponses(prev => ({ ...prev, [q.id]: nextMap }));
                            onRecordRecentView?.({
                              id: q.id,
                              itemType: 'mcq',
                              professionalExam: q.professionalExam,
                              subject: q.subject,
                              title: q.stem.slice(0, 120),
                              subtitle: `TF · ${q.paper} · ${q.chapter}`
                            });
                            if (q.items && q.items.every(it => nextMap[it.label] !== undefined)) {
                              const allCorrect = q.items.every(it => nextMap[it.label] === it.ans);
                              onPracticeOutcome?.({
                                id: q.id,
                                professionalExam: q.professionalExam,
                                subject: q.subject,
                                paper: q.paper,
                                chapter: q.chapter,
                                type: 'TF',
                                stem: q.stem,
                                explanation: q.explanation,
                                isCorrect: allCorrect
                              });
                            }
                          }}
                          className={`px-3.5 py-2 rounded-lg border text-xs font-bold min-h-[42px] min-w-[50px] transition-colors ${cls}`}
                        >
                          {val ? 'T' : 'F'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Discrepancy Note */}
        {q.officialOrbitDiscrepancy && (
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <span>
              <b>Key Discrepancy Note:</b> {q.officialOrbitDiscrepancy}
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line-light)] text-xs">
          <button
            type="button"
            onClick={() =>
              setRevealedMcqExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))
            }
            className="inline-flex items-center gap-1.5 font-bold text-[#0D9488] hover:underline bg-transparent border-0 p-1"
          >
            {showExp ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showExp ? 'Hide Explanation' : 'Show Answer & Explanation'}</span>
          </button>

          <span className="text-[11px] text-[var(--mut)]">
            {q.verificationStatus} {q.sourceReference ? `· ${q.sourceReference}` : ''}
          </span>
        </div>

        {showExp && (
          <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs text-[var(--ink-secondary)] space-y-1">
            {q.type === 'SBA' && q.opts && typeof q.correctIndex === 'number' && (
              <div className="font-bold text-emerald-700 dark:text-emerald-300">
                Correct Answer: {String.fromCharCode(65 + q.correctIndex)}. {q.opts[q.correctIndex]}
              </div>
            )}
            {q.type === 'TF' && q.items && (
              <div className="font-bold text-emerald-700 dark:text-emerald-300">
                Answer Key:{' '}
                {q.items.map(i => `${i.label.toUpperCase()}:${i.ans ? 'T' : 'F'}`).join(' | ')}
              </div>
            )}
            {q.explanation && <p className="m-0 leading-relaxed">{q.explanation}</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            {activeTab === 'cq' ? <BookOpen size={14} /> : <ListChecks size={14} />}
            <span>
              {profConfig.shortLabel} &middot;{' '}
              {activeTab === 'cq' ? 'Study · Written Questions' : 'Practice · MCQ Practice'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            {activeTab === 'cq' ? 'Written Questions Archive' : 'MCQ Practice Bank'}
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            {activeTab === 'cq' ? (
              <>
                MBBS Written (CQ) archive for <strong className="text-[var(--ink)]">{profConfig.shortLabel}</strong> ({profConfig.subtitle}).
              </>
            ) : (
              <>
                Separated SBA &amp; True/False practice bank for <strong className="text-[var(--ink)]">{profConfig.shortLabel}</strong> ({profConfig.subtitle}).
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeTab === 'mcq' && onStartQuickExam && (
            <button
              type="button"
              onClick={() =>
                onStartQuickExam({
                  subject: subject !== 'all' ? subject : undefined,
                  paper: paper !== 'all' ? paper : undefined,
                  chapter: chapter !== 'all' && chapter !== PENDING_CHAPTER_LABEL ? chapter : undefined
                })
              }
              className="btn min-h-[44px]"
            >
              <Sparkles size={15} />
              <span>Run Timed Exam</span>
            </button>
          )}
          <button type="button" onClick={() => onNavigate('submit')} className="btn alt min-h-[44px]">
            <FileUp size={15} />
            <span>Question Papers</span>
          </button>
        </div>
      </div>

      {/* Hierarchy Filter Panel */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPageIdx(1);
            }}
            placeholder={`Search ${profConfig.shortLabel} questions, chapters, or exam sessions...`}
            className="!pl-10 !pr-10 text-sm min-h-[44px]"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setPageIdx(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mut)] hover:text-[var(--ink)]"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Hierarchical Dropdowns: Subject -> Paper -> Chapter -> Year -> College */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              1. Subject
            </label>
            <select
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
                setPaper('all');
                setChapter('all');
                setPageIdx(1);
              }}
              className="text-sm min-h-[44px]"
            >
              <option value="all">All Subjects ({availableSubjects.length})</option>
              {availableSubjects.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              2. Paper
            </label>
            <select
              value={paper}
              onChange={e => {
                setPaper(e.target.value);
                setChapter('all');
                setPageIdx(1);
              }}
              className="text-sm min-h-[44px]"
            >
              <option value="all">All Papers</option>
              {availablePapers.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              3. Chapter
            </label>
            <select
              value={chapter}
              onChange={e => {
                setChapter(e.target.value);
                setPageIdx(1);
              }}
              className="text-sm min-h-[44px]"
            >
              <option value="all">All Chapters</option>
              {availableChapters.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              4. Year
            </label>
            <select
              value={year}
              onChange={e => {
                setYear(e.target.value);
                setPageIdx(1);
              }}
              className="text-sm min-h-[44px]"
            >
              <option value="all">All Years</option>
              {availableYears.map(y => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              5. Medical College
            </label>
            <select
              value={college}
              onChange={e => {
                setCollege(e.target.value);
                setPageIdx(1);
              }}
              className="text-sm min-h-[44px]"
            >
              <option value="all">All Colleges</option>
              {availableColleges.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fourth Prof Allied Disciplines Callout */}
        {alliedDisciplines.length > 0 && (
          <div className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs text-[var(--ink-secondary)]">
            <strong className="text-[var(--ink)]">{subject} Allied Disciplines:</strong>{' '}
            {alliedDisciplines.join(' · ')}
          </div>
        )}

        {/* Sub-filters per tab */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--line-light)]">
          {activeTab === 'mcq' ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[var(--mut)]">Format:</span>
              <button
                type="button"
                onClick={() => {
                  setMcqSubSection('all');
                  setPageIdx(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold min-h-[36px] ${
                  mcqSubSection === 'all'
                    ? 'bg-[#0D9488] text-white'
                    : 'bg-[var(--bg-subtle)] text-[var(--ink-secondary)]'
                }`}
              >
                All ({sbaCountInFilter + tfCountInFilter})
              </button>
              <button
                type="button"
                onClick={() => {
                  setMcqSubSection('SBA');
                  setPageIdx(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold min-h-[36px] ${
                  mcqSubSection === 'SBA'
                    ? 'bg-sky-600 text-white'
                    : 'bg-[var(--bg-subtle)] text-[var(--ink-secondary)]'
                }`}
              >
                SBA ({sbaCountInFilter})
              </button>
              <button
                type="button"
                onClick={() => {
                  setMcqSubSection('TF');
                  setPageIdx(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold min-h-[36px] ${
                  mcqSubSection === 'TF'
                    ? 'bg-teal-700 text-white'
                    : 'bg-[var(--bg-subtle)] text-[var(--ink-secondary)]'
                }`}
              >
                True/False ({tfCountInFilter})
              </button>
            </div>
          ) : (
            <div className="text-xs font-semibold text-[var(--mut)] flex items-center gap-1.5">
              <Layers size={13} className="text-[#0D9488]" />
              <span>
                {profConfig.shortLabel} Written Archive ({allCqs.length} questions)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto text-xs text-[var(--mut)] tabular-nums">
            <span>
              Showing <b>{pagedItems.length}</b> of <b>{activeList.length}</b>
            </span>
            <button type="button" onClick={resetFilters} className="btn sm alt">
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Area */}
      {activeList.length === 0 ? (
        <div className="empty space-y-2.5">
          <HelpCircle size={36} className="mx-auto mb-1 opacity-50" />
          <div className="font-bold text-[var(--ink)]">
            {activeTab === 'cq' && allCqs.length === 0
              ? `No verified Written (CQ) questions cataloged yet for ${profConfig.title}`
              : activeTab === 'mcq' && allMcqs.length === 0
              ? `No verified MCQ questions cataloged yet for ${profConfig.title}`
              : 'No matching questions found'}
          </div>
          <p className="text-xs text-[var(--mut)] mt-1 max-w-md mx-auto">
            {(activeTab === 'cq' ? allCqs.length === 0 : allMcqs.length === 0)
              ? `Questions are never fabricated. Submit ${profConfig.shortLabel} papers in Question Papers or review your Academic Preference in Profile → Settings.`
              : 'Try clearing one of your hierarchy filters or changing your search query.'}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <button type="button" onClick={() => onNavigate('submit')} className="btn sm">
              Open Question Papers &rarr;
            </button>
            <button type="button" onClick={() => onNavigate('settings')} className="btn sm alt">
              Profile &rarr; Settings
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* CQ List */}
          {activeTab === 'cq' && (
            <div className="space-y-3">
              {(pagedItems as UnifiedCqQuestion[]).map(q => {
                const isOpen = Boolean(revealedCqAnswers[q.id]);
                const pdfInfo = q.pdfId ? PDF_CATALOG.find(p => p.id === q.pdfId) : undefined;
                const isBookmarked = bookmarkedKeys.has(`cq_${q.id}`);
                return (
                  <div
                    key={q.id}
                    className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-3 hover:border-[var(--line-strong)] transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs min-w-0">
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0">
                        <span className="font-bold text-[#0F2942] dark:text-sky-400">{q.subject}</span>
                        <span className="text-[var(--mut)]">&middot;</span>
                        <span className="font-semibold text-[var(--ink-secondary)]">{q.paper}</span>
                        <span className="text-[var(--mut)]">&middot;</span>
                        <span
                          className={
                            q.chapterNeedsReview
                              ? 'px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold text-[11px]'
                              : 'text-[var(--ink-secondary)] font-medium'
                          }
                        >
                          {q.chapter}
                        </span>
                        {q.topic && (
                          <>
                            <span className="text-[var(--mut)]">&middot;</span>
                            <span className="text-[var(--mut)]">{q.topic}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-[var(--mut)] font-mono tabular-nums">
                          {q.year ? `${q.year} · ` : ''}
                          {q.type}
                        </span>
                        {onToggleBookmark && (
                          <button
                            type="button"
                            onClick={() =>
                              onToggleBookmark({
                                id: q.id,
                                itemType: 'cq',
                                professionalExam: q.professionalExam,
                                subject: q.subject,
                                paper: q.paper,
                                chapter: q.chapter,
                                title: q.text.slice(0, 120),
                                subtitle: `${q.paper} · ${q.chapter}${q.year ? ` · ${q.year}` : ''}`
                              })
                            }
                            className={`p-1.5 rounded-lg border min-h-[32px] min-w-[32px] flex items-center justify-center transition-colors ${
                              isBookmarked
                                ? 'border-[#0D9488] bg-teal-500/10 text-[#0D9488]'
                                : 'border-[var(--line)] text-[var(--mut)] hover:text-[#0D9488]'
                            }`}
                            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                          >
                            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div
                      onClick={() => openCqDetail(q)}
                      className="text-sm sm:text-base font-semibold text-[var(--ink)] leading-relaxed cursor-pointer hover:text-[#0D9488] transition-colors"
                    >
                      {q.text}
                    </div>

                    {q.exam && (
                      <div className="text-xs text-[var(--mut)]">
                        <b>Exam Appearances:</b> {q.exam}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line-light)] text-xs">
                      <div className="flex flex-wrap items-center gap-3">
                        {q.answer && (
                          <button
                            type="button"
                            onClick={() => {
                              const nextVal = !isOpen;
                              setRevealedCqAnswers(prev => ({ ...prev, [q.id]: nextVal }));
                              if (nextVal) {
                                onRecordRecentView?.({
                                  id: q.id,
                                  itemType: 'cq',
                                  professionalExam: q.professionalExam,
                                  subject: q.subject,
                                  title: q.text.slice(0, 120),
                                  subtitle: `${q.paper} · ${q.chapter}`
                                });
                              }
                            }}
                            className="inline-flex items-center gap-1 font-bold text-[#0D9488] bg-transparent border-0 p-1"
                          >
                            {isOpen ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span>{isOpen ? 'Hide Key Points' : 'View Key Points'}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => openCqDetail(q)}
                          className="font-semibold text-[var(--ink-secondary)] hover:underline bg-transparent border-0 p-1"
                        >
                          Full Detail &rarr;
                        </button>
                      </div>

                      {pdfInfo && (
                        <span className="text-[11px] text-[var(--mut)]">
                          Source: {pdfInfo.title} {q.pdfPage ? `(p.${q.pdfPage})` : ''}
                        </span>
                      )}
                    </div>

                    {isOpen && q.answer && (
                      <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                        <b className="text-[var(--ink)]">Key Points:</b> {q.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* MCQ List — Separated SBA & TF headers when showing All */}
          {activeTab === 'mcq' && (
            <div className="space-y-4">
              {mcqSubSection === 'all' ? (
                <>
                  {(pagedItems as UnifiedMcqQuestion[]).some(q => q.type === 'SBA') && (
                    <div className="space-y-3">
                      <div className="pb-1.5 border-b border-[var(--line)]">
                        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300 m-0">
                          Single Best Answer (SBA) Section
                        </h3>
                      </div>
                      {(pagedItems as UnifiedMcqQuestion[])
                        .filter(q => q.type === 'SBA')
                        .map((q, i) => renderMcqCard(q, i))}
                    </div>
                  )}

                  {(pagedItems as UnifiedMcqQuestion[]).some(q => q.type === 'TF') && (
                    <div className="space-y-3 pt-2">
                      <div className="pb-1.5 border-b border-[var(--line)]">
                        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0D9488] m-0">
                          True / False (Multiple TF) Section
                        </h3>
                      </div>
                      {(pagedItems as UnifiedMcqQuestion[])
                        .filter(q => q.type === 'TF')
                        .map((q, i) => renderMcqCard(q, i))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  {(pagedItems as UnifiedMcqQuestion[]).map((q, i) => renderMcqCard(q, i))}
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 pt-4">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => {
                  setPageIdx(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn alt min-h-[44px] disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-xs sm:text-sm font-bold text-[var(--ink-secondary)]">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => {
                  setPageIdx(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn alt min-h-[44px] disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* CQ Detail Modal */}
      {selectedCq && (
        <div className="modal-overlay" onClick={() => setSelectedCq(null)}>
          <div className="modal-content !max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="text-sm font-bold text-[var(--ink)]">
                {selectedCq.subject} &bull; {selectedCq.paper}
              </div>
              <button
                type="button"
                onClick={() => setSelectedCq(null)}
                className="p-1.5 rounded-lg text-[var(--mut)] hover:text-[var(--ink)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[var(--mut)]">
                <span className="text-[var(--ink)]">{selectedCq.chapter}</span>
                {selectedCq.topic && (
                  <>
                    <span>&middot;</span>
                    <span>{selectedCq.topic}</span>
                  </>
                )}
                {selectedCq.year && (
                  <>
                    <span>&middot;</span>
                    <span className="font-mono">{selectedCq.year}</span>
                  </>
                )}
                <span>&middot;</span>
                <span>{selectedCq.board}</span>
              </div>
              <div className="text-base font-bold text-[var(--ink)] leading-relaxed">
                {selectedCq.text}
              </div>
              {selectedCq.answer && (
                <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                    Reference Key Points
                  </div>
                  <div className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                    {selectedCq.answer}
                  </div>
                </div>
              )}
              {selectedCq.exam && (
                <div className="text-xs text-[var(--mut)]">
                  <b>Recorded Sessions:</b> {selectedCq.exam}
                </div>
              )}
              <div className="text-xs text-[var(--mut)]">
                <b>Source:</b> {selectedCq.source} ({selectedCq.page})
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
