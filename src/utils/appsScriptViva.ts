import { MEDICAL_COLLEGES_BD } from '../data/archiveHelpers';
import { DEFAULT_SEED_VIVA_ITEMS } from '../data/vivaSeed';
import { ProfessionalExamId } from '../types';
import { fileToBase64 } from './appsScriptArchive';

export const VIVA_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyfz3z-DbyTrwa7b37JLjA-QKuqqc_b6xdz8ZJGTiYUKeNL6fWHQ2NgxSLY7mL7MOjm/exec';

export const DEFAULT_VIVA_COLLEGE = 'Chittagong Medical College';
export const VIVA_OTHER_COLLEGE_OPTION = 'Other Medical College';
export const VIVA_MEDICAL_COLLEGES: string[] = MEDICAL_COLLEGES_BD.filter(
  c => c !== VIVA_OTHER_COLLEGE_OPTION
);
export const MAX_VIVA_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function stripCollegeParenthetical(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function extractCollegeAcronym(name: string): string {
  const m = name.match(/\(([^)]+)\)/);
  return m ? m[1].trim().toLowerCase() : '';
}

export function normalizeVivaCollegeKey(name?: string): string {
  const raw = String(name || '').trim();
  if (!raw) return stripCollegeParenthetical(DEFAULT_VIVA_COLLEGE);
  const lower = raw.toLowerCase();
  if (lower === 'cmc') return 'chittagong medical college';
  if (lower === 'dmc') return 'dhaka medical college';
  const byAcronym = VIVA_MEDICAL_COLLEGES.find(c => extractCollegeAcronym(c) === lower);
  if (byAcronym) return stripCollegeParenthetical(byAcronym);
  return stripCollegeParenthetical(raw);
}

export function vivaCollegesMatch(itemCollege?: string, filterCollege?: string): boolean {
  const filterClean = String(filterCollege || '').trim();
  if (!filterClean || filterClean.toLowerCase() === 'all') return true;
  if (filterClean === '__other__') {
    const itemKey = normalizeVivaCollegeKey(itemCollege);
    return !VIVA_MEDICAL_COLLEGES.some(c => normalizeVivaCollegeKey(c) === itemKey);
  }
  return normalizeVivaCollegeKey(itemCollege) === normalizeVivaCollegeKey(filterClean);
}

export function findMatchingVivaCollegeOption(collegeName?: string): string {
  const clean = String(collegeName || '').trim();
  if (!clean) return VIVA_MEDICAL_COLLEGES[0] || DEFAULT_VIVA_COLLEGE;
  const key = normalizeVivaCollegeKey(clean);
  const match = VIVA_MEDICAL_COLLEGES.find(c => normalizeVivaCollegeKey(c) === key);
  return match || clean;
}

export type VivaExaminerType = 'External' | 'Internal' | 'Suggestion';
export type VivaCategoryType = 'regular' | 'suggestion';
export type VivaFileType = 'pdf' | 'image' | 'link' | 'none';
export type VivaProfLabel = '1st Prof' | '2nd Prof' | '3rd Prof' | 'Final Prof';
export type VivaApprovalStatus = 'pending' | 'approved' | 'rejected';

export const VIVA_PROF_OPTIONS: VivaProfLabel[] = [
  '1st Prof',
  '2nd Prof',
  '3rd Prof',
  'Final Prof'
];

export const VIVA_SESSION_OPTIONS = ['May', 'November', 'January', 'July'] as const;
export const VIVA_YEAR_SUGGESTIONS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'] as const;

export interface VivaItem {
  id: string;
  prof: VivaProfLabel;
  subject: string;
  examiner_type: VivaExaminerType;
  board_name: string;
  question: string;
  answer_hint: string;
  contributor_name: string;
  contributor_email: string;
  batch: string;
  college_name: string;
  session: string;
  year: string;
  viva_type: VivaCategoryType;
  is_suggestion: boolean;
  title?: string;
  file_url?: string;
  file_name?: string;
  mime_type?: string;
  file_type: VivaFileType;
  status: VivaApprovalStatus;
  created_at: string;
  is_seeded?: boolean;
}

export interface SubmitVivaPayload {
  prof: VivaProfLabel;
  subject: string;
  examiner_type: VivaExaminerType;
  board_name: string;
  question: string;
  answer_hint: string;
  contributor_name: string;
  contributor_email: string;
  batch: string;
  college_name?: string;
  session: string;
  year: string;
  viva_type: VivaCategoryType;
  is_suggestion?: boolean;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_base64?: string;
  file_url?: string;
  file_type?: VivaFileType;
  status?: 'pending' | 'approved';
  is_admin?: boolean;
}

interface RawVivaRecord {
  id?: string | number;
  viva_id?: string | number;
  row_id?: string | number;
  prof?: string;
  subject?: string;
  examiner_type?: string;
  board_name?: string;
  question?: string;
  answer_hint?: string;
  contributor_name?: string;
  contributor_email?: string;
  batch?: string;
  college_name?: string;
  session?: string;
  year?: string | number;
  viva_type?: string;
  category?: string;
  is_suggestion?: boolean | string;
  title?: string;
  file_url?: string;
  pdf_url?: string;
  drive_url?: string;
  document_url?: string;
  file_name?: string;
  pdf_label?: string;
  mime_type?: string;
  file_type?: string;
  status?: string;
  is_admin?: boolean | string;
  is_bank?: boolean | string;
  created_at?: string;
}

interface VivaScriptResponse {
  ok?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
  id?: string | number;
  viva?: RawVivaRecord;
  viva_list?: RawVivaRecord[];
  vivas?: RawVivaRecord[];
  items?: RawVivaRecord[];
  questions?: RawVivaRecord[];
  item?: RawVivaRecord;
  data?: RawVivaRecord[] | RawVivaRecord;
}

export { fileToBase64 as vivaFileToBase64 };

export function profIdToVivaProf(profId: ProfessionalExamId): VivaProfLabel {
  if (profId === 'Second Professional') return '2nd Prof';
  if (profId === 'Third Professional') return '3rd Prof';
  if (profId === 'Fourth Professional') return 'Final Prof';
  return '1st Prof';
}

export function vivaProfToProfId(vivaProf: VivaProfLabel): ProfessionalExamId {
  if (vivaProf === '2nd Prof') return 'Second Professional';
  if (vivaProf === '3rd Prof') return 'Third Professional';
  if (vivaProf === 'Final Prof') return 'Fourth Professional';
  return 'First Professional';
}

export function normalizeVivaProf(raw?: string): VivaProfLabel {
  const s = String(raw || '').trim().toLowerCase();
  if (s.includes('2nd') || s.includes('second')) return '2nd Prof';
  if (s.includes('3rd') || s.includes('third')) return '3rd Prof';
  if (s.includes('final') || s.includes('4th') || s.includes('fourth')) return 'Final Prof';
  return '1st Prof';
}

function cleanStr(val: unknown): string {
  const s = val !== undefined && val !== null ? String(val).trim() : '';
  return s === 'undefined' || s === 'null' ? '' : s;
}

function isTruthyFlag(val: unknown): boolean {
  return val === true || String(val || '').trim().toLowerCase() === 'true';
}

export function normalizeExaminerType(raw?: string): VivaExaminerType {
  const lower = String(raw || '').trim().toLowerCase();
  if (lower === 'internal') return 'Internal';
  if (lower === 'suggestion' || lower.includes('viva suggestion')) return 'Suggestion';
  return 'External';
}

export function resolveVivaSuggestionFlag(raw: {
  examiner_type?: string;
  viva_type?: string;
  category?: string;
  is_suggestion?: unknown;
}): boolean {
  if (isTruthyFlag(raw.is_suggestion)) return true;
  const vt = String(raw.viva_type || '').trim().toLowerCase();
  const cat = String(raw.category || '').trim().toLowerCase();
  const et = String(raw.examiner_type || '').trim().toLowerCase();
  return (
    vt === 'suggestion' ||
    vt.includes('viva_suggestion') ||
    vt.includes('viva suggestion') ||
    cat === 'suggestion' ||
    cat.includes('viva suggestion') ||
    et === 'suggestion' ||
    et.includes('viva suggestion')
  );
}

export function inferVivaFileType(raw: {
  file_type?: string;
  mime_type?: string;
  file_url?: string;
  file_name?: string;
}): VivaFileType {
  const ft = cleanStr(raw.file_type).toLowerCase();
  const mt = cleanStr(raw.mime_type).toLowerCase();
  const url = cleanStr(raw.file_url);
  const name = cleanStr(raw.file_name);

  if (ft === 'image' || ft === 'images' || mt.startsWith('image/')) return 'image';
  if (ft === 'pdf' || mt === 'application/pdf') return 'pdf';
  if (ft === 'link' || ft === 'drive_link') {
    if (/\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(url) || /\.(png|jpe?g|webp|gif)$/i.test(name)) {
      return 'image';
    }
    if (/\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(name)) {
      return 'pdf';
    }
    return 'link';
  }
  if (ft === 'none') return 'none';

  if (/\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(url) || /\.(png|jpe?g|webp|gif)$/i.test(name)) {
    return 'image';
  }
  if (/\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(name)) {
    return 'pdf';
  }
  if (url) return 'link';
  return 'none';
}

export function isVivaImageItem(item: {
  file_type?: string;
  mime_type?: string;
  file_url?: string;
  file_name?: string;
}): boolean {
  if (item.file_type === 'image') return true;
  if (cleanStr(item.mime_type).toLowerCase().startsWith('image/')) return true;
  const url = cleanStr(item.file_url);
  const name = cleanStr(item.file_name);
  return /\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(url) || /\.(png|jpe?g|webp|gif)$/i.test(name);
}

export function normalizeVivaStatus(
  rawStatus?: string,
  rawRecord?: { is_admin?: unknown; is_bank?: unknown }
): 'pending' | 'approved' | 'rejected' | 'deleted' {
  const s = String(rawStatus || '').trim().toLowerCase();
  if (s === 'approved' || s === 'published' || s === 'verified') return 'approved';
  if (s === 'rejected') return 'rejected';
  if (s === 'deleted') return 'deleted';
  if (s === 'pending') return 'pending';
  if (isTruthyFlag(rawRecord?.is_admin) || isTruthyFlag(rawRecord?.is_bank)) {
    return 'approved';
  }
  // Backward compatibility: legacy Viva_Questions rows without a status value default to approved
  return s === '' ? 'approved' : 'pending';
}

function mapRawVivaRecord(
  raw: RawVivaRecord,
  idx: number,
  fallbackStatus: VivaApprovalStatus = 'approved'
): VivaItem {
  const rawId = raw.id ?? raw.viva_id ?? raw.row_id;
  const normStatus =
    raw.status !== undefined || raw.is_admin !== undefined || raw.is_bank !== undefined
      ? normalizeVivaStatus(raw.status, raw)
      : fallbackStatus;
  const safeStatus: VivaApprovalStatus =
    normStatus === 'approved'
      ? 'approved'
      : normStatus === 'rejected'
        ? 'rejected'
        : 'pending';

  const examinerType = normalizeExaminerType(raw.examiner_type);
  const isSuggestion = resolveVivaSuggestionFlag(raw);
  const vivaType: VivaCategoryType = isSuggestion ? 'suggestion' : 'regular';

  const fileUrl = cleanStr(raw.file_url || raw.pdf_url || raw.drive_url || raw.document_url);
  const fileName = cleanStr(raw.file_name || raw.pdf_label);
  const mimeType = cleanStr(raw.mime_type);
  const fileType = inferVivaFileType({
    file_type: raw.file_type,
    mime_type: mimeType,
    file_url: fileUrl,
    file_name: fileName
  });

  const cleanTitle = cleanStr(raw.title);

  return {
    id:
      rawId !== undefined && rawId !== null && String(rawId).trim() !== ''
        ? String(rawId).trim()
        : `viva_${idx}_${Date.now()}`,
    prof: normalizeVivaProf(raw.prof),
    subject: cleanStr(raw.subject) || 'General',
    examiner_type: examinerType,
    board_name: cleanStr(raw.board_name),
    question: cleanStr(raw.question),
    answer_hint: cleanStr(raw.answer_hint),
    contributor_name: cleanStr(raw.contributor_name) || 'Student Contributor',
    contributor_email: cleanStr(raw.contributor_email),
    batch: cleanStr(raw.batch),
    college_name: cleanStr(raw.college_name) || DEFAULT_VIVA_COLLEGE,
    session: cleanStr(raw.session),
    year: cleanStr(raw.year),
    viva_type: vivaType,
    is_suggestion: isSuggestion,
    title: cleanTitle || undefined,
    file_url: fileUrl || undefined,
    file_name: fileName || undefined,
    mime_type: mimeType || undefined,
    file_type: fileType,
    status: safeStatus,
    created_at: cleanStr(raw.created_at) || new Date().toISOString()
  };
}

export function mergeVivaWithSeed(remoteList: VivaItem[]): VivaItem[] {
  if (!Array.isArray(remoteList) || remoteList.length === 0) {
    return [...DEFAULT_SEED_VIVA_ITEMS];
  }

  const normalizeKey = (s?: string) => String(s || '').trim().toLowerCase();

  const matchesSeed = (remote: VivaItem, seed: VivaItem) => {
    if (normalizeKey(remote.id) === normalizeKey(seed.id)) return true;
    const sameSubject = normalizeKey(remote.subject) === normalizeKey(seed.subject);
    const sameContributor =
      normalizeKey(remote.contributor_name).includes('fahad') &&
      normalizeKey(seed.contributor_name).includes('fahad');
    const sameTitle =
      Boolean(remote.title && seed.title) &&
      normalizeKey(remote.title) === normalizeKey(seed.title);
    if (sameTitle) return true;
    return sameSubject && sameContributor && (remote.is_suggestion || Boolean(remote.file_url));
  };

  const merged = remoteList.map(remote => {
    const matchedSeed = DEFAULT_SEED_VIVA_ITEMS.find(seed => matchesSeed(remote, seed));
    if (!matchedSeed) return remote;
    const resolvedFileUrl = remote.file_url || matchedSeed.file_url;
    const resolvedFileName = remote.file_name || matchedSeed.file_name;
    const resolvedFileType =
      remote.file_type && remote.file_type !== 'none'
        ? remote.file_type
        : matchedSeed.file_type;

    return {
      ...remote,
      title: remote.title || matchedSeed.title,
      file_url: resolvedFileUrl,
      file_name: resolvedFileName,
      mime_type: remote.mime_type || matchedSeed.mime_type,
      file_type: resolvedFileType
    };
  });

  for (const seed of DEFAULT_SEED_VIVA_ITEMS) {
    const alreadyPresent = merged.some(item => matchesSeed(item, seed));
    if (!alreadyPresent) {
      merged.push(seed);
    }
  }

  return merged;
}

async function postVivaScript(payload: Record<string, unknown>): Promise<VivaScriptResponse> {
  const res = await fetch(VIVA_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  let data: VivaScriptResponse;
  try {
    data = JSON.parse(text) as VivaScriptResponse;
  } catch {
    throw new Error('Unexpected response from Viva archive service.');
  }

  const isSuccess = data.ok === true || (data.ok === undefined && data.success === true);
  if (!res.ok || !isSuccess) {
    throw new Error(data.error || data.message || 'Viva request failed.');
  }

  return data;
}

export async function listVivaFromAppsScript(options?: {
  includeUnapproved?: boolean;
}): Promise<VivaItem[]> {
  const data = await postVivaScript({ action: 'list_viva' });
  const rawList = Array.isArray(data.items)
    ? data.items
    : Array.isArray(data.viva_list)
      ? data.viva_list
      : Array.isArray(data.vivas)
        ? data.vivas
        : Array.isArray(data.questions)
          ? data.questions
          : Array.isArray(data.data)
            ? data.data
            : data.viva
              ? [data.viva]
              : [];

  return rawList
    .filter(r => {
      const hasContent =
        Boolean(cleanStr(r.question)) ||
        Boolean(cleanStr(r.file_url || r.pdf_url || r.drive_url || r.document_url)) ||
        Boolean(cleanStr(r.title));
      if (!hasContent) return false;
      const s = normalizeVivaStatus(r.status, r);
      if (s === 'deleted') return false;
      if (options?.includeUnapproved) return true;
      return s === 'approved';
    })
    .map((r, idx) => mapRawVivaRecord(r, idx));
}

export async function submitVivaToAppsScript(payload: SubmitVivaPayload): Promise<VivaItem> {
  const desiredStatus: VivaApprovalStatus = payload.status || 'approved';
  const isSuggestion = Boolean(
    payload.is_suggestion ||
      payload.viva_type === 'suggestion' ||
      payload.examiner_type === 'Suggestion'
  );
  const vivaType: VivaCategoryType = isSuggestion ? 'suggestion' : 'regular';
  const collegeName = cleanStr(payload.college_name) || DEFAULT_VIVA_COLLEGE;
  const cleanFileUrl = cleanStr(payload.file_url);
  const cleanFileName = cleanStr(payload.file_name);
  const cleanMimeType = cleanStr(payload.mime_type);
  const fileType: VivaFileType =
    payload.file_type ||
    inferVivaFileType({
      mime_type: cleanMimeType,
      file_url: cleanFileUrl,
      file_name: cleanFileName
    });

  const requestBody: Record<string, unknown> = {
    action: 'submit_viva',
    prof: payload.prof,
    subject: payload.subject,
    examiner_type: payload.examiner_type,
    board_name: payload.board_name,
    question: payload.question,
    answer_hint: payload.answer_hint,
    contributor_name: payload.contributor_name,
    contributor_email: payload.contributor_email,
    batch: payload.batch,
    college_name: collegeName,
    session: cleanStr(payload.session),
    year: cleanStr(payload.year),
    viva_type: vivaType,
    file_name: cleanFileName,
    mime_type: cleanMimeType,
    file_base64: payload.file_base64 || '',
    file_url: cleanFileUrl,
    file_type: fileType,
    status: desiredStatus
  };

  if (cleanStr(payload.title)) {
    requestBody.title = cleanStr(payload.title);
  }

  const data = await postVivaScript(requestBody);
  const created =
    data.viva ||
    data.item ||
    (!Array.isArray(data.data) ? data.data : undefined);

  if (created) {
    return mapRawVivaRecord(
      {
        ...created,
        prof: created.prof || payload.prof,
        subject: created.subject || payload.subject,
        examiner_type: created.examiner_type || payload.examiner_type,
        board_name: created.board_name !== undefined ? created.board_name : payload.board_name,
        question: created.question !== undefined ? created.question : payload.question,
        answer_hint: created.answer_hint !== undefined ? created.answer_hint : payload.answer_hint,
        contributor_name: created.contributor_name || payload.contributor_name,
        contributor_email:
          created.contributor_email !== undefined
            ? created.contributor_email
            : payload.contributor_email,
        batch: created.batch !== undefined ? created.batch : payload.batch,
        college_name: created.college_name || collegeName,
        session: created.session !== undefined ? created.session : payload.session,
        year: created.year !== undefined ? created.year : payload.year,
        viva_type: created.viva_type || vivaType,
        is_suggestion:
          created.is_suggestion !== undefined ? created.is_suggestion : isSuggestion,
        title: created.title !== undefined ? created.title : payload.title,
        file_url: created.file_url || created.pdf_url || cleanFileUrl,
        file_name: created.file_name || cleanFileName,
        mime_type: created.mime_type || cleanMimeType,
        file_type: created.file_type || fileType
      },
      0,
      desiredStatus
    );
  }

  return {
    id: String(data.id || `viva_${Date.now()}`),
    prof: payload.prof,
    subject: payload.subject,
    examiner_type: payload.examiner_type,
    board_name: payload.board_name,
    question: payload.question,
    answer_hint: payload.answer_hint,
    contributor_name: payload.contributor_name,
    contributor_email: payload.contributor_email,
    batch: payload.batch,
    college_name: collegeName,
    session: cleanStr(payload.session),
    year: cleanStr(payload.year),
    viva_type: vivaType,
    is_suggestion: isSuggestion,
    title: cleanStr(payload.title) || undefined,
    file_url: cleanFileUrl || undefined,
    file_name: cleanFileName || undefined,
    mime_type: cleanMimeType || undefined,
    file_type: fileType,
    status: desiredStatus,
    created_at: new Date().toISOString()
  };
}

export async function updateVivaStatusFromAppsScript(
  id: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  const cleanId = String(id || '').trim();
  if (!cleanId) {
    throw new Error('Missing Viva ID for status update.');
  }
  try {
    await postVivaScript({
      action: 'update_status',
      id: cleanId,
      status
    });
  } catch (err: any) {
    const msg = String(err?.message || '').toLowerCase();
    if (msg.includes('unknown action') || msg.includes('invalid action')) {
      await postVivaScript({
        action: 'update_viva_status',
        id: cleanId,
        status
      });
      return;
    }
    throw err;
  }
}

export async function deleteVivaFromAppsScript(id: string): Promise<void> {
  const cleanId = String(id || '').trim();
  if (!cleanId) {
    throw new Error('Missing Viva ID for deletion.');
  }
  await postVivaScript({
    action: 'delete_viva',
    id: cleanId
  });
}
