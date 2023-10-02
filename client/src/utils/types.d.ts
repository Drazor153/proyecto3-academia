export type Data<T> = {
  data: T;
}
export type Level = {
  levelCode: string
  levelName: string
}

export type StudentLevels = Level & {
  year: number
  semester: number
  status: string
}

export type TeacherLevels = Level & {
  year: number
  semester: number
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
