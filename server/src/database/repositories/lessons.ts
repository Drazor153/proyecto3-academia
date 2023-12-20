import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SemesterDto } from '@/api/lessons/lessons.dto';

type CreateLesson = {
  lesson: string;
  levelCode: string;
  teachersRun: number[];
};

@Injectable()
export default class LessonsRepo {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.lesson.findUnique({
      where: {
        id,
      },
      select: {
        level: true,
        period: { select: { year: true, semester: true } },
      },
    });
  }

  async createMany(year: number, semesters: SemesterDto[]) {
    for (const value of semesters) {
      const { semester, levels, ends_at, starts_at } = value;
      let period = await this.prisma.period.findFirst({
        where: {
          year,
          semester,
        },
      });
      if (!period) {
        period = await this.prisma.period.create({
          data: {
            year,
            semester,
            start_date: starts_at,
            end_date: ends_at,
          },
        });
        throw new BadRequestException({ msg: 'period_not_found' });
      }
      console.log(period);

      for (const level of levels) {
        const { code, lessons, quizzes } = level;

        const lessonsPromises = lessons.map(async (value) => {
          const { lesson, teachersRun } = value;
          await this.prisma.lesson.create({
            data: {
              levelCode: code,
              periodId: period.id,
              lesson,
              lesson_teacher: {
                create: teachersRun.map((run) => ({
                  teacherRun: run,
                })),
              },
            },
          });
        });

        const topics = await this.prisma.topic.findMany();

        const quizzesPromises = quizzes.map(async (value) => {
          const { number, ends_at, starts_at } = value;
          topics.forEach(async (topic) => {
            await this.prisma.quiz.create({
              data: {
                number,
                levelCode: code,
                topicId: topic.id,
                periodId: period.id,
                starts_at,
                ends_at,
              },
            });
          });
        });

        await Promise.all([...lessonsPromises, ...quizzesPromises]);
      }
    }

    // lessons.forEach(async ({ lesson, levelCode, teachersRun }) => {
    //   await this.prisma.lesson.create({
    //     data: {
    //       levelCode,
    //       year,
    //       semester,
    //       lesson,
    //       lesson_teacher: {
    //         create: teachersRun.map((run) => ({
    //           teacherRun: run,
    //         })),
    //       },
    //     },
    //   });
    // });
    // return this.prisma.lesson.createMany({
    //   // data: [{
    //   //   levelCode: 'A1',
    //   //   year: 2023,
    //   //   semester: 1,
    //   //   teacherRun: 123456789,
    //   //   lesson: 'A',
    //   // }],
    //   data: lessons.map((lesson) => ({
    //     levelCode: lesson.levelCode,
    //     year,
    //     semester,
    //     teacherRun: lesson.teachersRun,
    //     lesson: lesson.lesson,
    //   })),
    // });
  }
}
