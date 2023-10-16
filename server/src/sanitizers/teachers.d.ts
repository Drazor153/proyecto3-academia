export type TeacherLevelsRaw = {
  teacherRun: number | null;
  levelCode: string;
  id: number;
  year: number;
  semester: number;
  lesson: string;
  level: {
    code: string;
    name: string;
  };
};

export type TeacherLevelsSanitizied = {
  year: number;
  semesters: {
    semester: number;
    levels: {
      level: string;
      code: string;
      lessons: {
        id: number;
        lesson: string;
      }[];
    }[];
  }[];
};

export type Topic = {
  id: number;
  name: string;
};
export type TopicQuizRaw = {
  id: number;
  number: number;
  year: number;
  semester: number;
  topicId: number;
  levelCode: string;
  topic: {
    id: number;
    name: string;
  };
};

export type TopicQuizSanitizied = {
  topic: string;
  quizzes: {
    quizNumber: number;
    quizId: number;
  }[];
};
