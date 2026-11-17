import type { PortfolioData } from '../../types/portfolio';

interface ProfilePanelProps {
  data: PortfolioData;
  onChange: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export function ProfilePanel({ data, onChange }: ProfilePanelProps) {
  const { profile } = data;

  const updateField = <K extends keyof typeof profile>(
    field: K,
    value: (typeof profile)[K]
  ) => {
    onChange((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  return (
    <div className="rounded-2xl bg-[#101B30] border border-slate-800 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        <p className="mt-1 text-sm text-slate-400">
          Update hero headline, professional title, name, email, and primary summary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="profile-name"
            className="block text-sm font-medium text-slate-200 mb-1.5"
          >
            Full Name
          </label>
          <input
            id="profile-name"
            type="text"
            value={profile.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
          />
        </div>

        <div>
          <label
            htmlFor="profile-title"
            className="block text-sm font-medium text-slate-200 mb-1.5"
          >
            Professional Title
          </label>
          <input
            id="profile-title"
            type="text"
            value={profile.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="profile-headline"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          Headline
        </label>
        <input
          id="profile-headline"
          type="text"
          value={profile.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
        />
      </div>

      <div>
        <label
          htmlFor="profile-hero-heading"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          Hero Main Heading
        </label>
        <input
          id="profile-hero-heading"
          type="text"
          value={profile.heroHeading}
          onChange={(e) => updateField('heroHeading', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
        />
      </div>

      <div>
        <label
          htmlFor="profile-email"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          Public Contact Email
        </label>
        <input
          id="profile-email"
          type="email"
          value={profile.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
        />
      </div>

      <div>
        <label
          htmlFor="profile-summary"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          Professional Summary
        </label>
        <textarea
          id="profile-summary"
          rows={4}
          value={profile.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#080D1A] border border-slate-700 rounded-lg focus:outline-none focus:border-[#00D9FF]"
        />
      </div>
    </div>
  );
}
