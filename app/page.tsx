import { Metadata } from 'next';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import TrustBar from '@/src/components/TrustBar';
import WhatAre from '@/src/components/WhatAre';
// import AboutTest from '@/src/components/AboutTest';
import CTABanner from '@/src/components/CTABanner';
import PeopleCTA from '@/src/components/PeopleCTA';
// import Statistics from '@/src/components/Statistics';
import Elements from '@/src/components/Elements';
import ForWhom from '@/src/components/ForWhom';
import Testimonials from '@/src/components/Testimonials';
import Preparation from '@/src/components/Preparation';
import TrustSection from '@/src/components/TrustSection';
import Pricing from '@/src/components/Pricing';
import Facilities from '@/src/components/Facilities';
import OrderOnline from '@/src/components/OrderOnline';
import Professor from '@/src/components/Professor';
import ProfessorVideos from '@/src/components/ProfessorVideos';
import FAQ from '@/src/components/FAQ';
import { faqQuestions } from '@/src/data/faq';
import FinalCTA from '@/src/components/FinalCTA';
import CityLinks from '@/src/components/CityLinks';
import Footer from '@/src/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Onkopierwiastki — badanie 6 pierwiastków we krwi | Profilaktyka nowotworowa' },
  description: 'Zbadaj stężenie 6 pierwiastków śladowych (Se, Zn, As, Cu, Cd, Pb) we krwi. Spersonalizowany wynik z zaleceniami w 15 dni roboczych. Ponad 20 lat badań naukowych prof. Lubińskiego.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqQuestions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Professor />
        <WhatAre />
        <CTABanner text="Jedno pobranie krwi. Wynik w 15 dni. Konkretne zalecenia, nie tylko liczby." />
        {/* <AboutTest /> */}
        {/* <Statistics /> */}
        <Elements />
        <ForWhom />
        <PeopleCTA />
        <Testimonials />
        <Preparation />
        <TrustSection />
        <Pricing />
        <Facilities />
        <OrderOnline />
        <ProfessorVideos />
        <FAQ />
        <FinalCTA />
        <CityLinks />
      </main>
      <Footer />
    </>
  );
}
