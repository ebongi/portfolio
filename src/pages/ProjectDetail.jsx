import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { PROJECTS } from '../data/projects.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  const rootRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome();

  useReveal(rootRef);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      <SiteNav
        navRef={navRef}
        links={[
          { to: '/', label: 'Home' },
          { to: '/projects', label: 'Projects' },
          { to: '/timeline', label: 'Timeline' },
          { href: '/#contact', label: 'Contact' },
        ]}
      />

      <header style={{ padding: '160px clamp(20px,5vw,72px) 70px', background: 'linear-gradient(180deg,var(--ink),var(--ink-2))' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <Link
            to="/projects"
            className="mono reveal"
            style={{ display: 'inline-block', marginBottom: 26, color: 'var(--silver)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            &larr; All Projects
          </Link>
          <p className="kicker reveal" style={{ margin: '0 0 22px' }}>{project.status}</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(36px,5.6vw,64px)', marginBottom: 22 }}>{project.name}</h1>
          <p className="reveal" style={{ maxWidth: 640, color: 'var(--silver)', fontSize: 'clamp(17px,1.4vw,19px)', margin: 0 }}>
            {project.tagline}
          </p>
          <hr className="rule reveal" style={{ margin: 'clamp(44px,6vw,70px) 0 0' }} />
        </div>
      </header>

      <section style={{ padding: '0 clamp(20px,5vw,72px) clamp(90px,11vw,150px)', background: 'var(--ink-2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            className="card reveal"
            style={{ padding: 'clamp(28px,4vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(28px,4vw,56px)', alignItems: 'start' }}
          >
            <div>
              <p className="kicker" style={{ margin: '0 0 14px' }}>Overview</p>
              <p style={{ color: 'var(--silver)', margin: 0 }}>{project.overview}</p>
            </div>
            <dl style={{ margin: 0, display: 'grid', gap: 0, borderLeft: '1px solid var(--line)', paddingLeft: 'clamp(20px,3vw,36px)' }}>
              {[
                ['Role', project.role],
                ['Platform', project.platform],
                ['Architecture', project.architecture],
                ['Status', project.status],
              ].map(([term, value], i, arr) => (
                <div
                  key={term}
                  style={{
                    display: 'flex', justifyContent: 'space-between', gap: 20, padding: '14px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--line-soft)' : 'none',
                  }}
                >
                  <dt className="mono" style={{ letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 11 }}>{term}</dt>
                  <dd style={{ margin: 0, textAlign: 'right' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Architecture &amp; Tech Stack</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {project.stack.map((item) => (
              <div className="card reveal" key={item.num}>
                <p className="numeral" style={{ margin: '0 0 14px' }}>{item.num}</p>
                <h4 style={{ fontSize: 21, marginBottom: 10 }}>{item.title}</h4>
                <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Key Features</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {project.features.map((item) => (
              <div className="card reveal" key={item.title} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span style={{ flex: 'none', width: 9, height: 9, marginTop: 9, border: '1px solid var(--gold)', transform: 'rotate(45deg)' }} />
                <div>
                  <h4 style={{ fontSize: 20, marginBottom: 8 }}>{item.title}</h4>
                  <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Inside the App</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 'clamp(20px,3vw,44px)', maxWidth: 900 }}>
            {project.screens.map((screen) => (
              <figure className="reveal" style={{ margin: 0 }} key={screen.src}>
                <div className="phone">
                  <div className="screen">
                    <img src={screen.src} alt={screen.alt} />
                  </div>
                </div>
                <figcaption className="mono" style={{ marginTop: 16, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 11 }}>
                  {screen.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(40px,5vw,64px)' }}>
            {project.links.playStore && (
              <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" className="gbtn">Get it on Google Play</a>
            )}
            {project.links.source && (
              <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="gbtn ghost">Source Code / Docs</a>
            )}
          </div>
        </div>
      </section>

      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
