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
  Save
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
import { appsScriptListUsers, appsScriptUpdateRole } from '../utils/appsScriptAuth';
import {
  listPapersRawFromAppsScript,
  mapAppsScriptPaperToSubmission,
  updateArchiveItemStatus
} from '../utils/appsScriptArchive';

interface AdminPanelProps {
  userProfile: UserProfile | null;
  authToken: string | null;
  notes: UploadedItem[];
  contributors: ContributorRecord[];
  announcement: AnnouncementRecord;
  questionOverrides: Record<string, QuestionOverride>;
  customTaxonomy: CustomTaxonomy;
  publishedPapers: PublishedPaper[];
  onRefreshAll: () => Promise<void>;
  onModerateNote: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
}

type AdminTab = 'submissions' | 'chapters' | 'notes' | 'requests' | 'contributors' | 'announcements' | 'users';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  userProfile,
  authToken,
  notes,
  contributors,
  announcement,
  questionOverrides,
  customTaxonomy,
  publishedPapers,
  onRefreshAll,
  onModerateNote,
  onDeleteNote
}) => {
  const [tab, setTab] = useState<AdminTab>('submissions');
  const [submissions, setSubmissions] = useState<QuestionSubmission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [resourceRequests, setResourceRequests] = useState<ResourceRequestRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [moderatingItemId, setModeratingItemId] = useState<string | null>(null);

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

  // Contributor Form
  const [cName, setCName] = useState('');
  const [cBatch, setCBatch] = useState('');
  const [cCollege, setCCollege] = useState('Chittagong Medical College (CMC)');
  const [cDesc, setCDesc] = useState('');

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
    if (userProfile?.role !== 'admin') return;
    setLoading(true);
    try {
      const usersPromise = appsScriptListUsers().catch(err => {
        console.error('Failed to load users:', err);
        setFeedback({ type: 'err', msg: err?.message || 'Failed to load registered users.' });
        return null;
      });

      const papersPromise = listPapersRawFromAppsScript().catch(err => {
        console.error('Failed to load papers:', err);
        return null;
      });

      const headers: Record<string, string> = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const [appsUsers, appsPapers, annRes, reqRes] = await Promise.all([
        usersPromise,
        papersPromise,
        authToken ? fetch('/api/admin/announcements', { headers }).catch(() => null) : Promise.resolve(null),
        fetch('/api/resource-requests').catch(() => null)
      ]);

      if (Array.isArray(appsUsers)) {
        setUsers(appsUsers);
      }

      if (Array.isArray(appsPapers)) {
        const mappedSubs = appsPapers.map(mapAppsScriptPaperToSubmission);
        setSubmissions(mappedSubs);
        if (selectedSub) {
          const updated = mappedSubs.find(s => s.id === selectedSub.id);
          if (updated) {
            setSelectedSub(updated);
            setDraftMcqs(updated.extractedMcqs || []);
          } else {
            setSelectedSub(null);
          }
        }
      }

      if (annRes && annRes.ok) {
        const annData = await annRes.json();
        if (Array.isArray(annData.announcements) && annData.announcements.length > 0) {
          setAdminNotices(annData.announcements);
        }
      }

      if (reqRes && reqRes.ok) {
        const reqData = await reqRes.json();
        if (Array.isArray(reqData.requests)) {
          setResourceRequests(reqData.requests);
        }
      }
    } catch (e) {
      console.error('Failed to load admin data:', e);
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

  if (!userProfile || userProfile.role !== 'admin') {
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
    setFeedback(null);
    setModeratingItemId(paperId);
    try {
      await updateArchiveItemStatus('paper', paperId, status);
      if (status === 'deleted' && selectedSub?.id === paperId) {
        setSelectedSub(null);
      }
      setFeedback({
        type: 'ok',
        msg:
          status === 'approved'
            ? 'Question paper approved and published to the public archive.'
            : status === 'rejected'
              ? 'Question paper rejected.'
              : 'Question paper deleted.'
      });
      await fetchAdminData();
      await onRefreshAll();
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Paper status update failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleModerateNoteAction = async (
    noteId: string,
    status: 'approved' | 'rejected' | 'deleted'
  ) => {
    setFeedback(null);
    setModeratingItemId(noteId);
    try {
      if (status === 'deleted') {
        await onDeleteNote(noteId);
      } else {
        await onModerateNote(noteId, status);
      }
      setFeedback({
        type: 'ok',
        msg:
          status === 'approved'
            ? 'Study note approved and published to Verified Notes.'
            : status === 'rejected'
              ? 'Study note rejected.'
              : 'Study note deleted.'
      });
    } catch (err: any) {
      setFeedback({ type: 'err', msg: err?.message || 'Note status update failed.' });
    } finally {
      setModeratingItemId(null);
    }
  };

  const handleSaveSubmissionMeta = async () => {
    if (!selectedSub || !authToken) return;
    setFeedback(null);
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
    const data = await res.json();
    if (!res.ok) {
      setFeedback({ type: 'err', msg: data.error || 'Update failed.' });
      return;
    }
    setFeedback({ type: 'ok', msg: `Updated submission ${selectedSub.id}.` });
    await fetchAdminData();
    await onRefreshAll();
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
      const data = await res.json();
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
    } finally {
      setOcrLoading(false);
    }
  };

  const handlePublishSubmission = async () => {
    if (!selectedSub || !authToken) return;
    setFeedback(null);
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
    const data = await res.json();
    if (!res.ok) {
      setFeedback({ type: 'err', msg: data.error || 'Publish failed.' });
      return;
    }
    setFeedback({ type: 'ok', msg: data.message || 'Published to Archive.' });
    await fetchAdminData();
    await onRefreshAll();
  };

  const handleAssignChapterOverride = async (questionId: string) => {
    if (!authToken) return;
    const chap = chapterAssignValues[questionId]?.trim();
    const prof = profAssignValues[questionId];
    const role = roleAssignValues[questionId];
    if (!chap && !prof && !role) return;
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
    if (res.ok) {
      setFeedback({ type: 'ok', msg: `Updated classification for ${questionId}.` });
      await onRefreshAll();
    }
  };

  const handleReclassifyPublishedPaper = async (paperItem: PublishedPaper) => {
    if (!authToken) return;
    const patch = paperProfEdits[paperItem.id];
    if (!patch) return;
    const res = await fetch(`/api/admin/published-papers/${paperItem.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patch)
    });
    if (res.ok) {
      setFeedback({ type: 'ok', msg: `Updated paper "${paperItem.examName}" (${patch.professionalExam}).` });
      await onRefreshAll();
    }
  };

  const handleUpdateNoteProf = async (noteId: string) => {
    if (!authToken) return;
    const prof = noteProfEdits[noteId];
    const role = noteRoleEdits[noteId];
    if (!prof && !role) return;
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
    if (res.ok) {
      setFeedback({ type: 'ok', msg: `Updated note classification.` });
      await onRefreshAll();
    }
  };

  const handleToggleRequestStatus = async (reqId: string, nextStatus: 'Open' | 'Fulfilled') => {
    if (!authToken) return;
    const res = await fetch(`/api/admin/resource-requests/${reqId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) {
      setFeedback({ type: 'ok', msg: `Resource request marked ${nextStatus}.` });
      await fetchAdminData();
    }
  };

  const handleAddTaxonomy = async (payload: any) => {
    if (!authToken) return;
    const res = await fetch('/api/admin/taxonomy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setNewSubjectName('');
      setNewChapterName('');
      setNewYearVal('');
      setFeedback({ type: 'ok', msg: 'Curriculum taxonomy updated.' });
      await onRefreshAll();
    }
  };

  const handleAddContributor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken || !cName.trim()) return;
    const res = await fetch('/api/admin/contributors', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cName,
        batch: cBatch,
        college: cCollege,
        contribution: cDesc
      })
    });
    if (res.ok) {
      setCName('');
      setCBatch('');
      setCDesc('');
      setFeedback({ type: 'ok', msg: 'Contributor added.' });
      await onRefreshAll();
    }
  };

  const handleDeleteContributor = async (id: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/admin/contributors/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (res.ok) await onRefreshAll();
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

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
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
  };

  const handleDeleteNotice = async (noticeId: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/admin/announcements/${noticeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) {
      setFeedback({ type: 'err', msg: data.error || 'Cannot delete notice.' });
      return;
    }
    setFeedback({ type: 'ok', msg: 'Notice deleted.' });
    setSelectedNoticeId(announcement.id);
    loadNoticeIntoForm(announcement);
    await fetchAdminData();
    await onRefreshAll();
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
            label: `Papers (${submissions.filter(s => s.status === 'Pending').length} pending)`,
            icon: FileText
          },
          {
            id: 'chapters' as const,
            label: `Taxonomy & Review (${pendingChapterQuestions.length})`,
            icon: Layers
          },
          {
            id: 'notes' as const,
            label: `Notes (${notes.filter(n => n.status === 'pending').length} pending)`,
            icon: BookOpen
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
              onClick={() => setTab(t.id)}
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
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => openSubInspector(sub)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      selectedSub?.id === sub.id
                        ? 'border-[#0D9488] bg-teal-50/60 dark:bg-teal-950/30'
                        : 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-[#0D9488]">{sub.id}</span>
                      <span className="badge">{sub.status}</span>
                    </div>
                    <div className="font-bold text-sm text-[var(--ink)] mt-1">{sub.examName}</div>
                    <div className="text-xs text-[var(--mut)] mt-0.5">
                      {sub.collegeName} &bull; {sub.subject} ({sub.category})
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            {!selectedSub ? (
              <div className="empty text-sm">
                Select a submission on the left to review files, verify Drive links, run OCR extraction, or publish.
              </div>
            ) : (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div>
                    <div className="text-xs font-mono text-[#0D9488] font-bold">{selectedSub.id}</div>
                    <h3 className="text-lg font-extrabold text-[var(--ink)] m-0">{selectedSub.examName}</h3>
                    <div className="text-xs text-[var(--mut)]">
                      {selectedSub.collegeName} &bull; By {selectedSub.contributorName} ({selectedSub.contributorBatch || 'Student'})
                    </div>
                  </div>
                  <span className="badge">{selectedSub.method.toUpperCase()}</span>
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
                    {selectedSub.status !== 'Approved' && (
                      <button
                        type="button"
                        disabled={moderatingItemId === selectedSub.id}
                        onClick={() => handleModeratePaperStatus(selectedSub.id, 'approved')}
                        className="btn good min-h-[42px]"
                      >
                        <CheckCircle2 size={14} /> Approve
                      </button>
                    )}
                    {selectedSub.status !== 'Rejected' && (
                      <button
                        type="button"
                        disabled={moderatingItemId === selectedSub.id}
                        onClick={() => handleModeratePaperStatus(selectedSub.id, 'rejected')}
                        className="btn alt text-rose-600 min-h-[42px]"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={moderatingItemId === selectedSub.id}
                      onClick={() => handleModeratePaperStatus(selectedSub.id, 'deleted')}
                      className="btn alt text-rose-600 min-h-[42px]"
                    >
                      <Trash2 size={14} /> Delete
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

      {/* TAB 3: NOTES MODERATION */}
      {tab === 'notes' && (
        <div className="space-y-3">
          {notes.length === 0 ? (
            <div className="empty text-xs">No study notes in the moderation queue yet.</div>
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
                      <div className="text-xs font-bold text-[#0D9488]">
                        {n.professionalExam || 'First Professional'} &bull; {n.subject}
                        {n.paper ? ` · ${n.paper}` : ''} &bull; {n.status.toUpperCase()}
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
                          onClick={() => handleModerateNoteAction(n.id, 'approved')}
                          className="btn sm good"
                        >
                          Approve
                        </button>
                      )}
                      {n.status !== 'rejected' && (
                        <button
                          type="button"
                          disabled={moderatingItemId === n.id}
                          onClick={() => handleModerateNoteAction(n.id, 'rejected')}
                          className="btn sm alt text-rose-600"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={moderatingItemId === n.id}
                        onClick={() => handleModerateNoteAction(n.id, 'deleted')}
                        className="btn sm alt text-rose-600"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}

      {/* TAB 3B: RESOURCE REQUESTS */}
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

      {/* TAB 4: CONTRIBUTORS */}
      {tab === 'contributors' && (
        <div className="space-y-5">
          <form
            onSubmit={handleAddContributor}
            className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-4"
          >
            <h3 className="text-base font-extrabold text-[var(--ink)] m-0">Add Verified Contributor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={cName}
                onChange={e => setCName(e.target.value)}
                placeholder="Full Name *"
                required
                className="text-sm min-h-[42px]"
              />
              <input
                value={cBatch}
                onChange={e => setCBatch(e.target.value)}
                placeholder="Batch (e.g. CMC 67)"
                className="text-sm min-h-[42px]"
              />
              <input
                value={cCollege}
                onChange={e => setCCollege(e.target.value)}
                placeholder="Medical College"
                className="text-sm min-h-[42px]"
              />
              <input
                value={cDesc}
                onChange={e => setCDesc(e.target.value)}
                placeholder="Contribution summary"
                className="text-sm min-h-[42px]"
              />
            </div>
            <button type="submit" className="btn min-h-[42px]">
              <Plus size={15} /> Add Contributor
            </button>
          </form>

          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)]">
            {contributors.map(c => (
              <div key={c.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-[var(--ink)]">
                    {c.name} <span className="text-xs text-[#0D9488]">({c.batch})</span>
                  </div>
                  <div className="text-xs text-[var(--mut)]">
                    {c.college} &bull; {c.contribution}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteContributor(c.id)}
                  className="p-2 text-rose-600 hover:bg-rose-500/10 rounded-lg"
                  aria-label="Delete contributor"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
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
                disabled={u.id === userProfile.id}
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
