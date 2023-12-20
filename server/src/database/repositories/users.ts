import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EnrolsStatus, RoleEnum, UserStatus } from '../../common/constants';
import { UpdateStudentDto } from '../../api/students/students.dto';

@Injectable()
export default class UsersRepo {
  constructor(private prisma: PrismaService) {}

  findOne(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        email: true,
        role: true,
        status: true,
        password: true,
      },
    });
  }

  findOneWithRefreshToken(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        role: true,
        refresh_token: true,
      },
    });
  }

  update(run: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { run }, data });
  }

  updateStudent(run: number, data: UpdateStudentDto) {
    const { name, first_surname, email, level, paid } = data;
    return this.prisma.user.update({
      where: {
        run,
      },
      data: {
        name,
        first_surname,
        email,
        enrols: {
          update: {
            where: {
              studentRun_periodId: {
                periodId: 1,
                studentRun: run,
              },
              status: EnrolsStatus.Active,
            },
            data: {
              levelCode: level,
              paid,
            },
          },
        },
      },
    });
  }

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
            period: {
              select: {
                year: true,
                semester: true,
              },
            },
            paid: true,
            level: {
              select: {
                name: true,
              },
            },
          },
          orderBy: [
            { period: { year: 'desc' } },
            { period: { semester: 'desc' } },
          ],
        },
      },
    });
  }

  getStudentByRun(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
      },
    });
  }

  async createNewActiveStudent(params: {
    run: number;
    dv: string;
    name: string;
    first_surname: string;
    level: string;
    hashedPassword: string;
    paid: boolean;
  }) {
    const { run, dv, name, first_surname, level, hashedPassword } = params;
    const period = await this.prisma.period.findFirst({
      where: { year: 2023, semester: 1 },
    });
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
            paid: params.paid,
            levelCode: level,
            periodId: period.id,
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
        period: { year: 'desc' },
      },
      select: {
        level: {
          include: {
            teaches: {
              select: {
                id: true,
                levelCode: true,
                periodId: true,
                lesson: true,
              },
              orderBy: {
                lesson: 'asc',
              },
            },
          },
        },
        period: { select: { year: true, semester: true } },
      },
    });
  }

  async getStudentGrades(
    run: number,
    params: {
      year: number;
      semester: number;
      level: string;
    }
  ) {
    const { year, semester, level } = params;
    const topics = await this.prisma.topic.findMany();
    const query = await this.prisma.quiz.findMany({
      where: {
        period: {
          year: +year,
          semester: +semester,
        },
        levelCode: level,
      },
      select: {
        gives: {
          where: {
            studentRun: run,
          },
          select: {
            grade: true,
          },
        },
        topic: true,
        number: true,
      },
      orderBy: {
        number: 'asc',
      },
    });

    return { topics, query };
  }
}
