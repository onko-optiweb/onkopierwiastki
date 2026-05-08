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
import FAQ from '@/src/components/FAQ';
import FinalCTA from '@/src/components/FinalCTA';
import Footer from '@/src/components/Footer';

export default function HomePage() {
  return (
    <>
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
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
