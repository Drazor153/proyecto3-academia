import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateClassDto, UpdateClassDto } from '../../api/classes/classes.dto';

@Injectable()
export default class ClassesRepo {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateClassDto) {
    const { attendance, contents, lessonId, date } = data;

    return this.prisma.class.create({
      data: {
        lessonId,
        date,
        contents,
        attendance: {
          createMany: {
            data: attendance,
          },
        },
      },
    });
  }

  update(id: number, data: UpdateClassDto) {
    const { attendance, contents, date } = data;
    return this.prisma.class.update({
      where: { id },
      data: {
        contents,
        date,
        attendance: {
          updateMany: attendance.map((val) => ({
            where: { classId: id, studentRun: val.studentRun },
            data: { attended: val.attended },
          })),
        },
      },
    });
  }

  delete(id: number) {
    return this.prisma.class.delete({
      where: { id },
    });
  }
}
