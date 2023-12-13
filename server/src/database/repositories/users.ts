import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export default class UsersRepo {
  constructor(private prisma: PrismaService) {}

  findOne(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        email: true,
        role: true,
        status: true,
        password: true,
      },
    });
  }

  findOneWithRefreshToken(run: number) {
    return this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        role: true,
        refresh_token: true,
      },
    });
  }

  update(run: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { run }, data });
  }
}
