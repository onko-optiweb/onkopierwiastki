import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/src/lib/prisma';
import { siteConfig } from '@/src/siteConfig';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artykuły o profilaktyce nowotworowej, pierwiastkach śladowych i badaniach onkologicznych.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Artykuły o profilaktyce nowotworowej, pierwiastkach śladowych i badaniach onkologicznych.',
    url: `${siteConfig.domain}/blog`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      tags: true,
    },
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog | ${siteConfig.name}`,
    description: 'Artykuły o profilaktyce nowotworowej, pierwiastkach śladowych i badaniach onkologicznych.',
    url: `${siteConfig.domain}/blog`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.owner,
      url: siteConfig.domain,
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAFAFD] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#8a8fa6] mb-8">
            <Link href="/" className="hover:text-[#122056] transition-colors">Strona główna</Link>
            <ChevronRight size={14} />
            <span className="text-[#122056] font-medium">Blog</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056]">
              Blog
            </h1>
            <p className="text-[#8a8fa6] mt-3 max-w-2xl mx-auto">
              Artykuły o profilaktyce nowotworowej, pierwiastkach śladowych i najnowszych badaniach naukowych.
            </p>
          </div>

          {/* Posts grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#8a8fa6]">Brak wpisów na blogu.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {post.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.split(',').slice(0, 3).map((tag) => (
                          <span key={tag.trim()} className="px-2 py-0.5 bg-[#EEEFFD] text-[#5B65DC] text-[11px] font-medium rounded-full">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-[family-name:var(--font-funnel)] font-bold text-lg text-[#122056] group-hover:text-[#5B65DC] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-[#8a8fa6] mt-2 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5 text-xs text-[#8a8fa6]">
                          <Calendar size={12} />
                          {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#5B65DC]">
                        Czytaj
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Strona główna', item: siteConfig.domain },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.domain}/blog` },
            ],
          }) }}
        />
      </main>
      <Footer />
    </>
  );
}
