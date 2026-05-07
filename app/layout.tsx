import type { Metadata } from 'next';
import { Funnel_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/src/siteConfig';
import CookieConsent from '@/src/components/CookieConsent';
import GoogleConsentMode from '@/src/components/GoogleConsentMode';
import { getSettings } from '@/src/lib/get-settings';

const funnelDisplay = Funnel_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-funnel',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Zbadaj ryzyko nowotworów`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.domain),
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': siteConfig.businessType,
    name: siteConfig.name,
    '@id': siteConfig.domain,
    url: siteConfig.domain,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.streetAddress,
      addressLocality: siteConfig.contact.city,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.contact.openingHours.map((item) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: item.days,
      opens: item.opens,
      closes: item.closes,
    })),
  };

  return (
    <html lang={siteConfig.language} data-theme='business' suppressHydrationWarning>
      <body className={`${funnelDisplay.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <GoogleConsentMode ga4Id={settings.ga4Id} gtmId={settings.gtmId} />
        {children}
        <CookieConsent />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
