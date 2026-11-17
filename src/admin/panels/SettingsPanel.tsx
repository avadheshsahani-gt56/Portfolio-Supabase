import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { PortfolioData, SectionVisibility } from '../../types/portfolio';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface SettingsPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
  onResetAll: () => void;
}

const SECTION_LABELS: { key: keyof SectionVisibility; label: string }[] = [
  { key: 'about', label: 'About Me Section' },
  { key: 'skills', label: 'Technical Skills Section' },
  { key: 'projects', label: 'Projects Section' },
  { key: 'education', label: 'Education Section' },
  { key: 'certificates', label: 'Certificates Section' },
  { key: 'resume', label: 'Resume Section' },
  { key: 'contact', label: 'Contact Section' },
];

export function SettingsPanel({
  data,
  onChange,
  onResetAll,
}: SettingsPanelProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleVisibility = (key: keyof SectionVisibility) => {
    onChange((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        sectionVisibility: {
          ...prev.settings.sectionVisibility,
          [key]: !prev.settings.sectionVisibility[key],
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Website Settings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Control public section visibility, primary contact email, social links, and
            footer text.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Section Visibility</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SECTION_LABELS.map(({ key, label }) => {
              const checked = data.settings.sectionVisibility[key];
              return (
                <label
                  key={key}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#080D1A] border border-slate-800 cursor-pointer hover:border-slate-700"
                >
                  <span className="text-sm text-slate-200">{label}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleVisibility(key)}
                    className="w-4 h-4 rounded border-slate-600 bg-[#101B30] text-[#078BFF] focus:ring-[#00D9FF]"
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label
              htmlFor="settings-email"
              className="block text-sm font-medium text-slate-200 mb-1.5"
            >
              Contact Email
            </label>
            <input
              id="settings-email"
              type="email"
              value={data.profile.email}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, email: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          <div>
            <label
              htmlFor="settings-footer-tagline"
              className="block text-sm font-medium text-slate-200 mb-1.5"
            >
              Footer Tagline
            </label>
            <input
              id="settings-footer-tagline"
              type="text"
              value={data.settings.footerTagline}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  settings: { ...prev.settings, footerTagline: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="settings-github"
              className="block text-sm font-medium text-slate-200 mb-1.5"
            >
              GitHub URL
            </label>
            <input
              id="settings-github"
              type="url"
              value={data.socialLinks.githubUrl}
              placeholder="https://github.com/..."
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, githubUrl: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          <div>
            <label
              htmlFor="settings-linkedin"
              className="block text-sm font-medium text-slate-200 mb-1.5"
            >
              LinkedIn URL
            </label>
            <input
              id="settings-linkedin"
              type="url"
              value={data.socialLinks.linkedinUrl}
              placeholder="https://linkedin.com/in/..."
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, linkedinUrl: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="settings-footer-note"
            className="block text-sm font-medium text-slate-200 mb-1.5"
          >
            Footer Bio Note
          </label>
          <textarea
            id="settings-footer-note"
            rows={2}
            value={data.settings.footerNote}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                settings: { ...prev.settings, footerNote: e.target.value },
              }))
            }
            className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-[#101B30] border border-rose-500/30 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">
            Restore Default Portfolio Content
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Clear local browser edits and restore the original verified resume and
            project report content.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Verified Seed</span>
        </button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Restore Default Portfolio Data?"
        description="This will discard all local edits in browser storage and restore the initial verified resume, projects, and certificate records."
        confirmLabel="Restore Defaults"
        destructive
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          onResetAll();
          setConfirmReset(false);
        }}
      />
    </div>
  );
}
