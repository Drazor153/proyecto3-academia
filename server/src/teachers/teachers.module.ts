import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeachersSanitizersService } from 'src/services/teachers.sanitizer.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeachersController],
  providers: [TeachersService, TeachersSanitizersService],
})
export class TeachersModule {}
