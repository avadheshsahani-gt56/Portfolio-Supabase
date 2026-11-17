import { Plus, Trash2 } from 'lucide-react';
import type { PortfolioData } from '../../types/portfolio';

interface AboutPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function AboutPanel({ data, onChange }: AboutPanelProps) {
  const { about } = data;

  const updateList = (
    key: 'analyticsInterests' | 'technicalCapabilities',
    idx: number,
    value: string
  ) => {
    onChange((prev) => {
      const next = [...prev.about[key]];
      next[idx] = value;
      return { ...prev, about: { ...prev.about, [key]: next } };
    });
  };

  const addListItem = (key: 'analyticsInterests' | 'technicalCapabilities') => {
    onChange((prev) => ({
      ...prev,
      about: { ...prev.about, [key]: [...prev.about[key], ''] },
    }));
  };

  const removeListItem = (
    key: 'analyticsInterests' | 'technicalCapabilities',
    idx: number
  ) => {
    onChange((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [key]: prev.about[key].filter((_, i) => i !== idx),
      },
    }));
  };

  return (
    <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">About Section Management</h2>
        <p className="mt-1 text-sm text-slate-400">
          Edit your About narrative, data analytics interests, technical capabilities, and
          career objective.
        </p>
      </div>

      <div>
        <label
          htmlFor="about-summary"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          About Summary
        </label>
        <textarea
          id="about-summary"
          rows={4}
          value={about.summary}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              about: { ...prev.about, summary: e.target.value },
            }))
          }
          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-200">
            Data Analytics Interests
          </label>
          <button
            type="button"
            onClick={() => addListItem('analyticsInterests')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#00D9FF] bg-[#080D1A] border border-slate-700 hover:border-[#00D9FF] rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>
        <div className="space-y-2">
          {about.analyticsInterests.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateList('analyticsInterests', idx, e.target.value)
                }
                className="flex-1 px-3.5 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              />
              <button
                type="button"
                onClick={() => removeListItem('analyticsInterests', idx)}
                aria-label="Remove interest item"
                className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg border border-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-200">
            Technical Capabilities
          </label>
          <button
            type="button"
            onClick={() => addListItem('technicalCapabilities')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#00D9FF] bg-[#080D1A] border border-slate-700 hover:border-[#00D9FF] rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>
        <div className="space-y-2">
          {about.technicalCapabilities.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateList('technicalCapabilities', idx, e.target.value)
                }
                className="flex-1 px-3.5 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              />
              <button
                type="button"
                onClick={() => removeListItem('technicalCapabilities', idx)}
                aria-label="Remove capability item"
                className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg border border-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="about-objective"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          Career Objective
        </label>
        <textarea
          id="about-objective"
          rows={3}
          value={about.careerObjective}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              about: { ...prev.about, careerObjective: e.target.value },
            }))
          }
          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
        />
      </div>
    </div>
  );
}
