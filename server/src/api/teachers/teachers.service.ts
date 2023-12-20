import { Injectable, NotFoundException } from '@nestjs/common';
import {
  GetLevelsQuizzesParams,
  GetQuizGradesParams,
  PostQuizzesGradesBody,
} from './teachers.dto';
import { PinoLogger } from 'nestjs-pino';
1;
import { PrismaService } from '@/database/prisma.service';
import { EnrolsStatus, RoleEnum } from '@/common/constants';
import {
  sanitizeTeacherLevels,
  sanitizeTopicQuizzes,
} from '@/sanitizers/teachers';

@Injectable()
export class TeachersService {
  constructor(
    private prisma: PrismaService,
    private logger: PinoLogger
  ) {
    this.logger.setContext(TeachersService.name);
  }

  async getTeacherLessons(run: number, role: RoleEnum) {
    const query = await this.prisma.lesson.findMany({
      where:
        role === RoleEnum.Admin
          ? {}
          : { lesson_teacher: { some: { teacherRun: run } } },
      include: {
        level: true,
        lesson_teacher: { select: { teacherRun: true } },
        period: {select: {year: true, semester: true}},
      },
      orderBy: [
        {
          level: {
            code: 'desc',
          },
        },
        { lesson: 'asc' },
      ],
    });

    const teacherLevels = sanitizeTeacherLevels(query);

    return { data: teacherLevels };
  }

  async getLevelsQuizzes({ year, semester, level }: GetLevelsQuizzesParams) {
    const topics = await this.prisma.topic.findMany();

    const topicQuizzesQuery = await this.prisma.quiz.findMany({
      where: {
        period: {
          year: +year,
          semester: +semester,
        },
        levelCode: level,
      },
      include: {
        topic: true,
      },
      orderBy: {
        number: 'asc',
      },
    });

    const topicQuizzesSanitized = sanitizeTopicQuizzes(
      topics,
      topicQuizzesQuery
    );

    return {
      data: topicQuizzesSanitized,
    };
  }
  async getQuizGrades({ quizId }: GetQuizGradesParams) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: +quizId },
      include: {period: {select: {year: true, semester: true}}}    });

    if (!quiz) {
      throw new NotFoundException({
        errorType: 'msg',
        errorMsg: 'Quiz not found',
      });
    }

    const query = await this.prisma.user.findMany({
      where: {
        role: RoleEnum.Student,
        enrols: {
          some: {
            levelCode: quiz.levelCode,
            period: {
              year: quiz.period.year,
              semester: quiz.period.semester,
            },
            status: EnrolsStatus.Active,
          },
        },
      },
      include: {
        gives: {
          where: {
            quizId: +quizId,
          },
        },
      },
      orderBy: {
        first_surname: 'asc',
      },
    });

    const gradesData = query.map((val) => {
      const grade = val.gives[0]?.grade;
      return {
        run: val.run,
        name: val.name,
        first_surname: val.first_surname,
        grade: grade ? grade : 0,
        dv: val.dv,
      };
    });

    return { data: gradesData };
  }

  postQuizzesGrades({ quizId, grades }: PostQuizzesGradesBody) {
    grades.forEach(async (val) => {
      await this.prisma.gives.upsert({
        where: {
          quizId_studentRun: {
            quizId,
            studentRun: val.run,
          },
        },
        update: {
          grade: val.grade,
        },
        create: {
          quizId,
          studentRun: val.run,
          grade: val.grade,
        },
      });
    });

    this.logger.info(`${grades.length} notas actualizadas`);

    return { msg: 'Notas actualizadas!' };
  }
}
