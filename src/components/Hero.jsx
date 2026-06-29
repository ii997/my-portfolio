import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const roleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const imageRef = useRef(null);

  const name = "Hi, I'm JHONEL RUGA";
  const nameWords = useMemo(() => name.split(' ').map(word => word.split('')), []);
  const role = 'Software Developer';
  const roleWords = useMemo(() => role.split(' ').map(word => word.split('')), []);

  useEffect(() => {
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Badge slides in
    tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      // 2. Show cursor before name
      .set(cursorRef.current, { opacity: 1 })
      // 3. Type name with bouncy organic feel
      .fromTo(
        titleRef.current?.querySelectorAll('.char'),
        { opacity: 0, y: 16, rotateX: -70, scale: 1.4 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.14,
          stagger: {
            each: 0.04,
            from: 'start',
          },
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      )
      // 4. Blink cursor a couple times as a "pause"
      .to(cursorRef.current, { opacity: 0, duration: 0.12 })
      .to(cursorRef.current, { opacity: 1, duration: 0.12 })
      .to(cursorRef.current, { opacity: 0, duration: 0.12 })
      .to(cursorRef.current, { opacity: 1, duration: 0.12 })
      // 5. Type role with bouncy stagger
      .fromTo(
        roleRef.current?.querySelectorAll('.role-char'),
        { opacity: 0, y: 20, rotateX: -50, scale: 1.2 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.12,
          stagger: {
            each: 0.035,
            from: 'start',
          },
          ease: 'back.out(1.15)',
        },
        '-=0.1'
      )
      // 6. Subtitle, CTA, image
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
      .fromTo(imageRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, '-=0.5');

    // 7. After timeline, keep cursor blinking forever
    tl.eventCallback('onComplete', () => {
      if (cursorRef.current) {
        cursorRef.current.style.animation = 'cursor-blink 1.2s ease-in-out infinite';
      }
    });

    // 8. Subtle continuous floating for hero orbs
    const orbs = sectionRef.current?.querySelectorAll('.hero-orb');
    orbs?.forEach((orb, i) => {
      gsap.to(orb, {
        y: i === 0 ? -20 : 15,
        x: i === 0 ? 15 : -10,
        duration: 4 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 1.5,
      });
    });

    // 9. Floating tech badges around the hero image
    const badges = sectionRef.current?.querySelectorAll('.tech-badge');
    badges?.forEach((badge, i) => {
      const driftX = [12, -18, -15, 20][i] || 0;
      const driftY = [-18, 15, -12, -20][i] || 0;
      gsap.to(badge, {
        x: driftX,
        y: driftY,
        duration: 3 + i * 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });

    return () => tl.kill();
  }, []);

  const handleCTA = () => {
    const target = document.querySelector('#work');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 2rem 4rem',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Animated gradient orbs — accent color extracted from portrait */}
      <div
        className="hero-orb hero-orb--a"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 40% 50%, rgba(255, 139, 29, 0.25) 0%, rgba(255, 100, 50, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      <div
        className="hero-orb hero-orb--b"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '30%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 60% 50%, rgba(255, 160, 60, 0.12) 0%, rgba(255, 139, 29, 0.05) 30%, transparent 65%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', position: 'relative' }} className="hero-grid">
        {/* Left — text */}
        <div style={{ position: 'relative' }}>
          <div
            ref={badgeRef}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 1rem 0.375rem 0.375rem',
              borderRadius: '9999px',
              background: 'var(--badge-bg)',
              border: '1px solid var(--badge-border)',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.625rem',
                borderRadius: '9999px',
                background: '#ff8b1d',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Available
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              <span style={{ color: '#ff8b1d' }}>✦</span> For new projects</span>
          </div>

          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              minHeight: '1.2em',
            }}
          >
            <span ref={titleRef} style={{ display: 'inline-flex', flexWrap: 'wrap', rowGap: '0.2em', columnGap: '0.3em' }}>
              {nameWords.map((wordChars, wordIdx) => {
                const isLastWord = wordIdx === nameWords.length - 1;
                return (
                  <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {wordChars.map((ch, charIdx) => (
                      <span
                        key={charIdx}
                        className="char"
                        style={{
                          display: 'inline-block',
                          opacity: 0,
                          transform: 'translateY(12px) rotateX(-60deg)',
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                    {isLastWord && (
                      <span
                        ref={cursorRef}
                        style={{
                          display: 'inline-block',
                          width: '0.1em',
                          height: '0.9em',
                          background: '#ff8b1d',
                          marginLeft: '0.08em',
                          marginRight: '0.02em',
                          verticalAlign: 'baseline',
                          opacity: 0,
                          borderRadius: '2px',
                          boxShadow: '0 0 8px rgba(255,139,29,0.6), 0 0 20px rgba(255,139,29,0.3)',
                          willChange: 'opacity',
                        }}
                      />
                    )}
                  </span>
                );
              })}
            </span>
          </h1>

          <div
            ref={roleRef}
            className="hero-role"
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              rowGap: '0.2em',
              columnGap: '0.3em',
              fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif",
            }}
          >
            {roleWords.map((wordChars, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {wordChars.map((ch, charIdx) => (
                  <span
                    key={charIdx}
                    className="role-char"
                    style={{
                      display: 'inline-block',
                      opacity: 0,
                      transform: 'translateY(20px) rotateX(-40deg)',
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </div>

          <p
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '480px',
              marginBottom: '2.5rem',
              fontWeight: 400,
            }}
          >
            Mobile apps with Flutter. Web on the side. Always clean, always polished.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleCTA}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '9999px',
                border: 'none',
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.32,0.72,0,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(0.97)';
                e.target.style.background = 'var(--btn-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = 'var(--btn-primary-bg)';
              }}
            >
              View my work
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--accent-3)',
                  fontSize: '0.9rem',
                  transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
                }}
                className="btn-arrow"
              >
                →
              </span>
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '0.875rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                transition: 'color 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Right — hero image */}
        <div ref={imageRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 600, display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/hero-image.png"
              alt="Jhonel Ruga"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />

            {/* Floating tech badges */}
            <div className="tech-badge" data-index="0" style={{ position: 'absolute', top: '5%', right: '-8%', padding: '0.5rem 1rem', borderRadius: '9999px', background: 'var(--badge-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--badge-border)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--card-shadow)' }}>
              <img src="https://thesvg.org/icons/flutter/default.svg" width="16" height="16" alt="Flutter" style={{ display: 'block' }} />
              Flutter
            </div>

            <div className="tech-badge" data-index="1" style={{ position: 'absolute', bottom: '18%', left: '-10%', padding: '0.5rem 1rem', borderRadius: '9999px', background: 'var(--badge-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--badge-border)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--card-shadow)' }}>
              <img src="https://thesvg.org/icons/claude/default.svg" width="16" height="16" alt="Claude" style={{ display: 'block' }} />
              Claude
            </div>

            <div className="tech-badge" data-index="2" style={{ position: 'absolute', top: '30%', left: '-12%', padding: '0.5rem 1rem', borderRadius: '9999px', background: 'var(--badge-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--badge-border)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--card-shadow)' }}>
              <img src="https://thesvg.org/icons/codex/default.svg" width="16" height="16" alt="Codex" style={{ display: 'block' }} />
              Codex
            </div>

            <div className="tech-badge" data-index="3" style={{ position: 'absolute', bottom: '5%', right: '-6%', padding: '0.5rem 1rem', borderRadius: '9999px', background: 'var(--badge-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--badge-border)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--card-shadow)' }}>
              <img src="https://thesvg.org/icons/tailwind-css/default.svg" width="16" height="16" alt="Tailwind CSS" style={{ display: 'block' }} />
              Tailwind CSS
            </div>
          </div>
        </div>
      </div>

      {/* Name accent underline */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.4,
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: "'Geist Mono', monospace",
          letterSpacing: '0.1em',
        }}
      >
        <span style={{ width: 24, height: 2, background: '#ff8b1d', borderRadius: '1px' }} />
        DESIGN &amp; CODE
      </div>

      <style>{`
        .hero-headline { perspective: 1000px; }
        .hero-role { perspective: 800px; }

        .hero-orb {
          animation: hero-float 12s ease-in-out infinite alternate;
        }
        .hero-orb--a {
          animation-duration: 14s;
          animation-delay: -2s;
        }
        .hero-orb--b {
          animation-duration: 18s;
          animation-delay: -6s;
        }

        @keyframes hero-float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
          100% { transform: translate(15px, -10px) scale(1.02); }
        }

        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-headline .char {
          will-change: transform, opacity;
        }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .btn-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
