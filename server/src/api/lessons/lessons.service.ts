import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonParams } from '@/api/classes/classes.dto';
import { UserRequest } from '@/interfaces/request.interface';
import { PrismaService } from '@/database/prisma.service';
import { sanitizeLessonClasses } from '@/sanitizers/classes';
import { EnrolsStatus, RoleEnum } from '../../common/constants';
import { LessonsRepo } from '../../database/repositories';
import { CreateLessonsDto } from './lessons.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService,private lessonsRepo: LessonsRepo) {}

  async getStudents({ lessonId }: LessonParams) {
    const level = await this.lessonsRepo.findById(+lessonId);

    if (!level) {
      throw new NotFoundException({
        errorType: 'msg',
        errorMsg: 'Lesson not found',
      });
    }

    const studentsInLevel = await this.prisma.user.findMany({
      where: {
        role: RoleEnum.Student,
        enrols: {
          some: {
            levelCode: level.level.code,
            year: level.year,
            semester: level.semester,
            status: EnrolsStatus.Active,
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
    if (req.user.role === RoleEnum.Student) {
      const query = await this.prisma.class.findMany({
        where: {
          lessonId: +lessonId,
        },
        include: {
          attendance: {
            where: {
              studentRun: req.user.sub,
            },
          },
          lesson: {
            include: {
              lesson_teacher: {
                select: {
                  teacher: {
                    select: {
                      name: true,
                      first_surname: true,
                    },
                  },
                }
              }
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      });

      const classes = query.map((val) => ({
        id: val.id,
        date: val.date,
        contents: val.contents,
        teacher: {
          name: val.lesson.lesson_teacher[0].teacher.name,
          first_surname: val.lesson.lesson_teacher[0].teacher.first_surname,
        },
        attendance: val.attendance[0]?.attended,
      }));

      return { data: classes };
    }
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
        date: 'desc',
      },
    });

    if (!query) {
      throw new NotFoundException({
        errorType: 'msg',
        errorMsg: 'Lesson not found',
      });
    }

    const sanitized = sanitizeLessonClasses(query);

    return { data: sanitized };
  }

  async createLessons(data: CreateLessonsDto){
    const {year, semester, lessons} = data;
    console.log(data);
    this.lessonsRepo.createMany(year, semester, lessons);
  }
}
