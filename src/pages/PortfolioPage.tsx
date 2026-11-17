import { useState } from 'react';
import { CertificateModal } from '../components/CertificateModal';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ResumePreviewModal } from '../components/ResumePreviewModal';
import { AboutSection } from '../sections/AboutSection';
import { CertificatesSection } from '../sections/CertificatesSection';
import { ContactSection } from '../sections/ContactSection';
import { EducationSection } from '../sections/EducationSection';
import { HeroSection } from '../sections/HeroSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ResumeSection } from '../sections/ResumeSection';
import { SkillsSection } from '../sections/SkillsSection';
import type { CertificateItem, ContactMessage, PortfolioData, ProjectItem } from '../types/portfolio';

interface PortfolioPageProps {
  data: PortfolioData;
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  previewNotice?: boolean;
  onReturnToAdmin?: () => void;
}

export function PortfolioPage({
  data,
  onSubmitMessage,
  previewNotice = false,
  onReturnToAdmin,
}: PortfolioPageProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(
    null
  );
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);

  const { sectionVisibility } = data.settings;

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      {previewNotice && onReturnToAdmin && (
        <div className="bg-[#078BFF]/15 border-b border-[#078BFF]/40 px-4 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-200">
              Admin Preview Mode — Viewing draft changes locally before or after saving.
            </span>
            <button
              type="button"
              onClick={onReturnToAdmin}
              className="px-3 py-1.5 font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-md transition-colors whitespace-nowrap"
            >
              Return to Admin Dashboard
            </button>
          </div>
        </div>
      )}

      <Navbar brandName={data.profile.name} visibility={sectionVisibility} />

      <main className="flex-1">
        <HeroSection
          profile={data.profile}
          socialLinks={data.socialLinks}
          resume={data.resume}
        />

        {sectionVisibility.about && (
          <AboutSection profile={data.profile} about={data.about} />
        )}

        {sectionVisibility.skills && <SkillsSection skills={data.skills} />}

        {sectionVisibility.projects && (
          <ProjectsSection
            projects={data.projects}
            onSelectProject={setSelectedProject}
          />
        )}

        {sectionVisibility.education && (
          <EducationSection education={data.education} />
        )}

        {sectionVisibility.certificates && (
          <CertificatesSection
            certificates={data.certificates}
            onSelectCertificate={setSelectedCertificate}
          />
        )}

        {sectionVisibility.resume && (
          <ResumeSection
            resume={data.resume}
            onOpenPreview={() => setResumePreviewOpen(true)}
          />
        )}

        {sectionVisibility.contact && (
          <ContactSection
            email={data.profile.email}
            onSubmitMessage={onSubmitMessage}
          />
        )}
      </main>

      <Footer data={data} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <ResumePreviewModal
        open={resumePreviewOpen}
        resume={data.resume}
        onClose={() => setResumePreviewOpen(false)}
      />
    </div>
  );
}
