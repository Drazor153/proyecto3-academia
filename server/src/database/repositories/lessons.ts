import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

type CreateLesson = {
  lesson: string;
  levelCode: string;
  teacherRun: number;
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
        teacherRun: lesson.teacherRun,
        lesson: lesson.lesson,
      })),
    });
  }
}
