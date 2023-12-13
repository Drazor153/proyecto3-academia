import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  AnnouncementsRepo,
  ClassesRepo,
  StudentsRepo,
  UsersRepo,
} from './repositories';

const services = [
  PrismaService,
  StudentsRepo,
  AnnouncementsRepo,
  UsersRepo,
  ClassesRepo,
];
@Module({
  providers: services,
  exports: services,
})
export class PrismaModule {}
