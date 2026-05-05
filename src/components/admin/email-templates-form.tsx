'use client';

import { useState } from 'react';
import { saveSettings } from '@/src/actions/settings';
import type { SiteSettings } from '@/src/lib/get-settings';

function Field({ label, name, value, onChange, placeholder, hint }: {
  label: string; name: string; value: string; onChange: (name: string, value: string) => void;
  placeholder?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#122056] mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm"
      />
      {hint && <p className="text-[10px] text-[#8a8fa6] mt-1">{hint}</p>}
    </div>
  );
}

function TextArea({ label, name, value, onChange, placeholder, rows = 3, hint }: {
  label: string; name: string; value: string; onChange: (name: string, value: string) => void;
  placeholder?: string; rows?: number; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#122056] mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm resize-y"
      />
      {hint && <p className="text-[10px] text-[#8a8fa6] mt-1">{hint}</p>}
    </div>
  );
}

export function EmailTemplatesForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    emailSubjectConfirmation: settings.emailSubjectConfirmation || '',
    emailIntroText: settings.emailIntroText || '',
    emailFacilityText: settings.emailFacilityText || '',
    emailOnlineText: settings.emailOnlineText || '',
    emailFooterText: settings.emailFooterText || '',
  });

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus('idle');
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await saveSettings(form);
    setStatus(result.success ? 'success' : 'error');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 space-y-4">
        <div>
          <h2 className="font-bold text-[#122056] text-sm">Email potwierdzenia zamówienia</h2>
          <p className="text-xs text-[#8a8fa6] mt-0.5">Wysyłany automatycznie do klienta po złożeniu zamówienia</p>
        </div>
        <Field label="Temat emaila" name="emailSubjectConfirmation" value={form.emailSubjectConfirmation} onChange={handleField}
          placeholder="Potwierdzenie zamówienia — Onkopierwiastki.pl"
          hint="Domyślnie: Potwierdzenie zamówienia — Onkopierwiastki.pl" />
        <TextArea label="Tekst powitalny" name="emailIntroText" value={form.emailIntroText} onChange={handleField}
          placeholder="Dziękujemy za zamówienie! Twoje zamówienie zostało przyjęte." rows={2}
          hint="Wyświetlany na górze emaila, po imieniu klienta. Pierwszy fragment przed kropką staje się nagłówkiem." />
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4">
        <div>
          <h2 className="font-bold text-[#122056] text-sm">Instrukcje dla klienta</h2>
          <p className="text-xs text-[#8a8fa6] mt-0.5">Treści wyświetlane w sekcji z danymi placówki</p>
        </div>
        <TextArea label="Instrukcja dla placówki stacjonarnej" name="emailFacilityText" value={form.emailFacilityText} onChange={handleField}
          placeholder="Zadzwoń do placówki podanej poniżej i umów się na termin pobrania krwi. Powołaj się na badanie z onkopierwiastki.pl i podaj swoje imię oraz nazwisko." rows={3}
          hint="Wyświetlany nad danymi kontaktowymi placówki (telefon, adres, godziny). Klient sam kontaktuje się z placówką." />
        <TextArea label="Tekst dla zamówień online" name="emailOnlineText" value={form.emailOnlineText} onChange={handleField}
          placeholder="Zamówienie online — skontaktujemy się z Tobą mailowo z instrukcjami dotyczącymi pobrania i wysyłki materiału." rows={2}
          hint="Wyświetlany zamiast danych placówki, gdy klient wybrał zamówienie online" />
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4">
        <div>
          <h2 className="font-bold text-[#122056] text-sm">Stopka</h2>
          <p className="text-xs text-[#8a8fa6] mt-0.5">Tekst na samym dole każdego emaila</p>
        </div>
        <TextArea label="Stopka emaila" name="emailFooterText" value={form.emailFooterText} onChange={handleField}
          placeholder="Innowacyjna Medycyna sp. z o.o. · www.onkopierwiastki.pl · kontakt@onkopierwiastki.pl" rows={2} />
      </div>

      <div className="bg-[#EEEFFD]/50 rounded-xl p-5 text-xs text-[#8a8fa6] space-y-1">
        <p className="font-semibold text-[#122056]">Podpowiedź</p>
        <p>Zostaw pola puste, aby używać domyślnych treści (widocznych jako placeholder).</p>
        <p>Dane placówki (nazwa, adres, telefon, godziny) są dołączane automatycznie na podstawie zamówienia.</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#5B65DC] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#4a53c7] transition-colors disabled:opacity-60 text-sm"
        >
          {saving ? 'Zapisywanie...' : 'Zapisz szablony'}
        </button>
        {status === 'success' && <span className="text-emerald-600 text-sm font-medium">Zapisano</span>}
        {status === 'error' && <span className="text-red-500 text-sm font-medium">Błąd zapisu</span>}
      </div>
    </div>
  );
}
