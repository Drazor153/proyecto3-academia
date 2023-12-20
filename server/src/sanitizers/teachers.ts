import { Topic } from '@prisma/client';
import {
  TeacherLevelsRaw,
  TeacherLevelsSanitizied,
  TopicQuizRaw,
  TopicQuizSanitizied,
} from '@/interfaces/teachers.sanitizer';

export const sanitizeTeacherLevels = (input: TeacherLevelsRaw[]) => {
  const dataArray: TeacherLevelsSanitizied[] = [];

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
                lessons: [
                  {
                    id: val.id,
                    lesson: val.lesson,
                  },
                ],
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
            lessons: [
              {
                id: val.id,
                lesson: val.lesson,
              },
            ],
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
        lessons: [
          {
            id: val.id,
            lesson: val.lesson,
          },
        ],
      });
      return;
    }
    levelExists.lessons.push({
      id: val.id,
      lesson: val.lesson,
    });
  });

  return dataArray;
};
export const sanitizeTopicQuizzes = (
  topics: Topic[],
  input: TopicQuizRaw[]
) => {
  const dataArray: TopicQuizSanitizied[] = topics.map((val) => ({
    topic: val.name,
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
            quizId: val.id,
          },
        ],
      });
      return;
    }
    topicExists.quizzes.push({
      quizNumber: val.number,
      quizId: val.id,
    });
  });

  return dataArray;
};
