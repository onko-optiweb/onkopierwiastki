/**
 * DYNAMICZNY SITEMAP
 * ===================
 * Generowany automatycznie z siteConfig.nav przy każdym buildzie.
 * Nie musisz edytować tego pliku — wystarczy zaktualizować nav w siteConfig.ts.
 *
 * SEO: Po uruchomieniu strony zgłoś sitemap w Google Search Console:
 * https://search.google.com/search-console → Sitemaps → Dodaj sitemap
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/src/siteConfig';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.domain;

  const pages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/zamow', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/regulamin', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/polityka-prywatnosci', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
