'use client';

import { siteConfig } from '@/src/siteConfig';
import { ArrowRight, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Czym jest badanie', href: '/#czym-jest-badanie' },
  { label: 'Dla kogo', href: '/#dla-kogo' },
  { label: 'Jak się przygotować', href: '/#przygotowanie' },
  { label: 'Placówki', href: '/#placowki' },
  { label: 'Zamów online', href: '/#zamow' },
  { label: 'O badaniu', href: '/#o-badaniu' },
  { label: 'Blog', href: '/blog' },
];

const legalLinks = [
  { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
  { label: 'Regulamin', href: '/regulamin' },
  { label: 'Cennik', href: '/#cennik' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Ustawienia cookies', href: '#cookies', onClick: true },
];

export default function Footer() {
  return (
    <footer className="bg-white px-3 sm:px-4 pb-4">
      <div className="max-w-[1800px] mx-auto bg-[#0a0a0a] rounded-[2rem] text-white/60 overflow-hidden">

        {/* Top bar — CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 lg:px-12 py-10 border-b border-white/10">
          <h3 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-white">
            Zbadaj swoje onkopierwiastki
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href="/#placowki" className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold pl-5 pr-2 py-2 rounded-full hover:bg-[#4a53c7] transition-colors">
              Znajdź placówkę
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin size={13} />
              </span>
            </a>
            <a href="/#cennik" className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold pl-5 pr-2 py-2 rounded-full hover:bg-white/15 transition-colors border border-white/10">
              Zamów badanie
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowRight size={13} />
              </span>
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-10 px-8 lg:px-12 py-12">
          {/* Logo + info */}
          <div>
            <div className="mb-6">
              <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-14 brightness-0 invert" />
            </div>
            <div className="text-sm space-y-1">
              <p>{siteConfig.owner}</p>
              <p>{siteConfig.contact.address}</p>
              <p className="mt-3 text-white/40 text-xs">Badanie realizowane przez laboratorium prof. Jana Lubińskiego</p>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Nawigacja</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Informacje</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 px-8 lg:px-12 py-6 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} {siteConfig.owner}. Wszelkie prawa zastrzeżone. Realizacja: <a href="https://optiweb.pl" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">optiweb.pl</a></p>
          <div className="flex items-center gap-3">
            {['fb', 'ig', 'x', 'in'].map((s) => (
              <div key={s} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-pointer text-[11px] font-bold">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
