import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import TrustBar from '@/src/components/TrustBar';
import WhatAre from '@/src/components/WhatAre';
import AboutTest from '@/src/components/AboutTest';
import CTABanner from '@/src/components/CTABanner';
import Statistics from '@/src/components/Statistics';
import Elements from '@/src/components/Elements';
import ForWhom from '@/src/components/ForWhom';
import Testimonials from '@/src/components/Testimonials';
import Preparation from '@/src/components/Preparation';
import TrustSection from '@/src/components/TrustSection';
import Pricing from '@/src/components/Pricing';
import Facilities from '@/src/components/Facilities';
import OrderOnline from '@/src/components/OrderOnline';
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
        <WhatAre />
        <CTABanner text="Wiedz więcej, działaj wcześniej. Jedno badanie krwi może zmienić Twoje podejście do profilaktyki." />
        <AboutTest />
        <Statistics />
        <Elements />
        <ForWhom />
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
