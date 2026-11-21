import React, { useState } from 'react';
import {
  Award,
  GraduationCap,
  FileUp,
  CheckCircle2,
  Users,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Save,
  X,
  AlertCircle
} from 'lucide-react';
import { ContributorRecord, PageRoute, UserProfile } from '../types';
import { isAdminUser } from '../utils/appsScriptAuth';
import {
  addContributorPersistent,
  deleteContributorPersistent,
  updateContributorPersistent
} from '../utils/appsScriptContributors';

interface ContributorsPageProps {
  contributors: ContributorRecord[];
  userProfile?: UserProfile | null;
  authToken?: string | null;
  onContributorsChange?: React.Dispatch<React.SetStateAction<ContributorRecord[]>>;
  onRefreshContributors?: () => Promise<void>;
  onNavigate: (page: PageRoute) => void;
}

export const ContributorsPage: React.FC<ContributorsPageProps> = ({
  contributors,
  userProfile,
  authToken,
  onContributorsChange,
  onRefreshContributors,
  onNavigate
}) => {
  const admin = isAdminUser(userProfile);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Contributor');
  const [batch, setBatch] = useState('');
  const [college, setCollege] = useState('Chittagong Medical College');
  const [contribution, setContribution] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setRole('Contributor');
    setBatch('');
    setCollege('Chittagong Medical College');
    setContribution('');
    setFormOpen(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setName('');
    setRole('Contributor');
    setBatch('');
    setCollege('Chittagong Medical College');
    setContribution('');
    setFeedback(null);
    setFormOpen(true);
  };

  const openEditForm = (c: ContributorRecord) => {
    setEditingId(c.id);
    setName(c.name);
    setRole(c.role || 'Contributor');
    setBatch(c.batch || '');
    setCollege(c.college || 'Chittagong Medical College');
    setContribution(c.contribution || '');
    setFeedback(null);
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin || !name.trim()) return;

    setSaving(true);
    setFeedback(null);
    try {
      const isEdit = Boolean(editingId);
      const input = {
        name: name.trim(),
        role: role.trim() || 'Contributor',
        batch: batch.trim(),
        college: college.trim() || 'Chittagong Medical College',
        contribution: contribution.trim()
      };

      if (isEdit && editingId) {
        const updated = await updateContributorPersistent(editingId, input, authToken);
        onContributorsChange?.(prev =>
          prev.map(item => (item.id === editingId ? updated : item))
        );
      } else {
        const created = await addContributorPersistent(input, authToken);
        onContributorsChange?.(prev => [...prev.filter(item => item.id !== created.id), created]);
      }

      resetForm();
      setFeedback({
        type: 'ok',
        text: isEdit ? 'Contributor updated successfully.' : 'Contributor added to directory.'
      });
      await onRefreshContributors?.();
    } catch (err: any) {
      setFeedback({ type: 'err', text: err?.message || 'Could not save contributor.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!admin) return;

    setDeletingId(id);
    setFeedback(null);
    try {
      await deleteContributorPersistent(id, authToken);
      onContributorsChange?.(prev => prev.filter(item => item.id !== id));
      if (editingId === id) resetForm();
      setFeedback({ type: 'ok', text: 'Contributor removed.' });
      await onRefreshContributors?.();
    } catch (err: any) {
      setFeedback({ type: 'err', text: err?.message || 'Could not remove contributor.' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1.5 min-w-0">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <Users size={14} />
            <span>Academic Community &amp; Team</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Contributors &amp; Team
          </h1>
          <p className="text-sm text-[var(--mut)] max-w-2xl m-0">
            Team members, students, and academic collaborators who contributed question papers, study materials, and verification work to CMC MedArchive.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {admin && (
            <button
              type="button"
              onClick={openAddForm}
              className="btn alt min-h-[44px] w-full sm:w-auto"
            >
              <Plus size={16} />
              <span>Add Contributor / Member</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('submit')}
            className="btn min-h-[44px] w-full sm:w-auto"
          >
            <FileUp size={16} />
            <span>Contribute Papers</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${
            feedback.type === 'ok'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
          }`}
        >
          {feedback.type === 'ok' ? (
            <CheckCircle2 size={16} className="shrink-0" />
          ) : (
            <AlertCircle size={16} className="shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Admin Inline Add / Edit Form */}
      {admin && formOpen && (
        <form
          onSubmit={handleSave}
          className="bg-[var(--card)] border border-[#0D9488]/50 rounded-xl p-4 sm:p-5 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-[var(--ink)] m-0">
              {editingId ? 'Edit Contributor / Team Member' : 'Add Contributor or Team Member'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-1.5 rounded-lg text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg-subtle)]"
              aria-label="Close form"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                Full Name *
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. MD Sadman Sami"
                required
                className="text-sm min-h-[42px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                Role / Team Title
              </label>
              <input
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Core Team, Contributor, Coordinator"
                className="text-sm min-h-[42px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                Batch
              </label>
              <input
                value={batch}
                onChange={e => setBatch(e.target.value)}
                placeholder="e.g. CMC 67"
                className="text-sm min-h-[42px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                Medical College
              </label>
              <input
                value={college}
                onChange={e => setCollege(e.target.value)}
                placeholder="Chittagong Medical College (CMC)"
                className="text-sm min-h-[42px]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[var(--ink-secondary)] mb-1">
                Contribution / Note
              </label>
              <input
                value={contribution}
                onChange={e => setContribution(e.target.value)}
                placeholder="e.g. Question Paper Archiving & Academic Data Contribution"
                className="text-sm min-h-[42px]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="submit" disabled={saving} className="btn min-h-[42px]">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add to Directory'}</span>
            </button>
            <button type="button" onClick={resetForm} className="btn alt min-h-[42px]">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Clean List-Based Contributor Directory */}
      <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl divide-y divide-[var(--line)] overflow-hidden">
        {contributors.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--mut)]">
            No contributors listed yet.
          </div>
        ) : (
          contributors.map((c, index) => (
            <div
              key={c.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--card-subtle)] transition-colors"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#0F2942]/10 dark:bg-sky-500/15 text-[#0F2942] dark:text-sky-300 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[var(--ink)] m-0 break-words">
                      {c.name}
                    </h3>
                    {c.role && (
                      <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/25 text-[11px] font-bold text-[#0D9488]">
                        {c.role}
                      </span>
                    )}
                    {c.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 size={12} />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--ink-secondary)]">
                    {c.batch && (
                      <>
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Award size={13} className="text-[#0D9488] shrink-0" />
                          Batch: {c.batch}
                        </span>
                        {c.college && <span className="text-[var(--line-strong)]">&middot;</span>}
                      </>
                    )}
                    {c.college && (
                      <span className="inline-flex items-center gap-1 text-[var(--mut)] break-words">
                        <GraduationCap size={13} className="shrink-0" />
                        <span>{c.college}</span>
                      </span>
                    )}
                  </div>
                  {c.contribution && (
                    <p className="text-xs text-[var(--mut)] m-0 pt-0.5 break-words">
                      {c.contribution}
                    </p>
                  )}
                </div>
              </div>

              {admin && (
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => openEditForm(c)}
                    className="btn sm alt min-h-[36px]"
                    aria-label={`Edit ${c.name}`}
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === c.id}
                    onClick={() => handleDelete(c.id)}
                    className="btn sm alt text-rose-600 border-rose-500/30 hover:bg-rose-500/10 min-h-[36px]"
                    aria-label={`Remove ${c.name}`}
                  >
                    {deletingId === c.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Invite Banner */}
      <div className="p-5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h3 className="text-sm font-bold text-[var(--ink)] m-0">
            Have Card, Term, or MCQ Papers from Your Medical College?
          </h3>
          <p className="text-xs text-[var(--mut)] m-0">
            Share PDFs, clear photographs, or Google Drive links. Approved contributors are listed here once verified.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('submit')}
          className="btn alt shrink-0 min-h-[44px] w-full sm:w-auto"
        >
          Submit Question Papers &rarr;
        </button>
      </div>
    </div>
  );
};
