import { isValidProfId } from '../data/curriculumConfig';
import type { ProfessionalExamId, UserProfile, UserRole } from '../types';

export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyt7nK3VNFjnBGvnRyystbOaYf23zNPIARKicPh_0RLQNV_xgmOFAzqNWmfacIkg2t4tw/exec';

export interface AppsScriptUserRecord {
  id: string;
  full_name: string;
  email: string;
  college_name: string;
  batch: string;
  roll: string;
  role: UserRole;
  preferred_prof?: string | null;
  created_at?: string;
}

export interface AppsScriptRegisterPayload {
  full_name: string;
  email: string;
  password: string;
  college_name: string;
  batch: string;
  roll: string;
  preferred_prof?: string;
}

interface AppsScriptResponse {
  ok?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
  user?: AppsScriptUserRecord;
  users?: AppsScriptUserRecord[];
}

export function mapAppsScriptUser(raw: AppsScriptUserRecord): UserProfile {
  const safeRole: UserRole =
    raw.role === 'admin' || raw.role === 'contributor' ? raw.role : 'student';

  return {
    id: String(raw.id || ''),
    fullName: String(raw.full_name || ''),
    email: String(raw.email || ''),
    collegeName: String(raw.college_name || 'Chittagong Medical College (CMC)'),
    batch: String(raw.batch || ''),
    roll: raw.roll ? String(raw.roll) : '',
    role: safeRole,
    preferredProf: isValidProfId(raw.preferred_prof)
      ? (raw.preferred_prof as ProfessionalExamId)
      : undefined,
    createdAt: raw.created_at ? String(raw.created_at) : undefined
  };
}

async function postAppsScript(payload: Record<string, unknown>): Promise<AppsScriptResponse> {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  let data: AppsScriptResponse;
  try {
    data = JSON.parse(text) as AppsScriptResponse;
  } catch {
    throw new Error('Unexpected response from authentication service.');
  }

  const isSuccess = data.ok === true || (data.ok === undefined && data.success === true);
  if (!res.ok || !isSuccess) {
    throw new Error(data.error || data.message || 'Authentication request failed.');
  }

  return data;
}

export async function appsScriptRegister(
  payload: AppsScriptRegisterPayload
): Promise<UserProfile> {
  const data = await postAppsScript({
    action: 'register',
    full_name: payload.full_name,
    email: payload.email,
    password: payload.password,
    college_name: payload.college_name,
    batch: payload.batch,
    roll: payload.roll,
    preferred_prof: payload.preferred_prof || ''
  });

  if (!data.user) {
    throw new Error('Registration succeeded, but no user profile was returned.');
  }

  return mapAppsScriptUser(data.user);
}

export async function appsScriptLogin(email: string, password: string): Promise<UserProfile> {
  const data = await postAppsScript({
    action: 'login',
    email,
    password
  });

  if (!data.user) {
    throw new Error('Sign in failed: user profile missing from response.');
  }

  return mapAppsScriptUser(data.user);
}

export async function appsScriptListUsers(): Promise<UserProfile[]> {
  const data = await postAppsScript({
    action: 'list_users'
  });

  if (!Array.isArray(data.users)) {
    return [];
  }

  return data.users.map(mapAppsScriptUser);
}

export async function appsScriptUpdateRole(userId: string, role: UserRole): Promise<UserProfile> {
  const data = await postAppsScript({
    action: 'update_role',
    user_id: userId,
    role
  });

  if (!data.user) {
    throw new Error('Role update succeeded, but updated user profile was not returned.');
  }

  return mapAppsScriptUser(data.user);
}
