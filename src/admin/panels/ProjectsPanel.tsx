import { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import type { PortfolioData, ProjectItem } from '../../types/portfolio';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface ProjectsPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function ProjectsPanel({ data, onChange }: ProjectsPanelProps) {
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [selectedId, setSelectedId] = useState<string>(
    data.projects[0]?.id ?? ''
  );

  const activeProject =
    data.projects.find((p) => p.id === selectedId) ?? data.projects[0] ?? null;

  const updateProject = (id: string, patch: Partial<ProjectItem>) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const nextProject: ProjectItem = {
      id: newId,
      title: 'New Data Analytics Project',
      shortDescription: 'Concise summary of dataset, tools, and business insights.',
      overview: 'Detailed project scope, methodology, and analytical outcomes.',
      tools: ['SQL', 'Power BI'],
      screenshots: [],
      metrics: [],
      analysisBlocks: [],
      discrepancies: [],
      githubUrl: '',
      reportUrl: '',
      visible: true,
    };
    onChange((prev) => ({
      ...prev,
      projects: [...prev.projects, nextProject],
    }));
    setSelectedId(newId);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Projects Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Add projects, edit descriptions, technology tags, GitHub/report URLs, and
            control public visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {data.projects.length === 0 ? (
        <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-8 text-center text-sm text-slate-400">
          No projects configured. Click &ldquo;Add Project&rdquo; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 space-y-2">
            {data.projects.map((project) => {
              const isSelected = activeProject?.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    isSelected
                      ? 'bg-[#15223B] border-[#078BFF] text-white'
                      : 'bg-[#101B30] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm truncate">
                      {project.title || 'Untitled Project'}
                    </span>
                    <span
                      className={`text-xs font-mono shrink-0 ${
                        project.visible ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {project.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 truncate">
                    {project.tools.join(' · ')}
                  </p>
                </button>
              );
            })}
          </div>

          {activeProject && (
            <div className="lg:col-span-8 rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">{activeProject.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateProject(activeProject.id, {
                        visible: !activeProject.visible,
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      activeProject.visible
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-[#080D1A] border-slate-700 text-slate-400'
                    }`}
                  >
                    {activeProject.visible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visible on Portfolio</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hidden from Portfolio</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(activeProject)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  value={activeProject.title}
                  onChange={(e) =>
                    updateProject(activeProject.id, { title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Technology Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={activeProject.tools.join(', ')}
                  onChange={(e) =>
                    updateProject(activeProject.id, {
                      tools: e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Python, PostgreSQL, SQL, Power BI"
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Short Card Description
                </label>
                <textarea
                  rows={3}
                  value={activeProject.shortDescription}
                  onChange={(e) =>
                    updateProject(activeProject.id, {
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Detailed Project Overview
                </label>
                <textarea
                  rows={4}
                  value={activeProject.overview}
                  onChange={(e) =>
                    updateProject(activeProject.id, { overview: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={activeProject.githubUrl}
                    onChange={(e) =>
                      updateProject(activeProject.id, {
                        githubUrl: e.target.value,
                      })
                    }
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">
                    Project Report PDF URL / Path
                  </label>
                  <input
                    type="text"
                    value={activeProject.reportUrl}
                    onChange={(e) =>
                      updateProject(activeProject.id, {
                        reportUrl: e.target.value,
                      })
                    }
                    placeholder="/assets/aistudio/report.pdf"
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Project?"
        description={`Remove "${deleteTarget?.title}" from the portfolio? This can be reverted with Cancel before saving.`}
        confirmLabel="Delete Project"
        destructive
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            onChange((prev) => ({
              ...prev,
              projects: prev.projects.filter((p) => p.id !== deleteTarget.id),
            }));
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
