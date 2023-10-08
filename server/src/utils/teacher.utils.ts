import {
  OriginalData,
  TopicQuizRaw,
  TopicQuizSanitizied,
  TransformedData
} from '../types/teachers';

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
                level: val.level.name,
                code: val.level.code,
                lessons: [
                  {
                    id: val.id,
                    lesson: val.lesson
                  }
                ]
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
            lessons: [
              {
                id: val.id,
                lesson: val.lesson
              }
            ]
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
        lessons: [
          {
            id: val.id,
            lesson: val.lesson
          }
        ]
      });
      return;
    }
    levelExists.lessons.push({
      id: val.id,
      lesson: val.lesson
    });
  });

  return dataArray;
};

export const sanitizeTopicQuizzes = (
  input: TopicQuizRaw[]
): TopicQuizSanitizied[] => {
  const dataArray: TopicQuizSanitizied[] = [];

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
            quizId: val.id
          }
        ]
      });
      return;
    }
    topicExists.quizzes.push({
      quizNumber: val.number,
      quizId: val.id
    });
  });

  return dataArray;
};
