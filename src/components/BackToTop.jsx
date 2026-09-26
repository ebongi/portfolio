// Fixed scroll-to-top button. `toTopRef` comes from useScrollChrome, which toggles
// its visibility as the user scrolls.
export default function BackToTop({ toTopRef }) {
  return (
    <button
      ref={toTopRef}
      id="toTop"
      type="button"
      aria-label="Return to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', right: 'clamp(16px,3vw,34px)', bottom: 'clamp(16px,3vw,34px)', zIndex: 60,
        width: 48, height: 48, display: 'grid', placeItems: 'center', border: '1px solid var(--line)',
        background: 'rgba(var(--surf-rgb),0.8)', backdropFilter: 'blur(8px)', color: 'var(--gold)', fontSize: 15,
        cursor: 'pointer', opacity: 0, pointerEvents: 'none',
        transition: 'opacity .4s ease, transform .4s ease, background .3s ease',
      }}
    >
      &#8593;
    </button>
  );
}
