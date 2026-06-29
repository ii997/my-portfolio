import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  { quote: "One of the most meticulous developers I've worked with. Every pixel, every transition — it's all intentional and polished.", author: 'Sarah Chen', role: 'Founder, Luminary Studio' },
  { quote: 'The level of craft he brings is rare. He doesn\'t just build interfaces — he builds experiences that users remember.', author: 'Marcus Rivera', role: 'CTO, Nebula Labs' },
  { quote: 'Translated our complex product requirements into an interface that feels effortless. Our users consistently compliment the design.', author: 'Emily Okonkwo', role: 'Product Lead, Canvas' },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerItems = sectionRef.current?.querySelectorAll('.reveal-item');
      if (headerItems) {
        gsap.fromTo(headerItems, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } });
      }
      gsap.fromTo(cardsRef.current.filter(Boolean), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 55%', toggleActions: 'play none none none' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" style={{ padding: '8rem 2rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '4rem' }}>
        <div className="reveal-item">
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>Testimonials</span>
        </div>
        <h2 className="reveal-item" style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', maxWidth: 500 }}>
          Kind words from people I've worked with.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.author}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{
              padding: '2rem',
              borderRadius: '2rem',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.4s cubic-bezier(0.32,0.72,0,1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <span style={{ fontSize: '3rem', lineHeight: 0.8, fontWeight: 300, color: 'var(--text-primary)', opacity: 0.1, marginBottom: '1rem', fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif" }}>"</span>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', flex: 1, marginBottom: '1.5rem', fontStyle: 'italic', fontWeight: 400 }}>{t.quote}</p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{t.author}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)', fontWeight: 500 }}>{t.role}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
