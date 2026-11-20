import { ProfessionalExamId } from '../types';

export const VIVA_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyfz3z-DbyTrwa7b37JLjA-QKuqqc_b6xdz8ZJGTiYUKeNL6fWHQ2NgxSLY7mL7MOjm/exec';

export type VivaExaminerType = 'External' | 'Internal';
export type VivaProfLabel = '1st Prof' | '2nd Prof' | '3rd Prof' | 'Final Prof';
export type VivaApprovalStatus = 'pending' | 'approved' | 'rejected';

export const VIVA_PROF_OPTIONS: VivaProfLabel[] = [
  '1st Prof',
  '2nd Prof',
  '3rd Prof',
  'Final Prof'
];

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
  status: VivaApprovalStatus;
  created_at: string;
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

export function normalizeExaminerType(raw?: string): VivaExaminerType {
  return String(raw || '').trim().toLowerCase() === 'internal' ? 'Internal' : 'External';
}

function isTruthyFlag(val: unknown): boolean {
  return val === true || String(val || '').trim().toLowerCase() === 'true';
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

function mapRawVivaRecord(raw: RawVivaRecord, idx: number, fallbackStatus: VivaApprovalStatus = 'pending'): VivaItem {
  const rawId = raw.id ?? raw.viva_id ?? raw.row_id;
  const normStatus = raw.status !== undefined || raw.is_admin !== undefined || raw.is_bank !== undefined
    ? normalizeVivaStatus(raw.status, raw)
    : fallbackStatus;
  const safeStatus: VivaApprovalStatus =
    normStatus === 'approved'
      ? 'approved'
      : normStatus === 'rejected'
        ? 'rejected'
        : 'pending';

  return {
    id:
      rawId !== undefined && rawId !== null && String(rawId).trim() !== ''
        ? String(rawId).trim()
        : `viva_${idx}_${Date.now()}`,
    prof: normalizeVivaProf(raw.prof),
    subject: String(raw.subject || '').trim() || 'General',
    examiner_type: normalizeExaminerType(raw.examiner_type),
    board_name: String(raw.board_name || '').trim(),
    question: String(raw.question || '').trim(),
    answer_hint: String(raw.answer_hint || '').trim(),
    contributor_name: String(raw.contributor_name || '').trim() || 'Student Contributor',
    contributor_email: String(raw.contributor_email || '').trim(),
    batch: String(raw.batch || '').trim(),
    status: safeStatus,
    created_at: String(raw.created_at || new Date().toISOString())
  };
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
  const desiredStatus: VivaApprovalStatus = payload.status === 'approved' || payload.is_admin ? 'approved' : 'pending';
  const data = await postVivaScript({
    action: 'submit_viva',
    ...payload,
    status: desiredStatus,
    is_admin: Boolean(payload.is_admin)
  });
  const created =
    data.viva ||
    data.item ||
    (!Array.isArray(data.data) ? data.data : undefined);
  if (created) {
    return mapRawVivaRecord(created, 0, desiredStatus);
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
