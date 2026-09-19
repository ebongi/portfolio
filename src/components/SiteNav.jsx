import { Link } from 'react-router-dom';

// Fixed top nav shared by every page. `navRef` comes from useScrollChrome so the
// same scroll listener drives its shrink/blur transition. Each entry in `links` is
// either { to, label } for an in-app route (SPA nav via Link) or { href, label } for
// a same-page anchor or a hash link into another route (e.g. "/#contact").
export default function SiteNav({ navRef, links }) {
  return (
    <nav
      ref={navRef}
      id="topnav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 32,
        padding: '20px clamp(20px,5vw,72px)', borderBottom: '1px solid transparent',
        transition: 'background .4s ease, border-color .4s ease, padding .4s ease',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: 'var(--display)', fontSize: 17, letterSpacing: '0.18em', color: 'var(--cream)',
          marginRight: 'auto', display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <span style={{ display: 'inline-block', width: 7, height: 7, border: '1px solid var(--gold)', transform: 'rotate(45deg)' }} />
        EBONG SUME
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,2.4vw,34px)' }}>
        {links.map((link) =>
          link.to ? (
            <Link key={link.label} to={link.to} className="mono" style={{ color: 'var(--silver)' }}>
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href} className="mono" style={{ color: 'var(--silver)' }}>
              {link.label}
            </a>
          )
        )}
      </div>
    </nav>
  );
}
