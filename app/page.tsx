'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LiveDemo from '../components/LiveDemo';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function SheetVistaLanding() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-hidden">
      <Navbar onDemoClick={scrollToDemo} />
      <Hero onDemoClick={scrollToDemo} />
      <Features />
      <div id="demo">
        <LiveDemo />
      </div>
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}

