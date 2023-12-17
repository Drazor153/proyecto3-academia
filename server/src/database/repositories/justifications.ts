import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class JustificationsRepo {
  constructor(private readonly prisma: PrismaService) {}

  getAllJustifications() {
    return this.prisma.justification.findMany({
      include: {
        student: {
          select: {
            run: true,
            name: true,
            first_surname: true,
            dv: true,
          },
        },
        Attendance: {
          select: {
            attended: true,
            classId: true,
          },
        },
      },
    });
  }

  getJustificationsByRun(run: number) {
    return this.prisma.justification.findMany({
      where: {
        studentRun: run,
      },
      include: {
        Attendance: {
          select: {
            attended: true,
            classId: true,
          },
        },
      },
      orderBy: {
        init_ausencia: 'desc',
      },
    });
  }

  create(data: Prisma.JustificationCreateInput) {
    return this.prisma.justification.create({
      data,
    });
  }

  updateStatus(id: number, approved: string) {
    return this.prisma.justification.update({
      where: {
        id,
      },
      data: {
        approved,
      },
    });
  }
}
