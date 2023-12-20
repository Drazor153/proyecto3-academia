import { Topic } from '@prisma/client';
import {
  StudentCareerRaw,
  StudentCareerSanitized,
  StudentGradesRaw,
  StudentGradesSanitized,
  StudentLevelRaw,
  StudentLevelSanitized,
} from '@/interfaces/students.sanitizer';

type Students = {
  run: number;
  name: string;
  dv: string;
  first_surname: string;
  enrols: {
    paid: boolean;
    levelCode: string;
  }[];
};

type Filters = {
  run: string;
  name: string;
  level: string;
  paidString: string;
};
export const filterStudents = (students: Students[], filters: Filters) => {
  const { run, name, level, paidString } = filters;

  const paid = paidString === 'true';
  return students.filter(
    (student) =>
      (!paidString || student.enrols[0].paid === paid) &&
      String(student.run).startsWith(run) &&
      student.enrols[0].levelCode.includes(level) &&
      student.name.toLowerCase().startsWith(name ? name.toLowerCase() : '')
  );
};

export const sanitizeStudentLevels = (input: StudentLevelRaw[]) => {
  const dataArray: StudentLevelSanitized[] = [];

  input.forEach((val) => {
    const yearExists = dataArray.find((year) => year.year === val.period.year);
    if (!yearExists) {
      dataArray.push({
        year: val.period.year,
        semesters: [
          {
            semester: val.period.semester,
            levels: [
              {
                level: val.level.name,
                code: val.level.code,
                lessons: val.level.teaches.map((lesson) => ({
                  id: lesson.id,
                  lesson: lesson.lesson,
                })),
              },
            ],
          },
        ],
      });
      return;
    }
    const semesterExists = yearExists.semesters.find(
      (semester) => semester.semester === val.period.semester
    );
    if (!semesterExists) {
      yearExists.semesters.push({
        semester: val.period.semester,
        levels: [
          {
            level: val.level.name,
            code: val.level.code,
            lessons: val.level.teaches.map((lesson) => ({
              id: lesson.id,
              lesson: lesson.lesson,
            })),
          },
        ],
      });
      return;
    }
    const levelExists = semesterExists.levels.find(
      (level) => level.code === val.level.code
    );
    if (!levelExists) {
      semesterExists.levels.push({
        level: val.level.name,
        code: val.level.code,
        lessons: val.level.teaches.map((lesson) => ({
          id: lesson.id,
          lesson: lesson.lesson,
        })),
      });
      return;
    }
  });

  return dataArray;
};
export const sanitizeStudentGrades = (
  topics: Topic[],
  input: StudentGradesRaw[]
) => {
  const dataArray: StudentGradesSanitized[] = topics.map((topic) => ({
    topic: topic.name,
    quizzes: [],
  }));

  input.forEach((val) => {
    const topicExists = dataArray.find(
      (topic) => topic.topic === val.topic.name
    );
    if (!topicExists) {
      dataArray.push({
        topic: val.topic.name,
        quizzes: [
          {
            quizNumber: val.number,
            studentGrade: val.gives[0]?.grade ?? 0,
          },
        ],
      });
      return;
    }
    const quizExists = topicExists.quizzes.find(
      (quiz) => quiz.quizNumber === val.number
    );
    if (!quizExists) {
      topicExists.quizzes.push({
        quizNumber: val.number,
        studentGrade: val.gives[0]?.grade ?? 0,
      });
      return;
    }
  });

  return dataArray;
};

export const sanitizeStudentCareer = (input: StudentCareerRaw) => {
  const newArray: StudentCareerSanitized[] = [];

  input.enrols.forEach((val) => {
    const yearExists = newArray.find((year) => year.year === val.period.year);
    if (!yearExists) {
      newArray.push({
        year: val.period.year,
        semesters: [{ semester: val.period.semester, paid: val.paid }],
        level: val.level.name,
        status: val.status,
      });
      return;
    }
    const semesterExists = yearExists.semesters.find(
      ({ semester }) => semester === val.period.semester
    );
    if (!semesterExists) {
      yearExists.semesters.push({
        semester: val.period.semester,
        paid: val.paid,
      });
      return;
    }
  });

  return newArray;
};
