import { useState } from 'react';
import { ArrowDownRight, Download, Github, Linkedin, User } from 'lucide-react';
import type { ProfileData, ResumeData, SocialLinksData } from '../types/portfolio';
import { isValidExternalUrl } from '../utils/storage';
import { FallbackImage } from '../components/FallbackImage';

interface HeroSectionProps {
  profile: ProfileData;
  socialLinks: SocialLinksData;
  resume: ResumeData;
}

export function HeroSection({ profile, socialLinks, resume }: HeroSectionProps) {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const hasGithub = isValidExternalUrl(socialLinks.githubUrl);
  const hasLinkedin = isValidExternalUrl(socialLinks.linkedinUrl);

  const handlePlaceholderClick = (platform: 'GitHub' | 'LinkedIn') => {
    setSocialNotice(
      `${platform} URL is a placeholder for now and can be configured in the Admin Dashboard.`
    );
    window.setTimeout(() => setSocialNotice(null), 3500);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-800/80 bg-[#080D1A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(7,139,255,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(0,217,255,0.08),transparent_50%)]"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-medium text-[#00D9FF]">
                {profile.name}
              </p>
              <p className="text-xs sm:text-sm font-mono text-slate-400">
                {profile.title} · {profile.headline}
              </p>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance] max-w-2xl">
              {profile.heroHeading}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {profile.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
              >
                <span>View My Projects</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              {resume.fileUrl ? (
                <a
                  href={resume.fileUrl}
                  download={resume.fileName || 'Avadhesh_Sahani_Resume.pdf'}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-100 bg-[#101B30] hover:border-[#00D9FF] border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <Download className="w-4 h-4 text-[#00D9FF]" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <a
                  href="#resume"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-300 bg-[#101B30] border border-slate-800 rounded-lg hover:border-slate-600 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Resume Details</span>
                </a>
              )}

              <div className="flex items-center gap-2 sm:ml-2">
                {hasGithub ? (
                  <a
                    href={socialLinks.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    title="GitHub"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#101B30] border border-slate-800 hover:border-[#078BFF] text-slate-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePlaceholderClick('GitHub')}
                    aria-label="GitHub link placeholder"
                    title="GitHub (Placeholder)"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#101B30] border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <Github className="w-5 h-5" />
                  </button>
                )}

                {hasLinkedin ? (
                  <a
                    href={socialLinks.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    title="LinkedIn"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#101B30] border border-slate-800 hover:border-[#078BFF] text-slate-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePlaceholderClick('LinkedIn')}
                    aria-label="LinkedIn link placeholder"
                    title="LinkedIn (Placeholder)"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#101B30] border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {socialNotice && (
              <p className="text-xs text-slate-400" role="status">
                {socialNotice}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1.5 bg-gradient-to-br from-[#078BFF]/60 via-[#00D9FF]/30 to-slate-800 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#101B30] border border-slate-800">
                <FallbackImage
                  src={profile.photoUrl}
                  alt={`${profile.name} — ${profile.title}`}
                  className="w-full h-full object-cover object-top"
                  fallbackTitle={profile.name}
                  fallbackIcon={<User className="w-12 h-12" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
