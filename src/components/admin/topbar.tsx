'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Menu, ExternalLink, LogOut } from 'lucide-react';

export function Topbar({ userName, onMenuClick }: { userName?: string | null; onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-100 px-4 sm:px-6 py-3 flex items-center justify-between">
      <button onClick={onMenuClick} className="lg:hidden text-[#122056]">
        <Menu size={22} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-xs text-[#5B65DC] hover:text-[#4a53c7] transition-colors font-medium">
          <ExternalLink size={14} />
          <span className="hidden sm:inline">Wróć do strony</span>
        </Link>
        {userName && (
          <span className="text-xs text-[#8a8fa6] bg-[#EEEFFD] px-3 py-1 rounded-full font-medium">
            {userName}
          </span>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1.5 text-xs text-[#8a8fa6] hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Wyloguj</span>
        </button>
      </div>
    </header>
  );
}
