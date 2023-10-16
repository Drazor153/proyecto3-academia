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
