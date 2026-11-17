import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Github,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { isValidExternalUrl } from '../utils/storage';
import { FallbackImage } from './FallbackImage';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [githubPlaceholderNotice, setGithubPlaceholderNotice] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setZoomImage(false);
    setShowReportPreview(false);
    setGithubPlaceholderNotice(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomImage) {
          setZoomImage(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, zoomImage, onClose]);

  if (!project) return null;

  const screenshots = project.screenshots;
  const activeShot = screenshots[activeIndex] ?? screenshots[0];
  const hasGithub = isValidExternalUrl(project.githubUrl);
  const hasReport = isValidExternalUrl(project.reportUrl);

  const handlePrev = () => {
    if (screenshots.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleNext = () => {
    if (screenshots.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#080D1A] border border-slate-700/80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#080D1A]/95 backdrop-blur-md border-b border-slate-800">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#00D9FF]">
              {project.tools.map((tool, index) => (
                <span key={`${tool}-${index}`} className="inline-flex items-center gap-2">
                  <span>{tool}</span>
                  {index < project.tools.length - 1 && (
                    <span className="text-slate-600" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
            <h2
              id="project-modal-title"
              className="mt-1 text-xl sm:text-2xl font-bold text-white truncate"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#101B30] border border-slate-800 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8 space-y-8">
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-[#101B30] border border-slate-800">
              {activeShot ? (
                <FallbackImage
                  src={activeShot.url}
                  alt={activeShot.caption || `${project.title} Power BI Dashboard`}
                  className={`w-full object-contain bg-[#060A14] transition-all ${
                    zoomImage ? 'max-h-[80vh]' : 'max-h-[460px]'
                  }`}
                  fallbackTitle="Dashboard screenshot unavailable"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-sm text-slate-400">
                  No dashboard screenshot attached.
                </div>
              )}

              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#080D1A]/85 text-white border border-slate-700 hover:border-[#00D9FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#080D1A]/85 text-white border border-slate-700 hover:border-[#00D9FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {activeShot && (
                <button
                  type="button"
                  onClick={() => setZoomImage((prev) => !prev)}
                  aria-label={zoomImage ? 'Reduce screenshot size' : 'Expand screenshot size'}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#080D1A]/90 text-slate-200 border border-slate-700 hover:border-[#00D9FF] transition-colors"
                >
                  {zoomImage ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Fit View</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand View</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {activeShot?.caption && (
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>{activeShot.caption}</span>
                {screenshots.length > 1 && (
                  <span className="font-mono tabular-nums text-slate-300">
                    Screenshot {activeIndex + 1} of {screenshots.length}
                  </span>
                )}
              </div>
            )}

            {screenshots.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pt-1 pb-1">
                {screenshots.map((shot, idx) => (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative shrink-0 w-36 h-20 rounded-lg overflow-hidden border transition-all ${
                      idx === activeIndex
                        ? 'border-[#00D9FF] ring-1 ring-[#00D9FF]/60'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <FallbackImage
                      src={shot.url}
                      alt={shot.caption || `Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {project.metrics.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-xl bg-[#101B30] border border-slate-800/80"
                >
                  <p className="text-xs text-slate-400">{metric.label}</p>
                  <p className="mt-1 text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                    {metric.value}
                  </p>
                  {metric.note && (
                    <p className="mt-1 text-xs text-slate-400">{metric.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">Project Overview</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {project.analysisBlocks.length > 0 && (
            <div className="grid grid-cols-1 gap-5">
              {project.analysisBlocks.map((block) => (
                <div
                  key={block.heading}
                  className="p-5 rounded-xl bg-[#101B30] border border-slate-800/80 space-y-3"
                >
                  <h4 className="text-base font-semibold text-white">{block.heading}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{block.summary}</p>
                  {block.points && block.points.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {block.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00D9FF] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {project.discrepancies.length > 0 && (
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h4 className="text-base font-semibold">
                  Report Validation &amp; Identified Inconsistencies
                </h4>
              </div>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                In accordance with transparent data reporting, discrepancies between the source
                dataset, SQL scripts, and dashboard visuals are documented explicitly below rather
                than silently altered.
              </p>
              <ul className="space-y-2">
                {project.discrepancies.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed"
                  >
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {hasReport && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowReportPreview((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{showReportPreview ? 'Hide Project Report' : 'Preview Project Report'}</span>
                  </button>
                  <a
                    href={project.reportUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-[#101B30] hover:border-[#00D9FF] border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report PDF</span>
                  </a>
                </>
              )}

              {hasGithub ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-[#101B30] hover:border-[#078BFF] border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setGithubPlaceholderNotice((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 bg-[#101B30] hover:border-slate-600 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository (Placeholder)</span>
                </button>
              )}
            </div>

            {githubPlaceholderNotice && (
              <p className="text-xs text-slate-400">
                GitHub repository URL is currently a placeholder and can be added in the Admin
                Dashboard under Projects Management.
              </p>
            )}

            {showReportPreview && hasReport && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#101B30]">
                <iframe
                  title={`${project.title} Project Report PDF`}
                  src={project.reportUrl}
                  className="w-full h-[520px] bg-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
