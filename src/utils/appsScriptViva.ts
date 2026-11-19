import { ProfessionalExamId } from '../types';

export const VIVA_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyfz3z-DbyTrwa7b37JLjA-QKuqqc_b6xdz8ZJGTiYUKeNL6fWHQ2NgxSLY7mL7MOjm/exec';

export type VivaExaminerType = 'External' | 'Internal';
export type VivaProfLabel = '1st Prof' | '2nd Prof' | '3rd Prof' | 'Final Prof';

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
}

interface RawVivaRecord {
  id?: string;
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
  created_at?: string;
}

interface VivaScriptResponse {
  ok?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
  id?: string;
  viva?: RawVivaRecord;
  vivas?: RawVivaRecord[];
  items?: RawVivaRecord[];
  questions?: RawVivaRecord[];
  data?: RawVivaRecord[];
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

function mapRawVivaRecord(raw: RawVivaRecord, idx: number): VivaItem {
  return {
    id: String(raw.id || `viva_${idx}_${Date.now()}`),
    prof: normalizeVivaProf(raw.prof),
    subject: String(raw.subject || '').trim() || 'General',
    examiner_type: normalizeExaminerType(raw.examiner_type),
    board_name: String(raw.board_name || '').trim(),
    question: String(raw.question || '').trim(),
    answer_hint: String(raw.answer_hint || '').trim(),
    contributor_name: String(raw.contributor_name || '').trim() || 'Student Contributor',
    contributor_email: String(raw.contributor_email || '').trim(),
    batch: String(raw.batch || '').trim(),
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

export async function listVivaFromAppsScript(): Promise<VivaItem[]> {
  const data = await postVivaScript({ action: 'list_viva' });
  const rawList = data.viva
    ? [data.viva]
    : Array.isArray(data.vivas)
      ? data.vivas
      : Array.isArray(data.items)
        ? data.items
        : Array.isArray(data.questions)
          ? data.questions
          : Array.isArray(data.data)
            ? data.data
            : [];

  return rawList
    .filter(r => {
      const s = String(r.status || '').trim().toLowerCase();
      return s !== 'deleted' && s !== 'rejected' && Boolean(String(r.question || '').trim());
    })
    .map(mapRawVivaRecord);
}

export async function submitVivaToAppsScript(payload: SubmitVivaPayload): Promise<VivaItem> {
  const data = await postVivaScript({
    action: 'submit_viva',
    ...payload
  });
  if (data.viva) {
    return mapRawVivaRecord(data.viva, 0);
  }
  return {
    id: String(data.id || `viva_${Date.now()}`),
    ...payload,
    created_at: new Date().toISOString()
  };
}

export async function deleteVivaFromAppsScript(id: string): Promise<void> {
  await postVivaScript({
    action: 'delete_viva',
    id
  });
}
