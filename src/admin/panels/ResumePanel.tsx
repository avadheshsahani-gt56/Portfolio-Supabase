import { useRef, useState, type ChangeEvent } from 'react';
import { FileText, RotateCcw, Trash2, Upload } from 'lucide-react';
import { INITIAL_PORTFOLIO_DATA } from '../../data/initialPortfolio';
import type { PortfolioData } from '../../types/portfolio';
import { readFileAsDataUrl } from '../../utils/storage';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface ResumePanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function ResumePanel({ data, onChange }: ResumePanelProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleUploadPdf = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Please select a valid PDF file (.pdf).');
      return;
    }

    setIsReading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file, 3.0);
      onChange((prev) => ({
        ...prev,
        resume: {
          fileName: file.name,
          fileUrl: dataUrl,
          updatedAt: `Uploaded ${new Date().toLocaleDateString()}`,
        },
      }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to load PDF.');
    } finally {
      setIsReading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRestoreInitial = () => {
    setUploadError(null);
    onChange((prev) => ({
      ...prev,
      resume: { ...INITIAL_PORTFOLIO_DATA.resume },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white">Resume Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Upload or replace the portfolio resume PDF, preview it below, or restore the
            supplied resume asset.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleUploadPdf}
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isReading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 disabled:opacity-60 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>
              {isReading
                ? 'Loading PDF...'
                : data.resume.fileUrl
                  ? 'Replace Resume PDF'
                  : 'Upload Resume PDF'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleRestoreInitial}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-[#080D1A] hover:border-[#00D9FF] border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Supplied Resume</span>
          </button>

          {data.resume.fileUrl && (
            <button
              type="button"
              onClick={() => setConfirmRemove(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove PDF</span>
            </button>
          )}
        </div>

        {uploadError && (
          <p className="text-xs text-rose-400" role="alert">
            {uploadError}
          </p>
        )}

        <div className="p-4 rounded-xl bg-[#080D1A] border border-slate-800 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 text-[#00D9FF] shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-white truncate">
                {data.resume.fileUrl ? data.resume.fileName : 'No resume PDF attached'}
              </p>
              <p className="text-xs text-slate-400">{data.resume.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {data.resume.fileUrl && (
        <div className="rounded-2xl bg-[#101B30] border border-slate-800 overflow-hidden">
          <div className="px-6 py-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            Embedded PDF Preview
          </div>
          <iframe
            title="Admin Resume PDF Preview"
            src={data.resume.fileUrl}
            className="w-full h-[520px] bg-white"
          />
        </div>
      )}

      <ConfirmDialog
        open={confirmRemove}
        title="Remove Resume PDF?"
        description="Download and preview buttons on the public portfolio will be disabled gracefully until a new PDF is uploaded."
        confirmLabel="Remove Resume"
        destructive
        onCancel={() => setConfirmRemove(false)}
        onConfirm={() => {
          onChange((prev) => ({
            ...prev,
            resume: { fileName: '', fileUrl: null, updatedAt: 'No file attached' },
          }));
          setConfirmRemove(false);
        }}
      />
    </div>
  );
}
