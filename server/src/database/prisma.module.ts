import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  AnnouncementsRepo,
  ClassesRepo,
  LessonsRepo,
  UsersRepo,
} from './repositories';
import JustificationsRepo from './repositories/justifications';

const services = [
  PrismaService,
  AnnouncementsRepo,
  UsersRepo,
  ClassesRepo,
  LessonsRepo,
  JustificationsRepo,
];
@Module({
  providers: services,
  exports: services,
})
export class PrismaModule {}
