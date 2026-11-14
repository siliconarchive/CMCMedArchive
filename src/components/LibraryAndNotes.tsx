import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { PageRoute, UploadedItem, UserProfile } from '../types';

export const VivaBankPage: React.FC<{ onNavigate: (page: PageRoute) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center gap-3 border-b border-[var(--line)] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
          Viva Bank
        </h1>
        <span className="px-3 py-1 bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold text-xs rounded-md">
          Under Development
        </span>
      </div>

      <div className="bg-[var(--card)] border border-amber-500/30 rounded-xl p-6 space-y-3">
        <div className="flex items-start gap-3">
          <Clock className="text-amber-600 shrink-0 mt-0.5" size={22} />
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[var(--ink)] m-0">
              Section Status: Under Active Development
            </h2>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed m-0">
              The teacher-wise viva question bank and card-table examiner repository are currently being cataloged and verified. This feature is not yet active.
            </p>
            <p className="text-xs text-[var(--mut)] m-0">
              Planned scope: Examiner-wise board cards, Gross Anatomy table questions, Histology slide checklists, Physiology graphs, and Biochemistry spot cases.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-dashed border-[var(--line-strong)] rounded-xl p-8 text-center space-y-3">
        <BookOpen size={36} className="mx-auto text-[var(--mut)] opacity-60" />
        <h3 className="text-base font-bold text-[var(--ink)] m-0">Viva Archiving In Progress</h3>
        <p className="text-xs text-[var(--mut)] max-w-md mx-auto m-0">
          In the meantime, explore the verified Written (CQ) and MCQ archives or test yourself with the Online Examination tool.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button type="button" className="btn min-h-[44px]" onClick={() => onNavigate('archive')}>
            Browse Question Archive &rarr;
          </button>
          <button type="button" className="btn alt min-h-[44px]" onClick={() => onNavigate('exam')}>
            Take an Exam
          </button>
        </div>
      </div>
    </div>
  );
};

interface StudentLibraryProps {
  notes: UploadedItem[];
  userProfile: UserProfile | null;
  authToken: string | null;
  onNavigate: (page: PageRoute) => void;
  onModerateNote: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
}

export const StudentLibraryPage: React.FC<StudentLibraryProps> = ({
  notes,
  userProfile,
  authToken,
  onNavigate,
  onModerateNote,
  onDeleteNote
}) => {
  const [tab, setTab] = useState<'all' | 'my' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [kind, setKind] = useState('all');

  const tabFiltered = notes.filter(item => {
    if (tab === 'my') {
      return userProfile && (item.uploadedByUserId === userProfile.id || item.uploadedByEmail === userProfile.email);
    }
    if (tab === 'pending') return item.status === 'pending';
    return (
      item.status === 'approved' ||
      (userProfile && (item.uploadedByUserId === userProfile.id || item.uploadedByEmail === userProfile.email))
    );
  });

  const filtered = tabFiltered.filter(item => {
    if (subject !== 'all' && item.subject.toLowerCase() !== subject.toLowerCase()) return false;
    if (kind !== 'all' && item.kind.toLowerCase() !== kind.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const haystack = `${item.title} ${item.subject} ${item.topic || ''} ${item.description || item.desc || ''} ${item.fullName || ''} ${item.collegeName || ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const myCount = userProfile
    ? notes.filter(n => n.uploadedByUserId === userProfile.id || n.uploadedByEmail === userProfile.email).length
    : 0;
  const pendingCount = userProfile?.role === 'admin' ? notes.filter(n => n.status === 'pending').length : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Notes &amp; Student Library
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Peer-contributed revision notes, diagrams, and high-yield summaries verified for MBBS/BDS study.
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
          Verified Notes ({notes.filter(n => n.status === 'approved').length})
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

        {userProfile?.role === 'admin' && (
          <button
            type="button"
            onClick={() => setTab('pending')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors min-h-[40px] flex items-center gap-1.5 ${
              tab === 'pending'
                ? 'bg-amber-600 text-white'
                : 'bg-[var(--card)] border border-amber-300 text-amber-700 dark:text-amber-300'
            }`}
          >
            <ShieldCheck size={13} />
            <span>Pending Moderation ({pendingCount})</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes by title, topic, contributor, or college..."
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
          <select value={subject} onChange={e => setSubject(e.target.value)} className="text-sm min-h-[44px]">
            <option value="all">All Subjects</option>
            <option value="Anatomy">Anatomy</option>
            <option value="Physiology">Physiology</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Pathology">Pathology</option>
            <option value="Pharmacology">Pharmacology</option>
            <option value="Microbiology">Microbiology</option>
          </select>

          <select value={kind} onChange={e => setKind(e.target.value)} className="text-sm min-h-[44px]">
            <option value="all">All Formats</option>
            <option value="Notes">Notes</option>
            <option value="Diagram">Diagram</option>
            <option value="Summary">Summary</option>
          </select>

          {(search || subject !== 'all' || kind !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSubject('all');
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

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty">
          <BookOpen size={36} className="mx-auto mb-2 opacity-50" />
          <div className="font-bold text-[var(--ink)]">No study notes match your current filter</div>
          <p className="text-xs text-[var(--mut)] mt-1">Try clearing filters or upload a new resource.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(res => {
            const isOwner =
              userProfile && (res.uploadedByUserId === userProfile.id || res.uploadedByEmail === userProfile.email);
            const isAdmin = userProfile?.role === 'admin';
            const fileHref = res.fileUrl
              ? `${res.fileUrl}${authToken ? `?token=${encodeURIComponent(authToken)}` : ''}`
              : '';

            return (
              <div
                key={res.id}
                className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-[#0D9488]">
                      {res.subject} &middot; {res.kind}
                    </span>
                    <span className="text-[var(--mut)]">{res.prog}</span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--ink)] m-0 leading-snug break-words">{res.title}</h3>
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
                      <span className="truncate">{res.collegeName || res.college || 'Chittagong Medical College'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--line)] text-xs">
                  <div>
                    {res.status === 'approved' ? (
                      <span className="badge ok">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : res.status === 'rejected' ? (
                      <span className="badge demo">
                        <AlertCircle size={12} /> Rejected
                      </span>
                    ) : (
                      <span className="badge demo">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {fileHref && (
                      <a
                        href={fileHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn sm alt no-underline min-h-[36px]"
                      >
                        <ExternalLink size={12} />
                        <span>Open File</span>
                      </a>
                    )}
                    {isAdmin && res.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onModerateNote(res.id, 'approved')}
                          className="btn sm good min-h-[36px]"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onModerateNote(res.id, 'rejected')}
                          className="btn sm alt text-rose-600 min-h-[36px]"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(isOwner || isAdmin) && (
                      <button
                        type="button"
                        onClick={() => onDeleteNote(res.id)}
                        className="p-2 rounded text-[var(--mut)] hover:text-rose-600"
                        title="Delete note"
                        aria-label="Delete note"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface NoteUploadPageProps {
  userProfile: UserProfile | null;
  authToken: string | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onUploadComplete: () => Promise<void>;
  onNavigate: (page: PageRoute) => void;
}

export const NoteUploadPage: React.FC<NoteUploadPageProps> = ({
  userProfile,
  authToken,
  onOpenAuth,
  onUploadComplete,
  onNavigate
}) => {
  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [collegeName, setCollegeName] = useState(
    userProfile?.collegeName || 'Chittagong Medical College (CMC)'
  );
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Anatomy');
  const [prog, setProg] = useState<'MBBS' | 'BDS'>('MBBS');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken) return;
    if (!file) {
      setError('Please select a PDF or image file.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('fullName', fullName);
      fd.append('collegeName', collegeName);
      fd.append('title', title);
      fd.append('subject', subject);
      fd.append('prog', prog);
      fd.append('topic', topic);
      fd.append('description', description);

      const res = await fetch('/api/notes/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload failed.');
        return;
      }
      setSuccess(data.message || 'Note uploaded successfully.');
      setTitle('');
      setTopic('');
      setDescription('');
      setFile(null);
      await onUploadComplete();
    } catch {
      setError('Network error while uploading note.');
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
            Submit Question Papers
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
                View in Student Library &rarr;
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
              placeholder="e.g. Brachial Plexus Clinical Correlations"
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold mb-1">Subject *</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="min-h-[44px]">
                <option value="Anatomy">Anatomy</option>
                <option value="Physiology">Physiology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Pathology">Pathology</option>
                <option value="Pharmacology">Pharmacology</option>
                <option value="Microbiology">Microbiology</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Curriculum</label>
              <select value={prog} onChange={e => setProg(e.target.value as 'MBBS' | 'BDS')} className="min-h-[44px]">
                <option value="MBBS">MBBS</option>
                <option value="BDS">BDS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Topic / Chapter</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Superior Extremity"
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
