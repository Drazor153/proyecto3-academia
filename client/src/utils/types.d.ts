import { QuizData } from "../pages/Grades/quizesReducer";

export type Data<T> = {
  data: T;
}

export type Level = {
  year: number;
  semesters: {
    semester: number;
    levels: {
      code: string;
      level: string;
      lessons: {
        id: number;
        lesson: string;
      }[];
    }[];
  }[];
}

export type LevelInfo = {
  levelCode: string;
  levelName: string
}

export type Student = {
  run: number | string;
  dv?: string;
  name: string;
  first_surname: string;
  level: string;
}

export type Students = Omit<Student, "level">;

export type Grade = {
  id: number;
  name: string;
  date: Date;
  classGroupId: number;
  Results: {
    examId: number;
    studentId: number;
    grade: number;
  }[];
  classgroup: {
    teacherId: number;
    group: { letter: string; topic: string };
  };
}

export type User = {
  run: number,
  dv: string,
  name: string,
  first_surname: string,
  email: string | null,
  role: string,
  status: string
}

export type GenericExam = {
  quizNumber: number;
  studentGrade: number;
  quizId: number;
}

export type Exams = {
  topic: string;
  quizzes: GenericExam[]
}

export type Quiz = {
  run: number,
  name: string,
  first_surname: string,
  grade: number,
  dv: string
}

export type GradesMutator = {
  quizId: number;
  grades: QuizData[];
}

type Class = {
  id: number;
  week: number;
  contents: string;
}

export type ClassesStudent = {
  teacher: {
    name: string;
    first_surname: string;
  };
  attendance: boolean;
} & Class;

export type ClassesTeacher = {
  attendance: (Students & { run: number, attended: boolean })[];
} & Class;

export type PostClass = {
  lessonId: number;
  week: number;
  contents: string;
  attendance: {
    studentRun: number;
    attended: boolean;
  }[];
}