export interface LessonClassesRaw {
  id: number;
  week: number;
  contents: string;
  lessonId: number;
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
}

export interface LessonClassesSanitized {
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
}
