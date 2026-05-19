'use client';

import { useEffect, useState } from 'react';

export interface UtmData {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
}

const STORAGE_KEY = 'onko_utm';

export function useUtm(): UtmData {
  const [utm, setUtm] = useState<UtmData>({ utmSource: '', utmMedium: '', utmCampaign: '', referrer: '' });

  useEffect(() => {
    // Check URL params first (new visit with UTM)
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source');
    const medium = params.get('utm_medium');
    const campaign = params.get('utm_campaign');

    if (source || medium || campaign) {
      const data: UtmData = {
        utmSource: source || '',
        utmMedium: medium || '',
        utmCampaign: campaign || '',
        referrer: document.referrer || '',
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setUtm(data);
      return;
    }

    // Check sessionStorage (returning visitor in same session)
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUtm(JSON.parse(stored));
      return;
    }

    // No UTM — save referrer at least
    const data: UtmData = {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      referrer: document.referrer || '',
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUtm(data);
  }, []);

  return utm;
}
