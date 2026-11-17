import { useCallback, useMemo, useState } from 'react';
import { AUTHORIZED_ADMIN_EMAIL } from '../data/initialPortfolio';
import type { ContactMessage, PortfolioData } from '../types/portfolio';
import {
  loadAdminSession,
  loadContactMessages,
  loadPortfolioData,
  type PrototypeAdminSession,
  resetPortfolioStorage,
  saveAdminSession,
  saveContactMessages,
  savePortfolioData,
} from '../utils/storage';

export function usePortfolioStore() {
  const [savedData, setSavedData] = useState<PortfolioData>(() => loadPortfolioData());
  const [draftData, setDraftData] = useState<PortfolioData>(() => loadPortfolioData());
  const [messages, setMessages] = useState<ContactMessage[]>(() => loadContactMessages());
  const [adminSession, setAdminSession] = useState<PrototypeAdminSession | null>(() =>
    loadAdminSession()
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(savedData) !== JSON.stringify(draftData),
    [savedData, draftData]
  );

  const updateDraft = useCallback(
    (updater: (prev: PortfolioData) => PortfolioData) => {
      setSaveError(null);
      setSaveSuccessMessage(null);
      setDraftData((prev) => updater(prev));
    },
    []
  );

  const saveDraft = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccessMessage(null);

    await new Promise((r) => setTimeout(r, 180));
    const result = savePortfolioData(draftData);
    setIsSaving(false);

    if (!result.ok) {
      setSaveError(result.error ?? 'Failed to save changes.');
      return false;
    }

    setSavedData(structuredClone(draftData));
    setSaveSuccessMessage(
      'Changes saved to browser storage (Phase 1 local prototype).'
    );
    return true;
  }, [draftData]);

  const cancelDraft = useCallback(() => {
    setSaveError(null);
    setSaveSuccessMessage(null);
    setDraftData(structuredClone(savedData));
  }, [savedData]);

  const resetAllData = useCallback(() => {
    setSaveError(null);
    const fresh = resetPortfolioStorage();
    setSavedData(fresh);
    setDraftData(structuredClone(fresh));
    setSaveSuccessMessage('Restored default verified portfolio content.');
  }, []);

  const addContactMessage = useCallback(
    (input: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
      const nextMsg: ContactMessage = {
        ...input,
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => {
        const updated = [nextMsg, ...prev];
        saveContactMessages(updated);
        return updated;
      });
    },
    []
  );

  const toggleMessageRead = useCallback((id: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m));
      saveContactMessages(updated);
      return updated;
    });
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveContactMessages(updated);
      return updated;
    });
  }, []);

  const startAdminPrototypeSession = useCallback((email: string): boolean => {
    const normalized = email.trim().toLowerCase();
    if (normalized !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return false;
    }
    const session: PrototypeAdminSession = {
      email: AUTHORIZED_ADMIN_EMAIL,
      startedAt: new Date().toISOString(),
    };
    saveAdminSession(session);
    setAdminSession(session);
    return true;
  }, []);

  const endAdminPrototypeSession = useCallback(() => {
    saveAdminSession(null);
    setAdminSession(null);
  }, []);

  return {
    savedData,
    draftData,
    hasUnsavedChanges,
    isSaving,
    saveError,
    saveSuccessMessage,
    updateDraft,
    saveDraft,
    cancelDraft,
    resetAllData,
    messages,
    addContactMessage,
    toggleMessageRead,
    deleteMessage,
    adminSession,
    startAdminPrototypeSession,
    endAdminPrototypeSession,
  };
}
