import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.reveal-item');
      if (items) {
        gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: 'error', text: data.error || 'Something went wrong.' });
      } else {
        setStatus({ type: 'success', text: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" style={{ padding: '8rem 2rem 4rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <div style={{ padding: '4rem', borderRadius: '2rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }} className="contact-inner">
        <div style={{ maxWidth: 600, marginBottom: '3rem' }}>
          <div className="reveal-item">
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>Get in touch</span>
          </div>
          <h2 className="reveal-item" style={{ fontFamily: "'Plus Jakarta Sans', 'Geist', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Have a project in mind?
          </h2>
          <p className="reveal-item" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 460 }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to push boundaries.
          </p>
        </div>

        <div className="reveal-item">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 520 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Name</label>
                <input id="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-strong)', background: 'var(--bg)', fontSize: '0.9rem', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => (e.target.style.borderColor = 'var(--text-primary)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')} />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email</label>
                <input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-strong)', background: 'var(--bg)', fontSize: '0.9rem', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => (e.target.style.borderColor = 'var(--text-primary)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')} />
              </div>
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Message</label>
              <textarea id="message" rows={4} placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} required style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-strong)', background: 'var(--bg)', fontSize: '0.9rem', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.3s ease' }} onFocus={(e) => (e.target.style.borderColor = 'var(--text-primary)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')} />
            </div>

            {/* Status messages */}
            {status.text && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  background: status.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  color: status.type === 'success' ? '#16a34a' : '#dc2626',
                  border: `1px solid ${status.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                }}
              >
                {status.text}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: loading ? 'var(--text-faint)' : 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  transition: 'all 0.4s cubic-bezier(0.32,0.72,0,1)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'scale(0.97)';
                    e.target.style.background = 'var(--btn-primary-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = loading ? 'var(--text-faint)' : 'var(--btn-primary-bg)';
                }}
              >
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-inner { padding: 2rem 1.5rem !important; }
          .contact-inner form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
