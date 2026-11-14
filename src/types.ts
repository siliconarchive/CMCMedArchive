export type UserRole = 'student' | 'contributor' | 'admin';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  batch: string;
  roll?: string;
  role: UserRole;
  createdAt?: string;
  name?: string;
  college?: string;
}

export interface UploadedItem {
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
  subject?: string;
  paper?: string;
  chapter?: string;
  year?: number | null;
  collegeName?: string;
  chapterNeedsReview?: boolean;
  updatedAt: string;
}

export interface CustomTaxonomy {
  subjects: string[];
  chaptersBySubjectPaper: Record<string, string[]>;
  years: number[];
}

export type PageRoute =
  | 'home'
  | 'archive'
  | 'question'
  | 'mcq'
  | 'exam'
  | 'submit'
  | 'library'
  | 'upload'
  | 'teacher'
  | 'contributors'
  | 'notices'
  | 'admin'
  | 'about'
  | 'developer';
