export type SkillIconKey =
  | 'bar-chart-3'
  | 'table'
  | 'database'
  | 'server'
  | 'code-2'
  | 'layers'
  | 'sigma'
  | 'line-chart'
  | 'workflow'
  | 'sparkles'
  | 'search'
  | 'pie-chart'
  | 'layout-dashboard';

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  heroHeading: string;
  summary: string;
  email: string;
  photoUrl: string | null;
}

export interface AboutData {
  summary: string;
  analyticsInterests: string[];
  technicalCapabilities: string[];
  careerObjective: string;
}

export interface SocialLinksData {
  githubUrl: string;
  linkedinUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  description: string;
  iconKey: SkillIconKey;
}

export interface ProjectScreenshot {
  id: string;
  url: string;
  caption: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
}

export interface ProjectSectionBlock {
  heading: string;
  summary: string;
  points?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  tools: string[];
  screenshots: ProjectScreenshot[];
  metrics: ProjectMetric[];
  analysisBlocks: ProjectSectionBlock[];
  discrepancies: string[];
  githubUrl: string;
  reportUrl: string;
  visible: boolean;
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  details: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  imageUrl: string | null;
}

export interface ResumeData {
  fileName: string;
  fileUrl: string | null;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SectionVisibility {
  about: boolean;
  skills: boolean;
  projects: boolean;
  education: boolean;
  certificates: boolean;
  resume: boolean;
  contact: boolean;
}

export interface WebsiteSettings {
  sectionVisibility: SectionVisibility;
  footerTagline: string;
  footerNote: string;
}

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  socialLinks: SocialLinksData;
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  resume: ResumeData;
  settings: WebsiteSettings;
}

export type AdminSectionId =
  | 'overview'
  | 'profile'
  | 'photo'
  | 'about'
  | 'skills'
  | 'projects'
  | 'project-images'
  | 'education'
  | 'certificates'
  | 'resume'
  | 'social-links'
  | 'messages'
  | 'settings';
