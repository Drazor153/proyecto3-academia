import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonParams } from 'src/classes/dto/classes.dto';
import { UserRequest } from 'src/interfaces/request.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassesSanitizersService } from 'src/services/classes.sanitizer.service';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
    private sanity: ClassesSanitizersService,
  ) {}

  async getStudents({ lessonId }: LessonParams) {
    const level = await this.prisma.lesson.findUnique({
      where: {
        id: +lessonId,
      },
      select: {
        level: true,
        year: true,
        semester: true,
      },
    });

    if (!level) {
      throw new NotFoundException({
        errorType: 'msg',
        errorMsg: 'Lesson not found',
      });
    }

    const studentsInLevel = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
        enrols: {
          some: {
            levelCode: level.level.code,
            year: level.year,
            semester: level.semester,
            status: 'Cursando',
          },
        },
      },
      orderBy: {
        first_surname: 'asc',
      },
      select: {
        run: true,
        name: true,
        first_surname: true,
        dv: true,
      },
    });

    return { data: studentsInLevel };
  }
  async getClasses(req: UserRequest, { lessonId }: LessonParams) {
    if (req.user.role === 'STUDENT') {
      const query = await this.prisma.class.findMany({
        where: {
          lessonId: +lessonId,
        },
        include: {
          attendance: {
            where: {
              studentRun: req.user.run,
            },
          },
          lesson: {
            include: {
              teacher: {
                select: {
                  name: true,
                  first_surname: true,
                },
              },
            },
          },
        },
        orderBy: {
          week: 'desc',
        },
      });

      const classes = query.map((val) => ({
        id: val.id,
        week: val.week,
        contents: val.contents,
        teacher: {
          name: val.lesson.teacher?.name,
          first_surname: val.lesson.teacher?.first_surname,
        },
        attendance: val.attendance[0]?.attended,
      }));

      return { data: classes };
    } else {
      const query = await this.prisma.class.findMany({
        where: { lessonId: +lessonId },
        include: {
          attendance: {
            include: {
              student: {
                select: {
                  run: true,
                  name: true,
                  first_surname: true,
                  dv: true,
                },
              },
            },
          },
        },
        orderBy: {
          week: 'desc',
        },
      });

      if (!query) {
        throw new NotFoundException({
          errorType: 'msg',
          errorMsg: 'Lesson not found',
        });
      }

      const sanitizied = this.sanity.sanitizeLessonClasses(query);

      return { data: sanitizied };
    }
  }
}
