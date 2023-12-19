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
              levelCode_studentRun_year_semester: {
                levelCode: level,
                studentRun: run,
                year: new Date().getFullYear(),
                semester: 1,
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
    paid: boolean;
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
            paid: params.paid,
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

    return { topics, query };
  }
}
