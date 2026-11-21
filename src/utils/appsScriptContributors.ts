import { DEFAULT_SEED_CONTRIBUTORS } from '../data/contributorsSeed';
import type { ContributorRecord } from '../types';
import { ARCHIVE_APPS_SCRIPT_URL } from './appsScriptArchive';
import { APPS_SCRIPT_URL as AUTH_APPS_SCRIPT_URL } from './appsScriptAuth';

export interface RawContributorRecord {
  id?: string | number;
  contributor_id?: string | number;
  name?: string;
  full_name?: string;
  role?: string;
  title?: string;
  batch?: string;
  college?: string;
  college_name?: string;
  contribution?: string;
  note?: string;
  description?: string;
  verified?: boolean | string;
  status?: string;
  added_at?: string;
  addedAt?: string;
  created_at?: string;
}

export interface ContributorInput {
  name: string;
  role?: string;
  batch?: string;
  college?: string;
  contribution?: string;
  verified?: boolean;
}

interface ContributorScriptResponse {
  ok?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
  contributor?: RawContributorRecord;
  item?: RawContributorRecord;
  contributors?: RawContributorRecord[];
  items?: RawContributorRecord[];
  data?: RawContributorRecord[] | RawContributorRecord;
}

function isTruthyFlag(val: unknown): boolean {
  return val === true || String(val || '').trim().toLowerCase() === 'true';
}

function mapRawContributor(raw: RawContributorRecord, idx: number): ContributorRecord | null {
  const name = String(raw.name || raw.full_name || '').trim();
  if (!name) return null;

  const status = String(raw.status || '').trim().toLowerCase();
  if (status === 'deleted') return null;

  const rawId = raw.id ?? raw.contributor_id;
  const id =
    rawId !== undefined && rawId !== null && String(rawId).trim() !== ''
      ? String(rawId).trim()
      : `contrib_${idx}_${Date.now()}`;

  return {
    id,
    name,
    role: String(raw.role || raw.title || 'Contributor').trim(),
    batch: String(raw.batch || '').trim(),
    college: String(raw.college || raw.college_name || 'Chittagong Medical College').trim(),
    contribution: String(
      raw.contribution || raw.note || raw.description || 'Academic Question Archive Contributor'
    ).trim(),
    verified: raw.verified === undefined ? true : isTruthyFlag(raw.verified),
    addedAt: String(raw.added_at || raw.addedAt || raw.created_at || new Date().toISOString())
  };
}

const DELETED_SEED_KEY = 'cmc_deleted_seed_contributors';

function loadDeletedSeedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_SEED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.map(v => String(v).toLowerCase())) : new Set();
  } catch {
    return new Set();
  }
}

function markSeedDeleted(id: string) {
  const isSeed = DEFAULT_SEED_CONTRIBUTORS.some(
    s => s.id.toLowerCase() === id.trim().toLowerCase()
  );
  if (!isSeed) return;
  try {
    const set = loadDeletedSeedIds();
    set.add(id.trim().toLowerCase());
    localStorage.setItem(DELETED_SEED_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

function mergeWithSeedContributors(remoteList: ContributorRecord[]): ContributorRecord[] {
  const deletedSeeds = loadDeletedSeedIds();
  const activeSeeds = DEFAULT_SEED_CONTRIBUTORS.filter(
    s => !deletedSeeds.has(s.id.toLowerCase())
  );

  if (!Array.isArray(remoteList) || remoteList.length === 0) {
    return [...activeSeeds];
  }

  const seenIds = new Set(remoteList.map(c => c.id.toLowerCase()));
  const seenNames = new Set(remoteList.map(c => c.name.trim().toLowerCase()));
  const merged = [...remoteList];

  for (const seed of activeSeeds) {
    if (!seenIds.has(seed.id.toLowerCase()) && !seenNames.has(seed.name.trim().toLowerCase())) {
      merged.push(seed);
    }
  }
  return merged;
}

function isUnsupportedActionError(msg: string): boolean {
  const lower = msg.toLowerCase();
  return (
    lower.includes('unknown action') ||
    lower.includes('invalid action') ||
    lower.includes('unsupported action') ||
    lower.includes('not recognized') ||
    lower.includes('action is required')
  );
}

async function postContributorScript(
  url: string,
  payload: Record<string, unknown>
): Promise<ContributorScriptResponse> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  let data: ContributorScriptResponse;
  try {
    data = JSON.parse(text) as ContributorScriptResponse;
  } catch {
    throw new Error('Unexpected response from Google Apps Script contributors service.');
  }

  const isSuccess = data.ok === true || (data.ok === undefined && data.success === true);
  if (!res.ok || !isSuccess) {
    throw new Error(data.error || data.message || 'Contributors Google Sheet request failed.');
  }

  return data;
}

async function postContributorToConfiguredScripts(
  payload: Record<string, unknown>
): Promise<ContributorScriptResponse> {
  try {
    return await postContributorScript(ARCHIVE_APPS_SCRIPT_URL, payload);
  } catch (err: any) {
    const msg = String(err?.message || '');
    if (isUnsupportedActionError(msg)) {
      return await postContributorScript(AUTH_APPS_SCRIPT_URL, payload);
    }
    throw err;
  }
}

export async function listContributorsFromAppsScript(): Promise<ContributorRecord[]> {
  const data = await postContributorToConfiguredScripts({
    action: 'list_contributors'
  });

  const rawList = Array.isArray(data.contributors)
    ? data.contributors
    : Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.data)
        ? data.data
        : [];

  return rawList
    .map((item, idx) => mapRawContributor(item, idx))
    .filter((c): c is ContributorRecord => c !== null);
}

async function fetchExpressContributorsSafe(): Promise<ContributorRecord[] | null> {
  try {
    const res = await fetch('/api/contributors', { cache: 'no-store' });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) return null;
    const data = await res.json();
    if (Array.isArray(data?.contributors)) {
      return data.contributors as ContributorRecord[];
    }
    return null;
  } catch {
    return null;
  }
}

async function syncExpressContributorBestEffort(
  method: 'POST' | 'PUT' | 'DELETE',
  path: string,
  authToken?: string | null,
  body?: Record<string, unknown>
): Promise<boolean> {
  if (!authToken) return false;
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${authToken}`
    };
    if (body) headers['Content-Type'] = 'application/json';
    const res = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    const ct = res.headers.get('content-type') || '';
    return res.ok && ct.includes('application/json');
  } catch {
    return false;
  }
}

export async function loadContributorsWithFallback(): Promise<ContributorRecord[]> {
  try {
    const sheetList = await listContributorsFromAppsScript();
    if (sheetList.length > 0) {
      return mergeWithSeedContributors(sheetList);
    }
  } catch {
    // Fall through to local Express or static seed contributors when Apps Script doesn't expose list_contributors yet.
  }

  const expressList = await fetchExpressContributorsSafe();
  if (expressList && expressList.length > 0) {
    return mergeWithSeedContributors(expressList);
  }

  return mergeWithSeedContributors([]);
}

export async function addContributorPersistent(
  input: ContributorInput,
  authToken?: string | null
): Promise<ContributorRecord> {
  const newId = `contrib_${Date.now()}`;
  const cleanPayload = {
    id: newId,
    name: input.name.trim(),
    role: (input.role || 'Contributor').trim(),
    batch: (input.batch || '').trim(),
    college: (input.college || 'Chittagong Medical College').trim(),
    contribution: (input.contribution || 'Academic Question Archive Contributor').trim(),
    verified: input.verified !== false,
    added_at: new Date().toISOString()
  };

  try {
    const data = await postContributorToConfiguredScripts({
      action: 'add_contributor',
      ...cleanPayload
    });
    const createdRaw =
      data.contributor ||
      data.item ||
      (!Array.isArray(data.data) ? data.data : undefined);
    const created =
      (createdRaw ? mapRawContributor(createdRaw, 0) : null) || {
        id: cleanPayload.id,
        name: cleanPayload.name,
        role: cleanPayload.role,
        batch: cleanPayload.batch,
        college: cleanPayload.college,
        contribution: cleanPayload.contribution,
        verified: cleanPayload.verified,
        addedAt: cleanPayload.added_at
      };

    await syncExpressContributorBestEffort('POST', '/api/admin/contributors', authToken, cleanPayload);
    return created;
  } catch (err: any) {
    const msg = String(err?.message || 'Could not save contributor.');
    if (isUnsupportedActionError(msg)) {
      if (authToken) {
        const res = await fetch('/api/admin/contributors', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cleanPayload)
        }).catch(() => null);
        const ct = res?.headers.get('content-type') || '';
        if (res && res.ok && ct.includes('application/json')) {
          const data = await res.json();
          if (data?.contributor) return data.contributor as ContributorRecord;
        }
      }
      throw new Error(
        `Google Apps Script does not handle 'add_contributor' yet (${msg}). Add the Contributors tab handler to your Archive Google Apps Script.`
      );
    }
    throw new Error(msg);
  }
}

export async function updateContributorPersistent(
  id: string,
  input: ContributorInput,
  authToken?: string | null
): Promise<ContributorRecord> {
  const cleanId = String(id || '').trim();
  if (!cleanId) {
    throw new Error('Missing contributor ID.');
  }

  const cleanPayload = {
    id: cleanId,
    contributor_id: cleanId,
    name: input.name.trim(),
    role: (input.role || 'Contributor').trim(),
    batch: (input.batch || '').trim(),
    college: (input.college || 'Chittagong Medical College').trim(),
    contribution: (input.contribution || 'Academic Question Archive Contributor').trim(),
    verified: input.verified !== false
  };

  try {
    const data = await postContributorToConfiguredScripts({
      action: 'update_contributor',
      ...cleanPayload
    });
    const updatedRaw =
      data.contributor ||
      data.item ||
      (!Array.isArray(data.data) ? data.data : undefined);
    const updated =
      (updatedRaw ? mapRawContributor(updatedRaw, 0) : null) || {
        id: cleanId,
        name: cleanPayload.name,
        role: cleanPayload.role,
        batch: cleanPayload.batch,
        college: cleanPayload.college,
        contribution: cleanPayload.contribution,
        verified: cleanPayload.verified,
        addedAt: new Date().toISOString()
      };

    await syncExpressContributorBestEffort(
      'PUT',
      `/api/admin/contributors/${encodeURIComponent(cleanId)}`,
      authToken,
      cleanPayload
    );
    return updated;
  } catch (err: any) {
    const msg = String(err?.message || 'Could not update contributor.');
    if (isUnsupportedActionError(msg)) {
      if (authToken) {
        const res = await fetch(`/api/admin/contributors/${encodeURIComponent(cleanId)}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cleanPayload)
        }).catch(() => null);
        const ct = res?.headers.get('content-type') || '';
        if (res && res.ok && ct.includes('application/json')) {
          const data = await res.json();
          if (data?.contributor) return data.contributor as ContributorRecord;
        }
      }
      throw new Error(
        `Google Apps Script does not handle 'update_contributor' yet (${msg}). Add the Contributors tab handler to your Archive Google Apps Script.`
      );
    }
    throw new Error(msg);
  }
}

export async function deleteContributorPersistent(
  id: string,
  authToken?: string | null
): Promise<void> {
  const cleanId = String(id || '').trim();
  if (!cleanId) {
    throw new Error('Missing contributor ID.');
  }

  try {
    await postContributorToConfiguredScripts({
      action: 'delete_contributor',
      id: cleanId,
      contributor_id: cleanId
    });
    markSeedDeleted(cleanId);
    await syncExpressContributorBestEffort(
      'DELETE',
      `/api/admin/contributors/${encodeURIComponent(cleanId)}`,
      authToken
    );
  } catch (err: any) {
    const msg = String(err?.message || 'Could not remove contributor.');
    if (isUnsupportedActionError(msg)) {
      if (authToken) {
        const res = await fetch(`/api/admin/contributors/${encodeURIComponent(cleanId)}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).catch(() => null);
        const ct = res?.headers.get('content-type') || '';
        if (res && res.ok && ct.includes('application/json')) {
          markSeedDeleted(cleanId);
          return;
        }
      }
      throw new Error(
        `Google Apps Script does not handle 'delete_contributor' yet (${msg}). Add the Contributors tab handler to your Archive Google Apps Script.`
      );
    }
    throw new Error(msg);
  }
}
