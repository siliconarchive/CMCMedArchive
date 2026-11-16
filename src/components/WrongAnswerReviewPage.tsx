import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Award,
  Layers,
  Trash2
} from 'lucide-react';
import {
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  PublishedMcqQuestion,
  QuestionOverride,
  StudyState
} from '../types';
import { buildUnifiedMcqQuestions } from '../data/archiveHelpers';
import { canonicalizeSubjectName, getProfConfig, subjectMatchesCanonical } from '../data/curriculumConfig';

interface WrongAnswerReviewPageProps {
  selectedProf: ProfessionalExamId;
  studyState: StudyState;
  publishedQuestions: PublishedMcqQuestion[];
  questionOverrides: Record<string, QuestionOverride>;
  customTaxonomy: CustomTaxonomy;
  onPracticeOutcome: (payload: {
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
  onClearWrongItem: (id: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export const WrongAnswerReviewPage: React.FC<WrongAnswerReviewPageProps> = ({
  selectedProf,
  studyState,
  publishedQuestions,
  questionOverrides,
  customTaxonomy,
  onPracticeOutcome,
  onClearWrongItem,
  onNavigate
}) => {
  const profConfig = getProfConfig(selectedProf, customTaxonomy);
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [sbaPicked, setSbaPicked] = useState<Record<string, number>>({});
  const [tfPicked, setTfPicked] = useState<Record<string, Record<string, boolean>>>({});

  const allMcqs = useMemo(
    () => buildUnifiedMcqQuestions(publishedQuestions, questionOverrides),
    [publishedQuestions, questionOverrides]
  );

  const mcqMap = useMemo(() => {
    const map = new Map(allMcqs.map(q => [q.id, q]));
    return map;
  }, [allMcqs]);

  const profWrongItems = useMemo(() => {
    return studyState.wrongAnswers.filter(
      w =>
        w.professionalExam === selectedProf &&
        (subjectFilter === 'all' || subjectMatchesCanonical(w.subject, subjectFilter))
    );
  }, [studyState.wrongAnswers, selectedProf, subjectFilter]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
            Practice &middot; {profConfig.shortLabel}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Wrong Answer Review
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Re-practice MCQs you previously missed in MCQ Practice or Timed Exams for{' '}
            <strong className="text-[var(--ink)]">{profConfig.title}</strong>. Answering correctly resolves an item from this review queue.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('mcq')}
            className="btn sm alt min-h-[42px]"
          >
            <Layers size={14} />
            <span>MCQ Practice</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('exam')}
            className="btn sm min-h-[42px]"
          >
            <Award size={14} />
            <span>Examination System</span>
          </button>
        </div>
      </div>

      {/* Subject Filter */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-[var(--mut)]">Subject:</span>
          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(e.target.value)}
            className="!w-auto min-h-[38px] text-xs font-semibold"
          >
            <option value="all">All {profConfig.shortLabel} Subjects</option>
            {profConfig.subjects.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <span className="text-xs font-bold text-[var(--mut)] tabular-nums">
          {profWrongItems.length} item(s) awaiting review
        </span>
      </div>

      {profWrongItems.length === 0 ? (
        <div className="bg-[var(--card)] border border-dashed border-[var(--line-strong)] rounded-2xl p-8 text-center space-y-3">
          <CheckCircle2 size={36} className="mx-auto text-[#0D9488]" />
          <h2 className="text-base font-extrabold text-[var(--ink)] m-0">
            No Wrong Answers Queued for {profConfig.shortLabel}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mut)] max-w-md mx-auto m-0">
            Any missed SBA or True/False questions from MCQ Practice or the Examination System will automatically appear here for targeted revision.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 pt-2">
            <button type="button" onClick={() => onNavigate('mcq')} className="btn min-h-[44px]">
              Open MCQ Practice
            </button>
            <button type="button" onClick={() => onNavigate('exam')} className="btn alt min-h-[44px]">
              Start Online Exam
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {profWrongItems.map(item => {
            const fullQ = mcqMap.get(item.id);
            const pickedOpt = sbaPicked[item.id];
            const tfMap = tfPicked[item.id] || {};

            return (
              <div
                key={item.id}
                className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="font-bold text-[#0D9488]">
                    {item.type} &middot; {canonicalizeSubjectName(item.subject)} &middot; {item.paper} &middot;{' '}
                    <span className="text-amber-600 tabular-nums">Missed {item.attempts}x</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onClearWrongItem(item.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--mut)] hover:text-rose-600 bg-transparent border-0 p-1"
                  >
                    <Trash2 size={13} />
                    <span>Mark Reviewed</span>
                  </button>
                </div>

                <div className="text-sm sm:text-base font-bold text-[var(--ink)] leading-snug">
                  {fullQ?.stem || item.stem}
                </div>

                {fullQ?.type === 'SBA' && fullQ.opts && (
                  <div className="space-y-2 pt-1">
                    {fullQ.opts.map((opt, idx) => {
                      const chosen = pickedOpt === idx;
                      const isCorrect = fullQ.correctIndex === idx;
                      const showResult = pickedOpt !== undefined;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSbaPicked(prev => ({ ...prev, [item.id]: idx }));
                            onPracticeOutcome({
                              id: fullQ.id,
                              professionalExam: fullQ.professionalExam,
                              subject: fullQ.subject,
                              paper: fullQ.paper,
                              chapter: fullQ.chapter,
                              type: fullQ.type,
                              stem: fullQ.stem,
                              explanation: fullQ.explanation,
                              isCorrect: fullQ.correctIndex === idx
                            });
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm min-h-[42px] flex items-center justify-between gap-2 transition-colors ${
                            showResult && isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold'
                              : showResult && chosen && !isCorrect
                              ? 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300'
                              : 'border-[var(--line)] bg-[var(--bg-subtle)] hover:border-[#0D9488]'
                          }`}
                        >
                          <span>
                            {String.fromCharCode(65 + idx)}. {opt}
                          </span>
                          {showResult && isCorrect && <CheckCircle2 size={15} className="shrink-0" />}
                          {showResult && chosen && !isCorrect && <AlertCircle size={15} className="shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {fullQ?.type === 'TF' && fullQ.items && (
                  <div className="space-y-2 pt-1">
                    {fullQ.items.map(sub => {
                      const userChoice = tfMap[sub.label];
                      const answered = userChoice !== undefined;
                      const isRight = answered && userChoice === sub.ans;
                      return (
                        <div
                          key={sub.label}
                          className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                        >
                          <span>
                            <strong className="mr-1.5">{sub.label})</strong>
                            {sub.text}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {[true, false].map(val => {
                              const picked = userChoice === val;
                              return (
                                <button
                                  key={String(val)}
                                  type="button"
                                  onClick={() => {
                                    const nextMap = { ...tfMap, [sub.label]: val };
                                    setTfPicked(prev => ({ ...prev, [item.id]: nextMap }));
                                    const allDone = fullQ.items!.every(it => nextMap[it.label] !== undefined);
                                    if (allDone) {
                                      const allRight = fullQ.items!.every(
                                        it => nextMap[it.label] === it.ans
                                      );
                                      onPracticeOutcome({
                                        id: fullQ.id,
                                        professionalExam: fullQ.professionalExam,
                                        subject: fullQ.subject,
                                        paper: fullQ.paper,
                                        chapter: fullQ.chapter,
                                        type: fullQ.type,
                                        stem: fullQ.stem,
                                        explanation: fullQ.explanation,
                                        isCorrect: allRight
                                      });
                                    }
                                  }}
                                  className={`px-3 py-1 rounded-lg font-bold min-h-[34px] border ${
                                    picked
                                      ? isRight
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-rose-600 text-white border-rose-600'
                                      : 'bg-[var(--card)] border-[var(--line)] text-[var(--ink)]'
                                  }`}
                                >
                                  {val ? 'T' : 'F'}
                                </button>
                              );
                            })}
                            {answered && !isRight && (
                              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 ml-1">
                                Key: {sub.ans ? 'T' : 'F'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setTfPicked(prev => ({ ...prev, [item.id]: {} }))}
                      className="text-xs font-semibold text-[var(--mut)] hover:text-[var(--ink)] inline-flex items-center gap-1 bg-transparent border-0 p-1"
                    >
                      <RotateCcw size={12} /> Reset statements
                    </button>
                  </div>
                )}

                {(fullQ?.explanation || item.explanation) && (
                  <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] text-xs text-[var(--ink-secondary)]">
                    <strong className="text-[var(--ink)]">Reference Note:</strong>{' '}
                    {fullQ?.explanation || item.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
