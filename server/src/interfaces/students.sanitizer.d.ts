export interface StudentLevelRaw {
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
}
export interface StudentLevelSanitized {
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

export interface StudentGradesRaw {
  id: number;
  number: number;
  year: number;
  semester: number;
  topicId: number;
  levelCode: string;
  gives: {
    grade: number;
  }[];
  topic: {
    id: number;
    name: string;
  };
}

export interface StudentGradesSanitized {
  topic: string;
  quizzes: {
    quizNumber: number;
    studentGrade: number;
  }[];
}

export interface StudentCareerRaw {
  run: number;
  dv: string;
  name: string;
  first_surname: string;
  enrols: {
    level: {
      name: string;
    };
    paid: boolean;
    status: string;
    levelCode: string;
    year: number;
    semester: number;
  }[];
}

export interface StudentCareerSanitized {
  year: number;
  semesters: {
    semester: number;
    paid: boolean;
  }[];
  level: string;
  status: string;
}
