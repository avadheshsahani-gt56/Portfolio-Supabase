import { useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Eye,
  FileText,
  FolderKanban,
  GraduationCap,
  Image,
  Images,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Menu,
  Save,
  Settings,
  SlidersHorizontal,
  UserCircle,
  UserCog,
  X,
} from 'lucide-react';
import type {
  AdminSectionId,
  ContactMessage,
  PortfolioData,
} from '../types/portfolio';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { OverviewPanel } from './panels/OverviewPanel';
import { ProfilePanel } from './panels/ProfilePanel';
import { PhotoPanel } from './panels/PhotoPanel';
import { AboutPanel } from './panels/AboutPanel';
import { SkillsPanel } from './panels/SkillsPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { ProjectImagesPanel } from './panels/ProjectImagesPanel';
import { EducationPanel } from './panels/EducationPanel';
import { CertificatesPanel } from './panels/CertificatesPanel';
import { ResumePanel } from './panels/ResumePanel';
import { SocialLinksPanel } from './panels/SocialLinksPanel';
import { MessagesPanel } from './panels/MessagesPanel';
import { SettingsPanel } from './panels/SettingsPanel';

interface AdminDashboardPageProps {
  adminEmail: string;
  draftData: PortfolioData;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  saveError: string | null;
  saveSuccessMessage: string | null;
  messages: ContactMessage[];
  onChangeDraft: (updater: (prev: PortfolioData) => PortfolioData) => void;
  onSaveChanges: () => Promise<boolean>;
  onCancelChanges: () => void;
  onResetAll: () => void;
  onToggleMessageRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onPreviewChanges: () => void;
  onLogout: () => void;
}

const SIDEBAR_ITEMS: {
  id: AdminSectionId;
  label: string;
  icon: ReactNode;
}[] = [
  {
    id: 'overview',
    label: 'Dashboard Overview',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  { id: 'profile', label: 'Edit Profile', icon: <UserCog className="w-4 h-4" /> },
  {
    id: 'photo',
    label: 'Profile Photo Management',
    icon: <Image className="w-4 h-4" />,
  },
  {
    id: 'about',
    label: 'About Section Management',
    icon: <UserCircle className="w-4 h-4" />,
  },
  {
    id: 'skills',
    label: 'Skills Management',
    icon: <SlidersHorizontal className="w-4 h-4" />,
  },
  {
    id: 'projects',
    label: 'Projects Management',
    icon: <FolderKanban className="w-4 h-4" />,
  },
  {
    id: 'project-images',
    label: 'Project Images Management',
    icon: <Images className="w-4 h-4" />,
  },
  {
    id: 'education',
    label: 'Education Management',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 'certificates',
    label: 'Certificates Management',
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: 'resume',
    label: 'Resume Management',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 'social-links',
    label: 'Social Links Management',
    icon: <Link2 className="w-4 h-4" />,
  },
  { id: 'messages', label: 'Contact Messages', icon: <Mail className="w-4 h-4" /> },
  {
    id: 'settings',
    label: 'Website Settings',
    icon: <Settings className="w-4 h-4" />,
  },
];

export function AdminDashboardPage({
  adminEmail,
  draftData,
  hasUnsavedChanges,
  isSaving,
  saveError,
  saveSuccessMessage,
  messages,
  onChangeDraft,
  onSaveChanges,
  onCancelChanges,
  onResetAll,
  onToggleMessageRead,
  onDeleteMessage,
  onPreviewChanges,
  onLogout,
}: AdminDashboardPageProps) {
  const [activeSection, setActiveSection] = useState<AdminSectionId>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleLogoutClick = () => {
    if (hasUnsavedChanges) {
      setConfirmLogoutOpen(true);
    } else {
      onLogout();
    }
  };

  const renderPanel = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewPanel
            data={draftData}
            messages={messages}
            hasUnsavedChanges={hasUnsavedChanges}
            onNavigateSection={setActiveSection}
            onEditWebsite={() => setActiveSection('profile')}
          />
        );
      case 'profile':
        return <ProfilePanel data={draftData} onChange={onChangeDraft} />;
      case 'photo':
        return <PhotoPanel data={draftData} onChange={onChangeDraft} />;
      case 'about':
        return <AboutPanel data={draftData} onChange={onChangeDraft} />;
      case 'skills':
        return <SkillsPanel data={draftData} onChange={onChangeDraft} />;
      case 'projects':
        return <ProjectsPanel data={draftData} onChange={onChangeDraft} />;
      case 'project-images':
        return <ProjectImagesPanel data={draftData} onChange={onChangeDraft} />;
      case 'education':
        return <EducationPanel data={draftData} onChange={onChangeDraft} />;
      case 'certificates':
        return <CertificatesPanel data={draftData} onChange={onChangeDraft} />;
      case 'resume':
        return <ResumePanel data={draftData} onChange={onChangeDraft} />;
      case 'social-links':
        return <SocialLinksPanel data={draftData} onChange={onChangeDraft} />;
      case 'messages':
        return (
          <MessagesPanel
            messages={messages}
            onToggleRead={onToggleMessageRead}
            onDelete={onDeleteMessage}
          />
        );
      case 'settings':
        return (
          <SettingsPanel
            data={draftData}
            onChange={onChangeDraft}
            onResetAll={onResetAll}
          />
        );
    }
  };

  const activeLabel =
    SIDEBAR_ITEMS.find((item) => item.id === activeSection)?.label ??
    'Dashboard Overview';

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100 flex">
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-[#0B1224] border-r border-slate-800/80">
        <div className="px-5 py-5 border-b border-slate-800/80">
          <p className="text-sm font-bold text-white">Portfolio Admin UI</p>
          <p className="text-xs text-[#00D9FF] truncate mt-0.5">{adminEmail}</p>
        </div>

        <nav
          aria-label="Admin sidebar navigation"
          className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
        >
          {SIDEBAR_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-[#078BFF] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-[#101B30]'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.id === 'messages' && unreadCount > 0 && (
                  <span className="font-mono tabular-nums text-[11px] px-1.5 py-0.5 rounded bg-black/30">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0B1224] border-r border-slate-800 flex flex-col h-full z-10">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">Portfolio Admin UI</p>
                <p className="text-xs text-[#00D9FF] truncate">{adminEmail}</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Close sidebar"
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {SIDEBAR_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-medium rounded-lg transition-colors ${
                      active
                        ? 'bg-[#078BFF] text-white'
                        : 'text-slate-300 hover:text-white hover:bg-[#101B30]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </span>
                    {item.id === 'messages' && unreadCount > 0 && (
                      <span className="font-mono tabular-nums text-[11px]">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#080D1A]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open admin menu"
                className="lg:hidden p-2 rounded-lg bg-[#101B30] border border-slate-800 text-slate-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-mono text-slate-400">
                  Admin / {activeLabel}
                </p>
                <h1 className="text-base font-bold text-white truncate">
                  {activeLabel}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveSection('profile')}
                className="px-3 py-2 text-xs font-medium text-slate-200 bg-[#101B30] hover:border-[#00D9FF] border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Edit Website
              </button>

              <button
                type="button"
                onClick={onPreviewChanges}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-[#101B30] hover:border-[#00D9FF] border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Eye className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Preview Changes</span>
              </button>

              <button
                type="button"
                disabled={!hasUnsavedChanges || isSaving}
                onClick={onCancelChanges}
                className="px-3 py-2 text-xs font-medium text-slate-300 bg-[#101B30] hover:bg-slate-800 border border-slate-700 disabled:opacity-40 rounded-lg transition-colors whitespace-nowrap"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!hasUnsavedChanges || isSaving}
                onClick={onSaveChanges}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#078BFF] hover:bg-[#078BFF]/90 disabled:opacity-40 rounded-lg transition-colors whitespace-nowrap"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto space-y-5">
            {hasUnsavedChanges && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-200"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>
                    Unsaved changes detected. Click &ldquo;Save Changes&rdquo; to save
                    them locally or &ldquo;Cancel&rdquo; to revert.
                  </span>
                </div>
              </div>
            )}

            {saveError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300"
              >
                {saveError}
              </div>
            )}

            {saveSuccessMessage && !hasUnsavedChanges && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {renderPanel()}
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={confirmLogoutOpen}
        title="Unsaved Changes"
        description="You have unsaved edits in the Admin Dashboard. Logging out will leave them unsaved. Continue?"
        confirmLabel="Discard & Logout"
        cancelLabel="Stay in Admin"
        destructive
        onCancel={() => setConfirmLogoutOpen(false)}
        onConfirm={() => {
          onCancelChanges();
          setConfirmLogoutOpen(false);
          onLogout();
        }}
      />
    </div>
  );
}
