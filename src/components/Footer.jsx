export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ padding: '3rem 2rem', maxWidth: 1400, margin: '0 auto', width: '100%', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="footer-inner">
      <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)', fontWeight: 500 }}>&copy; {year} Portfolio. All rights reserved.</span>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {['GitHub', 'LinkedIn', 'Twitter'].map((label) => (
          <a key={label} href="#" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', transition: 'color 0.3s ease' }} onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}>
            {label}
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) { .footer-inner { flex-direction: column; gap: 1rem; text-align: center; } }
      `}</style>
    </footer>
  );
}
