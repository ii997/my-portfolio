import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title: 'obmenu2', category: 'Desktop Environment', description: 'A graphical menu editor for Openbox menu.xml files. Written in Python 3 & GTK3. 19 stars.', tags: ['Python', 'GTK3', 'Linux'], span: 'large', img: 'https://picsum.photos/seed/obmenu2/800/500', url: 'https://github.com/0x10/obmenu2', stars: 19 },
  { title: 'fastdict', category: 'C++ Library', description: 'A fast specialized dictionary library using a deterministic finite automaton for efficient word search.', tags: ['C++', 'Algorithm', 'Library'], span: 'small', img: 'https://picsum.photos/seed/fastdict/600/500', url: 'https://github.com/0x10/fastdict', stars: 4 },
  { title: 'wordtris', category: 'Game', description: 'A C-based puzzle game exploring word mechanics and interactive gameplay patterns.', tags: ['C', 'Game', 'SDL'], span: 'small', img: 'https://picsum.photos/seed/wordtris/600/500', url: 'https://github.com/0x10/wordtris', stars: 0 },
  { title: 'oblogout', category: 'Desktop Tool', description: 'Minimal logout, reboot, and shutdown GUI for Openbox. A lightweight Python session manager.', tags: ['Python', 'Openbox', 'GTK'], span: 'wide', img: 'https://picsum.photos/seed/oblogout/800/450', url: 'https://github.com/0x10/oblogout', stars: 1 },
  { title: 'TreeOfWork', category: 'Concurrency Research', description: 'A hierarchical threading concept where workers are organized by parent execution states for parallelism.', tags: ['C++', 'Concurrency', 'Research'], span: 'small', img: 'https://picsum.photos/seed/treeofwork/600/500', url: 'https://github.com/0x10/TreeOfWork', stars: 0 },
];

export default function Work() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((data) => {
        if (data.success && data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        } else {
          setProjects(PROJECTS);
        }
      })
      .catch((err) => {
        console.warn('Could not load github projects, using static list:', err);
        setProjects(PROJECTS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll('.reveal-item');
      if (headerItems) {
        gsap.fromTo(headerItems, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } });
      }
      
      const validCards = cardsRef.current.slice(0, projects.length).filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(validCards, { y: 50, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none none' } });
      }
    });
    return () => ctx.revert();
  }, [projects, loading]);

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
        {projects.map((project, i) => (
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
              position: 'relative',
              transition: 'all 0.5s cubic-bezier(0.32,0.72,0,1)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={() => window.open(project.url, '_blank')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') window.open(project.url, '_blank'); }}
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
                position: 'relative',
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
              {project.stars > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {project.stars}
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{project.category}</span>
                {project.private && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-subtle)', border: '1px solid var(--border)', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'block' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Private
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'var(--bg-subtle)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-faint)' }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-faint)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
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
