import { DEFAULT_SEED_VIVA_ITEMS } from '../data/vivaSeed';
import { ProfessionalExamId } from '../types';

export const VIVA_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyfz3z-DbyTrwa7b37JLjA-QKuqqc_b6xdz8ZJGTiYUKeNL6fWHQ2NgxSLY7mL7MOjm/exec';

export type VivaExaminerType = 'External' | 'Internal' | 'Suggestion';
export type VivaCategoryType = 'board_question' | 'suggestion';
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
  viva_type: VivaCategoryType;
  is_suggestion: boolean;
  board_name: string;
  session: string;
  year: string;
  title?: string;
  question: string;
  answer_hint: string;
  pdf_url?: string;
  pdf_label?: string;
  contributor_name: string;
  contributor_email: string;
  batch: string;
  status: VivaApprovalStatus;
  created_at: string;
  is_seeded?: boolean;
}

export interface SubmitVivaPayload {
  prof: VivaProfLabel;
  subject: string;
  examiner_type: VivaExaminerType;
  viva_type?: VivaCategoryType;
  is_suggestion?: boolean;
  board_name: string;
  session?: string;
  year?: string;
  title?: string;
  question: string;
  answer_hint: string;
  pdf_url?: string;
  contributor_name: string;
  contributor_email: string;
  batch: string;
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
  viva_type?: string;
  category?: string;
  is_suggestion?: boolean | string;
  board_name?: string;
  session?: string;
  year?: string | number;
  title?: string;
  question?: string;
  answer_hint?: string;
  pdf_url?: string;
  file_url?: string;
  drive_url?: string;
  document_url?: string;
  pdf_label?: string;
  contributor_name?: string;
  contributor_email?: string;
  batch?: string;
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
  return 'pending';
}

function mapRawVivaRecord(
  raw: RawVivaRecord,
  idx: number,
  fallbackStatus: VivaApprovalStatus = 'pending'
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
  const vivaType: VivaCategoryType = isSuggestion ? 'suggestion' : 'board_question';

  const rawYear =
    raw.year !== undefined && raw.year !== null ? String(raw.year).trim() : '';
  const cleanYear = rawYear === 'undefined' || rawYear === 'null' ? '' : rawYear;
  const rawSession = String(raw.session || '').trim();
  const cleanSession = rawSession === 'undefined' || rawSession === 'null' ? '' : rawSession;

  const rawTitle = String(raw.title || '').trim();
  const cleanTitle = rawTitle === 'undefined' || rawTitle === 'null' ? '' : rawTitle;
  const rawPdfUrl = String(
    raw.pdf_url || raw.file_url || raw.drive_url || raw.document_url || ''
  ).trim();
  const cleanPdfUrl = rawPdfUrl === 'undefined' || rawPdfUrl === 'null' ? '' : rawPdfUrl;
  const rawPdfLabel = String(raw.pdf_label || '').trim();
  const cleanPdfLabel = rawPdfLabel === 'undefined' || rawPdfLabel === 'null' ? '' : rawPdfLabel;

  return {
    id:
      rawId !== undefined && rawId !== null && String(rawId).trim() !== ''
        ? String(rawId).trim()
        : `viva_${idx}_${Date.now()}`,
    prof: normalizeVivaProf(raw.prof),
    subject: String(raw.subject || '').trim() || 'General',
    examiner_type: examinerType,
    viva_type: vivaType,
    is_suggestion: isSuggestion,
    board_name: String(raw.board_name || '').trim(),
    session: cleanSession,
    year: cleanYear,
    title: cleanTitle || undefined,
    question: String(raw.question || '').trim(),
    answer_hint: String(raw.answer_hint || '').trim(),
    pdf_url: cleanPdfUrl || undefined,
    pdf_label: cleanPdfLabel || undefined,
    contributor_name: String(raw.contributor_name || '').trim() || 'Student Contributor',
    contributor_email: String(raw.contributor_email || '').trim(),
    batch: String(raw.batch || '').trim(),
    status: safeStatus,
    created_at: String(raw.created_at || new Date().toISOString())
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
    return sameSubject && sameContributor && (remote.is_suggestion || Boolean(remote.pdf_url));
  };

  // Enrich matching remote records with seed pdf_url/title fallback if omitted in sheet
  const merged = remoteList.map(remote => {
    const matchedSeed = DEFAULT_SEED_VIVA_ITEMS.find(seed => matchesSeed(remote, seed));
    if (!matchedSeed) return remote;
    return {
      ...remote,
      title: remote.title || matchedSeed.title,
      pdf_url: remote.pdf_url || matchedSeed.pdf_url,
      pdf_label: remote.pdf_label || matchedSeed.pdf_label
    };
  });

  // Append any seed entries not already represented in the remote sheet
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
  const rawList = Array.isArray(data.viva_list)
    ? data.viva_list
    : Array.isArray(data.vivas)
      ? data.vivas
      : Array.isArray(data.items)
        ? data.items
        : Array.isArray(data.questions)
          ? data.questions
          : Array.isArray(data.data)
            ? data.data
            : data.viva
              ? [data.viva]
              : [];

  return rawList
    .filter(r => {
      if (!String(r.question || '').trim()) return false;
      const s = normalizeVivaStatus(r.status, r);
      if (s === 'deleted') return false;
      if (options?.includeUnapproved) return true;
      return s === 'approved';
    })
    .map((r, idx) => mapRawVivaRecord(r, idx));
}

export async function submitVivaToAppsScript(payload: SubmitVivaPayload): Promise<VivaItem> {
  const desiredStatus: VivaApprovalStatus =
    payload.status === 'approved' || payload.is_admin ? 'approved' : 'pending';
  const isSuggestion = Boolean(
    payload.is_suggestion ||
      payload.viva_type === 'suggestion' ||
      payload.examiner_type === 'Suggestion'
  );
  const vivaType: VivaCategoryType = isSuggestion ? 'suggestion' : 'board_question';

  const requestBody = {
    action: 'submit_viva',
    prof: payload.prof,
    subject: payload.subject,
    examiner_type: payload.examiner_type,
    viva_type: vivaType,
    is_suggestion: isSuggestion,
    board_name: payload.board_name,
    session: (payload.session || '').trim(),
    year: (payload.year || '').trim(),
    title: (payload.title || '').trim(),
    question: payload.question,
    answer_hint: payload.answer_hint,
    pdf_url: (payload.pdf_url || '').trim(),
    contributor_name: payload.contributor_name,
    contributor_email: payload.contributor_email,
    batch: payload.batch,
    status: desiredStatus,
    is_admin: Boolean(payload.is_admin)
  };

  const data = await postVivaScript(requestBody);
  const created =
    data.viva ||
    data.item ||
    (!Array.isArray(data.data) ? data.data : undefined);

  if (created) {
    return mapRawVivaRecord(
      {
        ...requestBody,
        ...created,
        viva_type: created.viva_type || requestBody.viva_type,
        is_suggestion:
          created.is_suggestion !== undefined ? created.is_suggestion : requestBody.is_suggestion,
        session: created.session !== undefined ? created.session : requestBody.session,
        year: created.year !== undefined ? created.year : requestBody.year,
        title: created.title !== undefined ? created.title : requestBody.title,
        pdf_url: created.pdf_url !== undefined ? created.pdf_url : requestBody.pdf_url
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
    viva_type: vivaType,
    is_suggestion: isSuggestion,
    board_name: payload.board_name,
    session: requestBody.session,
    year: requestBody.year,
    title: requestBody.title || undefined,
    question: payload.question,
    answer_hint: payload.answer_hint,
    pdf_url: requestBody.pdf_url || undefined,
    contributor_name: payload.contributor_name,
    contributor_email: payload.contributor_email,
    batch: payload.batch,
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
  await postVivaScript({
    action: 'update_viva_status',
    id: cleanId,
    status
  });
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
