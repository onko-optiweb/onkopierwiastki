'use client';

import { useState } from 'react';
import { saveSettings } from '@/src/actions/settings';
import type { SiteSettings } from '@/src/lib/get-settings';

function Field({ label, name, value, onChange, type = 'text', placeholder, mono, hint }: {
  label: string; name: string; value: string; onChange: (name: string, value: string) => void;
  type?: string; placeholder?: string; mono?: boolean; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#122056] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm ${mono ? 'font-mono text-xs' : ''}`}
      />
      {hint && <p className="text-[10px] text-[#8a8fa6] mt-1">{hint}</p>}
    </div>
  );
}


function Toggle({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-5 h-5 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer flex-shrink-0" />
      <div>
        <span className="text-sm text-[#122056] font-medium">{label}</span>
        {description && <p className="text-xs text-[#8a8fa6] mt-0.5">{description}</p>}
      </div>
    </label>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 space-y-4">
      <div>
        <h2 className="font-bold text-[#122056] text-sm">{title}</h2>
        {description && <p className="text-xs text-[#8a8fa6] mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    siteName: settings.siteName || '',
    email: settings.email || '',
    phone: settings.phone || '',
    address: settings.address || '',
    ga4Id: settings.ga4Id || '',
    gscVerification: settings.gscVerification || '',
    gtmId: settings.gtmId || '',
    recaptchaEnabled: settings.recaptchaEnabled,
    recaptchaSiteKey: settings.recaptchaSiteKey || '',
    recaptchaSecretKey: settings.recaptchaSecretKey || '',
    payuEnabled: settings.payuEnabled,
    payuSandbox: settings.payuSandbox,
    payuPosId: settings.payuPosId || '',
    payuClientSecret: settings.payuClientSecret || '',
    payuMd5Key: settings.payuMd5Key || '',
    emailNotificationsEnabled: settings.emailNotificationsEnabled,
    notificationEmail: settings.notificationEmail || '',
    smtpHost: settings.smtpHost || '',
    smtpPort: String(settings.smtpPort || 587),
    smtpUser: settings.smtpUser || '',
    smtpPassword: settings.smtpPassword || '',
    smtpFrom: settings.smtpFrom || '',
    smtpSecure: settings.smtpSecure,
  });

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState<{ loading: string | null; message: string; error: boolean }>({ loading: null, message: '', error: false });

  const handleField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus('idle');
  };

  const handleToggle = (name: string, value: boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus('idle');
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await saveSettings({ ...form, smtpPort: parseInt(form.smtpPort) || 587 });
    setStatus(result.success ? 'success' : 'error');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Dane firmy */}
      <Section title="Dane firmy" description="Informacje wyświetlane na stronie i w stopce">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nazwa serwisu" name="siteName" value={form.siteName} onChange={handleField} placeholder="Onkopierwiastki.pl" />
          <Field label="E-mail kontaktowy" name="email" value={form.email} onChange={handleField} placeholder="kontakt@onkopierwiastki.pl" type="email" />
          <Field label="Telefon" name="phone" value={form.phone} onChange={handleField} placeholder="+48 91 000 00 00" />
          <Field label="Adres" name="address" value={form.address} onChange={handleField} placeholder="71-253 Szczecin, ul. Akacjowa 2" />
        </div>
      </Section>

      {/* GA4 */}
      <Section title="Google Analytics 4" description="Identyfikator pomiaru GA4 (Measurement ID)">
        <Field label="GA4 Measurement ID" name="ga4Id" value={form.ga4Id} onChange={handleField} placeholder="G-XXXXXXXXXX" mono />
      </Section>

      {/* GSC */}
      <Section title="Google Search Console" description="Kod weryfikacyjny GSC (meta tag content)">
        <Field label="Kod weryfikacyjny" name="gscVerification" value={form.gscVerification} onChange={handleField} placeholder="abc123..." mono />
      </Section>

      {/* GTM */}
      <Section title="Google Tag Manager" description="Identyfikator kontenera GTM">
        <Field label="GTM Container ID" name="gtmId" value={form.gtmId} onChange={handleField} placeholder="GTM-XXXXXXX" mono />
      </Section>

      {/* reCAPTCHA */}
      <Section title="Google reCAPTCHA v3" description="Ochrona formularzy przed botami">
        <Toggle label="Włącz reCAPTCHA" checked={form.recaptchaEnabled} onChange={(v) => handleToggle('recaptchaEnabled', v)} />
        {form.recaptchaEnabled && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Site Key" name="recaptchaSiteKey" value={form.recaptchaSiteKey} onChange={handleField} placeholder="6Lc..." mono />
            <Field label="Secret Key" name="recaptchaSecretKey" value={form.recaptchaSecretKey} onChange={handleField} placeholder="6Lc..." mono />
          </div>
        )}
      </Section>

      {/* PayU */}
      <Section title="Integracja PayU" description="Klucze API do systemu płatności PayU">
        <div className="space-y-3">
          <Toggle label="Włącz płatności PayU" checked={form.payuEnabled} onChange={(v) => handleToggle('payuEnabled', v)} />
          {form.payuEnabled && (
            <>
              <Toggle label="Tryb sandbox (testowy)" description="Włącz tryb testowy PayU — płatności nie będą prawdziwe" checked={form.payuSandbox} onChange={(v) => handleToggle('payuSandbox', v)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="POS ID" name="payuPosId" value={form.payuPosId} onChange={handleField} placeholder="300746" mono />
                <Field label="Client Secret" name="payuClientSecret" value={form.payuClientSecret} onChange={handleField} placeholder="2ee86..." mono />
              </div>
              <Field label="Second Key (MD5)" name="payuMd5Key" value={form.payuMd5Key} onChange={handleField} placeholder="b6ca1..." mono />
            </>
          )}
        </div>
      </Section>

      {/* Powiadomienia */}
      <Section title="Powiadomienia e-mail" description="Automatyczne powiadomienia o nowych zamówieniach i potwierdzenia dla klientów">
        <Toggle label="Włącz powiadomienia dla admina" description="Otrzymuj e-mail przy każdym nowym zamówieniu" checked={form.emailNotificationsEnabled} onChange={(v) => handleToggle('emailNotificationsEnabled', v)} />
        {form.emailNotificationsEnabled && (
          <Field label="Adres e-mail do powiadomień" name="notificationEmail" value={form.notificationEmail} onChange={handleField} placeholder="admin@onkopierwiastki.pl" type="email" />
        )}
      </Section>

      {/* SMTP */}
      <Section title="Konfiguracja SMTP" description="Serwer poczty wychodzącej do wysyłania powiadomień i potwierdzeń">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Host SMTP" name="smtpHost" value={form.smtpHost} onChange={handleField} placeholder="smtp.gmail.com" mono />
          <Field label="Port" name="smtpPort" value={form.smtpPort} onChange={handleField} placeholder="587" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Użytkownik SMTP" name="smtpUser" value={form.smtpUser} onChange={handleField} placeholder="noreply@onkopierwiastki.pl" mono />
          <Field label="Hasło SMTP" name="smtpPassword" value={form.smtpPassword} onChange={handleField} placeholder="********" type="password" mono />
        </div>
        <Field label="Nadawca (From)" name="smtpFrom" value={form.smtpFrom} onChange={handleField} placeholder="Onkopierwiastki <noreply@onkopierwiastki.pl>" />
        <Toggle label="SSL/TLS (port 465)" description="Włącz jeśli używasz portu 465 z pełnym szyfrowaniem" checked={form.smtpSecure} onChange={(v) => handleToggle('smtpSecure', v)} />
      </Section>

      {/* Test e-mail */}
      <Section title="Testowanie e-maili" description="Wyślij testowe e-maile żeby sprawdzić konfigurację SMTP i wygląd wiadomości">
        <div>
          <label className="block text-xs font-semibold text-[#122056] mb-1">Adres e-mail do testu</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="twoj@email.com"
            className="w-full px-3 py-2 rounded-lg border border-[#EEEFFD] focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 outline-none text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {([
            { type: 'connection', label: 'Test połączenia SMTP', desc: 'Sprawdza czy dane SMTP są poprawne' },
            { type: 'confirmation', label: 'Potwierdzenie zamówienia', desc: 'Mail który dostaje klient po zamówieniu' },
            { type: 'notification', label: 'Powiadomienie o zamówieniu', desc: 'Mail który dostaje admin o nowym zamówieniu' },
          ] as const).map((test) => (
            <button
              key={test.type}
              disabled={testStatus.loading !== null || (test.type !== 'connection' && !testEmail)}
              onClick={async () => {
                setTestStatus({ loading: test.type, message: '', error: false });
                try {
                  const res = await fetch('/api/admin/test-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ to: testEmail, type: test.type }),
                  });
                  const data = await res.json();
                  setTestStatus({ loading: null, message: data.message || data.error, error: !res.ok });
                } catch {
                  setTestStatus({ loading: null, message: 'Błąd połączenia z serwerem', error: true });
                }
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-[#EEEFFD] text-[#122056] hover:bg-[#EEEFFD] transition-colors disabled:opacity-40"
              title={test.desc}
            >
              {testStatus.loading === test.type ? 'Wysyłam...' : test.label}
            </button>
          ))}
        </div>
        {testStatus.message && (
          <p className={`text-sm font-medium ${testStatus.error ? 'text-red-500' : 'text-emerald-600'}`}>
            {testStatus.message}
          </p>
        )}
      </Section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#5B65DC] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#4a53c7] transition-colors disabled:opacity-60 text-sm"
        >
          {saving ? 'Zapisywanie...' : 'Zapisz ustawienia'}
        </button>
        {status === 'success' && <span className="text-emerald-600 text-sm font-medium">Zapisano pomyślnie</span>}
        {status === 'error' && <span className="text-red-500 text-sm font-medium">Błąd zapisu</span>}
      </div>
    </div>
  );
}
