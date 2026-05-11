type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

type OpeningHours = {
  days: string[];
  opens: string;
  closes: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  domain: string;
  owner: string;
  locale: string;
  language: string;
  currency: string;
  businessType: string;
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    address: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    region: string;
    openingHours: OpeningHours[];
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  googleMapsEmbedUrl: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    google?: string;
  };
  nav: NavItem[];
  logo: {
    svg: string;
    withTextHorizontal: string;
    withTextVertical: string;
    avatar: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'Onkopierwiastki',
  tagline: 'Zbadaj swoje Onkopierwiastki. Poznaj ryzyko, zanim pojawią się objawy.',
  domain: 'https://onkopierwiastki.pl',
  owner: 'Innowacyjna Medycyna sp. z o.o.',

  locale: 'pl_PL',
  language: 'pl',
  currency: 'PLN',
  businessType: 'MedicalBusiness',

  contact: {
    phone: '+48 000 000 000',
    phoneRaw: '+48000000000',
    email: 'kontakt@onkopierwiastki.pl',
    address: 'ul. Alabastrowa 8, Grzepnica, 72-003 Dobra',
    streetAddress: 'ul. Alabastrowa 8',
    city: 'Grzepnica',
    postalCode: '72-003',
    country: 'PL',
    region: 'Polska',
    openingHours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
  },

  geo: {
    latitude: 53.3842,
    longitude: 14.5528,
  },

  googleMapsEmbedUrl: '',

  social: {
    facebook: 'https://www.facebook.com/readgenecom',
    instagram: 'https://www.instagram.com/readgenepl',
  },

  nav: [
    { label: 'Dla kogo', href: '/#dla-kogo' },
    { label: 'Jak się przygotować', href: '/#przygotowanie' },
    { label: 'Placówki', href: '/#placowki' },
    { label: 'Zamów online', href: '/#zamow' },
  ],

  logo: {
    svg: '/favicon.svg',
    withTextHorizontal: '/logos/logo-horizontal.png',
    withTextVertical: '/logos/logo-vertical.png',
    avatar: '/logos/avatar.png',
  },
};
