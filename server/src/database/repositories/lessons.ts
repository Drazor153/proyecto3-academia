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
    for(const value of semesters){
      const { semester, lessons, quizzes } = value;
      const period = await this.prisma.period.findFirst({
        where: {
          year,
          semester,
        },
      });
      if (!period) {
        throw new BadRequestException('period_not_found');
      }
      console.log(period);

      const lessonsPromises = lessons.map(async (value) => {
        const { lesson, levelCode, teachersRun } = value;
        await this.prisma.lesson.create({
          data: {
            levelCode,
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

      const quizzesPromises = quizzes.map(async (value) => {
        const {number, ends_at,levelCode,starts_at,topicId} = value;

        await this.prisma.quiz.create({
          data: {
            number,
            levelCode,
            topicId,
            periodId: period.id,
            // starts_at,
            // ends_at,
          },
        });
      });

      await Promise.all([...lessonsPromises, ...quizzesPromises]);
      
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
