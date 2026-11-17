import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { EducationItem, PortfolioData } from '../../types/portfolio';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface EducationPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function EducationPanel({ data, onChange }: EducationPanelProps) {
  const [deleteTarget, setDeleteTarget] = useState<EducationItem | null>(null);

  const handleAdd = () => {
    const item: EducationItem = {
      id: `edu-${Date.now()}`,
      qualification: 'New Qualification',
      institution: 'Institution Name',
      details: '',
    };
    onChange((prev) => ({
      ...prev,
      education: [...prev.education, item],
    }));
  };

  const handleUpdate = (id: string, patch: Partial<EducationItem>) => {
    onChange((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Education Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Add, edit, or remove academic qualifications displayed on the portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.education.map((edu) => (
          <div
            key={edu.id}
            className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-semibold text-white">
                {edu.qualification || 'Education Entry'}
              </h3>
              <button
                type="button"
                onClick={() => setDeleteTarget(edu)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Qualification
                </label>
                <input
                  type="text"
                  value={edu.qualification}
                  onChange={(e) =>
                    handleUpdate(edu.id, { qualification: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleUpdate(edu.id, { institution: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Relevant Details
              </label>
              <textarea
                rows={3}
                value={edu.details}
                onChange={(e) => handleUpdate(edu.id, { details: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              />
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Education Entry?"
        description={`Remove "${deleteTarget?.qualification}" from your education section?`}
        confirmLabel="Delete"
        destructive
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            onChange((prev) => ({
              ...prev,
              education: prev.education.filter((e) => e.id !== deleteTarget.id),
            }));
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
