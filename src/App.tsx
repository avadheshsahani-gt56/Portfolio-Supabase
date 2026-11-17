import { useEffect, useState } from 'react';
import { AdminDashboardPage } from './admin/AdminDashboardPage';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { usePortfolioStore } from './hooks/usePortfolioStore';
import { useRouter } from './hooks/useRouter';
import { PortfolioPage } from './pages/PortfolioPage';

export default function App() {
  const { route, navigate } = useRouter();
  const store = usePortfolioStore();
  const [adminPreviewMode, setAdminPreviewMode] = useState(false);

  useEffect(() => {
    if (route === '/admin/dashboard' && !store.adminSession) {
      navigate('/admin/login', true);
    }
  }, [route, store.adminSession, navigate]);

  if (route === '/admin/login') {
    if (store.adminSession) {
      return (
        <AdminDashboardPage
          adminEmail={store.adminSession.email}
          draftData={store.draftData}
          hasUnsavedChanges={store.hasUnsavedChanges}
          isSaving={store.isSaving}
          saveError={store.saveError}
          saveSuccessMessage={store.saveSuccessMessage}
          messages={store.messages}
          onChangeDraft={store.updateDraft}
          onSaveChanges={store.saveDraft}
          onCancelChanges={store.cancelDraft}
          onResetAll={store.resetAllData}
          onToggleMessageRead={store.toggleMessageRead}
          onDeleteMessage={store.deleteMessage}
          onPreviewChanges={() => {
            setAdminPreviewMode(true);
            navigate('/');
          }}
          onLogout={() => {
            setAdminPreviewMode(false);
            store.endAdminPrototypeSession();
            navigate('/admin/login', true);
          }}
        />
      );
    }

    return (
      <AdminLoginPage
        onLoginSuccess={(email) => {
          const ok = store.startAdminPrototypeSession(email);
          if (ok) {
            navigate('/admin/dashboard', true);
          }
          return ok;
        }}
        onBackToPortfolio={() => {
          setAdminPreviewMode(false);
          navigate('/');
        }}
      />
    );
  }

  if (route === '/admin/dashboard') {
    if (!store.adminSession) {
      return (
        <AdminLoginPage
          onLoginSuccess={(email) => {
            const ok = store.startAdminPrototypeSession(email);
            if (ok) {
              navigate('/admin/dashboard', true);
            }
            return ok;
          }}
          onBackToPortfolio={() => navigate('/')}
        />
      );
    }

    return (
      <AdminDashboardPage
        adminEmail={store.adminSession.email}
        draftData={store.draftData}
        hasUnsavedChanges={store.hasUnsavedChanges}
        isSaving={store.isSaving}
        saveError={store.saveError}
        saveSuccessMessage={store.saveSuccessMessage}
        messages={store.messages}
        onChangeDraft={store.updateDraft}
        onSaveChanges={store.saveDraft}
        onCancelChanges={store.cancelDraft}
        onResetAll={store.resetAllData}
        onToggleMessageRead={store.toggleMessageRead}
        onDeleteMessage={store.deleteMessage}
        onPreviewChanges={() => {
          setAdminPreviewMode(true);
          navigate('/');
        }}
        onLogout={() => {
          setAdminPreviewMode(false);
          store.endAdminPrototypeSession();
          navigate('/admin/login', true);
        }}
      />
    );
  }

  const displayedData =
    adminPreviewMode && store.adminSession ? store.draftData : store.savedData;

  return (
    <PortfolioPage
      data={displayedData}
      onSubmitMessage={store.addContactMessage}
      previewNotice={Boolean(adminPreviewMode && store.adminSession)}
      onReturnToAdmin={() => {
        setAdminPreviewMode(false);
        navigate('/admin/dashboard');
      }}
    />
  );
}
