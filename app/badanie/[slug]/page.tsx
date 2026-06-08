import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/src/siteConfig';
import { products, getProductBySlug, getOtherProducts } from '@/src/data/products';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import ProductPage from '@/src/components/ProductPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} — badanie pierwiastków`;
  const description = product.description;

  return {
    title,
    description,
    alternates: { canonical: `/badanie/${product.slug}` },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.domain}/badanie/${product.slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
  };
}

export default async function BadaniePage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const otherProducts = getOtherProducts(slug);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'BadamyPierwiastki.pl' },
    category: 'Badania laboratoryjne',
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.domain}/badanie/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Badania', item: `${siteConfig.domain}/#cennik` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${siteConfig.domain}/badanie/${product.slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <ProductPage product={product} otherProducts={otherProducts} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
