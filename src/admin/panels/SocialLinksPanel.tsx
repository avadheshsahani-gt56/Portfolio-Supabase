import { Github, Linkedin } from 'lucide-react';
import type { PortfolioData } from '../../types/portfolio';
import { isValidExternalUrl } from '../../utils/storage';

interface SocialLinksPanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function SocialLinksPanel({ data, onChange }: SocialLinksPanelProps) {
  const { socialLinks } = data;

  const updateSocial = (field: 'githubUrl' | 'linkedinUrl', value: string) => {
    onChange((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value,
      },
    }));
  };

  return (
    <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Social Links Management</h2>
        <p className="mt-1 text-sm text-slate-400">
          Configure GitHub and LinkedIn profile URLs. Leave blank to keep them as
          graceful placeholders without broken links.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="social-github"
            className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-1.5"
          >
            <Github className="w-4 h-4 text-[#00D9FF]" />
            <span>GitHub Profile URL</span>
          </label>
          <input
            id="social-github"
            type="url"
            value={socialLinks.githubUrl}
            onChange={(e) => updateSocial('githubUrl', e.target.value)}
            placeholder="https://github.com/your-username"
            className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Status:{' '}
            {isValidExternalUrl(socialLinks.githubUrl)
              ? 'Active external link'
              : 'Placeholder (not linked yet)'}
          </p>
        </div>

        <div>
          <label
            htmlFor="social-linkedin"
            className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-1.5"
          >
            <Linkedin className="w-4 h-4 text-[#00D9FF]" />
            <span>LinkedIn Profile URL</span>
          </label>
          <input
            id="social-linkedin"
            type="url"
            value={socialLinks.linkedinUrl}
            onChange={(e) => updateSocial('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Status:{' '}
            {isValidExternalUrl(socialLinks.linkedinUrl)
              ? 'Active external link'
              : 'Placeholder (not linked yet)'}
          </p>
        </div>
      </div>
    </div>
  );
}
