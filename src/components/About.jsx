import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = contentRef.current?.querySelectorAll('.reveal-item');
      if (sections) {
        gsap.fromTo(sections, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } });
      }
      gsap.fromTo(statsRef.current.filter(Boolean), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' } });
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '2+', label: 'Years experience' },
    { number: '10+', label: 'Projects delivered' },
    { number: '15+', label: 'Happy clients' },
  ];

  return (
    <section ref={sectionRef} id="about" style={{ padding: '8rem 2rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <div ref={contentRef} style={{ maxWidth: 900 }}>
        <div className="reveal-item">
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>About</span>
        </div>
        <h2 className="reveal-item" style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          Building apps that people<br />actually enjoy using.
        </h2>
        <p className="reveal-item" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 620, marginBottom: '1rem', fontWeight: 400 }}>
          A Bachelor of Science in Information Systems graduate with 2 years of hands-on experience building mobile apps with Flutter and desktop solutions with Visual Basic. I've also spent a year exploring web development, rounding out my toolkit.
        </p>
        <p className="reveal-item" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 620, marginBottom: '4rem', fontWeight: 400 }}>
          I've built apps, websites, and internal tools — always with one goal: deliver something that works well and keeps the client happy.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }} className="stats-row">
        {stats.map((stat, i) => (
          <div key={stat.label} ref={(el) => (statsRef.current[i] = el)} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>{stat.number}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)', fontWeight: 500 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-row { flex-wrap: wrap; gap: 2rem !important; }
          .stats-row > div { flex: 1 1 40%; }
        }
      `}</style>
    </section>
  );
}
