// Milestones for the /timeline page, oldest first. Each entry needs a year, a
// title and a short body. Optional extras: `image` (a single path under public/,
// e.g. '/assets/timeline/2019-first-app.jpg', or an array of paths for more than
// one — shown as a grid alongside the text), `tags` (array of short strings shown
// as pills, e.g. ['React', 'Node']) and `link` ({ href, label } shown as an
// arrow link under the description). Add an entry whenever there's a new chapter
// worth marking.
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
    body: 'I just passed my GCE A Levels i was really happy cause all my hardwork paid of',
    image: '/assets/timeline/me_after_a_levels.jpg',
  },
];
