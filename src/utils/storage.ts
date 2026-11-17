import type { ContactMessage, PortfolioData } from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialPortfolio';

const PORTFOLIO_STORAGE_KEY = 'avadhesh_portfolio_phase1_data_v1';
const MESSAGES_STORAGE_KEY = 'avadhesh_portfolio_phase1_messages_v1';
const ADMIN_SESSION_KEY = 'avadhesh_portfolio_phase1_admin_session_v1';

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return structuredClone(INITIAL_PORTFOLIO_DATA);
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...parsed.profile },
      about: { ...INITIAL_PORTFOLIO_DATA.about, ...parsed.about },
      socialLinks: { ...INITIAL_PORTFOLIO_DATA.socialLinks, ...parsed.socialLinks },
      skills: Array.isArray(parsed.skills) ? parsed.skills : INITIAL_PORTFOLIO_DATA.skills,
      projects: Array.isArray(parsed.projects) ? parsed.projects : INITIAL_PORTFOLIO_DATA.projects,
      education: Array.isArray(parsed.education)
        ? parsed.education
        : INITIAL_PORTFOLIO_DATA.education,
      certificates: Array.isArray(parsed.certificates)
        ? parsed.certificates
        : INITIAL_PORTFOLIO_DATA.certificates,
      resume: { ...INITIAL_PORTFOLIO_DATA.resume, ...parsed.resume },
      settings: {
        ...INITIAL_PORTFOLIO_DATA.settings,
        ...parsed.settings,
        sectionVisibility: {
          ...INITIAL_PORTFOLIO_DATA.settings.sectionVisibility,
          ...(parsed.settings?.sectionVisibility ?? {}),
        },
      },
    };
  } catch {
    return structuredClone(INITIAL_PORTFOLIO_DATA);
  }
}

export function savePortfolioData(data: PortfolioData): { ok: boolean; error?: string } {
  try {
    window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        'Browser storage quota exceeded. Try using smaller image/PDF uploads or reset large local media files.',
    };
  }
}

export function resetPortfolioStorage(): PortfolioData {
  try {
    window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
  return structuredClone(INITIAL_PORTFOLIO_DATA);
}

export function loadContactMessages(): ContactMessage[] {
  try {
    const raw = window.localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveContactMessages(messages: ContactMessage[]): void {
  try {
    window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore quota error
  }
}

export interface PrototypeAdminSession {
  email: string;
  startedAt: string;
}

export function loadAdminSession(): PrototypeAdminSession | null {
  try {
    const raw = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PrototypeAdminSession;
    return parsed && typeof parsed.email === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAdminSession(session: PrototypeAdminSession | null): void {
  try {
    if (!session) {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } else {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    }
  } catch {
    // ignore storage error
  }
}

export function readFileAsDataUrl(file: File, maxSizeMB = 2.5): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      reject(
        new Error(
          `File "${file.name}" exceeds ${maxSizeMB} MB limit for Phase 1 browser storage.`
        )
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Could not read selected file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read selected file.'));
    reader.readAsDataURL(file);
  });
}

export function isValidExternalUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/')) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}
