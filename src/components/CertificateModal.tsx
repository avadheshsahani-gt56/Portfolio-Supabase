import { useEffect } from 'react';
import { Award, Calendar, Building2, X } from 'lucide-react';
import type { CertificateItem } from '../types/portfolio';
import { FallbackImage } from './FallbackImage';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!certificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#080D1A] border border-slate-700/80 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-[#101B30]">
          <div className="flex items-center gap-3 min-w-0">
            <Award className="w-5 h-5 text-[#00D9FF] shrink-0" />
            <h3
              id="certificate-modal-title"
              className="text-lg font-semibold text-white truncate"
            >
              {certificate.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#101B30]">
            {certificate.imageUrl ? (
              <FallbackImage
                src={certificate.imageUrl}
                alt={`${certificate.name} certificate`}
                className="w-full max-h-[420px] object-contain bg-[#060A14]"
                fallbackTitle="Certificate image unavailable"
              />
            ) : (
              <div className="py-16 px-6 text-center space-y-2">
                <Award className="w-10 h-10 text-[#078BFF] mx-auto" />
                <p className="text-base font-semibold text-white">{certificate.name}</p>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Verified from resume. No certificate image has been uploaded yet.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-[#101B30] border border-slate-800/80 flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[#00D9FF] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Issuing Organization</p>
                <p className="mt-0.5 font-medium text-white">
                  {certificate.issuingOrganization.trim() || 'Not specified on resume'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101B30] border border-slate-800/80 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#00D9FF] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Issue Date</p>
                <p className="mt-0.5 font-medium text-white">
                  {certificate.issueDate.trim() || 'Not specified on resume'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
