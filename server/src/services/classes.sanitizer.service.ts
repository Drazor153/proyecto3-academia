import { Injectable } from '@nestjs/common';
import {
  LessonClassesRaw,
  LessonClassesSanitized,
} from 'src/sanitizers/classes';

@Injectable()
export class ClassesSanitizersService {
  sanitizeLessonClasses(input: LessonClassesRaw[]): LessonClassesSanitized[] {
    const dataArray: LessonClassesSanitized[] = [];

    input.forEach((val) => {
      const attendance = val.attendance.sort((a, b) =>
        a.student.first_surname.localeCompare(b.student.first_surname),
      );
      dataArray.push({
        id: val.id,
        week: val.week,
        contents: val.contents,
        attendance: attendance.map((val) => ({
          run: val.studentRun,
          dv: val.student.dv,
          name: val.student.name,
          first_surname: val.student.first_surname,
          attended: val.attended,
        })),
      });
    });

    return dataArray;
  }
}
