import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { RoleEnum } from '@/common/constants';
import { PeriodDto } from './levels.dto';

@Injectable()
export class LevelsService {
  constructor(private prisma: PrismaService) {}

  getAllLevels() {
    return this.prisma.level.findMany();
  }

  async getTopics() {
    const data = await this.prisma.topic.findMany();
    return {data};
  }

  getTeachers() {
    return this.prisma.user.findMany({
      where: {
        role: RoleEnum.Teacher
      }
    });
  }

  getPeriods() {
    return this.prisma.period.findMany();
  }

  createPeriod(period: PeriodDto) {
    // return this.prisma.period.create({
    //   data: period
    // });
  }
}
