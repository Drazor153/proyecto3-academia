import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { BcryptService } from 'src/services/bcrypt.service';
import { StudentsSanitizersService } from 'src/services/students.sanitizer.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentsController],
  providers: [StudentsService, BcryptService, StudentsSanitizersService],
})
export class StudentsModule {}
