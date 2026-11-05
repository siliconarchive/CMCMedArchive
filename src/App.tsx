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
  XCircle,
  UploadCloud,
  FileUp,
  Loader2,
  Trash2,
  ShieldCheck,
  Download,
  ChevronDown
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
  fullName: string;
  collegeName: string;
  title: string;
  subject: string;
  topic: string;
  kind: string;
  description: string;
  originalFileName?: string;
  storedFileName?: string;
  fileSize?: number;
  mimeType?: string;
  fileUrl?: string;
  uploadedByUserId?: string;
  uploadedByEmail?: string;
  uploadTimestamp?: string;
  status: 'pending' | 'approved' | 'rejected';
  moderationNote?: string;
  prog: 'MBBS' | 'BDS';
  // Legacy compatibility fields
  uploader?: string;
  college?: string;
  desc?: string;
  date?: string;
  perm?: string;
  url?: string;
  demo?: boolean;
}

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  batch: string;
  roll?: string;
  role: 'student' | 'admin';
  createdAt?: string;
  name?: string;
  college?: string;
}

const TELEGRAM_URL = "https://t.me/Sifat_Islam_7";

const SUBJ_MBBS = ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", "Community Medicine", "Forensic Medicine"];
const SUBJ_BDS = ["Anatomy", "Physiology", "Biochemistry", "Dental Anatomy", "Oral Histology", "Dental Materials"];
const EXAM_TYPES = ["Written", "SEQ", "PBQ", "Short Note", "Professional", "Term", "Viva", "Card"];

const INITIAL_DEMO_RESOURCES: UploadedItem[] = [
  {
    id: "r1",
    fullName: "Sifat Islam",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Brachial plexus summary & clinical lesions",
    subject: "Anatomy",
    topic: "Brachial plexus",
    kind: "Notes",
    description: "One-page revision summary of roots, trunks, divisions, cords and branches with Erb-Duchenne and Klumpke palsy clinical correlations.",
    status: "approved",
    prog: "MBBS",
    uploader: "Sifat Islam (CMC-67)",
    date: "2026-09-01",
    perm: "Verified Academic Note"
  },
  {
    id: "r2",
    fullName: "CMC Academic Committee",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Cardiac cycle Wiggers diagram & heart sounds",
    subject: "Physiology",
    topic: "Cardiac cycle",
    kind: "Diagram",
    description: "Pressure-volume loop, synchronized jugular venous pulse (JVP) and phonocardiogram (S1-S4) reference chart.",
    status: "approved",
    prog: "MBBS",
    uploader: "CMC Academic Committee",
    date: "2026-09-05",
    perm: "Verified Academic Note"
  },
  {
    id: "r3",
    fullName: "CMC Academic Committee",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Glycolysis & Gluconeogenesis reciprocal regulation",
    subject: "Biochemistry",
    topic: "Carbohydrate Metabolism",
    kind: "Notes",
    description: "High-yield pathway chart with regulated rate-limiting enzymes, ATP yield, and insulin-glucagon phosphorylation states.",
    status: "approved",
    prog: "MBBS",
    uploader: "CMC Academic Committee",
    date: "2026-09-09",
    perm: "Verified Academic Note"
  },
  {
    id: "r4",
    fullName: "CMC Academic Committee",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Renal Clearance & Countercurrent multiplier mechanism",
    subject: "Physiology",
    topic: "Renal System",
    kind: "Notes",
    description: "Step-by-step summary of loop of Henle medullary hyperosmolarity and GFR regulation by tubuloglomerular feedback.",
    status: "approved",
    prog: "MBBS",
    uploader: "CMC Academic Committee",
    date: "2026-09-12",
    perm: "Verified Academic Note"
  },
  {
    id: "r5",
    fullName: "Sifat Islam",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Cranial nerves exit foramina & functional modalities",
    subject: "Anatomy",
    topic: "Neuroanatomy & Cranial Cavity",
    kind: "Summary",
    description: "Complete reference table of cranial nerves (I–XII), their skull base exit foramina, and sensory/motor/parasympathetic components.",
    status: "approved",
    prog: "MBBS",
    uploader: "Sifat Islam (CMC-67)",
    date: "2026-09-15",
    perm: "Verified Academic Note"
  },
  {
    id: "r6",
    fullName: "CMC Academic Committee",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Acid-Base balance & arterial blood gas (ABG) chart",
    subject: "Biochemistry",
    topic: "Acid-Base & Renal",
    kind: "Summary",
    description: "Systematic diagnostic algorithm for metabolic vs respiratory acidosis and alkalosis with compensation formulas.",
    status: "approved",
    prog: "MBBS",
    uploader: "CMC Academic Committee",
    date: "2026-09-20",
    perm: "Verified Academic Note"
  },
  {
    id: "r7",
    fullName: "CMC Academic Committee",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Epithelium classification & histology quick guide",
    subject: "Anatomy",
    topic: "General Histology",
    kind: "Notes",
    description: "High-yield identification guide for simple, stratified, pseudostratified and transitional epithelium with organ locations.",
    status: "approved",
    prog: "MBBS",
    uploader: "CMC Academic Committee",
    date: "2026-09-22",
    perm: "Verified Academic Note"
  },
  {
    id: "r8",
    fullName: "CMC Academic Committee",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Respiratory membrane & gas diffusion capacities",
    subject: "Physiology",
    topic: "Respiratory System",
    kind: "Summary",
    description: "Layers of the blood-air barrier, Fick's law of diffusion, and factors altering diffusion capacity (DLCO).",
    status: "approved",
    prog: "MBBS",
    uploader: "CMC Academic Committee",
    date: "2026-09-28",
    perm: "Verified Academic Note"
  }
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

  // Authentication & Session State
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('cmc_auth_token');
    } catch (e) {
      return null;
    }
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem('cmc_user_profile');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Server-Persisted Notes and Library State
  const [serverNotes, setServerNotes] = useState<UploadedItem[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [libraryTab, setLibraryTab] = useState<'all' | 'my' | 'pending'>('all');

  // Dedicated Note Upload Form State
  const [uploadFullName, setUploadFullName] = useState<string>('');
  const [uploadCollegeName, setUploadCollegeName] = useState<string>('Chittagong Medical College (CMC)');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadSubject, setUploadSubject] = useState<string>('');
  const [uploadTopic, setUploadTopic] = useState<string>('');
  const [uploadDescription, setUploadDescription] = useState<string>('');
  const [uploadProg, setUploadProg] = useState<'MBBS' | 'BDS'>('MBBS');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadSubmitting, setUploadSubmitting] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Lock body scroll and trap Escape key when auth modal is open
  useEffect(() => {
    if (authModal) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setAuthModal(null);
          setAuthError(null);
          setAuthSuccess(null);
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

  // Fetch verified notes from backend
  const fetchNotes = async (token?: string | null) => {
    try {
      setNotesLoading(true);
      const headers: Record<string, string> = {};
      const activeToken = token !== undefined ? token : authToken;
      if (activeToken) {
        headers['Authorization'] = `Bearer ${activeToken}`;
      }
      const res = await fetch('/api/notes', { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.notes)) {
          setServerNotes(data.notes);
        }
      }
    } catch (e) {
      console.warn('Note archive server sync notice:', e);
    } finally {
      setNotesLoading(false);
    }
  };

  // Restore authenticated session and initial notes on mount
  useEffect(() => {
    const token = localStorage.getItem('cmc_auth_token');
    if (token) {
      setAuthToken(token);
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Session expired');
          return res.json();
        })
        .then(data => {
          if (data.user) {
            setUserProfile(data.user);
            try {
              localStorage.setItem('cmc_user_profile', JSON.stringify(data.user));
            } catch (e) {}
            fetchNotes(token);
          }
        })
        .catch(() => {
          try {
            localStorage.removeItem('cmc_auth_token');
            localStorage.removeItem('cmc_user_profile');
          } catch (e) {}
          setUserProfile(null);
          setAuthToken(null);
          fetchNotes(null);
        });
    } else {
      fetchNotes(null);
    }
  }, []);

  // Sync authenticated user info to upload form defaults
  useEffect(() => {
    if (userProfile) {
      if (!uploadFullName) {
        setUploadFullName(userProfile.fullName || userProfile.name || '');
      }
      if (!uploadCollegeName || uploadCollegeName === 'Chittagong Medical College (CMC)') {
        setUploadCollegeName(userProfile.collegeName || userProfile.college || 'Chittagong Medical College (CMC)');
      }
    }
  }, [userProfile]);

  // Real authentication handlers
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
      }

      setAuthToken(data.token);
      setUserProfile(data.user);
      try {
        localStorage.setItem('cmc_auth_token', data.token);
        localStorage.setItem('cmc_user_profile', JSON.stringify(data.user));
      } catch (err) {}

      setAuthModal(null);
      fetchNotes(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred during authentication.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const collegeName = (form.elements.namedItem('collegeName') as HTMLInputElement).value.trim();
    const batch = (form.elements.namedItem('batch') as HTMLInputElement).value.trim();
    const roll = (form.elements.namedItem('roll') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!fullName || !email || !collegeName || !batch || !password) {
      setAuthError('Please fill in all required registration fields.');
      setAuthLoading(false);
      return;
    }

    if (password.length < 6) {
      setAuthError('Password must contain at least 6 characters.');
      setAuthLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, collegeName, batch, roll, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      setAuthToken(data.token);
      setUserProfile(data.user);
      try {
        localStorage.setItem('cmc_auth_token', data.token);
        localStorage.setItem('cmc_user_profile', JSON.stringify(data.user));
      } catch (err) {}

      setAuthModal(null);
      fetchNotes(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred during registration.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (authToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` }
        });
      } catch (e) {}
    }
    try {
      localStorage.removeItem('cmc_auth_token');
      localStorage.removeItem('cmc_user_profile');
    } catch (e) {}
    setUserProfile(null);
    setAuthToken(null);
    setUserMenuOpen(false);
    fetchNotes(null);
  };

  // Note Upload submission handler
  const handleNoteUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    setUploadSuccessMessage(null);

    if (!authToken) {
      setUploadError('Authentication required. Please sign in or register to submit study materials.');
      setAuthModal('signin');
      return;
    }

    if (!uploadFullName.trim()) {
      setUploadError('Contributor Full Name is required.');
      return;
    }
    if (!uploadCollegeName.trim()) {
      setUploadError('Medical College Name is required as a separate field.');
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadError('Note Title is required.');
      return;
    }
    if (!uploadSubject.trim()) {
      setUploadError('Please select a Medical Subject.');
      return;
    }
    if (!uploadFile) {
      setUploadError('Please select a note file (PDF or image) to upload.');
      return;
    }

    // Size limit verification: 25 MB
    if (uploadFile.size > 25 * 1024 * 1024) {
      setUploadError('The selected file exceeds the 25 MB size limit. Please choose a smaller file.');
      return;
    }

    // MIME type verification
    const allowedMime = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedMime.includes(uploadFile.type.toLowerCase())) {
      setUploadError('Unsupported file type. Only PDF documents and image files (PNG, JPG, WEBP) are accepted.');
      return;
    }

    try {
      setUploadSubmitting(true);
      setUploadProgress(25);

      const formData = new FormData();
      formData.append('fullName', uploadFullName.trim());
      formData.append('collegeName', uploadCollegeName.trim());
      formData.append('title', uploadTitle.trim());
      formData.append('subject', uploadSubject.trim());
      formData.append('topic', uploadTopic.trim() || 'General Revision');
      formData.append('description', uploadDescription.trim());
      formData.append('prog', uploadProg);
      formData.append('file', uploadFile);

      setUploadProgress(65);

      const res = await fetch('/api/notes/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: formData
      });

      setUploadProgress(95);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload note.');
      }

      setUploadProgress(100);
      setUploadSuccessMessage(data.message || 'Note successfully uploaded and saved to storage.');

      // Clear note-specific inputs
      setUploadTitle('');
      setUploadTopic('');
      setUploadDescription('');
      setUploadFile(null);

      // Re-fetch notes archive
      fetchNotes(authToken);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload study note.');
    } finally {
      setUploadSubmitting(false);
      setTimeout(() => setUploadProgress(null), 1200);
    }
  };

  // Admin note moderation action
  const handleModerateNote = async (noteId: string, status: 'approved' | 'rejected') => {
    if (!authToken || userProfile?.role !== 'admin') return;
    try {
      const res = await fetch(`/api/notes/${noteId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchNotes(authToken);
      }
    } catch (err) {
      console.error('Failed to moderate note:', err);
    }
  };

  // Delete note action (for author or admin)
  const handleDeleteUploadedNote = async (noteId: string) => {
    if (!authToken) return;
    if (!window.confirm('Are you sure you want to remove this study resource from the archive?')) return;
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        fetchNotes(authToken);
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

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
      {/* Top Utility Ribbon (Cyan / Educational Blue bar as in reference screenshot) */}
      <div className="ed-topbar">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-1.5">
          {/* Left: Academic Portals & Audience */}
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold tracking-tight">CMC MedArchive</span>
            <span className="opacity-40">|</span>
            <span className="hidden sm:inline opacity-90">Chittagong Medical College</span>
            <span className="opacity-40 hidden sm:inline">|</span>
            <span className="opacity-90">{prog} Medical Curriculum</span>
          </div>

          {/* Right: Curriculum Switcher, Telegram Icon & Action Triggers */}
          <div className="flex items-center gap-2.5">
            {/* Curriculum Switcher: MBBS | BDS */}
            <div className="inline-flex items-center rounded bg-white/20 p-0.5 text-xs font-bold">
              <button
                className={`px-2 py-0.5 rounded transition-all ${prog === 'MBBS' ? 'bg-white text-[#0082c9] shadow-xs' : 'text-white hover:bg-white/10'}`}
                onClick={() => handleProgramSwitch('MBBS')}
                title="Switch to MBBS Curriculum"
              >
                MBBS
              </button>
              <button
                className={`px-2 py-0.5 rounded transition-all ${prog === 'BDS' ? 'bg-white text-[#0082c9] shadow-xs' : 'text-white hover:bg-white/10'}`}
                onClick={() => handleProgramSwitch('BDS')}
                title="Switch to BDS Curriculum"
              >
                BDS
              </button>
            </div>

            {/* Recognisable Clickable Telegram Icon (NO visible text URL!) */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-icon-btn"
              title="Join us on Telegram"
              aria-label="Join us on Telegram"
            >
              <TelegramIcon className="w-4 h-4 text-white" />
            </a>

            {/* Quick Updates Pill (similar to News Subscription in screenshot) */}
            <button
              onClick={() => navigateTo('mcq')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-[#00a651] hover:bg-[#009146] text-white transition-colors"
            >
              <span>60 MCQ Papers</span>
            </button>

            {/* Sign In / User Status (similar to Login/Register in screenshot) */}
            {userProfile ? (
              <div className="relative">
                <button
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#005b94] hover:bg-[#004d7c] text-white text-xs font-bold transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  title="Account Profile & Settings"
                >
                  <div className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                    {(userProfile.fullName || userProfile.name || 'U')[0].toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{userProfile.fullName || userProfile.name}</span>
                  <ChevronDown size={11} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ) : (
              <button
                className="px-3 py-1 rounded bg-[#005b94] hover:bg-[#004d7c] text-white text-xs font-bold transition-colors flex items-center gap-1"
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setAuthModal('signin');
                }}
              >
                <LogIn size={12} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header — Clean White Bar with Prominent Unchanged Logo */}
      <header className="ed-header">
        <div className="wrap ed-bar">
          {/* Logo Prominently Positioned on Left — Original Logo Unchanged */}
          <button className="brand group" onClick={() => navigateTo('home')} aria-label="CMC MedArchive Home">
            <CmcLogo variant="full" size="md" />
          </button>

          {/* Navigation Links Arranged Neatly Across Header + Search Icon on Right */}
          <div className="flex items-center gap-3">
            <button
              id="menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className={`ed-nav ${mobileMenuOpen ? "open" : ""}`}>
              <button className={page === 'home' ? 'on' : ''} onClick={() => navigateTo('home')}>
                Homepage
              </button>
              <button className={page === 'archive' ? 'on' : ''} onClick={() => navigateTo('archive')}>
                Written (CQ)
              </button>
              <button className={page === 'mcq' ? 'on' : ''} onClick={() => navigateTo('mcq')}>
                MCQ Practice
              </button>
              <button className={page === 'teacher' ? 'on' : ''} onClick={() => navigateTo('teacher')}>
                Viva Bank
              </button>
              <button className={page === 'library' ? 'on' : ''} onClick={() => navigateTo('library')}>
                Student Library
              </button>
              <button className={page === 'upload' ? 'on' : ''} onClick={() => navigateTo('upload')}>
                Upload Notes
              </button>
              <button className={page === 'about' ? 'on' : ''} onClick={() => navigateTo('about')}>
                About
              </button>

              {/* Magnifying Glass Search Button on Right of Nav */}
              <button
                onClick={() => {
                  if (page !== 'home') navigateTo('home');
                  setTimeout(() => {
                    document.getElementById('home-search-input')?.focus();
                  }, 100);
                }}
                className="p-2 rounded-full text-slate-600 hover:text-sky-600 hover:bg-sky-50 dark:text-slate-300 transition-colors ml-1 hidden lg:inline-flex"
                title="Search Archive"
                aria-label="Search Archive"
              >
                <Search size={19} />
              </button>
            </nav>

              {/* Sign In / User Status */}
              {userProfile ? (
                <div className="relative ml-2 pl-2 border-l border-[var(--line)]">
                  <button
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--brand-sage)] text-[var(--brand-pine)] hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors text-xs font-bold"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-expanded={userMenuOpen}
                    title="Account Profile & Settings"
                  >
                    <div className="w-5 h-5 rounded-full bg-[var(--brand-pine)] text-white flex items-center justify-center text-[10px] font-bold">
                      {(userProfile.fullName || userProfile.name || 'U')[0].toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate">{userProfile.fullName || userProfile.name}</span>
                    <ChevronDown size={12} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Card */}
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-72 bg-[var(--card)] border border-[var(--line)] rounded-xl shadow-xl z-50 p-3.5 space-y-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="border-b border-[var(--line)] pb-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-[var(--ink)] truncate">
                            {userProfile.fullName || userProfile.name}
                          </span>
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${userProfile.role === 'admin' ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'}`}>
                            {userProfile.role === 'admin' ? 'Administrator' : 'Student'}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--mut)] truncate">{userProfile.email}</div>
                        <div className="text-xs text-[var(--ink-secondary)] mt-1 font-medium">
                          {userProfile.collegeName || userProfile.college} &bull; {userProfile.batch}
                          {userProfile.roll ? ` (Roll: ${userProfile.roll})` : ''}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center gap-2"
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigateTo('upload');
                          }}
                        >
                          <UploadCloud size={14} className="text-[var(--brand-teal)]" />
                          <span>Submit Study Notes</span>
                        </button>

                        <button
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--ink)] hover:bg-[var(--bg-subtle)] flex items-center gap-2"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setLibraryTab('my');
                            navigateTo('library');
                          }}
                        >
                          <FileText size={14} className="text-[var(--brand-pine)]" />
                          <span>My Submissions</span>
                        </button>

                        {userProfile.role === 'admin' && (
                          <button
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 flex items-center gap-2"
                            onClick={() => {
                              setUserMenuOpen(false);
                              setLibraryTab('pending');
                              navigateTo('library');
                            }}
                          >
                            <ShieldCheck size={14} className="text-amber-600" />
                            <span>Moderate Submissions</span>
                          </button>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[var(--line)]">
                        <button
                          className="w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center gap-1.5 transition-colors"
                          onClick={handleLogout}
                        >
                          <LogOut size={13} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="btn sm alt text-xs ml-2 flex items-center gap-1.5"
                  onClick={() => {
                    setAuthError(null);
                    setAuthSuccess(null);
                    setAuthModal('signin');
                  }}
                >
                  <LogIn size={13} />
                  <span>Sign In</span>
                </button>
              )}
          </div>
        </div>
      </header>

      {/* Main Body Router */}
      <main className="wrap flex-1 my-6" id="app">
        {/* ===================== HOME PAGE ===================== */}
        {page === 'home' && (
          <div className="space-y-10">
            {/* Spacious Main Hero Section — Inspired by Reference Screenshot */}
            <section className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 lg:p-14 shadow-sm">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                {/* Left Column: Prominent Institutional Emblem (Original CmcLogo Unchanged) */}
                <div className="shrink-0 flex items-center justify-center p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                  <CmcLogo variant="icon" size="xl" />
                </div>

                {/* Right Column: Hero Heading, Sub-heading, Intro, and Outlined Action Buttons */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Exact Main Heading Required */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 leading-tight">
                    Welcome to CMC MedArchive
                  </h1>

                  {/* Sub-heading in Sky Blue */}
                  <div className="text-lg sm:text-xl font-bold text-[#0082c9] dark:text-sky-400 mb-4 tracking-normal">
                    Chittagong Medical College (CMC)
                  </div>

                  {/* Concise, Elegant, Professional Introduction */}
                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
                    CMC MedArchive is the centralized academic repository and examination resource platform for students of Chittagong Medical College. Access authentic 1st Professional written questions (CQ) organized paper-wise by subject, practice 1,200 verified university MCQs with standard textbook citations, and collaborate through peer-reviewed study notes and viva checklists.
                  </p>

                  {/* Outlined Action Buttons (matching [ Website ] [ Brochure ] [ Enquiry ] in the screenshot) */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <button
                      onClick={() => navigateTo('archive')}
                      className="ed-btn-outline"
                    >
                      Written Questions (CQ)
                    </button>
                    <button
                      onClick={() => navigateTo('mcq')}
                      className="ed-btn-outline"
                    >
                      MCQ Examination Practice
                    </button>
                    <button
                      onClick={() => navigateTo('library')}
                      className="ed-btn-outline"
                    >
                      Student Library
                    </button>
                    <button
                      onClick={() => navigateTo('upload')}
                      className="ed-btn-outline"
                    >
                      Submit Resource
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Repository Quick Search Bar */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Quick Repository Search
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {ALL_QUESTIONS.filter(q => q.prog === prog).length} Written Questions &bull; {MCQ_VERIFICATION_STATS.totalQuestions} Verified MCQs
                </span>
              </div>

              <form
                className="sb max-w-3xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigateTo('archive');
                }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    id="home-search-input"
                    aria-label="Search questions"
                    placeholder="Search past questions, topics, or physiological mechanisms (e.g. brachial plexus, GFR, glycolysis)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-3 text-sm rounded-lg"
                  />
                </div>
                <button type="submit" className="btn font-semibold">
                  Search Archive
                </button>
              </form>

              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">High-Yield Topics:</span>
                {["Brachial plexus", "GFR & filtration fraction", "Cardiac cycle", "Erb's palsy", "Glycolysis", "Pleural effusion", "Somatomedin"].map(t => (
                  <button
                    key={t}
                    type="button"
                    className="text-sky-600 hover:text-sky-800 dark:text-sky-400 hover:underline cursor-pointer transition-colors"
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

            {/* Curricular Subjects & Question Banks (Anatomy, Physiology, Biochemistry) */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                    1st Professional Curricular Subjects
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Complete curriculum structured paper-wise for Chittagong Medical University (CMU) and University of Chittagong (CU)
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Paper-I &bull; Paper-II</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Anatomy Card */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-xs hover:border-sky-400 dark:hover:border-sky-500 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Subject 01
                      </span>
                      <span className="badge ok text-[10px]">
                        145 Verified MCQs
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Anatomy
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Gross Anatomy, General Histology, Medical Embryology, Neuroanatomy, Head &amp; Neck, Thorax, Abdomen, Pelvis, and Limbs.
                    </p>

                    <div className="text-xs font-semibold text-slate-500 mb-4">
                      {ALL_QUESTIONS.filter(q => q.prog === prog && q.subject === 'Anatomy').length} Written Questions archived
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, subject: 'Anatomy', paper: 'Paper-I', section: '' }));
                          navigateTo('archive');
                        }}
                      >
                        Paper-I (CQ)
                      </button>
                      <button
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, subject: 'Anatomy', paper: 'Paper-II', section: '' }));
                          navigateTo('archive');
                        }}
                      >
                        Paper-II (CQ)
                      </button>
                    </div>

                    <button
                      className="w-full text-center py-2 text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 hover:underline flex items-center justify-center gap-1"
                      onClick={() => {
                        setMcqSelectedSubject('Anatomy');
                        setMcqSelectedPaper(null);
                        setMcqSelectedYear(null);
                        navigateTo('mcq');
                      }}
                    >
                      <span>Practice Anatomy MCQs &rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Physiology Card */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-xs hover:border-sky-400 dark:hover:border-sky-500 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Subject 02
                      </span>
                      <span className="badge ok text-[10px]">
                        678 Verified MCQs
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Physiology
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      General Physiology, Nerve-Muscle, Blood &amp; Immunity, Cardiovascular, Respiration, Renal &amp; Body Fluids, Endocrine, and CNS.
                    </p>

                    <div className="text-xs font-semibold text-slate-500 mb-4">
                      {ALL_QUESTIONS.filter(q => q.prog === prog && q.subject === 'Physiology').length} Written Questions archived
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, subject: 'Physiology', paper: 'Paper-I', section: '' }));
                          navigateTo('archive');
                        }}
                      >
                        Paper-I (CQ)
                      </button>
                      <button
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, subject: 'Physiology', paper: 'Paper-II', section: '' }));
                          navigateTo('archive');
                        }}
                      >
                        Paper-II (CQ)
                      </button>
                    </div>

                    <button
                      className="w-full text-center py-2 text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 hover:underline flex items-center justify-center gap-1"
                      onClick={() => {
                        setMcqSelectedSubject('Physiology');
                        setMcqSelectedPaper(null);
                        setMcqSelectedYear(null);
                        navigateTo('mcq');
                      }}
                    >
                      <span>Practice Physiology MCQs &rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Biochemistry Card */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-xs hover:border-sky-400 dark:hover:border-sky-500 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Subject 03
                      </span>
                      <span className="badge ok text-[10px]">
                        377 Verified MCQs
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Biochemistry
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Biomolecules &amp; Solutions, Enzymes &amp; Vitamins, Intermediary Metabolism, Bioenergetics, Molecular Biology, and Clinical Chemistry.
                    </p>

                    <div className="text-xs font-semibold text-slate-500 mb-4">
                      {ALL_QUESTIONS.filter(q => q.prog === prog && q.subject === 'Biochemistry').length} Written Questions archived
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, subject: 'Biochemistry', paper: 'Paper-I', section: '' }));
                          navigateTo('archive');
                        }}
                      >
                        Paper-I (CQ)
                      </button>
                      <button
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, subject: 'Biochemistry', paper: 'Paper-II', section: '' }));
                          navigateTo('archive');
                        }}
                      >
                        Paper-II (CQ)
                      </button>
                    </div>

                    <button
                      className="w-full text-center py-2 text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 hover:underline flex items-center justify-center gap-1"
                      onClick={() => {
                        setMcqSelectedSubject('Biochemistry');
                        setMcqSelectedPaper(null);
                        setMcqSelectedYear(null);
                        navigateTo('mcq');
                      }}
                    >
                      <span>Practice Biochemistry MCQs &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Examination Suites & Student Knowledge Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Official University MCQ Practice Suite */}
              <div className="p-6 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/40 dark:bg-sky-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    Official Board Practice
                  </span>
                  <span className="badge ok text-[10px]">
                    {MCQ_VERIFICATION_STATS.papersCount} Authentic Papers
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                    MCQ Examination Practice
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                    1,200 authentic questions extracted from official Chittagong Medical University (CMU) examination scripts. Includes both True/False (MFT) and Single Best Answer (SBA) items with verified medical references (Snell, Gray&rsquo;s, Guyton &amp; Hall, Harper&rsquo;s).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Total Authentic MCQs:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{MCQ_VERIFICATION_STATS.totalQuestions} Questions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Commercial Errors:</span>
                    <span className="font-semibold text-amber-700 dark:text-amber-400">Explicitly Flagged</span>
                  </div>
                </div>

                <button
                  className="btn w-full text-xs font-semibold py-2.5"
                  onClick={() => navigateTo('mcq')}
                >
                  Launch MCQ Examination Practice &rarr;
                </button>
              </div>

              {/* Student Peer Knowledge Base */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Peer Knowledge Base
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    Student Notes
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                    Student Study Library
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                    High-yield revision notes, metabolic pathway summaries, and anatomical diagrams submitted by medical students with full college and batch attribution.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    className="btn alt flex-1 text-xs py-2"
                    onClick={() => navigateTo('library')}
                  >
                    Browse Library
                  </button>
                  <button
                    className="btn flex-1 text-xs py-2"
                    onClick={() => navigateTo('upload')}
                  >
                    Submit Notes &rarr;
                  </button>
                </div>
              </div>

              {/* Oral Viva & Card-Table Preparation */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Oral Examination
                  </span>
                  <span className="badge demo text-[10px]">In Dev</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                    Oral Viva Bank
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                    Teacher-wise viva questions, table card checklists, and examiner favorites for 1st Professional examinations.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    className="btn alt w-full text-xs py-2"
                    onClick={() => navigateTo('teacher')}
                  >
                    View Viva Bank Status &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Colophon & Founder Mission */}
            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    Academic Colophon
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">
                    About CMC MedArchive
                  </h3>
                </div>
                <button
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 hover:underline self-start sm:self-auto"
                  onClick={() => navigateTo('about')}
                >
                  Read Full Mission Statement &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <b className="text-slate-900 dark:text-white block mb-1">Student-Run Academic Initiative</b>
                  Created by Sifat Islam (CMC-67) to ensure every student at Chittagong Medical College has structured, permanent, and free access to curriculum examination records.
                </div>
                <div>
                  <b className="text-slate-900 dark:text-white block mb-1">Verified Medical Textbooks</b>
                  All question items and answers are systematically audited against standard medical authorities including Snell, Gray&rsquo;s Anatomy, Guyton &amp; Hall, and Harper&rsquo;s Biochemistry.
                </div>
                <div>
                  <b className="text-slate-900 dark:text-white block mb-1">Continuous Curricular Expansion</b>
                  The archive continues to integrate new CMU examination sessions, student-contributed summaries, and structured viva resources as they are verified.
                </div>
              </div>
            </div>
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
                          <div key={q.id} className="item qa hover:border-[var(--brand-pine)] transition-all">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                              <div className="flex flex-wrap items-center gap-1.5 text-[var(--mut)]">
                                <span className="font-bold text-[var(--ink)]">{q.subject}</span>
                                <span aria-hidden="true">&bull;</span>
                                <span>{q.paper}</span>
                                {q.group && (
                                  <>
                                    <span aria-hidden="true">&bull;</span>
                                    <span>{q.group}</span>
                                  </>
                                )}
                                {q.section && (
                                  <>
                                    <span aria-hidden="true">&bull;</span>
                                    <span>{q.section}</span>
                                  </>
                                )}
                                {q.year && (
                                  <>
                                    <span aria-hidden="true">&bull;</span>
                                    <span>{q.year}</span>
                                  </>
                                )}
                                {q.board && (
                                  <>
                                    <span aria-hidden="true">&bull;</span>
                                    <span>{q.board}</span>
                                  </>
                                )}
                              </div>

                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                                q.status === 'verified'
                                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300'
                              }`}>
                                {q.status === 'verified' ? '✓ Verified' : 'Needs Review'}
                              </span>
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
                        {sub.name === 'Anatomy'
                          ? "Chittagong Medical University 1st Professional MBBS. Covers Gross Anatomy, Histology, Embryology, and Neuroanatomy with verified textbook solutions."
                          : sub.name === 'Biochemistry'
                          ? "Chittagong Medical University 1st Professional MBBS. Covers Biomolecules, Metabolism, Clinical Biochemistry, and Genetics with verified textbook solutions."
                          : sub.name === 'Physiology'
                          ? "Chittagong Medical University 1st Professional MBBS. Covers General Physiology, Nerve-Muscle, Blood, CVS, Respiration, Renal, Endocrine & Neurophysiology."
                          : "Chittagong Medical University 1st Professional MBBS Examination. Includes Paper-I and Paper-II with verified textbook solutions."}
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
                </div>

                <div className="p-4 bg-[var(--card)] border border-[var(--line)] rounded-lg text-xs text-[var(--mut)] flex items-start gap-2.5">
                  <ShieldAlert size={16} className="text-[var(--t)] shrink-0 mt-0.5" />
                  <div>
                    <b>Authentic Chittagong Medical University Question Bank:</b> All question items are extracted verbatim from official CMU 1st Professional MBBS examination papers. Answers strictly reflect standard textbook citations (Snell, Gray's Anatomy, Moore Clinically Oriented Anatomy, Langman's Medical Embryology, BD Chaurasia, Junqueira's Histology, Harper's Illustrated Biochemistry, Lippincott Illustrated Reviews: Biochemistry, Satyanarayana, Vasudevan, Guyton and Hall Textbook of Medical Physiology, Ganong's Review of Medical Physiology).
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
                          {mcqSelectedSubject?.toLowerCase() === 'biochemistry'
                            ? paper.name === 'Paper-I'
                              ? 'Biophysics, Solutions, Acid-Base Balance, Carbohydrate, Protein & Lipid Chemistry, Enzymes, Vitamins, and Digestion & Absorption.'
                              : 'Metabolism of Carbohydrates, Lipids, Amino acids, Bioenergetics, Molecular Biology, Genetics, Endocrinology, and Organ Function Tests.'
                            : mcqSelectedSubject?.toLowerCase() === 'physiology'
                            ? paper.name === 'Paper-I'
                              ? 'General Physiology, Nerve-Muscle Physiology, Blood & Immunity, Cardiovascular System (CVS), Respiratory System, and Gastrointestinal Tract (GIT).'
                              : 'Renal Physiology & Body Fluids, Endocrine System, Reproductive Physiology, Central Nervous System (CNS), Special Senses, and Autonomic Nervous System.'
                            : paper.name === 'Paper-I'
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
          const allLibraryItems = serverNotes.length > 0 ? serverNotes : INITIAL_DEMO_RESOURCES;
          
          // Tab-level filtering
          let tabFilteredItems = allLibraryItems;
          if (libraryTab === 'my') {
            tabFilteredItems = allLibraryItems.filter(item => 
              userProfile && (item.uploadedByUserId === userProfile.id || item.uploadedByEmail === userProfile.email)
            );
          } else if (libraryTab === 'pending') {
            tabFilteredItems = allLibraryItems.filter(item => item.status === 'pending');
          } else {
            // 'all' tab shows verified approved items plus student's own items
            tabFilteredItems = allLibraryItems.filter(item => 
              item.status === 'approved' || 
              (userProfile && (item.uploadedByUserId === userProfile.id || item.uploadedByEmail === userProfile.email))
            );
          }

          const filteredLibrary = tabFilteredItems.filter(item => {
            if (librarySubject !== 'all' && item.subject.toLowerCase() !== librarySubject.toLowerCase()) return false;
            if (libraryType !== 'all' && item.kind.toLowerCase() !== libraryType.toLowerCase()) return false;
            if (librarySearch.trim()) {
              const q = librarySearch.toLowerCase().trim();
              const fullText = `${item.title} ${item.subject} ${item.topic || ''} ${item.description || item.desc || ''} ${item.fullName || item.uploader || ''} ${item.collegeName || item.college || ''}`.toLowerCase();
              if (!fullText.includes(q)) return false;
            }
            return true;
          });

          const hasActiveFilters = librarySearch.trim() !== '' || librarySubject !== 'all' || libraryType !== 'all';
          const availableSubjects = ['all', 'Anatomy', 'Physiology', 'Biochemistry'];
          const availableTypes = ['all', 'Notes', 'Diagram', 'Summary'];

          // Count stats
          const myUploadsCount = userProfile ? allLibraryItems.filter(item => item.uploadedByUserId === userProfile.id || item.uploadedByEmail === userProfile.email).length : 0;
          const pendingCount = userProfile?.role === 'admin' ? allLibraryItems.filter(item => item.status === 'pending').length : 0;

          return (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">Student Library &amp; Academic Notes</h2>
                  <p className="mut text-sm">
                    Verified medical notes, mnemonics, anatomical diagrams, and high-yield revision summaries contributed by medical students.
                  </p>
                </div>
                <button className="btn sm self-start sm:self-auto shrink-0 flex items-center gap-1.5" onClick={() => navigateTo('upload')}>
                  <UploadCloud size={14} />
                  <span>Submit Study Resource</span>
                </button>
              </div>

              {/* View Tabs: All Resources / My Submissions / Moderation Queue */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-2">
                <button
                  onClick={() => setLibraryTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    libraryTab === 'all'
                      ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                      : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  All Verified Notes ({allLibraryItems.filter(n => n.status === 'approved').length})
                </button>

                {userProfile && (
                  <button
                    onClick={() => setLibraryTab('my')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      libraryTab === 'my'
                        ? 'bg-[var(--brand-pine)] text-white shadow-xs'
                        : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <User size={13} />
                    <span>My Submissions ({myUploadsCount})</span>
                  </button>
                )}

                {userProfile?.role === 'admin' && (
                  <button
                    onClick={() => setLibraryTab('pending')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      libraryTab === 'pending'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                    }`}
                  >
                    <ShieldCheck size={13} />
                    <span>Pending Moderation ({pendingCount})</span>
                  </button>
                )}
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
                    placeholder="Search notes by topic, title, contributor name, or medical college..."
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
                    Showing <b>{filteredLibrary.length}</b> of <b>{tabFilteredItems.length}</b> learning resources
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
                  <h3 className="text-lg font-bold text-[var(--ink)]">
                    {libraryTab === 'my' 
                      ? "You haven't submitted any study notes yet" 
                      : libraryTab === 'pending'
                        ? "No pending notes currently awaiting moderation"
                        : "No study materials match your filters"}
                  </h3>
                  <p className="mut text-sm max-w-md mx-auto mt-1 mb-5">
                    {libraryTab === 'my'
                      ? "Share your medical revision notes, summaries, or anatomical diagrams to build your academic profile."
                      : "Try adjusting your search terms or clearing one of the filters to view all available resources."}
                  </p>
                  {libraryTab === 'my' ? (
                    <button className="btn sm" onClick={() => navigateTo('upload')}>
                      Submit Your First Note &rarr;
                    </button>
                  ) : (
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
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLibrary.map(res => {
                    const isOwner = userProfile && (res.uploadedByUserId === userProfile.id || res.uploadedByEmail === userProfile.email);
                    const isAdmin = userProfile?.role === 'admin';
                    const displayContributor = res.fullName || res.uploader || 'CMC Student';
                    const displayCollege = res.collegeName || res.college || 'Chittagong Medical College (CMC)';
                    const displayDesc = res.description || res.desc;

                    return (
                      <div key={res.id} className="item flex flex-col justify-between hover:border-[var(--brand-pine)] transition-all shadow-xs">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                            <div className="flex items-center gap-1.5 text-[var(--mut)]">
                              <span className="font-bold text-[var(--brand-pine)]">{res.subject}</span>
                              <span aria-hidden="true">&bull;</span>
                              <span className="font-semibold text-[var(--ink)]">{res.kind || 'Notes'}</span>
                              <span aria-hidden="true">&bull;</span>
                              <span>{res.topic}</span>
                            </div>
                            {res.prog && (
                              <span className="text-[11px] font-semibold text-[var(--mut)]">
                                {res.prog} Curriculum
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-base text-[var(--ink)] mb-1 leading-snug">
                            {res.title}
                          </h3>

                          {displayDesc && (
                            <p className="text-sm text-[var(--mut)] mb-3 leading-relaxed">
                              {displayDesc}
                            </p>
                          )}

                          {/* Dedicated Contributor & College Details */}
                          <div className="p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] mb-3 text-xs space-y-1">
                            <div className="flex items-center gap-1.5 text-[var(--ink)] font-semibold">
                              <User size={13} className="text-[var(--brand-pine)] shrink-0" />
                              <span className="text-[var(--mut)] font-normal">Contributor:</span>
                              <span>{displayContributor}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[var(--ink-secondary)]">
                              <GraduationCap size={13} className="text-[var(--brand-teal)] shrink-0" />
                              <span className="text-[var(--mut)]">College:</span>
                              <span className="font-medium">{displayCollege}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          {/* Status and Action Ribbon */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--line)] text-xs">
                            <div className="flex items-center gap-2">
                              {/* Status Badge */}
                              {res.status === 'approved' ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                                  <CheckCircle2 size={12} className="text-emerald-600" />
                                  <span>Verified Resource</span>
                                </span>
                              ) : res.status === 'rejected' ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 px-2 py-0.5 rounded">
                                  <AlertCircle size={12} className="text-rose-600" />
                                  <span>Revision Requested</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 px-2 py-0.5 rounded">
                                  <Clock size={12} className="text-amber-600" />
                                  <span>Pending Review</span>
                                </span>
                              )}

                              {res.fileSize ? (
                                <span className="text-[11px] text-[var(--mut)]">
                                  ({(res.fileSize / 1024 / 1024).toFixed(1)} MB)
                                </span>
                              ) : null}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Document Viewer Link */}
                              {res.fileUrl && (
                                <a
                                  href={res.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn sm alt !px-2.5 !py-1 text-xs flex items-center gap-1 no-underline text-[var(--brand-pine)] hover:bg-[var(--brand-sage)]"
                                  title="Open note in browser"
                                >
                                  <ExternalLink size={12} />
                                  <span>Open File</span>
                                </a>
                              )}

                              {/* Admin Moderation Actions */}
                              {isAdmin && res.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleModerateNote(res.id, 'approved')}
                                    className="btn sm good !px-2 !py-0.5 text-[11px]"
                                    title="Approve note for public library"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleModerateNote(res.id, 'rejected')}
                                    className="btn sm alt !px-2 !py-0.5 text-[11px] text-rose-600"
                                    title="Reject note"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                              {/* Delete button (owner or admin) */}
                              {(isOwner || isAdmin) && (
                                <button
                                  onClick={() => handleDeleteUploadedNote(res.id)}
                                  className="p-1 rounded text-[var(--mut)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                  title="Delete note"
                                  aria-label="Delete note"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* ===================== NOTE UPLOAD PAGE ===================== */}
        {page === 'upload' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud size={24} className="text-[var(--brand-pine)]" />
                <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] m-0">Submit Study Notes</h2>
              </div>
              <p className="mut text-sm">
                Share revision notes, summary sheets, and anatomical diagrams with medical students. Submissions are verified against standard curriculum guidelines.
              </p>
            </div>

            {/* Authentication Gateway Check */}
            {!userProfile ? (
              <div className="card p-6 border-amber-500/30 bg-amber-500/5 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert size={22} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-[var(--ink)] m-0">
                      Sign In Required to Submit Study Notes
                    </h3>
                    <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                      To ensure academic accountability and prevent incorrect medical notes from entering the library, all contributors must be signed in with a student or faculty account. Your Full Name and Medical College Name will be stored and credited with your contribution.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    className="btn sm flex items-center gap-1.5"
                    onClick={() => {
                      setAuthError(null);
                      setAuthSuccess(null);
                      setAuthModal('signin');
                    }}
                  >
                    <LogIn size={14} />
                    <span>Sign In to Continue</span>
                  </button>
                  <button
                    className="btn sm alt flex items-center gap-1.5"
                    onClick={() => {
                      setAuthError(null);
                      setAuthSuccess(null);
                      setAuthModal('signup');
                    }}
                  >
                    <UserPlus size={14} />
                    <span>Register New Account</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="card p-6 space-y-5 bg-[var(--card)] border-[var(--line)] shadow-sm"
                onSubmit={handleNoteUploadSubmit}
              >
                {/* Contributor Profile Banner */}
                <div className="p-3.5 rounded-lg bg-[var(--brand-sage)] border border-[var(--brand-pine)]/20 text-xs space-y-1">
                  <div className="font-bold text-[var(--brand-pine)] flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    <span>Authenticated Contributor Profile</span>
                  </div>
                  <div className="text-[var(--ink-secondary)]">
                    Logged in as <b>{userProfile.email}</b> ({userProfile.role === 'admin' ? 'Administrator' : 'Verified Student'}). You can review or customize your displayed contributor credentials below.
                  </div>
                </div>

                {/* Success Notification */}
                {uploadSuccessMessage && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 size={16} />
                      <span>{uploadSuccessMessage}</span>
                    </div>
                    <p className="leading-relaxed">
                      Your note has been saved to disk storage. You can view it under the "My Submissions" tab in the Student Library.
                    </p>
                    <button
                      type="button"
                      className="btn sm good mt-1"
                      onClick={() => {
                        setLibraryTab('my');
                        navigateTo('library');
                      }}
                    >
                      View in Student Library &rarr;
                    </button>
                  </div>
                )}

                {/* Error Notification */}
                {uploadError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                    <div>{uploadError}</div>
                  </div>
                )}

                {/* Field 1 & 2: Dedicated Full Name and Medical College Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="fullName"
                      value={uploadFullName}
                      onChange={(e) => setUploadFullName(e.target.value)}
                      placeholder="e.g. Sifat Islam"
                      required
                      className="w-full text-sm"
                    />
                    <span className="text-[11px] text-[var(--mut)]">Contributor name credited on the note.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Medical College Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="collegeName"
                      value={uploadCollegeName}
                      onChange={(e) => setUploadCollegeName(e.target.value)}
                      placeholder="e.g. Chittagong Medical College (CMC)"
                      required
                      className="w-full text-sm"
                    />
                    <span className="text-[11px] text-[var(--mut)]">Independent institution field.</span>
                  </div>
                </div>

                {/* Field 3: Note Title */}
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Note Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Autonomic Pharmacology &amp; Receptor Classification Sheet"
                    required
                    className="w-full text-sm"
                  />
                </div>

                {/* Field 4 & 5: Subject and Curriculum Stream */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Medical Subject <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={uploadSubject}
                      onChange={(e) => setUploadSubject(e.target.value)}
                      required
                      className="w-full text-sm"
                    >
                      <option value="">Select Medical Subject</option>
                      {availableSubjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Curriculum
                    </label>
                    <select
                      name="prog"
                      value={uploadProg}
                      onChange={(e) => setUploadProg(e.target.value as 'MBBS' | 'BDS')}
                      className="w-full text-sm"
                    >
                      <option value="MBBS">MBBS</option>
                      <option value="BDS">BDS</option>
                    </select>
                  </div>
                </div>

                {/* Topic / System */}
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Topic / Anatomical Region / System
                  </label>
                  <input
                    name="topic"
                    value={uploadTopic}
                    onChange={(e) => setUploadTopic(e.target.value)}
                    placeholder="e.g. Brachial Plexus / Renal Physiology / Carbohydrate Metabolism"
                    className="w-full text-sm"
                  />
                </div>

                {/* Field 6: Note Description */}
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Note Description &amp; Key Takeaways <span className="text-[var(--mut)] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="description"
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    rows={3}
                    placeholder="Brief summary of what this document covers, high-yield mnemonics, or exam tips..."
                    className="w-full text-sm"
                  />
                </div>

                {/* Field 7: File Upload Area */}
                <div>
                  <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                    Select Note File <span className="text-rose-500">*</span>
                  </label>
                  
                  <div className="border-2 border-dashed border-[var(--line)] hover:border-[var(--brand-pine)] rounded-xl p-5 text-center transition-colors bg-[var(--bg-subtle)]">
                    <input
                      type="file"
                      id="file-input"
                      accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                          if (file.size > 25 * 1024 * 1024) {
                            setUploadError('File exceeds 25 MB size limit.');
                            setUploadFile(null);
                            return;
                          }
                          setUploadError(null);
                          setUploadFile(file);
                        }
                      }}
                      className="hidden"
                    />

                    {!uploadFile ? (
                      <label htmlFor="file-input" className="cursor-pointer block space-y-2">
                        <FileUp size={36} className="mx-auto text-[var(--brand-pine)] opacity-80" />
                        <div className="text-sm font-bold text-[var(--ink)]">
                          Click to select a PDF document or image file
                        </div>
                        <div className="text-xs text-[var(--mut)]">
                          Supported formats: PDF, PNG, JPG, WEBP (Maximum size: 25 MB)
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-[var(--card)] rounded-lg border border-[var(--line)]">
                        <div className="flex items-center gap-2.5 text-left truncate">
                          <FileText size={20} className="text-[var(--brand-pine)] shrink-0" />
                          <div className="truncate">
                            <div className="text-xs font-bold text-[var(--ink)] truncate">
                              {uploadFile.name}
                            </div>
                            <div className="text-[11px] text-[var(--mut)]">
                              {(uploadFile.size / 1024 / 1024).toFixed(2)} MB &bull; {uploadFile.type || 'Document'}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setUploadFile(null)}
                          className="p-1 rounded text-[var(--mut)] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Change file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {uploadProgress !== null && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-[var(--mut)]">
                      <span>Uploading to server storage...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-[var(--line)] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[var(--brand-pine)] h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Submission Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={uploadSubmitting}
                    className="btn w-full flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    {uploadSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Storing Note &amp; Metadata...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={16} />
                        <span>
                          {userProfile.role === 'admin' ? 'Publish to Student Library' : 'Submit Note for Academic Verification'}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[var(--mut)] mt-2">
                    {userProfile.role === 'admin'
                      ? 'Administrator submission: your document will be published immediately.'
                      : 'Submitted notes are archived securely and reviewed for academic accuracy before public display.'}
                  </p>
                </div>
              </form>
            )}
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
                    <blockquote className="editorial-quote">
                      &ldquo;I am Sifat Islam, a medical student at Chittagong Medical College. I created CMC MedArchive with a simple goal: to make academic resources easier for medical students to find, access, and organize in one place.&rdquo;
                    </blockquote>

                    <p>
                      &ldquo;Medical students often need to search through scattered question papers, study materials, and revision resources while preparing for professional examinations. CMC MedArchive aims to reduce that difficulty by bringing these resources together in a structured, searchable, and student-friendly platform.&rdquo;
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

                {/* Connect and Contact Area */}
                <div className="card bg-[var(--card)] shadow-xs">
                  <h3 className="text-base font-bold text-[var(--ink)] mb-3">Academic Correspondence &amp; Community</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--card-subtle)] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Student Discussion Community</div>
                        <div className="text-xs text-[var(--mut)]">Connect on Telegram</div>
                      </div>
                      <a
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="telegram-icon-btn shrink-0"
                        title="Join us on Telegram"
                        aria-label="Join us on Telegram"
                      >
                        <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
                      </a>
                    </div>

                    <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--card-subtle)] flex items-center gap-3">
                      <div className="p-2 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Student Inquiries &amp; Contributions</div>
                        <div className="text-xs text-[var(--mut)]">Editorial &amp; Academic Desk &bull; CMC-67</div>
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
          onClick={() => {
            setAuthModal(null);
            setAuthError(null);
            setAuthSuccess(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <div className="modal-content max-w-md mx-auto my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2.5">
                <CmcLogo variant="icon" size="sm" />
                <h3 id="auth-modal-title" className="text-base font-bold m-0 text-slate-900 dark:text-white">
                  {authModal === 'signin' ? 'Sign In to CMC MedArchive' : 'Student Account Registration'}
                </h3>
              </div>
              <button
                className="btn sm alt !px-2.5 !py-1 text-xs"
                onClick={() => {
                  setAuthModal(null);
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="grid grid-cols-2 border-b border-[var(--line)] bg-[var(--bg-subtle)] text-xs font-bold">
              <button
                type="button"
                className={`py-2.5 text-center transition-colors ${
                  authModal === 'signin'
                    ? 'bg-[var(--card)] text-[var(--brand-pine)] border-b-2 border-[var(--brand-pine)]'
                    : 'text-[var(--mut)] hover:text-[var(--ink)]'
                }`}
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setAuthModal('signin');
                }}
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
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setAuthModal('signup');
                }}
              >
                Register Account
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[75vh] bg-[var(--card)] space-y-4">
              {/* Error Message Box */}
              {authError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>{authError}</div>
                </div>
              )}

              {/* Success Message Box */}
              {authSuccess && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>{authSuccess}</div>
                </div>
              )}

              {/* Academic Account Notice */}
              <div className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--line)] text-xs text-[var(--ink)] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400">
                  <ShieldCheck size={14} />
                  <span>Curriculum Verification Access</span>
                </div>
                <div className="leading-relaxed text-[var(--ink-secondary)] text-[11px]">
                  Sign in with your verified medical student account to submit study notes and access peer-reviewed revision resources.
                </div>
              </div>

              {authModal === 'signin' ? (
                <form className="space-y-3.5" onSubmit={handleLogin}>
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="w-full text-sm"
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full text-sm"
                      autoComplete="current-password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn w-full mt-2 flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <LogIn size={15} />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-xs text-[var(--mut)] pt-2">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      className="underline text-[var(--t)] font-bold hover:text-[var(--brand-pine)]"
                      onClick={() => {
                        setAuthError(null);
                        setAuthModal('signup');
                      }}
                    >
                      Register here
                    </button>
                  </div>
                </form>
              ) : (
                <form className="space-y-3.5" onSubmit={handleRegister}>
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="fullName"
                      placeholder="e.g. Sifat Islam"
                      required
                      className="w-full text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Medical College Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="collegeName"
                      defaultValue="Chittagong Medical College (CMC)"
                      required
                      className="w-full text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="w-full text-sm"
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                        Batch / Session <span className="text-rose-500">*</span>
                      </label>
                      <input
                        name="batch"
                        placeholder="e.g. CMC-67"
                        required
                        className="w-full text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                        Roll Number
                      </label>
                      <input
                        name="roll"
                        placeholder="e.g. 102"
                        className="w-full text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Create Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      required
                      className="w-full text-sm"
                      autoComplete="new-password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn w-full mt-2 flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={15} />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-xs text-[var(--mut)] pt-2">
                    Already registered?{' '}
                    <button
                      type="button"
                      className="underline text-[var(--t)] font-bold hover:text-[var(--brand-pine)]"
                      onClick={() => {
                        setAuthError(null);
                        setAuthModal('signin');
                      }}
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

            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[var(--mut)]">
              <div className="flex items-center gap-2">
                <span>Community:</span>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegram-icon-btn"
                  title="Join us on Telegram"
                  aria-label="Join us on Telegram"
                >
                  <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
                </a>
              </div>
              <div className="text-[11px] text-[var(--mut)]">
                Built for medical students &bull; Chittagong Medical College
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
