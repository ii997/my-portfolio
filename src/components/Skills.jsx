import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_ROWS = [
  ['Flutter', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python', 'Figma'],
  ['Claude', 'Gemini', 'Codex', 'Visual Basic', 'PostgreSQL', 'Firebase', 'Dart', 'Antigravity'],
];

function MarqueeRow({ items, direction = 1, speed = 40 }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!inner || !wrapper) return;

    // Clone items inside inner so total width = 2x content
    const clone = inner.cloneNode(true);
    wrapper.appendChild(clone);

    const totalWidth = wrapper.scrollWidth / 2;
    const duration = totalWidth / speed;

    const tween = gsap.fromTo(
      wrapper,
      { x: direction * 0 },
      {
        x: direction * -totalWidth,
        duration,
        ease: 'none',
        repeat: -1,
      }
    );
    tweenRef.current = tween;

    // Pause on hover
    const pause = () => tween.pause();
    const resume = () => tween.resume();
    wrapper.addEventListener('mouseenter', pause);
    wrapper.addEventListener('mouseleave', resume);

    return () => {
      tween.kill();
      wrapper.removeEventListener('mouseenter', pause);
      wrapper.removeEventListener('mouseleave', resume);
    };
  }, [direction, speed]);

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        padding: '0.75rem 0',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          display: 'flex',
          gap: 0,
          willChange: 'transform',
          width: 'max-content',
        }}
      >
        <div
          ref={innerRef}
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {items.map((item) => (
            <span
              key={item}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--text-primary)',
                  opacity: 0.25,
                  flexShrink: 0,
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll('.reveal-item');
      if (headerItems) {
        gsap.fromTo(headerItems, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" style={{ padding: '10rem 0', maxWidth: 1400, margin: '0 auto', width: '100%', position: 'relative' }}>
      <div ref={headerRef} style={{ marginBottom: '4rem', padding: '0 2rem' }}>
        <div className="reveal-item">
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>Expertise</span>
        </div>
        <h2 className="reveal-item" style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', maxWidth: 540 }}>
          Tools & technologies I work with.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {SKILL_ROWS.map((row, i) => (
          <MarqueeRow
            key={i}
            items={row}
            direction={i % 2 === 0 ? 1 : -1}
            speed={40 + i * 6}
          />
        ))}
      </div>

      {/* Gradient fades at top and bottom */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6rem', background: 'linear-gradient(to bottom, var(--bg), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6rem', background: 'linear-gradient(to top, var(--bg), transparent)', pointerEvents: 'none' }} />
    </section>
  );
}
