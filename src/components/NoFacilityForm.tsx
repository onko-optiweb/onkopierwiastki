'use client';

import { useState } from 'react';
import { IconPhone, IconMapPin, IconUser, IconCheck, IconLoader2, IconBuilding } from '@tabler/icons-react';

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
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputCls = 'w-full px-4 py-3 text-sm rounded-xl border border-[#EEEFFD] bg-white focus:outline-none focus:border-[#5B65DC] text-[#122056] placeholder:text-[#8a8fa6]';
  const iconInputCls = 'w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#EEEFFD] bg-white focus:outline-none focus:border-[#5B65DC] text-[#122056] placeholder:text-[#8a8fa6]';

  return (
    <div className="mt-10 bg-[#EEEFFD]/60 rounded-2xl border border-[#EEEFFD] overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left — text */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <p className="text-[#5B65DC] text-xs font-semibold uppercase tracking-wider mb-3">Brak placówki w Twoim mieście?</p>
          <h3 className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-2xl sm:text-3xl mb-3 leading-tight">
            Zostaw kontakt —<br />odezwiemy się do Ciebie
          </h3>
          <p className="text-[#8a8fa6] text-sm leading-relaxed">
            Sieć placówek stale się rozrasta. Zostaw swoje miasto i numer telefonu, a skontaktujemy się z Tobą, gdy pojawi się certyfikowana placówka w Twoim rejonie — lub wskażemy najbliższą dostępną opcję.
          </p>
        </div>

        {/* Right — form */}
        <div className="bg-white p-8 lg:p-10 flex flex-col justify-center">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#5B65DC]/10 flex items-center justify-center mx-auto mb-4">
                <IconCheck size={28} className="text-[#5B65DC]" />
              </div>
              <p className="font-bold text-[#122056] text-lg mb-1">Dziękujemy!</p>
              <p className="text-[#8a8fa6] text-sm">Odezwiemy się najszybciej jak to możliwe.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <IconUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
                <input type="text" placeholder="Imię *" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={iconInputCls} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <IconMapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
                  <input type="text" placeholder="Kod pocztowy" value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    className={iconInputCls} />
                </div>
                <div className="relative">
                  <IconBuilding size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
                  <input type="text" placeholder="Miasto *" required value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={iconInputCls} />
                </div>
              </div>
              <div className="relative">
                <IconPhone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa6]" />
                <input type="tel" placeholder="Numer telefonu *" required value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={iconInputCls} />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-xs">Wystąpił błąd. Napisz na info@onkopierwiastki.pl</p>
              )}
              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#5B65DC] text-white font-semibold py-3 rounded-xl hover:bg-[#4a53c7] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
                {status === 'loading' && <IconLoader2 size={16} className="animate-spin" />}
                Wyślij — odezwiemy się
              </button>
              <p className="text-[#8a8fa6] text-[11px] text-center">* Pola wymagane</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
