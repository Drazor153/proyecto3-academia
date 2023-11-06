import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateClassDto, UpdateClassDto } from '../dto/classes.dto';

@Injectable()
export class ClassesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassDto) {
    const { attendance, contents, lessonId, week } = data;

    return this.prisma.class.create({
      data: {
        lessonId,
        week,
        contents,
        attendance: {
          createMany: {
            data: attendance,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateClassDto) {
    const { attendance, contents } = data;
    return this.prisma.class.update({
      where: { id },
      data: {
        contents,
        attendance: {
          updateMany: attendance.map((val) => ({
            where: { classId: id, studentRun: val.studentRun },
            data: { attended: val.attended },
          })),
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.class.delete({
      where: { id },
    });
  }
}
