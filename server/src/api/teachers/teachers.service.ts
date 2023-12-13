import { Injectable, NotFoundException } from '@nestjs/common';
import {
  GetLevelsQuizzesParams,
  GetQuizGradesParams,
  PostQuizzesGradesBody,
} from './dto/teachers.dto';
import { PinoLogger } from 'nestjs-pino';
import { PrismaService } from '@/database/prisma.service';
import { TeachersSanitizersService } from '@/services/teachers.sanitizer.service';
import { EnrolsStatus, RoleEnum } from '@/common/consts';

@Injectable()
export class TeachersService {
  constructor(
    private prisma: PrismaService,
    private sanity: TeachersSanitizersService,
    private logger: PinoLogger
  ) {
    this.logger.setContext(TeachersService.name);
  }

  async getTeacherLessons(run: number, role: RoleEnum) {
    const query = await this.prisma.lesson.findMany({
      where: role === RoleEnum.Admin ? {} : { teacherRun: run },
      include: { level: true },
      orderBy: [
        {
          level: {
            code: 'desc',
          },
        },
        { lesson: 'asc' },
      ],
    });

    const teacherLevels = this.sanity.sanitizeTeacherLevels(query);

    return { data: teacherLevels };
  }

  async getLevelsQuizzes({ year, semester, level }: GetLevelsQuizzesParams) {
    const topics = await this.prisma.topic.findMany();

    const topicQuizzesQuery = await this.prisma.quiz.findMany({
      where: {
        year: +year,
        semester: +semester,
        levelCode: level,
      },
      include: {
        topic: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const topicQuizzesSanitizied = this.sanity.sanitizeTopicQuizzes(
      topics,
      topicQuizzesQuery
    );

    return {
      data: topicQuizzesSanitizied,
    };
  }
  async getQuizGrades({ quizId }: GetQuizGradesParams) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: +quizId },
    });

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
            year: quiz.year,
            semester: quiz.semester,
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
