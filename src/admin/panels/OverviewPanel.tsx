import {
  Award,
  FolderKanban,
  GraduationCap,
  Layers,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import type { AdminSectionId, ContactMessage, PortfolioData } from '../../types/portfolio';

interface OverviewPanelProps {
  data: PortfolioData;
  messages: ContactMessage[];
  hasUnsavedChanges: boolean;
  onNavigateSection: (section: AdminSectionId) => void;
  onEditWebsite: () => void;
}

export function OverviewPanel({
  data,
  messages,
  hasUnsavedChanges,
  onNavigateSection,
  onEditWebsite,
}: OverviewPanelProps) {
  const unreadCount = messages.filter((m) => !m.read).length;
  const visibleProjects = data.projects.filter((p) => p.visible).length;

  const stats = [
    {
      label: 'Skills Listed',
      value: data.skills.length,
      icon: <Layers className="w-5 h-5 text-[#00D9FF]" />,
      target: 'skills' as AdminSectionId,
    },
    {
      label: 'Projects (Visible)',
      value: `${visibleProjects} / ${data.projects.length}`,
      icon: <FolderKanban className="w-5 h-5 text-[#00D9FF]" />,
      target: 'projects' as AdminSectionId,
    },
    {
      label: 'Certificates',
      value: data.certificates.length,
      icon: <Award className="w-5 h-5 text-[#00D9FF]" />,
      target: 'certificates' as AdminSectionId,
    },
    {
      label: 'Education Entries',
      value: data.education.length,
      icon: <GraduationCap className="w-5 h-5 text-[#00D9FF]" />,
      target: 'education' as AdminSectionId,
    },
    {
      label: 'Unread Demo Messages',
      value: `${unreadCount} / ${messages.length}`,
      icon: <Mail className="w-5 h-5 text-[#00D9FF]" />,
      target: 'messages' as AdminSectionId,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage Avadhesh Sahani&apos;s portfolio sections, Power BI screenshots,
            certificates, resume PDF, and local demo messages.
          </p>
        </div>
        <button
          type="button"
          onClick={onEditWebsite}
          className="px-4 py-2.5 text-sm font-semibold text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          Edit Website
        </button>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-amber-300">
            Phase 1 Frontend Prototype Storage
          </p>
          <p className="mt-1">
            Edits saved here are stored locally in your browser&apos;s{' '}
            <span className="font-mono">localStorage</span> for demonstration. They are
            not shared across visitors or protected by backend security yet. Phase 2 will
            connect Supabase PostgreSQL, Storage, Auth, and Row Level Security.
          </p>
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className="p-4 rounded-xl bg-[#078BFF]/10 border border-[#078BFF]/40 text-sm text-slate-200">
          You have unsaved draft modifications. Use &ldquo;Save Changes&rdquo; in the top
          bar to persist them locally or &ldquo;Cancel&rdquo; to revert.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigateSection(item.target)}
            className="text-left p-5 rounded-xl bg-[#101B30] border border-slate-800 hover:border-[#078BFF]/60 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{item.label}</span>
              {item.icon}
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-white">
              {item.value}
            </p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-3">
        <h3 className="text-base font-semibold text-white">Phase 2 Integration Readiness</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• All portfolio records are typed and isolated from UI components.</li>
          <li>
            • Profile photo, project screenshots, certificate images, and resume PDF use
            clean URL/file abstractions ready for Supabase Storage buckets.
          </li>
          <li>
            • Admin access is isolated under <span className="font-mono">/admin/*</span>{' '}
            and hidden from public navigation.
          </li>
        </ul>
      </div>
    </div>
  );
}
