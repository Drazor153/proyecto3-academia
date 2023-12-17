import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnrolsStatus, RoleEnum, UserStatus } from '../../common/constants';

@Injectable()
export default class StudentsRepo {
  constructor(private prisma: PrismaService) {}

  getActiveStudents() {
    return this.prisma.user.findMany({
      where: {
        role: RoleEnum.Student,
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        enrols: {
          select: {
            paid: true,
            levelCode: true,
          },
          where: {
            status: EnrolsStatus.Active,
          },
        },
      },
    });
  }

  getStudentCareerByRun(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
        role: RoleEnum.Student,
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
            paid: true,
            level: {
              select: {
                name: true,
              },
            },
          },
          orderBy: [{ year: 'desc' }, { semester: 'desc' }],
        },
      },
    });
  }

  getStudentByRun(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
        role: RoleEnum.Student,
      },
    });
  }

  createNewActiveStudent(params: {
    run: number;
    dv: string;
    name: string;
    first_surname: string;
    level: string;
    hashedPassword: string;
  }) {
    const { run, dv, name, first_surname, level, hashedPassword } = params;
    return this.prisma.user.create({
      data: {
        run,
        dv,
        name: name.toUpperCase(),
        first_surname: first_surname.toUpperCase(),
        role: RoleEnum.Student,
        status: UserStatus.Enabled,
        password: hashedPassword,
        enrols: {
          create: {
            status: EnrolsStatus.Active,
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
  }

  getStudentLevels(run: number) {
    return this.prisma.enrols.findMany({
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
  }

  getStudentGrades(
    run: number,
    params: {
      year: number;
      semester: number;
      level: string;
    }
  ) {
    const { year, semester, level } = params;
    return this.prisma.quiz.findMany({
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
  }
}
