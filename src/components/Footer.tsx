import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { isValidExternalUrl } from '../utils/storage';

interface FooterProps {
  data: PortfolioData;
}

export function Footer({ data }: FooterProps) {
  const [linkNotice, setLinkNotice] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home', visible: true },
    { label: 'About', href: '#about', visible: data.settings.sectionVisibility.about },
    { label: 'Skills', href: '#skills', visible: data.settings.sectionVisibility.skills },
    { label: 'Projects', href: '#projects', visible: data.settings.sectionVisibility.projects },
    { label: 'Education', href: '#education', visible: data.settings.sectionVisibility.education },
    {
      label: 'Certificates',
      href: '#certificates',
      visible: data.settings.sectionVisibility.certificates,
    },
    { label: 'Resume', href: '#resume', visible: data.settings.sectionVisibility.resume },
    { label: 'Contact', href: '#contact', visible: data.settings.sectionVisibility.contact },
  ].filter((item) => item.visible);

  const handlePlaceholderSocial = (platform: 'GitHub' | 'LinkedIn') => {
    setLinkNotice(
      `${platform} profile URL is currently a placeholder and has not been linked yet.`
    );
    window.setTimeout(() => setLinkNotice(null), 3500);
  };

  const hasGithub = isValidExternalUrl(data.socialLinks.githubUrl);
  const hasLinkedin = isValidExternalUrl(data.socialLinks.linkedinUrl);

  return (
    <footer className="border-t border-slate-800/80 bg-[#080D1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <p className="text-lg font-semibold text-white">{data.profile.name}</p>
            <p className="mt-1 text-sm text-[#00D9FF] font-medium">Data Analyst</p>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-sm">
              {data.settings.footerNote}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-3">Quick Navigation</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#00D9FF] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-3">Connect</p>
            <div className="space-y-2.5">
              <a
                href={`mailto:${data.profile.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-slate-300 hover:text-[#00D9FF] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#078BFF] shrink-0" />
                <span>{data.profile.email}</span>
              </a>

              <div className="flex items-center gap-3 pt-1">
                {hasGithub ? (
                  <a
                    href={data.socialLinks.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 bg-[#101B30] hover:border-[#078BFF] border border-slate-800 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePlaceholderSocial('GitHub')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-[#101B30] hover:border-slate-600 border border-slate-800 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </button>
                )}

                {hasLinkedin ? (
                  <a
                    href={data.socialLinks.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 bg-[#101B30] hover:border-[#078BFF] border border-slate-800 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePlaceholderSocial('LinkedIn')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-[#101B30] hover:border-slate-600 border border-slate-800 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </button>
                )}
              </div>

              {linkNotice && (
                <p className="text-xs text-slate-400 pt-1" role="status">
                  {linkNotice}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {currentYear} {data.profile.name}. All rights reserved.
          </p>
          <p>{data.settings.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
