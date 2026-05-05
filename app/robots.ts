/**
 * DYNAMICZNY ROBOTS.TXT
 * ======================
 * Generowany automatycznie z siteConfig.domain.
 *
 * SEO: robots.txt mówi wyszukiwarkom co mogą, a czego nie mogą indeksować.
 * Ten plik pozwala na indeksowanie wszystkiego oprócz folderów tymczasowych.
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/src/siteConfig';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
