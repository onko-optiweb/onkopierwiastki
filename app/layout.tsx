import type { Metadata } from 'next';
import { Funnel_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/src/siteConfig';
import CookieConsent from '@/src/components/CookieConsent';
import { PostHogProvider } from '@/src/components/PostHogProvider';
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
    default: `${siteConfig.name} — Onkopakiet | Zbadaj ryzyko nowotworów`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.domain),
  robots: {
    index: true,
    follow: true,
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
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Onkopierwiastki — badanie 6 pierwiastków we krwi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ['/images/og-default.png'],
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
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };

  return (
    <html lang={siteConfig.language} data-theme='business' suppressHydrationWarning>
      <body className={`${funnelDisplay.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <CookieConsent />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
