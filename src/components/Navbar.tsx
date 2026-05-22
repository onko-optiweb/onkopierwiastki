'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/src/siteConfig';

function DesktopDropdown({ item }: { item: (typeof siteConfig.nav)[number] }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  useEffect(() => () => clearTimeout(timeout.current), []);

  if (!item.children) {
    return (
      <a href={item.href} className="text-sm font-semibold text-[#122056]/60 hover:text-[#122056] transition-colors">
        {item.label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <a
        href={item.href}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#122056]/60 hover:text-[#122056] transition-colors"
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </a>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-neutral-100 py-2 min-w-[200px]">
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="block px-4 py-2 text-sm text-[#122056]/70 hover:text-[#122056] hover:bg-[#EEEFFD]/50 transition-colors"
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left — logo + nav links */}
          <div className="flex items-center gap-10">
            <a href="/">
              <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-14" />
            </a>

            <div className="hidden lg:flex items-center gap-7 mt-[10px]">
              {siteConfig.nav.map((item) => (
                <DesktopDropdown key={item.href} item={item} />
              ))}
            </div>
          </div>

          {/* Right — text link + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="/#cennik" className="text-sm font-semibold text-[#122056]/60 hover:text-[#122056] transition-colors">
              Cennik
            </a>
            <a
              href="/zamow"
              className="inline-flex items-center gap-2 bg-[#122056] text-white text-sm font-semibold pl-5 pr-1.5 py-1.5 rounded-full hover:bg-[#1a2d6e] transition-colors"
            >
              Zamów badanie
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={14} className="text-[#122056]" />
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-neutral-100 px-4 pb-4">
          {siteConfig.nav.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === item.href ? null : item.href)}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-[#122056]/70 hover:text-[#122056] border-b border-neutral-50"
                  >
                    {item.label}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSubmenu === item.href ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === item.href && (
                    <div className="bg-neutral-50 rounded-lg my-1">
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[#5B65DC] font-medium border-b border-neutral-100"
                      >
                        Wszystkie placówki
                      </a>
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2.5 text-sm text-[#122056]/60 hover:text-[#122056]"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-[#122056]/70 hover:text-[#122056] border-b border-neutral-50 last:border-0"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <a
            href="/zamow"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 mt-3 bg-[#122056] text-white text-sm font-semibold py-3 rounded-full"
          >
            Zamów badanie
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </nav>
  );
}
