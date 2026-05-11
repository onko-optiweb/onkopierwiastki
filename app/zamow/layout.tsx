import { Metadata } from 'next';
import { siteConfig } from '@/src/siteConfig';

export const metadata: Metadata = {
  title: 'Zamów badanie onkopierwiastków',
  description: 'Zamów badanie poziomu 6 pierwiastków śladowych (Se, Zn, As, Cu, Cd, Pb). Wybierz panel, placówkę pobrań lub zamów zestaw online. Wyniki w 15 dni roboczych.',
  alternates: { canonical: '/zamow' },
  openGraph: {
    title: `Zamów badanie | ${siteConfig.name}`,
    description: 'Zamów badanie poziomu 6 pierwiastków śladowych. Wybierz panel, placówkę pobrań lub zamów zestaw online.',
    url: `${siteConfig.domain}/zamow`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function ZamowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
