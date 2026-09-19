# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint (rules configured in `.oxlintrc.json`)

There is no test suite configured in this repository.

## Architecture

This is a React 19 + Vite portfolio site for Ebong Sume, a mobile/software engineer, using `react-router-dom` (`BrowserRouter`) for client-side routing. There is no state management library beyond `useState`/hooks.

- [src/main.jsx](src/main.jsx) — root mount, wraps `<App />` in `StrictMode` + `BrowserRouter`.
- [src/App.jsx](src/App.jsx) — route table only (`/` → Home, `/projects` → Projects, `*` → Home). Imports `App.css`.
- [src/pages/](src/pages/) — one file per route. Each page owns its full-page layout (nav, sections, footer) rendered from top-level data arrays and/or [src/data/projects.js](src/data/projects.js), following the existing pattern of a `const DATA = [...]` mapped into JSX. Page-local content (e.g. `Home.jsx`'s `SKILLS`/`TECH_ICONS`) stays in the page file; content needed by more than one page belongs in `src/data/`.
- [src/data/projects.js](src/data/projects.js) — the `PROJECTS` array: single source of truth for every project shown on the site (used by both the homepage's Flagship section and the `/projects` page). Add a new project by appending an entry here, not by duplicating content across pages.
- [src/components/](src/components/) — small pieces shared across pages (`SiteNav`, `BackToTop`). `SiteNav` takes a `links` array where each entry is either `{ to, label }` for an in-app route (`react-router-dom` `Link`) or `{ href, label }` for a same-page anchor / cross-route hash link (plain `<a>`, e.g. `/#contact` from a page other than Home).
- [src/hooks/](src/hooks/) — cross-page scroll behavior: `useReveal` (IntersectionObserver-driven fade/slide-in for `.reveal` elements) and `useScrollChrome` (nav shrink-on-scroll, optional hero parallax, back-to-top visibility — all off one scroll listener for performance).
- [src/App.css](src/App.css) — the site's real design system (theme tokens in `:root`: colors `--ink`/`--gold`/`--cream`/`--silver`, fonts `--display`/`--serif`/`--sans`) and reusable component classes (`.reveal`, `.card`, `.pill`, `.chip`, `.marquee`, `.gbtn`, `.projectCard`/`.projectThumb`). New UI should reuse these classes before adding new ones.
- [src/index.css](src/index.css) — leftover scaffold from a different ("Classical") design system template; defines its own `:root` tokens and a `.card`/`.plate` that App.css's later-loaded rules override. Treat App.css as authoritative for styling; avoid adding to index.css.
- `public/assets/` — static images (`hero.png`, `headshot.png`, GoStudy screenshots) and `public/assets/icons/` (tech-stack SVG logos referenced by filename in `Home.jsx`'s `TECH_ICONS`, e.g. `flutter.svg`). Icon filenames are derived from tech names via slugification (`name.toLowerCase().replace(...)`), so a new entry in `TECH_ICONS` requires an SVG at the matching slug path.

### Notable behavior

- Elements with the `reveal` class fade/slide in via `useReveal`'s `IntersectionObserver`; a fallback marks all nodes visible immediately if `IntersectionObserver` is unsupported.
- Some tech icons ship as black-only SVGs with no baked-in color; these are tinted via CSS mask (`tint` field in `TECH_ICONS`) instead of rendered directly.
- The contact form (Home page) has no backend — submitting it builds a `mailto:` link and redirects the browser, with a status message shown to the user afterward.
- No deployment config (e.g. Netlify/Vercel redirects) exists yet for the SPA. A static host must be configured to serve `index.html` for unknown paths (like `/projects`) on direct load/refresh, or those routes will 404 in production even though they work in dev and in `vite preview`.

## Linting

Run `npm run lint` before considering frontend changes complete. The oxlint config enables the `react` and `oxc` plugins with `react/rules-of-hooks` as an error and `react/only-export-components` as a warning.
