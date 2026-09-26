import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import Footer from '../components/Footer.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { useTheme } from '../hooks/useTheme.js';
import { PROJECTS } from '../data/projects.js';

export default function Projects() {
  const rootRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome();
  const { theme, toggleTheme } = useTheme();

  useReveal(rootRef);

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      <SiteNav
        navRef={navRef}
        theme={theme}
        onToggleTheme={toggleTheme}
        links={[
          { to: '/', label: 'Home' },
          { href: '/#about', label: 'The Craft' },
          { to: '/timeline', label: 'Timeline' },
          { href: '/#contact', label: 'Contact' },
        ]}
      />

      <header style={{ padding: '160px clamp(20px,5vw,72px) 70px', background: 'linear-gradient(180deg,var(--ink),var(--ink-2))' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <p className="kicker reveal" style={{ margin: '0 0 22px' }}>The Complete Works</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(36px,5.6vw,64px)', marginBottom: 22 }}>All Projects</h1>
          <p className="reveal" style={{ maxWidth: 640, color: 'var(--silver)', fontSize: 'clamp(17px,1.4vw,19px)', margin: 0 }}>
            Every build worth showing, in one place — what it does, how it&rsquo;s put together, and where to look
            closer.
          </p>
          <hr className="rule reveal" style={{ margin: 'clamp(44px,6vw,70px) 0 0' }} />
        </div>
      </header>

      <section style={{ padding: '0 clamp(20px,5vw,72px) clamp(90px,11vw,150px)', background: 'var(--ink-2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,240px))', gap: 'clamp(18px,2.2vw,28px)' }}>
          {PROJECTS.map((project) => (
            <article className="card projectCard reveal" key={project.slug}>
              <Link to={`/projects/${project.slug}`} className="projectThumb">
                <img src={project.thumbnail} alt={`${project.name} preview`} loading="lazy" />
              </Link>
              <div className="projectBody">
                <p className="kicker" style={{ margin: '0 0 8px', fontSize: 10 }}>{project.status}</p>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{project.name}</h3>
                <p style={{ color: 'var(--silver)', margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.5 }}>{project.tagline}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {project.tags.map((tag) => (
                    <span className="chip" key={tag}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {project.links.playStore && (
                    <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" className="gbtn" style={{ padding: '9px 16px', fontSize: 11 }}>Play Store</a>
                  )}
                  <Link to={`/projects/${project.slug}`} className="gbtn ghost" style={{ padding: '9px 16px', fontSize: 11 }}>Case Study</Link>
                  {project.links.source && (
                    <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="gbtn ghost" style={{ padding: '9px 16px', fontSize: 11 }}>
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
