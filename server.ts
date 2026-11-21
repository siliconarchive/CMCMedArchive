import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  ProfExamConfig,
  ProfessionalExamId,
  ResourceRequestRecord,
  StudyState,
  SubjectClassificationRole
} from './src/types.ts';
import {
  CURRICULUM_TAXONOMY_VERSION,
  PROFESSIONAL_EXAMS,
  canonicalizeSubjectName,
  inferProfessionalExam,
  isDentalSubjectOrProgram,
  isValidProfId
} from './src/data/curriculumConfig.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data directories exist
const DATA_DIR = path.resolve(__dirname, 'data');
const UPLOADS_DIR = path.resolve(DATA_DIR, 'uploads', 'notes');
const SUBMISSIONS_DIR = path.resolve(DATA_DIR, 'uploads', 'submissions');

for (const dir of [DATA_DIR, UPLOADS_DIR, SUBMISSIONS_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const DB_FILE = path.resolve(DATA_DIR, 'medarchive_db.json');

// Types
export type UserRole = 'student' | 'contributor' | 'admin';

export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  batch: string;
  roll?: string;
  role: UserRole;
  preferredProf?: ProfessionalExamId;
  studyState?: StudyState;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

export interface StoredSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: number;
}

export interface StoredNote {
  id: string;
  fullName: string;
  collegeName: string;
  title: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
  classificationRole?: SubjectClassificationRole;
  subject: string;
  paper?: string;
  topic?: string;
  description: string;
  originalFileName: string;
  storedFileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  fileUrl: string;
  uploadedByUserId: string;
  uploadedByEmail?: string;
  uploadTimestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  moderationNote?: string;
  prog: 'MBBS' | 'BDS';
  kind: string;
}

export interface SubmissionFileRecord {
  id: string;
  originalName: string;
  storedName: string;
  filePath: string;
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

export type SubmissionStatus =
  | 'Pending'
  | 'Under Review'
  | 'Needs Correction'
  | 'Approved'
  | 'Rejected'
  | 'Published';

export interface QuestionSubmission {
  id: string;
  trackingKey: string;
  category: 'Card' | 'Term' | 'MCQ';
  method: 'pdf' | 'images' | 'drive_link';
  collegeName: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
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
  category: 'Card' | 'Term' | 'MCQ';
  collegeName: string;
  professionalExam?: ProfessionalExamId;
  profNeedsReview?: boolean;
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
  method: 'pdf' | 'images' | 'drive_link';
  files: Omit<SubmissionFileRecord, 'filePath'>[];
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
  examName: string;
  subject: string;
  paper: string;
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
  role?: string;
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

export interface AppDatabase {
  users: StoredUser[];
  sessions: StoredSession[];
  notes: StoredNote[];
  submissions: QuestionSubmission[];
  publishedPapers: PublishedPaper[];
  publishedQuestions: PublishedMcqQuestion[];
  contributors: ContributorRecord[];
  announcements: AnnouncementRecord[];
  questionOverrides: Record<string, QuestionOverride>;
  customTaxonomy: CustomTaxonomy;
  resourceRequests: ResourceRequestRecord[];
}

// Password Hashing Helpers
function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const hash = hashPassword(password, salt);
  const hashBuffer = Buffer.from(hash, 'hex');
  const expectedBuffer = Buffer.from(expectedHash, 'hex');
  if (hashBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(hashBuffer, expectedBuffer);
}

// Magic byte validator for PDF, PNG, JPEG, WEBP
function validateFileMagicBytes(filePath: string, mimeType: string): boolean {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(12);
    const bytesRead = fs.readSync(fd, buf, 0, 12, 0);
    fs.closeSync(fd);
    if (bytesRead < 4) return false;

    const lower = mimeType.toLowerCase();
    if (lower === 'application/pdf') {
      return buf.subarray(0, 4).toString('ascii') === '%PDF';
    }
    if (lower === 'image/png') {
      return buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    }
    if (lower === 'image/jpeg' || lower === 'image/jpg') {
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    }
    if (lower === 'image/webp') {
      return (
        bytesRead >= 12 &&
        buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
        buf.subarray(8, 12).toString('ascii') === 'WEBP'
      );
    }
    return false;
  } catch {
    return false;
  }
}

const DEFAULT_ANNOUNCEMENT: AnnouncementRecord = {
  id: 'campaign_question_collection_2026',
  badgeText: '📢 SPECIAL ANNOUNCEMENT',
  title: 'LET’S BUILD A MEDICAL QUESTION ARCHIVE TOGETHER!',
  subtitle: 'We Are Collecting Questions From Different Medical Colleges.',
  bodyParagraphs: [
    'We are collecting Card Examination Questions and Term Examination Questions from medical colleges across Bangladesh.',
    'You can contribute by submitting:'
  ],
  bulletItems: [
    'PDF question papers',
    'Images of question papers',
    'Google Drive links'
  ],
  highlightText: 'YOUR CONTRIBUTION MATTERS!',
  ctaText: 'SUBMIT YOUR QUESTION PAPERS',
  ctaTarget: 'submit',
  enabled: true,
  autoDismissSeconds: 7,
  updatedAt: new Date().toISOString()
};

const DEFAULT_CONTRIBUTORS: ContributorRecord[] = [
  {
    id: 'contrib_sadman_sami',
    name: 'MD Sadman Sami',
    role: 'Core Contributor',
    batch: 'CMC 67',
    college: 'Chittagong Medical College (CMC)',
    contribution: 'Question Paper Archiving & Academic Data Contribution',
    verified: true,
    addedAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'contrib_tahsin_rakin',
    name: 'Tahsin Mohammad Rakin',
    role: 'Content Contributor',
    batch: 'CMC-67',
    college: 'Chittagong Medical College',
    contribution: 'Academic Question & Resource Contributor',
    verified: true,
    addedAt: '2026-11-21T00:00:00.000Z'
  }
];

const SEED_APPROVED_NOTES: StoredNote[] = [
  {
    id: 'r1',
    fullName: 'Sifat Islam',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Brachial plexus summary & clinical lesions',
    subject: 'Anatomy',
    topic: 'Brachial plexus',
    kind: 'Notes',
    description:
      'One-page revision summary of roots, trunks, divisions, cords and branches with Erb-Duchenne and Klumpke palsy clinical correlations.',
    originalFileName: 'brachial_plexus_summary.pdf',
    storedFileName: 'seed_brachial_plexus.pdf',
    filePath: '',
    fileSize: 420000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-01T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r2',
    fullName: 'CMC Academic Committee',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Cardiac cycle Wiggers diagram & heart sounds',
    subject: 'Physiology',
    topic: 'Cardiac cycle',
    kind: 'Diagram',
    description:
      'Pressure-volume loop, synchronized jugular venous pulse (JVP) and phonocardiogram (S1-S4) reference chart.',
    originalFileName: 'cardiac_cycle_wiggers.pdf',
    storedFileName: 'seed_cardiac_cycle.pdf',
    filePath: '',
    fileSize: 580000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-05T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r3',
    fullName: 'CMC Academic Committee',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Glycolysis & Gluconeogenesis reciprocal regulation',
    subject: 'Biochemistry',
    topic: 'Carbohydrate Metabolism',
    kind: 'Notes',
    description:
      'High-yield pathway chart with regulated rate-limiting enzymes, ATP yield, and insulin-glucagon phosphorylation states.',
    originalFileName: 'glycolysis_gluconeogenesis.pdf',
    storedFileName: 'seed_glycolysis.pdf',
    filePath: '',
    fileSize: 390000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-09T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r4',
    fullName: 'CMC Academic Committee',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Renal Clearance & Countercurrent multiplier mechanism',
    subject: 'Physiology',
    topic: 'Renal System',
    kind: 'Notes',
    description:
      'Step-by-step summary of loop of Henle medullary hyperosmolarity and GFR regulation by tubuloglomerular feedback.',
    originalFileName: 'renal_clearance_summary.pdf',
    storedFileName: 'seed_renal_clearance.pdf',
    filePath: '',
    fileSize: 510000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-12T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r5',
    fullName: 'Sifat Islam',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Cranial nerves exit foramina & functional modalities',
    subject: 'Anatomy',
    topic: 'Neuroanatomy & Cranial Cavity',
    kind: 'Summary',
    description:
      'Complete reference table of cranial nerves (I–XII), their skull base exit foramina, and sensory/motor/parasympathetic components.',
    originalFileName: 'cranial_nerves_table.pdf',
    storedFileName: 'seed_cranial_nerves.pdf',
    filePath: '',
    fileSize: 640000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-15T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r6',
    fullName: 'CMC Academic Committee',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Acid-Base balance & arterial blood gas (ABG) chart',
    subject: 'Biochemistry',
    topic: 'Acid-Base & Renal',
    kind: 'Summary',
    description:
      'Systematic diagnostic algorithm for metabolic vs respiratory acidosis and alkalosis with compensation formulas.',
    originalFileName: 'acid_base_abg_chart.pdf',
    storedFileName: 'seed_acid_base.pdf',
    filePath: '',
    fileSize: 480000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-20T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r7',
    fullName: 'CMC Academic Committee',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Epithelium classification & histology quick guide',
    subject: 'Anatomy',
    topic: 'General Histology',
    kind: 'Notes',
    description:
      'High-yield identification guide for simple, stratified, pseudostratified and transitional epithelium with organ locations.',
    originalFileName: 'epithelium_histology_guide.pdf',
    storedFileName: 'seed_epithelium.pdf',
    filePath: '',
    fileSize: 720000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-22T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  },
  {
    id: 'r8',
    fullName: 'CMC Academic Committee',
    collegeName: 'Chittagong Medical College (CMC)',
    title: 'Respiratory membrane & gas diffusion capacities',
    subject: 'Physiology',
    topic: 'Respiratory System',
    kind: 'Summary',
    description:
      "Layers of the blood-air barrier, Fick's law of diffusion, and factors altering diffusion capacity (DLCO).",
    originalFileName: 'respiratory_membrane_diffusion.pdf',
    storedFileName: 'seed_respiratory_membrane.pdf',
    filePath: '',
    fileSize: 490000,
    mimeType: 'application/pdf',
    fileUrl: '',
    uploadedByUserId: 'seed-admin-1',
    uploadedByEmail: 'sifatislam.cmc67@gmail.com',
    uploadTimestamp: '2026-09-28T10:00:00Z',
    status: 'approved',
    prog: 'MBBS'
  }
];

function inferNotePaper(note: StoredNote): string {
  if (note.paper && note.paper.trim()) return note.paper.trim();
  const hay = `${note.title} ${note.topic || ''}`.toLowerCase();
  if (note.subject === 'Anatomy') {
    if (hay.includes('brachial') || hay.includes('thorax') || hay.includes('abdomen') || hay.includes('lower limb') || hay.includes('upper limb')) {
      return 'Paper-II';
    }
    if (hay.includes('cranial') || hay.includes('neuroanatomy') || hay.includes('histology') || hay.includes('epithelium') || hay.includes('embryology') || hay.includes('head')) {
      return 'Paper-I';
    }
  }
  if (note.subject === 'Physiology') {
    if (hay.includes('renal') || hay.includes('endocrin') || hay.includes('nervous') || hay.includes('autonomic') || hay.includes('special sense')) {
      return 'Paper-II';
    }
    if (hay.includes('cardiac') || hay.includes('respiratory') || hay.includes('blood') || hay.includes('general')) {
      return 'Paper-I';
    }
  }
  if (note.subject === 'Biochemistry') {
    if (hay.includes('glycolysis') || hay.includes('metabolism') || hay.includes('acid-base') || hay.includes('renal') || hay.includes('genetics')) {
      return 'Paper-II';
    }
    if (hay.includes('enzyme') || hay.includes('vitamin') || hay.includes('biophysics') || hay.includes('biomolecule')) {
      return 'Paper-I';
    }
  }
  return 'General';
}

function ensureDatabaseFields(raw: any): AppDatabase {
  let changed = false;
  const dbObj: AppDatabase = {
    users: Array.isArray(raw?.users) ? raw.users : [],
    sessions: Array.isArray(raw?.sessions) ? raw.sessions : [],
    notes: Array.isArray(raw?.notes) ? raw.notes : [...SEED_APPROVED_NOTES],
    submissions: Array.isArray(raw?.submissions) ? raw.submissions : [],
    publishedPapers: Array.isArray(raw?.publishedPapers) ? raw.publishedPapers : [],
    publishedQuestions: Array.isArray(raw?.publishedQuestions) ? raw.publishedQuestions : [],
    contributors:
      Array.isArray(raw?.contributors) && raw.contributors.length > 0
        ? raw.contributors
        : [...DEFAULT_CONTRIBUTORS],
    announcements:
      Array.isArray(raw?.announcements) && raw.announcements.length > 0
        ? raw.announcements
        : [DEFAULT_ANNOUNCEMENT],
    questionOverrides:
      raw?.questionOverrides && typeof raw.questionOverrides === 'object' ? raw.questionOverrides : {},
    customTaxonomy:
      raw?.customTaxonomy && typeof raw.customTaxonomy === 'object'
        ? {
            taxonomyVersion:
              typeof raw.customTaxonomy.taxonomyVersion === 'number'
                ? raw.customTaxonomy.taxonomyVersion
                : 1,
            subjects: Array.isArray(raw.customTaxonomy.subjects) ? raw.customTaxonomy.subjects : [],
            chaptersBySubjectPaper:
              raw.customTaxonomy.chaptersBySubjectPaper &&
              typeof raw.customTaxonomy.chaptersBySubjectPaper === 'object'
                ? raw.customTaxonomy.chaptersBySubjectPaper
                : {},
            years: Array.isArray(raw.customTaxonomy.years) ? raw.customTaxonomy.years : [],
            professionalExams:
              Array.isArray(raw.customTaxonomy.professionalExams) &&
              raw.customTaxonomy.professionalExams.length > 0
                ? raw.customTaxonomy.professionalExams
                : [...PROFESSIONAL_EXAMS]
          }
        : {
            taxonomyVersion: CURRICULUM_TAXONOMY_VERSION,
            subjects: [],
            chaptersBySubjectPaper: {},
            years: [],
            professionalExams: [...PROFESSIONAL_EXAMS]
          },
    resourceRequests: Array.isArray(raw?.resourceRequests) ? raw.resourceRequests : []
  };

  if (
    !Array.isArray(raw?.submissions) ||
    !Array.isArray(raw?.publishedPapers) ||
    !Array.isArray(raw?.publishedQuestions) ||
    !Array.isArray(raw?.contributors) ||
    !Array.isArray(raw?.announcements) ||
    !raw?.questionOverrides ||
    !raw?.customTaxonomy ||
    !Array.isArray(raw?.customTaxonomy?.professionalExams) ||
    !Array.isArray(raw?.resourceRequests)
  ) {
    changed = true;
  }

  // Non-destructive BM&DC MBBS Curriculum 2021 taxonomy upgrade (v1 -> v2)
  if ((dbObj.customTaxonomy.taxonomyVersion ?? 1) < CURRICULUM_TAXONOMY_VERSION) {
    const oldKnownDefaultSubjects = new Set([
      'anatomy',
      'physiology',
      'biochemistry',
      'community medicine',
      'forensic medicine',
      'pharmacology',
      'pathology',
      'microbiology',
      'medicine',
      'surgery',
      'obstetrics & gynaecology'
    ]);
    const existingProfs = Array.isArray(dbObj.customTaxonomy.professionalExams)
      ? dbObj.customTaxonomy.professionalExams
      : [];

    dbObj.customTaxonomy.professionalExams = PROFESSIONAL_EXAMS.map(canonical => {
      const prevCfg = existingProfs.find(p => p.id === canonical.id);
      const adminCustomExtras = prevCfg
        ? (prevCfg.subjects || []).filter(s => !oldKnownDefaultSubjects.has(s.trim().toLowerCase()))
        : [];
      return {
        ...canonical,
        subjects: [...canonical.subjects, ...adminCustomExtras]
      };
    });
    dbObj.customTaxonomy.taxonomyVersion = CURRICULUM_TAXONOMY_VERSION;
    changed = true;
  }

  // Safe, non-destructive Professional Examination backfill for existing records
  for (const note of dbObj.notes) {
    if (!isValidProfId(note.professionalExam)) {
      const inferred = inferProfessionalExam({
        explicitProf: note.professionalExam,
        subject: note.subject,
        examName: note.title,
        prog: note.prog
      });
      note.professionalExam = inferred.professionalExam;
      note.profNeedsReview = inferred.needsReview;
      changed = true;
    }
    if (!note.paper) {
      note.paper = inferNotePaper(note);
      changed = true;
    }
  }

  for (const sub of dbObj.submissions) {
    if (!isValidProfId(sub.professionalExam)) {
      const inferred = inferProfessionalExam({
        explicitProf: sub.professionalExam,
        subject: sub.subject,
        examName: sub.examName
      });
      sub.professionalExam = inferred.professionalExam;
      sub.profNeedsReview = inferred.needsReview;
      changed = true;
    }
  }

  for (const paper of dbObj.publishedPapers) {
    if (!isValidProfId(paper.professionalExam)) {
      const inferred = inferProfessionalExam({
        explicitProf: paper.professionalExam,
        subject: paper.subject,
        examName: paper.examName
      });
      paper.professionalExam = inferred.professionalExam;
      paper.profNeedsReview = inferred.needsReview;
      changed = true;
    }
  }

  for (const pq of dbObj.publishedQuestions) {
    if (!isValidProfId(pq.professionalExam)) {
      const inferred = inferProfessionalExam({
        explicitProf: pq.professionalExam,
        subject: pq.subject,
        examName: pq.examName
      });
      pq.professionalExam = inferred.professionalExam;
      pq.profNeedsReview = inferred.needsReview;
      changed = true;
    }
  }

  // Seed default contributor only if list is completely empty
  if (dbObj.contributors.length === 0) {
    dbObj.contributors.push(...DEFAULT_CONTRIBUTORS);
    changed = true;
  }

  if (changed) {
    saveDatabase(dbObj);
  }
  return dbObj;
}

function loadDatabase(): AppDatabase {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (Array.isArray(data.users) && Array.isArray(data.sessions) && Array.isArray(data.notes)) {
        return ensureDatabaseFields(data);
      }
    } catch (e) {
      console.error('Error reading database file, recreating:', e);
    }
  }

  const adminSalt = crypto.randomBytes(16).toString('hex');
  const studentSalt = crypto.randomBytes(16).toString('hex');

  const initialDb: AppDatabase = {
    users: [
      {
        id: 'usr_admin_sifat',
        fullName: 'Sifat Islam',
        email: 'sifatislam.cmc67@gmail.com',
        collegeName: 'Chittagong Medical College (CMC)',
        batch: 'CMC-67',
        roll: '01',
        role: 'admin',
        salt: adminSalt,
        passwordHash: hashPassword('cmc67student', adminSalt),
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr_student_demo',
        fullName: 'Tanvir Ahmed',
        email: 'student@cmc.edu.bd',
        collegeName: 'Chittagong Medical College (CMC)',
        batch: 'CMC-66',
        roll: '42',
        role: 'student',
        salt: studentSalt,
        passwordHash: hashPassword('studentdemo', studentSalt),
        createdAt: new Date().toISOString()
      }
    ],
    sessions: [],
    notes: [...SEED_APPROVED_NOTES],
    submissions: [],
    publishedPapers: [],
    publishedQuestions: [],
    contributors: [...DEFAULT_CONTRIBUTORS],
    announcements: [DEFAULT_ANNOUNCEMENT],
    questionOverrides: {},
    customTaxonomy: { subjects: [], chaptersBySubjectPaper: {}, years: [] },
    resourceRequests: []
  };

  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(database: AppDatabase): void {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(database, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

let db: AppDatabase = loadDatabase();

function cleanExpiredSessions() {
  const now = Date.now();
  const valid = db.sessions.filter(s => s.expiresAt > now);
  if (valid.length !== db.sessions.length) {
    db.sessions = valid;
    saveDatabase(db);
  }
}
setInterval(cleanExpiredSessions, 1000 * 60 * 60);

function sanitizeUser(user: StoredUser) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    collegeName: user.collegeName,
    batch: user.batch,
    roll: user.roll || '',
    role: user.role,
    preferredProf: isValidProfId(user.preferredProf) ? user.preferredProf : undefined,
    createdAt: user.createdAt
  };
}

function sanitizeNoteForResponse(note: StoredNote, includePrivate = false): StoredNote {
  if (includePrivate) {
    return note;
  }
  const { uploadedByEmail: _omitted, ...publicNote } = note;
  return publicNote;
}

function sanitizeSubmissionForResponse(sub: QuestionSubmission, includeSecrets = false) {
  return {
    ...sub,
    trackingKey: includeSecrets ? sub.trackingKey : undefined,
    contributorEmail: includeSecrets ? sub.contributorEmail : undefined,
    files: sub.files.map(f => ({
      id: f.id,
      originalName: f.originalName,
      storedName: f.storedName,
      mimeType: f.mimeType,
      size: f.size,
      url: f.url
    }))
  };
}

// Multer storage for Notes
const noteStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
    cb(null, `note_${timestamp}_${safeName}`);
  }
});

const allowedUploadMime = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const uploadNote = multer({
  storage: noteStorage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedUploadMime.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload a PDF document or an image file (PNG, JPG, WEBP).'));
    }
  }
});

// Multer storage for Question Paper Submissions
const subStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, SUBMISSIONS_DIR),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const rand = crypto.randomBytes(3).toString('hex');
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
    cb(null, `sub_${timestamp}_${rand}_${safeName}`);
  }
});

const uploadSubmissionFiles = multer({
  storage: subStorage,
  limits: { fileSize: 25 * 1024 * 1024, files: 20 },
  fileFilter: (_req, file, cb) => {
    if (allowedUploadMime.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Allowed formats: PDF, PNG, JPG, JPEG, WEBP.'));
    }
  }
});

// Authentication Middleware
interface AuthenticatedRequest extends Request {
  user?: StoredUser;
}

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyt7nK3VNFjnBGvnRyystbOaYf23zNPIARKicPh_0RLQNV_xgmOFAzqNWmfacIkg2t4tw/exec';

function resolveUserFromToken(token?: string): StoredUser | undefined {
  if (!token) return undefined;
  const now = Date.now();
  const session = db.sessions.find(s => s.token === token && s.expiresAt > now);
  if (!session) return undefined;
  return db.users.find(u => u.id === session.userId);
}

function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const localUser = resolveUserFromToken(token);
    if (localUser) {
      const normalizedRole =
        String(localUser.role || '').trim().toLowerCase() === 'admin' ? 'admin' : 'student';
      if (localUser.role !== normalizedRole) {
        localUser.role = normalizedRole;
      }
      req.user = localUser;
    }
  }
  next();
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required. Please sign in to perform this action.'
    });
  }
  next();
}

function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  if (String(req.user.role || '').trim().toLowerCase() !== 'admin') {
    return res.status(403).json({ error: 'Administrator privileges required for this operation.' });
  }
  next();
}

// Google Drive URL Validation & Accessibility Check
function parseDriveUrl(rawUrl: string): { valid: boolean; normalizedUrl: string; error?: string } {
  try {
    const trimmed = rawUrl.trim();
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { valid: false, normalizedUrl: trimmed, error: 'URL must use http or https.' };
    }
    const host = parsed.hostname.toLowerCase();
    const isGoogleDrive =
      host === 'drive.google.com' ||
      host === 'docs.google.com' ||
      host.endsWith('.drive.google.com');
    if (!isGoogleDrive) {
      return {
        valid: false,
        normalizedUrl: trimmed,
        error: 'Only valid Google Drive or Google Docs links (drive.google.com / docs.google.com) are accepted.'
      };
    }
    return { valid: true, normalizedUrl: parsed.toString() };
  } catch {
    return { valid: false, normalizedUrl: rawUrl, error: 'Invalid URL format.' };
  }
}

async function verifyDriveLinkAccessibility(url: string): Promise<{
  accessible: boolean;
  status: 'public' | 'restricted' | 'not_found' | 'invalid' | 'network_error';
  httpStatus?: number;
  message: string;
}> {
  const parsed = parseDriveUrl(url);
  if (!parsed.valid) {
    return {
      accessible: false,
      status: 'invalid',
      message: parsed.error || 'Invalid Google Drive URL.'
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const resp = await fetch(parsed.normalizedUrl, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'CMC-MedArchive-LinkVerifier/1.0'
      }
    });
    clearTimeout(timeout);

    const location = resp.headers.get('location') || '';
    if (
      resp.status === 401 ||
      resp.status === 403 ||
      location.includes('accounts.google.com') ||
      location.includes('ServiceLogin')
    ) {
      return {
        accessible: false,
        status: 'restricted',
        httpStatus: resp.status,
        message:
          'This Google Drive link appears restricted or requires sign-in. Open Google Drive -> Share -> General access -> "Anyone with the link" (Viewer), then re-test.'
      };
    }

    if (resp.status === 404) {
      return {
        accessible: false,
        status: 'not_found',
        httpStatus: 404,
        message: 'Google Drive file or folder was not found (404). Check that the URL is complete and not deleted.'
      };
    }

    if (resp.status >= 200 && resp.status < 400) {
      const contentType = resp.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        const snippet = (await resp.text()).slice(0, 6000).toLowerCase();
        if (
          snippet.includes('you need access') ||
          snippet.includes('request access') ||
          snippet.includes('sign in to continue')
        ) {
          return {
            accessible: false,
            status: 'restricted',
            httpStatus: resp.status,
            message:
              'Google Drive returned an access-request page. Please change General access to "Anyone with the link" -> "Viewer".'
          };
        }
      }
      return {
        accessible: true,
        status: 'public',
        httpStatus: resp.status,
        message: 'Google Drive link is reachable without authentication.'
      };
    }

    return {
      accessible: false,
      status: 'network_error',
      httpStatus: resp.status,
      message: `Google Drive returned HTTP ${resp.status}. Please confirm link sharing is enabled.`
    };
  } catch (err: any) {
    return {
      accessible: false,
      status: 'network_error',
      message:
        err?.name === 'AbortError'
          ? 'Timed out while contacting Google Drive. You can still submit the link, and an administrator will verify it.'
          : 'Could not reach Google Drive from the server to verify live access. Check the link format and sharing settings.'
    };
  }
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));
  app.use(authMiddleware);

  // ===================== SESSION BRIDGE FOR APPS SCRIPT AUTH =====================

  app.post('/api/auth/session', async (req: Request, res: Response) => {
    try {
      const { userId, email } = req.body || {};
      const cleanId = String(userId || '').trim();
      const cleanEmail = String(email || '').trim().toLowerCase();
      if (!cleanId || !cleanEmail) {
        return res.status(400).json({ error: 'userId and email are required.' });
      }

      const gsRes = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'list_users' })
      });
      const gsData = (await gsRes.json().catch(() => null)) as {
        ok?: boolean;
        success?: boolean;
        users?: Array<Record<string, any>>;
      } | null;

      const list = Array.isArray(gsData?.users) ? gsData!.users : [];
      const matched = list.find(
        u =>
          String(u.id || '').trim() === cleanId &&
          String(u.email || '').trim().toLowerCase() === cleanEmail
      );

      if (!matched) {
        return res.status(401).json({ error: 'User account not found in directory.' });
      }

      const normalizedRole = String(matched.role || '').trim().toLowerCase();
      const safeRole: UserRole =
        normalizedRole === 'admin'
          ? 'admin'
          : normalizedRole === 'contributor'
            ? 'contributor'
            : 'student';
      const preferredProf = isValidProfId(matched.preferred_prof)
        ? matched.preferred_prof
        : undefined;

      let stored = db.users.find(
        u => u.id === cleanId || u.email.toLowerCase() === cleanEmail
      );
      if (stored) {
        stored.id = cleanId;
        stored.fullName = String(matched.full_name || stored.fullName);
        stored.email = String(matched.email || stored.email);
        stored.collegeName = String(matched.college_name || stored.collegeName);
        stored.batch = String(matched.batch || stored.batch);
        stored.roll = matched.roll ? String(matched.roll) : stored.roll || '';
        stored.role = safeRole;
        if (preferredProf && !stored.preferredProf) {
          stored.preferredProf = preferredProf;
        }
      } else {
        stored = {
          id: cleanId,
          fullName: String(matched.full_name || cleanEmail.split('@')[0]),
          email: String(matched.email || cleanEmail),
          collegeName: String(matched.college_name || 'Chittagong Medical College (CMC)'),
          batch: String(matched.batch || ''),
          roll: matched.roll ? String(matched.roll) : '',
          role: safeRole,
          preferredProf,
          passwordHash: '',
          salt: '',
          createdAt: String(matched.created_at || new Date().toISOString())
        };
        db.users.push(stored);
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
      db.sessions.push({
        token,
        userId: stored.id,
        createdAt: new Date().toISOString(),
        expiresAt
      });

      saveDatabase(db);

      return res.status(200).json({
        success: true,
        token,
        user: sanitizeUser(stored)
      });
    } catch (err: any) {
      console.error('Session sync error:', err);
      return res.status(500).json({ error: 'Failed to verify session.' });
    }
  });

  app.get('/api/auth/me', (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated or session expired.' });
    }
    return res.status(200).json({
      success: true,
      user: sanitizeUser(req.user)
    });
  });

  app.patch('/api/user/preference', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const { preferredProf } = req.body || {};
    if (!isValidProfId(preferredProf)) {
      return res.status(400).json({
        error: 'Invalid Professional Examination. Choose First, Second, Third, or Fourth Professional.'
      });
    }

    const storedUser = db.users.find(
      u => u.id === req.user!.id || u.email.toLowerCase() === req.user!.email.toLowerCase()
    );
    if (storedUser) {
      storedUser.preferredProf = preferredProf;
      saveDatabase(db);
    }

    return res.status(200).json({
      success: true,
      user: { ...sanitizeUser(req.user!), preferredProf },
      preferredProf
    });
  });

  app.get('/api/user/study-state', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const storedUser = db.users.find(
      u => u.id === req.user!.id || u.email.toLowerCase() === req.user!.email.toLowerCase()
    );
    return res.status(200).json({
      success: true,
      studyState: storedUser?.studyState || {
        bookmarks: [],
        recentlyViewed: [],
        wrongAnswers: [],
        examHistory: [],
        practicedIds: {}
      }
    });
  });

  app.patch('/api/user/study-state', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const body = req.body || {};
    const nextStudyState: StudyState = {
      bookmarks: Array.isArray(body.bookmarks) ? body.bookmarks.slice(0, 150) : [],
      recentlyViewed: Array.isArray(body.recentlyViewed) ? body.recentlyViewed.slice(0, 80) : [],
      wrongAnswers: Array.isArray(body.wrongAnswers) ? body.wrongAnswers.slice(0, 200) : [],
      examHistory: Array.isArray(body.examHistory) ? body.examHistory.slice(0, 100) : [],
      practicedIds:
        body.practicedIds && typeof body.practicedIds === 'object' ? body.practicedIds : {}
    };

    const storedUser = db.users.find(
      u => u.id === req.user!.id || u.email.toLowerCase() === req.user!.email.toLowerCase()
    );
    if (storedUser) {
      storedUser.studyState = nextStudyState;
      saveDatabase(db);
    }
    return res.status(200).json({ success: true, studyState: nextStudyState });
  });

  // Resource Requests (Prof-scoped missing resource / topic requests)
  app.get('/api/resource-requests', (req: Request, res: Response) => {
    const prof = typeof req.query.prof === 'string' ? req.query.prof : '';
    const items = isValidProfId(prof)
      ? db.resourceRequests.filter(r => r.professionalExam === prof)
      : db.resourceRequests;
    return res.status(200).json({ success: true, requests: items });
  });

  app.post('/api/resource-requests', (req: AuthenticatedRequest, res: Response) => {
    const { professionalExam, subject, topicOrExam, resourceType, details, requesterName } =
      req.body || {};
    if (!isValidProfId(professionalExam) || !subject || !topicOrExam) {
      return res.status(400).json({
        error: 'Professional Examination, Subject, and Topic / Exam name are required.'
      });
    }
    const created: ResourceRequestRecord = {
      id: `req_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
      professionalExam,
      subject: canonicalizeSubjectName(String(subject)),
      topicOrExam: String(topicOrExam).trim().slice(0, 180),
      resourceType: resourceType || 'Written Questions',
      details: String(details || '').trim().slice(0, 500),
      requesterName: String(requesterName || req.user?.fullName || 'Anonymous Student')
        .trim()
        .slice(0, 80),
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    db.resourceRequests.unshift(created);
    saveDatabase(db);
    return res.status(201).json({ success: true, request: created });
  });

  app.patch(
    '/api/admin/resource-requests/:id',
    requireAdmin,
    (req: AuthenticatedRequest, res: Response) => {
      const rec = db.resourceRequests.find(r => r.id === req.params.id);
      if (!rec) return res.status(404).json({ error: 'Resource request not found.' });
      const { status } = req.body || {};
      if (status === 'Open' || status === 'Fulfilled') {
        rec.status = status;
        saveDatabase(db);
      }
      return res.status(200).json({ success: true, request: rec });
    }
  );

  app.post('/api/auth/logout', (req: AuthenticatedRequest, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      db.sessions = db.sessions.filter(s => s.token !== token);
      saveDatabase(db);
    }
    return res.status(200).json({ success: true, message: 'Signed out successfully.' });
  });

  // ===================== NOTES & STUDY MATERIALS API =====================

  app.post('/api/notes/upload', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    uploadNote.single('file')(req, res, (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File exceeds 25 MB size limit. Please upload a smaller file.' });
        }
        return res.status(400).json({ error: err.message || 'File upload error.' });
      }

      try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'Please select a note file (PDF or image) to upload.' });
        }

        if (!validateFileMagicBytes(file.path, file.mimetype)) {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          return res.status(400).json({
            error: 'Uploaded file failed security content verification (invalid PDF or image signature).'
          });
        }

        const { fullName, collegeName, title, professionalExam, subject, paper, topic, description } = req.body;

        if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          return res.status(400).json({ error: 'Contributor Full Name is required.' });
        }
        if (!collegeName || typeof collegeName !== 'string' || !collegeName.trim()) {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          return res.status(400).json({ error: 'Medical College Name is required as a separate field.' });
        }
        if (!title || typeof title !== 'string' || !title.trim()) {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          return res.status(400).json({ error: 'Note Title is required.' });
        }
        if (!subject || typeof subject !== 'string' || !subject.trim()) {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          return res.status(400).json({ error: 'Medical Subject is required.' });
        }

        const user = req.user!;
        const noteId = `note_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
        const fileUrl = `/api/notes/${noteId}/file`;
        const status = user.role === 'admin' ? 'approved' : 'pending';
        const profInfo = inferProfessionalExam({
          explicitProf: professionalExam,
          subject: subject.trim(),
          examName: title.trim()
        });

        const newNote: StoredNote = {
          id: noteId,
          fullName: fullName.trim(),
          collegeName: collegeName.trim(),
          title: title.trim(),
          professionalExam: profInfo.professionalExam,
          profNeedsReview: profInfo.needsReview,
          subject: subject.trim(),
          paper: paper ? String(paper).trim() : 'General',
          topic: topic ? String(topic).trim() : 'General',
          description: description ? String(description).trim() : '',
          originalFileName: file.originalname,
          storedFileName: file.filename,
          filePath: file.path,
          fileSize: file.size,
          mimeType: file.mimetype,
          fileUrl,
          uploadedByUserId: user.id,
          uploadedByEmail: user.email,
          uploadTimestamp: new Date().toISOString(),
          status,
          prog: 'MBBS',
          kind: file.mimetype.startsWith('image/') ? 'Diagram' : 'Notes'
        };

        db.notes.unshift(newNote);
        saveDatabase(db);

        return res.status(201).json({
          success: true,
          note: sanitizeNoteForResponse(newNote, true),
          message:
            status === 'approved'
              ? 'Your resource has been published directly to the Student Library.'
              : 'Your note has been securely saved and submitted for academic verification. It will appear publicly upon moderator approval.'
        });
      } catch (err: any) {
        console.error('Note upload error:', err);
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ error: 'An unexpected error occurred while saving your note.' });
      }
    });
  });

  app.get('/api/notes', (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user;
      const includeAllMbbs = db.notes.filter(n => !isDentalSubjectOrProgram(n.prog, n.subject));
      let notesToReturn: StoredNote[];

      if (user && user.role === 'admin') {
        notesToReturn = includeAllMbbs.map(n => sanitizeNoteForResponse(n, true));
      } else if (user) {
        notesToReturn = includeAllMbbs
          .filter(n => n.status === 'approved' || n.uploadedByUserId === user.id)
          .map(n => sanitizeNoteForResponse(n, n.uploadedByUserId === user.id));
      } else {
        notesToReturn = includeAllMbbs
          .filter(n => n.status === 'approved')
          .map(n => sanitizeNoteForResponse(n, false));
      }

      return res.status(200).json({ success: true, notes: notesToReturn });
    } catch (err: any) {
      console.error('Error fetching notes:', err);
      return res.status(500).json({ error: 'Failed to retrieve notes archive.' });
    }
  });

  app.get('/api/notes/:id/file', (req: AuthenticatedRequest, res: Response) => {
    try {
      const note = db.notes.find(n => n.id === req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note record not found.' });
      }

      const queryUser = typeof req.query.token === 'string' ? resolveUserFromToken(req.query.token) : undefined;
      const user = req.user || queryUser;
      const canAccess =
        note.status === 'approved' ||
        (user && (user.role === 'admin' || user.id === note.uploadedByUserId));

      if (!canAccess) {
        return res.status(403).json({ error: 'This note is currently pending verification.' });
      }

      if (!note.filePath || !fs.existsSync(note.filePath)) {
        return res.status(404).json({
          error: 'The requested file attachment could not be located on the server disk.'
        });
      }

      res.setHeader('Content-Type', note.mimeType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(note.originalFileName)}"`);
      res.setHeader('Content-Length', note.fileSize);
      res.setHeader('X-Content-Type-Options', 'nosniff');

      fs.createReadStream(note.filePath).pipe(res);
    } catch (err: any) {
      console.error('Error streaming file:', err);
      return res.status(500).json({ error: 'Error reading file from storage.' });
    }
  });

  app.patch('/api/notes/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    try {
      const { status, moderationNote } = req.body;
      if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ error: 'Invalid moderation status.' });
      }

      const note = db.notes.find(n => n.id === req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note record not found.' });
      }

      note.status = status;
      if (moderationNote !== undefined) note.moderationNote = String(moderationNote).trim();
      saveDatabase(db);

      return res.status(200).json({ success: true, note, message: `Note status updated to ${status}.` });
    } catch (err: any) {
      console.error('Moderation error:', err);
      return res.status(500).json({ error: 'Failed to update note status.' });
    }
  });

  app.delete('/api/notes/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    try {
      const noteIndex = db.notes.findIndex(n => n.id === req.params.id);
      if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note record not found.' });
      }

      const note = db.notes[noteIndex];
      const isOwner = req.user?.id === note.uploadedByUserId;
      const isAdmin = req.user?.role === 'admin';

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ error: 'You are not authorized to delete this note.' });
      }

      if (note.filePath && fs.existsSync(note.filePath)) {
        try {
          fs.unlinkSync(note.filePath);
        } catch (e) {
          console.warn('Failed to delete file on disk:', e);
        }
      }

      db.notes.splice(noteIndex, 1);
      saveDatabase(db);

      return res.status(200).json({ success: true, message: 'Note deleted successfully.' });
    } catch (err: any) {
      console.error('Delete note error:', err);
      return res.status(500).json({ error: 'Failed to delete note.' });
    }
  });

  // ===================== QUESTION PAPER SUBMISSIONS API =====================

  // POST /api/submissions/verify-drive-link
  app.post('/api/submissions/verify-drive-link', async (req: Request, res: Response) => {
    const { url } = req.body || {};
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Please provide a Google Drive URL to test.' });
    }
    const result = await verifyDriveLinkAccessibility(url);
    return res.status(200).json({ success: true, ...result });
  });

  // POST /api/submissions (multipart PDF/Images or JSON Drive Link)
  app.post('/api/submissions', (req: AuthenticatedRequest, res: Response) => {
    const handleSubmission = () => {
      try {
        const body = req.body || {};
        const uploadedFiles = ((req as any).files as Express.Multer.File[]) || [];

        const cleanupFiles = () => {
          for (const f of uploadedFiles) {
            if (f.path && fs.existsSync(f.path)) {
              try {
                fs.unlinkSync(f.path);
              } catch {}
            }
          }
        };

        const category = body.category;
        const method = body.method;
        const collegeName = String(body.collegeName || '').trim();
        const examName = String(body.examName || '').trim();
        const subject = String(body.subject || '').trim();
        const paper = String(body.paper || '').trim();
        const chapter = String(body.chapter || '').trim();
        const year = String(body.year || '').trim();
        const session = String(body.session || '').trim();
        const collectionType = String(body.collectionType || category || '').trim();
        const description = String(body.description || '').trim();
        const contributorName = String(body.contributorName || req.user?.fullName || 'Anonymous Student').trim();
        const contributorBatch = String(body.contributorBatch || req.user?.batch || '').trim();
        const contributorEmail = String(body.contributorEmail || req.user?.email || '').trim();
        const subProf = inferProfessionalExam({
          explicitProf: body.professionalExam,
          subject,
          examName
        });

        if (!['Card', 'Term', 'MCQ'].includes(category)) {
          cleanupFiles();
          return res.status(400).json({ error: 'Please select a valid question category (Card, Term, or MCQ).' });
        }
        if (!['pdf', 'images', 'drive_link'].includes(method)) {
          cleanupFiles();
          return res.status(400).json({ error: 'Please select a valid submission method (PDF, Images, or Google Drive Link).' });
        }
        if (!collegeName || !examName || !subject || !year) {
          cleanupFiles();
          return res.status(400).json({
            error: 'Medical College Name, Examination Name, Subject, and Year are required.'
          });
        }

        // Parse Drive links if provided
        let driveLinks: string[] = [];
        if (Array.isArray(body.driveLinks)) {
          driveLinks = body.driveLinks.map((s: any) => String(s).trim()).filter(Boolean);
        } else if (typeof body.driveLinks === 'string' && body.driveLinks.trim()) {
          try {
            const parsed = JSON.parse(body.driveLinks);
            if (Array.isArray(parsed)) {
              driveLinks = parsed.map((s: any) => String(s).trim()).filter(Boolean);
            } else {
              driveLinks = [body.driveLinks.trim()];
            }
          } catch {
            driveLinks = body.driveLinks
              .split(/\n|,/)
              .map((s: string) => s.trim())
              .filter(Boolean);
          }
        }

        if (method === 'drive_link') {
          if (driveLinks.length === 0) {
            cleanupFiles();
            return res.status(400).json({ error: 'Please enter at least one Google Drive link.' });
          }
          for (const link of driveLinks) {
            const check = parseDriveUrl(link);
            if (!check.valid) {
              cleanupFiles();
              return res.status(400).json({ error: check.error || `Invalid Google Drive URL: ${link}` });
            }
          }
        } else {
          if (uploadedFiles.length === 0) {
            return res.status(400).json({
              error: method === 'pdf' ? 'Please attach a PDF file.' : 'Please attach at least one image file.'
            });
          }
          // Magic bytes check for every uploaded file
          for (const file of uploadedFiles) {
            if (!validateFileMagicBytes(file.path, file.mimetype)) {
              cleanupFiles();
              return res.status(400).json({
                error: `File "${file.originalname}" failed security verification (invalid file header).`
              });
            }
            if (method === 'pdf' && file.mimetype !== 'application/pdf') {
              cleanupFiles();
              return res.status(400).json({ error: 'PDF submission mode only accepts PDF documents.' });
            }
            if (method === 'images' && !file.mimetype.startsWith('image/')) {
              cleanupFiles();
              return res.status(400).json({ error: 'Image submission mode only accepts PNG, JPG, JPEG, or WEBP images.' });
            }
          }
        }

        const subYear = new Date().getFullYear();
        const randId = crypto.randomBytes(2).toString('hex').toUpperCase();
        const subId = `SUB-${subYear}-${Date.now().toString().slice(-4)}${randId}`;
        const trackingKey = crypto.randomBytes(12).toString('hex');
        const nowIso = new Date().toISOString();

        const fileRecords: SubmissionFileRecord[] = uploadedFiles.map((f, idx) => ({
          id: `file_${Date.now()}_${idx}`,
          originalName: f.originalname,
          storedName: f.filename,
          filePath: f.path,
          mimeType: f.mimetype,
          size: f.size,
          url: `/api/submissions/${subId}/files/${encodeURIComponent(f.filename)}`
        }));

        const newSub: QuestionSubmission = {
          id: subId,
          trackingKey,
          category,
          method,
          collegeName,
          professionalExam: subProf.professionalExam,
          profNeedsReview: subProf.needsReview,
          examName,
          subject,
          paper,
          chapter,
          year,
          session,
          collectionType,
          description,
          contributorName,
          contributorBatch,
          contributorEmail: contributorEmail || undefined,
          userId: req.user?.id,
          files: fileRecords,
          driveLinks,
          driveVerified: body.driveVerified === true || body.driveVerified === 'true',
          driveVerificationNote: body.driveVerificationNote ? String(body.driveVerificationNote) : undefined,
          status: 'Pending',
          createdAt: nowIso,
          updatedAt: nowIso
        };

        db.submissions.unshift(newSub);
        saveDatabase(db);

        return res.status(201).json({
          success: true,
          submission: sanitizeSubmissionForResponse(newSub, true),
          message: `Submission ${subId} received and queued for review. Thank you for contributing!`
        });
      } catch (err: any) {
        console.error('Submission error:', err);
        return res.status(500).json({ error: 'Failed to store question paper submission.' });
      }
    };

    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
      uploadSubmissionFiles.array('files', 20)(req, res, (err: any) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'A file exceeds the 25 MB per-file size limit.' });
          }
          return res.status(400).json({ error: err.message || 'File upload failed.' });
        }
        handleSubmission();
      });
    } else {
      handleSubmission();
    }
  });

  // GET /api/submissions/mine
  app.get('/api/submissions/mine', (req: AuthenticatedRequest, res: Response) => {
    const tokensParam = typeof req.query.tokens === 'string' ? req.query.tokens : '';
    const tokenPairs = tokensParam
      .split(',')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => {
        const [id, key] = p.split(':');
        return { id, key };
      });

    const user = req.user;
    const matched = db.submissions.filter(sub => {
      if (user && (sub.userId === user.id || (user.email && sub.contributorEmail === user.email))) {
        return true;
      }
      if (tokenPairs.some(tp => tp.id === sub.id && tp.key && tp.key === sub.trackingKey)) {
        return true;
      }
      return false;
    });

    return res.status(200).json({
      success: true,
      submissions: matched.map(s => sanitizeSubmissionForResponse(s, false))
    });
  });

  // PATCH /api/submissions/:id/resubmit
  app.patch('/api/submissions/:id/resubmit', (req: AuthenticatedRequest, res: Response) => {
    const handleResubmit = () => {
      const sub = db.submissions.find(s => s.id === req.params.id);
      if (!sub) {
        return res.status(404).json({ error: 'Submission not found.' });
      }

      const trackingKey = String(req.body?.trackingKey || req.headers['x-tracking-key'] || '');
      const isOwner = req.user && (sub.userId === req.user.id || req.user.role === 'admin');
      const hasValidKey = Boolean(trackingKey && trackingKey === sub.trackingKey);

      if (!isOwner && !hasValidKey) {
        return res.status(403).json({ error: 'You are not authorized to update this submission.' });
      }

      if (!['Needs Correction', 'Pending'].includes(sub.status) && req.user?.role !== 'admin') {
        return res.status(400).json({ error: 'Only Pending or Needs Correction submissions can be updated.' });
      }

      const uploadedFiles = ((req as any).files as Express.Multer.File[]) || [];
      if (uploadedFiles.length > 0) {
        for (const f of uploadedFiles) {
          if (!validateFileMagicBytes(f.path, f.mimetype)) {
            uploadedFiles.forEach(uf => {
              if (uf.path && fs.existsSync(uf.path)) fs.unlinkSync(uf.path);
            });
            return res.status(400).json({ error: `Invalid file content in ${f.originalname}.` });
          }
        }
        // Remove old files if replacing
        for (const oldF of sub.files) {
          if (oldF.filePath && fs.existsSync(oldF.filePath)) {
            try {
              fs.unlinkSync(oldF.filePath);
            } catch {}
          }
        }
        sub.files = uploadedFiles.map((f, idx) => ({
          id: `file_${Date.now()}_${idx}`,
          originalName: f.originalname,
          storedName: f.filename,
          filePath: f.path,
          mimeType: f.mimetype,
          size: f.size,
          url: `/api/submissions/${sub.id}/files/${encodeURIComponent(f.filename)}`
        }));
      }

      if (req.body?.driveLinks !== undefined) {
        let newLinks: string[] = [];
        if (Array.isArray(req.body.driveLinks)) {
          newLinks = req.body.driveLinks.map((s: any) => String(s).trim()).filter(Boolean);
        } else if (typeof req.body.driveLinks === 'string') {
          try {
            const parsed = JSON.parse(req.body.driveLinks);
            newLinks = Array.isArray(parsed) ? parsed.map((s: any) => String(s).trim()).filter(Boolean) : [req.body.driveLinks.trim()];
          } catch {
            newLinks = req.body.driveLinks
              .split(/\n|,/)
              .map((s: string) => s.trim())
              .filter(Boolean);
          }
        }
        for (const link of newLinks) {
          const check = parseDriveUrl(link);
          if (!check.valid) {
            return res.status(400).json({ error: check.error });
          }
        }
        sub.driveLinks = newLinks;
      }

      if (req.body?.description !== undefined) {
        sub.description = String(req.body.description).trim();
      }
      sub.status = 'Pending';
      sub.updatedAt = new Date().toISOString();
      saveDatabase(db);

      return res.status(200).json({
        success: true,
        submission: sanitizeSubmissionForResponse(sub, false),
        message: 'Submission updated and returned to review queue.'
      });
    };

    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
      uploadSubmissionFiles.array('files', 20)(req, res, (err: any) => {
        if (err) {
          return res.status(400).json({ error: err.message || 'File upload failed.' });
        }
        handleResubmit();
      });
    } else {
      handleResubmit();
    }
  });

  // GET /api/submissions/:id/files/:storedName (stream file safely)
  app.get('/api/submissions/:id/files/:storedName', (req: AuthenticatedRequest, res: Response) => {
    const sub = db.submissions.find(s => s.id === req.params.id);
    if (!sub) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    const safeName = path.basename(req.params.storedName);
    const fileRec = sub.files.find(f => f.storedName === safeName);
    if (!fileRec || !fileRec.filePath || !fs.existsSync(fileRec.filePath)) {
      return res.status(404).json({ error: 'File not found on server.' });
    }

    const queryUser = typeof req.query.token === 'string' ? resolveUserFromToken(req.query.token) : undefined;
    const user = req.user || queryUser;
    const trackingKey = typeof req.query.key === 'string' ? req.query.key : '';

    const canAccess =
      sub.status === 'Published' ||
      (user && (user.role === 'admin' || (sub.userId && sub.userId === user.id))) ||
      (trackingKey && trackingKey === sub.trackingKey);

    if (!canAccess) {
      return res.status(403).json({ error: 'Access denied to unverified submission file.' });
    }

    res.setHeader('Content-Type', fileRec.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(fileRec.originalName)}"`);
    res.setHeader('Content-Length', fileRec.size);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    fs.createReadStream(fileRec.filePath).pipe(res);
  });

  // ===================== PUBLIC ARCHIVE, CONTRIBUTORS, ANNOUNCEMENTS =====================

  app.get('/api/archive/published', (_req: Request, res: Response) => {
    res.set('Cache-Control', 'no-store');
    const mbbsPapers = db.publishedPapers.filter(
      p => !isDentalSubjectOrProgram('MBBS', p.subject)
    );
    const mbbsQuestions = db.publishedQuestions.filter(
      q => !isDentalSubjectOrProgram('MBBS', q.subject)
    );
    return res.status(200).json({
      success: true,
      publishedPapers: mbbsPapers,
      publishedQuestions: mbbsQuestions,
      questionOverrides: db.questionOverrides,
      customTaxonomy: db.customTaxonomy
    });
  });

  app.get('/api/contributors', (_req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      contributors: db.contributors
    });
  });

  app.get('/api/announcements/active', (_req: Request, res: Response) => {
    res.set('Cache-Control', 'no-store');
    const active = db.announcements.find(a => a.enabled) || db.announcements[0] || DEFAULT_ANNOUNCEMENT;
    return res.status(200).json({
      success: true,
      announcement: active
    });
  });

  // ===================== ADMIN API (STRICT RBAC) =====================

  app.get('/api/admin/submissions', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const { status, category, collegeName, subject, professionalExam } = req.query;
    let list = [...db.submissions];
    if (status && status !== 'all') {
      list = list.filter(s => s.status === status);
    }
    if (category && category !== 'all') {
      list = list.filter(s => s.category === category);
    }
    if (professionalExam && professionalExam !== 'all') {
      list = list.filter(s => s.professionalExam === professionalExam);
    }
    if (collegeName && collegeName !== 'all') {
      const q = String(collegeName).toLowerCase();
      list = list.filter(s => s.collegeName.toLowerCase().includes(q));
    }
    if (subject && subject !== 'all') {
      list = list.filter(s => s.subject.toLowerCase() === String(subject).toLowerCase());
    }
    return res.status(200).json({
      success: true,
      submissions: list.map(s => sanitizeSubmissionForResponse(s, false))
    });
  });

  app.patch('/api/admin/submissions/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const sub = db.submissions.find(s => s.id === req.params.id);
    if (!sub) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    const allowedStatuses: SubmissionStatus[] = [
      'Pending',
      'Under Review',
      'Needs Correction',
      'Approved',
      'Rejected',
      'Published'
    ];

    const body = req.body || {};
    if (body.status !== undefined) {
      if (!allowedStatuses.includes(body.status)) {
        return res.status(400).json({ error: 'Invalid submission status.' });
      }
      sub.status = body.status;
    }
    if (body.adminComment !== undefined) sub.adminComment = String(body.adminComment).trim();
    if (body.collegeName !== undefined) sub.collegeName = String(body.collegeName).trim();
    if (isValidProfId(body.professionalExam)) {
      sub.professionalExam = body.professionalExam;
      sub.profNeedsReview = false;
    }
    if (body.examName !== undefined) sub.examName = String(body.examName).trim();
    if (body.subject !== undefined) sub.subject = String(body.subject).trim();
    if (body.paper !== undefined) sub.paper = String(body.paper).trim();
    if (body.chapter !== undefined) sub.chapter = String(body.chapter).trim();
    if (body.year !== undefined) sub.year = String(body.year).trim();
    if (body.session !== undefined) sub.session = String(body.session).trim();
    if (body.collectionType !== undefined) sub.collectionType = String(body.collectionType).trim();
    if (body.description !== undefined) sub.description = String(body.description).trim();
    if (Array.isArray(body.extractedMcqs)) sub.extractedMcqs = body.extractedMcqs;

    // Also sync changes if this submission is already published in Community Uploads
    if (sub.publishedPaperId) {
      const pubPaper = db.publishedPapers.find(p => p.id === sub.publishedPaperId);
      if (pubPaper) {
        pubPaper.professionalExam = sub.professionalExam;
        pubPaper.profNeedsReview = sub.profNeedsReview;
        pubPaper.subject = sub.subject;
        pubPaper.paper = sub.paper || 'General';
        pubPaper.chapter = sub.chapter || 'Pending Chapter Review';
        const yr = parseInt(sub.year, 10);
        if (Number.isFinite(yr)) pubPaper.year = yr;
        pubPaper.session = sub.session;
        pubPaper.examName = sub.examName;
        pubPaper.collegeName = sub.collegeName;
      }
    }

    sub.updatedAt = new Date().toISOString();
    saveDatabase(db);

    return res.status(200).json({
      success: true,
      submission: sanitizeSubmissionForResponse(sub, false),
      message: 'Submission updated.'
    });
  });

  // POST /api/admin/submissions/:id/extract-ocr
  app.post('/api/admin/submissions/:id/extract-ocr', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
    const sub = db.submissions.find(s => s.id === req.params.id);
    if (!sub) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    if (sub.method === 'drive_link' && sub.files.length === 0) {
      return res.status(400).json({
        error:
          'Automatic OCR extraction requires uploaded PDF or image files on the server. For Google Drive links, download the file and attach or manually enter extracted questions below (direct Google Drive API credentials are not configured).'
      });
    }

    let rawPdfText = '';
    const validFiles = sub.files.filter(f => f.filePath && fs.existsSync(f.filePath));
    if (validFiles.length === 0) {
      return res.status(404).json({ error: 'No uploaded files found on disk for this submission.' });
    }

    // 1. Extract plain text from PDFs using pdf-parse if available
    for (const file of validFiles) {
      if (file.mimeType === 'application/pdf') {
        try {
          const { PDFParse } = await import('pdf-parse');
          const buffer = fs.readFileSync(file.filePath);
          const parser = new PDFParse({ data: buffer });
          const result = await parser.getText();
          if (result?.text) {
            rawPdfText += (rawPdfText ? '\n\n' : '') + result.text;
          }
          await parser.destroy();
        } catch (pdfErr: any) {
          console.warn('pdf-parse fallback warning:', pdfErr?.message);
        }
      }
    }

    // 2. If GEMINI_API_KEY is available, perform multimodal OCR / MCQ parsing with Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      sub.ocrRawText = rawPdfText.trim();
      sub.ocrStatusNote =
        'GEMINI_API_KEY is not configured in the server environment. Raw PDF text extraction (if applicable) was performed; image OCR and structured AI parsing require GEMINI_API_KEY.';
      sub.updatedAt = new Date().toISOString();
      saveDatabase(db);

      return res.status(200).json({
        success: true,
        aiConfigured: false,
        rawText: sub.ocrRawText,
        extractedMcqs: sub.extractedMcqs || [],
        note: sub.ocrStatusNote
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const parts: any[] = [
        {
          text: `You are transcribing a medical examination question paper (${sub.subject}, ${sub.examName}, ${sub.year}).
Extract ONLY questions, options/sub-items, and any answer keys explicitly printed in the document.
CRITICAL INTEGRITY RULES:
1. NEVER invent, guess, or fabricate answer keys that are not visibly printed on the page.
2. If an answer key is not visibly marked in the document, set "answerKeyPresent": false and set "correctIndex": null (for SBA) or "ans": null (for TF items).
3. Separate questions strictly into "SBA" (Single Best Answer with 4-5 choices) or "TF" (True/False stem with sub-items a-e).
4. Return ONLY valid JSON matching this schema:
{
  "rawTranscript": "string",
  "questions": [
    {
      "type": "SBA" | "TF",
      "stem": "string",
      "opts": ["string"] (only if SBA),
      "correctIndex": number | null (only if SBA and visibly marked),
      "items": [{"label": "a", "text": "string", "ans": boolean | null}] (only if TF),
      "answerKeyPresent": boolean,
      "explanation": "string (optional, only if printed)"
    }
  ]
}`
        }
      ];

      // Attach up to 5 files (under 15MB inlineData limit)
      for (const file of validFiles.slice(0, 5)) {
        const bytes = fs.readFileSync(file.filePath);
        if (bytes.length <= 15 * 1024 * 1024) {
          parts.push({
            inlineData: {
              mimeType: file.mimeType,
              data: bytes.toString('base64')
            }
          });
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);

      const drafts: ExtractedMcqDraft[] = Array.isArray(parsed.questions)
        ? parsed.questions.map((q: any, idx: number) => ({
            id: `draft_${sub.id}_${idx + 1}`,
            type: q.type === 'SBA' ? 'SBA' : 'TF',
            stem: String(q.stem || '').trim(),
            opts: Array.isArray(q.opts) ? q.opts.map((o: any) => String(o)) : undefined,
            correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : null,
            items: Array.isArray(q.items)
              ? q.items.map((it: any, i: number) => ({
                  label: String(it.label || String.fromCharCode(97 + i)),
                  text: String(it.text || ''),
                  ans: typeof it.ans === 'boolean' ? it.ans : null
                }))
              : undefined,
            answerKeyPresent: Boolean(q.answerKeyPresent),
            explanation: q.explanation ? String(q.explanation) : '',
            verifiedByAdmin: false
          }))
        : [];

      sub.ocrRawText = String(parsed.rawTranscript || rawPdfText || '').trim();
      sub.extractedMcqs = drafts;
      sub.ocrStatusNote = `OCR extracted ${drafts.length} draft question(s). Admin verification is required before publishing into the Exam/MCQ bank.`;
      if (sub.status === 'Pending') sub.status = 'Under Review';
      sub.updatedAt = new Date().toISOString();
      saveDatabase(db);

      return res.status(200).json({
        success: true,
        aiConfigured: true,
        rawText: sub.ocrRawText,
        extractedMcqs: drafts,
        note: sub.ocrStatusNote
      });
    } catch (aiErr: any) {
      console.error('OCR extraction failed:', aiErr);
      sub.ocrRawText = rawPdfText.trim();
      sub.ocrStatusNote = `AI OCR could not complete (${aiErr?.message || 'unknown error'}). Raw PDF text (if any) was preserved.`;
      sub.updatedAt = new Date().toISOString();
      saveDatabase(db);
      return res.status(200).json({
        success: true,
        aiConfigured: true,
        rawText: sub.ocrRawText,
        extractedMcqs: sub.extractedMcqs || [],
        note: sub.ocrStatusNote
      });
    }
  });

  // POST /api/admin/submissions/:id/publish
  app.post('/api/admin/submissions/:id/publish', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const sub = db.submissions.find(s => s.id === req.params.id);
    if (!sub) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    const { publishMcqs, verifiedMcqs, creditContributor } = req.body || {};
    const parsedYear = parseInt(sub.year, 10);
    const paperId = `pub_${sub.id}`;
    const nowIso = new Date().toISOString();
    const profMeta = isValidProfId(sub.professionalExam)
      ? { professionalExam: sub.professionalExam, needsReview: Boolean(sub.profNeedsReview) }
      : inferProfessionalExam({ explicitProf: sub.professionalExam, subject: sub.subject, examName: sub.examName });

    const existingPaperIdx = db.publishedPapers.findIndex(p => p.submissionId === sub.id);
    const publishedPaper: PublishedPaper = {
      id: paperId,
      submissionId: sub.id,
      category: sub.category,
      collegeName: sub.collegeName,
      professionalExam: profMeta.professionalExam,
      profNeedsReview: profMeta.needsReview,
      examName: sub.examName,
      subject: sub.subject,
      paper: sub.paper || 'General',
      chapter: sub.chapter || 'Pending Chapter Review',
      year: Number.isFinite(parsedYear) ? parsedYear : null,
      session: sub.session,
      collectionType: sub.collectionType,
      description: sub.description,
      contributorName: sub.contributorName,
      contributorBatch: sub.contributorBatch,
      method: sub.method,
      files: sub.files.map(({ filePath: _fp, ...rest }) => rest),
      driveLinks: sub.driveLinks,
      publishedAt: nowIso
    };

    if (existingPaperIdx >= 0) {
      db.publishedPapers[existingPaperIdx] = publishedPaper;
    } else {
      db.publishedPapers.unshift(publishedPaper);
    }

    let publishedQuestionCount = 0;
    if (publishMcqs && Array.isArray(verifiedMcqs)) {
      // Remove previous questions from this submission if re-publishing
      db.publishedQuestions = db.publishedQuestions.filter(q => q.submissionId !== sub.id);
      for (let i = 0; i < verifiedMcqs.length; i++) {
        const draft = verifiedMcqs[i];
        if (!draft?.stem || !draft.verifiedByAdmin) continue;

        if (draft.type === 'SBA') {
          if (!Array.isArray(draft.opts) || draft.opts.length < 2 || typeof draft.correctIndex !== 'number') continue;
          db.publishedQuestions.push({
            id: `pubq_${sub.id}_${i + 1}`,
            submissionId: sub.id,
            paperId,
            collegeName: sub.collegeName,
            professionalExam: profMeta.professionalExam,
            profNeedsReview: profMeta.needsReview,
            examName: sub.examName,
            subject: sub.subject,
            paper: sub.paper || 'Paper-I',
            chapter: sub.chapter || 'Pending Chapter Review',
            year: Number.isFinite(parsedYear) ? parsedYear : new Date().getFullYear(),
            session: sub.session || sub.year,
            type: 'SBA',
            stem: String(draft.stem).trim(),
            opts: draft.opts.map((o: any) => String(o)),
            correctIndex: draft.correctIndex,
            explanation: draft.explanation ? String(draft.explanation) : undefined,
            verificationStatus: 'Verified',
            publishedAt: nowIso
          });
          publishedQuestionCount++;
        } else if (draft.type === 'TF') {
          if (!Array.isArray(draft.items) || draft.items.length === 0) continue;
          const allAnswered = draft.items.every((it: any) => typeof it.ans === 'boolean');
          if (!allAnswered) continue;
          db.publishedQuestions.push({
            id: `pubq_${sub.id}_${i + 1}`,
            submissionId: sub.id,
            paperId,
            collegeName: sub.collegeName,
            professionalExam: profMeta.professionalExam,
            profNeedsReview: profMeta.needsReview,
            examName: sub.examName,
            subject: sub.subject,
            paper: sub.paper || 'Paper-I',
            chapter: sub.chapter || 'Pending Chapter Review',
            year: Number.isFinite(parsedYear) ? parsedYear : new Date().getFullYear(),
            session: sub.session || sub.year,
            type: 'TF',
            stem: String(draft.stem).trim(),
            items: draft.items.map((it: any, idx: number) => ({
              label: String(it.label || String.fromCharCode(97 + idx)),
              text: String(it.text || ''),
              ans: Boolean(it.ans)
            })),
            explanation: draft.explanation ? String(draft.explanation) : undefined,
            verificationStatus: 'Verified',
            publishedAt: nowIso
          });
          publishedQuestionCount++;
        }
      }
    }

    if (
      creditContributor &&
      sub.contributorName &&
      sub.contributorName.toLowerCase() !== 'anonymous student' &&
      !db.contributors.some(c => c.name.toLowerCase() === sub.contributorName.toLowerCase())
    ) {
      db.contributors.push({
        id: `contrib_${Date.now()}`,
        name: sub.contributorName,
        batch: sub.contributorBatch || sub.session || 'Medical Student',
        college: sub.collegeName,
        contribution: `${profMeta.professionalExam} • ${sub.subject} — ${sub.examName} (${sub.year})`,
        verified: true,
        addedAt: nowIso
      });
    }

    sub.status = 'Published';
    sub.publishedPaperId = paperId;
    sub.updatedAt = nowIso;
    saveDatabase(db);

    return res.status(200).json({
      success: true,
      publishedPaper,
      publishedQuestionCount,
      submission: sanitizeSubmissionForResponse(sub, false),
      message: `Published to Archive${publishedQuestionCount > 0 ? ` along with ${publishedQuestionCount} verified MCQ(s)` : ''}.`
    });
  });

  // PATCH /api/admin/published-papers/:id (Fix Prof / Subject / Paper / Chapter / Year on published papers)
  app.patch('/api/admin/published-papers/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const paper = db.publishedPapers.find(p => p.id === req.params.id);
    if (!paper) return res.status(404).json({ error: 'Published paper not found.' });

    const {
      professionalExam,
      classificationRole,
      subject,
      paper: paperPart,
      chapter,
      year,
      session,
      examName,
      collegeName
    } = req.body || {};
    if (isValidProfId(professionalExam)) {
      paper.professionalExam = professionalExam;
      paper.profNeedsReview = false;
    }
    if (
      classificationRole === 'Main Professional Examination Subject' ||
      classificationRole === 'Phase Teaching / Formative Subject'
    ) {
      (paper as any).classificationRole = classificationRole;
    }
    if (subject !== undefined) paper.subject = canonicalizeSubjectName(String(subject));
    if (paperPart !== undefined) paper.paper = String(paperPart).trim();
    if (chapter !== undefined) paper.chapter = String(chapter).trim();
    if (year !== undefined) {
      const yr = parseInt(String(year), 10);
      paper.year = Number.isFinite(yr) ? yr : null;
    }
    if (session !== undefined) paper.session = String(session).trim();
    if (examName !== undefined) paper.examName = String(examName).trim();
    if (collegeName !== undefined) paper.collegeName = String(collegeName).trim();

    saveDatabase(db);
    return res.status(200).json({ success: true, publishedPaper: paper });
  });

  // PATCH /api/admin/notes/:id (Fix Prof / Subject / Paper / Topic on notes)
  app.patch('/api/admin/notes/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const note = db.notes.find(n => n.id === req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found.' });

    const { professionalExam, classificationRole, subject, paper, topic, title } = req.body || {};
    if (isValidProfId(professionalExam)) {
      note.professionalExam = professionalExam;
      note.profNeedsReview = false;
    }
    if (
      classificationRole === 'Main Professional Examination Subject' ||
      classificationRole === 'Phase Teaching / Formative Subject'
    ) {
      note.classificationRole = classificationRole;
    }
    if (subject !== undefined) note.subject = canonicalizeSubjectName(String(subject));
    if (paper !== undefined) note.paper = String(paper).trim();
    if (topic !== undefined) note.topic = String(topic).trim();
    if (title !== undefined) note.title = String(title).trim();

    saveDatabase(db);
    return res.status(200).json({ success: true, note: sanitizeNoteForResponse(note, true) });
  });

  // PUT /api/admin/question-override
  app.put('/api/admin/question-override', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const {
      questionId,
      professionalExam,
      profNeedsReview,
      classificationRole,
      subject,
      paper,
      chapter,
      year,
      collegeName,
      chapterNeedsReview
    } = req.body || {};
    if (!questionId || typeof questionId !== 'string') {
      return res.status(400).json({ error: 'questionId is required.' });
    }

    const existing = db.questionOverrides[questionId];
    db.questionOverrides[questionId] = {
      questionId,
      professionalExam: isValidProfId(professionalExam) ? professionalExam : existing?.professionalExam,
      profNeedsReview: profNeedsReview !== undefined ? Boolean(profNeedsReview) : false,
      classificationRole:
        classificationRole === 'Main Professional Examination Subject' ||
        classificationRole === 'Phase Teaching / Formative Subject'
          ? classificationRole
          : existing?.classificationRole,
      subject: subject ? canonicalizeSubjectName(String(subject)) : existing?.subject,
      paper: paper ? String(paper).trim() : existing?.paper,
      chapter: chapter ? String(chapter).trim() : existing?.chapter,
      year: typeof year === 'number' ? year : existing?.year,
      collegeName: collegeName ? String(collegeName).trim() : existing?.collegeName,
      chapterNeedsReview:
        chapterNeedsReview !== undefined ? Boolean(chapterNeedsReview) : existing?.chapterNeedsReview ?? false,
      updatedAt: new Date().toISOString()
    };

    saveDatabase(db);
    return res.status(200).json({
      success: true,
      override: db.questionOverrides[questionId]
    });
  });

  // POST /api/admin/taxonomy
  app.post('/api/admin/taxonomy', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const { type, subject, paper, chapter, year, professionalExam, subtitle } = req.body || {};
    if (!Array.isArray(db.customTaxonomy.professionalExams) || db.customTaxonomy.professionalExams.length === 0) {
      db.customTaxonomy.professionalExams = [...PROFESSIONAL_EXAMS];
    }

    if (type === 'subject' && subject) {
      const clean = String(subject).trim();
      if (clean && !db.customTaxonomy.subjects.includes(clean)) {
        db.customTaxonomy.subjects.push(clean);
      }
      if (isValidProfId(professionalExam)) {
        const profCfg = db.customTaxonomy.professionalExams.find(p => p.id === professionalExam);
        if (profCfg) {
          if (!profCfg.subjects.includes(clean)) profCfg.subjects.push(clean);
          if (!profCfg.papersBySubject[clean]) {
            profCfg.papersBySubject[clean] = ['Paper-I', 'Paper-II', 'General'];
          }
        }
      }
    } else if (type === 'prof_update' && isValidProfId(professionalExam)) {
      const profCfg = db.customTaxonomy.professionalExams.find(p => p.id === professionalExam);
      if (profCfg && subtitle !== undefined) {
        profCfg.subtitle = String(subtitle).trim();
      }
    } else if (type === 'chapter' && subject && paper && chapter) {
      const key = `${String(subject).trim()}::${String(paper).trim()}`;
      const cleanChap = String(chapter).trim();
      if (!db.customTaxonomy.chaptersBySubjectPaper[key]) {
        db.customTaxonomy.chaptersBySubjectPaper[key] = [];
      }
      if (cleanChap && !db.customTaxonomy.chaptersBySubjectPaper[key].includes(cleanChap)) {
        db.customTaxonomy.chaptersBySubjectPaper[key].push(cleanChap);
      }
    } else if (type === 'year' && year) {
      const yr = parseInt(String(year), 10);
      if (Number.isFinite(yr) && !db.customTaxonomy.years.includes(yr)) {
        db.customTaxonomy.years.push(yr);
        db.customTaxonomy.years.sort((a, b) => b - a);
      }
    } else {
      return res.status(400).json({ error: 'Invalid taxonomy payload.' });
    }

    saveDatabase(db);
    return res.status(200).json({ success: true, customTaxonomy: db.customTaxonomy });
  });

  // Contributors Admin
  app.post('/api/admin/contributors', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const { name, role, batch, college, contribution, verified } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Contributor name is required.' });
    }
    const record: ContributorRecord = {
      id: `contrib_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
      name: String(name).trim(),
      role: String(role || 'Contributor').trim(),
      batch: String(batch || '').trim(),
      college: String(college || 'Chittagong Medical College (CMC)').trim(),
      contribution: String(contribution || 'Academic Question Archive Contributor').trim(),
      verified: verified !== false,
      addedAt: new Date().toISOString()
    };
    db.contributors.push(record);
    saveDatabase(db);
    return res.status(201).json({ success: true, contributor: record });
  });

  app.put('/api/admin/contributors/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const rec = db.contributors.find(c => c.id === req.params.id);
    if (!rec) return res.status(404).json({ error: 'Contributor not found.' });
    const { name, role, batch, college, contribution, verified } = req.body || {};
    if (name !== undefined && !String(name).trim()) {
      return res.status(400).json({ error: 'Contributor name cannot be empty.' });
    }
    if (name !== undefined) rec.name = String(name).trim();
    if (role !== undefined) rec.role = String(role).trim();
    if (batch !== undefined) rec.batch = String(batch).trim();
    if (college !== undefined) rec.college = String(college).trim();
    if (contribution !== undefined) rec.contribution = String(contribution).trim();
    if (verified !== undefined) rec.verified = Boolean(verified);
    saveDatabase(db);
    return res.status(200).json({ success: true, contributor: rec });
  });

  app.delete('/api/admin/contributors/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const idx = db.contributors.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Contributor not found.' });
    db.contributors.splice(idx, 1);
    saveDatabase(db);
    return res.status(200).json({ success: true });
  });

  // Announcements Public & Admin
  app.get('/api/announcements', (_req: Request, res: Response) => {
    res.set('Cache-Control', 'no-store');
    return res.status(200).json({ success: true, announcements: db.announcements });
  });

  app.get('/api/admin/announcements', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
    return res.status(200).json({ success: true, announcements: db.announcements });
  });

  app.post('/api/admin/announcements', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const { badgeText, title, subtitle, bodyParagraphs, bulletItems, highlightText, ctaText, ctaTarget, enabled, autoDismissSeconds } =
      req.body || {};
    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'Notice title is required.' });
    }
    const created: AnnouncementRecord = {
      id: `notice_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
      badgeText: String(badgeText || '📢 NOTICE').trim(),
      title: String(title).trim(),
      subtitle: String(subtitle || '').trim(),
      bodyParagraphs: Array.isArray(bodyParagraphs) ? bodyParagraphs.map((p: any) => String(p)) : [],
      bulletItems: Array.isArray(bulletItems) ? bulletItems.map((b: any) => String(b)) : [],
      highlightText: String(highlightText || '').trim(),
      ctaText: String(ctaText || 'SUBMIT YOUR QUESTION PAPERS').trim(),
      ctaTarget: String(ctaTarget || 'submit').trim(),
      enabled: Boolean(enabled),
      autoDismissSeconds:
        typeof autoDismissSeconds === 'number' && autoDismissSeconds >= 3 && autoDismissSeconds <= 30
          ? autoDismissSeconds
          : 7,
      updatedAt: new Date().toISOString()
    };
    db.announcements.push(created);
    saveDatabase(db);
    return res.status(201).json({ success: true, announcement: created });
  });

  app.put('/api/admin/announcements/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    const ann = db.announcements.find(a => a.id === req.params.id);
    if (!ann) return res.status(404).json({ error: 'Announcement not found.' });

    const { badgeText, title, subtitle, bodyParagraphs, bulletItems, highlightText, ctaText, ctaTarget, enabled, autoDismissSeconds } =
      req.body || {};
    if (badgeText !== undefined) ann.badgeText = String(badgeText);
    if (title !== undefined) ann.title = String(title);
    if (subtitle !== undefined) ann.subtitle = String(subtitle);
    if (Array.isArray(bodyParagraphs)) ann.bodyParagraphs = bodyParagraphs.map((p: any) => String(p));
    if (Array.isArray(bulletItems)) ann.bulletItems = bulletItems.map((b: any) => String(b));
    if (highlightText !== undefined) ann.highlightText = String(highlightText);
    if (ctaText !== undefined) ann.ctaText = String(ctaText);
    if (ctaTarget !== undefined) ann.ctaTarget = String(ctaTarget);
    if (enabled !== undefined) ann.enabled = Boolean(enabled);
    if (typeof autoDismissSeconds === 'number' && autoDismissSeconds >= 3 && autoDismissSeconds <= 30) {
      ann.autoDismissSeconds = autoDismissSeconds;
    }
    ann.updatedAt = new Date().toISOString();
    saveDatabase(db);

    return res.status(200).json({ success: true, announcement: ann });
  });

  app.delete('/api/admin/announcements/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
    if (req.params.id === 'campaign_question_collection_2026') {
      return res.status(400).json({ error: 'Primary campaign notice cannot be deleted; you can edit or disable it.' });
    }
    const idx = db.announcements.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Notice not found.' });
    db.announcements.splice(idx, 1);
    saveDatabase(db);
    return res.status(200).json({ success: true });
  });

  // GET /api/stats (Platform stats)
  app.get('/api/stats', (_req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      totalUsers: db.users.length,
      totalNotes: db.notes.length,
      approvedNotes: db.notes.filter(n => n.status === 'approved').length,
      pendingNotes: db.notes.filter(n => n.status === 'pending').length,
      totalSubmissions: db.submissions.length,
      pendingSubmissions: db.submissions.filter(s => s.status === 'Pending' || s.status === 'Under Review').length,
      publishedPapers: db.publishedPapers.length,
      publishedQuestions: db.publishedQuestions.length,
      totalContributors: db.contributors.length
    });
  });

  // ===================== FRONTEND INTEGRATION =====================

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CMC MedArchive full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
