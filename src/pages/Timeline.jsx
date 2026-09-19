import { useRef } from 'react';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { TIMELINE } from '../data/timeline.js';

export default function Timeline() {
  const rootRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome();

  useReveal(rootRef);

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      <SiteNav
        navRef={navRef}
        links={[
          { to: '/', label: 'Home' },
          { to: '/projects', label: 'Projects' },
          { href: '/#contact', label: 'Contact' },
        ]}
      />

      <header style={{ padding: '160px clamp(20px,5vw,72px) 70px', background: 'linear-gradient(180deg,var(--ink),var(--ink-2))' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="kicker reveal" style={{ margin: '0 0 22px' }}>The Journey</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(36px,5.6vw,64px)', marginBottom: 22 }}>Timeline</h1>
          <p className="reveal" style={{ maxWidth: 640, color: 'var(--silver)', fontSize: 'clamp(17px,1.4vw,19px)', margin: 0 }}>
            From the first line of code to where the work stands today — the milestones, one by one.
          </p>
          <hr className="rule reveal" style={{ margin: 'clamp(44px,6vw,70px) 0 0' }} />
        </div>
      </header>

      <section style={{ padding: '0 clamp(20px,5vw,72px) clamp(90px,11vw,150px)', background: 'var(--ink-2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {TIMELINE.length === 0 ? (
            <div className="card reveal" style={{ textAlign: 'center', padding: 'clamp(40px,6vw,64px)' }}>
              <p className="kicker" style={{ margin: '0 0 16px' }}>Coming Soon</p>
              <p style={{ color: 'var(--silver)', margin: 0 }}>
                This page will fill in with milestones as the story gets added — drop entries into{' '}
                <span className="mono" style={{ color: 'var(--gold)' }}>src/data/timeline.js</span> to bring it to life.
              </p>
            </div>
          ) : (
            <div
              style={{
                borderLeft: '1px solid var(--line)', paddingLeft: 'clamp(28px,4vw,48px)',
                display: 'grid', gap: 'clamp(36px,5vw,56px)',
              }}
            >
              {TIMELINE.map((item) => (
                <div className="reveal" style={{ position: 'relative' }} key={`${item.year}-${item.title}`}>
                  <span
                    style={{
                      position: 'absolute', left: 'calc(-1 * clamp(28px,4vw,48px) - 5px)', top: 6,
                      width: 9, height: 9, border: '1px solid var(--gold)', background: 'var(--ink-2)',
                      transform: 'rotate(45deg)',
                    }}
                  />
                  <p className="numeral" style={{ margin: '0 0 10px' }}>{item.year}</p>
                  <h3 style={{ fontSize: 22, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: 'var(--silver)', margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
