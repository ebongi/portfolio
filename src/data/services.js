// Every service shown on the site — the Services & Capabilities grid on the homepage
// and each service's dedicated /services/:slug detail page both render off this list.
// The implementation steps are grounded in real-world engineering practice (Clean
// Architecture's dependency rule, the Strangler Fig pattern for legacy migration, the
// RAG pipeline for LLM integration, offline-first sync/conflict-resolution strategy,
// etc.) rather than generic filler — see the assistant's research citations for sources.
export const SERVICES = [
  {
    slug: 'native-android-development',
    num: '01',
    title: 'Native Android Development',
    body: 'Java & Kotlin, built straight against the platform SDK — background services, platform channels, sensors and camera work a cross-platform layer alone can’t reach.',
    overview:
      'When a feature needs the platform directly — a foreground service, a camera pipeline, a sensor, a background ' +
      'job that has to survive app death — I build it native rather than fight a cross-platform layer into doing ' +
      'something it was never designed for.',
    steps: [
      { title: 'Scope the platform requirement', body: 'Confirm native is actually the right call — a specific SDK capability a cross-platform layer can’t reach cleanly — before committing to it.' },
      { title: 'Plan the architecture first', body: 'State management (MVVM/MVI), dependency injection, navigation and offline requirements get decided before a single screen is built, since getting this wrong is what causes expensive rewrites later.' },
      { title: 'Build the UI in Jetpack Compose', body: 'Declarative, Kotlin-first screens instead of legacy XML layouts, matched to Material guidelines.' },
      { title: 'Wire up the platform layer', body: 'Coroutines and Flow for async work, WorkManager for background jobs, direct SDK access for camera, sensors and services.' },
      { title: 'Test on real, mid-tier hardware', body: 'A high-end device or a debug build hides the jank and memory pressure a 2-year-old phone with 3GB of RAM exposes immediately.' },
      { title: 'Ship and monitor', body: 'Play Store release, crash reporting and staged rollouts, not a one-shot deploy.' },
    ],
    tools: ['Kotlin', 'Java', 'Jetpack Compose', 'Android Studio', 'Coroutines', 'WorkManager'],
  },
  {
    slug: 'legacy-code-maintenance',
    num: '02',
    title: 'Legacy Code Maintenance',
    body: 'Comfortable inheriting someone else’s codebase — auditing undocumented systems, patching safely under real users, and modernizing without a risky full rewrite.',
    overview:
      'Most legacy systems don’t need a rewrite — they need a way to change safely while staying live for the users ' +
      'depending on them. I lean on the Strangler Fig approach: transform, coexist, eliminate, one thin slice at a ' +
      'time.',
    steps: [
      { title: 'Map the boundaries', body: 'Read the existing system end to end and mark the seams — the modules that can be replaced independently without touching everything else.' },
      { title: 'Slice thin', body: 'Break the work into small, independently shippable pieces — big enough to matter, small enough to not be risky.' },
      { title: 'Build alongside, not instead of', body: 'Write the replacement in parallel with the legacy code still running, so there’s always a working system to fall back to.' },
      { title: 'Route traffic through a seam', body: 'A proxy or feature flag decides, request by request, whether the old or new path handles it.' },
      { title: 'Redirect and verify', body: 'Move traffic to the new path a slice at a time, watching for regressions before the next slice moves.' },
      { title: 'Retire what’s no longer used', body: 'Delete legacy code only once nothing depends on it anymore — never before.' },
    ],
    tools: ['Git', 'Static Analysis', 'Strangler Fig Pattern', 'Regression Testing'],
  },
  {
    slug: 'ai-integration',
    num: '03',
    title: 'AI Integration',
    body: 'Wiring LLMs and ML models into production apps — on-device inference, API-backed assistants, and the data pipelines that keep them fed with fresh context.',
    overview:
      'AI features earn their place the same way any feature does: start with the simplest version that works, then ' +
      'add exactly as much retrieval and tooling as the problem actually needs — the approach behind GoStudy’s AI ' +
      'study assistant.',
    steps: [
      { title: 'Start with a direct model call', body: 'Prove the feature works with the simplest possible LLM call before adding any infrastructure around it.' },
      { title: 'Ground it in real data', body: 'Load the domain’s documents, chunk them with enough overlap to not lose context at the edges, and embed them into a vector store.' },
      { title: 'Retrieve before generating', body: 'Pull the chunks that are actually relevant to the question, using semantic similarity and hybrid keyword search where precision matters.' },
      { title: 'Add tools when the model needs to act', body: 'Function calling for anything beyond answering a question — scheduling, lookups, writes.' },
      { title: 'Test with feature flags', body: 'Roll new prompts, chunk sizes or models out to a small slice of users first, with instant rollback.' },
      { title: 'Watch cost and quality in production', body: 'Ongoing evaluation of responses and spend, not a one-time launch check.' },
    ],
    tools: ['LLM APIs', 'Vector Search', 'RAG', 'Prompt Engineering'],
  },
  {
    slug: 'saas-product-development',
    num: '04',
    title: 'SaaS Product Development',
    body: 'End-to-end SaaS builds — auth, multi-tenant data models, subscription-ready billing — taken from a blank repo to a live, paying user base.',
    overview:
      'A SaaS MVP fails or succeeds on the decisions made before the first feature is built — who it’s for, what ' +
      'ships first, and whether the data model can hold more than one tenant without a rewrite.',
    steps: [
      { title: 'Name the user and the problem', body: 'One sentence that says who this is for and what it fixes, before any design or code — it shapes every scoping decision after.' },
      { title: 'Scope with MoSCoW', body: 'Sort every feature into Must / Should / Could / Won’t, and build only the Must-haves for the first release.' },
      { title: 'Architect for multi-tenancy from day one', body: 'Retrofitting tenant isolation after users are already in a single-tenant database is the expensive mistake to avoid.' },
      { title: 'Wire up the boring-but-critical stuff early', body: 'Auth, billing, subscription renewals and failed-payment handling, before polishing any feature.' },
      { title: 'Build in full-stack sprints', body: 'Weekly demos against the roadmap, not a big-bang release at the end.' },
      { title: 'Ship, then watch one metric', body: 'Pick the number that proves the product’s value and let it drive the next iteration.' },
    ],
    tools: ['Auth', 'Billing', 'Multi-Tenant DB', 'CI/CD'],
  },
  {
    slug: 'cross-platform-mobile-engineering',
    num: '05',
    title: 'Cross-Platform Mobile Engineering',
    body: 'Flutter & Dart for a single codebase that ships identically on Android and iOS, without sacrificing native feel or performance.',
    overview:
      'GoStudy runs on Android and iOS from one Flutter codebase — the same declarative UI layer, the same business ' +
      'logic, dropping into native platform channels only where Flutter itself doesn’t reach.',
    steps: [
      { title: 'Set up once, target everywhere', body: 'One Flutter SDK, one project, Android and iOS (and web or desktop where it matters) from the same codebase.' },
      { title: 'Separate the layers', body: 'UI, business logic and data behind their own boundaries, with a state management approach sized to the app’s actual complexity.' },
      { title: 'Build platform-aware, not platform-blind', body: 'Drop into platform channels for anything Flutter doesn’t cover natively, rather than forcing a workaround.' },
      { title: 'Run it on every target during development', body: 'Real devices and emulators per platform, not just the one on the desk.' },
      { title: 'Integration-test the full workflow', body: 'The flows a user actually takes, not just widgets tested in isolation.' },
      { title: 'Publish to both stores from one pipeline', body: 'Play Store and App Store guidelines followed in parallel, not sequentially bolted on.' },
    ],
    tools: ['Flutter', 'Dart', 'Riverpod / BLoC', 'Platform Channels'],
  },
  {
    slug: 'backend-cloud-architecture',
    num: '06',
    title: 'Backend & Cloud Architecture',
    body: 'Supabase, Firebase and Node.js services designed for realtime data, offline-first sync, and horizontal scale as usage grows.',
    overview:
      'A backend gets designed for the load it will actually see — statelessness, caching and a queue in front of ' +
      'the expensive paths, instrumented from day one instead of after the first outage.',
    steps: [
      { title: 'Start from the requirement, not the trend', body: 'Evaluate actual scale, team skillset and budget before reaching for microservices by default.' },
      { title: 'Design for statelessness', body: 'Session and user state live externally (Redis, Postgres), so any instance can serve any request and horizontal scaling stays simple.' },
      { title: 'Put a cache and a queue in front of the expensive paths', body: 'Reduce redundant computation and decouple slow work from the request/response cycle.' },
      { title: 'Automate the pipeline', body: 'CI/CD from the first commit, not bolted on after the first outage.' },
      { title: 'Instrument before it’s needed', body: 'Latency, traffic, errors and saturation per service, so scaling decisions come from data, not guesswork.' },
      { title: 'Treat scaling as a loop', body: 'Observe, decide, act, verify, repeat — not a one-time capacity plan.' },
    ],
    tools: ['Node.js', 'Supabase', 'Firebase', 'Redis', 'CI/CD'],
  },
  {
    slug: 'database-design-offline-first',
    num: '07',
    title: 'Database Design & Offline-First Systems',
    body: 'Schemas and local caches engineered so the app answers instantly, online or not, with deterministic sync back to a single source of truth.',
    overview:
      'GoStudy is built offline-first by discipline, not as an afterthought — local storage answers every read, and ' +
      'the network is an input to that local data, never a dependency of it.',
    steps: [
      { title: 'Make local storage the source of truth', body: 'SQLite (or equivalent) holds the data the UI reads from directly; the network feeds it rather than gating it.' },
      { title: 'Pick a sync strategy on purpose', body: 'Push, pull, delta or batch — chosen for the data’s actual update pattern, not by default.' },
      { title: 'Design conflict resolution before it’s needed', body: 'Last-write-wins where it’s safe, field-level merge or user-assisted resolution where it isn’t.' },
      { title: 'Build optimistic UI', body: 'Changes appear instantly and roll back on failure, with an outbox pattern queuing writes for when connectivity returns.' },
      { title: 'Detect and surface network state', body: 'The UI reflects "pending sync," never a silent failure.' },
      { title: 'Test offline like it’s a real state', body: 'Flight mode, flaky wifi, and mid-sync app kills, all exercised before release — not treated as an edge case.' },
    ],
    tools: ['SQLite', 'Sync Engine', 'Conflict Resolution', 'Optimistic UI'],
  },
  {
    slug: 'code-review-team-collaboration',
    num: '08',
    title: 'Code Review & Team Collaboration',
    body: 'Trunk-based git flow, small legible commits and thorough PR review — the discipline that keeps a growing codebase safe for a team to change.',
    overview:
      'Review is a craft, not a formality: small changes, a repeatable read-through order, and feedback specific ' +
      'enough that the next commit fixes something real.',
    steps: [
      { title: 'Keep changes small', body: 'A pull request under roughly 400 lines gets reviewed faster and more carefully than one that isn’t.' },
      { title: 'Self-review first', body: 'Reading a diff before anyone else does catches the obvious issues and respects the reviewer’s time.' },
      { title: 'Follow a repeatable order', body: 'Context, readability, correctness, security, then feedback — so nothing gets skipped under time pressure.' },
      { title: 'Give specific, actionable feedback', body: 'Not "this is wrong," but what’s wrong and what to do about it.' },
      { title: 'Turn around reviews fast', body: 'Starting within a couple of hours keeps a branch from going stale and blocking someone else’s work.' },
      { title: 'Keep the checklist alive', body: 'When a real bug slips through review, that’s a signal to update what the team checks for, not just fix the bug.' },
    ],
    tools: ['Git', 'GitHub PRs', 'Trunk-Based Flow'],
  },
  {
    slug: 'clean-architecture',
    num: '09',
    title: 'Clean Architecture',
    body: 'Explicit boundaries between UI, domain and data — dependency inversion and testable business logic that outlives any one framework or vendor.',
    overview:
      'Domain, application, infrastructure, presentation — four layers with dependencies pointing in one direction ' +
      'only, so the business logic doesn’t know or care what database or UI framework sits around it.',
    steps: [
      { title: 'Draw the boundary first', body: 'Domain (business rules), application (use cases), infrastructure (databases, APIs, frameworks) and presentation (UI) — defined before any code exists in any of them.' },
      { title: 'Point every dependency inward', body: 'Outer layers depend on inner ones, never the reverse; the domain layer knows nothing about the database or the UI.' },
      { title: 'Define interfaces where business logic needs them', body: 'Implement those interfaces in infrastructure, so swapping a database or an API doesn’t touch a single use case.' },
      { title: 'Keep entities and use cases framework-free', body: 'No widget, no ORM annotation, no HTTP client leaks into the domain layer.' },
      { title: 'Apply it where it earns its keep', body: 'A long-lived, non-trivial system benefits; a throwaway prototype doesn’t need four layers.' },
      { title: 'Test the inside without the outside', body: 'Use cases and entities get unit-tested with no database, network or UI involved.' },
    ],
    tools: ['Dependency Inversion', 'Use Cases', 'Repositories'],
  },
  {
    slug: 'design-patterns',
    num: '10',
    title: 'Design Patterns',
    body: 'Repository, observer, factory, state — reached for deliberately when a problem actually calls for one, not layered on as decoration.',
    overview:
      'A pattern is a solution to a specific, recurring shape of problem — never a starting point. I reach for one ' +
      'once the same problem has shown up more than once, not before.',
    steps: [
      { title: 'Name the actual problem first', body: 'A pattern solves a specific, recurring shape of problem — not a starting point for a new feature.' },
      { title: 'Reach for the simplest fix before a pattern', body: 'If a straightforward function or class solves it, that’s the answer.' },
      { title: 'Prototype the pattern small', body: 'Build a focused version against the real problem before committing the whole codebase to it.' },
      { title: 'Check the fit, not just the vocabulary', body: 'If the code is bending to accommodate the pattern instead of the other way round, that’s the sign to step back.' },
      { title: 'Use it as shared vocabulary', body: 'A repository, an observer or a factory means the same thing to every engineer on the team — half the value is the shared language.' },
      { title: 'Refactor toward a pattern, don’t force it up front', body: 'The need usually reveals itself after the second or third time the same problem shows up.' },
    ],
    tools: ['Repository', 'Observer', 'Factory', 'State'],
  },
  {
    slug: 'api-design',
    num: '11',
    title: 'API Design',
    body: 'RESTful and realtime APIs shaped around the client that consumes them — versioned, predictable, and documented from the first endpoint.',
    overview:
      'An API is a contract before it’s an implementation — resource names, methods and versioning agreed on paper ' +
      'before a single route is written, so a client integrating today isn’t broken by a change next month.',
    steps: [
      { title: 'Design the contract before the implementation', body: 'Resource names, methods and shapes agreed (often in an OpenAPI spec) before a single route is written.' },
      { title: 'Version from day one', body: 'A URL-path version (/v1/…) from the first release, so breaking changes never surprise an existing client.' },
      { title: 'Keep changes additive by default', body: 'New endpoints and optional fields ship freely; renaming or removing anything is treated as a breaking change with its own migration path.' },
      { title: 'Standardize errors and pagination', body: 'One consistent shape across every endpoint, so a client only has to learn it once.' },
      { title: 'Document as you build, not after', body: 'The spec stays in sync with the code because it’s part of the same change.' },
      { title: 'Deprecate on a schedule', body: 'Old versions get a clear sunset date communicated well in advance, never pulled without warning.' },
    ],
    tools: ['REST', 'OpenAPI', 'Versioning', 'Postman'],
  },
  {
    slug: 'performance-optimization',
    num: '12',
    title: 'Performance Optimization',
    body: 'Profiling first — fixing the jank, memory leaks and slow queries that are actually measured, not just suspected.',
    overview:
      'Performance work starts with a profiler, not a hunch — measuring on the hardware and build type a real user ' +
      'actually has, then fixing what the numbers show instead of what seems slow.',
    steps: [
      { title: 'Profile on a mid-tier device, not the dev machine', body: 'A high-end phone hides the jank and memory pressure a 2-year-old device with 3GB of RAM exposes immediately.' },
      { title: 'Measure on a release build', body: 'Debug builds carry overhead that doesn’t reflect what a user actually experiences.' },
      { title: 'Chase the metrics that matter', body: 'Startup time and response time first, since they shape first impressions and daily-use friction.' },
      { title: 'Simulate bad networks on purpose', body: 'Throttle to 3G, add artificial latency, and confirm the app degrades gracefully instead of hanging.' },
      { title: 'Fix the biggest offenders', body: 'Lazy-load what isn’t needed immediately, cache what’s expensive to recompute, compress images, cut what’s unused.' },
      { title: 'Keep watching after release', body: 'Crash rate, CPU and battery drain monitored in production, not just checked once before shipping.' },
    ],
    tools: ['Profiling', 'Android Profiler', 'Caching'],
  },
];
