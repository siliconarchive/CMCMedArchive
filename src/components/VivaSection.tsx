import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  Layers,
  Link2,
  Loader2,
  Megaphone,
  MessageSquarePlus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  Trash2,
  Upload,
  User,
  UserCheck,
  Users,
  X
} from 'lucide-react';
import { CustomTaxonomy, PageRoute, ProfessionalExamId, UserProfile } from '../types';
import { getSubjectsForProf } from '../data/curriculumConfig';
import {
  formatVivaContributorCredit,
  VIVA_CONTRIBUTOR_CREDITS,
  VivaContributorCredit
} from '../data/vivaSeed';
import { isAdminUser } from '../utils/appsScriptAuth';
import {
  DEFAULT_VIVA_COLLEGE,
  deleteVivaFromAppsScript,
  findMatchingVivaCollegeOption,
  isVivaImageItem,
  listVivaFromAppsScript,
  MAX_VIVA_FILE_BYTES,
  mergeVivaWithSeed,
  normalizeVivaCollegeKey,
  profIdToVivaProf,
  sanitizeVivaErrorMessage,
  submitVivaToAppsScript,
  VIVA_MEDICAL_COLLEGES,
  VIVA_OTHER_COLLEGE_OPTION,
  VIVA_PROF_OPTIONS,
  VIVA_SESSION_OPTIONS,
  VIVA_YEAR_SUGGESTIONS,
  vivaCollegesMatch,
  VivaExaminerType,
  vivaFileToBase64,
  VivaFileType,
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

type VivaViewTab = 'all' | 'External' | 'Internal' | 'Suggestion';

interface VivaFilterCache {
  examinerView: VivaViewTab;
  collegeFilter: string;
  profFilter: 'all' | VivaProfLabel;
  subjectFilter: string;
  boardFilter: string;
  sessionFilter: string;
  yearFilter: string;
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

  const [vivaItems, setVivaItems] = useState<VivaItem[]>(() => mergeVivaWithSeed([]));
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<VivaItem | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(false);
  const previewLayerRef = useRef<string | null>(null);
  const collegeFilterSelectRef = useRef<HTMLSelectElement | null>(null);

  // Filters (default profFilter='all' & collegeFilter='all' so all approved Viva entries render immediately)
  const [examinerView, setExaminerView] = useState<VivaViewTab>(
    savedFilters?.examinerView || 'all'
  );
  const [collegeFilter, setCollegeFilter] = useState<string>(
    savedFilters?.collegeFilter || 'all'
  );
  const [profFilter, setProfFilter] = useState<'all' | VivaProfLabel>(
    savedFilters?.profFilter || 'all'
  );
  const [subjectFilter, setSubjectFilter] = useState<string>(
    savedFilters?.subjectFilter || 'all'
  );
  const [boardFilter, setBoardFilter] = useState<string>(savedFilters?.boardFilter || 'all');
  const [sessionFilter, setSessionFilter] = useState<string>(savedFilters?.sessionFilter || 'all');
  const [yearFilter, setYearFilter] = useState<string>(savedFilters?.yearFilter || 'all');
  const [search, setSearch] = useState<string>(savedFilters?.search || '');

  // Share Viva Question / Suggestion Form
  const [showForm, setShowForm] = useState<boolean>(false);
  const formLayerRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formProf, setFormProf] = useState<VivaProfLabel>(() => profIdToVivaProf(selectedProf));
  const [formSubject, setFormSubject] = useState<string>(
    () => getSubjectsForProf(selectedProf, customTaxonomy)[0] || 'Anatomy'
  );
  const [formCustomSubject, setFormCustomSubject] = useState<string>('');
  const [formExaminerType, setFormExaminerType] = useState<VivaExaminerType>('External');
  const [formMarkSuggestion, setFormMarkSuggestion] = useState<boolean>(false);
  const [formBoardName, setFormBoardName] = useState<string>('');
  const [formSession, setFormSession] = useState<string>('');
  const [formYear, setFormYear] = useState<string>(String(new Date().getFullYear()));
  const [formTitle, setFormTitle] = useState<string>('');
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formAnswerHint, setFormAnswerHint] = useState<string>('');
  const [attachmentMode, setAttachmentMode] = useState<'none' | 'file' | 'link'>('none');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formFileUrl, setFormFileUrl] = useState<string>('');
  const [formContributorName, setFormContributorName] = useState<string>(
    userProfile?.fullName || ''
  );
  const [formContributorEmail, setFormContributorEmail] = useState<string>(
    userProfile?.email || ''
  );
  const [formBatch, setFormBatch] = useState<string>(userProfile?.batch || '');

  const initialCollegeOption = findMatchingVivaCollegeOption(
    userProfile?.college || DEFAULT_VIVA_COLLEGE
  );
  const isInitialListedCollege = VIVA_MEDICAL_COLLEGES.includes(initialCollegeOption);
  const [formCollegeChoice, setFormCollegeChoice] = useState<string>(
    isInitialListedCollege ? initialCollegeOption : VIVA_OTHER_COLLEGE_OPTION
  );
  const [formCustomCollege, setFormCustomCollege] = useState<string>(
    isInitialListedCollege ? '' : initialCollegeOption
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    saveSectionFilters<VivaFilterCache>(VIVA_FILTER_CACHE_KEY, {
      examinerView,
      collegeFilter,
      profFilter,
      subjectFilter,
      boardFilter,
      sessionFilter,
      yearFilter,
      search
    });
  }, [
    examinerView,
    collegeFilter,
    profFilter,
    subjectFilter,
    boardFilter,
    sessionFilter,
    yearFilter,
    search
  ]);

  useEffect(() => {
    return () => {
      if (formLayerRef.current) {
        markLayerInactive(formLayerRef.current);
        formLayerRef.current = null;
      }
      if (previewLayerRef.current) {
        markLayerInactive(previewLayerRef.current);
        previewLayerRef.current = null;
      }
    };
  }, [markLayerInactive]);

  const openFilePreview = (item: VivaItem) => {
    if (!item.file_url) return;
    setPreviewItem(item);
    if (!previewLayerRef.current) {
      previewLayerRef.current = pushSubLayer('Viva Questions', () => {
        previewLayerRef.current = null;
        setPreviewItem(null);
      });
    }
  };

  const closePdfPreview = () => {
    if (previewLayerRef.current) {
      const id = previewLayerRef.current;
      previewLayerRef.current = null;
      popSubLayer(id);
    } else {
      setPreviewItem(null);
    }
  };

  const applyFormCollegeValue = useCallback((rawCollege?: string) => {
    const matched = findMatchingVivaCollegeOption(rawCollege || DEFAULT_VIVA_COLLEGE);
    if (VIVA_MEDICAL_COLLEGES.includes(matched)) {
      setFormCollegeChoice(matched);
      setFormCustomCollege('');
    } else {
      setFormCollegeChoice(VIVA_OTHER_COLLEGE_OPTION);
      setFormCustomCollege(matched);
    }
  }, []);

  const openShareForm = (defaultAsSuggestion = false) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    if (defaultAsSuggestion) {
      setFormExaminerType('Suggestion');
      setFormMarkSuggestion(true);
    }
    if (collegeFilter !== 'all' && collegeFilter !== '__other__') {
      applyFormCollegeValue(collegeFilter);
    } else if (userProfile?.college) {
      applyFormCollegeValue(userProfile.college);
    }
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

  const handleExaminerViewChange = (nextView: VivaViewTab) => {
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
      applyFormCollegeValue(userProfile.college || DEFAULT_VIVA_COLLEGE);
    } else {
      setVivaItems([]);
      setShowForm(false);
      setLoadError(null);
    }
  }, [userProfile, applyFormCollegeValue]);

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
      setVivaItems(mergeVivaWithSeed(items.filter(item => item.status === 'approved')));
    } catch (err: any) {
      setVivaItems(mergeVivaWithSeed([]));
      setLoadError(sanitizeVivaErrorMessage(err?.message || 'Could not load Viva questions.'));
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

  // Available Medical Colleges (standard Bangladesh medical colleges + custom colleges from Sheet)
  const availableColleges = useMemo(() => {
    const keyMap = new Map<string, string>();
    VIVA_MEDICAL_COLLEGES.forEach(c => {
      keyMap.set(normalizeVivaCollegeKey(c), c);
    });
    vivaItems.forEach(item => {
      const clean = String(item.college_name || '').trim();
      if (!clean) return;
      const key = normalizeVivaCollegeKey(clean);
      if (!keyMap.has(key)) {
        keyMap.set(key, clean);
      }
    });
    return Array.from(keyMap.values());
  }, [vivaItems]);

  // Available boards dynamically extracted from loaded Viva items (scoped by college/prof/subject if active)
  const availableBoards = useMemo(() => {
    const set = new Set<string>();
    vivaItems.forEach(item => {
      if (!vivaCollegesMatch(item.college_name, collegeFilter)) return;
      if (profFilter !== 'all' && item.prof !== profFilter) return;
      if (subjectFilter !== 'all' && item.subject.toLowerCase() !== subjectFilter.toLowerCase()) {
        return;
      }
      if (item.board_name) set.add(item.board_name);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [vivaItems, collegeFilter, profFilter, subjectFilter]);

  // Available sessions (merge standard MBBS sessions with any custom session values from Sheet)
  const availableSessions = useMemo(() => {
    const set = new Set<string>(VIVA_SESSION_OPTIONS);
    vivaItems.forEach(item => {
      if (item.session) set.add(item.session);
    });
    return Array.from(set);
  }, [vivaItems]);

  // Available years dynamically collected from loaded items + standard year options
  const availableYears = useMemo(() => {
    const set = new Set<string>(VIVA_YEAR_SUGGESTIONS);
    vivaItems.forEach(item => {
      if (item.year) set.add(item.year);
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  }, [vivaItems]);

  // Deduplicated Viva contributor credits list (seeded credits + dynamic sheet contributors)
  const contributorCreditList = useMemo(() => {
    const map = new Map<string, VivaContributorCredit>();
    const normalizeName = (s: string) => s.trim().toLowerCase();

    VIVA_CONTRIBUTOR_CREDITS.forEach(c => {
      map.set(normalizeName(c.name), c);
    });

    vivaItems.forEach(item => {
      const name = String(item.contributor_name || '').trim();
      const lower = normalizeName(name);
      if (!name || lower === 'student contributor' || lower === 'anonymous student') return;
      const existing = map.get(lower);
      if (existing) {
        if (!existing.batch && item.batch) {
          map.set(lower, { ...existing, batch: item.batch.trim() });
        }
      } else {
        map.set(lower, {
          name,
          batch: String(item.batch || '').trim(),
          note: item.is_suggestion ? 'Viva Suggestion Contributor' : 'Viva Bank Contributor'
        });
      }
    });

    return Array.from(map.values());
  }, [vivaItems]);

  const baseFilteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vivaItems.filter(item => {
      if (item.status !== 'approved') return false;
      if (!vivaCollegesMatch(item.college_name, collegeFilter)) return false;
      if (profFilter !== 'all' && item.prof !== profFilter) return false;
      if (subjectFilter !== 'all' && item.subject.toLowerCase() !== subjectFilter.toLowerCase()) {
        return false;
      }
      if (boardFilter !== 'all' && item.board_name.toLowerCase() !== boardFilter.toLowerCase()) {
        return false;
      }
      if (sessionFilter !== 'all' && item.session.toLowerCase() !== sessionFilter.toLowerCase()) {
        return false;
      }
      if (yearFilter !== 'all' && item.year.toLowerCase() !== yearFilter.toLowerCase()) {
        return false;
      }
      if (q) {
        const hay = `${item.title || ''} ${item.question} ${item.answer_hint} ${item.file_name || ''} ${item.subject} ${item.board_name} ${item.prof} ${item.examiner_type} ${item.session} ${item.year} ${item.is_suggestion ? 'viva suggestion high yield pdf image' : ''} ${item.contributor_name} ${item.batch} ${item.college_name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    vivaItems,
    collegeFilter,
    profFilter,
    subjectFilter,
    boardFilter,
    sessionFilter,
    yearFilter,
    search
  ]);

  const externalQuestions = useMemo(
    () =>
      baseFilteredItems.filter(
        item => item.examiner_type === 'External' && !item.is_suggestion
      ),
    [baseFilteredItems]
  );

  const internalQuestions = useMemo(
    () =>
      baseFilteredItems.filter(
        item => item.examiner_type === 'Internal' && !item.is_suggestion
      ),
    [baseFilteredItems]
  );

  const suggestionQuestions = useMemo(
    () =>
      baseFilteredItems.filter(
        item =>
          item.is_suggestion ||
          item.viva_type === 'suggestion' ||
          item.examiner_type === 'Suggestion'
      ),
    [baseFilteredItems]
  );

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitError(null);
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError('Please select a PDF or Image file (JPG, PNG, or WebP).');
      e.target.value = '';
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_VIVA_FILE_BYTES) {
      setSubmitError('File exceeds the 10 MB limit. Please upload a smaller PDF or image.');
      e.target.value = '';
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

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
    const effectiveCollegeName =
      formCollegeChoice === VIVA_OTHER_COLLEGE_OPTION
        ? formCustomCollege.trim()
        : formCollegeChoice.trim();
    const isSuggestionSubmission =
      formExaminerType === 'Suggestion' || formMarkSuggestion;
    const hasFileUpload = attachmentMode === 'file' && Boolean(selectedFile);
    const hasExternalLink = attachmentMode === 'link' && Boolean(formFileUrl.trim());
    const hasWrittenQuestionOrTitle = Boolean(formQuestion.trim() || formTitle.trim());

    if (!effectiveCollegeName) {
      setSubmitError('Please select or enter your Medical College name.');
      return;
    }
    if (!effectiveSubject) {
      setSubmitError('Please select or enter a subject.');
      return;
    }
    if (!formSession.trim()) {
      setSubmitError('Please select the exam Session (e.g., May, November).');
      return;
    }
    if (!formYear.trim()) {
      setSubmitError('Please enter the Year (e.g., 2026).');
      return;
    }
    if (!formContributorName.trim()) {
      setSubmitError('Please enter the Contributor Name for credit.');
      return;
    }
    if (!formBatch.trim()) {
      setSubmitError('Please enter your Batch (e.g., CMC-67).');
      return;
    }
    if (attachmentMode === 'file' && !selectedFile) {
      setSubmitError('Please choose a PDF or Image file (max 10 MB), or switch attachment mode.');
      return;
    }
    if (attachmentMode === 'link' && !formFileUrl.trim()) {
      setSubmitError('Please paste an external Google Drive or PDF/Image link.');
      return;
    }
    if (!hasWrittenQuestionOrTitle && !hasFileUpload && !hasExternalLink) {
      setSubmitError(
        'Please enter a Topic/Question or attach a PDF, Image, or External Drive/PDF link.'
      );
      return;
    }

    const effectiveBoard =
      formBoardName.trim() || (isSuggestionSubmission ? 'High-Yield Suggestion' : '');
    const effectiveQuestion =
      formQuestion.trim() || formTitle.trim();

    setSubmitting(true);
    try {
      let file_base64 = '';
      let file_name = '';
      let mime_type = '';
      let file_url = '';
      let file_type: VivaFileType = 'none';

      if (hasFileUpload && selectedFile) {
        const encoded = await vivaFileToBase64(selectedFile);
        file_base64 = encoded.file_base64;
        file_name = encoded.file_name;
        mime_type = encoded.mime_type;
        file_type = encoded.mime_type.startsWith('image/') ? 'image' : 'pdf';
      } else if (hasExternalLink) {
        file_url = formFileUrl.trim();
        file_type = 'link';
      }

      await submitVivaToAppsScript({
        prof: formProf,
        subject: effectiveSubject,
        examiner_type: formExaminerType,
        board_name: effectiveBoard,
        question: effectiveQuestion,
        answer_hint: formAnswerHint.trim(),
        contributor_name: formContributorName.trim(),
        contributor_email: formContributorEmail.trim() || userProfile.email || '',
        batch: formBatch.trim(),
        college_name: effectiveCollegeName || DEFAULT_VIVA_COLLEGE,
        session: formSession.trim(),
        year: formYear.trim(),
        viva_type: isSuggestionSubmission ? 'suggestion' : 'regular',
        is_suggestion: isSuggestionSubmission,
        title: formTitle.trim() || undefined,
        file_name,
        mime_type,
        file_base64,
        file_url,
        file_type,
        status: 'pending',
        is_admin: isAdminUser(userProfile)
      });

      const submittedMsg =
        'Submitted for admin review! It will be published publicly once approved by the admin.';
      setSubmitSuccess(submittedMsg);
      setActionSuccess(submittedMsg);

      setFormTitle('');
      setFormQuestion('');
      setFormAnswerHint('');
      setFormFileUrl('');
      setSelectedFile(null);
      setAttachmentMode('none');
      setFormCustomSubject('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await loadVivaItems();
    } catch (err: any) {
      setSubmitError(sanitizeVivaErrorMessage(err?.message || 'Failed to submit Viva entry.'));
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
      setActionError(sanitizeVivaErrorMessage(err?.message || 'Failed to delete Viva question.'));
    } finally {
      setDeletingId(null);
    }
  };

  const resetFilters = () => {
    setCollegeFilter('all');
    setProfFilter('all');
    setSubjectFilter('all');
    setBoardFilter('all');
    setSessionFilter('all');
    setYearFilter('all');
    setSearch('');
  };

  const hasActiveFilters =
    Boolean(search) ||
    collegeFilter !== 'all' ||
    profFilter !== 'all' ||
    subjectFilter !== 'all' ||
    boardFilter !== 'all' ||
    sessionFilter !== 'all' ||
    yearFilter !== 'all';

  const renderVivaCard = (item: VivaItem) => {
    const isSuggestion =
      item.is_suggestion ||
      item.viva_type === 'suggestion' ||
      item.examiner_type === 'Suggestion';
    const isExternal = item.examiner_type === 'External';
    const showExaminerBadge = item.examiner_type !== 'Suggestion';
    const sessionYearLabel = [item.session, item.year].filter(Boolean).join(' ');
    const hasFileUrl = Boolean(item.file_url && item.file_url.trim());
    const isImageFile = hasFileUrl && isVivaImageItem(item);
    const showProminentCredit = Boolean(item.is_seeded || hasFileUrl);
    const creditLabel = formatVivaContributorCredit(item.contributor_name, item.batch);

    return (
      <article
        key={item.id}
        className={`bg-[var(--card)] border rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 ${
          isSuggestion
            ? 'border-violet-500/35 dark:border-violet-400/30'
            : 'border-[var(--line)]'
        }`}
      >
        <div className="space-y-2.5 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {isSuggestion && (
                <span className="px-2.5 py-0.5 rounded-md font-extrabold text-[11px] uppercase tracking-wider border bg-violet-500/12 text-violet-700 dark:text-violet-300 border-violet-500/35 inline-flex items-center gap-1">
                  <Sparkles size={11} className="shrink-0" />
                  <span>Viva Suggestion</span>
                </span>
              )}
              {hasFileUrl && (
                <span
                  className={`px-2 py-0.5 rounded-md font-extrabold text-[11px] uppercase tracking-wider border inline-flex items-center gap-1 ${
                    isImageFile
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
                  }`}
                >
                  {isImageFile ? (
                    <ImageIcon size={10} className="shrink-0" />
                  ) : (
                    <FileText size={10} className="shrink-0" />
                  )}
                  <span>{isImageFile ? 'Image' : 'PDF'}</span>
                </span>
              )}
              {showExaminerBadge && (
                <span
                  className={`px-2.5 py-0.5 rounded-md font-extrabold text-[11px] uppercase tracking-wider border ${
                    isExternal
                      ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                      : 'bg-teal-500/10 text-[#0D9488] border-teal-500/30'
                  }`}
                >
                  {item.examiner_type} Examiner
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--line)] font-bold text-[11px] text-[var(--ink)]">
                {item.prof}
              </span>
              {item.board_name && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 font-bold text-[11px] text-amber-800 dark:text-amber-300">
                  {item.board_name}
                </span>
              )}
              {sessionYearLabel && (
                <span className="px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/30 font-bold text-[11px] text-sky-800 dark:text-sky-300 inline-flex items-center gap-1">
                  <Calendar size={10} className="shrink-0" />
                  <span>{sessionYearLabel}</span>
                </span>
              )}
              {item.college_name && (
                <span className="px-2 py-0.5 rounded-md bg-teal-500/8 border border-teal-500/25 font-bold text-[11px] text-[#0D9488] inline-flex items-center gap-1 max-w-full">
                  <Building2 size={10} className="shrink-0" />
                  <span className="truncate max-w-[210px]">{item.college_name}</span>
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#0D9488]">{item.subject}</span>
          </div>

          {item.title && (
            <h3 className="text-sm sm:text-base font-extrabold text-[var(--ink)] leading-snug m-0 break-words">
              {item.title}
            </h3>
          )}

          {item.question ? (
            <p className="text-sm sm:text-[14.5px] font-medium text-[var(--ink-secondary)] leading-relaxed m-0 break-words whitespace-pre-line">
              {item.question}
            </p>
          ) : (
            hasFileUrl && (
              <p className="text-sm font-bold text-[var(--ink)] leading-relaxed m-0 break-words">
                {item.file_name || `${item.subject} ${isSuggestion ? 'Viva Suggestion' : 'Viva'} Attachment`}
              </p>
            )
          )}

          {hasFileUrl && item.file_url ? (
            <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                    isImageFile
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-300'
                  }`}
                >
                  {isImageFile ? <ImageIcon size={15} /> : <FileText size={15} />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink)] truncate">
                    {item.file_name ||
                      item.title ||
                      `${item.subject} Viva ${isImageFile ? 'Image' : 'PDF'}`}
                  </div>
                  <div className="text-[11px] text-[var(--mut)]">
                    Credit: {creditLabel}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openFilePreview(item)}
                  className="btn sm min-h-[36px]"
                >
                  <Eye size={13} />
                  <span>{isImageFile ? 'View Image' : 'View PDF'}</span>
                </button>
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn sm alt no-underline min-h-[36px]"
                >
                  <ExternalLink size={13} />
                  <span>Open</span>
                </a>
              </div>
            </div>
          ) : item.is_seeded ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 min-w-0">
                <FileText size={15} className="shrink-0" />
                <span className="font-semibold">
                  PDF link configurable — add Google Drive / PDF URL in{' '}
                  <code className="px-1 py-0.5 rounded bg-amber-500/15 font-mono text-[11px]">
                    src/data/vivaSeed.ts
                  </code>
                </span>
              </div>
            </div>
          ) : null}

          {item.answer_hint && (
            <div className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs space-y-1">
              <div className="font-extrabold uppercase tracking-wider text-[10.5px] text-[#0D9488]">
                {hasFileUrl || item.is_seeded ? 'Coverage & Notes' : 'Answer Hint / Approach'}
              </div>
              <p className="text-[var(--ink-secondary)] m-0 leading-relaxed whitespace-pre-line break-words">
                {item.answer_hint}
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-[var(--line-light)] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[var(--mut)] min-w-0">
            {showProminentCredit ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/25 font-extrabold text-[#0D9488] truncate">
                <Award size={13} className="shrink-0" />
                <span className="truncate">Credit: {creditLabel}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink)] truncate">
                <User size={12} className="text-[#0D9488] shrink-0" />
                <span className="truncate">{creditLabel}</span>
              </span>
            )}
          </div>

          {isAdminUser(userProfile) && !item.is_seeded && (
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
          {isAdminUser(userProfile) && item.is_seeded && (
            <span className="text-[11px] font-bold text-[var(--mut)] px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--line)]">
              Seeded Viva PDF
            </span>
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
            Browse External, Internal, and Viva Suggestion topics by Professional Exam, Board, Session, Year, and Subject, or share your own viva experience.
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
              onClick={() => (showForm ? closeShareForm() : openShareForm(examinerView === 'Suggestion'))}
              className="btn min-h-[42px]"
            >
              <MessageSquarePlus size={15} />
              <span>{showForm ? 'Hide Viva Form' : 'Share Viva Question'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Promotional / Notice Banner for All Medical Colleges */}
      {!bannerDismissed && (
        <div className="relative overflow-hidden rounded-2xl border border-teal-500/35 bg-gradient-to-br from-teal-500/10 via-[var(--card)] to-violet-500/10 p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pr-7 sm:pr-8">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0D9488] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  <Megaphone size={11} className="shrink-0" />
                  <span>Now Live &middot; Open For All Medical Colleges</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/12 border border-violet-500/30 text-violet-700 dark:text-violet-300 text-[11px] font-bold">
                  <Sparkles size={11} className="shrink-0" />
                  <span>Viva Suggestions &amp; PDF/Image Uploads</span>
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-[var(--ink)] m-0 leading-snug">
                Students from ANY Medical College can now browse &amp; contribute Viva Questions, Suggestions, PDFs &amp; Images
              </h2>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] m-0 leading-relaxed">
                Select your Medical College below to view college-specific Internal/External Viva questions and high-yield Viva Suggestions, or upload your own questions, PDFs, and notes for your batchmates across Bangladesh.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (!userProfile) {
                    onOpenAuth('signin');
                    return;
                  }
                  collegeFilterSelectRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                  setTimeout(() => collegeFilterSelectRef.current?.focus(), 250);
                }}
                className="btn sm alt min-h-[38px]"
              >
                <Building2 size={13} />
                <span>Select Medical College</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!userProfile) {
                    onOpenAuth('signin');
                    return;
                  }
                  openShareForm(examinerView === 'Suggestion');
                }}
                className="btn sm min-h-[38px]"
              >
                <MessageSquarePlus size={13} />
                <span>Share Viva / Suggestion</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
            aria-label="Dismiss notice banner"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {!userProfile ? (
        <AuthRequiredCard
          title="Sign In to View Viva Question Bank"
          description="An account is required to view uploaded Viva board questions, Viva Suggestions, and submit your viva experiences."
          onOpenAuth={onOpenAuth}
        />
      ) : (
        <>
          {/* Share Viva Question / Suggestion Form */}
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
                    Share Viva Question / Suggestion
                  </h2>
                  <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                    Open for all students — attach a PDF, image (up to 10 MB), or Google Drive link. Submissions enter the admin review queue before publishing.
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

              {/* Entry / Examiner Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[var(--ink)]">
                  Examiner / Viva Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl">
                  {(
                    [
                      { id: 'External' as VivaExaminerType, label: 'External Examiner', icon: Users },
                      { id: 'Internal' as VivaExaminerType, label: 'Internal Examiner', icon: UserCheck },
                      { id: 'Suggestion' as VivaExaminerType, label: 'Viva Suggestion', icon: Sparkles }
                    ]
                  ).map(opt => {
                    const Icon = opt.icon;
                    const active = formExaminerType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setFormExaminerType(opt.id);
                          setFormMarkSuggestion(opt.id === 'Suggestion');
                        }}
                        className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold min-h-[44px] flex items-center justify-center gap-2 transition-all ${
                          active
                            ? opt.id === 'Suggestion'
                              ? 'border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-1 ring-violet-500'
                              : 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488] ring-1 ring-[#0D9488]'
                            : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink-secondary)]'
                        }`}
                      >
                        <Icon size={15} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {formExaminerType !== 'Suggestion' && (
                  <label className="inline-flex items-center gap-2 pt-1 text-xs font-semibold text-[var(--ink-secondary)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formMarkSuggestion}
                      onChange={e => setFormMarkSuggestion(e.target.checked)}
                      className="!w-4 !h-4 rounded"
                    />
                    <span>Also mark as a High-Yield Viva Suggestion</span>
                  </label>
                )}
              </div>

              {/* Prof, Subject, Board Name, Session, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
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
                    Board Name <span className="text-[var(--mut)] font-normal">(Optional)</span>
                  </label>
                  <input
                    value={formBoardName}
                    onChange={e => setFormBoardName(e.target.value)}
                    list="viva-board-suggestions"
                    placeholder={
                      formExaminerType === 'Suggestion'
                        ? 'e.g. High-Yield / Board 1'
                        : 'e.g. Board 1, Board 2'
                    }
                    className="min-h-[44px] text-sm"
                  />
                  <datalist id="viva-board-suggestions">
                    {Array.from(new Set([...DEFAULT_BOARD_SUGGESTIONS, ...availableBoards])).map(b => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Session *
                  </label>
                  <select
                    value={formSession}
                    onChange={e => setFormSession(e.target.value)}
                    required
                    className="min-h-[44px] text-sm"
                  >
                    <option value="">Select Session...</option>
                    {VIVA_SESSION_OPTIONS.map(sess => (
                      <option key={sess} value={sess}>
                        {sess}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Year *
                  </label>
                  <input
                    value={formYear}
                    onChange={e => setFormYear(e.target.value)}
                    list="viva-year-suggestions"
                    placeholder="e.g. 2026"
                    required
                    className="min-h-[44px] text-sm"
                  />
                  <datalist id="viva-year-suggestions">
                    {VIVA_YEAR_SUGGESTIONS.map(yr => (
                      <option key={yr} value={yr} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Topic/Title, Written Question, Attachment (PDF/Image/Link), Answer Hint */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Topic / Title{' '}
                    <span className="text-[var(--mut)] font-normal">
                      (Recommended when uploading a PDF or image)
                    </span>
                  </label>
                  <input
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. CMC Physiology Prof Viva — Organized Bank"
                    className="min-h-[42px] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    {formExaminerType === 'Suggestion'
                      ? 'Viva Suggestion Description / Questions'
                      : 'Viva Question / Examiner Experience'}{' '}
                    <span className="text-[var(--mut)] font-normal">
                      (Optional if PDF, image, or link is attached)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={formQuestion}
                    onChange={e => setFormQuestion(e.target.value)}
                    placeholder={
                      formExaminerType === 'Suggestion'
                        ? 'Write the high-yield viva suggestion topic or leave brief if attaching a PDF/image...'
                        : 'Write the exact question(s) asked or viva board scenario (optional if uploading a file)...'
                    }
                    className="text-sm"
                  />
                </div>

                {/* Attachment Mode Selector: Text only / PDF or Image Upload / External Link */}
                <div className="space-y-2.5 p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
                  <label className="block text-xs font-bold text-[var(--ink)]">
                    Attach PDF, Image, or External Link (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAttachmentMode('none');
                        setSelectedFile(null);
                        setFormFileUrl('');
                      }}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold min-h-[40px] flex items-center justify-center gap-1.5 ${
                        attachmentMode === 'none'
                          ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488]'
                          : 'border-[var(--line)] bg-[var(--card)] text-[var(--ink-secondary)]'
                      }`}
                    >
                      <span>No File Attachment</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachmentMode('file');
                        setFormFileUrl('');
                      }}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold min-h-[40px] flex items-center justify-center gap-1.5 ${
                        attachmentMode === 'file'
                          ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488]'
                          : 'border-[var(--line)] bg-[var(--card)] text-[var(--ink-secondary)]'
                      }`}
                    >
                      <Upload size={13} />
                      <span>Upload PDF / Image (≤ 10MB)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachmentMode('link');
                        setSelectedFile(null);
                      }}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold min-h-[40px] flex items-center justify-center gap-1.5 ${
                        attachmentMode === 'link'
                          ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488]'
                          : 'border-[var(--line)] bg-[var(--card)] text-[var(--ink-secondary)]'
                      }`}
                    >
                      <Link2 size={13} />
                      <span>Google Drive / External Link</span>
                    </button>
                  </div>

                  {attachmentMode === 'file' && (
                    <div className="space-y-2 pt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf,image/jpeg,image/png,image/webp"
                        onChange={handleFileSelected}
                        className="text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0D9488] file:text-white hover:file:opacity-90"
                      />
                      {selectedFile && (
                        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[var(--card)] border border-[var(--line)] text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            {selectedFile.type.startsWith('image/') ? (
                              <ImageIcon size={14} className="text-emerald-600 shrink-0" />
                            ) : (
                              <FileText size={14} className="text-rose-600 shrink-0" />
                            )}
                            <span className="font-bold text-[var(--ink)] truncate">
                              {selectedFile.name}
                            </span>
                            <span className="text-[var(--mut)] shrink-0">
                              ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="text-[var(--mut)] hover:text-rose-600"
                            aria-label="Remove selected file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {attachmentMode === 'link' && (
                    <div className="pt-1">
                      <input
                        type="url"
                        value={formFileUrl}
                        onChange={e => setFormFileUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/.../view"
                        className="min-h-[42px] text-sm"
                      />
                    </div>
                  )}
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

              {/* Contributor Info & Quick-Select Credits */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--mut)]">
                    Quick-Select Contributor Credit:
                  </span>
                  {userProfile?.fullName && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormContributorName(userProfile.fullName);
                        if (userProfile.batch) setFormBatch(userProfile.batch);
                        if (userProfile.college) applyFormCollegeValue(userProfile.college);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors ${
                        formContributorName.trim().toLowerCase() ===
                        userProfile.fullName.trim().toLowerCase()
                          ? 'border-[#0D9488] bg-teal-500/10 text-[#0D9488]'
                          : 'border-[var(--line)] bg-[var(--bg-subtle)] text-[var(--ink-secondary)] hover:border-[#0D9488]'
                      }`}
                    >
                      My Profile ({formatVivaContributorCredit(userProfile.fullName, userProfile.batch)})
                    </button>
                  )}
                  {contributorCreditList.map(c => {
                    const label = formatVivaContributorCredit(c.name, c.batch);
                    const isActive =
                      formContributorName.trim().toLowerCase() === c.name.trim().toLowerCase();
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => {
                          setFormContributorName(c.name);
                          if (c.batch) setFormBatch(c.batch);
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors ${
                          isActive
                            ? 'border-[#0D9488] bg-teal-500/10 text-[#0D9488]'
                            : 'border-[var(--line)] bg-[var(--bg-subtle)] text-[var(--ink-secondary)] hover:border-[#0D9488]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Contributor Name (Credit) *
                    </label>
                    <input
                      value={formContributorName}
                      onChange={e => setFormContributorName(e.target.value)}
                      list="viva-contributor-suggestions"
                      placeholder="e.g. MD. Naimur Rahman Naim"
                      required
                      className="min-h-[42px] text-sm"
                    />
                    <datalist id="viva-contributor-suggestions">
                      {contributorCreditList.map(c => (
                        <option key={c.name} value={c.name} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Batch *
                    </label>
                    <input
                      value={formBatch}
                      onChange={e => setFormBatch(e.target.value)}
                      placeholder="e.g. CMC-67"
                      required
                      className="min-h-[42px] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Medical College *
                    </label>
                    <select
                      value={formCollegeChoice}
                      onChange={e => setFormCollegeChoice(e.target.value)}
                      required
                      className="min-h-[42px] text-sm"
                    >
                      {VIVA_MEDICAL_COLLEGES.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value={VIVA_OTHER_COLLEGE_OPTION}>{VIVA_OTHER_COLLEGE_OPTION}...</option>
                    </select>
                    {formCollegeChoice === VIVA_OTHER_COLLEGE_OPTION && (
                      <input
                        value={formCustomCollege}
                        onChange={e => setFormCustomCollege(e.target.value)}
                        placeholder="Enter full Medical College name"
                        required
                        className="mt-2 min-h-[40px] text-sm"
                      />
                    )}
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
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button type="submit" disabled={submitting} className="btn min-h-[44px]">
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  <span>
                    {submitting
                      ? 'Submitting for Review...'
                      : formExaminerType === 'Suggestion' || formMarkSuggestion
                        ? 'Submit Viva Suggestion'
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

          {/* Examiner Type & Viva Suggestion Subsegment Tabs */}
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
              All ({baseFilteredItems.length})
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
              <span>External ({externalQuestions.length})</span>
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
              <span>Internal ({internalQuestions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => handleExaminerViewChange('Suggestion')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] flex items-center gap-1.5 ${
                examinerView === 'Suggestion'
                  ? 'bg-violet-600 text-white'
                  : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
              }`}
            >
              <Sparkles size={13} />
              <span>Viva Suggestion ({suggestionQuestions.length})</span>
            </button>
          </div>

          {/* Filters Card: Medical College, Prof-wise, Subject, Board-wise, Session, Year, Search */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search viva questions, suggestions, medical colleges, boards, sessions, years, or subjects..."
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
                  Medical College
                </label>
                <select
                  ref={collegeFilterSelectRef}
                  value={collegeFilter}
                  onChange={e => {
                    setCollegeFilter(e.target.value);
                    setBoardFilter('all');
                  }}
                  className="text-sm min-h-[42px]"
                >
                  <option value="all">All Medical Colleges</option>
                  {availableColleges.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__other__">Other / Custom Colleges</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
                  Prof-wise
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
                  Board-wise
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

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
                  Session
                </label>
                <select
                  value={sessionFilter}
                  onChange={e => setSessionFilter(e.target.value)}
                  className="text-sm min-h-[42px]"
                >
                  <option value="all">All Sessions</option>
                  {availableSessions.map(sess => (
                    <option key={sess} value={sess}>
                      {sess}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
                  Year
                </label>
                <select
                  value={yearFilter}
                  onChange={e => setYearFilter(e.target.value)}
                  className="text-sm min-h-[42px]"
                >
                  <option value="all">All Years</option>
                  {availableYears.map(yr => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                <div className="text-xs text-[var(--mut)]">
                  {collegeFilter !== 'all' && (
                    <span>
                      Showing results for{' '}
                      <strong className="text-[var(--ink)]">
                        {collegeFilter === '__other__' ? 'Other / Custom Colleges' : collegeFilter}
                      </strong>
                    </span>
                  )}
                </div>
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
                  ? 'Share an External, Internal, or Viva Suggestion entry for fellow students.'
                  : 'Try switching Medical College, Prof, Subject, Board, Session, or Year filters, or contribute the first entry for this college.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {vivaItems.length > 0 && (
                  <button type="button" onClick={resetFilters} className="btn sm alt min-h-[40px]">
                    <RotateCcw size={13} /> Show All Filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openShareForm(examinerView === 'Suggestion')}
                  className="btn sm min-h-[40px]"
                >
                  <MessageSquarePlus size={13} /> Share Viva Question
                </button>
              </div>
            </div>
          ) : examinerView === 'Suggestion' ? (
            <section className="space-y-3">
              <h2 className="text-base font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
                <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
                <span>Viva Suggestion List ({suggestionQuestions.length})</span>
              </h2>
              {suggestionQuestions.length === 0 ? (
                <div className="empty text-xs space-y-2">
                  <div>No Viva Suggestions match your active filters.</div>
                  <button
                    type="button"
                    onClick={() => openShareForm(true)}
                    className="btn sm"
                  >
                    <Sparkles size={13} /> Share a Viva Suggestion
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestionQuestions.map(renderVivaCard)}
                </div>
              )}
            </section>
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
              {/* Viva Suggestion Subsegment (shown prominently in All view when items exist) */}
              {suggestionQuestions.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[var(--line-light)] pb-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0 flex items-center gap-2">
                      <Sparkles size={17} className="text-violet-600 dark:text-violet-400" />
                      <span>Viva Suggestions ({suggestionQuestions.length})</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestionQuestions.map(renderVivaCard)}
                  </div>
                </section>
              )}

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

      {/* Inline File Preview Modal for Viva PDFs & Images */}
      {previewItem && previewItem.file_url && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closePdfPreview}
        >
          <div className="modal-content !max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="min-w-0 pr-3 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={closePdfPreview}
                  className="btn sm alt shrink-0 min-h-[36px]"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0D9488] flex flex-wrap items-center gap-2">
                    <span>
                      {previewItem.subject} &middot; {previewItem.prof}
                    </span>
                    {previewItem.college_name && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--line)] text-[var(--ink)] font-bold">
                        <Building2 size={11} />
                        <span>{previewItem.college_name}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/25 text-[#0D9488] font-extrabold">
                      <Award size={11} />
                      <span>
                        Credit: {formatVivaContributorCredit(previewItem.contributor_name, previewItem.batch)}
                      </span>
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-[var(--ink)] truncate mt-0.5">
                    {previewItem.title ||
                      previewItem.file_name ||
                      `${previewItem.subject} Viva ${isVivaImageItem(previewItem) ? 'Image' : 'Suggestion'}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewItem.file_url}
                  download={previewItem.file_name || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn sm alt no-underline min-h-[38px]"
                >
                  <Download size={13} /> Download
                </a>
                <a
                  href={previewItem.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn sm alt no-underline min-h-[38px]"
                >
                  <ExternalLink size={13} /> Open Tab
                </a>
                <button
                  type="button"
                  onClick={closePdfPreview}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--card)]"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
              {(() => {
                const rawUrl = previewItem.file_url || '';
                const driveMatch =
                  rawUrl.match(/drive\.google\.com\/file\/d\/([^/?#]+)/i) ||
                  rawUrl.match(/drive\.google\.com\/open\?id=([^&#]+)/i);
                const driveId = driveMatch?.[1];

                if (driveId) {
                  return (
                    <iframe
                      src={`https://drive.google.com/file/d/${driveId}/preview`}
                      title={previewItem.title || previewItem.file_name || `${previewItem.subject} Viva File`}
                      className="w-full h-[68dvh] rounded-lg border border-[var(--line)] bg-white"
                    />
                  );
                }

                if (isVivaImageItem(previewItem)) {
                  return (
                    <img
                      src={rawUrl}
                      alt={previewItem.title || previewItem.file_name || `${previewItem.subject} Viva Image`}
                      className="w-full max-h-[68dvh] object-contain rounded-lg border border-[var(--line)] bg-[var(--bg-subtle)]"
                    />
                  );
                }

                return (
                  <iframe
                    src={rawUrl}
                    title={previewItem.title || previewItem.file_name || `${previewItem.subject} Viva PDF`}
                    className="w-full h-[68dvh] rounded-lg border border-[var(--line)] bg-white"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
