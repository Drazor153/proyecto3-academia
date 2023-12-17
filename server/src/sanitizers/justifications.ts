type JustificationRaw = {
  Attendance: {
    classId: number;
    attended: boolean;
  }[];
  student: {
    name: string;
    run: number;
    dv: string;
    first_surname: string;
  };
  id: number;
  init_ausencia: Date;
  end_ausencia: Date;
  num_inasistente: number;
  reason: string;
  file: string;
  approved: string;
  studentRun: number;
};
type Filters = {
  run?: number;
  name?: string;
  status?: string;
};
export const filterJustifications = (
  justifications: JustificationRaw[],
  filters: Filters
) => {
  const { status, run, name } = filters;

  return justifications.filter((justification) => {
    const { student, approved } = justification;
    const { run: studentRun, name: studentName } = student;
    return (
      String(studentRun).startsWith(String(run)) &&
      studentName.toLowerCase().startsWith(name.toLowerCase()) &&
      approved.toLowerCase().startsWith(status.toLowerCase())
    );
  });
};
