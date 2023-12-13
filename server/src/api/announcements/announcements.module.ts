import { Module, ModuleMetadata } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaModule } from '@/database/prisma.module';
import { AnnouncementsRepository } from './repository/announcements';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [AnnouncementsController],
  providers: [
    AnnouncementsService,
    AnnouncementsRepository,
  ],
};
@Module(moduleMetadata)
export class AnnouncementsModule {}
