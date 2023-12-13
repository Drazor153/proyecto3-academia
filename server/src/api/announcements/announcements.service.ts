import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateAnnouncementDto } from './dto/announcement.dto';
import { UserPayload } from '@/interfaces/request.interface';
import { AnnouncementsRepo } from '@repos';
import { hasNextPage, paginate } from '@/common/paginate';
import { AnnTargets, EnrolsStatus, RoleEnum } from '@common/consts';
import { sanitizeAnnouncements } from '../../sanitizers/announcements';
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

    return sanitizeAnnouncements(query);
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

    return sanitizeAnnouncements(query);
  }

  private async getTeacherAnnouncements(run: number) {
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

    const query = await this.annRepository.allPerRole({
      send_to: {
        hasSome: [AnnTargets.ALL, ...levelCodes],
      },
    });

    return sanitizeAnnouncements(query);
  }

  async getAllAnnouncements(size: number, page: number) {
    const annQuery = await this.annRepository.all();

    const announcements = sanitizeAnnouncements(annQuery);

    const paginated = paginate(announcements, page, size);
    const previous = page > 1;
    const next = hasNextPage(announcements, page, size);

    return { next, previous, data: paginated };
  }

  async createAnnouncement(run: number, data: CreateAnnouncementDto) {
    const new_announcement = await this.annRepository.create(run, data);

    return new_announcement;
  }

  async updateAnnouncement(id: number, data: CreateAnnouncementDto) {
    const updated_announcement = await this.annRepository.update(id, data);

    return updated_announcement;
  }

  async deleteAnnouncement(id: number) {
    const announcement = await this.annRepository.delete(id);

    return announcement;
  }
}
