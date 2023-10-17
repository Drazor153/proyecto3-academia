import { Topic } from '@prisma/client';
import {
  StudentGradesRaw,
  StudentGradesSanitized,
  StudentLevelRaw,
  StudentLevelSanitized,
} from './students';

export const sanitizeStudentLevels = (
  input: StudentLevelRaw[],
): StudentLevelSanitized[] => {
  const dataArray: StudentLevelSanitized[] = [];

  input.forEach((val) => {
    const yearExists = dataArray.find((year) => year.year === val.year);
    if (!yearExists) {
      dataArray.push({
        year: val.year,
        semesters: [
          {
            semester: val.semester,
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
      (semester) => semester.semester === val.semester,
    );
    if (!semesterExists) {
      yearExists.semesters.push({
        semester: val.semester,
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
      (level) => level.code === val.level.code,
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
  input: StudentGradesRaw[],
): StudentGradesSanitized[] => {
  const dataArray: StudentGradesSanitized[] = topics.map((topic) => ({
    topic: topic.name,
    quizzes: [],
  }));

  input.forEach((val) => {
    const topicExists = dataArray.find(
      (topic) => topic.topic === val.topic.name,
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
      (quiz) => quiz.quizNumber === val.number,
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
