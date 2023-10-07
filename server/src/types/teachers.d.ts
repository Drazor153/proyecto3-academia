export type OriginalData = {
  teacherRun: number;
  levelCode: string;
  id: number;
  year: number;
  semester: number;
  lesson: string;
  level: {
    code: string;
    name: string;
  };
};

export type TransformedData = {
  year: number;
  semesters: {
    semester: number;
    levels: {
      levelName: string;
      levelCode: string;
      lessons: string[];
    }[];
  }[];
};
