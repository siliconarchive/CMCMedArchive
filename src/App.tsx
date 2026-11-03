import React, { useState, useEffect, useMemo } from 'react';
import { ALL_QUESTIONS, QuestionRecord } from './data/questionsData';
import {
  AUTHENTIC_MCQ_PAPERS,
  McqExamPaper,
  McqItem,
  getAvailableMcqSubjects,
  getAvailableMcqPapersForSubject,
  getAvailableMcqYearsForPaper,
  getMatchingMcqPapers,
  MCQ_VERIFICATION_STATS,
  getMcqAnswerMetadata,
  VerificationStatus
} from './data/mcqData';
import { CmcLogo } from './components/CmcLogo';
import {
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  ArrowLeft,
  User,
  LogIn,
  LogOut,
  UserPlus,
  ShieldAlert,
  Clock,
  ExternalLink,
  Award,
  Layers,
  FileCheck2,
  HelpCircle,
  GraduationCap,
  Calendar,
  RotateCcw,
  FileText,
  Check,
  FileQuestion,
  Eye,
  EyeOff,
  XCircle
} from 'lucide-react';

type PageRoute = 'home' | 'archive' | 'question' | 'mcq' | 'library' | 'teacher' | 'upload' | 'about';

interface FilterState {
  subject: string;
  paper: string;
  group: string;
  year: string;
  type: string;
  board: string;
  status: string;
  section: string;
}

interface UploadedItem {
  id: string;
  title: string;
  subject: string;
  topic: string;
  kind: string;
  desc: string;
  uploader: string;
  college?: string;
  date: string;
  perm: string;
  url?: string;
  prog: 'MBBS' | 'BDS';
  demo?: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  college: string;
  batch: string;
  roll?: string;
}

const TELEGRAM_URL = "https://t.me/Sifat_Islam_7";

const SUBJ_MBBS = ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", "Community Medicine", "Forensic Medicine"];
const SUBJ_BDS = ["Anatomy", "Physiology", "Biochemistry", "Dental Anatomy", "Oral Histology", "Dental Materials"];
const EXAM_TYPES = ["Written", "SEQ", "PBQ", "Short Note", "Professional", "Term", "Viva", "Card"];

const INITIAL_DEMO_RESOURCES: UploadedItem[] = [
  { id: "r1", title: "Brachial plexus summary & clinical lesions", subject: "Anatomy", topic: "Brachial plexus", kind: "Notes", desc: "One-page revision summary of roots, trunks, divisions, cords and branches with Erb-Duchenne and Klumpke palsy clinical correlations.", uploader: "Sifat Islam (CMC-67)", date: "2026-09-01", perm: "Student shared note", prog: "MBBS" },
  { id: "r2", title: "Cardiac cycle Wiggers diagram & heart sounds", subject: "Physiology", topic: "Cardiac cycle", kind: "Diagram", desc: "Pressure-volume loop, synchronized jugular venous pulse (JVP) and phonocardiogram (S1-S4) reference chart.", uploader: "CMC Student", date: "2026-09-05", perm: "Student shared note", prog: "MBBS" },
  { id: "r3", title: "Glycolysis & Gluconeogenesis reciprocal regulation", subject: "Biochemistry", topic: "Carbohydrate Metabolism", kind: "Notes", desc: "High-yield pathway chart with regulated rate-limiting enzymes, ATP yield, and insulin-glucagon phosphorylation states.", uploader: "CMC Student", date: "2026-09-09", perm: "Student shared note", prog: "MBBS" },
  { id: "r4", title: "Renal Clearance & Countercurrent multiplier mechanism", subject: "Physiology", topic: "Renal System", kind: "Notes", desc: "Step-by-step summary of loop of Henle medullary hyperosmolarity and GFR regulation by tubuloglomerular feedback.", uploader: "CMC Student", date: "2026-09-12", perm: "Student shared note", prog: "MBBS" },
  { id: "r5", title: "Cranial nerves exit foramina & functional modalities", subject: "Anatomy", topic: "Neuroanatomy & Cranial Cavity", kind: "Summary", desc: "Complete reference table of cranial nerves (I–XII), their skull base exit foramina, and sensory/motor/parasympathetic components.", uploader: "Sifat Islam (CMC-67)", date: "2026-09-15", perm: "Student shared note", prog: "MBBS" },
  { id: "r6", title: "Acid-Base balance & arterial blood gas (ABG) chart", subject: "Biochemistry", topic: "Acid-Base & Renal", kind: "Summary", desc: "Systematic diagnostic algorithm for metabolic vs respiratory acidosis and alkalosis with compensation formulas.", uploader: "CMC Student", date: "2026-09-20", perm: "Student shared note", prog: "MBBS" },
  { id: "r7", title: "Epithelium classification & histology quick guide", subject: "Anatomy", topic: "General Histology", kind: "Notes", desc: "High-yield identification guide for simple, stratified, pseudostratified and transitional epithelium with organ locations.", uploader: "CMC Student", date: "2026-09-22", perm: "Student shared note", prog: "MBBS" },
  { id: "r8", title: "Respiratory membrane & gas diffusion capacities", subject: "Physiology", topic: "Respiratory System", kind: "Summary", desc: "Layers of the blood-air barrier, Fick's law of diffusion, and factors altering diffusion capacity (DLCO).", uploader: "CMC Student", date: "2026-09-28", perm: "Student shared note", prog: "MBBS" }
];

function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  );
}

export default function App() {
  const [prog, setProg] = useState<'MBBS' | 'BDS'>(() => {
    try {
      const saved = localStorage.getItem('cmc_prog');
      if (saved === 'MBBS' || saved === 'BDS') return saved;
    } catch (e) {}
    return 'MBBS';
  });

  const [page, setPage] = useState<PageRoute>('home');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    subject: '',
    paper: '',
    group: '',
    year: '',
    type: '',
    board: '',
    status: '',
    section: ''
  });

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initial loading screen state
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingScreen(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Authentication Modal State
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem('cmc_user_profile');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  // Lock body scroll and trap Escape key when auth modal is open
  useEffect(() => {
    if (authModal) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setAuthModal(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [authModal]);

  // Student uploads in localStorage
  const [userUploads, setUserUploads] = useState<UploadedItem[]>(() => {
    try {
      const raw = localStorage.getItem('cmc_medarchive_uploads_v1');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // MCQ 3-tier categorization state: Subject -> Paper -> Year
  const [mcqSelectedSubject, setMcqSelectedSubject] = useState<string | null>(null);
  const [mcqSelectedPaper, setMcqSelectedPaper] = useState<string | null>(null);
  const [mcqSelectedYear, setMcqSelectedYear] = useState<number | null>(null);
  const [mcqSessionFilter, setMcqSessionFilter] = useState<string>('all');
  const [mcqTypeFilter, setMcqTypeFilter] = useState<'all' | 'TF' | 'SBA'>('all');
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, any>>({});
  const [showAnswerKeys, setShowAnswerKeys] = useState<boolean>(false);
  const [mcqStudyMode, setMcqStudyMode] = useState<boolean>(false);
  const [mcqStatusFilter, setMcqStatusFilter] = useState<'all' | 'Verified' | 'Needs Review' | 'Provisional'>('all');

  // Student Library Filter State
  const [librarySearch, setLibrarySearch] = useState<string>('');
  const [librarySubject, setLibrarySubject] = useState<string>('all');
  const [libraryType, setLibraryType] = useState<string>('all');

  // About page tab state
  const [aboutTab, setAboutTab] = useState<'site' | 'developer'>('site');

  // Hash navigation listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      if (hash.startsWith('question-')) {
        const qid = hash.replace('question-', '');
        setSelectedQuestionId(qid);
        setPage('question');
      } else if (['home', 'archive', 'mcq', 'library', 'teacher', 'upload', 'about'].includes(hash)) {
        setPage(hash as PageRoute);
      }
    };
    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const navigateTo = (targetPage: PageRoute, qid: string | null = null, extraFilters?: Partial<FilterState>) => {
    setPage(targetPage);
    setSelectedQuestionId(qid);
    if (extraFilters) {
      setFilters(prev => ({ ...prev, ...extraFilters }));
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const newHash = qid ? `#question-${qid}` : `#${targetPage}`;
    window.history.pushState(null, '', newHash);
  };

  const handleProgramSwitch = (newProg: 'MBBS' | 'BDS') => {
    setProg(newProg);
    try {
      localStorage.setItem('cmc_prog', newProg);
    } catch (e) {}
    setFilters(prev => ({ ...prev, subject: '', section: '' }));
    navigateTo('home');
  };

  // Dynamically compute all subjects present in the active curriculum dataset
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    ALL_QUESTIONS.filter(q => q.prog === prog).forEach(q => {
      if (q.subject) set.add(q.subject);
    });
    return Array.from(set).sort();
  }, [prog]);

  // Filtered written questions
  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      if (q.prog !== prog) return false;
      if (filters.subject && q.subject !== filters.subject) return false;
      if (filters.paper && q.paper !== filters.paper) return false;
      if (filters.group && q.group !== filters.group) return false;
      if (filters.year && String(q.year) !== filters.year) return false;
      if (filters.type && q.type !== filters.type) return false;
      if (filters.board && filters.board !== 'All' && !q.board.includes(filters.board)) return false;
      if (filters.status && q.status !== filters.status) return false;
      if (filters.section && q.section !== filters.section) return false;

      if (!searchQuery.trim()) return true;

      const words = searchQuery.toLowerCase().trim().split(/\s+/);
      const targetText = [
        q.text,
        q.topic,
        q.subject,
        q.section || '',
        q.exam || '',
        q.board || '',
        q.answer || '',
        q.source || ''
      ].join(' ').toLowerCase();

      return words.every(word => targetText.includes(word));
    });
  }, [prog, filters, searchQuery]);

  // Questions organized paper-wise
  const questionsByPaper = useMemo(() => {
    const map: Record<string, QuestionRecord[]> = {
      'Paper-I': [],
      'Paper-II': [],
      'General / Other': []
    };
    filteredQuestions.forEach(q => {
      if (q.paper === 'Paper-I') {
        map['Paper-I'].push(q);
      } else if (q.paper === 'Paper-II') {
        map['Paper-II'].push(q);
      } else {
        map['General / Other'].push(q);
      }
    });
    return map;
  }, [filteredQuestions]);

  // Frequency statistics for search
  const freqStats = useMemo(() => {
    if (!searchQuery.trim() || filteredQuestions.length === 0) return null;
    let cmuCount = 0;
    let cuCount = 0;
    const yearCounts: Record<string, number> = {};
    const tagsFound = new Set<string>();

    filteredQuestions.forEach(q => {
      if (q.board.includes('CMU')) cmuCount++;
      if (q.board.includes('CU')) cuCount++;
      if (q.year) {
        yearCounts[q.year] = (yearCounts[q.year] || 0) + 1;
      }
      if (q.exam) {
        q.exam.split(';').forEach(tag => tagsFound.add(tag.trim()));
      }
    });

    return {
      total: filteredQuestions.length,
      cmu: cmuCount,
      cu: cuCount,
      years: Object.entries(yearCounts).sort((a, b) => Number(b[0]) - Number(a[0])),
      tags: Array.from(tagsFound).slice(0, 8)
    };
  }, [searchQuery, filteredQuestions]);

  // Available unique years for filter dropdown
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    ALL_QUESTIONS.filter(q => q.prog === prog).forEach(q => {
      if (q.year) years.add(q.year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [prog]);

  // Available sections (sub-topics) filtered by currently selected subject
  const availableSections = useMemo(() => {
    const secMap: Record<string, number> = {};
    ALL_QUESTIONS
      .filter(q => q.prog === prog && (!filters.subject || q.subject === filters.subject))
      .forEach(q => {
        if (q.section) {
          secMap[q.section] = (secMap[q.section] || 0) + 1;
        }
      });
    return Object.entries(secMap).map(([name, count]) => ({ name, count }));
  }, [prog, filters.subject]);

  // Active question for detail page
  const selectedQuestion = useMemo(() => {
    if (!selectedQuestionId) return null;
    return ALL_QUESTIONS.find(q => q.id === selectedQuestionId) || null;
  }, [selectedQuestionId]);

  // Related questions for detail page
  const relatedQuestions = useMemo(() => {
    if (!selectedQuestion) return [];
    return ALL_QUESTIONS.filter(q =>
      q.id !== selectedQuestion.id &&
      q.prog === selectedQuestion.prog &&
      (q.topic === selectedQuestion.topic || q.subject === selectedQuestion.subject)
    ).slice(0, 5);
  }, [selectedQuestion]);

  // Dynamically compute subjects present in the authentic MCQ papers dataset
  const availableMcqSubjects = useMemo(() => {
    const map: Record<string, { count: number; qCount: number; papers: Set<string>; years: Set<number> }> = {};
    AUTHENTIC_MCQ_PAPERS.forEach(p => {
      if (!map[p.subject]) {
        map[p.subject] = { count: 0, qCount: 0, papers: new Set(), years: new Set() };
      }
      map[p.subject].count++;
      map[p.subject].qCount += p.questions.length;
      if (p.paper) map[p.subject].papers.add(p.paper);
      if (p.year) map[p.subject].years.add(p.year);
    });
    return Object.entries(map).map(([name, data]) => ({
      name,
      paperCount: data.count,
      questionCount: data.qCount,
      papers: Array.from(data.papers).sort(),
      years: Array.from(data.years).sort((a, b) => a - b)
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Dynamically compute available papers for the currently selected subject
  const availableMcqPapers = useMemo(() => {
    if (!mcqSelectedSubject) return [];
    const map: Record<string, { sessionCount: number; qCount: number; years: Set<number> }> = {};
    AUTHENTIC_MCQ_PAPERS
      .filter(p => p.subject.toLowerCase() === mcqSelectedSubject.toLowerCase())
      .forEach(p => {
        if (!map[p.paper]) {
          map[p.paper] = { sessionCount: 0, qCount: 0, years: new Set() };
        }
        map[p.paper].sessionCount++;
        map[p.paper].qCount += p.questions.length;
        if (p.year) map[p.paper].years.add(p.year);
      });
    return Object.entries(map).map(([name, data]) => ({
      name,
      sessionCount: data.sessionCount,
      questionCount: data.qCount,
      years: Array.from(data.years).sort((a, b) => a - b)
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [mcqSelectedSubject]);

  // Dynamically compute examination years for the selected subject and paper in chronological order
  const availableMcqYears = useMemo(() => {
    if (!mcqSelectedSubject || !mcqSelectedPaper) return [];
    const map: Record<number, { sessions: string[]; qCount: number }> = {};
    AUTHENTIC_MCQ_PAPERS
      .filter(p =>
        p.subject.toLowerCase() === mcqSelectedSubject.toLowerCase() &&
        p.paper.toLowerCase() === mcqSelectedPaper.toLowerCase()
      )
      .forEach(p => {
        if (!map[p.year]) {
          map[p.year] = { sessions: [], qCount: 0 };
        }
        map[p.year].sessions.push(p.session);
        map[p.year].qCount += p.questions.length;
      });
    return Object.entries(map).map(([yearStr, data]) => ({
      year: Number(yearStr),
      sessions: data.sessions,
      questionCount: data.qCount
    })).sort((a, b) => a.year - b.year);
  }, [mcqSelectedSubject, mcqSelectedPaper]);

  // Papers matching all three levels: Subject, Paper, and Year
  const matchingMcqPapers = useMemo(() => {
    if (!mcqSelectedSubject || !mcqSelectedPaper || !mcqSelectedYear) return [];
    return AUTHENTIC_MCQ_PAPERS.filter(p =>
      p.subject.toLowerCase() === mcqSelectedSubject.toLowerCase() &&
      p.paper.toLowerCase() === mcqSelectedPaper.toLowerCase() &&
      p.year === mcqSelectedYear
    );
  }, [mcqSelectedSubject, mcqSelectedPaper, mcqSelectedYear]);

  // Papers currently displayed in view (filtered by session if specific session selected)
  const activeDisplayMcqPapers = useMemo(() => {
    if (mcqSessionFilter === 'all') return matchingMcqPapers;
    return matchingMcqPapers.filter(p => p.id === mcqSessionFilter);
  }, [matchingMcqPapers, mcqSessionFilter]);

  // Score computation for active displayed papers
  const mcqScore = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let totalItems = 0;

    activeDisplayMcqPapers.forEach((paper) => {
      paper.questions.forEach((q) => {
        const qKey = `${paper.id}-q${q.qNum}`;
        const userAns = mcqAnswers[qKey];

        if (q.type === 'TF' && q.items) {
          totalItems += q.items.length;
          q.items.forEach((item, itemIdx) => {
            if (userAns && userAns[itemIdx] !== undefined) {
              answered++;
              if (userAns[itemIdx] === item.ans) correct++;
            }
          });
        } else if (q.type === 'SBA' && q.opts) {
          totalItems++;
          if (userAns !== undefined) {
            answered++;
            if (userAns === q.correctIndex) correct++;
          }
        }
      });
    });

    return { answered, correct, total: totalItems };
  }, [activeDisplayMcqPapers, mcqAnswers]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] relative">
      {/* Initial Loading Screen */}
      {isLoadingScreen && (
        <div
          id="splash"
          role="status"
          aria-live="polite"
          aria-label="Loading CMC MedArchive"
        >
          <CmcLogo variant="full" size="xl" />
          <p className="text-sm text-[var(--mut)] font-medium">Questions. Notes. Knowledge. Together.</p>
          <div className="bar2 mt-2"><i></i></div>
        </div>
      )}

      {/* Top Banner Notice */}
      <div className="notice">
        <div className="wrap flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span><b>CMC MedArchive</b> — Chittagong Medical College Student Resource Bank</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--brand-teal)] hover:text-[var(--brand-pine)] font-semibold"
              title="Join CMC MedArchive Telegram"
            >
              <TelegramIcon className="w-4 h-4 text-sky-600" />
              <span>@Sifat_Islam_7</span>
            </a>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--mut)] hidden sm:inline">
              Academic Archive
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header>
        <div className="wrap bar">
          <button className="brand group" onClick={() => navigateTo('home')} aria-label="CMC MedArchive Home">
            <CmcLogo variant="full" size="md" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Telegram Header Quick Link */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[var(--brand-sage)] text-sky-700 hover:bg-sky-100 transition-colors inline-flex items-center justify-center"
              aria-label="Telegram Community"
              title="Join Telegram Community"
            >
              <TelegramIcon className="w-5 h-5 text-sky-600" />
            </a>

            <button
              id="menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className={mobileMenuOpen ? "open" : ""}>
              <button className={page === 'home' ? 'on' : ''} onClick={() => navigateTo('home')}>Home</button>
              <button className={page === 'archive' ? 'on' : ''} onClick={() => navigateTo('archive')}>Written (CQ)</button>
              <button className={page === 'mcq' ? 'on' : ''} onClick={() => navigateTo('mcq')}>
                MCQ Practice
                <span className="ml-1 px-1.5 py-0.5 bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20 rounded text-[10px] font-bold">149 Verified</span>
              </button>
              <button className={page === 'teacher' ? 'on' : ''} onClick={() => navigateTo('teacher')}>
                Viva Bank
                <span className="ml-1 px-1.5 py-0.5 bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20 rounded text-[10px] font-bold">Dev</span>
              </button>
              <button className={page === 'library' ? 'on' : ''} onClick={() => navigateTo('library')}>Library</button>
              <button className={page === 'upload' ? 'on' : ''} onClick={() => navigateTo('upload')}>Upload</button>
              <button className={page === 'about' ? 'on' : ''} onClick={() => navigateTo('about')}>About</button>

              {/* Program Switcher */}
              <div className="ml-2 inline-flex rounded-lg p-1 bg-[var(--g2)] border border-[var(--line)]">
                <button
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${prog === 'MBBS' ? 'bg-[var(--card)] text-[var(--g)] shadow-sm' : 'text-[var(--mut)]'}`}
                  onClick={() => handleProgramSwitch('MBBS')}
                >
                  MBBS
                </button>
                <button
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${prog === 'BDS' ? 'bg-[var(--card)] text-[var(--g)] shadow-sm' : 'text-[var(--mut)]'}`}
                  onClick={() => handleProgramSwitch('BDS')}
                >
                  BDS
                </button>
              </div>

              {/* Sign In / User Status */}
              {userProfile ? (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[var(--line)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--g)]">
                    <User size={14} />
                    <span>{userProfile.name}</span>
                  </div>
                  <button
                    className="text-xs text-[var(--mut)] hover:text-rose-600"
                    title="Sign Out"
                    onClick={() => {
                      setUserProfile(null);
                      try { localStorage.removeItem('cmc_user_profile'); } catch (e) {}
                    }}
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  className="btn sm alt text-xs ml-2 flex items-center gap-1.5"
                  onClick={() => setAuthModal('signin')}
                >
                  <LogIn size={13} />
                  <span>Sign In</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Body Router */}
      <main className="wrap flex-1 my-6" id="app">
        {/* ===================== HOME PAGE ===================== */}
        {page === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="hero">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-3 tracking-wide uppercase font-sans">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold">{prog} Medical Curriculum</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span>{ALL_QUESTIONS.filter(q => q.prog === prog).length} Written Past Questions</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span>14 Authentic MCQ Papers</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-teal-700 dark:text-teal-400">118 Verified References</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                CMC MedArchive
              </h1>
              <p className="tag">Questions. Notes. Knowledge. Together.</p>
              <p className="text-[var(--mut)] max-w-2xl mb-6 text-sm sm:text-base leading-relaxed">
                Chittagong Medical College official student question archive. Search past written examination questions organized paper-wise by subject, practice authentic university MCQs with verified answer scripts, and study with peer-contributed medical summaries.
              </p>

              <form
                className="sb max-w-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigateTo('archive');
                }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    aria-label="Search questions"
                    placeholder="Search past questions, topics (e.g. brachial plexus, GFR, glycolysis, cardiac cycle)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-3 text-sm rounded-lg"
                  />
                </div>
                <button type="submit" className="btn">
                  Search Questions
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[var(--mut)]">
                <span className="font-medium text-slate-500">Popular topics:</span>
                {["Brachial plexus", "GFR", "Cardiac cycle", "Erb's palsy", "Glycolysis", "Pleural effusion", "Somatomedin"].map(t => (
                  <button
                    key={t}
                    type="button"
                    className="underline text-[var(--brand-teal)] hover:text-[var(--brand-pine)] cursor-pointer transition-colors"
                    onClick={() => {
                      setSearchQuery(t);
                      navigateTo('archive');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Features Dashboard */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2>Academic Sections</h2>
                <span className="text-xs font-semibold text-[var(--mut)] uppercase tracking-wider">
                  Chittagong Medical College
                </span>
              </div>
              
              <div className="grid">
                <button className="card group cursor-pointer" onClick={() => navigateTo('archive')}>
                  <div className="ic">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="group-hover:text-[var(--brand-teal)] transition-colors">Written Questions (CQ)</h3>
                  <span className="mut text-sm">
                    Paper-wise past questions with answers, mark distributions &amp; examination tags.
                  </span>
                </button>

                <button className="card group cursor-pointer border-teal-500/30 bg-teal-500/5 hover:border-teal-500/60" onClick={() => navigateTo('mcq')}>
                  <div className="ic !bg-teal-500/15 !text-teal-700 dark:!text-teal-300">
                    <FileCheck2 size={20} />
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-teal-800 dark:text-teal-300 font-bold m-0 group-hover:text-[var(--brand-pine)] transition-colors">
                      MCQ Examination Practice
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20">
                      14 Papers
                    </span>
                  </div>
                  <span className="mut text-sm">
                    14 authentic CMU First Professional examination papers with verified textbook citations.
                  </span>
                </button>

                <button className="card group cursor-pointer" onClick={() => navigateTo('teacher')}>
                  <div className="ic !bg-amber-500/15 !text-amber-700 dark:!text-amber-300">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="group-hover:text-[var(--brand-teal)] transition-colors m-0">Viva Bank</h3>
                    <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold rounded border border-amber-500/20">
                      In Dev
                    </span>
                  </div>
                  <span className="mut text-sm">
                    Teacher-wise viva questions, card-wise table checklists &amp; high-yield examiner favorites.
                  </span>
                </button>

                <button className="card group cursor-pointer" onClick={() => navigateTo('library')}>
                  <div className="ic">
                    <FileText size={20} />
                  </div>
                  <h3 className="group-hover:text-[var(--brand-teal)] transition-colors">Student Library</h3>
                  <span className="mut text-sm">
                    Community study guides, mnemonics &amp; diagram summaries shared by classmates.
                  </span>
                </button>

                <button className="card group cursor-pointer" onClick={() => navigateTo('upload')}>
                  <div className="ic">
                    <ExternalLink size={20} />
                  </div>
                  <h3 className="group-hover:text-[var(--brand-teal)] transition-colors">Upload Resource</h3>
                  <span className="mut text-sm">
                    Submit lecture notes, summaries or Google Drive links for academic review.
                  </span>
                </button>

                <button className="card group cursor-pointer" onClick={() => navigateTo('about')}>
                  <div className="ic">
                    <Info size={20} />
                  </div>
                  <h3 className="group-hover:text-[var(--brand-teal)] transition-colors">About CMC MedArchive</h3>
                  <span className="mut text-sm">
                    Student-run mission, developer profile of Sifat Islam &amp; Telegram community.
                  </span>
                </button>
              </div>
            </section>

            {/* Medical Subjects Selection Area */}
            <section>
              <h2>Medical Subjects</h2>
              <p className="mut text-sm mb-3">
                Select a medical subject to view its structured past questions organized paper-wise:
              </p>
              <div className="chips">
                {availableSubjects.map(subj => {
                  const count = ALL_QUESTIONS.filter(q => q.prog === prog && q.subject === subj).length;
                  return (
                    <button
                      key={subj}
                      className="chip"
                      onClick={() => {
                        setFilters(prev => ({ ...prev, subject: subj, section: '' }));
                        navigateTo('archive');
                      }}
                    >
                      {subj} ({count})
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ===================== WRITTEN QUESTIONS (CQ) ARCHIVE ===================== */}
        {page === 'archive' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div>
                <h2>Written Questions (CQ) Archive</h2>
                <p className="mut text-sm">
                  Select a subject below to view questions organized paper-wise with verified exam session metadata.
                </p>
              </div>
              <button
                className="btn sm alt"
                onClick={() => {
                  setFilters({ subject: '', paper: '', group: '', year: '', type: '', board: '', status: '', section: '' });
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>

            {/* Subject Selection Area (Explicitly showing Anatomy, Physiology, Biochemistry, etc.) */}
            <div className="card p-3 mb-4 bg-[var(--g2)] border-[var(--line)]">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--g)] mb-2 flex items-center gap-1.5">
                <BookOpen size={14} className="text-[var(--g)]" />
                <span>Select Medical Subject</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`chip text-xs py-1.5 px-3.5 ${!filters.subject ? 'on bg-[var(--g)] text-white' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, subject: '', section: '' }))}
                >
                  All Subjects ({ALL_QUESTIONS.filter(q => q.prog === prog).length})
                </button>
                {availableSubjects.map(subj => {
                  const count = ALL_QUESTIONS.filter(q => q.prog === prog && q.subject === subj).length;
                  return (
                    <button
                      key={subj}
                      className={`chip text-xs py-1.5 px-3.5 ${filters.subject === subj ? 'on bg-[var(--g)] text-white' : ''}`}
                      onClick={() => setFilters(prev => ({ ...prev, subject: subj, section: '' }))}
                    >
                      {subj} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paper-Wise Tab Switcher */}
            <div className="seg mb-4" role="tablist">
              <button
                className={filters.paper === '' ? 'on' : ''}
                onClick={() => setFilters(prev => ({ ...prev, paper: '' }))}
              >
                All Papers ({filteredQuestions.length})
              </button>
              <button
                className={filters.paper === 'Paper-I' ? 'on' : ''}
                onClick={() => setFilters(prev => ({ ...prev, paper: 'Paper-I' }))}
              >
                Paper-I ({ALL_QUESTIONS.filter(q => q.prog === prog && (!filters.subject || q.subject === filters.subject) && q.paper === 'Paper-I').length})
              </button>
              <button
                className={filters.paper === 'Paper-II' ? 'on' : ''}
                onClick={() => setFilters(prev => ({ ...prev, paper: 'Paper-II' }))}
              >
                Paper-II ({ALL_QUESTIONS.filter(q => q.prog === prog && (!filters.subject || q.subject === filters.subject) && q.paper === 'Paper-II').length})
              </button>
            </div>

            {/* Subject-specific section chips (only sub-topics for current subject) */}
            {availableSections.length > 0 && (
              <div className="chips mb-4">
                <button
                  className={`chip text-xs ${!filters.section ? 'on' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, section: '' }))}
                >
                  All {filters.subject || 'Subject'} Segments
                </button>
                {availableSections.slice(0, 10).map(sec => (
                  <button
                    key={sec.name}
                    className={`chip text-xs ${filters.section === sec.name ? 'on' : ''}`}
                    onClick={() => setFilters(prev => ({ ...prev, section: sec.name }))}
                  >
                    {sec.name} ({sec.count})
                  </button>
                ))}
              </div>
            )}

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--mut)]" size={18} />
              <input
                id="sq"
                aria-label="Search questions"
                placeholder="Search question text, clinical concept, or physiological mechanism..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="filters">
              <select
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value, section: '' }))}
                aria-label="Subject filter"
              >
                <option value="">All Subjects</option>
                {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                aria-label="Year filter"
              >
                <option value="">All Years</option>
                {availableYears.map(y => <option key={y} value={String(y)}>{y}</option>)}
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                aria-label="Exam type filter"
              >
                <option value="">All Question Types</option>
                {EXAM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <select
                value={filters.board}
                onChange={(e) => setFilters(prev => ({ ...prev, board: e.target.value }))}
                aria-label="Board filter"
              >
                <option value="">All Boards (CMU &amp; CU)</option>
                <option value="CMU">Chittagong Medical Univ (CMU)</option>
                <option value="CU">Chittagong Univ (CU)</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                aria-label="Verification status filter"
              >
                <option value="">All Statuses</option>
                <option value="verified">Verified Records</option>
                <option value="needs_review">Needs Review / Scanned</option>
              </select>
            </div>

            {/* Frequency Analysis Box */}
            {freqStats && (
              <div className="ok-box">
                <div className="flex items-start gap-2">
                  <Sparkles size={20} className="text-[var(--t)] flex-shrink-0 mt-0.5" />
                  <div>
                    <b>"{searchQuery}"</b> matches <b>{freqStats.total}</b> question{freqStats.total === 1 ? '' : 's'}:
                    {' '}<span className="inline-block px-1.5 py-0.5 bg-white/70 rounded text-xs font-semibold">CMU: {freqStats.cmu}</span>
                    {' '}<span className="inline-block px-1.5 py-0.5 bg-white/70 rounded text-xs font-semibold">CU: {freqStats.cu}</span>
                    <br />
                    {freqStats.years.length > 0 && (
                      <span className="text-xs">
                        By Year: {freqStats.years.map(([yr, count]) => `${yr} (${count})`).join(', ')}
                      </span>
                    )}
                    {freqStats.tags.length > 0 && (
                      <div className="mt-1 text-xs text-[var(--mut)]">
                        Associated exam tags: {freqStats.tags.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Result Count and Paper-Wise Display */}
            <div className="flex items-center justify-between my-3 text-sm text-[var(--mut)]">
              <span>
                Showing {filteredQuestions.length} question{filteredQuestions.length === 1 ? '' : 's'}
                {filters.subject ? ` in ${filters.subject}` : ''}
              </span>
              {(searchQuery || Object.values(filters).some(Boolean)) && (
                <button
                  className="back text-sm"
                  onClick={() => {
                    setFilters({ subject: '', paper: '', group: '', year: '', type: '', board: '', status: '', section: '' });
                    setSearchQuery('');
                  }}
                >
                  Clear search &amp; filters
                </button>
              )}
            </div>

            {/* Render Paper-Wise Sections */}
            {filteredQuestions.length > 0 ? (
              <div className="space-y-8">
                {Object.entries(questionsByPaper).map(([paperName, qList]) => {
                  if (qList.length === 0) return null;
                  return (
                    <div key={paperName} className="border border-[var(--line)] rounded-xl p-4 bg-[var(--card)] shadow-xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--line)]">
                        <div className="flex items-center gap-2">
                          <Layers size={18} className="text-[var(--g)]" />
                          <h3 className="text-lg font-bold m-0 text-[var(--g)]">
                            {filters.subject ? `${filters.subject} — ${paperName}` : paperName}
                          </h3>
                          <span className="badge ok text-xs">{qList.length} questions</span>
                        </div>
                      </div>

                      <div className="list">
                        {qList.map(q => (
                          <div key={q.id} className="item qa hover:border-[var(--t)] transition-all">
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              <span className={`badge ${q.status === 'verified' ? 'ok' : 'demo'}`}>
                                {q.status === 'verified' ? 'Verified' : 'Needs Review'}
                              </span>
                              <span className="badge">{q.subject}</span>
                              {q.section && <span className="badge ok">{q.section}</span>}
                              {q.board && <span className="badge">{q.board}</span>}
                              {q.type && q.type !== 'Written' && <span className="badge">{q.type}</span>}
                              {q.year && <span className="badge ok">{q.year}</span>}
                            </div>

                            <h3
                              className="text-base font-semibold mb-2 cursor-pointer hover:text-[var(--t)]"
                              onClick={() => navigateTo('question', q.id)}
                            >
                              {q.text}
                            </h3>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)] text-xs text-[var(--mut)]">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-[var(--ink)]">Topic: {q.topic}</span>
                                <span>&bull;</span>
                                <span>{q.page}</span>
                              </div>

                              <button
                                type="button"
                                className="btn sm text-xs py-1 px-3 h-auto"
                                onClick={() => navigateTo('question', q.id)}
                              >
                                Details &amp; Answer <ChevronRight size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty">
                <p className="text-lg font-semibold mb-2">No questions matched your search and filter criteria.</p>
                <p className="text-sm">Try choosing another subject or clearing active filters.</p>
                <button
                  className="btn sm mt-4"
                  onClick={() => {
                    setFilters({ subject: '', paper: '', group: '', year: '', type: '', board: '', status: '', section: '' });
                    setSearchQuery('');
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================== QUESTION DETAIL VIEW ===================== */}
        {page === 'question' && selectedQuestion && (
          <div>
            <button className="back mb-4" onClick={() => navigateTo('archive')}>
              <ArrowLeft size={16} /> Back to questions archive
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-semibold text-slate-500 tracking-wide uppercase font-sans">
              <span className={selectedQuestion.status === 'verified' ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-amber-700 dark:text-amber-300 font-bold'}>
                {selectedQuestion.status === 'verified' ? '✓ Verified Question' : '⚠ Needs Review'}
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-800 dark:text-slate-200">{selectedQuestion.subject}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{selectedQuestion.paper}</span>
              {selectedQuestion.group && (
                <>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <span>{selectedQuestion.group}</span>
                </>
              )}
              {selectedQuestion.section && (
                <>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <span>{selectedQuestion.section}</span>
                </>
              )}
              {selectedQuestion.year && (
                <>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold">Exam Year {selectedQuestion.year}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              {selectedQuestion.text}
            </h1>

            <div className="card mb-6">
              <h3 className="text-xs uppercase font-bold text-[var(--mut)] tracking-wider mb-3">
                Examination &amp; Academic Metadata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><b>Topic:</b> {selectedQuestion.topic}</div>
                <div><b>Subject &amp; Paper:</b> {selectedQuestion.subject} &bull; {selectedQuestion.paper}</div>
                <div><b>Examination Tags:</b> {selectedQuestion.exam || 'None printed in source'}</div>
                <div><b>Source Reference:</b> {selectedQuestion.source}</div>
                <div><b>Book Page:</b> {selectedQuestion.page}</div>
                <div><b>Verification Status:</b> {selectedQuestion.status === 'verified' ? 'Verified from primary source' : 'Needs manual review'}</div>
              </div>

              {selectedQuestion.reviewNote && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-900 dark:text-amber-200">
                  <b>Review Note:</b> {selectedQuestion.reviewNote}
                </div>
              )}
            </div>

            {/* Answer Section */}
            <div className="card mb-6 border border-emerald-600/30 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} className="text-emerald-700 dark:text-emerald-300" />
                <h2 className="text-xl m-0 text-emerald-900 dark:text-emerald-100 font-bold">
                  High-Yield Answer &amp; Notes
                </h2>
              </div>
              <div className="prose text-sm leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 mt-3">
                {selectedQuestion.answer || 'Answer details not printed in the source. Refer to textbook and class lecture notes.'}
              </div>
            </div>

            {/* Related Questions on Same Topic */}
            {relatedQuestions.length > 0 && (
              <section>
                <h2>Related Questions in this Topic ({relatedQuestions.length})</h2>
                <div className="list">
                  {relatedQuestions.map(rq => (
                    <div
                      key={rq.id}
                      className="item cursor-pointer hover:border-[var(--t)]"
                      onClick={() => navigateTo('question', rq.id)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge">{rq.subject}</span>
                        <span className="badge ok">{rq.paper}</span>
                        {rq.year && <span className="badge">{rq.year}</span>}
                      </div>
                      <h4 className="font-semibold text-sm">{rq.text}</h4>
                      <span className="mut text-xs">{rq.page}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ===================== MCQ PRACTICE PAGE (3-TIER CATEGORIZATION) ===================== */}
        {page === 'mcq' && (
          <div>
            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2>MCQ Examination Practice</h2>
                <p className="mut text-sm">
                  Chittagong Medical University (CMU) 1st Professional MBBS Examinations. Verified standard textbook answers and explanations.
                </p>
              </div>

              {mcqSelectedSubject && mcqSelectedPaper && mcqSelectedYear && (
                <div className="flex items-center gap-2">
                  <button
                    className={`btn sm ${showAnswerKeys ? 'good' : 'alt'}`}
                    onClick={() => setShowAnswerKeys(!showAnswerKeys)}
                  >
                    {showAnswerKeys ? 'Hide Answer Keys' : 'Show Answer Keys'}
                  </button>
                </div>
              )}
            </div>

            {/* Interactive 3-Level Categorization Breadcrumb Bar: 1. Subject -> 2. Paper -> 3. Year */}
            <div className="card mb-6 p-4 bg-[var(--card)] border-[var(--line)] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
                <div>
                  <div className="text-xs font-bold text-[var(--t)] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={14} />
                    <span>Categorization Pipeline &bull; 3 Levels</span>
                  </div>
                  <div className="text-xs text-[var(--mut)] mt-0.5">
                    1. Subject &rarr; 2. Paper &rarr; 3. Year &rarr; Examination Questions
                  </div>
                </div>

                {(mcqSelectedSubject || mcqSelectedPaper || mcqSelectedYear) && (
                  <button
                    onClick={() => {
                      setMcqSelectedSubject(null);
                      setMcqSelectedPaper(null);
                      setMcqSelectedYear(null);
                      setMcqSessionFilter('all');
                    }}
                    className="text-xs px-2.5 py-1.5 rounded-md font-semibold text-[var(--mut)] hover:text-rose-600 bg-[var(--bg)] border border-[var(--line)] hover:border-rose-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <RotateCcw size={13} />
                    <span>Reset All Filters</span>
                  </button>
                )}
              </div>

              {/* Visual 3-Step Selection Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                {/* Step 1: Subject */}
                <button
                  onClick={() => {
                    setMcqSelectedSubject(null);
                    setMcqSelectedPaper(null);
                    setMcqSelectedYear(null);
                  }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                    !mcqSelectedSubject
                      ? 'bg-[var(--t2)] border-[var(--t)] text-[var(--t)] font-bold shadow-xs'
                      : 'bg-[var(--bg)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--t)]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    mcqSelectedSubject ? 'bg-emerald-600 text-white' : !mcqSelectedSubject ? 'bg-[var(--t)] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {mcqSelectedSubject ? '✓' : '1'}
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[var(--mut)]">Step 1 &bull; Subject</div>
                    <div className="text-xs truncate font-bold">
                      {mcqSelectedSubject || 'Select Subject'}
                    </div>
                  </div>
                </button>

                {/* Step 2: Paper */}
                <button
                  disabled={!mcqSelectedSubject}
                  onClick={() => {
                    if (mcqSelectedSubject) {
                      setMcqSelectedPaper(null);
                      setMcqSelectedYear(null);
                    }
                  }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                    !mcqSelectedSubject
                      ? 'opacity-40 cursor-not-allowed bg-[var(--bg)] border-[var(--line)] text-[var(--mut)]'
                      : mcqSelectedSubject && !mcqSelectedPaper
                      ? 'bg-[var(--t2)] border-[var(--t)] text-[var(--t)] font-bold shadow-xs'
                      : 'bg-[var(--bg)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--t)]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    mcqSelectedPaper ? 'bg-emerald-600 text-white' : mcqSelectedSubject && !mcqSelectedPaper ? 'bg-[var(--t)] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {mcqSelectedPaper ? '✓' : '2'}
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[var(--mut)]">Step 2 &bull; Paper</div>
                    <div className="text-xs truncate font-bold">
                      {mcqSelectedPaper || (mcqSelectedSubject ? 'Select Paper' : 'Pending Subject')}
                    </div>
                  </div>
                </button>

                {/* Step 3: Year */}
                <button
                  disabled={!mcqSelectedSubject || !mcqSelectedPaper}
                  onClick={() => {
                    if (mcqSelectedSubject && mcqSelectedPaper) {
                      setMcqSelectedYear(null);
                    }
                  }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                    !mcqSelectedSubject || !mcqSelectedPaper
                      ? 'opacity-40 cursor-not-allowed bg-[var(--bg)] border-[var(--line)] text-[var(--mut)]'
                      : mcqSelectedSubject && mcqSelectedPaper && !mcqSelectedYear
                      ? 'bg-[var(--t2)] border-[var(--t)] text-[var(--t)] font-bold shadow-xs'
                      : 'bg-[var(--bg)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--t)]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    mcqSelectedYear ? 'bg-emerald-600 text-white' : mcqSelectedSubject && mcqSelectedPaper && !mcqSelectedYear ? 'bg-[var(--t)] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {mcqSelectedYear ? '✓' : '3'}
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[var(--mut)]">Step 3 &bull; Year</div>
                    <div className="text-xs truncate font-bold">
                      {mcqSelectedYear ? `Exam Year ${mcqSelectedYear}` : (mcqSelectedSubject && mcqSelectedPaper ? 'Select Year' : 'Pending Paper')}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* ================= STEP 1: SUBJECT SELECTION ================= */}
            {!mcqSelectedSubject && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge ok">Step 1 of 3</span>
                    <span className="text-xs text-[var(--mut)] font-semibold">Medical Subject Selection</span>
                  </div>
                  <h3 className="text-xl font-bold">Choose a Medical Subject</h3>
                  <p className="mut text-sm">
                    Select a subject to view its available examination papers and verified MCQ answer scripts.
                  </p>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {/* Active Dynamic Subjects From MCQ Data */}
                  {availableMcqSubjects.map(sub => (
                    <div
                      key={sub.name}
                      onClick={() => {
                        setMcqSelectedSubject(sub.name);
                        setMcqSelectedPaper(null);
                        setMcqSelectedYear(null);
                      }}
                      className="card p-5 cursor-pointer hover:border-[var(--t)] hover:shadow-md transition-all border-2 border-emerald-600/30 bg-emerald-500/5 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                          <BookOpen size={20} />
                        </div>
                        <span className="badge ok text-xs font-semibold">
                          {sub.paperCount} Papers Available
                        </span>
                      </div>

                      <h4 className="text-lg font-bold group-hover:text-[var(--t)] mb-1">
                        {sub.name}
                      </h4>
                      <p className="text-xs text-[var(--mut)] mb-3 leading-relaxed">
                        Chittagong Medical University 1st Professional MBBS Examination. Includes Paper-I and Paper-II with verified textbook solutions.
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-[var(--line)] text-xs">
                        <div className="flex items-center justify-between text-[var(--mut)]">
                          <span>Verified MCQs:</span>
                          <span className="font-bold text-[var(--ink)]">{sub.questionCount} Questions</span>
                        </div>
                        <div className="flex items-center justify-between text-[var(--mut)]">
                          <span>Available Papers:</span>
                          <span className="font-bold text-[var(--ink)]">{sub.papers.join(' & ')}</span>
                        </div>
                        <div className="flex items-center justify-between text-[var(--mut)]">
                          <span>Years Covered:</span>
                          <span className="font-bold text-[var(--ink)]">{sub.years.join(', ')}</span>
                        </div>
                      </div>

                      <button
                        className="btn w-full mt-4 good text-xs font-bold flex items-center justify-center gap-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcqSelectedSubject(sub.name);
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                      >
                        <span>Select {sub.name}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Curriculum Subjects (In Digitization) - Demonstrates graceful dynamic handling and empty states */}
                  <div
                    onClick={() => {
                      setMcqSelectedSubject('Physiology');
                      setMcqSelectedPaper(null);
                      setMcqSelectedYear(null);
                    }}
                    className="card p-5 cursor-pointer hover:border-[var(--t)] hover:shadow-xs transition-all border border-dashed border-[var(--line)] bg-[var(--card)] group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                        <FileText size={20} />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-500/15 text-amber-700 rounded-full">
                        In Digitization
                      </span>
                    </div>

                    <h4 className="text-lg font-bold group-hover:text-[var(--t)] mb-1">
                      Physiology
                    </h4>
                    <p className="text-xs text-[var(--mut)] mb-3 leading-relaxed">
                      First Professional MBBS Physiology examination papers. Official CMU examination MCQs are currently being digitized and verified.
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[var(--line)] text-xs text-[var(--mut)]">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-amber-600">Pending Verification</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Exam Scope:</span>
                        <span>Paper-I &amp; Paper-II</span>
                      </div>
                    </div>

                    <button
                      className="btn w-full mt-4 alt text-xs font-semibold flex items-center justify-center gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMcqSelectedSubject('Physiology');
                        setMcqSelectedPaper(null);
                        setMcqSelectedYear(null);
                      }}
                    >
                      <span>Check Physiology</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div
                    onClick={() => {
                      setMcqSelectedSubject('Biochemistry');
                      setMcqSelectedPaper(null);
                      setMcqSelectedYear(null);
                    }}
                    className="card p-5 cursor-pointer hover:border-[var(--t)] hover:shadow-xs transition-all border border-dashed border-[var(--line)] bg-[var(--card)] group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
                        <FileText size={20} />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-500/15 text-amber-700 rounded-full">
                        In Digitization
                      </span>
                    </div>

                    <h4 className="text-lg font-bold group-hover:text-[var(--t)] mb-1">
                      Biochemistry
                    </h4>
                    <p className="text-xs text-[var(--mut)] mb-3 leading-relaxed">
                      First Professional MBBS Biochemistry examination papers. Official CMU examination MCQs are currently being digitized and verified.
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[var(--line)] text-xs text-[var(--mut)]">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-amber-600">Pending Verification</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Exam Scope:</span>
                        <span>Paper-I &amp; Paper-II</span>
                      </div>
                    </div>

                    <button
                      className="btn w-full mt-4 alt text-xs font-semibold flex items-center justify-center gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMcqSelectedSubject('Biochemistry');
                        setMcqSelectedPaper(null);
                        setMcqSelectedYear(null);
                      }}
                    >
                      <span>Check Biochemistry</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[var(--card)] border border-[var(--line)] rounded-lg text-xs text-[var(--mut)] flex items-start gap-2.5">
                  <ShieldAlert size={16} className="text-[var(--t)] shrink-0 mt-0.5" />
                  <div>
                    <b>Authentic Chittagong Medical University Question Bank:</b> All question items are extracted verbatim from official CMU 1st Professional MBBS examination papers. Answers strictly reflect standard textbook citations (Snell, Gray's Anatomy, Moore Clinically Oriented Anatomy, Langman's Medical Embryology, BD Chaurasia, Junqueira's Basic Histology).
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: PAPER SELECTION ================= */}
            {mcqSelectedSubject && !mcqSelectedPaper && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => {
                          setMcqSelectedSubject(null);
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                        className="text-xs text-[var(--t)] font-semibold hover:underline flex items-center gap-1"
                      >
                        <ChevronLeft size={14} /> Back to Subject Selection
                      </button>
                      <span className="text-xs text-[var(--mut)]">&bull;</span>
                      <span className="badge ok">Step 2 of 3</span>
                    </div>
                    <h3 className="text-xl font-bold">Select Paper for {mcqSelectedSubject}</h3>
                    <p className="mut text-sm">
                      Only papers supported by authentic examination records for {mcqSelectedSubject} are listed.
                    </p>
                  </div>
                </div>

                {/* If no papers exist for this subject in the database */}
                {availableMcqPapers.length === 0 ? (
                  <div className="card text-center p-8 border-dashed border-2 border-[var(--line)] mb-6">
                    <FileQuestion size={44} className="mx-auto text-[var(--mut)] mb-3 opacity-60" />
                    <h3 className="text-lg font-bold">No MCQs available for this selection yet</h3>
                    <p className="mut text-sm max-w-md mx-auto mt-1 mb-5">
                      Chittagong Medical University past examination MCQs for <b>{mcqSelectedSubject}</b> are currently being extracted, proofread, and textbook-verified from official scripts.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        className="btn sm alt flex items-center gap-1.5"
                        onClick={() => setMcqSelectedSubject(null)}
                      >
                        <ChevronLeft size={14} />
                        <span>Return to Subject Selection</span>
                      </button>
                      <button
                        className="btn sm good flex items-center gap-1.5"
                        onClick={() => {
                          setMcqSelectedSubject('Anatomy');
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                      >
                        <span>Practice Anatomy (145 Verified MCQs Available)</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {availableMcqPapers.map(paper => (
                      <div
                        key={paper.name}
                        onClick={() => {
                          setMcqSelectedPaper(paper.name);
                          setMcqSelectedYear(null);
                        }}
                        className="card p-5 cursor-pointer hover:border-[var(--t)] hover:shadow-md transition-all border border-[var(--line)] bg-[var(--card)] group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--t2)] text-[var(--t)] flex items-center justify-center font-bold">
                            <FileText size={20} />
                          </div>
                          <span className="badge ok text-xs font-semibold">
                            {paper.sessionCount} Examination Sessions
                          </span>
                        </div>

                        <h4 className="text-lg font-bold group-hover:text-[var(--t)] mb-1">
                          {mcqSelectedSubject} &bull; {paper.name}
                        </h4>

                        <p className="text-xs text-[var(--mut)] mb-3 leading-relaxed">
                          {paper.name === 'Paper-I'
                            ? 'General Anatomy, General Histology, Embryology, Genetics, Head & Neck, Brain, and Eyeball.'
                            : 'Abdomen, Pelvis, Thorax, Superior Extremity, and Inferior Extremity.'}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-[var(--line)] text-xs">
                          <div className="flex items-center justify-between text-[var(--mut)]">
                            <span>Verified Questions:</span>
                            <span className="font-bold text-[var(--ink)]">{paper.questionCount} Questions</span>
                          </div>
                          <div className="flex items-center justify-between text-[var(--mut)]">
                            <span>Available Years:</span>
                            <span className="font-bold text-[var(--ink)]">{paper.years.join(', ')}</span>
                          </div>
                        </div>

                        <button
                          className="btn w-full mt-4 good text-xs font-bold flex items-center justify-center gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMcqSelectedPaper(paper.name);
                            setMcqSelectedYear(null);
                          }}
                        >
                          <span>Select {paper.name}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= STEP 3: YEAR SELECTION ================= */}
            {mcqSelectedSubject && mcqSelectedPaper && !mcqSelectedYear && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => {
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                        className="text-xs text-[var(--t)] font-semibold hover:underline flex items-center gap-1"
                      >
                        <ChevronLeft size={14} /> Back to Papers
                      </button>
                      <span className="text-xs text-[var(--mut)]">&bull;</span>
                      <span className="badge ok">Step 3 of 3</span>
                    </div>
                    <h3 className="text-xl font-bold">Select Examination Year</h3>
                    <p className="mut text-sm">
                      {mcqSelectedSubject} &bull; {mcqSelectedPaper} &bull; Showing available years in chronological order
                    </p>
                  </div>
                </div>

                {/* If no years exist for this selection */}
                {availableMcqYears.length === 0 ? (
                  <div className="card text-center p-8 border-dashed border-2 border-[var(--line)] mb-6">
                    <FileQuestion size={44} className="mx-auto text-[var(--mut)] mb-3 opacity-60" />
                    <h3 className="text-lg font-bold">No MCQs available for this selection yet</h3>
                    <p className="mut text-sm max-w-md mx-auto mt-1 mb-5">
                      No examination records were found for {mcqSelectedSubject} {mcqSelectedPaper}.
                    </p>
                    <button
                      className="btn sm alt"
                      onClick={() => setMcqSelectedPaper(null)}
                    >
                      ← Return to Paper Selection
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                    {availableMcqYears.map(yearData => (
                      <div
                        key={yearData.year}
                        onClick={() => {
                          setMcqSelectedYear(yearData.year);
                          setMcqSessionFilter('all');
                        }}
                        className="card p-4 cursor-pointer hover:border-[var(--t)] hover:shadow-md transition-all border border-[var(--line)] bg-[var(--card)] group text-center flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-9 h-9 rounded-full bg-[var(--t2)] text-[var(--t)] mx-auto flex items-center justify-center mb-2 font-bold">
                            <Calendar size={18} />
                          </div>
                          <div className="text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--t)]">
                            {yearData.year}
                          </div>
                          <div className="text-xs font-semibold text-[var(--mut)] mt-1">
                            {yearData.sessions.join(' & ')}
                          </div>
                          <div className="badge ok text-[11px] mt-2 inline-block">
                            {yearData.questionCount} Questions
                          </div>
                        </div>

                        <button
                          className="btn w-full mt-4 text-xs font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMcqSelectedYear(yearData.year);
                            setMcqSessionFilter('all');
                          }}
                        >
                          View {yearData.year} MCQs &rarr;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= STEP 4: DISPLAY MATCHING MCQS ================= */}
            {mcqSelectedSubject && mcqSelectedPaper && mcqSelectedYear && (
              <div>
                {/* Active Selection Breadcrumb Header */}
                <div className="card mb-6 bg-[var(--card)] border-[var(--line)] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[var(--mut)] font-bold uppercase tracking-wider">Active Filters:</span>
                      
                      <button
                        onClick={() => {
                          setMcqSelectedSubject(null);
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-600/20 flex items-center gap-1 transition-colors border border-emerald-600/20"
                        title="Change Subject"
                      >
                        <span>Subject: {mcqSelectedSubject}</span>
                        <span className="text-emerald-600 font-bold ml-1">&times;</span>
                      </button>

                      <button
                        onClick={() => {
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-[var(--t2)] text-[var(--t)] font-bold hover:bg-[var(--t)]/20 flex items-center gap-1 transition-colors border border-[var(--t)]/20"
                        title="Change Paper"
                      >
                        <span>Paper: {mcqSelectedPaper}</span>
                        <span className="text-[var(--t)] font-bold ml-1">&times;</span>
                      </button>

                      <button
                        onClick={() => {
                          setMcqSelectedYear(null);
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-800 dark:text-sky-300 font-bold hover:bg-sky-500/20 flex items-center gap-1 transition-colors border border-sky-500/20"
                        title="Change Year"
                      >
                        <span>Year: {mcqSelectedYear}</span>
                        <span className="text-sky-600 font-bold ml-1">&times;</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Mode Toggle Button */}
                      <button
                        className={`btn sm ${mcqStudyMode ? 'good' : 'alt'}`}
                        onClick={() => setMcqStudyMode(!mcqStudyMode)}
                        title="Switch between Practice Mode and Study Mode"
                      >
                        {mcqStudyMode ? <Eye size={14} /> : <EyeOff size={14} />}
                        <span>{mcqStudyMode ? 'Study Mode (Keys Visible)' : 'Practice Mode (Self-Test)'}</span>
                      </button>

                      <button
                        className="btn sm alt flex items-center gap-1 text-xs"
                        onClick={() => setMcqAnswers({})}
                        title="Clear all practice selections"
                      >
                        <RotateCcw size={13} />
                        <span>Reset</span>
                      </button>

                      <div className="flex items-center gap-1.5 bg-[var(--g2)] px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--g)] border border-emerald-600/20">
                        <Award size={15} />
                        <span>Score: {mcqScore.correct} / {mcqScore.answered}</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Type Filter Tabs (True/False vs SBA) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-[var(--mut)] font-bold mr-1">Question Type:</span>
                      {(() => {
                        const totalTF = activeDisplayMcqPapers.reduce((sum, p) => sum + p.questions.filter(q => q.type === 'TF').length, 0);
                        const totalSBA = activeDisplayMcqPapers.reduce((sum, p) => sum + p.questions.filter(q => q.type === 'SBA').length, 0);
                        const totalAll = activeDisplayMcqPapers.reduce((sum, p) => sum + p.questions.length, 0);

                        return (
                          <>
                            <button
                              onClick={() => setMcqTypeFilter('all')}
                              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                                mcqTypeFilter === 'all'
                                  ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                                  : 'bg-[var(--card)] text-[var(--ink-secondary)] border border-[var(--line)] hover:border-[var(--brand-pine)]'
                              }`}
                            >
                              All Types ({totalAll})
                            </button>
                            <button
                              onClick={() => setMcqTypeFilter('TF')}
                              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                                mcqTypeFilter === 'TF'
                                  ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                                  : 'bg-[var(--card)] text-[var(--ink-secondary)] border border-[var(--line)] hover:border-[var(--brand-pine)]'
                              }`}
                            >
                              True / False (MFT) ({totalTF})
                            </button>
                            <button
                              onClick={() => setMcqTypeFilter('SBA')}
                              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                                mcqTypeFilter === 'SBA'
                                  ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                                  : 'bg-[var(--card)] text-[var(--ink-secondary)] border border-[var(--line)] hover:border-[var(--brand-pine)]'
                              }`}
                            >
                              Single Best Answer (SBA) ({totalSBA})
                            </button>
                          </>
                        );
                      })()}
                    </div>

                    {matchingMcqPapers.length > 1 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-[var(--mut)] font-semibold mr-1">Session:</span>
                        <button
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                            mcqSessionFilter === 'all'
                              ? 'bg-[var(--t)] text-white shadow-xs'
                              : 'bg-[var(--card)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--t)]'
                          }`}
                          onClick={() => setMcqSessionFilter('all')}
                        >
                          All Sessions
                        </button>
                        {matchingMcqPapers.map(p => (
                          <button
                            key={p.id}
                            className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                              mcqSessionFilter === p.id
                                ? 'bg-[var(--t)] text-white shadow-xs'
                                : 'bg-[var(--card)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--t)]'
                            }`}
                            onClick={() => setMcqSessionFilter(p.id)}
                          >
                            {p.session}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Verification Status Filter Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-[var(--mut)] font-semibold mr-1">Answer Status:</span>
                      {(['all', 'Verified', 'Needs Review', 'Provisional'] as const).map(st => (
                        <button
                          key={st}
                          onClick={() => setMcqStatusFilter(st)}
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                            mcqStatusFilter === st
                              ? 'bg-[var(--g)] text-white shadow-xs'
                              : 'bg-[var(--card)] text-[var(--ink-secondary)] border border-[var(--line)] hover:border-[var(--g)]'
                          }`}
                        >
                          {st === 'all' ? 'All Questions' : st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* If no papers match */}
                {activeDisplayMcqPapers.length === 0 ? (
                  <div className="card text-center p-8 border-dashed border-2 border-[var(--line)] mb-6">
                    <FileQuestion size={44} className="mx-auto text-[var(--mut)] mb-3 opacity-60" />
                    <h3 className="text-lg font-bold">No MCQs available for this selection yet</h3>
                    <p className="mut text-sm max-w-md mx-auto mt-1 mb-5">
                      No questions matched your current filter criteria: <b>{mcqSelectedSubject}</b> &bull; <b>{mcqSelectedPaper}</b> &bull; <b>{mcqSelectedYear}</b>.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        className="btn sm alt"
                        onClick={() => setMcqSelectedYear(null)}
                      >
                        ← Select Another Year
                      </button>
                      <button
                        className="btn sm"
                        onClick={() => {
                          setMcqSelectedSubject(null);
                          setMcqSelectedPaper(null);
                          setMcqSelectedYear(null);
                        }}
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 mb-8">
                    {activeDisplayMcqPapers.map(paper => {
                      // Filter questions in this paper if type or status filter is chosen
                      const displayQuestions = paper.questions.filter(q => {
                        if (mcqTypeFilter !== 'all' && q.type !== mcqTypeFilter) return false;
                        if (mcqStatusFilter === 'all') return true;
                        const qKey = `${paper.id}-q${q.qNum}`;
                        const meta = getMcqAnswerMetadata(qKey, q.stem, q.type);
                        return meta.verificationStatus === mcqStatusFilter;
                      });

                      if (displayQuestions.length === 0) return null;

                      return (
                        <div key={paper.id} className="paper">
                          <div className="paperhead flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div>
                              <b className="tracking-wide">CHITTAGONG MEDICAL UNIVERSITY</b>
                              <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">
                                1st Professional MBBS Examination &bull; {paper.session} ({paper.curriculum})
                              </div>
                              <span className="text-xs text-[var(--mut)]">
                                Subject: {paper.subject} &bull; {paper.paper} &bull; {paper.bookPage} &bull; Time: {paper.time} &bull; Total Marks: {paper.totalMarks}
                              </span>
                            </div>

                            <span className="badge ok text-xs font-semibold">
                              {displayQuestions.length} Questions Shown &bull; Page {paper.page}
                            </span>
                          </div>

                          {/* Standard Textbook Methodology Notice */}
                          <div className="p-3 my-2 bg-emerald-500/5 border border-emerald-600/20 rounded-md text-xs text-[var(--ink)] flex items-start gap-2">
                            <ShieldAlert size={15} className="text-[var(--g)] shrink-0 mt-0.5" />
                            <div>
                              <b>Verification Integrity &amp; Standard References:</b> Answers are verified against established medical textbooks (Snell, Gray's Anatomy, Moore, BD Chaurasia, Langman, Junqueira). Questions with commercial question bank ambiguities or discrepancies are clearly marked with warning badges.
                            </div>
                          </div>

                          {/* Questions List */}
                          <div className="divide-y divide-[var(--line)] mt-4">
                            {displayQuestions.map((q) => {
                              const qKey = `${paper.id}-q${q.qNum}`;
                              const meta = getMcqAnswerMetadata(qKey, q.stem, q.type);
                              const currentAnswer = mcqAnswers[qKey];
                              const showDetails = mcqStudyMode || showAnswerKeys;

                              if (q.type === 'TF' && q.items) {
                                const hasAnySubAnswered = currentAnswer && Object.keys(currentAnswer).length > 0;

                                return (
                                  <div key={q.qNum} className="py-5">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 font-semibold">
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-[var(--g)] font-bold text-base">{q.qNum}.</span>
                                        <span className="text-base text-[var(--ink)]">{q.stem}</span>
                                        <span className="text-xs px-2 py-0.5 bg-[var(--t2)] text-[var(--t)] rounded font-semibold">True / False</span>
                                      </div>

                                      {/* Verification Status Badge */}
                                      <div>
                                        {meta.verificationStatus === 'Verified' && (
                                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                                            <CheckCircle2 size={12} className="text-emerald-600" /> Verified
                                          </span>
                                        )}
                                        {meta.verificationStatus === 'Provisional' && (
                                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/30">
                                            <Info size={12} className="text-sky-600" /> Provisional
                                          </span>
                                        )}
                                        {meta.verificationStatus === 'Needs Review' && (
                                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                                            <AlertTriangle size={12} className="text-amber-600" /> Needs Review
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Sub-items list */}
                                    <div className="space-y-2 mt-3">
                                      {q.items.map((item, itemIdx) => {
                                        const answered = currentAnswer && currentAnswer[itemIdx] !== undefined;
                                        const userVal = answered ? currentAnswer[itemIdx] : null;
                                        const isCorrect = answered && userVal === item.ans;

                                        return (
                                          <div
                                            key={itemIdx}
                                            className={`mrow p-2.5 rounded-lg border transition-all ${
                                              answered
                                                ? (isCorrect ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30')
                                                : showDetails
                                                ? (item.ans ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-[var(--card)] border-[var(--line)]')
                                                : 'bg-[var(--card)] border-[var(--line)]'
                                            }`}
                                          >
                                            <span className="font-bold text-sm text-[var(--mut)]">{item.label})</span>
                                            <span className="text-sm text-[var(--ink)] leading-snug">{item.text}</span>

                                            <div className="mbtns">
                                              <button
                                                className={`mb ${
                                                  answered && userVal === true
                                                    ? (isCorrect ? 'good' : 'bad')
                                                    : showDetails && item.ans === true
                                                    ? 'good ring-2 ring-emerald-500 font-bold'
                                                    : ''
                                                }`}
                                                disabled={answered || showDetails}
                                                onClick={() => {
                                                  setMcqAnswers(prev => ({
                                                    ...prev,
                                                    [qKey]: { ...(prev[qKey] || {}), [itemIdx]: true }
                                                  }));
                                                }}
                                              >
                                                T
                                              </button>
                                              <button
                                                className={`mb ${
                                                  answered && userVal === false
                                                    ? (isCorrect ? 'good' : 'bad')
                                                    : showDetails && item.ans === false
                                                    ? 'good ring-2 ring-emerald-500 font-bold'
                                                    : ''
                                                }`}
                                                disabled={answered || showDetails}
                                                onClick={() => {
                                                  setMcqAnswers(prev => ({
                                                    ...prev,
                                                    [qKey]: { ...(prev[qKey] || {}), [itemIdx]: false }
                                                  }));
                                                }}
                                              >
                                                F
                                              </button>
                                            </div>

                                            {(answered || showDetails) && (
                                              <div className="mexp flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-1.5">
                                                  {answered && (
                                                    isCorrect ? (
                                                      <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                                                        <CheckCircle2 size={12} /> Correct
                                                      </span>
                                                    ) : (
                                                      <span className="text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1">
                                                        <XCircle size={12} /> Incorrect
                                                      </span>
                                                    )
                                                  )}
                                                  <span className="text-[var(--mut)]">
                                                    Answer Script: <b className={item.ans ? "text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-700 dark:text-slate-300 font-bold"}>{item.ans ? 'True (T)' : 'False (F)'}</b>
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Authoritative Textbook Evidence & Discrepancy Note Box */}
                                    {(hasAnySubAnswered || showDetails) && (
                                      <div className="mt-3 p-3 bg-[var(--card-subtle)] border border-[var(--line)] rounded-lg text-xs space-y-1.5">
                                        <div className="flex items-start gap-1.5 text-[var(--ink)]">
                                          <BookOpen size={14} className="text-[var(--g)] shrink-0 mt-0.5" />
                                          <div>
                                            <span className="font-bold text-[var(--g)]">Medical Reference: </span>
                                            <span>{meta.sourceReference}</span>
                                          </div>
                                        </div>

                                        {meta.explanation && (
                                          <div className="text-[var(--mut)] pl-5 leading-relaxed">
                                            {meta.explanation}
                                          </div>
                                        )}

                                        {meta.officialOrbitDiscrepancy && (
                                          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-900 dark:text-amber-200 mt-2">
                                            <div className="font-bold flex items-center gap-1 mb-0.5">
                                              <AlertCircle size={13} className="text-amber-600" />
                                              <span>Commercial Question Bank Discrepancy:</span>
                                            </div>
                                            <span>{meta.officialOrbitDiscrepancy}</span>
                                          </div>
                                        )}

                                        {meta.reviewReason && !meta.officialOrbitDiscrepancy && (
                                          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-900 dark:text-amber-200 mt-2">
                                            <span className="font-bold">Review Note: </span>
                                            <span>{meta.reviewReason}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              } else if (q.type === 'SBA' && q.opts) {
                                const selectedIdx = currentAnswer;
                                const isSubmitted = selectedIdx !== undefined;
                                const isCorrect = isSubmitted && selectedIdx === q.correctIndex;

                                return (
                                  <div key={q.qNum} className="py-5">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 font-semibold">
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-[var(--g)] font-bold text-base">{q.qNum}.</span>
                                        <span className="text-base text-[var(--ink)]">{q.stem}</span>
                                        <span className="text-xs px-2 py-0.5 bg-emerald-600/10 text-[var(--g)] rounded font-semibold">Single Best Answer (SBA)</span>
                                      </div>

                                      {/* Verification Status Badge */}
                                      <div>
                                        {meta.verificationStatus === 'Verified' && (
                                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                                            <CheckCircle2 size={12} className="text-emerald-600" /> Verified
                                          </span>
                                        )}
                                        {meta.verificationStatus === 'Provisional' && (
                                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/30">
                                            <Info size={12} className="text-sky-600" /> Provisional
                                          </span>
                                        )}
                                        {meta.verificationStatus === 'Needs Review' && (
                                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                                            <AlertTriangle size={12} className="text-amber-600" /> Needs Review
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* SBA Options List */}
                                    <div className="space-y-2 mt-3">
                                      {q.opts.map((opt, optIdx) => {
                                        const optIsCorrect = optIdx === q.correctIndex;
                                        const optIsSelected = optIdx === selectedIdx;
                                        let btnClass = "mopt";
                                        
                                        if (isSubmitted) {
                                          if (optIsCorrect) btnClass += " good";
                                          else if (optIsSelected) btnClass += " bad";
                                        } else if (showDetails && optIsCorrect) {
                                          btnClass += " ring-2 ring-emerald-500 bg-emerald-50/50";
                                        }

                                        return (
                                          <button
                                            key={optIdx}
                                            className={btnClass}
                                            disabled={isSubmitted || showDetails}
                                            onClick={() => {
                                              setMcqAnswers(prev => ({ ...prev, [qKey]: optIdx }));
                                            }}
                                          >
                                            <b className="w-6 shrink-0">{"abcde"[optIdx]})</b>
                                            <span className="flex-1">{opt}</span>
                                            {isSubmitted && optIsCorrect && (
                                              <span className="text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
                                                <CheckCircle2 size={13} /> Correct Answer
                                              </span>
                                            )}
                                            {isSubmitted && optIsSelected && !optIsCorrect && (
                                              <span className="text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1">
                                                <XCircle size={13} /> Your Choice
                                              </span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {/* Authoritative Textbook Evidence & Discrepancy Note Box */}
                                    {(isSubmitted || showDetails) && (
                                      <div className="mt-3 p-3 bg-[var(--card-subtle)] border border-[var(--line)] rounded-lg text-xs space-y-1.5">
                                        <div className="flex items-center gap-2">
                                          {isSubmitted && (
                                            isCorrect ? (
                                              <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                                                <CheckCircle2 size={13} /> Correct Selection
                                              </span>
                                            ) : (
                                              <span className="text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1">
                                                <XCircle size={13} /> Incorrect Selection
                                              </span>
                                            )
                                          )}
                                          <span className="text-[var(--mut)]">
                                            Verified Key: <b className="text-[var(--ink)]">{"abcde"[q.correctIndex || 0]}) {q.opts[q.correctIndex || 0]}</b>
                                          </span>
                                        </div>

                                        <div className="flex items-start gap-1.5 text-[var(--ink)] pt-1 border-t border-[var(--line)]">
                                          <BookOpen size={14} className="text-[var(--g)] shrink-0 mt-0.5" />
                                          <div>
                                            <span className="font-bold text-[var(--g)]">Medical Reference: </span>
                                            <span>{meta.sourceReference}</span>
                                          </div>
                                        </div>

                                        {meta.explanation && (
                                          <div className="text-[var(--mut)] pl-5 leading-relaxed">
                                            {meta.explanation}
                                          </div>
                                        )}

                                        {meta.officialOrbitDiscrepancy && (
                                          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-900 dark:text-amber-200 mt-2">
                                            <div className="font-bold flex items-center gap-1 mb-0.5">
                                              <AlertCircle size={13} className="text-amber-600" />
                                              <span>Commercial Question Bank Discrepancy:</span>
                                            </div>
                                            <span>{meta.officialOrbitDiscrepancy}</span>
                                          </div>
                                        )}

                                        {meta.reviewReason && !meta.officialOrbitDiscrepancy && (
                                          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-900 dark:text-amber-200 mt-2">
                                            <span className="font-bold">Review Note: </span>
                                            <span>{meta.reviewReason}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Footer Nav Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--line)]">
                      <div className="flex items-center gap-2">
                        <button
                          className="btn sm alt flex items-center gap-1"
                          onClick={() => setMcqSelectedYear(null)}
                        >
                          <ChevronLeft size={14} /> Back to Years ({mcqSelectedPaper})
                        </button>
                        <button
                          className="btn sm alt flex items-center gap-1"
                          onClick={() => {
                            setMcqSelectedPaper(null);
                            setMcqSelectedYear(null);
                          }}
                        >
                          <ChevronLeft size={14} /> Change Paper
                        </button>
                      </div>

                      <button
                        className="btn sm good"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        &uarr; Back to Top
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================== VIVA BANK (UNDER DEVELOPMENT) ===================== */}
        {page === 'teacher' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2>Viva Bank</h2>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-700 border border-amber-500/30 font-bold text-xs rounded-full">
                Under Development
              </span>
            </div>

            <div className="card mb-6 border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-3">
                <Clock className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-1">
                    Section Status: Under Active Development
                  </h3>
                  <p className="text-sm text-[var(--mut)] leading-relaxed mb-3">
                    The teacher-wise viva question bank and card-wise examiner repository are currently being cataloged and verified with Chittagong Medical College academic departments. This feature is not yet fully functional.
                  </p>
                  <p className="text-xs text-[var(--mut)]">
                    What is coming: Teacher attribution, viva board cards, table questions for Gross Anatomy, Histology, Embryology, Physiology graphs, and Biochemistry spot cases.
                  </p>
                </div>
              </div>
            </div>

            <div className="card text-center p-8 border-dashed">
              <BookOpen size={40} className="mx-auto text-[var(--mut)] mb-3 opacity-60" />
              <h3 className="font-semibold text-base mb-1">Viva Archiving In Progress</h3>
              <p className="text-xs text-[var(--mut)] max-w-md mx-auto">
                Once departmental verification is completed, viva records will be browsable by examiner, session, and sub-discipline.
              </p>
              <button className="btn sm mt-4" onClick={() => navigateTo('archive')}>
                Explore Written Questions Archive &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ===================== STUDENT LIBRARY & NOTES ===================== */}
        {page === 'library' && (() => {
          const allLibraryItems = [...userUploads, ...INITIAL_DEMO_RESOURCES];
          
          const filteredLibrary = allLibraryItems.filter(item => {
            if (librarySubject !== 'all' && item.subject.toLowerCase() !== librarySubject.toLowerCase()) return false;
            if (libraryType !== 'all' && item.kind.toLowerCase() !== libraryType.toLowerCase()) return false;
            if (librarySearch.trim()) {
              const q = librarySearch.toLowerCase().trim();
              const fullText = `${item.title} ${item.subject} ${item.topic} ${item.desc} ${item.uploader}`.toLowerCase();
              if (!fullText.includes(q)) return false;
            }
            return true;
          });

          const hasActiveFilters = librarySearch.trim() !== '' || librarySubject !== 'all' || libraryType !== 'all';
          const availableSubjects = ['all', 'Anatomy', 'Physiology', 'Biochemistry'];
          const availableTypes = ['all', 'Notes', 'Diagram', 'Summary'];

          return (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">Student Library &amp; Academic Notes</h2>
                  <p className="mut text-sm">
                    Verified medical notes, mnemonics, anatomical diagrams, and high-yield revision summaries contributed by Chittagong Medical College students.
                  </p>
                </div>
                <button className="btn sm self-start sm:self-auto shrink-0" onClick={() => navigateTo('upload')}>
                  Upload Study Resource
                </button>
              </div>

              {/* In-App Study Access Notice (No raw PDF downloads) */}
              <div className="p-3 bg-emerald-500/5 border border-emerald-600/20 rounded-lg text-xs text-[var(--ink)] flex items-start gap-2.5">
                <ShieldAlert size={16} className="text-[var(--brand-pine)] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <b>Academic Integrity Notice:</b> In adherence to student resource guidelines, original PDF download links have been disabled. All question banks, lecture notes, and diagrams are provided directly inside CMC MedArchive for structured, in-browser reference and self-testing.
                </div>
              </div>

              {/* Multi-Filter Controls Bar */}
              <div className="card p-4 space-y-4 bg-[var(--card)] border-[var(--line)] shadow-xs">
                {/* Search Bar */}
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)]" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search notes by topic, title, keyword, or contributor..."
                    className="!pl-10 !pr-10 !py-2.5 text-sm"
                  />
                  {librarySearch && (
                    <button
                      onClick={() => setLibrarySearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mut)] hover:text-[var(--ink)]"
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Filter Ribbons */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-[var(--line)]">
                  {/* Subject Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-[var(--mut)] font-bold mr-1">Subject:</span>
                    {availableSubjects.map(subj => (
                      <button
                        key={subj}
                        onClick={() => setLibrarySubject(subj)}
                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                          librarySubject === subj
                            ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                            : 'bg-[var(--card)] text-[var(--ink-secondary)] border border-[var(--line)] hover:border-[var(--brand-pine)]'
                        }`}
                      >
                        {subj === 'all' ? 'All Subjects' : subj}
                      </button>
                    ))}
                  </div>

                  {/* Resource Kind Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-[var(--mut)] font-bold mr-1">Type:</span>
                    {availableTypes.map(typ => (
                      <button
                        key={typ}
                        onClick={() => setLibraryType(typ)}
                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                          libraryType === typ
                            ? 'bg-[var(--brand-teal)] text-white shadow-xs'
                            : 'bg-[var(--card)] text-[var(--ink-secondary)] border border-[var(--line)] hover:border-[var(--brand-teal)]'
                        }`}
                      >
                        {typ === 'all' ? 'All Types' : typ}
                      </button>
                    ))}
                  </div>

                  {/* Reset Filters CTA */}
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setLibrarySearch('');
                        setLibrarySubject('all');
                        setLibraryType('all');
                      }}
                      className="text-xs px-2.5 py-1 rounded-md text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 font-bold hover:bg-rose-100 flex items-center gap-1 self-start md:self-center transition-colors"
                    >
                      <RotateCcw size={12} />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

                {/* Results Count Banner */}
                <div className="flex items-center justify-between text-xs text-[var(--mut)] pt-2 border-t border-[var(--line)]">
                  <span>
                    Showing <b>{filteredLibrary.length}</b> of <b>{allLibraryItems.length}</b> learning resources
                  </span>
                  {hasActiveFilters && (
                    <span className="font-semibold text-[var(--brand-pine)]">Filtered Results Active</span>
                  )}
                </div>
              </div>

              {/* Resource Cards or Empty State */}
              {filteredLibrary.length === 0 ? (
                <div className="card text-center p-10 border-dashed border-2 border-[var(--line)] bg-[var(--card-subtle)]">
                  <BookOpen size={48} className="mx-auto text-[var(--mut)] mb-3 opacity-50" />
                  <h3 className="text-lg font-bold text-[var(--ink)]">No study materials match your filters</h3>
                  <p className="mut text-sm max-w-md mx-auto mt-1 mb-5">
                    Try adjusting your search terms or clearing one of the subject/type filters to view all available notes and summaries.
                  </p>
                  <button
                    className="btn sm"
                    onClick={() => {
                      setLibrarySearch('');
                      setLibrarySubject('all');
                      setLibraryType('all');
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLibrary.map(res => (
                    <div key={res.id} className="item flex flex-col justify-between hover:border-[var(--brand-pine)] transition-all shadow-xs">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                            {res.kind}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[var(--t2)] text-[var(--t)] border border-[var(--t)]/20">
                            {res.subject}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[var(--ink-secondary)]">
                            {res.topic}
                          </span>
                          {res.prog && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 ml-auto">
                              {res.prog}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-base text-[var(--ink)] mb-2 leading-snug">
                          {res.title}
                        </h3>
                        <p className="text-sm text-[var(--mut)] mb-4 leading-relaxed">
                          {res.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-xs text-[var(--mut)] pt-3 border-t border-[var(--line)]">
                        <div className="flex items-center gap-1">
                          <User size={12} className="text-[var(--mut)]" />
                          <span>{res.uploader}</span>
                          <span>&bull;</span>
                          <span className="text-[11px]">{res.date}</span>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                          {res.perm}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* ===================== UPLOAD PAGE ===================== */}
        {page === 'upload' && (
          <div>
            <h2>Share a Study Resource</h2>
            <div className="card mb-6">
              <p className="mut text-sm">
                Share your lecture notes, summaries, or past questions to help your fellow CMC classmates. Materials are verified before public archiving.
              </p>
            </div>

            <form
              className="card max-w-xl space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const subject = (form.elements.namedItem('subject') as HTMLSelectElement).value;
                const topic = (form.elements.namedItem('topic') as HTMLInputElement).value;
                const desc = (form.elements.namedItem('desc') as HTMLTextAreaElement).value;
                const uploader = (form.elements.namedItem('uploader') as HTMLInputElement).value;

                if (!title || !subject || !topic) {
                  alert('Please fill in title, subject and topic');
                  return;
                }

                const newItem: UploadedItem = {
                  id: 'u_' + Date.now(),
                  title,
                  subject,
                  topic,
                  kind: 'Student Note',
                  desc,
                  uploader: uploader || (userProfile?.name ? userProfile.name : 'CMC Student'),
                  date: new Date().toISOString().slice(0, 10),
                  perm: 'Shared locally in browser',
                  prog
                };

                const updated = [newItem, ...userUploads];
                setUserUploads(updated);
                try {
                  localStorage.setItem('cmc_medarchive_uploads_v1', JSON.stringify(updated));
                } catch (err) {}

                navigateTo('library');
              }}
            >
              <div>
                <label className="font-semibold text-sm">Your Name / Batch</label>
                <input
                  name="uploader"
                  defaultValue={userProfile ? `${userProfile.name} (${userProfile.batch})` : ''}
                  placeholder="e.g. Sifat Islam (CMC-67)"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Resource Title</label>
                <input name="title" placeholder="e.g. Complete Autonomic Pharmacology Revision Sheet" required />
              </div>

              <div>
                <label className="font-semibold text-sm">Subject</label>
                <select name="subject" required>
                  <option value="">Select Medical Subject</option>
                  {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm">Topic</label>
                <input name="topic" placeholder="e.g. Brachial Plexus / Renal Clearance" required />
              </div>

              <div>
                <label className="font-semibold text-sm">Description &amp; Key Takeaways</label>
                <textarea name="desc" rows={3} placeholder="Brief summary of what this document covers..." />
              </div>

              <div>
                <label className="font-semibold text-sm">Google Drive / Public Link (Optional)</label>
                <input name="url" type="url" placeholder="https://drive.google.com/..." />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn w-full">
                  Save to Local Archive
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================== ABOUT PAGE ===================== */}
        {page === 'about' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">About CMC MedArchive</h2>
              <p className="mut text-sm">
                An academic initiative created by a medical student for medical students of Chittagong Medical College.
              </p>
            </div>

            {/* Navigation Tabs for About Sections */}
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-2">
              <button
                onClick={() => setAboutTab('site')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  aboutTab === 'site'
                    ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                    : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                About the Platform
              </button>
              <button
                onClick={() => setAboutTab('developer')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  aboutTab === 'developer'
                    ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                    : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                About the Developer
              </button>
            </div>

            {/* SECTION 1: ABOUT THE PLATFORM */}
            {aboutTab === 'site' && (
              <div className="space-y-6">
                <div className="card bg-[var(--card)] shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--line)]">
                    <BookOpen size={20} className="text-[var(--brand-pine)]" />
                    <h3 className="text-xl font-bold text-[var(--brand-pine)] m-0">The CMC MedArchive Mission</h3>
                  </div>

                  <p className="text-[var(--ink)] text-sm sm:text-base leading-relaxed">
                    <b>CMC MedArchive</b> is an open, student-first academic resource bank created specifically for students of <b>Chittagong Medical College (CMC)</b>. Medical students routinely encounter scattered past papers, conflicting answer keys in commercial question banks, and unorganized revision materials. CMC MedArchive systematically brings these academic resources together into a structured, searchable, and verified environment.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-[var(--card-subtle)] border border-[var(--line)]">
                      <div className="font-bold text-sm text-[var(--brand-pine)] mb-1">Written Questions (CQ)</div>
                      <p className="text-xs text-[var(--mut)] leading-relaxed">
                        Comprehensive curriculum archive organized paper-wise by subject and group (Group-A &amp; Group-B), with frequency tracking across CMU and CU examination sessions.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--card-subtle)] border border-[var(--line)]">
                      <div className="font-bold text-sm text-[var(--brand-teal)] mb-1">Authentic MCQ Practice</div>
                      <p className="text-xs text-[var(--mut)] leading-relaxed">
                        19 full university papers spanning 2021 to 2025, offering strict True/False (MFT) and Single Best Answer (SBA) separation with standard medical reference citations.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--card-subtle)] border border-[var(--line)]">
                      <div className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1">Student Library</div>
                      <p className="text-xs text-[var(--mut)] leading-relaxed">
                        Shared peer summaries, anatomical diagrams, and metabolic pathways contributed by classmates to optimize revision before professional examinations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Evidence & Verification Principles */}
                <div className="card bg-[var(--card)] shadow-xs space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
                    <ShieldAlert size={18} className="text-amber-600" />
                    <h3 className="text-lg font-bold text-[var(--brand-pine)] m-0">Textbook Evidence &amp; Verification Standards</h3>
                  </div>

                  <p className="text-sm text-[var(--ink)] leading-relaxed">
                    Unlike commercial question banks that frequently contain proofreading errors or outdated keys, answers in CMC MedArchive are verified against standard authoritative medical literature:
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--ink-secondary)] list-disc pl-5">
                    <li><b>Snell's Clinical Anatomy by Regions</b> (10th Ed.)</li>
                    <li><b>Gray's Anatomy for Students</b> (4th Ed.)</li>
                    <li><b>Moore's Clinically Oriented Anatomy</b> (9th Ed.)</li>
                    <li><b>BD Chaurasia's Human Anatomy</b> (8th Ed., Vols 1–4)</li>
                    <li><b>Langman's Medical Embryology</b> (14th Ed.)</li>
                    <li><b>Junqueira's Basic Histology</b> (16th Ed.)</li>
                  </ul>

                  <p className="text-xs text-[var(--mut)] italic pt-2 border-t border-[var(--line)]">
                    Where commercial question bank keys conflict with established anatomical literature, discrepancy warnings are prominently flagged to protect student preparation.
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 2: ABOUT THE DEVELOPER */}
            {aboutTab === 'developer' && (
              <div className="space-y-6">
                <div className="card bg-[var(--card)] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[var(--line)]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--mut)]">Developer Profile</span>
                      <h3 className="text-2xl font-bold text-[var(--brand-pine)] m-0">Sifat Islam</h3>
                      <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">
                        Medical Student &bull; <span className="text-[var(--mut)]">Chittagong Medical College (CMC-67)</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-sage)] text-[var(--brand-pine)] text-xs font-semibold self-start sm:self-center">
                      <GraduationCap size={16} />
                      <span>Chittagong Medical College</span>
                    </div>
                  </div>

                  <div className="text-[var(--ink)] text-sm sm:text-base leading-relaxed space-y-4">
                    <p className="p-4 bg-[var(--bg-subtle)] rounded-lg border-l-4 border-[var(--brand-pine)] italic">
                      “I am Sifat Islam, a medical student at Chittagong Medical College. I created CMC MedArchive with a simple goal: to make academic resources easier for medical students to find, access, and organize in one place.”
                    </p>

                    <p>
                      “Medical students often need to search through scattered question papers, study materials, and revision resources while preparing for professional examinations. CMC MedArchive aims to reduce that difficulty by bringing these resources together in a structured, searchable, and student-friendly platform.”
                    </p>
                  </div>
                </div>

                {/* Section: The Vision Ahead */}
                <div className="card bg-[var(--card)] shadow-xs">
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[var(--line)]">
                    <Sparkles size={18} className="text-[var(--brand-teal)]" />
                    <h3 className="text-lg font-bold text-[var(--brand-pine)] m-0">The Vision Ahead</h3>
                  </div>

                  <div className="text-[var(--ink)] text-sm leading-relaxed space-y-3">
                    <p>
                      “CMC MedArchive is an ongoing project with room to grow. The long-term vision is to build a more comprehensive academic resource platform for Chittagong Medical College students, with better paper-wise question organization, searchable archives, MCQ resources, viva preparation materials, and other useful study resources as they become available.”
                    </p>

                    <p>
                      “Future improvements may include easier resource submission, more organized study materials, and AI-assisted tools to help students search and revise academic content more efficiently.”
                    </p>

                    <div className="p-3 bg-[var(--brand-sage)] border border-[var(--line)] rounded-lg text-xs font-medium text-[var(--ink)]">
                      The goal is not to replace textbooks, teachers, or personal study. It is to make useful academic resources easier to access and use.
                    </div>

                    <p className="text-xs text-[var(--mut)] pt-1">
                      “CMC MedArchive will continue to improve based on students’ needs, feedback, and the availability of reliable academic materials.”
                    </p>
                  </div>
                </div>

                {/* Contact and Community Links */}
                <div className="card bg-[var(--card)] shadow-xs">
                  <h3 className="text-base font-bold text-[var(--ink)] mb-3">Connect &amp; Student Feedback</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl border border-[var(--line)] hover:border-sky-500 bg-[var(--card-subtle)] hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all flex items-center gap-3 no-underline group"
                    >
                      <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-600 group-hover:scale-105 transition-transform">
                        <TelegramIcon className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Telegram Channel &amp; Direct Contact</div>
                        <div className="text-xs text-sky-600 font-semibold">@Sifat_Islam_7</div>
                      </div>
                    </a>

                    <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--card-subtle)] flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Student Inquiries &amp; Contributions</div>
                        <div className="text-xs text-[var(--mut)] font-mono">sifatislam.cmc67@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===================== SIGN IN / SIGN UP MODAL ===================== */}
      {authModal && (
        <div
          className="modal-overlay"
          onClick={() => setAuthModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <div className="modal-content max-w-md mx-auto my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2.5">
                <CmcLogo variant="icon" size="sm" />
                <h3 id="auth-modal-title" className="text-base font-bold m-0 text-slate-900 dark:text-white">
                  {authModal === 'signin' ? 'Sign In to CMC MedArchive' : 'Student Registration'}
                </h3>
              </div>
              <button
                className="btn sm alt !px-2.5 !py-1 text-xs"
                onClick={() => setAuthModal(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="grid grid-cols-2 border-b border-[var(--line)] bg-[var(--bg-subtle)] text-xs font-bold">
              <button
                type="button"
                className={`py-2.5 text-center transition-colors ${
                  authModal === 'signin'
                    ? 'bg-[var(--card)] text-[var(--brand-pine)] border-b-2 border-[var(--brand-pine)]'
                    : 'text-[var(--mut)] hover:text-[var(--ink)]'
                }`}
                onClick={() => setAuthModal('signin')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`py-2.5 text-center transition-colors ${
                  authModal === 'signup'
                    ? 'bg-[var(--card)] text-[var(--brand-pine)] border-b-2 border-[var(--brand-pine)]'
                    : 'text-[var(--mut)] hover:text-[var(--ink)]'
                }`}
                onClick={() => setAuthModal('signup')}
              >
                Register Account
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[75vh] bg-[var(--card)]">
              {/* Honest Backend Setup Notice */}
              <div className="p-3 mb-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-[var(--ink)]">
                <div className="flex items-start gap-2">
                  <ShieldAlert size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <b>Account Setup Notice:</b> Cloud authentication with Chittagong Medical College roll/batch verification is currently in development. You can sign in or register below to activate your browser session and submit study resources to the library.
                  </div>
                </div>
              </div>

              {authModal === 'signin' ? (
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                    const user: UserProfile = {
                      name: email.split('@')[0],
                      email,
                      college: 'Chittagong Medical College (CMC)',
                      batch: 'CMC-67'
                    };
                    setUserProfile(user);
                    try { localStorage.setItem('cmc_user_profile', JSON.stringify(user)); } catch (err) {}
                    setAuthModal(null);
                  }}
                >
                  <div>
                    <label className="text-xs font-semibold">Student Email</label>
                    <input name="email" type="email" placeholder="student@cmc.edu.bd" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Password / Access Code</label>
                    <input name="password" type="password" placeholder="••••••••" required />
                  </div>

                  <button type="submit" className="btn w-full mt-3">
                    Sign In
                  </button>

                  <div className="text-center text-xs text-[var(--mut)] pt-3">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="underline text-[var(--t)] font-semibold"
                      onClick={() => setAuthModal('signup')}
                    >
                      Register here
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                    const college = (form.elements.namedItem('college') as HTMLInputElement).value;
                    const batch = (form.elements.namedItem('batch') as HTMLInputElement).value;
                    const roll = (form.elements.namedItem('roll') as HTMLInputElement).value;

                    const user: UserProfile = {
                      name,
                      email,
                      college: college || 'Chittagong Medical College',
                      batch: batch || 'CMC-67',
                      roll
                    };
                    setUserProfile(user);
                    try { localStorage.setItem('cmc_user_profile', JSON.stringify(user)); } catch (err) {}
                    setAuthModal(null);
                  }}
                >
                  <div>
                    <label className="text-xs font-semibold">Full Name</label>
                    <input name="name" placeholder="e.g. Sifat Islam" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Email Address</label>
                    <input name="email" type="email" placeholder="student@example.com" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Medical College</label>
                    <input name="college" defaultValue="Chittagong Medical College (CMC)" required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold">Batch / Session</label>
                      <input name="batch" placeholder="e.g. CMC-67" required />
                    </div>
                    <div>
                      <label className="text-xs font-semibold">Roll Number</label>
                      <input name="roll" placeholder="e.g. 102" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Password</label>
                    <input name="password" type="password" placeholder="••••••••" required />
                  </div>

                  <button type="submit" className="btn w-full mt-3">
                    Complete Registration
                  </button>

                  <div className="text-center text-xs text-[var(--mut)] pt-3">
                    Already registered?{' '}
                    <button
                      type="button"
                      className="underline text-[var(--t)] font-semibold"
                      onClick={() => setAuthModal('signin')}
                    >
                      Sign in instead
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="wrap">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left flex items-center gap-3">
              <CmcLogo variant="compact" size="sm" />
              <div>
                <div className="text-xs text-[var(--mut)]">
                  Chittagong Medical College &bull; Questions &bull; Notes &bull; Knowledge
                </div>
                <div className="text-[11px] text-[var(--mut)] mt-0.5">
                  An academic knowledge archive created by Sifat Islam (CMC-67).
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right text-xs text-[var(--mut)]">
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <span>Telegram Community:</span>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700"
                >
                  <TelegramIcon className="w-3.5 h-3.5" />
                  <span>@Sifat_Islam_7</span>
                </a>
              </div>
              <div className="mt-1 text-[11px]">
                Built for medical students · Preserving curriculum excellence
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
