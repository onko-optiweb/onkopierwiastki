'use client';

import { useState } from 'react';
import { IconPhone, IconMapPin, IconUser, IconCheck, IconLoader2 } from '@tabler/icons-react';

export default function NoFacilityForm() {
  const [form, setForm] = useState({ name: '', postalCode: '', city: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#EEEFFD]/50 rounded-2xl p-8 border border-[#EEEFFD] text-center max-w-xl mx-auto mt-10">
        <div className="w-12 h-12 rounded-full bg-[#5B65DC]/10 flex items-center justify-center mx-auto mb-4">
          <IconCheck size={24} className="text-[#5B65DC]" />
        </div>
        <p className="font-bold text-[#122056] text-base mb-1">Dziękujemy!</p>
        <p className="text-[#8a8fa6] text-sm">Odezwiemy się do Ciebie najszybciej jak to możliwe.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#EEEFFD]/50 rounded-2xl p-8 border border-[#EEEFFD] max-w-xl mx-auto mt-10">
      <p className="font-bold text-[#122056] text-base mb-1 text-center">
        Nie ma placówki w Twoim mieście?
      </p>
      <p className="text-[#8a8fa6] text-sm text-center mb-6">
        Zostaw numer telefonu i miasto — odezwiemy się do Ciebie.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <IconUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
          <input
            type="text"
            placeholder="Imię *"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[#EEEFFD] bg-white focus:outline-none focus:border-[#5B65DC] text-[#122056] placeholder:text-[#8a8fa6]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <IconMapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
            <input
              type="text"
              placeholder="Kod pocztowy"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[#EEEFFD] bg-white focus:outline-none focus:border-[#5B65DC] text-[#122056] placeholder:text-[#8a8fa6]"
            />
          </div>
          <input
            type="text"
            placeholder="Miasto *"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#EEEFFD] bg-white focus:outline-none focus:border-[#5B65DC] text-[#122056] placeholder:text-[#8a8fa6]"
          />
        </div>
        <div className="relative">
          <IconPhone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
          <input
            type="tel"
            placeholder="Numer telefonu *"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[#EEEFFD] bg-white focus:outline-none focus:border-[#5B65DC] text-[#122056] placeholder:text-[#8a8fa6]"
          />
        </div>
        {status === 'error' && (
          <p className="text-red-500 text-xs text-center">Wystąpił błąd. Spróbuj ponownie lub napisz na info@onkopierwiastki.pl</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#5B65DC] text-white font-semibold py-2.5 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {status === 'loading' ? <IconLoader2 size={16} className="animate-spin" /> : null}
          Wyślij — odezwiemy się
        </button>
      </form>
    </div>
  );
}
