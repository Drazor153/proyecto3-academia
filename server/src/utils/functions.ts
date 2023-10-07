import { OriginalData, TransformedData } from '../types/teachers';

export const transformarDatos = (input: OriginalData[]): TransformedData[] => {
  const dataArray: TransformedData[] = [];

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
                levelName: val.level.name,
                levelCode: val.level.code,
                lessons: [val.lesson]
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
            levelName: val.level.name,
            levelCode: val.level.code,
            lessons: [val.lesson]
          }
        ]
      });
      return;
    }
    const levelExists = semesterExists.levels.find(
      (level) => level.levelCode === val.level.code
    );
    if (!levelExists) {
      semesterExists.levels.push({
        levelName: val.level.name,
        levelCode: val.level.code,
        lessons: [val.lesson]
      });
      return;
    }
    levelExists.lessons.push(val.lesson);
  });

  return dataArray;
};
