'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export function AdminShell({ userName, children }: { userName?: string | null; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Topbar userName={userName} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
