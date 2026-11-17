import type { SkillItem } from '../types/portfolio';
import { renderSkillIcon } from '../utils/skillIcons';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-[#00D9FF] mb-2">Core Toolkit</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            Technical &amp; Analytical Skills
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Tools and methodologies applied across data preparation, relational querying,
            exploratory analysis, and executive dashboard design.
          </p>
        </div>

        {skills.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#101B30] border border-slate-800 text-center text-sm text-slate-400">
            No skills are currently listed.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="group rounded-xl bg-[#101B30] border border-slate-800/80 hover:border-[#078BFF]/60 p-5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#080D1A] border border-slate-800 group-hover:border-[#078BFF]/40 flex items-center justify-center text-[#00D9FF] shrink-0 transition-colors">
                    {renderSkillIcon(skill.iconKey, 'w-5 h-5')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white">{skill.name}</h3>
                    <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
