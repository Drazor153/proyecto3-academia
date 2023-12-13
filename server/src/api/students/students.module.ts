import { Module, ModuleMetadata } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from '@/database/prisma.module';

export const moduleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [StudentsController],
  providers: [StudentsService],
};
@Module(moduleMetadata)
export class StudentsModule {}
