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

// A single photo renders as a static plate; more than one auto-advances as a
// crossfading slideshow with dot indicators and hover-revealed arrows. Clicking
// any photo hands it up to the page-level Lightbox for a full-size view.
function TimelineGallery({ images, alt, onOpen }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count]);

  if (count === 1) {
    return (
      <div className="timelineGrid">
        <img
          src={images[0]}
          alt={alt}
          loading="lazy"
          className="timelineZoomable"
          onClick={() => onOpen(0)}
        />
      </div>
    );
  }

  return (
    <div className="timelineSlideshow">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} — photo ${i + 1} of ${count}`}
          loading="lazy"
          className="timelineSlide timelineZoomable"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          onClick={() => onOpen(i)}
        />
      ))}
      <button
        type="button"
        aria-label="Previous photo"
        className="timelineSlideNav timelineSlideNav--prev"
        onClick={() => setIndex((i) => (i - 1 + count) % count)}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next photo"
        className="timelineSlideNav timelineSlideNav--next"
        onClick={() => setIndex((i) => (i + 1) % count)}
      >
        ›
      </button>
      <div className="timelineSlideDots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            className={`timelineSlideDot${i === index ? ' is-active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

// Full-size photo viewer. Escape or a click on the backdrop closes it; arrow
// keys (or the on-screen arrows) step through the entry's own photo set.
function Lightbox({ images, index, alt, onClose, onNavigate }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) onNavigate(-1);
      if (e.key === 'ArrowRight' && images.length > 1) onNavigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [images.length, onClose, onNavigate]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" aria-label="Close photo viewer" className="lightboxClose" onClick={onClose}>✕</button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="lightboxNav lightboxNav--prev"
            onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="lightboxNav lightboxNav--next"
            onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          >
            ›
          </button>
          <p className="mono lightboxCount">{index + 1} / {images.length}</p>
        </>
      )}
      <img
        src={images[index]}
        alt={`${alt} — photo ${index + 1} of ${images.length}`}
        className="lightboxImg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function Timeline() {
  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome();
  const [playing, setPlaying] = useState(true);
  const [entryFx] = useState(() => randomTransitions(TIMELINE.length));
  const [lightbox, setLightbox] = useState(null);

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
                      <div style={{ order: reversed ? 1 : 2 }}>
                        <TimelineGallery
                          images={images}
                          alt={item.title}
                          onOpen={(i) => setLightbox({ images, index: i, alt: item.title })}
                        />
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

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
          onNavigate={(dir) =>
            setLightbox((lb) => ({ ...lb, index: (lb.index + dir + lb.images.length) % lb.images.length }))
          }
        />
      )}
    </div>
  );
}
