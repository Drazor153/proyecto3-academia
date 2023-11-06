export const levels = [
  {
    code: 'A1',
    name: 'beginner',
  },
  {
    code: 'A2',
    name: 'elementary',
  },
  {
    code: 'B1',
    name: 'intermediate',
  },
  {
    code: 'B2',
    name: 'upper_intermediate',
  },
  {
    code: 'C1',
    name: 'advanced',
  },
  {
    code: 'C2',
    name: 'proficiency',
  },
];

export const topics = [
  {
    name: 'grammar',
  },
  {
    name: 'listening',
  },
  {
    name: 'speaking',
  },
  {
    name: 'writing',
  },
];

export const lessons = ['A', 'B', 'C'];
export const lessonRecords: {
  levelCode: string;
  year: number;
  semester: number;
  lesson: string;
}[] = [];

const year = 2023;
const semester = 1;
levels.forEach((level) => {
  lessons.forEach((lesson) => {
    lessonRecords.push({
      lesson,
      levelCode: level.code,
      year,
      semester,
    });
  });
});

export const targets = [
  { name: 'ALL' },
  ...levels.map((level) => ({ name: level.code })),
];

export const categories = [
  { name: 'classes' },
  { name: 'academy' },
  { name: 'events' },
  { name: 'info' },
];
