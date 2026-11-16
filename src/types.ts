export type UserRole = 'student' | 'contributor' | 'admin';

export type ProfessionalExamId =
  | 'First Professional'
  | 'Second Professional'
  | 'Third Professional'
  | 'Fourth Professional';

export type SubjectClassificationRole =
  | 'Main Professional Examination Subject'
  | 'Phase Teaching / Formative Subject';

export interface ProfExamConfig {
  id: ProfessionalExamId;
  title: string;
  shortLabel: string;
  subtitle: string;
  subjects: string[];
  papersBySubject: Record<string, string[]>;
  alliedDisciplinesBySubject?: Record<string, string[]>;
  phaseFormativeSubjects?: string[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  batch: string;
  roll?: string;
  role: UserRole;
  preferredProf?: ProfessionalExamId;
  createdAt?: string;
  name?: string;
  college?: string;
}

export interface UploadedItem {
  id: string;
  fullName: string;
  collegeName: string;
  title: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
  classificationRole?: SubjectClassificationRole;
  subject: string;
  paper?: string;
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
  uploader?: string;
  college?: string;
  desc?: string;
  date?: string;
  perm?: string;
  demo?: boolean;
}

export type SubmissionCategory = 'Card' | 'Term' | 'MCQ';
export type SubmissionMethod = 'pdf' | 'images' | 'drive_link';
export type SubmissionStatus =
  | 'Pending'
  | 'Under Review'
  | 'Needs Correction'
  | 'Approved'
  | 'Rejected'
  | 'Published';

export interface SubmissionFileRecord {
  id: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  url: string;
}

export interface ExtractedMcqDraft {
  id: string;
  type: 'TF' | 'SBA';
  stem: string;
  items?: { label: string; text: string; ans: boolean | null }[];
  opts?: string[];
  correctIndex?: number | null;
  answerKeyPresent: boolean;
  explanation?: string;
  verifiedByAdmin?: boolean;
}

export interface QuestionSubmission {
  id: string;
  trackingKey?: string;
  category: SubmissionCategory;
  method: SubmissionMethod;
  collegeName: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
  classificationRole?: SubjectClassificationRole;
  examName: string;
  subject: string;
  paper: string;
  chapter: string;
  year: string;
  session: string;
  collectionType: string;
  description: string;
  contributorName: string;
  contributorBatch: string;
  contributorEmail?: string;
  userId?: string;
  files: SubmissionFileRecord[];
  driveLinks: string[];
  driveVerified?: boolean;
  driveVerificationNote?: string;
  status: SubmissionStatus;
  adminComment?: string;
  extractedMcqs?: ExtractedMcqDraft[];
  ocrRawText?: string;
  ocrStatusNote?: string;
  publishedPaperId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublishedPaper {
  id: string;
  submissionId: string;
  category: SubmissionCategory;
  collegeName: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
  classificationRole?: SubjectClassificationRole;
  examName: string;
  subject: string;
  paper: string;
  chapter: string;
  year: number | null;
  session: string;
  collectionType: string;
  description: string;
  contributorName: string;
  contributorBatch: string;
  method: SubmissionMethod;
  files: SubmissionFileRecord[];
  driveLinks: string[];
  publishedAt: string;
}

export interface PublishedMcqQuestion {
  id: string;
  submissionId: string;
  paperId: string;
  collegeName: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
  classificationRole?: SubjectClassificationRole;
  examName: string;
  subject: string;
  paper: 'Paper-I' | 'Paper-II' | string;
  chapter: string;
  year: number;
  session: string;
  type: 'TF' | 'SBA';
  stem: string;
  items?: { label: string; text: string; ans: boolean }[];
  opts?: string[];
  correctIndex?: number;
  explanation?: string;
  verificationStatus: 'Verified' | 'Provisional' | 'Needs Review';
  publishedAt: string;
}

export interface ContributorRecord {
  id: string;
  name: string;
  batch: string;
  college: string;
  contribution: string;
  verified: boolean;
  addedAt: string;
}

export interface AnnouncementRecord {
  id: string;
  badgeText: string;
  title: string;
  subtitle: string;
  bodyParagraphs: string[];
  bulletItems?: string[];
  highlightText: string;
  ctaText: string;
  ctaTarget?: string;
  enabled: boolean;
  autoDismissSeconds: number;
  updatedAt: string;
}

export interface QuestionOverride {
  questionId: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
  classificationRole?: SubjectClassificationRole;
  subject?: string;
  paper?: string;
  chapter?: string;
  year?: number | null;
  collegeName?: string;
  chapterNeedsReview?: boolean;
  updatedAt: string;
}

export interface CustomTaxonomy {
  taxonomyVersion?: number;
  subjects: string[];
  chaptersBySubjectPaper: Record<string, string[]>;
  years: number[];
  professionalExams?: ProfExamConfig[];
}

export interface BookmarkRecord {
  id: string;
  itemType: 'cq' | 'mcq' | 'paper' | 'note';
  professionalExam: ProfessionalExamId;
  subject: string;
  paper?: string;
  chapter?: string;
  title: string;
  subtitle?: string;
  savedAt: string;
}

export interface RecentlyViewedRecord {
  id: string;
  itemType: 'cq' | 'mcq' | 'paper' | 'note';
  professionalExam: ProfessionalExamId;
  subject: string;
  title: string;
  subtitle?: string;
  viewedAt: string;
}

export interface WrongAnswerRecord {
  id: string;
  professionalExam: ProfessionalExamId;
  subject: string;
  paper: string;
  chapter: string;
  type: 'SBA' | 'TF';
  stem: string;
  explanation?: string;
  attempts: number;
  lastWrongAt: string;
}

export interface ExamHistoryRecord {
  id: string;
  professionalExam: ProfessionalExamId;
  subject: string;
  mode: string;
  totalQuestions: number;
  scoreEarned: number;
  percentage: number;
  completedAt: string;
}

export interface StudyState {
  bookmarks: BookmarkRecord[];
  recentlyViewed: RecentlyViewedRecord[];
  wrongAnswers: WrongAnswerRecord[];
  examHistory: ExamHistoryRecord[];
  practicedIds: Record<string, { professionalExam: ProfessionalExamId; subject: string; correct: boolean }>;
}

export interface ResourceRequestRecord {
  id: string;
  professionalExam: ProfessionalExamId;
  subject: string;
  topicOrExam: string;
  resourceType: 'Written Questions' | 'MCQ' | 'Question Paper' | 'Notes' | 'Viva';
  details: string;
  requesterName: string;
  status: 'Open' | 'Fulfilled';
  createdAt: string;
}

export type PageRoute =
  | 'home'
  | 'archive'
  | 'question'
  | 'mcq'
  | 'exam'
  | 'wrong-review'
  | 'submit'
  | 'community'
  | 'library'
  | 'upload'
  | 'teacher'
  | 'profile'
  | 'settings'
  | 'contributors'
  | 'notices'
  | 'admin'
  | 'about'
  | 'developer';

export type ProfileTab = 'info' | 'settings' | 'bookmarks' | 'recent' | 'progress';
