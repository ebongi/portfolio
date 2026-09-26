import { Link } from 'react-router-dom';

// Shared site footer, rendered at the bottom of every page.
export default function Footer() {
  return (
    <footer style={{ padding: 'clamp(48px,6vw,72px) clamp(20px,5vw,72px) clamp(28px,4vw,40px)', background: 'var(--ink)', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(32px,5vw,56px)',
            paddingBottom: 'clamp(32px,4vw,48px)', borderBottom: '1px solid var(--line-soft)',
          }}
        >
          <div>
            <Link
              to="/"
              style={{
                display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--display)', fontSize: 17,
                letterSpacing: '0.18em', color: 'var(--cream)', marginBottom: 16,
              }}
            >
              <span style={{ display: 'inline-block', width: 7, height: 7, border: '1px solid var(--gold)', transform: 'rotate(45deg)' }} />
              EBONG SUME
            </Link>
            <p className="mono" style={{ margin: 0, maxWidth: 280, lineHeight: 1.7 }}>
              Mobile application &amp; software engineer — cross-platform apps, native Android, and the systems
              behind them.
            </p>
          </div>
          <div>
            <p className="kicker" style={{ margin: '0 0 18px' }}>Navigate</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/" className="mono" style={{ color: 'var(--silver)' }}>Home</Link>
              <Link to="/projects" className="mono" style={{ color: 'var(--silver)' }}>Projects</Link>
              <Link to="/timeline" className="mono" style={{ color: 'var(--silver)' }}>Timeline</Link>
              <a href="/#contact" className="mono" style={{ color: 'var(--silver)' }}>Contact</a>
            </div>
          </div>
          <div>
            <p className="kicker" style={{ margin: '0 0 18px' }}>Connect</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="https://github.com/ebongi" target="_blank" rel="noopener noreferrer" className="mono" style={{ color: 'var(--silver)' }}>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ebong-sume-%F0%9F%87%A8%F0%9F%87%B2-4b0816298"
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{ color: 'var(--silver)' }}
              >
                LinkedIn
              </a>
              <a href="mailto:sumeebong7@gmail.com" className="mono" style={{ color: 'var(--silver)' }}>
                sumeebong7@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, paddingTop: 'clamp(24px,3vw,32px)' }}>
          <p className="mono" style={{ margin: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            © MMXXVI · Ebong Sume
          </p>
          <p className="mono" style={{ margin: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Built with Flutter, Dart &amp; patience
          </p>
        </div>
      </div>
    </footer>
  );
}
