import { useState, type FormEvent } from 'react';
import { ArrowLeft, Info, Lock, ShieldAlert } from 'lucide-react';
import { AUTHORIZED_ADMIN_EMAIL } from '../data/initialPortfolio';

interface AdminLoginPageProps {
  onLoginSuccess: (email: string) => boolean;
  onBackToPortfolio: () => void;
}

export function AdminLoginPage({
  onLoginSuccess,
  onBackToPortfolio,
}: AdminLoginPageProps) {
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [acknowledgedPrototype, setAcknowledgedPrototype] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Please enter the authorized admin email address.');
      return;
    }

    if (trimmedEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setError(
        `Access is restricted to the authorized owner email (${AUTHORIZED_ADMIN_EMAIL}).`
      );
      return;
    }

    if (!acknowledgedPrototype) {
      setError(
        'Please confirm that you understand this is a Phase 1 local UI prototype before entering.'
      );
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 180));
    const ok = onLoginSuccess(trimmedEmail);
    setIsSubmitting(false);

    if (!ok) {
      setError('Unable to open the Admin UI prototype.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100 flex flex-col justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto space-y-6">
        <button
          type="button"
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#00D9FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Portfolio</span>
        </button>

        <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="w-11 h-11 rounded-xl bg-[#080D1A] border border-slate-800 flex items-center justify-center text-[#00D9FF]">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight pt-1">
              Portfolio Admin Login
            </h1>
            <p className="text-sm text-slate-400">
              Private management workspace for Avadhesh Sahani&apos;s Data Analyst
              portfolio.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 space-y-2 text-xs text-amber-200/90 leading-relaxed">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Phase 1 Frontend Prototype Notice</span>
            </div>
            <p>
              No password is stored or verified in Phase 1, and browser{' '}
              <span className="font-mono">localStorage</span> is neither secure nor shared
              across visitors. Real authentication and Row Level Security will be
              connected via Supabase Auth in Phase 2.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Authorized Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={AUTHORIZED_ADMIN_EMAIL}
                className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password-phase2"
                className="block text-sm font-medium text-slate-400 mb-1.5"
              >
                Password (Enabled in Phase 2 Supabase Auth)
              </label>
              <input
                id="admin-password-phase2"
                type="password"
                disabled
                value=""
                placeholder="Configured via Supabase Auth in Phase 2"
                className="w-full px-3.5 py-2.5 text-sm text-slate-500 bg-[#080D1A]/60 border border-slate-800 rounded-lg cursor-not-allowed"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={acknowledgedPrototype}
                onChange={(e) => {
                  setAcknowledgedPrototype(e.target.checked);
                  if (error) setError(null);
                }}
                className="mt-0.5 rounded border-slate-600 bg-[#080D1A] text-[#078BFF] focus:ring-[#00D9FF]"
              />
              <span>
                I understand this is a Phase 1 local UI prototype and changes saved here
                only persist in this browser.
              </span>
            </label>

            {error && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#078BFF] hover:bg-[#078BFF]/90 disabled:opacity-60 rounded-lg transition-colors"
            >
              <span>
                {isSubmitting
                  ? 'Opening Admin Dashboard...'
                  : 'Enter Admin UI Prototype'}
              </span>
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
            <span>
              In Phase 2, only the authorized account ({AUTHORIZED_ADMIN_EMAIL}) will
              authenticate via Supabase Auth with database RLS policies.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
