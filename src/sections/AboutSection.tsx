import { Compass, Cpu, Target, User } from 'lucide-react';
import type { AboutData, ProfileData } from '../types/portfolio';
import { FallbackImage } from '../components/FallbackImage';

interface AboutSectionProps {
  profile: ProfileData;
  about: AboutData;
}

export function AboutSection({ profile, about }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-[#00D9FF] mb-2">About Me</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            Analytical Rigor Paired with Clear Visual Storytelling
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-5 space-y-5">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#080D1A] border border-slate-800">
                <FallbackImage
                  src={profile.photoUrl}
                  alt={`${profile.name} portrait`}
                  className="w-full h-full object-cover object-top"
                  fallbackTitle={profile.name}
                  fallbackIcon={<User className="w-10 h-10" />}
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                <p className="text-sm text-[#00D9FF]">{profile.title}</p>
                <p className="text-xs text-slate-400 pt-1">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-semibold text-white">Professional Summary</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {about.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-[#00D9FF]">
                  <Compass className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-semibold text-white">
                    Data Analytics Interests
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {about.analyticsInterests.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[#078BFF] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-[#00D9FF]">
                  <Cpu className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-semibold text-white">
                    Technical Capabilities
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {about.technicalCapabilities.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00D9FF] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-[#00D9FF]">
                <Target className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-semibold text-white">Career Objective</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {about.careerObjective}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
