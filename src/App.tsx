import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Search,
  BookOpen,
  Award,
  FileUp,
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
  User,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Clock,
  Megaphone,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Layers,
  Home
} from 'lucide-react';
import { CmcLogo } from './components/CmcLogo';
import { FloatingMedicalElements } from './components/FloatingMedicalElements';
import { AnnouncementPopup } from './components/AnnouncementPopup';
import { ArchiveExplorer } from './components/ArchiveExplorer';
import { ExamSystem } from './components/ExamSystem';
import { SubmitQuestionPapers } from './components/SubmitQuestionPapers';
import { AdminPanel } from './components/AdminPanel';
import { ContributorsPage } from './components/ContributorsPage';
import { NoticesPage } from './components/NoticesPage';
import { AboutPlatformPage, AboutDeveloperPage } from './components/AboutPages';
import { VivaBankPage, StudentLibraryPage, NoteUploadPage } from './components/LibraryAndNotes';
import {
  AnnouncementRecord,
  ContributorRecord,
  CustomTaxonomy,
  PageRoute,
  PublishedMcqQuestion,
  PublishedPaper,
  QuestionOverride,
  UploadedItem,
  UserProfile
} from './types';

const TELEGRAM_URL = 'https://t.me/Sifat_Islam_7';
const AUTH_TOKEN_KEY = 'cmc_auth_token';
const ANNOUNCEMENT_SEEN_KEY = 'cmc_announcement_seen';

const FALLBACK_ANNOUNCEMENT: AnnouncementRecord = {
  id: 'campaign_question_collection_2026',
  badgeText: '📢 SPECIAL ANNOUNCEMENT',
  title: 'LET’S BUILD A MEDICAL QUESTION ARCHIVE TOGETHER!',
  subtitle: 'We Are Collecting Questions From Different Medical Colleges.',
  bodyParagraphs: [
    'CMC MedArchive is currently collecting Card and Term examination questions from medical colleges across Bangladesh to build a well-organized academic archive for medical students.',
    'Initially, CMC MedArchive focuses primarily on Chittagong Medical College (CMC), while warmly welcoming question contributions from other medical colleges across Bangladesh.',
    'If you have Card, Term, or MCQ questions from your medical college, please share them via:'
  ],
  bulletItems: ['PDF question papers', 'Images of question papers', 'Google Drive links'],
  highlightText: 'YOUR CONTRIBUTION MATTERS!',
  ctaText: 'SUBMIT YOUR QUESTION PAPERS',
  ctaTarget: 'submit',
  enabled: true,
  autoDismissSeconds: 7,
  updatedAt: new Date().toISOString()
};

function TelegramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState<PageRoute>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Archive & Exam deep-link presets
  const [archiveTab, setArchiveTab] = useState<'cq' | 'mcq' | 'papers'>('cq');
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveSubject, setArchiveSubject] = useState('all');
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [examPreset, setExamPreset] = useState<{ subject?: string; paper?: string; chapter?: string } | null>(null);
  const [examActive, setExamActive] = useState(false);

  // Auth State
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Server Data
  const [notes, setNotes] = useState<UploadedItem[]>([]);
  const [contributors, setContributors] = useState<ContributorRecord[]>([
    {
      id: 'contrib_sadman_sami',
      name: 'MD Sadman Sami',
      batch: 'CMC 67',
      college: 'Chittagong Medical College (CMC)',
      contribution: 'Question Paper Archiving & Academic Data Contribution',
      verified: true,
      addedAt: ''
    }
  ]);
  const [announcement, setAnnouncement] = useState<AnnouncementRecord>(FALLBACK_ANNOUNCEMENT);
  const [allNotices, setAllNotices] = useState<AnnouncementRecord[]>([FALLBACK_ANNOUNCEMENT]);
  const [popupOpen, setPopupOpen] = useState(false);
  const initialPopupTriggeredRef = useRef(false);

  const [publishedPapers, setPublishedPapers] = useState<PublishedPaper[]>([]);
  const [publishedQuestions, setPublishedQuestions] = useState<PublishedMcqQuestion[]>([]);
  const [questionOverrides, setQuestionOverrides] = useState<Record<string, QuestionOverride>>({});
  const [customTaxonomy, setCustomTaxonomy] = useState<CustomTaxonomy>({
    subjects: [],
    chaptersBySubjectPaper: {},
    years: []
  });

  const navigateTo = useCallback((target: PageRoute) => {
    setPage(target);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem(ANNOUNCEMENT_SEEN_KEY, '1');
    } catch {}
  }, []);

  const handlePopupAction = useCallback(() => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem(ANNOUNCEMENT_SEEN_KEY, '1');
    } catch {}
    const dest = (announcement.ctaTarget as PageRoute) || 'submit';
    navigateTo(dest);
  }, [announcement.ctaTarget, navigateTo]);

  // Load user session & all dynamic platform data
  const loadPlatformData = async (tokenOverride?: string | null) => {
    const tok = tokenOverride !== undefined ? tokenOverride : authToken;
    const headers: Record<string, string> = {};
    if (tok) headers.Authorization = `Bearer ${tok}`;

    try {
      const [notesRes, archiveRes, contribRes, annRes, allAnnRes] = await Promise.all([
        fetch('/api/notes', { headers }),
        fetch('/api/archive/published'),
        fetch('/api/contributors'),
        fetch('/api/announcements/active'),
        fetch('/api/announcements')
      ]);

      if (notesRes.ok) {
        const nd = await notesRes.json();
        if (Array.isArray(nd.notes)) setNotes(nd.notes);
      }
      if (archiveRes.ok) {
        const ad = await archiveRes.json();
        if (Array.isArray(ad.publishedPapers)) setPublishedPapers(ad.publishedPapers);
        if (Array.isArray(ad.publishedQuestions)) setPublishedQuestions(ad.publishedQuestions);
        if (ad.questionOverrides) setQuestionOverrides(ad.questionOverrides);
        if (ad.customTaxonomy) setCustomTaxonomy(ad.customTaxonomy);
      }
      if (contribRes.ok) {
        const cd = await contribRes.json();
        if (Array.isArray(cd.contributors) && cd.contributors.length > 0) {
          setContributors(cd.contributors);
        }
      }
      if (allAnnRes.ok) {
        const allD = await allAnnRes.json();
        if (Array.isArray(allD.announcements) && allD.announcements.length > 0) {
          setAllNotices(allD.announcements);
        }
      }
      if (annRes.ok) {
        const and = await annRes.json();
        if (and.announcement) {
          setAnnouncement(and.announcement);
          let alreadySeen = false;
          try {
            alreadySeen = sessionStorage.getItem(ANNOUNCEMENT_SEEN_KEY) === '1';
          } catch {}
          if (and.announcement.enabled && !alreadySeen && !initialPopupTriggeredRef.current) {
            initialPopupTriggeredRef.current = true;
            setPopupOpen(true);
          }
        }
      }
    } catch (e) {
      console.error('Error loading platform data:', e);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (authToken) {
        try {
          const meRes = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          if (meRes.ok) {
            const meData = await meRes.json();
            setUserProfile(meData.user);
          } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setAuthToken(null);
          }
        } catch {}
      }
      await loadPlatformData();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Sign in failed.');
        return;
      }
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      setAuthToken(data.token);
      setUserProfile(data.user);
      setAuthSuccess('Signed in successfully.');
      await loadPlatformData(data.token);
      setTimeout(() => {
        setAuthModal(null);
        setAuthSuccess(null);
      }, 600);
    } catch {
      setAuthError('Network error during sign in.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: String(formData.get('fullName') || ''),
      collegeName: String(formData.get('collegeName') || ''),
      email: String(formData.get('email') || ''),
      batch: String(formData.get('batch') || ''),
      roll: String(formData.get('roll') || ''),
      password: String(formData.get('password') || '')
    };

    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Registration failed.');
        return;
      }
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      setAuthToken(data.token);
      setUserProfile(data.user);
      setAuthSuccess('Account created successfully.');
      await loadPlatformData(data.token);
      setTimeout(() => {
        setAuthModal(null);
        setAuthSuccess(null);
      }, 600);
    } catch {
      setAuthError('Network error during registration.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (authToken) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` }
      }).catch(() => {});
    }
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
    setUserProfile(null);
    if (page === 'admin') setPage('home');
    await loadPlatformData(null);
  };

  const handleModerateNote = async (id: string, status: 'approved' | 'rejected') => {
    if (!authToken) return;
    const res = await fetch(`/api/notes/${id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    if (res.ok) await loadPlatformData();
  };

  const handleDeleteNote = async (id: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (res.ok) await loadPlatformData();
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setArchiveSearch(heroSearchInput.trim());
    setArchiveTab('cq');
    setArchiveSubject('all');
    navigateTo('archive');
  };

  const navButtonClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap min-h-[40px] inline-flex items-center gap-1.5 ${
      active
        ? 'bg-[#0F2942] text-white dark:bg-sky-500/20 dark:text-sky-300'
        : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
    }`;

  const showMobileBottomNav = !examActive && !authModal && !popupOpen;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] relative">
      {/* Restrained Medical Background Illustrations (hidden during active exam) */}
      <FloatingMedicalElements page={page} dimmed={examActive} />

      {/* Header */}
      <header className="ed-header">
        <div className="wrap ed-bar">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="brand group shrink-0"
            aria-label="CMC MedArchive Home"
          >
            {/* Compact logo lockup on phones (<640px) so 320px headers never wrap or clip */}
            <span className="sm:hidden flex items-center">
              <CmcLogo variant="compact" size="sm" showSubtitle={false} />
            </span>
            <span className="hidden sm:flex items-center">
              <CmcLogo variant="full" size="md" showSubtitle={true} />
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <button type="button" onClick={() => navigateTo('home')} className={navButtonClass(page === 'home')}>
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setArchiveSearch('');
                navigateTo('archive');
              }}
              className={navButtonClass(page === 'archive' || page === 'mcq' || page === 'question')}
            >
              Question Archive
            </button>
            <button
              type="button"
              onClick={() => {
                setExamPreset(null);
                navigateTo('exam');
              }}
              className={navButtonClass(page === 'exam')}
            >
              Take an Exam
            </button>
            <button
              type="button"
              onClick={() => navigateTo('submit')}
              className={navButtonClass(page === 'submit')}
            >
              Submit Papers
            </button>
            <button
              type="button"
              onClick={() => navigateTo('library')}
              className={navButtonClass(page === 'library' || page === 'upload')}
            >
              Notes
            </button>
            <button
              type="button"
              onClick={() => navigateTo('teacher')}
              className={navButtonClass(page === 'teacher')}
            >
              <span>Viva</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                Dev
              </span>
            </button>

            {/* More Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(o => !o)}
                className={navButtonClass(
                  ['contributors', 'notices', 'about', 'developer'].includes(page)
                )}
              >
                <span>More</span>
                <ChevronDown size={14} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-56 rounded-xl bg-[var(--card)] border border-[var(--line)] shadow-xl py-1.5 z-50"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => navigateTo('contributors')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
                  >
                    Contributors
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('notices')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
                  >
                    Notices &amp; Announcements
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
                  >
                    About CMC MedArchive
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('developer')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
                  >
                    About the Developer
                  </button>
                </div>
              )}
            </div>

            {userProfile?.role === 'admin' && (
              <button
                type="button"
                onClick={() => navigateTo('admin')}
                className={navButtonClass(page === 'admin')}
              >
                <ShieldCheck size={14} className="text-[#0D9488]" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Utilities — touchable >=40px, 320px safe */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-icon-btn dark"
              title="Join Telegram Community"
              aria-label="Join Telegram Community"
            >
              <TelegramIcon className="w-4 h-4" />
            </a>

            {!userProfile ? (
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setAuthModal('signin');
                }}
                className="btn sm min-h-[40px] !px-3"
                aria-label="Sign In"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs font-bold text-[var(--ink)]">
                  <User size={13} className="text-[#0D9488]" />
                  <span>{userProfile.fullName.split(' ')[0]}</span>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn sm alt min-h-[40px] !px-2.5"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--line)] bg-[var(--card)] px-4 py-3 space-y-1 shadow-xl max-h-[calc(100dvh-70px)] overflow-y-auto">
            {userProfile && (
              <div className="px-3.5 py-2.5 mb-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--ink)] truncate">{userProfile.fullName}</span>
                <span className="text-[var(--mut)] uppercase font-semibold shrink-0 ml-2">{userProfile.role}</span>
              </div>
            )}
            {[
              { id: 'home' as PageRoute, label: 'Home' },
              { id: 'archive' as PageRoute, label: 'Question Archive' },
              { id: 'exam' as PageRoute, label: 'Take an Exam' },
              { id: 'submit' as PageRoute, label: 'Submit Question Papers' },
              { id: 'library' as PageRoute, label: 'Notes & Library' },
              { id: 'teacher' as PageRoute, label: 'Viva Bank (Under Development)' },
              { id: 'contributors' as PageRoute, label: 'Contributors' },
              { id: 'notices' as PageRoute, label: 'Notices & Announcements' },
              { id: 'about' as PageRoute, label: 'About CMC MedArchive' },
              { id: 'developer' as PageRoute, label: 'About the Developer' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] ${
                  page === item.id
                    ? 'bg-[#0F2942] text-white dark:bg-sky-500/20 dark:text-sky-300'
                    : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                {item.label}
              </button>
            ))}
            {userProfile?.role === 'admin' && (
              <button
                type="button"
                onClick={() => navigateTo('admin')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] flex items-center gap-2 ${
                  page === 'admin'
                    ? 'bg-[#0D9488] text-white'
                    : 'text-[#0D9488] bg-teal-500/10'
                }`}
              >
                <ShieldCheck size={16} /> Admin Panel
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 wrap py-5 sm:py-9 relative z-10 ${showMobileBottomNav ? 'pb-8 lg:pb-12' : ''}`}>
        {/* ===================== HOMEPAGE (MOBILE-FIRST, CLEAN 4 PILLARS) ===================== */}
        {page === 'home' && (
          <div className="space-y-9 sm:space-y-14">
            {/* Hero Section */}
            <section className="max-w-3xl mx-auto text-center space-y-5 pt-2 sm:pt-6">
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D9488] m-0">
                Chittagong Medical College &middot; Bangladesh Medical Academic Archive
              </p>

              <h1 className="text-[1.85rem] sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.15] m-0 text-balance">
                Welcome to CMC MedArchive
              </h1>

              <p className="text-sm sm:text-lg text-[var(--ink-secondary)] max-w-2xl mx-auto leading-relaxed m-0">
                A calm, structured academic library where medical students browse past examination questions, take timed online exams, and collaboratively build a verified archive across medical colleges.
              </p>

              {/* Hero Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5 pt-1"
              >
                <div className="relative flex-1 min-w-0">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={e => setHeroSearchInput(e.target.value)}
                    placeholder="Search anatomy, brachial plexus, ECG..."
                    className="!pl-10 min-h-[48px] text-sm rounded-xl shadow-xs"
                  />
                </div>
                <button type="submit" className="btn min-h-[48px] !px-6 rounded-xl w-full sm:w-auto">
                  Search Archive
                </button>
              </form>

              {/* Two Focused Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigateTo('archive')}
                  className="ed-btn-primary min-h-[48px] w-full sm:w-auto"
                >
                  <span>Browse Question Archive</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExamPreset(null);
                    navigateTo('exam');
                  }}
                  className="ed-btn-outline min-h-[48px] w-full sm:w-auto"
                >
                  <span>Take an Online Exam</span>
                </button>
              </div>
            </section>

            {/* Four Core Pillars: Learn, Practice, Contribute, Collaborate */}
            <section className="space-y-4 sm:space-y-5">
              <div className="flex items-end justify-between border-b border-[var(--line)] pb-3">
                <div>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-[var(--ink)] m-0">
                    Academic Workspace
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--mut)] m-0 mt-0.5">
                    Organized around four essential medical study workflows
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
                {/* 1. Learn */}
                <button
                  type="button"
                  onClick={() => {
                    setArchiveTab('cq');
                    navigateTo('archive');
                  }}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        01 &middot; Learn
                      </span>
                      <Layers size={19} className="text-[#0F2942] dark:text-sky-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0">
                      Structured Question Archive
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Explore Written (CQ), separated SBA &amp; True/False MCQs, and Card/Term papers organized by Subject &rarr; Paper &rarr; Chapter &rarr; Year.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0F2942] dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Archive</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* 2. Practice */}
                <button
                  type="button"
                  onClick={() => {
                    setExamPreset(null);
                    navigateTo('exam');
                  }}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        02 &middot; Practice
                      </span>
                      <Award size={19} className="text-[#0D9488]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0">
                      Customizable Online Examination
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Take Chapter-wise, Paper-wise, or Subject-wise timed tests using verified questions with question navigator and chapter analytics.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0D9488] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Configure an Exam</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* 3. Contribute */}
                <button
                  type="button"
                  onClick={() => navigateTo('submit')}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        03 &middot; Contribute
                      </span>
                      <FileUp size={19} className="text-[#0F2942] dark:text-sky-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0">
                      Submit Question Papers
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Upload Card, Term, or MCQ papers from CMC or any medical college via PDF, multi-page images, or verified Google Drive links.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0F2942] dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Submit Papers</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* 4. Collaborate */}
                <button
                  type="button"
                  onClick={() => navigateTo('library')}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        04 &middot; Collaborate
                      </span>
                      <BookOpen size={19} className="text-[#0D9488]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)] m-0">
                      Student Library &amp; Academic Notes
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Access peer-reviewed diagrams, high-yield study summaries, and join medical student contributors across batches.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0D9488] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Student Library</span>
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </section>

            {/* Quick Subject Access Strip & Active Campaign Notice */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                    Quick Subject Navigation
                  </h3>
                  <p className="text-xs text-[var(--mut)] mt-1 m-0">
                    Jump straight to 1st Professional MBBS subjects across Paper-I and Paper-II.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {['Anatomy', 'Physiology', 'Biochemistry'].map(subj => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        setArchiveSubject(subj);
                        setArchiveTab('mcq');
                        navigateTo('archive');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#0F2942] hover:text-white border border-[var(--line)] text-xs sm:text-sm font-bold transition-colors min-h-[44px]"
                    >
                      {subj}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => navigateTo('teacher')}
                    className="px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] text-xs sm:text-sm font-bold text-[var(--ink-secondary)] inline-flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <Clock size={14} className="text-amber-600 shrink-0" />
                    <span>Viva (Dev)</span>
                  </button>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[#0D9488]/35 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488]">
                    <Megaphone size={13} />
                    <span>Question Collection Drive</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                    Collecting Papers Across Medical Colleges
                  </h3>
                  <p className="text-xs text-[var(--mut)] m-0 leading-relaxed">
                    Help expand Card, Term, and MCQ archives for future medical batches.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigateTo('submit')}
                    className="btn sm min-h-[42px]"
                  >
                    Submit Papers
                  </button>
                  <button
                    type="button"
                    onClick={() => setPopupOpen(true)}
                    className="btn sm alt min-h-[42px]"
                  >
                    Read Notice
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===================== OTHER PAGES ===================== */}
        {(page === 'archive' || page === 'mcq' || page === 'question') && (
          <ArchiveExplorer
            initialTab={page === 'mcq' ? 'mcq' : archiveTab}
            initialSearch={archiveSearch}
            initialSubject={archiveSubject}
            publishedPapers={publishedPapers}
            publishedQuestions={publishedQuestions}
            questionOverrides={questionOverrides}
            customTaxonomy={customTaxonomy}
            onNavigate={navigateTo}
            onStartQuickExam={preset => {
              setExamPreset(preset);
              navigateTo('exam');
            }}
          />
        )}

        {page === 'exam' && (
          <ExamSystem
            publishedQuestions={publishedQuestions}
            questionOverrides={questionOverrides}
            customTaxonomy={customTaxonomy}
            preset={examPreset}
            onExamActiveChange={setExamActive}
            onNavigate={navigateTo}
          />
        )}

        {page === 'submit' && (
          <SubmitQuestionPapers userProfile={userProfile} authToken={authToken} />
        )}

        {page === 'library' && (
          <StudentLibraryPage
            notes={notes}
            userProfile={userProfile}
            authToken={authToken}
            onNavigate={navigateTo}
            onModerateNote={handleModerateNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {page === 'upload' && (
          <NoteUploadPage
            userProfile={userProfile}
            authToken={authToken}
            onOpenAuth={mode => {
              setAuthError(null);
              setAuthSuccess(null);
              setAuthModal(mode);
            }}
            onUploadComplete={() => loadPlatformData()}
            onNavigate={navigateTo}
          />
        )}

        {page === 'teacher' && <VivaBankPage onNavigate={navigateTo} />}

        {page === 'contributors' && (
          <ContributorsPage contributors={contributors} onNavigate={navigateTo} />
        )}

        {page === 'notices' && (
          <NoticesPage
            announcement={announcement}
            allNotices={allNotices}
            onReopenPopup={() => setPopupOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {page === 'about' && <AboutPlatformPage onNavigate={navigateTo} />}

        {page === 'developer' && <AboutDeveloperPage />}

        {page === 'admin' && (
          <AdminPanel
            userProfile={userProfile}
            authToken={authToken}
            notes={notes}
            contributors={contributors}
            announcement={announcement}
            questionOverrides={questionOverrides}
            customTaxonomy={customTaxonomy}
            onRefreshAll={() => loadPlatformData()}
            onModerateNote={handleModerateNote}
            onDeleteNote={handleDeleteNote}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`relative z-10 ${showMobileBottomNav ? 'pb-24 lg:pb-10' : ''}`}>
        <div className="wrap space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-3 min-w-0">
              <CmcLogo variant="compact" size="sm" />
              <div className="text-xs text-[var(--mut)] leading-snug">
                Chittagong Medical College &middot; Academic Question Archive &amp; Online Examination
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-semibold">
              {[
                { id: 'archive' as PageRoute, label: 'Archive' },
                { id: 'exam' as PageRoute, label: 'Take an Exam' },
                { id: 'submit' as PageRoute, label: 'Submit Papers' },
                { id: 'contributors' as PageRoute, label: 'Contributors' },
                { id: 'notices' as PageRoute, label: 'Notices' },
                { id: 'about' as PageRoute, label: 'About' },
                { id: 'developer' as PageRoute, label: 'About the Developer' }
              ].map(link => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateTo(link.id)}
                  className="text-[var(--ink-secondary)] hover:text-[#0D9488] bg-transparent border-0 p-0 min-h-[32px]"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-icon-btn dark !w-9 !h-9"
                title="Join us on Telegram"
                aria-label="Join us on Telegram"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (hidden on Desktop and hidden during active Exam/Modals) */}
      {showMobileBottomNav && (
        <nav
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--line)] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,41,66,0.06)]"
          aria-label="Mobile quick navigation"
        >
          <div className="grid grid-cols-5 max-w-lg mx-auto">
            {[
              { id: 'home' as PageRoute, label: 'Home', icon: Home, active: page === 'home' },
              {
                id: 'archive' as PageRoute,
                label: 'Archive',
                icon: Layers,
                active: page === 'archive' || page === 'mcq' || page === 'question'
              },
              { id: 'exam' as PageRoute, label: 'Exam', icon: Award, active: page === 'exam' },
              { id: 'submit' as PageRoute, label: 'Submit', icon: FileUp, active: page === 'submit' },
              {
                id: 'library' as PageRoute,
                label: 'Notes',
                icon: BookOpen,
                active: page === 'library' || page === 'upload'
              }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === 'exam') setExamPreset(null);
                    navigateTo(tab.id);
                  }}
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 min-h-[58px] transition-colors bg-transparent border-0 ${
                    tab.active
                      ? 'text-[#0D9488]'
                      : 'text-[var(--mut)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Icon size={19} strokeWidth={tab.active ? 2.4 : 1.9} />
                  <span className={`text-[10.5px] leading-tight ${tab.active ? 'font-extrabold' : 'font-semibold'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Announcement Campaign Popup */}
      <AnnouncementPopup
        announcement={announcement}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onAction={handlePopupAction}
      />

      {/* Sign In / Register Modal (No personal email or demo credentials exposed) */}
      {authModal && (
        <div
          className="modal-overlay"
          onClick={() => setAuthModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content max-w-md" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <CmcLogo variant="icon" size="sm" />
                <h3 className="text-base font-bold m-0">
                  {authModal === 'signin' ? 'Sign In to CMC MedArchive' : 'Create Student Account'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAuthModal(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--card)]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 border-b border-[var(--line)] bg-[var(--bg-subtle)] text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setAuthModal('signin');
                }}
                className={`py-3 min-h-[44px] ${
                  authModal === 'signin'
                    ? 'bg-[var(--card)] text-[#0D9488] border-b-2 border-[#0D9488]'
                    : 'text-[var(--mut)]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setAuthModal('signup');
                }}
                className={`py-3 min-h-[44px] ${
                  authModal === 'signup'
                    ? 'bg-[var(--card)] text-[#0D9488] border-b-2 border-[#0D9488]'
                    : 'text-[var(--mut)]'
                }`}
              >
                Register Account
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {authError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {authModal === 'signin' ? (
                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold mb-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      autoComplete="username"
                      className="min-h-[44px] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="min-h-[44px] text-sm"
                    />
                  </div>
                  <button type="submit" disabled={authLoading} className="btn w-full min-h-[46px]">
                    {authLoading ? <Loader2 size={15} className="animate-spin" /> : <LogIn size={15} />}
                    <span>{authLoading ? 'Signing In...' : 'Sign In'}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Full Name *</label>
                    <input name="fullName" placeholder="Enter your full name" required className="min-h-[44px] text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Medical College Name *</label>
                    <input
                      name="collegeName"
                      defaultValue="Chittagong Medical College (CMC)"
                      required
                      className="min-h-[44px] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="min-h-[44px] text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold mb-1">Batch *</label>
                      <input name="batch" placeholder="e.g. CMC-67" required className="min-h-[44px] text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Roll Number</label>
                      <input name="roll" placeholder="e.g. 102" className="min-h-[44px] text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Password *</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      required
                      className="min-h-[44px] text-sm"
                    />
                  </div>
                  <button type="submit" disabled={authLoading} className="btn w-full min-h-[46px]">
                    {authLoading ? <Loader2 size={15} className="animate-spin" /> : <UserPlus size={15} />}
                    <span>{authLoading ? 'Creating Account...' : 'Create Account'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
