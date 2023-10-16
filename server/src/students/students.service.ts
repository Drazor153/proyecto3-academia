import { Injectable } from '@nestjs/common';
import {
  CreateNewStudentDto,
  GetClassesParams,
  GetStudentGradesParams,
} from 'src/dtos/students.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/services/bcrypt';
import {
  sanitizeStudentGrades,
  sanitizeStudentLevels,
} from '../sanitizers/students.sanitizers';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getAllStudents() {
    return await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
    });
  }

  async createNewStudent({
    run,
    dv,
    name,
    first_surname,
    level,
  }: CreateNewStudentDto) {
    const studentExist = await this.prisma.user.findUnique({
      where: {
        run,
        role: 'STUDENT',
      },
    });

    if (studentExist !== null) {
      return { error: 'El estudiante ya existe' };
    }

    const hashedPassword = await hashPassword(
      `${run}_${first_surname.toUpperCase()}`,
    );
    const student = await this.prisma.user.create({
      data: {
        run,
        dv,
        name: name.toUpperCase(),
        first_surname: first_surname.toUpperCase(),
        role: 'STUDENT',
        status: 'ENABLED',
        password: hashedPassword,
        enrols: {
          create: {
            status: 'Cursando',
            year: new Date().getFullYear(),
            semester: 1,
            level: {
              connect: {
                code: level,
              },
            },
          },
        },
      },
      select: {
        run: true,
        name: true,
        first_surname: true,
      },
    });

    return { message: 'Usuario creado correctamente!', student };
  }

  async getLevels(run: number) {
    const query = await this.prisma.enrols.findMany({
      where: {
        studentRun: run,
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        level: {
          include: {
            teaches: true,
          },
        },
      },
    });

    const studentLevels = sanitizeStudentLevels(query);

    return { data: studentLevels };
  }
  async getClasses({ lessonId, run }: GetClassesParams) {
    const query = await this.prisma.class.findMany({
      where: {
        lessonId: lessonId,
      },
      include: {
        attendance: {
          where: {
            studentRun: run,
          },
        },
        lesson: {
          include: {
            teacher: {
              select: {
                name: true,
                first_surname: true,
              },
            },
          },
        },
      },
      orderBy: {
        week: 'desc',
      },
    });

    const classes = query.map((val) => ({
      id: val.id,
      week: val.week,
      contents: val.contents,
      teacher: {
        name: val.lesson.teacher?.name,
        first_surname: val.lesson.teacher?.first_surname,
      },
      attendance: val.attendance[0]?.attended,
    }));

    return { data: classes };
  }
  async getStudentGrades({
    year,
    semester,
    level,
    run,
  }: GetStudentGradesParams) {
    const query = await this.prisma.quiz.findMany({
      where: {
        year,
        semester,
        levelCode: level,
      },
      include: {
        gives: {
          where: {
            studentRun: run,
          },
          select: {
            grade: true,
          },
        },
        topic: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const sanitiziedQuery = sanitizeStudentGrades(query);

    return { data: sanitiziedQuery };
  }
}
