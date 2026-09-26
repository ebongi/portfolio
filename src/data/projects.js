// Every project shown on the site — the /projects list and each project's dedicated
// /projects/:slug detail page both render off this list, so it's the single place
// to add a new project.
export const PROJECTS = [
  {
    slug: 'gostudy',
    name: 'GoStudy',
    tagline: 'An all-in-one academic platform for university students',
    thumbnail: '/assets/gostudy-icon.svg',
    status: 'Live on Google Play',
    role: 'Sole engineer & designer',
    platform: 'Android & iOS — one Flutter codebase',
    architecture: 'Clean architecture, offline-first',
    overview:
      'GoStudy gathers everything a student needs into a single mobile companion: study tools, past exam ' +
      'resources and AI-assisted preparation. It is engineered for the realities of campus life — patchy ' +
      'connectivity, shared devices and the night before the paper — so every resource a student has opened ' +
      'once stays available offline, instantly. First deployed with University of Buea faculties and course ' +
      'catalogues.',
    stack: [
      { num: '01', title: 'Flutter Mobile Client', body: 'A single declarative codebase with a design-system widget layer, custom transitions and platform channels where native reach is required.' },
      { num: '02', title: 'Local SQLite Cache', body: 'Every fetched document, question bank and progress record is written locally with versioned migrations, so reads never wait on a request.' },
      { num: '03', title: 'Cloud Backends', body: 'Supabase and Firebase carry auth, storage, realtime updates and messaging; content distribution runs through signed, cacheable endpoints.' },
      { num: '04', title: 'Clean Architecture', body: 'UI, domain and data are separated by explicit contracts — repositories, use cases and immutable models — keeping features testable in isolation.' },
    ],
    features: [
      { title: 'Offline exam access', body: 'Past papers and question banks open with no connection at all, synced back when the network returns.' },
      { title: 'Course material distribution', body: 'Faculty-organised notes, slides and readings delivered per course, per semester, with lightweight updates.' },
      { title: 'Interactive study suites', body: 'Timed quizzes, flashcards and AI-assisted prep that adapt to what a student keeps getting wrong.' },
      { title: 'Fast response times', body: 'Cache-first reads and pre-warmed routes keep interactions under a perceptible threshold on low-end devices.' },
    ],
    screens: [
      { src: '/assets/gostudy-home.png', alt: 'GoStudy home dashboard', caption: 'Dashboard — streaks, schedule, next exam' },
      { src: '/assets/gostudy-courses.png', alt: 'GoStudy course catalogue', caption: 'Courses — materials, docs, past questions' },
      { src: '/assets/gostudy-ai.png', alt: 'GoStudy AI study assistant', caption: 'AI Assistant — explanations on demand' },
    ],
    tags: ['Flutter', 'Dart', 'Supabase', 'Firebase', 'SQLite'],
    links: {
      source: 'https://github.com/ebongi',
      playStore: 'https://play.google.com/store/apps/details?id=com.ebongsume.gostudy',
    },
  },
];
