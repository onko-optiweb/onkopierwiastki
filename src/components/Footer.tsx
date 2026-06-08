'use client';

import { siteConfig } from '@/src/siteConfig';
import { ArrowRight, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Dla kogo', href: '/#dla-kogo' },
  { label: 'Jak się przygotować', href: '/#przygotowanie' },
  { label: 'Placówki', href: '/#placowki' },
  { label: 'Zamów online', href: '/#zamow' },
  { label: 'Blog', href: '/blog' },
];

const legalLinks = [
  { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
  { label: 'Regulamin', href: '/regulamin' },
  { label: 'Cennik', href: '/#cennik' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Ustawienia cookies', href: '#cookies', onClick: true },
];

const cityLinks = [
  { label: 'Badanie pierwiastków Wrocław', href: '/miasto/wroclaw' },
  { label: 'Badanie pierwiastków Poznań', href: '/miasto/poznan' },
  { label: 'Badanie pierwiastków Warszawa', href: '/miasto/warszawa' },
  { label: 'Badanie pierwiastków Tarnów', href: '/miasto/tarnow' },
  { label: 'Badanie pierwiastków Bielsko-Biała', href: '/miasto/bielsko-biala' },
];

export default function Footer() {
  return (
    <footer className="bg-white px-3 sm:px-4 pb-4">
      <div className="max-w-[1800px] mx-auto bg-[#0a0a0a] rounded-[2rem] text-white/60 overflow-hidden">

        {/* Top bar — CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 lg:px-12 py-10 border-b border-white/10">
          <p className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-white">
            Zamów badanie pierwiastków
          </p>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 lg:px-12 py-12">
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
            <p className="font-semibold text-white text-sm mb-4">Nawigacja</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* City links */}
          <div>
            <p className="font-semibold text-white text-sm mb-4">Miasta</p>
            <ul className="space-y-2.5">
              {cityLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="font-semibold text-white text-sm mb-4">Informacje</p>
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
            {siteConfig.social.facebook && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
