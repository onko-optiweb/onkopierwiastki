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
import { prisma } from '@/src/lib/prisma';
import { getAllCitySlugs } from '@/src/data/cities';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.domain;

  // Static pages
  const staticPages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/zamow', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/regulamin', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/polityka-prywatnosci', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // City pages
  const citySlugs = getAllCitySlugs();
  const cityPages = citySlugs.map((slug) => ({
    path: `/miasto/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog posts from DB
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });
  const blogPages = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: post.updatedAt,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...cityPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ];
}
