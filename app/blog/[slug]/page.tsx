import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/src/lib/prisma';
import { siteConfig } from '@/src/siteConfig';
import { sanitizeHtml } from '@/src/lib/sanitize';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { BlogTableOfContents } from '@/src/components/blog-toc';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, metaTitle: true, metaDescription: true, coverImage: true },
  });

  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.domain}/blog/${slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    ...(post.coverImage ? { image: post.coverImage.startsWith('http') ? post.coverImage : `${siteConfig.domain}${post.coverImage}` } : {}),
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.owner,
      url: siteConfig.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.owner,
      url: siteConfig.domain,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.domain}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.domain}/blog/${post.slug}`,
    },
  };

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAFAFD] pt-24 pb-16">
        {/* Breadcrumbs */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-6xl mb-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-[#8a8fa6]">
            <Link href="/" className="hover:text-[#122056] transition-colors">Strona główna</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-[#122056] transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-[#122056] font-medium">{post.title}</span>
          </nav>
        </div>

        {/* Header — title left, image right */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-6xl mb-10">
          <div className={`flex flex-col ${post.coverImage ? 'lg:flex-row lg:items-center lg:gap-10' : ''}`}>
            {/* Left — title + meta */}
            <header className={`${post.coverImage ? 'lg:flex-1' : ''}`}>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EEEFFD] text-[#5B65DC] text-xs font-medium rounded-full">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-[#122056] leading-tight">
                {post.title}
              </h1>
              {post.publishedAt && (
                <div className="flex items-center gap-2 mt-4 text-sm text-[#8a8fa6]">
                  <Calendar size={14} />
                  {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              )}
              {post.excerpt && (
                <p className="mt-4 text-[#8a8fa6] leading-relaxed">{post.excerpt}</p>
              )}
            </header>

            {/* Right — cover image */}
            {post.coverImage && (
              <div className="mt-8 lg:mt-0 lg:w-[400px] lg:shrink-0">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content with TOC sidebar */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-6xl xl:grid xl:grid-cols-[220px_1fr] xl:gap-10">
          {/* TOC — sidebar on desktop, accordion on mobile (inside component) */}
          <BlogTableOfContents content={post.content} />

          {/* Article content */}
          <article className="max-w-3xl">
            <div
              data-blog-content
              className="prose prose-base max-w-none
                prose-headings:font-[family-name:var(--font-funnel)] prose-headings:text-[#122056]
                prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-3
                prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2
                prose-p:text-[#4a4f65] prose-p:text-[15px] prose-p:leading-relaxed
                prose-a:text-[#5B65DC] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#122056]
                prose-img:rounded-xl
                prose-blockquote:border-l-[#5B65DC] prose-blockquote:text-[#8a8fa6]
                prose-li:text-[#4a4f65] prose-li:text-[15px]
                prose-table:text-sm
                prose-th:bg-[#EEEFFD] prose-th:text-[#122056] prose-th:font-semibold prose-th:px-4 prose-th:py-2.5
                prose-td:px-4 prose-td:py-2.5 prose-td:text-[#122056] prose-td:border-neutral-200"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />

            {/* Bottom CTA */}
            <div className="mt-16 bg-[#EEEFFD] rounded-2xl p-8 text-center">
              <h3 className="font-[family-name:var(--font-funnel)] font-bold text-xl text-[#122056]">
                Chcesz zbadać swoje onkopierwiastki?
              </h3>
              <p className="text-sm text-[#8a8fa6] mt-2 mb-5">
                Zamów badanie i poznaj swoje ryzyko nowotworowe.
              </p>
              <Link
                href="/zamow"
                className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#4a53c7] transition-colors"
              >
                Zamów badanie
              </Link>
            </div>
          </article>
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
              { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.domain}/blog/${post.slug}` },
            ],
          }) }}
        />
      </main>
      <Footer />
    </>
  );
}
