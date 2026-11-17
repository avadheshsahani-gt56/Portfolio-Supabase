import { GraduationCap } from 'lucide-react';
import type { EducationItem } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-16 sm:py-24 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-[#00D9FF] mb-2">Academic Background</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            Education
          </h2>
        </div>

        {education.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#101B30] border border-slate-800 text-center text-sm text-slate-400">
            No education entries are currently listed.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-2xl bg-[#101B30] border border-slate-800/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#080D1A] border border-slate-800 flex items-center justify-center text-[#00D9FF] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">{edu.qualification}</h3>
                  <p className="text-sm sm:text-base font-medium text-[#00D9FF]">
                    {edu.institution}
                  </p>
                  {edu.details && (
                    <p className="text-sm text-slate-300 leading-relaxed max-w-3xl pt-1">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
