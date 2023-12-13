import { Module, ModuleMetadata } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { PrismaModule } from '@/database/prisma.module';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [LessonsService],
};
@Module(moduleMetadata)
export class LessonsModule {}
