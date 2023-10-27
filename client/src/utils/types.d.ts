import { QuizData } from "../pages/Grades/quizesReducer";

export type Data<T> = {
  data: T;
}
export type Paginate<T> = {
  data: T;
  next: boolean;
  previous: boolean;
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
  code: string;
  name: string
}

export type Student = {
  run: string | number;
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
type Author = { name: string, first_surname: string }
type Category = { id: number, name: string }
type Target = { id: number, name: string }

export type AnnouncementType = {
  author: Author;
  category: Category;
  content: string;
  createdAt: string;
  expiresAt: string;
  id: number;
  image?: string;
  target: target[];
  title: string;
  updatedAt: string;
};

export type ResponseMsg = {
  msg: string
}

export type PostAnnouncement = Omit<
  AnnouncementType,
  'author' | 'id' | 'createdAt' | 'updatedAt' | 'category' | 'target'
> & {
  category: number;
  target: number[];
};
