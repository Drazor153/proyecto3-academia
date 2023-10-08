import { StudentLevelRaw, StudentLevelSanitized } from '../types/students';

export const sanitizeStudentLevels = (
  input: StudentLevelRaw[]
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
                  lesson: lesson.lesson
                }))
              }
            ]
          }
        ]
      });
      return;
    }
    const semesterExists = yearExists.semesters.find(
      (semester) => semester.semester === val.semester
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
              lesson: lesson.lesson
            }))
          }
        ]
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
          lesson: lesson.lesson
        }))
      });
      return;
    }
  });

  return dataArray;
};
