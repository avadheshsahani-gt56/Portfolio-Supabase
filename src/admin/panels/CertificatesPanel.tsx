import { useState, type ChangeEvent } from 'react';
import { Award, Plus, Trash2, Upload } from 'lucide-react';
import type { CertificateItem, PortfolioData } from '../../types/portfolio';
import { readFileAsDataUrl } from '../../utils/storage';
import { FallbackImage } from '../../components/FallbackImage';
import { ConfirmDialog } from '../../components/ConfirmDialog';

interface CertificatesPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function CertificatesPanel({ data, onChange }: CertificatesPanelProps) {
  const [deleteTarget, setDeleteTarget] = useState<CertificateItem | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAdd = () => {
    const nextCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      name: 'New Certificate',
      issuingOrganization: '',
      issueDate: '',
      imageUrl: null,
    };
    onChange((prev) => ({
      ...prev,
      certificates: [...prev.certificates, nextCert],
    }));
  };

  const handleUpdate = (id: string, patch: Partial<CertificateItem>) => {
    onChange((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    }));
  };

  const handleImageUpload = async (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file for the certificate.');
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file, 2.0);
      handleUpdate(id, { imageUrl: dataUrl });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Certificates Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Add certificates, edit issuing organization and issue date, upload certificate
            images, or delete entries.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {uploadError && (
        <p className="text-xs text-rose-400" role="alert">
          {uploadError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5">
        {data.certificates.map((cert) => (
          <div
            key={cert.id}
            className="rounded-2xl bg-[#101B30] border border-slate-800 p-5 sm:p-6 flex flex-col lg:flex-row gap-6"
          >
            <div className="w-full lg:w-56 space-y-3 shrink-0">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#080D1A] border border-slate-800 flex items-center justify-center">
                {cert.imageUrl ? (
                  <FallbackImage
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <Award className="w-7 h-7 mb-1 text-[#078BFF]" />
                    <span className="text-xs">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label className="flex-1 cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{cert.imageUrl ? 'Replace Image' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(cert.id, e)}
                    className="hidden"
                  />
                </label>

                {cert.imageUrl && (
                  <button
                    type="button"
                    onClick={() => handleUpdate(cert.id, { imageUrl: null })}
                    aria-label="Remove certificate image"
                    className="p-2 text-slate-300 hover:text-rose-300 bg-[#080D1A] border border-slate-700 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-white">{cert.name}</h3>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(cert)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdate(cert.id, { name: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuingOrganization}
                    placeholder="Optional (not on resume)"
                    onChange={(e) =>
                      handleUpdate(cert.id, { issuingOrganization: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Issue Date
                  </label>
                  <input
                    type="text"
                    value={cert.issueDate}
                    placeholder="Optional (e.g. Oct 2026)"
                    onChange={(e) =>
                      handleUpdate(cert.id, { issueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Certificate?"
        description={`Remove "${deleteTarget?.name}" from the certificate gallery?`}
        confirmLabel="Delete Certificate"
        destructive
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            onChange((prev) => ({
              ...prev,
              certificates: prev.certificates.filter(
                (c) => c.id !== deleteTarget.id
              ),
            }));
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
