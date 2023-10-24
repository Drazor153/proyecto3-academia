import { Injectable } from '@nestjs/common';
import {
  CreateNewStudentDto,
  GetStudentGradesParams,
} from 'src/students/dto/students.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentsSanitizersService } from 'src/services/students.sanitizer.service';
import { BcryptService } from 'src/services/bcrypt.service';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private sanity: StudentsSanitizersService,
    private bcrypt: BcryptService,
  ) {}

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
