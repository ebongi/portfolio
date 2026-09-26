import { useEffect, useState } from 'react';

function getInitialTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Applies the visitor's theme as `data-theme` on <html> and persists it, so every
// page that mounts this hook stays in sync through the same localStorage key. The
// inline script in index.html sets the same attribute before React mounts, so
// there's no flash of the wrong theme on load.
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}
