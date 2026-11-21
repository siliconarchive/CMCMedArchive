import React, { useEffect, useMemo, useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
  Users,
  Megaphone,
  Layers,
  BookOpen,
  Trash2,
  Plus,
  AlertTriangle,
  RefreshCw,
  Save,
  ArrowLeft,
  Pencil
} from 'lucide-react';
import {
  AnnouncementRecord,
  ContributorRecord,
  CustomTaxonomy,
  ExtractedMcqDraft,
  ProfessionalExamId,
  PublishedPaper,
  QuestionOverride,
  QuestionSubmission,
  ResourceRequestRecord,
  SubjectClassificationRole,
  SubmissionStatus,
  UploadedItem,
  UserProfile,
  UserRole
} from '../types';
import {
  buildUnifiedMcqQuestions,
  PENDING_CHAPTER_LABEL
} from '../data/archiveHelpers';
import { getMergedProfConfigs, getSubjectsForProf } from '../data/curriculumConfig';
import {
  appsScriptListUsers,
  appsScriptUpdateRole,
  isAdminUser
} from '../utils/appsScriptAuth';
import {
  listPapersRawFromAppsScript,
  mapAppsScriptPaperToSubmission,
  updateArchiveItemStatus
} from '../utils/appsScriptArchive';
import {
  deleteVivaFromAppsScript,
  listVivaFromAppsScript,
  updateVivaStatusFromAppsScript,
  VivaItem
} from '../utils/appsScriptViva';
import {
  addContributorPersistent,
  deleteContributorPersistent,
  updateContributorPersistent
} from '../utils/appsScriptContributors';
import { useBackNav } from '../utils/BackNavContext';

interface AdminPanelProps {
  userProfile: UserProfile | null;
  authToken: string | null;
  notes: UploadedItem[];
  contributors: ContributorRecord[];
  announcement: AnnouncementRecord;
  questionOverrides: Record<string, QuestionOverride>;
  customTaxonomy: CustomTaxonomy;
  publishedPapers: PublishedPaper[];
  onContributorsChange?: React.Dispatch<React.SetStateAction<ContributorRecord[]>>;
  onRefreshAll: () => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
  onDeletePaper?: (id: string) => Promise<void>;
}

type AdminTab =
  | 'submissions'
  | 'chapters'
  | 'notes'
  | 'viva'
  | 'requests'
  | 'contributors'
  | 'announcements'
  | 'users';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  userProfile,
  authToken,
  notes,
  contributors,
  announcement,
  questionOverrides,
  customTaxonomy,
  publishedPapers,
  onContributorsChange,
  onRefreshAll,
  onDeleteNote,
  onDeletePaper
}) => {
  const { pushSubLayer } = useBackNav();
  const [tab, setTab] = useState<AdminTab>('submissions');
  const [submissions, setSubmissions] = useState<QuestionSubmission[]>([]);
  const [vivaItems, setVivaItems] = useState<VivaItem[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [resourceRequests, setResourceRequests] = useState<ResourceRequestRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [moderatingItemId, setModeratingItemId] = useState<string | null>(null);

  const switchAdminTab = (nextTab: AdminTab) => {
    if (nextTab === tab) return;
    const prevTab = tab;
    pushSubLayer('Admin Panel', () => setTab(prevTab));
    setTab(nextTab);
  };

  // Submission Filters & Selected
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedSub, setSelectedSub] = useState<QuestionSubmission | null>(null);
  const [editProf, setEditProf] = useState<ProfessionalExamId>('First Professional');
  const [editSubject, setEditSubject] = useState<string>('Anatomy');
  const [editComment, setEditComment] = useState<string>('');
  const [editStatus, setEditStatus] = useState<SubmissionStatus>('Pending');
  const [editChapter, setEditChapter] = useState<string>('');
  const [editPaper, setEditPaper] = useState<string>('');
  const [editYear, setEditYear] = useState<string>('');
  const [ocrLoading, setOcrLoading] = useState<boolean>(false);
  const [draftMcqs, setDraftMcqs] = useState<ExtractedMcqDraft[]>([]);
  const [creditContrib, setCreditContrib] = useState<boolean>(true);
  const [publishWithMcqs, setPublishWithMcqs] = useState<boolean>(false);

  // Taxonomy & Reclassification State
  const profConfigs = getMergedProfConfigs(customTaxonomy);
  const [newSubjectProf, setNewSubjectProf] = useState<ProfessionalExamId>('First Professional');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newChapterSubj, setNewChapterSubj] = useState('Anatomy');
  const [newChapterPaper, setNewChapterPaper] = useState('Paper-I');
  const [newChapterName, setNewChapterName] = useState('');
  const [newYearVal, setNewYearVal] = useState('');
  const [chapterAssignValues, setChapterAssignValues] = useState<Record<string, string>>({});
  const [profAssignValues, setProfAssignValues] = useState<Record<string, ProfessionalExamId>>({});
  const [roleAssignValues, setRoleAssignValues] = useState<Record<string, SubjectClassificationRole>>({});
  const [paperProfEdits, setPaperProfEdits] = useState<
    Record<
      string,
      {
        professionalExam: ProfessionalExamId;
        classificationRole: SubjectClassificationRole;
        subject: string;
        paper: string;
        chapter: string;
      }
    >
  >({});
  const [noteProfEdits, setNoteProfEdits] = useState<Record<string, ProfessionalExamId>>({});
  const [noteRoleEdits, setNoteRoleEdits] = useState<Record<string, SubjectClassificationRole>>({});

  // Contributor & Team Member Form
  const [editingContributorId, setEditingContributorId] = useState<string | null>(null);
  const [cName, setCName] = useState('');
  const [cRole, setCRole] = useState('Contributor');
  const [cBatch, setCBatch] = useState('');
  const [cCollege, setCCollege] = useState('Chittagong Medical College (CMC)');
  const [cDesc, setCDesc] = useState('');
  const [savingContributor, setSavingContributor] = useState(false);

  // Announcement & Multi-Notice Management State
  const [adminNotices, setAdminNotices] = useState<AnnouncementRecord[]>([announcement]);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>(announcement.id);
  const [creatingNotice, setCreatingNotice] = useState<boolean>(false);
  const [annBadge, setAnnBadge] = useState(announcement.badgeText);
  const [annTitle, setAnnTitle] = useState(announcement.title);
  const [annSubtitle, setAnnSubtitle] = useState(announcement.subtitle);
  const [annBody, setAnnBody] = useState(announcement.bodyParagraphs.join('\n\n'));
  const [annBullets, setAnnBullets] = useState((announcement.bulletItems || []).join('\n'));
  const [annHighlight, setAnnHighlight] = useState(announcement.highlightText);
  const [annCta, setAnnCta] = useState(announcement.ctaText);
  const [annCtaTarget, setAnnCtaTarget] = useState(announcement.ctaTarget || 'submit');
  const [annEnabled, setAnnEnabled] = useState(announcement.enabled);

  const loadNoticeIntoForm = (rec: AnnouncementRecord) => {
    setSelectedNoticeId(rec.id);
    setCreatingNotice(false);
    setAnnBadge(rec.badgeText || '');
    setAnnTitle(rec.title || '');
    setAnnSubtitle(rec.subtitle || '');
    setAnnBody((rec.bodyParagraphs || []).join('\n\n'));
    setAnnBullets((rec.bulletItems || []).join('\n'));
    setAnnHighlight(rec.highlightText || '');
    setAnnCta(rec.ctaText || '');
    setAnnCtaTarget(rec.ctaTarget || 'submit');
    setAnnEnabled(Boolean(rec.enabled));
  };

  useEffect(() => {
    if (!creatingNotice && selectedNoticeId === announcement.id) {
      loadNoticeIntoForm(announcement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement]);

  const fetchAdminData = async () => {
    if (!isAdminUser(userProfile)) return;
    setLoading(true);
    try {
      const errors: string[] = [];
      const usersPromise = appsScriptListUsers().catch(err => {
        console.error('Failed to load users:', err);
        errors.push(err?.message || 'Failed to load registered users.');
        return null;
      });

      const papersPromise = listPapersRawFromAppsScript().catch(err => {
        console.error('Failed to load papers:', err);
        errors.push(err?.message || 'Failed to load question papers.');
        return null;
      });

      const vivaPromise = listVivaFromAppsScript({ includeUnapproved: true }).catch(err => {
        console.error('Failed to load viva items:', err);
        errors.push(err?.message || 'Failed to load viva questions.');
        return null;
      });

      const headers: Record<string, string> = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const [appsUsers, appsPapers, appsViva, annRes, reqRes] = await Promise.all([
        usersPromise,
        papersPromise,
        vivaPromise,
        authToken ? fetch('/api/admin/announcements', { headers }).catch(() => null) : Promise.resolve(null),
        fetch('/api/resource-requests').catch(() => null)
      ]);

      if (Array.isArray(appsUsers)) {
        setUsers(appsUsers);
      }

      if (Array.isArray(appsPapers)) {
        const mappedSubs = appsPapers.map(mapAppsScriptPaperToSubmission);
        setSubmissions(mappedSubs);
        setSelectedSub(prev => {
          if (!prev) return null;
          const updated = mappedSubs.find(s => s.id === prev.id);
          if (updated) {
            setDraftMcqs(updated.extractedMcqs || []);
            return updated;
          }
          return null;
        });
      }

      if (Array.isArray(appsViva)) {
        setVivaItems(appsViva);
      }

      if (annRes && annRes.ok) {
        const annData = await annRes.json().catch(() => null);
        if (Array.isArray(annData?.announcements) && annData.announcements.length > 0) {
          setAdminNotices(annData.announcements);
        }
      }

      if (reqRes && reqRes.ok) {
        const reqData = await reqRes.json().catch(() => null);
        if (Array.isArray(reqData?.requests)) {
          setResourceRequests(reqData.requests);
        }
      }

      if (errors.length > 0) {
        setFeedback({ type: 'err', msg: errors[0] });
      }
    } catch (e: any) {
      console.error('Failed to load admin data:', e);
      setFeedback({ type: 'err', msg: e?.message || 'Failed to load admin data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, userProfile?.role]);

  const pendingChapterQuestions = useMemo(() => {
    return buildUnifiedMcqQuestions([], questionOverrides).filter(q => q.chapterNeedsReview);
  }, [questionOverrides]);

  if (!isAdminUser(userProfile)) {
    return (
      <div className="max-w-xl mx-auto bg-[var(--card)] border border-rose-500/30 rounded-xl p-6 text-center space-y-2">
        <ShieldCheck size={36} className="mx-auto text-rose-600" />
        <h2 className="text-lg font-bold text-[var(--ink)] m-0">Administrator Access Required</h2>
        <p className="text-xs text-[var(--mut)] m-0">
          This dashboard is restricted to verified platform administrators.
        </p>
      </div>
    );
  }

  const filteredSubs = submissions
    .filter(s => {
      if (statusFilter !== 'all' && s.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const aPending = a.status === 'Pending' ? 0 : 1;
      const bPending = b.status === 'Pending' ? 0 : 1;
      return aPending - bPending;
    });

  const openSubInspector = (sub: QuestionSubmission) => {
    if (!selectedSub || selectedSub.id !== sub.id) {
      pushSubLayer('Papers List', () => setSelectedSub(null));
    }
    setSelectedSub(sub);
    setEditProf(sub.professionalExam || 'First Professional');
    setEditSubject(sub.subject || 'Anatomy');
    setEditComment(sub.adminComment || '');
    setEditStatus(sub.status);
    setEditChapter(sub.chapter || '');
    setEditPaper(sub.paper || '');
    setEditYear(sub.year || '');
    setDraftMcqs(sub.extractedMcqs || []);
    setPublishWithMcqs((sub.extractedMcqs || []).some(m => m.verifiedByAdmin));
  };

  const handleModeratePaperStatus = async (
    paperId: string,
    status: 'approved' | 'rejected' | 'deleted'
  ) => {
    if (!isAdminUser(userProfile) || moderatingItemId) return;
    const cleanId = String(paperId || '').trim();
    if (!cleanId) {
      setFeedback({ type: 'err', msg: 'Missing paper ID for deletion.' });
      return;
    }
    setFeedback(null);
    setModeratingItemId(cleanId);
    try {
      if (status === 'deleted' && onDeletePaper) {
        await onDeletePaper(cleanId);
      } else {
        await updateArchiveItemStatus('paper', cleanId, status);
        await onRefreshAll();
      }
      if (status === 'deleted') {
        setSubmissions(prev => prev.filter(s => s.id !== cleanId));
        setSelectedSub(prev => (prev?.id === cleanId ? null : prev));
      } else {
        const nextStatus: SubmissionStatus = status === 'approved' ? 'Approved' : 'Rejected';
        setSubmissions(prev =>
          prev.map(s => (s.id === cleanId ? { ...s, status: nextStatus } : s))
        );
        setSelectedSub(prev =>
          prev?.id === cleanId ? { ...prev, status: nextStatus } : prev
        );
      }
      setFeedback({
        type: 'ok',
        msg:
          status === 'deleted'
            ? 'Question paper permanently deleted from Google Sheet and website.'
            : status === 'approved'
              ? 'Question paper approved and published to Community Uploads.'
              : 'Question paper rejected.'
      });
      await fetchAdminData();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Paper moderation failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleModerateNoteStatus = async (
    noteId: string,
    status: 'approved' | 'rejected'
  ) => {
    if (!isAdminUser(userProfile) || moderatingItemId) return;
    const cleanId = String(noteId || '').trim();
    if (!cleanId) {
      setFeedback({ type: 'err', msg: 'Missing note ID for moderation.' });
      return;
    }
    setFeedback(null);
    setModeratingItemId(cleanId);
    try {
      await updateArchiveItemStatus('note', cleanId, status);
      await onRefreshAll();
      setFeedback({
        type: 'ok',
        msg:
          status === 'approved'
            ? 'Study note approved and published to Notes Library.'
            : 'Study note rejected.'
      });
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Note moderation failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleDeleteNoteFromAdmin = async (noteId: string) => {
    if (!isAdminUser(userProfile) || moderatingItemId) return;
    const cleanId = String(noteId || '').trim();
    if (!cleanId) {
      setFeedback({ type: 'err', msg: 'Missing note ID for deletion.' });
      return;
    }
    setFeedback(null);
    setModeratingItemId(cleanId);
    try {
      await onDeleteNote(cleanId);
      setFeedback({
        type: 'ok',
        msg: 'Study note permanently deleted from Google Sheet and website.'
      });
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Note deletion failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleModerateVivaStatus = async (
    vivaId: string,
    status: 'approved' | 'rejected'
  ) => {
    if (!isAdminUser(userProfile) || moderatingItemId) return;
    const cleanId = String(vivaId || '').trim();
    if (!cleanId) {
      setFeedback({ type: 'err', msg: 'Missing Viva ID for moderation.' });
      return;
    }
    setFeedback(null);
    setModeratingItemId(cleanId);
    try {
      await updateVivaStatusFromAppsScript(cleanId, status);
      setVivaItems(prev =>
        prev.map(v => (v.id === cleanId ? { ...v, status } : v))
      );
      setFeedback({
        type: 'ok',
        msg:
          status === 'approved'
            ? 'Viva question approved and published live to Viva Bank.'
            : 'Viva question rejected.'
      });
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Viva status update failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleDeleteVivaFromAdmin = async (vivaId: string) => {
    if (!isAdminUser(userProfile) || moderatingItemId) return;
    const cleanId = String(vivaId || '').trim();
    if (!cleanId) {
      setFeedback({ type: 'err', msg: 'Missing Viva ID for deletion.' });
      return;
    }
    setFeedback(null);
    setModeratingItemId(cleanId);
    try {
      await deleteVivaFromAppsScript(cleanId);
      setVivaItems(prev => prev.filter(v => v.id !== cleanId));
      setFeedback({
        type: 'ok',
        msg: 'Viva question permanently deleted from Google Sheet and website.'
      });
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Viva deletion failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleSaveSubmissionMeta = async () => {
    if (!selectedSub || !authToken) return;
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSub.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: editStatus,
          professionalExam: editProf,
          subject: editSubject,
          adminComment: editComment,
          chapter: editChapter,
          paper: editPaper,
          year: editYear,
          extractedMcqs: draftMcqs
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Update failed.' });
        return;
      }
      setFeedback({ type: 'ok', msg: `Updated submission ${selectedSub.id}.` });
      await fetchAdminData();
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Failed to save submission changes.' });
    }
  };

  const handleRunOcr = async () => {
    if (!selectedSub || !authToken) return;
    setOcrLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSub.id}/extract-ocr`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'OCR extraction failed.' });
        return;
      }
      setDraftMcqs(data.extractedMcqs || []);
      setFeedback({
        type: 'ok',
        msg: data.note || 'OCR extraction completed.'
      });
      await fetchAdminData();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'OCR extraction failed.' });
    } finally {
      setOcrLoading(false);
    }
  };

  const handlePublishSubmission = async () => {
    if (!selectedSub || !authToken) return;
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSub.id}/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publishMcqs: publishWithMcqs,
          verifiedMcqs: draftMcqs,
          creditContributor: creditContrib
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Publish failed.' });
        return;
      }
      setFeedback({ type: 'ok', msg: data.message || 'Published to Archive.' });
      await fetchAdminData();
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Publish failed.' });
    }
  };

  const handleAssignChapterOverride = async (questionId: string) => {
    if (!authToken) return;
    const chap = chapterAssignValues[questionId]?.trim();
    const prof = profAssignValues[questionId];
    const role = roleAssignValues[questionId];
    if (!chap && !prof && !role) return;
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/question-override', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId,
          ...(prof ? { professionalExam: prof, profNeedsReview: false } : {}),
          ...(role ? { classificationRole: role } : {}),
          ...(chap ? { chapter: chap, chapterNeedsReview: chap === PENDING_CHAPTER_LABEL } : {})
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Classification update failed.' });
        return;
      }
      setFeedback({ type: 'ok', msg: `Updated classification for ${questionId}.` });
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Classification update failed.' });
    }
  };

  const handleReclassifyPublishedPaper = async (paperItem: PublishedPaper) => {
    if (!authToken) return;
    const patch = paperProfEdits[paperItem.id];
    if (!patch) return;
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/published-papers/${paperItem.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patch)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Paper update failed.' });
        return;
      }
      setFeedback({ type: 'ok', msg: `Updated paper "${paperItem.examName}" (${patch.professionalExam}).` });
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Paper update failed.' });
    }
  };

  const handleUpdateNoteProf = async (noteId: string) => {
    if (!authToken) return;
    const prof = noteProfEdits[noteId];
    const role = noteRoleEdits[noteId];
    if (!prof && !role) return;
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...(prof ? { professionalExam: prof } : {}),
          ...(role ? { classificationRole: role } : {})
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Note classification update failed.' });
        return;
      }
      setFeedback({ type: 'ok', msg: 'Updated note classification.' });
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Note classification update failed.' });
    }
  };

  const handleToggleRequestStatus = async (reqId: string, nextStatus: 'Open' | 'Fulfilled') => {
    if (!authToken) return;
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/resource-requests/${reqId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Failed to update resource request.' });
        return;
      }
      setFeedback({ type: 'ok', msg: `Resource request marked ${nextStatus}.` });
      await fetchAdminData();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Failed to update resource request.' });
    }
  };

  const handleAddTaxonomy = async (payload: any) => {
    if (!authToken) return;
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/taxonomy', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Failed to update curriculum taxonomy.' });
        return;
      }
      setNewSubjectName('');
      setNewChapterName('');
      setNewYearVal('');
      setFeedback({ type: 'ok', msg: 'Curriculum taxonomy updated.' });
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Failed to update curriculum taxonomy.' });
    }
  };

  const resetContributorForm = () => {
    setEditingContributorId(null);
    setCName('');
    setCRole('Contributor');
    setCBatch('');
    setCCollege('Chittagong Medical College (CMC)');
    setCDesc('');
  };

  const startEditContributor = (c: ContributorRecord) => {
    setEditingContributorId(c.id);
    setCName(c.name);
    setCRole(c.role || 'Contributor');
    setCBatch(c.batch || '');
    setCCollege(c.college || 'Chittagong Medical College (CMC)');
    setCDesc(c.contribution || '');
    setFeedback(null);
  };

  const handleSaveContributor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminUser(userProfile) || !cName.trim()) return;
    setFeedback(null);
    setSavingContributor(true);
    try {
      const isEdit = Boolean(editingContributorId);
      const input = {
        name: cName.trim(),
        role: cRole.trim() || 'Contributor',
        batch: cBatch.trim(),
        college: cCollege.trim() || 'Chittagong Medical College',
        contribution: cDesc.trim()
      };

      if (isEdit && editingContributorId) {
        const updated = await updateContributorPersistent(editingContributorId, input, authToken);
        onContributorsChange?.(prev =>
          prev.map(item => (item.id === editingContributorId ? updated : item))
        );
      } else {
        const created = await addContributorPersistent(input, authToken);
        onContributorsChange?.(prev => [...prev.filter(item => item.id !== created.id), created]);
      }

      resetContributorForm();
      setFeedback({
        type: 'ok',
        msg: isEdit ? 'Contributor details updated.' : 'Contributor added.'
      });
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Could not save contributor.' });
    } finally {
      setSavingContributor(false);
    }
  };

  const handleDeleteContributor = async (id: string) => {
    if (!isAdminUser(userProfile)) return;
    setFeedback(null);
    setModeratingItemId(id);
    try {
      await deleteContributorPersistent(id, authToken);
      onContributorsChange?.(prev => prev.filter(item => item.id !== id));
      if (editingContributorId === id) {
        resetContributorForm();
      }
      setFeedback({ type: 'ok', msg: 'Contributor removed.' });
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Could not remove contributor.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken) return;
    setFeedback(null);

    const payload = {
      badgeText: annBadge.trim(),
      title: annTitle.trim(),
      subtitle: annSubtitle.trim(),
      bodyParagraphs: annBody.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean),
      bulletItems: annBullets.split('\n').map(s => s.trim()).filter(Boolean),
      highlightText: annHighlight.trim(),
      ctaText: annCta.trim(),
      ctaTarget: annCtaTarget,
      enabled: annEnabled
    };

    const url = creatingNotice
      ? '/api/admin/announcements'
      : `/api/admin/announcements/${selectedNoticeId}`;
    const method = creatingNotice ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Could not save notice.' });
        return;
      }

      setFeedback({
        type: 'ok',
        msg: creatingNotice ? 'New website notice published.' : 'Notice & campaign settings updated.'
      });
      if (creatingNotice && data.announcement) {
        setSelectedNoticeId(data.announcement.id);
        setCreatingNotice(false);
      }
      await fetchAdminData();
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Could not save notice.' });
    }
  };

  const handleDeleteNotice = async (noticeId: string) => {
    if (!authToken) return;
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/announcements/${noticeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'err', msg: data.error || 'Cannot delete notice.' });
        return;
      }
      setFeedback({ type: 'ok', msg: 'Notice deleted.' });
      setSelectedNoticeId(announcement.id);
      loadNoticeIntoForm(announcement);
      await fetchAdminData();
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Cannot delete notice.' });
    }
  };

  const handleRoleChange = async (userId: string, role: UserRole) => {
    if (userProfile && userId === userProfile.id && role !== 'admin') {
      setFeedback({ type: 'err', msg: 'You cannot demote your own administrator account.' });
      return;
    }
    try {
      const updatedUser = await appsScriptUpdateRole(userId, role);
      setUsers(prev => prev.map(u => (u.id === userId ? updatedUser : u)));
      setFeedback({ type: 'ok', msg: 'User role updated.' });
      await fetchAdminData();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Role update failed.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <ShieldCheck size={14} />
            <span>Administrator Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Admin Control Panel
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Review submitted papers, run OCR-assisted extraction, classify chapters, manage contributors, and configure notices.
          </p>
        </div>

        <button type="button" onClick={fetchAdminData} className="btn alt min-h-[42px]">
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Navigation Tabs — smoothly scrollable on 320px phones */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {[
          {
            id: 'submissions' as const,
            label: `Papers (${submissions.length})`,
            icon: FileText
          },
          {
            id: 'notes' as const,
            label: `Notes (${notes.length})`,
            icon: BookOpen
          },
          {
            id: 'viva' as const,
            label: `Viva (${vivaItems.length})`,
            icon: Sparkles
          },
          {
            id: 'chapters' as const,
            label: `Taxonomy & Review (${pendingChapterQuestions.length})`,
            icon: Layers
          },
          {
            id: 'requests' as const,
            label: `Requests (${resourceRequests.filter(r => r.status === 'Open').length})`,
            icon: AlertTriangle
          },
          { id: 'contributors' as const, label: `Contributors (${contributors.length})`, icon: Users },
          { id: 'announcements' as const, label: `Notices (${adminNotices.length})`, icon: Megaphone },
          { id: 'users' as const, label: `Users (${users.length})`, icon: ShieldCheck }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => switchAdminTab(t.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 min-h-[42px] shrink-0 ${
                tab === t.id
                  ? 'bg-[#0F2942] text-white dark:bg-sky-500/20 dark:text-sky-300'
                  : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
              }`}
            >
              <Icon size={14} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${
            feedback.type === 'ok'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
          }`}
        >
          {feedback.type === 'ok' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* TAB 1: SUBMISSIONS */}
      {tab === 'submissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="text-xs min-h-[40px]"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Needs Correction">Needs Correction</option>
                <option value="Approved">Approved</option>
                <option value="Published">Published</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="text-xs min-h-[40px]"
              >
                <option value="all">All Categories</option>
                <option value="Card">Card</option>
                <option value="Term">Term</option>
                <option value="MCQ">MCQ</option>
              </select>
            </div>

            {filteredSubs.length === 0 ? (
              <div className="empty text-xs">No submissions match your filter.</div>
            ) : (
              <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
                {filteredSubs.map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => openSubInspector(sub)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openSubInspector(sub);
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedSub?.id === sub.id
                        ? 'border-[#0D9488] bg-teal-50/60 dark:bg-teal-950/30'
                        : 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-mono font-bold text-[#0D9488] truncate">{sub.id}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="badge">{sub.status}</span>
                        {sub.status !== 'Approved' && sub.status !== 'Published' && (
                          <button
                            type="button"
                            disabled={moderatingItemId === sub.id}
                            onClick={e => {
                              e.stopPropagation();
                              handleModeratePaperStatus(sub.id, 'approved');
                            }}
                            className="px-2 py-1 rounded-md border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 text-[11px] font-bold inline-flex items-center gap-1"
                            aria-label={`Approve paper ${sub.examName}`}
                          >
                            {moderatingItemId === sub.id ? (
                              <Loader2 size={11} className="animate-spin" />
                            ) : (
                              <CheckCircle2 size={11} />
                            )}
                            <span>Approve</span>
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={moderatingItemId === sub.id}
                          onClick={e => {
                            e.stopPropagation();
                            handleModeratePaperStatus(sub.id, 'deleted');
                          }}
                          className="px-2 py-1 rounded-md border border-rose-500/30 text-rose-600 hover:bg-rose-500/10 text-[11px] font-bold inline-flex items-center gap-1"
                          aria-label={`Delete paper ${sub.examName}`}
                        >
                          {moderatingItemId === sub.id ? (
                            <Loader2 size={11} className="animate-spin" />
                          ) : (
                            <Trash2 size={11} />
                          )}
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="font-bold text-sm text-[var(--ink)] mt-1">{sub.examName}</div>
                    <div className="text-xs text-[var(--mut)] mt-0.5">
                      {sub.collegeName} &bull; {sub.subject} ({sub.category})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            {!selectedSub ? (
              <div className="empty text-sm">
                Select a submission on the left to review files, verify Drive links, run OCR extraction, or approve.
              </div>
            ) : (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedSub(null)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0D9488] bg-transparent border-0 p-0 mb-1"
                    >
                      <ArrowLeft size={12} /> Back to Papers List
                    </button>
                    <div className="text-xs font-mono text-[#0D9488] font-bold">{selectedSub.id}</div>
                    <h3 className="text-lg font-extrabold text-[var(--ink)] m-0">{selectedSub.examName}</h3>
                    <div className="text-xs text-[var(--mut)]">
                      {selectedSub.collegeName} &bull; By {selectedSub.contributorName} ({selectedSub.contributorBatch || 'Student'})
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge">{selectedSub.status}</span>
                    <span className="badge">{selectedSub.method.toUpperCase()}</span>
                  </div>
                </div>

                {/* Files / Links Preview */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--mut)]">
                    Submitted Attachments
                  </div>
                  {selectedSub.files.map(f => {
                    const authedUrl =
                      f.url.startsWith('/') && authToken
                        ? `${f.url}?token=${encodeURIComponent(authToken)}`
                        : f.url;
                    return (
                      <div key={f.id} className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold truncate">{f.originalName}</span>
                          <a
                            href={authedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn sm alt no-underline shrink-0"
                          >
                            <ExternalLink size={12} /> Open
                          </a>
                        </div>
                        {f.mimeType.startsWith('image/') && (
                          <img
                            src={authedUrl}
                            alt={f.originalName}
                            className="max-h-64 rounded border border-[var(--line)] object-contain mx-auto"
                          />
                        )}
                      </div>
                    );
                  })}

                  {selectedSub.driveLinks.map((lnk, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs min-w-0">
                      <span className="truncate font-mono min-w-0 w-full">{lnk}</span>
                      <a href={lnk} target="_blank" rel="noopener noreferrer" className="btn sm alt no-underline shrink-0">
                        <ExternalLink size={12} /> Open Drive
                      </a>
                    </div>
                  ))}
                </div>

                {/* Review Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">MBBS Professional Exam</label>
                    <select
                      value={editProf}
                      onChange={e => setEditProf(e.target.value as ProfessionalExamId)}
                      className="min-h-[40px] text-xs"
                    >
                      {profConfigs.map(cfg => (
                        <option key={cfg.id} value={cfg.id}>
                          {cfg.shortLabel}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Subject</label>
                    <input
                      value={editSubject}
                      onChange={e => setEditSubject(e.target.value)}
                      placeholder="Subject"
                      className="min-h-[40px] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Status</label>
                    <select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value as SubmissionStatus)}
                      className="min-h-[40px] text-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Needs Correction">Needs Correction</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Paper</label>
                    <input
                      value={editPaper}
                      onChange={e => setEditPaper(e.target.value)}
                      placeholder="Paper-I / Paper-II"
                      className="min-h-[40px] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Chapter / Topic</label>
                    <input
                      value={editChapter}
                      onChange={e => setEditChapter(e.target.value)}
                      placeholder="Assign Chapter"
                      className="min-h-[40px] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Year</label>
                    <input
                      value={editYear}
                      onChange={e => setEditYear(e.target.value)}
                      placeholder="2025"
                      className="min-h-[40px] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Admin Review / Correction Comment</label>
                  <textarea
                    rows={2}
                    value={editComment}
                    onChange={e => setEditComment(e.target.value)}
                    placeholder="Feedback visible to submitter (e.g. Drive link requires public viewer access)..."
                    className="text-xs"
                  />
                </div>

                {/* OCR Extraction & Draft MCQs */}
                <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-extrabold text-[var(--ink)] flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#0D9488]" />
                        <span>OCR-Assisted Question Extraction</span>
                      </div>
                      <div className="text-[11px] text-[var(--mut)]">
                        Extracts verbatim text/options without fabricating missing answer keys.
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={ocrLoading}
                      onClick={handleRunOcr}
                      className="btn sm alt"
                    >
                      {ocrLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                      <span>Run OCR Extraction</span>
                    </button>
                  </div>

                  {selectedSub.ocrStatusNote && (
                    <div className="text-[11px] text-[var(--ink-secondary)] p-2 rounded bg-[var(--card)] border border-[var(--line)]">
                      {selectedSub.ocrStatusNote}
                    </div>
                  )}

                  {selectedSub.ocrRawText && (
                    <details className="text-xs">
                      <summary className="cursor-pointer font-bold text-[#0D9488]">
                        View Extracted Raw Text
                      </summary>
                      <pre className="mt-2 p-2.5 rounded bg-[var(--card)] border border-[var(--line)] whitespace-pre-wrap text-[11px] max-h-48 overflow-y-auto">
                        {selectedSub.ocrRawText}
                      </pre>
                    </details>
                  )}

                  {draftMcqs.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold text-[var(--ink)]">
                        Extracted Draft MCQs ({draftMcqs.length}) — Check &ldquo;Verified&rdquo; to include on Publish:
                      </div>
                      {draftMcqs.map((d, idx) => (
                        <div key={d.id} className="p-3 rounded-lg bg-[var(--card)] border border-[var(--line)] space-y-2 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold">
                              #{idx + 1} ({d.type}) {!d.answerKeyPresent && '• No printed answer key found'}
                            </span>
                            <label className="inline-flex items-center gap-1.5 font-bold cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(d.verifiedByAdmin)}
                                onChange={e => {
                                  const next = [...draftMcqs];
                                  next[idx] = { ...d, verifiedByAdmin: e.target.checked };
                                  setDraftMcqs(next);
                                }}
                                className="!w-4 !h-4"
                              />
                              <span>Verified</span>
                            </label>
                          </div>
                          <div className="font-semibold text-[var(--ink)]">{d.stem}</div>
                          {d.type === 'SBA' && d.opts && (
                            <div className="space-y-1">
                              {d.opts.map((o, oIdx) => (
                                <label key={oIdx} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`sba_ans_${d.id}`}
                                    checked={d.correctIndex === oIdx}
                                    onChange={() => {
                                      const next = [...draftMcqs];
                                      next[idx] = { ...d, correctIndex: oIdx };
                                      setDraftMcqs(next);
                                    }}
                                    className="!w-3.5 !h-3.5"
                                  />
                                  <span>
                                    {String.fromCharCode(65 + oIdx)}. {o}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--line)]">
                  <div className="space-y-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={creditContrib}
                        onChange={e => setCreditContrib(e.target.checked)}
                        className="!w-4 !h-4"
                      />
                      <span>Add submitter to Contributors list on publish</span>
                    </label>
                    {draftMcqs.some(d => d.verifiedByAdmin) && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={publishWithMcqs}
                          onChange={e => setPublishWithMcqs(e.target.checked)}
                          className="!w-4 !h-4"
                        />
                        <span>Also publish verified MCQs into Exam &amp; Practice bank</span>
                      </label>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedSub.status !== 'Approved' && selectedSub.status !== 'Published' && (
                      <button
                        type="button"
                        disabled={moderatingItemId === selectedSub.id}
                        onClick={() => handleModeratePaperStatus(selectedSub.id, 'approved')}
                        className="btn good min-h-[42px]"
                      >
                        {moderatingItemId === selectedSub.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <CheckCircle2 size={14} />
                        )}
                        <span>Approve &amp; Publish</span>
                      </button>
                    )}
                    {selectedSub.status !== 'Rejected' && (
                      <button
                        type="button"
                        disabled={moderatingItemId === selectedSub.id}
                        onClick={() => handleModeratePaperStatus(selectedSub.id, 'rejected')}
                        className="btn alt text-amber-700 dark:text-amber-300 border-amber-500/30 min-h-[42px]"
                      >
                        <XCircle size={14} />
                        <span>Reject</span>
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={moderatingItemId === selectedSub.id}
                      onClick={() => handleModeratePaperStatus(selectedSub.id, 'deleted')}
                      className="btn alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10 min-h-[42px]"
                    >
                      {moderatingItemId === selectedSub.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      <span>{moderatingItemId === selectedSub.id ? 'Deleting...' : 'Delete Paper'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: TAXONOMY, PROF CATEGORIES & CLASSIFICATION */}
      {tab === 'chapters' && (
        <div className="space-y-6">
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                Manage MBBS Professional Exam Taxonomy
              </h3>
              <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                Add subjects to any MBBS Professional Examination, or register new Chapters and Years.
              </p>
            </div>

            {/* Add Subject to Professional Exam */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={newSubjectProf}
                onChange={e => setNewSubjectProf(e.target.value as ProfessionalExamId)}
                className="text-sm min-h-[42px]"
              >
                {profConfigs.map(cfg => (
                  <option key={cfg.id} value={cfg.id}>
                    {cfg.title}
                  </option>
                ))}
              </select>
              <input
                value={newSubjectName}
                onChange={e => setNewSubjectName(e.target.value)}
                placeholder="New Subject Name..."
                className="text-sm min-h-[42px]"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddTaxonomy({
                    type: 'subject',
                    professionalExam: newSubjectProf,
                    subject: newSubjectName
                  })
                }
                className="btn min-h-[42px]"
              >
                <Plus size={15} /> Add Subject to Prof
              </button>
            </div>

            {/* Add Chapter */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-[var(--line-light)]">
              <select
                value={newChapterSubj}
                onChange={e => setNewChapterSubj(e.target.value)}
                className="text-sm min-h-[42px]"
              >
                {Array.from(
                  new Set([
                    ...getSubjectsForProf('First Professional', customTaxonomy),
                    ...getSubjectsForProf('Second Professional', customTaxonomy),
                    ...getSubjectsForProf('Third Professional', customTaxonomy),
                    ...getSubjectsForProf('Fourth Professional', customTaxonomy)
                  ])
                ).map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                value={newChapterPaper}
                onChange={e => setNewChapterPaper(e.target.value)}
                className="text-sm min-h-[42px]"
              >
                <option value="Paper-I">Paper-I</option>
                <option value="Paper-II">Paper-II</option>
                <option value="General">General</option>
              </select>
              <input
                value={newChapterName}
                onChange={e => setNewChapterName(e.target.value)}
                placeholder="New Chapter Name..."
                className="text-sm min-h-[42px]"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddTaxonomy({
                    type: 'chapter',
                    subject: newChapterSubj,
                    paper: newChapterPaper,
                    chapter: newChapterName
                  })
                }
                className="btn min-h-[42px]"
              >
                <Plus size={15} /> Add Chapter
              </button>
            </div>

            {/* Add Year */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line-light)]">
              <input
                value={newYearVal}
                onChange={e => setNewYearVal(e.target.value)}
                placeholder="Add Year (e.g. 2026)"
                className="!w-44 text-sm min-h-[40px]"
              />
              <button
                type="button"
                onClick={() => handleAddTaxonomy({ type: 'year', year: newYearVal })}
                className="btn alt min-h-[40px]"
              >
                Add Year
              </button>
              <span className="text-xs text-[var(--mut)] self-center ml-2">
                Custom Years: {customTaxonomy.years.join(', ') || 'None yet'}
              </span>
            </div>
          </div>

          {/* Reclassify Published Community Papers */}
          {publishedPapers.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-4">
              <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                Published Question Papers Classification ({publishedPapers.length})
              </h3>
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto">
                {publishedPapers.map(p => {
                  const current = paperProfEdits[p.id] || {
                    professionalExam: p.professionalExam || 'First Professional',
                    classificationRole: p.classificationRole || 'Main Professional Examination Subject',
                    subject: p.subject,
                    paper: p.paper || 'General',
                    chapter: p.chapter || ''
                  };
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] space-y-2"
                    >
                      <div className="font-bold text-xs sm:text-sm text-[var(--ink)]">
                        {p.examName} &middot; <span className="text-[var(--mut)]">{p.collegeName}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                        <select
                          value={current.professionalExam}
                          onChange={e =>
                            setPaperProfEdits(prev => ({
                              ...prev,
                              [p.id]: { ...current, professionalExam: e.target.value as ProfessionalExamId }
                            }))
                          }
                          className="text-xs min-h-[38px]"
                        >
                          {profConfigs.map(cfg => (
                            <option key={cfg.id} value={cfg.id}>
                              {cfg.shortLabel}
                            </option>
                          ))}
                        </select>
                        <select
                          value={current.classificationRole}
                          onChange={e =>
                            setPaperProfEdits(prev => ({
                              ...prev,
                              [p.id]: { ...current, classificationRole: e.target.value as SubjectClassificationRole }
                            }))
                          }
                          className="text-xs min-h-[38px]"
                        >
                          <option value="Main Professional Examination Subject">Main Prof Subject</option>
                          <option value="Phase Teaching / Formative Subject">Phase Teaching / Formative</option>
                        </select>
                        <input
                          value={current.subject}
                          onChange={e =>
                            setPaperProfEdits(prev => ({
                              ...prev,
                              [p.id]: { ...current, subject: e.target.value }
                            }))
                          }
                          placeholder="Subject"
                          className="text-xs min-h-[38px]"
                        />
                        <input
                          value={current.paper}
                          onChange={e =>
                            setPaperProfEdits(prev => ({
                              ...prev,
                              [p.id]: { ...current, paper: e.target.value }
                            }))
                          }
                          placeholder="Paper"
                          className="text-xs min-h-[38px]"
                        />
                        <input
                          value={current.chapter}
                          onChange={e =>
                            setPaperProfEdits(prev => ({
                              ...prev,
                              [p.id]: { ...current, chapter: e.target.value }
                            }))
                          }
                          placeholder="Chapter"
                          className="text-xs min-h-[38px]"
                        />
                        <button
                          type="button"
                          onClick={() => handleReclassifyPublishedPaper(p)}
                          className="btn sm min-h-[38px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pending Chapter / Prof Classification */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-600" />
              <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                Questions Pending Chapter / Prof Review ({pendingChapterQuestions.length})
              </h3>
            </div>
            <p className="text-xs text-[var(--mut)] m-0">
              These MCQs had ambiguous stems and were safely flagged for review rather than guessed. Assign verified Professional Exam stage, curriculum role, and chapters below.
            </p>
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
              {pendingChapterQuestions.slice(0, 30).map(q => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-[#0D9488]">
                      {q.professionalExam} &bull; {q.subject} &bull; {q.paper} &bull; {q.session} ({q.id})
                    </div>
                    <div className="text-sm font-semibold text-[var(--ink)]">{q.stem}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <select
                      value={profAssignValues[q.id] || q.professionalExam}
                      onChange={e =>
                        setProfAssignValues(prev => ({
                          ...prev,
                          [q.id]: e.target.value as ProfessionalExamId
                        }))
                      }
                      className="!w-40 text-xs min-h-[38px]"
                    >
                      {profConfigs.map(cfg => (
                        <option key={cfg.id} value={cfg.id}>
                          {cfg.shortLabel}
                        </option>
                      ))}
                    </select>
                    <select
                      value={roleAssignValues[q.id] || q.classificationRole}
                      onChange={e =>
                        setRoleAssignValues(prev => ({
                          ...prev,
                          [q.id]: e.target.value as SubjectClassificationRole
                        }))
                      }
                      className="!w-44 text-xs min-h-[38px]"
                    >
                      <option value="Main Professional Examination Subject">Main Prof Subject</option>
                      <option value="Phase Teaching / Formative Subject">Phase Teaching / Formative</option>
                    </select>
                    <input
                      value={chapterAssignValues[q.id] || ''}
                      onChange={e =>
                        setChapterAssignValues(prev => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="Chapter name..."
                      className="!w-40 text-xs min-h-[38px]"
                    />
                    <button
                      type="button"
                      onClick={() => handleAssignChapterOverride(q.id)}
                      className="btn sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTES */}
      {tab === 'notes' && (
        <div className="space-y-3">
          {notes.length === 0 ? (
            <div className="empty text-xs">No study notes submitted yet.</div>
          ) : (
            [...notes]
              .sort((a, b) => (a.status === 'pending' ? 0 : 1) - (b.status === 'pending' ? 0 : 1))
              .map(n => {
                const profVal = noteProfEdits[n.id] || n.professionalExam || 'First Professional';
                const roleVal =
                  noteRoleEdits[n.id] ||
                  n.classificationRole ||
                  'Main Professional Examination Subject';
                return (
                  <div
                    key={n.id}
                    className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold text-[#0D9488] flex flex-wrap items-center gap-1.5">
                        <span>
                          {n.professionalExam || 'First Professional'} &bull; {n.subject}
                          {n.paper ? ` · ${n.paper}` : ''}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10.5px] font-extrabold uppercase ${
                            n.status === 'approved'
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                              : n.status === 'rejected'
                                ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                                : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {n.status === 'approved'
                            ? 'Approved'
                            : n.status === 'rejected'
                              ? 'Rejected'
                              : 'Pending Approval'}
                        </span>
                      </div>
                      <div className="font-bold text-sm text-[var(--ink)] truncate">{n.title}</div>
                      <div className="text-xs text-[var(--mut)]">
                        By {n.fullName} ({n.collegeName})
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <select
                        value={profVal}
                        onChange={e =>
                          setNoteProfEdits(prev => ({
                            ...prev,
                            [n.id]: e.target.value as ProfessionalExamId
                          }))
                        }
                        className="!w-36 text-xs min-h-[36px]"
                      >
                        {profConfigs.map(cfg => (
                          <option key={cfg.id} value={cfg.id}>
                            {cfg.shortLabel}
                          </option>
                        ))}
                      </select>
                      <select
                        value={roleVal}
                        onChange={e =>
                          setNoteRoleEdits(prev => ({
                            ...prev,
                            [n.id]: e.target.value as SubjectClassificationRole
                          }))
                        }
                        className="!w-40 text-xs min-h-[36px]"
                      >
                        <option value="Main Professional Examination Subject">Main Prof Subject</option>
                        <option value="Phase Teaching / Formative Subject">
                          Phase Teaching / Formative
                        </option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleUpdateNoteProf(n.id)}
                        className="btn sm alt"
                      >
                        Save
                      </button>
                      {n.fileUrl && (
                        <a
                          href={
                            n.fileUrl.startsWith('/') && authToken
                              ? `${n.fileUrl}?token=${encodeURIComponent(authToken)}`
                              : n.fileUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn sm alt no-underline"
                        >
                          <ExternalLink size={12} /> Open
                        </a>
                      )}
                      {n.status !== 'approved' && (
                        <button
                          type="button"
                          disabled={moderatingItemId === n.id}
                          onClick={() => handleModerateNoteStatus(n.id, 'approved')}
                          className="btn sm good"
                        >
                          {moderatingItemId === n.id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={13} />
                          )}
                          <span>Approve</span>
                        </button>
                      )}
                      {n.status === 'pending' && (
                        <button
                          type="button"
                          disabled={moderatingItemId === n.id}
                          onClick={() => handleModerateNoteStatus(n.id, 'rejected')}
                          className="btn sm alt text-amber-700 dark:text-amber-300 border-amber-500/30"
                        >
                          <XCircle size={13} />
                          <span>Reject</span>
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={moderatingItemId === n.id}
                        onClick={() => handleDeleteNoteFromAdmin(n.id)}
                        className="btn sm alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10"
                      >
                        {moderatingItemId === n.id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                        <span>{moderatingItemId === n.id ? 'Deleting...' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}

      {/* TAB 3B: VIVA QUESTIONS */}
      {tab === 'viva' && (
        <div className="space-y-3">
          {vivaItems.length === 0 ? (
            <div className="empty text-xs">No Viva questions submitted yet.</div>
          ) : (
            [...vivaItems]
              .sort((a, b) => (a.status === 'pending' ? 0 : 1) - (b.status === 'pending' ? 0 : 1))
              .map(v => (
                <div
                  key={v.id}
                  className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs font-bold text-[#0D9488] flex flex-wrap items-center gap-1.5">
                      <span>
                        {v.examiner_type} Examiner &bull; {v.prof} &bull; {v.subject}
                        {v.board_name ? ` · ${v.board_name}` : ''}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10.5px] font-extrabold uppercase ${
                          v.status === 'approved'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                            : v.status === 'rejected'
                              ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                              : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {v.status === 'approved'
                          ? 'Approved'
                          : v.status === 'rejected'
                            ? 'Rejected'
                            : 'Pending Approval'}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[var(--ink)] break-words">
                      {v.question}
                    </div>
                    {v.answer_hint && (
                      <div className="text-xs text-[var(--ink-secondary)] break-words">
                        Hint: {v.answer_hint}
                      </div>
                    )}
                    <div className="text-xs text-[var(--mut)]">
                      By {v.contributor_name}
                      {v.batch ? ` (${v.batch})` : ''}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {v.status !== 'approved' && (
                      <button
                        type="button"
                        disabled={moderatingItemId === v.id}
                        onClick={() => handleModerateVivaStatus(v.id, 'approved')}
                        className="btn sm good"
                      >
                        {moderatingItemId === v.id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}
                        <span>Approve</span>
                      </button>
                    )}
                    {v.status === 'pending' && (
                      <button
                        type="button"
                        disabled={moderatingItemId === v.id}
                        onClick={() => handleModerateVivaStatus(v.id, 'rejected')}
                        className="btn sm alt text-amber-700 dark:text-amber-300 border-amber-500/30"
                      >
                        <XCircle size={13} />
                        <span>Reject</span>
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={moderatingItemId === v.id}
                      onClick={() => handleDeleteVivaFromAdmin(v.id)}
                      className="btn sm alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10"
                    >
                      {moderatingItemId === v.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                      <span>{moderatingItemId === v.id ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* TAB 3C: RESOURCE REQUESTS */}
      {tab === 'requests' && (
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)]">
          {resourceRequests.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--mut)]">
              No student resource requests logged yet.
            </div>
          ) : (
            resourceRequests.map(req => (
              <div
                key={req.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0D9488]">
                    {req.professionalExam} &bull; {req.subject} &bull; {req.resourceType}
                  </div>
                  <div className="text-sm font-bold text-[var(--ink)]">{req.topicOrExam}</div>
                  {req.details && <div className="text-[var(--mut)]">{req.details}</div>}
                  <div className="text-[var(--mut)]">
                    By {req.requesterName} &bull; {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleToggleRequestStatus(req.id, req.status === 'Fulfilled' ? 'Open' : 'Fulfilled')
                  }
                  className={`btn sm shrink-0 ${req.status === 'Fulfilled' ? 'alt' : 'good'}`}
                >
                  {req.status === 'Fulfilled' ? 'Reopen Request' : 'Mark Fulfilled'}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: CONTRIBUTORS & TEAM MEMBERS */}
      {tab === 'contributors' && (
        <div className="space-y-5">
          <form
            onSubmit={handleSaveContributor}
            className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                {editingContributorId
                  ? 'Edit Contributor / Team Member'
                  : 'Add Contributor or Team Member'}
              </h3>
              {editingContributorId && (
                <button
                  type="button"
                  onClick={resetContributorForm}
                  className="btn sm alt"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                  Full Name *
                </label>
                <input
                  value={cName}
                  onChange={e => setCName(e.target.value)}
                  placeholder="e.g. MD Sadman Sami"
                  required
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                  Role / Team Title
                </label>
                <input
                  value={cRole}
                  onChange={e => setCRole(e.target.value)}
                  placeholder="e.g. Core Team, Contributor, Moderator"
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                  Batch
                </label>
                <input
                  value={cBatch}
                  onChange={e => setCBatch(e.target.value)}
                  placeholder="e.g. CMC 67"
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                  Medical College
                </label>
                <input
                  value={cCollege}
                  onChange={e => setCCollege(e.target.value)}
                  placeholder="Chittagong Medical College (CMC)"
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                  Contribution / Note
                </label>
                <input
                  value={cDesc}
                  onChange={e => setCDesc(e.target.value)}
                  placeholder="e.g. Question Paper Archiving & Academic Data Contribution"
                  className="text-sm min-h-[42px]"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={savingContributor}
                className="btn min-h-[42px]"
              >
                {savingContributor ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : editingContributorId ? (
                  <Save size={15} />
                ) : (
                  <Plus size={15} />
                )}
                <span>
                  {savingContributor
                    ? 'Saving...'
                    : editingContributorId
                      ? 'Save Changes'
                      : 'Add Contributor / Member'}
                </span>
              </button>
            </div>
          </form>

          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)]">
            {contributors.length === 0 ? (
              <div className="p-6 text-center text-xs text-[var(--mut)]">
                No contributors or team members listed yet.
              </div>
            ) : (
              contributors.map(c => (
                <div
                  key={c.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-[var(--ink)] break-words">
                        {c.name}
                      </span>
                      {c.role && (
                        <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/25 text-[11px] font-bold text-[#0D9488]">
                          {c.role}
                        </span>
                      )}
                      {c.batch && (
                        <span className="text-xs font-semibold text-[#0F2942] dark:text-sky-300">
                          ({c.batch})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--mut)] break-words">
                      {c.college}
                      {c.contribution ? ` · ${c.contribution}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => startEditContributor(c)}
                      className="btn sm alt min-h-[36px]"
                      aria-label={`Edit ${c.name}`}
                    >
                      <Pencil size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      disabled={moderatingItemId === c.id}
                      onClick={() => handleDeleteContributor(c.id)}
                      className="btn sm alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10 min-h-[36px]"
                      aria-label={`Delete ${c.name}`}
                    >
                      {moderatingItemId === c.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: ANNOUNCEMENTS & NOTICES */}
      {tab === 'announcements' && (
        <div className="space-y-5">
          {/* Existing Notices Selector + Add Button */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                  Website Notices &amp; Popup Campaign ({adminNotices.length})
                </h3>
                <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                  Select any notice below to edit its copy, bullets, or CTA, or create a new campus notice.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCreatingNotice(true);
                  setAnnBadge('📢 NOTICE');
                  setAnnTitle('');
                  setAnnSubtitle('');
                  setAnnBody('');
                  setAnnBullets('');
                  setAnnHighlight('');
                  setAnnCta('VIEW QUESTION ARCHIVE');
                  setAnnCtaTarget('archive');
                  setAnnEnabled(false);
                }}
                className="btn sm min-h-[40px] shrink-0"
              >
                <Plus size={14} /> Create New Notice
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {adminNotices.map(n => {
                const isSelected = !creatingNotice && selectedNoticeId === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => loadNoticeIntoForm(n)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border text-left transition-colors min-h-[40px] max-w-full ${
                      isSelected
                        ? 'border-[#0D9488] bg-teal-500/10 text-[var(--ink)]'
                        : 'border-[var(--line)] bg-[var(--bg-subtle)] text-[var(--ink-secondary)]'
                    }`}
                  >
                    <span className="truncate block max-w-[240px]">
                      {n.id === 'campaign_question_collection_2026' ? 'Primary Popup: ' : ''}
                      {n.title || 'Untitled Notice'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSaveAnnouncement}
            className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
              <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                {creatingNotice ? 'Publish New Website Notice' : 'Edit Selected Notice & Popup'}
              </h3>
              <label className="inline-flex items-center gap-2 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={annEnabled}
                  onChange={e => setAnnEnabled(e.target.checked)}
                  className="!w-4 !h-4"
                />
                <span>Show as Startup Popup</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Eyebrow / Badge Label</label>
                <input
                  value={annBadge}
                  onChange={e => setAnnBadge(e.target.value)}
                  placeholder="📢 SPECIAL ANNOUNCEMENT"
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Headline *</label>
                <input
                  value={annTitle}
                  onChange={e => setAnnTitle(e.target.value)}
                  required
                  placeholder="LET’S BUILD A MEDICAL QUESTION ARCHIVE TOGETHER!"
                  className="text-sm min-h-[42px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Subtitle</label>
              <input
                value={annSubtitle}
                onChange={e => setAnnSubtitle(e.target.value)}
                placeholder="We Are Collecting Questions From Different Medical Colleges."
                className="text-sm min-h-[42px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">
                  Body Copy (separate paragraphs with blank line)
                </label>
                <textarea
                  rows={5}
                  value={annBody}
                  onChange={e => setAnnBody(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">
                  Checklist Bullet Items (one item per line)
                </label>
                <textarea
                  rows={5}
                  value={annBullets}
                  onChange={e => setAnnBullets(e.target.value)}
                  placeholder={'PDF question papers\nImages of question papers\nGoogle Drive links'}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Highlight Callout</label>
                <input
                  value={annHighlight}
                  onChange={e => setAnnHighlight(e.target.value)}
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">CTA Button Text</label>
                <input
                  value={annCta}
                  onChange={e => setAnnCta(e.target.value)}
                  className="text-sm min-h-[42px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">CTA Destination</label>
                <select
                  value={annCtaTarget}
                  onChange={e => setAnnCtaTarget(e.target.value)}
                  className="text-sm min-h-[42px]"
                >
                  <option value="submit">Submit Question Papers</option>
                  <option value="archive">Question Archive</option>
                  <option value="exam">Take an Exam</option>
                  <option value="library">Student Library &amp; Notes</option>
                  <option value="contributors">Contributors</option>
                  <option value="notices">Notices Page</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-[var(--mut)] m-0">
              Popup behavior: Manual dismissal only (&times; or Maybe Later). No automatic timer closes the popup.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button type="submit" className="btn min-h-[44px]">
                <Save size={15} />
                <span>{creatingNotice ? 'Publish Notice' : 'Save Announcement Settings'}</span>
              </button>

              {!creatingNotice && selectedNoticeId !== 'campaign_question_collection_2026' && (
                <button
                  type="button"
                  onClick={() => handleDeleteNotice(selectedNoticeId)}
                  className="btn alt text-rose-600 min-h-[44px]"
                >
                  <Trash2 size={15} />
                  <span>Delete Notice</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* TAB 6: USERS & ROLES */}
      {tab === 'users' && (
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)]">
          {users.map(u => (
            <div
              key={u.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-bold text-sm text-[var(--ink)]">{u.fullName}</div>
                <div className="text-xs text-[var(--mut)] break-all">
                  {u.email} &bull; {u.collegeName} ({u.batch})
                </div>
              </div>
              <select
                value={u.role}
                disabled={u.id === userProfile?.id}
                onChange={e => handleRoleChange(u.id, e.target.value as UserRole)}
                className="sm:!w-40 text-xs min-h-[40px]"
              >
                <option value="student">Student</option>
                <option value="contributor">Contributor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
