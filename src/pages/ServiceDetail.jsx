import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import Footer from '../components/Footer.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { useTheme } from '../hooks/useTheme.js';
import { SERVICES } from '../data/services.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  const rootRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome();
  const { theme, toggleTheme } = useTheme();

  useReveal(rootRef);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      <SiteNav
        navRef={navRef}
        theme={theme}
        onToggleTheme={toggleTheme}
        links={[
          { to: '/', label: 'Home' },
          { href: '/#services', label: 'Services' },
          { to: '/projects', label: 'Projects' },
          { href: '/#contact', label: 'Contact' },
        ]}
      />

      <header style={{ padding: '160px clamp(20px,5vw,72px) 70px', background: 'linear-gradient(180deg,var(--ink),var(--ink-2))' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <a
            href="/#services"
            className="mono reveal"
            style={{ display: 'inline-block', marginBottom: 26, color: 'var(--silver)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            &larr; All Services
          </a>
          <p className="kicker reveal" style={{ margin: '0 0 22px' }}>Service {service.num}</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(36px,5.6vw,64px)', marginBottom: 22 }}>{service.title}</h1>
          <p className="reveal" style={{ maxWidth: 700, color: 'var(--silver)', fontSize: 'clamp(17px,1.4vw,19px)', margin: 0 }}>
            {service.body}
          </p>
          <hr className="rule reveal" style={{ margin: 'clamp(44px,6vw,70px) 0 0' }} />
        </div>
      </header>

      <section style={{ padding: '0 clamp(20px,5vw,72px) clamp(90px,11vw,150px)', background: 'var(--ink-2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <p className="reveal" style={{ maxWidth: 780, fontSize: 'clamp(19px,2vw,24px)', fontStyle: 'italic', color: 'var(--cream)', margin: 0 }}>
            {service.overview}
          </p>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>How I Implement This</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {service.steps.map((step, i) => (
              <div className="card reveal" key={step.title}>
                <p className="numeral" style={{ margin: '0 0 14px' }}>{String(i + 1).padStart(2, '0')}</p>
                <h4 style={{ fontSize: 19, marginBottom: 10 }}>{step.title}</h4>
                <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Tools &amp; Practices</p>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {service.tools.map((tool) => (
              <span className="chip" key={tool}>{tool}</span>
            ))}
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(40px,5vw,64px)' }}>
            <Link to="/projects" className="gbtn">View My Work</Link>
            <a href="/#contact" className="gbtn ghost">Start a Project</a>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
