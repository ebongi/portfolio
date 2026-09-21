// Milestones for the /timeline page, oldest first. Each entry needs a year, a
// title and a short body. Optional extras: `image` (a single path under public/,
// e.g. '/assets/timeline/2019-first-app.jpg', or an array of paths for more than
// one — an array auto-plays as a crossfading slideshow instead of a single
// photo), `tags` (array of short strings shown as pills, e.g. ['React', 'Node'])
// and `link` ({ href, label } shown as an arrow link under the description).
// Add an entry whenever there's a new chapter worth marking.
//
// Template — copy this shape for a new entry:
// {
//   year: '2023',
//   title: 'Shipped the first GoStudy beta',
//   body: 'One sentence or two on what happened and why it mattered.',
//   tags: ['Flutter', 'Firebase'],                              // optional
//   link: { href: 'https://example.com', label: 'example.com' }, // optional
//   image: '/assets/timeline/2023-gostudy-beta.jpg',             // optional — string, array, or omit entirely
// },
export const TIMELINE = [
  {
    year: '2023',
    title: 'Passed the GCE Advaced Level',
    body: 'I just passed my GCE A Levels i was really happy cause all my hardwork had given me something worth the struggle. This was my first taste of what we call success, the next step was to further my studies at the university, obviosly studying computer science and to fulfill my dieing dream of becoming a polymath. The journey was nothing like i had envisioned but i played it cool 😁',
    tags: ['GCE O Levels', 'GCE A Levels'],
    image: '/assets/timeline/me_after_a_levels.jpg',
  },
  {
    year: '2024',
    title: 'First year at the University of buea',
    body: 'Few months after registration at the university of buea, being a shy person matbe consdered an introvert, so i had some difficulties but as you can tell from that my facial expression i was not giving up anytime soonsss',
    tags: ['Computer Science', 'UBCOMSA'],
    image: ['/assets/timeline/first_year.jpg', '/assets/timeline/first_year2.jpg'],
  },
  {
    year: '2024',
    title: 'First Internship at Tech Chantier, Buea',
    body: 'Landed my first real internship at Tech Chantier, a software consulting studio built right here in Buea. Suddenly the things I was learning in lecture halls had to work in front of actual clients — a fast, humbling introduction to shipping software instead of just studying it.',
    tags: ['Internship', 'Software Engineering'],
    image: '/assets/timeline/tech-chantier-internship.jpg',
  },
  {
    year: '2025',
    title: 'In the Room at Google Developer Group Buea',
    body: 'Spent time with GDG on Campus at the University of Buea, one of the most active developer communities on campus. The kind of room where you leave with three new ideas, a longer to-learn list, and someone else’s GitHub handle.',
    tags: ['GDG Buea', 'Community'],
    image: '/assets/timeline/gdg-buea.jpg',
  },
  {
    year: '2026',
    title: 'A Seat at the Table with UNDP',
    body: 'Took part in a UNDP-linked conversation on technology and development in Cameroon — a reminder that the code we write eventually has to answer questions bigger than whether it compiles.',
    tags: ['UNDP'],
    image: '/assets/timeline/undp-event.jpg',
  },
  {
    year: '2026',
    title: 'Inside Silicon Mountain — SW Buea Digital Innovation Hub',
    body: 'Spent an afternoon at the Digital Innovation Hub in Buea’s own Silicon Mountain, the stretch of the city that has quietly become one of Cameroon’s most active tech ecosystems. Good company, better conversations about what everyone was building.',
    tags: ['Silicon Mountain', 'Innovation Hub'],
    image: '/assets/timeline/silicon-mountain-hub.jpg',
  },
  {
    year: '2026',
    title: 'Second Year at the University of Buea',
    body: 'Further into the Computer Science program now, with the shyness from year one mostly — mostly — worn off. More group projects, more all-nighters, more proof that this is exactly the path I wanted.',
    tags: ['Computer Science', 'UBCOMSA'],
    image: ['/assets/timeline/second-year-1.jpg', '/assets/timeline/second-year-2.jpg'],
  },
  {
    year: '2026',
    title: 'PyCon Cameroon 2026 & the First UbuCon Cameroon',
    body: 'Cameroon’s first-ever PyCon, held in September 2026 — and for the first time, co-located with a brand new UbuCon Cameroon track bringing the Ubuntu and open-source community into the same room as the Python one. Talks, workshops, and a lot of new faces from across Central Africa’s developer scene.',
    tags: ['PyCon Cameroon', 'UbuCon', 'Open Source'],
    image: [
      '/assets/timeline/pycon-cameroon-1.jpg',
      '/assets/timeline/pycon-cameroon-2.png',
      '/assets/timeline/pycon-cameroon-3.png',
    ],
  },
];
