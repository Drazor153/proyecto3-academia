import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateAnnouncementDto } from './announcements.dto';
import { UserPayload } from '@/interfaces/request.interface';
import { AnnouncementsRepo } from '@repos';
import { paginated } from '@/common/paginate';
import { AnnTargets, EnrolsStatus, RoleEnum } from '@/common/constants';
import { sanitizeAnnouncements } from '@/sanitizers/announcements';
@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly annRepository: AnnouncementsRepo
  ) {}

  async getCategoriesTargets() {
    const res = await this.annRepository.getCategoriesTargets();
    return res;
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

  private async getAdminAnnouncements() {
    const query = await this.annRepository.allPerRole({
      send_to: {
        has: AnnTargets.ALL,
      },
    });

    return sanitizeAnnouncements(query, true);
  }

  private async getStudentAnnouncements(run: number) {
    const student = await this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        enrols: {
          where: {
            status: EnrolsStatus.Active,
          },
          select: {
            levelCode: true,
          },
        },
      },
    });

    const levelCode = student.enrols[0].levelCode;

    const query = await this.annRepository.allPerRole({
      send_to: {
        hasSome: [AnnTargets.ALL, levelCode],
      },
    });

    return sanitizeAnnouncements(query, true);
  }

  private async getTeacherAnnouncements(run: number) {
    const currentDate = new Date();
    const teacher = await this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        lesson_teacher: {
          where: {
            lesson: {
              period: {
                year: currentDate.getFullYear(),
                semester: currentDate.getMonth() < 6 ? 1 : 2,
              },
            },
          },
          select: {
            lesson: {
              select: {
                levelCode: true,
              },
            },
          },
        },
        // Lesson: {
        //   where: {
        //     year: currentDate.getFullYear(),
        //     semester: currentDate.getMonth() < 6 ? 1 : 2,
        //   },
        //   select: {
        //     levelCode: true,
        //   },
        // },
      },
    });

    const levelCodes = teacher.lesson_teacher.map(
      ({ lesson }) => lesson.levelCode
    );

    const query = await this.annRepository.allPerRole({
      send_to: {
        hasSome: [AnnTargets.ALL, ...levelCodes],
      },
    });

    return sanitizeAnnouncements(query, true);
  }

  async getAllAnnouncements(size: number, page: number) {
    const annQuery = await this.annRepository.all();

    const announcements = sanitizeAnnouncements(annQuery);

    const { array, next, previous } = paginated(announcements, page, size);

    return { data: array, next, previous };
  }

  async createAnnouncement(run: number, data: CreateAnnouncementDto) {
    const new_announcement = await this.annRepository.create(run, data);

    return new_announcement;
  }

  async updateAnnouncement(id: number, data: CreateAnnouncementDto) {
    try {
      const updated_announcement = await this.annRepository.update(id, data);
      return updated_announcement;
    } catch (error) {
      throw new BadRequestException({ msg: 'announcement_not_found' });
    }
  }

  async deleteAnnouncement(id: number) {
    try {
      const announcement = await this.annRepository.delete(id);
      return announcement;
    } catch (error) {
      throw new BadRequestException({ msg: 'announcement_not_found' });
    }
  }
}
