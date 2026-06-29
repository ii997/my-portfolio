import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title: 'Lumina', category: 'SaaS Platform', description: 'A premium analytics dashboard with real-time data visualization and AI-powered insights.', tags: ['React', 'D3.js', 'Node.js'], span: 'large', img: 'https://picsum.photos/seed/lumina/800/500' },
  { title: 'Atlas', category: 'E-Commerce', description: 'High-end fashion marketplace with immersive product discovery and seamless checkout.', tags: ['Next.js', 'Stripe', 'Tailwind'], span: 'small', img: 'https://picsum.photos/seed/atlas/600/500' },
  { title: 'Pulse', category: 'Health Tech', description: 'Patient monitoring platform with intuitive data dashboards and real-time alerts.', tags: ['React', 'GSAP', 'Firebase'], span: 'small', img: 'https://picsum.photos/seed/pulse/600/500' },
  { title: 'Studio', category: 'Agency Site', description: 'Award-winning portfolio site built for a global creative agency with immersive scroll storytelling.', tags: ['Astro', 'GSAP', 'Sanity'], span: 'wide', img: 'https://picsum.photos/seed/studio/800/450' },
  { title: 'Orbit', category: 'Fintech', description: 'Investment management platform with predictive modeling and real-time portfolio tracking.', tags: ['Vue', 'Python', 'AWS'], span: 'small', img: 'https://picsum.photos/seed/orbit/600/500' },
];

export default function Work() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll('.reveal-item');
      if (headerItems) {
        gsap.fromTo(headerItems, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } });
      }
      gsap.fromTo(cardsRef.current.filter(Boolean), { y: 50, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none none' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" style={{ padding: '8rem 2rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <div ref={headerRef} style={{ marginBottom: '4rem' }}>
        <div className="reveal-item">
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>Selected Work</span>
        </div>
        <h2 className="reveal-item" style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', maxWidth: 500 }}>
          Projects I've crafted with care.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }} className="work-grid">
        {PROJECTS.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`work-card work-card--${project.span}`}
            style={{
              borderRadius: '2rem',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.32,0.72,0,1)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Image */}
            <div
              style={{
                height: project.span === 'large' ? 240 : project.span === 'wide' ? 200 : 180,
                overflow: 'hidden',
                borderBottom: '1px solid var(--border)',
                background: 'var(--accent-1)',
              }}
            >
              <img
                loading="lazy"
                src={project.img}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.32,0.72,0,1)',
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.5rem' }}>{project.category}</span>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'var(--bg-subtle)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-faint)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .work-card--large { grid-column: span 2; grid-row: span 1; }
        .work-card--wide { grid-column: span 2; }
        .work-card--small { grid-column: span 1; }
        @media (max-width: 768px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .work-card--large, .work-card--wide, .work-card--small { grid-column: span 1 !important; }
          .work-card--large > div:first-child,
          .work-card--wide > div:first-child { height: 200px !important; }
        }
      `}</style>
    </section>
  );
}
