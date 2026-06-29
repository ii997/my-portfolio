import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from './ThemeProvider';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const nav = navRef.current;
    gsap.fromTo(nav, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current.filter(Boolean);

    if (menuOpen) {
      gsap.to(menu, { display: 'flex', opacity: 1, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo(
        links,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' }),
      });
    }
  }, [menuOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.5rem 0.5rem 0.5rem 1.5rem',
          borderRadius: '9999px',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginRight: '0.5rem',
          }}
        >
          Portfolio
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-faint)',
                transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--text-primary)';
                e.target.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-faint)';
                e.target.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            background: 'var(--bg-subtle)',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            marginLeft: '0.5rem',
            transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--bg-hover)';
            e.target.style.transform = 'scale(0.92)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--bg-subtle)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: 36,
            height: 36,
            borderRadius: '50%',
            position: 'relative',
            background: 'var(--bg-subtle)',
          }}
          className="mobile-hamburger"
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: menuOpen
                ? 'translate(-50%, -50%) rotate(45deg)'
                : 'translate(-50%, calc(-50% - 4px))',
              width: 16,
              height: 2,
              background: 'var(--text-primary)',
              borderRadius: 1,
              transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: menuOpen
                ? 'translate(-50%, -50%) rotate(-45deg)'
                : 'translate(-50%, calc(-50% + 4px))',
              width: 16,
              height: 2,
              background: 'var(--text-primary)',
              borderRadius: 1,
              transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(48px)',
          WebkitBackdropFilter: 'blur(48px)',
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => (linksRef.current[i] = el)}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            style={{
              fontSize: '2rem',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-muted)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-primary)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav > div {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
