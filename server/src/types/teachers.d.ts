export type OriginalData = {
  teacherRun: number;
  levelCode: string;
  id: number;
  year: number;
  semester: number;
  level: {
    code: string;
    name: string;
  };
};

export type TransformedData = {
  levelName: string;
  levelCode: string;
  years: {
    year: number;
    semesters: number[];
  }[];
};
