export interface TeacherLevelsRaw {
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
}

export interface TeacherLevelsSanitizied {
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
}

export interface TopicQuizRaw {
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
}

export interface TopicQuizSanitizied {
  topic: string;
  quizzes: {
    quizNumber: number;
    quizId: number;
  }[];
}
