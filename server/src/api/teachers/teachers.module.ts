import { Module, ModuleMetadata } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaModule } from '@/database/prisma.module';
import { TeachersSanitizersService } from '@/services/teachers.sanitizer.service';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [TeachersController],
  providers: [TeachersService, TeachersSanitizersService],
};
@Module(moduleMetadata)
export class TeachersModule {}
