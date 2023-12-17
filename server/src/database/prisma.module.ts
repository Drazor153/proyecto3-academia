import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  AnnouncementsRepo,
  ClassesRepo,
  LessonsRepo,
  StudentsRepo,
  UsersRepo,
} from './repositories';

const services = [
  PrismaService,
  StudentsRepo,
  AnnouncementsRepo,
  UsersRepo,
  ClassesRepo,
  LessonsRepo
];
@Module({
  providers: services,
  exports: services,
})
export class PrismaModule {}
