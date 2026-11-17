import { Download, Eye, FileText } from 'lucide-react';
import type { ResumeData } from '../types/portfolio';

interface ResumeSectionProps {
  resume: ResumeData;
  onOpenPreview: () => void;
}

export function ResumeSection({ resume, onOpenPreview }: ResumeSectionProps) {
  const hasResume = Boolean(resume.fileUrl);

  return (
    <section id="resume" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono text-[#00D9FF]">Curriculum Vitae</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Resume &amp; Qualifications
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Review or download Avadhesh Sahani&apos;s resume summarizing technical
              skills, featured data analytics projects, B.Sc. education, and certifications.
            </p>
            {hasResume ? (
              <p className="text-xs font-mono text-slate-400">
                File: {resume.fileName} · {resume.updatedAt}
              </p>
            ) : (
              <p className="text-xs text-amber-300">
                Resume PDF is currently unavailable. Please upload a PDF in the Admin
                Dashboard.
              </p>
            )}
          </div>

          {hasResume ? (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenPreview}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-100 bg-[#080D1A] hover:border-[#00D9FF] border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Eye className="w-4 h-4 text-[#00D9FF]" />
                <span>Preview Resume PDF</span>
              </button>

              <a
                href={resume.fileUrl!}
                download={resume.fileName || 'Avadhesh_Sahani_Resume.pdf'}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#080D1A] border border-slate-800 text-sm text-slate-400 shrink-0">
              <FileText className="w-4 h-4" />
              <span>PDF Not Attached</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
