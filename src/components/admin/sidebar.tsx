'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Users, MapPin, Tag, Mail, Settings, Download, X } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/zamowienia', label: 'Zamówienia', icon: ShoppingCart },
  { href: '/admin/klienci', label: 'Klienci', icon: Users },
  { href: '/admin/placowki', label: 'Placówki', icon: MapPin },
  { href: '/admin/kody-rabatowe', label: 'Kody rabatowe', icon: Tag },
  { href: '/admin/szablony-email', label: 'Szablony e-mail', icon: Mail },
  { href: '/admin/ustawienia', label: 'Ustawienia', icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#122056] text-white flex flex-col transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <img src="/logos/onkopierwiastki.svg" alt="Onkopierwiastki" className="h-12 brightness-0 invert" />
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Backup */}
        <div className="p-3 border-t border-white/10">
          <Link
            href="/admin/backupy"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/admin/backupy')
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Download size={18} />
            Kopie zapasowe
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 text-white/40 text-[11px]">
          Onkopierwiastki.pl &copy; {new Date().getFullYear()}
        </div>
      </aside>
    </>
  );
}
