import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Images } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { isValidExternalUrl } from '../utils/storage';
import { FallbackImage } from '../components/FallbackImage';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const [githubNoticeId, setGithubNoticeId] = useState<string | null>(null);
  const visibleProjects = projects.filter((p) => p.visible);

  const handlePlaceholderGithub = (projectId: string) => {
    setGithubNoticeId(projectId);
    window.setTimeout(() => {
      setGithubNoticeId((prev) => (prev === projectId ? null : prev));
    }, 3500);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-[#00D9FF] mb-2">Case Studies</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            Featured Data Analytics Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            End-to-end projects built with Python, PostgreSQL, SQL, and Microsoft Power BI.
            Select any project to inspect dashboard screenshots, verified metrics, and full
            report findings.
          </p>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#101B30] border border-slate-800 text-center text-sm text-slate-400">
            No visible projects are currently configured.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => {
              const primaryShot = project.screenshots[0];
              const hasGithub = isValidExternalUrl(project.githubUrl);

              return (
                <article
                  key={project.id}
                  className="flex flex-col rounded-2xl bg-[#101B30] border border-slate-800/80 hover:border-[#078BFF]/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`Open details for ${project.title}`}
                    className="relative aspect-[16/10] w-full bg-[#060A14] overflow-hidden border-b border-slate-800/80 text-left group focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <FallbackImage
                      src={primaryShot?.url}
                      alt={primaryShot?.caption || `${project.title} dashboard preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      fallbackTitle={`${project.title} Dashboard`}
                    />
                    {project.screenshots.length > 1 && (
                      <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#080D1A]/90 border border-slate-700/80 text-xs font-mono text-slate-200">
                        <Images className="w-3.5 h-3.5 text-[#00D9FF]" />
                        <span>{project.screenshots.length} views</span>
                      </div>
                    )}
                  </button>

                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#00D9FF] mb-2">
                      {project.tools.map((tool, index) => (
                        <span
                          key={`${tool}-${index}`}
                          className="inline-flex items-center gap-2"
                        >
                          <span>{tool}</span>
                          {index < project.tools.length - 1 && (
                            <span className="text-slate-600" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-300 leading-relaxed flex-1">
                      {project.shortDescription}
                    </p>

                    {project.metrics.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <p className="text-xs text-slate-400">{metric.label}</p>
                            <p className="text-sm font-semibold font-mono tabular-nums text-white mt-0.5">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {hasGithub ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-slate-200 bg-[#080D1A] hover:border-[#00D9FF] border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePlaceholderGithub(project.id)}
                          aria-label={`${project.title} GitHub placeholder`}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-slate-300 bg-[#080D1A] hover:border-slate-600 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </button>
                      )}
                    </div>

                    {githubNoticeId === project.id && (
                      <p className="mt-2.5 text-xs text-slate-400" role="status">
                        GitHub repository link is a placeholder and can be set in the Admin
                        Dashboard.
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
