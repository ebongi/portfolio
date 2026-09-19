import { useEffect, useRef } from 'react';

// Nav shrink-on-scroll, hero parallax and back-to-top visibility, all driven off
// one scroll listener. Pass heroBgRef only on pages that have a parallax hero.
export function useScrollChrome(heroBgRef) {
  const navRef = useRef(null);
  const toTopRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || 0;
      if (navRef.current) {
        const on = y > 40;
        navRef.current.style.background = on ? 'rgba(12,13,16,0.82)' : 'transparent';
        navRef.current.style.borderBottomColor = on ? 'rgba(212,175,55,0.2)' : 'transparent';
        navRef.current.style.backdropFilter = on ? 'blur(12px)' : 'none';
        navRef.current.style.paddingTop = on ? '14px' : '20px';
        navRef.current.style.paddingBottom = on ? '14px' : '20px';
      }
      if (heroBgRef?.current) {
        heroBgRef.current.style.transform = `translate3d(0,${y * 0.22}px,0)`;
      }
      if (toTopRef.current) {
        const show = y > 600;
        toTopRef.current.style.opacity = show ? '1' : '0';
        toTopRef.current.style.pointerEvents = show ? 'auto' : 'none';
        toTopRef.current.style.transform = show ? 'none' : 'translateY(10px)';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroBgRef]);

  return { navRef, toTopRef };
}
