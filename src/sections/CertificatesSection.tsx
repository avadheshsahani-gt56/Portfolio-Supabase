import { Award, Eye } from 'lucide-react';
import type { CertificateItem } from '../types/portfolio';
import { FallbackImage } from '../components/FallbackImage';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  onSelectCertificate: (certificate: CertificateItem) => void;
}

export function CertificatesSection({
  certificates,
  onSelectCertificate,
}: CertificatesSectionProps) {
  return (
    <section id="certificates" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-[#00D9FF] mb-2">Credentials</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            Certificates &amp; Training
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Verified certifications listed on Avadhesh Sahani&apos;s resume covering Excel,
            Power BI, Python, and SQL.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#101B30] border border-slate-800 text-center text-sm text-slate-400">
            No certificates are currently listed.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificates.map((cert) => {
              const issuerText = cert.issuingOrganization.trim();
              const dateText = cert.issueDate.trim();
              const metaParts = [
                issuerText || 'Verified on Resume',
                dateText || null,
              ].filter(Boolean);

              return (
                <article
                  key={cert.id}
                  className="flex flex-col rounded-2xl bg-[#101B30] border border-slate-800/80 hover:border-[#078BFF]/60 overflow-hidden transition-colors"
                >
                  <div className="aspect-[16/10] w-full bg-[#080D1A] border-b border-slate-800/80 overflow-hidden">
                    {cert.imageUrl ? (
                      <FallbackImage
                        src={cert.imageUrl}
                        alt={`${cert.name} certificate`}
                        className="w-full h-full object-cover"
                        fallbackTitle={cert.name}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#080D1A] to-[#101B30]">
                        <Award className="w-8 h-8 text-[#078BFF] mb-2" />
                        <span className="text-xs font-mono text-slate-400">
                          Certificate Preview
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col p-5">
                    <p className="text-xs text-slate-400">
                      {metaParts.join(' · ')}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-white leading-snug flex-1">
                      {cert.name}
                    </h3>

                    <button
                      type="button"
                      onClick={() => onSelectCertificate(cert)}
                      className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-100 bg-[#080D1A] hover:border-[#00D9FF] border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00D9FF]" />
                      <span>View Certificate</span>
                    </button>
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
