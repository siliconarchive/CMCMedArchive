import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Clock,
  UploadCloud,
  User,
  Search,
  X,
  RotateCcw,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  ShieldAlert,
  LogIn,
  UserPlus,
  ShieldCheck,
  FileUp,
  FileText,
  Loader2,
  Bookmark,
  MessageSquarePlus,
  Send
} from 'lucide-react';
import {
  BookmarkRecord,
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  RecentlyViewedRecord,
  ResourceRequestRecord,
  StudyState,
  UploadedItem,
  UserProfile
} from '../types';
import {
  canonicalizeSubjectName,
  getMergedProfConfigs,
  getPapersForSubjectInProf,
  getProfConfig,
  getSubjectsForProf,
  isDentalSubjectOrProgram,
  subjectMatchesCanonical
} from '../data/curriculumConfig';
import { fileToBase64, submitNoteToAppsScript } from '../utils/appsScriptArchive';

interface StudentLibraryProps {
  selectedProf: ProfessionalExamId;
  customTaxonomy: CustomTaxonomy;
  notes: UploadedItem[];
  userProfile: UserProfile | null;
  authToken: string | null;
  studyState?: StudyState;
  onToggleBookmark?: (item: Omit<BookmarkRecord, 'savedAt'>) => void;
  onRecordRecentView?: (item: Omit<RecentlyViewedRecord, 'viewedAt'>) => void;
  onNavigate: (page: PageRoute) => void;
  onDeleteNote: (id: string) => Promise<void>;
}

export const StudentLibraryPage: React.FC<StudentLibraryProps> = ({
  selectedProf,
  customTaxonomy,
  notes,
  userProfile,
  authToken,
  studyState,
  onToggleBookmark,
  onRecordRecentView,
  onNavigate,
  onDeleteNote
}) => {
  const [tab, setTab] = useState<'all' | 'my' | 'requests'>('all');
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [paper, setPaper] = useState('all');
  const [kind, setKind] = useState('all');
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Resource Requests state scoped to selectedProf
  const [requests, setRequests] = useState<ResourceRequestRecord[]>([]);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqSubject, setReqSubject] = useState<string>('');
  const [reqTopic, setReqTopic] = useState('');
  const [reqType, setReqType] = useState<ResourceRequestRecord['resourceType']>('Notes');
  const [reqDetails, setReqDetails] = useState('');
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqNotice, setReqNotice] = useState<string | null>(null);

  const profConfig = getProfConfig(selectedProf, customTaxonomy);
  const profSubjects = useMemo(
    () => getSubjectsForProf(selectedProf, customTaxonomy),
    [selectedProf, customTaxonomy]
  );

  useEffect(() => {
    setSubject('all');
    setPaper('all');
    setReqSubject(profSubjects[0] || '');
  }, [selectedProf, profSubjects]);

  const loadResourceRequests = async () => {
    setReqLoading(true);
    try {
      const res = await fetch(
        `/api/resource-requests?prof=${encodeURIComponent(selectedProf)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.requests)) setRequests(data.requests);
      }
    } catch {
    } finally {
      setReqLoading(false);
    }
  };

  useEffect(() => {
    loadResourceRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProf]);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTopic.trim()) return;
    setReqSubmitting(true);
    setReqNotice(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      const res = await fetch('/api/resource-requests', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          professionalExam: selectedProf,
          subject: reqSubject || profSubjects[0],
          topicOrExam: reqTopic.trim(),
          resourceType: reqType,
          details: reqDetails.trim()
        })
      });
      if (res.ok) {
        setReqTopic('');
        setReqDetails('');
        setReqNotice('Resource request logged for this Professional Examination.');
        await loadResourceRequests();
      }
    } finally {
      setReqSubmitting(false);
    }
  };

  const mbbsNotes = useMemo(
    () =>
      notes.filter(item => {
        if (isDentalSubjectOrProgram(item.prog, item.subject)) return false;
        if (item.classificationRole === 'Phase Teaching / Formative Subject') return false;
        if ((item.professionalExam || 'First Professional') !== selectedProf) return false;
        return item.status !== 'rejected';
      }),
    [notes, selectedProf]
  );

  const availableSubjects = useMemo(() => {
    const set = new Set<string>(profSubjects);
    mbbsNotes.forEach(n => {
      if (n.subject) set.add(canonicalizeSubjectName(n.subject));
    });
    return Array.from(set).sort();
  }, [mbbsNotes, profSubjects]);

  const availablePapers = useMemo(() => {
    const set = new Set<string>(['Paper-I', 'Paper-II', 'General']);
    mbbsNotes.forEach(n => {
      if (subjectMatchesCanonical(n.subject, subject) && n.paper) set.add(n.paper);
    });
    return Array.from(set).sort();
  }, [mbbsNotes, subject]);

  const tabFiltered = mbbsNotes.filter(item => {
    if (tab === 'my') {
      return (
        userProfile &&
        (item.uploadedByUserId === userProfile.id ||
          item.uploadedByEmail?.toLowerCase() === userProfile.email.toLowerCase())
      );
    }
    return true;
  });

  const filtered = tabFiltered.filter(item => {
    if (!subjectMatchesCanonical(item.subject, subject)) return false;
    if (paper !== 'all' && (item.paper || 'General').toLowerCase() !== paper.toLowerCase()) return false;
    if (kind !== 'all' && item.kind.toLowerCase() !== kind.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const haystack = `${item.title} ${item.subject} ${item.paper || ''} ${item.topic || ''} ${item.description || item.desc || ''} ${item.fullName || ''} ${item.collegeName || ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const bookmarkedKeys = useMemo(() => {
    const set = new Set<string>();
    (studyState?.bookmarks || []).forEach(b => set.add(`${b.itemType}_${b.id}`));
    return set;
  }, [studyState?.bookmarks]);

  const myCount = userProfile
    ? mbbsNotes.filter(
        n =>
          n.uploadedByUserId === userProfile.id ||
          n.uploadedByEmail?.toLowerCase() === userProfile.email.toLowerCase()
      ).length
    : 0;

  const handleDeleteNoteClick = async (noteId: string) => {
    if (!userProfile) return;
    setDeleteError(null);
    setDeletingNoteId(noteId);
    try {
      await onDeleteNote(noteId);
    } catch (err: any) {
      setDeleteError(err?.message || 'Failed to delete study note.');
    } finally {
      setDeletingNoteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
            Study &middot; {profConfig.shortLabel}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Notes Library
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Peer-contributed notes, diagrams, and high-yield summaries verified for{' '}
            <strong className="text-[var(--ink)]">{profConfig.title}</strong>.
          </p>
        </div>
        <button type="button" className="btn shrink-0 min-h-[44px]" onClick={() => onNavigate('upload')}>
          <UploadCloud size={16} />
          <span>Upload Study Note</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('all')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] ${
            tab === 'all'
              ? 'bg-[#173B55] text-white'
              : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
          }`}
        >
          Study Notes ({mbbsNotes.length})
        </button>

        {userProfile && (
          <button
            type="button"
            onClick={() => setTab('my')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] flex items-center gap-1.5 ${
              tab === 'my'
                ? 'bg-[#173B55] text-white'
                : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
            }`}
          >
            <User size={13} />
            <span>My Uploads ({myCount})</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setTab('requests')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] flex items-center gap-1.5 ${
            tab === 'requests'
              ? 'bg-[#0D9488] text-white'
              : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
          }`}
        >
          <MessageSquarePlus size={13} />
          <span>Resource Requests ({requests.length})</span>
        </button>
      </div>

      {/* Resource Requests View */}
      {tab === 'requests' ? (
        <div className="space-y-5">
          <form
            onSubmit={handleSubmitRequest}
            className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 space-y-4"
          >
            <div>
              <h2 className="text-base font-extrabold text-[var(--ink)] m-0">
                Request Missing Study Resource ({profConfig.shortLabel})
              </h2>
              <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                Missing a specific card paper, lecture note, or topic sheet? Let contributors know.
              </p>
            </div>

            {reqNotice && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={14} />
                <span>{reqNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Subject</label>
                <select
                  value={reqSubject}
                  onChange={e => setReqSubject(e.target.value)}
                  className="text-sm min-h-[42px]"
                >
                  {profSubjects.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Resource Type</label>
                <select
                  value={reqType}
                  onChange={e => setReqType(e.target.value as ResourceRequestRecord['resourceType'])}
                  className="text-sm min-h-[42px]"
                >
                  <option value="Notes">Notes</option>
                  <option value="Question Paper">Question Paper</option>
                  <option value="Written Questions">Written Questions</option>
                  <option value="MCQ">MCQ</option>
                  <option value="Viva">Viva</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Topic or Exam Name *</label>
                <input
                  value={reqTopic}
                  onChange={e => setReqTopic(e.target.value)}
                  placeholder="e.g. Autonomic Pharmacology Card"
                  required
                  className="text-sm min-h-[42px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Additional Details (Optional)</label>
              <input
                value={reqDetails}
                onChange={e => setReqDetails(e.target.value)}
                placeholder="Mention year, college, or specific subtopics needed..."
                className="text-sm min-h-[42px]"
              />
            </div>

            <button type="submit" disabled={reqSubmitting} className="btn min-h-[42px]">
              {reqSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              <span>Submit Resource Request</span>
            </button>
          </form>

          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)]">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[var(--ink)] m-0">
                Open &amp; Fulfilled Requests ({profConfig.shortLabel})
              </h3>
              {reqLoading && <Loader2 size={14} className="animate-spin text-[var(--mut)]" />}
            </div>
            {requests.length === 0 ? (
              <div className="p-6 text-center text-xs text-[var(--mut)]">
                No resource requests logged yet for {profConfig.shortLabel}.
              </div>
            ) : (
              requests.map(r => (
                <div key={r.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#0D9488]">
                      {r.resourceType} &middot; {r.subject}
                    </div>
                    <div className="text-sm font-bold text-[var(--ink)]">{r.topicOrExam}</div>
                    {r.details && <div className="text-[var(--mut)]">{r.details}</div>}
                    <div className="text-[var(--mut)]">
                      Requested by {r.requesterName} &middot; {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold self-start sm:self-center shrink-0 ${
                      r.status === 'Fulfilled'
                        ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${profConfig.shortLabel} notes by title, topic, contributor, or college...`}
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

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <select
                value={subject}
                onChange={e => {
                  setSubject(e.target.value);
                  setPaper('all');
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

              <select value={paper} onChange={e => setPaper(e.target.value)} className="text-sm min-h-[44px]">
                <option value="all">All Papers</option>
                {availablePapers.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <select value={kind} onChange={e => setKind(e.target.value)} className="text-sm min-h-[44px]">
                <option value="all">All Formats</option>
                <option value="Notes">Notes</option>
                <option value="Diagram">Diagram</option>
                <option value="Summary">Summary</option>
              </select>

              {(search || subject !== 'all' || paper !== 'all' || kind !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSubject('all');
                    setPaper('all');
                    setKind('all');
                  }}
                  className="btn alt min-h-[44px]"
                >
                  <RotateCcw size={14} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {deleteError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{deleteError}</span>
            </div>
          )}

          {/* List */}
          {filtered.length === 0 ? (
            <div className="empty space-y-2">
              <BookOpen size={36} className="mx-auto mb-1 opacity-50" />
              <div className="font-bold text-[var(--ink)]">
                No study notes found for {profConfig.shortLabel}
              </div>
              <p className="text-xs text-[var(--mut)] mt-1 max-w-md mx-auto">
                Clear filters, upload a study note, or log a request in the Resource Requests tab.
              </p>
              <button
                type="button"
                onClick={() => setTab('requests')}
                className="btn sm alt mt-2"
              >
                Request Missing Resource
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(res => {
                const isOwner =
                  userProfile &&
                  (res.uploadedByUserId === userProfile.id || res.uploadedByEmail === userProfile.email);
                const isAdmin = userProfile?.role === 'admin';
                const fileHref = res.fileUrl
                  ? res.fileUrl.startsWith('/') && authToken
                    ? `${res.fileUrl}?token=${encodeURIComponent(authToken)}`
                    : res.fileUrl
                  : '';
                const isBookmarked = bookmarkedKeys.has(`note_${res.id}`);

                return (
                  <div
                    key={res.id}
                    className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-[#0D9488]">
                          {canonicalizeSubjectName(res.subject)}
                          {res.paper ? ` · ${res.paper}` : ''}
                          {res.topic ? ` · ${res.topic}` : ''}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[var(--mut)] font-medium">{res.kind}</span>
                          {onToggleBookmark && (
                            <button
                              type="button"
                              onClick={() =>
                                onToggleBookmark({
                                  id: res.id,
                                  itemType: 'note',
                                  professionalExam: res.professionalExam || selectedProf,
                                  subject: canonicalizeSubjectName(res.subject),
                                  paper: res.paper,
                                  chapter: res.topic,
                                  title: res.title,
                                  subtitle: `${res.kind} · ${res.fullName || 'Student Contributor'}`
                                })
                              }
                              className={`p-1.5 rounded-lg border min-h-[30px] min-w-[30px] flex items-center justify-center ${
                                isBookmarked
                                  ? 'border-[#0D9488] bg-teal-500/10 text-[#0D9488]'
                                  : 'border-[var(--line)] text-[var(--mut)] hover:text-[#0D9488]'
                              }`}
                              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
                            >
                              <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                            </button>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[var(--ink)] m-0 leading-snug break-words">
                        {res.title}
                      </h3>
                      {(res.description || res.desc) && (
                        <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed break-words">
                          {res.description || res.desc}
                        </p>
                      )}

                      <div className="p-2.5 rounded-lg bg-[var(--bg-subtle)] text-xs space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-semibold text-[var(--ink)] min-w-0">
                          <User size={13} className="text-[#0F2942] dark:text-sky-400 shrink-0" />
                          <span className="truncate">{res.fullName || res.uploader || 'Student Contributor'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[var(--mut)] min-w-0">
                          <GraduationCap size={13} className="shrink-0" />
                          <span className="truncate">
                            {res.collegeName || res.college || 'Chittagong Medical College'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--line)] text-xs">
                      <div>
                        <span className="badge ok">
                          <CheckCircle2 size={12} /> Published
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {fileHref && (
                          <a
                            href={fileHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              onRecordRecentView?.({
                                id: res.id,
                                itemType: 'note',
                                professionalExam: res.professionalExam || selectedProf,
                                subject: canonicalizeSubjectName(res.subject),
                                title: res.title,
                                subtitle: `${res.kind} · ${res.topic || res.paper || ''}`
                              })
                            }
                            className="btn sm alt no-underline min-h-[36px]"
                          >
                            <ExternalLink size={12} />
                            <span>Open File</span>
                          </a>
                        )}
                        {(isAdmin || isOwner) && (
                          <button
                            type="button"
                            disabled={deletingNoteId === res.id}
                            onClick={() => handleDeleteNoteClick(res.id)}
                            className="btn sm alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10 min-h-[36px]"
                            title="Delete note"
                            aria-label="Delete note"
                          >
                            {deletingNoteId === res.id ? (
                              <Loader2 size={13} className="animate-spin" />
                            ) : (
                              <Trash2 size={13} />
                            )}
                            <span>{deletingNoteId === res.id ? 'Deleting...' : 'Delete'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface NoteUploadPageProps {
  selectedProf: ProfessionalExamId;
  customTaxonomy: CustomTaxonomy;
  userProfile: UserProfile | null;
  authToken: string | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onUploadComplete: () => Promise<void>;
  onNavigate: (page: PageRoute) => void;
}

export const NoteUploadPage: React.FC<NoteUploadPageProps> = ({
  selectedProf,
  customTaxonomy,
  userProfile,
  authToken,
  onOpenAuth,
  onUploadComplete,
  onNavigate
}) => {
  const profConfigs = getMergedProfConfigs(customTaxonomy);
  const [noteProf, setNoteProf] = useState<ProfessionalExamId>(selectedProf);
  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [collegeName, setCollegeName] = useState(
    userProfile?.collegeName || 'Chittagong Medical College (CMC)'
  );
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(
    getSubjectsForProf(selectedProf, customTaxonomy)[0] || ''
  );
  const [paper, setPaper] = useState('Paper-I');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'drive_link'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [driveUrl, setDriveUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setNoteProf(selectedProf);
    const subs = getSubjectsForProf(selectedProf, customTaxonomy);
    if (subs.length > 0) setSubject(subs[0]);
  }, [selectedProf, customTaxonomy]);

  const profSubjects = getSubjectsForProf(noteProf, customTaxonomy);
  const subjectPapers = getPapersForSubjectInProf(noteProf, subject, customTaxonomy);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    if (uploadMethod === 'file' && !file) {
      setError('Please select a PDF or image file.');
      return;
    }
    if (uploadMethod === 'drive_link' && !driveUrl.trim()) {
      setError('Please paste a valid Google Drive link.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      let file_base64 = '';
      let file_name = '';
      let mime_type = '';
      let file_type = 'drive_link';
      let file_url = '';

      if (uploadMethod === 'file' && file) {
        const encoded = await fileToBase64(file);
        file_base64 = encoded.file_base64;
        file_name = encoded.file_name;
        mime_type = encoded.mime_type;
        file_type = encoded.mime_type.startsWith('image/') ? 'image' : 'pdf';
      } else {
        file_url = driveUrl.trim();
        file_type = 'drive_link';
      }

      await submitNoteToAppsScript({
        title: title.trim(),
        prof: noteProf,
        college_name: collegeName.trim(),
        subject,
        paper,
        topic: topic.trim(),
        contributor_name: fullName.trim() || userProfile.fullName,
        contributor_email: userProfile.email,
        description: description.trim(),
        file_url,
        file_base64,
        file_name,
        mime_type,
        file_type
      });

      setSuccess(
        'Study note submitted and published live to the Notes Library!'
      );
      setTitle('');
      setTopic('');
      setDescription('');
      setFile(null);
      setDriveUrl('');
      await onUploadComplete();
    } catch (err: any) {
      setError(err?.message || 'Network error while uploading note.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-[var(--line)] pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
          Upload Study Notes
        </h1>
        <p className="text-sm text-[var(--mut)] m-0">
          Share peer study notes, high-yield sheets, and diagrams. Looking to submit exam papers (Card, Term, MCQ)? Use{' '}
          <button
            type="button"
            onClick={() => onNavigate('submit')}
            className="text-[#0D9488] font-bold underline bg-transparent border-0 p-0"
          >
            Question Papers
          </button>
          .
        </p>
      </div>

      {!userProfile ? (
        <div className="bg-[var(--card)] border border-amber-500/30 rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={22} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-[var(--ink)] m-0">Sign In Required</h3>
              <p className="text-xs text-[var(--mut)] mt-1 m-0">
                Please sign in with your student account to upload study notes so your contribution is properly credited.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn min-h-[44px]" onClick={() => onOpenAuth('signin')}>
              <LogIn size={15} /> Sign In
            </button>
            <button type="button" className="btn alt min-h-[44px]" onClick={() => onOpenAuth('signup')}>
              <UserPlus size={15} /> Register
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={15} />
                <span>{success}</span>
              </div>
              <button type="button" className="btn sm good" onClick={() => onNavigate('library')}>
                View in Notes Library &rarr;
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Full Name *</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)} required className="min-h-[44px]" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Medical College *</label>
              <input value={collegeName} onChange={e => setCollegeName(e.target.value)} required className="min-h-[44px]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Note Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Autonomic Pharmacology High-Yield Summary"
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">MBBS Professional Exam *</label>
              <select
                value={noteProf}
                onChange={e => {
                  const next = e.target.value as ProfessionalExamId;
                  setNoteProf(next);
                  const subs = getSubjectsForProf(next, customTaxonomy);
                  if (subs.length > 0 && !subs.includes(subject)) setSubject(subs[0]);
                }}
                className="min-h-[44px]"
              >
                {profConfigs.map(cfg => (
                  <option key={cfg.id} value={cfg.id}>
                    {cfg.shortLabel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Subject *</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="min-h-[44px]">
                {profSubjects.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                {!profSubjects.includes(subject) && <option value={subject}>{subject}</option>}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Paper</label>
              <select value={paper} onChange={e => setPaper(e.target.value)} className="min-h-[44px]">
                {subjectPapers.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Topic / Chapter</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. General Pharmacology"
              className="min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief overview of what this note covers..."
            />
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setUploadMethod('file');
                  setError(null);
                }}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold min-h-[42px] ${
                  uploadMethod === 'file'
                    ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488] ring-1 ring-[#0D9488]'
                    : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink-secondary)]'
                }`}
              >
                Upload PDF / Image
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadMethod('drive_link');
                  setError(null);
                }}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold min-h-[42px] ${
                  uploadMethod === 'drive_link'
                    ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/40 text-[#0D9488] ring-1 ring-[#0D9488]'
                    : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink-secondary)]'
                }`}
              >
                Google Drive Link
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <div className="border-2 border-dashed border-[var(--line)] rounded-xl p-5 text-center bg-[var(--bg-subtle)]">
                <input
                  type="file"
                  id="note-upload-file"
                  accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                />
                {!file ? (
                  <label htmlFor="note-upload-file" className="cursor-pointer block space-y-1.5">
                    <FileUp size={30} className="mx-auto text-[#0D9488]" />
                    <div className="text-sm font-bold text-[var(--ink)]">Click to choose PDF or Image (max 25 MB)</div>
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-2 bg-[var(--card)] p-3 rounded-lg border border-[var(--line)]">
                    <div className="flex items-center gap-2 truncate text-xs font-bold">
                      <FileText size={16} className="text-[#0D9488] shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <button type="button" onClick={() => setFile(null)} className="p-1 text-[var(--mut)] hover:text-rose-600">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold mb-1">Google Drive URL *</label>
                <input
                  type="url"
                  value={driveUrl}
                  onChange={e => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... or /drive/folders/..."
                  required
                  className="min-h-[44px] text-sm"
                />
              </div>
            )}
          </div>

          <button type="submit" disabled={submitting} className="btn w-full min-h-[46px]">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Uploading Note...</span>
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                <span>Submit Note</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
