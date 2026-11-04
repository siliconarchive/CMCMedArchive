import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data directories exist
const DATA_DIR = path.resolve(__dirname, 'data');
const UPLOADS_DIR = path.resolve(DATA_DIR, 'uploads', 'notes');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const DB_FILE = path.resolve(DATA_DIR, 'medarchive_db.json');

// Types
export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  batch: string;
  roll?: string;
  role: 'student' | 'admin';
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
  subject: string;
  topic?: string;
  description: string;
  originalFileName: string;
  storedFileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  fileUrl: string;
  uploadedByUserId: string;
  uploadedByEmail: string;
  uploadTimestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  moderationNote?: string;
  prog: 'MBBS' | 'BDS';
  kind: string;
}

export interface AppDatabase {
  users: StoredUser[];
  sessions: StoredSession[];
  notes: StoredNote[];
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

// Initial demo library notes
const SEED_APPROVED_NOTES: StoredNote[] = [
  {
    id: "r1",
    fullName: "Sifat Islam",
    collegeName: "Chittagong Medical College (CMC)",
    title: "Brachial plexus summary & clinical lesions",
    subject: "Anatomy",
    topic: "Brachial plexus",
    kind: "Notes",
    description: "One-page revision summary of roots, trunks, divisions, cords and branches with Erb-Duchenne and Klumpke palsy clinical correlations.",
    originalFileName: "brachial_plexus_summary.pdf",
    storedFileName: "seed_brachial_plexus.pdf",
    filePath: "",
    fileSize: 420000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-01T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "cardiac_cycle_wiggers.pdf",
    storedFileName: "seed_cardiac_cycle.pdf",
    filePath: "",
    fileSize: 580000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-05T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "glycolysis_gluconeogenesis.pdf",
    storedFileName: "seed_glycolysis.pdf",
    filePath: "",
    fileSize: 390000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-09T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "renal_clearance_summary.pdf",
    storedFileName: "seed_renal_clearance.pdf",
    filePath: "",
    fileSize: 510000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-12T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "cranial_nerves_table.pdf",
    storedFileName: "seed_cranial_nerves.pdf",
    filePath: "",
    fileSize: 640000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-15T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "acid_base_abg_chart.pdf",
    storedFileName: "seed_acid_base.pdf",
    filePath: "",
    fileSize: 480000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-20T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "epithelium_histology_guide.pdf",
    storedFileName: "seed_epithelium.pdf",
    filePath: "",
    fileSize: 720000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-22T10:00:00Z",
    status: "approved",
    prog: "MBBS"
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
    originalFileName: "respiratory_membrane_diffusion.pdf",
    storedFileName: "seed_respiratory_membrane.pdf",
    filePath: "",
    fileSize: 490000,
    mimeType: "application/pdf",
    fileUrl: "",
    uploadedByUserId: "seed-admin-1",
    uploadedByEmail: "sifatislam.cmc67@gmail.com",
    uploadTimestamp: "2026-09-28T10:00:00Z",
    status: "approved",
    prog: "MBBS"
  }
];

// Load or initialize database
function loadDatabase(): AppDatabase {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (Array.isArray(data.users) && Array.isArray(data.sessions) && Array.isArray(data.notes)) {
        return data;
      }
    } catch (e) {
      console.error('Error reading database file, recreating:', e);
    }
  }

  // Initial seed
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
    notes: [...SEED_APPROVED_NOTES]
  };

  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(db: AppDatabase): void {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// Memory cache + auto sync
let db: AppDatabase = loadDatabase();

// Clean up expired sessions periodically (older than 30 days)
function cleanExpiredSessions() {
  const now = Date.now();
  const valid = db.sessions.filter(s => s.expiresAt > now);
  if (valid.length !== db.sessions.length) {
    db.sessions = valid;
    saveDatabase(db);
  }
}
setInterval(cleanExpiredSessions, 1000 * 60 * 60);

// Sanitize user for public response (no passwords/salts)
function sanitizeUser(user: StoredUser) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    collegeName: user.collegeName,
    batch: user.batch,
    roll: user.roll || '',
    role: user.role,
    createdAt: user.createdAt
  };
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `note_${timestamp}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25 MB max
  },
  fileFilter: (_req, file, cb) => {
    const allowedMime = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp'
    ];
    if (allowedMime.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload a PDF document or an image file (PNG, JPG, WEBP).'));
    }
  }
});

// Authentication Middleware
interface AuthenticatedRequest extends Request {
  user?: StoredUser;
}

function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.substring(7).trim();
  if (!token) return next();

  const now = Date.now();
  const session = db.sessions.find(s => s.token === token && s.expiresAt > now);
  if (!session) return next();

  const user = db.users.find(u => u.id === session.userId);
  if (user) {
    req.user = user;
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

// App Initialization
async function startServer() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(authMiddleware);

  // ===================== AUTHENTICATION API =====================

  // POST /api/auth/register
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { fullName, email, collegeName, batch, roll, password } = req.body;

      if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
        return res.status(400).json({ error: 'Full Name is required.' });
      }
      if (!collegeName || typeof collegeName !== 'string' || !collegeName.trim()) {
        return res.status(400).json({ error: 'Medical College Name is required.' });
      }
      if (!batch || typeof batch !== 'string' || !batch.trim()) {
        return res.status(400).json({ error: 'Batch / Session is required (e.g. CMC-67).' });
      }
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }
      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check duplicate email
      const existing = db.users.find(u => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return res.status(409).json({ error: 'An account with this email address already exists. Please sign in.' });
      }

      // Check role assignment
      const isAdmin =
        normalizedEmail === 'sifatislam.cmc67@gmail.com' ||
        normalizedEmail.startsWith('admin@cmc.');

      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashPassword(password, salt);

      const newUser: StoredUser = {
        id: `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
        fullName: fullName.trim(),
        email: normalizedEmail,
        collegeName: collegeName.trim(),
        batch: batch.trim(),
        roll: roll ? String(roll).trim() : '',
        role: isAdmin ? 'admin' : 'student',
        passwordHash,
        salt,
        createdAt: new Date().toISOString()
      };

      db.users.push(newUser);

      // Create session (valid 30 days)
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
      db.sessions.push({
        token,
        userId: newUser.id,
        createdAt: new Date().toISOString(),
        expiresAt
      });

      saveDatabase(db);

      return res.status(201).json({
        success: true,
        user: sanitizeUser(newUser),
        token,
        message: 'Registration successful.'
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Internal server error during registration.' });
    }
  });

  // POST /api/auth/login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Both email and password are required.' });
      }

      const normalizedEmail = String(email).trim().toLowerCase();
      const user = db.users.find(u => u.email.toLowerCase() === normalizedEmail);

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isMatch = verifyPassword(String(password), user.salt, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Create session (valid 30 days)
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
      db.sessions.push({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
        expiresAt
      });

      saveDatabase(db);

      return res.status(200).json({
        success: true,
        user: sanitizeUser(user),
        token,
        message: 'Signed in successfully.'
      });
    } catch (err: any) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  });

  // GET /api/auth/me
  app.get('/api/auth/me', (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated or session expired.' });
    }
    return res.status(200).json({
      success: true,
      user: sanitizeUser(req.user)
    });
  });

  // POST /api/auth/logout
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

  // POST /api/notes/upload (Multipart with Multer)
  app.post('/api/notes/upload', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    upload.single('file')(req, res, (err: any) => {
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

        const { fullName, collegeName, title, subject, topic, description, prog } = req.body;

        // Dedicated field validations
        if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
          // Remove uploaded file if validation fails
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

        // If uploaded by admin (Sifat Islam), it is auto-approved; otherwise pending review
        const status = user.role === 'admin' ? 'approved' : 'pending';

        const newNote: StoredNote = {
          id: noteId,
          fullName: fullName.trim(),
          collegeName: collegeName.trim(),
          title: title.trim(),
          subject: subject.trim(),
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
          prog: prog === 'BDS' ? 'BDS' : 'MBBS',
          kind: file.mimetype.startsWith('image/') ? 'Diagram' : 'Notes'
        };

        db.notes.unshift(newNote);
        saveDatabase(db);

        return res.status(201).json({
          success: true,
          note: newNote,
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

  // GET /api/notes
  // Public users: see all approved notes
  // Authenticated users: see all approved notes + their own (pending/rejected) notes with status badges
  // Admin: sees all notes (including all pending)
  app.get('/api/notes', (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user;
      let notesToReturn: StoredNote[];

      if (user && user.role === 'admin') {
        notesToReturn = db.notes;
      } else if (user) {
        notesToReturn = db.notes.filter(
          n => n.status === 'approved' || n.uploadedByUserId === user.id
        );
      } else {
        notesToReturn = db.notes.filter(n => n.status === 'approved');
      }

      return res.status(200).json({
        success: true,
        notes: notesToReturn
      });
    } catch (err: any) {
      console.error('Error fetching notes:', err);
      return res.status(500).json({ error: 'Failed to retrieve notes archive.' });
    }
  });

  // GET /api/notes/:id/file
  // Streams the stored file to the browser
  app.get('/api/notes/:id/file', (req: AuthenticatedRequest, res: Response) => {
    try {
      const note = db.notes.find(n => n.id === req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note record not found.' });
      }

      // Check access permission
      const user = req.user;
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
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${encodeURIComponent(note.originalFileName)}"`
      );
      res.setHeader('Content-Length', note.fileSize);

      const stream = fs.createReadStream(note.filePath);
      stream.pipe(res);
    } catch (err: any) {
      console.error('Error streaming file:', err);
      return res.status(500).json({ error: 'Error reading file from storage.' });
    }
  });

  // PATCH /api/notes/:id/status (Admin moderation)
  app.patch('/api/notes/:id/status', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Administrator privileges required for note moderation.' });
      }

      const { status, moderationNote } = req.body;
      if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ error: 'Invalid moderation status.' });
      }

      const note = db.notes.find(n => n.id === req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note record not found.' });
      }

      note.status = status;
      if (moderationNote) note.moderationNote = String(moderationNote).trim();

      saveDatabase(db);

      return res.status(200).json({
        success: true,
        note,
        message: `Note status updated to ${status}.`
      });
    } catch (err: any) {
      console.error('Moderation error:', err);
      return res.status(500).json({ error: 'Failed to update note status.' });
    }
  });

  // DELETE /api/notes/:id (Delete note by admin or owner)
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

      // Delete file from disk if present
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

  // GET /api/stats (Platform stats)
  app.get('/api/stats', (_req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      totalUsers: db.users.length,
      totalNotes: db.notes.length,
      approvedNotes: db.notes.filter(n => n.status === 'approved').length,
      pendingNotes: db.notes.filter(n => n.status === 'pending').length
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
