import { useEffect } from 'react';

// Fade/slide each .reveal element within rootRef in once it enters the viewport.
export function useReveal(rootRef) {
  useEffect(() => {
    const nodes = Array.from(rootRef.current.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    nodes.forEach((n, i) => {
      n.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      io.observe(n);
    });
    const t = setTimeout(() => {
      nodes.forEach((n) => {
        if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add('in');
      });
    }, 60);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [rootRef]);
}
