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
  AlertCircle,
  CheckCircle2,
  Loader2,
  Layers,
  Home,
  Settings,
  Bookmark,
  Clock,
  BarChart3,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { BackNavContext, BackNavContextValue } from './utils/BackNavContext';
import { CmcLogo } from './components/CmcLogo';
import { FloatingMedicalElements } from './components/FloatingMedicalElements';
import { AnnouncementPopup } from './components/AnnouncementPopup';
import { ProfOnboardingModal } from './components/ProfOnboardingModal';
import { ArchiveExplorer } from './components/ArchiveExplorer';
import { ExamSystem } from './components/ExamSystem';
import { SubmitQuestionPapers } from './components/SubmitQuestionPapers';
import { AdminPanel } from './components/AdminPanel';
import { ContributorsPage } from './components/ContributorsPage';
import { NoticesPage } from './components/NoticesPage';
import { AboutPlatformPage, AboutDeveloperPage } from './components/AboutPages';
import { StudentLibraryPage, NoteUploadPage } from './components/LibraryAndNotes';
import { VivaSection } from './components/VivaSection';
import { ProfileHub } from './components/ProfileHub';
import { WrongAnswerReviewPage } from './components/WrongAnswerReviewPage';
import {
  AnnouncementRecord,
  BookmarkRecord,
  ContributorRecord,
  CustomTaxonomy,
  PageRoute,
  ProfessionalExamId,
  ProfileTab,
  PublishedMcqQuestion,
  PublishedPaper,
  QuestionOverride,
  RecentlyViewedRecord,
  StudyState,
  UploadedItem,
  UserProfile
} from './types';
import { getProfConfig, getSubjectsForProf, isValidProfId } from './data/curriculumConfig';
import {
  loadLocalStudyState,
  mergeStudyStates,
  recordExamResultInState,
  recordPracticeOutcomeInState,
  recordRecentlyViewedInState,
  saveLocalStudyState,
  toggleBookmarkInState
} from './data/studyTracker';

import {
  appsScriptLogin,
  appsScriptRegister,
  isAdminUser,
  normalizeUserRole
} from './utils/appsScriptAuth';
import {
  listApprovedPapersFromAppsScript,
  listNotesFromAppsScript,
  updateArchiveItemStatus
} from './utils/appsScriptArchive';
import { DEFAULT_SEED_CONTRIBUTORS } from './data/contributorsSeed';
import { loadContributorsWithFallback } from './utils/appsScriptContributors';

const TELEGRAM_URL = 'https://t.me/Sifat_Islam_7';
const AUTH_TOKEN_KEY = 'cmc_auth_token';
const AUTH_USER_KEY = 'cmc_auth_user';
const ANNOUNCEMENT_SEEN_KEY = 'cmc_announcement_dismissed';
const PROF_STORAGE_KEY = 'cmc_selected_prof';

const PAGE_LABELS: Record<PageRoute, string> = {
  home: 'Home',
  archive: 'Written Questions',
  question: 'Written Questions',
  mcq: 'MCQ Practice',
  exam: 'Examination System',
  'wrong-review': 'Wrong Review',
  submit: 'Question Papers',
  community: 'Community Uploads',
  library: 'Notes Library',
  upload: 'Upload Note',
  teacher: 'Viva Bank',
  profile: 'Profile',
  settings: 'Settings',
  admin: 'Admin Panel',
  contributors: 'Contributors',
  notices: 'Notices',
  about: 'About',
  developer: 'Developer'
};

interface HistoryEntry {
  seq: number;
  page: PageRoute;
  profileTab: ProfileTab;
  layerId?: string;
  label?: string;
  onUndo?: () => void;
  inactive?: boolean;
}

function loadStoredAuthUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    if (parsed && typeof parsed.id === 'string' && typeof parsed.email === 'string') {
      return {
        ...parsed,
        role: normalizeUserRole(parsed.role)
      };
    }
    return null;
  } catch {
    return null;
  }
}

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
  autoDismissSeconds: 0,
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
  const [profileTab, setProfileTab] = useState<ProfileTab>('info');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenuGroup, setOpenMenuGroup] = useState<'study' | 'practice' | 'profile' | null>(null);

  // Archive & Exam deep-link presets
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveSubject, setArchiveSubject] = useState('all');
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [examPreset, setExamPreset] = useState<{ subject?: string; paper?: string; chapter?: string } | null>(null);
  const [examActive, setExamActive] = useState(false);

  // Auth State
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => loadStoredAuthUser());
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Real Study State (Bookmarks, Recently Viewed, Wrong Answers, Exam History, Practice Counts)
  const [studyState, setStudyState] = useState<StudyState>(() => loadLocalStudyState());

  // Server Data
  const [notes, setNotes] = useState<UploadedItem[]>([]);
  const [contributors, setContributors] = useState<ContributorRecord[]>(() => [
    ...DEFAULT_SEED_CONTRIBUTORS
  ]);
  const [announcement, setAnnouncement] = useState<AnnouncementRecord>(FALLBACK_ANNOUNCEMENT);
  const [allNotices, setAllNotices] = useState<AnnouncementRecord[]>([FALLBACK_ANNOUNCEMENT]);
  const [popupOpen, setPopupOpen] = useState(false);
  const initialPopupTriggeredRef = useRef(false);

  // Global MBBS Professional Examination Context
  const [hasSavedProf, setHasSavedProf] = useState<boolean>(() => {
    try {
      return isValidProfId(localStorage.getItem(PROF_STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const [selectedProf, setSelectedProf] = useState<ProfessionalExamId>(() => {
    try {
      const saved = localStorage.getItem(PROF_STORAGE_KEY);
      return isValidProfId(saved) ? saved : 'First Professional';
    } catch {
      return 'First Professional';
    }
  });
  const [profModalMode, setProfModalMode] = useState<'onboarding' | 'switch' | null>(() => {
    try {
      return isValidProfId(localStorage.getItem(PROF_STORAGE_KEY)) ? null : 'onboarding';
    } catch {
      return 'onboarding';
    }
  });
  const pendingPopupAnnouncementRef = useRef<AnnouncementRecord | null>(null);

  const [publishedPapers, setPublishedPapers] = useState<PublishedPaper[]>([]);
  const [publishedQuestions, setPublishedQuestions] = useState<PublishedMcqQuestion[]>([]);
  const [questionOverrides, setQuestionOverrides] = useState<Record<string, QuestionOverride>>({});
  const [customTaxonomy, setCustomTaxonomy] = useState<CustomTaxonomy>({
    subjects: [],
    chaptersBySubjectPaper: {},
    years: []
  });

  const historyStackRef = useRef<HistoryEntry[]>([
    { seq: 0, page: 'home', profileTab: 'info', label: 'Home' }
  ]);
  const seqCounterRef = useRef<number>(1);
  const authLayerRef = useRef<string | null>(null);
  const [, setNavRevision] = useState<number>(0);

  const syncNavState = useCallback(() => {
    setNavRevision(r => r + 1);
  }, []);

  useEffect(() => {
    try {
      window.history.replaceState({ cmcSeq: 0 }, '');
    } catch {}

    const handlePopState = (event: PopStateEvent) => {
      const targetSeq =
        event.state && typeof event.state.cmcSeq === 'number' ? event.state.cmcSeq : 0;
      const stack = historyStackRef.current;

      while (stack.length > 1 && stack[stack.length - 1].seq > targetSeq) {
        const popped = stack.pop();
        if (popped && popped.onUndo && !popped.inactive) {
          try {
            popped.onUndo();
          } catch {}
        }
      }

      const activeTop = stack[stack.length - 1] || {
        seq: 0,
        page: 'home' as PageRoute,
        profileTab: 'info' as ProfileTab
      };
      setPage(activeTop.page);
      setProfileTab(activeTop.profileTab);
      setMobileMenuOpen(false);
      setOpenMenuGroup(null);
      syncNavState();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncNavState]);

  const pushSubLayer = useCallback(
    (label: string, onUndo: () => void): string => {
      const seq = seqCounterRef.current++;
      const layerId = `layer_${seq}`;
      const stack = historyStackRef.current;
      const current = stack[stack.length - 1] || {
        seq: 0,
        page: 'home' as PageRoute,
        profileTab: 'info' as ProfileTab
      };
      stack.push({
        seq,
        page: current.page,
        profileTab: current.profileTab,
        layerId,
        label,
        onUndo
      });
      try {
        window.history.pushState({ cmcSeq: seq }, '');
      } catch {}
      syncNavState();
      return layerId;
    },
    [syncNavState]
  );

  const markLayerInactive = useCallback(
    (layerId: string | null) => {
      if (!layerId) return;
      const entry = historyStackRef.current.find(e => e.layerId === layerId);
      if (entry) {
        entry.inactive = true;
        syncNavState();
      }
    },
    [syncNavState]
  );

  const popSubLayer = useCallback(
    (layerId: string | null) => {
      if (!layerId) return;
      const stack = historyStackRef.current;
      const top = stack[stack.length - 1];
      const currentSeq =
        window.history.state && typeof window.history.state.cmcSeq === 'number'
          ? window.history.state.cmcSeq
          : null;

      if (top && top.layerId === layerId && !top.inactive && currentSeq === top.seq) {
        window.history.back();
        return;
      }

      const target = stack.find(e => e.layerId === layerId);
      if (target && !target.inactive) {
        target.inactive = true;
        if (target.onUndo) {
          try {
            target.onUndo();
          } catch {}
        }
        syncNavState();
      }
    },
    [syncNavState]
  );

  const computeBackInfo = (): { canGoBack: boolean; backLabel: string; stepsBack: number } => {
    const stack = historyStackRef.current;
    let topIdx = stack.length - 1;
    let stepsBack = 1;
    while (topIdx > 0 && stack[topIdx].inactive) {
      topIdx--;
      stepsBack++;
    }
    if (topIdx <= 0) {
      return { canGoBack: false, backLabel: 'Back', stepsBack: 0 };
    }
    const activeTop = stack[topIdx];
    if (activeTop.layerId && activeTop.label) {
      return { canGoBack: true, backLabel: activeTop.label, stepsBack };
    }
    let prevIdx = topIdx - 1;
    while (prevIdx > 0 && stack[prevIdx].inactive) {
      prevIdx--;
    }
    const prevEntry = stack[Math.max(0, prevIdx)];
    return {
      canGoBack: true,
      backLabel: PAGE_LABELS[prevEntry.page] || 'Back',
      stepsBack
    };
  };

  const { canGoBack, backLabel, stepsBack } = computeBackInfo();

  const goBack = useCallback(() => {
    const info = computeBackInfo();
    if (!info.canGoBack) return;
    const stack = historyStackRef.current;
    const currentSeq =
      window.history.state && typeof window.history.state.cmcSeq === 'number'
        ? window.history.state.cmcSeq
        : stack[stack.length - 1]?.seq;

    if (currentSeq !== undefined && stack.length > 1) {
      window.history.go(-info.stepsBack);
      return;
    }

    // Fallback if browser history state is unavailable
    for (let i = 0; i < info.stepsBack && stack.length > 1; i++) {
      const popped = stack.pop();
      if (popped && popped.onUndo && !popped.inactive) {
        try {
          popped.onUndo();
        } catch {}
      }
    }
    const nextTop = stack[stack.length - 1];
    if (nextTop) {
      setPage(nextTop.page);
      setProfileTab(nextTop.profileTab);
    }
    syncNavState();
  }, [syncNavState]);

  const navigateTo = useCallback(
    (target: PageRoute) => {
      const nextPage: PageRoute = target === 'settings' ? 'profile' : target;
      const nextProfileTab: ProfileTab = target === 'settings' ? 'settings' : 'info';

      const stack = historyStackRef.current;
      const current = stack[stack.length - 1];
      const alreadySame =
        current &&
        !current.layerId &&
        current.page === nextPage &&
        (nextPage !== 'profile' || current.profileTab === nextProfileTab);

      if (!alreadySame) {
        const seq = seqCounterRef.current++;
        stack.push({
          seq,
          page: nextPage,
          profileTab: nextPage === 'profile' ? nextProfileTab : current?.profileTab || 'info',
          label: PAGE_LABELS[nextPage] || 'Back'
        });
        try {
          window.history.pushState({ cmcSeq: seq }, '');
        } catch {}
      }

      if (target === 'settings') {
        setProfileTab('settings');
        setPage('profile');
      } else if (target === 'profile') {
        setPage('profile');
      } else {
        setPage(target);
      }
      setMobileMenuOpen(false);
      setOpenMenuGroup(null);
      syncNavState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [syncNavState]
  );

  const openProfileSection = useCallback(
    (tab: ProfileTab) => {
      const stack = historyStackRef.current;
      const current = stack[stack.length - 1];
      const alreadySame =
        current && !current.layerId && current.page === 'profile' && current.profileTab === tab;

      if (!alreadySame) {
        const seq = seqCounterRef.current++;
        stack.push({
          seq,
          page: 'profile',
          profileTab: tab,
          label: 'Profile'
        });
        try {
          window.history.pushState({ cmcSeq: seq }, '');
        } catch {}
      }

      setProfileTab(tab);
      setPage('profile');
      setMobileMenuOpen(false);
      setOpenMenuGroup(null);
      syncNavState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [syncNavState]
  );

  const openAuthModal = useCallback(
    (mode: 'signin' | 'signup') => {
      setAuthError(null);
      setAuthSuccess(null);
      if (!authLayerRef.current) {
        const stack = historyStackRef.current;
        const current = stack[stack.length - 1];
        const returnLabel = current ? PAGE_LABELS[current.page] || 'Back' : 'Back';
        authLayerRef.current = pushSubLayer(returnLabel, () => {
          authLayerRef.current = null;
          setAuthModal(null);
        });
      }
      setAuthModal(mode);
    },
    [pushSubLayer]
  );

  const closeAuthModal = useCallback(() => {
    if (authLayerRef.current) {
      const id = authLayerRef.current;
      authLayerRef.current = null;
      popSubLayer(id);
    } else {
      setAuthModal(null);
    }
  }, [popSubLayer]);

  const backNavValue: BackNavContextValue = {
    canGoBack,
    backLabel,
    goBack,
    pushSubLayer,
    popSubLayer,
    markLayerInactive
  };

  const updateStudyState = useCallback(
    (updater: (prev: StudyState) => StudyState) => {
      setStudyState(prev => {
        const next = updater(prev);
        saveLocalStudyState(next);
        if (authToken) {
          fetch('/api/user/study-state', {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(next)
          }).catch(() => {});
        }
        return next;
      });
    },
    [authToken]
  );

  const handleToggleBookmark = useCallback(
    (item: Omit<BookmarkRecord, 'savedAt'>) => {
      updateStudyState(prev => toggleBookmarkInState(prev, item));
    },
    [updateStudyState]
  );

  const handleRecordRecentView = useCallback(
    (item: Omit<RecentlyViewedRecord, 'viewedAt'>) => {
      updateStudyState(prev => recordRecentlyViewedInState(prev, item));
    },
    [updateStudyState]
  );

  const handlePracticeOutcome = useCallback(
    (payload: {
      id: string;
      professionalExam: ProfessionalExamId;
      subject: string;
      paper: string;
      chapter: string;
      type: 'SBA' | 'TF';
      stem: string;
      explanation?: string;
      isCorrect: boolean;
    }) => {
      updateStudyState(prev => recordPracticeOutcomeInState(prev, payload));
    },
    [updateStudyState]
  );

  const handleExamComplete = useCallback(
    (summary: {
      professionalExam: ProfessionalExamId;
      subject: string;
      mode: string;
      totalQuestions: number;
      scoreEarned: number;
      percentage: number;
    }) => {
      updateStudyState(prev => recordExamResultInState(prev, summary));
    },
    [updateStudyState]
  );

  const handleClearWrongItem = useCallback(
    (id: string) => {
      updateStudyState(prev => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers.filter(w => w.id !== id)
      }));
    },
    [updateStudyState]
  );

  const persistSelectedProf = useCallback(
    async (prof: ProfessionalExamId): Promise<{ ok: boolean; error?: string }> => {
      setSelectedProf(prof);
      setHasSavedProf(true);
      setArchiveSubject('all');
      setArchiveSearch('');
      setExamPreset(null);
      try {
        localStorage.setItem(PROF_STORAGE_KEY, prof);
      } catch {}

      if (userProfile) {
        const updatedProfile: UserProfile = { ...userProfile, preferredProf: prof };
        setUserProfile(updatedProfile);
        try {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedProfile));
        } catch {}
      }

      if (authToken) {
        try {
          const res = await fetch('/api/user/preference', {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preferredProf: prof })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              const normalizedUser: UserProfile = {
                ...data.user,
                role: normalizeUserRole(data.user.role)
              };
              setUserProfile(normalizedUser);
              try {
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
              } catch {}
            }
          }
        } catch {}
      }
      return { ok: true };
    },
    [authToken, userProfile]
  );

  const handleConfirmProfModal = useCallback(
    async (prof: ProfessionalExamId) => {
      const wasOnboarding = profModalMode === 'onboarding';
      setProfModalMode(null);
      await persistSelectedProf(prof);

      if (wasOnboarding) {
        let dismissedThisSession = false;
        try {
          dismissedThisSession = sessionStorage.getItem(ANNOUNCEMENT_SEEN_KEY) === '1';
        } catch {}
        const pendingAnn = pendingPopupAnnouncementRef.current || announcement;
        if (pendingAnn?.enabled && !dismissedThisSession && !initialPopupTriggeredRef.current) {
          initialPopupTriggeredRef.current = true;
          setPopupOpen(true);
        }
      }
    },
    [profModalMode, persistSelectedProf, announcement]
  );

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

  // Independent immediate startup popup check — waits if Onboarding modal is currently showing
  useEffect(() => {
    let cancelled = false;
    const triggerOrDeferPopup = (ann: AnnouncementRecord) => {
      let dismissedThisSession = false;
      try {
        dismissedThisSession = sessionStorage.getItem(ANNOUNCEMENT_SEEN_KEY) === '1';
      } catch {}
      if (!ann.enabled || dismissedThisSession || initialPopupTriggeredRef.current) return;

      let saved = false;
      try {
        saved = isValidProfId(localStorage.getItem(PROF_STORAGE_KEY));
      } catch {}

      if (!saved) {
        pendingPopupAnnouncementRef.current = ann;
      } else {
        initialPopupTriggeredRef.current = true;
        setPopupOpen(true);
      }
    };

    const checkStartupAnnouncement = async () => {
      try {
        const res = await fetch('/api/announcements/active', { cache: 'no-store' });
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          if (data?.announcement) {
            setAnnouncement(data.announcement);
            triggerOrDeferPopup(data.announcement);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch active announcement, checking fallback:', err);
      }

      if (!cancelled) {
        triggerOrDeferPopup(FALLBACK_ANNOUNCEMENT);
      }
    };

    checkStartupAnnouncement();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load user session & all dynamic platform data
  const loadPlatformData = async (tokenOverride?: string | null) => {
    const tok = tokenOverride !== undefined ? tokenOverride : authToken;
    const isAuthenticated = Boolean(tok || loadStoredAuthUser());
    const headers: Record<string, string> = {};
    if (tok) headers.Authorization = `Bearer ${tok}`;

    try {
      const requests: Promise<Response>[] = [
        fetch('/api/archive/published'),
        fetch('/api/announcements/active', { cache: 'no-store' }),
        fetch('/api/announcements', { cache: 'no-store' })
      ];
      if (tok) {
        requests.push(fetch('/api/user/study-state', { headers }));
      }

      const [
        gsPapersResult,
        gsNotesResult,
        gsContributorsResult,
        archiveRes,
        annRes,
        allAnnRes,
        studyRes
      ] = await Promise.all([
        isAuthenticated
          ? listApprovedPapersFromAppsScript().catch(err => {
              console.error('Failed to load papers from Apps Script:', err);
              return null;
            })
          : Promise.resolve([]),
        isAuthenticated
          ? listNotesFromAppsScript().catch(err => {
              console.error('Failed to load notes from Apps Script:', err);
              return null;
            })
          : Promise.resolve([]),
        loadContributorsWithFallback().catch(err => {
          console.error('Failed to load contributors:', err);
          return null;
        }),
        ...requests
      ]);

      if (!isAuthenticated) {
        setNotes([]);
        setPublishedPapers([]);
      } else {
        if (Array.isArray(gsNotesResult)) {
          setNotes(gsNotesResult);
        }
        if (Array.isArray(gsPapersResult)) {
          setPublishedPapers(gsPapersResult);
        }
      }
      if (Array.isArray(gsContributorsResult) && gsContributorsResult.length > 0) {
        setContributors(gsContributorsResult);
      }
      if (archiveRes.ok) {
        const ad = await archiveRes.json();
        if (Array.isArray(ad.publishedQuestions)) setPublishedQuestions(ad.publishedQuestions);
        if (ad.questionOverrides) setQuestionOverrides(ad.questionOverrides);
        if (ad.customTaxonomy) setCustomTaxonomy(ad.customTaxonomy);
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
          let dismissedThisSession = false;
          let savedProf = false;
          try {
            dismissedThisSession = sessionStorage.getItem(ANNOUNCEMENT_SEEN_KEY) === '1';
            savedProf = isValidProfId(localStorage.getItem(PROF_STORAGE_KEY));
          } catch {}
          if (and.announcement.enabled && !dismissedThisSession && !initialPopupTriggeredRef.current) {
            if (savedProf) {
              initialPopupTriggeredRef.current = true;
              setPopupOpen(true);
            } else {
              pendingPopupAnnouncementRef.current = and.announcement;
            }
          }
        }
      }
      if (studyRes && studyRes.ok) {
        const sd = await studyRes.json();
        if (sd.studyState) {
          const merged = mergeStudyStates(loadLocalStudyState(), sd.studyState);
          saveLocalStudyState(merged);
          setStudyState(merged);
        }
      }
    } catch (e) {
      console.error('Error loading platform data:', e);
    }
  };

  const syncBackendSession = async (user: UserProfile, existingToken?: string | null): Promise<string> => {
    const fallbackToken = existingToken || `apps_script_${user.id}`;
    try {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, email: user.email })
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem(AUTH_TOKEN_KEY, data.token);
          setAuthToken(data.token);
          if (data.user) {
            const normalizedUser: UserProfile = {
              ...data.user,
              role: normalizeUserRole(data.user.role)
            };
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
            setUserProfile(normalizedUser);
          }
          return data.token as string;
        }
      }
    } catch {}

    localStorage.setItem(AUTH_TOKEN_KEY, fallbackToken);
    setAuthToken(fallbackToken);
    return fallbackToken;
  };

  useEffect(() => {
    const init = async () => {
      const storedUser = loadStoredAuthUser();
      if (storedUser) {
        setUserProfile(storedUser);
        if (isValidProfId(storedUser.preferredProf)) {
          setSelectedProf(storedUser.preferredProf);
          setHasSavedProf(true);
          setProfModalMode(null);
          try {
            localStorage.setItem(PROF_STORAGE_KEY, storedUser.preferredProf);
          } catch {}
        }
        const tok = await syncBackendSession(storedUser, localStorage.getItem(AUTH_TOKEN_KEY));
        await loadPlatformData(tok);
        return;
      }
      await loadPlatformData();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');

    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const user = await appsScriptLogin(email, password);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      setUserProfile(user);

      if (isValidProfId(user.preferredProf)) {
        setSelectedProf(user.preferredProf);
        setHasSavedProf(true);
        setProfModalMode(null);
        try {
          localStorage.setItem(PROF_STORAGE_KEY, user.preferredProf);
        } catch {}
      }

      const token = await syncBackendSession(user);
      setAuthSuccess('Signed in successfully.');
      await loadPlatformData(token);
      setTimeout(() => {
        closeAuthModal();
        setAuthSuccess(null);
      }, 600);
    } catch (err: any) {
      setAuthError(err?.message || 'Sign in failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: String(formData.get('fullName') || '').trim(),
      college_name: String(formData.get('collegeName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      batch: String(formData.get('batch') || '').trim(),
      roll: String(formData.get('roll') || '').trim(),
      password: String(formData.get('password') || ''),
      preferred_prof: selectedProf
    };

    if (!payload.full_name) {
      setAuthError('Full Name is required.');
      return;
    }
    if (!payload.college_name) {
      setAuthError('Medical College Name is required.');
      return;
    }
    if (!payload.batch) {
      setAuthError('Batch / Session is required (e.g. CMC-67).');
      return;
    }
    if (!payload.email || !payload.email.includes('@')) {
      setAuthError('A valid email address is required.');
      return;
    }
    if (!payload.password || payload.password.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const user = await appsScriptRegister(payload);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      setUserProfile(user);

      const token = await syncBackendSession(user);
      setAuthSuccess('Account created successfully.');
      await loadPlatformData(token);
      setTimeout(() => {
        closeAuthModal();
        setAuthSuccess(null);
      }, 600);
    } catch (err: any) {
      setAuthError(err?.message || 'Registration failed.');
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
    localStorage.removeItem(AUTH_USER_KEY);
    setAuthToken(null);
    setUserProfile(null);
    setPublishedPapers([]);
    setNotes([]);
    if (page === 'admin') navigateTo('home');
    await loadPlatformData(null);
  };

  const handleDeletePaper = async (id: string) => {
    if (!isAdminUser(userProfile)) {
      throw new Error('Administrator privileges required to delete question papers.');
    }
    await updateArchiveItemStatus('paper', id, 'deleted');
    setPublishedPapers(prev => prev.filter(p => p.id !== id));
    await loadPlatformData();
  };

  const handleDeleteNote = async (id: string) => {
    if (!userProfile) {
      throw new Error('Authentication required to delete study notes.');
    }
    await updateArchiveItemStatus('note', id, 'deleted');
    setNotes(prev => prev.filter(n => n.id !== id));
    await loadPlatformData();
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setArchiveSearch(heroSearchInput.trim());
    setArchiveSubject('all');
    navigateTo('archive');
  };

  const navButtonClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-[13px] font-bold transition-colors whitespace-nowrap min-h-[40px] inline-flex items-center gap-1.5 ${
      active
        ? 'bg-[#0F2942] text-white dark:bg-sky-500/20 dark:text-sky-300'
        : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
    }`;

  const profConfig = getProfConfig(selectedProf, customTaxonomy);
  const activeProfSubjects = getSubjectsForProf(selectedProf, customTaxonomy);
  const showMobileBottomNav = !examActive && !authModal && !popupOpen && !profModalMode;

  const isStudyActive = ['archive', 'question', 'teacher', 'library', 'upload'].includes(page);
  const isPracticeActive = ['mcq', 'exam', 'wrong-review'].includes(page);
  const isPapersActive = ['submit', 'community'].includes(page);
  const isProfileActive = ['profile', 'settings'].includes(page);

  const wrongAnswerCountForProf = studyState.wrongAnswers.filter(
    w => w.professionalExam === selectedProf
  ).length;

  return (
    <BackNavContext.Provider value={backNavValue}>
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] relative">
        {/* Restrained Medical Background Illustrations (hidden during active exam) */}
        <FloatingMedicalElements page={page} dimmed={examActive} />

      {/* Header — 5 Clean Consolidated Main Navigation Items */}
      <header className="ed-header">
        <div className="wrap ed-bar">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="brand group shrink-0"
            aria-label="CMC MedArchive Home"
          >
            <span className="sm:hidden flex items-center">
              <CmcLogo variant="compact" size="sm" showSubtitle={false} />
            </span>
            <span className="hidden sm:flex 2xl:hidden items-center">
              <CmcLogo variant="full" size="sm" showSubtitle={false} />
            </span>
            <span className="hidden 2xl:flex items-center">
              <CmcLogo variant="full" size="md" showSubtitle={true} />
            </span>
          </button>

          {/* Desktop Navigation — STRICTLY 5 MAIN SECTIONS */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0" aria-label="Main navigation">
            {/* 1. Home */}
            <button type="button" onClick={() => navigateTo('home')} className={navButtonClass(page === 'home')}>
              Home
            </button>

            {/* 2. Study Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenuGroup(g => (g === 'study' ? null : 'study'))}
                className={navButtonClass(isStudyActive)}
                aria-expanded={openMenuGroup === 'study'}
              >
                <span>Study</span>
                <ChevronDown size={14} />
              </button>
              {openMenuGroup === 'study' && (
                <div
                  className="absolute left-0 mt-1.5 w-60 rounded-xl bg-[var(--card)] border border-[var(--line)] shadow-xl py-1.5 z-50"
                  onMouseLeave={() => setOpenMenuGroup(null)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setArchiveSearch('');
                      setArchiveSubject('all');
                      navigateTo('archive');
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Written Questions</span>
                    <BookOpen size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('teacher')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Viva Bank</span>
                    <Layers size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('library')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Notes Library</span>
                    <Layers size={14} className="text-[#0D9488]" />
                  </button>
                </div>
              )}
            </div>

            {/* 3. Practice Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenuGroup(g => (g === 'practice' ? null : 'practice'))}
                className={navButtonClass(isPracticeActive)}
                aria-expanded={openMenuGroup === 'practice'}
              >
                <span>Practice</span>
                <ChevronDown size={14} />
              </button>
              {openMenuGroup === 'practice' && (
                <div
                  className="absolute left-0 mt-1.5 w-64 rounded-xl bg-[var(--card)] border border-[var(--line)] shadow-xl py-1.5 z-50"
                  onMouseLeave={() => setOpenMenuGroup(null)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setArchiveSearch('');
                      setArchiveSubject('all');
                      navigateTo('mcq');
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>MCQ Practice (SBA &amp; T/F)</span>
                    <Layers size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExamPreset(null);
                      navigateTo('exam');
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Examination System</span>
                    <Award size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('wrong-review')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Wrong Answer Review</span>
                    {wrongAnswerCountForProf > 0 && (
                      <span className="font-mono text-[11px] font-bold text-amber-600 tabular-nums">
                        {wrongAnswerCountForProf}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 4. Question Papers (One Main Nav Section) */}
            <button
              type="button"
              onClick={() => navigateTo('submit')}
              className={navButtonClass(isPapersActive)}
            >
              Question Papers
            </button>

            {/* 5. Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenuGroup(g => (g === 'profile' ? null : 'profile'))}
                className={navButtonClass(isProfileActive || page === 'admin')}
                aria-expanded={openMenuGroup === 'profile'}
              >
                <span>Profile</span>
                <ChevronDown size={14} />
              </button>
              {openMenuGroup === 'profile' && (
                <div
                  className="absolute right-0 mt-1.5 w-64 rounded-xl bg-[var(--card)] border border-[var(--line)] shadow-xl py-1.5 z-50"
                  onMouseLeave={() => setOpenMenuGroup(null)}
                >
                  <button
                    type="button"
                    onClick={() => openProfileSection('info')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Personal Information</span>
                    <User size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openProfileSection('settings')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Settings (Academic Preference)</span>
                    <Settings size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openProfileSection('bookmarks')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Bookmarks</span>
                    <Bookmark size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openProfileSection('recent')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Recently Viewed</span>
                    <Clock size={14} className="text-[#0D9488]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openProfileSection('progress')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                  >
                    <span>Study Progress</span>
                    <BarChart3 size={14} className="text-[#0D9488]" />
                  </button>
                  {isAdminUser(userProfile) && (
                    <>
                      <div className="my-1 border-t border-[var(--line-light)]" />
                      <button
                        type="button"
                        onClick={() => navigateTo('admin')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#0D9488] hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                      >
                        <span>Admin Panel</span>
                        <ShieldCheck size={14} />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-icon-btn dark header-tg"
              title="Join Telegram Community"
              aria-label="Join Telegram Community"
            >
              <TelegramIcon className="w-4 h-4" />
            </a>

            {!userProfile ? (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="btn sm min-h-[40px] !px-3"
                aria-label="Sign In"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openProfileSection('info')}
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs font-bold text-[var(--ink)] max-w-[120px] min-h-[38px]"
                >
                  <User size={13} className="text-[#0D9488] shrink-0" />
                  <span className="truncate">{userProfile.fullName.split(' ')[0]}</span>
                </button>
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

        {/* Clean Mobile Drawer — Mirrors Simplified 5 Sections */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--line)] bg-[var(--card)] px-4 py-3 space-y-3 shadow-xl max-h-[calc(100dvh-70px)] overflow-y-auto">
            {userProfile && (
              <div className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--ink)] truncate">{userProfile.fullName}</span>
                <span className="text-[var(--mut)] uppercase font-semibold shrink-0 ml-2">{userProfile.role}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] ${
                page === 'home' ? 'bg-[#0F2942] text-white' : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              Home
            </button>

            <div className="space-y-1">
              <div className="px-3.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488]">
                Study
              </div>
              {[
                { id: 'archive' as PageRoute, label: 'Written Questions' },
                { id: 'teacher' as PageRoute, label: 'Viva Bank' },
                { id: 'library' as PageRoute, label: 'Notes Library' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold min-h-[42px] ${
                    page === item.id ? 'bg-[#0F2942] text-white' : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <div className="px-3.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488]">
                Practice
              </div>
              {[
                { id: 'mcq' as PageRoute, label: 'MCQ Practice (SBA & T/F)' },
                { id: 'exam' as PageRoute, label: 'Examination System' },
                { id: 'wrong-review' as PageRoute, label: 'Wrong Answer Review' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold min-h-[42px] ${
                    page === item.id ? 'bg-[#0F2942] text-white' : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigateTo('submit')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] ${
                isPapersActive ? 'bg-[#0F2942] text-white' : 'text-[var(--ink)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              Question Papers
            </button>

            <div className="space-y-1">
              <div className="px-3.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488]">
                Profile
              </div>
              <button
                type="button"
                onClick={() => openProfileSection('info')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold min-h-[42px] text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
              >
                Personal Info, Bookmarks &amp; Progress
              </button>
              <button
                type="button"
                onClick={() => openProfileSection('settings')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold min-h-[42px] text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
              >
                Settings &rarr; Academic Preference ({profConfig.shortLabel})
              </button>
            </div>

            {isAdminUser(userProfile) && (
              <button
                type="button"
                onClick={() => navigateTo('admin')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] flex items-center gap-2 ${
                  page === 'admin' ? 'bg-[#0D9488] text-white' : 'text-[#0D9488] bg-teal-500/10'
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
        {/* Contextual History-Aware Back Button */}
        {!examActive && canGoBack && page !== 'home' && (
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--line)] text-xs font-bold text-[var(--ink-secondary)] hover:text-[#0D9488] hover:border-[#0D9488] transition-colors min-h-[36px]"
            >
              <ArrowLeft size={14} />
              <span>Back to {backLabel}</span>
            </button>
          </div>
        )}

        {/* Contextual Section Sub-Navigation Bar for Study & Practice */}
        {!examActive && isStudyActive && (
          <div className="mb-5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[var(--line-light)]">
            {[
              { id: 'archive' as PageRoute, label: 'Written Questions' },
              { id: 'teacher' as PageRoute, label: 'Viva Bank' },
              { id: 'library' as PageRoute, label: 'Notes Library' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold min-h-[38px] shrink-0 transition-colors ${
                  page === item.id || (item.id === 'library' && page === 'upload') || (item.id === 'archive' && page === 'question')
                    ? 'bg-[#0F2942] text-white dark:bg-[#0D9488]'
                    : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {!examActive && isPracticeActive && (
          <div className="mb-5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[var(--line-light)]">
            {[
              { id: 'mcq' as PageRoute, label: 'MCQ Practice' },
              { id: 'exam' as PageRoute, label: 'Examination System' },
              {
                id: 'wrong-review' as PageRoute,
                label: `Wrong Answer Review${wrongAnswerCountForProf > 0 ? ` (${wrongAnswerCountForProf})` : ''}`
              }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold min-h-[38px] shrink-0 transition-colors ${
                  page === item.id
                    ? 'bg-[#0F2942] text-white dark:bg-[#0D9488]'
                    : 'bg-[var(--card)] border border-[var(--line)] text-[var(--ink-secondary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* ===================== HOMEPAGE (CLEAN, UNCLUTTERED, NO PROF SWITCHER) ===================== */}
        {page === 'home' && (
          <div className="space-y-9 sm:space-y-12">
            {/* Hero Section */}
            <section className="max-w-3xl mx-auto text-center space-y-5 pt-2 sm:pt-5">
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D9488] m-0">
                Chittagong Medical College &middot; MBBS Academic Archive
              </p>

              <h1 className="text-[1.85rem] sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.15] m-0 text-balance">
                Welcome to CMC MedArchive
              </h1>

              <p className="text-sm sm:text-lg text-[var(--ink-secondary)] max-w-2xl mx-auto leading-relaxed m-0">
                Your Academic Space &mdash; <strong className="text-[var(--ink)]">{profConfig.shortLabel}</strong>. Focused on {profConfig.subtitle}.
              </p>

              {/* Prof-Scoped Search Bar */}
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
                    placeholder={`Search ${profConfig.shortLabel} written questions or topics...`}
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
                  <span>Start Studying</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExamPreset(null);
                    navigateTo('mcq');
                  }}
                  className="ed-btn-outline min-h-[48px] w-full sm:w-auto"
                >
                  <span>Practice MCQs</span>
                </button>
              </div>
            </section>

            {/* Personalized Academic Workspace — Subject Shortcuts + 4 Clean Section Cards (NO Prof Switcher) */}
            <section className="space-y-5">
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-[var(--ink)] m-0">
                    Your Academic Space &mdash; {profConfig.shortLabel}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--mut)] m-0 mt-0.5">
                    Select any {profConfig.shortLabel} subject below to open the Written Archive.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeProfSubjects.map(subj => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        setArchiveSubject(subj);
                        setArchiveSearch('');
                        navigateTo('archive');
                      }}
                      className="px-4 py-3 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#0F2942] hover:text-white border border-[var(--line)] text-xs sm:text-sm font-bold transition-colors min-h-[46px] flex items-center justify-between gap-2 text-left"
                    >
                      <span className="truncate">{subj}</span>
                      <ArrowRight size={14} className="shrink-0 opacity-75" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {/* 1. Study */}
                <button
                  type="button"
                  onClick={() => navigateTo('archive')}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        Study
                      </span>
                      <BookOpen size={18} className="text-[#0F2942] dark:text-sky-400" />
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                      Written Questions, Viva &amp; Notes Library
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Structured {profConfig.shortLabel} Written archive, peer study notes, and Resource Requests.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0F2942] dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Study Materials</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* 2. Practice */}
                <button
                  type="button"
                  onClick={() => navigateTo('mcq')}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        Practice
                      </span>
                      <Award size={18} className="text-[#0D9488]" />
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                      MCQ Practice, Timed Exams &amp; Wrong Review
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Drills with separated SBA &amp; True/False questions plus timed self-assessments.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0D9488] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Start Practicing</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* 3. Question Papers */}
                <button
                  type="button"
                  onClick={() => navigateTo('submit')}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        Question Papers
                      </span>
                      <FileUp size={18} className="text-[#0D9488]" />
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                      Submit Papers &amp; Community Uploads
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Share Card, Term, or MCQ papers via PDF, images, or Google Drive, and browse verified uploads.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0D9488] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Question Papers</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                {/* 4. Profile & Study Progress */}
                <button
                  type="button"
                  onClick={() => openProfileSection('progress')}
                  className="cat-segment-card text-left group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488] font-mono">
                        Profile &amp; Progress
                      </span>
                      <RotateCcw size={18} className="text-[#0F2942] dark:text-sky-400" />
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--ink)] m-0">
                      Bookmarks, Recently Viewed &amp; Study Progress
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">
                      Review saved items, track {profConfig.shortLabel} accuracy, and manage Settings.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-[#0F2942] dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Profile</span>
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ===================== STUDY & PRACTICE PAGES ===================== */}
        {(page === 'archive' || page === 'mcq' || page === 'question') && (
          <ArchiveExplorer
            selectedProf={selectedProf}
            initialTab={page === 'mcq' ? 'mcq' : 'cq'}
            initialSearch={archiveSearch}
            initialSubject={archiveSubject}
            publishedQuestions={publishedQuestions}
            questionOverrides={questionOverrides}
            customTaxonomy={customTaxonomy}
            studyState={studyState}
            onToggleBookmark={handleToggleBookmark}
            onRecordRecentView={handleRecordRecentView}
            onPracticeOutcome={handlePracticeOutcome}
            onNavigate={navigateTo}
            onStartQuickExam={preset => {
              setExamPreset(preset);
              navigateTo('exam');
            }}
          />
        )}

        {page === 'exam' && (
          <ExamSystem
            selectedProf={selectedProf}
            publishedQuestions={publishedQuestions}
            questionOverrides={questionOverrides}
            customTaxonomy={customTaxonomy}
            preset={examPreset}
            onExamActiveChange={setExamActive}
            onExamComplete={handleExamComplete}
            onPracticeOutcome={handlePracticeOutcome}
            onNavigate={navigateTo}
          />
        )}

        {page === 'wrong-review' && (
          <WrongAnswerReviewPage
            selectedProf={selectedProf}
            studyState={studyState}
            publishedQuestions={publishedQuestions}
            questionOverrides={questionOverrides}
            customTaxonomy={customTaxonomy}
            onPracticeOutcome={handlePracticeOutcome}
            onClearWrongItem={handleClearWrongItem}
            onNavigate={navigateTo}
          />
        )}

        {(page === 'submit' || page === 'community') && (
          <SubmitQuestionPapers
            selectedProf={selectedProf}
            userProfile={userProfile}
            authToken={authToken}
            publishedPapers={publishedPapers}
            customTaxonomy={customTaxonomy}
            studyState={studyState}
            onToggleBookmark={handleToggleBookmark}
            onRecordRecentView={handleRecordRecentView}
            onPaperSubmitted={() => loadPlatformData()}
            onDeletePaper={handleDeletePaper}
            onOpenAuth={openAuthModal}
            initialHubTab={page === 'community' ? 'community' : 'submit'}
            onNavigate={navigateTo}
          />
        )}

        {page === 'library' && (
          <StudentLibraryPage
            selectedProf={selectedProf}
            customTaxonomy={customTaxonomy}
            notes={notes}
            userProfile={userProfile}
            authToken={authToken}
            studyState={studyState}
            onToggleBookmark={handleToggleBookmark}
            onRecordRecentView={handleRecordRecentView}
            onOpenAuth={openAuthModal}
            onNavigate={navigateTo}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {page === 'upload' && (
          <NoteUploadPage
            selectedProf={selectedProf}
            customTaxonomy={customTaxonomy}
            userProfile={userProfile}
            authToken={authToken}
            onOpenAuth={openAuthModal}
            onUploadComplete={() => loadPlatformData()}
            onNavigate={navigateTo}
          />
        )}

        {page === 'teacher' && (
          <VivaSection
            selectedProf={selectedProf}
            customTaxonomy={customTaxonomy}
            userProfile={userProfile}
            onOpenAuth={openAuthModal}
            onNavigate={navigateTo}
          />
        )}

        {(page === 'profile' || page === 'settings') && (
          <ProfileHub
            selectedProf={selectedProf}
            customTaxonomy={customTaxonomy}
            userProfile={userProfile}
            studyState={studyState}
            initialTab={page === 'settings' ? 'settings' : profileTab}
            onUpdateProf={persistSelectedProf}
            onRemoveBookmark={handleToggleBookmark}
            onOpenAuth={openAuthModal}
            onLogout={handleLogout}
            onNavigate={(dest, opts) => {
              if (opts?.subject) setArchiveSubject(opts.subject);
              if (opts?.search) setArchiveSearch(opts.search);
              navigateTo(dest);
            }}
          />
        )}

        {page === 'contributors' && (
          <ContributorsPage
            contributors={contributors}
            userProfile={userProfile}
            authToken={authToken}
            onContributorsChange={setContributors}
            onRefreshContributors={() => loadPlatformData()}
            onNavigate={navigateTo}
          />
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
            publishedPapers={publishedPapers}
            onContributorsChange={setContributors}
            onRefreshAll={() => loadPlatformData()}
            onDeleteNote={handleDeleteNote}
            onDeletePaper={handleDeletePaper}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`relative z-10 ${showMobileBottomNav ? 'pb-24 lg:pb-10' : ''}`}>
        <div className="wrap space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Brand & About */}
            <div className="md:col-span-5 space-y-3 min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <CmcLogo variant="compact" size="sm" />
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-[var(--ink)] tracking-tight">
                    CMC MedArchive
                  </div>
                  <div className="text-xs text-[var(--mut)] leading-snug">
                    Chittagong Medical College &middot; MBBS Question Archive &amp; Exam Platform
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed m-0">
                A structured medical academic archive for students—organizing Written (CQ) questions, SBA &amp; True/False drills, Viva banks, and verified peer study notes in one calm, searchable workspace.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9488]">
                <Clock size={13} className="shrink-0" />
                <span>Functional since November 2026</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-4 space-y-2.5 min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--ink)]">
                Platform &amp; Credits
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-semibold">
                {[
                  { id: 'contributors' as PageRoute, label: 'Contributors & Team' },
                  { id: 'notices' as PageRoute, label: 'Notices' },
                  { id: 'about' as PageRoute, label: 'About' },
                  { id: 'developer' as PageRoute, label: 'Developer' },
                  { id: 'settings' as PageRoute, label: 'Settings' }
                ].map(link => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => navigateTo(link.id)}
                    className="text-left text-[var(--ink-secondary)] hover:text-[#0D9488] bg-transparent border-0 p-0 min-h-[34px] flex items-center"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Communication */}
            <div className="md:col-span-3 space-y-2.5 min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--ink)]">
                Communication
              </div>
              <p className="text-xs text-[var(--mut)] leading-relaxed m-0">
                Questions, paper contributions, or suggestions? Connect with the community on Telegram.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--bg-subtle)] hover:border-[#229ED9] text-xs font-bold text-[var(--ink)] no-underline min-h-[42px] w-full sm:w-auto transition-colors"
                title="Join Telegram Community"
                aria-label="Join Telegram Community"
              >
                <TelegramIcon className="w-4 h-4 text-[#229ED9] shrink-0" />
                <span>Join Telegram</span>
              </a>
            </div>
          </div>

          {/* Bottom Legal & Milestone Strip */}
          <div className="pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--mut)]">
            <div className="font-bold text-[var(--ink)]">
              &copy;&#xFE0F;silicon &middot;{' '}
              <span className="font-medium text-[var(--mut)]">CMC MedArchive</span>
            </div>
            <div className="font-medium">
              Functional since November 2026
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar — Exact 5 Simplified Sections */}
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
                label: 'Study',
                icon: BookOpen,
                active: isStudyActive
              },
              {
                id: 'mcq' as PageRoute,
                label: 'Practice',
                icon: Award,
                active: isPracticeActive
              },
              {
                id: 'submit' as PageRoute,
                label: 'Papers',
                icon: FileUp,
                active: isPapersActive
              },
              {
                id: 'profile' as PageRoute,
                label: 'Profile',
                icon: User,
                active: isProfileActive || page === 'admin'
              }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === 'mcq') setExamPreset(null);
                    if (tab.id === 'profile') {
                      openProfileSection('info');
                    } else {
                      navigateTo(tab.id);
                    }
                  }}
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 min-h-[58px] transition-colors bg-transparent border-0 ${
                    tab.active ? 'text-[#0D9488]' : 'text-[var(--mut)] hover:text-[var(--ink)]'
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

      {/* First-Visit MBBS Professional Examination Onboarding Modal */}
      <ProfOnboardingModal
        isOpen={profModalMode !== null}
        currentProf={selectedProf}
        hasSavedProf={hasSavedProf}
        customTaxonomy={customTaxonomy}
        onConfirm={handleConfirmProfModal}
      />

      {/* Announcement Campaign Popup */}
      <AnnouncementPopup
        announcement={announcement}
        isOpen={popupOpen && profModalMode === null}
        onClose={handleClosePopup}
        onAction={handlePopupAction}
      />

      {/* Sign In / Register Modal */}
      {authModal && (
        <div
          className="modal-overlay"
          onClick={closeAuthModal}
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
                onClick={closeAuthModal}
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
    </BackNavContext.Provider>
  );
}
