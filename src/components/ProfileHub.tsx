import React, { useEffect, useState } from 'react';
import {
  User,
  Settings,
  Bookmark,
  Clock,
  BarChart3,
  Check,
  CheckCircle2,
  GraduationCap,
  LogIn,
  LogOut,
  UserPlus,
  Loader2,
  AlertCircle,
  Trash2,
  ShieldCheck,
  ArrowRight,
  Award
} from 'lucide-react';
import {
  BookmarkRecord,
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  ProfileTab,
  StudyState,
  UserProfile
} from '../types';
import { canonicalizeSubjectName, getMergedProfConfigs, getProfConfig } from '../data/curriculumConfig';
import { isAdminUser } from '../utils/appsScriptAuth';
import { useBackNav } from '../utils/BackNavContext';

interface ProfileHubProps {
  selectedProf: ProfessionalExamId;
  customTaxonomy: CustomTaxonomy;
  userProfile: UserProfile | null;
  studyState: StudyState;
  initialTab?: ProfileTab;
  onUpdateProf: (prof: ProfessionalExamId) => Promise<{ ok: boolean; error?: string }>;
  onRemoveBookmark: (item: Omit<BookmarkRecord, 'savedAt'>) => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onLogout: () => Promise<void>;
  onNavigate: (page: PageRoute, opts?: { search?: string; subject?: string; tab?: 'cq' | 'mcq' | 'papers' }) => void;
}

export const ProfileHub: React.FC<ProfileHubProps> = ({
  selectedProf,
  customTaxonomy,
  userProfile,
  studyState,
  initialTab = 'info',
  onUpdateProf,
  onRemoveBookmark,
  onOpenAuth,
  onLogout,
  onNavigate
}) => {
  const { pushSubLayer } = useBackNav();
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [draftProf, setDraftProf] = useState<ProfessionalExamId>(selectedProf);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const switchProfileTab = (nextTab: ProfileTab) => {
    if (nextTab === activeTab) return;
    const prevTab = activeTab;
    pushSubLayer('Profile', () => setActiveTab(prevTab));
    setActiveTab(nextTab);
  };

  useEffect(() => {
    setDraftProf(selectedProf);
  }, [selectedProf]);

  const configs = getMergedProfConfigs(customTaxonomy);
  const profConfig = getProfConfig(selectedProf, customTaxonomy);

  // Scoped strictly to selectedProf
  const profBookmarks = studyState.bookmarks.filter(b => b.professionalExam === selectedProf);
  const profRecent = studyState.recentlyViewed.filter(r => r.professionalExam === selectedProf);
  const profWrong = studyState.wrongAnswers.filter(w => w.professionalExam === selectedProf);
  const profExams = studyState.examHistory.filter(e => e.professionalExam === selectedProf);
  const profPracticed = Object.values(studyState.practicedIds).filter(
    p => p.professionalExam === selectedProf
  );
  const profCorrectCount = profPracticed.filter(p => p.correct).length;
  const accuracyPct =
    profPracticed.length > 0 ? Math.round((profCorrectCount / profPracticed.length) * 100) : 0;

  const handleSaveProf = async () => {
    setSaving(true);
    setStatusMsg(null);
    const res = await onUpdateProf(draftProf);
    setSaving(false);
    if (res.ok) {
      const nextCfg = getProfConfig(draftProf, customTaxonomy);
      setStatusMsg({
        type: 'ok',
        text: userProfile
          ? `Academic preference updated to ${nextCfg.shortLabel} and saved to your account.`
          : `Academic preference updated to ${nextCfg.shortLabel} on this device.`
      });
    } else {
      setStatusMsg({
        type: 'err',
        text: res.error || 'Could not update preference.'
      });
    }
  };

  const tabs: { id: ProfileTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'info', label: 'Personal Info', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'bookmarks', label: `Bookmarks (${profBookmarks.length})`, icon: Bookmark },
    { id: 'recent', label: `Recently Viewed (${profRecent.length})`, icon: Clock },
    { id: 'progress', label: 'Study Progress', icon: BarChart3 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
            {profConfig.shortLabel} &middot; Student Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Profile &amp; Settings
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Manage personal account details, Academic Preference, Bookmarks, Recently Viewed, and Study Progress.
          </p>
        </div>

        {isAdminUser(userProfile) && (
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="btn sm shrink-0 min-h-[42px]"
          >
            <ShieldCheck size={15} />
            <span>Open Admin Panel</span>
          </button>
        )}
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => switchProfileTab(t.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 min-h-[42px] whitespace-nowrap shrink-0 transition-colors ${
                active
                  ? 'bg-[#0F2942] text-white dark:bg-[#0D9488]'
                  : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-[var(--ink)]'
              }`}
            >
              <Icon size={15} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PERSONAL INFORMATION */}
      {activeTab === 'info' && (
        <section className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#0D9488]" />
              <h2 className="text-lg font-extrabold text-[var(--ink)] m-0">Personal Information</h2>
            </div>
            <button
              type="button"
              onClick={() => switchProfileTab('settings')}
              className="text-xs font-bold text-[#0D9488] hover:underline bg-transparent border-0 p-1"
            >
              Change Academic Preference &rarr;
            </button>
          </div>

          {userProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm bg-[var(--bg-subtle)] p-4 rounded-xl border border-[var(--line)]">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--mut)]">
                    Full Name
                  </div>
                  <div className="font-bold text-[var(--ink)]">{userProfile.fullName}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--mut)]">
                    Email
                  </div>
                  <div className="font-semibold text-[var(--ink)] break-all">{userProfile.email}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--mut)]">
                    Medical College
                  </div>
                  <div className="font-semibold text-[var(--ink)]">{userProfile.collegeName}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--mut)]">
                    Batch &amp; Role
                  </div>
                  <div className="font-semibold text-[var(--ink)] uppercase">
                    {userProfile.batch} &middot; {userProfile.role}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--mut)]">
                    Current Professional Examination
                  </div>
                  <div className="font-bold text-[#0D9488]">{profConfig.title}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={onLogout} className="btn alt min-h-[44px]">
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                Sign in or create a student account to sync your Professional Examination preference, bookmarks, wrong-answer reviews, and study progress across devices.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={() => onOpenAuth('signin')} className="btn min-h-[44px]">
                  <LogIn size={15} />
                  <span>Sign In</span>
                </button>
                <button type="button" onClick={() => onOpenAuth('signup')} className="btn alt min-h-[44px]">
                  <UserPlus size={15} />
                  <span>Create Account</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 2: SETTINGS → ACADEMIC PREFERENCE */}
      {activeTab === 'settings' && (
        <section className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488]">
                Settings &rarr; Academic Preference
              </div>
              <h2 className="text-lg font-extrabold text-[var(--ink)] m-0 mt-0.5">
                MBBS Professional Examination
              </h2>
              <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                Changing this preference automatically refreshes Written Questions, MCQ Practice, Online Exams, Question Papers, Viva, Notes, Bookmarks, and Study Progress.
              </p>
            </div>
            <span className="text-xs font-bold text-[#0D9488]">
              Active: {profConfig.shortLabel}
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            role="radiogroup"
            aria-label="Academic Preference Professional Examination"
          >
            {configs.map(cfg => {
              const active = draftProf === cfg.id;
              return (
                <button
                  key={cfg.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setDraftProf(cfg.id);
                    setStatusMsg(null);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 min-h-[76px] ${
                    active
                      ? 'border-[#0D9488] bg-teal-50/70 dark:bg-teal-950/35 ring-1 ring-[#0D9488]'
                      : 'border-[var(--line)] bg-[var(--card-subtle)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        size={16}
                        className={active ? 'text-[#0D9488] shrink-0' : 'text-[var(--mut)] shrink-0'}
                      />
                      <span className="text-sm font-extrabold text-[var(--ink)]">{cfg.shortLabel}</span>
                    </div>
                    <div className="text-xs text-[var(--mut)] pl-6 leading-snug">{cfg.subtitle}</div>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      active
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'border-[var(--line-strong)] bg-[var(--card)]'
                    }`}
                  >
                    {active && <Check size={12} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${
                statusMsg.type === 'ok'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              }`}
            >
              {statusMsg.type === 'ok' ? (
                <CheckCircle2 size={16} className="shrink-0" />
              ) : (
                <AlertCircle size={16} className="shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              disabled={saving}
              onClick={handleSaveProf}
              className="btn min-h-[44px]"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              <span>Save Academic Preference</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="btn alt min-h-[44px]"
            >
              Return to Homepage
            </button>
          </div>
        </section>
      )}

      {/* TAB 3: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <section className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-extrabold text-[var(--ink)] m-0">
                Bookmarks &mdash; {profConfig.shortLabel}
              </h2>
              <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                Saved Written Questions, MCQs, Question Papers, and Notes for your current Professional Examination.
              </p>
            </div>
          </div>

          {profBookmarks.length === 0 ? (
            <div className="empty text-xs sm:text-sm">
              No bookmarks saved yet for {profConfig.shortLabel}. Tap the bookmark button on any Written question, MCQ, or Question Paper to save it here.
            </div>
          ) : (
            <div className="space-y-2.5">
              {profBookmarks.map(b => (
                <div
                  key={`${b.itemType}_${b.id}`}
                  className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs font-bold text-[#0D9488]">
                      {b.itemType.toUpperCase()} &middot; {b.subject}
                      {b.paper ? ` · ${b.paper}` : ''}
                      {b.chapter ? ` · ${b.chapter}` : ''}
                    </div>
                    <div className="text-sm font-bold text-[var(--ink)]">{b.title}</div>
                    {b.subtitle && <div className="text-xs text-[var(--mut)]">{b.subtitle}</div>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (b.itemType === 'mcq') {
                          onNavigate('mcq', { subject: b.subject });
                        } else if (b.itemType === 'paper') {
                          onNavigate('community');
                        } else if (b.itemType === 'note') {
                          onNavigate('library');
                        } else {
                          onNavigate('archive', { subject: b.subject, tab: 'cq' });
                        }
                      }}
                      className="btn sm alt min-h-[38px]"
                    >
                      <span>Open</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(b)}
                      className="p-2 rounded-lg border border-[var(--line)] text-rose-600 hover:bg-rose-500/10 min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB 4: RECENTLY VIEWED */}
      {activeTab === 'recent' && (
        <section className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-[var(--ink)] m-0">
              Recently Viewed &mdash; {profConfig.shortLabel}
            </h2>
            <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
              Questions, Notes, and Papers you recently opened while studying {profConfig.shortLabel}.
            </p>
          </div>

          {profRecent.length === 0 ? (
            <div className="empty text-xs sm:text-sm">
              No recently viewed items yet for {profConfig.shortLabel}.
            </div>
          ) : (
            <div className="space-y-2.5">
              {profRecent.map(r => (
                <div
                  key={`${r.itemType}_${r.id}`}
                  className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-[#0D9488]">
                      {r.itemType.toUpperCase()} &middot; {r.subject} &middot;{' '}
                      <span className="text-[var(--mut)] font-normal">
                        {new Date(r.viewedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[var(--ink)]">{r.title}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (r.itemType === 'mcq') onNavigate('mcq', { subject: r.subject });
                      else if (r.itemType === 'note') onNavigate('library');
                      else onNavigate('archive', { subject: r.subject, tab: 'cq' });
                    }}
                    className="btn sm alt self-start sm:self-auto min-h-[38px]"
                  >
                    Revisit
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB 5: STUDY PROGRESS */}
      {activeTab === 'progress' && (
        <section className="space-y-4">
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-[var(--ink)] m-0">
                Study Progress &mdash; {profConfig.shortLabel}
              </h2>
              <p className="text-xs text-[var(--mut)] m-0 mt-0.5">
                Real practice activity and exam scores recorded for {profConfig.title}.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
                <div className="text-xs text-[var(--mut)] font-semibold">MCQs Practiced</div>
                <div className="text-2xl font-extrabold text-[var(--ink)] tabular-nums mt-1">
                  {profPracticed.length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
                <div className="text-xs text-[var(--mut)] font-semibold">Practice Accuracy</div>
                <div className="text-2xl font-extrabold text-[#0D9488] tabular-nums mt-1">
                  {accuracyPct}%
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
                <div className="text-xs text-[var(--mut)] font-semibold">Exams Completed</div>
                <div className="text-2xl font-extrabold text-[var(--ink)] tabular-nums mt-1">
                  {profExams.length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)]">
                <div className="text-xs text-[var(--mut)] font-semibold">Wrong Answers Due</div>
                <div className="text-2xl font-extrabold text-amber-600 tabular-nums mt-1">
                  {profWrong.length}
                </div>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[var(--mut)]">
                Subject Practice Coverage ({profConfig.shortLabel})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {profConfig.subjects.map(subj => {
                  const subCount = profPracticed.filter(
                    p => canonicalizeSubjectName(p.subject) === canonicalizeSubjectName(subj)
                  ).length;
                  const subCorrect = profPracticed.filter(
                    p =>
                      canonicalizeSubjectName(p.subject) === canonicalizeSubjectName(subj) &&
                      p.correct
                  ).length;
                  const subWrong = profWrong.filter(
                    w => canonicalizeSubjectName(w.subject) === canonicalizeSubjectName(subj)
                  ).length;
                  return (
                    <div
                      key={subj}
                      className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] space-y-1"
                    >
                      <div className="text-xs font-extrabold text-[var(--ink)]">{subj}</div>
                      <div className="text-xs text-[var(--mut)] tabular-nums">
                        {subCount} practiced &middot; {subCorrect} correct &middot; {subWrong} due for review
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {profWrong.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigate('wrong-review')}
                className="btn min-h-[44px]"
              >
                <Award size={15} />
                <span>Review {profWrong.length} Wrong Answer(s)</span>
              </button>
            )}
          </div>

          {profExams.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-3">
              <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                Recent Online Exam Results ({profConfig.shortLabel})
              </h3>
              <div className="space-y-2">
                {profExams.slice(0, 10).map(ex => (
                  <div
                    key={ex.id}
                    className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-bold text-[var(--ink)]">
                        {ex.subject} &middot; {ex.mode}
                      </div>
                      <div className="text-xs text-[var(--mut)]">
                        {new Date(ex.completedAt).toLocaleDateString()} &middot; {ex.totalQuestions} questions
                      </div>
                    </div>
                    <div className="font-extrabold text-[#0D9488] tabular-nums">
                      {ex.percentage}% ({ex.scoreEarned.toFixed(1)}/{ex.totalQuestions})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
