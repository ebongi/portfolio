import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav.jsx';
import BackToTop from '../components/BackToTop.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useScrollChrome } from '../hooks/useScrollChrome.js';
import { PROJECTS } from '../data/projects.js';

const gostudy = PROJECTS.find((p) => p.slug === 'gostudy');

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

  const [selectedSkill, setSelectedSkill] = useState(null);
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
        links={[
          { href: '#about', label: 'The Craft' },
          { href: '#flagship', label: 'Flagship' },
          { to: '/projects', label: 'Projects' },
          { to: '/timeline', label: 'Timeline' },
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
        <div ref={heroBgRef} id="heroBg" style={{ position: 'absolute', inset: '-12% 0', zIndex: -2, willChange: 'transform', background: 'var(--ink)' }}>
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
              'linear-gradient(180deg,rgba(12,13,16,0.7),rgba(12,13,16,0.35) 45%,var(--ink))',
          }}
        />
        <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
          <p className="kicker reveal" style={{ margin: '0 0 26px' }}>Chapter I — Introduction</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(42px,7.4vw,96px)', letterSpacing: '0.02em', marginBottom: 22 }}>Ebong Sume</h1>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30 }}>
            <span style={{ width: 56, height: 1, background: 'var(--gold)', flex: 'none' }} />
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(20px,2.6vw,30px)', color: 'var(--cream)' }}>
              Mobile Application &amp; Software Engineer
            </h2>
          </div>
          <p className="reveal" style={{ maxWidth: 660, fontSize: 'clamp(17px,1.5vw,20px)', color: 'var(--silver)', margin: '0 0 44px' }}>
            Building high-performance, cross-platform mobile apps with Flutter &amp; Dart, coupled with scalable database
            architectures and clean software systems.
          </p>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/projects" className="gbtn">Explore My Work</Link>
            <a href="#flagship" className="gbtn ghost">View GoStudy Flagship</a>
          </div>
        </div>
        <div
          id="scrollcue"
          className="mono"
          style={{
            position: 'absolute', left: '50%', bottom: 34, transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--silver)',
          }}
        >
          Scroll
          <span style={{ width: 1, height: 46, background: 'linear-gradient(180deg,var(--gold),rgba(212,175,55,0))' }} />
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
              style={{ margin: 0, position: 'relative', padding: 22, background: 'linear-gradient(145deg,rgba(26,28,35,0.95),rgba(12,13,16,0.9))', border: '1px solid var(--line)' }}
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

      <section id="flagship" style={{ padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px)', background: 'var(--ink-2)', borderTop: '1px solid var(--line-soft)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="chapterhead reveal" style={{ marginBottom: 18 }}>
            <span className="numeral">III</span>
            <h2 style={{ fontSize: 'clamp(30px,4.2vw,54px)' }}>Flagship Showcase — {gostudy.name}</h2>
          </div>
          <hr className="rule reveal" style={{ margin: '0 0 clamp(44px,5vw,70px)' }} />
          <div
            className="card reveal"
            style={{ padding: 'clamp(28px,4vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(28px,4vw,56px)', alignItems: 'start' }}
          >
            <div>
              <p className="kicker" style={{ margin: '0 0 14px' }}>Overview</p>
              <h3 style={{ fontSize: 'clamp(26px,3vw,38px)', marginBottom: 20 }}>{gostudy.tagline}</h3>
              <p style={{ color: 'var(--silver)', margin: 0 }}>{gostudy.overview}</p>
            </div>
            <dl style={{ margin: 0, display: 'grid', gap: 0, borderLeft: '1px solid var(--line)', paddingLeft: 'clamp(20px,3vw,36px)' }}>
              {[
                ['Role', gostudy.role],
                ['Platform', gostudy.platform],
                ['Architecture', gostudy.architecture],
                ['Status', gostudy.status],
              ].map(([term, value], i, arr) => (
                <div
                  key={term}
                  style={{
                    display: 'flex', justifyContent: 'space-between', gap: 20, padding: '14px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--line-soft)' : 'none',
                  }}
                >
                  <dt className="mono" style={{ letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 11 }}>{term}</dt>
                  <dd style={{ margin: 0, textAlign: 'right' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Architecture &amp; Tech Stack</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {gostudy.stack.map((item) => (
              <div className="card reveal" key={item.num}>
                <p className="numeral" style={{ margin: '0 0 14px' }}>{item.num}</p>
                <h4 style={{ fontSize: 21, marginBottom: 10 }}>{item.title}</h4>
                <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Key Features</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {gostudy.features.map((item) => (
              <div className="card reveal" key={item.title} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span style={{ flex: 'none', width: 9, height: 9, marginTop: 9, border: '1px solid var(--gold)', transform: 'rotate(45deg)' }} />
                <div>
                  <h4 style={{ fontSize: 20, marginBottom: 8 }}>{item.title}</h4>
                  <p className="mono" style={{ margin: 0, lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="kicker reveal" style={{ margin: 'clamp(56px,7vw,90px) 0 26px' }}>Inside the App</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 'clamp(20px,3vw,44px)', maxWidth: 900 }}>
            {gostudy.screens.map((screen) => (
              <figure className="reveal" style={{ margin: 0 }} key={screen.src}>
                <div className="phone">
                  <div className="screen">
                    <img src={screen.src} alt={screen.alt} />
                  </div>
                </div>
                <figcaption className="mono" style={{ marginTop: 16, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 11 }}>
                  {screen.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(40px,5vw,64px)' }}>
            <a href="#" className="gbtn">Launch App Demo</a>
            <a href={gostudy.links.source} target="_blank" rel="noopener noreferrer" className="gbtn ghost">Source Code / Docs</a>
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,72px) 70px', background: 'linear-gradient(180deg,var(--ink-2),var(--ink))' }}>
        <div
          className="reveal"
          style={{
            maxWidth: 780, margin: '0 auto', padding: 'clamp(32px,5vw,64px)', textAlign: 'center',
            border: '1px solid var(--line)', background: 'linear-gradient(180deg,rgba(26,28,35,0.8),rgba(12,13,16,0.8))', backdropFilter: 'blur(8px)',
          }}
        >
          <p className="kicker" style={{ margin: '0 0 20px' }}>Chapter IV — The Seal</p>
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
        <p className="mono" style={{ textAlign: 'center', margin: '56px 0 0', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--silver)' }}>
          © MMXXVI · Ebong Sume · Built with Flutter, Dart &amp; patience
        </p>
      </section>

      <BackToTop toTopRef={toTopRef} />
    </div>
  );
}
