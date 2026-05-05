'use client';

import { useState, useEffect } from 'react';

type ConsentState = 'pending' | 'all' | 'necessary' | 'custom';
type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = 'cookie_consent';

function getStoredConsent(): { state: ConsentState; prefs: ConsentPrefs } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function storeConsent(state: ConsentState, prefs: ConsentPrefs) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({ state, prefs, ts: Date.now() }));
}

function updateGtagConsent(prefs: ConsentPrefs) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    });
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({ analytics: true, marketing: false });

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      updateGtagConsent(stored.prefs);
      setPrefs(stored.prefs);
    } else {
      setVisible(true);
    }

    const handleOpen = () => {
      setVisible(true);
      setShowDetails(true);
    };
    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);

  const handleAcceptAll = () => {
    const p = { analytics: true, marketing: true };
    storeConsent('all', p);
    updateGtagConsent(p);
    setVisible(false);
  };

  const handleNecessaryOnly = () => {
    const p = { analytics: false, marketing: false };
    storeConsent('necessary', p);
    updateGtagConsent(p);
    setVisible(false);
  };

  const handleSaveCustom = () => {
    storeConsent('custom', prefs);
    updateGtagConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl shadow-black/10 border border-[#EEEFFD] p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="font-bold text-[#122056] text-sm mb-1.5">Ta strona używa plików cookies</h3>
          <p className="text-[#8a8fa6] text-xs leading-relaxed">
            Używamy cookies niezbędnych do działania strony oraz opcjonalnych cookies analitycznych i marketingowych.
            Możesz zaakceptować wszystkie lub dostosować swoje preferencje.{' '}
            <a href="/polityka-prywatnosci#cookies" className="text-[#5B65DC] hover:underline">Polityka cookies</a>
          </p>
        </div>

        {showDetails && (
          <div className="mb-4 space-y-3 bg-[#FAFAFD] rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-not-allowed opacity-60">
              <input type="checkbox" checked disabled className="w-4 h-4 rounded" />
              <div>
                <span className="text-xs font-semibold text-[#122056]">Niezbędne</span>
                <p className="text-[10px] text-[#8a8fa6]">Wymagane do prawidłowego działania strony</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-[#122056]">Analityczne</span>
                <p className="text-[10px] text-[#8a8fa6]">Google Analytics — pomaga nam ulepszać stronę</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                className="w-4 h-4 rounded border-[#EEEFFD] text-[#5B65DC] focus:ring-[#5B65DC]/20 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-[#122056]">Marketingowe</span>
                <p className="text-[10px] text-[#8a8fa6]">Spersonalizowane reklamy i remarketing</p>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAcceptAll}
            className="bg-[#5B65DC] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#4a53c7] transition-colors"
          >
            Akceptuj wszystkie
          </button>
          {showDetails ? (
            <button
              onClick={handleSaveCustom}
              className="bg-[#EEEFFD] text-[#122056] text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#e0e2f8] transition-colors"
            >
              Zapisz wybór
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="bg-[#EEEFFD] text-[#122056] text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#e0e2f8] transition-colors"
            >
              Dostosuj
            </button>
          )}
          <button
            onClick={handleNecessaryOnly}
            className="text-[#8a8fa6] text-xs font-semibold px-5 py-2.5 rounded-xl hover:text-[#122056] transition-colors"
          >
            Tylko niezbędne
          </button>
        </div>
      </div>
    </div>
  );
}
