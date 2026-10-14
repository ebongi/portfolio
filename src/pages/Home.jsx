import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import Footer from '../components/Footer.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { useTheme } from '../hooks/useTheme.js';
import { SERVICES } from '../data/services.js';

const SKILLS = [
  { name: 'Flutter', note: 'Cross-platform UI, custom render pipelines, 60fps motion.' },
  { name: 'Dart', note: 'Sound null safety, isolates, streams and strong typing.' },
  { name: 'Native Android', note: 'Native Android in Java & Kotlin — platform channels and services.' },
  { name: 'Supabase', note: 'Postgres, row-level security, realtime subscriptions, edge functions.' },
  { name: 'Firebase', note: 'Auth, Firestore, Cloud Messaging and crash reporting.' },
  { name: 'SQLite', note: 'Local relational cache, migrations and offline-first queries.' },
  { name: 'Node.js', note: 'REST and realtime services, background jobs, clean service layers.' },
  { name: 'Git', note: 'Trunk-based flow, reviewed PRs, small legible commits.' },
];

const PROCESS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'Understand the problem, the users and the constraints before writing a line of code — requirements, stakeholder conversations and technical feasibility.',
  },
  {
    num: '02',
    title: 'Planning',
    body: 'Turn requirements into a roadmap — architecture decisions, tech stack choices, and milestones against a realistic timeline.',
  },
  {
    num: '03',
    title: 'Design',
    body: 'Wireframes, data models and system architecture — the shape of the software gets decided before a single screen is built.',
  },
  {
    num: '04',
    title: 'Prototyping',
    body: 'Clickable flows or throwaway builds that test the riskiest assumptions early, before real development time is spent on them.',
  },
  {
    num: '05',
    title: 'Development',
    body: 'Iterative, tested builds in short cycles, with visible progress and a working milestone the client can see at every step.',
  },
  {
    num: '06',
    title: 'Testing & QA',
    body: 'Manual and automated coverage across edge cases, performance and real devices, before anything reaches a real user.',
  },
  {
    num: '07',
    title: 'Deployment',
    body: 'Store submissions, CI/CD pipelines and staged rollouts — shipping in a way that stays reversible if something goes wrong.',
  },
  {
    num: '08',
    title: 'Documentation & Handoff',
    body: 'Architecture notes, setup guides and inline comments that let another engineer — or future me — pick the project up cold.',
  },
  {
    num: '09',
    title: 'Support & Iteration',
    body: 'Monitoring, bug triage and new features once real users are on the product — the work doesn’t stop at launch.',
  },
];

const WHY_ME = [
  {
    title: 'Ships end-to-end, solo',
    body: 'Sole engineer and designer on GoStudy, from the first architecture decision to a live Play Store listing — comfortable owning a product, not just a ticket.',
  },
  {
    title: 'Built for real-world conditions',
    body: 'Offline-first by discipline: GoStudy answers instantly on patchy campus wifi and shared devices, not just on a fast office connection.',
  },
  {
    title: 'Native or cross-platform, by need',
    body: 'Flutter and Dart for shared reach, native Java/Kotlin when a feature needs the platform directly — the tool follows the requirement, not the other way round.',
  },
  {
    title: 'At home in someone else’s codebase',
    body: 'Comfortable auditing undocumented legacy systems and shipping safe changes under real users, not just building from a blank repo.',
  },
  {
    title: 'Process without the overhead',
    body: 'Small legible commits, reviewed PRs and clear documentation — enough discipline to keep scope honest without slowing delivery down.',
  },
  {
    title: 'Still learning, on purpose',
    body: 'Each project is a chance to retire an old assumption — reading source, rebuilding patterns by hand, and prototyping ideas before they reach production code.',
  },
];

const TECH_ICONS = [
  'Flutter', 'Dart', 'Kotlin', 'Java', 'Python', 'JavaScript', 'C', 'C++', 'Rust',
  'Android', 'Android Studio', 'Firebase', 'Supabase', 'Docker', 'Node.js', 'Next.js',
  'Django', 'FastAPI', 'Laravel', 'Google Cloud', 'Azure', 'Cloudflare Workers',
  'Git', 'GitHub', 'GitHub Actions', 'GitLab', 'NPM', 'Vite.js', 'Gradle', 'CMake',
  'Liquibase', 'Swagger', 'Postman', 'VS Code', 'PyCharm', 'JetBrains', 'Atom',
  'Anaconda', 'PyScript', 'PyTorch', 'TensorFlow', 'Matplotlib', 'OpenGL', 'Sass',
  'Material UI', 'UML', 'Linux', 'Ubuntu', 'Debian', 'GIMP', 'Oh My Zsh', 'Oracle',
  'Google', 'Apple', 'Slack', 'Stack Overflow', 'The Algorithms', 'Devicon',
].map((name) => ({
  name,
  src: `/assets/icons/${name.toLowerCase().replace('c++', 'cpp').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.svg`,
  // These ship as plain black silhouettes with no colour baked into the SVG, so we
  // tint them with a mask instead of rendering the (invisible-on-dark) source colour.
  tint: { Apple: '#D8D9DE', Flutter: '#29B6F6', Java: '#F58219', 'Next.js': '#EDEDED', Python: '#3776AB', Rust: '#CE6C3F' }[name] || null,
  desc: {
    Flutter: 'Cross-platform UI toolkit for native-quality apps.',
    Dart: 'Client-optimised language that powers Flutter.',
    Kotlin: 'Modern, concise language for native Android.',
    Java: 'JVM language for native Android services.',
    Python: 'General-purpose scripting for tooling and data work.',
    JavaScript: 'Core language of the web platform.',
    C: 'Low-level systems programming foundation.',
    'C++': 'Performance-critical systems and native modules.',
    Rust: 'Memory-safe systems programming, no garbage collector.',
    Android: 'Native mobile platform and SDK.',
    'Android Studio': 'Official IDE for native Android development.',
    Firebase: 'Auth, Firestore, messaging and crash reporting.',
    Supabase: 'Postgres, realtime and row-level security backend.',
    Docker: 'Containerised builds and reproducible environments.',
    'Node.js': 'JavaScript runtime for backend services.',
    'Next.js': 'React framework for server-rendered web apps.',
    Django: 'Batteries-included Python web framework.',
    FastAPI: 'High-performance Python API framework.',
    Laravel: 'Expressive PHP web application framework.',
    'Google Cloud': 'Cloud infrastructure and managed services.',
    Azure: "Microsoft's cloud platform and services.",
    'Cloudflare Workers': 'Edge compute for low-latency APIs.',
    Git: 'Distributed version control for every project.',
    GitHub: 'Code hosting, review and collaboration.',
    'GitHub Actions': 'CI/CD pipelines triggered on every push.',
    GitLab: 'Git hosting with built-in DevOps tooling.',
    NPM: 'Package registry and scripts for JavaScript.',
    'Vite.js': 'Fast dev server and build tool.',
    Gradle: 'Build automation for Android and the JVM.',
    CMake: 'Cross-platform build configuration for native code.',
    Liquibase: 'Versioned, auditable database schema migrations.',
    Swagger: 'OpenAPI documentation and API testing.',
    Postman: 'API design, testing and debugging.',
    'VS Code': 'Primary editor for day-to-day development.',
    PyCharm: 'Dedicated IDE for Python projects.',
    JetBrains: 'IDE suite for serious development work.',
    Atom: 'Hackable text editor for quick edits.',
    Anaconda: 'Python environment and package management for data work.',
    PyScript: 'Running Python directly in the browser.',
    PyTorch: 'Deep learning framework for model experiments.',
    TensorFlow: 'Machine learning framework for training and inference.',
    Matplotlib: 'Plotting and data visualisation in Python.',
    OpenGL: 'Low-level graphics rendering API.',
    Sass: 'CSS preprocessor for maintainable stylesheets.',
    'Material UI': 'React component library following Material Design.',
    UML: 'Diagramming notation for system design.',
    Linux: 'Daily-driver operating system for development.',
    Ubuntu: 'Linux distribution for servers and desktops.',
    Debian: 'Stable Linux base for production servers.',
    GIMP: 'Open-source image editing for assets and mockups.',
    'Oh My Zsh': 'Shell framework for a faster terminal workflow.',
    Oracle: 'Enterprise relational database systems.',
    Google: 'Search, Workspace and developer platforms.',
    Apple: 'iOS / macOS ecosystem and developer tools.',
    Slack: 'Team communication and project coordination.',
    'Stack Overflow': 'Community knowledge base for hard problems.',
    'The Algorithms': 'Open-source reference for algorithms and data structures.',
    Devicon: 'Icon set for technology and language logos.',
  }[name],
}));

export default function Home() {
  const rootRef = useRef(null);
  const heroBgRef = useRef(null);
  const { navRef, toTopRef } = useScrollChrome(heroBgRef);
  const { theme, toggleTheme } = useTheme();

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [openService, setOpenService] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formNote, setFormNote] = useState('');

  useReveal(rootRef);

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = `From: ${form.name} <${form.email}>\n\n${form.message}`;
    window.location.href =
      'mailto:sumeebong7@gmail.com?subject=' +
      encodeURIComponent(`Portfolio enquiry — ${form.name || 'no name'}`) +
      '&body=' +
      encodeURIComponent(body);
    setFormNote('Opening your mail client — or write direct to sumeebong7@gmail.com.');
  }

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      <SiteNav
        navRef={navRef}
        theme={theme}
        onToggleTheme={toggleTheme}
        links={[
          { to: '/', label: 'Home', dot: true },
          { href: '#about', label: 'The Craft' },
          { href: '#services', label: 'What I do' },
          { href: '#process', label: 'Process' },
          { href: '#why', label: 'Why Me' },
          { to: '/projects/gostudy', label: 'Flagship' },
          { to: '/projects', label: 'Projects' },
          { href: '#contact', label: 'Contact' },
        ]}
      />

      <header
        id="hero"
        style={{
          position: 'relative', minHeight: '100svh', display: 'grid', alignItems: 'center',
          padding: '140px clamp(20px,5vw,72px) 130px', isolation: 'isolate',
        }}
      >
        <div ref={heroBgRef} id="heroBg" style={{ position: 'absolute', inset: '-12% 0', zIndex: -2, willChange: 'transform', background: '#0C0D10' }}>
          <img
            id="heroImg"
            src="/assets/hero.png"
            alt=""
            style={{
              position: 'absolute', right: 0, top: 0, width: '52%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 6%',
              WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,#000 55%)',
              maskImage: 'linear-gradient(90deg,transparent 0%,#000 55%)',
            }}
          />
        </div>
        <div
          id="heroOverlay"
          style={{
            position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
            background:
              'linear-gradient(90deg,rgba(12,13,16,0.85) 0%,rgba(12,13,16,0.55) 55%,rgba(12,13,16,0.28) 100%),' +
              'linear-gradient(180deg,rgba(12,13,16,0.7),rgba(12,13,16,0.35) 45%,#0C0D10)',
          }}
        />
        <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
          <p className="kicker reveal" style={{ margin: '0 0 20px', color: 'var(--cream)' }}>Hi, I&apos;m Ebong Sume</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(42px,7.4vw,90px)', letterSpacing: '0.02em', marginBottom: 20, color: '#F7F6F0' }}>Software Developer</h1>
          <p className="reveal" style={{ maxWidth: 660, fontSize: 'clamp(17px,1.5vw,20px)', color: '#A0A5B5', margin: '0 0 32px', lineHeight: 1.6 }}>
            Transforming ideas into interactive and seamless digital experiences with cutting-edge frontend and mobile engineering.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, marginBottom: 36, alignItems: 'center' }}>
            <a href="https://github.com/ebongi" target="_blank" rel="noopener noreferrer" className="gbtn ghost" style={{ padding: '9px 18px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ebong-sume-%F0%9F%87%A8%F0%9F%87%B2-4b0816298" target="_blank" rel="noopener noreferrer" className="gbtn ghost" style={{ padding: '9px 18px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
            <a href="mailto:sumeebong7@gmail.com" className="gbtn ghost" style={{ padding: '9px 18px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Mail
            </a>
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/projects" className="gbtn">Explore My Work</Link>
            <Link to="/projects/gostudy" className="gbtn ghost">View GoStudy Flagship</Link>
          </div>
        </div>
        <div
          id="scrollcue"
          className="mono"
          style={{
            position: 'absolute', left: '50%', bottom: 34, transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A0A5B5',
          }}
        >
          Scroll
          <span style={{ width: 1, height: 46, background: 'linear-gradient(180deg,#D4AF37,rgba(212,175,55,0))' }} />
        </div>
      </header>

      <section
        id="about"
        style={{ position: 'relative', padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px)', background: 'linear-gradient(180deg,var(--ink),var(--ink-2))' }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="chapterhead reveal" style={{ marginBottom: 18 }}>
            <span className="numeral">II</span>
            <h2 style={{ fontSize: 'clamp(30px,4.2vw,54px)' }}>The Craft &amp; Philosophy</h2>
          </div>
          <hr className="rule reveal" style={{ margin: '0 0 clamp(48px,6vw,84px)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(36px,5vw,80px)', alignItems: 'start' }}>
            <figure
              className="reveal"
              style={{ margin: 0, position: 'relative', padding: 22, background: 'linear-gradient(145deg,rgba(var(--surf-rgb),0.95),rgba(var(--ink-rgb),0.9))', border: '1px solid var(--line)' }}
            >
              <div className="plate" style={{ aspectRatio: '4/5' }}>
                <img src="/assets/headshot.png" alt="Ebong Sume portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <figcaption
                className="mono"
                style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 18, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                <span>Plate II</span>
                <span style={{ color: 'var(--bronze)' }}>Engineer at work</span>
              </figcaption>
            </figure>
            <div style={{ minWidth: 0 }}>
              <p className="reveal" style={{ fontSize: 'clamp(19px,2vw,24px)', fontStyle: 'italic', color: 'var(--cream)', marginBottom: 28 }}>
                I build software the way classical architects built rooms: a load-bearing structure first, ornament only
                where it earns its place.
              </p>
              <p className="reveal" style={{ color: 'var(--silver)' }}>
                My work centres on cross-platform mobile engineering — Flutter and Dart on the client, with data layers
                designed before a single screen is drawn. Clean architecture, dependency inversion and a strict
                separation between UI, domain and data keep features cheap to add and safe to change.
              </p>
              <p className="reveal" style={{ color: 'var(--silver)' }}>
                Offline-first is a discipline, not a feature: local SQLite caches, deterministic sync and graceful
                degradation mean the app answers instantly whether or not the network does. Everything ships behind
                tests, code review and small, legible commits.
              </p>
              <p className="reveal" style={{ color: 'var(--silver)', marginBottom: 38 }}>
                Continuous learning is part of the practice — each release retires something I used to believe. I read
                source, rebuild patterns by hand, and keep a standing habit of shipping small tools to test ideas
                before they reach production.
              </p>
              <p className="kicker reveal" style={{ marginBottom: 18 }}>Technical Proficiency</p>
              <div id="pills" className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {SKILLS.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    className="pill"
                    aria-pressed={selectedSkill === skill.name}
                    onClick={() => setSelectedSkill((prev) => (prev === skill.name ? null : skill.name))}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
              <p id="pillNote" className="mono reveal" style={{ minHeight: '1.7em', margin: '18px 0 0', color: 'var(--bronze)' }}>
                {selectedSkill ? SKILLS.find((s) => s.name === selectedSkill)?.note : 'Select a discipline to read the detail.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="stack"
        style={{ position: 'relative', padding: 'clamp(48px,6vw,72px) 0', background: 'var(--ink-2)', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', overflow: 'hidden' }}
      >
        <p className="kicker reveal" style={{ textAlign: 'center', margin: '0 0 clamp(28px,4vw,44px)' }}>Tools &amp; Technologies</p>
        <div className="marquee">
          <div className="marqueeTrack">
            {[...TECH_ICONS, ...TECH_ICONS].map((tech, i) => (
              <div className="marqueeItem" key={`${tech.name}-${i}`}>
                {tech.tint ? (
                  <span
                    className="marqueeIcon"
                    role="img"
                    aria-label={tech.name}
                    style={{
                      backgroundColor: tech.tint,
                      WebkitMaskImage: `url(${tech.src})`,
                      maskImage: `url(${tech.src})`,
                    }}
                  />
                ) : (
                  <img className="marqueeIcon" src={tech.src} alt={tech.name} loading="lazy" />
                )}
                <span className="marqueeLabel mono">{tech.name}</span>
                <span className="marqueeTip mono" role="tooltip">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        style={{ position: 'relative', padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px)', background: 'var(--ink-2)' }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,4.2vw,50px)', marginBottom: 36, color: '#F7F6F0' }}>What I do?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SERVICES.map((item) => {
              const isOpen = openService === item.slug;
              return (
                <div
                  key={item.slug}
                  className="card reveal"
                  style={{
                    padding: '24px 28px',
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--gold)' : 'var(--line)',
                    background: isOpen ? 'rgba(212,175,55,0.03)' : 'var(--surf)',
                    transition: 'all 0.25s ease',
                  }}
                  onClick={() => setOpenService(isOpen ? null : item.slug)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span className="mono" style={{ color: 'var(--gold)', fontSize: 14 }}>{item.num}</span>
                      <h4 style={{ fontSize: 20, margin: 0, color: 'var(--cream)' }}>{item.title}</h4>
                    </div>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--gold)' }}>
                      &#9662;
                    </span>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--line-soft)' }}>
                      <p style={{ color: 'var(--silver)', margin: '0 0 16px', lineHeight: 1.7 }}>{item.body}</p>
                      <p className="mono" style={{ color: 'var(--silver)', margin: '0 0 16px', fontSize: 13, lineHeight: 1.6 }}>{item.overview}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                        {item.tools.map((t) => (
                          <span className="chip" key={t}>{t}</span>
                        ))}
                      </div>
                      <Link to={`/services/${item.slug}`} className="gbtn ghost" style={{ padding: '8px 16px', fontSize: 11 }} onClick={(e) => e.stopPropagation()}>
                        Read Full Detail &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="process"
        style={{ position: 'relative', padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px)', background: 'var(--ink-2)', borderTop: '1px solid var(--line-soft)' }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="chapterhead reveal" style={{ marginBottom: 18 }}>
            <span className="numeral">IV</span>
            <h2 style={{ fontSize: 'clamp(30px,4.2vw,54px)' }}>Development Process</h2>
          </div>
          <hr className="rule reveal" style={{ margin: '0 0 clamp(44px,5vw,70px)' }} />
          <p className="reveal" style={{ maxWidth: 720, color: 'var(--silver)', fontSize: 'clamp(17px,1.4vw,19px)', margin: '0 0 clamp(48px,6vw,80px)' }}>
            The same six stages, every project — enough structure to keep scope honest, light enough to stay fast.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            {PROCESS.map((step) => (
              <div className="card reveal" key={step.num}>
                <p className="numeral" style={{ margin: '0 0 14px' }}>{step.num}</p>
                <h4 style={{ fontSize: 19, marginBottom: 10 }}>{step.title}</h4>
                <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why"
        style={{ position: 'relative', padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px)', background: 'var(--ink-2)', borderTop: '1px solid var(--line-soft)' }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="chapterhead reveal" style={{ marginBottom: 18 }}>
            <span className="numeral">V</span>
            <h2 style={{ fontSize: 'clamp(30px,4.2vw,54px)' }}>Why Work With Me</h2>
          </div>
          <hr className="rule reveal" style={{ margin: '0 0 clamp(44px,5vw,70px)' }} />
          <p className="reveal" style={{ maxWidth: 720, color: 'var(--silver)', fontSize: 'clamp(17px,1.4vw,19px)', margin: '0 0 clamp(48px,6vw,80px)' }}>
            What a team actually gets, beyond the tech stack.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {WHY_ME.map((item) => (
              <div className="card reveal" key={item.title} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span style={{ flex: 'none', width: 9, height: 9, marginTop: 9, border: '1px solid var(--gold)', transform: 'rotate(45deg)' }} />
                <div>
                  <h4 style={{ fontSize: 20, marginBottom: 8 }}>{item.title}</h4>
                  <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px) 70px', background: 'linear-gradient(180deg,var(--ink-2),var(--ink))' }}>
        <div
          className="reveal"
          style={{
            maxWidth: 780, margin: '0 auto', padding: 'clamp(32px,5vw,64px)', textAlign: 'center',
            border: '1px solid var(--line)', background: 'linear-gradient(180deg,rgba(var(--surf-rgb),0.8),rgba(var(--ink-rgb),0.8))', backdropFilter: 'blur(8px)',
          }}
        >
          <p className="kicker" style={{ margin: '0 0 20px' }}>Chapter VI — The Seal</p>
          <h2 style={{ fontSize: 'clamp(28px,3.8vw,46px)', marginBottom: 18 }}>Let&rsquo;s build something durable</h2>
          <p style={{ color: 'var(--silver)', maxWidth: 520, margin: '0 auto 40px' }}>
            Open to mobile engineering roles, contract work and collaborations where architecture matters as much as
            the interface.
          </p>
          <form id="contactForm" onSubmit={handleSubmit} style={{ display: 'grid', gap: 20, textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleFieldChange} />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleFieldChange} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea
                id="cf-msg"
                name="message"
                placeholder="A line about the project, the team and the timeline."
                value={form.message}
                onChange={handleFieldChange}
              />
            </div>
            <button type="submit" className="gbtn" style={{ justifyContent: 'center' }}>Send Correspondence</button>
            <p id="formNote" className="mono" style={{ margin: 0, minHeight: '1.5em', color: 'var(--bronze)' }}>{formNote}</p>
          </form>
          <hr className="rule" style={{ margin: '44px 0 26px', background: 'linear-gradient(90deg,rgba(212,175,55,0),var(--line),rgba(212,175,55,0))' }} />
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 28 }}>
            <a href="https://github.com/ebongi" target="_blank" rel="noopener noreferrer" className="mono" style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 11 }}>GitHub</a>
            <a href="https://www.linkedin.com/in/ebong-sume-%F0%9F%87%A8%F0%9F%87%B2-4b0816298" target="_blank" rel="noopener noreferrer" className="mono" style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 11 }}>LinkedIn</a>
            <a href="mailto:sumeebong7@gmail.com" className="mono" style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 11 }}>sumeebong7@gmail.com</a>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
