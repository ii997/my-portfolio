import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './ThemeProvider';
import BackgroundAnimation from './BackgroundAnimation';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Work from './Work';
import Skills from './Skills';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Smooth section reveal for all sections
    const sections = mainRef.current?.querySelectorAll('section');
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Refresh ScrollTrigger after everything mounts
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ThemeProvider>
    <main ref={mainRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Fixed grain overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          pointerEvents: 'none',
          opacity: 0.015,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      <BackgroundAnimation />
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
    </ThemeProvider>
  );
}
