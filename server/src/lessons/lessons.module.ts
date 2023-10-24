import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClassesSanitizersService } from 'src/services/classes.sanitizer.service';

@Module({
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [LessonsService, ClassesSanitizersService],
})
export class LessonsModule {}
