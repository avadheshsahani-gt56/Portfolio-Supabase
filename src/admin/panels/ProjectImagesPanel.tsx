import { useRef, useState, type ChangeEvent } from 'react';
import { ArrowDown, ArrowUp, Trash2, Upload } from 'lucide-react';
import type { PortfolioData, ProjectScreenshot } from '../../types/portfolio';
import { readFileAsDataUrl } from '../../utils/storage';
import { FallbackImage } from '../../components/FallbackImage';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface ProjectImagesPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function ProjectImagesPanel({ data, onChange }: ProjectImagesPanelProps) {
  const [selectedProjectId, setSelectedProjectId] = useState(
    data.projects[0]?.id ?? ''
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteShot, setDeleteShot] = useState<ProjectScreenshot | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const project =
    data.projects.find((p) => p.id === selectedProjectId) ?? data.projects[0] ?? null;

  const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !project) return;
    setUploadError(null);
    setIsUploading(true);

    try {
      const added: ProjectScreenshot[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          throw new Error(`"${file.name}" is not a valid image file.`);
        }
        const url = await readFileAsDataUrl(file, 2.0);
        added.push({
          id: `shot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url,
          caption: file.name.replace(/\.[^/.]+$/, ''),
        });
      }

      onChange((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === project.id
            ? { ...p, screenshots: [...p.screenshots, ...added] }
            : p
        ),
      }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateCaption = (shotId: string, caption: string) => {
    if (!project) return;
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === project.id
          ? {
              ...p,
              screenshots: p.screenshots.map((s) =>
                s.id === shotId ? { ...s, caption } : s
              ),
            }
          : p
      ),
    }));
  };

  const moveShot = (idx: number, direction: -1 | 1) => {
    if (!project) return;
    const target = idx + direction;
    if (target < 0 || target >= project.screenshots.length) return;
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id !== project.id) return p;
        const next = [...p.screenshots];
        const [item] = next.splice(idx, 1);
        next.splice(target, 0, item);
        return { ...p, screenshots: next };
      }),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">Project Images Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Upload multiple dashboard screenshots per project, reorder views, and edit
            image captions.
          </p>
        </div>

        {data.projects.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {data.projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    project?.id === p.id
                      ? 'bg-[#078BFF] border-[#078BFF] text-white'
                      : 'bg-[#080D1A] border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {project && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUploadFiles}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 disabled:opacity-60 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {isUploading ? 'Uploading...' : 'Upload Dashboard Screenshot(s)'}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {uploadError && (
          <p className="text-xs text-rose-400" role="alert">
            {uploadError}
          </p>
        )}
      </div>

      {project && (
        <div className="space-y-4">
          {project.screenshots.length === 0 ? (
            <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-8 text-center text-sm text-slate-400">
              No screenshots attached to {project.title} yet.
            </div>
          ) : (
            project.screenshots.map((shot, idx) => (
              <div
                key={shot.id}
                className="rounded-2xl bg-[#101B30] border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center"
              >
                <div className="w-full md:w-56 aspect-[16/10] rounded-lg overflow-hidden bg-[#080D1A] border border-slate-800 shrink-0">
                  <FallbackImage
                    src={shot.url}
                    alt={shot.caption || `Screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <p className="text-xs font-mono text-[#00D9FF]">
                    Screenshot {idx + 1} of {project.screenshots.length}
                  </p>
                  <input
                    type="text"
                    value={shot.caption}
                    onChange={(e) => updateCaption(shot.id, e.target.value)}
                    placeholder="Screenshot caption"
                    className="w-full px-3.5 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveShot(idx, -1)}
                    aria-label="Move screenshot up"
                    className="p-2 rounded-lg text-slate-300 hover:text-white bg-[#080D1A] border border-slate-800 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === project.screenshots.length - 1}
                    onClick={() => moveShot(idx, 1)}
                    aria-label="Move screenshot down"
                    className="p-2 rounded-lg text-slate-300 hover:text-white bg-[#080D1A] border border-slate-800 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteShot(shot)}
                    aria-label="Delete screenshot"
                    className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 bg-[#080D1A] border border-slate-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteShot)}
        title="Remove Screenshot?"
        description="Remove this dashboard screenshot from the project gallery?"
        confirmLabel="Remove Screenshot"
        destructive
        onCancel={() => setDeleteShot(null)}
        onConfirm={() => {
          if (deleteShot && project) {
            onChange((prev) => ({
              ...prev,
              projects: prev.projects.map((p) =>
                p.id === project.id
                  ? {
                      ...p,
                      screenshots: p.screenshots.filter(
                        (s) => s.id !== deleteShot.id
                      ),
                    }
                  : p
              ),
            }));
          }
          setDeleteShot(null);
        }}
      />
    </div>
  );
}
