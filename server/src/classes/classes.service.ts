import { Injectable } from '@nestjs/common';
import {
  ClassParams,
  CreateClassDto,
  UpdateClassDto,
} from 'src/classes/dto/classes.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async createClass({ lessonId, week, contents, attendance }: CreateClassDto) {
    const query = await this.prisma.class.create({
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
    console.log(query);

    return { msg: 'Clase creada!' };
  }
  async updateClass(
    { classId }: ClassParams,
    { contents, attendance }: UpdateClassDto,
  ) {
    const query = await this.prisma.class.update({
      where: { id: +classId },
      data: {
        contents,
        attendance: {
          updateMany: attendance.map((val) => ({
            where: { classId: +classId, studentRun: val.studentRun },
            data: { attended: val.attended },
          })),
        },
      },
    });
    console.log(`Updated class: ${query}`);

    return { msg: 'Clase actualizada!' };
  }
  async deleteClass({ classId }: ClassParams) {
    const query = await this.prisma.class.delete({
      where: { id: +classId },
    });

    console.log(`Deleted class: ${query}`);
    return { msg: 'Clase eliminada!' };
  }
}
