import { Injectable } from '@nestjs/common';
import {
  CreateNewStudentDto,
  GetStudentGradesParams,
  PaginatedStudentsQuery,
} from './dto/students.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { StudentsSanitizersService } from 'src/services/students.sanitizer.service';
import { BcryptService } from 'src/services/bcrypt.service';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private sanity: StudentsSanitizersService,
    private bcrypt: BcryptService,
  ) {}

  // async getAllStudents() {
  //   return await this.prisma.user.findMany({
  //     where: {
  //       role: 'STUDENT',
  //     },
  //     select: {
  //       run: true,
  //       dv: true,
  //       name: true,
  //       first_surname: true,
  //       email: true,
  //       status: true,
  //     },
  //   });
  // }

  async getStudents(queryParams: PaginatedStudentsQuery) {
    const { page, size, run, level } = queryParams;
    const query = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        enrols: {
          select: {
            levelCode: true,
          },
          where: {
            status: 'Cursando',
          },
        },
      },
    });

    const students = query
      .filter(
        (student) =>
          String(student.run).includes(run) &&
          student.enrols[0].levelCode.includes(level),
      )
      .map((student) => ({
        run: student.run,
        dv: student.dv,
        name: student.name,
        first_surname: student.first_surname,
        level: student.enrols[0].levelCode,
      }));

    // Paginate
    const start = (+page - 1) * +size;
    const end = +page * +size;
    const paginatedStudents = students.slice(start, end);
    // Check if previous page exists
    const previous = +page > 1;
    // Check if next page exists
    const next = end < students.length;

    return { data: paginatedStudents, next, previous };
  }

  async getStudentCareer(run: number) {
    const studentQuery = await this.prisma.user.findUnique({
      where: {
        run,
        role: 'STUDENT',
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        enrols: {
          select: {
            levelCode: true,
            status: true,
            year: true,
            semester: true,
            level: {
              select: {
                name: true,
              },
            },
          },
          orderBy: [{ year: 'desc' }, { semester: 'asc' }],
        },
      },
    });

    const sanitized = this.sanity.sanitizeStudentCareer(studentQuery);

    return { data: sanitized };
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

    const hashedPassword = await this.bcrypt.hashPassword(
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
            status: 'active',
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

    const studentLevels = this.sanity.sanitizeStudentLevels(query);

    return { data: studentLevels };
  }

  async getStudentGrades({
    year,
    semester,
    level,
    run,
  }: GetStudentGradesParams & { run: number }) {
    const topics = await this.prisma.topic.findMany();

    const query = await this.prisma.quiz.findMany({
      where: {
        year: +year,
        semester: +semester,
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

    const sanitiziedQuery = this.sanity.sanitizeStudentGrades(topics, query);

    return { data: sanitiziedQuery };
  }
}
