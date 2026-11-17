import { useEffect } from 'react';
import { Download, FileText, X } from 'lucide-react';
import type { ResumeData } from '../types/portfolio';

interface ResumePreviewModalProps {
  open: boolean;
  resume: ResumeData;
  onClose: () => void;
}

export function ResumePreviewModal({
  open,
  resume,
  onClose,
}: ResumePreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-[#080D1A] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-[#101B30]">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 text-[#00D9FF] shrink-0" />
            <div className="min-w-0">
              <h3
                id="resume-modal-title"
                className="text-base font-semibold text-white truncate"
              >
                {resume.fileName || 'Resume Preview'}
              </h3>
              <p className="text-xs text-slate-400">PDF Preview</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {resume.fileUrl && (
              <a
                href={resume.fileUrl}
                download={resume.fileName || 'Avadhesh_Sahani_Resume.pdf'}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#101B30] min-h-[480px]">
          {resume.fileUrl ? (
            <iframe
              title="Avadhesh Sahani Resume PDF"
              src={resume.fileUrl}
              className="w-full h-[72vh] bg-white"
            />
          ) : (
            <div className="h-96 flex flex-col items-center justify-center p-6 text-center">
              <FileText className="w-10 h-10 text-slate-500 mb-3" />
              <p className="text-sm font-medium text-slate-200">
                No resume PDF is currently available.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Upload a resume PDF from the Admin Dashboard to enable download and preview.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
