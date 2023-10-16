export type StudentLevelRaw = {
  levelCode: string;
  studentRun: number;
  status: string;
  year: number;
  semester: number;
  level: {
    code: string;
    name: string;
    teaches: {
      teacherRun: number | null;
      levelCode: string;
      id: number;
      year: number;
      semester: number;
      lesson: string;
    }[];
  };
};
export type StudentLevelSanitized = {
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

export type StudentGradesRaw = {
  gives: {
    grade: number;
  }[];
  topic: {
    id: number;
    name: string;
  };
} & {
  id: number;
  number: number;
  year: number;
  semester: number;
  topicId: number;
  levelCode: string;
};

export type StudentGradesSanitized = {
  topic: string;
  quizzes: {
    quizNumber: number;
    studentGrade: number;
  }[];
};
