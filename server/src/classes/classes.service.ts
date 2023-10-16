import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ClassParams,
  CreateClassDto,
  LessonParams,
  UpdateClassDto,
} from 'src/dtos/classes.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { sanitizeLessonClasses } from 'src/sanitizers/classes.sanitizers';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async getStudents({ lessonId }: LessonParams) {
    const level = await this.prisma.lesson.findUnique({
      where: {
        id: +lessonId,
      },
      select: {
        level: true,
        year: true,
        semester: true,
      },
    });

    if (!level) {
      throw new NotFoundException({
        errorType: 'msg',
        errorMsg: 'Lesson not found',
      });
    }

    const studentsInLevel = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
        enrols: {
          some: {
            levelCode: level.level.code,
            year: level.year,
            semester: level.semester,
            status: 'Cursando',
          },
        },
      },
      orderBy: {
        first_surname: 'asc',
      },
      select: {
        run: true,
        name: true,
        first_surname: true,
        dv: true,
      },
    });

    return { data: studentsInLevel };
  }
  async getClasses({ lessonId }: LessonParams) {
    const query = await this.prisma.class.findMany({
      where: { lessonId: +lessonId },
      include: {
        attendance: {
          include: {
            student: {
              select: {
                run: true,
                name: true,
                first_surname: true,
                dv: true,
              },
            },
          },
        },
      },
      orderBy: {
        week: 'desc',
      },
    });

    if (!query) {
      throw new NotFoundException({
        errorType: 'msg',
        errorMsg: 'Lesson not found',
      });
    }

    const sanitizied = sanitizeLessonClasses(query);

    return { data: sanitizied };
  }
  async createClass({ lessonId, week, contents, attendance }: CreateClassDto) {
    const query = await this.prisma.class.create({
      data: {
        lessonId,
        week,
        contents,
        attendance: {
          createMany: {
            data: attendance,
          },
        },
      },
    });
    console.log(query);

    return { msg: 'Clase creada!' };
  }
  async updateClass(
    { classId }: ClassParams,
    { contents, attendance }: UpdateClassDto,
  ) {
    const query = await this.prisma.class.update({
      where: { id: +classId },
      data: {
        contents,
        attendance: {
          updateMany: attendance.map((val) => ({
            where: { classId: +classId, studentRun: val.studentRun },
            data: { attended: val.attended },
          })),
        },
      },
    });
    console.log(`Updated class: ${query}`);

    return { msg: 'Clase actualizada!' };
  }
  async deleteClass({ classId }: ClassParams) {
    const query = await this.prisma.class.delete({
      where: { id: +classId },
    });

    console.log(`Deleted class: ${query}`);
    return { msg: 'Clase eliminada!' };
  }
}
