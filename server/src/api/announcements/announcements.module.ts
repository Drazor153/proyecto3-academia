import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AnnouncementsSanitizersService } from 'src/services/announcements.sanitizer.service';
import { AnnouncementsRepository } from './repository/announcements.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AnnouncementsController],
  providers: [
    AnnouncementsService,
    AnnouncementsSanitizersService,
    AnnouncementsRepository,
  ],
})
export class AnnouncementsModule {}
