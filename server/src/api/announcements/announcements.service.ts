import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/announcement.dto';
import { UserPayload } from 'src/interfaces/request.interface';
import { RoleEnum } from 'src/guards/roles.decorator';
import { AnnouncementsSanitizersService } from 'src/services/announcements.sanitizer.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sanity: AnnouncementsSanitizersService,
  ) {}

  async getCategoriesTargets() {
    const categories = await this.prisma.category.findMany({});
    const targets = await this.prisma.target.findMany({});

    return { categories, targets };
  }

  async getAnnouncements(userReq: UserPayload) {
    const { sub, role } = userReq;

    switch (role) {
      case RoleEnum.Admin:
        const result1 = await this.getAdminAnnouncements();
        return { data: result1 };
      case RoleEnum.Student:
        const result2 = await this.getStudentAnnouncements(sub);
        return { data: result2 };
      case RoleEnum.Teacher:
        const result3 = await this.getTeacherAnnouncements(sub);
        return { data: result3 };
    }
  }

  async getAdminAnnouncements() {
    const query = await this.prisma.announcement.findMany({
      where: {
        send_to: {
          some: {
            target: {
              name: 'ALL',
            },
          },
        },
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            first_surname: true,
          },
        },
        send_to: {
          include: {
            target: true,
          },
        },
      },
    });
    return this.sanity.sanitizeAnnouncements(query);
  }

  async getStudentAnnouncements(run: number) {
    const student = await this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        enrols: {
          where: {
            status: 'Cursando',
          },
          select: {
            levelCode: true,
          },
        },
      },
    });

    const levelCode = student.enrols[0].levelCode;

    const query = await this.prisma.announcement.findMany({
      where: {
        send_to: {
          some: {
            OR: [
              {
                target: {
                  name: 'ALL',
                },
              },
              {
                target: {
                  name: levelCode,
                },
              },
            ],
          },
        },
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            first_surname: true,
          },
        },
        send_to: {
          include: {
            target: true,
          },
        },
      },
    });

    return this.sanity.sanitizeAnnouncements(query);
  }

  async getTeacherAnnouncements(run: number) {
    const fecha_actual = new Date();
    const teacher = await this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        Lesson: {
          where: {
            year: fecha_actual.getFullYear(),
            semester: fecha_actual.getMonth() < 6 ? 1 : 2,
          },
          select: {
            levelCode: true,
          },
        },
      },
    });

    const levelCodes = teacher.Lesson.map((lesson) => lesson.levelCode);

    const query = await this.prisma.announcement.findMany({
      where: {
        send_to: {
          some: {
            OR: [
              {
                target: {
                  name: 'ALL',
                },
              },
              {
                target: {
                  name: {
                    in: levelCodes,
                  },
                },
              },
            ],
          },
        },
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            first_surname: true,
          },
        },
        send_to: {
          include: {
            target: true,
          },
        },
      },
    });

    return this.sanity.sanitizeAnnouncements(query);
  }

  async getAllAnnouncements(size: number, page: number) {
    const query = await this.prisma.announcement.findMany({
      include: {
        category: true,
        user: {
          select: {
            name: true,
            first_surname: true,
          },
        },
        send_to: {
          include: {
            target: true,
          },
        },
      },
    });

    const announcements = this.sanity.sanitizeAnnouncements(query);

    const start = (page - 1) * size;
    const end = start + size;
    const paginated = announcements.slice(start, end);
    const previous = page > 1;
    const next = end < announcements.length;

    return { data: paginated, next, previous };
  }

  async createAnnouncement(run: number, data: CreateAnnouncementDto) {
    const new_announcement = await this.prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        expires_at: new Date(data.expiresAt),
        user: {
          connect: {
            run,
          },
        },
        category: {
          connect: {
            id: data.category,
          },
        },
        send_to: {
          create: data.target.map((target) => ({
            target: {
              connect: {
                id: target,
              },
            },
          })),
        },
      },
    });

    return new_announcement;
  }

  async updateAnnouncement(id: number, data: CreateAnnouncementDto) {
    // console.log({ id, ...data });
    await this.prisma.sendTo.deleteMany({
      where: {
        announcementId: id,
      },
    });
    const updated_announcement = await this.prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        expires_at: new Date(data.expiresAt),
        category: {
          connect: {
            id: data.category,
          },
        },
        send_to: {
          create: data.target.map((target) => ({
            target: {
              connect: {
                id: target,
              },
            },
          })),
        },
      },
    });

    return updated_announcement;
  }

  async deleteAnnouncement(id: number) {
    const announcement = await this.prisma.announcement.delete({
      where: {
        id,
      },
    });

    return announcement;
  }
}
