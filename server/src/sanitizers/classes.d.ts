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
};

export type LessonClassesSanitized = {
  id: number;
  week: number;
  contents: string;
  attendance: {
    run: number;
    dv: string;
    name: string;
    first_surname: string;
    attended: boolean;
  }[];
};
