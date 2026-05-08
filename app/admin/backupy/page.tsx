'use client';

import { useState, useEffect } from 'react';
import { Download, Plus, Clock, HardDrive } from 'lucide-react';

interface BackupFile {
  name: string;
  size: number;
  created: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(name: string) {
  const match = name.match(/backup-(\d{4}-\d{2}-\d{2})/);
  if (!match) return name;
  return new Date(match[1]).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BackupyPage() {
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchBackups = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/backup?action=list');
      const data = await res.json();
      setBackups(Array.isArray(data) ? data : []);
    } catch {
      setBackups([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBackups(); }, []);

  const handleCreate = async () => {
    setCreating(true);
    await fetch('/api/admin/backup', { method: 'POST' });
    setCreating(false);
    fetchBackups();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Kopie zapasowe</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Automatyczne codzienne backupy przechowywane do 30 dni</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCreate}
          disabled={creating}
          className="flex items-center gap-2 bg-[#5B65DC] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4a53c7] transition-colors disabled:opacity-60"
        >
          <Plus size={16} />
          {creating ? 'Tworzę...' : 'Utwórz backup teraz'}
        </button>
        <a
          href="/api/admin/backup"
          download
          className="flex items-center gap-2 bg-white text-[#122056] border border-[#EEEFFD] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#EEEFFD]/50 transition-colors"
        >
          <Download size={16} />
          Pobierz aktualny stan
        </a>
      </div>

      <div className="bg-white rounded-xl p-4 border border-[#EEEFFD]">
        <div className="flex items-center gap-2 mb-4">
          <HardDrive size={16} className="text-[#5B65DC]" />
          <h2 className="font-bold text-[#122056] text-sm">Przechowywane kopie (Supabase Storage)</h2>
        </div>

        {loading ? (
          <p className="text-[#8a8fa6] text-sm py-4 text-center">Ładowanie...</p>
        ) : backups.length === 0 ? (
          <p className="text-[#8a8fa6] text-sm py-4 text-center">Brak kopii zapasowych. Kliknij &quot;Utwórz backup teraz&quot;.</p>
        ) : (
          <div className="space-y-2">
            {backups.map((b) => (
              <div key={b.name} className="flex items-center justify-between bg-[#FAFAFD] rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-[#8a8fa6]" />
                  <div>
                    <p className="text-sm font-medium text-[#122056]">{formatDate(b.name)}</p>
                    <p className="text-[11px] text-[#8a8fa6]">{b.name} &middot; {formatSize(b.size)}</p>
                  </div>
                </div>
                <a
                  href={`/api/admin/backup?action=download&file=${encodeURIComponent(b.name)}`}
                  download
                  className="text-[#5B65DC] hover:text-[#4a53c7] text-xs font-semibold flex items-center gap-1"
                >
                  <Download size={12} />
                  Pobierz
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#EEEFFD]/30 rounded-xl p-4 border border-[#EEEFFD] text-xs text-[#8a8fa6] space-y-1">
        <p><strong className="text-[#122056]">Automatyczne backupy:</strong> codziennie o 3:00 w nocy (UTC)</p>
        <p><strong className="text-[#122056]">Retencja:</strong> kopie starsze niż 30 dni są automatycznie usuwane</p>
        <p><strong className="text-[#122056]">Zawartość:</strong> placówki, kody rabatowe, zamówienia, użytkownicy, ustawienia</p>
      </div>
    </div>
  );
}
