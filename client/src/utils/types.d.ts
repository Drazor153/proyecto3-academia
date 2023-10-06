import { QuizData } from "../pages/Grades/quizesReducer";

export type Data<T> = {
  data: T;
}
export type Level = {
  levelCode: string
  levelName: string
  lessons: string[]
  year: number
  semester: number
}

export type StudentLevels = Level & {
  status: string
}

export type TeacherLevels = Level & {
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

export type Exam = {
  topic: string;
  quizNumber: number;
}

export type ExamStudent = {
  studentGrade: number;
} & Exam

export type ExamTeacher = {
  quizId: number;
} & Exam

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
  week: number;
  contents: string;
  lesson: string;
  year?: number;
  semester?: number;
  // topicName: string;
  // levelName: string;
}

export type ClassesStudent = {
  teacher: string;
  attendance: string;
} & Class;

export type ClassesTeacher = {
  attendees: string[];
  absent: string[];
} & Class;

