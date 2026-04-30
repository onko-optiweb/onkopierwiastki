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

  // Zbierz wszystkie ścieżki z nawigacji
  const navUrls = siteConfig.nav.flatMap((item) => {
    const paths: string[] = [];
    if (item.href && item.href !== '/#') {
      paths.push(item.href);
    }
    if ('children' in item && item.children) {
      paths.push(...item.children.map((child) => child.href));
    }
    return paths;
  });

  const allPaths = [...new Set(navUrls)];

  return allPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : 0.8,
  }));
}
