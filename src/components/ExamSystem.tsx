import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Play,
  RotateCcw,
  Award,
  BarChart3,
  BookOpen,
  Shuffle,
  Check,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useBackNav } from '../utils/BackNavContext';
import {
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  PublishedMcqQuestion,
  QuestionOverride
} from '../types';
import {
  buildUnifiedMcqQuestions,
  getCanonicalChaptersFor,
  PENDING_CHAPTER_LABEL,
  UnifiedMcqQuestion
} from '../data/archiveHelpers';
import {
  getPapersForSubjectInProf,
  getProfConfig,
  getSubjectsForProf,
  subjectMatchesCanonical
} from '../data/curriculumConfig';

interface ExamSystemProps {
  selectedProf: ProfessionalExamId;
  publishedQuestions: PublishedMcqQuestion[];
  questionOverrides: Record<string, QuestionOverride>;
  customTaxonomy: CustomTaxonomy;
  preset?: { subject?: string; paper?: string; chapter?: string } | null;
  onExamActiveChange?: (active: boolean) => void;
  onExamComplete?: (summary: {
    professionalExam: ProfessionalExamId;
    subject: string;
    mode: string;
    totalQuestions: number;
    scoreEarned: number;
    percentage: number;
  }) => void;
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
}

type ExamMode = 'chapter' | 'paper' | 'subject';
type ExamStage = 'setup' | 'running' | 'results';
type QuestionTypeFilter = 'Both' | 'SBA' | 'TF';

interface ExamAnswerMap {
  // SBA -> selected option index; TF -> map of label ('a'..'e') to boolean
  sba: Record<string, number>;
  tf: Record<string, Record<string, boolean>>;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const ExamSystem: React.FC<ExamSystemProps> = ({
  selectedProf,
  publishedQuestions,
  questionOverrides,
  customTaxonomy,
  preset,
  onExamActiveChange,
  onExamComplete,
  onPracticeOutcome,
  onNavigate
}) => {
  const { pushSubLayer, popSubLayer, markLayerInactive } = useBackNav();
  const allMcqsRaw = useMemo(
    () => buildUnifiedMcqQuestions(publishedQuestions, questionOverrides),
    [publishedQuestions, questionOverrides]
  );

  // Setup State — strictly governed by global selectedProf
  const [stage, setStage] = useState<ExamStage>('setup');
  const confirmLayerRef = useRef<string | null>(null);
  const [mode, setMode] = useState<ExamMode>(preset?.chapter ? 'chapter' : preset?.paper ? 'paper' : 'subject');
  const profSubjects = getSubjectsForProf(selectedProf, customTaxonomy);
  const [subject, setSubject] = useState<string>(preset?.subject || profSubjects[0] || '');
  const [paper, setPaper] = useState<string>(preset?.paper || 'Paper-I');
  const [chapter, setChapter] = useState<string>(preset?.chapter || '');
  const [qType, setQType] = useState<QuestionTypeFilter>('Both');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [durationMinutes, setDurationMinutes] = useState<number>(20);
  const [customDurationTouched, setCustomDurationTouched] = useState<boolean>(false);
  const [shuffleOrder, setShuffleOrder] = useState<boolean>(true);
  const [collegeFilter, setCollegeFilter] = useState<string>('all');
  const [recordedRunId, setRecordedRunId] = useState<number>(0);

  const profConfig = getProfConfig(selectedProf, customTaxonomy);

  // Reset subject/paper/chapter cleanly when selectedProf changes
  useEffect(() => {
    const nextSubs = getSubjectsForProf(selectedProf, customTaxonomy);
    if (!preset?.subject) {
      setSubject(nextSubs[0] || '');
      setPaper('Paper-I');
      setChapter('');
    }
  }, [selectedProf, customTaxonomy, preset?.subject]);

  const allMcqs = useMemo(() => {
    return allMcqsRaw.filter(
      q =>
        q.professionalExam === selectedProf &&
        q.classificationRole !== 'Phase Teaching / Formative Subject'
    );
  }, [allMcqsRaw, selectedProf]);

  // Active Exam State
  const [examQuestions, setExamQuestions] = useState<UnifiedMcqQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<ExamAnswerMap>({ sba: {}, tf: {} });
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [totalDurationSecs, setTotalDurationSecs] = useState<number>(0);
  const [timeTakenSecs, setTimeTakenSecs] = useState<number>(0);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (confirmLayerRef.current) {
        markLayerInactive(confirmLayerRef.current);
        confirmLayerRef.current = null;
      }
    };
  }, [markLayerInactive]);

  const openConfirmSubmit = () => {
    if (!confirmLayerRef.current) {
      confirmLayerRef.current = pushSubLayer('Exam', () => {
        confirmLayerRef.current = null;
        setConfirmSubmitOpen(false);
      });
    }
    setConfirmSubmitOpen(true);
  };

  const closeConfirmSubmit = () => {
    if (confirmLayerRef.current) {
      const id = confirmLayerRef.current;
      confirmLayerRef.current = null;
      popSubLayer(id);
    } else {
      setConfirmSubmitOpen(false);
    }
  };

  const subjects = useMemo(() => {
    const base = getSubjectsForProf(selectedProf, customTaxonomy);
    const set = new Set<string>(base);
    allMcqs.forEach(q => {
      if (q.subject) set.add(q.subject);
    });
    return Array.from(set).sort();
  }, [allMcqs, selectedProf, customTaxonomy]);

  useEffect(() => {
    if (subjects.length > 0 && !subjects.includes(subject)) {
      setSubject(subjects[0]);
    }
  }, [subjects, subject]);

  const papersForSubject = useMemo(() => {
    const set = new Set<string>(getPapersForSubjectInProf(selectedProf, subject, customTaxonomy));
    allMcqs.filter(q => subjectMatchesCanonical(q.subject, subject)).forEach(q => set.add(q.paper));
    return Array.from(set).sort();
  }, [allMcqs, subject, selectedProf, customTaxonomy]);

  const chaptersForSelection = useMemo(() => {
    const filteredForSubj = allMcqs.filter(q => subjectMatchesCanonical(q.subject, subject));
    return getCanonicalChaptersFor('all', paper, filteredForSubj, customTaxonomy).filter(
      c => c !== PENDING_CHAPTER_LABEL
    );
  }, [allMcqs, subject, paper, customTaxonomy]);

  useEffect(() => {
    if (papersForSubject.length > 0 && !papersForSubject.includes(paper)) {
      setPaper(papersForSubject[0]);
    }
  }, [papersForSubject, paper]);

  useEffect(() => {
    if (chaptersForSelection.length > 0 && !chaptersForSelection.includes(chapter)) {
      setChapter(chaptersForSelection[0]);
    } else if (chaptersForSelection.length === 0) {
      setChapter('');
    }
  }, [chaptersForSelection, chapter]);

  const colleges = useMemo(() => {
    const set = new Set<string>();
    allMcqs.forEach(q => set.add(q.collegeName));
    return Array.from(set).sort();
  }, [allMcqs]);

  // Verified pool matching user configuration (never mixes in unverified or fabricated items)
  const matchingPool = useMemo(() => {
    return allMcqs.filter(q => {
      if (!subjectMatchesCanonical(q.subject, subject)) return false;
      if ((mode === 'paper' || mode === 'chapter') && q.paper !== paper) return false;
      if (mode === 'chapter' && chapter && q.chapter !== chapter) return false;
      if (qType !== 'Both' && q.type !== qType) return false;
      if (collegeFilter !== 'all' && q.collegeName !== collegeFilter) return false;
      // Ensure valid answer key exists for grading
      if (q.type === 'SBA' && (typeof q.correctIndex !== 'number' || !q.opts?.length)) return false;
      if (q.type === 'TF' && (!q.items || q.items.length === 0)) return false;
      return true;
    });
  }, [allMcqs, subject, paper, chapter, mode, qType, collegeFilter]);

  useEffect(() => {
    if (!customDurationTouched) {
      const effectiveCount = Math.min(questionCount, Math.max(1, matchingPool.length));
      setDurationMinutes(Math.max(5, effectiveCount));
    }
  }, [questionCount, matchingPool.length, customDurationTouched]);

  useEffect(() => {
    onExamActiveChange?.(stage === 'running');
    return () => onExamActiveChange?.(false);
  }, [stage, onExamActiveChange]);

  // Timer countdown during exam
  useEffect(() => {
    if (stage !== 'running') return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizeExam(totalDurationSecs);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, totalDurationSecs]);

  const startExam = () => {
    if (matchingPool.length === 0) return;
    const ordered = shuffleOrder ? shuffleArray(matchingPool) : [...matchingPool];
    const selected = ordered.slice(0, Math.min(questionCount, ordered.length));
    const totalSecs = Math.max(60, durationMinutes * 60);

    setExamQuestions(selected);
    setAnswers({ sba: {}, tf: {} });
    setFlagged({});
    setCurrentIndex(0);
    setTotalDurationSecs(totalSecs);
    setSecondsLeft(totalSecs);
    setTimeTakenSecs(0);
    setConfirmSubmitOpen(false);
    setStage('running');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalizeExam = (forcedElapsed?: number) => {
    const elapsed = forcedElapsed !== undefined ? forcedElapsed : Math.max(0, totalDurationSecs - secondsLeft);
    setTimeTakenSecs(elapsed);
    if (confirmLayerRef.current) {
      markLayerInactive(confirmLayerRef.current);
      confirmLayerRef.current = null;
    }
    setConfirmSubmitOpen(false);
    setRecordedRunId(Date.now());
    setStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isQuestionAnswered = (q: UnifiedMcqQuestion): boolean => {
    if (q.type === 'SBA') return answers.sba[q.id] !== undefined;
    const tfMap = answers.tf[q.id];
    return Boolean(tfMap && Object.keys(tfMap).length > 0);
  };

  // Compute Grading & Chapter Analytics
  const evaluation = useMemo(() => {
    if (stage !== 'results') return null;

    let correctQuestions = 0;
    let incorrectQuestions = 0;
    let unansweredQuestions = 0;
    let totalMarksEarned = 0;
    const maxMarks = examQuestions.length;

    const chapterStats: Record<string, { chapter: string; total: number; earned: number; fullCorrect: number }> = {};

    const perQuestion = examQuestions.map(q => {
      if (!chapterStats[q.chapter]) {
        chapterStats[q.chapter] = { chapter: q.chapter, total: 0, earned: 0, fullCorrect: 0 };
      }
      chapterStats[q.chapter].total += 1;

      const answered = isQuestionAnswered(q);
      if (!answered) {
        unansweredQuestions++;
        return { q, status: 'unanswered' as const, earned: 0 };
      }

      if (q.type === 'SBA') {
        const chosen = answers.sba[q.id];
        const isCorrect = chosen === q.correctIndex;
        if (isCorrect) {
          correctQuestions++;
          totalMarksEarned += 1;
          chapterStats[q.chapter].earned += 1;
          chapterStats[q.chapter].fullCorrect += 1;
          return { q, status: 'correct' as const, earned: 1 };
        } else {
          incorrectQuestions++;
          return { q, status: 'incorrect' as const, earned: 0 };
        }
      } else {
        const items = q.items || [];
        const userTf = answers.tf[q.id] || {};
        let rightItems = 0;
        items.forEach(it => {
          if (userTf[it.label] === it.ans) rightItems++;
        });
        const fraction = items.length > 0 ? rightItems / items.length : 0;
        totalMarksEarned += fraction;
        chapterStats[q.chapter].earned += fraction;
        if (rightItems === items.length) {
          correctQuestions++;
          chapterStats[q.chapter].fullCorrect += 1;
          return { q, status: 'correct' as const, earned: fraction };
        } else {
          incorrectQuestions++;
          return { q, status: 'partial_or_incorrect' as const, earned: fraction };
        }
      }
    });

    const percentage = maxMarks > 0 ? Math.round((totalMarksEarned / maxMarks) * 1000) / 10 : 0;
    const breakdown = Object.values(chapterStats).sort(
      (a, b) => a.earned / a.total - b.earned / b.total
    );

    return {
      total: examQuestions.length,
      correctQuestions,
      incorrectQuestions,
      unansweredQuestions,
      totalMarksEarned: Math.round(totalMarksEarned * 100) / 100,
      maxMarks,
      percentage,
      breakdown,
      perQuestion
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, examQuestions, answers]);

      // Record completed exam result + wrong answer review items once per submission
  useEffect(() => {
    if (stage !== 'results' || !evaluation || recordedRunId === 0) return;
    onExamComplete?.({
      professionalExam: selectedProf,
      subject,
      mode: mode === 'chapter' ? `${paper} · ${chapter}` : mode === 'paper' ? paper : 'Full Subject',
      totalQuestions: evaluation.total,
      scoreEarned: evaluation.totalMarksEarned,
      percentage: evaluation.percentage
    });
    evaluation.perQuestion.forEach(({ q, status }) => {
      if (status === 'unanswered') return;
      onPracticeOutcome?.({
        id: q.id,
        professionalExam: q.professionalExam,
        subject: q.subject,
        paper: q.paper,
        chapter: q.chapter,
        type: q.type,
        stem: q.stem,
        explanation: q.explanation,
        isCorrect: status === 'correct'
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordedRunId]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // ===================== STAGE 1: SETUP =====================
  if (stage === 'setup') {
    const effectiveMax = Math.min(questionCount, matchingPool.length);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[var(--line)] pb-5 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <Award size={14} />
            <span>Practice &middot; {profConfig.shortLabel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Examination System
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Timed SBA &amp; True/False exams filtered strictly for <strong className="text-[var(--ink)]">{profConfig.title}</strong>. Questions are never fabricated.
          </p>
        </div>

        {/* Step 1: Exam Mode Cards */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--mut)]">
            1. Select Examination Scope
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'chapter' as const,
                title: 'Chapter-wise Exam',
                desc: 'Subject → Paper → Chapter focused drill'
              },
              {
                id: 'paper' as const,
                title: 'Paper-wise Exam',
                desc: 'Full Paper-I or Paper-II assessment'
              },
              {
                id: 'subject' as const,
                title: 'Subject-wise Exam',
                desc: 'Comprehensive test across both papers'
              }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === item.id
                    ? 'border-[#0D9488] bg-teal-50/60 dark:bg-teal-950/30 ring-1 ring-[#0D9488]'
                    : 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]'
                }`}
              >
                <div className="font-bold text-sm text-[var(--ink)]">{item.title}</div>
                <div className="text-xs text-[var(--mut)] mt-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Curriculum Filters */}
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">Subject</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="min-h-[44px] text-sm"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {(mode === 'paper' || mode === 'chapter') && (
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">Paper</label>
                <select
                  value={paper}
                  onChange={e => setPaper(e.target.value)}
                  className="min-h-[44px] text-sm"
                >
                  {papersForSubject.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {mode === 'chapter' && (
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">Chapter</label>
                <select
                  value={chapter}
                  onChange={e => setChapter(e.target.value)}
                  className="min-h-[44px] text-sm"
                >
                  {chaptersForSelection.length === 0 ? (
                    <option value="">No categorized chapters</option>
                  ) : (
                    chaptersForSelection.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">Question Format</label>
              <select
                value={qType}
                onChange={e => setQType(e.target.value as QuestionTypeFilter)}
                className="min-h-[44px] text-sm"
              >
                <option value="Both">Both SBA &amp; True/False</option>
                <option value="SBA">SBA (Single Best Answer) Only</option>
                <option value="TF">True / False Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={e => setQuestionCount(Number(e.target.value))}
                className="min-h-[44px] text-sm"
              >
                {[5, 10, 15, 20, 30, 50].map(n => (
                  <option key={n} value={n}>
                    {n} Questions
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                Time Limit (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={180}
                value={durationMinutes}
                onChange={e => {
                  setCustomDurationTouched(true);
                  setDurationMinutes(Math.max(1, Math.min(180, Number(e.target.value) || 10)));
                }}
                className="min-h-[44px] text-sm"
              />
            </div>

            {colleges.length > 1 && (
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  College Source
                </label>
                <select
                  value={collegeFilter}
                  onChange={e => setCollegeFilter(e.target.value)}
                  className="min-h-[44px] text-sm"
                >
                  <option value="all">All Medical Colleges</option>
                  {colleges.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--line-light)]">
            <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--ink)] cursor-pointer">
              <input
                type="checkbox"
                checked={shuffleOrder}
                onChange={e => setShuffleOrder(e.target.checked)}
                className="!w-4 !h-4 accent-[#0D9488]"
              />
              <Shuffle size={14} className="text-[#0D9488]" />
              <span>Randomize question order</span>
            </label>

            <div className="text-xs font-bold text-[var(--ink-secondary)]">
              Verified Pool Available: <span className="text-[#0D9488]">{matchingPool.length} questions</span>
            </div>
          </div>

          {/* Insufficient Question Notice */}
          {matchingPool.length === 0 ? (
            <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <span>
                No verified questions match this exact filter combination. Try selecting &ldquo;Both SBA &amp; True/False&rdquo; or switching to Paper-wise / Subject-wise mode.
              </span>
            </div>
          ) : matchingPool.length < questionCount ? (
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <span>
                You requested <b>{questionCount}</b> questions, but this selection currently has <b>{matchingPool.length}</b> verified questions. Your exam will include all <b>{matchingPool.length}</b> authentic questions without inventing filler items.
              </span>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-[var(--mut)]">
              Marking: 1 mark per SBA; proportional credit (0.2 per sub-statement) for 5-item True/False.
            </div>
            <button
              type="button"
              disabled={matchingPool.length === 0}
              onClick={startExam}
              className="btn min-h-[48px] !px-6 text-sm disabled:opacity-40"
            >
              <Play size={16} />
              <span>Start Examination ({effectiveMax} Qs)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== STAGE 2: RUNNING EXAM =====================
  if (stage === 'running') {
    const q = examQuestions[currentIndex];
    const answeredCount = examQuestions.filter(isQuestionAnswered).length;
    const unansweredCount = examQuestions.length - answeredCount;
    const isUrgent = secondsLeft <= 120;

    return (
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Sticky Exam Header Bar */}
        <div className="bg-[var(--card)]/95 backdrop-blur-md border border-[var(--line)] rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2.5 sticky top-[62px] sm:top-[70px] z-20 shadow-xs">
          <div className="space-y-0.5 min-w-0">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0D9488] truncate">
              {subject} {mode !== 'subject' ? `• ${paper}` : ''} {mode === 'chapter' ? `• ${chapter}` : ''}
            </div>
            <div className="text-sm font-extrabold text-[var(--ink)]">
              Question {currentIndex + 1} of {examQuestions.length}
              <span className="text-xs font-medium text-[var(--mut)] ml-2">
                ({answeredCount} answered)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              className={`px-3 py-2 rounded-lg font-mono tabular-nums text-xs sm:text-sm font-extrabold flex items-center gap-1.5 border ${
                isUrgent
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300'
                  : 'bg-[var(--bg-subtle)] border-[var(--line)] text-[var(--ink)]'
              }`}
            >
              <Clock size={15} />
              <span>{formatTime(secondsLeft)}</span>
            </div>

            <button
              type="button"
              onClick={openConfirmSubmit}
              className="btn good min-h-[42px] !px-3.5"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Active Question Card */}
          <div className="lg:col-span-8 bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#173B55] text-white font-bold">
                  {q.type === 'SBA' ? 'Single Best Answer' : 'True / False'}
                </span>
                <span className="text-[var(--mut)]">{q.chapter}</span>
              </div>
              <button
                type="button"
                onClick={() => setFlagged(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold min-h-[36px] transition-colors ${
                  flagged[q.id]
                    ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-amber-200'
                    : 'bg-[var(--bg-subtle)] border-[var(--line)] text-[var(--ink-secondary)]'
                }`}
              >
                <Flag size={13} />
                <span>{flagged[q.id] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="text-base sm:text-lg font-bold text-[var(--ink)] leading-relaxed">
              {q.stem}
            </div>

            {/* SBA Choices */}
            {q.type === 'SBA' && q.opts && (
              <div className="space-y-2.5">
                {q.opts.map((opt, idx) => {
                  const selected = answers.sba[q.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setAnswers(prev => ({
                          ...prev,
                          sba: { ...prev.sba, [q.id]: idx }
                        }))
                      }
                      className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 transition-all min-h-[48px] ${
                        selected
                          ? 'border-[#0D9488] bg-teal-500/10 text-[var(--ink)] font-semibold ring-1 ring-[#0D9488]'
                          : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink-secondary)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          selected
                            ? 'bg-[#0D9488] border-[#0D9488] text-white'
                            : 'border-[var(--line-strong)] text-[var(--mut)]'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TF Sub-items */}
            {q.type === 'TF' && q.items && (
              <div className="divide-y divide-[var(--line-light)] border-t border-[var(--line-light)]">
                {q.items.map(item => {
                  const val = answers.tf[q.id]?.[item.label];
                  return (
                    <div
                      key={item.label}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="text-sm text-[var(--ink)] flex items-start gap-2">
                        <span className="font-bold text-[var(--mut)] shrink-0">{item.label})</span>
                        <span>{item.text}</span>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {[true, false].map(optVal => {
                          const active = val === optVal;
                          return (
                            <button
                              key={String(optVal)}
                              type="button"
                              onClick={() =>
                                setAnswers(prev => ({
                                  ...prev,
                                  tf: {
                                    ...prev.tf,
                                    [q.id]: { ...(prev.tf[q.id] || {}), [item.label]: optVal }
                                  }
                                }))
                              }
                              className={`px-4 py-2.5 rounded-lg border text-xs font-bold min-h-[44px] min-w-[60px] transition-colors ${
                                active
                                  ? 'bg-[#0D9488] border-[#0D9488] text-white'
                                  : 'bg-[var(--card-subtle)] border-[var(--line)] text-[var(--ink-secondary)] hover:border-[#0D9488]'
                              }`}
                            >
                              {optVal ? 'True' : 'False'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Prev / Next Navigation */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--line)]">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                className="btn alt min-h-[44px] disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {currentIndex < examQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(i => Math.min(examQuestions.length - 1, i + 1))}
                  className="btn min-h-[44px]"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openConfirmSubmit}
                  className="btn good min-h-[44px]"
                >
                  <Check size={16} /> Finish &amp; Submit
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator Grid */}
          <div className="lg:col-span-4 bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-extrabold text-[var(--ink)] m-0">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {examQuestions.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                const isFlagged = Boolean(flagged[item.id]);
                const isAns = isQuestionAnswered(item);

                let cls = 'bg-[var(--bg-subtle)] border-[var(--line)] text-[var(--ink-secondary)]';
                if (isFlagged) {
                  cls = 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200';
                } else if (isAns) {
                  cls = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                }
                if (isCurrent) {
                  cls += ' ring-2 ring-[#173B55] dark:ring-sky-400 font-extrabold';
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-lg border text-xs font-bold transition-all ${cls}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5 text-[11px] text-[var(--mut)] pt-2 border-t border-[var(--line-light)]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" />
                <span>Marked for Review ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[var(--bg-subtle)] border border-[var(--line)]" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Submit Modal */}
        {confirmSubmitOpen && (
          <div className="modal-overlay" onClick={closeConfirmSubmit}>
            <div className="modal-content max-w-md" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="text-base font-bold m-0">Submit Examination?</h3>
              </div>
              <div className="p-5 space-y-4 text-sm">
                <p className="text-[var(--ink-secondary)] m-0">
                  You have answered <b>{answeredCount}</b> out of <b>{examQuestions.length}</b> questions.
                  {unansweredCount > 0 && (
                    <>
                      {' '}
                      <span className="text-amber-700 dark:text-amber-300 font-semibold">
                        {unansweredCount} question(s) remain unanswered.
                      </span>
                    </>
                  )}
                </p>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeConfirmSubmit}
                    className="btn alt min-h-[44px]"
                  >
                    Continue Exam
                  </button>
                  <button
                    type="button"
                    onClick={() => finalizeExam()}
                    className="btn good min-h-[44px]"
                  >
                    Confirm &amp; Grade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===================== STAGE 3: RESULTS & ANALYTICS =====================
  if (!evaluation) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Score Header */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              Examination Summary
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] m-0 mt-1">
              {evaluation.percentage}% Score ({evaluation.totalMarksEarned} / {evaluation.maxMarks})
            </h1>
            <p className="text-xs sm:text-sm text-[var(--mut)] m-0 mt-1">
              {subject} {mode !== 'subject' ? `• ${paper}` : ''} {mode === 'chapter' ? `• ${chapter}` : ''} • Time Taken: {formatTime(timeTakenSecs)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={startExam} className="btn min-h-[44px]">
              <RotateCcw size={15} /> Retake Exam
            </button>
            <button type="button" onClick={() => setStage('setup')} className="btn alt min-h-[44px]">
              <ArrowLeft size={15} /> Back to Exam Setup
            </button>
          </div>
        </div>

        {/* Key Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
            <div className="text-xs text-[var(--mut)]">Total Questions</div>
            <div className="text-xl font-extrabold text-[var(--ink)]">{evaluation.total}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <div className="text-xs text-emerald-800 dark:text-emerald-300">Fully Correct</div>
            <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
              {evaluation.correctQuestions}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25">
            <div className="text-xs text-rose-800 dark:text-rose-300">Incorrect / Partial</div>
            <div className="text-xl font-extrabold text-rose-700 dark:text-rose-300">
              {evaluation.incorrectQuestions}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
            <div className="text-xs text-[var(--mut)]">Unanswered</div>
            <div className="text-xl font-extrabold text-[var(--ink)]">{evaluation.unansweredQuestions}</div>
          </div>
        </div>

        {/* Chapter-wise Performance Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--ink)]">
            <BarChart3 size={16} className="text-[#0D9488]" />
            <span>Chapter-wise Performance Breakdown</span>
          </div>
          <div className="space-y-2.5">
            {evaluation.breakdown.map(b => {
              const pct = Math.round((b.earned / b.total) * 100);
              return (
                <div key={b.chapter} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--ink)]">{b.chapter}</span>
                    <span className="text-[var(--mut)]">
                      {Math.round(b.earned * 100) / 100} / {b.total} marks ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pct >= 70 ? 'bg-emerald-600' : pct >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question-by-Question Review */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
            <BookOpen size={18} className="text-[#0D9488]" />
            <span>Detailed Question Review</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {evaluation.incorrectQuestions > 0 && (
              <button
                type="button"
                onClick={() => onNavigate('wrong-review')}
                className="btn sm min-h-[38px]"
              >
                Review Wrong Answers
              </button>
            )}
            <button type="button" onClick={() => onNavigate('mcq')} className="btn sm alt min-h-[38px]">
              <Sparkles size={14} /> MCQ Practice
            </button>
          </div>
        </div>

        {evaluation.perQuestion.map(({ q, status, earned }, idx) => (
          <div
            key={q.id}
            className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[var(--ink)]">
                Q{idx + 1} &bull; {q.type} &bull; {q.chapter}
              </span>
              {status === 'correct' ? (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 size={14} /> +{earned} mark
                </span>
              ) : status === 'unanswered' ? (
                <span className="font-semibold text-[var(--mut)]">Unanswered (0)</span>
              ) : (
                <span className="inline-flex items-center gap-1 font-bold text-rose-700 dark:text-rose-300">
                  <XCircle size={14} /> +{Math.round(earned * 100) / 100} mark
                </span>
              )}
            </div>

            <div className="text-sm font-bold text-[var(--ink)]">{q.stem}</div>

            {q.type === 'SBA' && q.opts && (
              <div className="space-y-1 text-xs">
                {q.opts.map((opt, oIdx) => {
                  const isUser = answers.sba[q.id] === oIdx;
                  const isRight = q.correctIndex === oIdx;
                  return (
                    <div
                      key={oIdx}
                      className={`px-3 py-2 rounded-lg border ${
                        isRight
                          ? 'border-emerald-500 bg-emerald-500/10 font-bold text-emerald-900 dark:text-emerald-200'
                          : isUser
                          ? 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200'
                          : 'border-[var(--line-light)] text-[var(--mut)]'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                      {isRight && ' ✓ (Correct)'}
                      {isUser && !isRight && ' ✗ (Your choice)'}
                    </div>
                  );
                })}
              </div>
            )}

            {q.type === 'TF' && q.items && (
              <div className="space-y-1 text-xs">
                {q.items.map(it => {
                  const u = answers.tf[q.id]?.[it.label];
                  const match = u === it.ans;
                  return (
                    <div
                      key={it.label}
                      className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded bg-[var(--bg-subtle)]"
                    >
                      <span className="text-[var(--ink)]">
                        <b>{it.label})</b> {it.text}
                      </span>
                      <span className="font-bold">
                        Key: <span className="text-emerald-700 dark:text-emerald-300">{it.ans ? 'T' : 'F'}</span>
                        {u !== undefined && (
                          <span className={match ? 'text-emerald-700 ml-2' : 'text-rose-600 ml-2'}>
                            (You: {u ? 'T' : 'F'})
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {q.explanation && (
              <div className="p-3 rounded-lg bg-[var(--bg-subtle)] text-xs text-[var(--ink-secondary)]">
                <b>Explanation:</b> {q.explanation}{' '}
                {q.sourceReference ? <span className="text-[var(--mut)]">({q.sourceReference})</span> : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
