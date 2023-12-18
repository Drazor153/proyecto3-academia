import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

type CreateLesson = {
  lesson: string;
  levelCode: string;
  teachersRun: number[];
};

@Injectable()
export default class AnnouncementsRepo {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.lesson.findUnique({
      where: {
        id,
      },
      select: {
        level: true,
        year: true,
        semester: true,
      },
    });
  }

  createMany(year: number, semester: number, lessons: CreateLesson[]) {
    lessons.forEach(async ({ lesson, levelCode, teachersRun }) => {
      await this.prisma.lesson.create({
        data: {
          levelCode,
          year,
          semester,
          lesson,
          lesson_teacher: {
            create: teachersRun.map((run) => ({
              teacherRun: run,
            })),
          },
        },
      });
    });
    return this.prisma.lesson.createMany({
      // data: [{
      //   levelCode: 'A1',
      //   year: 2023,
      //   semester: 1,
      //   teacherRun: 123456789,
      //   lesson: 'A',
      // }],
      data: lessons.map((lesson) => ({
        levelCode: lesson.levelCode,
        year,
        semester,
        teacherRun: lesson.teachersRun,
        lesson: lesson.lesson,
      })),
    });
  }
}
