import React, { useEffect, useState } from 'react';
import {
  FileUp,
  Image as ImageIcon,
  Link2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Trash2,
  ExternalLink,
  RefreshCw,
  Clock,
  ShieldCheck,
  FileText,
  Plus,
  ArrowLeft
} from 'lucide-react';
import {
  BookmarkRecord,
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  PublishedPaper,
  QuestionSubmission,
  RecentlyViewedRecord,
  StudyState,
  SubmissionCategory,
  SubmissionMethod,
  UserProfile
} from '../types';
import { MEDICAL_COLLEGES_BD } from '../data/archiveHelpers';
import {
  getMergedProfConfigs,
  getPapersForSubjectInProf,
  getSubjectsForProf
} from '../data/curriculumConfig';
import { CommunityUploadsView } from './CommunityUploadsView';
import {
  fileToBase64,
  listPapersRawFromAppsScript,
  mapAppsScriptPaperToSubmission,
  submitPaperToAppsScript
} from '../utils/appsScriptArchive';
import { isAdminUser } from '../utils/appsScriptAuth';
import { AuthRequiredCard } from './AuthRequiredCard';
import { useBackNav } from '../utils/BackNavContext';

interface SubmitQuestionPapersProps {
  selectedProf: ProfessionalExamId;
  userProfile: UserProfile | null;
  authToken: string | null;
  publishedPapers: PublishedPaper[];
  customTaxonomy: CustomTaxonomy;
  studyState?: StudyState;
  onToggleBookmark?: (item: Omit<BookmarkRecord, 'savedAt'>) => void;
  onRecordRecentView?: (item: Omit<RecentlyViewedRecord, 'viewedAt'>) => void;
  onPaperSubmitted?: () => Promise<void>;
  onDeletePaper?: (id: string) => Promise<void>;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  initialHubTab?: 'submit' | 'community';
  onNavigate: (page: PageRoute) => void;
}

interface LocalTrackingToken {
  id: string;
  key: string;
}

const STORAGE_TRACK_KEY = 'cmc_my_submission_tokens';

function loadSavedTrackingTokens(): LocalTrackingToken[] {
  try {
    const raw = localStorage.getItem(STORAGE_TRACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTrackingToken(id: string, key: string) {
  const existing = loadSavedTrackingTokens().filter(t => t.id !== id);
  existing.unshift({ id, key });
  localStorage.setItem(STORAGE_TRACK_KEY, JSON.stringify(existing.slice(0, 50)));
}

export const SubmitQuestionPapers: React.FC<SubmitQuestionPapersProps> = ({
  selectedProf,
  userProfile,
  authToken,
  publishedPapers,
  customTaxonomy,
  studyState,
  onToggleBookmark,
  onRecordRecentView,
  onPaperSubmitted,
  onDeletePaper,
  onOpenAuth,
  initialHubTab = 'submit',
  onNavigate
}) => {
  const { pushSubLayer } = useBackNav();
  const [hubTab, setHubTab] = useState<'submit' | 'community'>(initialHubTab);
  const [activeView, setActiveView] = useState<'form' | 'track'>('form');

  useEffect(() => {
    setHubTab(initialHubTab);
  }, [initialHubTab]);

  const switchHubTab = (nextHub: 'submit' | 'community') => {
    if (nextHub === hubTab) return;
    const prevHub = hubTab;
    pushSubLayer(
      prevHub === 'submit' ? 'Submit Question Papers' : 'Community Uploads',
      () => setHubTab(prevHub)
    );
    setHubTab(nextHub);
    if (nextHub === 'submit') {
      setActiveView('form');
    }
  };

  const switchActiveView = (nextView: 'form' | 'track') => {
    if (nextView === activeView) return;
    const prevView = activeView;
    pushSubLayer(
      prevView === 'form' ? 'Submission Form' : 'Track My Submissions',
      () => setActiveView(prevView)
    );
    setActiveView(nextView);
  };

  const profPaperCount = publishedPapers.filter(
    p =>
      p.classificationRole !== 'Phase Teaching / Formative Subject' &&
      (p.professionalExam || 'First Professional') === selectedProf
  ).length;

  // Form Metadata
  const [formProf, setFormProf] = useState<ProfessionalExamId>(selectedProf);
  const [category, setCategory] = useState<SubmissionCategory>('Card');
  const [method, setMethod] = useState<SubmissionMethod>('pdf');
  const [collegeChoice, setCollegeChoice] = useState<string>(
    userProfile?.collegeName && MEDICAL_COLLEGES_BD.includes(userProfile.collegeName)
      ? userProfile.collegeName
      : 'Chittagong Medical College (CMC)'
  );
  const [customCollege, setCustomCollege] = useState<string>('');
  const [examName, setExamName] = useState<string>('');
  const [subject, setSubject] = useState<string>(
    getSubjectsForProf(selectedProf, customTaxonomy)[0] || 'Anatomy'
  );
  const [paper, setPaper] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [year, setYear] = useState<string>(String(new Date().getFullYear()));
  const [session, setSession] = useState<string>('');
  const [collectionType] = useState<string>('Scanned Question Paper');
  const [description, setDescription] = useState<string>('');
  const [contributorName, setContributorName] = useState<string>(userProfile?.fullName || '');
  const [contributorBatch, setContributorBatch] = useState<string>(userProfile?.batch || '');

  const profConfigs = getMergedProfConfigs(customTaxonomy);
  const subjectsForFormProf = getSubjectsForProf(formProf, customTaxonomy);
  const papersForFormSubject = getPapersForSubjectInProf(formProf, subject, customTaxonomy);

  // Sync default formProf and subject whenever global selectedProf switches
  useEffect(() => {
    setFormProf(selectedProf);
    const subs = getSubjectsForProf(selectedProf, customTaxonomy);
    if (subs.length > 0) setSubject(subs[0]);
    setPaper('');
  }, [selectedProf, customTaxonomy]);

  // Keep selected subject valid when user manually switches Professional Exam in form
  const handleFormProfChange = (nextProf: ProfessionalExamId) => {
    setFormProf(nextProf);
    const subs = getSubjectsForProf(nextProf, customTaxonomy);
    if (subs.length > 0 && !subs.includes(subject)) {
      setSubject(subs[0]);
    }
    setPaper('');
  };

  // Files & Links
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<{ file: File; previewUrl: string }[]>([]);
  const [driveLinks, setDriveLinks] = useState<string[]>(['']);
  const [driveTestResult, setDriveTestResult] = useState<{
    accessible: boolean;
    message: string;
  } | null>(null);
  const [testingDrive, setTestingDrive] = useState<boolean>(false);

  // Submission State
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<QuestionSubmission | null>(null);

  // Tracking List
  const [mySubmissions, setMySubmissions] = useState<QuestionSubmission[]>([]);
  const [loadingMine, setLoadingMine] = useState<boolean>(false);
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [resubmitDriveLink, setResubmitDriveLink] = useState<string>('');
  const [resubmitFiles, setResubmitFiles] = useState<File[]>([]);
  const [resubmitting, setResubmitting] = useState<boolean>(false);

  const effectiveCollege =
    collegeChoice === 'Other Medical College' ? customCollege.trim() : collegeChoice;

  const fetchMySubmissions = async () => {
    if (!userProfile) {
      setMySubmissions([]);
      return;
    }
    setLoadingMine(true);
    try {
      const savedIds = new Set(loadSavedTrackingTokens().map(t => t.id));
      const userEmail = (userProfile?.email || '').trim().toLowerCase();
      const rawPapers = await listPapersRawFromAppsScript();
      const mine = rawPapers
        .map(mapAppsScriptPaperToSubmission)
        .filter(
          sub =>
            savedIds.has(sub.id) ||
            (userEmail && sub.contributorEmail?.trim().toLowerCase() === userEmail)
        );
      setMySubmissions(mine);
    } catch (e) {
      console.error('Failed to fetch submissions:', e);
    } finally {
      setLoadingMine(false);
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchMySubmissions();
    } else {
      setMySubmissions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, userProfile?.email]);

  const handleImagePick = (files: FileList | null) => {
    if (!files) return;
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const next: { file: File; previewUrl: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!validTypes.includes(f.type.toLowerCase())) {
        setError(`"${f.name}" is not a supported image (PNG, JPG, JPEG, WEBP).`);
        continue;
      }
      if (f.size > 25 * 1024 * 1024) {
        setError(`"${f.name}" exceeds the 25 MB limit.`);
        continue;
      }
      next.push({ file: f, previewUrl: URL.createObjectURL(f) });
    }
    setImageFiles(prev => [...prev, ...next].slice(0, 20));
  };

  const removeImageAt = (idx: number) => {
    setImageFiles(prev => {
      const item = prev[idx];
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleTestDriveLink = async (urlToTest: string) => {
    if (!urlToTest.trim()) {
      setDriveTestResult({ accessible: false, message: 'Please paste a Google Drive URL first.' });
      return;
    }
    setTestingDrive(true);
    setDriveTestResult(null);
    try {
      const res = await fetch('/api/submissions/verify-drive-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToTest.trim() })
      });
      const data = await res.json();
      setDriveTestResult({
        accessible: Boolean(data.accessible),
        message: data.message || 'Verification completed.'
      });
    } catch {
      setDriveTestResult({
        accessible: false,
        message: 'Could not reach server to test Google Drive link.'
      });
    } finally {
      setTestingDrive(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmittedRecord(null);

    if (!effectiveCollege) {
      setError('Please specify the Medical College Name.');
      return;
    }
    if (!examName.trim() || !subject.trim() || !year.trim()) {
      setError('Examination Name, Subject, and Year are required.');
      return;
    }

    if (method === 'pdf' && !pdfFile) {
      setError('Please attach a PDF document.');
      return;
    }
    if (method === 'images' && imageFiles.length === 0) {
      setError('Please select at least one question paper image.');
      return;
    }
    const cleanLinks = driveLinks.map(l => l.trim()).filter(Boolean);
    if (method === 'drive_link' && cleanLinks.length === 0) {
      setError('Please provide at least one Google Drive link.');
      return;
    }

    setSubmitting(true);
    setUploadProgress(15);

    const adminSubmit = isAdminUser(userProfile);

    try {
      const baseTitle = `${examName.trim()} (${category})`;
      const baseMeta = {
        prof: formProf,
        college_name: effectiveCollege,
        subject: subject.trim(),
        paper: paper.trim(),
        topic: chapter.trim(),
        year: year.trim(),
        session: session.trim(),
        batch: contributorBatch.trim(),
        contributor_name: contributorName.trim() || userProfile?.fullName || 'Anonymous Student',
        contributor_email: userProfile?.email || '',
        description: description.trim(),
        status: (adminSubmit ? 'approved' : 'pending') as 'approved' | 'pending',
        is_admin: adminSubmit
      };

      let lastCreated = null;

      if (method === 'drive_link') {
        setUploadProgress(55);
        lastCreated = await submitPaperToAppsScript({
          ...baseMeta,
          title: baseTitle,
          exam_name: examName.trim(),
          file_url: cleanLinks.join(', '),
          file_base64: '',
          file_name: '',
          mime_type: '',
          file_type: 'drive_link'
        });
        if (lastCreated?.id) saveTrackingToken(lastCreated.id, 'apps_script');
      } else if (method === 'pdf' && pdfFile) {
        setUploadProgress(40);
        const encoded = await fileToBase64(pdfFile);
        setUploadProgress(70);
        lastCreated = await submitPaperToAppsScript({
          ...baseMeta,
          title: baseTitle,
          exam_name: examName.trim(),
          file_url: '',
          file_base64: encoded.file_base64,
          file_name: encoded.file_name,
          mime_type: encoded.mime_type,
          file_type: 'pdf'
        });
        if (lastCreated?.id) saveTrackingToken(lastCreated.id, 'apps_script');
      } else {
        for (let i = 0; i < imageFiles.length; i++) {
          const img = imageFiles[i];
          const encoded = await fileToBase64(img.file);
          setUploadProgress(Math.round(((i + 1) / imageFiles.length) * 85));
          const pageSuffix = imageFiles.length > 1 ? ` (Page ${i + 1})` : '';
          lastCreated = await submitPaperToAppsScript({
            ...baseMeta,
            title: `${baseTitle}${pageSuffix}`,
            exam_name: `${examName.trim()}${pageSuffix}`,
            file_url: '',
            file_base64: encoded.file_base64,
            file_name: encoded.file_name,
            mime_type: encoded.mime_type,
            file_type: 'image'
          });
          if (lastCreated?.id) saveTrackingToken(lastCreated.id, 'apps_script');
        }
      }

      setUploadProgress(100);
      if (lastCreated) {
        setSubmittedRecord(mapAppsScriptPaperToSubmission(lastCreated));
      }

      // Reset upload inputs
      setPdfFile(null);
      imageFiles.forEach(i => URL.revokeObjectURL(i.previewUrl));
      setImageFiles([]);
      setDriveLinks(['']);
      setDriveTestResult(null);
      setExamName('');
      setDescription('');
      await fetchMySubmissions();
      await onPaperSubmitted?.();
    } catch (err: any) {
      setError(err?.message || 'Network error occurred while submitting question paper.');
      setUploadProgress(0);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResubmit = async (sub: QuestionSubmission) => {
    setResubmitting(true);
    setError(null);
    try {
      const savedToken = loadSavedTrackingTokens().find(t => t.id === sub.id)?.key || '';
      const headers: Record<string, string> = {};
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      if (savedToken) headers['x-tracking-key'] = savedToken;

      let res: Response;
      if (resubmitFiles.length > 0) {
        const fd = new FormData();
        fd.append('trackingKey', savedToken);
        if (resubmitDriveLink.trim()) {
          fd.append('driveLinks', JSON.stringify([resubmitDriveLink.trim()]));
        }
        resubmitFiles.forEach(f => fd.append('files', f));
        res = await fetch(`/api/submissions/${sub.id}/resubmit`, {
          method: 'PATCH',
          headers,
          body: fd
        });
      } else {
        res = await fetch(`/api/submissions/${sub.id}/resubmit`, {
          method: 'PATCH',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trackingKey: savedToken,
            driveLinks: resubmitDriveLink.trim() ? [resubmitDriveLink.trim()] : sub.driveLinks
          })
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update submission.');
        return;
      }
      setEditingSubId(null);
      setResubmitFiles([]);
      setResubmitDriveLink('');
      await fetchMySubmissions();
    } catch {
      setError('Network error while updating submission.');
    } finally {
      setResubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ONE SECTION (QUESTION PAPERS) -> STRICTLY TWO ORGANIZED TABS */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <FileUp size={14} />
            <span>{selectedProf} &middot; Question Papers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Question Papers
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            {hubTab === 'submit'
              ? 'Submit Card, Term, or MCQ papers via PDF, Multiple Images, or Google Drive links.'
              : 'Browse community Card, Term, and MCQ papers for your selected Professional Examination.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto shrink-0" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={hubTab === 'submit'}
            onClick={() => switchHubTab('submit')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold min-h-[44px] ${
              hubTab === 'submit'
                ? 'bg-[#0F2942] text-white dark:bg-[#0D9488]'
                : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
            }`}
          >
            Submit Question Papers
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={hubTab === 'community'}
            onClick={() => switchHubTab('community')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold min-h-[44px] ${
              hubTab === 'community'
                ? 'bg-[#0F2942] text-white dark:bg-[#0D9488]'
                : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
            }`}
          >
            Community Uploads{userProfile ? ` (${profPaperCount})` : ''}
          </button>
        </div>
      </div>

      {hubTab === 'community' ? (
        <CommunityUploadsView
          embedded
          selectedProf={selectedProf}
          publishedPapers={publishedPapers}
          customTaxonomy={customTaxonomy}
          userProfile={userProfile}
          studyState={studyState}
          onToggleBookmark={onToggleBookmark}
          onRecordRecentView={onRecordRecentView}
          onDeletePaper={onDeletePaper}
          onOpenAuth={onOpenAuth}
          onSwitchToSubmitTab={() => switchHubTab('submit')}
          onNavigate={onNavigate}
        />
      ) : (
        <div className="space-y-5 max-w-4xl">
          {/* Sub-switch inside Submit Tab: Upload Form vs Track Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[var(--bg-subtle)] p-2 rounded-xl border border-[var(--line)]">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => switchActiveView('form')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold min-h-[38px] ${
                  activeView === 'form'
                    ? 'bg-[var(--card)] text-[var(--ink)] shadow-xs border border-[var(--line)]'
                    : 'text-[var(--mut)]'
                }`}
              >
                Submission Form
              </button>
              <button
                type="button"
                onClick={() => {
                  switchActiveView('track');
                  fetchMySubmissions();
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold min-h-[38px] ${
                  activeView === 'track'
                    ? 'bg-[var(--card)] text-[var(--ink)] shadow-xs border border-[var(--line)]'
                    : 'text-[var(--mut)]'
                }`}
              >
                Track My Submissions{userProfile ? ` (${mySubmissions.length})` : ''}
              </button>
            </div>
            <span className="text-[11px] text-[var(--mut)] px-2">
              {isAdminUser(userProfile)
                ? 'Admin submissions are published live immediately'
                : 'Submissions remain pending until approved by an admin'}
            </span>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {submittedRecord && activeView === 'form' && (
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-base">
                <CheckCircle2 size={20} />
                <span>
                  {submittedRecord.status === 'Approved' || submittedRecord.status === 'Published'
                    ? 'Question Paper Published Live!'
                    : 'Question Paper Submitted for Admin Approval!'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] m-0">
                Tracking ID: <b className="font-mono text-[var(--ink)]">{submittedRecord.id}</b> &bull; Status:{' '}
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  {submittedRecord.status === 'Approved' || submittedRecord.status === 'Published'
                    ? 'Live'
                    : 'Pending Approval'}
                </span>{' '}
                &bull; Examination Stage:{' '}
                <span className="font-bold">{submittedRecord.professionalExam || formProf}</span>.{' '}
                {submittedRecord.status === 'Approved' || submittedRecord.status === 'Published'
                  ? 'Your paper is now visible to signed-in students in Community Uploads.'
                  : 'Your submission is awaiting admin review and will appear in Community Uploads once approved.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(submittedRecord.status === 'Approved' || submittedRecord.status === 'Published') && (
                  <button type="button" onClick={() => switchHubTab('community')} className="btn sm good">
                    View in Community Uploads &rarr;
                  </button>
                )}
                <button type="button" onClick={() => switchActiveView('track')} className="btn sm alt">
                  View My Submissions
                </button>
              </div>
            </div>
          )}

      {/* VIEW 1: SUBMISSION FORM */}
      {activeView === 'form' && (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-7 space-y-6"
        >
          {/* Step 1: Question Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--mut)]">
              1. Question Category *
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {(['Card', 'Term', 'MCQ'] as SubmissionCategory[]).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2.5 px-2 sm:px-3 rounded-xl border font-bold text-xs sm:text-sm transition-all min-h-[46px] ${
                    category === cat
                      ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488] ring-1 ring-[#0D9488]'
                      : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink-secondary)]'
                  }`}
                >
                  {cat}
                  <span className="hidden sm:inline"> Questions</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Academic Metadata */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--mut)] block">
              2. Examination &amp; Curriculum Metadata
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  MBBS Professional Examination *
                </label>
                <select
                  value={formProf}
                  onChange={e => handleFormProfChange(e.target.value as ProfessionalExamId)}
                  className="min-h-[44px] text-sm"
                >
                  {profConfigs.map(cfg => (
                    <option key={cfg.id} value={cfg.id}>
                      {cfg.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Medical College Name *
                </label>
                <select
                  value={collegeChoice}
                  onChange={e => setCollegeChoice(e.target.value)}
                  className="min-h-[44px] text-sm"
                >
                  {MEDICAL_COLLEGES_BD.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {collegeChoice === 'Other Medical College' && (
                  <input
                    value={customCollege}
                    onChange={e => setCustomCollege(e.target.value)}
                    placeholder="Enter full medical college name"
                    required
                    className="mt-2 min-h-[44px] text-sm"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Examination Name *
                </label>
                <input
                  value={examName}
                  onChange={e => setExamName(e.target.value)}
                  placeholder="e.g. 1st Term Exam / Superior Extremity Card"
                  required
                  className="min-h-[44px] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">Subject *</label>
                <select
                  value={subject}
                  onChange={e => {
                    setSubject(e.target.value);
                    setPaper('');
                  }}
                  className="min-h-[44px] text-sm"
                >
                  {subjectsForFormProf.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  {!subjectsForFormProf.includes(subject) && (
                    <option value={subject}>{subject}</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Paper <span className="text-[var(--mut)] font-normal">(Optional)</span>
                </label>
                <select
                  value={paper}
                  onChange={e => setPaper(e.target.value)}
                  className="min-h-[44px] text-sm"
                >
                  <option value="">Not specified / General</option>
                  {papersForFormSubject.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Chapter / Card Topic <span className="text-[var(--mut)] font-normal">(Optional)</span>
                </label>
                <input
                  value={chapter}
                  onChange={e => setChapter(e.target.value)}
                  placeholder="e.g. Head & Neck / Cardiovascular System"
                  className="min-h-[44px] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">Year *</label>
                  <input
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="2025"
                    required
                    className="min-h-[44px] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">Session</label>
                  <input
                    value={session}
                    onChange={e => setSession(e.target.value)}
                    placeholder="e.g. May 2025 / CMC-67"
                    className="min-h-[44px] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Your Name <span className="text-[var(--mut)] font-normal">(For contributor credit)</span>
                </label>
                <input
                  value={contributorName}
                  onChange={e => setContributorName(e.target.value)}
                  placeholder="e.g. MD Sadman Sami"
                  className="min-h-[44px] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                  Batch <span className="text-[var(--mut)] font-normal">(Optional)</span>
                </label>
                <input
                  value={contributorBatch}
                  onChange={e => setContributorBatch(e.target.value)}
                  placeholder="e.g. CMC 67"
                  className="min-h-[44px] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                Additional Description / Notes
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Mention whether answer keys are included, missing pages, or special examiner focus..."
                className="text-sm"
              />
            </div>
          </div>

          {/* Step 3: Submission Method */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--mut)] block">
              3. Choose Upload Method *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'pdf' as const, label: 'Upload PDF', icon: FileText, sub: 'Single PDF up to 25 MB' },
                { id: 'images' as const, label: 'Upload Images', icon: ImageIcon, sub: 'Multiple JPG / PNG / WEBP' },
                { id: 'drive_link' as const, label: 'Google Drive Link', icon: Link2, sub: 'File or Folder URL' }
              ].map(m => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setMethod(m.id);
                      setError(null);
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all min-h-[56px] ${
                      method === m.id
                        ? 'border-[#173B55] bg-[#173B55]/5 dark:bg-sky-500/10 ring-1 ring-[#173B55] dark:ring-sky-400'
                        : 'border-[var(--line)] bg-[var(--card-subtle)]'
                    }`}
                  >
                    <Icon size={20} className={method === m.id ? 'text-[#0D9488]' : 'text-[var(--mut)]'} />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[var(--ink)]">{m.label}</div>
                      <div className="text-[11px] text-[var(--mut)]">{m.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Method A: PDF */}
            {method === 'pdf' && (
              <div className="border-2 border-dashed border-[var(--line)] rounded-xl p-6 text-center bg-[var(--bg-subtle)]">
                <input
                  type="file"
                  id="sub-pdf-input"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0] || null;
                    if (f && f.size > 25 * 1024 * 1024) {
                      setError('PDF exceeds 25 MB size limit.');
                      return;
                    }
                    setPdfFile(f);
                  }}
                />
                {!pdfFile ? (
                  <label htmlFor="sub-pdf-input" className="cursor-pointer block space-y-2">
                    <FileUp size={32} className="mx-auto text-[#0D9488]" />
                    <div className="text-sm font-bold text-[var(--ink)]">
                      Click to choose PDF Question Paper
                    </div>
                    <div className="text-xs text-[var(--mut)]">Validated PDF format, max 25 MB</div>
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-3 bg-[var(--card)] p-3.5 rounded-lg border border-[var(--line)] min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <FileText size={20} className="text-[#0D9488] shrink-0" />
                      <div className="text-left min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-bold truncate">{pdfFile.name}</div>
                        <div className="text-[11px] text-[var(--mut)]">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="p-2 text-rose-600 hover:bg-rose-500/10 rounded-lg shrink-0"
                      aria-label="Remove PDF"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Method B: Multiple Images */}
            {method === 'images' && (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-[var(--line)] rounded-xl p-5 text-center bg-[var(--bg-subtle)]">
                  <input
                    type="file"
                    id="sub-img-input"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    className="hidden"
                    onChange={e => handleImagePick(e.target.files)}
                  />
                  <label htmlFor="sub-img-input" className="cursor-pointer block space-y-1.5">
                    <ImageIcon size={30} className="mx-auto text-[#0D9488]" />
                    <div className="text-sm font-bold text-[var(--ink)]">
                      Click to add question paper photos (up to 20 pages)
                    </div>
                    <div className="text-xs text-[var(--mut)]">JPG, JPEG, PNG, WEBP supported</div>
                  </label>
                </div>

                {imageFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {imageFiles.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--card)]"
                      >
                        <img
                          src={item.previewUrl}
                          alt={`Page ${idx + 1}`}
                          className="w-full h-28 object-cover"
                        />
                        <div className="p-2 flex items-center justify-between gap-1 text-[11px]">
                          <span className="truncate font-semibold">Page {idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeImageAt(idx)}
                            className="p-1 text-rose-600 hover:bg-rose-500/10 rounded"
                            aria-label="Remove image"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Method C: Google Drive Link */}
            {method === 'drive_link' && (
              <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] space-y-4">
                <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/25 text-xs text-[var(--ink-secondary)] space-y-1">
                  <div className="font-bold text-[var(--ink)]">Sharing Permission Checklist:</div>
                  <div>
                    In Google Drive, click <b>Share &rarr; General access &rarr; Anyone with the link (Viewer)</b> before pasting your URL below.
                  </div>
                </div>

                <div className="space-y-2.5">
                  {driveLinks.map((lnk, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={lnk}
                        onChange={e => {
                          const next = [...driveLinks];
                          next[idx] = e.target.value;
                          setDriveLinks(next);
                          setDriveTestResult(null);
                        }}
                        placeholder="https://drive.google.com/file/d/... or /drive/folders/..."
                        className="flex-1 min-h-[44px] text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={testingDrive}
                          onClick={() => handleTestDriveLink(lnk)}
                          className="btn alt min-h-[44px] shrink-0"
                        >
                          {testingDrive ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                          <span>Test Link</span>
                        </button>
                        {driveLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setDriveLinks(driveLinks.filter((_, i) => i !== idx))}
                            className="btn alt min-h-[44px] text-rose-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setDriveLinks([...driveLinks, ''])}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0D9488] bg-transparent border-0 p-1"
                  >
                    <Plus size={14} /> Add another Drive link
                  </button>
                </div>

                {driveTestResult && (
                  <div
                    className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                      driveTestResult.accessible
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                    }`}
                  >
                    {driveTestResult.accessible ? (
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    )}
                    <span>{driveTestResult.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {submitting && uploadProgress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[var(--mut)]">
                <span>Submitting question paper...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                <div
                  className="h-full bg-[#0D9488] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn w-full min-h-[48px] text-sm">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FileUp size={16} />
                <span>Submit Question Paper for Review</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* VIEW 2: TRACK SUBMISSIONS */}
      {activeView === 'track' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => switchActiveView('form')}
                className="btn sm alt"
              >
                <ArrowLeft size={13} /> Back to Form
              </button>
              <h2 className="text-lg font-extrabold text-[var(--ink)] m-0">My Submitted Question Papers</h2>
            </div>
            {userProfile && (
              <button type="button" onClick={fetchMySubmissions} className="btn sm alt">
                <RefreshCw size={13} className={loadingMine ? 'animate-spin' : ''} /> Refresh
              </button>
            )}
          </div>

          {!userProfile ? (
            <AuthRequiredCard
              title="Sign In to View Submitted Question Papers"
              description="Please sign in or create an account to track your submitted question papers."
              onOpenAuth={onOpenAuth}
            />
          ) : mySubmissions.length === 0 ? (
            <div className="empty">
              <Clock size={36} className="mx-auto mb-2 opacity-50" />
              <div className="font-bold text-[var(--ink)]">No tracked submissions yet</div>
              <p className="text-xs text-[var(--mut)] mt-1">
                Submit a Card, Term, or MCQ paper and track its review status right here.
              </p>
              <button type="button" onClick={() => switchActiveView('form')} className="btn sm mt-3">
                Submit Question Paper
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {mySubmissions.map(sub => {
                const isEditing = editingSubId === sub.id;
                const statusColor =
                  sub.status === 'Published' || sub.status === 'Approved'
                    ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                    : sub.status === 'Needs Correction' || sub.status === 'Rejected'
                    ? 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30'
                    : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30';

                return (
                  <div
                    key={sub.id}
                    className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-[#0D9488]">{sub.id}</span>
                        <span className="badge">{sub.category}</span>
                        <span className="text-[var(--mut)]">{new Date(sub.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md border text-xs font-bold ${statusColor}`}>
                        {sub.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[var(--ink)] m-0">{sub.examName}</h3>
                      <div className="text-xs text-[var(--mut)] mt-0.5">
                        {sub.collegeName} &bull; {sub.subject} {sub.paper ? `• ${sub.paper}` : ''} &bull; {sub.year}
                      </div>
                    </div>

                    {sub.adminComment && (
                      <div className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs text-[var(--ink-secondary)]">
                        <b>Reviewer Note:</b> {sub.adminComment}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {sub.driveLinks.map((lnk, i) => (
                        <a
                          key={i}
                          href={lnk}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn sm alt no-underline"
                        >
                          <ExternalLink size={12} /> Drive Link {sub.driveLinks.length > 1 ? i + 1 : ''}
                        </a>
                      ))}

                      {(sub.status === 'Needs Correction' || sub.status === 'Pending') && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSubId(isEditing ? null : sub.id);
                            setResubmitDriveLink(sub.driveLinks[0] || '');
                          }}
                          className="btn sm"
                        >
                          {isEditing ? 'Cancel Edit' : 'Update Link / Replace File'}
                        </button>
                      )}
                    </div>

                    {isEditing && (
                      <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] space-y-3">
                        <div className="text-xs font-bold text-[var(--ink)]">
                          Resubmit Updated Files or Google Drive Link
                        </div>
                        {sub.method === 'drive_link' ? (
                          <input
                            type="url"
                            value={resubmitDriveLink}
                            onChange={e => setResubmitDriveLink(e.target.value)}
                            placeholder="Updated Google Drive link..."
                            className="min-h-[42px] text-sm"
                          />
                        ) : (
                          <input
                            type="file"
                            multiple={sub.method === 'images'}
                            accept={sub.method === 'pdf' ? '.pdf' : 'image/*'}
                            onChange={e => setResubmitFiles(Array.from(e.target.files || []))}
                            className="text-xs"
                          />
                        )}
                        <button
                          type="button"
                          disabled={resubmitting}
                          onClick={() => handleResubmit(sub)}
                          className="btn sm good"
                        >
                          {resubmitting ? 'Saving...' : 'Save & Re-submit for Review'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      </div>
      )}
    </div>
  );
};
