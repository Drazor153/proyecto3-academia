export interface StudentLevelRaw {
  level: {
    teaches: {
      id: number;
      periodId: number;
      levelCode: string;
      lesson: string;
    }[];
  } & {
    code: string;
    name: string;
  };
  period: {
    year: number;
    semester: number;
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
  number: number;
  topic: {
    id: number;
    name: string;
  };
  gives: {
    grade: number;
  }[];
}

export interface StudentGradesSanitized {
  topic: string;
  quizzes: {
    quizNumber: number;
    studentGrade: number;
  }[];
}

export interface StudentCareerRaw {
  enrols: {
    levelCode: string;
    level: {
      name: string;
    };
    period: {
      year: number;
      semester: number;
    };
    status: string;
    paid: boolean;
  }[];
  run: number;
  dv: string;
  name: string;
  first_surname: string;
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
