import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  X,
  RotateCcw,
  Building2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link2,
  Eye,
  FileUp,
  Layers,
  Calendar,
  User,
  Bookmark
} from 'lucide-react';
import {
  BookmarkRecord,
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  PublishedPaper,
  RecentlyViewedRecord,
  StudyState,
  SubmissionCategory,
  SubmissionFileRecord
} from '../types';
import {
  canonicalizeSubjectName,
  getProfConfig,
  getSubjectsForProf,
  isDentalSubjectOrProgram,
  subjectMatchesCanonical
} from '../data/curriculumConfig';

interface CommunityUploadsViewProps {
  selectedProf: ProfessionalExamId;
  publishedPapers: PublishedPaper[];
  customTaxonomy: CustomTaxonomy;
  studyState?: StudyState;
  onToggleBookmark?: (item: Omit<BookmarkRecord, 'savedAt'>) => void;
  onRecordRecentView?: (item: Omit<RecentlyViewedRecord, 'viewedAt'>) => void;
  onNavigate: (page: PageRoute) => void;
  onSwitchToSubmitTab?: () => void;
  embedded?: boolean;
}

export const CommunityUploadsView: React.FC<CommunityUploadsViewProps> = ({
  selectedProf,
  publishedPapers,
  customTaxonomy,
  studyState,
  onToggleBookmark,
  onRecordRecentView,
  onNavigate,
  onSwitchToSubmitTab,
  embedded = false
}) => {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [paper, setPaper] = useState('all');
  const [chapter, setChapter] = useState('all');
  const [examType, setExamType] = useState<'all' | SubmissionCategory>('all');
  const [year, setYear] = useState('all');
  const [college, setCollege] = useState('all');

  const [previewPaper, setPreviewPaper] = useState<PublishedPaper | null>(null);
  const [previewFile, setPreviewFile] = useState<SubmissionFileRecord | null>(null);

  // Sync filters cleanly whenever the global selectedProf switches
  useEffect(() => {
    setSubject('all');
    setPaper('all');
    setChapter('all');
    setYear('all');
    setCollege('all');
  }, [selectedProf]);

  const profConfig = getProfConfig(selectedProf, customTaxonomy);
  const profSubjects = useMemo(
    () => getSubjectsForProf(selectedProf, customTaxonomy),
    [selectedProf, customTaxonomy]
  );

  // Strictly scoped to selectedProf + Main Prof subjects + MBBS only
  const scopedPapers = useMemo(() => {
    return publishedPapers.filter(p => {
      if (isDentalSubjectOrProgram('MBBS', p.subject)) return false;
      if (p.classificationRole === 'Phase Teaching / Formative Subject') return false;
      return (p.professionalExam || 'First Professional') === selectedProf;
    });
  }, [publishedPapers, selectedProf]);

  const availableSubjects = useMemo(() => {
    const set = new Set<string>(profSubjects);
    scopedPapers.forEach(p => {
      if (p.subject) set.add(canonicalizeSubjectName(p.subject));
    });
    return Array.from(set).sort();
  }, [scopedPapers, profSubjects]);

  const availablePapers = useMemo(() => {
    const set = new Set<string>();
    scopedPapers.forEach(p => {
      if (subjectMatchesCanonical(p.subject, subject) && p.paper) {
        set.add(p.paper);
      }
    });
    return Array.from(set).sort();
  }, [scopedPapers, subject]);

  const availableChapters = useMemo(() => {
    const set = new Set<string>();
    scopedPapers.forEach(p => {
      if (
        subjectMatchesCanonical(p.subject, subject) &&
        (paper === 'all' || p.paper === paper) &&
        p.chapter
      ) {
        set.add(p.chapter);
      }
    });
    return Array.from(set).sort();
  }, [scopedPapers, subject, paper]);

  const availableYears = useMemo(() => {
    const set = new Set<number>();
    scopedPapers.forEach(p => {
      if (p.year && Number.isFinite(Number(p.year))) set.add(Number(p.year));
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [scopedPapers]);

  const availableColleges = useMemo(() => {
    const set = new Set<string>();
    scopedPapers.forEach(p => {
      if (p.collegeName) set.add(p.collegeName);
    });
    return Array.from(set).sort();
  }, [scopedPapers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scopedPapers.filter(p => {
      if (!subjectMatchesCanonical(p.subject, subject)) return false;
      if (paper !== 'all' && p.paper !== paper) return false;
      if (chapter !== 'all' && p.chapter !== chapter) return false;
      if (examType !== 'all' && p.category !== examType) return false;
      if (year !== 'all' && String(p.year || '') !== year) return false;
      if (college !== 'all' && p.collegeName !== college) return false;
      if (q) {
        const hay = `${p.examName} ${p.subject} ${p.paper} ${p.chapter} ${p.session} ${p.collegeName} ${p.contributorName} ${p.description} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [scopedPapers, subject, paper, chapter, examType, year, college, search]);

  const bookmarkedKeys = useMemo(() => {
    const set = new Set<string>();
    (studyState?.bookmarks || []).forEach(b => set.add(`${b.itemType}_${b.id}`));
    return set;
  }, [studyState?.bookmarks]);

  const resetFilters = () => {
    setSearch('');
    setSubject('all');
    setPaper('all');
    setChapter('all');
    setExamType('all');
    setYear('all');
    setCollege('all');
  };

  const openFilePreview = (p: PublishedPaper, f: SubmissionFileRecord) => {
    setPreviewPaper(p);
    setPreviewFile(f);
    onRecordRecentView?.({
      id: p.id,
      itemType: 'paper',
      professionalExam: p.professionalExam || selectedProf,
      subject: canonicalizeSubjectName(p.subject),
      title: p.examName,
      subtitle: `${p.category} · ${p.collegeName}${p.year ? ` · ${p.year}` : ''}`
    });
  };

  return (
    <div className="space-y-5">
      {!embedded && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <Layers size={14} />
              <span>{profConfig.shortLabel} &middot; Subject &rarr; Paper &rarr; Topic &rarr; Year</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
              Community Uploads
            </h1>
            <p className="text-sm text-[var(--mut)] m-0">
              Verified Card, Term, and MCQ question papers for <strong className="text-[var(--ink)]">{profConfig.title}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Filter Card */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--line-light)] text-xs">
          <div className="font-bold text-[#0D9488]">
            {profConfig.shortLabel} &middot; Professional &rarr; Subject &rarr; Paper &rarr; Topic &rarr; Exam Type &rarr; Year
          </div>
          <span className="text-[var(--mut)] font-medium tabular-nums">
            Showing <b className="text-[var(--ink)]">{filtered.length}</b> of {scopedPapers.length} published papers
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${profConfig.shortLabel} papers by exam name, chapter, session, or college...`}
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

        {/* Hierarchy Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
                setPaper('all');
                setChapter('all');
              }}
              className="text-sm min-h-[42px]"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              Paper
            </label>
            <select
              value={paper}
              onChange={e => {
                setPaper(e.target.value);
                setChapter('all');
              }}
              className="text-sm min-h-[42px]"
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
              Topic / Chapter
            </label>
            <select
              value={chapter}
              onChange={e => setChapter(e.target.value)}
              className="text-sm min-h-[42px]"
            >
              <option value="all">All Topics</option>
              {availableChapters.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              Exam Type
            </label>
            <select
              value={examType}
              onChange={e => setExamType(e.target.value as 'all' | SubmissionCategory)}
              className="text-sm min-h-[42px]"
            >
              <option value="all">All Types</option>
              <option value="Card">Card</option>
              <option value="Term">Term</option>
              <option value="MCQ">MCQ</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--mut)] mb-1">
              Year
            </label>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="text-sm min-h-[42px]"
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
              Medical College
            </label>
            <select
              value={college}
              onChange={e => setCollege(e.target.value)}
              className="text-sm min-h-[42px]"
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

        {(search || subject !== 'all' || paper !== 'all' || chapter !== 'all' || examType !== 'all' || year !== 'all' || college !== 'all') && (
          <div className="flex justify-end">
            <button type="button" onClick={resetFilters} className="btn sm alt">
              <RotateCcw size={12} /> Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="empty space-y-3">
          <FileText size={36} className="mx-auto opacity-45" />
          <div className="font-bold text-[var(--ink)]">
            {scopedPapers.length === 0
              ? `No approved community question papers published yet for ${profConfig.title}`
              : 'No community question papers match your active filters'}
          </div>
          <p className="text-xs text-[var(--mut)] max-w-md mx-auto m-0">
            {scopedPapers.length === 0
              ? 'Only administrator-approved papers appear here. Submit a Card, Term, or MCQ paper under Submit Question Papers to contribute.'
              : 'Try clearing one of the subject, topic, year, or exam-type filters.'}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => (onSwitchToSubmitTab ? onSwitchToSubmitTab() : onNavigate('submit'))}
              className="btn sm min-h-[40px]"
            >
              <FileUp size={13} /> Submit Question Paper
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(p => {
            const isBookmarked = bookmarkedKeys.has(`paper_${p.id}`);
            return (
              <article
                key={p.id}
                className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[var(--line-strong)] transition-colors"
              >
                <div className="space-y-2.5 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-bold text-[#0D9488]">
                      <span>{p.category} Paper</span>
                      <span className="text-[var(--mut)]">&middot;</span>
                      <span className="text-[#0F2942] dark:text-sky-300">
                        {p.professionalExam || profConfig.shortLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono tabular-nums text-[var(--mut)] flex items-center gap-1">
                        <Calendar size={12} />
                        <span>
                          {p.year || ''}
                          {p.session ? ` · ${p.session}` : ''}
                        </span>
                      </span>
                      {onToggleBookmark && (
                        <button
                          type="button"
                          onClick={() =>
                            onToggleBookmark({
                              id: p.id,
                              itemType: 'paper',
                              professionalExam: p.professionalExam || selectedProf,
                              subject: canonicalizeSubjectName(p.subject),
                              paper: p.paper,
                              chapter: p.chapter,
                              title: p.examName,
                              subtitle: `${p.category} · ${p.collegeName}${p.year ? ` · ${p.year}` : ''}`
                            })
                          }
                          className={`p-1.5 rounded-lg border min-h-[30px] min-w-[30px] flex items-center justify-center ${
                            isBookmarked
                              ? 'border-[#0D9488] bg-teal-500/10 text-[#0D9488]'
                              : 'border-[var(--line)] text-[var(--mut)] hover:text-[#0D9488]'
                          }`}
                          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark paper'}
                        >
                          <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0 leading-snug break-words">
                    {p.examName}
                  </h3>

                  <div className="text-xs text-[var(--ink-secondary)] font-semibold break-words">
                    <span>{canonicalizeSubjectName(p.subject)}</span>
                    {p.paper ? ` · ${p.paper}` : ''}
                    {p.chapter ? ` · ${p.chapter}` : ''}
                  </div>

                  <div className="text-xs text-[var(--mut)] flex items-center gap-1.5 min-w-0">
                    <Building2 size={13} className="text-[#0D9488] shrink-0" />
                    <span className="truncate">{p.collegeName}</span>
                  </div>

                  {p.description && (
                    <p className="text-xs text-[var(--mut)] m-0 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--line-light)] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between gap-2 text-[var(--mut)]">
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <User size={12} className="shrink-0" />
                      <span className="truncate">
                        By <b className="text-[var(--ink)]">{p.contributorName || 'Student Contributor'}</b>
                        {p.contributorBatch ? ` (${p.contributorBatch})` : ''}
                      </span>
                    </span>
                    <span className="uppercase font-mono text-[10.5px] shrink-0">
                      {p.method === 'drive_link' ? 'Google Drive' : p.method.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 min-w-0">
                    {p.files.map(f => {
                      const isImage = f.mimeType.startsWith('image/');
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => openFilePreview(p, f)}
                          className="btn sm alt max-w-full min-w-0 min-h-[38px]"
                        >
                          {isImage ? (
                            <ImageIcon size={13} className="shrink-0 text-[#0D9488]" />
                          ) : (
                            <Eye size={13} className="shrink-0 text-[#0D9488]" />
                          )}
                          <span className="truncate max-w-[190px]">{f.originalName}</span>
                        </button>
                      );
                    })}

                    {p.driveLinks.map((lnk, idx) => (
                      <a
                        key={idx}
                        href={lnk}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          onRecordRecentView?.({
                            id: p.id,
                            itemType: 'paper',
                            professionalExam: p.professionalExam || selectedProf,
                            subject: canonicalizeSubjectName(p.subject),
                            title: p.examName,
                            subtitle: `${p.category} · Google Drive Link`
                          })
                        }
                        className="btn sm no-underline min-h-[38px]"
                      >
                        <Link2 size={13} />
                        <span>Open Google Drive{p.driveLinks.length > 1 ? ` #${idx + 1}` : ''}</span>
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Inline Preview Modal for Images & PDFs */}
      {previewPaper && previewFile && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setPreviewPaper(null);
            setPreviewFile(null);
          }}
        >
          <div className="modal-content !max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="min-w-0 pr-3">
                <div className="text-xs font-bold text-[#0D9488] truncate">
                  {previewPaper.subject} &middot; {previewPaper.examName}
                </div>
                <div className="text-sm font-extrabold text-[var(--ink)] truncate">
                  {previewFile.originalName}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn sm alt no-underline min-h-[38px]"
                >
                  <ExternalLink size={13} /> Open Tab
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewPaper(null);
                    setPreviewFile(null);
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--card)]"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {previewFile.mimeType.startsWith('image/') ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.originalName}
                  className="w-full max-h-[65dvh] object-contain rounded-lg border border-[var(--line)] bg-[var(--bg-subtle)]"
                />
              ) : (
                <iframe
                  src={previewFile.url}
                  title={previewFile.originalName}
                  className="w-full h-[65dvh] rounded-lg border border-[var(--line)] bg-white"
                />
              )}

              {previewPaper.files.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
                  {previewPaper.files.map((f, idx) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setPreviewFile(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border min-h-[36px] ${
                        f.id === previewFile.id
                          ? 'bg-[#0F2942] text-white border-[#0F2942]'
                          : 'bg-[var(--bg-subtle)] border-[var(--line)] text-[var(--ink)]'
                      }`}
                    >
                      Page {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
