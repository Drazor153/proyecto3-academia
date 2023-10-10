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
        id: string;
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
  second_surname: string;
  level: string;
}

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
  rut: number;
  name: string;
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
  id?: number;
  week: number;
  contents: string;
  lesson: string;
  year?: number;
  semester?: number;
  level?: string;
  // topicName: string;
  // levelName: string;
}

export type ClassesStudent = {
  teacher: string;
  attendance: string;
} & Class;

export type ClassesTeacher = {
  attendees: string[];
  students: string[];
  // absent: string[];
} & Class;