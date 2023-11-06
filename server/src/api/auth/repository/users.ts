import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(run: number) {
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

  async findOneWithRefreshToken(run: number) {
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

  async update(run: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { run }, data });
  }
}
