import { isValidProfId } from '../data/curriculumConfig';
import type {
  ProfessionalExamId,
  PublishedPaper,
  QuestionSubmission,
  SubmissionCategory,
  SubmissionMethod,
  SubmissionStatus,
  UploadedItem
} from '../types';

export const ARCHIVE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwSkWsTUIKA-B3v3O6uCS4sXF_9nBiNWmg7XVR_AhektgNIAFiER5AelW-WZXKUN8jw/exec';

export interface AppsScriptPaperRecord {
  id: string;
  title?: string;
  prof?: string;
  college_name?: string;
  exam_name?: string;
  subject?: string;
  paper?: string;
  topic?: string;
  year?: string | number;
  session?: string;
  batch?: string;
  contributor_name?: string;
  contributor_email?: string;
  description?: string;
  file_url?: string;
  file_name?: string;
  mime_type?: string;
  file_type?: string;
  status?: string;
  created_at?: string;
}

export interface AppsScriptNoteRecord {
  id: string;
  title?: string;
  prof?: string;
  college_name?: string;
  subject?: string;
  paper?: string;
  topic?: string;
  contributor_name?: string;
  contributor_email?: string;
  description?: string;
  file_url?: string;
  file_name?: string;
  mime_type?: string;
  file_type?: string;
  status?: string;
  created_at?: string;
}

export interface SubmitPaperPayload {
  title: string;
  prof: string;
  college_name: string;
  exam_name: string;
  subject: string;
  paper: string;
  topic: string;
  year: string;
  session: string;
  batch: string;
  contributor_name: string;
  contributor_email: string;
  description: string;
  file_url: string;
  file_base64: string;
  file_name: string;
  mime_type: string;
  file_type: string;
}

export interface SubmitNotePayload {
  title: string;
  prof: string;
  college_name: string;
  subject: string;
  paper: string;
  topic: string;
  contributor_name: string;
  contributor_email: string;
  description: string;
  file_url: string;
  file_base64: string;
  file_name: string;
  mime_type: string;
  file_type: string;
}

interface ArchiveScriptResponse {
  ok?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
  paper?: AppsScriptPaperRecord;
  papers?: AppsScriptPaperRecord[];
  note?: AppsScriptNoteRecord;
  notes?: AppsScriptNoteRecord[];
  item?: AppsScriptPaperRecord | AppsScriptNoteRecord;
}

async function postArchiveScript(payload: Record<string, unknown>): Promise<ArchiveScriptResponse> {
  const res = await fetch(ARCHIVE_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  let data: ArchiveScriptResponse;
  try {
    data = JSON.parse(text) as ArchiveScriptResponse;
  } catch {
    throw new Error('Unexpected response from archive service.');
  }

  const isSuccess = data.ok === true || (data.ok === undefined && data.success === true);
  if (!res.ok || !isSuccess) {
    throw new Error(data.error || data.message || 'Archive request failed.');
  }

  return data;
}

export function fileToBase64(file: File): Promise<{
  file_base64: string;
  file_name: string;
  mime_type: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      if (!base64) {
        reject(new Error(`Could not read "${file.name}" as Base64.`));
        return;
      }
      resolve({
        file_base64: base64,
        file_name: file.name,
        mime_type: file.type || 'application/octet-stream'
      });
    };
    reader.onerror = () => reject(new Error(`Failed to read file "${file.name}".`));
    reader.readAsDataURL(file);
  });
}

function normalizeProf(rawProf?: string): ProfessionalExamId {
  if (isValidProfId(rawProf)) return rawProf;
  const lower = String(rawProf || '').toLowerCase();
  if (lower.includes('second') || lower.includes('2nd')) return 'Second Professional';
  if (lower.includes('third') || lower.includes('3rd')) return 'Third Professional';
  if (lower.includes('fourth') || lower.includes('4th') || lower.includes('final')) {
    return 'Fourth Professional';
  }
  return 'First Professional';
}

function normalizeItemStatus(rawStatus?: string): 'pending' | 'approved' | 'rejected' | 'deleted' {
  const s = String(rawStatus || 'pending').trim().toLowerCase();
  if (s === 'approved' || s === 'published' || s === 'verified') return 'approved';
  if (s === 'rejected') return 'rejected';
  if (s === 'deleted') return 'deleted';
  return 'pending';
}

function inferCategory(raw: AppsScriptPaperRecord): SubmissionCategory {
  const text = `${raw.exam_name || ''} ${raw.title || ''}`.toLowerCase();
  if (text.includes('mcq')) return 'MCQ';
  if (text.includes('term')) return 'Term';
  return 'Card';
}

function inferMethod(raw: AppsScriptPaperRecord): SubmissionMethod {
  const ft = String(raw.file_type || '').trim().toLowerCase();
  const mt = String(raw.mime_type || '').trim().toLowerCase();
  if (
    ft === 'drive_link' ||
    ft === 'link' ||
    (!mt && !raw.file_name && raw.file_url?.includes('drive.google.com'))
  ) {
    return 'drive_link';
  }
  if (ft === 'image' || ft === 'images' || mt.startsWith('image/')) {
    return 'images';
  }
  return 'pdf';
}

export function mapAppsScriptPaperToPublished(raw: AppsScriptPaperRecord): PublishedPaper {
  const method = inferMethod(raw);
  const fileUrl = String(raw.file_url || '').trim();
  const isDriveOnly = method === 'drive_link';
  const parsedYear = raw.year !== undefined && raw.year !== null && String(raw.year).trim() !== ''
    ? Number(raw.year)
    : null;

  return {
    id: String(raw.id || ''),
    submissionId: String(raw.id || ''),
    category: inferCategory(raw),
    collegeName: String(raw.college_name || 'Chittagong Medical College (CMC)'),
    professionalExam: normalizeProf(raw.prof),
    examName: String(raw.exam_name || raw.title || 'Question Paper'),
    subject: String(raw.subject || ''),
    paper: String(raw.paper || ''),
    chapter: String(raw.topic || ''),
    year: parsedYear !== null && Number.isFinite(parsedYear) ? parsedYear : null,
    session: String(raw.session || ''),
    collectionType: 'Question Paper',
    description: String(raw.description || ''),
    contributorName: String(raw.contributor_name || 'Student Contributor'),
    contributorBatch: String(raw.batch || ''),
    method,
    files:
      !isDriveOnly && fileUrl
        ? [
            {
              id: `${raw.id || 'file'}_1`,
              originalName: String(raw.file_name || raw.exam_name || raw.title || 'Question Paper'),
              storedName: String(raw.file_name || ''),
              mimeType: String(raw.mime_type || (method === 'images' ? 'image/jpeg' : 'application/pdf')),
              size: 0,
              url: fileUrl
            }
          ]
        : [],
    driveLinks: isDriveOnly && fileUrl ? [fileUrl] : [],
    publishedAt: String(raw.created_at || new Date().toISOString())
  };
}

export function mapAppsScriptPaperToSubmission(raw: AppsScriptPaperRecord): QuestionSubmission {
  const method = inferMethod(raw);
  const fileUrl = String(raw.file_url || '').trim();
  const isDriveOnly = method === 'drive_link';
  const normStatus = normalizeItemStatus(raw.status);
  const displayStatus: SubmissionStatus =
    normStatus === 'approved'
      ? 'Approved'
      : normStatus === 'rejected'
        ? 'Rejected'
        : 'Pending';

  return {
    id: String(raw.id || ''),
    category: inferCategory(raw),
    method,
    collegeName: String(raw.college_name || 'Chittagong Medical College (CMC)'),
    professionalExam: normalizeProf(raw.prof),
    examName: String(raw.exam_name || raw.title || 'Question Paper'),
    subject: String(raw.subject || ''),
    paper: String(raw.paper || ''),
    chapter: String(raw.topic || ''),
    year: raw.year !== undefined && raw.year !== null ? String(raw.year) : '',
    session: String(raw.session || ''),
    collectionType: 'Question Paper',
    description: String(raw.description || ''),
    contributorName: String(raw.contributor_name || 'Student Contributor'),
    contributorBatch: String(raw.batch || ''),
    contributorEmail: raw.contributor_email ? String(raw.contributor_email) : undefined,
    files:
      !isDriveOnly && fileUrl
        ? [
            {
              id: `${raw.id || 'file'}_1`,
              originalName: String(raw.file_name || raw.exam_name || raw.title || 'Attachment'),
              storedName: String(raw.file_name || ''),
              mimeType: String(raw.mime_type || (method === 'images' ? 'image/jpeg' : 'application/pdf')),
              size: 0,
              url: fileUrl
            }
          ]
        : [],
    driveLinks: isDriveOnly && fileUrl ? [fileUrl] : [],
    status: displayStatus,
    createdAt: String(raw.created_at || new Date().toISOString()),
    updatedAt: String(raw.created_at || new Date().toISOString())
  };
}

export function mapAppsScriptNoteToUploadedItem(raw: AppsScriptNoteRecord): UploadedItem {
  const normStatus = normalizeItemStatus(raw.status);
  const safeStatus: 'pending' | 'approved' | 'rejected' =
    normStatus === 'approved'
      ? 'approved'
      : normStatus === 'rejected'
        ? 'rejected'
        : 'pending';
  const mime = String(raw.mime_type || '');
  const ft = String(raw.file_type || '').toLowerCase();
  const kind = ft === 'image' || mime.startsWith('image/') ? 'Diagram' : 'Notes';

  return {
    id: String(raw.id || ''),
    fullName: String(raw.contributor_name || 'Student Contributor'),
    collegeName: String(raw.college_name || 'Chittagong Medical College (CMC)'),
    title: String(raw.title || 'Study Note'),
    professionalExam: normalizeProf(raw.prof),
    subject: String(raw.subject || ''),
    paper: raw.paper ? String(raw.paper) : '',
    topic: String(raw.topic || ''),
    kind,
    description: String(raw.description || ''),
    originalFileName: raw.file_name ? String(raw.file_name) : undefined,
    mimeType: mime || undefined,
    fileUrl: raw.file_url ? String(raw.file_url) : undefined,
    uploadedByEmail: raw.contributor_email ? String(raw.contributor_email) : undefined,
    uploadTimestamp: raw.created_at ? String(raw.created_at) : undefined,
    status: safeStatus,
    prog: 'MBBS'
  };
}

export async function submitPaperToAppsScript(
  payload: SubmitPaperPayload
): Promise<AppsScriptPaperRecord> {
  const data = await postArchiveScript({
    action: 'submit_paper',
    ...payload
  });
  return (
    data.paper ||
    (data.item as AppsScriptPaperRecord) || {
      id: `paper_${Date.now()}`,
      ...payload,
      status: 'pending',
      created_at: new Date().toISOString()
    }
  );
}

export async function listPapersRawFromAppsScript(): Promise<AppsScriptPaperRecord[]> {
  const data = await postArchiveScript({
    action: 'list_papers'
  });
  const list = Array.isArray(data.papers) ? data.papers : [];
  return list.filter(p => normalizeItemStatus(p.status) !== 'deleted');
}

export async function listApprovedPapersFromAppsScript(): Promise<PublishedPaper[]> {
  const rawList = await listPapersRawFromAppsScript();
  return rawList
    .filter(p => normalizeItemStatus(p.status) === 'approved')
    .map(mapAppsScriptPaperToPublished);
}

export async function submitNoteToAppsScript(
  payload: SubmitNotePayload
): Promise<AppsScriptNoteRecord> {
  const data = await postArchiveScript({
    action: 'submit_note',
    ...payload
  });
  return (
    data.note ||
    (data.item as AppsScriptNoteRecord) || {
      id: `note_${Date.now()}`,
      ...payload,
      status: 'pending',
      created_at: new Date().toISOString()
    }
  );
}

export async function listNotesFromAppsScript(): Promise<UploadedItem[]> {
  const data = await postArchiveScript({
    action: 'list_notes'
  });
  const list = Array.isArray(data.notes) ? data.notes : [];
  return list
    .filter(n => normalizeItemStatus(n.status) !== 'deleted')
    .map(mapAppsScriptNoteToUploadedItem);
}

export async function updateArchiveItemStatus(
  type: 'paper' | 'note',
  id: string,
  status: 'approved' | 'rejected' | 'deleted'
): Promise<void> {
  await postArchiveScript({
    action: 'update_item_status',
    type,
    id,
    status
  });
}
