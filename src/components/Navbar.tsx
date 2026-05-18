'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/src/siteConfig';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left — logo + nav links */}
          <div className="flex items-center gap-10">
            <a href="/">
              <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-14" />
            </a>

            <div className="hidden lg:flex items-center gap-7">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-neutral-400 hover:text-[#122056] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — text link + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="/#cennik" className="text-[13px] text-neutral-400 hover:text-[#122056] transition-colors">
              Cennik
            </a>
            <a
              href="/zamow"
              className="inline-flex items-center gap-2 bg-[#122056] text-white text-[13px] font-semibold pl-5 pr-1.5 py-1.5 rounded-full hover:bg-[#1a2d6e] transition-colors"
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
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-neutral-400 hover:text-[#122056] border-b border-neutral-50 last:border-0"
            >
              {item.label}
            </a>
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
