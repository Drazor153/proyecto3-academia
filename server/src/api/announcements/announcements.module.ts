import { Module, ModuleMetadata } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaModule } from '@/database/prisma.module';
import { AnnouncementsSanitizersService } from '@/services/announcements.sanitizer.service';
import { AnnouncementsRepository } from './repository/announcements';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [AnnouncementsController],
  providers: [
    AnnouncementsService,
    AnnouncementsSanitizersService,
    AnnouncementsRepository,
  ],
};
@Module(moduleMetadata)
export class AnnouncementsModule {}
