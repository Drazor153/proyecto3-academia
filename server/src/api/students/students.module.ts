import { Module, ModuleMetadata } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from '@/database/prisma.module';
import { StudentsSanitizersService } from '@/services/students.sanitizer.service';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsSanitizersService],
};
@Module(moduleMetadata)
export class StudentsModule {}
