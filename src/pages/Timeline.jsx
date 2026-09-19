import { useEffect, useRef, useState } from 'react';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { TIMELINE } from '../data/timeline.js';

// Picked randomly per milestone (never repeating the previous one back to back)
// so entries scroll in with a mix of cuts rather than one consistent style.
const TRANSITIONS = ['whip', 'match', 'dissolve', 'fade', 'cut', 'wipe'];

function randomTransitions(count) {
  const picks = [];
  let prev = null;
  for (let i = 0; i < count; i++) {
    let choice;
    do {
      choice = TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
    } while (choice === prev);
    picks.push(choice);
    prev = choice;
  }
  return picks;
}

export default function Timeline() {
  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome();
  const [playing, setPlaying] = useState(true);
  const [entryFx] = useState(() => randomTransitions(TIMELINE.length));

  useReveal(rootRef);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.55;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

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
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {TIMELINE.length === 0 ? (
            <div className="card reveal" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: 'clamp(40px,6vw,64px)' }}>
              <p className="kicker" style={{ margin: '0 0 16px' }}>Coming Soon</p>
              <p style={{ color: 'var(--silver)', margin: 0 }}>
                This page will fill in with milestones as the story gets added — drop entries into{' '}
                <span className="mono" style={{ color: 'var(--gold)' }}>src/data/timeline.js</span> to bring it to life.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px,8vw,100px)' }}>
              {TIMELINE.map((item, index) => {
                const images = Array.isArray(item.image) ? item.image : item.image ? [item.image] : [];
                const reversed = index % 2 === 1;
                return (
                  <div
                    className={`reveal fx-${entryFx[index]} timelineEntry${images.length ? ' timelineEntry--withImages' : ''}`}
                    key={`${item.year}-${item.title}`}
                  >
                    <div style={{ order: reversed ? 2 : 1, maxWidth: images.length ? undefined : 720 }}>
                      <p className="numeral" style={{ margin: '0 0 14px' }}>{item.year}</p>
                      <h3 style={{ fontSize: 'clamp(28px,3.4vw,40px)', marginBottom: 18 }}>{item.title}</h3>
                      {item.tags?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                          {item.tags.map((tag) => (
                            <span className="chip" key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ color: 'var(--silver)', margin: item.link ? '0 0 22px' : 0 }}>{item.body}</p>
                      {item.link && (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mono"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)',
                            textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 12,
                            borderBottom: '1px solid rgba(212,175,55,0.35)', paddingBottom: 4,
                          }}
                        >
                          {item.link.label} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>

                    {images.length > 0 && (
                      <div className="timelineGrid" style={{ order: reversed ? 1 : 2 }}>
                        {images.map((src, i) => (
                          <img key={src + i} src={src} alt={`${item.title} — photo ${i + 1}`} loading="lazy" />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <audio ref={audioRef} src="/assets/audio/timeline-theme.mp3" loop preload="auto" />
      <button
        type="button"
        aria-label={playing ? 'Pause music' : 'Play music'}
        onClick={toggleAudio}
        style={{
          position: 'fixed', left: 'clamp(16px,3vw,34px)', bottom: 'clamp(16px,3vw,34px)', zIndex: 60,
          width: 48, height: 48, display: 'grid', placeItems: 'center', border: '1px solid var(--line)',
          background: 'rgba(26,28,35,0.8)', backdropFilter: 'blur(8px)', color: 'var(--gold)', fontSize: 15,
          cursor: 'pointer', transition: 'background .3s ease',
        }}
      >
        {playing ? '❚❚' : '▶'}
      </button>

      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
