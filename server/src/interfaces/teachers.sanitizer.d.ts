export interface TeacherLevelsRaw {
  lesson_teacher: {
    teacherRun: number;
  }[];
  levelCode: string;
  id: number;
  period: {
    year: number;
    semester: number;
  }
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
  topic: {
      id: number;
      name: string;
  };
  id: number;
  levelCode: string;
  periodId: number;
  number: number;
  topicId: number;
}

export interface TopicQuizSanitizied {
  topic: string;
  quizzes: {
    quizNumber: number;
    quizId: number;
  }[];
}
