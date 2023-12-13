import { Module, ModuleMetadata } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaModule } from '@/database/prisma.module';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
};
@Module(moduleMetadata)
export class AnnouncementsModule {}
