export type QuizPost = {
  quizId: number;
  grades: {
    run: number;
    grade: number;
  }[];
};

export type OriginalData = {
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

export type TransformedData = {
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
  }[]
};

export type LessonClassesRaw = {
  attendance: ({
      student: {
          run: number;
          name: string;
          dv: string;
          first_surname: string;
      };
  } & {
      classId: number;
      studentRun: number;
      attended: boolean;
  })[];
} & {
  id: number;
  week: number;
  contents: string;
  lessonId: number;
}

export type LessonClassesSanitized = {
  id: number;
  week: number;
  contents: string;
  attendance: {
    studentRun: number;
    dv: string;
    name: string;
    first_surname: string;
    attended: boolean;
  }[];
}

export type PostClass = {
  lessonId: number;
  week: number;
  contents: string;
  attendance: {
    studentRun: number;
    attended: boolean;
  }[];
}