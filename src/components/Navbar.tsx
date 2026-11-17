import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { SectionVisibility } from '../types/portfolio';

interface NavbarProps {
  brandName: string;
  visibility: SectionVisibility;
}

export function Navbar({ brandName, visibility }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; href: string; visible: boolean }[] = [
    { label: 'Home', href: '#home', visible: true },
    { label: 'About', href: '#about', visible: visibility.about },
    { label: 'Skills', href: '#skills', visible: visibility.skills },
    { label: 'Projects', href: '#projects', visible: visibility.projects },
    { label: 'Education', href: '#education', visible: visibility.education },
    { label: 'Certificates', href: '#certificates', visible: visibility.certificates },
    { label: 'Resume', href: '#resume', visible: visibility.resume },
  ].filter((item) => item.visible);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080D1A]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-[#00D9FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF] rounded"
        >
          {brandName}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#00D9FF]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {visibility.contact && (
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
            >
              Contact
            </a>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-200 hover:text-white hover:bg-[#101B30] border border-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden bg-[#080D1A] border-b border-slate-800 px-4 py-4 space-y-1"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="block px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#101B30] rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          {visibility.contact && (
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="block mt-2 px-3 py-2.5 text-sm font-medium text-center text-white bg-[#078BFF] hover:bg-[#078BFF]/90 rounded-lg transition-colors"
            >
              Contact
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
