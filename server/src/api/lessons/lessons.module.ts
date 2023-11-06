import { Module, ModuleMetadata } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { PrismaModule } from '@/database/prisma.module';
import { ClassesSanitizersService } from '@/services/classes.sanitizer.service';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [LessonsService, ClassesSanitizersService],
};
@Module(moduleMetadata)
export class LessonsModule {}
