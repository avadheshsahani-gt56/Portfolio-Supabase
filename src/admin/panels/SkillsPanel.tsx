import { useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import type { PortfolioData, SkillIconKey, SkillItem } from '../../types/portfolio';
import { renderSkillIcon, SKILL_ICON_OPTIONS } from '../../utils/skillIcons';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface SkillsPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function SkillsPanel({ data, onChange }: SkillsPanelProps) {
  const [deleteTarget, setDeleteTarget] = useState<SkillItem | null>(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIcon, setNewIcon] = useState<SkillIconKey>('bar-chart-3');
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddSkill = () => {
    if (!newName.trim()) {
      setFormError('Skill name is required.');
      return;
    }
    const created: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newName.trim(),
      description: newDescription.trim() || 'Data analytics skill.',
      iconKey: newIcon,
    };
    onChange((prev) => ({
      ...prev,
      skills: [...prev.skills, created],
    }));
    setNewName('');
    setNewDescription('');
    setNewIcon('bar-chart-3');
    setFormError(null);
  };

  const handleUpdateSkill = (id: string, patch: Partial<SkillItem>) => {
    onChange((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  const handleMoveSkill = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= data.skills.length) return;
    onChange((prev) => {
      const next = [...prev.skills];
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved);
      return { ...prev, skills: next };
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">Skills Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Add, edit, reorder, or remove technical skills displayed on the portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="New skill name"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                if (formError) setFormError(null);
              }}
              className="w-full px-3 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
          <div className="md:col-span-4">
            <input
              type="text"
              placeholder="Concise description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
          <div className="md:col-span-3">
            <select
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value as SkillIconKey)}
              aria-label="New skill icon"
              className="w-full px-3 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            >
              {SKILL_ICON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleAddSkill}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
        {formError && <p className="text-xs text-rose-400">{formError}</p>}
      </div>

      <div className="space-y-3">
        {data.skills.map((skill, idx) => (
          <div
            key={skill.id}
            className="rounded-xl bg-[#101B30] border border-slate-800 p-4 flex flex-col lg:flex-row lg:items-center gap-4"
          >
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-[#080D1A] border border-slate-800 flex items-center justify-center text-[#00D9FF]">
                {renderSkillIcon(skill.iconKey)}
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-500 w-6">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
              <input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  handleUpdateSkill(skill.id, { name: e.target.value })
                }
                aria-label={`Skill name for ${skill.name}`}
                className="md:col-span-3 px-3 py-2 text-sm font-medium text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              />
              <input
                type="text"
                value={skill.description}
                onChange={(e) =>
                  handleUpdateSkill(skill.id, { description: e.target.value })
                }
                aria-label={`Skill description for ${skill.name}`}
                className="md:col-span-6 px-3 py-2 text-sm text-slate-200 bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              />
              <select
                value={skill.iconKey}
                onChange={(e) =>
                  handleUpdateSkill(skill.id, {
                    iconKey: e.target.value as SkillIconKey,
                  })
                }
                aria-label={`Icon for ${skill.name}`}
                className="md:col-span-3 px-3 py-2 text-sm text-slate-200 bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              >
                {SKILL_ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMoveSkill(idx, -1)}
                aria-label={`Move ${skill.name} up`}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-[#080D1A] border border-slate-800 disabled:opacity-30"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={idx === data.skills.length - 1}
                onClick={() => handleMoveSkill(idx, 1)}
                aria-label={`Move ${skill.name} down`}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-[#080D1A] border border-slate-800 disabled:opacity-30"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(skill)}
                aria-label={`Delete ${skill.name}`}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 bg-[#080D1A] border border-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Skill?"
        description={`Remove "${deleteTarget?.name}" from your skills section? You can restore unsaved edits with Cancel before saving.`}
        confirmLabel="Delete Skill"
        destructive
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            onChange((prev) => ({
              ...prev,
              skills: prev.skills.filter((s) => s.id !== deleteTarget.id),
            }));
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
