import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateAnnouncementDto } from '../../api/announcements/announcements.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export default class AnnouncementsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getCategoriesTargets() {
    const categories = await this.prisma.category.findMany();
    const targets = await this.prisma.target.findMany();

    return { categories, targets };
  }

  /** Returns all announcements with its author */
  async all() {
    return this.prisma.announcement.findMany({
      include: {
        user: {
          select: {
            name: true,
            first_surname: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      }
    });
  }

  async allPerRole(where: Prisma.AnnouncementWhereInput) {
    return this.prisma.announcement.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            first_surname: true,
          },
        },
      },
    });
  }

  async create(run: number, data: CreateAnnouncementDto) {
    const {
      title,
      content,
      image,
      category,
      expiresAt,
      target: send_to,
    } = data;

    return this.prisma.announcement.create({
      data: {
        title,
        content,
        image,
        send_to,
        category,
        expires_at: new Date(expiresAt),
        user: {
          connect: {
            run,
          },
        },
      },
    });
  }

  async update(id: number, data: CreateAnnouncementDto) {
    const {
      title,
      content,
      image,
      category,
      expiresAt,
      target: send_to,
    } = data;

    return this.prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        image,
        send_to,
        category,
        expires_at: new Date(expiresAt),
      },
    });
  }

  async delete(id: number) {
    return this.prisma.announcement.delete({
      where: {
        id,
      },
    });
  }
}
