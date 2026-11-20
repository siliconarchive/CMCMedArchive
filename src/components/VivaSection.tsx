import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Layers,
  Loader2,
  MessageSquarePlus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Trash2,
  User,
  UserCheck,
  Users,
  X
} from 'lucide-react';
import { CustomTaxonomy, PageRoute, ProfessionalExamId, UserProfile } from '../types';
import { getSubjectsForProf } from '../data/curriculumConfig';
import { isAdminUser } from '../utils/appsScriptAuth';
import {
  deleteVivaFromAppsScript,
  listVivaFromAppsScript,
  profIdToVivaProf,
  submitVivaToAppsScript,
  VIVA_PROF_OPTIONS,
  VivaExaminerType,
  VivaItem,
  VivaProfLabel,
  vivaProfToProfId
} from '../utils/appsScriptViva';
import { AuthRequiredCard } from './AuthRequiredCard';
import {
  getSavedSectionFilters,
  saveSectionFilters,
  useBackNav
} from '../utils/BackNavContext';

interface VivaSectionProps {
  selectedProf: ProfessionalExamId;
  customTaxonomy: CustomTaxonomy;
  userProfile: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onNavigate: (page: PageRoute) => void;
}

interface VivaFilterCache {
  examinerView: 'all' | VivaExaminerType;
  profFilter: 'all' | VivaProfLabel;
  subjectFilter: string;
  boardFilter: string;
  search: string;
}

const DEFAULT_BOARD_SUGGESTIONS = ['Board 1', 'Board 2', 'Board 3', 'Board 4'];
const VIVA_FILTER_CACHE_KEY = 'viva_section';

export const VivaSection: React.FC<VivaSectionProps> = ({
  selectedProf,
  customTaxonomy,
  userProfile,
  onOpenAuth
}) => {
  const { pushSubLayer, popSubLayer, markLayerInactive } = useBackNav();
  const savedFilters = getSavedSectionFilters<VivaFilterCache>(VIVA_FILTER_CACHE_KEY);

  const [vivaItems, setVivaItems] = useState<VivaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filters (default profFilter='all' so all approved Viva entries render immediately)
  const [examinerView, setExaminerView] = useState<'all' | VivaExaminerType>(
    savedFilters?.examinerView || 'all'
  );
  const [profFilter, setProfFilter] = useState<'all' | VivaProfLabel>(
    savedFilters?.profFilter || 'all'
  );
  const [subjectFilter, setSubjectFilter] = useState<string>(
    savedFilters?.subjectFilter || 'all'
  );
  const [boardFilter, setBoardFilter] = useState<string>(savedFilters?.boardFilter || 'all');
  const [search, setSearch] = useState<string>(savedFilters?.search || '');

  // Share Viva Question / Experience Form
  const [showForm, setShowForm] = useState<boolean>(false);
  const formLayerRef = useRef<string | null>(null);
  const [formProf, setFormProf] = useState<VivaProfLabel>(() => profIdToVivaProf(selectedProf));
  const [formSubject, setFormSubject] = useState<string>(
    () => getSubjectsForProf(selectedProf, customTaxonomy)[0] || 'Anatomy'
  );
  const [formCustomSubject, setFormCustomSubject] = useState<string>('');
  const [formExaminerType, setFormExaminerType] = useState<VivaExaminerType>('External');
  const [formBoardName, setFormBoardName] = useState<string>('');
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formAnswerHint, setFormAnswerHint] = useState<string>('');
  const [formContributorName, setFormContributorName] = useState<string>(
    userProfile?.fullName || ''
  );
  const [formContributorEmail, setFormContributorEmail] = useState<string>(
    userProfile?.email || ''
  );
  const [formBatch, setFormBatch] = useState<string>(userProfile?.batch || '');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    saveSectionFilters<VivaFilterCache>(VIVA_FILTER_CACHE_KEY, {
      examinerView,
      profFilter,
      subjectFilter,
      boardFilter,
      search
    });
  }, [examinerView, profFilter, subjectFilter, boardFilter, search]);

  useEffect(() => {
    return () => {
      if (formLayerRef.current) {
        markLayerInactive(formLayerRef.current);
        formLayerRef.current = null;
      }
    };
  }, [markLayerInactive]);

  const openShareForm = () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    if (!showForm) {
      setShowForm(true);
      formLayerRef.current = pushSubLayer('Viva Questions', () => {
        formLayerRef.current = null;
        setShowForm(false);
      });
    }
  };

  const closeShareForm = () => {
    if (formLayerRef.current) {
      const id = formLayerRef.current;
      formLayerRef.current = null;
      popSubLayer(id);
    } else {
      setShowForm(false);
    }
  };

  const handleExaminerViewChange = (nextView: 'all' | VivaExaminerType) => {
    if (nextView === examinerView) return;
    const prevView = examinerView;
    pushSubLayer('Viva Questions', () => setExaminerView(prevView));
    setExaminerView(nextView);
  };

  // Keep contributor defaults synced when user logs in/out
  useEffect(() => {
    if (userProfile) {
      setFormContributorName(prev => prev || userProfile.fullName || '');
      setFormContributorEmail(prev => prev || userProfile.email || '');
      setFormBatch(prev => prev || userProfile.batch || '');
    } else {
      setVivaItems([]);
      setShowForm(false);
      setLoadError(null);
    }
  }, [userProfile]);

  // Keep form prof aligned when global prof switches
  useEffect(() => {
    const nextVivaProf = profIdToVivaProf(selectedProf);
    setFormProf(nextVivaProf);
    const subs = getSubjectsForProf(selectedProf, customTaxonomy);
    if (subs.length > 0) setFormSubject(subs[0]);
  }, [selectedProf, customTaxonomy]);

  const loadVivaItems = useCallback(async () => {
    if (!userProfile) {
      setVivaItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const items = await listVivaFromAppsScript();
      setVivaItems(items);
    } catch (err: any) {
      setLoadError(err?.message || 'Could not load Viva questions.');
    } finally {
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      loadVivaItems();
    }
  }, [userProfile, loadVivaItems]);

  const formSubjectsForProf = useMemo(() => {
    const profId = vivaProfToProfId(formProf);
    return getSubjectsForProf(profId, customTaxonomy);
  }, [formProf, customTaxonomy]);

  const handleFormProfChange = (nextProf: VivaProfLabel) => {
    setFormProf(nextProf);
    const subs = getSubjectsForProf(vivaProfToProfId(nextProf), customTaxonomy);
    if (subs.length > 0 && !subs.includes(formSubject)) {
      setFormSubject(subs[0]);
    }
  };

  // Available subjects for active Prof filter
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    if (profFilter === 'all') {
      VIVA_PROF_OPTIONS.forEach(p => {
        getSubjectsForProf(vivaProfToProfId(p), customTaxonomy).forEach(s => set.add(s));
      });
    } else {
      getSubjectsForProf(vivaProfToProfId(profFilter), customTaxonomy).forEach(s => set.add(s));
    }
    vivaItems.forEach(item => {
      if (profFilter === 'all' || item.prof === profFilter) {
        if (item.subject) set.add(item.subject);
      }
    });
    return Array.from(set).sort();
  }, [profFilter, vivaItems, customTaxonomy]);

  // Available boards dynamically extracted from loaded Viva items (scoped by prof/subject if active)
  const availableBoards = useMemo(() => {
    const set = new Set<string>();
    vivaItems.forEach(item => {
      if (profFilter !== 'all' && item.prof !== profFilter) return;
      if (subjectFilter !== 'all' && item.subject.toLowerCase() !== subjectFilter.toLowerCase()) {
        return;
      }
      if (item.board_name) set.add(item.board_name);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [vivaItems, profFilter, subjectFilter]);

  const baseFilteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vivaItems.filter(item => {
      if (item.status !== 'approved') return false;
      if (profFilter !== 'all' && item.prof !== profFilter) return false;
      if (subjectFilter !== 'all' && item.subject.toLowerCase() !== subjectFilter.toLowerCase()) {
        return false;
      }
      if (boardFilter !== 'all' && item.board_name.toLowerCase() !== boardFilter.toLowerCase()) {
        return false;
      }
      if (q) {
        const hay = `${item.question} ${item.answer_hint} ${item.subject} ${item.board_name} ${item.prof} ${item.examiner_type} ${item.contributor_name} ${item.batch}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [vivaItems, profFilter, subjectFilter, boardFilter, search]);

  const externalQuestions = useMemo(
    () => baseFilteredItems.filter(item => item.examiner_type === 'External'),
    [baseFilteredItems]
  );

  const internalQuestions = useMemo(
    () => baseFilteredItems.filter(item => item.examiner_type === 'Internal'),
    [baseFilteredItems]
  );

  const handleSubmitViva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) {
      onOpenAuth('signin');
      return;
    }
    setSubmitError(null);
    setSubmitSuccess(null);

    const effectiveSubject =
      formSubject === '__custom__' ? formCustomSubject.trim() : formSubject.trim();

    if (!effectiveSubject) {
      setSubmitError('Please select or enter a subject.');
      return;
    }
    if (!formBoardName.trim()) {
      setSubmitError('Please enter the Board Name (e.g. Board 1, Board 2).');
      return;
    }
    if (!formQuestion.trim()) {
      setSubmitError('Please enter the Viva question or experience.');
      return;
    }

    const adminSubmit = isAdminUser(userProfile);
    setSubmitting(true);
    try {
      const created = await submitVivaToAppsScript({
        prof: formProf,
        subject: effectiveSubject,
        examiner_type: formExaminerType,
        board_name: formBoardName.trim(),
        question: formQuestion.trim(),
        answer_hint: formAnswerHint.trim(),
        contributor_name: formContributorName.trim() || userProfile.fullName || 'Anonymous Student',
        contributor_email: formContributorEmail.trim() || userProfile.email || '',
        batch: formBatch.trim() || userProfile.batch || '',
        status: adminSubmit ? 'approved' : 'pending',
        is_admin: adminSubmit
      });

      if (adminSubmit && created.status === 'approved') {
        setVivaItems(prev => [created, ...prev.filter(i => i.id !== created.id)]);
        setSubmitSuccess('Viva question submitted and published live!');
      } else {
        setSubmitSuccess(
          'Viva question submitted! It is currently pending admin approval and will appear in the Viva Bank once approved.'
        );
      }

      setFormQuestion('');
      setFormAnswerHint('');
      setFormCustomSubject('');
      await loadVivaItems();
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit Viva question.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteViva = async (id: string) => {
    if (!isAdminUser(userProfile) || deletingId) return;
    setActionError(null);
    setActionSuccess(null);
    setDeletingId(id);
    try {
      await deleteVivaFromAppsScript(id);
      setVivaItems(prev => prev.filter(item => item.id !== id));
      setActionSuccess('Viva question permanently deleted from Google Sheet and website.');
    } catch (err: any) {
      setActionError(err?.message || 'Failed to delete Viva question.');
    } finally {
      setDeletingId(null);
    }
  };

  const resetFilters = () => {
    setProfFilter('all');
    setSubjectFilter('all');
    setBoardFilter('all');
    setSearch('');
  };

  const renderVivaCard = (item: VivaItem) => {
    const isExternal = item.examiner_type === 'External';
    return (
      <article
        key={item.id}
        className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3.5"
      >
        <div className="space-y-2.5 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`px-2.5 py-0.5 rounded-md font-extrabold text-[11px] uppercase tracking-wider border ${
                  isExternal
                    ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                    : 'bg-teal-500/10 text-[#0D9488] border-teal-500/30'
                }`}
              >
                {item.examiner_type} Examiner
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--line)] font-bold text-[11px] text-[var(--ink)]">
                {item.prof}
              </span>
              {item.board_name && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 font-bold text-[11px] text-amber-800 dark:text-amber-300">
                  {item.board_name}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#0D9488]">{item.subject}</span>
          </div>

          <p className="text-sm sm:text-[15px] font-bold text-[var(--ink)] leading-relaxed m-0 break-words whitespace-pre-line">
            {item.question}
          </p>

          {item.answer_hint && (
            <div className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs space-y-1">
              <div className="font-extrabold uppercase tracking-wider text-[10.5px] text-[#0D9488]">
                Answer Hint / Approach
              </div>
              <p className="text-[var(--ink-secondary)] m-0 leading-relaxed whitespace-pre-line break-words">
                {item.answer_hint}
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-[var(--line-light)] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--mut)] min-w-0">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink)] truncate">
              <User size={12} className="text-[#0D9488] shrink-0" />
              <span className="truncate">{item.contributor_name}</span>
            </span>
            {item.batch && (
              <span className="inline-flex items-center gap-1">
                <GraduationCap size={12} />
                <span>{item.batch}</span>
              </span>
            )}
          </div>

          {isAdminUser(userProfile) && (
            <button
              type="button"
              disabled={deletingId === item.id}
              onClick={() => handleDeleteViva(item.id)}
              className="btn sm alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10 min-h-[36px]"
              aria-label="Delete viva question"
            >
              {deletingId === item.id ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Trash2 size={13} />
              )}
              <span>{deletingId === item.id ? 'Deleting...' : 'Delete'}</span>
            </button>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
            <Layers size={14} />
            <span>Study &middot; Viva Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Viva Question Bank
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Browse External and Internal viva board questions by Professional Exam, Board, and Subject, or share your own viva experience.
          </p>
        </div>

        {userProfile && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={loadVivaItems}
              disabled={loading}
              className="btn alt min-h-[42px]"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => (showForm ? closeShareForm() : openShareForm())}
              className="btn min-h-[42px]"
            >
              <MessageSquarePlus size={15} />
              <span>{showForm ? 'Hide Viva Form' : 'Share Viva Question'}</span>
            </button>
          </div>
        )}
      </div>

      {!userProfile ? (
        <AuthRequiredCard
          title="Sign In to View Viva Question Bank"
          description="An account is required to view uploaded Viva board questions and submit your viva experiences."
          onOpenAuth={onOpenAuth}
        />
      ) : (
        <>
          {/* Share Viva Question / Experience Form */}
          {showForm && (
            <form
              onSubmit={handleSubmitViva}
              className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[var(--line-light)] pb-3">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={closeShareForm}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9488] bg-transparent border-0 p-0 mb-1"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to Viva Questions</span>
                  </button>
                  <h2 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0">
                    Share Viva Question / Experience
                  </h2>
                  <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                    {isAdminUser(userProfile)
                      ? 'Admin submissions are published live immediately.'
                      : 'Submissions stay pending until approved by an administrator.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeShareForm}
                  className="p-1.5 rounded-lg text-[var(--mut)] hover:text-[var(--ink)]"
                  aria-label="Close form"
                >
                  <X size={18} />
                </button>
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {/* Examiner Type Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[var(--ink)]">
                  Examiner Type *
                </label>
                <div className="grid grid-cols-2 gap-2.5 max-w-md">
                  {(['External', 'Internal'] as VivaExaminerType[]).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormExaminerType(type)}
                      className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold min-h-[44px] flex items-center justify-center gap-2 transition-all ${
                        formExaminerType === type
                          ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488] ring-1 ring-[#0D9488]'
                          : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink-secondary)]'
                      }`}
                    >
                      {type === 'External' ? <Users size={15} /> : <UserCheck size={15} />}
                      <span>{type} Examiner</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prof, Subject, Board Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Professional Exam *
                  </label>
                  <select
                    value={formProf}
                    onChange={e => handleFormProfChange(e.target.value as VivaProfLabel)}
                    className="min-h-[44px] text-sm"
                  >
                    {VIVA_PROF_OPTIONS.map(p => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Subject *
                  </label>
                  <select
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value)}
                    className="min-h-[44px] text-sm"
                  >
                    {formSubjectsForProf.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                    <option value="__custom__">Other Subject...</option>
                  </select>
                  {formSubject === '__custom__' && (
                    <input
                      value={formCustomSubject}
                      onChange={e => setFormCustomSubject(e.target.value)}
                      placeholder="Enter subject name..."
                      required
                      className="mt-2 min-h-[40px] text-sm"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Board Name *
                  </label>
                  <input
                    value={formBoardName}
                    onChange={e => setFormBoardName(e.target.value)}
                    list="viva-board-suggestions"
                    placeholder="e.g. Board 1, Board 2"
                    required
                    className="min-h-[44px] text-sm"
                  />
                  <datalist id="viva-board-suggestions">
                    {Array.from(new Set([...DEFAULT_BOARD_SUGGESTIONS, ...availableBoards])).map(b => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Question & Optional Answer Hint */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Viva Question / Examiner Experience *
                  </label>
                  <textarea
                    rows={3}
                    value={formQuestion}
                    onChange={e => setFormQuestion(e.target.value)}
                    placeholder="Write the exact question(s) asked or viva board scenario..."
                    required
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Answer Hint / Key Points (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formAnswerHint}
                    onChange={e => setFormAnswerHint(e.target.value)}
                    placeholder="Optional key points expected by the examiner or helpful hints..."
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Contributor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Contributor Name
                  </label>
                  <input
                    value={formContributorName}
                    onChange={e => setFormContributorName(e.target.value)}
                    placeholder="Your name (or Anonymous)"
                    className="min-h-[42px] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Batch (Optional)
                  </label>
                  <input
                    value={formBatch}
                    onChange={e => setFormBatch(e.target.value)}
                    placeholder="e.g. CMC 67"
                    className="min-h-[42px] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formContributorEmail}
                    onChange={e => setFormContributorEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="min-h-[42px] text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button type="submit" disabled={submitting} className="btn min-h-[44px]">
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  <span>
                    {submitting
                      ? 'Submitting...'
                      : isAdminUser(userProfile)
                        ? 'Publish Viva Question Live'
                        : 'Submit Viva Question'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={closeShareForm}
                  className="btn alt min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Feedback / Errors */}
          {actionSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{actionSuccess}</span>
              </div>
              <button
                type="button"
                onClick={() => setActionSuccess(null)}
                className="text-xs font-bold opacity-70 hover:opacity-100"
                aria-label="Dismiss message"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {(loadError || actionError) && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{actionError || loadError}</span>
              </div>
              <button type="button" onClick={loadVivaItems} className="btn sm alt shrink-0">
                Retry
              </button>
            </div>
          )}

          {/* Examiner Type Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleExaminerViewChange('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] ${
                examinerView === 'all'
                  ? 'bg-[#0F2942] text-white dark:bg-sky-500/20 dark:text-sky-300'
                  : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
              }`}
            >
              All Questions ({baseFilteredItems.length})
            </button>
            <button
              type="button"
              onClick={() => handleExaminerViewChange('External')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] flex items-center gap-1.5 ${
                examinerView === 'External'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
              }`}
            >
              <Users size={13} />
              <span>External Questions ({externalQuestions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => handleExaminerViewChange('Internal')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] flex items-center gap-1.5 ${
                examinerView === 'Internal'
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
              }`}
            >
              <UserCheck size={13} />
              <span>Internal Questions ({internalQuestions.length})</span>
            </button>
          </div>

          {/* Filters Card: Prof-wise, Subject, Board-wise, Search */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search viva questions, hints, boards, subjects, or contributors..."
                className="!pl-10 !pr-10 text-sm min-h-[44px]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mut)] hover:text-[var(--ink)]"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
                  Prof-wise Filter
                </label>
                <select
                  value={profFilter}
                  onChange={e => {
                    setProfFilter(e.target.value as 'all' | VivaProfLabel);
                    setSubjectFilter('all');
                    setBoardFilter('all');
                  }}
                  className="text-sm min-h-[42px]"
                >
                  <option value="all">All Profs</option>
                  {VIVA_PROF_OPTIONS.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
                  Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={e => {
                    setSubjectFilter(e.target.value);
                    setBoardFilter('all');
                  }}
                  className="text-sm min-h-[42px]"
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
                  Board-wise Filter
                </label>
                <select
                  value={boardFilter}
                  onChange={e => setBoardFilter(e.target.value)}
                  className="text-sm min-h-[42px]"
                >
                  <option value="all">All Boards ({availableBoards.length})</option>
                  {availableBoards.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(search || profFilter !== 'all' || subjectFilter !== 'all' || boardFilter !== 'all') && (
              <div className="flex justify-end">
                <button type="button" onClick={resetFilters} className="btn sm alt">
                  <RotateCcw size={12} /> Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Area */}
          {loading && vivaItems.length === 0 ? (
            <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-10 text-center space-y-2">
              <Loader2 size={28} className="mx-auto animate-spin text-[#0D9488]" />
              <div className="text-sm font-bold text-[var(--ink)]">Loading Viva Questions...</div>
            </div>
          ) : baseFilteredItems.length === 0 ? (
            <div className="empty space-y-3">
              <BookOpen size={36} className="mx-auto opacity-45" />
              <div className="font-bold text-[var(--ink)]">
                {vivaItems.length === 0
                  ? 'No approved viva questions available yet'
                  : 'No viva questions match your active filters'}
              </div>
              <p className="text-xs text-[var(--mut)] max-w-md mx-auto m-0">
                {vivaItems.length === 0
                  ? 'Share an External or Internal viva board question for fellow students.'
                  : 'Try switching Prof, Subject, or Board filters, or share a new viva question.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {vivaItems.length > 0 && (
                  <button type="button" onClick={resetFilters} className="btn sm alt min-h-[40px]">
                    <RotateCcw size={13} /> Show All Profs &amp; Boards
                  </button>
                )}
                <button
                  type="button"
                  onClick={openShareForm}
                  className="btn sm min-h-[40px]"
                >
                  <MessageSquarePlus size={13} /> Share Viva Question
                </button>
              </div>
            </div>
          ) : examinerView === 'External' ? (
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
                <Users size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span>External Questions List ({externalQuestions.length})</span>
              </h2>
              {externalQuestions.length === 0 ? (
                <div className="empty text-xs">No External examiner questions match your filters.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {externalQuestions.map(renderVivaCard)}
                </div>
              )}
            </section>
          ) : examinerView === 'Internal' ? (
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
                <UserCheck size={16} className="text-[#0D9488]" />
                <span>Internal Questions List ({internalQuestions.length})</span>
              </h2>
              {internalQuestions.length === 0 ? (
                <div className="empty text-xs">No Internal examiner questions match your filters.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {internalQuestions.map(renderVivaCard)}
                </div>
              )}
            </section>
          ) : (
            <div className="space-y-8">
              {/* External Questions List */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--line-light)] pb-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
                    <Users size={17} className="text-indigo-600 dark:text-indigo-400" />
                    <span>External Questions List ({externalQuestions.length})</span>
                  </h2>
                </div>
                {externalQuestions.length === 0 ? (
                  <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 text-center text-xs text-[var(--mut)]">
                    No External examiner questions match your current filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {externalQuestions.map(renderVivaCard)}
                  </div>
                )}
              </section>

              {/* Internal Questions List */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--line-light)] pb-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
                    <UserCheck size={17} className="text-[#0D9488]" />
                    <span>Internal Questions List ({internalQuestions.length})</span>
                  </h2>
                </div>
                {internalQuestions.length === 0 ? (
                  <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 text-center text-xs text-[var(--mut)]">
                    No Internal examiner questions match your current filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {internalQuestions.map(renderVivaCard)}
                  </div>
                )}
              </section>
            </div>
          )}
        </>
      )}
    </div>
  );
};
